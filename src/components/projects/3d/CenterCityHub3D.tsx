import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface CenterCityHub3DProps {
  position?: [number, number, number];
  scale?: number;
}

export const CenterCityHub3D: React.FC<CenterCityHub3DProps> = ({
  position = [0, 0, -1.8],
  scale = 1,
}) => {
  const hubGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const powerCoreRef = useRef<THREE.Mesh>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const beaconLightsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (hubGroupRef.current) {
      // Gentle floating bob
      hubGroupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.08;
      hubGroupRef.current.rotation.y = Math.sin(t * 0.2) * 0.05;
    }

    // 3 orbital rings rotating smoothly at different speeds and angles
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.25;
      ring1Ref.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.1) * 0.05;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.3;
      ring2Ref.current.rotation.z = Math.PI / 6;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.18;
      ring3Ref.current.rotation.y = Math.PI / 3;
    }

    // Core generator pulsing
    if (powerCoreRef.current) {
      const pulse = 1 + Math.sin(t * 3) * 0.1;
      powerCoreRef.current.scale.set(pulse, pulse, pulse);
    }
    if (coreLightRef.current) {
      coreLightRef.current.intensity = 2.5 + Math.sin(t * 4) * 0.8;
    }
  });

  // Skyscraper layout specs for a rich futuristic skyline
  const buildings = [
    { x: 0, z: 0, w: 0.5, d: 0.5, h: 2.2, spireH: 0.8, color: '#0f172a', winColor: '#00f5ff' },
    { x: -0.45, z: 0.25, w: 0.38, d: 0.38, h: 1.7, spireH: 0.5, color: '#0b1120', winColor: '#38bdf8' },
    { x: 0.45, z: 0.25, w: 0.42, d: 0.36, h: 1.85, spireH: 0.6, color: '#0b1120', winColor: '#00f5ff' },
    { x: -0.35, z: -0.4, w: 0.36, d: 0.4, h: 1.5, spireH: 0.4, color: '#111827', winColor: '#c084fc' },
    { x: 0.35, z: -0.4, w: 0.38, d: 0.38, h: 1.6, spireH: 0.45, color: '#0e1726', winColor: '#eab308' },
    { x: -0.7, z: -0.1, w: 0.3, d: 0.32, h: 1.25, spireH: 0.35, color: '#0d1527', winColor: '#00f5ff' },
    { x: 0.7, z: -0.1, w: 0.32, d: 0.3, h: 1.3, spireH: 0.35, color: '#0d1527', winColor: '#38bdf8' },
  ];

  return (
    <group ref={hubGroupRef} position={position} scale={[scale, scale, scale]}>
      {/* =================================================================== */}
      {/* 1. TOP FUTURISTIC SKYLINE (Skyscrapers, Spires, Glowing Windows)     */}
      {/* =================================================================== */}
      <group position={[0, 0.4, 0]}>
        {buildings.map((b, i) => (
          <group key={i} position={[b.x, 0, b.z]}>
            {/* Building Main Tower Body */}
            <mesh position={[0, b.h / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[b.w, b.h, b.d]} />
              <meshStandardMaterial
                color={b.color}
                metalness={0.85}
                roughness={0.25}
              />
            </mesh>

            {/* Glowing Cyber Edge Frames */}
            <lineSegments position={[0, b.h / 2, 0]}>
              <edgesGeometry args={[new THREE.BoxGeometry(b.w, b.h, b.d)]} />
              <lineBasicMaterial color={b.winColor} linewidth={1} />
            </lineSegments>

            {/* Horizontal Glowing Window Strips */}
            {[0.2, 0.45, 0.7, 0.95, 1.2, 1.45, 1.7].map((yOffset, j) => {
              if (yOffset > b.h - 0.2) return null;
              return (
                <mesh key={j} position={[0, yOffset, b.d / 2 + 0.005]}>
                  <planeGeometry args={[b.w * 0.8, 0.04]} />
                  <meshBasicMaterial color={b.winColor} transparent opacity={0.85} />
                </mesh>
              );
            })}

            {/* Roof Spire / Antenna */}
            <mesh position={[0, b.h + b.spireH / 2, 0]}>
              <coneGeometry args={[0.03, b.spireH, 6]} />
              <meshStandardMaterial
                color="#cbd5e1"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>

            {/* Blinking Red/Cyan Beacon Light at Spire Peak */}
            <mesh position={[0, b.h + b.spireH, 0]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color={i % 2 === 0 ? '#00f5ff' : '#ef4444'} />
            </mesh>
          </group>
        ))}

        {/* Holographic Skybridges between buildings */}
        <mesh position={[0, 1.1, 0.12]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.7, 0.05, 0.08]} />
          <meshStandardMaterial
            color="#00f5ff"
            transparent
            opacity={0.7}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, 0.8, -0.2]} rotation={[0, 0, -0.15]}>
          <boxGeometry args={[0.7, 0.05, 0.08]} />
          <meshStandardMaterial
            color="#c084fc"
            transparent
            opacity={0.7}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* =================================================================== */}
      {/* 2. MIDDLE STRUCTURE (Mechanical Decks & Pulsing Power Core)         */}
      {/* =================================================================== */}
      <group position={[0, 0.2, 0]}>
        {/* Tiered Mechanical Main Deck */}
        <mesh position={[0, 0.1, 0]} receiveShadow>
          <cylinderGeometry args={[1.5, 1.65, 0.35, 16]} />
          <meshStandardMaterial
            color="#090e17"
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>

        {/* Perimeter Cyan Glow Conduit Ring */}
        <mesh position={[0, 0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.45, 1.52, 32]} />
          <meshBasicMaterial color="#00f5ff" side={THREE.DoubleSide} />
        </mesh>

        {/* Center Glowing Energy Generator / Power Core */}
        <mesh ref={powerCoreRef} position={[0, -0.2, 0]}>
          <dodecahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Central Core Light */}
        <pointLight
          ref={coreLightRef}
          position={[0, -0.2, 0]}
          color="#00f5ff"
          distance={6}
          intensity={3.0}
        />
      </group>

      {/* =================================================================== */}
      {/* 3. BOTTOM INVERTED CYBER-ROCK & ENERGY ROOTS                         */}
      {/* =================================================================== */}
      <group position={[0, -0.1, 0]}>
        {/* Central Inverted Stalactite Crag */}
        <mesh position={[0, -1.0, 0]} castShadow>
          <coneGeometry args={[1.4, 2.2, 10]} />
          <meshStandardMaterial
            color="#05080f"
            roughness={0.85}
            metalness={0.4}
            flatShading
          />
        </mesh>

        {/* Glowing Crystal Fissures on Rock */}
        {[-0.5, 0, 0.5].map((xP, i) => (
          <mesh
            key={i}
            position={[xP * 0.9, -0.8 - Math.abs(xP) * 0.4, 0.4]}
            rotation={[0.2, xP, 0]}
          >
            <coneGeometry args={[0.15, 0.7, 5]} />
            <meshBasicMaterial color="#00f5ff" />
          </mesh>
        ))}

        {/* Heavy Anti-Gravity Thruster Node */}
        <mesh position={[0, -2.15, 0]}>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshBasicMaterial color="#00f5ff" />
        </mesh>
        <pointLight position={[0, -2.3, 0]} color="#00f5ff" distance={5} intensity={3} />
      </group>

      {/* =================================================================== */}
      {/* 4. CONCENTRIC GLOWING ORBITAL RINGS AROUND THE HUB                  */}
      {/* =================================================================== */}
      {/* Orbital Ring 1 (Cyan) */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.3, 0.02, 16, 64]} />
          <meshBasicMaterial color="#00f5ff" />
        </mesh>
      </group>

      {/* Orbital Ring 2 (Electric Blue) */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[2.75, 0.025, 16, 64]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Orbital Ring 3 (Gold / Amber Accent) */}
      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[3.2, 0.018, 16, 64]} />
          <meshBasicMaterial color="#eab308" />
        </mesh>
      </group>

      {/* =================================================================== */}
      {/* 5. HOLOGRAPHIC SIGNAGE: "MY PROJECTS \n IDEAS • CODE • IMPACT"     */}
      {/* =================================================================== */}
      <Html position={[0, 3.2, 0]} center distanceFactor={10} pointerEvents="none">
        <div className="flex flex-col items-center select-none text-center">
          {/* Main Title Badge */}
          <div className="px-4 py-2 rounded-xl bg-slate-950/90 border border-cyan-400/90 shadow-[0_0_25px_rgba(0,245,255,0.7)] backdrop-blur-xl flex flex-col items-center">
            <span className="text-[14px] sm:text-[16px] font-black tracking-[0.25em] text-white font-orbitron drop-shadow-[0_0_10px_#00f5ff]">
              MY PROJECTS
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.2em] text-cyan-300 font-bold uppercase">
                IDEAS • CODE • IMPACT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
          </div>
          {/* Subtle connecting vertical holographic beam */}
          <div className="w-[1.5px] h-6 bg-gradient-to-b from-cyan-400 to-transparent" />
        </div>
      </Html>
    </group>
  );
};
