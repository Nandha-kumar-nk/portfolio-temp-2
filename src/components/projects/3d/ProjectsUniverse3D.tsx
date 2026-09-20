import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem, ProjectCategory } from '../../../types';
import { CosmicSpace3D } from './CosmicSpace3D';
import { ShowcaseBayPlatform3D } from './ShowcaseBayPlatform3D';

interface ProjectsUniverse3DProps {
  projects: ProjectItem[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  selectedCategory: ProjectCategory;
  isMobile: boolean;
  isTablet: boolean;
}

// Camera controller with subtle, restrained mouse parallax
function CameraRig({
  isMobile,
  isTablet,
}: {
  isMobile: boolean;
  isTablet: boolean;
}) {
  const { camera } = useThree();
  const vec = useRef(new THREE.Vector3());

  useFrame((state) => {
    // Subtle parallax factors that keep the hero centered without distraction
    const px = state.pointer.x * (isMobile ? 0.15 : 0.35);
    const py = state.pointer.y * (isMobile ? 0.1 : 0.2);

    if (isMobile) {
      vec.current.set(px * 0.2, 0.3 + py * 0.15, 7.2);
      camera.position.lerp(vec.current, 0.05);
      camera.lookAt(0, 0.25, 0);
    } else if (isTablet) {
      vec.current.set(px * 0.3, 0.35 + py * 0.15, 7.0);
      camera.position.lerp(vec.current, 0.05);
      camera.lookAt(0, 0.15, 0);
    } else {
      // Desktop
      vec.current.set(px * 0.4, 0.45 + py * 0.18, 6.6);
      camera.position.lerp(vec.current, 0.05);
      camera.lookAt(0, 0.1, 0);
    }
  });

  return null;
}

export const ProjectsUniverse3D: React.FC<ProjectsUniverse3DProps> = ({
  projects,
  selectedProjectId,
  onSelectProject: _onSelectProject,
  selectedCategory: _selectedCategory,
  isMobile,
  isTablet,
}) => {
  // Find selected hero project
  const activeProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <>
      {/* 1. CINEMATIC CAMERA CONTROLLER */}
      <CameraRig isMobile={isMobile} isTablet={isTablet} />

      {/* 2. DEEP COSMIC ATMOSPHERE BACKGROUND */}
      <CosmicSpace3D />

      {/* 3. ATMOSPHERIC EXHIBITION BAY LIGHTING */}
      {/* Ambient Fill */}
      <ambientLight intensity={0.7} color="#081426" />

      {/* Key Directional Light */}
      <directionalLight
        position={[3.5, 6.0, 4.5]}
        intensity={1.8}
        color="#e0f2fe"
      />

      {/* Soft Cyan Rim Backlight */}
      <directionalLight
        position={[-3.5, 3.0, -3.5]}
        intensity={1.2}
        color="#00f5ff"
      />

      {/* Subtle Bottom Uplight */}
      <pointLight
        position={[0, -2.5, 2.5]}
        intensity={0.6}
        distance={6}
        color="#38bdf8"
      />

      {/* =================================================================== */}
      {/* 4. 3D PROJECT SHOWCASE BAY (PEDESTAL + HERO VISUAL ONLY)            */}
      {/* Zero surrounding clutter, zero extra floating globes, pure hero     */}
      {/* =================================================================== */}
      <ShowcaseBayPlatform3D
        project={activeProject}
        isMobile={isMobile}
        isTablet={isTablet}
      />
    </>
  );
};
