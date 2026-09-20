import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectItem } from '../../../data/projectsData';

interface ProjectVoyageNavDockProps {
  projects: ProjectItem[];
  currentIndex: number;
  isTransitioning: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

export const ProjectVoyageNavDock: React.FC<ProjectVoyageNavDockProps> = ({
  projects,
  currentIndex,
  isTransitioning,
  onPrev,
  onNext,
  onSelectIndex,
}) => {
  const currentProject = projects[currentIndex] || projects[0];
  const totalProjects = projects.length;
  const isLastProject = currentIndex === totalProjects - 1;

  return (
    <div
      id="project-voyage-nav-dock"
      className="w-full max-w-2xl mx-auto flex flex-col items-center mt-10 pb-8 px-4 select-none z-20"
    >
      {/* Dock Navigation Strip */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 px-3 py-2 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.6)] w-full max-w-md">
        <button
          type="button"
          onClick={onPrev}
          disabled={isTransitioning || currentIndex === 0}
          aria-label="Previous Project"
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-mono font-bold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 disabled:opacity-30 transition-all cursor-pointer min-h-[38px]"
        >
          <ChevronUp className="w-4 h-4 text-cyan-400 hidden sm:inline" />
          <ChevronLeft className="w-4 h-4 text-cyan-400 sm:hidden" />
          <span className="hidden sm:inline">PREV</span>
        </button>

        {/* Project Number Badges */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {projects.map((p, idx) => {
            const isCurrent = idx === currentIndex;
            const doorNumber = p.doorNumber || `0${idx + 1}`;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectIndex(idx)}
                disabled={isTransitioning}
                aria-label={`Go to project ${doorNumber}`}
                className={`transition-all duration-300 rounded-xl flex items-center justify-center cursor-pointer min-h-[36px] min-w-[36px] ${
                  isCurrent
                    ? 'w-8 h-8 text-xs font-mono font-bold bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,245,255,0.6)] scale-110'
                    : 'w-7 h-7 text-[11px] font-mono text-slate-500 border border-slate-800 bg-slate-900/80 hover:text-slate-200'
                }`}
              >
                {doorNumber}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={isTransitioning || isLastProject}
          aria-label="Next Project"
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-mono font-bold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 disabled:opacity-30 transition-all cursor-pointer min-h-[38px]"
        >
          <span className="hidden sm:inline">NEXT</span>
          <ChevronDown className="w-4 h-4 text-cyan-400 hidden sm:inline" />
          <ChevronRight className="w-4 h-4 text-cyan-400 sm:hidden" />
        </button>
      </div>

      {/* Current Active Label */}
      <div className="mt-2 text-center">
        <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-400 uppercase font-semibold">
          ACTIVE VOYAGE: {currentProject.shortName || currentProject.title}
        </span>
      </div>

      {/* Ending Journey Section Message (When on last project or bottom footer) */}
      <div className="mt-12 text-center pt-8 border-t border-slate-800/80 w-full max-w-lg">
        <div className="text-[11px] font-mono tracking-[0.28em] text-cyan-400 font-bold uppercase mb-1">
          05 / 05 • THE JOURNEY CONTINUES.
        </div>
        <div className="text-sm font-sans font-black tracking-wider text-white uppercase drop-shadow-[0_0_15px_rgba(0,245,255,0.2)]">
          NANDHAKUMAR UNIVERSE
        </div>
        <div className="text-xs font-mono tracking-widest text-slate-400 uppercase mt-1">
          IDEAS • CODE • CREATE • IMPACT
        </div>
      </div>
    </div>
  );
};
