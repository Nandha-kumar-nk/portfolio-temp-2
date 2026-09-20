import React from 'react';
import { DimensionsMain } from './dimensions/DimensionsMain';

interface ProjectsPageProps {
  initialProjectId?: string;
  isActive?: boolean;
  onNavigateHome?: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  initialProjectId,
  isActive,
  onNavigateHome,
}) => {
  return (
    <DimensionsMain
      initialProjectId={initialProjectId}
      isActive={isActive}
      onNavigateHome={onNavigateHome}
    />
  );
};

export default ProjectsPage;
