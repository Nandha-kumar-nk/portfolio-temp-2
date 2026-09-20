import React from 'react';

interface CenterHubWorldProps {
  size?: 'desktop' | 'tablet' | 'mobile';
}

export const CenterHubWorld: React.FC<CenterHubWorldProps> = ({
  size = 'desktop',
}) => {
  const isMobile = size === 'mobile';
  const isTablet = size === 'tablet';

  const containerScale = isMobile
    ? 'scale-75'
    : isTablet
    ? 'scale-85'
    : 'scale-100';

  return (
    <div
      id="center-universe-hub"
      className={`relative select-none pointer-events-none flex flex-col items-center justify-center transition-all duration-700 ${containerScale}`}
      style={{
        width: '260px',
        height: '240px',
      }}
    >
      {/* Central Blue Energy Aura */}
      <div
        className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 245, 255, 0.4) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 75%)',
        }}
      />

      {/* Orbiting Golden/Cyan Energy Ring */}
      <div
        className="absolute rounded-full border-2 border-cyan-400/60 animate-spin"
        style={{
          width: '280px',
          height: '110px',
          boxShadow: '0 0 25px rgba(0, 245, 255, 0.6)',
          transform: 'rotateX(72deg)',
          animationDuration: '24s',
        }}
      />

      {/* Futuristic Cyber Metropolis Spire Cluster */}
      <div className="relative z-10 flex flex-col items-center">
        <svg
          className="w-40 sm:w-44 h-32 filter drop-shadow-[0_0_20px_rgba(0,245,255,0.7)]"
          viewBox="0 0 160 120"
          fill="none"
        >
          {/* Main Central Tower Spire */}
          <polygon
            points="80,10 88,40 88,110 72,110 72,40"
            fill="#0284c7"
            opacity="0.9"
          />
          <line
            x1="80"
            y1="5"
            x2="80"
            y2="10"
            stroke="#00f5ff"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="80" cy="5" r="2.5" fill="#ffffff" />

          {/* Left Flanking Skyscrapers */}
          <polygon points="58,35 68,45 68,110 52,110 52,45" fill="#0369a1" />
          <polygon points="40,55 50,60 50,110 36,110 36,65" fill="#075985" />
          <polygon points="26,75 34,78 34,110 22,110 22,82" fill="#0c4a6e" />

          {/* Right Flanking Skyscrapers */}
          <polygon points="102,35 92,45 92,110 108,110 108,45" fill="#0369a1" />
          <polygon points="120,55 110,60 110,110 124,110 124,65" fill="#075985" />
          <polygon points="134,75 126,78 126,110 138,110 138,82" fill="#0c4a6e" />

          {/* Illuminated Window Matrix Lines */}
          {[48, 62, 76, 90, 104].map((y) => (
            <line
              key={y}
              x1="74"
              y1={y}
              x2="86"
              y2={y}
              stroke="#00f5ff"
              strokeWidth="1.5"
            />
          ))}
          {[52, 68, 84].map((y) => (
            <line
              key={`l-${y}`}
              x1="54"
              y1={y}
              x2="66"
              y2={y}
              stroke="#38bdf8"
              strokeWidth="1"
            />
          ))}
          {[52, 68, 84].map((y) => (
            <line
              key={`r-${y}`}
              x1="94"
              y1={y}
              x2="106"
              y2={y}
              stroke="#38bdf8"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Central Floating Island Base */}
        <div className="relative -mt-6">
          <svg className="w-48 sm:w-52 h-20" viewBox="0 0 200 80" fill="none">
            {/* Rock Base */}
            <ellipse cx="100" cy="20" rx="85" ry="16" fill="#0f172a" />
            <ellipse
              cx="100"
              cy="20"
              rx="85"
              ry="16"
              stroke="#00f5ff"
              strokeWidth="1.5"
              strokeOpacity="0.8"
            />
            <path
              d="M 15 20 L 32 42 L 58 35 L 82 58 L 100 76 L 120 54 L 148 58 L 168 38 L 185 20 Z"
              fill="#090d16"
              stroke="#0284c7"
              strokeWidth="0.8"
            />
          </svg>

          {/* Central Label Plate: MY PROJECTS / IDEAS • CODE • IMPACT */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-xl bg-slate-950/90 border border-cyan-400/80 shadow-[0_0_20px_rgba(0,245,255,0.5)] backdrop-blur-md flex flex-col items-center whitespace-nowrap">
            <span className="text-sm sm:text-base font-black text-white tracking-widest uppercase">
              MY PROJECTS
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-cyan-300 tracking-wider font-mono uppercase">
              IDEAS • CODE • IMPACT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
