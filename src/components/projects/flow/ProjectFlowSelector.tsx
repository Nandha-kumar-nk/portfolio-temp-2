import React from 'react';
import { motion } from 'framer-motion';
import { ProjectItem } from '../../../data/projectsData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectFlowSelectorProps {
  projects: ProjectItem[];
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
  onPrevProject: () => void;
  onNextProject: () => void;
}

export const ProjectFlowSelector: React.FC<ProjectFlowSelectorProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onPrevProject,
  onNextProject,
}) => {
  return (
    <nav className="w-full max-w-5xl mx-auto px-4 my-4 z-30 font-mono">
      {/* Desktop & Tablet Node Selectors */}
      <div className="hidden sm:flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950/85 border border-cyan-500/35 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,245,255,0.15)]">
        {/* Prev Arrow */}
        <button
          onClick={onPrevProject}
          className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-800/60 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950 transition-colors cursor-pointer shrink-0"
          title="Previous Project (Arrow Left)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* 5 Node Points */}
        <div className="flex-1 grid grid-cols-5 gap-2 items-center">
          {projects.map((proj, idx) => {
            const isSelected = proj.id === selectedProjectId;
            const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

            return (
              <button
                key={proj.id}
                onClick={() => onSelectProject(proj.id)}
                className={`relative flex items-center justify-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,245,255,0.4)] scale-102 z-10'
                    : 'bg-slate-900/50 border-cyan-900/30 text-slate-400 hover:border-cyan-600/60 hover:text-slate-200'
                }`}
              >
                {/* Node Particle Glowing Point */}
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  {isSelected && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                      isSelected
                        ? 'bg-cyan-400 shadow-[0_0_10px_#00f5ff]'
                        : 'bg-slate-600'
                    }`}
                  />
                </span>

                <div className="flex items-center gap-1.5 min-w-0 truncate">
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-cyan-300' : 'text-slate-500'
                    }`}
                  >
                    {numStr}
                  </span>
                  <span className="text-xs font-black uppercase truncate">
                    {proj.shortName}
                  </span>
                </div>

                {/* Selected Active Ring */}
                {isSelected && (
                  <motion.div
                    layoutId="activeFlowPulse"
                    className="absolute inset-0 rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.6)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Next Arrow */}
        <button
          onClick={onNextProject}
          className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-800/60 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950 transition-colors cursor-pointer shrink-0"
          title="Next Project (Arrow Right)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Selector Bar */}
      <div className="sm:hidden flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={onPrevProject}
            className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-cyan-800/60 text-cyan-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>PREV</span>
          </button>

          <span className="text-[10px] text-cyan-400/80 tracking-widest font-bold uppercase">
            ← SWIPE TO CHANGE →
          </span>

          <button
            onClick={onNextProject}
            className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-cyan-800/60 text-cyan-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Mobile Node Markers */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
          {projects.map((proj, idx) => {
            const isSelected = proj.id === selectedProjectId;
            const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

            return (
              <button
                key={proj.id}
                onClick={() => onSelectProject(proj.id)}
                className={`snap-center shrink-0 px-3 py-1.5 rounded-xl border text-xs font-bold uppercase cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,245,255,0.4)]'
                    : 'bg-slate-950/80 border-cyan-900/40 text-slate-400'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-cyan-400 shadow-[0_0_8px_#00f5ff]' : 'bg-slate-600'
                  }`}
                />
                <span className="text-cyan-400">{numStr}</span>
                <span>{proj.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
