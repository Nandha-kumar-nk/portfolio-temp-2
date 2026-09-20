import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectItem } from '../../data/projectsData';
import { getProjectScreenshotUri } from './projector/ProjectScreenshots';

interface FilmReelStripProps {
  projects: ProjectItem[];
  currentIndex: number;
  onSelectProject: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  disabled?: boolean;
  isMobile?: boolean;
}

export const FilmReelStrip: React.FC<FilmReelStripProps> = ({
  projects,
  currentIndex,
  onSelectProject,
  onPrev,
  onNext,
  disabled = false,
  isMobile = false,
}) => {
  // Re-order display items in the visual sequence of the reference:
  // [05 (idx 4), 01 (idx 0), 02 (idx 1), 03 (idx 2), 04 (idx 3)]
  // We can render all 5 projects with active index highlighted
  return (
    <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 my-3 select-none">
      {/* Background Curved Stage Arc Glow */}
      <div className="absolute inset-x-8 -top-6 h-12 bg-radial from-cyan-500/15 via-transparent to-transparent blur-xl pointer-events-none" />

      <div className="relative flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={onPrev}
          disabled={disabled}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#050b16]/90 border border-cyan-500/40 hover:border-cyan-400 flex items-center justify-center text-cyan-400 hover:text-white shadow-[0_0_15px_rgba(0,245,255,0.25)] hover:shadow-[0_0_22px_rgba(0,245,255,0.6)] transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none active:scale-95 shrink-0 z-10"
          aria-label="Previous project film frame"
        >
          <ChevronLeft className="w-5 h-5 transition-transform hover:-translate-x-0.5" />
        </button>

        {/* Film Strip Frames Container */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto py-3 px-2 no-scrollbar">
          {projects.map((proj, idx) => {
            const isSelected = idx === currentIndex;
            const screenshotUri = getProjectScreenshotUri(proj.id);

            // On mobile, show only active item or 1 previous + active + 1 next
            if (isMobile && !isSelected) {
              return null;
            }

            return (
              <div
                key={proj.id}
                onClick={() => !disabled && onSelectProject(idx)}
                className={`group relative flex flex-col rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'w-[190px] sm:w-[220px] md:w-[240px] scale-105 z-20 ring-2 ring-cyan-400 shadow-[0_0_30px_rgba(0,245,255,0.55)] bg-slate-900/90'
                    : 'w-[140px] sm:w-[170px] md:w-[190px] opacity-60 hover:opacity-90 border border-slate-800/80 hover:border-cyan-500/40 bg-slate-950/70 hover:scale-[1.02]'
                }`}
              >
                {/* Cinematic Film Perforations (Top & Bottom Track) */}
                <div className="flex justify-between items-center px-2 py-1 bg-[#030712] border-b border-slate-800/60">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1 rounded-sm bg-slate-700/60" />
                    <span className="w-1.5 h-1 rounded-sm bg-slate-700/60" />
                    <span className="w-1.5 h-1 rounded-sm bg-slate-700/60" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {proj.doorNumber}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1 rounded-sm bg-slate-700/60" />
                    <span className="w-1.5 h-1 rounded-sm bg-slate-700/60" />
                    <span className="w-1.5 h-1 rounded-sm bg-slate-700/60" />
                  </div>
                </div>

                {/* Project Screenshot Thumbnail */}
                <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
                  <img
                    src={screenshotUri}
                    alt={proj.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050b16] via-transparent to-transparent opacity-80" />

                  {/* Active Door Number Badge */}
                  <div
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-black ${
                      isSelected
                        ? 'bg-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(0,245,255,0.8)]'
                        : 'bg-slate-900/80 text-slate-400 border border-slate-700/60'
                    }`}
                  >
                    {proj.doorNumber}
                  </div>
                </div>

                {/* Caption Footer */}
                <div className="p-2 sm:p-2.5 flex flex-col bg-[#050b16]/95 border-t border-slate-800/80">
                  <div className="text-[11px] sm:text-xs font-black tracking-wider text-white uppercase truncate">
                    {proj.title}
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase truncate">
                    {proj.category}
                  </div>
                </div>

                {/* Bottom Film Perforation Strip */}
                <div className="flex justify-between items-center px-2 py-1 bg-[#030712] border-t border-slate-800/60">
                  <span className="w-1.5 h-1 rounded-sm bg-slate-700/60" />
                  <span className="w-1.5 h-1 rounded-sm bg-slate-700/60" />
                  <span className="w-1.5 h-1 rounded-sm bg-slate-700/60" />
                  <span className="w-1.5 h-1 rounded-sm bg-slate-700/60" />
                  <span className="w-1.5 h-1 rounded-sm bg-slate-700/60" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={onNext}
          disabled={disabled}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#050b16]/90 border border-cyan-500/40 hover:border-cyan-400 flex items-center justify-center text-cyan-400 hover:text-white shadow-[0_0_15px_rgba(0,245,255,0.25)] hover:shadow-[0_0_22px_rgba(0,245,255,0.6)] transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none active:scale-95 shrink-0 z-10"
          aria-label="Next project film frame"
        >
          <ChevronRight className="w-5 h-5 transition-transform hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
