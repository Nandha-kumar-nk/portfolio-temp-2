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

export const CloudVisual: React.FC<VisualProps> = ({
  project,
  isSelected,
  isDimmed,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.6) * 0.04;
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.08;
    }
  });

  const accent = project.accentColor || '#38bdf8';
  const opacity = isDimmed ? 0.35 : 1.0;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* Cyber Cloud Cluster */}
      <group position={[0, 0.42, 0]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.32, 24, 24]} />
          <meshStandardMaterial
            color="#0b1120"
            emissive={accent}
            emissiveIntensity={0.5}
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh position={[-0.26, -0.05, 0]}>
          <sphereGeometry args={[0.24, 24, 24]} />
          <meshStandardMaterial
            color="#0b1120"
            emissive={accent}
            emissiveIntensity={0.4}
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh position={[0.26, -0.05, 0]}>
          <sphereGeometry args={[0.24, 24, 24]} />
          <meshStandardMaterial
            color="#0b1120"
            emissive={accent}
            emissiveIntensity={0.4}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Cloud Wireframe Halo */}
        <mesh>
          <sphereGeometry args={[0.38, 16, 16]} />
          <meshBasicMaterial color={accent} wireframe transparent opacity={0.3 * opacity} />
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
