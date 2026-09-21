import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneNumber } from '../types';
import { DeviceQualityInfo } from '../hooks/useDeviceQuality';
import { CosmicBackground } from './CosmicBackground';
import { CinematicCamera } from './CinematicCamera';
import { ParticleSystem } from './ParticleSystem';
import { CyberGlobe } from './CyberGlobe';
import { HomeUniverseCore } from './3d/HomeUniverseCore';
import { TransformingParticleField } from './3d/TransformingParticleField';
import { isWebGLAvailable } from '../utils/webgl';
import { WebGLErrorBoundary, WebGLCosmicFallback } from './WebGLErrorBoundary';

interface ExperienceCanvasProps {
  currentScene: SceneNumber;
  transitionProgress: number;
  quality: DeviceQualityInfo;
  scrollSectionProgress?: number;
  mousePos?: { x: number; y: number };
  isDestroyed?: boolean;
  destructionProgress?: number;
}

export function ExperienceCanvas({
  currentScene,
  transitionProgress,
  quality,
  scrollSectionProgress = 0,
  mousePos = { x: 0, y: 0 },
  isDestroyed = false,
  destructionProgress = 0,
}: ExperienceCanvasProps) {
  const [webglSupported, setWebglSupported] = useState<boolean>(() => isWebGLAvailable());

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  if (!webglSupported) {
    return (
      <div
        className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <WebGLCosmicFallback />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <WebGLErrorBoundary fallback={<WebGLCosmicFallback />} name="ExperienceCanvas">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 48, near: 0.1, far: 1000 }}
          dpr={quality.dpr}
          onCreated={({ gl }) => {
            const handleContextLost = (e: Event) => {
              e.preventDefault();
              console.warn('[ExperienceCanvas] WebGL context lost.');
            };
            const handleContextRestored = () => {
              console.log('[ExperienceCanvas] WebGL context restored.');
            };
            const dom = gl.domElement;
            dom.addEventListener('webglcontextlost', handleContextLost, false);
            dom.addEventListener('webglcontextrestored', handleContextRestored, false);
          }}
          gl={{
            antialias: quality.tier !== 'LOW',
            alpha: true,
            powerPreference: quality.tier === 'LOW' ? 'low-power' : 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.25,
          }}
        >
          {/* Lights - vibrant illumination for 3D Core */}
          <ambientLight intensity={0.8} />
          <pointLight position={[0, 0, 5]} intensity={3.5} color="#38bdf8" />
          <pointLight position={[4, 3, -2]} intensity={2.0} color="#818cf8" />
          <pointLight position={[-4, -3, 2]} intensity={1.8} color="#06b6d4" />
          <directionalLight position={[-5, 5, 5]} intensity={1.8} color="#06b6d4" />

          {/* Cinematic Camera Controller */}
          <CinematicCamera
            currentScene={currentScene}
            prefersReducedMotion={quality.prefersReducedMotion}
          />

          {/* Deep Field Starfield */}
          <CosmicBackground
            count={quality.backgroundStarCount}
            prefersReducedMotion={quality.prefersReducedMotion}
          />

          {/* 3D Interpolating Particle System (Scenes 1 through 6) */}
          {currentScene <= 6 && (
            <ParticleSystem
              currentScene={currentScene}
              transitionProgress={transitionProgress}
              particleCount={quality.particleCount}
              isMobile={quality.isMobile}
              prefersReducedMotion={quality.prefersReducedMotion}
            />
          )}

          {/* Cyber Holographic Globe (Scenes 3 through 6 of opening sequence) */}
          {currentScene >= 3 && currentScene <= 6 && (
            <CyberGlobe
              currentScene={currentScene}
              orbitalRingCount={quality.orbitalRingCount}
              techNodeCount={quality.techNodeCount}
              isMobile={quality.isMobile}
              prefersReducedMotion={quality.prefersReducedMotion}
            />
          )}

          {/* Home Scene Universe Core & Continuous Transforming 3D Particle Field (Scene 7) */}
          {currentScene === 7 && (
            <>
              <HomeUniverseCore
                isMobile={quality.isMobile}
                prefersReducedMotion={quality.prefersReducedMotion}
                qualityTier={quality.tier}
              />
              <TransformingParticleField
                scrollSectionProgress={scrollSectionProgress}
                mousePos={mousePos}
                isDestroyed={isDestroyed}
                destructionProgress={destructionProgress}
                quality={quality}
              />
            </>
          )}
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
