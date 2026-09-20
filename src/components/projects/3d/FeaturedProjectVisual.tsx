import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ProjectItem } from '../../../types';
import { GLBProjectVisual } from './visuals/GLBProjectVisual';

interface FeaturedProjectVisualProps {
  project: ProjectItem;
  isMobile?: boolean;
  isTablet?: boolean;
  position?: [number, number, number];
  scale?: number;
}

export const FeaturedProjectVisual: React.FC<FeaturedProjectVisualProps> = ({
  project,
  isMobile = false,
  isTablet = false,
  position = [0, 1.25, 0],
  scale = 1.4,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const visualHolderRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Transition animation state when switching projects
  const [transitionProgress, setTransitionProgress] = useState(1);
  const prevProjectIdRef = useRef(project.id);
  const transitionPhaseRef = useRef<'idle' | 'exit' | 'enter'>('idle');
  const animTimeRef = useRef(0);

  const accent = project.accentColor || '#00f5ff';

  useEffect(() => {
    if (project.id !== prevProjectIdRef.current) {
      prevProjectIdRef.current = project.id;
      transitionPhaseRef.current = 'enter';
      animTimeRef.current = 0;
      setTransitionProgress(0);
    }
  }, [project.id]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Gentle floating & hovering motion
    if (groupRef.current) {
      const hoverY = Math.sin(t * 1.4) * (isMobile ? 0.04 : 0.06);
      groupRef.current.position.y = position[1] + hoverY;

      // Subtle yaw rotation
      const yaw = Math.sin(t * 0.7) * 0.08;
      groupRef.current.rotation.y = yaw;
    }

    // Holographic beam pulsation
    if (beamRef.current) {
      const pulse = 0.85 + Math.sin(t * 3.0) * 0.15;
      beamRef.current.scale.set(pulse, 1, pulse);
    }

    // Platform ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2;
    }

    // Transition interpolation
    if (transitionPhaseRef.current === 'enter') {
      animTimeRef.current += delta * 3.5;
      const progress = Math.min(1, animTimeRef.current);
      setTransitionProgress(progress);

      if (visualHolderRef.current) {
        // Smooth scale bounce from 0.7 to 1.0
        const currentScale = THREE.MathUtils.lerp(0.7, 1.0, progress);
        visualHolderRef.current.scale.set(currentScale, currentScale, currentScale);
        visualHolderRef.current.rotation.y = (1 - progress) * 0.6;
      }

      if (progress >= 1) {
        transitionPhaseRef.current = 'idle';
      }
    }
  });

  const effectiveScale = isMobile ? scale * 0.85 : isTablet ? scale * 0.95 : scale;

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1], position[2]]}
      scale={[effectiveScale, effectiveScale, effectiveScale]}
    >
      {/* =================================================================== */}
      {/* 1. HOLOGRAPHIC EMISSION PEDESTAL / BASE                             */}
      {/* =================================================================== */}
      <group position={[0, -0.22, 0]}>
        {/* Core Base Cylinder */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.95, 1.1, 0.12, 36]} />
          <meshStandardMaterial
            color="#050a17"
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>

        {/* Outer Glowing Neon Rim */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.98, 1.02, 0.04, 36]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Top Surface Hologram Concentric Rings */}
        <mesh ref={ringRef} position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 0.9, 36]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Bright Projector Lens */}
        <mesh position={[0, 0.066, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.45, 32]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Vertical Holographic Light Column rising to the model */}
        <mesh ref={beamRef} position={[0, 0.48, 0]}>
          <cylinderGeometry args={[0.72, 0.92, 0.85, 32, 1, true]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={0.18 * transitionProgress}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner intense light ray beam */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.25, 0.45, 1.1, 24, 1, true]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.12 * transitionProgress}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* =================================================================== */}
      {/* 2. THE FEATURED 3D PROJECT VISUAL (HERO OBJECT)                     */}
      {/* =================================================================== */}
      <group ref={visualHolderRef} position={[0, 0.05, 0]}>
        <GLBProjectVisual
          project={project}
          isSelected={true}
          isDimmed={false}
          scale={1}
        />
      </group>

      {/* =================================================================== */}
      {/* 3. FLOATING HOLOGRAPHIC PROJECT HUD TAG                             */}
      {/* =================================================================== */}
      <Html
        position={[0, -0.65, 0.6]}
        center
        distanceFactor={isMobile ? 8.5 : 7.5}
        className="pointer-events-none select-none"
      >
        <div className="flex flex-col items-center select-none text-center pointer-events-none animate-fade-in">
          <div
            className="px-4 py-2 rounded-2xl bg-slate-950/90 border backdrop-blur-xl shadow-2xl flex flex-col items-center transition-all duration-300"
            style={{
              borderColor: `${accent}80`,
              boxShadow: `0 0 25px ${accent}40, 0 8px 32px rgba(0,0,0,0.8)`,
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 0 8px ${accent}`,
                }}
              />
              <span className="text-xs sm:text-sm font-black font-orbitron tracking-widest text-white uppercase whitespace-nowrap">
                {project.title}
              </span>
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 0 8px ${accent}`,
                }}
              />
            </div>
            <div className="flex items-center gap-2 mt-0.5 whitespace-nowrap">
              <span
                className="text-[9px] sm:text-[10px] font-mono tracking-widest font-bold uppercase"
                style={{ color: accent }}
              >
                {project.categoryName}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-[9px] font-mono tracking-wider text-slate-300 uppercase">
                FEATURED
              </span>
            </div>
          </div>
        </div>
      </Html>

      {/* Dynamic Point Light illuminating the featured model */}
      <pointLight
        color={accent}
        intensity={3.2}
        distance={4.5}
        position={[0, 0.4, 0.8]}
      />
    </group>
  );
};
