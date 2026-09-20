import React from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ProjectItem } from '../../../data/projectsData';

interface ObservatoryDockProps {
  projects: ProjectItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  isTransitioning?: boolean;
}

export const ObservatoryDock: React.FC<ObservatoryDockProps> = ({
  projects,
  currentIndex,
  onSelectIndex,
  onPrev,
  onNext,
  isTransitioning = false,
}) => {
  return (
    <div
      id="project-selector-dock"
      className="w-full max-w-5xl mx-auto px-2 sm:px-4 flex flex-col items-center gap-2 select-none"
    >
      {/* Selector Container */}
      <div className="w-full flex items-center justify-between gap-2 sm:gap-3">
        {/* PREVIOUS BUTTON */}
        <button
          type="button"
          onClick={onPrev}
          disabled={isTransitioning}
          className="group min-h-[44px] px-3 sm:px-4 py-2 rounded-xl bg-slate-950/85 border border-slate-800 hover:border-cyan-400/80 flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold tracking-wider text-slate-300 hover:text-cyan-300 transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(0,0,0,0.5)] shrink-0"
          aria-label="Previous Project"
        >
          <ChevronLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">← PREVIOUS</span>
          <span className="sm:hidden">PREV</span>
        </button>

        {/* 5 PROJECT SELECTOR PILLS */}
        <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2.5 overflow-x-auto py-1 scrollbar-none">
          {projects.map((proj, idx) => {
            const isSelected = idx === currentIndex;
            const accent = proj.themeColor || proj.accentColor || '#00f5ff';

            // Clean short name for selector
            let displayName = 'SWAYAM';
            if (proj.id === 'speed-taxi') displayName = 'SPEED TAXI';
            else if (proj.id === 'wildlife-ai') displayName = 'AI WILDLIFE';
            else if (proj.id === 'resume-forge') displayName = 'RESUME FORGE';
            else if (proj.id === 'nk-mern-cli') displayName = 'NK MERN CLI';

            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => onSelectIndex(idx)}
                disabled={isTransitioning}
                className={`group relative min-h-[44px] px-2.5 sm:px-3.5 py-1.5 rounded-xl transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer border whitespace-nowrap ${
                  isSelected
                    ? 'bg-slate-900/95 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,245,255,0.45)] scale-105 z-10'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700 opacity-60 hover:opacity-90'
                } disabled:cursor-not-allowed`}
              >
                {/* Number Badge */}
                <span
                  className={`text-[10px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-900 text-slate-500'
                  }`}
                >
                  {proj.doorNumber}
                </span>

                {/* Project Title */}
                <span className="text-[11px] sm:text-xs font-bold tracking-wide">
                  {displayName}
                </span>

                {/* Active Glow Dot */}
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff] animate-pulse ml-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* NEXT PROJECT BUTTON */}
        <button
          type="button"
          onClick={onNext}
          disabled={isTransitioning}
          className="group min-h-[44px] px-3 sm:px-4 py-2 rounded-xl bg-slate-950/85 border border-slate-800 hover:border-cyan-400/80 flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold tracking-wider text-slate-300 hover:text-cyan-300 transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(0,0,0,0.5)] shrink-0"
          aria-label="Next Project"
        >
          <span className="hidden sm:inline">NEXT PROJECT →</span>
          <span className="sm:hidden">NEXT</span>
          <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Subtle Keyboard & Interaction Help */}
      <div className="hidden md:flex items-center gap-4 text-[9px] font-mono tracking-widest text-slate-500 mt-0.5">
        <span>PRESS [← / →] TO CYCLE PROJECTS</span>
        <span>•</span>
        <span>PRESS [1-5] FOR DIRECT TRAVEL</span>
      </div>
    </div>
  );
};
