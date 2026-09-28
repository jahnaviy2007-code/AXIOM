'use client';

interface RobotMascotProps {
  size?: number;
  isSpeaking?: boolean;
  className?: string;
}

export default function RobotMascot({ size, isSpeaking = false, className = "" }: RobotMascotProps) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <div
      style={style}
      className={`relative mx-auto animate-float ${size ? "" : "w-64 h-64 sm:w-80 sm:h-80"} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        {/* Glow aura */}
        <defs>
          <radialGradient id="aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="1" />
            <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0.8" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="eyeFilter">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1B1464" />
            <stop offset="100%" stopColor="#0B0F2E" />
          </linearGradient>
          <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#7C5CFF" />
          </linearGradient>
        </defs>

        {/* Aura */}
        <circle cx="150" cy="160" r="120" fill="url(#aura)" />

        {/* Antenna */}
        <line x1="150" y1="60" x2="150" y2="40" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" filter="url(#glow)" />
        <circle cx="150" cy="35" r="7" fill="url(#accentGrad)" filter="url(#glow)" />
        <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />

        {/* Antenna side arms */}
        <line x1="150" y1="48" x2="135" y2="42" stroke="#7C5CFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="132" cy="40" r="4" fill="#7C5CFF" filter="url(#glow)" />
        <line x1="150" y1="48" x2="165" y2="42" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
        <circle cx="168" cy="40" r="4" fill="#22D3EE" filter="url(#glow)" />

        {/* Head */}
        <rect x="95" y="65" width="110" height="90" rx="20" fill="url(#bodyGrad)" stroke="url(#accentGrad)" strokeWidth="2" />

        {/* Eyes */}
        <rect x="112" y="88" width="28" height="22" rx="6" fill="#0B0F2E" stroke="#22D3EE" strokeWidth="1.5" />
        <rect x="160" y="88" width="28" height="22" rx="6" fill="#0B0F2E" stroke="#22D3EE" strokeWidth="1.5" />

        {/* Eye pupils - glowing cyan */}
        <ellipse cx="126" cy="99" rx="8" ry="7" fill="url(#eyeGlow)" filter="url(#eyeFilter)">
          <animate attributeName="ry" values="7;3;7" dur="3s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="174" cy="99" rx="8" ry="7" fill="url(#eyeGlow)" filter="url(#eyeFilter)">
          <animate attributeName="ry" values="7;3;7" dur="3s" repeatCount="indefinite" />
        </ellipse>

        {/* Eye highlights */}
        <circle cx="130" cy="95" r="2" fill="white" opacity="0.8" />
        <circle cx="178" cy="95" r="2" fill="white" opacity="0.8" />

        {/* Mouth */}
        <rect x="120" y="128" width="60" height="12" rx="6" fill="#22D3EE" opacity="0.3" />
        <rect x="124" y="130" width="20" height="8" rx="4" fill="#22D3EE" opacity="0.8" />
        <rect x="156" y="130" width="20" height="8" rx="4" fill="#7C5CFF" opacity="0.8" />

        {/* Side ear panels */}
        <rect x="77" y="80" width="18" height="50" rx="8" fill="url(#bodyGrad)" stroke="url(#accentGrad)" strokeWidth="1.5" />
        <rect x="205" y="80" width="18" height="50" rx="8" fill="url(#bodyGrad)" stroke="url(#accentGrad)" strokeWidth="1.5" />
        <rect x="81" y="95" width="10" height="20" rx="4" fill="#7C5CFF" opacity="0.5" />
        <rect x="209" y="95" width="10" height="20" rx="4" fill="#22D3EE" opacity="0.5" />

        {/* Neck */}
        <rect x="135" y="155" width="30" height="15" rx="5" fill="url(#bodyGrad)" stroke="rgba(124,92,255,0.4)" strokeWidth="1" />

        {/* Body */}
        <rect x="80" y="168" width="140" height="100" rx="20" fill="url(#bodyGrad)" stroke="url(#accentGrad)" strokeWidth="2" />

        {/* Chest panel */}
        <rect x="103" y="185" width="95" height="60" rx="10" fill="rgba(34,211,238,0.05)" stroke="rgba(34,211,238,0.3)" strokeWidth="1" />

        {/* Chest indicators */}
        <circle cx="120" cy="205" r="6" fill="#22D3EE" opacity="0.8" filter="url(#glow)">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="205" r="6" fill="#7C5CFF" opacity="0.8" filter="url(#glow)">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="160" cy="205" r="6" fill="#22C55E" opacity="0.8" filter="url(#glow)">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.1s" repeatCount="indefinite" />
        </circle>

        {/* Progress bar on chest */}
        <rect x="110" y="222" width="80" height="8" rx="4" fill="rgba(255,255,255,0.1)" />
        <rect x="110" y="222" width="65" height="8" rx="4" fill="url(#accentGrad)">
          <animate attributeName="width" values="20;65;20" dur="3s" repeatCount="indefinite" />
        </rect>
        <text x="150" y="245" textAnchor="middle" fill="rgba(34,211,238,0.8)" fontSize="10" fontFamily="Inter">82/100</text>

        {/* Arms */}
        <rect x="36" y="172" width="45" height="22" rx="11" fill="url(#bodyGrad)" stroke="url(#accentGrad)" strokeWidth="1.5" />
        <rect x="219" y="172" width="45" height="22" rx="11" fill="url(#bodyGrad)" stroke="url(#accentGrad)" strokeWidth="1.5" />

        {/* Hands */}
        <circle cx="47" cy="183" r="12" fill="url(#bodyGrad)" stroke="#22D3EE" strokeWidth="1.5" />
        <circle cx="253" cy="183" r="12" fill="url(#bodyGrad)" stroke="#7C5CFF" strokeWidth="1.5" />

        {/* Base shadow */}
        <ellipse cx="150" cy="275" rx="70" ry="10" fill="#22D3EE" opacity="0.1" />
      </svg>
    </div>
  );
}
