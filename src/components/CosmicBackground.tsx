import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CosmicBackgroundProps {
  count?: number;
  prefersReducedMotion?: boolean;
}

export function CosmicBackground({ count = 1200, prefersReducedMotion = false }: CosmicBackgroundProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate background stars according to quality tier count
  const { positions, colors } = useMemo(() => {
    const starCount = count;
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      // Distribute in a large sphere around scene
      const r = 25 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Celestial colors: deep blue, cyan, brilliant white (No purple)
      const colorPick = Math.random();
      if (colorPick > 0.75) {
        col[i * 3] = 0.96; col[i * 3 + 1] = 0.99; col[i * 3 + 2] = 1.0; // Pure White
      } else if (colorPick > 0.45) {
        col[i * 3] = 0.0; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 1.0; // Electric Cyan (#00D9FF)
      } else if (colorPick > 0.2) {
        col[i * 3] = 0.36; col[i * 3 + 1] = 0.94; col[i * 3 + 2] = 1.0; // Light Cyan (#5CEFFF)
      } else {
        col[i * 3] = 0.09; col[i * 3 + 1] = 0.55; col[i * 3 + 2] = 1.0; // Electric Blue (#168BFF)
      }
    }

    return { positions: pos, colors: col };
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      const speedMultiplier = prefersReducedMotion ? 0.3 : 1.0;
      pointsRef.current.rotation.y += delta * 0.008 * speedMultiplier;
      pointsRef.current.rotation.x += delta * 0.003 * speedMultiplier;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
