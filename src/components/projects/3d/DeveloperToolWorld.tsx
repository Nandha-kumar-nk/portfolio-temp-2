import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { FloatingIslandBase } from './FloatingIslandBase';
import { ProjectItem } from '../../../types';

interface DeveloperToolWorldProps {
  project: ProjectItem;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: () => void;
}

export const DeveloperToolWorld: React.FC<DeveloperToolWorldProps> = ({
  project,
  isSelected,
  isDimmed,
  onSelect,
}) => {
  const shieldRef = useRef<THREE.Group>(null);
  const dbLiquidRef = useRef<THREE.Mesh>(null);
  const serverLedRef = useRef<THREE.PointLight>(null);
  const terminalCursorRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Holographic auth shield gentle spin and hover
    if (shieldRef.current) {
      shieldRef.current.rotation.y = t * 0.8;
      shieldRef.current.position.y = 0.95 + Math.sin(t * 2) * 0.05;
    }
    // Database glowing liquid pulse
    if (dbLiquidRef.current) {
      dbLiquidRef.current.rotation.y = t * 0.4;
      const pulse = 0.7 + Math.sin(t * 3) * 0.2;
      (dbLiquidRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
    // Server LED blink
    if (serverLedRef.current) {
      serverLedRef.current.intensity = Math.sin(t * 10) > 0.2 ? 2.0 : 0.4;
    }
    // Terminal cursor blink
    if (terminalCursorRef.current) {
      terminalCursorRef.current.visible = Math.sin(t * 6) > 0;
    }
  });

  return (
    <group onClick={(e) => { e.stopPropagation(); onSelect(); }}>
      <FloatingIslandBase
        themeColor={project.themeColor}
        accentGlow={project.accentGlow}
        isSelected={isSelected}
        isDimmed={isDimmed}
        radius={1.4}
        height={0.55}
        bobSpeed={1.25}
        bobOffset={3.6}
      >
        {/* ================================================================= */}
        {/* 1. FUTURISTIC WORKSTATION CONSOLE DESK                            */}
        {/* ================================================================= */}
        <mesh position={[0, 0.2, 0.15]} castShadow>
          <cylinderGeometry args={[0.85, 0.9, 0.12, 12, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#0b1329" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* 3 CURVED HOLOGRAPHIC TERMINAL SCREENS IN ARC                      */}
        {/* Center Main Screen */}
        <group position={[0, 0.55, -0.05]}>
          <mesh>
            <boxGeometry args={[0.7, 0.48, 0.02]} />
            <meshStandardMaterial color="#030712" metalness={0.9} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.7, 0.48, 0.02)]} />
            <lineBasicMaterial color="#00f5ff" linewidth={2} />
          </lineSegments>
          {/* Terminal Screen Surface */}
          <mesh position={[0, 0, 0.015]}>
            <planeGeometry args={[0.66, 0.44]} />
            <meshBasicMaterial color="#021422" />
          </mesh>
          {/* Monospace Code Lines (Cyan & Terminal Green) */}
          <group position={[-0.28, 0.14, 0.02]}>
            {/* Command Prompt Line */}
            <mesh position={[0.16, 0, 0]}>
              <planeGeometry args={[0.32, 0.03]} />
              <meshBasicMaterial color="#22c55e" />
            </mesh>
            {/* Blinking Prompt Cursor */}
            <mesh ref={terminalCursorRef} position={[0.35, 0, 0]}>
              <planeGeometry args={[0.03, 0.03]} />
              <meshBasicMaterial color="#22c55e" />
            </mesh>
            {/* Output Lines */}
            <mesh position={[0.22, -0.07, 0]}>
              <planeGeometry args={[0.44, 0.025]} />
              <meshBasicMaterial color="#00f5ff" transparent opacity={0.8} />
            </mesh>
            <mesh position={[0.18, -0.13, 0]}>
              <planeGeometry args={[0.36, 0.025]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
            </mesh>
            <mesh position={[0.24, -0.19, 0]}>
              <planeGeometry args={[0.48, 0.025]} />
              <meshBasicMaterial color="#22c55e" transparent opacity={0.8} />
            </mesh>
            <mesh position={[0.15, -0.25, 0]}>
              <planeGeometry args={[0.3, 0.025]} />
              <meshBasicMaterial color="#eab308" transparent opacity={0.75} />
            </mesh>
          </group>
        </group>

        {/* Left Angled Screen */}
        <group position={[-0.6, 0.52, 0.1]} rotation={[0, 0.45, 0]}>
          <mesh>
            <boxGeometry args={[0.46, 0.38, 0.02]} />
            <meshStandardMaterial color="#030712" metalness={0.8} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.46, 0.38, 0.02)]} />
            <lineBasicMaterial color="#00f5ff" linewidth={1.5} />
          </lineSegments>
          <mesh position={[0, 0, 0.015]}>
            <planeGeometry args={[0.42, 0.34]} />
            <meshBasicMaterial color="#052e16" />
          </mesh>
          {/* Matrix code lines */}
          {[-0.08, -0.02, 0.04, 0.1].map((yP, i) => (
            <mesh key={i} position={[-0.02, yP, 0.02]}>
              <planeGeometry args={[0.34, 0.02]} />
              <meshBasicMaterial color="#10b981" transparent opacity={0.8 - i * 0.1} />
            </mesh>
          ))}
        </group>

        {/* Right Angled Screen */}
        <group position={[0.6, 0.52, 0.1]} rotation={[0, -0.45, 0]}>
          <mesh>
            <boxGeometry args={[0.46, 0.38, 0.02]} />
            <meshStandardMaterial color="#030712" metalness={0.8} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.46, 0.38, 0.02)]} />
            <lineBasicMaterial color="#0284c7" linewidth={1.5} />
          </lineSegments>
          <mesh position={[0, 0, 0.015]}>
            <planeGeometry args={[0.42, 0.34]} />
            <meshBasicMaterial color="#082f49" />
          </mesh>
          {/* Docker container status blocks */}
          {[-0.06, 0.02, 0.1].map((yP, i) => (
            <mesh key={i} position={[0, yP, 0.02]}>
              <planeGeometry args={[0.36, 0.03]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.85} />
            </mesh>
          ))}
        </group>

        {/* ================================================================= */}
        {/* 2. 3D SERVER RACK TOWER                                           */}
        {/* ================================================================= */}
        <group position={[-0.85, 0.45, -0.45]}>
          <mesh castShadow>
            <boxGeometry args={[0.35, 0.85, 0.35]} />
            <meshStandardMaterial color="#0a0f1d" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Rack Server Slots */}
          {[-0.3, -0.15, 0, 0.15, 0.3].map((yPos, i) => (
            <group key={i} position={[0, yPos, 0.18]}>
              <mesh>
                <boxGeometry args={[0.3, 0.1, 0.01]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              {/* Status LED pair */}
              <mesh position={[-0.1, 0, 0.01]}>
                <sphereGeometry args={[0.015, 6, 6]} />
                <meshBasicMaterial color={i % 2 === 0 ? '#22c55e' : '#00f5ff'} />
              </mesh>
              <mesh position={[0.1, 0, 0.01]}>
                <sphereGeometry args={[0.015, 6, 6]} />
                <meshBasicMaterial color="#38bdf8" />
              </mesh>
            </group>
          ))}
          <pointLight
            ref={serverLedRef}
            position={[0, 0, 0.25]}
            color="#22c55e"
            distance={1.5}
          />
        </group>

        {/* ================================================================= */}
        {/* 3. GLOWING 3D DATABASE CAPSULE (MongoDB Cylinder)                 */}
        {/* ================================================================= */}
        <group position={[0.8, 0.38, -0.45]}>
          {/* Metal Base and Cap */}
          <mesh position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.18, 0.2, 0.08, 12]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.08, 12]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} />
          </mesh>
          {/* Glass Outer Cylinder */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.36, 16]} />
            <meshStandardMaterial
              color="#0284c7"
              transparent
              opacity={0.35}
              roughness={0.1}
            />
          </mesh>
          {/* Glowing Green Energy Liquid Core */}
          <mesh ref={dbLiquidRef} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.32, 12]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.8} />
          </mesh>
          {/* Orbiting DB Ring */}
          <mesh position={[0, 0, 0]} rotation={[0.4, 0, 0]}>
            <ringGeometry args={[0.2, 0.24, 16]} />
            <meshBasicMaterial color="#22c55e" side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* ================================================================= */}
        {/* 4. HOLOGRAPHIC AUTHENTICATION SHIELD                              */}
        {/* ================================================================= */}
        <group ref={shieldRef} position={[0, 0.95, -0.2]}>
          <mesh>
            <octahedronGeometry args={[0.18, 0]} />
            <meshBasicMaterial color="#00f5ff" wireframe />
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.12, 0]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
          </mesh>
          {/* Lock Pin Icon */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial color="#eab308" />
          </mesh>
        </group>

        {/* ================================================================= */}
        {/* 5. FLOATING 3D HOLOGRAPHIC BADGES & LABELS (MATCHING REFERENCE)   */}
        {/* ================================================================= */}
        {/* Left-Side Connected Pill Badges */}
        <Html position={[-1.75, 0.35, 0.2]} center distanceFactor={7.5} pointerEvents="none">
          <div className="flex flex-col items-end gap-1.5 select-none">
            {['MERN Generator', 'Authentication', 'Project Scaffolding', '80%+ Time Saved'].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-cyan-400/80 shadow-[0_0_10px_rgba(0,245,255,0.4)] backdrop-blur-md"
              >
                <span className="text-[8.5px] font-mono font-bold text-cyan-300 whitespace-nowrap">
                  {badge}
                </span>
                <span className="w-1 h-1 rounded-full bg-cyan-400" />
              </div>
            ))}
          </div>
        </Html>

        {/* Bottom Title Pill Badge */}
        <Html position={[0, -0.65, 0.9]} center distanceFactor={7.5} pointerEvents="none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/95 border border-cyan-400 shadow-[0_0_20px_rgba(0,245,255,0.7)] backdrop-blur-xl select-none">
            <div className="w-5 h-5 rounded-full bg-cyan-950/90 border border-cyan-400 flex items-center justify-center text-[10px] text-cyan-300">
              ⚡
            </div>
            <div className="text-left leading-tight">
              <div className="text-[11px] font-black text-white font-orbitron tracking-wider whitespace-nowrap">
                {project.title}
              </div>
              <div className="text-[8px] font-mono text-cyan-400 font-bold whitespace-nowrap">
                {project.categoryName}
              </div>
            </div>
          </div>
        </Html>
      </FloatingIslandBase>
    </group>
  );
};
