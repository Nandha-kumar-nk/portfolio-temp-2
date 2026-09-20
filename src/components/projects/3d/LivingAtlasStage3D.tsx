import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem } from '../../../types';
import { LivingProjectWorld } from './worlds/LivingProjectWorld';

interface LivingAtlasStage3DProps {
  selectedProject: ProjectItem;
  onSelectProject?: (projectId: string) => void;
  isMobile?: boolean;
  isTablet?: boolean;
}

export const LivingAtlasStage3D: React.FC<LivingAtlasStage3DProps> = ({
  selectedProject,
  isMobile = false,
  isTablet = false,
}) => {
  // Two slots to handle smooth cross-fades between visual worlds
  const [currentProject, setCurrentProject] = useState<ProjectItem>(selectedProject);
  const [prevProject, setPrevProject] = useState<ProjectItem | null>(null);
  const [transitionProgress, setTransitionProgress] = useState(1); // 0 -> 1

  const currentGroupRef = useRef<THREE.Group>(null);
  const prevGroupRef = useRef<THREE.Group>(null);
  const stageRingRef = useRef<THREE.Mesh>(null);
  const stageFloorRef = useRef<THREE.Mesh>(null);

  // Detect project change to trigger smooth transition
  useEffect(() => {
    if (selectedProject.id !== currentProject.id) {
      setPrevProject(currentProject);
      setCurrentProject(selectedProject);
      setTransitionProgress(0);
    }
  }, [selectedProject, currentProject]);

  useFrame((_, delta) => {
    // Advance transition smoothly
    if (transitionProgress < 1) {
      const nextProgress = Math.min(1, transitionProgress + delta * 2.2); // ~450ms transition
      setTransitionProgress(nextProgress);

      if (nextProgress >= 1) {
        setPrevProject(null);
      }
    }

    // Cubic ease-out
    const t = transitionProgress;
    const easeOut = 1 - Math.pow(1 - t, 3);

    // Current project visual scales up and glides forward
    if (currentGroupRef.current) {
      const scaleVal = THREE.MathUtils.lerp(0.05, 1, easeOut);
      currentGroupRef.current.scale.set(scaleVal, scaleVal, scaleVal);
      currentGroupRef.current.position.y = THREE.MathUtils.lerp(-0.4, 0, easeOut);
    }

    // Prev project visual shrinks and glides back
    if (prevGroupRef.current && prevProject) {
      const scaleVal = THREE.MathUtils.lerp(1, 0.05, easeOut);
      prevGroupRef.current.scale.set(scaleVal, scaleVal, scaleVal);
      prevGroupRef.current.position.y = THREE.MathUtils.lerp(0, -0.4, easeOut);
    }

    // Animate stage pedestal ring
    if (stageRingRef.current) {
      stageRingRef.current.rotation.z += delta * 0.2;
    }
  });

  const baseScale = isMobile ? 0.72 : isTablet ? 0.88 : 1.05;

  return (
    <group position={[0, -0.3, 0]}>
      {/* ================================================================= */}
      {/* 1. STAGE FOUNDATION / HOLOGRAPHIC PEDESTAL                         */}
      {/* ================================================================= */}
      <group position={[0, -0.35, 0]}>
        {/* Dark stage plinth */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[2.7, 2.9, 0.2, 32]} />
          <meshStandardMaterial
            color="#040912"
            metalness={0.92}
            roughness={0.15}
          />
        </mesh>

        {/* Stage surface disc */}
        <mesh ref={stageFloorRef} position={[0, -0.04, 0]}>
          <cylinderGeometry args={[2.55, 2.65, 0.04, 32]} />
          <meshStandardMaterial
            color="#071220"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* Outer glowing cyber ring */}
        <mesh
          ref={stageRingRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.015, 0]}
        >
          <ringGeometry args={[2.48, 2.54, 48]} />
          <meshBasicMaterial
            color={currentProject.themeColor || '#00f5ff'}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Subtle grid wireframe projection */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.014, 0]}>
          <ringGeometry args={[0.5, 2.4, 24]} />
          <meshBasicMaterial
            color="#0284c7"
            wireframe
            transparent
            opacity={0.18}
          />
        </mesh>

        {/* Upward stage light column */}
        <pointLight
          position={[0, 0.5, 0]}
          color={currentProject.themeColor || '#00f5ff'}
          intensity={1.8}
          distance={4.5}
        />
      </group>

      {/* ================================================================= */}
      {/* 2. LIVING PROJECT WORLDS (CROSS-FADING SLOTS)                      */}
      {/* ================================================================= */}
      {/* Active Project Visual */}
      <group ref={currentGroupRef} scale={baseScale}>
        <LivingProjectWorld
          project={currentProject}
          isSelected={true}
          scale={baseScale}
        />
      </group>

      {/* Exiting Previous Project Visual (during transition) */}
      {prevProject && (
        <group ref={prevGroupRef} scale={baseScale}>
          <LivingProjectWorld
            project={prevProject}
            isSelected={false}
            scale={baseScale}
          />
        </group>
      )}
    </group>
  );
};
