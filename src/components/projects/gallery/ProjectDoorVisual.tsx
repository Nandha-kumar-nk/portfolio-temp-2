import React from 'react';
import { ProjectItem } from '../../../data/projectsData';

interface ProjectDoorVisualProps {
  project: ProjectItem;
  isHovered?: boolean;
  isActive?: boolean;
}

export const ProjectDoorVisual: React.FC<ProjectDoorVisualProps> = ({
  project,
  isHovered = false,
  isActive = false,
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg select-none bg-gradient-to-b from-[#060814] via-[#04060c] to-[#020306]">
      {/* Dynamic ambient backglow */}
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${project.accentGlow}, transparent 70%)`,
          opacity: isHovered || isActive ? 0.45 : 0.18,
        }}
      />

      {/* Render Project-Specific Procedural Artwork */}
      {project.id === 'swayam-2' && <SwayamDoorVisual isHovered={isHovered} />}
      {project.id === 'speed-taxi' && <SpeedTaxiDoorVisual isHovered={isHovered} />}
      {project.id === 'wildlife-ai' && <WildlifeAIDoorVisual isHovered={isHovered} />}
      {project.id === 'resume-forge' && <ResumeForgeDoorVisual isHovered={isHovered} />}
      {project.id === 'nk-mern-cli' && <MernCliDoorVisual isHovered={isHovered} />}

      {/* Subtle depth scanline grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />

      {/* Soft portal edge vignette */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg pointer-events-none" />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 1. SWAYAM 2.0: Floating Learning Nodes & Education Paths                   */
/* -------------------------------------------------------------------------- */
const SwayamDoorVisual: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <svg className="w-full h-full max-w-[200px] max-h-[160px]" viewBox="0 0 200 160" fill="none">
      {/* Learning Pathway Vectors */}
      <path
        d="M 20 120 C 60 140, 70 50, 100 70 C 130 90, 140 30, 180 40"
        stroke="#00f5ff"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeOpacity={isHovered ? '0.9' : '0.4'}
        className="transition-all duration-500"
      />
      <path
        d="M 30 50 Q 80 110 130 60 T 170 120"
        stroke="#38bdf8"
        strokeWidth="1"
        strokeOpacity={isHovered ? '0.6' : '0.25'}
      />

      {/* Floating Lecture Nodes */}
      <g className={`transition-transform duration-700 ${isHovered ? 'scale-105' : ''}`}>
        <circle cx="100" cy="70" r="14" fill="#00f5ff" fillOpacity="0.2" stroke="#00f5ff" strokeWidth="2" />
        <circle cx="100" cy="70" r="6" fill="#00f5ff" />
        <text x="100" y="73" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="monospace">
          S2
        </text>

        {/* Orbiting lecture satellite badges */}
        <circle cx="50" cy="95" r="8" fill="#0b1a2e" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="50" y="98" textAnchor="middle" fill="#38bdf8" fontSize="8">
          📚
        </text>

        <circle cx="150" cy="45" r="8" fill="#0b1a2e" stroke="#22c55e" strokeWidth="1.5" />
        <text x="150" y="48" textAnchor="middle" fill="#22c55e" fontSize="8">
          ⚡
        </text>

        <circle cx="160" cy="115" r="7" fill="#0b1a2e" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="160" y="118" textAnchor="middle" fill="#f43f5e" fontSize="7">
          ⏰
        </text>
      </g>
    </svg>

    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9px] font-mono text-cyan-400/90">
      <span>CAMPUS ARCHITECTURE</span>
      <span className="text-emerald-400">SYNCED</span>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 2. SPEED TAXI: City Grid & Moving Route Telemetry                         */
/* -------------------------------------------------------------------------- */
const SpeedTaxiDoorVisual: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <svg className="w-full h-full max-w-[200px] max-h-[160px]" viewBox="0 0 200 160" fill="none">
      {/* City Iso Grid */}
      <line x1="20" y1="40" x2="180" y2="40" stroke="#1e293b" strokeWidth="1" />
      <line x1="20" y1="80" x2="180" y2="80" stroke="#1e293b" strokeWidth="1" />
      <line x1="20" y1="120" x2="180" y2="120" stroke="#1e293b" strokeWidth="1" />
      <line x1="50" y1="20" x2="50" y2="140" stroke="#1e293b" strokeWidth="1" />
      <line x1="100" y1="20" x2="100" y2="140" stroke="#1e293b" strokeWidth="1" />
      <line x1="150" y1="20" x2="150" y2="140" stroke="#1e293b" strokeWidth="1" />

      {/* Glowing GPS Route */}
      <path
        d="M 40 120 L 50 80 L 100 80 L 100 40 L 150 40"
        stroke="#38bdf8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={isHovered ? '1' : '0.7'}
      />

      {/* Animated vehicle dot */}
      <circle cx={isHovered ? '125' : '85'} cy={isHovered ? '40' : '80'} r="6" fill="#38bdf8" className="transition-all duration-700">
        <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Waypoint markers */}
      <circle cx="40" cy="120" r="4" fill="#10b981" />
      <circle cx="150" cy="40" r="4" fill="#f59e0b" />
    </svg>

    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9px] font-mono text-cyan-400/90">
      <span>REAL-TIME DISPATCH</span>
      <span className="text-cyan-300">0.4s ETA</span>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 3. AI WILDLIFE: Radar Sweep & YOLO Bounding Vision                        */
/* -------------------------------------------------------------------------- */
const WildlifeAIDoorVisual: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <svg className="w-full h-full max-w-[200px] max-h-[160px]" viewBox="0 0 200 160" fill="none">
      {/* Concentric Radar Rings */}
      <circle cx="100" cy="80" r="60" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.2" />
      <circle cx="100" cy="80" r="40" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="100" cy="80" r="20" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.4" />

      {/* Crosshairs */}
      <line x1="100" y1="20" x2="100" y2="140" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 3" />
      <line x1="30" y1="80" x2="170" y2="80" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 3" />

      {/* YOLO Object Bounding Box */}
      <rect
        x="80"
        y="55"
        width="50"
        height="40"
        fill="none"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeDasharray={isHovered ? 'none' : '4 2'}
        className="transition-all duration-300"
      />
      <circle cx="105" cy="75" r="4" fill="#22c55e" fillOpacity="0.8" />

      {/* Target Tag */}
      <text x="82" y="50" fill="#22c55e" fontSize="7" fontWeight="bold" fontFamily="monospace">
        WILDLIFE [97%]
      </text>
    </svg>

    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9px] font-mono text-emerald-400/90">
      <span>YOLOv8 DETECT</span>
      <span className="text-emerald-300">ACTIVE</span>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 4. RESUME FORGE: Layered Documents & ATS Precision                        */
/* -------------------------------------------------------------------------- */
const ResumeForgeDoorVisual: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <svg className="w-full h-full max-w-[200px] max-h-[160px]" viewBox="0 0 200 160" fill="none">
      {/* Background document layer */}
      <rect
        x="65"
        y="30"
        width="75"
        height="95"
        rx="4"
        fill="#1e1333"
        stroke="#7e22ce"
        strokeWidth="1"
        strokeOpacity="0.5"
        transform="rotate(-6 102 77)"
      />

      {/* Main illuminated resume sheet */}
      <rect
        x="60"
        y="25"
        width="80"
        height="100"
        rx="4"
        fill="#0e081c"
        stroke="#c084fc"
        strokeWidth="1.5"
        strokeOpacity={isHovered ? '1' : '0.7'}
        className="transition-all duration-500"
      />

      {/* Text lines mockup */}
      <rect x="70" y="36" width="30" height="4" rx="2" fill="#c084fc" />
      <rect x="70" y="44" width="60" height="2" rx="1" fill="#64748b" />
      <rect x="70" y="50" width="55" height="2" rx="1" fill="#64748b" />

      <rect x="70" y="60" width="24" height="3" rx="1.5" fill="#38bdf8" />
      <rect x="70" y="67" width="58" height="2" rx="1" fill="#475569" />
      <rect x="70" y="73" width="50" height="2" rx="1" fill="#475569" />

      {/* ATS score circular badge */}
      <circle cx="124" cy="104" r="12" fill="#1e1333" stroke="#c084fc" strokeWidth="1.5" />
      <text x="124" y="107" textAnchor="middle" fill="#c084fc" fontSize="8" fontWeight="bold" fontFamily="monospace">
        98%
      </text>
    </svg>

    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9px] font-mono text-purple-400/90">
      <span>ATS COMPLIANT</span>
      <span className="text-purple-300">STUDIO</span>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 5. NK MERN CLI: Shell Console & Scaffolding Trees                         */
/* -------------------------------------------------------------------------- */
const MernCliDoorVisual: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="w-full max-w-[190px] rounded bg-[#010408] border border-cyan-900/60 p-2 text-[9px] font-mono leading-tight">
      <div className="flex items-center gap-1 pb-1 mb-1 border-b border-cyan-950 text-cyan-400 font-bold">
        <span>&gt;_</span>
        <span className="text-white text-[8px]">bash ~ nk-mern-cli</span>
      </div>
      <div className="space-y-1">
        <div className="text-cyan-300 truncate">
          $ npx nk-mern-cli init
        </div>
        <div className="text-slate-400 text-[8px]">
          + server/ (Express, Mongoose)
        </div>
        <div className="text-slate-400 text-[8px]">
          + client/ (React 18, Vite)
        </div>
        <div className="text-emerald-400 font-bold text-[8px] flex items-center gap-1">
          <span>✔</span>
          <span>Docker CI/CD Ready</span>
        </div>
      </div>
    </div>

    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9px] font-mono text-cyan-400/90">
      <span>DEVELOPER SYSTEM</span>
      <span className="text-cyan-300">NODE.JS</span>
    </div>
  </div>
);
