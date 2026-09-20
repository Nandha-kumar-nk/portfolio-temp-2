import React, { useRef } from 'react';
import { ProjectItem, ProjectCategory } from '../../../data/projectsData';
import { ExhibitionProjectDoor } from './ExhibitionProjectDoor';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TabletExhibitionViewProps {
  projects: ProjectItem[];
  selectedProjectId: string;
  hoveredProjectId: string | null;
  onHoverProject: (id: string | null) => void;
  onSelectProject: (project: ProjectItem) => void;
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  onPrevProject: () => void;
  onNextProject: () => void;
}

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'ALL PORTALS' },
  { id: 'web', label: 'WEB' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'tools', label: 'TOOLS' },
];

export const TabletExhibitionView: React.FC<TabletExhibitionViewProps> = ({
  projects,
  selectedProjectId,
  hoveredProjectId,
  onHoverProject,
  onSelectProject,
  selectedCategory,
  onSelectCategory,
  onPrevProject,
  onNextProject,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div
      id="tablet-exhibition-view"
      className="relative w-full min-h-screen pt-20 pb-8 px-4 flex flex-col justify-between z-10 select-none overflow-x-hidden"
    >
      {/* 1. Header */}
      <header className="flex flex-col items-center text-center max-w-2xl mx-auto pt-2 pb-3">
        <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono tracking-wider font-semibold mb-2">
          <span>PROJECTS // DIGITAL EXHIBITION</span>
        </div>

        <h1 className="text-3xl font-extrabold text-white tracking-tight font-sans">
          STEP INTO <span className="text-cyan-400">MY WORK</span>
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-slate-300 font-sans max-w-lg leading-relaxed">
          "Each project represents a problem I wanted to solve, a system I wanted to build, and an idea I wanted to turn into something real."
        </p>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 mt-4 p-1 rounded-full bg-slate-950/80 border border-slate-800">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`min-h-[38px] px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-950 text-cyan-200 border border-cyan-400 shadow-[0_0_12px_rgba(0,245,255,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* 2. 3-Door Horizontal Showcase Carousel */}
      <div className="relative w-full my-auto py-4">
        {/* Navigation scroll arrows */}
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider">
            SWIPE OR SCROLL TO EXPLORE DOORS (3 VISIBLE)
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollLeft}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 hover:border-cyan-400 transition-colors"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 hover:border-cyan-400 transition-colors"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 overflow-x-auto pb-4 pt-2 px-2 snap-x snap-mandatory scrollbar-none"
        >
          {projects.map((project) => {
            const isSelected = project.id === selectedProjectId;
            const isHovered = project.id === hoveredProjectId;

            return (
              <div
                key={project.id}
                className="w-[300px] flex-shrink-0 snap-center"
              >
                <ExhibitionProjectDoor
                  project={project}
                  isSelected={isSelected}
                  isHovered={isHovered}
                  onHover={onHoverProject}
                  onSelect={onSelectProject}
                  className="h-full"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Bottom controls */}
      <footer className="w-full max-w-xl mx-auto flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono text-slate-400">
        <button
          type="button"
          onClick={onPrevProject}
          className="min-h-[44px] px-3 flex items-center gap-1 hover:text-cyan-300"
        >
          <span>← PREV</span>
        </button>

        <span className="text-[10px] text-cyan-400/90 font-bold">
          TAP DOOR TO STEP INSIDE
        </span>

        <button
          type="button"
          onClick={onNextProject}
          className="min-h-[44px] px-3 flex items-center gap-1 hover:text-cyan-300"
        >
          <span>NEXT →</span>
        </button>
      </footer>
    </div>
  );
};
