import React from 'react';

export interface ProjectDimensionsBackgroundProps {
  children?: React.ReactNode;
  qualityTier?: 'LOW' | 'MEDIUM' | 'HIGH';
  isMobile?: boolean;
}

export const ProjectDimensionsBackground: React.FC<ProjectDimensionsBackgroundProps> = ({
  children,
}) => {
  return (
    <div
      id="project-dimensions-container"
      className="relative w-full min-h-screen bg-transparent select-none overflow-x-hidden"
    >
      <div className="relative z-10 w-full min-h-screen flex flex-col pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

export default ProjectDimensionsBackground;
