import React, { useState, useCallback } from 'react';
import { ProjectDimensionsBackground } from '../dimensions/ProjectDimensionsBackground';
import { PROJECTS_DATA, ProjectItem } from '../../../data/projectsData';
import { ChaptersHeader } from './ChaptersHeader';
import { ChaptersCursorFollower } from './ChaptersCursorFollower';
import { ChaptersListView } from './ChaptersListView';
import { ChaptersDetailView } from './ChaptersDetailView';

interface ChaptersMainProps {
  initialProjectId?: string;
}

export const ChaptersMain: React.FC<ChaptersMainProps> = ({
  initialProjectId,
}) => {
  const projects = PROJECTS_DATA;
  const initialIndex = initialProjectId
    ? projects.findIndex((p) => p.id === initialProjectId)
    : 0;

  const [activeProjectId, setActiveProjectId] = useState<string>(
    projects[initialIndex >= 0 ? initialIndex : 0].id
  );
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const currentIndex = projects.findIndex((p) => p.id === activeProjectId);
  const currentProject: ProjectItem =
    projects[currentIndex >= 0 ? currentIndex : 0];

  const handleSelectProject = useCallback(
    (targetId: string) => {
      const targetIdx = projects.findIndex((p) => p.id === targetId);
      const newDir = targetIdx > currentIndex ? 'forward' : 'backward';

      setDirection(newDir);

      if (isDetailOpen) {
        setIsTransitioning(true);
        setTimeout(() => {
          setActiveProjectId(targetId);
          setIsTransitioning(false);
        }, 350);
      } else {
        setActiveProjectId(targetId);
        setIsDetailOpen(true);
      }
    },
    [currentIndex, isDetailOpen, projects]
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

  const handleCloseDetail = useCallback(() => {
    setIsDetailOpen(false);
  }, []);

  return (
    <ProjectDimensionsBackground qualityTier="HIGH">
      <div className="w-full min-h-screen text-slate-100 flex flex-col justify-between pb-12 relative overflow-x-hidden font-mono select-none">
        {/* Custom Cursor Follower on Desktop */}
        <ChaptersCursorFollower isVisible={hoveredProjectId !== null && !isDetailOpen} />

        {/* Editorial Header - Safely below fixed global header */}
        <ChaptersHeader />

        {/* Main Content Area */}
        <main className="w-full flex-1 flex flex-col justify-center">
          {!isDetailOpen ? (
            <ChaptersListView
              projects={projects}
              hoveredProjectId={hoveredProjectId}
              onHoverProject={setHoveredProjectId}
              onSelectProject={handleSelectProject}
            />
          ) : (
            <ChaptersDetailView
              project={currentProject}
              currentIndex={currentIndex}
              totalProjects={projects.length}
              onPrevProject={handlePrevProject}
              onNextProject={handleNextProject}
              onCloseDetail={handleCloseDetail}
              direction={direction}
              isTransitioning={isTransitioning}
            />
          )}
        </main>
      </div>
    </ProjectDimensionsBackground>
  );
};

export default ChaptersMain;
