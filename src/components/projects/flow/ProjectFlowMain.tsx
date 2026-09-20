import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ProjectDimensionsBackground } from '../dimensions/ProjectDimensionsBackground';
import { PROJECTS_DATA } from '../../../data/projectsData';
import { ProjectFlowHeader } from './ProjectFlowHeader';
import { ProjectFlowParticleCanvas } from './ProjectFlowParticleCanvas';
import { ProjectCubePresentation } from './ProjectCubePresentation';
import { ProjectFlowSelector } from './ProjectFlowSelector';
import { ProjectFlowContactFooter } from './ProjectFlowContactFooter';

interface ProjectFlowMainProps {
  initialProjectId?: string;
}

export const ProjectFlowMain: React.FC<ProjectFlowMainProps> = ({
  initialProjectId,
}) => {
  const projects = PROJECTS_DATA;
  const initialIndex = initialProjectId
    ? projects.findIndex((p) => p.id === initialProjectId)
    : 0;

  const [activeProjectId, setActiveProjectId] = useState<string>(
    projects[initialIndex >= 0 ? initialIndex : 0].id
  );
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastWheelTimeRef = useRef<number>(0);

  const currentIndex = projects.findIndex((p) => p.id === activeProjectId);

  const handleSelectProject = useCallback(
    (targetId: string) => {
      if (targetId === activeProjectId || isTransitioning) return;

      const targetIdx = projects.findIndex((p) => p.id === targetId);
      const newDir = targetIdx > currentIndex ? 'forward' : 'backward';

      setDirection(newDir);
      setIsTransitioning(true);

      setTimeout(() => {
        setActiveProjectId(targetId);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 350);
      }, 300);
    },
    [activeProjectId, isTransitioning, currentIndex, projects]
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

  // Keyboard Arrow Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrevProject();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNextProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevProject, handleNextProject]);

  // Scroll Wheel Project Cube Navigation Listener
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTimeRef.current < 600) return; // Smooth 600ms throttle

      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          handleNextProject();
        } else {
          handlePrevProject();
        }
        lastWheelTimeRef.current = now;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: true });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleNextProject, handlePrevProject]);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextProject(); // Swipe Left -> Next Cube Face
      } else {
        handlePrevProject(); // Swipe Right -> Prev Cube Face
      }
    }
    setTouchStartX(null);
  };

  return (
    <ProjectDimensionsBackground qualityTier="HIGH">
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full min-h-screen text-slate-100 flex flex-col justify-between pb-12 relative overflow-x-hidden font-mono"
      >
        {/* Interactive Particle Field Layer */}
        <ProjectFlowParticleCanvas
          activeProjectId={activeProjectId}
          isTransitioning={isTransitioning}
          direction={direction}
        />

        {/* Top Header - Placed safely below fixed global header */}
        <ProjectFlowHeader />

        {/* Main 3D Cube Stage Presentation */}
        <main className="w-full flex-1 flex flex-col justify-center my-4">
          <ProjectCubePresentation
            projects={projects}
            currentIndex={currentIndex >= 0 ? currentIndex : 0}
            onSelectProject={handleSelectProject}
            direction={direction}
            isTransitioning={isTransitioning}
          />
        </main>

        {/* Cube Selector Bar */}
        <ProjectFlowSelector
          projects={projects}
          selectedProjectId={activeProjectId}
          onSelectProject={handleSelectProject}
          onPrevProject={handlePrevProject}
          onNextProject={handleNextProject}
        />

        {/* Exit Callout to Contact */}
        <ProjectFlowContactFooter />
      </div>
    </ProjectDimensionsBackground>
  );
};

export default ProjectFlowMain;



