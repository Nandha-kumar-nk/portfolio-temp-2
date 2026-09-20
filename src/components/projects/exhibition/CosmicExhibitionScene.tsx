import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectDisplay3D } from './ProjectDisplay3D';
import { ExhibitionFloor3D } from './ExhibitionFloor3D';
import { ExhibitionCosmos3D } from './ExhibitionCosmos3D';

interface CosmicExhibitionSceneProps {
  projects: ProjectItem[];
  activeIdx: number;
  isMobile?: boolean;
  isTablet?: boolean;
  isTransitioning?: boolean;
  onSelectProject: (index: number) => void;
}

const CameraRig: React.FC<{
  isMobile?: boolean;
  isTablet?: boolean;
  isTransitioning?: boolean;
}> = ({ isMobile = false, isTablet = false, isTransitioning = false }) => {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Default base camera position
    const baseZ = isMobile ? 5.2 : isTablet ? 4.9 : 4.65;
    const baseY = isMobile ? 0.05 : 0.08;

    // During transition: camera surges slightly forward
    const surgeZ = isTransitioning ? -0.35 : 0;

    // Gentle idle breathing
    const breathY = Math.sin(t * 0.8) * 0.02;

    // Mouse parallax on desktop
    const parallaxX = !isMobile ? state.pointer.x * 0.28 : 0;
    const parallaxY = !isMobile ? state.pointer.y * 0.18 : 0;

    const targetX = parallaxX;
    const targetY = baseY + breathY + parallaxY;
    const targetZ = baseZ + surgeZ;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.06);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.06);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.06);

    state.camera.lookAt(0, -0.05, 0);
  });

  return null;
};

export const CosmicExhibitionScene: React.FC<CosmicExhibitionSceneProps> = ({
  projects,
  activeIdx,
  isMobile = false,
  isTablet = false,
  isTransitioning = false,
  onSelectProject,
}) => {
  return (
    <div
      id="cosmic-exhibition-canvas-wrapper"
      className="relative w-full h-full select-none cursor-grab active:cursor-grabbing"
    >
      <Canvas
        camera={{
          position: [0, isMobile ? 0.05 : 0.08, isMobile ? 5.2 : isTablet ? 4.9 : 4.65],
          fov: isMobile ? 48 : isTablet ? 45 : 44,
          near: 0.1,
          far: 50,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <CameraRig
            isMobile={isMobile}
            isTablet={isTablet}
            isTransitioning={isTransitioning}
          />

          {/* Lighting Rig */}
          <ambientLight color="#071326" intensity={0.8} />
          <directionalLight position={[3.5, 5, 4]} intensity={1.3} color="#e0f2fe" />
          <directionalLight position={[-3.5, 3, 2]} intensity={0.6} color="#00f5ff" />
          <pointLight position={[0, 2.5, -1]} intensity={1.2} color="#38bdf8" distance={6} />
          <pointLight position={[0, -0.8, 1]} intensity={0.8} color="#00f5ff" distance={3.5} />

          {/* Background Cosmos & Asteroids & Dust Particles */}
          <ExhibitionCosmos3D isMobile={isMobile} isTransitioning={isTransitioning} />

          {/* Reflective Ground Floor & Neon Perspective Rails */}
          <ExhibitionFloor3D isMobile={isMobile} />

          {/* Five Project Displays in Perspective */}
          {projects.map((project, idx) => (
            <ProjectDisplay3D
              key={project.id}
              project={project}
              index={idx}
              activeIdx={activeIdx}
              totalProjects={projects.length}
              isMobile={isMobile}
              isTablet={isTablet}
              onSelectProject={onSelectProject}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};
