import React from 'react';
import { ProgressiveDNA } from './dimensions/ProgressiveDNA';
import { ProjectItem } from '../../data/projectsData';

interface ProjectDNAProps {
  project: ProjectItem;
  isMobile?: boolean;
  isTablet?: boolean;
}

export const ProjectDNA: React.FC<ProjectDNAProps> = ({ project }) => {
  return <ProgressiveDNA project={project} />;
};

export default ProjectDNA;
