import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { GraduationCap } from 'lucide-react';
import { ProjectItem } from '../../../types';

interface SwayamSceneProps {
  project: ProjectItem;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: () => void;
  scale?: number;
}

export const SwayamScene: React.FC<SwayamSceneProps> = ({
  project,
  isSelected,
  isDimmed,
  onSelect,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const monitor1Ref = useRef<THREE.Group>(null);
  const monitor2Ref = useRef<THREE.Group>(null);
  const cubeRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Floating particles
  const particleData = useMemo(() => {
    const count = 35;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 1] = 0.2 + Math.random() * 1.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (monitor1Ref.current) {
      monitor1Ref.current.position.y = 0.55 + Math.sin(t * 1.6) * 0.04;
    }
    if (monitor2Ref.current) {
      monitor2Ref.current.position.y = 0.58 + Math.cos(t * 1.8) * 0.04;
    }
    if (cubeRef.current) {
      cubeRef.current.rotation.x = t * 0.4;
      cubeRef.current.rotation.y = t * 0.6;
      cubeRef.current.position.y = 1.05 + Math.sin(t * 2.0) * 0.05;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.08;
    }
  });

  const opacity = isDimmed ? 0.35 : 1.0;
  const glowMultiplier = isSelected ? 1.4 : 1.0;

  return (
    <group
      ref={groupRef}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* =================================================================== */}
      {/* 1. CIRCULAR GLOWING PLATFORM BASE                                   */}
      {/* =================================================================== */}
      <group position={[0, -0.05, 0]}>
        {/* Metallic Base Rim */}
        <mesh>
          <cylinderGeometry args={[0.95, 1.05, 0.12, 32]} />
          <meshStandardMaterial
            color="#0b1120"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
        {/* Glowing Neon Cyan Edge Ring */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.96, 0.96, 0.025, 32]} />
          <meshBasicMaterial
            color="#00f5ff"
            transparent
            opacity={opacity * (isSelected ? 1.0 : 0.85)}
          />
        </mesh>
        {/* Inner Surface Disc */}
        <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.92, 32]} />
          <meshStandardMaterial
            color="#020617"
            emissive="#0369a1"
            emissiveIntensity={isSelected ? 0.5 : 0.25}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Energy Light */}
        <pointLight
          color="#00f5ff"
          intensity={isSelected ? 3.0 : 1.8}
          distance={3.2}
          position={[0, 0.4, 0]}
        />
      </group>

      {/* =================================================================== */}
      {/* 2. 3D LAPTOP WORKSTATION                                            */}
      {/* =================================================================== */}
      <group position={[0, 0.1, 0.05]}>
        {/* Base Keyboard Deck */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[0.55, 0.02, 0.38]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Keyboard Keys Glow */}
        <mesh position={[0, 0.026, 0.02]}>
          <boxGeometry args={[0.48, 0.005, 0.26]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#00f5ff"
            emissiveIntensity={0.6 * glowMultiplier}
          />
        </mesh>
        {/* Laptop Screen Angled Open */}
        <group position={[0, 0.025, -0.19]} rotation={[0.22, 0, 0]}>
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[0.55, 0.36, 0.02]} />
            <meshStandardMaterial color="#090d16" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Glowing Course Dashboard Screen */}
          <mesh position={[0, 0.18, 0.012]}>
            <planeGeometry args={[0.51, 0.32]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
          {/* Inner UI Accent Lines */}
          <mesh position={[-0.1, 0.22, 0.013]}>
            <planeGeometry args={[0.24, 0.04]} />
            <meshBasicMaterial color="#00f5ff" />
          </mesh>
          <mesh position={[0.12, 0.22, 0.013]}>
            <planeGeometry args={[0.16, 0.04]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
      </group>

      {/* =================================================================== */}
      {/* 3. TWO FLOATING HOLOGRAPHIC MONITORS                                */}
      {/* =================================================================== */}
      {/* Left Hologram Screen */}
      <group ref={monitor1Ref} position={[-0.45, 0.55, -0.05]} rotation={[0, 0.45, 0]}>
        <mesh>
          <planeGeometry args={[0.35, 0.24]} />
          <meshStandardMaterial
            color="#0369a1"
            emissive="#00f5ff"
            emissiveIntensity={0.5 * glowMultiplier}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Right Hologram Screen */}
      <group ref={monitor2Ref} position={[0.45, 0.58, -0.05]} rotation={[0, -0.45, 0]}>
        <mesh>
          <planeGeometry args={[0.35, 0.24]} />
          <meshStandardMaterial
            color="#0369a1"
            emissive="#38bdf8"
            emissiveIntensity={0.5 * glowMultiplier}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Floating Holographic Classroom Cube */}
      <mesh ref={cubeRef} position={[0, 1.05, 0]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial
          color="#00f5ff"
          wireframe
          emissive="#00f5ff"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Floating Learning Data Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particleData, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#00f5ff"
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      {/* =================================================================== */}
      {/* 4. CONNECTED PILL BADGES (LEFT SIDE) & BOTTOM TITLE BADGE           */}
      {/* =================================================================== */}
      {/* Left Side Feature Pills */}
      <Html position={[-1.2, 0.45, 0]} center distanceFactor={7.5} pointerEvents="none">
        <div className="flex flex-col items-end gap-1.5 select-none pointer-events-none pr-1">
          {['Courses', 'Live Classes', 'Assignments', 'Notifications'].map((badge) => (
            <div
              key={badge}
              className="px-2.5 py-0.5 rounded-full bg-slate-950/85 border border-cyan-400/80 shadow-[0_0_10px_rgba(0,245,255,0.4)] backdrop-blur-md flex items-center gap-1 whitespace-nowrap"
            >
              <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00f5ff]" />
              <span className="text-[9px] font-mono tracking-wider text-cyan-200 font-bold">
                {badge}
              </span>
            </div>
          ))}
        </div>
      </Html>

      {/* Bottom Title Pill */}
      <Html position={[0, -0.4, 0.4]} center distanceFactor={7.5} pointerEvents="auto">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`cursor-pointer px-3.5 py-1.5 rounded-2xl backdrop-blur-xl border transition-all flex items-center gap-2 shadow-lg select-none whitespace-nowrap ${
            isSelected
              ? 'bg-slate-950/95 border-cyan-400 shadow-[0_0_20px_rgba(0,245,255,0.6)] scale-105'
              : 'bg-slate-950/85 border-cyan-500/40 hover:border-cyan-300 hover:scale-102'
          }`}
        >
          <div className="w-6 h-6 rounded-lg bg-cyan-950/90 border border-cyan-400/80 flex items-center justify-center text-cyan-300 shadow-[0_0_8px_rgba(0,245,255,0.5)]">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-black tracking-wider text-white font-orbitron drop-shadow-[0_0_6px_#00f5ff]">
              SWAYAM 2.0
            </span>
            <span className="text-[8px] font-mono tracking-wider text-cyan-300 font-bold uppercase">
              Full Stack Web Application
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
};
