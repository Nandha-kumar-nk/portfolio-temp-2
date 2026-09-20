import React, { useState } from 'react';
import { ProjectDimensionsBackground } from '../dimensions/ProjectDimensionsBackground';
import { PROJECTS_DATA, ProjectItem } from '../../../data/projectsData';
import { ArchiveHeader } from './ArchiveHeader';
import { ArchiveCardsRow } from './ArchiveCardsRow';
import { ArchiveProjectShowcase } from './ArchiveProjectShowcase';

interface ProjectArchiveProps {
  initialProjectId?: string;
}

export const ProjectArchive: React.FC<ProjectArchiveProps> = ({
  initialProjectId,
}) => {
  const projects = PROJECTS_DATA;
  const initialIndex = initialProjectId
    ? projects.findIndex((p) => p.id === initialProjectId)
    : 0;

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects[initialIndex >= 0 ? initialIndex : 0].id
  );
  // Default starting state = Archive cards overview visible (isOpen = true for open view or false for initial overview)
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const currentProjectIndex = projects.findIndex((p) => p.id === selectedProjectId);
  const currentProject: ProjectItem =
    projects[currentProjectIndex >= 0 ? currentProjectIndex : 0];

  const handleSelectProject = (projectId: string) => {
    if (projectId === selectedProjectId && isOpen) {
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProjectId(projectId);
      setIsOpen(true);
      setIsTransitioning(false);
    }, 350);
  };

  const handlePrevProject = () => {
    const prevIndex =
      currentProjectIndex === 0 ? projects.length - 1 : currentProjectIndex - 1;
    handleSelectProject(projects[prevIndex].id);
  };

  const handleNextProject = () => {
    const nextIndex =
      currentProjectIndex === projects.length - 1 ? 0 : currentProjectIndex + 1;
    handleSelectProject(projects[nextIndex].id);
  };

  const handleCloseShowcase = () => {
    setIsOpen(false);
  };

  return (
    <ProjectDimensionsBackground qualityTier="HIGH">
      <div className="w-full min-h-screen text-slate-100 flex flex-col justify-between pb-16 relative overflow-x-hidden">
        {/* Top Header - Sits naturally below the fixed global header */}
        <ArchiveHeader />

        {/* 5-Card Horizontal Archive Selector */}
        <ArchiveCardsRow
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelectProject={handleSelectProject}
          isOpen={isOpen}
        />

        {/* Expanded Project Showcase Panel */}
        {isOpen && (
          <ArchiveProjectShowcase
            project={currentProject}
            currentIndex={currentProjectIndex}
            totalProjects={projects.length}
            onPrevProject={handlePrevProject}
            onNextProject={handleNextProject}
            onCloseShowcase={handleCloseShowcase}
            isTransitioning={isTransitioning}
          />
        )}
      </div>
    </ProjectDimensionsBackground>
  );
};

export default ProjectArchive;
