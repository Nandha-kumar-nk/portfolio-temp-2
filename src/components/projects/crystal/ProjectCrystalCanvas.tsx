import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem } from '../../../data/projectsData';
import { CrystalModel } from './CrystalModel';
import { CrystalParticles } from './CrystalParticles';
import { CrystalPlatform } from './CrystalPlatform';
import { ProjectEnvironment } from './ProjectEnvironment';
import { CrystalFallback } from './CrystalFallback';

interface ProjectCrystalCanvasProps {
  project: ProjectItem;
  fromProjectId?: string;
  phase: number; // 0=IDLE, 1=FOCUS, 2=CHARGE, 3=FRACTURE, 4=SHATTER, 5=PARTICLE, 6=REBUILD, 7=NEW PROJECT
  phaseProgress: number; // 0 to 1
  overallProgress: number; // 0 to 1
  direction: number; // 1 for next, -1 for prev
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
}

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (_e) {
    return false;
  }
}

export const ProjectCrystalCanvas: React.FC<ProjectCrystalCanvasProps> = (props) => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [hasRenderError, setHasRenderError] = useState<boolean>(false);

  useEffect(() => {
    if (!checkWebGLSupport()) {
      console.warn('WebGL is not supported. Showing fallback crystal.');
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL || hasRenderError) {
    return <CrystalFallback project={props.project} isMobile={props.isMobile} />;
  }

  return (
    <div className="relative w-full h-full select-none pointer-events-auto flex items-center justify-center">
      <Canvas
        camera={{
          position: [0, 0.04, props.isMobile ? 3.6 : 3.5],
          fov: props.isMobile ? 38 : 36,
          near: 0.1,
          far: 50,
        }}
        dpr={props.isMobile ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.warn('WebGL context lost. Switching to fallback.');
            setHasRenderError(true);
          });
        }}
        style={{ pointerEvents: 'auto' }}
      >
        <CrystalSceneController {...props} />
      </Canvas>
    </div>
  );
};

const CrystalSceneController: React.FC<ProjectCrystalCanvasProps> = ({
  project,
  phase,
  phaseProgress,
  overallProgress,
  direction,
  isMobile = false,
  prefersReducedMotion = false,
}) => {
  const crystalMasterRef = useRef<THREE.Group>(null);
  const { camera, pointer } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle desktop cursor tracking (smooth, damped, small range)
    if (!isMobile && !prefersReducedMotion) {
      const targetCamX = pointer.x * 0.15;
      const targetCamY = 0.04 + pointer.y * 0.1;
      camera.position.x += (targetCamX - camera.position.x) * delta * 2.0;
      camera.position.y += (targetCamY - camera.position.y) * delta * 2.0;
      camera.lookAt(0, 0, 0);
    }

    if (crystalMasterRef.current) {
      if (phase === 1) {
        // Phase 1 (Focus): gently slows and aligns to center
        crystalMasterRef.current.rotation.y += (0 - crystalMasterRef.current.rotation.y) * delta * 7;
        crystalMasterRef.current.rotation.x += (0 - crystalMasterRef.current.rotation.x) * delta * 7;
        crystalMasterRef.current.rotation.z += (0 - crystalMasterRef.current.rotation.z) * delta * 7;
      } else if (phase === 2) {
        // Phase 2 (Charge): subtle rapid energy tremor
        crystalMasterRef.current.rotation.y += delta * 0.2;
        crystalMasterRef.current.position.y = Math.sin(t * 14) * 0.006;
      } else {
        // IDLE: very slow rotation, subtle vertical floating
        const floatY = Math.sin(t * 1.1) * 0.03;
        crystalMasterRef.current.position.y = floatY;

        crystalMasterRef.current.rotation.y += delta * 0.08;
        crystalMasterRef.current.rotation.x = Math.sin(t * 0.5) * 0.015;
        crystalMasterRef.current.rotation.z = Math.cos(t * 0.4) * 0.012;
      }
    }
  });

  return (
    <>
      {/* 1. Cinematic Environment & Lighting */}
      <ProjectEnvironment accentColor={project.accentColor} />

      {/* 2. Scaled Platform directly below crystal */}
      <CrystalPlatform
        accentColor={project.accentColor}
        phase={phase}
        phaseProgress={phaseProgress}
        isMobile={isMobile}
      />

      {/* 3. Central Crystal Assembly using the Blender GLB Asset */}
      <group ref={crystalMasterRef} position={[0, 0, 0]}>
        <Suspense fallback={null}>
          <CrystalModel
            projectId={project.id}
            accentColor={project.accentColor}
            themeColor={project.themeColor}
            phase={phase}
            phaseProgress={phaseProgress}
            overallProgress={overallProgress}
            direction={direction}
            isMobile={isMobile}
          />
        </Suspense>

        {/* Ambient & Transition Particle Swarm (Controlled count) */}
        <CrystalParticles
          accentColor={project.accentColor}
          phase={phase}
          phaseProgress={phaseProgress}
          overallProgress={overallProgress}
          direction={direction}
          isMobile={isMobile}
        />
      </group>
    </>
  );
};
