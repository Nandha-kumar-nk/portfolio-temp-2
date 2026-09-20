import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem } from '../../../../types';

interface VisualProps {
  project: ProjectItem;
  isSelected: boolean;
  isDimmed: boolean;
  scale?: number;
}

export const ImageVisual: React.FC<VisualProps> = ({
  project,
  isSelected,
  isDimmed,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.8) * 0.04;
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
    }
  });

  const accent = project.accentColor || '#00f5ff';
  const opacity = isDimmed ? 0.35 : 1.0;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <group position={[0, 0.42, 0]}>
        {/* Holographic Frame */}
        <mesh>
          <planeGeometry args={[0.95, 0.65]} />
          <meshStandardMaterial
            color="#050814"
            emissive={accent}
            emissiveIntensity={isSelected ? 0.6 : 0.3}
            transparent
            opacity={0.9 * opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Outer glowing border */}
        <mesh>
          <planeGeometry args={[0.98, 0.68]} />
          <meshBasicMaterial
            color={accent}
            wireframe
            transparent
            opacity={0.5 * opacity}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Central Geometric Hologram Symbol */}
        <mesh position={[0, 0, 0.02]}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={1.2}
            wireframe
          />
        </mesh>

        {/* Orbiting Halo */}
        <mesh ref={ringRef} position={[0, 0, 0.01]}>
          <ringGeometry args={[0.26, 0.28, 32]} />
          <meshBasicMaterial color={accent} transparent opacity={0.6 * opacity} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <pointLight
        color={accent}
        intensity={isSelected ? 2.5 : 1.3}
        distance={2.5}
        position={[0, 0.42, 0.2]}
      />
    </group>
  );
};
