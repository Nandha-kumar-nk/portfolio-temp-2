import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { ProjectorModel } from './ProjectorModel';
import { ProjectionBeam } from './ProjectionBeam';
import { HolographicScreen } from './HolographicScreen';
import { ProjectItem } from '../../../data/projectsData';
import * as THREE from 'three';

interface ProjectorStage3DProps {
  currentProject: ProjectItem;
  transitionPhase: number;
  transitionProgress: number;
  isMobile?: boolean;
}

// Dais & Environment Component
const StageEnvironment: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => {
  // Atmospheric ambient motes
  const moteCount = isMobile ? 35 : 80;
  const moteGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(moteCount * 3);
    for (let i = 0; i < moteCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 6 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geom;
  }, [moteCount]);

  const moteMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.03,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  return (
    <>
      {/* 1. Cinematic Ambient & Colored Lights */}
      <ambientLight intensity={0.45} color="#060e1d" />

      {/* Screen Key Spotlight */}
      <spotLight
        position={[1.5, 5.0, 3.5]}
        angle={0.65}
        penumbra={0.8}
        intensity={2.2}
        color="#e0f2fe"
      />

      {/* Projector Highlight Rim Light */}
      <directionalLight position={[-5.0, 4.0, 2.0]} intensity={1.5} color="#00f5ff" />

      {/* Warm Ambient Amber Fill on Projector */}
      <pointLight position={[-4.0, 1.5, -1.0]} intensity={1.2} color="#f59e0b" distance={6} />

      {/* Ground Horizon Glow */}
      <pointLight position={[0, -2.0, 0]} intensity={1.0} color="#00f5ff" distance={8} />

      {/* 2. Floating Atmospheric Motes */}
      <points geometry={moteGeometry} material={moteMaterial} />

      {/* 3. Curved Metallic Tiered Dais Platform (Matching Reference) */}
      <group position={[0, -1.85, 0]}>
        {/* Upper reflective circular floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[9.0, 64]} />
          <meshStandardMaterial
            color="#020612"
            roughness={0.15}
            metalness={0.92}
          />
        </mesh>

        {/* Concentric Glowing Cyan Neon Rings along stage perimeter */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[4.8, 4.88, 64]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.65} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[6.2, 6.26, 64]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.35} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[7.8, 7.85, 64]} />
          <meshBasicMaterial color="#0284c7" transparent opacity={0.25} />
        </mesh>

        {/* Outer tiered stepped riser cylinder */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[9.1, 9.4, 0.4, 48]} />
          <meshStandardMaterial
            color="#040915"
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>
      </group>
    </>
  );
};

export const ProjectorStage3D: React.FC<ProjectorStage3DProps> = ({
  currentProject,
  transitionPhase,
  transitionProgress,
  isMobile = false,
}) => {
  // Spatial coordinates tuned to replicate the reference composition:
  // Projector on left: [-3.6, 0.1, 0.3] pointing toward screen at [1.0, 0.35, 0]
  const projectorPos: [number, number, number] = isMobile
    ? [-2.2, -0.4, 0.2]
    : [-3.6, 0.05, 0.3];

  const projectorRotation: [number, number, number] = isMobile
    ? [0, 0.35, 0]
    : [0, 0.42, 0];

  const screenPos: [number, number, number] = isMobile
    ? [0.5, 0.3, 0]
    : [1.1, 0.38, 0];

  const screenRotation: [number, number, number] = isMobile
    ? [0, -0.1, 0]
    : [0, -0.15, 0];

  // Beam Start = Lens tip in world coordinates
  const lensTipPos: [number, number, number] = isMobile
    ? [-1.7, -0.25, 0.35]
    : [-2.85, 0.18, 0.45];

  // Camera Settings
  const cameraFov = isMobile ? 55 : 44;
  const cameraPos: [number, number, number] = isMobile
    ? [-0.2, 0.5, 6.2]
    : [-0.4, 0.55, 7.0];

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] lg:h-[500px] select-none pointer-events-none">
      <Canvas
        camera={{ position: cameraPos, fov: cameraFov }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <StageEnvironment isMobile={isMobile} />

          {/* 3D Film Projector */}
          <ProjectorModel
            position={projectorPos}
            rotation={projectorRotation}
            transitionPhase={transitionPhase}
            transitionProgress={transitionProgress}
            accentColor={currentProject.accentColor || '#00f5ff'}
            isMobile={isMobile}
          />

          {/* Volumetric Projection Light Beam */}
          <ProjectionBeam
            startPos={lensTipPos}
            targetPos={screenPos}
            transitionPhase={transitionPhase}
            transitionProgress={transitionProgress}
            accentColor={currentProject.accentColor || '#00f5ff'}
            isMobile={isMobile}
          />

          {/* Central Holographic Projected Screen */}
          <HolographicScreen
            project={currentProject}
            position={screenPos}
            rotation={screenRotation}
            transitionPhase={transitionPhase}
            transitionProgress={transitionProgress}
            accentColor={currentProject.accentColor || '#00f5ff'}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
