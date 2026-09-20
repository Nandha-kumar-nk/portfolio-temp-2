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

export const DashboardVisual: React.FC<VisualProps> = ({
  project,
  isSelected,
  isDimmed,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.Group>(null);
  const gaugeRef = useRef<THREE.Mesh>(null);

  const accent = project.accentColor || '#00f5ff';
  const opacity = isDimmed ? 0.35 : 1.0;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.6) * 0.05;
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.1;
    }
    if (gaugeRef.current) {
      gaugeRef.current.rotation.z = -t * 0.5;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* 1. Main Curved/Angled Glass Dashboard Screen */}
      <group position={[0, 0.45, 0]}>
        {/* Frame Outer Rim */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.35, 0.85, 0.04]} />
          <meshStandardMaterial
            color="#0b1329"
            metalness={0.92}
            roughness={0.2}
            transparent
            opacity={0.85 * opacity}
          />
        </mesh>

        {/* Inner Glass Display Panel */}
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[1.25, 0.75]} />
          <meshBasicMaterial
            color="#020c1e"
            transparent
            opacity={0.9 * opacity}
          />
        </mesh>

        {/* Top Header Bar */}
        <mesh position={[0, 0.3, 0.03]}>
          <planeGeometry args={[1.18, 0.07]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={0.35 * opacity}
          />
        </mesh>

        {/* 3 Metric Summary Cards */}
        {[-0.38, 0, 0.38].map((x, i) => (
          <group key={i} position={[x, 0.16, 0.032]}>
            <mesh>
              <planeGeometry args={[0.34, 0.15]} />
              <meshBasicMaterial
                color="#0f172a"
                transparent
                opacity={0.8 * opacity}
              />
            </mesh>
            <mesh position={[-0.1, 0, 0.005]}>
              <planeGeometry args={[0.08, 0.08]} />
              <meshBasicMaterial color={accent} transparent opacity={0.7} />
            </mesh>
            <mesh position={[0.06, 0.02, 0.005]}>
              <planeGeometry args={[0.15, 0.025]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
            </mesh>
            <mesh position={[0.06, -0.02, 0.005]}>
              <planeGeometry args={[0.12, 0.018]} />
              <meshBasicMaterial color={accent} transparent opacity={0.5} />
            </mesh>
          </group>
        ))}

        {/* Analytical Bar Chart on Left */}
        <group ref={barsRef} position={[-0.26, -0.15, 0.035]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[0.62, 0.34]} />
            <meshBasicMaterial
              color="#070d1d"
              transparent
              opacity={0.6 * opacity}
            />
          </mesh>
          {/* Data Bars */}
          {[0.12, 0.22, 0.16, 0.28, 0.2, 0.3].map((height, i) => (
            <mesh
              key={i}
              position={[-0.22 + i * 0.09, -0.14 + height / 2, 0.006]}
            >
              <planeGeometry args={[0.06, height]} />
              <meshBasicMaterial
                color={i === 5 || isSelected ? accent : '#0284c7'}
                transparent
                opacity={0.85 * opacity}
              />
            </mesh>
          ))}
        </group>

        {/* Circular Radial Gauge on Right */}
        <group position={[0.34, -0.15, 0.035]}>
          <mesh>
            <planeGeometry args={[0.45, 0.34]} />
            <meshBasicMaterial
              color="#070d1d"
              transparent
              opacity={0.6 * opacity}
            />
          </mesh>
          <mesh ref={gaugeRef} position={[0, 0, 0.008]}>
            <ringGeometry args={[0.08, 0.12, 32, 1, 0, Math.PI * 1.5]} />
            <meshBasicMaterial
              color={accent}
              transparent
              opacity={0.9 * opacity}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 0, 0.009]}>
            <circleGeometry args={[0.04, 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
          </mesh>
        </group>
      </group>

      {/* Futuristic Floating Pedestal Support Ring */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.65, 32]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={(isSelected ? 0.7 : 0.3) * opacity}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
