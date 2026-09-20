import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ArtifactEnvironmentProps {
  accentColor?: string;
  glowPulse?: number; // 0 to 1
}

export const ArtifactEnvironment: React.FC<ArtifactEnvironmentProps> = ({
  accentColor = '#00f5ff',
  glowPulse = 0,
}) => {
  const ringsRef = useRef<THREE.Group>(null);
  const backgroundDustRef = useRef<THREE.Points>(null);
  const pillarGroupRef = useRef<THREE.Group>(null);

  // Concentric platform rings
  const platformRings = useMemo(() => {
    return [
      { radius: 2.2, tube: 0.018, color: '#00f5ff', opacity: 0.7 },
      { radius: 3.4, tube: 0.015, color: '#0284c7', opacity: 0.5 },
      { radius: 4.6, tube: 0.012, color: '#8b5cf6', opacity: 0.4 },
      { radius: 5.8, tube: 0.01, color: '#0369a1', opacity: 0.3 },
    ];
  }, []);

  // Subtle architectural silhouettes in deep background
  const backgroundPillars = useMemo(() => {
    const pillars: Array<{ pos: [number, number, number]; scale: [number, number, number] }> = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const dist = 12 + (i % 3) * 2;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist - 3;
      const height = 8 + (i % 5) * 2.5;
      pillars.push({
        pos: [x, height / 2 - 2.5, z],
        scale: [0.6, height, 0.6],
      });
    }
    return pillars;
  }, []);

  // Ambient dust particles in room
  const dustGeometry = useMemo(() => {
    const count = 220;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = Math.random() * 8 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const dustMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.045,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.04;
    }
    if (backgroundDustRef.current) {
      backgroundDustRef.current.rotation.y = t * 0.02;
    }
  });

  return (
    <group position={[0, -1.8, 0]}>
      {/* 1. Dark Reflective Circular Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[9, 64]} />
        <meshStandardMaterial
          color="#030712"
          roughness={0.18}
          metalness={0.88}
        />
      </mesh>

      {/* Dark Outer Horizon Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial color="#02040a" />
      </mesh>

      {/* 2. Concentric Platform Circles & Neon Energy Tracks */}
      <group ref={ringsRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        {platformRings.map((r, i) => (
          <mesh key={i}>
            <ringGeometry args={[r.radius - r.tube, r.radius + r.tube, 64]} />
            <meshBasicMaterial
              color={r.color}
              transparent
              opacity={r.opacity + glowPulse * 0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* 3. Platform Glow Spot Under Artifact */}
      <pointLight
        position={[0, 0.2, 0]}
        color={accentColor}
        intensity={2.0 + glowPulse * 4}
        distance={6}
        decay={2}
      />

      {/* 4. Background Faint Architectural Spire Silhouettes */}
      <group ref={pillarGroupRef}>
        {backgroundPillars.map((p, i) => (
          <mesh key={i} position={p.pos} scale={p.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#060e20" transparent opacity={0.35} />
          </mesh>
        ))}
      </group>

      {/* 5. Ambient Room Dust Particles */}
      <primitive
        object={new THREE.Points(dustGeometry, dustMaterial)}
        ref={backgroundDustRef}
      />
    </group>
  );
};
