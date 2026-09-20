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

export const DatabaseVisual: React.FC<VisualProps> = ({
  project,
  isSelected,
  isDimmed,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.8) * 0.04;
      groupRef.current.rotation.y = t * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.5;
    }
  });

  const accent = project.accentColor || '#10b981';
  const opacity = isDimmed ? 0.35 : 1.0;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* 3 Tier Stacked Database Cylinders */}
      {[0.12, 0.36, 0.6].map((y, idx) => (
        <group key={idx} position={[0, y, 0]}>
          <mesh>
            <cylinderGeometry args={[0.42, 0.42, 0.18, 32]} />
            <meshStandardMaterial
              color="#090d16"
              metalness={0.9}
              roughness={0.25}
              transparent
              opacity={opacity}
            />
          </mesh>
          {/* Glowing Tier Trim */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.43, 0.43, 0.03, 32]} />
            <meshBasicMaterial color={accent} />
          </mesh>
          {/* Status LEDs */}
          {[-0.2, 0, 0.2].map((x, i) => (
            <mesh key={i} position={[x, 0, 0.425]}>
              <circleGeometry args={[0.018, 12]} />
              <meshBasicMaterial color={i === 0 ? '#22c55e' : accent} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Orbiting Query Ring */}
      <group ref={ringRef} position={[0, 0.36, 0]}>
        <mesh>
          <torusGeometry args={[0.62, 0.012, 12, 36]} />
          <meshBasicMaterial color={accent} transparent opacity={0.6 * opacity} />
        </mesh>
      </group>

      <pointLight
        color={accent}
        intensity={isSelected ? 2.5 : 1.3}
        distance={2.5}
        position={[0, 0.36, 0.2]}
      />
    </group>
  );
};
