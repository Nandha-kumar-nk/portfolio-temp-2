import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Leaf } from 'lucide-react';
import { ProjectItem } from '../../../types';

interface ForestAISceneProps {
  project: ProjectItem;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: () => void;
  scale?: number;
}

export const ForestAIScene: React.FC<ForestAISceneProps> = ({
  project,
  isSelected,
  isDimmed,
  onSelect,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const radarWaveRef = useRef<THREE.Mesh>(null);
  const sensorVaneRef = useRef<THREE.Group>(null);
  const satelliteRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (radarWaveRef.current) {
      const s = 0.4 + (t * 0.8) % 1.2;
      radarWaveRef.current.scale.set(s, s, 1);
      (radarWaveRef.current.material as THREE.MeshBasicMaterial).opacity =
        Math.max(0, 0.8 * (1 - s / 1.6));
    }
    if (sensorVaneRef.current) {
      sensorVaneRef.current.rotation.y = t * 1.5;
    }
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y = t * 0.3;
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
      {/* 1. CIRCULAR GLOWING PLATFORM BASE (EMERALD GREEN)                   */}
      {/* =================================================================== */}
      <group position={[0, -0.05, 0]}>
        <mesh>
          <cylinderGeometry args={[0.95, 1.05, 0.12, 32]} />
          <meshStandardMaterial color="#0b1120" metalness={0.9} roughness={0.25} />
        </mesh>
        {/* Glowing Neon Green Edge Ring */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.96, 0.96, 0.025, 32]} />
          <meshBasicMaterial
            color="#22c55e"
            transparent
            opacity={opacity * (isSelected ? 1.0 : 0.85)}
          />
        </mesh>
        {/* Grassy Low-Poly Terrain Mound */}
        <mesh position={[0, 0.065, 0]}>
          <cylinderGeometry args={[0.9, 0.92, 0.08, 16]} />
          <meshStandardMaterial
            color="#064e3b"
            emissive="#059669"
            emissiveIntensity={isSelected ? 0.4 : 0.2}
            roughness={0.8}
            flatShading
          />
        </mesh>
        <pointLight
          color="#22c55e"
          intensity={isSelected ? 3.0 : 1.8}
          distance={3.2}
          position={[0, 0.4, 0]}
        />
      </group>

      {/* =================================================================== */}
      {/* 2. MINIATURE FOREST & 3D TREES                                      */}
      {/* =================================================================== */}
      <group position={[-0.25, 0.1, -0.1]}>
        {/* Tree 1: Tall Pine Tree */}
        <group position={[-0.2, 0, -0.2]}>
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.025, 0.04, 0.24, 6]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          <mesh position={[0, 0.32, 0]}>
            <coneGeometry args={[0.16, 0.28, 6]} />
            <meshStandardMaterial color="#15803d" flatShading />
          </mesh>
          <mesh position={[0, 0.48, 0]}>
            <coneGeometry args={[0.12, 0.22, 6]} />
            <meshStandardMaterial color="#22c55e" flatShading />
          </mesh>
        </group>

        {/* Tree 2: Medium Foliage Tree */}
        <group position={[-0.45, 0, 0.1]}>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.02, 0.03, 0.2, 6]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          <mesh position={[0, 0.26, 0]}>
            <dodecahedronGeometry args={[0.13, 0]} />
            <meshStandardMaterial color="#16a34a" flatShading />
          </mesh>
        </group>

        {/* Tree 3: Smaller Tree */}
        <group position={[0.05, 0, -0.35]}>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.018, 0.025, 0.16, 6]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <coneGeometry args={[0.11, 0.2, 6]} />
            <meshStandardMaterial color="#10b981" flatShading />
          </mesh>
        </group>
      </group>

      {/* =================================================================== */}
      {/* 3. 3D ELEPHANT MODEL                                                */}
      {/* =================================================================== */}
      <group position={[-0.15, 0.12, 0.2]} rotation={[0, 0.35, 0]}>
        {/* Body */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.3, 0.22, 0.18]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>
        {/* Head */}
        <mesh position={[0.18, 0.22, 0]}>
          <boxGeometry args={[0.16, 0.16, 0.15]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>
        {/* Trunk Curving Down */}
        <mesh position={[0.27, 0.12, 0]} rotation={[0, 0, -0.4]}>
          <cylinderGeometry args={[0.025, 0.035, 0.18, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        {/* Ears */}
        <mesh position={[0.16, 0.24, 0.09]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.08, 0.12, 0.015]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[0.16, 0.24, -0.09]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[0.08, 0.12, 0.015]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        {/* Legs */}
        {[-0.09, 0.09].map((x) =>
          [-0.06, 0.06].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.06, z]}>
              <cylinderGeometry args={[0.03, 0.035, 0.14, 8]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
          ))
        )}
      </group>

      {/* =================================================================== */}
      {/* 4. IOT SENSOR TOWER & TELEMETRY SATELLITE DISH                      */}
      {/* =================================================================== */}
      {/* IoT Sensor Mast with Solar Wing & Vane */}
      <group position={[0.38, 0.1, -0.15]}>
        {/* Metallic Lattice Mast */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.02, 0.035, 0.6, 6]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
        {/* Rotating Solar / Wind Vane */}
        <group ref={sensorVaneRef} position={[0, 0.6, 0]}>
          <mesh>
            <boxGeometry args={[0.3, 0.015, 0.06]} />
            <meshStandardMaterial
              color="#0284c7"
              emissive="#00f5ff"
              emissiveIntensity={0.5}
            />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      </group>

      {/* Satellite Telemetry Dish */}
      <group ref={satelliteRef} position={[0.42, 0.1, 0.25]}>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.24, 6]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} />
        </mesh>
        {/* Dish */}
        <mesh position={[0, 0.26, 0]} rotation={[0.45, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} side={THREE.DoubleSide} />
        </mesh>
        {/* Central LNB Needle */}
        <mesh position={[0, 0.32, 0.05]}>
          <cylinderGeometry args={[0.008, 0.008, 0.08, 6]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
      </group>

      {/* Holographic Detection Radar Wave Circle on Ground */}
      <mesh
        ref={radarWaveRef}
        position={[-0.15, 0.12, 0.2]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.3, 0.36, 32]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* =================================================================== */}
      {/* 5. CONNECTED PILL BADGES (LEFT SIDE) & BOTTOM TITLE BADGE           */}
      {/* =================================================================== */}
      {/* Left Side Feature Pills */}
      <Html position={[-1.2, 0.45, 0]} center distanceFactor={7.5} pointerEvents="none">
        <div className="flex flex-col items-end gap-1.5 select-none pointer-events-none pr-1">
          {['Wildlife Detection', 'Satellite Data', 'Forest Monitoring', 'AI Prediction'].map((badge) => (
            <div
              key={badge}
              className="px-2.5 py-0.5 rounded-full bg-slate-950/85 border border-emerald-400/80 shadow-[0_0_10px_rgba(34,197,94,0.4)] backdrop-blur-md flex items-center gap-1 whitespace-nowrap"
            >
              <span className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_4px_#22c55e]" />
              <span className="text-[9px] font-mono tracking-wider text-emerald-200 font-bold">
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
              ? 'bg-slate-950/95 border-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.6)] scale-105'
              : 'bg-slate-950/85 border-emerald-500/40 hover:border-emerald-300 hover:scale-102'
          }`}
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-950/90 border border-emerald-400/80 flex items-center justify-center text-emerald-300 shadow-[0_0_8px_rgba(34,197,94,0.5)]">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-black tracking-wider text-white font-orbitron drop-shadow-[0_0_6px_#22c55e]">
              AI-Based Solution
            </span>
            <span className="text-[8px] font-mono tracking-wider text-emerald-300 font-bold uppercase">
              for Human-Animal Conflict • AI / IoT
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
};
