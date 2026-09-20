import React from 'react';
import { ChevronLeft, ChevronRight, Mouse, ChevronDown } from 'lucide-react';
import { ProjectItem } from '../../../data/projectsData';

interface ProjectNavigationProps {
  currentIndex: number;
  totalProjects: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
  className?: string;
}

export const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  currentIndex,
  totalProjects,
  onPrev,
  onNext,
  onSelectIndex,
  className = '',
}) => {
  return (
    <div
      id="arena-environment-navigation"
      className={`absolute inset-0 pointer-events-none z-30 select-none overflow-hidden ${className}`}
    >
      {/* 1. Left Quote & Ambient Labels (Matching Reference Image) */}
      <div className="absolute top-24 left-6 lg:left-12 max-w-[280px] space-y-2 hidden md:block">
        <p className="font-serif italic text-sm text-slate-300 leading-snug">
          &ldquo;Turning ideas into real solutions for a better tomorrow.&rdquo;
        </p>
        <p className="text-xs font-mono text-cyan-400 font-semibold tracking-wider">
          &mdash; Nandhakumar
        </p>
      </div>

      {/* Ambient Side Labels: Left */}
      <div className="absolute top-1/2 -translate-y-12 left-4 lg:left-8 space-y-1 font-mono text-[9px] text-slate-500 hidden xl:block">
        <div className="text-slate-400 font-bold">REAL</div>
        <div className="text-slate-400 font-bold">PROJECTS</div>
        <div className="text-slate-400 font-bold">REAL</div>
        <div className="text-cyan-400 font-bold">IMPACT</div>
      </div>

      {/* 2. Right Telemetry List & Ambient Labels (Matching Reference Image) */}
      <div className="absolute top-24 right-6 lg:right-12 space-y-2 hidden md:flex flex-col items-end">
        <div className="flex items-center gap-3 text-right">
          <div className="flex flex-col gap-1 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
            <span className="text-cyan-300 font-bold">EXPLORE</span>
            <span>INTERACT</span>
            <span>DISCOVER</span>
            <span>GET INSPIRED</span>
          </div>
          {/* Vertical Cyan Track */}
          <div className="w-[2px] h-16 bg-slate-800 rounded-full relative">
            <div className="w-1.5 h-3 -left-0.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff] absolute top-1" />
          </div>
        </div>
      </div>

      {/* Ambient Side Labels: Right */}
      <div className="absolute top-1/2 -translate-y-12 right-4 lg:right-8 space-y-1 font-mono text-[9px] text-slate-500 text-right hidden xl:block">
        <div className="text-slate-400 font-bold">BUILD</div>
        <div className="text-slate-400 font-bold">SOLVE</div>
        <div className="text-slate-400 font-bold">INNOVATE</div>
        <div className="text-cyan-400 font-bold">REPEAT</div>
      </div>

      {/* 3. Floating Left Arrow Button */}
      <div className="absolute top-[42%] left-4 sm:left-8 lg:left-14 pointer-events-auto">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous Project"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#070f20]/85 hover:bg-[#0c1a36] border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* 4. Floating Right Arrow Button */}
      <div className="absolute top-[42%] right-4 sm:right-8 lg:right-14 pointer-events-auto">
        <button
          type="button"
          onClick={onNext}
          aria-label="Next Project"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#070f20]/85 hover:bg-[#0c1a36] border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* 5. Bottom Horizon Bar (Matching Reference Image) */}
      <div className="absolute bottom-3 inset-x-6 sm:inset-x-12 flex items-center justify-between text-[10px] font-mono text-slate-400 pointer-events-auto">
        {/* Left: Scroll to explore */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-6 rounded-full border border-cyan-400/60 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
          </div>
          <span className="tracking-widest uppercase hidden sm:inline">
            SCROLL TO EXPLORE THE STORY
          </span>
        </div>

        {/* Center: Real Projects Tagline */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-xs font-serif italic text-slate-300 tracking-wide">
            &ldquo;Real Projects. Real Learning. Real Impact.&rdquo;
          </div>
          <ChevronDown className="w-3 h-3 text-cyan-400 animate-pulse" />
        </div>

        {/* Right: Telemetry Pager 01 / 05 with dots */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-cyan-400">
            0{currentIndex + 1} / 0{totalProjects}
          </span>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalProjects }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectIndex(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'w-4 bg-cyan-400 shadow-[0_0_8px_#00f5ff]'
                    : 'bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
