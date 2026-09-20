import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectItem } from '../../../data/projectsData';

interface ProjectSelectorBarProps {
  projects: ProjectItem[];
  currentIndex: number;
  onSelectProject: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ProjectSelectorBar: React.FC<ProjectSelectorBarProps> = ({
  projects,
  currentIndex,
  onSelectProject,
  onNext,
  onPrev,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
      {/* Prev Button */}
      <button
        onClick={onPrev}
        className="group flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono font-bold tracking-wider hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-950/40 transition-all duration-300 active:scale-95 shadow-md"
      >
        <ChevronLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
        <span>PREV</span>
      </button>

      {/* Chapter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full no-scrollbar">
        {projects.map((proj, idx) => {
          const isActive = idx === currentIndex;
          const num = String(idx + 1).padStart(2, '0');

          return (
            <button
              key={proj.id}
              onClick={() => onSelectProject(idx)}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-xs transition-all duration-300 whitespace-nowrap active:scale-95 ${
                isActive
                  ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,245,255,0.25)] font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span className={isActive ? 'text-cyan-400' : 'text-slate-500'}>
                {num}
              </span>
              <span>{proj.shortName}</span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'
                }`}
              />

              {isActive && (
                <div className="absolute -bottom-1 left-2 right-2 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#00f5ff]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="group flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono font-bold tracking-wider hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-950/40 transition-all duration-300 active:scale-95 shadow-md"
      >
        <span>NEXT</span>
        <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
