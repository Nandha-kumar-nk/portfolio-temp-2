import React from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectScreen } from './ProjectScreens';
import { PROJECT_THEMES } from './types';

interface CentralProjectDisplayProps {
  project: ProjectItem;
  className?: string;
  isTransitioning?: boolean;
}

export const CentralProjectDisplay: React.FC<CentralProjectDisplayProps> = ({
  project,
  className = '',
  isTransitioning = false,
}) => {
  const theme = PROJECT_THEMES[project.id] || PROJECT_THEMES['swayam-2'];

  return (
    <div
      id="central-project-hero-display"
      className={`relative z-20 flex flex-col items-center transition-all duration-700 select-none ${
        isTransitioning ? 'scale-95 opacity-70 blur-[1px]' : 'scale-100 opacity-100 blur-none'
      } ${className}`}
      style={{
        perspective: '1200px',
      }}
    >
      {/* Volumetric Halo behind the screen */}
      <div
        className="absolute inset-0 rounded-3xl blur-3xl pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.glow} 0%, transparent 70%)`,
          opacity: 0.45,
          transform: 'scale(1.25)',
        }}
      />

      {/* Floating 3D Holographic Display Chassis */}
      <div
        className="relative w-full max-w-[620px] lg:max-w-[700px] xl:max-w-[760px] aspect-[16/10] rounded-2xl p-2 sm:p-2.5 transition-transform duration-500 hover:rotate-x-1"
        style={{
          transform: 'rotateX(5deg) translateZ(20px)',
          background: 'linear-gradient(135deg, rgba(14,24,42,0.95) 0%, rgba(6,12,24,0.98) 100%)',
          boxShadow: `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 35px ${theme.glow}`,
          border: `1.5px solid ${theme.primary}`,
        }}
      >
        {/* Holographic Header Bar inside screen */}
        <div className="w-full px-3 py-1.5 rounded-t-xl bg-[#081020]/95 border-b border-cyan-500/30 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            {/* Number badge */}
            <span
              className="px-2 py-0.5 rounded-md font-bold text-[10px] tracking-wider"
              style={{
                backgroundColor: 'rgba(0, 245, 255, 0.15)',
                color: theme.primary,
                border: `1px solid ${theme.primary}`,
              }}
            >
              {project.doorNumber}
            </span>
            <span className="font-extrabold text-white text-xs sm:text-sm tracking-wide font-sans">
              {project.title}
            </span>
            <span className="hidden sm:inline text-slate-400 text-[11px] font-sans">
              &bull; {project.tagline}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px]">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.primary }} />
            <span className="text-slate-300 font-bold uppercase tracking-wider">ACTIVE DISPLAY</span>
          </div>
        </div>

        {/* Display Screen Viewport */}
        <div className="relative w-full h-[calc(100%-2.25rem)] rounded-b-xl overflow-hidden bg-slate-950 border border-slate-800/80">
          <ProjectScreen projectId={project.id} />

          {/* Specular Diagonal Glass Glare */}
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-80"
            style={{
              transform: 'skewX(-20deg) translateX(15%)',
            }}
          />

          {/* Holographic Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,245,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-60" />
        </div>

        {/* Ambient Corner Accents */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-300 rounded-tl-sm pointer-events-none" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-300 rounded-tr-sm pointer-events-none" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-300 rounded-bl-sm pointer-events-none" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-300 rounded-br-sm pointer-events-none" />
      </div>

      {/* Realistic Ground Shadow onto Platform */}
      <div
        className="w-4/5 h-8 -mt-2 rounded-[100%] bg-black/95 blur-xl pointer-events-none"
        style={{ transform: 'scaleY(0.4)' }}
      />
    </div>
  );
};
