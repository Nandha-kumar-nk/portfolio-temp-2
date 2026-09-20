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

export const CubeVisual: React.FC<VisualProps> = ({
  project,
  isSelected,
  isDimmed,
  scale = 1,
}) => {
  const cube1Ref = useRef<THREE.Mesh>(null);
  const cube2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (cube1Ref.current) {
      cube1Ref.current.rotation.x = t * 0.5;
      cube1Ref.current.rotation.y = t * 0.7;
      cube1Ref.current.position.y = 0.42 + Math.sin(t * 1.8) * 0.04;
    }
    if (cube2Ref.current) {
      cube2Ref.current.rotation.x = -t * 0.4;
      cube2Ref.current.rotation.y = -t * 0.6;
      cube2Ref.current.position.y = 0.42 + Math.sin(t * 1.8) * 0.04;
    }
  });

  const accent = project.accentColor || '#00f5ff';
  const opacity = isDimmed ? 0.35 : 1.0;

  return (
    <group scale={[scale, scale, scale]}>
      {/* Inner Solid Crystal Cube */}
      <mesh ref={cube1Ref}>
        <boxGeometry args={[0.38, 0.38, 0.38]} />
        <meshStandardMaterial
          color="#0b1120"
          emissive={accent}
          emissiveIntensity={isSelected ? 0.9 : 0.5}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.9 * opacity}
        />
      </mesh>

      {/* Outer Wireframe Cage */}
      <mesh ref={cube2Ref}>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshBasicMaterial
          color={accent}
          wireframe
          transparent
          opacity={0.4 * opacity}
        />
      </mesh>

      <pointLight
        color={accent}
        intensity={isSelected ? 2.5 : 1.3}
        distance={2.5}
        position={[0, 0.42, 0.2]}
      />
    </group>
  );
};
