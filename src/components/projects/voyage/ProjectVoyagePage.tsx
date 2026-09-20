import React, { useState, useEffect, useCallback } from 'react';
import { PROJECTS_DATA, ProjectItem } from '../../../data/projectsData';
import { ProjectVoyageSpiral } from './ProjectVoyageSpiral';
import { ProjectVoyageDetails } from './ProjectVoyageDetails';
import { ProjectVoyageNavDock } from './ProjectVoyageNavDock';

interface ProjectVoyagePageProps {
  initialProjectId?: string;
  isActive?: boolean;
}

export const ProjectVoyagePage: React.FC<ProjectVoyagePageProps> = ({
  initialProjectId = 'swayam-2',
  isActive = true,
}) => {
  const projects: ProjectItem[] = PROJECTS_DATA;
  const initialIdx = projects.findIndex((p) => p.id === initialProjectId);
  const startIdx = initialIdx >= 0 ? initialIdx : 0; // Default to SWAYAM 2.0 (01)

  const [activeIndex, setActiveIndex] = useState<number>(startIdx);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Responsive state detection
  const [viewportWidth, setViewportWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') return window.innerWidth;
    return 1200;
  });

  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const triggerIndexChange = useCallback((nextIdx: number) => {
    if (nextIdx < 0 || nextIdx >= projects.length) return;
    setIsTransitioning(true);
    setActiveIndex(nextIdx);
    setTimeout(() => setIsTransitioning(false), 550);
  }, [projects.length]);

  const handleNext = useCallback(() => {
    if (activeIndex < projects.length - 1) {
      triggerIndexChange(activeIndex + 1);
    }
  }, [activeIndex, projects.length, triggerIndexChange]);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      triggerIndexChange(activeIndex - 1);
    }
  }, [activeIndex, triggerIndexChange]);

  const handleSelectIndex = useCallback((index: number) => {
    triggerIndexChange(index);
  }, [triggerIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const currentProject = projects[activeIndex] || projects[0];

  return (
    <div
      id="project-voyage-page"
      className="relative w-full min-h-screen flex flex-col items-center bg-[#020712] text-white overflow-x-hidden pt-4 pb-20 select-none"
    >
      {/* ===================================================================== */}
      {/* 1. ATMOSPHERIC COSMIC DEEP SPACE BACKGROUND                           */}
      {/* ===================================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Background Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020712] via-[#051124] to-[#01040a]" />

        {/* Ambient Cyan Radial Nebula */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[140px] opacity-15 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${currentProject.accentColor || '#00f5ff'} 0%, transparent 70%)`,
          }}
        />

        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a2540_1px,transparent_1px),linear-gradient(to_bottom,#0a2540_1px,transparent_1px)] [background-size:64px_64px] opacity-15" />
      </div>

      {/* ===================================================================== */}
      {/* 2. PAGE HEADER / INTRO                                                */}
      {/* ===================================================================== */}
      <header
        id="project-voyage-header"
        className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-4 sm:pt-6 pb-2 text-center flex flex-col items-center"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="h-px w-6 bg-cyan-500/40" />
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.28em] text-cyan-400 uppercase">
            PROJECT VOYAGE
          </span>
          <span className="h-px w-6 bg-cyan-500/40" />
        </div>

        {/* Headline requested by user prompt */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase font-sans drop-shadow-[0_0_25px_rgba(0,245,255,0.3)]">
          MY PROJECTS ARE WORLDS I'VE BUILT.
        </h1>

        {/* Subtitle line requested by user prompt */}
        <p className="text-xs sm:text-sm font-sans text-slate-400 tracking-wide mt-1 italic">
          Scroll or drag to explore.
        </p>
      </header>

      {/* ===================================================================== */}
      {/* 3. 3D INFINITE SPIRAL INTERACTION STAGE                               */}
      {/* ===================================================================== */}
      <main className="relative z-10 w-full flex flex-col items-center mt-2">
        <ProjectVoyageSpiral
          projects={projects}
          activeIndex={activeIndex}
          totalProjects={projects.length}
          isMobile={isMobile}
          isTablet={isTablet}
          isTransitioning={isTransitioning}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectIndex={handleSelectIndex}
        />

        {/* Attached Project Info directly beneath central project */}
        <ProjectVoyageDetails
          project={currentProject}
          currentIndex={activeIndex}
          totalProjects={projects.length}
          isMobile={isMobile}
        />

        {/* Minimal Navigation Dock */}
        <ProjectVoyageNavDock
          projects={projects}
          currentIndex={activeIndex}
          isTransitioning={isTransitioning}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectIndex={handleSelectIndex}
        />
      </main>
    </div>
  );
};

export default ProjectVoyagePage;
