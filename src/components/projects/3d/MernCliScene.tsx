import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Terminal } from 'lucide-react';
import { ProjectItem } from '../../../types';

interface MernCliSceneProps {
  project: ProjectItem;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: () => void;
  scale?: number;
}

export const MernCliScene: React.FC<MernCliSceneProps> = ({
  project,
  isSelected,
  isDimmed,
  onSelect,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const monitor1Ref = useRef<THREE.Group>(null);
  const monitor2Ref = useRef<THREE.Group>(null);
  const dbCylinderRef = useRef<THREE.Mesh>(null);
  const codePromptRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (monitor1Ref.current) {
      monitor1Ref.current.position.y = 0.58 + Math.sin(t * 1.8) * 0.03;
    }
    if (monitor2Ref.current) {
      monitor2Ref.current.position.y = 0.58 + Math.cos(t * 1.8) * 0.03;
    }
    if (dbCylinderRef.current) {
      dbCylinderRef.current.rotation.y = t * 0.5;
    }
    if (codePromptRef.current) {
      codePromptRef.current.rotation.y = t * 0.8;
      codePromptRef.current.position.y = 0.95 + Math.sin(t * 2.0) * 0.04;
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
      {/* 1. CIRCULAR GLOWING PLATFORM BASE (CYAN & ELECTRIC BLUE)            */}
      {/* =================================================================== */}
      <group position={[0, -0.05, 0]}>
        <mesh>
          <cylinderGeometry args={[0.95, 1.05, 0.12, 32]} />
          <meshStandardMaterial color="#0b1120" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.96, 0.96, 0.025, 32]} />
          <meshBasicMaterial
            color="#00f5ff"
            transparent
            opacity={opacity * (isSelected ? 1.0 : 0.85)}
          />
        </mesh>
        <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.92, 32]} />
          <meshStandardMaterial
            color="#020617"
            emissive="#0284c7"
            emissiveIntensity={isSelected ? 0.45 : 0.25}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <pointLight
          color="#00f5ff"
          intensity={isSelected ? 3.0 : 1.8}
          distance={3.2}
          position={[0, 0.4, 0]}
        />
      </group>

      {/* =================================================================== */}
      {/* 2. DEVELOPER LAPTOP & CODE TERMINAL                                 */}
      {/* =================================================================== */}
      <group position={[0, 0.1, 0.08]}>
        {/* Base Keyboard Deck */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[0.55, 0.02, 0.38]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Keyboard illuminated deck */}
        <mesh position={[0, 0.026, 0.02]}>
          <boxGeometry args={[0.48, 0.005, 0.26]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#00f5ff"
            emissiveIntensity={0.6 * glowMultiplier}
          />
        </mesh>
        {/* Screen Angled Open */}
        <group position={[0, 0.025, -0.19]} rotation={[0.2, 0, 0]}>
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[0.55, 0.36, 0.02]} />
            <meshStandardMaterial color="#090d16" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Glowing Terminal Screen (Green/Cyan CLI Code) */}
          <mesh position={[0, 0.18, 0.012]}>
            <planeGeometry args={[0.51, 0.32]} />
            <meshBasicMaterial color="#022c22" />
          </mesh>
          {/* CLI code lines */}
          {[-0.08, -0.02, 0.04, 0.1, 0.16].map((y, idx) => (
            <mesh key={idx} position={[-0.05, 0.18 + y, 0.014]}>
              <planeGeometry args={[0.35 - (idx % 2) * 0.06, 0.02]} />
              <meshBasicMaterial color={idx === 4 ? '#22c55e' : '#00f5ff'} />
            </mesh>
          ))}
        </group>
      </group>

      {/* =================================================================== */}
      {/* 3. TWO VERTICAL CODING MONITORS                                     */}
      {/* =================================================================== */}
      {/* Left Vertical Screen */}
      <group ref={monitor1Ref} position={[-0.46, 0.58, -0.1]} rotation={[0, 0.45, 0]}>
        <mesh>
          <boxGeometry args={[0.26, 0.44, 0.015]} />
          <meshStandardMaterial color="#090d16" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.23, 0.41]} />
          <meshBasicMaterial color="#0369a1" />
        </mesh>
      </group>

      {/* Right Vertical Screen */}
      <group ref={monitor2Ref} position={[0.46, 0.58, -0.1]} rotation={[0, -0.45, 0]}>
        <mesh>
          <boxGeometry args={[0.26, 0.44, 0.015]} />
          <meshStandardMaterial color="#090d16" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.23, 0.41]} />
          <meshBasicMaterial color="#0369a1" />
        </mesh>
      </group>

      {/* =================================================================== */}
      {/* 4. SERVER RACK & DATABASE CYLINDER (MONGODB GREEN)                  */}
      {/* =================================================================== */}
      {/* Server Tower (Back-Left) */}
      <group position={[-0.32, 0.1, -0.32]}>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.18, 0.5, 0.18]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        {/* Blinking LED Lights */}
        {[0.12, 0.22, 0.32, 0.42].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0.092]}>
            <boxGeometry args={[0.12, 0.025, 0.005]} />
            <meshBasicMaterial color={idx % 2 === 0 ? '#00f5ff' : '#22c55e'} />
          </mesh>
        ))}
      </group>

      {/* Database Storage Cylinder (Back-Right) */}
      <group position={[0.32, 0.1, -0.32]}>
        <mesh ref={dbCylinderRef} position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.44, 16]} />
          <meshStandardMaterial
            color="#064e3b"
            emissive="#10b981"
            emissiveIntensity={0.5}
            metalness={0.85}
          />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.095, 0.095, 0.04, 16]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
      </group>

      {/* Floating Holographic Code Prompt Bracket */}
      <mesh ref={codePromptRef} position={[0, 0.95, -0.05]}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial
          color="#00f5ff"
          wireframe
          emissive="#00f5ff"
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* =================================================================== */}
      {/* 5. CONNECTED PILL BADGES & BOTTOM TITLE BADGE                       */}
      {/* =================================================================== */}
      <Html position={[-1.2, 0.45, 0]} center distanceFactor={7.5} pointerEvents="none">
        <div className="flex flex-col items-end gap-1.5 select-none pointer-events-none pr-1">
          {['MERN Generator', 'Authentication', 'Project Scaffolding', '80%+ Time Saved'].map((badge) => (
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
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-black tracking-wider text-white font-orbitron drop-shadow-[0_0_6px_#00f5ff]">
              NK MERN CLI
            </span>
            <span className="text-[8px] font-mono tracking-wider text-cyan-300 font-bold uppercase">
              Developer Tool
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
};
