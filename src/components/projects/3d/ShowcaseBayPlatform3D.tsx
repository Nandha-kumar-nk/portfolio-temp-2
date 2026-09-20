import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ProjectItem } from '../../../types';
import { LivingProjectWorld } from './worlds/LivingProjectWorld';

interface ShowcaseBayPlatform3DProps {
  project: ProjectItem;
  isMobile?: boolean;
  isTablet?: boolean;
}

export const ShowcaseBayPlatform3D: React.FC<ShowcaseBayPlatform3DProps> = ({
  project,
  isMobile = false,
  isTablet = false,
}) => {
  const { camera } = useThree();

  // Reference hooks
  const stageGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const pulseDiscRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Transition tracking for previous and active projects
  const [currentProject, setCurrentProject] = useState<ProjectItem>(project);
  const [prevProject, setPrevProject] = useState<ProjectItem | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const transitionTimeRef = useRef<number>(1);
  const pulseIntensityRef = useRef<number>(1);

  // Active accent color
  const accent = currentProject.accentColor || '#00f5ff';

  // Handle project change animation
  useEffect(() => {
    if (project.id !== currentProject.id) {
      setPrevProject(currentProject);
      setCurrentProject(project);
      setIsTransitioning(true);
      transitionTimeRef.current = 0;
      pulseIntensityRef.current = 2.4; // Platform pulse wave
    }
  }, [project, currentProject]);

  // Generate subtle, elegant floating data particles
  const particleCount = isMobile ? 24 : 45;
  const [particlePositions, particleVelocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.3 + Math.random() * 1.6;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = -0.3 + Math.random() * 2.2;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = 0.003 + Math.random() * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vel];
  }, [particleCount]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Slow hover & gentle orientation of the platform
    if (stageGroupRef.current) {
      const hover = Math.sin(t * 1.2) * (isMobile ? 0.02 : 0.035);
      stageGroupRef.current.position.y = (isMobile ? -0.25 : -0.1) + hover;
    }

    // 2. Rotating concentric rings on the pedestal
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.18;
    }

    // 3. Volumetric light column pulse
    if (beamRef.current) {
      const basePulse = 0.88 + Math.sin(t * 2.2) * 0.12;
      const pulseMult = pulseIntensityRef.current;
      beamRef.current.scale.set(basePulse * pulseMult, 1, basePulse * pulseMult);
    }

    // 4. Pedestal pulse decay
    if (pulseIntensityRef.current > 1) {
      pulseIntensityRef.current = Math.max(1, pulseIntensityRef.current - delta * 3.2);
    }

    // 5. Update subtle floating data particles
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        arr[i * 3 + 1] += particleVelocities[i * 3 + 1];
        arr[i * 3] += particleVelocities[i * 3];
        arr[i * 3 + 2] += particleVelocities[i * 3 + 2];

        // Reset when particle reaches top
        if (arr[i * 3 + 1] > 2.2) {
          arr[i * 3 + 1] = -0.3;
        }
      }
      posAttr.needsUpdate = true;
    }

    // 6. Project transition interpolation (400–700ms)
    if (isTransitioning) {
      // 0.55s total transition duration (approx 550ms)
      transitionTimeRef.current += delta * 1.8;
      const progress = Math.min(1, transitionTimeRef.current);

      // Subtle camera dolly movement on project change
      if (progress < 1) {
        const camShake = Math.sin(progress * Math.PI) * 0.04;
        camera.position.z = THREE.MathUtils.lerp(
          camera.position.z,
          (isMobile ? 7.6 : 6.8) - camShake,
          0.1
        );
      } else {
        setIsTransitioning(false);
        setPrevProject(null);
      }
    }
  });

  // Calculate transition transforms
  // Progress from 0 (just started) to 1 (completed)
  const progress = Math.min(1, transitionTimeRef.current);
  // Cubic ease-out
  const easeOut = 1 - Math.pow(1 - progress, 3);
  const easeIn = Math.pow(progress, 2);

  // Exiting model values: scale 1 -> 0.35, pos.z: 0 -> -1.0, opacity: 1 -> 0
  const exitScale = 1 - easeIn * 0.65;
  const exitZ = -easeIn * 1.0;
  const exitY = -easeIn * 0.2;
  const exitOpacity = Math.max(0, 1 - easeIn * 1.2);

  // Entering model values: scale 0.45 -> 1.0, pos.z: 0.8 -> 0, opacity: 0 -> 1
  const enterScale = 0.45 + easeOut * 0.55;
  const enterZ = (1 - easeOut) * 0.8;
  const enterY = (1 - easeOut) * 0.25;

  const baseScale = isMobile ? 1.15 : isTablet ? 1.3 : 1.45;

  return (
    <group ref={stageGroupRef} position={[0, isMobile ? -0.25 : -0.1, 0]}>
      {/* =================================================================== */}
      {/* 1. FUTURISTIC CIRCULAR EXHIBITION PLATFORM / PEDESTAL                */}
      {/* =================================================================== */}
      <group position={[0, -0.65, 0]}>
        {/* Foundation Base Disc (Dark Brushed Cyber Titanium) */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[2.0, 2.35, 0.18, 48]} />
          <meshStandardMaterial
            color="#040814"
            metalness={0.96}
            roughness={0.16}
          />
        </mesh>

        {/* Ambient Floor Shadow / Reflection Plate */}
        <mesh position={[0, -0.23, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.5, 3.6, 48]} />
          <meshBasicMaterial
            color="#02050e"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Floor Radial Cyber Ring Lines */}
        <mesh position={[0, -0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.5, 2.53, 48]} />
          <meshBasicMaterial
            color="#00f5ff"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, -0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.2, 3.22, 48]} />
          <meshBasicMaterial
            color="#00f5ff"
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Platform Upper Stepped Tier */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.65, 1.85, 0.14, 48]} />
          <meshStandardMaterial
            color="#070e20"
            metalness={0.94}
            roughness={0.2}
          />
        </mesh>

        {/* Thin Glowing Circular Neon Rim Edge */}
        <mesh position={[0, 0.075, 0]}>
          <cylinderGeometry args={[1.66, 1.69, 0.025, 48]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Top Surface Concentric Holographic Light Rings */}
        <mesh
          ref={ring1Ref}
          position={[0, 0.085, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[1.15, 1.55, 48]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh
          ref={ring2Ref}
          position={[0, 0.087, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.7, 0.95, 36]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Central Projector Lens (Emanates Holographic Volumetric Light) */}
        <mesh position={[0, 0.089, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.55, 36]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.75}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Pulse Ring Disc during transition */}
        <mesh
          ref={pulseDiscRef}
          position={[0, 0.091, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.1, 1.6, 36]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={Math.max(0, (pulseIntensityRef.current - 1) * 0.5)}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Soft Volumetric Light Column rising to the model */}
        <mesh ref={beamRef} position={[0, 0.72, 0]}>
          <cylinderGeometry args={[1.15, 1.55, 1.3, 36, 1, true]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={0.14 * Math.min(1.5, pulseIntensityRef.current)}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Soft Core Light Beam */}
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.45, 0.65, 1.4, 24, 1, true]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* =================================================================== */}
      {/* 2. SUBTLE FLOATING DATA PARTICLES                                   */}
      {/* =================================================================== */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.04 : 0.05}
          color={accent}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* =================================================================== */}
      {/* 3. THE 3D PROJECT VISUAL (HERO OBJECT ON PEDESTAL)                  */}
      {/* =================================================================== */}
      {/* Exiting previous project (fading out, scaling down, moving back) */}
      {prevProject && isTransitioning && (
        <group
          position={[0, exitY, exitZ]}
          scale={[
            baseScale * exitScale,
            baseScale * exitScale,
            baseScale * exitScale,
          ]}
        >
          <LivingProjectWorld
            project={prevProject}
            isSelected={false}
            scale={1}
          />
        </group>
      )}

      {/* Active project (fading in, scaling up, moving into place) */}
      <group
        position={[0, enterY, enterZ]}
        scale={[
          baseScale * enterScale,
          baseScale * enterScale,
          baseScale * enterScale,
        ]}
      >
        <LivingProjectWorld
          project={currentProject}
          isSelected={true}
          scale={1}
        />
      </group>

      {/* =================================================================== */}
      {/* 4. RESTRAINED TITLE UNDERNEATH PEDESTAL                             */}
      {/* Exact format requested:                                             */}
      {/* SWAYAM 2.0                                                          */}
      {/* Full Stack Web Application                                          */}
      {/* =================================================================== */}
      <Html
        position={[0, -1.25, 0.35]}
        center
        distanceFactor={isMobile ? 9.5 : 8.2}
        className="pointer-events-none select-none"
      >
        <div className="flex flex-col items-center select-none text-center pointer-events-none">
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: accent,
                boxShadow: `0 0 8px ${accent}`,
              }}
            />
            <span className="text-sm md:text-base font-black tracking-widest text-white uppercase drop-shadow-[0_0_12px_rgba(0,245,255,0.5)]">
              {currentProject.title}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: accent,
                boxShadow: `0 0 8px ${accent}`,
              }}
            />
          </div>
          <span
            className="text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase font-bold mt-0.5"
            style={{ color: accent }}
          >
            {currentProject.categoryName}
          </span>
        </div>
      </Html>

      {/* Atmospheric Pedestal Point Lights */}
      <pointLight
        color={accent}
        intensity={2.8 * pulseIntensityRef.current}
        distance={4.5}
        position={[0, 0.4, 0.6]}
      />
      <pointLight
        color="#38bdf8"
        intensity={1.2}
        distance={3.5}
        position={[0, -0.4, 0]}
      />
    </group>
  );
};
