import React from 'react';
import { motion } from 'motion/react';
import { GENOME_PROJECTS, GenomeProject } from './genomeData';

export interface ProjectSelectorProps {
  activeProjectId: string;
  onSelectProject: (projectId: string) => void;
  isTransitioning?: boolean;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  activeProjectId,
  onSelectProject,
  isTransitioning = false,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center mt-6 mb-2 select-none px-2 sm:px-4">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f5ff]" />
        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-cyan-300 uppercase">
          PROJECT SELECTOR &bull; NANDHAKUMAR UNIVERSE
        </span>
      </div>

      {/* PROJECT SELECTOR NODES GRID */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {GENOME_PROJECTS.map((proj) => {
          const isActive = activeProjectId === proj.id;

          return (
            <button
              key={proj.id}
              disabled={isTransitioning}
              onClick={() => onSelectProject(proj.id)}
              className={`group relative p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                isActive
                  ? 'bg-[#02132e]/95 border-cyan-400 shadow-[0_0_20px_rgba(0,245,255,0.35)] scale-[1.02]'
                  : 'bg-[#010918]/80 border-cyan-500/20 hover:border-cyan-400/60 hover:bg-[#020e24]/90'
              }`}
            >
              {/* Active Ambient Glow Background */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-sky-400/10 pointer-events-none" />
              )}

              {/* Top Row: Number & Status Indicator */}
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[10px] sm:text-xs font-mono font-extrabold tracking-wider ${
                    isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-200'
                  }`}
                >
                  {proj.number}
                </span>

                <span
                  className={`w-2 h-2 rounded-full transition-transform ${
                    isActive
                      ? 'bg-cyan-400 shadow-[0_0_8px_#00f5ff] scale-125'
                      : 'bg-slate-700 group-hover:bg-cyan-500/50'
                  }`}
                />
              </div>

              {/* Title & Category */}
              <div>
                <h4
                  className={`text-xs sm:text-sm font-extrabold font-mono tracking-tight truncate ${
                    isActive
                      ? 'text-white drop-shadow-[0_0_8px_#00f5ff]'
                      : 'text-slate-200 group-hover:text-cyan-100'
                  }`}
                >
                  {proj.shortName}
                </h4>
                <p className="text-[9px] font-mono tracking-wider text-slate-400 truncate mt-0.5">
                  {proj.category}
                </p>
              </div>

              {/* Bottom Active Notch Accent Line */}
              {isActive && (
                <motion.div
                  layoutId="activeSelectorLine"
                  className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#00f5ff]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectSelector;
