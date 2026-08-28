import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import {
  Globe,
  RefreshCw,
  Search,
  Radio,
  Users,
  Eye,
  MapPin,
  Clock,
  Compass,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Layers,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { VisitorWorldMap, type VisitorRecord } from "@/components/visitors/VisitorWorldMap";

export const Route = createFileRoute("/profile-visitors")({
  head: () => ({
    meta: [
      { title: "Visitor Intelligence & Global Radar — Bryant Melliza" },
      {
        name: "robots",
        content: "noindex, nofollow",
      },
    ],
  }),
  component: ProfileVisitorsPage,
});

const SUPABASE_URL = "https://liicdyqxbuzbobehaaux.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpaWNkeXF4YnV6Ym9iZWhhYXV4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Nzg5NzgyMCwiZXhwIjoyMTAzNDczODIwfQ.18TT3zCNDv2LyMdGXAYIm_WfzstoUr90GEnSN9aKIGE";

function formatRelativeTime(dateStr: string): string {
  try {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return `${Math.max(1, diffSec)}s ago`;
    const diffMin = Math.floor(diffMs / 1000 / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDays = Math.floor(diffHr / 24);
    return `${diffDays}d ago`;
  } catch {
    return dateStr;
  }
}

function formatManilaTime(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export function ProfileVisitorsPage() {
  const [visitors, setVisitors] = useState<VisitorRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<string>("all");
  const [activeHoverId, setActiveHoverId] = useState<number | null>(null);
  const [selectedPinId, setSelectedPinId] = useState<number | null>(null);

  const fetchVisitors = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/portfolio_visitors?select=*&order=visited_at.desc&limit=150`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );
      if (res.ok) {
        const data: VisitorRecord[] = await res.json();
        setVisitors(data);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error("Failed to load visitor telemetry:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
    const interval = setInterval(() => {
      fetchVisitors();
    }, 15000); // 15-second live telemetry polling
    return () => clearInterval(interval);
  }, []);

  // Filtered list
  const filteredVisitors = useMemo(() => {
    return visitors.filter((v) => {
      const matchesRoute =
        selectedRoute === "all" ||
        (selectedRoute === "/home" && (v.page_visited === "/" || v.page_visited === "/home")) ||
        v.page_visited === selectedRoute ||
        v.page_visited.startsWith(selectedRoute);

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        (v.city && v.city.toLowerCase().includes(q)) ||
        (v.country && v.country.toLowerCase().includes(q)) ||
        (v.ip && v.ip.toLowerCase().includes(q)) ||
        (v.page_visited && v.page_visited.toLowerCase().includes(q)) ||
        (v.referrer && v.referrer.toLowerCase().includes(q));

      return matchesRoute && matchesQuery;
    });
  }, [visitors, selectedRoute, searchQuery]);

  // High-level Metrics
  const metrics = useMemo(() => {
    const totalHits = visitors.length;
    const uniqueIps = new Set(visitors.map((v) => v.ip)).size;

    const countries = new Map<string, { count: number; flag: string }>();
    const pages = new Map<string, number>();

    visitors.forEach((v) => {
      if (v.country) {
        const entry = countries.get(v.country) || { count: 0, flag: v.country_flag || "🌐" };
        entry.count += 1;
        countries.set(v.country, entry);
      }
      const p = v.page_visited === "/" ? "/home" : v.page_visited;
      pages.set(p, (pages.get(p) || 0) + 1);
    });

    const sortedCountries = Array.from(countries.entries()).sort((a, b) => b[1].count - a[1].count);
    const topCountry = sortedCountries[0] ? `${sortedCountries[0][1].flag} ${sortedCountries[0][0]}` : "None";

    const sortedPages = Array.from(pages.entries()).sort((a, b) => b[1] - a[1]);
    const topPage = sortedPages[0] ? `${sortedPages[0][0]} (${sortedPages[0][1]})` : "N/A";

    return {
      totalHits,
      uniqueIps,
      topCountry,
      totalCountries: countries.size,
      topPage,
    };
  }, [visitors]);

  const uniqueRoutes = useMemo(() => {
    const routes = new Set<string>();
    visitors.forEach((v) => {
      const p = v.page_visited === "/" ? "/home" : v.page_visited;
      routes.add(p);
    });
    return Array.from(routes);
  }, [visitors]);

  return (
    <div className="min-h-screen bg-background text-foreground text-mono">
      {/* Top Header / HUD Bar */}
      <div className="border-b border-border/80 bg-surface/50 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto max-w-[1536px] px-6 sm:px-10 lg:px-14 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-signal"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Compass className="h-4 w-4 text-signal" />
                  GEOSPATIAL TRAFFIC RADAR
                </h1>
                <span className="rounded-xs bg-signal/10 border border-signal/30 px-2 py-0.5 text-[10px] font-semibold text-signal uppercase tracking-wider">
                  TELEMETRY ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Real-time visitor telemetry & session intelligence synced via Supabase + n8n automation
              </p>
            </div>
          </div>

          {/* Sync & Refresh Actions */}
          <div className="flex items-center gap-3 self-end md:self-auto text-xs">
            <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground text-[11px] bg-card px-2.5 py-1 rounded border border-border">
              <Radio className="h-3 w-3 text-signal animate-pulse" />
              <span>Auto-poll 15s</span>
              {lastUpdated && (
                <span className="text-muted-foreground/60 ml-1">
                  · {formatManilaTime(lastUpdated.toISOString())}
                </span>
              )}
            </div>

            <button
              onClick={() => fetchVisitors(true)}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 rounded-sm bg-signal/15 border border-signal/40 px-3 py-1.5 text-xs font-semibold text-signal hover:bg-signal/25 transition disabled:opacity-50 cursor-pointer shadow-xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "SYNCING..." : "REFRESH"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1536px] px-6 sm:px-10 lg:px-14 py-8 space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-sm border border-border/80 bg-card p-4 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-muted-foreground text-[11px]">
              <span>TOTAL PAGE SESSIONS</span>
              <Activity className="h-3.5 w-3.5 text-signal" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-foreground">
              {isLoading ? "--" : metrics.totalHits}
            </div>
            <div className="mt-1 text-[10px] text-signal font-medium flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Live traffic stream
            </div>
          </div>

          <div className="rounded-sm border border-border/80 bg-card p-4 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-muted-foreground text-[11px]">
              <span>UNIQUE CLIENT IPs</span>
              <Users className="h-3.5 w-3.5 text-flow" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-foreground">
              {isLoading ? "--" : metrics.uniqueIps}
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">
              Verified deduplicated visitors
            </div>
          </div>

          <div className="rounded-sm border border-border/80 bg-card p-4 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-muted-foreground text-[11px]">
              <span>TOP GEO LOCATION</span>
              <Globe className="h-3.5 w-3.5 text-pulse" />
            </div>
            <div className="mt-2 text-base sm:text-lg font-bold text-foreground truncate">
              {isLoading ? "--" : metrics.topCountry}
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">
              {metrics.totalCountries} active country cluster{metrics.totalCountries === 1 ? "" : "s"}
            </div>
          </div>

          <div className="rounded-sm border border-border/80 bg-card p-4 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-muted-foreground text-[11px]">
              <span>MOST VISITED ROUTE</span>
              <Layers className="h-3.5 w-3.5 text-signal" />
            </div>
            <div className="mt-2 text-sm sm:text-base font-bold text-signal truncate">
              {isLoading ? "--" : metrics.topPage}
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground truncate">
              Target page frequency
            </div>
          </div>
        </div>

        {/* 🗺️ Actual Interactive World Map Component */}
        <VisitorWorldMap
          visitors={filteredVisitors}
          selectedVisitorId={selectedPinId || activeHoverId}
          onSelectVisitor={(id) => {
            setSelectedPinId(id);
            setActiveHoverId(id);
          }}
        />

        {/* 📋 Live Session Feed & Log Table */}
        <div className="rounded-sm border border-border bg-card p-4 sm:p-6 shadow-sm">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/70">
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-signal" />
                VERIFIED VISITOR LOG TABLE ({filteredVisitors.length})
              </h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Detailed telemetry timestamps, routes, referring channels, and IP origins
              </p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Search Bar */}
              <div className="relative">
                <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter by IP, City, Page..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-surface border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-signal w-48 sm:w-60"
                />
              </div>

              {/* Route Filter Dropdown */}
              <div className="flex items-center gap-1 text-xs">
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                <select
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  className="bg-surface border border-border rounded-sm text-xs px-2.5 py-1.5 text-foreground focus:outline-none focus:border-signal cursor-pointer"
                >
                  <option value="all">All Pages ({visitors.length})</option>
                  {uniqueRoutes.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table View */}
          <div className="mt-4 overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border/80 text-[11px] uppercase tracking-wider text-muted-foreground bg-surface/40">
                  <th className="py-2.5 px-3">Session ID</th>
                  <th className="py-2.5 px-3">Location & Flag</th>
                  <th className="py-2.5 px-3">Page Visited</th>
                  <th className="py-2.5 px-3">Referrer Source</th>
                  <th className="py-2.5 px-3">Client IP / Coords</th>
                  <th className="py-2.5 px-3 text-right">Visited Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2 text-signal" />
                      Loading live visitor telemetry...
                    </td>
                  </tr>
                ) : filteredVisitors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      No visitor telemetry matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredVisitors.map((v) => {
                    const isSelected = activeHoverId === v.id || selectedPinId === v.id;
                    const locationLabel = [v.city, v.region, v.country]
                      .filter((p) => p && p !== "Unknown")
                      .join(", ");

                    return (
                      <tr
                        key={v.id}
                        onClick={() => setSelectedPinId(selectedPinId === v.id ? null : v.id)}
                        onMouseEnter={() => setActiveHoverId(v.id)}
                        onMouseLeave={() => setActiveHoverId(null)}
                        className={`transition-colors cursor-pointer ${
                          isSelected ? "bg-signal/10 text-foreground" : "hover:bg-surface/60 text-muted-foreground"
                        }`}
                        title="Click to focus on World Map"
                      >
                        {/* ID */}
                        <td className="py-3 px-3 font-mono text-[11px] text-muted-foreground">
                          #{v.id}
                        </td>

                        {/* Location */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg leading-none">{v.country_flag || "🌐"}</span>
                            <div>
                              <div className="font-semibold text-foreground text-xs">
                                {locationLabel || "Unknown Location"}
                              </div>
                              {v.country_code && (
                                <div className="text-[10px] text-muted-foreground uppercase">
                                  {v.country_code} · {v.country || ""}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Page */}
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 rounded-xs bg-surface-2 border border-border px-2 py-1 text-[11px] font-mono text-signal">
                            {v.page_visited === "/" ? "/home" : v.page_visited}
                          </span>
                        </td>

                        {/* Referrer */}
                        <td className="py-3 px-3 font-mono text-xs">
                          {v.referrer && v.referrer !== "Direct" ? (
                            <a
                              href={v.referrer.startsWith("http") ? v.referrer : `https://${v.referrer}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-signal hover:underline inline-flex items-center gap-1 truncate max-w-[180px]"
                            >
                              <span className="truncate">{v.referrer}</span>
                              <ArrowUpRight className="h-3 w-3 shrink-0" />
                            </a>
                          ) : (
                            <span className="text-muted-foreground/80">Direct / Bookmark</span>
                          )}
                        </td>

                        {/* IP & Coordinates */}
                        <td className="py-3 px-3 font-mono text-[11px]">
                          <div className="text-foreground">{v.ip}</div>
                          {v.latitude !== null && v.longitude !== null && (
                            <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-2.5 w-2.5 text-signal" />
                              <span>
                                {v.latitude.toFixed(2)}°, {v.longitude.toFixed(2)}°
                              </span>
                            </div>
                          )}
                        </td>

                        {/* Time */}
                        <td className="py-3 px-3 text-right">
                          <div className="font-mono text-xs text-foreground">
                            {formatRelativeTime(v.visited_at)}
                          </div>
                          <div className="text-[10px] text-muted-foreground flex items-center justify-end gap-1 mt-0.5">
                            <Clock className="h-2.5 w-2.5" />
                            <span>{formatManilaTime(v.visited_at)}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
