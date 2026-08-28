import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  Globe,
  Maximize2,
  Minimize2,
  Layers,
  LocateFixed,
  ZoomIn,
  ZoomOut,
  MapPin,
} from "lucide-react";

export interface VisitorRecord {
  id: number;
  ip: string;
  city: string | null;
  region: string | null;
  country: string | null;
  country_code: string | null;
  country_flag: string | null;
  latitude: number | null;
  longitude: number | null;
  page_visited: string;
  referrer: string;
  visited_at: string;
}

interface VisitorWorldMapProps {
  visitors: VisitorRecord[];
  selectedVisitorId: number | null;
  onSelectVisitor: (id: number | null) => void;
}

type MapLayerType = "dark" | "satellite" | "voyager";

const TILE_LAYERS: Record<MapLayerType, { url: string; attribution: string; name: string }> = {
  dark: {
    name: "Tactical Dark",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://carto.com/" target="_blank">CARTO</a> &copy; OpenStreetMap contributors',
  },
  satellite: {
    name: "Satellite Hybrid",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; <a href="https://www.esri.com/" target="_blank">Esri</a>, Earthstar Geographics',
  },
  voyager: {
    name: "Voyager Atlas",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://carto.com/" target="_blank">CARTO</a> &copy; OpenStreetMap contributors',
  },
};

function formatRelativeTime(dateStr: string): string {
  try {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return `${Math.max(1, diffSec)}s ago`;
    const diffMin = Math.floor(diffSec / 1000 / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDays = Math.floor(diffHr / 24);
    return `${diffDays}d ago`;
  } catch {
    return dateStr;
  }
}

export function VisitorWorldMap({
  visitors,
  selectedVisitorId,
  onSelectVisitor,
}: VisitorWorldMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const [activeLayer, setActiveLayer] = useState<MapLayerType>("dark");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [activeMarkerCount, setActiveMarkerCount] = useState(0);

  // Group valid visitor coordinates
  const validVisitors = visitors.filter(
    (v) => typeof v.latitude === "number" && typeof v.longitude === "number"
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!isClient || !mapContainerRef.current) return;

    let isMounted = true;

    async function initMap() {
      const L = await import("leaflet");

      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous instance if exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Create Leaflet map instance
      const map = L.map(mapContainerRef.current, {
        center: [20, 10],
        zoom: 2,
        minZoom: 1.5,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: false,
        worldCopyJump: true,
      });

      mapInstanceRef.current = map;

      // Add Tile Layer
      const currentTile = TILE_LAYERS[activeLayer];
      const tileLayer = L.tileLayer(currentTile.url, {
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);
      tileLayerRef.current = tileLayer;

      // Add Markers Layer Group
      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;

      renderMarkers(L, map, markersGroup);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isClient]);

  // Update Tile Layer when layer switch button is toggled
  useEffect(() => {
    if (!mapInstanceRef.current || !isClient) return;

    import("leaflet").then((L) => {
      if (tileLayerRef.current) {
        mapInstanceRef.current.removeLayer(tileLayerRef.current);
      }
      const currentTile = TILE_LAYERS[activeLayer];
      const newTile = L.tileLayer(currentTile.url, {
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
      tileLayerRef.current = newTile;
    });
  }, [activeLayer, isClient]);

  // Re-render markers when visitors list or selection changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current || !isClient) return;

    import("leaflet").then((L) => {
      if (!mapInstanceRef.current || !markersLayerRef.current) return;
      renderMarkers(L, mapInstanceRef.current, markersLayerRef.current);
    });
  }, [visitors, selectedVisitorId, isClient]);

  // Function to create and render pins
  const renderMarkers = (L: any, map: any, markersGroup: any) => {
    markersGroup.clearLayers();

    // Group pins by coordinate string
    const grouped = new Map<string, { latest: VisitorRecord; count: number; visitors: VisitorRecord[] }>();
    for (const v of validVisitors) {
      const key = `${v.latitude?.toFixed(3)},${v.longitude?.toFixed(3)}`;
      const existing = grouped.get(key);
      if (!existing) {
        grouped.set(key, { latest: v, count: 1, visitors: [v] });
      } else {
        existing.count += 1;
        existing.visitors.push(v);
      }
    }

    setActiveMarkerCount(grouped.size);

    const bounds: [number, number][] = [];

    grouped.forEach((group) => {
      const { latest, count, visitors: groupVisitors } = group;
      const lat = latest.latitude!;
      const lng = latest.longitude!;
      bounds.push([lat, lng]);

      const isSelected =
        selectedVisitorId !== null &&
        groupVisitors.some((v) => v.id === selectedVisitorId);

      // Create Custom High-Tech Cyber Radar DivIcon
      const iconHtml = `
        <div class="custom-map-radar-pin ${isSelected ? "is-selected" : ""}" style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;">
          <div class="radar-ring" style="position: absolute; inset: 0; border-radius: 9999px; background: rgba(34, 211, 238, 0.25); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div class="radar-ring-2" style="position: absolute; width: 22px; height: 22px; border-radius: 9999px; background: rgba(34, 211, 238, 0.4); animation: pulse 1.5s ease-in-out infinite;"></div>
          <div class="radar-dot" style="position: relative; width: 14px; height: 14px; border-radius: 9999px; background: ${
            isSelected ? "#ec4899" : "#22d3ee"
          }; border: 2.5px solid #0a0f18; box-shadow: 0 0 14px ${
            isSelected ? "rgba(236, 72, 153, 0.9)" : "rgba(34, 211, 238, 0.9)"
          }; display: flex; align-items: center; justify-content: center;">
            ${
              count > 1
                ? `<span style="font-size: 8px; font-weight: 800; color: #0a0f18; line-height: 1; font-family: monospace;">${count}</span>`
                : `<span style="width: 4px; height: 4px; border-radius: 9999px; background: #0a0f18;"></span>`
            }
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: "custom-radar-icon-container",
        html: iconHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      // Popup Content Card
      const locationTitle = [latest.city, latest.region, latest.country]
        .filter((p) => p && p !== "Unknown")
        .join(", ") || "Unknown Location";

      const popupHtml = `
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; min-width: 220px; max-width: 280px; color: #f1f5f9; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 6px; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 6px; font-weight: bold; font-size: 12px;">
              <span style="font-size: 16px;">${latest.country_flag || "🌐"}</span>
              <span style="color: #ffffff;">${locationTitle}</span>
            </div>
            <span style="background: rgba(34, 211, 238, 0.18); border: 1px solid rgba(34, 211, 238, 0.4); color: #22d3ee; font-size: 9px; font-weight: 700; padding: 1px 6px; border-radius: 2px;">
              ${count} session${count > 1 ? "s" : ""}
            </span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 4px; line-height: 1.4;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #94a3b8;">Client IP:</span>
              <span style="font-weight: 600; color: #38bdf8;">${latest.ip}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #94a3b8;">Target Route:</span>
              <span style="color: #22d3ee; font-weight: 600;">${latest.page_visited === "/" ? "/home" : latest.page_visited}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #94a3b8;">Referrer:</span>
              <span style="color: #cbd5e1; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${latest.referrer || "Direct"}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #94a3b8;">Coordinates:</span>
              <span style="color: #a855f7; font-size: 10px;">${lat.toFixed(3)}°, ${lng.toFixed(3)}°</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 5px; margin-top: 4px; font-size: 10px; color: #64748b;">
              <span>Last ping:</span>
              <span style="color: #94a3b8;">${formatRelativeTime(latest.visited_at)}</span>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: "custom-leaflet-cyber-popup",
        closeButton: true,
        autoPan: true,
      });

      marker.on("click", () => {
        onSelectVisitor(latest.id);
      });

      marker.addTo(markersGroup);

      // If this group contains the selected visitor, open popup and fly to it
      if (isSelected) {
        marker.openPopup();
        map.flyTo([lat, lng], Math.max(map.getZoom(), 6), {
          duration: 1.2,
        });
      }
    });

    // Auto fit bounds if no marker is individually focused and we have pins
    if (bounds.length > 0 && selectedVisitorId === null && map.getZoom() <= 2) {
      try {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });
      } catch {
        // ignore bounds calculation errors
      }
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleResetView = () => {
    onSelectVisitor(null);
    if (mapInstanceRef.current && validVisitors.length > 0) {
      const bounds: [number, number][] = validVisitors.map((v) => [v.latitude!, v.longitude!]);
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 5 });
    } else if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([20, 10], 2);
    }
  };

  return (
    <div
      className={`rounded-sm border border-border bg-card/95 backdrop-blur-md p-4 sm:p-6 shadow-sm transition-all duration-300 ${
        isFullscreen ? "fixed inset-4 z-50 overflow-hidden flex flex-col bg-background" : ""
      }`}
    >
      {/* Map Header / HUD Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/70">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-signal animate-spin-slow" />
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-foreground tracking-wide flex items-center gap-2">
              REAL-TIME WORLD SATELLITE & RADAR TELEMETRY
            </h2>
            <p className="text-[10px] text-muted-foreground hidden sm:block">
              Interactive high-precision geographic telemetry map powered by live GPS nodes
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Layer Style Switcher */}
          <div className="flex items-center bg-surface border border-border rounded-sm p-0.5 text-[11px]">
            <button
              onClick={() => setActiveLayer("dark")}
              className={`px-2.5 py-1 rounded-xs transition font-semibold cursor-pointer ${
                activeLayer === "dark"
                  ? "bg-signal/20 text-signal border border-signal/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Tactical Dark Map"
            >
              Dark
            </button>
            <button
              onClick={() => setActiveLayer("satellite")}
              className={`px-2.5 py-1 rounded-xs transition font-semibold cursor-pointer ${
                activeLayer === "satellite"
                  ? "bg-signal/20 text-signal border border-signal/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Real Satellite Imagery"
            >
              Satellite
            </button>
            <button
              onClick={() => setActiveLayer("voyager")}
              className={`px-2.5 py-1 rounded-xs transition font-semibold cursor-pointer ${
                activeLayer === "voyager"
                  ? "bg-signal/20 text-signal border border-signal/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Voyager Street / Atlas Map"
            >
              Atlas
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1 bg-surface border border-border px-2.5 py-1 rounded-sm text-[11px] text-muted-foreground hover:text-foreground transition cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            <span className="hidden md:inline">{isFullscreen ? "Collapse" : "Expand"}</span>
          </button>
        </div>
      </div>

      {/* Map Display Frame */}
      <div
        className={`relative w-full my-4 rounded-xs border border-border/80 bg-[#070b12] overflow-hidden select-none ${
          isFullscreen ? "flex-1 min-h-0" : "aspect-[21/10] min-h-[360px] sm:min-h-[460px] max-h-[620px]"
        }`}
      >
        {/* Leaflet Map Canvas Container */}
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Custom Map Floating Controls */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 shadow-lg">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-sm bg-card/90 border border-border/80 text-foreground hover:text-signal hover:border-signal/50 flex items-center justify-center backdrop-blur-md transition cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-sm bg-card/90 border border-border/80 text-foreground hover:text-signal hover:border-signal/50 flex items-center justify-center backdrop-blur-md transition cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={handleResetView}
            className="w-8 h-8 rounded-sm bg-card/90 border border-border/80 text-foreground hover:text-signal hover:border-signal/50 flex items-center justify-center backdrop-blur-md transition cursor-pointer"
            title="Reset Map to All Visitors"
          >
            <LocateFixed className="h-4 w-4" />
          </button>
        </div>

        {/* Status Overlay HUD */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted-foreground bg-background/90 px-3 py-1.5 rounded-sm border border-border/80 backdrop-blur-md pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <span className="h-2 w-2 rounded-full bg-signal inline-block animate-ping" />
              <span>{activeMarkerCount} Geolocation Node{activeMarkerCount === 1 ? "" : "s"}</span>
            </span>
            <span className="hidden sm:inline text-border-strong">|</span>
            <span className="hidden sm:inline">
              Layer: <span className="text-signal font-semibold uppercase">{TILE_LAYERS[activeLayer].name}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
            <span>Scroll to zoom · Drag to explore</span>
          </div>
        </div>
      </div>

      {/* Global CSS for Leaflet Popups and Markers */}
      <style>{`
        .custom-radar-icon-container {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-container {
          background-color: #070b12 !important;
          font-family: inherit;
        }
        .custom-leaflet-cyber-popup .leaflet-popup-content-wrapper {
          background: rgba(15, 23, 42, 0.96) !important;
          border: 1px solid rgba(34, 211, 238, 0.4) !important;
          border-radius: 4px !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.7), 0 0 15px rgba(34, 211, 238, 0.2) !important;
          backdrop-filter: blur(12px) !important;
          color: #f1f5f9 !important;
          padding: 8px !important;
        }
        .custom-leaflet-cyber-popup .leaflet-popup-tip {
          background: rgba(15, 23, 42, 0.96) !important;
          border: 1px solid rgba(34, 211, 238, 0.4) !important;
        }
        .custom-leaflet-cyber-popup .leaflet-popup-close-button {
          color: #94a3b8 !important;
          padding: 6px 8px !important;
        }
        .custom-leaflet-cyber-popup .leaflet-popup-close-button:hover {
          color: #22d3ee !important;
        }
      `}</style>
    </div>
  );
}
