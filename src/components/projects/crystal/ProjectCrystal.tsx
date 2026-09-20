import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { ProjectItem } from '../../../data/projectsData';
import { CrystalGeometry } from './CrystalGeometry';
import { CrystalCore } from './CrystalCore';
import { CrystalProjectScreen } from './CrystalProjectScreen';
import { CrystalFragments } from './CrystalFragments';
import { CrystalParticles } from './CrystalParticles';
import { CrystalPlatform } from './CrystalPlatform';
import { CrystalThematicInterior } from './CrystalThematicInterior';
import { ProjectEnvironment } from './ProjectEnvironment';

interface ProjectCrystalProps {
  project: ProjectItem;
  texture: THREE.Texture;
  fromProjectId?: string;
  phase: number; // 0=IDLE, 1=FOCUS, 2=FRACTURE, 3=FLOW, 4=REBUILD, 5=MATERIALIZE, 6=UPDATE
  phaseProgress: number; // 0 to 1
  direction: number; // 1 for next, -1 for prev
  isMobile?: boolean;
}

export const ProjectCrystal: React.FC<ProjectCrystalProps> = ({
  project,
  texture,
  fromProjectId,
  phase,
  phaseProgress,
  direction,
  isMobile = false,
}) => {
  const crystalMasterRef = useRef<THREE.Group>(null);
  const { camera, pointer } = useThree();

  const focusPulse = phase === 1 ? phaseProgress : phase === 2 ? 1 - phaseProgress : 0;
  const fractureProgress = phase === 2 ? phaseProgress : 0;
  const flowPhase = phase === 3 ? 1 : phase === 4 ? 2 : 0;
  const flowProgress = phase === 3 || phase === 4 ? phaseProgress : 0;
  const dissolveProgress =
    phase === 2
      ? phaseProgress
      : phase === 3
      ? 1
      : phase === 4
      ? 1 - phaseProgress
      : phase === 5
      ? Math.max(0, 1 - phaseProgress * 1.5)
      : 0;

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle cursor parallax on desktop only
    if (!isMobile) {
      const targetCamX = pointer.x * 0.18;
      const targetCamY = 0.04 + pointer.y * 0.12;
      camera.position.x += (targetCamX - camera.position.x) * delta * 2.2;
      camera.position.y += (targetCamY - camera.position.y) * delta * 2.2;
      camera.lookAt(0, 0, 0);
    }

    if (crystalMasterRef.current) {
      if (phase === 1) {
        // Phase 1 (Focus): Crystal pauses rotation, locks onto center
        crystalMasterRef.current.rotation.y += (0 - crystalMasterRef.current.rotation.y) * delta * 8;
        crystalMasterRef.current.rotation.x += (0 - crystalMasterRef.current.rotation.x) * delta * 8;
      } else {
        // Calm floating levitation and slow majestic rotation
        const floatY = Math.sin(t * 1.15) * 0.035;
        crystalMasterRef.current.position.y = floatY;

        crystalMasterRef.current.rotation.y += delta * 0.1;
        crystalMasterRef.current.rotation.x = Math.sin(t * 0.6) * 0.022;
        crystalMasterRef.current.rotation.z = Math.cos(t * 0.45) * 0.016;
      }
    }
  });

  return (
    <>
      {/* 1. Subtle Futuristic Environment & Lighting */}
      <ProjectEnvironment accentColor={project.accentColor} />

      {/* 2. Platform directly below crystal */}
      <CrystalPlatform accentColor={project.accentColor} isMobile={isMobile} />

      {/* 3. Central Crystal Assembly (Strict Layering) */}
      <group ref={crystalMasterRef} position={[0, 0, 0]}>
        {/* Layer 1: Front Transparent Facets & Wireframe Edges (~70-75% transparent) */}
        <CrystalGeometry
          accentColor={project.accentColor}
          themeColor={project.themeColor}
          fractureProgress={fractureProgress}
          focusPulse={focusPulse}
          isMobile={isMobile}
        />

        {/* Layer 2: Real Project Screenshot (Readable, 55-65% inner visual area) */}
        <CrystalProjectScreen
          texture={texture}
          accentColor={project.accentColor}
          dissolveProgress={dissolveProgress}
          isMobile={isMobile}
        />

        {/* Layer 3: Project-Specific Thematic Elements inside Crystal */}
        <CrystalThematicInterior
          projectId={project.id}
          accentColor={project.accentColor}
          dissolveProgress={dissolveProgress}
          isMobile={isMobile}
        />

        {/* Layer 4: Glowing Core behind image & inner geometry */}
        <CrystalCore
          accentColor={project.accentColor}
          focusPulse={focusPulse}
          fractureProgress={fractureProgress}
          isMobile={isMobile}
        />

        {/* Layer 5: Clean floating shards during fracture */}
        <CrystalFragments
          accentColor={project.accentColor}
          phase={phase}
          phaseProgress={phaseProgress}
          overallProgress={flowProgress}
          direction={direction}
          isMobile={isMobile}
        />

        {/* Layer 6: Directional particle flow between projects */}
        <CrystalParticles
          accentColor={project.accentColor}
          phase={phase}
          phaseProgress={phaseProgress}
          overallProgress={flowProgress}
          direction={direction}
          isMobile={isMobile}
        />
      </group>
    </>
  );
};
