import React, { useRef, useEffect, useCallback } from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectVoyageCard } from './ProjectVoyageCard';

interface ProjectVoyageSpiralProps {
  projects: ProjectItem[];
  activeIndex: number;
  totalProjects: number;
  isMobile: boolean;
  isTablet: boolean;
  isTransitioning: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

export const ProjectVoyageSpiral: React.FC<ProjectVoyageSpiralProps> = ({
  projects,
  activeIndex,
  totalProjects,
  isMobile,
  isTablet,
  isTransitioning,
  onPrev,
  onNext,
  onSelectIndex,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartYRef = useRef<number>(0);
  const lastWheelTimeRef = useRef<number>(0);

  // =========================================================================
  // MOUSE WHEEL CONTROL (Scroll down -> Next project, Scroll up -> Prev project)
  // =========================================================================
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // Throttle wheel inputs to prevent accidental rapid jumps
      const now = Date.now();
      if (now - lastWheelTimeRef.current < 450 || isTransitioning) return;

      if (Math.abs(e.deltaY) > 25) {
        lastWheelTimeRef.current = now;
        if (e.deltaY > 0) {
          onNext();
        } else {
          onPrev();
        }
      }
    },
    [isTransitioning, onNext, onPrev]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  // =========================================================================
  // VERTICAL DRAG CONTROL (Mouse drag up/down on desktop)
  // =========================================================================
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || isTransitioning) return;

    const deltaY = dragStartYRef.current - e.clientY;
    if (Math.abs(deltaY) > 55) {
      isDraggingRef.current = false;
      if (deltaY > 0) {
        onNext(); // Dragged up -> Next project
      } else {
        onPrev(); // Dragged down -> Prev project
      }
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // =========================================================================
  // TOUCH SWIPE CONTROL (Touch drag up/down/left/right)
  // =========================================================================
  const touchStartYRef = useRef<number>(0);
  const touchStartXRef = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isTransitioning) return;

    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;

    const deltaY = touchStartYRef.current - touchEndY;
    const deltaX = touchStartXRef.current - touchEndX;

    // Trigger on clear vertical or horizontal swipes
    if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY > 0) {
        onNext(); // Swiped up -> Next project
      } else {
        onPrev(); // Swiped down -> Prev project
      }
    } else if (Math.abs(deltaX) > 55) {
      if (deltaX > 0) {
        onNext(); // Swiped left -> Next project
      } else {
        onPrev(); // Swiped right -> Prev project
      }
    }
  };

  return (
    <div
      ref={containerRef}
      id="project-voyage-3d-stage"
      className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-visible"
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Container holding 3D Cards */}
      <div
        className="relative w-full h-full flex items-center justify-center transform-style-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {projects.map((project, index) => (
          <ProjectVoyageCard
            key={project.id}
            project={project}
            index={index}
            activeIndex={activeIndex}
            totalProjects={totalProjects}
            isMobile={isMobile}
            isTablet={isTablet}
            isTransitioning={isTransitioning}
            onSelect={onSelectIndex}
          />
        ))}
      </div>
    </div>
  );
};
