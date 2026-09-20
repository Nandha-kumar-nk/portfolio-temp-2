import React, { useRef } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem, PROJECTS_DATA } from '../../../data/projectsData';
import { ProjectHolographicDisplay } from './ProjectHolographicDisplay';
import { TechStackSection } from './TechStackSection';

interface ProjectCubeViewerProps {
  isActive?: boolean;
  project: ProjectItem;
  fromProjectId?: string;
  phase: number;
  phaseProgress: number;
  overallProgress: number;
  direction: number;
  isTransitioning: boolean;
  uiFadeProgress: number;
  currentIndex: number;
  totalProjects: number;
  isMobile: boolean;
  isTablet: boolean;
  prefersReducedMotion: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

export const ProjectCubeViewer: React.FC<ProjectCubeViewerProps> = ({
  project,
  isTransitioning,
  uiFadeProgress,
  direction = 1,
  currentIndex,
  totalProjects,
  isMobile,
  isTablet,
  prefersReducedMotion = false,
  onPrev,
  onNext,
  onSelectIndex,
}) => {
  const formattedNumber = `${project.doorNumber || `0${currentIndex + 1}`} / 0${totalProjects}`;
  const techList = project.techStack || [];
  const primaryCategory = project.category || 'PROJECT';
  const subCategory = project.type || 'Full Stack Application';

  // Direction flag: >= 0 is NEXT, < 0 is PREV
  const isNext = direction >= 0;

  // Mobile touch swipe listener with natural threshold (55px)
  const cubeTouchStartX = useRef<number>(0);
  const cubeTouchStartY = useRef<number>(0);

  const handleCubeTouchStart = (e: React.TouchEvent) => {
    cubeTouchStartX.current = e.touches[0].clientX;
    cubeTouchStartY.current = e.touches[0].clientY;
  };

  const handleCubeTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = cubeTouchStartX.current - endX;
    const deltaY = cubeTouchStartY.current - endY;

    if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX > 0) {
        onNext(); // Swiped left -> NEXT
      } else {
        onPrev(); // Swiped right -> PREVIOUS
      }
    }
  };

  // =========================================================================
  // 1. MOBILE & TABLET DEDICATED LAYOUT (<lg)
  // =========================================================================
  if (isMobile || isTablet) {
    return (
      <div
        id="holographic-archive-mobile-viewer"
        className="w-full max-w-xl mx-auto flex flex-col items-center px-4 select-none"
      >
        {/* Project Number Indicator */}
        <div
          className="flex items-center justify-center mb-2 transition-opacity duration-300"
          style={{ opacity: Math.max(0.4, uiFadeProgress) }}
        >
          <span className="text-[11px] font-mono tracking-[0.22em] font-bold uppercase px-3 py-0.5 rounded-full border border-cyan-500/40 bg-slate-900/90 text-cyan-300 shadow-[0_0_10px_rgba(0,245,255,0.2)]">
            PROJECT {formattedNumber}
          </span>
          <span className="text-slate-600 text-xs mx-2">•</span>
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">
            {primaryCategory}
          </span>
        </div>

        {/* 1. PROJECT HERO VISUAL SCREENSHOT */}
        <div
          id="mobile-holographic-interaction-area"
          className="w-full my-1 flex justify-center"
          onTouchStart={handleCubeTouchStart}
          onTouchEnd={handleCubeTouchEnd}
        >
          <ProjectHolographicDisplay
            project={project}
            isMobile={true}
            direction={direction}
            prefersReducedMotion={prefersReducedMotion}
            currentIndex={currentIndex}
            totalProjects={totalProjects}
            isTransitioning={isTransitioning}
            onPrev={onPrev}
            onNext={onNext}
          />
        </div>

        {/* 2. PROJECT TITLE */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={project.id}
            initial={{ opacity: 0, x: isNext ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isNext ? -20 : 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-black tracking-tight text-white uppercase font-sans text-center leading-tight drop-shadow-[0_0_20px_rgba(0,245,255,0.3)] px-2 mt-1 mb-1"
            style={{ fontSize: 'clamp(1.35rem, 4.5vw, 1.85rem)' }}
          >
            {project.title}
          </motion.h2>
        </AnimatePresence>

        {/* Project Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: isNext ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isNext ? -20 : 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            id="mobile-project-details"
            className="w-full flex flex-col items-center text-center transition-all duration-300"
          >
            {/* Subtitle / Type */}
            <div className="text-xs font-sans text-cyan-300/90 font-semibold mb-2">
              {subCategory}
            </div>

            {/* 3. DESCRIPTION */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal text-center mb-4 px-2 max-w-md">
              {project.description}
            </p>

            {/* 4. INTERACTIVE TECH STACK */}
            <TechStackSection techList={techList} isMobile={true} />

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 w-full max-w-xs mb-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 font-mono bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all min-h-[44px] cursor-pointer active:scale-95 uppercase tracking-wider"
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
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white font-mono border border-cyan-500/40 bg-slate-900/90 hover:border-cyan-400 transition-all min-h-[44px] cursor-pointer active:scale-95 uppercase tracking-wider"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SOURCE</span>
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dock */}
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
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  disabled={isTransitioning}
                  aria-label={`Select Project 0${idx + 1}`}
                  className={`transition-all duration-200 rounded-full flex items-center justify-center min-h-[36px] min-w-[36px] cursor-pointer ${
                    isCurrent
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

        {/* Archive Index Quick Grid */}
        <div className="w-full mt-3 pt-3 border-t border-slate-800/60 flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-[9px] font-mono tracking-[0.2em] text-slate-400 uppercase font-semibold">
              ARCHIVE INDEX
            </span>
            <span className="text-[9px] font-mono text-cyan-400">SELECT</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 w-full">
            {PROJECTS_DATA.map((item, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  disabled={isTransitioning}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border text-left transition-all min-h-[40px] cursor-pointer ${
                    isCurrent
                      ? 'border-cyan-500/70 bg-cyan-950/40 text-white shadow-[0_0_10px_rgba(0,245,255,0.15)]'
                      : 'border-slate-800/80 bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isCurrent ? 'text-cyan-400' : 'text-slate-500'
                      }`}
                    >
                      {item.doorNumber || `0${idx + 1}`}
                    </span>
                    <span className="text-xs font-sans font-semibold tracking-wide uppercase truncate max-w-[170px]">
                      {item.shortName || item.title}
                    </span>
                  </div>
                  {isCurrent && (
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
  // 2. DESKTOP CINEMATIC 3-COLUMN COMPOSITION (lg and above)
  // Grid: [ Left: ARCHIVE INDEX (col-3) ] [ Center: PROJECT HERO VISUAL + ORBITS (col-6) ] [ Right: PROJECT INFO + TECH STACK (col-3) ]
  // =========================================================================
  return (
    <div
      id="holographic-archive-desktop-viewer"
      className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center select-none"
    >
      {/* Centered Top Title Header */}
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center text-center mb-6"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono tracking-[0.22em] font-bold uppercase px-3 py-0.5 rounded-full border border-cyan-500/40 bg-slate-900/80 text-cyan-300 shadow-[0_0_12px_rgba(0,245,255,0.2)]">
              PROJECT {formattedNumber}
            </span>
            <span className="text-slate-600 text-xs">•</span>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
              {primaryCategory}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white uppercase font-sans drop-shadow-[0_0_20px_rgba(0,245,255,0.25)]">
            {project.title}
          </h2>
        </motion.div>
      </AnimatePresence>

      {/* 3-Column Balanced Layout */}
      <div className="w-full grid grid-cols-12 gap-6 xl:gap-8 items-center">
        {/* =================================================================== */}
        {/* LEFT COLUMN: Archive Index List (col-3)                             */}
        {/* =================================================================== */}
        <div className="col-span-3 flex flex-col space-y-2 pr-2">
          <div className="flex items-center gap-2 mb-2">
            <Box className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-mono tracking-[0.24em] text-slate-400 uppercase font-bold">
              ARCHIVE INDEX
            </span>
          </div>

          {PROJECTS_DATA.map((item, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectIndex(idx)}
                disabled={isTransitioning}
                className={`group w-full text-left p-3 rounded-xl border transition-all duration-300 focus:outline-none flex items-center justify-between cursor-pointer ${
                  isCurrent
                    ? 'border-cyan-400/80 bg-cyan-950/30 shadow-[0_0_18px_rgba(0,245,255,0.2)] ring-1 ring-cyan-500/40'
                    : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-mono font-bold transition-colors ${
                      isCurrent ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  >
                    {item.doorNumber || `0${idx + 1}`}
                  </span>
                  <div>
                    <div
                      className={`text-xs font-bold font-sans tracking-wide uppercase transition-colors ${
                        isCurrent ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {item.shortName || item.title}
                    </div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-tight mt-0.5">
                      {item.category}
                    </div>
                  </div>
                </div>

                {isCurrent && (
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff]" />
                )}
              </button>
            );
          })}
        </div>

        {/* =================================================================== */}
        {/* CENTER COLUMN: Real Project Visual & Atmospheric World (col-6)      */}
        {/* =================================================================== */}
        <div className="col-span-6 flex flex-col items-center justify-center relative min-h-[360px] lg:min-h-[400px]">
          <ProjectHolographicDisplay
            project={project}
            isMobile={false}
            direction={direction}
            prefersReducedMotion={prefersReducedMotion}
            currentIndex={currentIndex}
            totalProjects={totalProjects}
            isTransitioning={isTransitioning}
            onPrev={onPrev}
            onNext={onNext}
          />
        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: Project Info Details & Tech Stack & Nav (col-3)       */}
        {/* =================================================================== */}
        <div className="col-span-3 flex flex-col items-start text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: isNext ? 25 : -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isNext ? -25 : 25 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-start"
            >
              {/* Top Project Badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono tracking-[0.2em] font-bold text-cyan-400 uppercase px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/40">
                  ◇ PROJECT {formattedNumber}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-sans mb-1 drop-shadow-[0_0_15px_rgba(0,245,255,0.2)]">
                {project.title}
              </h3>

              {/* Subtitle / Category */}
              <div className="text-xs font-sans text-cyan-300 font-semibold mb-3">
                {project.tagline || subCategory}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-4">
                {project.description}
              </p>

              {/* Interactive Tech Stack */}
              <TechStackSection techList={techList} isMobile={false} />

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full mb-6">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 font-mono bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_18px_rgba(0,245,255,0.4)] transition-all min-h-[42px] cursor-pointer uppercase tracking-wider active:scale-95"
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
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white font-mono border border-cyan-500/40 bg-[#041126]/90 hover:bg-slate-900 hover:border-cyan-400 transition-all min-h-[42px] cursor-pointer uppercase tracking-wider active:scale-95"
                  >
                    <Github className="w-3.5 h-3.5 text-cyan-400" />
                    <span>SOURCE</span>
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls Dock */}
          <div
            id="desktop-holographic-navigation"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={onPrev}
              disabled={isTransitioning}
              aria-label="Previous Project"
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-[11px] font-mono font-bold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 disabled:opacity-40 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>PREV</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalProjects }).map((_, idx) => {
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectIndex(idx)}
                    disabled={isTransitioning}
                    aria-label={`Go to project 0${idx + 1}`}
                    className={`transition-all duration-200 rounded-full flex items-center justify-center cursor-pointer ${
                      isCurrent
                        ? 'w-7 h-7 text-[11px] font-mono font-bold bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(0,245,255,0.5)]'
                        : 'w-6 h-6 text-[10px] font-mono text-slate-400 border border-slate-800 bg-slate-900/60 hover:text-slate-200'
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
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-[11px] font-mono font-bold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 disabled:opacity-40 transition-all cursor-pointer"
            >
              <span>NEXT</span>
              <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
