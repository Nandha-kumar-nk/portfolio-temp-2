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

      // Celestial colors: deep blue, cyan, subtle purple, brilliant white
      const colorPick = Math.random();
      if (colorPick > 0.8) {
        col[i * 3] = 1.0; col[i * 3 + 1] = 1.0; col[i * 3 + 2] = 1.0; // White
      } else if (colorPick > 0.5) {
        col[i * 3] = 0.22; col[i * 3 + 1] = 0.74; col[i * 3 + 2] = 0.98; // Cyan
      } else if (colorPick > 0.25) {
        col[i * 3] = 0.15; col[i * 3 + 1] = 0.45; col[i * 3 + 2] = 0.95; // Blue
      } else {
        col[i * 3] = 0.55; col[i * 3 + 1] = 0.35; col[i * 3 + 2] = 0.95; // Violet
      }
    }

    return { positions: pos, colors: col };
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      const speedMultiplier = prefersReducedMotion ? 0.3 : 1.0;
      pointsRef.current.rotation.y += delta * 0.012 * speedMultiplier;
      pointsRef.current.rotation.x += delta * 0.004 * speedMultiplier;
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
        size={0.12}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
