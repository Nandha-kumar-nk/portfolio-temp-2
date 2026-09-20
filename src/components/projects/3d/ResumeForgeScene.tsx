import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { FileText } from 'lucide-react';
import { ProjectItem } from '../../../types';

interface ResumeForgeSceneProps {
  project: ProjectItem;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: () => void;
  scale?: number;
}

export const ResumeForgeScene: React.FC<ResumeForgeSceneProps> = ({
  project,
  isSelected,
  isDimmed,
  onSelect,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const mainDocRef = useRef<THREE.Group>(null);
  const docLeftRef = useRef<THREE.Group>(null);
  const docRightRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Floating sparkle particles
  const particleData = useMemo(() => {
    const count = 35;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 1] = 0.2 + Math.random() * 1.3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mainDocRef.current) {
      mainDocRef.current.position.y = 0.62 + Math.sin(t * 1.5) * 0.04;
      mainDocRef.current.rotation.y = Math.sin(t * 0.8) * 0.08;
    }
    if (docLeftRef.current) {
      docLeftRef.current.position.y = 0.52 + Math.cos(t * 1.7) * 0.03;
    }
    if (docRightRef.current) {
      docRightRef.current.position.y = 0.54 + Math.sin(t * 1.9) * 0.03;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.09;
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
      {/* 1. CIRCULAR GLOWING PLATFORM BASE (VIOLET/PURPLE)                   */}
      {/* =================================================================== */}
      <group position={[0, -0.05, 0]}>
        <mesh>
          <cylinderGeometry args={[0.95, 1.05, 0.12, 32]} />
          <meshStandardMaterial color="#0b1120" metalness={0.9} roughness={0.25} />
        </mesh>
        {/* Glowing Neon Violet Edge Ring */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.96, 0.96, 0.025, 32]} />
          <meshBasicMaterial
            color="#c084fc"
            transparent
            opacity={opacity * (isSelected ? 1.0 : 0.85)}
          />
        </mesh>
        <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.92, 32]} />
          <meshStandardMaterial
            color="#090514"
            emissive="#581c87"
            emissiveIntensity={isSelected ? 0.5 : 0.25}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <pointLight
          color="#c084fc"
          intensity={isSelected ? 3.0 : 1.8}
          distance={3.2}
          position={[0, 0.4, 0]}
        />
      </group>

      {/* =================================================================== */}
      {/* 2. FLOATING HOLOGRAPHIC RESUME DOCUMENT                             */}
      {/* =================================================================== */}
      <group ref={mainDocRef} position={[0, 0.62, 0]}>
        {/* Primary Sheet Body */}
        <mesh>
          <boxGeometry args={[0.52, 0.72, 0.015]} />
          <meshStandardMaterial
            color="#1e1135"
            emissive="#7c3aed"
            emissiveIntensity={0.35 * glowMultiplier}
            transparent
            opacity={0.88}
            roughness={0.3}
          />
        </mesh>
        {/* Glowing Border Frame */}
        <mesh>
          <boxGeometry args={[0.54, 0.74, 0.01]} />
          <meshBasicMaterial color="#c084fc" wireframe />
        </mesh>
        {/* Avatar Slot Placeholder */}
        <mesh position={[-0.15, 0.24, 0.012]}>
          <circleGeometry args={[0.055, 16]} />
          <meshBasicMaterial color="#e9d5ff" />
        </mesh>
        {/* Name Header Line */}
        <mesh position={[0.06, 0.25, 0.012]}>
          <planeGeometry args={[0.22, 0.03]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.06, 0.21, 0.012]}>
          <planeGeometry args={[0.18, 0.015]} />
          <meshBasicMaterial color="#c084fc" />
        </mesh>
        {/* Body Text Mock Lines */}
        {[-0.02, -0.07, -0.12, -0.17, -0.22, -0.27].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0.012]}>
            <planeGeometry args={[0.42 - (idx % 2) * 0.08, 0.018]} />
            <meshBasicMaterial color="#e9d5ff" transparent opacity={0.85} />
          </mesh>
        ))}
      </group>

      {/* Flanking Template Preview Sheet (Left) */}
      <group ref={docLeftRef} position={[-0.42, 0.52, -0.15]} rotation={[0, 0.35, -0.1]}>
        <mesh>
          <boxGeometry args={[0.32, 0.44, 0.01]} />
          <meshStandardMaterial
            color="#2e1065"
            emissive="#a855f7"
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* Flanking Template Preview Sheet (Right) */}
      <group ref={docRightRef} position={[0.42, 0.54, -0.15]} rotation={[0, -0.35, 0.1]}>
        <mesh>
          <boxGeometry args={[0.32, 0.44, 0.01]} />
          <meshStandardMaterial
            color="#2e1065"
            emissive="#a855f7"
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* Generation Sparkle Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particleData, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#c084fc"
          transparent
          opacity={0.75}
          sizeAttenuation
        />
      </points>

      {/* =================================================================== */}
      {/* 3. CONNECTED PILL BADGES (RIGHT SIDE) & BOTTOM TITLE BADGE          */}
      {/* =================================================================== */}
      {/* Right Side Feature Pills */}
      <Html position={[1.2, 0.45, 0]} center distanceFactor={7.5} pointerEvents="none">
        <div className="flex flex-col items-start gap-1.5 select-none pointer-events-none pl-1">
          {['Resume Builder', 'Live Preview', 'Templates', 'Secure & Fast'].map((badge) => (
            <div
              key={badge}
              className="px-2.5 py-0.5 rounded-full bg-slate-950/85 border border-purple-400/80 shadow-[0_0_10px_rgba(192,132,252,0.4)] backdrop-blur-md flex items-center gap-1 whitespace-nowrap"
            >
              <span className="w-1 h-1 rounded-full bg-purple-400 shadow-[0_0_4px_#c084fc]" />
              <span className="text-[9px] font-mono tracking-wider text-purple-200 font-bold">
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
              ? 'bg-slate-950/95 border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.6)] scale-105'
              : 'bg-slate-950/85 border-purple-500/40 hover:border-purple-300 hover:scale-102'
          }`}
        >
          <div className="w-6 h-6 rounded-lg bg-purple-950/90 border border-purple-400/80 flex items-center justify-center text-purple-300 shadow-[0_0_8px_rgba(192,132,252,0.5)]">
            <FileText className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-black tracking-wider text-white font-orbitron drop-shadow-[0_0_6px_#c084fc]">
              Resume Forge
            </span>
            <span className="text-[8px] font-mono tracking-wider text-purple-300 font-bold uppercase">
              Web Application
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
};
