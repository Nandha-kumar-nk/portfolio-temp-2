import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneNumber } from '../types';
import { generateParticles, ParticleData } from '../utils/particleMath';

interface ParticleSystemProps {
  currentScene: SceneNumber;
  transitionProgress: number; // 0 to 1 within the current scene transition
  particleCount?: number;
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
}

// Generate circular glow sprite texture programmatically
function createParticleTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(56, 189, 248, 0.9)');
  gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.4)');
  gradient.addColorStop(0.8, 'rgba(99, 102, 241, 0.15)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function ParticleSystem({
  currentScene,
  particleCount = 2200,
  isMobile = false,
  prefersReducedMotion = false,
}: ParticleSystemProps) {
  console.log('[ParticleSystem] mounted for scene:', currentScene);
  const pointsRef = useRef<THREE.Points>(null);

  const particlesData = useMemo<ParticleData[]>(() => {
    return generateParticles(particleCount);
  }, [particleCount]);

  const particleTexture = useMemo(() => createParticleTexture(), []);

  // Current animated positions buffer
  const currentPositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    // Initialize at single center point
    for (let i = 0; i < particleCount; i++) {
      const p = particlesData[i].single;
      pos[i * 3] = p[0];
      pos[i * 3 + 1] = p[1];
      pos[i * 3 + 2] = p[2];
    }
    return pos;
  }, [particleCount, particlesData]);

  // Color attributes
  const colors = useMemo(() => {
    const col = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const p = particlesData[i];
      if (p.colorType === 3) {
        // Pure White Core
        col[i * 3] = 1.0; col[i * 3 + 1] = 1.0; col[i * 3 + 2] = 1.0;
      } else if (p.colorType === 0) {
        // Electric Cyan
        col[i * 3] = 0.05; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 1.0;
      } else if (p.colorType === 1) {
        // Vibrant Sky Blue
        col[i * 3] = 0.22; col[i * 3 + 1] = 0.55; col[i * 3 + 2] = 1.0;
      } else {
        // Subtle Violet/Indigo
        col[i * 3] = 0.65; col[i * 3 + 1] = 0.35; col[i * 3 + 2] = 1.0;
      }
    }
    return col;
  }, [particleCount, particlesData]);

  // Track active target scene for smooth interpolation
  const targetSceneRef = useRef<SceneNumber>(currentScene);
  useEffect(() => {
    targetSceneRef.current = currentScene;
  }, [currentScene]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    const time = state.clock.elapsedTime * (prefersReducedMotion ? 0.4 : 1.0);
    const scene = targetSceneRef.current;

    // Determine interpolation speed
    const lerpSpeed = Math.min(delta * (scene === 2 ? 2.4 : scene === 5 ? 3.5 : 2.0), 0.15);

    for (let i = 0; i < particleCount; i++) {
      const p = particlesData[i];
      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;

      if (scene === 1) {
        // Single central idea: tight cluster with breathing pulse
        const pulse = 1.0 + (prefersReducedMotion ? 0 : Math.sin(time * 3 + p.phase) * 0.2);
        targetX = p.single[0] * pulse;
        targetY = p.single[1] * pulse;
        targetZ = p.single[2] * pulse;
      } else if (scene === 2) {
        // Forming Letter 'N': organic swirl into shape
        const wave = prefersReducedMotion ? 0 : Math.sin(time * 2 + p.phase) * 0.05;
        const driftX = prefersReducedMotion ? 0 : Math.cos(time * 1.5 + p.phase) * 0.04;
        targetX = p.letterN[0] + driftX;
        targetY = p.letterN[1] + wave;
        targetZ = p.letterN[2] + (prefersReducedMotion ? 0 : Math.sin(time + p.phase) * 0.06);
      } else if (scene === 3 || scene === 4) {
        // Globe shape with continuous orbital rotation
        const rotAngle = time * (prefersReducedMotion ? 0.15 : 0.35);
        const cosR = Math.cos(rotAngle);
        const sinR = Math.sin(rotAngle);
        const gx = p.globe[0] * cosR - p.globe[2] * sinR;
        const gz = p.globe[0] * sinR + p.globe[2] * cosR;
        const gy = p.globe[1];

        // Slight expansion pulsation
        const pulse = 1.0 + (prefersReducedMotion ? 0 : Math.sin(time * 1.8 + p.phase) * 0.04);
        targetX = gx * pulse;
        targetY = gy * pulse;
        targetZ = gz * pulse;
      } else if (scene === 5) {
        // High-energy globe state: 70% particles maintain glowing globe, 30% surge into beam
        if (i % 3 === 0) {
          targetX = p.beam[0];
          targetY = p.beam[1];
          targetZ = p.beam[2];
        } else {
          const rotAngle = time * (prefersReducedMotion ? 0.2 : 0.45);
          const cosR = Math.cos(rotAngle);
          const sinR = Math.sin(rotAngle);
          const gx = p.globe[0] * cosR - p.globe[2] * sinR;
          const gz = p.globe[0] * sinR + p.globe[2] * cosR;
          const gy = p.globe[1];
          targetX = gx * 1.02;
          targetY = gy * 1.02;
          targetZ = gz * 1.02;
        }
      } else {
        // Scene 6 & 7: Wide framing celestial globe and background aura
        const rotAngle = time * (prefersReducedMotion ? 0.1 : 0.25);
        const cosR = Math.cos(rotAngle);
        const sinR = Math.sin(rotAngle);
        const gx = p.globe[0] * cosR - p.globe[2] * sinR;
        const gz = p.globe[0] * sinR + p.globe[2] * cosR;
        const gy = p.globe[1];

        targetX = gx * 1.05;
        targetY = gy * 1.05;
        targetZ = gz * 1.05;
      }

      // Smooth step towards target
      const idx = i * 3;
      posArray[idx] += (targetX - posArray[idx]) * lerpSpeed;
      posArray[idx + 1] += (targetY - posArray[idx + 1]) * lerpSpeed;
      posArray[idx + 2] += (targetZ - posArray[idx + 2]) * lerpSpeed;
    }

    posAttr.needsUpdate = true;
  });

  // Calculate dynamic point size based on scene and device
  const scaleMod = isMobile ? 0.85 : 1.0;
  const pointSize = (currentScene === 1 ? 0.35 : currentScene === 2 ? 0.16 : 0.12) * scaleMod;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[currentPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={pointSize}
        map={particleTexture}
        vertexColors
        transparent
        opacity={currentScene === 1 ? 0.95 : 0.88}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
