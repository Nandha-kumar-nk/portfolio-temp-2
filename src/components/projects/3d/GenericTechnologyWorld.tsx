import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { FloatingIslandBase } from './FloatingIslandBase';
import { ProjectItem } from '../../../types';

interface GenericTechnologyWorldProps {
  project: ProjectItem;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: () => void;
}

export const GenericTechnologyWorld: React.FC<GenericTechnologyWorldProps> = ({
  project,
  isSelected,
  isDimmed,
  onSelect,
}) => {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.8;
      coreRef.current.rotation.x = t * 0.5;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 1.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.9;
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
        bobOffset={1.0}
      >
        {/* Central Futuristic Tech Core */}
        <group position={[0, 0.65, 0]}>
          <group ref={coreRef}>
            <mesh>
              <octahedronGeometry args={[0.32, 0]} />
              <meshStandardMaterial
                color={project.themeColor}
                emissive={project.themeColor}
                emissiveIntensity={0.6}
                metalness={0.9}
              />
            </mesh>
            <mesh>
              <dodecahedronGeometry args={[0.42, 0]} />
              <meshBasicMaterial color="#00f5ff" wireframe />
            </mesh>
          </group>

          {/* Orbiting Rings */}
          <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
            <ringGeometry args={[0.55, 0.6, 24]} />
            <meshBasicMaterial color="#00f5ff" side={THREE.DoubleSide} />
          </mesh>
          <mesh ref={ring2Ref} rotation={[-Math.PI / 4, 0, 0]}>
            <ringGeometry args={[0.7, 0.74, 24]} />
            <meshBasicMaterial color="#c084fc" side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Floating title and tags */}
        <Html position={[0, 1.45, 0]} center distanceFactor={8} pointerEvents="none">
          <div className="flex flex-col items-center gap-1 text-center select-none">
            <div className="px-2.5 py-1 rounded-lg bg-slate-950/85 border border-cyan-400/90 shadow-[0_0_15px_rgba(0,245,255,0.6)] backdrop-blur-md">
              <div className="text-[12px] font-black tracking-widest text-cyan-300 font-orbitron whitespace-nowrap">
                {project.title}
              </div>
              <div className="text-[8px] font-mono tracking-wider text-cyan-400/80 font-bold whitespace-nowrap">
                {project.categoryName}
              </div>
            </div>
          </div>
        </Html>
      </FloatingIslandBase>
    </group>
  );
};
