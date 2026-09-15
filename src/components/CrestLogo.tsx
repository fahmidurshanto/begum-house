import React from "react";

interface CrestLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function CrestLogo({
  className = "",
  size = "md",
  showText = true,
}: CrestLogoProps) {
  const sizeMap = {
    sm: { crestSize: 42, textSize: "text-base tracking-[0.2em]" },
    md: { crestSize: 52, textSize: "text-lg md:text-xl tracking-[0.22em]" },
    lg: { crestSize: 76, textSize: "text-2xl md:text-3xl tracking-[0.25em]" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Heraldic Crest */}
      <svg
        aria-hidden="true"
        width={currentSize.crestSize}
        height={currentSize.crestSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)]"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="35%" stopColor="#DFBE76" />
            <stop offset="70%" stopColor="#C5A869" />
            <stop offset="100%" stopColor="#967732" />
          </linearGradient>
          <linearGradient id="shieldBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B1C31" />
            <stop offset="100%" stopColor="#040D18" />
          </linearGradient>
        </defs>

        {/* Crown on top */}
        <path
          d="M32 23L38 31L50 20L62 31L68 23L66 35H34L32 23Z"
          fill="url(#goldGradient)"
          stroke="#5C471A"
          strokeWidth="0.75"
        />
        <circle cx="32" cy="22" r="1.75" fill="#FFF2D6" />
        <circle cx="50" cy="18.5" r="2.25" fill="#FFF2D6" />
        <circle cx="68" cy="22" r="1.75" fill="#FFF2D6" />
        <circle cx="41" cy="29" r="1" fill="#DFBE76" />
        <circle cx="59" cy="29" r="1" fill="#DFBE76" />

        {/* Laurel Wreath */}
        <path
          d="M26 38C22 47 22 62 31 71M74 38C78 47 78 62 69 71"
          stroke="url(#goldGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Laurel leaves left */}
        <path d="M22 42C20 40 22 36 25 38M20 50C17 48 19 45 23 46M20 59C17 58 19 55 23 56M23 67C21 66 23 63 27 64" stroke="url(#goldGradient)" strokeWidth="1.7" strokeLinecap="round" />
        {/* Laurel leaves right */}
        <path d="M78 42C80 40 78 36 75 38M80 50C83 48 81 45 77 46M80 59C83 58 81 55 77 56M77 67C79 66 77 63 73 64" stroke="url(#goldGradient)" strokeWidth="1.7" strokeLinecap="round" />

        {/* Main Shield */}
        <path
          d="M31 36H69V56C69 68 50 78 50 78C50 78 31 68 31 56V36Z"
          fill="url(#shieldBg)"
          stroke="url(#goldGradient)"
          strokeWidth="2.2"
        />

        {/* Shield Quartering Cross */}
        <line x1="50" y1="36" x2="50" y2="76" stroke="url(#goldGradient)" strokeWidth="1.2" />
        <line x1="31" y1="54" x2="69" y2="54" stroke="url(#goldGradient)" strokeWidth="1.2" />

        {/* Q1: Growth / Finance bars */}
        <path d="M36 50V46M40 50V43M44 50V39M36 44L44 38" stroke="url(#goldGradient)" strokeWidth="1.2" strokeLinecap="round" />

        {/* Q2: Column / Architecture */}
        <path d="M55 40H64M56 42V49M63 42V49M55 50H64" stroke="url(#goldGradient)" strokeWidth="1.1" />

        {/* Q3: Handshake / Compass */}
        <circle cx="40" cy="63" r="4.5" stroke="url(#goldGradient)" strokeWidth="1" />
        <line x1="40" y1="60" x2="40" y2="66" stroke="url(#goldGradient)" strokeWidth="0.8" />
        <line x1="37" y1="63" x2="43" y2="63" stroke="url(#goldGradient)" strokeWidth="0.8" />

        {/* Q4: Scales / Crest */}
        <path d="M55 60L64 60M59.5 58V68M56 65L58 61M63 65L61 61" stroke="url(#goldGradient)" strokeWidth="0.9" />

        {/* Ribbon banner below */}
        <path
          d="M24 81L32 77H68L76 81L72 86L68 83H32L28 86L24 81Z"
          fill="url(#goldGradient)"
          stroke="#4D3B14"
          strokeWidth="0.75"
        />
        <text
          x="50"
          y="82"
          textAnchor="middle"
          fontSize="4.2"
          fontFamily="var(--font-cinzel), serif"
          fontWeight="bold"
          fill="#071526"
          letterSpacing="0.08em"
        >
          BEGUM HOUSE
        </text>
      </svg>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-serif font-semibold text-[#DFBE76] hover:text-[#FFF2D6] transition-colors leading-none ${currentSize.textSize}`}
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            BEGUM HOUSE
          </span>
        </div>
      )}
    </div>
  );
}
