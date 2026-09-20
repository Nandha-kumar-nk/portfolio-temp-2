import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CrystalPlatformProps {
  accentColor: string;
  phase?: number;
  phaseProgress?: number;
  isMobile?: boolean;
}

export const CrystalPlatform: React.FC<CrystalPlatformProps> = ({
  accentColor,
  phase = 0,
  phaseProgress = 0,
  isMobile = false,
}) => {
  const sweepRef = useRef<THREE.Mesh>(null);
  const ringGroupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  // Compact circular pedestal radius (approx 190px desktop, 120px mobile)
  const radius = isMobile ? 0.44 : 0.65;
  const posY = isMobile ? -1.14 : -1.16;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Speed multiplier accelerates during Phase 2 (CHARGE)
    const speedMult = phase === 2 ? 1 + phaseProgress * 3.0 : 1;

    if (sweepRef.current) {
      sweepRef.current.rotation.z = t * 1.0 * speedMult;
    }

    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.z = -t * 0.12 * speedMult;
    }

    if (pulseRef.current) {
      const chargeGlow = phase === 2 ? 0.5 + phaseProgress * 0.5 : 0;
      const wave = Math.sin(t * 2.2) * 0.08 + chargeGlow;
      const s = 1 + wave * 0.12;
      pulseRef.current.scale.set(s, s, 1);
    }
  });

  return (
    <group position={[0, posY, 0]}>
      {/* 1. Base Dark Brushed Metallic Dais */}
      <mesh position={[0, -0.04, 0]} receiveShadow>
        <cylinderGeometry args={[radius, radius + 0.04, 0.05, 48]} />
        <meshStandardMaterial
          color="#08101e"
          roughness={0.24}
          metalness={0.92}
        />
      </mesh>

      {/* 2. Secondary Inset Tier */}
      <mesh position={[0, -0.01, 0]}>
        <cylinderGeometry args={[radius * 0.82, radius * 0.85, 0.03, 48]} />
        <meshStandardMaterial
          color="#0d1829"
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>

      {/* 3. Sleek Concentric Illuminated Rings */}
      <group position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Outer Thin Cyan Light Ring */}
        <mesh>
          <ringGeometry args={[radius * 0.88, radius * 0.91, 48]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.7} />
        </mesh>

        {/* Inner Accent Ring */}
        <mesh>
          <ringGeometry args={[radius * 0.62, radius * 0.64, 40]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.8} />
        </mesh>

        {/* Rotating subtle ticks */}
        <group ref={ringGroupRef}>
          <mesh>
            <ringGeometry args={[radius * 0.74, radius * 0.755, 32]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
          </mesh>
        </group>

        {/* Animated Light Sweep Arc */}
        <mesh ref={sweepRef} position={[0, 0, 0.001]}>
          <ringGeometry args={[radius * 0.62, radius * 0.68, 24, 1, 0, Math.PI / 2.5]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Pulsing Core Energy Ring */}
        <mesh ref={pulseRef} position={[0, 0, 0.002]}>
          <ringGeometry args={[radius * 0.38, radius * 0.40, 32]} />
          <meshBasicMaterial
            color={phase === 2 ? '#ffffff' : '#00f5ff'}
            transparent
            opacity={phase === 2 ? 0.9 : 0.6}
          />
        </mesh>
      </group>
    </group>
  );
};
