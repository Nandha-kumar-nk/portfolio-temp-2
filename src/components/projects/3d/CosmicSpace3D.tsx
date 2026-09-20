import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CosmicSpace3D: React.FC = () => {
  const starsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Points>(null);

  // Generate deep space galaxy particle field with depth density and cyan/blue/white/violet colors
  const [starPositions, starColors, starSizes] = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Distance from center (exponential layout to keep central area visually clear)
      const dist = 3.5 + Math.pow(Math.random(), 0.8) * 18.0;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 12.0;

      positions[idx] = Math.cos(angle) * dist;
      positions[idx + 1] = height;
      positions[idx + 2] = -5.0 - Math.random() * 20.0;

      const r = Math.random();
      if (r < 0.45) {
        // Cyan / Electric Blue
        colors[idx] = 0.0;
        colors[idx + 1] = 0.95;
        colors[idx + 2] = 1.0;
      } else if (r < 0.8) {
        // Sky Blue
        colors[idx] = 0.22;
        colors[idx + 1] = 0.74;
        colors[idx + 2] = 0.97;
      } else if (r < 0.92) {
        // Soft Luminous White
        colors[idx] = 0.94;
        colors[idx + 1] = 0.98;
        colors[idx + 2] = 1.0;
      } else {
        // Subtle Violet
        colors[idx] = 0.66;
        colors[idx + 1] = 0.33;
        colors[idx + 2] = 0.97;
      }

      // Small sizes (0.035 to 0.08)
      sizes[i] = 0.035 + Math.random() * 0.045;
    }

    return [positions, colors, sizes];
  }, []);

  // Subtle outer edge nebula dust
  const nebulaPositions = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      let x = (Math.random() - 0.5) * 38;
      let y = (Math.random() - 0.5) * 26;
      if (Math.abs(x) < 8) x += x >= 0 ? 10 : -10;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = -6 - Math.random() * 12;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.004;
      starsRef.current.rotation.z = t * 0.002;
    }
    if (nebulaRef.current) {
      nebulaRef.current.rotation.z = t * 0.0025;
    }
  });

  return (
    <group>
      {/* Ambient and Atmospheric Key Lighting */}
      <ambientLight intensity={1.1} color="#030b1e" />
      <directionalLight position={[8, 10, 8]} intensity={1.8} color="#e0f2fe" />
      <directionalLight position={[-8, -3, 6]} intensity={1.2} color="#00f5ff" />
      <directionalLight position={[0, -6, -4]} intensity={0.8} color="#a855f7" />

      {/* Deep Galaxy Star Particles */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[starColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.048}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Edge Atmospheric Dust */}
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nebulaPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.28}
          color="#0284c7"
          transparent
          opacity={0.18}
          sizeAttenuation
        />
      </points>
    </group>
  );
};
