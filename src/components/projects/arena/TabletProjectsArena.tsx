import React from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { CentralProjectDisplay } from './CentralProjectDisplay';
import { ProjectDisplay } from './ProjectDisplay';
import { ProjectPlatform } from './ProjectPlatform';
import { ProjectStoryObjects } from './ProjectStoryObjects';
import { ProjectInfo } from './ProjectInfo';
import { ProjectNavigation } from './ProjectNavigation';

interface TabletProjectsArenaProps {
  projects: ProjectItem[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
  onSelectProjectId: (projectId: string) => void;
  isTransitioning?: boolean;
  className?: string;
}

export const TabletProjectsArena: React.FC<TabletProjectsArenaProps> = ({
  projects,
  currentIndex,
  onPrev,
  onNext,
  onSelectIndex,
  onSelectProjectId,
  isTransitioning = false,
  className = '',
}) => {
  const currentProject = projects[currentIndex] || projects[0];

  // Surrounding projects (previous and next)
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;

  const prevProject = projects[prevIndex];
  const nextProject = projects[nextIndex];

  return (
    <div
      id="tablet-projects-arena"
      className={`relative w-full min-h-screen px-4 py-6 flex flex-col justify-between select-none ${className}`}
    >
      {/* 1. Tablet Header */}
      <div className="text-center space-y-1 z-20">
        <div className="text-xs font-mono tracking-[0.3em] text-cyan-400 font-bold uppercase">
          &bull; P R O J E C T S &bull;
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white uppercase font-sans">
          IDEAS <span className="text-cyan-400">TAKE SHAPE</span> HERE
        </h1>
        <p className="text-xs font-medium text-slate-300">
          Real Projects. Real Learning. Real Impact.
        </p>
      </div>

      {/* 2. Arc Display with Left, Center, Right Screens */}
      <div className="relative z-20 my-4 flex items-center justify-center gap-3">
        {/* Left Secondary Display */}
        <div className="shrink-0 hidden md:block">
          <ProjectDisplay
            project={prevProject}
            position="mid-left"
            onSelect={onSelectProjectId}
          />
        </div>

        {/* Center Hero Display & Platform */}
        <div className="flex flex-col items-center max-w-lg w-full">
          <CentralProjectDisplay
            project={currentProject}
            isTransitioning={isTransitioning}
          />
          <ProjectPlatform activeProject={currentProject} />
        </div>

        {/* Right Secondary Display */}
        <div className="shrink-0 hidden md:block">
          <ProjectDisplay
            project={nextProject}
            position="mid-right"
            onSelect={onSelectProjectId}
          />
        </div>
      </div>

      {/* 3. Info Specs Card */}
      <div className="relative z-20 max-w-xl mx-auto w-full my-2">
        <ProjectInfo project={currentProject} />
      </div>

      {/* 4. Bottom Story Objects */}
      <div className="relative z-20 mt-4 mb-10 w-full">
        <ProjectStoryObjects activeProject={currentProject} />
      </div>

      {/* 5. Navigation Controls */}
      <ProjectNavigation
        currentIndex={currentIndex}
        totalProjects={projects.length}
        onPrev={onPrev}
        onNext={onNext}
        onSelectIndex={onSelectIndex}
      />
    </div>
  );
};
