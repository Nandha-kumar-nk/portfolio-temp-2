import React from 'react';
import { motion } from 'framer-motion';
import { ProjectItem } from '../../../data/projectsData';

interface ArchiveSelectorBarProps {
  projects: ProjectItem[];
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const ArchiveSelectorBar: React.FC<ArchiveSelectorBarProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-2 z-20 font-mono">
      {/* Desktop / Laptop Horizontal Cards Container */}
      <div className="hidden md:grid md:grid-cols-5 gap-3 items-stretch">
        {projects.map((proj, idx) => {
          const isSelected = proj.id === selectedProjectId;
          const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

          return (
            <motion.button
              key={proj.id}
              onClick={() => onSelectProject(proj.id)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`relative flex flex-col justify-between p-3 rounded-xl border text-left transition-all duration-300 backdrop-blur-xl overflow-hidden cursor-pointer group ${
                isSelected
                  ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_25px_rgba(0,245,255,0.3)] scale-[1.02] z-10'
                  : 'bg-slate-950/60 border-cyan-900/40 text-slate-400 hover:border-cyan-600/70 hover:bg-slate-900/70 hover:text-slate-200 opacity-75 hover:opacity-100'
              }`}
            >
              {/* Corner Tech Accents */}
              <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-cyan-400/60 pointer-events-none" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-cyan-400/60 pointer-events-none" />

              {/* Top Row: Number & Badge */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-bold ${
                    isSelected ? 'text-cyan-400' : 'text-slate-500'
                  }`}
                >
                  {numStr}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 bg-slate-900/80 border border-slate-800 px-1.5 py-0.5 rounded">
                  {proj.shortName}
                </span>
              </div>

              {/* Thumbnail Container */}
              <div className="relative w-full h-16 rounded-lg overflow-hidden border border-cyan-900/50 my-1 bg-black">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              </div>

              {/* Bottom Info */}
              <div className="mt-1">
                <h4
                  className={`text-xs font-bold uppercase truncate transition-colors ${
                    isSelected ? 'text-cyan-300' : 'text-slate-300'
                  }`}
                >
                  {proj.title}
                </h4>
                <p className="text-[10px] text-slate-400 truncate">
                  {proj.categoryName}
                </p>
              </div>

              {/* Active Glow Line */}
              {isSelected && (
                <motion.div
                  layoutId="activeBarHorizontal"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(0,245,255,0.8)]"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Mobile Horizontal Selector ScrollBar */}
      <div className="md:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
        {projects.map((proj, idx) => {
          const isSelected = proj.id === selectedProjectId;
          const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

          return (
            <button
              key={proj.id}
              onClick={() => onSelectProject(proj.id)}
              className={`snap-center flex items-center gap-2 p-2.5 rounded-xl border shrink-0 transition-all cursor-pointer font-mono text-left ${
                isSelected
                  ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,245,255,0.3)]'
                  : 'bg-slate-950/70 border-cyan-900/40 text-slate-400'
              }`}
            >
              <div className="w-8 h-8 rounded-md overflow-hidden border border-cyan-800 shrink-0">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-cyan-400">
                    {numStr}
                  </span>
                  <span className="text-xs font-bold uppercase text-slate-200">
                    {proj.shortName}
                  </span>
                </div>
                <p className="text-[9px] text-slate-400 truncate">
                  {proj.categoryName}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
