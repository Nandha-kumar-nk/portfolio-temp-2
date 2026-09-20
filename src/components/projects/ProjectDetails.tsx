import React from 'react';
import { ProjectItem } from '../../types';
import { ProjectDetailsPanel } from './ProjectDetailsPanel';

export interface ProjectDetailsProps {
  project: ProjectItem;
  variant?: 'desktop' | 'mobile-inline';
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = (props) => {
  return <ProjectDetailsPanel {...props} />;
};

export default ProjectDetails;
