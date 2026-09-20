import React from 'react';
import { ProjectItem } from '../../../data/projectsData';

interface CrystalFallbackProps {
  project: ProjectItem;
  isMobile?: boolean;
}

export const CrystalFallback: React.FC<CrystalFallbackProps> = ({ project, isMobile = false }) => {
  return (
    <div
      id="crystal-archive-fallback-card"
      className="relative w-full h-full flex flex-col items-center justify-center p-4 select-none"
    >
      {/* Outer ambient glow */}
      <div
        className="absolute w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: project.accentColor }}
      />

      {/* Futuristic 2D/SVG Crystal Silhouette */}
      <div className="relative z-10 flex flex-col items-center">
        <svg
          width={isMobile ? '120' : '150'}
          height={isMobile ? '160' : '200'}
          viewBox="0 0 100 130"
          className="drop-shadow-[0_0_25px_rgba(0,245,255,0.35)]"
        >
          {/* Base facet background */}
          <polygon
            points="50,5 88,40 88,90 50,125 12,90 12,40"
            fill="#061224"
            stroke={project.accentColor}
            strokeWidth="1.8"
            strokeOpacity="0.85"
          />
          {/* Inner facet lines */}
          <polygon
            points="50,5 50,125"
            stroke={project.accentColor}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <polygon
            points="12,40 50,65 88,40"
            fill="none"
            stroke={project.accentColor}
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          <polygon
            points="12,90 50,65 88,90"
            fill="none"
            stroke={project.accentColor}
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          {/* Core glow */}
          <circle
            cx="50"
            cy="65"
            r="14"
            fill={project.accentColor}
            fillOpacity="0.4"
            className="animate-pulse"
          />
          <circle cx="50" cy="65" r="7" fill="#ffffff" fillOpacity="0.9" />
        </svg>

        {/* Circular pedestal */}
        <div
          className="w-32 h-2.5 rounded-full mt-2 border border-slate-700 bg-slate-900/80 shadow-[0_0_15px_rgba(0,245,255,0.2)]"
          style={{ borderColor: `${project.accentColor}66` }}
        />
      </div>
    </div>
  );
};
