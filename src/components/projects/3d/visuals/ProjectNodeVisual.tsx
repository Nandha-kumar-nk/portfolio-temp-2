import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ProjectItem } from '../../../../types';
import { GLBProjectVisual } from './GLBProjectVisual';

interface ProjectNodeVisualProps {
  project: ProjectItem;
  isSelected: boolean;
  isDimmed: boolean;
  isHovered?: boolean;
  onSelect: () => void;
  scale?: number;
  showLabels?: boolean;
}

export const ProjectNodeVisual: React.FC<ProjectNodeVisualProps> = ({
  project,
  isSelected,
  isDimmed,
  isHovered: externalHovered = false,
  onSelect,
  scale = 1,
  showLabels = true,
}) => {
  const nodeRef = useRef<THREE.Group>(null);
  const platformRef = useRef<THREE.Group>(null);
  const [internalHovered, setInternalHovered] = useState(false);
  const isHovered = externalHovered || internalHovered;

  const accent = project.accentColor || '#00f5ff';
  const opacity = isDimmed ? 0.35 : 1.0;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (platformRef.current) {
      // Subtle platform levitation
      platformRef.current.position.y = Math.sin(t * 1.5 + (project.orbitalAngle || 0)) * 0.03;
    }
  });

  return (
    <group
      ref={nodeRef}
      scale={[scale, scale, scale]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setInternalHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setInternalHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <group ref={platformRef}>
        {/* 1. FUTURISTIC FLOATING PLATFORM DISC */}
        <group position={[0, -0.15, 0]}>
          {/* Base Cylinder */}
          <mesh>
            <cylinderGeometry args={[0.72, 0.8, 0.08, 32]} />
            <meshStandardMaterial
              color="#090d16"
              metalness={0.94}
              roughness={0.2}
              transparent
              opacity={opacity}
            />
          </mesh>

          {/* Glowing Outer Neon Rim */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.74, 0.81, 0.02, 32]} />
            <meshBasicMaterial
              color={accent}
              transparent
              opacity={(isSelected || isHovered ? 1.0 : 0.6) * opacity}
            />
          </mesh>

          {/* Top Surface Energy Concentric Ring */}
          <mesh position={[0, 0.044, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.48, 0.65, 32]} />
            <meshBasicMaterial
              color={accent}
              transparent
              opacity={(isSelected || isHovered ? 0.8 : 0.3) * opacity}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Upward Hologram Column Light */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.55, 0.65, 0.55, 24, 1, true]} />
            <meshBasicMaterial
              color={accent}
              transparent
              opacity={(isSelected || isHovered ? 0.22 : 0.08) * opacity}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* 2. PROJECT 3D MODEL / VISUAL */}
        <group position={[0, 0, 0]}>
          <GLBProjectVisual
            project={project}
            isSelected={isSelected || isHovered}
            isDimmed={isDimmed}
            scale={0.7}
          />
        </group>

        {/* 3. FLOATING HOLOGRAPHIC LABEL TAG */}
        {showLabels && (
          <Html
            position={[0, -0.42, 0.4]}
            center
            distanceFactor={12}
            className="pointer-events-none select-none"
          >
            <div
              className={`flex flex-col items-center justify-center transition-all duration-300 transform ${
                isSelected || isHovered
                  ? 'scale-110 opacity-100'
                  : isDimmed
                  ? 'opacity-40 scale-90'
                  : 'opacity-85 hover:opacity-100 scale-100'
              }`}
            >
              {/* Pill Container */}
              <div
                className={`px-3 py-1.5 rounded-xl border backdrop-blur-md transition-all duration-300 shadow-lg text-center whitespace-nowrap ${
                  isSelected || isHovered
                    ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_20px_rgba(0,245,255,0.4)] text-white'
                    : 'bg-slate-950/80 border-slate-700/60 text-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.5)]'
                }`}
                style={{
                  borderColor: isSelected || isHovered ? accent : undefined,
                  boxShadow:
                    isSelected || isHovered
                      ? `0 0 20px ${accent}60, 0 4px 12px rgba(0,0,0,0.8)`
                      : undefined,
                }}
              >
                <div className="flex items-center gap-1.5 justify-center">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <span className="font-mono text-xs font-bold tracking-wider uppercase text-white">
                    {project.title}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono tracking-wide mt-0.5">
                  {project.categoryName}
                </div>
              </div>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};
