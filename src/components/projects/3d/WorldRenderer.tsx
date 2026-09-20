import React from 'react';
import { ProjectItem } from '../../../types';
import { ProjectNodeVisual } from './visuals/ProjectNodeVisual';

interface WorldRendererProps {
  project: ProjectItem;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: () => void;
  scale?: number;
  showLabels?: boolean;
}

export const WorldRenderer: React.FC<WorldRendererProps> = ({
  project,
  isSelected,
  isDimmed,
  onSelect,
  scale = 1,
  showLabels = true,
}) => {
  return (
    <ProjectNodeVisual
      project={project}
      isSelected={isSelected}
      isDimmed={isDimmed}
      onSelect={onSelect}
      scale={scale}
      showLabels={showLabels}
    />
  );
};
