import React from 'react';
import { ProjectItem, ProjectCategory } from '../../../data/projectsData';
import { ExhibitionProjectDoor } from './ExhibitionProjectDoor';
import { ArrowLeft, ArrowRight, CornerDownLeft } from 'lucide-react';

interface DesktopExhibitionViewProps {
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
  { id: 'web', label: 'WEB APPLICATIONS' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'tools', label: 'DEVELOPER TOOLS' },
];

export const DesktopExhibitionView: React.FC<DesktopExhibitionViewProps> = ({
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
  return (
    <div
      id="desktop-exhibition-view"
      className="relative w-full min-h-screen pt-20 pb-10 px-6 xl:px-12 flex flex-col justify-between z-10 select-none overflow-x-hidden"
    >
      {/* 1. CINEMATIC HEADER SECTION */}
      <header className="flex flex-col items-center text-center max-w-4xl mx-auto pt-2 pb-4">
        {/* Eyebrow / Tagline */}
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono tracking-widest font-semibold shadow-[0_0_15px_rgba(0,245,255,0.2)] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>PROJECTS // DIGITAL EXHIBITION</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl xl:text-6xl font-black tracking-tight text-white leading-tight font-sans drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          STEP INTO <span className="text-cyan-400">MY WORK</span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-3 text-sm xl:text-base text-slate-300 font-sans max-w-2xl leading-relaxed">
          "Each project represents a problem I wanted to solve, a system I wanted to build, and an idea I wanted to turn into something real."
        </p>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mt-5 p-1 rounded-full bg-slate-950/80 border border-slate-800/90 backdrop-blur-xl">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-950 text-cyan-200 border border-cyan-400 shadow-[0_0_16px_rgba(0,245,255,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* 2. THE FIVE PROJECT DOORS EXHIBITION GALLERY */}
      <div className="relative w-full max-w-7xl mx-auto my-auto py-6">
        {/* Subtle architectural floor perspective axis */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none" />

        {/* 5-Door Architectural Curved Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-5 items-stretch">
          {projects.map((project, idx) => {
            const isSelected = project.id === selectedProjectId;
            const isHovered = project.id === hoveredProjectId;

            // Give subtle elevation offset to match the spatial arrangement
            // Center (Swayam) slightly elevated, side doors flanking
            const elevationClass =
              idx === 0
                ? 'lg:-translate-y-3' // Swayam 2.0 center
                : idx === 1 || idx === 3
                ? 'lg:translate-y-0' // Speed Taxi & Resume Forge
                : 'lg:translate-y-3'; // Wildlife AI & MERN CLI

            return (
              <div key={project.id} className={`transition-transform duration-500 ${elevationClass}`}>
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

        {/* Visitor Center Perspective Beacon */}
        <div className="mt-8 flex flex-col items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-slate-800 text-[10px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>YOU / VISITOR IN GALLERY SPACE</span>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM EXHIBITION STATUS & KEYBOARD HINTS */}
      <footer className="w-full max-w-5xl mx-auto flex items-center justify-between pt-4 border-t border-slate-850/80 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onPrevProject}
            className="flex items-center gap-1 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>PREV DOOR [←]</span>
          </button>

          <span className="text-slate-600">|</span>

          <button
            type="button"
            onClick={onNextProject}
            className="flex items-center gap-1 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <span>NEXT DOOR [→]</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-slate-400">
          <CornerDownLeft className="w-3.5 h-3.5 text-cyan-400" />
          <span>Press [Enter] or Click any Door to Step Inside</span>
        </div>

        <div className="flex items-center gap-1.5 text-cyan-400/90 font-semibold">
          <span>5 DOORS ACTIVE</span>
        </div>
      </footer>
    </div>
  );
};
