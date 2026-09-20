import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CubeParticlesProps {
  accentColor: string;
  phase: number;
  phaseProgress: number;
  isMobile?: boolean;
}

export const CubeParticles: React.FC<CubeParticlesProps> = ({
  accentColor,
  phase,
  phaseProgress,
  isMobile = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Desktop: 180 particles; Mobile: 45 particles
  const count = isMobile ? 45 : 180;

  const { initialPositions, speeds, alphas } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);
    const alp = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Cylinder distribution around the central cube
      const theta = Math.random() * Math.PI * 2;
      const r = 0.8 + Math.random() * 2.2;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.8;
      pos[i * 3 + 2] = Math.sin(theta) * r;

      spd[i * 3] = (Math.random() - 0.5) * 0.008;
      spd[i * 3 + 1] = 0.002 + Math.random() * 0.006;
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.008;

      alp[i] = 0.25 + Math.random() * 0.65;
    }

    return { initialPositions: pos, speeds: spd, alphas: alp };
  }, [count]);

  const currentPositions = useMemo(() => new Float32Array(initialPositions), [initialPositions]);

  useFrame((state) => {
    const geom = pointsRef.current?.geometry;
    if (!geom) return;

    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    if (!posAttr) return;

    const t = state.clock.getElapsedTime();

    // In Phase 1 (Focus) & Phase 5 (Reassemble), particles gather slightly toward center
    const gatherFactor =
      phase === 1
        ? phaseProgress * 0.4
        : phase === 5
        ? (1 - phaseProgress) * 0.35
        : 0;

    for (let i = 0; i < count; i++) {
      let x = currentPositions[i * 3];
      let y = currentPositions[i * 3 + 1];
      let z = currentPositions[i * 3 + 2];

      y += speeds[i * 3 + 1];
      x += Math.sin(t * 0.8 + i) * 0.001;
      z += Math.cos(t * 0.8 + i) * 0.001;

      // Wrap vertically
      if (y > 1.6) y = -1.6;

      currentPositions[i * 3] = x;
      currentPositions[i * 3 + 1] = y;
      currentPositions[i * 3 + 2] = z;

      // Pull toward center if gathering
      if (gatherFactor > 0) {
        posAttr.setXYZ(
          i,
          x * (1 - gatherFactor * 0.5),
          y * (1 - gatherFactor * 0.4),
          z * (1 - gatherFactor * 0.5)
        );
      } else {
        posAttr.setXYZ(i, x, y, z);
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[initialPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={phase === 1 ? '#ffffff' : accentColor}
        size={isMobile ? 0.03 : 0.04}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
