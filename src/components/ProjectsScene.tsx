import React from 'react';
import { DeviceQualityInfo } from '../hooks/useDeviceQuality';
import { ProjectsPage } from './projects/ProjectsPage';

interface ProjectsSceneProps {
  isActive?: boolean;
  onNavigateHome?: () => void;
  onNavigateAbout?: () => void;
  onNavigateSkills?: () => void;
  onNavigateContact?: () => void;
  onReplaySequence?: () => void;
  quality?: DeviceQualityInfo;
  isAudioOn?: boolean;
  onToggleAudio?: () => void;
}

export const ProjectsScene: React.FC<ProjectsSceneProps> = ({
  isActive = true,
  onNavigateHome,
}) => {
  return (
    <div
      id="projects-scene-root"
      className="relative w-full min-h-[100svh] bg-transparent text-white select-none box-border"
    >
      <ProjectsPage initialProjectId="speed-taxi" isActive={isActive} onNavigateHome={onNavigateHome} />
    </div>
  );
};

export default ProjectsScene;
