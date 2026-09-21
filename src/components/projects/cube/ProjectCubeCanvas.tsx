import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectCubeModel } from './ProjectCubeModel';
import { SmallCompanionCubes } from './SmallCompanionCubes';
import { CubePedestal } from './CubePedestal';
import { CubeParticles } from './CubeParticles';

interface ProjectCubeCanvasProps {
  isActive?: boolean;
  project: ProjectItem;
  fromProjectId?: string;
  phase: number;
  phaseProgress: number;
  overallProgress: number;
  direction: number;
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
}

import { isWebGLAvailable } from '../../../utils/webgl';
import { WebGLErrorBoundary, WebGLCosmicFallback } from '../../WebGLErrorBoundary';

function ContextEventListener({ setHasRenderError }: { setHasRenderError: (val: boolean) => void }) {
  const { gl } = useThree();

  useEffect(() => {
    const domEl = gl.domElement;
    if (!domEl) return;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL context lost on ProjectCubeCanvas.');
      setHasRenderError(true);
    };
    const handleContextRestored = () => {
      console.log('WebGL context restored on ProjectCubeCanvas.');
      setHasRenderError(false);
    };

    domEl.addEventListener('webglcontextlost', handleContextLost);
    domEl.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      domEl.removeEventListener('webglcontextlost', handleContextLost);
      domEl.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl, setHasRenderError]);

  return null;
}

export const ProjectCubeCanvas: React.FC<ProjectCubeCanvasProps> = (props) => {
  const { isActive = true } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState<boolean>(true);
  const [hasWebGL, setHasWebGL] = useState<boolean>(() => isWebGLAvailable());
  const [hasRenderError, setHasRenderError] = useState<boolean>(false);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      { rootMargin: '200px 0px 200px 0px', threshold: 0.001 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!hasWebGL || hasRenderError || !isInView) {
    return (
      <div ref={containerRef} className="w-full h-full flex items-center justify-center p-4">
        <WebGLCosmicFallback className="w-full h-full" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full select-none pointer-events-auto flex items-center justify-center">
      <WebGLErrorBoundary fallback={<WebGLCosmicFallback className="w-full h-full" />} name="ProjectCubeCanvas">
        <Canvas
          camera={{
            position: [0, 0.05, props.isMobile ? 3.8 : 3.5],
            fov: props.isMobile ? 38 : 32,
            near: 0.1,
            far: 50,
          }}
          dpr={props.isMobile ? [1, 1] : [1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: props.isMobile ? 'low-power' : 'high-performance',
          }}
          style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}
        >
          <ContextEventListener setHasRenderError={setHasRenderError} />
          <CubeSceneController {...props} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};

const CubeSceneController: React.FC<ProjectCubeCanvasProps> = ({
  project,
  phase,
  phaseProgress,
  overallProgress,
  direction,
  isMobile = false,
  prefersReducedMotion = false,
}) => {
  const { camera, pointer } = useThree();
  const pointLightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    // Subtle desktop cursor parallax (smooth, small range)
    if (!isMobile && !prefersReducedMotion) {
      const targetCamX = pointer.x * 0.12;
      const targetCamY = 0.05 + pointer.y * 0.08;
      camera.position.x += (targetCamX - camera.position.x) * delta * 2.2;
      camera.position.y += (targetCamY - camera.position.y) * delta * 2.2;
      camera.lookAt(0, 0, 0);
    }

    if (pointLightRef.current) {
      const pulse = phase === 1 ? 2.0 + phaseProgress * 2.0 : 2.0;
      pointLightRef.current.intensity = pulse;
    }
  });

  return (
    <>
      {/* 1. Cinematic Studio Lighting */}
      <ambientLight color="#07192e" intensity={1.4} />

      {/* Main Key Light */}
      <directionalLight position={[3, 4, 3]} intensity={1.6} color="#e0f7ff" />

      {/* Cyan Rim Light */}
      <directionalLight position={[-3, -1, -3]} intensity={2.4} color="#00f5ff" />

      {/* Internal Dynamic Point Light */}
      <pointLight
        ref={pointLightRef}
        position={[0, 0.1, 0.5]}
        color={project.accentColor}
        intensity={2.2}
        distance={4.5}
      />

      {/* 2. Compact Circular Pedestal Below Cube */}
      <CubePedestal
        accentColor={project.accentColor}
        phase={phase}
        phaseProgress={phaseProgress}
        isMobile={isMobile}
      />

      {/* 3. Small Companion Cubes Floating around Main Cube */}
      <SmallCompanionCubes
        accentColor={project.accentColor}
        projectId={project.id}
        phase={phase}
        phaseProgress={phaseProgress}
        isMobile={isMobile}
      />

      {/* 4. Ambient Chamber Dust & Gathering Particles */}
      <CubeParticles
        accentColor={project.accentColor}
        phase={phase}
        phaseProgress={phaseProgress}
        isMobile={isMobile}
      />

      {/* 5. Central 3D BoxGeometry Holographic Cube Model */}
      <ProjectCubeModel
        project={project}
        phase={phase}
        phaseProgress={phaseProgress}
        overallProgress={overallProgress}
        direction={direction}
        isMobile={isMobile}
      />
    </>
  );
};
