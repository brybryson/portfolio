import React, { useState } from "react";

export function OwleyAvatar({
  isThinking = false,
  size = "md",
  className = "",
  showStatus = true,
}: {
  isThinking?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  showStatus?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  const sizeMap = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-18 h-18",
    xl: "w-24 h-24",
    "2xl": "w-32 h-32",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none bg-transparent ${sizeMap[size]} ${className}`}
    >
      {/* Pixel Art Owley with Transparent Background */}
      {!imgError ? (
        <img
          src="/images/owley-pixel-avatar.png"
          alt="Owley Pixel Cat Mascot"
          onError={() => setImgError(true)}
          className={`relative h-full w-full object-contain bg-transparent transition-all duration-300 drop-shadow-[0_2px_6px_rgba(0,229,255,0.3)] [image-rendering:pixelated] ${
            isThinking
              ? "scale-110 animate-bounce drop-shadow-[0_0_12px_rgba(0,229,255,0.7)]"
              : "hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]"
          }`}
          style={{ imageRendering: "pixelated" }}
        />
      ) : (
        /* Pixel-Style Retro Cyber Cat SVG Fallback with Transparent Background */
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`relative h-full w-full bg-transparent drop-shadow-[0_2px_6px_rgba(0,229,255,0.35)] transition-transform duration-300 ${
            isThinking ? "scale-110 animate-bounce" : "hover:scale-105"
          }`}
          shapeRendering="crispEdges"
        >
          {/* Pixel Cat Ears */}
          <rect x="7" y="4" width="2" height="2" fill="#0B0F19" />
          <rect x="6" y="6" width="2" height="4" fill="#0B0F19" />
          <rect x="8" y="6" width="2" height="4" fill="#00E5FF" />
          <rect x="10" y="8" width="2" height="2" fill="#0B0F19" />

          <rect x="23" y="4" width="2" height="2" fill="#0B0F19" />
          <rect x="24" y="6" width="2" height="4" fill="#0B0F19" />
          <rect x="22" y="6" width="2" height="4" fill="#00E5FF" />
          <rect x="20" y="8" width="2" height="2" fill="#0B0F19" />

          {/* Pixel Cat Head Armor */}
          <rect x="8" y="8" width="16" height="4" fill="#1E293B" />
          <rect x="6" y="10" width="20" height="8" fill="#1E293B" />
          <rect x="6" y="10" width="2" height="12" fill="#0B0F19" />
          <rect x="24" y="10" width="2" height="12" fill="#0B0F19" />
          <rect x="8" y="6" width="16" height="2" fill="#0B0F19" />

          {/* Cyber Visor & Glowing Pixel Eyes */}
          <rect x="8" y="12" width="16" height="6" fill="#050811" />
          <rect x="7" y="12" width="1" height="6" fill="#00E5FF" />
          <rect x="24" y="12" width="1" height="6" fill="#00E5FF" />

          {/* Glowing Eyes */}
          <rect x="10" y="13" width="3" height="4" fill="#00E5FF" />
          <rect x="11" y="13" width="1" height="2" fill="#FFFFFF" />
          <rect x="19" y="13" width="3" height="4" fill="#00E5FF" />
          <rect x="20" y="13" width="1" height="2" fill="#FFFFFF" />

          {/* White Muzzle */}
          <rect x="10" y="18" width="12" height="5" fill="#F8FAFC" />
          <rect x="12" y="23" width="8" height="2" fill="#F8FAFC" />
          <rect x="15" y="19" width="2" height="1" fill="#F43F5E" />
          <rect x="14" y="20" width="1" height="2" fill="#0B0F19" />
          <rect x="17" y="20" width="1" height="2" fill="#0B0F19" />

          {/* Whiskers */}
          <rect x="2" y="16" width="4" height="1" fill="#00E5FF" />
          <rect x="2" y="19" width="4" height="1" fill="#00E5FF" />
          <rect x="26" y="16" width="4" height="1" fill="#00E5FF" />
          <rect x="26" y="19" width="4" height="1" fill="#00E5FF" />

          {/* Cyber Collar */}
          <rect x="10" y="25" width="12" height="2" fill="#0B0F19" />
          <rect x="13" y="25" width="6" height="2" fill="#00E5FF" />
        </svg>
      )}

      {/* Online Status Dot */}
      {showStatus && (
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-[#27C93F] shadow-sm ring-1 ring-emerald-500/40" />
      )}
    </div>
  );
}
