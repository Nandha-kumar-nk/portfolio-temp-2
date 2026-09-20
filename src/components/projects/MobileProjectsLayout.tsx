import React, { useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Compass,
  Globe,
  Cpu,
  Wrench,
  Layers,
} from 'lucide-react';
import { ProjectItem, ProjectCategory } from '../../types';

interface MobileProjectsLayoutProps {
  projects: ProjectItem[];
  activeProject: ProjectItem;
  onSelectProject: (id: string) => void;
  selectedCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
  projectCounts: Record<string, number>;
  onPrevProject: () => void;
  onNextProject: () => void;
}

const CATEGORIES: {
  id: ProjectCategory;
  label: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  { id: 'all', label: 'ALL PROJECTS', icon: Compass },
  { id: 'web', label: 'WEB APPLICATIONS', icon: Globe },
  { id: 'ai', label: 'AI / ML', icon: Cpu },
  { id: 'tools', label: 'DEVELOPER TOOLS', icon: Wrench },
  { id: 'other', label: 'OTHER PROJECTS', icon: Layers },
];

export const MobileProjectsLayout: React.FC<MobileProjectsLayoutProps> = ({
  projects,
  activeProject,
  onSelectProject,
  selectedCategory,
  onSelectCategory,
  projectCounts,
  onPrevProject,
  onNextProject,
}) => {
  const activeIndex = projects.findIndex((p) => p.id === activeProject.id);

  // Touch swipe handling for switching projects
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        onNextProject();
      } else {
        onPrevProject();
      }
    }
  };

  const accent = activeProject.accentColor || '#00f5ff';

  return (
    <div
      id="mobile-projects-composition"
      className="relative w-full flex flex-col items-center pt-16 pb-28 px-4 z-20 overflow-x-hidden select-none pointer-events-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* =================================================================== */}
      {/* 1. PROJECTS TITLE & NARRATIVE (COMPACT TOP CARD)                    */}
      {/* =================================================================== */}
      <div className="w-full max-w-sm rounded-2xl bg-slate-950/80 border border-cyan-500/40 backdrop-blur-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_16px_rgba(0,245,255,0.12)] mb-2.5 pointer-events-auto">
        <div className="flex items-center justify-between pb-2 border-b border-cyan-900/50 mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-black text-white tracking-widest font-mono">
              PROJECTS
            </h2>
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff] animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-cyan-400 tracking-widest font-mono">
            MISSION HUB
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-normal">
          Ideas transformed into real-world solutions. Each project reflects my
          learning, creativity, problem-solving and development journey.
        </p>
      </div>

      {/* =================================================================== */}
      {/* 2. CATEGORY FILTER PILLS (HORIZONTAL SCROLL)                        */}
      {/* =================================================================== */}
      <div className="w-full max-w-sm mb-2 pointer-events-auto">
        <div
          id="mobile-category-scroll"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-0.5 scroll-smooth"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = projectCounts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`flex-shrink-0 min-h-[38px] px-3 py-1.5 rounded-xl flex items-center gap-2 transition-all border ${
                  isSelected
                    ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,245,255,0.35)] scale-[1.02]'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isSelected ? 'text-cyan-300' : 'text-slate-400'
                  }`}
                />
                <span className="text-xs font-semibold tracking-wider whitespace-nowrap">
                  {cat.label}
                </span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-cyan-400/20 text-cyan-300 font-bold'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. 3D HERO VIEWPORT STAGE                                           */}
      {/* Contains ONLY ONE featured 3D project visual at a time               */}
      {/* =================================================================== */}
      <div className="relative w-full max-w-sm h-[260px] flex items-center justify-between my-1 pointer-events-none">
        {/* Left Touch / Tap Arrow */}
        <button
          type="button"
          onClick={onPrevProject}
          className="pointer-events-auto w-9 h-9 rounded-full bg-slate-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 hover:text-white active:scale-95 shadow-[0_0_12px_rgba(0,0,0,0.6)] backdrop-blur-md cursor-pointer ml-0.5 z-10"
          aria-label="Previous Project"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Center Transparent Area where the single 3D Hero on Pedestal displays */}
        <div className="flex-1 h-full" />

        {/* Right Touch / Tap Arrow */}
        <button
          type="button"
          onClick={onNextProject}
          className="pointer-events-auto w-9 h-9 rounded-full bg-slate-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 hover:text-white active:scale-95 shadow-[0_0_12px_rgba(0,0,0,0.6)] backdrop-blur-md cursor-pointer mr-0.5 z-10"
          aria-label="Next Project"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* =================================================================== */}
      {/* 4. TITLE & TYPE UNDER THE VISUAL WORLD                             */}
      {/* =================================================================== */}
      <div className="text-center mt-0.5 mb-2.5 pointer-events-auto">
        <h3 className="text-lg font-black text-white tracking-wide font-mono drop-shadow-[0_0_8px_rgba(0,245,255,0.4)]">
          {activeProject.title}
        </h3>
        <p
          className="text-[11px] font-mono tracking-widest uppercase mt-0.5 font-bold"
          style={{ color: accent }}
        >
          {activeProject.type || activeProject.categoryName}
        </p>
      </div>

      {/* =================================================================== */}
      {/* 5. PROJECT INFORMATION GLASS CARD (DESCRIPTION, TECH, FEATURES)     */}
      {/* =================================================================== */}
      <div className="w-full max-w-sm rounded-2xl bg-slate-950/85 border border-cyan-500/40 backdrop-blur-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_18px_rgba(0,245,255,0.12)] pointer-events-auto mb-3 text-left">
        {/* 6. Short Description */}
        <p className="text-xs text-slate-300 leading-relaxed font-normal">
          {activeProject.description}
        </p>

        {/* 7. Tech Stack */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80">
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1.5">
            TECH STACK:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeProject.techStack.map((tech) => (
              <span
                key={tech.name}
                className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-200"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* 8. Key Features */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80">
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1.5">
            KEY FEATURES:
          </span>
          <ul className="space-y-1">
            {(activeProject.features || activeProject.keyFeatures || []).map((feat) => (
              <li key={feat} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: accent }}
                />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 9. GitHub & Live Demo Action Buttons (min 44px touch height) */}
        <div className="grid grid-cols-2 gap-2.5 mt-3.5 pt-3 border-t border-cyan-950">
          <a
            href={activeProject.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-3 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-white flex items-center justify-center gap-2 text-xs font-bold tracking-wider active:scale-95 transition-all cursor-pointer"
          >
            <Github className="w-4 h-4 text-slate-300" />
            <span>VIEW CODE</span>
          </a>

          <a
            href={activeProject.liveUrl || activeProject.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-3 rounded-xl bg-cyan-950/80 border border-cyan-400 hover:bg-cyan-900 text-cyan-200 hover:text-white flex items-center justify-center gap-2 text-xs font-bold tracking-wider shadow-[0_0_15px_rgba(0,245,255,0.3)] active:scale-95 transition-all cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>LIVE DEMO</span>
          </a>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 6. PAGINATION INDICATOR DOCK: ←  ●  ○  ○  ○  ○  →                   */}
      {/* =================================================================== */}
      <div
        id="mobile-pagination-dock"
        className="w-full max-w-sm flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/75 border border-cyan-900/40 pointer-events-auto backdrop-blur-md"
      >
        <button
          type="button"
          onClick={onPrevProject}
          className="min-h-[44px] px-2 flex items-center gap-1 text-xs font-bold font-mono text-cyan-300 hover:text-white transition-colors active:scale-95 cursor-pointer"
          aria-label="Previous Project"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>PREV</span>
        </button>

        {/* Circular Indicators: ●  ○  ○  ○  ○ */}
        <div className="flex items-center gap-2">
          {projects.map((proj, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => onSelectProject(proj.id)}
                className={`transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? 'w-5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff]'
                    : 'w-2.5 h-2.5 rounded-full bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={onNextProject}
          className="min-h-[44px] px-2 flex items-center gap-1 text-xs font-bold font-mono text-cyan-300 hover:text-white transition-colors active:scale-95 cursor-pointer"
          aria-label="Next Project"
        >
          <span>NEXT</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
