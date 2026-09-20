import React from 'react';
import { ProjectItem } from '../../../../types';
import { LearningWorld3D } from './LearningWorld3D';
import { SmartCityWorld3D } from './SmartCityWorld3D';
import { AiForestWorld3D } from './AiForestWorld3D';
import { CareerDocumentWorld3D } from './CareerDocumentWorld3D';
import { DeveloperSystemWorld3D } from './DeveloperSystemWorld3D';

export interface LivingProjectWorldProps {
  project: ProjectItem;
  isSelected?: boolean;
  scale?: number;
}

export const LivingProjectWorld: React.FC<LivingProjectWorldProps> = ({
  project,
  isSelected = true,
  scale = 1,
}) => {
  const visualType = (project?.visualType || 'learning-world').toLowerCase();

  switch (visualType) {
    case 'learning-world':
    case 'laptop':
    case 'education':
      return <LearningWorld3D project={project} scale={scale} />;

    case 'smart-city':
    case 'car':
    case 'transportation':
      return <SmartCityWorld3D project={project} scale={scale} />;

    case 'ai-forest':
    case 'ai-brain':
    case 'forest-ai':
      return <AiForestWorld3D project={project} scale={scale} />;

    case 'career-document':
    case 'phone':
    case 'resume':
      return <CareerDocumentWorld3D project={project} scale={scale} />;

    case 'developer-system':
    case 'terminal':
    case 'developer-tool':
      return <DeveloperSystemWorld3D project={project} scale={scale} />;

    default:
      return <LearningWorld3D project={project} scale={scale} />;
  }
};
