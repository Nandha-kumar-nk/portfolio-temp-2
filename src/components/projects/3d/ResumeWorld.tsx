import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { FloatingIslandBase } from './FloatingIslandBase';
import { ProjectItem } from '../../../types';

interface ResumeWorldProps {
  project: ProjectItem;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: () => void;
}

export const ResumeWorld: React.FC<ResumeWorldProps> = ({
  project,
  isSelected,
  isDimmed,
  onSelect,
}) => {
  const scanLaserRef = useRef<THREE.Mesh>(null);
  const docStackRef = useRef<THREE.Group>(null);
  const previewScreenRef = useRef<THREE.Group>(null);
  const sparkParticlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Vertical scanning laser beam going up and down the document
    if (scanLaserRef.current) {
      scanLaserRef.current.position.y = 0.55 + Math.sin(t * 3.5) * 0.35;
    }
    // Subtle float of the template stack
    if (docStackRef.current) {
      docStackRef.current.position.y = 0.45 + Math.sin(t * 1.8 + 0.5) * 0.03;
      docStackRef.current.rotation.y = 0.2 + Math.cos(t * 1.2) * 0.04;
    }
    // Preview screen tilt
    if (previewScreenRef.current) {
      previewScreenRef.current.position.y = 0.65 + Math.cos(t * 2) * 0.03;
    }
    if (sparkParticlesRef.current) {
      sparkParticlesRef.current.rotation.y = t * 0.5;
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
        bobSpeed={1.15}
        bobOffset={1.2}
      >
        {/* ================================================================= */}
        {/* 1. GIANT 3D HOLOGRAPHIC RESUME DOCUMENT PANELS                    */}
        {/* ================================================================= */}
        <group position={[0, 0.55, 0]} rotation={[-0.1, -0.15, 0]}>
          {/* Main Document Board */}
          <mesh castShadow>
            <boxGeometry args={[0.9, 1.25, 0.03]} />
            <meshStandardMaterial
              color="#0d091e"
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>

          {/* Glowing Violet Document Border */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.9, 1.25, 0.03)]} />
            <lineBasicMaterial color="#c084fc" linewidth={2} />
          </lineSegments>

          {/* Document Header Bar */}
          <mesh position={[0, 0.45, 0.02]}>
            <planeGeometry args={[0.76, 0.16]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.7} />
          </mesh>

          {/* Profile Avatar Hologram Circle */}
          <mesh position={[-0.24, 0.45, 0.03]}>
            <circleGeometry args={[0.07, 24]} />
            <meshBasicMaterial color="#e879f9" />
          </mesh>

          {/* Document Content Text Block Lines (Simulated CV Layout) */}
          {[-0.05, -0.15, -0.25, -0.38, -0.48].map((yPos, i) => (
            <mesh key={i} position={[0.02, yPos, 0.025]}>
              <planeGeometry args={[i % 2 === 0 ? 0.72 : 0.55, 0.04]} />
              <meshBasicMaterial
                color="#c084fc"
                transparent
                opacity={0.65 - i * 0.08}
              />
            </mesh>
          ))}

          {/* Skills Badges Line on Document */}
          <group position={[0, 0.12, 0.025]}>
            {[-0.25, 0, 0.25].map((xPos, idx) => (
              <mesh key={idx} position={[xPos, 0, 0]}>
                <planeGeometry args={[0.2, 0.06]} />
                <meshBasicMaterial color="#00f5ff" transparent opacity={0.7} />
              </mesh>
            ))}
          </group>

          {/* Vertical Scanning Laser Sweeper */}
          <mesh ref={scanLaserRef} position={[0, 0, 0.035]}>
            <planeGeometry args={[0.92, 0.04]} />
            <meshBasicMaterial
              color="#e879f9"
              transparent
              opacity={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* ================================================================= */}
        {/* 2. 3D RESUME TEMPLATES STACK                                      */}
        {/* ================================================================= */}
        <group ref={docStackRef} position={[-0.8, 0.45, 0.25]} rotation={[0, 0.4, 0]}>
          {[0, 1, 2].map((idx) => (
            <mesh
              key={idx}
              position={[idx * 0.06, idx * 0.06, -idx * 0.08]}
              rotation={[-0.1, 0, 0.04]}
            >
              <boxGeometry args={[0.45, 0.65, 0.015]} />
              <meshStandardMaterial
                color={idx === 0 ? '#1e113a' : '#140c26'}
                emissive="#a855f7"
                emissiveIntensity={0.25 - idx * 0.08}
                roughness={0.4}
              />
            </mesh>
          ))}
          {/* Label chip on template stack */}
          <mesh position={[0.1, 0.38, 0]}>
            <boxGeometry args={[0.28, 0.08, 0.02]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>
        </group>

        {/* ================================================================= */}
        {/* 3. LIVE PREVIEW FLOATING SCREEN (Right side)                      */}
        {/* ================================================================= */}
        <group ref={previewScreenRef} position={[0.85, 0.65, -0.1]} rotation={[-0.1, -0.35, 0]}>
          <mesh>
            <boxGeometry args={[0.58, 0.42, 0.02]} />
            <meshStandardMaterial color="#110d29" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.015]}>
            <planeGeometry args={[0.54, 0.38]} />
            <meshBasicMaterial color="#c084fc" transparent opacity={0.45} />
          </mesh>
          {/* PDF Icon / Badge Symbol */}
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.22, 0.12]} />
            <meshBasicMaterial color="#f43f5e" />
          </mesh>
        </group>

        {/* ================================================================= */}
        {/* 4. DOCUMENT GENERATION SPARKS & PARTICLES                         */}
        {/* ================================================================= */}
        <points ref={sparkParticlesRef} position={[0, 0.6, 0.2]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  -0.3, 0.2, 0.1,
                  0.35, 0.4, 0.2,
                  -0.1, 0.6, -0.1,
                  0.2, 0.1, 0.3,
                  -0.4, 0.5, 0.2,
                  0.4, 0.3, -0.1,
                ]),
                3,
              ]}
            />
          </bufferGeometry>
          <pointsMaterial size={0.06} color="#c084fc" transparent opacity={0.9} />
        </points>

        {/* ================================================================= */}
        {/* 5. FLOATING 3D HOLOGRAPHIC BADGES & LABELS (MATCHING REFERENCE)   */}
        {/* ================================================================= */}
        {/* Right-Side Connected Pill Badges */}
        <Html position={[1.75, 0.35, 0.2]} center distanceFactor={7.5} pointerEvents="none">
          <div className="flex flex-col items-start gap-1.5 select-none">
            {['Resume Builder', 'Live Preview', 'Templates', 'Secure & Fast'].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-purple-400/80 shadow-[0_0_10px_rgba(192,132,252,0.4)] backdrop-blur-md"
              >
                <span className="w-1 h-1 rounded-full bg-purple-400" />
                <span className="text-[8.5px] font-mono font-bold text-purple-300 whitespace-nowrap">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </Html>

        {/* Bottom Title Pill Badge */}
        <Html position={[0, -0.65, 0.9]} center distanceFactor={7.5} pointerEvents="none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/95 border border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.7)] backdrop-blur-xl select-none">
            <div className="w-5 h-5 rounded-full bg-purple-950/90 border border-purple-400 flex items-center justify-center text-[10px] text-purple-300">
              📄
            </div>
            <div className="text-left leading-tight">
              <div className="text-[11px] font-black text-white font-orbitron tracking-wider whitespace-nowrap">
                {project.title}
              </div>
              <div className="text-[8px] font-mono text-purple-400 font-bold whitespace-nowrap">
                {project.categoryName}
              </div>
            </div>
          </div>
        </Html>
      </FloatingIslandBase>
    </group>
  );
};
