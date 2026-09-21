import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { DeveloperCharacter, CharacterPose } from './DeveloperCharacter';
import * as THREE from 'three';
import { isWebGLAvailable } from '../../utils/webgl';
import { WebGLErrorBoundary } from '../WebGLErrorBoundary';

interface DeveloperCharacterCanvasProps {
  pose?: CharacterPose;
  className?: string;
  enableParallax?: boolean;
  prefersReducedMotion?: boolean;
  onLoaded?: () => void;
}

// Internal scene content with responsive lighting & camera
function CharacterScene({
  pose = 'sitting',
  prefersReducedMotion = false,
  pointerOffset,
}: {
  pose: CharacterPose;
  prefersReducedMotion?: boolean;
  pointerOffset: { x: number; y: number };
}) {
  const rootRef = useRef<THREE.Group>(null);

  // Apply subtle interactive parallax tilt based on pointer
  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion) return;
    const targetY = -0.42 + pointerOffset.x * 0.12;
    const targetX = 0.05 + pointerOffset.y * 0.08;

    rootRef.current.rotation.y = targetY;
    rootRef.current.rotation.x = targetX;
  }, [pointerOffset, prefersReducedMotion]);

  return (
    <group ref={rootRef} position={[0, -0.42, 0]} rotation={[0.05, -0.42, 0]}>
      {/* 
        Lighting setup specifically calibrated for the ABOUT Sanctuary:
        - Cool celestial moonlight from upper-front
        - Vivid cyan rim lighting along rear silhouette & glowing NU logo
        - Warm interior fill for hair and skin details
      */}
      <ambientLight intensity={0.85} color="#1e293b" />

      {/* Main Moonlight Key Light */}
      <directionalLight
        position={[2, 4, 2]}
        intensity={1.8}
        color="#e0f2fe"
        castShadow
      />

      {/* Sanctuary Circular Portal Cyan Rim Light */}
      <directionalLight
        position={[-3, 2.5, -2.5]}
        intensity={3.2}
        color="#00f5ff"
      />

      {/* Subtle Moon Lavender Fill */}
      <pointLight
        position={[0, 1.5, -1.8]}
        intensity={1.2}
        color="#818cf8"
        distance={6}
      />

      {/* The Modular 3D Developer Character */}
      <DeveloperCharacter
        pose={pose}
        scale={0.92}
        position={[0, 0, 0]}
        enableBreathing={!prefersReducedMotion}
        enableRimLight={true}
        rimLightColor="#00f5ff"
      />
    </group>
  );
}

// Fallback visual during async WebGL compile / GLB stream
function CharacterFallback() {
  return (
    <div className="w-full h-full flex items-end justify-center pointer-events-none opacity-90 animate-pulse">
      <div className="w-3/4 h-3/4 bg-cyan-950/20 rounded-full blur-xl" />
    </div>
  );
}

export function DeveloperCharacterCanvas({
  pose = 'sitting',
  className = '',
  enableParallax = true,
  prefersReducedMotion = false,
  onLoaded,
}: DeveloperCharacterCanvasProps) {
  const [hasWebGLError, setHasWebGLError] = useState(() => !isWebGLAvailable());
  const [pointerOffset, setPointerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setHasWebGLError(true);
    }
  }, []);

  // Track cursor / touch for 3D parallax
  useEffect(() => {
    if (!enableParallax || prefersReducedMotion) return;

    const handlePointer = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPointerOffset({ x, y });
    };

    window.addEventListener('mousemove', handlePointer, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointer);
  }, [enableParallax, prefersReducedMotion]);

  // Notify parent once ready
  useEffect(() => {
    if (onLoaded) onLoaded();
  }, [onLoaded]);

  // Graceful 2D fallback if client device rejects WebGL
  const fallbackUI = (
    <div className={`relative ${className}`}>
      <picture>
        <source srcSet="/assets/developer-character.webp" type="image/webp" />
        <img
          src="/assets/developer-character.png"
          alt="Developer seated looking at moon"
          className="w-full h-full object-contain filter drop-shadow-[0_0_14px_rgba(6,182,212,0.22)]"
          referrerPolicy="no-referrer"
        />
      </picture>
    </div>
  );

  if (hasWebGLError) {
    return fallbackUI;
  }

  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <WebGLErrorBoundary fallback={fallbackUI} name="DeveloperCharacterCanvas">
        <Suspense fallback={<CharacterFallback />}>
          <Canvas
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: 'high-performance',
            }}
            camera={{
              position: [0, 0.72, 1.85],
              fov: 38,
              near: 0.1,
              far: 20,
            }}
            dpr={[1, 1.5]}
            onCreated={({ gl }) => {
              const handleContextLost = (e: Event) => {
                e.preventDefault();
                setHasWebGLError(true);
              };
              gl.domElement.addEventListener('webglcontextlost', handleContextLost, false);
            }}
            onError={() => setHasWebGLError(true)}
            style={{ width: '100%', height: '100%' }}
          >
            <CharacterScene
              pose={pose}
              prefersReducedMotion={prefersReducedMotion}
              pointerOffset={pointerOffset}
            />
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  );
}
