import React, { useState, useEffect, useCallback } from 'react';
import { ProjectDimensionsBackground } from '../dimensions/ProjectDimensionsBackground';
import { PROJECTS_DATA, ProjectItem } from '../../../data/projectsData';
import { ProjectLensHeader } from './ProjectLensHeader';
import { ProjectLensRing } from './ProjectLensRing';
import { ProjectLensScreenshot } from './ProjectLensScreenshot';
import { ProjectLensInfo } from './ProjectLensInfo';
import { ProjectLensNav } from './ProjectLensNav';

interface ProjectLensMainProps {
  initialProjectId?: string;
}

export const ProjectLensMain: React.FC<ProjectLensMainProps> = ({
  initialProjectId,
}) => {
  const projects = PROJECTS_DATA;
  const initialIndex = initialProjectId
    ? projects.findIndex((p) => p.id === initialProjectId)
    : 0;

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects[initialIndex >= 0 ? initialIndex : 0].id
  );
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isFocusing, setIsFocusing] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const currentIndex = projects.findIndex((p) => p.id === selectedProjectId);
  const currentProject: ProjectItem =
    projects[currentIndex >= 0 ? currentIndex : 0];

  const handleSelectProject = useCallback(
    (targetId: string) => {
      if (targetId === selectedProjectId || isFocusing) return;

      const targetIdx = projects.findIndex((p) => p.id === targetId);
      const newDirection = targetIdx > currentIndex ? 'forward' : 'backward';

      setDirection(newDirection);
      setIsFocusing(true);

      setTimeout(() => {
        setSelectedProjectId(targetId);
        setTimeout(() => {
          setIsFocusing(false);
        }, 400);
      }, 350);
    },
    [selectedProjectId, isFocusing, currentIndex, projects]
  );

  const handlePrevProject = useCallback(() => {
    const prevIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    handleSelectProject(projects[prevIndex].id);
  }, [currentIndex, projects, handleSelectProject]);

  const handleNextProject = useCallback(() => {
    const nextIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    handleSelectProject(projects[nextIndex].id);
  }, [currentIndex, projects, handleSelectProject]);

  // Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevProject();
      } else if (e.key === 'ArrowRight') {
        handleNextProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevProject, handleNextProject]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextProject(); // Swipe Left -> Next
      } else {
        handlePrevProject(); // Swipe Right -> Prev
      }
    }
    setTouchStartX(null);
  };

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <ProjectDimensionsBackground qualityTier="HIGH">
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full min-h-screen text-slate-100 flex flex-col justify-between pb-12 relative overflow-x-hidden font-mono"
      >
        {/* Top Header - Placed safely below global header */}
        <ProjectLensHeader />

        {/* Center Main Stage Composition */}
        <main className="w-full max-w-7xl mx-auto px-4 my-2 z-20 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-4 sm:p-6 rounded-3xl bg-slate-950/75 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,245,255,0.15)]">
            {/* LEFT / CENTER: Futuristic Lens Mechanism with Screenshot (~60% width / 7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[420px]">
              <ProjectLensRing
                currentNum={formatNumber(currentIndex + 1)}
                totalNum={formatNumber(projects.length)}
                isFocusing={isFocusing}
              >
                <ProjectLensScreenshot
                  project={currentProject}
                  direction={direction}
                  isFocusing={isFocusing}
                />
              </ProjectLensRing>
            </div>

            {/* RIGHT: Minimal Project Information (~40% width / 5 cols) */}
            <div className="lg:col-span-5 h-full flex flex-col justify-center">
              <ProjectLensInfo
                project={currentProject}
                currentIndex={currentIndex}
                totalProjects={projects.length}
              />
            </div>
          </div>
        </main>

        {/* Bottom Project Lens Navigation Bar */}
        <ProjectLensNav
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelectProject={handleSelectProject}
          onPrevProject={handlePrevProject}
          onNextProject={handleNextProject}
        />
      </div>
    </ProjectDimensionsBackground>
  );
};

export default ProjectLensMain;
