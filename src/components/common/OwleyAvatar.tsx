import React from "react";

export function OwleyAvatar({
  isThinking = false,
  size = "md",
  className = "",
}: {
  isThinking?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeMap = {
    sm: "w-7 h-7",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* Ambient Halo Pulse */}
      <span
        className={`absolute inset-0 rounded-full bg-signal/20 ${
          isThinking ? "animate-ping opacity-75" : "animate-pulse opacity-40"
        }`}
      />

      {/* Cyber Cat Animated SVG */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-full w-full drop-shadow-[0_2px_8px_rgba(0,229,255,0.4)]"
      >
        {/* Cat Outer Ears */}
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

        {/* Inner Ear Neon Accents */}
        <polygon points="11,16 16,8 19,15" fill="var(--signal)" opacity="0.8" />
        <polygon points="37,16 32,8 29,15" fill="var(--signal)" opacity="0.8" />

        {/* Cat Head Base */}
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

        {/* Cyber Visor / Face Plate */}
        <rect
          x="10"
          y="18"
          width="28"
          height="16"
          rx="8"
          fill="var(--background)"
          stroke="var(--signal)"
          strokeWidth="1.5"
          opacity="0.95"
        />

        {/* Expressive Glowing Eyes */}
        <g className={isThinking ? "animate-bounce" : ""}>
          {/* Left Eye */}
          <circle cx="18" cy="25" r="3" fill="var(--signal)">
            <animate
              attributeName="r"
              values="3;3;0.5;3;3"
              dur="4s"
              repeatCount="indefinite"
              begin="0s"
            />
          </circle>
          <circle cx="19" cy="24" r="1" fill="#FFFFFF" />

          {/* Right Eye */}
          <circle cx="30" cy="25" r="3" fill="var(--signal)">
            <animate
              attributeName="r"
              values="3;3;0.5;3;3"
              dur="4s"
              repeatCount="indefinite"
              begin="0s"
            />
          </circle>
          <circle cx="31" cy="24" r="1" fill="#FFFFFF" />
        </g>

        {/* Cyber Nose & Cute Cat Mouth */}
        <path
          d="M23 29 L25 29 L24 30.5 Z"
          fill="var(--pulse-c)"
          opacity="0.9"
        />
        <path
          d="M21 31 Q24 33 24 31 Q24 33 27 31"
          stroke="var(--muted-foreground)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* Neon Cyber Whiskers */}
        <line x1="6" y1="24" x2="1" y2="23" stroke="var(--signal)" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
        <line x1="6" y1="27" x2="2" y2="28" stroke="var(--signal)" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
        <line x1="42" y1="24" x2="47" y2="23" stroke="var(--signal)" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
        <line x1="42" y1="27" x2="46" y2="28" stroke="var(--signal)" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />

        {/* Status Light on Forehead */}
        <circle cx="24" cy="16" r="1.5" fill="var(--flow)">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
