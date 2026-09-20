import React from 'react';
import { ProjectItem } from '../../../data/projectsData';

interface ProjectPlatformProps {
  activeProject: ProjectItem;
  className?: string;
}

export const ProjectPlatform: React.FC<ProjectPlatformProps> = ({
  activeProject,
  className = '',
}) => {
  return (
    <div
      id="arena-central-platform"
      className={`relative flex flex-col items-center select-none pointer-events-none ${className}`}
    >
      {/* 1. Concentric Floor Glow & Radial Energy Conduits */}
      <div className="absolute -bottom-10 w-[550px] sm:w-[680px] lg:w-[820px] h-32 rounded-[100%] bg-cyan-500/15 blur-3xl pointer-events-none" />

      {/* 2. Concentric Ring Pedestal System */}
      <div className="relative flex flex-col items-center">
        {/* Tier 1: Widest Lower Obsidian Platform Ring */}
        <div className="w-80 sm:w-[480px] lg:w-[580px] h-10 sm:h-12 rounded-[100%] bg-gradient-to-b from-[#0e1726] to-[#040812] border-2 border-cyan-500/40 shadow-[0_0_35px_rgba(0,245,255,0.35)] relative flex items-center justify-center overflow-hidden">
          {/* Animated Light Strips / Moving Ticks */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,245,255,0.35),transparent_70%)] animate-pulse" />
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
          
          {/* Subtle Stepped Ring Bevel */}
          <div className="w-[90%] h-[75%] rounded-[100%] border border-cyan-400/30 bg-[#070d1a]" />
        </div>

        {/* Tier 2: Stepped Metallic Cylinder Base with Glowing Plaque */}
        <div className="relative -mt-6 sm:-mt-8 z-10 flex flex-col items-center">
          {/* Front Illuminated 3D Project Plaque */}
          <div className="px-6 sm:px-10 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-b from-[#091224]/95 to-[#040812]/98 border-2 border-cyan-400/70 shadow-[0_0_25px_rgba(0,245,255,0.5)] backdrop-blur-md flex flex-col items-center min-w-[240px] sm:min-w-[320px] transition-all duration-700">
            {/* Project Title */}
            <div className="text-base sm:text-lg lg:text-xl font-black tracking-widest text-white uppercase font-sans drop-shadow-[0_0_12px_rgba(0,245,255,0.8)]">
              {activeProject.title}
            </div>
            {/* Project Tagline */}
            <div className="text-[11px] sm:text-xs font-serif italic text-cyan-300 font-medium tracking-wide">
              &ldquo;{activeProject.tagline}&rdquo;
            </div>
            {/* Neon Conduit line underneath title */}
            <div className="w-16 h-[2px] bg-cyan-400 mt-1 rounded-full shadow-[0_0_8px_#00f5ff]" />
          </div>

          {/* Radial Glowing Conduit Lines leading down to bottom story objects */}
          <div className="w-full max-w-sm h-6 flex items-center justify-between px-6 opacity-60">
            <div className="w-1/3 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <div className="w-1/3 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};
