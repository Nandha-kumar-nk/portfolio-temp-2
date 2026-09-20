import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ProjectItem } from '../../data/projectsData';
import { ProjectCrystal } from './crystal/ProjectCrystal';
import { ProjectPreviews } from './crystal/ProjectPreviews';
import { useProjectTexture } from './crystal/useProjectTexture';

interface ProjectStageProps {
  projects: ProjectItem[];
  currentProject: ProjectItem;
  currentIndex: number;
  fromProjectId?: string;
  phase: number;
  phaseProgress: number;
  direction: number;
  onSelectProject: (index: number) => void;
  disabled?: boolean;
  isMobile?: boolean;
}

export const ProjectStage: React.FC<ProjectStageProps> = ({
  projects,
  currentProject,
  currentIndex,
  fromProjectId,
  phase,
  phaseProgress,
  direction,
  onSelectProject,
  disabled = false,
  isMobile = false,
}) => {
  // Load remote project screenshot as texture with fallback
  const texture = useProjectTexture(
    currentProject.image,
    currentProject.title,
    currentProject.accentColor
  );

  return (
    <div className="relative w-full flex items-center justify-center select-none py-1 md:py-2">
      {/* Surrounding Exhibits around the central crystal on Desktop and Tablet */}
      <ProjectPreviews
        projects={projects}
        selectedIndex={currentIndex}
        onSelectProject={onSelectProject}
        disabled={disabled}
        phase={phase}
      />

      {/* 
        Central Crystal Container strictly obeying sizing specs:
        Desktop: 360-430px (max 450px)
        Tablet: 300-360px
        Mobile: 195-250px (min(62vw, 240px)), height: 230-265px
      */}
      <div
        className="relative flex items-center justify-center mx-auto transition-all duration-300
          w-[min(62vw,240px)] h-[240px]
          sm:w-[280px] sm:h-[265px]
          md:w-[330px] md:h-[310px]
          lg:w-[380px] lg:h-[350px]
          xl:w-[410px] xl:h-[370px]
          max-w-[430px] max-h-[390px]"
      >
        <Canvas
          camera={{
            position: [0, 0.04, isMobile ? 2.95 : 2.75],
            fov: isMobile ? 47 : 44,
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <ProjectCrystal
              project={currentProject}
              texture={texture}
              fromProjectId={fromProjectId}
              phase={phase}
              phaseProgress={phaseProgress}
              direction={direction}
              isMobile={isMobile}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};
