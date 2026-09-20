import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectNavigationProps {
  currentIndex: number;
  totalProjects: number;
  onPrevious: () => void;
  onNext: () => void;
  disabled?: boolean;
  className?: string;
}

export const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  currentIndex,
  totalProjects,
  onPrevious,
  onNext,
  disabled = false,
  className = '',
}) => {
  // Global keyboard shortcuts: ArrowLeft / ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, onPrevious, onNext]);

  const currentFormatted = String(currentIndex + 1).padStart(2, '0');
  const totalFormatted = String(totalProjects).padStart(2, '0');

  return (
    <div className={`flex items-center justify-center gap-4 sm:gap-6 ${className}`}>
      {/* Previous Button */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={disabled}
        className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-800 bg-slate-950/70 hover:bg-slate-900/90 hover:border-cyan-400/60 text-slate-400 hover:text-cyan-300 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none active:scale-95"
        aria-label="Previous project"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase">
          PREVIOUS
        </span>
      </button>

      {/* Index Counter */}
      <div className="flex items-center gap-1 font-mono text-sm sm:text-base font-bold tracking-widest px-3 py-1 rounded-lg bg-slate-950/60 border border-slate-800/80">
        <span className="text-cyan-400">{currentFormatted}</span>
        <span className="text-slate-600">/</span>
        <span className="text-slate-400">{totalFormatted}</span>
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-800 bg-slate-950/70 hover:bg-slate-900/90 hover:border-cyan-400/60 text-slate-400 hover:text-cyan-300 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none active:scale-95"
        aria-label="Next project"
      >
        <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase">
          NEXT
        </span>
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};
