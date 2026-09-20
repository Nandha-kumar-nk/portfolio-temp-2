import React from 'react';
import { ProjectItem } from '../../../../types';
import { LearningWorld3D } from '../worlds/LearningWorld3D';
import { SmartCityWorld3D } from '../worlds/SmartCityWorld3D';
import { AiForestWorld3D } from '../worlds/AiForestWorld3D';
import { CareerDocumentWorld3D } from '../worlds/CareerDocumentWorld3D';
import { DeveloperSystemWorld3D } from '../worlds/DeveloperSystemWorld3D';
import { LaptopVisual } from './LaptopVisual';
import { PhoneVisual } from './PhoneVisual';
import { AiBrainVisual } from './AiBrainVisual';
import { TerminalVisual } from './TerminalVisual';
import { CarVisual } from './CarVisual';
import { DatabaseVisual } from './DatabaseVisual';
import { CloudVisual } from './CloudVisual';
import { CubeVisual } from './CubeVisual';
import { DashboardVisual } from './DashboardVisual';
import { ImageVisual } from './ImageVisual';

export interface ProjectVisualProps {
  project: ProjectItem;
  isSelected?: boolean;
  isDimmed?: boolean;
  scale?: number;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  project,
  isSelected = false,
  isDimmed = false,
  scale = 1,
}) => {
  const vType = (project.visualType || 'learning-world').toLowerCase();
  const visualProps = {
    project,
    isSelected,
    isDimmed,
    scale,
  };

  switch (vType) {
    case 'learning-world':
      return <LearningWorld3D project={project} scale={scale} />;

    case 'smart-city':
      return <SmartCityWorld3D project={project} scale={scale} />;

    case 'ai-forest':
      return <AiForestWorld3D project={project} scale={scale} />;

    case 'career-document':
      return <CareerDocumentWorld3D project={project} scale={scale} />;

    case 'developer-system':
      return <DeveloperSystemWorld3D project={project} scale={scale} />;

    case 'laptop':
    case 'education':
      return <LearningWorld3D project={project} scale={scale} />;

    case 'phone':
    case 'resume':
      return <CareerDocumentWorld3D project={project} scale={scale} />;

    case 'brain':
    case 'ai-brain':
    case 'forest-ai':
      return <AiForestWorld3D project={project} scale={scale} />;

    case 'terminal':
    case 'developer-tool':
      return <DeveloperSystemWorld3D project={project} scale={scale} />;

    case 'car':
    case 'transportation':
      return <SmartCityWorld3D project={project} scale={scale} />;

    case 'database':
      return <DatabaseVisual {...visualProps} />;

    case 'cloud':
      return <CloudVisual {...visualProps} />;

    case 'cube':
      return <CubeVisual {...visualProps} />;

    case 'dashboard':
      return <DashboardVisual {...visualProps} />;

    case 'custom':
    case 'custom-model':
    case 'image':
    case 'generic-tech':
    default:
      return <ImageVisual {...visualProps} />;
  }
};
