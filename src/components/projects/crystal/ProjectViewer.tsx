import React from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { ProjectItem, PROJECTS_DATA } from '../../../data/projectsData';
import { ProjectCrystalCanvas } from './ProjectCrystalCanvas';
import { TechLogoItem } from '../TechIconSystem';

interface ProjectViewerProps {
  project: ProjectItem;
  fromProjectId?: string;
  phase: number;
  phaseProgress: number;
  overallProgress: number;
  direction: number;
  isTransitioning: boolean;
  uiFadeProgress: number; // 0 (hidden) to 1 (fully visible)
  currentIndex: number;
  totalProjects: number;
  isMobile: boolean;
  isTablet: boolean;
  prefersReducedMotion: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({
  project,
  fromProjectId,
  phase,
  phaseProgress,
  overallProgress,
  direction,
  isTransitioning,
  uiFadeProgress,
  currentIndex,
  totalProjects,
  isMobile,
  isTablet,
  prefersReducedMotion,
  onPrev,
  onNext,
  onSelectIndex,
}) => {
  const formattedNumber = `${project.doorNumber || `0${currentIndex + 1}`} / 0${totalProjects}`;
  const techList = project.techStack || [];
  const primaryCategory = project.category || 'PROJECT';
  const subCategory = project.type || 'Full Stack Application';

  // =========================================================================
  // 1. MOBILE & TABLET DEDICATED LAYOUT (<lg) - Strictly follows Section 19
  // =========================================================================
  if (isMobile || isTablet) {
    return (
      <div
        id="crystal-archive-mobile-viewer"
        className="w-full max-w-lg mx-auto flex flex-col items-center px-4"
      >
        {/* Project Number (Above Crystal) */}
        <div
          className="flex items-center justify-center mb-1 transition-opacity duration-300"
          style={{ opacity: Math.max(0.3, uiFadeProgress) }}
        >
          <span className="text-[11px] font-mono tracking-[0.25em] font-semibold uppercase px-3 py-0.5 rounded-full border border-cyan-500/30 bg-slate-900/80 text-cyan-300">
            {formattedNumber}
          </span>
        </div>

        {/* Medium/Compact 3D Crystal */}
        <div
          id="mobile-crystal-container"
          className="relative flex items-center justify-center my-1"
          style={{
            width: isMobile ? '200px' : '250px',
            height: isMobile ? '220px' : '270px',
            maxHeight: '34vh',
          }}
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-36 h-6 rounded-full blur-lg pointer-events-none bg-cyan-500/25" />
          <ProjectCrystalCanvas
            project={project}
            fromProjectId={fromProjectId}
            phase={phase}
            phaseProgress={phaseProgress}
            overallProgress={overallProgress}
            direction={direction}
            isMobile={isMobile}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* Project Details (Fades smoothly during transition) */}
        <div
          id="mobile-project-details"
          className="w-full flex flex-col items-center text-center mt-2 transition-all duration-300"
          style={{
            opacity: uiFadeProgress,
            transform: `translateY(${(1 - uiFadeProgress) * 6}px)`,
          }}
        >
          {/* Project Title */}
          <h2
            className="font-black tracking-tight text-white uppercase font-sans text-center leading-tight drop-shadow-[0_0_15px_rgba(0,245,255,0.2)] px-2"
            style={{ fontSize: 'clamp(1.25rem, 4vw, 1.65rem)' }}
          >
            {project.title}
          </h2>

          {/* Category & Type */}
          <div className="flex items-center justify-center gap-2 mt-1 mb-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
              {primaryCategory}
            </span>
            <span className="text-slate-600 text-xs">•</span>
            <span className="text-xs font-sans text-slate-300 font-medium">
              {subCategory}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal text-center mb-3.5 px-2">
            {project.description}
          </p>

          {/* Real Technology Logos (2-3 columns on mobile, clean grid, no overflow) */}
          <div className="w-full flex flex-col items-center mb-4">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold mb-2">
              TECH STACK
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3 justify-center">
              {techList.slice(0, 6).map((tech, idx) => (
                <TechLogoItem key={idx} name={tech.name} size="sm" showLabel={true} />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 w-full max-w-xs mb-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-950 font-sans bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,245,255,0.35)] transition-all min-h-[44px] cursor-pointer"
              >
                <span>VIEW LIVE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-white font-sans border border-slate-700/80 bg-slate-900/90 hover:border-cyan-500/50 transition-all min-h-[44px] cursor-pointer"
              >
                <Github className="w-3.5 h-3.5 text-slate-300" />
                <span>SOURCE</span>
              </a>
            )}
          </div>
        </div>

        {/* Navigation Controls: PREV / 01 02 03 04 05 / NEXT */}
        <div className="w-full flex items-center justify-center gap-2 sm:gap-3 py-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={isTransitioning}
            aria-label="Previous Project"
            className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/90 text-xs font-mono font-medium text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 disabled:opacity-40 transition-all min-h-[44px] cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">PREV</span>
          </button>

          <div className="flex items-center gap-1 sm:gap-1.5">
            {Array.from({ length: totalProjects }).map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  disabled={isTransitioning}
                  aria-label={`Select Project 0${idx + 1}`}
                  className={`transition-all duration-200 rounded-full flex items-center justify-center min-h-[36px] min-w-[36px] cursor-pointer ${
                    isActive
                      ? 'w-7 h-7 sm:w-8 sm:h-8 text-[11px] sm:text-xs font-mono font-bold bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(0,245,255,0.5)]'
                      : 'w-6 h-6 sm:w-7 sm:h-7 text-[10px] sm:text-[11px] font-mono text-slate-500 border border-slate-800 bg-slate-900/60 hover:text-slate-200'
                  }`}
                >
                  {`0${idx + 1}`}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onNext}
            disabled={isTransitioning}
            aria-label="Next Project"
            className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/90 text-xs font-mono font-medium text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 disabled:opacity-40 transition-all min-h-[44px] cursor-pointer"
          >
            <span className="hidden sm:inline">NEXT</span>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* 11. Mobile Archive Index: Compact Selectable Rows (Section 19 Item 11) */}
        <div className="w-full mt-3 pt-3 border-t border-slate-800/60 flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-[9px] font-mono tracking-[0.2em] text-slate-400 uppercase font-semibold">
              ARCHIVE INDEX
            </span>
            <span className="text-[9px] font-mono text-cyan-400">
              TAP TO SWITCH
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 w-full">
            {PROJECTS_DATA.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  disabled={isTransitioning}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border text-left transition-all min-h-[40px] cursor-pointer ${
                    isActive
                      ? 'border-cyan-500/70 bg-cyan-950/40 text-white shadow-[0_0_10px_rgba(0,245,255,0.15)]'
                      : 'border-slate-800/80 bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? 'text-cyan-400' : 'text-slate-500'
                      }`}
                    >
                      {item.doorNumber || `0${idx + 1}`}
                    </span>
                    <span className="text-xs font-sans font-semibold tracking-wide uppercase truncate max-w-[170px]">
                      {item.shortName || item.title}
                    </span>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f5ff]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. DESKTOP BALANCED 3-COLUMN COMPOSITION (lg and above) - Section 6
  // LEFT: Project index/navigation (01 SWAYAM 2.0 ... 05 NK MERN CLI)
  // CENTER: Medium-sized crystal on pedestal with compact navigation
  // RIGHT: Project information, authentic tech logos, action buttons
  // =========================================================================
  return (
    <div
      id="crystal-archive-desktop-viewer"
      className="w-full max-w-7xl mx-auto px-6 grid grid-cols-12 gap-6 items-center"
    >
      {/* =================================================================== */}
      {/* LEFT COLUMN: Project Index / Navigation List (cols: 3)               */}
      {/* =================================================================== */}
      <div className="col-span-3 flex flex-col space-y-2 pr-2">
        <div className="flex items-center gap-2 mb-2">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] font-mono tracking-[0.24em] text-slate-400 uppercase font-semibold">
            ARCHIVE INDEX
          </span>
        </div>

        {PROJECTS_DATA.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectIndex(idx)}
              disabled={isTransitioning}
              className={`group w-full text-left p-2.5 rounded-xl border transition-all duration-300 focus:outline-none flex items-center justify-between cursor-pointer ${
                isActive
                  ? 'border-cyan-400/80 bg-cyan-950/30 shadow-[0_0_15px_rgba(0,245,255,0.15)] ring-1 ring-cyan-500/40'
                  : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-xs font-mono font-bold transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                >
                  {item.doorNumber || `0${idx + 1}`}
                </span>
                <div>
                  <div
                    className={`text-xs font-bold font-sans tracking-wide uppercase transition-colors ${
                      isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                    }`}
                  >
                    {item.shortName || item.title}
                  </div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-tight">
                    {item.category}
                  </div>
                </div>
              </div>

              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff]" />
              )}
            </button>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* CENTER COLUMN: Medium-sized Crystal & Compact Nav (cols: 4)          */}
      {/* =================================================================== */}
      <div className="col-span-5 flex flex-col items-center justify-center">
        {/* Crystal Container: 280-320px wide, max 34vh height */}
        <div
          id="desktop-crystal-hero"
          className="relative flex items-center justify-center"
          style={{
            width: '300px',
            height: '330px',
            maxHeight: '34vh',
          }}
        >
          {/* Subtle Pedestal Reflection Glow */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-8 rounded-full blur-xl pointer-events-none bg-cyan-500/20" />

          {/* 3D R3F Canvas */}
          <ProjectCrystalCanvas
            project={project}
            fromProjectId={fromProjectId}
            phase={phase}
            phaseProgress={phaseProgress}
            overallProgress={overallProgress}
            direction={direction}
            isMobile={false}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* Compact Navigation Directly Under Crystal (Section 12) */}
        {/* ← PREVIOUS    01 02 03 04 05    NEXT → */}
        <div
          id="desktop-crystal-navigation"
          className="flex items-center justify-center gap-3 mt-3 px-4 py-2 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={onPrev}
            disabled={isTransitioning}
            aria-label="Previous Project"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-xs font-mono font-medium text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 disabled:opacity-40 transition-all min-h-[38px] cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>PREVIOUS</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalProjects }).map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  disabled={isTransitioning}
                  aria-label={`Go to project 0${idx + 1}`}
                  className={`transition-all duration-200 rounded-full flex items-center justify-center min-h-[34px] min-w-[34px] cursor-pointer ${
                    isActive
                      ? 'w-7 h-7 text-xs font-mono font-bold bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(0,245,255,0.5)]'
                      : 'w-6 h-6 text-[11px] font-mono text-slate-500 border border-slate-800 bg-slate-900/60 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {`0${idx + 1}`}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onNext}
            disabled={isTransitioning}
            aria-label="Next Project"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-xs font-mono font-medium text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 disabled:opacity-40 transition-all min-h-[38px] cursor-pointer"
          >
            <span>NEXT</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* RIGHT COLUMN: Project Information, Tech Stack, Actions (cols: 4)     */}
      {/* =================================================================== */}
      <div
        id="desktop-project-info"
        className="col-span-4 flex flex-col items-start text-left pl-2 transition-all duration-300"
        style={{
          opacity: uiFadeProgress,
          transform: `translateY(${(1 - uiFadeProgress) * 6}px)`,
        }}
      >
        {/* Project Number Counter (e.g. 02 / 05) */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono tracking-[0.22em] font-bold uppercase px-2.5 py-0.5 rounded-full border border-cyan-500/30 bg-slate-900/80 text-cyan-300">
            {formattedNumber}
          </span>
          <span className="text-slate-600 text-xs">•</span>
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">
            {primaryCategory}
          </span>
        </div>

        {/* Project Title (Responsive clamp, naturally wraps) */}
        <h2
          className="font-extrabold tracking-tight text-white uppercase font-sans leading-tight drop-shadow-[0_0_20px_rgba(0,245,255,0.2)] mb-1"
          style={{ fontSize: 'clamp(1.3rem, 2.1vw, 1.85rem)' }}
        >
          {project.title}
        </h2>

        {/* Subtitle / Type */}
        <div className="text-xs font-sans text-cyan-200/90 font-medium mb-3">
          {subCategory}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-4 max-w-lg">
          {project.description}
        </p>

        {/* Tech Stack Header & Real Recognition Logos in One Clean Row */}
        <div className="w-full mb-5">
          <span className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase font-bold block mb-2">
            [TECH STACK]
          </span>
          <div className="flex items-center gap-3">
            {techList.slice(0, 6).map((tech, idx) => (
              <TechLogoItem key={idx} name={tech.name} size="md" showLabel={true} />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold text-slate-950 font-sans bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_18px_rgba(0,245,255,0.35)] transition-all min-h-[44px] cursor-pointer active:scale-95"
            >
              <span>VIEW LIVE PROJECT</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white font-sans border border-slate-700/80 bg-slate-900/80 hover:bg-slate-850 hover:border-cyan-500/50 transition-all min-h-[44px] cursor-pointer active:scale-95"
            >
              <Github className="w-3.5 h-3.5 text-slate-300" />
              <span>VIEW SOURCE CODE</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
