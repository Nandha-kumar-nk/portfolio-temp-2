import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem } from '../../../../types';

interface VisualProps {
  project: ProjectItem;
  isSelected?: boolean;
  isDimmed?: boolean;
  scale?: number;
}

export const LaptopVisual: React.FC<VisualProps> = ({
  project,
  isSelected = true,
  isDimmed = false,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const screenGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle floating hover
      groupRef.current.position.y = Math.sin(t * 1.6) * 0.035;
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.05;
    }
  });

  const accent = project.accentColor || '#00f5ff';
  const opacity = isDimmed ? 0.35 : 1.0;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* =================================================================== */}
      {/* 1. LAPTOP BASE (KEYBOARD CHASSIS & TRACKPAD)                        */}
      {/* =================================================================== */}
      <group position={[0, 0.08, 0.06]}>
        {/* Unibody Chassis with Chamfered Profile */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.25, 0.038, 0.85]} />
          <meshStandardMaterial
            color="#0b1120"
            metalness={0.94}
            roughness={0.2}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Keyboard Deck Well */}
        <mesh position={[0, 0.02, -0.06]}>
          <boxGeometry args={[1.1, 0.005, 0.48]} />
          <meshBasicMaterial color="#020617" />
        </mesh>

        {/* Backlit Key Rows with Cyber Accent */}
        {[-0.18, -0.1, -0.02, 0.06].map((z, idx) => (
          <mesh key={idx} position={[0, 0.023, z]}>
            <boxGeometry args={[1.04, 0.004, 0.055]} />
            <meshBasicMaterial
              color={accent}
              transparent
              opacity={0.65 * opacity}
            />
          </mesh>
        ))}

        {/* Large Precision Trackpad */}
        <mesh position={[0, 0.021, 0.26]}>
          <boxGeometry args={[0.42, 0.003, 0.24]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* Front Edge Glowing Status Blade */}
        <mesh position={[0, -0.004, 0.426]}>
          <boxGeometry args={[0.34, 0.012, 0.008]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      </group>

      {/* =================================================================== */}
      {/* 2. LAPTOP SCREEN (DISPLAYING SWAYAM 2.0 WEB APPLICATION)           */}
      {/* =================================================================== */}
      <group
        ref={screenGroupRef}
        position={[0, 0.1, -0.36]}
        rotation={[-0.22, 0, 0]}
      >
        {/* Aluminum Lid Backing */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.25, 0.8, 0.024]} />
          <meshStandardMaterial
            color="#080e1a"
            metalness={0.96}
            roughness={0.16}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Ultra-slim Bezel Frame */}
        <mesh position={[0, 0.4, 0.013]}>
          <planeGeometry args={[1.21, 0.76]} />
          <meshBasicMaterial color="#020617" />
        </mesh>

        {/* OLED Display Surface with Ambient Blue Glow */}
        <mesh position={[0, 0.4, 0.015]}>
          <planeGeometry args={[1.15, 0.7]} />
          <meshStandardMaterial
            color="#021220"
            emissive={accent}
            emissiveIntensity={isSelected ? 0.7 : 0.4}
            roughness={0.12}
            metalness={0.25}
            transparent
            opacity={0.94 * opacity}
          />
        </mesh>

        {/* ----------------------------------------------------------------- */}
        {/* SWAYAM WEB APP UI MOCKUP ON SCREEN                                */}
        {/* ----------------------------------------------------------------- */}
        {/* Top Navbar */}
        <mesh position={[0, 0.7, 0.018]}>
          <planeGeometry args={[1.1, 0.06]} />
          <meshBasicMaterial color="#0b2438" />
        </mesh>
        {/* Window controls */}
        {[-0.5, -0.47, -0.44].map((x, i) => (
          <mesh key={i} position={[x, 0.7, 0.02]}>
            <circleGeometry args={[0.01, 16]} />
            <meshBasicMaterial
              color={i === 0 ? '#ef4444' : i === 1 ? '#eab308' : '#22c55e'}
            />
          </mesh>
        ))}
        {/* Swayam Logo Mark in navbar */}
        <mesh position={[-0.32, 0.7, 0.02]}>
          <planeGeometry args={[0.12, 0.02]} />
          <meshBasicMaterial color={accent} />
        </mesh>

        {/* Course Banner / Hero Card */}
        <mesh position={[-0.22, 0.52, 0.018]}>
          <planeGeometry args={[0.58, 0.24]} />
          <meshBasicMaterial color="#0369a1" />
        </mesh>
        {/* Video Player Play Button Triangle */}
        <mesh position={[-0.22, 0.52, 0.02]}>
          <circleGeometry args={[0.035, 18]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Course Progress Bar */}
        <mesh position={[-0.22, 0.36, 0.018]}>
          <planeGeometry args={[0.58, 0.02]} />
          <meshBasicMaterial color="#082f49" />
        </mesh>
        <mesh position={[-0.32, 0.36, 0.02]}>
          <planeGeometry args={[0.38, 0.02]} />
          <meshBasicMaterial color={accent} />
        </mesh>

        {/* Right Sidebar Modules List Cards */}
        <mesh position={[0.3, 0.57, 0.018]}>
          <planeGeometry args={[0.42, 0.14]} />
          <meshBasicMaterial color="#082f49" />
        </mesh>
        <mesh position={[0.3, 0.4, 0.018]}>
          <planeGeometry args={[0.42, 0.14]} />
          <meshBasicMaterial color="#0c4a6e" />
        </mesh>
        <mesh position={[0.3, 0.23, 0.018]}>
          <planeGeometry args={[0.42, 0.14]} />
          <meshBasicMaterial color="#075985" />
        </mesh>

        {/* Left Bottom Analytics Metric Grid */}
        <mesh position={[-0.38, 0.23, 0.018]}>
          <planeGeometry args={[0.26, 0.14]} />
          <meshBasicMaterial color="#082f49" />
        </mesh>
        <mesh position={[-0.08, 0.23, 0.018]}>
          <planeGeometry args={[0.26, 0.14]} />
          <meshBasicMaterial color="#0c4a6e" />
        </mesh>

        {/* Robust Screen Hinge */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.024, 0.024, 1.05, 18]} />
          <meshStandardMaterial color="#1e293b" metalness={0.92} roughness={0.2} />
        </mesh>
      </group>

      {/* Gentle Uplight */}
      <pointLight
        color={accent}
        intensity={isSelected ? 2.4 : 1.3}
        distance={2.6}
        position={[0, 0.45, 0.25]}
      />
    </group>
  );
};
