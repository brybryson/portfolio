import React, { useState } from "react";

export function OwleyAvatar({
  isThinking = false,
  size = "md",
  className = "",
}: {
  isThinking?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const [imgError, setImgError] = useState(false);

  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
      {/* Ambient Glowing Halo */}
      <span
        className={`absolute inset-0 rounded-full bg-signal/25 ${
          isThinking ? "animate-ping opacity-80" : "animate-pulse opacity-40"
        }`}
      />

      {/* Render Image Avatar or SVG Fallback */}
      {!imgError ? (
        <img
          src="/images/owley-avatar.png"
          alt="Owley AI Cat Mascot"
          onError={() => setImgError(true)}
          className={`relative h-full w-full rounded-full object-cover border border-signal/50 bg-card shadow-sm transition-transform duration-300 ${
            isThinking ? "scale-105" : "hover:scale-105"
          }`}
        />
      ) : (
        /* Animated Vector Cyber Cat SVG Fallback */
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative h-full w-full drop-shadow-[0_2px_8px_rgba(0,229,255,0.4)]"
        >
          {/* Cat Ears */}
          <polygon
            points="8,18 16,4 22,16"
            fill="var(--card)"
            stroke="var(--signal)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon
            points="40,18 32,4 26,16"
            fill="var(--card)"
            stroke="var(--signal)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon points="11,16 16,8 19,15" fill="var(--signal)" opacity="0.85" />
          <polygon points="37,16 32,8 29,15" fill="var(--signal)" opacity="0.85" />

          {/* Head */}
          <rect
            x="6"
            y="14"
            width="36"
            height="28"
            rx="14"
            fill="var(--surface-2)"
            stroke="var(--border-strong)"
            strokeWidth="2"
          />

          {/* Visor */}
          <rect
            x="10"
            y="18"
            width="28"
            height="16"
            rx="8"
            fill="var(--background)"
            stroke="var(--signal)"
            strokeWidth="1.5"
          />

          {/* Glowing Eyes */}
          <g className={isThinking ? "animate-bounce" : ""}>
            <circle cx="18" cy="25" r="3" fill="var(--signal)">
              <animate
                attributeName="r"
                values="3;3;0.5;3;3"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="19" cy="24" r="1" fill="#FFFFFF" />
            <circle cx="30" cy="25" r="3" fill="var(--signal)">
              <animate
                attributeName="r"
                values="3;3;0.5;3;3"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="31" cy="24" r="1" fill="#FFFFFF" />
          </g>

          <path d="M23 29 L25 29 L24 30.5 Z" fill="var(--pulse-c)" />
          <path
            d="M21 31 Q24 33 24 31 Q24 33 27 31"
            stroke="var(--muted-foreground)"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      )}

      {/* Online Status Pulse Dot */}
      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-[#27C93F] shadow-sm" />
    </div>
  );
}
