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

export const TerminalVisual: React.FC<VisualProps> = ({
  project,
  isSelected,
  isDimmed,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const cubeCageRef = useRef<THREE.Mesh>(null);
  const cursorRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.8) * 0.04;
      groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.1;
    }
    if (cubeCageRef.current) {
      cubeCageRef.current.rotation.x = t * 0.4;
      cubeCageRef.current.rotation.y = t * 0.5;
    }
    if (cursorRef.current) {
      (cursorRef.current.material as THREE.MeshBasicMaterial).opacity =
        Math.floor(t * 3.5) % 2 === 0 ? 1.0 : 0.1;
    }
  });

  const accent = project.accentColor || '#00f5ff';
  const opacity = isDimmed ? 0.35 : 1.0;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* 1. CENTRAL CYBER TERMINAL CUBE */}
      <group position={[0, 0.42, 0]}>
        {/* Main Dark Body */}
        <mesh>
          <boxGeometry args={[0.82, 0.72, 0.62]} />
          <meshStandardMaterial
            color="#050814"
            emissive="#021424"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.92 * opacity}
          />
        </mesh>

        {/* Cube Neon Edge Chamfer */}
        <mesh>
          <boxGeometry args={[0.83, 0.73, 0.63]} />
          <meshBasicMaterial
            color={accent}
            wireframe
            transparent
            opacity={0.45 * opacity}
          />
        </mesh>

        {/* ------------------------------------------------------------- */}
        {/* FRONT TERMINAL CONSOLE DISPLAY                                */}
        {/* ------------------------------------------------------------- */}
        <group position={[0, 0, 0.315]}>
          {/* Console Header Bar */}
          <mesh position={[0, 0.28, 0.001]}>
            <planeGeometry args={[0.74, 0.08]} />
            <meshBasicMaterial color="#0b1120" />
          </mesh>
          {/* Terminal Dots */}
          {[-0.32, -0.28, -0.24].map((x, i) => (
            <mesh key={i} position={[x, 0.28, 0.002]}>
              <circleGeometry args={[0.012, 12]} />
              <meshBasicMaterial
                color={i === 0 ? '#ef4444' : i === 1 ? '#eab308' : '#22c55e'}
              />
            </mesh>
          ))}
          {/* Window Title Strip */}
          <mesh position={[0.05, 0.28, 0.002]}>
            <planeGeometry args={[0.22, 0.018]} />
            <meshBasicMaterial color={accent} />
          </mesh>

          {/* Line 1: $ nk-mern create app */}
          <mesh position={[-0.14, 0.16, 0.002]}>
            <planeGeometry args={[0.42, 0.024]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>

          {/* Line 2: [✓] Scaffolding Express + React + Mongo */}
          <mesh position={[-0.05, 0.07, 0.002]}>
            <planeGeometry args={[0.56, 0.02]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>

          {/* Line 3: [✓] Injecting JWT Auth & Docker */}
          <mesh position={[-0.08, -0.01, 0.002]}>
            <planeGeometry args={[0.5, 0.02]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>

          {/* Line 4: > Ready to deploy */}
          <mesh position={[-0.18, -0.09, 0.002]}>
            <planeGeometry args={[0.3, 0.02]} />
            <meshBasicMaterial color={accent} />
          </mesh>

          {/* Blinking Cursor */}
          <mesh ref={cursorRef} position={[0.02, -0.09, 0.002]}>
            <planeGeometry args={[0.025, 0.035]} />
            <meshBasicMaterial color="#22c55e" transparent />
          </mesh>

          {/* Bottom Status Bar */}
          <mesh position={[0, -0.28, 0.001]}>
            <planeGeometry args={[0.74, 0.05]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
        </group>
      </group>

      {/* 2. OUTER ROTATING CUBIC WIREFRAME SATELLITE CAGE */}
      <mesh ref={cubeCageRef} position={[0, 0.42, 0]}>
        <boxGeometry args={[1.15, 1.15, 1.15]} />
        <meshBasicMaterial
          color={accent}
          wireframe
          transparent
          opacity={0.3 * opacity}
        />
      </mesh>

      {/* Point Light */}
      <pointLight
        color={accent}
        intensity={isSelected ? 2.6 : 1.4}
        distance={2.6}
        position={[0, 0.42, 0.35]}
      />
    </group>
  );
};
