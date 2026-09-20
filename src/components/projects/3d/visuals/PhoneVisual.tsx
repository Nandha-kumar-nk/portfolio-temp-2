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

export const PhoneVisual: React.FC<VisualProps> = ({
  project,
  isSelected,
  isDimmed,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const badgeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.7) * 0.04;
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.08;
    }
    if (badgeRef.current) {
      badgeRef.current.position.y = 0.88 + Math.sin(t * 2.0) * 0.04;
      badgeRef.current.rotation.y = t * 0.7;
    }
  });

  const accent = project.accentColor || '#c084fc';
  const opacity = isDimmed ? 0.35 : 1.0;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* 1. SMARTPHONE CHASSIS */}
      <group position={[0, 0.38, 0]} rotation={[-0.15, 0, 0]}>
        {/* Outer Metal Frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.55, 1.05, 0.04]} />
          <meshStandardMaterial
            color="#090d16"
            metalness={0.95}
            roughness={0.18}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Outer Chamfer Rim Glow */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.56, 1.06, 0.036]} />
          <meshBasicMaterial
            color={accent}
            wireframe
            transparent
            opacity={0.3 * opacity}
          />
        </mesh>

        {/* Front OLED Glass Screen */}
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.51, 0.98]} />
          <meshStandardMaterial
            color="#050814"
            emissive={accent}
            emissiveIntensity={isSelected ? 0.6 : 0.35}
            roughness={0.15}
            metalness={0.3}
            transparent
            opacity={0.95 * opacity}
          />
        </mesh>

        {/* Speaker Notch / Dynamic Island */}
        <mesh position={[0, 0.44, 0.023]}>
          <boxGeometry args={[0.14, 0.024, 0.005]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* ------------------------------------------------------------- */}
        {/* RESUME DOCUMENT LAYOUT ELEMENTS ON PHONE DISPLAY              */}
        {/* ------------------------------------------------------------- */}
        {/* Header Avatar Dot */}
        <mesh position={[-0.16, 0.34, 0.024]}>
          <circleGeometry args={[0.035, 16]} />
          <meshBasicMaterial color={accent} />
        </mesh>
        {/* Header Name & Title Lines */}
        <mesh position={[0.04, 0.36, 0.024]}>
          <planeGeometry args={[0.26, 0.018]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.04, 0.32, 0.024]}>
          <planeGeometry args={[0.26, 0.012]} />
          <meshBasicMaterial color={accent} />
        </mesh>

        {/* Divider Bar */}
        <mesh position={[0, 0.26, 0.024]}>
          <planeGeometry args={[0.42, 0.005]} />
          <meshBasicMaterial color="#334155" />
        </mesh>

        {/* Section 1: Experience Timeline Blocks */}
        {[-0.04, 0.04, 0.12].map((y, i) => (
          <group key={i} position={[0, -y + 0.15, 0.024]}>
            <mesh position={[-0.18, 0, 0]}>
              <circleGeometry args={[0.012, 12]} />
              <meshBasicMaterial color={accent} />
            </mesh>
            <mesh position={[0.03, 0.015, 0]}>
              <planeGeometry args={[0.32, 0.014]} />
              <meshBasicMaterial color="#e2e8f0" />
            </mesh>
            <mesh position={[0.03, -0.012, 0]}>
              <planeGeometry args={[0.32, 0.01]} />
              <meshBasicMaterial color="#64748b" />
            </mesh>
          </group>
        ))}

        {/* Section 2: Skill Badges Grid */}
        <group position={[0, -0.22, 0.024]}>
          {[-0.14, 0, 0.14].map((x, idx) => (
            <mesh key={idx} position={[x, 0, 0]}>
              <planeGeometry args={[0.11, 0.04]} />
              <meshBasicMaterial color="#1e1b4b" />
            </mesh>
          ))}
          {[-0.14, 0, 0.14].map((x, idx) => (
            <mesh key={`inner-${idx}`} position={[x, 0, 0.001]}>
              <planeGeometry args={[0.09, 0.006]} />
              <meshBasicMaterial color={accent} />
            </mesh>
          ))}
        </group>

        {/* Bottom Home Indicator Bar */}
        <mesh position={[0, -0.44, 0.024]}>
          <planeGeometry args={[0.18, 0.008]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>
      </group>

      {/* 2. FLOATING ATS SCORE / VERIFIED EMBLEM ABOVE PHONE */}
      <group ref={badgeRef} position={[0, 0.88, 0]}>
        <mesh>
          <cylinderGeometry args={[0.14, 0.14, 0.02, 24]} />
          <meshStandardMaterial
            color="#1e1b4b"
            emissive={accent}
            emissiveIntensity={isSelected ? 1.0 : 0.6}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <ringGeometry args={[0.09, 0.13, 24]} />
          <meshBasicMaterial color={accent} />
        </mesh>
        {/* Central star / diamond */}
        <mesh position={[0, 0, 0.015]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.06, 0.06]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Point Light */}
      <pointLight
        color={accent}
        intensity={isSelected ? 2.4 : 1.3}
        distance={2.5}
        position={[0, 0.5, 0.2]}
      />
    </group>
  );
};
