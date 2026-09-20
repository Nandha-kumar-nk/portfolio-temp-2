import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Car } from 'lucide-react';
import { ProjectItem } from '../../../types';

interface SpeedTaxiSceneProps {
  project: ProjectItem;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: () => void;
  scale?: number;
}

export const SpeedTaxiScene: React.FC<SpeedTaxiSceneProps> = ({
  project,
  isSelected,
  isDimmed,
  onSelect,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const taxiRef = useRef<THREE.Group>(null);
  const pinRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (taxiRef.current) {
      taxiRef.current.position.y = 0.12 + Math.sin(t * 3.0) * 0.008;
    }
    if (pinRef.current) {
      pinRef.current.position.y = 0.72 + Math.sin(t * 2.2) * 0.03;
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
      {/* 1. CIRCULAR GLOWING PLATFORM BASE (GOLDEN AMBER)                    */}
      {/* =================================================================== */}
      <group position={[0, -0.05, 0]}>
        <mesh>
          <cylinderGeometry args={[0.95, 1.05, 0.12, 32]} />
          <meshStandardMaterial color="#0b1120" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.96, 0.96, 0.025, 32]} />
          <meshBasicMaterial
            color="#eab308"
            transparent
            opacity={opacity * (isSelected ? 1.0 : 0.85)}
          />
        </mesh>
        <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.92, 32]} />
          <meshStandardMaterial
            color="#1c1917"
            emissive="#78350f"
            emissiveIntensity={isSelected ? 0.45 : 0.25}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        <pointLight
          color="#facc15"
          intensity={isSelected ? 3.0 : 1.8}
          distance={3.2}
          position={[0, 0.4, 0]}
        />
      </group>

      {/* =================================================================== */}
      {/* 2. ASPHALT ROAD STRIP & MINIATURE CITY SKYSCRAPERS                  */}
      {/* =================================================================== */}
      {/* Curved Asphalt Road */}
      <group position={[0, 0.07, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0.35]}>
          <planeGeometry args={[1.2, 0.36]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
        {/* Dashed Center Road Markings */}
        {[-0.35, -0.1, 0.15, 0.4].map((offset, idx) => (
          <mesh key={idx} position={[offset * 0.8, 0.005, offset * 0.35]} rotation={[-Math.PI / 2, 0, 0.35]}>
            <planeGeometry args={[0.1, 0.02]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
        ))}
      </group>

      {/* Miniature City Buildings in Background */}
      <group position={[0.3, 0.08, -0.32]}>
        <mesh position={[-0.15, 0.22, 0]}>
          <boxGeometry args={[0.12, 0.44, 0.12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.32, 0.04]}>
          <boxGeometry args={[0.14, 0.64, 0.12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <mesh position={[0.16, 0.18, -0.02]}>
          <boxGeometry args={[0.12, 0.36, 0.12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        {/* Glowing Window Accents */}
        <mesh position={[0, 0.35, 0.102]}>
          <planeGeometry args={[0.08, 0.25]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* =================================================================== */}
      {/* 3. 3D FUTURISTIC YELLOW TAXI CAR                                    */}
      {/* =================================================================== */}
      <group ref={taxiRef} position={[-0.05, 0.12, 0.05]} rotation={[0, 0.35, 0]}>
        {/* Lower Car Chassis Body */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.42, 0.09, 0.22]} />
          <meshStandardMaterial
            color="#eab308"
            emissive="#ca8a04"
            emissiveIntensity={0.3 * glowMultiplier}
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
        {/* Upper Cabin & Glass Windshield */}
        <mesh position={[-0.02, 0.12, 0]}>
          <boxGeometry args={[0.24, 0.08, 0.19]} />
          <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Taxi Roof Beacon Light */}
        <mesh position={[-0.02, 0.175, 0]}>
          <boxGeometry args={[0.08, 0.03, 0.05]} />
          <meshStandardMaterial color="#ffffff" emissive="#facc15" emissiveIntensity={0.9} />
        </mesh>
        {/* Headlights */}
        <mesh position={[0.21, 0.05, 0.06]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.21, 0.05, -0.06]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Wheels */}
        {[-0.12, 0.12].map((x) =>
          [-0.11, 0.11].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.02, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.03, 12]} />
              <meshStandardMaterial color="#020617" roughness={0.9} />
            </mesh>
          ))
        )}
      </group>

      {/* =================================================================== */}
      {/* 4. SMARTPHONE WITH GPS MAP HOLOGRAM & ROUTE PIN                     */}
      {/* =================================================================== */}
      <group position={[-0.36, 0.1, -0.15]} rotation={[0, 0.45, 0]}>
        {/* Phone Body */}
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[0.18, 0.36, 0.02]} />
          <meshStandardMaterial color="#090d16" metalness={0.95} />
        </mesh>
        {/* Phone Screen with Map */}
        <mesh position={[0, 0.28, 0.012]}>
          <planeGeometry args={[0.16, 0.33]} />
          <meshBasicMaterial color="#0369a1" />
        </mesh>
        {/* Glowing GPS Route Polyline */}
        <mesh position={[0.01, 0.28, 0.013]}>
          <planeGeometry args={[0.08, 0.02]} />
          <meshBasicMaterial color="#00f5ff" />
        </mesh>
      </group>

      {/* Floating GPS Location Pin Indicator */}
      <group ref={pinRef} position={[-0.05, 0.72, 0.05]}>
        <mesh>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshStandardMaterial color="#ef4444" emissive="#f87171" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0, -0.06, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.03, 0.08, 8]} />
          <meshStandardMaterial color="#ef4444" emissive="#f87171" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* =================================================================== */}
      {/* 5. CONNECTED PILL BADGES (RIGHT SIDE) & BOTTOM TITLE BADGE          */}
      {/* =================================================================== */}
      {/* Right Side Feature Pills */}
      <Html position={[1.2, 0.45, 0]} center distanceFactor={7.5} pointerEvents="none">
        <div className="flex flex-col items-start gap-1.5 select-none pointer-events-none pl-1">
          {['Real-time Booking', 'Live Tracking', 'Fare Calculation', 'Responsive UI'].map((badge) => (
            <div
              key={badge}
              className="px-2.5 py-0.5 rounded-full bg-slate-950/85 border border-amber-400/80 shadow-[0_0_10px_rgba(234,179,8,0.4)] backdrop-blur-md flex items-center gap-1 whitespace-nowrap"
            >
              <span className="w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_4px_#facc15]" />
              <span className="text-[9px] font-mono tracking-wider text-amber-200 font-bold">
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
              ? 'bg-slate-950/95 border-amber-400 shadow-[0_0_20px_rgba(234,179,8,0.6)] scale-105'
              : 'bg-slate-950/85 border-amber-500/40 hover:border-amber-300 hover:scale-102'
          }`}
        >
          <div className="w-6 h-6 rounded-lg bg-amber-950/90 border border-amber-400/80 flex items-center justify-center text-amber-300 shadow-[0_0_8px_rgba(234,179,8,0.5)]">
            <Car className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-black tracking-wider text-white font-orbitron drop-shadow-[0_0_6px_#facc15]">
              Speed Taxi Website
            </span>
            <span className="text-[8px] font-mono tracking-wider text-amber-300 font-bold uppercase">
              Web Application
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
};
