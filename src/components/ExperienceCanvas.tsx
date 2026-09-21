import React, { useEffect } from 'react';
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
import { Scene06Atmosphere } from './Scene06Atmosphere';
import { WebGLErrorBoundary, WebGLCosmicFallback } from './WebGLErrorBoundary';

interface ExperienceCanvasProps {
  currentScene: SceneNumber;
  activeSection?: string;
  transitionProgress: number;
  quality: DeviceQualityInfo;
  scrollSectionProgress?: number;
  mousePos?: { x: number; y: number };
  isDestroyed?: boolean;
  destructionProgress?: number;
}

export function ExperienceCanvas({
  currentScene,
  activeSection = 'home',
  transitionProgress,
  quality,
  scrollSectionProgress = 0,
  mousePos = { x: 0, y: 0 },
  isDestroyed = false,
  destructionProgress = 0,
}: ExperienceCanvasProps) {
  useEffect(() => {
    console.log('[ExperienceCanvas] Scene:', currentScene);
  }, [currentScene]);

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
            const ctx = gl.getContext();
            console.log('[R3F] WebGL renderer created successfully', {
              renderer: gl,
              vendor: ctx ? ctx.getParameter(ctx.VENDOR) : 'Unknown',
              rendererInfo: ctx ? ctx.getParameter(ctx.RENDERER) : 'Unknown',
            });
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
          {/* Lights - vibrant pure electric cyan & cool blue illumination */}
          <ambientLight intensity={0.75} color="#041827" />
          <pointLight position={[0, 0, 5]} intensity={3.8} color="#00d9ff" />
          <pointLight position={[4, 3, -2]} intensity={2.2} color="#19e6ff" />
          <pointLight position={[-4, -3, 2]} intensity={2.0} color="#168bff" />
          <directionalLight position={[-5, 5, 5]} intensity={2.0} color="#5cefff" />

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

          {/* Scene 6 Grand Atmosphere (Light rays, dust motes, tech rings) */}
          {currentScene === 6 && (
            <Scene06Atmosphere
              isMobile={quality.isMobile}
              prefersReducedMotion={quality.prefersReducedMotion}
              transitionProgress={transitionProgress}
            />
          )}

          {/* Home Scene Universe Core & Continuous Transforming 3D Particle Field (Scene 7, isolated to Home) */}
          {currentScene === 7 && activeSection === 'home' && (
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
