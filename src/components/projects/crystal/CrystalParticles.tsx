import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CrystalParticlesProps {
  accentColor: string;
  phase: number; // 0 to 7
  phaseProgress: number; // 0 to 1
  overallProgress: number;
  direction: number; // 1 for next, -1 for prev
  isMobile?: boolean;
}

export const CrystalParticles: React.FC<CrystalParticlesProps> = ({
  accentColor,
  phase,
  phaseProgress,
  overallProgress: _overallProgress,
  direction = 1,
  isMobile = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Subtle count: 180 on desktop, 80 on mobile (meets "300-700 particles / 80-200 mobile" without lag)
  const count = isMobile ? 80 : 160;

  const { basePositions, spreadVectors, phases } = useMemo(() => {
    const base = new Float32Array(count * 3);
    const spread = new Float32Array(count * 3);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 0.2 + Math.cbrt(Math.random()) * 0.95;

      base[idx] = r * Math.sin(phi) * Math.cos(theta);
      base[idx + 1] = r * Math.sin(phi) * Math.sin(theta) * 1.35;
      base[idx + 2] = r * Math.cos(phi);

      // Trajectory vector during particle transition
      spread[idx] = direction * (1.8 + Math.random() * 1.4);
      spread[idx + 1] = (Math.random() - 0.5) * 1.2;
      spread[idx + 2] = (Math.random() - 0.5) * 0.9;

      ph[i] = Math.random() * Math.PI * 2;
    }

    return { basePositions: base, spreadVectors: spread, phases: ph };
  }, [count, direction]);

  const currentPositions = useMemo(() => new Float32Array(basePositions), [basePositions]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    return geom;
  }, [currentPositions]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      color: new THREE.Color(accentColor),
      size: isMobile ? 0.035 : 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [accentColor, isMobile]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const pOffset = phases[i];

      if (phase === 2) {
        // Phase 2 (CHARGE): small particles accelerate inward toward crystal
        const inwardFactor = 1 - phaseProgress * 0.35;
        arr[idx] = basePositions[idx] * inwardFactor + Math.sin(t * 4 + pOffset) * 0.02;
        arr[idx + 1] = basePositions[idx + 1] * inwardFactor + Math.cos(t * 4 + pOffset) * 0.02;
        arr[idx + 2] = basePositions[idx + 2] * inwardFactor;
      } else if (phase === 4) {
        // Phase 4 (SHATTER): particles start drifting outward
        const factor = phaseProgress * 0.5;
        arr[idx] = basePositions[idx] + spreadVectors[idx] * factor;
        arr[idx + 1] = basePositions[idx + 1] + spreadVectors[idx + 1] * factor;
        arr[idx + 2] = basePositions[idx + 2] + spreadVectors[idx + 2] * factor;
      } else if (phase === 5) {
        // Phase 5 (PARTICLE TRANSITION): stream through center
        const factor = 0.5 + phaseProgress * 0.6;
        arr[idx] = basePositions[idx] + spreadVectors[idx] * factor;
        arr[idx + 1] = basePositions[idx + 1] + spreadVectors[idx + 1] * factor + Math.sin(t * 3 + pOffset) * 0.05;
        arr[idx + 2] = basePositions[idx + 2] + spreadVectors[idx + 2] * factor;
      } else if (phase === 6) {
        // Phase 6 (RECONSTRUCTION): reverse direction & converge back
        const reverseFactor = (1 - phaseProgress) * 1.1;
        arr[idx] = basePositions[idx] + spreadVectors[idx] * reverseFactor;
        arr[idx + 1] = basePositions[idx + 1] + spreadVectors[idx + 1] * reverseFactor;
        arr[idx + 2] = basePositions[idx + 2] + spreadVectors[idx + 2] * reverseFactor;
      } else if (phase === 7) {
        // Phase 7 (NEW PROJECT): settle
        const settle = (1 - phaseProgress) * 0.15;
        arr[idx] = basePositions[idx] * (1 + settle);
        arr[idx + 1] = basePositions[idx + 1] * (1 + settle);
        arr[idx + 2] = basePositions[idx + 2] * (1 + settle);
      } else {
        // IDLE: very slow gentle floating
        arr[idx] = basePositions[idx] + Math.sin(t * 0.8 + pOffset) * 0.035;
        arr[idx + 1] = basePositions[idx + 1] + Math.cos(t * 0.6 + pOffset) * 0.035;
        arr[idx + 2] = basePositions[idx + 2] + Math.sin(t * 0.7 + pOffset) * 0.025;
      }
    }

    posAttr.needsUpdate = true;

    // Adjust particle opacity across phases
    if (phase === 2) {
      material.opacity = 0.85;
      material.size = isMobile ? 0.045 : 0.055;
    } else if (phase === 5) {
      material.opacity = 0.9;
      material.size = isMobile ? 0.05 : 0.065;
    } else {
      material.opacity = 0.55;
      material.size = isMobile ? 0.035 : 0.045;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};
