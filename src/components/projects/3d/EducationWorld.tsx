import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { FloatingIslandBase } from './FloatingIslandBase';
import { ProjectItem } from '../../../types';

interface EducationWorldProps {
  project: ProjectItem;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: () => void;
}

export const EducationWorld: React.FC<EducationWorldProps> = ({
  project,
  isSelected,
  isDimmed,
  onSelect,
}) => {
  const holoScreen1Ref = useRef<THREE.Group>(null);
  const holoScreen2Ref = useRef<THREE.Group>(null);
  const streamParticlesRef = useRef<THREE.Points>(null);
  const beaconLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (holoScreen1Ref.current) {
      holoScreen1Ref.current.position.y = 0.85 + Math.sin(t * 2 + 1) * 0.04;
      holoScreen1Ref.current.rotation.y = -0.3 + Math.sin(t * 1.2) * 0.05;
    }
    if (holoScreen2Ref.current) {
      holoScreen2Ref.current.position.y = 0.95 + Math.cos(t * 2.2) * 0.04;
      holoScreen2Ref.current.rotation.y = 0.35 + Math.cos(t * 1.4) * 0.05;
    }
    if (streamParticlesRef.current) {
      streamParticlesRef.current.rotation.y = t * 0.6;
    }
    if (beaconLightRef.current) {
      beaconLightRef.current.intensity = 1.5 + Math.sin(t * 6) * 0.8;
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
        bobSpeed={1.1}
        bobOffset={0}
      >
        {/* ================================================================= */}
        {/* 1. 3D FUTURISTIC LAPTOP                                           */}
        {/* ================================================================= */}
        <group position={[0, 0.05, 0.1]}>
          {/* Laptop Base */}
          <mesh position={[0, 0.04, 0]} castShadow>
            <boxGeometry args={[0.95, 0.04, 0.65]} />
            <meshStandardMaterial
              color="#0e1726"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Glowing Keyboard Plate */}
          <mesh position={[0, 0.065, 0.06]}>
            <boxGeometry args={[0.82, 0.015, 0.42]} />
            <meshStandardMaterial
              color="#021422"
              emissive="#00f5ff"
              emissiveIntensity={0.35}
              roughness={0.4}
            />
          </mesh>

          {/* Individual Glowing Key Matrix Grid */}
          <gridHelper
            args={[0.8, 8, '#00f5ff', '#0284c7']}
            position={[0, 0.075, 0.06]}
          />

          {/* Trackpad */}
          <mesh position={[0, 0.065, 0.22]}>
            <boxGeometry args={[0.26, 0.005, 0.16]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} />
          </mesh>

          {/* Laptop Tilted Screen */}
          <group position={[0, 0.06, -0.3]} rotation={[-0.32, 0, 0]}>
            {/* Screen Lid */}
            <mesh position={[0, 0.38, 0]} castShadow>
              <boxGeometry args={[0.95, 0.68, 0.03]} />
              <meshStandardMaterial
                color="#0a101d"
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>

            {/* Glowing Screen Display (SWAYAM Dashboard Visual) */}
            <mesh position={[0, 0.38, 0.02]}>
              <planeGeometry args={[0.88, 0.6]} />
              <meshBasicMaterial color="#0284c7" />
            </mesh>

            {/* Inner Holographic UI Layer */}
            <mesh position={[0, 0.38, 0.025]}>
              <planeGeometry args={[0.82, 0.54]} />
              <meshBasicMaterial
                color="#00f5ff"
                transparent
                opacity={0.7}
              />
            </mesh>

            {/* Top Webcam Notch */}
            <mesh position={[0, 0.69, 0.02]}>
              <sphereGeometry args={[0.012, 8, 8]} />
              <meshBasicMaterial color="#22c55e" />
            </mesh>
          </group>
        </group>

        {/* ================================================================= */}
        {/* 2. FLOATING HOLOGRAPHIC AUXILIARY MONITORS                       */}
        {/* ================================================================= */}
        {/* Left Monitor */}
        <group ref={holoScreen1Ref} position={[-0.85, 0.85, 0.1]}>
          <mesh>
            <planeGeometry args={[0.55, 0.4]} />
            <meshBasicMaterial
              color="#00f5ff"
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Cyan Glow Frame */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(0.55, 0.4)]} />
            <lineBasicMaterial color="#00f5ff" linewidth={2} />
          </lineSegments>
        </group>

        {/* Right Monitor */}
        <group ref={holoScreen2Ref} position={[0.85, 0.95, -0.1]}>
          <mesh>
            <planeGeometry args={[0.52, 0.38]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(0.52, 0.38)]} />
            <lineBasicMaterial color="#38bdf8" linewidth={2} />
          </lineSegments>
        </group>

        {/* ================================================================= */}
        {/* 3. CLASSROOM PODIUM & NOTIFICATION BEACON                         */}
        {/* ================================================================= */}
        <group position={[-0.7, 0.05, -0.6]}>
          <mesh position={[0, 0.25, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.24, 0.5, 8]} />
            <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Hologram Projector Emitter */}
          <mesh position={[0, 0.52, 0]}>
            <cylinderGeometry args={[0.12, 0.08, 0.06, 12]} />
            <meshBasicMaterial color="#00f5ff" />
          </mesh>
          {/* Vertical Projected Light Beam */}
          <mesh position={[0, 0.85, 0]}>
            <cylinderGeometry args={[0.16, 0.04, 0.6, 12]} />
            <meshBasicMaterial color="#00f5ff" transparent opacity={0.25} />
          </mesh>
        </group>

        {/* Real-time Notification Beacon Post (Right Side) */}
        <group position={[0.75, 0.05, -0.55]}>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.03, 0.05, 0.7, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.72, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial color="#00f5ff" />
          </mesh>
          <pointLight
            ref={beaconLightRef}
            position={[0, 0.72, 0]}
            color="#00f5ff"
            distance={2.5}
          />
        </group>

        {/* ================================================================= */}
        {/* 4. LEARNING DATA STREAM PARTICLES                                  */}
        {/* ================================================================= */}
        <points ref={streamParticlesRef} position={[0, 0.7, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  -0.4, 0.2, 0.3,
                  0.3, 0.4, -0.2,
                  -0.2, 0.6, -0.4,
                  0.5, 0.3, 0.2,
                  -0.6, 0.5, 0.1,
                  0.2, 0.7, 0.4,
                  0.0, 0.8, -0.1,
                  -0.3, 0.4, 0.5,
                ]),
                3,
              ]}
            />
          </bufferGeometry>
          <pointsMaterial size={0.06} color="#00f5ff" transparent opacity={0.85} />
        </points>

        {/* ================================================================= */}
        {/* 5. FLOATING 3D HOLOGRAPHIC BADGES & LABELS (MATCHING REFERENCE)   */}
        {/* ================================================================= */}
        {/* Left-Side Connected Pill Badges */}
        <Html position={[-1.75, 0.35, 0.2]} center distanceFactor={7.5} pointerEvents="none">
          <div className="flex flex-col items-end gap-1.5 select-none">
            {['Courses', 'Live Classes', 'Assignments', 'Real-time Notifications'].map((badge) => (
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
              🎓
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
