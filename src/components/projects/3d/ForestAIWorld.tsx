import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { FloatingIslandBase } from './FloatingIslandBase';
import { ProjectItem } from '../../../types';

interface ForestAIWorldProps {
  project: ProjectItem;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: () => void;
}

export const ForestAIWorld: React.FC<ForestAIWorldProps> = ({
  project,
  isSelected,
  isDimmed,
  onSelect,
}) => {
  const elephantTrunkRef = useRef<THREE.Group>(null);
  const aiBoxRef = useRef<THREE.Group>(null);
  const iotBeaconLightRef = useRef<THREE.PointLight>(null);
  const radarWaveRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Gentle trunk movement
    if (elephantTrunkRef.current) {
      elephantTrunkRef.current.rotation.x = -0.2 + Math.sin(t * 1.5) * 0.12;
    }
    // AI Bounding Box Pulse
    if (aiBoxRef.current) {
      const scale = 1 + Math.sin(t * 4) * 0.04;
      aiBoxRef.current.scale.set(scale, scale, scale);
    }
    // IoT Blinking Sensor Beacon
    if (iotBeaconLightRef.current) {
      iotBeaconLightRef.current.intensity = Math.sin(t * 8) > 0 ? 2.5 : 0.2;
    }
    // Radar detection wave pulse
    if (radarWaveRef.current) {
      const r = (t * 0.8) % 1;
      radarWaveRef.current.scale.set(1 + r * 0.8, 1 + r * 0.8, 1);
      (radarWaveRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - r) * 0.6;
    }
  });

  return (
    <group onClick={(e) => { e.stopPropagation(); onSelect(); }}>
      <FloatingIslandBase
        themeColor={project.themeColor}
        accentGlow={project.accentGlow}
        isSelected={isSelected}
        isDimmed={isDimmed}
        radius={1.45}
        height={0.55}
        bobSpeed={1.05}
        bobOffset={2.4}
      >
        {/* ================================================================= */}
        {/* 1. NATURAL FOREST TERRAIN (Mossy slopes, rocky steps)              */}
        {/* ================================================================= */}
        {/* Terrain Mound 1 */}
        <mesh position={[-0.2, 0.08, 0.1]} receiveShadow>
          <cylinderGeometry args={[1.25, 1.35, 0.16, 12]} />
          <meshStandardMaterial color="#0f291e" roughness={0.9} />
        </mesh>
        {/* Terrain Hill Mound 2 */}
        <mesh position={[0.4, 0.18, -0.2]}>
          <cylinderGeometry args={[0.65, 0.8, 0.2, 8]} />
          <meshStandardMaterial color="#16382a" roughness={0.85} />
        </mesh>
        {/* Natural Rocks */}
        <mesh position={[-0.65, 0.14, 0.6]} rotation={[0.2, 0.4, 0.1]}>
          <dodecahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color="#2d3748" roughness={0.8} />
        </mesh>
        <mesh position={[0.7, 0.12, 0.55]} rotation={[-0.1, 0.6, 0.2]}>
          <dodecahedronGeometry args={[0.13, 0]} />
          <meshStandardMaterial color="#1f2937" roughness={0.8} />
        </mesh>

        {/* ================================================================= */}
        {/* 2. STYLIZED 3D LOW-POLY PINE & CANOPY TREES                       */}
        {/* ================================================================= */}
        {/* Tree 1: Tall Pine (Left Back) */}
        <group position={[-0.8, 0.15, -0.45]}>
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 0.35, 6]} />
            <meshStandardMaterial color="#422006" />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <coneGeometry args={[0.28, 0.4, 6]} />
            <meshStandardMaterial color="#065f46" flatShading />
          </mesh>
          <mesh position={[0, 0.65, 0]}>
            <coneGeometry args={[0.22, 0.35, 6]} />
            <meshStandardMaterial color="#047857" flatShading />
          </mesh>
          <mesh position={[0, 0.82, 0]}>
            <coneGeometry args={[0.15, 0.28, 6]} />
            <meshStandardMaterial color="#10b981" flatShading />
          </mesh>
        </group>

        {/* Tree 2: Canopy Tree (Back Center) */}
        <group position={[0.1, 0.2, -0.7]}>
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.045, 0.07, 0.45, 6]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          <mesh position={[0, 0.55, 0]}>
            <dodecahedronGeometry args={[0.28, 1]} />
            <meshStandardMaterial color="#059669" flatShading />
          </mesh>
        </group>

        {/* Tree 3: Smaller Pine (Right Back) */}
        <group position={[0.75, 0.22, -0.4]}>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.035, 0.05, 0.3, 6]} />
            <meshStandardMaterial color="#422006" />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <coneGeometry args={[0.22, 0.32, 6]} />
            <meshStandardMaterial color="#064e3b" flatShading />
          </mesh>
          <mesh position={[0, 0.58, 0]}>
            <coneGeometry args={[0.16, 0.26, 6]} />
            <meshStandardMaterial color="#059669" flatShading />
          </mesh>
        </group>

        {/* ================================================================= */}
        {/* 3. 3D STYLIZED LOW-POLY ELEPHANT                                  */}
        {/* ================================================================= */}
        <group position={[-0.15, 0.16, 0.1]} rotation={[0, 0.5, 0]}>
          {/* Torso */}
          <mesh position={[0, 0.38, 0]} castShadow>
            <boxGeometry args={[0.42, 0.36, 0.55]} />
            <meshStandardMaterial color="#475569" roughness={0.7} flatShading />
          </mesh>

          {/* 4 Sturdy Legs */}
          <mesh position={[-0.14, 0.14, 0.18]}>
            <cylinderGeometry args={[0.055, 0.065, 0.28, 6]} />
            <meshStandardMaterial color="#334155" flatShading />
          </mesh>
          <mesh position={[0.14, 0.14, 0.18]}>
            <cylinderGeometry args={[0.055, 0.065, 0.28, 6]} />
            <meshStandardMaterial color="#334155" flatShading />
          </mesh>
          <mesh position={[-0.14, 0.14, -0.18]}>
            <cylinderGeometry args={[0.055, 0.065, 0.28, 6]} />
            <meshStandardMaterial color="#334155" flatShading />
          </mesh>
          <mesh position={[0.14, 0.14, -0.18]}>
            <cylinderGeometry args={[0.055, 0.065, 0.28, 6]} />
            <meshStandardMaterial color="#334155" flatShading />
          </mesh>

          {/* Head */}
          <mesh position={[0, 0.48, 0.36]}>
            <boxGeometry args={[0.28, 0.28, 0.28]} />
            <meshStandardMaterial color="#475569" flatShading />
          </mesh>

          {/* Large Flapping Ears */}
          <mesh position={[-0.22, 0.52, 0.34]} rotation={[0, 0.4, 0.1]}>
            <boxGeometry args={[0.18, 0.24, 0.03]} />
            <meshStandardMaterial color="#64748b" flatShading />
          </mesh>
          <mesh position={[0.22, 0.52, 0.34]} rotation={[0, -0.4, -0.1]}>
            <boxGeometry args={[0.18, 0.24, 0.03]} />
            <meshStandardMaterial color="#64748b" flatShading />
          </mesh>

          {/* Tusks (Curved ivory) */}
          <mesh position={[-0.08, 0.38, 0.52]} rotation={[0.4, 0.1, 0]}>
            <coneGeometry args={[0.02, 0.16, 5]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          <mesh position={[0.08, 0.38, 0.52]} rotation={[0.4, -0.1, 0]}>
            <coneGeometry args={[0.02, 0.16, 5]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>

          {/* Articulated Raised Trunk */}
          <group ref={elephantTrunkRef} position={[0, 0.42, 0.48]}>
            <mesh position={[0, -0.1, 0.04]} rotation={[-0.3, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.035, 0.22, 6]} />
              <meshStandardMaterial color="#475569" flatShading />
            </mesh>
            <mesh position={[0, -0.18, 0.12]} rotation={[-0.7, 0, 0]}>
              <cylinderGeometry args={[0.035, 0.025, 0.15, 6]} />
              <meshStandardMaterial color="#64748b" flatShading />
            </mesh>
          </group>

          {/* AI Bounding Box Surrounding the Elephant */}
          <group ref={aiBoxRef} position={[0, 0.4, 0.1]}>
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(0.72, 0.72, 0.95)]} />
              <lineBasicMaterial color="#22c55e" linewidth={2} />
            </lineSegments>
            {/* AI Warning Corner Nodes */}
            <mesh position={[0.36, 0.36, 0.47]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial color="#22c55e" />
            </mesh>
            <mesh position={[-0.36, 0.36, 0.47]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial color="#22c55e" />
            </mesh>
            {/* Warning Beacon Above AI Box */}
            <mesh position={[0, 0.44, 0]}>
              <octahedronGeometry args={[0.06, 0]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </group>
        </group>

        {/* ================================================================= */}
        {/* 4. 3D IOT SENSOR TOWERS & SATELLITE DISH                          */}
        {/* ================================================================= */}
        {/* IoT Mast Tower */}
        <group position={[0.85, 0.25, 0.15]}>
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.025, 0.04, 0.9, 6]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          {/* Solar Panel Wing */}
          <mesh position={[0, 0.65, 0]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[0.24, 0.12, 0.02]} />
            <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Antenna Emitter */}
          <mesh position={[0, 0.95, 0]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <pointLight
            ref={iotBeaconLightRef}
            position={[0, 0.95, 0]}
            color="#ef4444"
            distance={2}
          />
        </group>

        {/* Satellite Tracking Dish */}
        <group position={[-0.75, 0.2, 0.55]} rotation={[0.4, -0.6, 0]}>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.03, 0.05, 0.3, 6]} />
            <meshStandardMaterial color="#334155" metalness={0.7} />
          </mesh>
          {/* Parabolic Dish */}
          <mesh position={[0, 0.32, 0]} rotation={[Math.PI, 0, 0]}>
            <sphereGeometry args={[0.22, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2.8]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.3} side={THREE.DoubleSide} />
          </mesh>
          {/* Receiver Horn */}
          <mesh position={[0, 0.38, 0.12]}>
            <cylinderGeometry args={[0.015, 0.02, 0.16, 6]} />
            <meshBasicMaterial color="#00f5ff" />
          </mesh>
        </group>

        {/* Radar Pulse Wave Ring */}
        <mesh
          ref={radarWaveRef}
          position={[-0.15, 0.12, 0.1]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.6, 0.68, 32]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>

        {/* ================================================================= */}
        {/* 5. FLOATING 3D HOLOGRAPHIC BADGES & LABELS (MATCHING REFERENCE)   */}
        {/* ================================================================= */}
        {/* Left-Side Connected Pill Badges */}
        <Html position={[-1.75, 0.35, 0.2]} center distanceFactor={7.5} pointerEvents="none">
          <div className="flex flex-col items-end gap-1.5 select-none">
            {['Wildlife Detection', 'Satellite Data', 'Forest Monitoring', 'AI Prediction'].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-emerald-400/80 shadow-[0_0_10px_rgba(34,197,94,0.4)] backdrop-blur-md"
              >
                <span className="text-[8.5px] font-mono font-bold text-emerald-300 whitespace-nowrap">
                  {badge}
                </span>
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
              </div>
            ))}
          </div>
        </Html>

        {/* Bottom Title Pill Badge */}
        <Html position={[0, -0.65, 0.9]} center distanceFactor={7.5} pointerEvents="none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/95 border border-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.7)] backdrop-blur-xl select-none max-w-[240px]">
            <div className="w-5 h-5 rounded-full bg-emerald-950/90 border border-emerald-400 flex items-center justify-center text-[10px] text-emerald-300 flex-shrink-0">
              🌿
            </div>
            <div className="text-left leading-tight">
              <div className="text-[10.5px] font-black text-white font-orbitron tracking-wider line-clamp-1">
                AI Wildlife Conflict
              </div>
              <div className="text-[8px] font-mono text-emerald-400 font-bold whitespace-nowrap">
                {project.categoryName}
              </div>
            </div>
          </div>
        </Html>
      </FloatingIslandBase>
    </group>
  );
};
