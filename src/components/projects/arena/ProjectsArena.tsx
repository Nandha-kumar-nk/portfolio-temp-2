import React, { useState, useEffect, useCallback } from 'react';
import { PROJECTS_DATA, ProjectItem } from '../../../data/projectsData';
import { ArenaEnvironment } from './ArenaEnvironment';
import { CentralProjectDisplay } from './CentralProjectDisplay';
import { ProjectDisplay } from './ProjectDisplay';
import { ProjectPlatform } from './ProjectPlatform';
import { ProjectStoryObjects } from './ProjectStoryObjects';
import { ProjectInfo } from './ProjectInfo';
import { ProjectNavigation } from './ProjectNavigation';
import { MobileProjectsArena } from './MobileProjectsArena';
import { TabletProjectsArena } from './TabletProjectsArena';

interface ProjectsArenaProps {
  initialProjectId?: string;
  className?: string;
}

export const ProjectsArena: React.FC<ProjectsArenaProps> = ({
  initialProjectId = 'swayam-2',
  className = '',
}) => {
  const [projects] = useState<ProjectItem[]>(PROJECTS_DATA);
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const idx = PROJECTS_DATA.findIndex((p) => p.id === initialProjectId);
    return idx >= 0 ? idx : 0;
  });

  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [showInfoDrawer, setShowInfoDrawer] = useState<boolean>(false);

  // Responsive device classification
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 1150;
  const isTablet = windowWidth >= 700 && windowWidth < 1150;
  const isMobile = windowWidth < 700;

  const currentProject = projects[currentIndex] || projects[0];

  // Trigger cinematic transition
  const changeProjectToIndex = useCallback(
    (newIndex: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(newIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 750);
    },
    [isTransitioning]
  );

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    changeProjectToIndex(prevIdx);
  }, [currentIndex, projects.length, changeProjectToIndex]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % projects.length;
    changeProjectToIndex(nextIdx);
  }, [currentIndex, projects.length, changeProjectToIndex]);

  const handleSelectProjectId = useCallback(
    (id: string) => {
      const idx = projects.findIndex((p) => p.id === id);
      if (idx >= 0 && idx !== currentIndex) {
        changeProjectToIndex(idx);
      }
    },
    [projects, currentIndex, changeProjectToIndex]
  );

  // Keyboard navigation [ArrowLeft] & [ArrowRight]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Surrounding 4 displays calculation
  const farLeftIndex = (currentIndex - 2 + projects.length) % projects.length;
  const midLeftIndex = (currentIndex - 1 + projects.length) % projects.length;
  const midRightIndex = (currentIndex + 1) % projects.length;
  const farRightIndex = (currentIndex + 2) % projects.length;

  const farLeftProject = projects[farLeftIndex];
  const midLeftProject = projects[midLeftIndex];
  const midRightProject = projects[midRightIndex];
  const farRightProject = projects[farRightIndex];

  return (
    <div
      id="projects-showcase-arena"
      className={`relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden select-none pb-6 ${className}`}
    >
      {/* 1. Procedural 3D Environment Canvas (Floor, Rings, Mountains, Particles) */}
      <ArenaEnvironment activeProject={currentProject} />

      {/* 2. Responsive Views */}
      {isMobile ? (
        <MobileProjectsArena
          projects={projects}
          currentIndex={currentIndex}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      ) : isTablet ? (
        <TabletProjectsArena
          projects={projects}
          currentIndex={currentIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectIndex={changeProjectToIndex}
          onSelectProjectId={handleSelectProjectId}
          isTransitioning={isTransitioning}
        />
      ) : (
        /* =========================================================================
           DESKTOP 3D PROJECT SHOWCASE ARENA (MATCHING CONCEPT IMAGE EXACTLY)
           ========================================================================= */
        <div className="relative z-10 w-full flex-1 flex flex-col justify-between">
          {/* Top Main Headline & Subtitle */}
          <div className="pt-2 text-center flex flex-col items-center select-none z-20">
            {/* Tracked out cyan category pill */}
            <div className="px-3 py-0.5 rounded-full bg-[#081224]/80 border border-cyan-400/40 text-[10px] font-mono tracking-[0.35em] text-cyan-400 font-bold uppercase mb-1 shadow-[0_0_15px_rgba(0,245,255,0.2)]">
              &rarr; P R O J E C T S &larr;
            </div>

            {/* Big Hero Title: IDEAS TAKE SHAPE HERE */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase font-sans">
              <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(0,245,255,0.8)]">
                IDEAS
              </span>{' '}
              <span className="text-white drop-shadow-md">TAKE SHAPE HERE</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm font-sans font-medium text-slate-300/90 tracking-wide mt-1">
              Different problems. Unique solutions. A better tomorrow.
            </p>
          </div>

          {/* Central 3D Arena Stage: Curved Exhibition Fan */}
          <div className="relative my-auto w-full max-w-[1720px] mx-auto px-4 sm:px-8 flex items-center justify-center">
            {/* Surrounding Far-Left Display */}
            <div className="hidden 2xl:block -mr-8 z-10">
              <ProjectDisplay
                project={farLeftProject}
                position="far-left"
                onSelect={handleSelectProjectId}
              />
            </div>

            {/* Surrounding Mid-Left Display */}
            <div className="hidden lg:block -mr-4 z-15">
              <ProjectDisplay
                project={midLeftProject}
                position="mid-left"
                onSelect={handleSelectProjectId}
              />
            </div>

            {/* Center Hero Display & Multi-Layer Platform */}
            <div className="relative z-20 flex flex-col items-center mx-2 lg:mx-6">
              <CentralProjectDisplay
                project={currentProject}
                isTransitioning={isTransitioning}
              />
              <ProjectPlatform activeProject={currentProject} />
            </div>

            {/* Surrounding Mid-Right Display */}
            <div className="hidden lg:block -ml-4 z-15">
              <ProjectDisplay
                project={midRightProject}
                position="mid-right"
                onSelect={handleSelectProjectId}
              />
            </div>

            {/* Surrounding Far-Right Display */}
            <div className="hidden 2xl:block -ml-8 z-10">
              <ProjectDisplay
                project={farRightProject}
                position="far-right"
                onSelect={handleSelectProjectId}
              />
            </div>

            {/* Floating Project Specs Panel (Integrated on Desktop Flank) */}
            <div className="absolute top-0 right-6 xl:right-10 max-w-sm hidden xl:block z-25">
              <ProjectInfo project={currentProject} />
            </div>
          </div>

          {/* Bottom Horizon: 5 Story Objects on Floating Rock Pedestals */}
          <div className="relative z-20 w-full mt-2 mb-8">
            <ProjectStoryObjects activeProject={currentProject} />
          </div>

          {/* Navigation Overlays: Left/Right Arrows, Quotes, Telemetry, Pager */}
          <ProjectNavigation
            currentIndex={currentIndex}
            totalProjects={projects.length}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelectIndex={changeProjectToIndex}
          />
        </div>
      )}
    </div>
  );
};
