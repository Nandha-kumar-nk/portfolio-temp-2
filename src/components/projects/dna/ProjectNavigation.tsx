import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectItem } from '../../../data/projectsData';

interface ProjectNavigationProps {
  currentProject: ProjectItem;
  allProjects?: ProjectItem[];
  onSelectProject?: (id: string) => void;
  className?: string;
}

export const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  currentProject,
  allProjects = [],
  onSelectProject,
  className = '',
}) => {
  const currentIndex = allProjects.findIndex((p) => p.id === currentProject.id);
  const activeIdx = currentIndex >= 0 ? currentIndex : 0;
  const total = allProjects.length > 0 ? allProjects.length : 5;

  const handlePrev = () => {
    if (!onSelectProject || allProjects.length === 0) return;
    const prevIdx = (activeIdx - 1 + allProjects.length) % allProjects.length;
    onSelectProject(allProjects[prevIdx].id);
  };

  const handleNext = () => {
    if (!onSelectProject || allProjects.length === 0) return;
    const nextIdx = (activeIdx + 1) % allProjects.length;
    onSelectProject(allProjects[nextIdx].id);
  };

  return (
    <div
      id="project-navigation-strip"
      className={`inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 rounded-full bg-[#070d1a]/90 border border-slate-700/80 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.6)] select-none pointer-events-auto ${className}`}
    >
      {/* Previous Arrow */}
      <button
        type="button"
        onClick={handlePrev}
        className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
        aria-label="Previous project"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Index and Title Capsule */}
      <div className="flex items-center gap-2 px-1 sm:px-2">
        <span className="text-[10px] sm:text-xs font-mono text-cyan-400 font-bold tracking-widest">
          {String(activeIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>

        <span className="text-slate-600 font-mono text-xs">|</span>

        <span className="text-xs font-bold text-white tracking-wider font-sans truncate max-w-[120px] sm:max-w-[180px]">
          {currentProject.title}
        </span>

        {/* Category Pill */}
        <span className="hidden sm:inline-block text-[9px] font-mono text-cyan-300/80 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 truncate">
          {currentProject.categoryName || currentProject.category}
        </span>
      </div>

      {/* Next Arrow */}
      <button
        type="button"
        onClick={handleNext}
        className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
        aria-label="Next project"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
