import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ProjectItem } from '../../../data/projectsData';
import { LivingProjectWorld } from '../3d/worlds/LivingProjectWorld';

interface ObservatoryProjectWorldsProps {
  projects: ProjectItem[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  isMobile?: boolean;
}

export const ObservatoryProjectWorlds: React.FC<ObservatoryProjectWorldsProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  isMobile = false,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const reticleRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (reticleRef.current) {
      reticleRef.current.rotation.z = t * 0.4;
    }
  });

  return (
    <group>
      {projects.map((project) => {
        const isSelected = project.id === selectedProjectId;
        const isHovered = project.id === hoveredId;
        const [wx, wy, wz] = project.world3DPosition;
        const accent = project.themeColor || project.accentColor || '#00f5ff';

        // Scale up active world slightly for emphasis
        const worldScale = (isSelected ? 1.08 : isHovered ? 0.98 : 0.88) * (isMobile ? 0.82 : 1.0);

        return (
          <group
            key={project.id}
            position={[wx, wy, wz]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectProject(project.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
              setHoveredId(project.id);
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto';
              setHoveredId(null);
            }}
          >
            {/* 3D World Procedural Geometry */}
            <group scale={[worldScale, worldScale, worldScale]}>
              <LivingProjectWorld project={project} isSelected={isSelected} scale={1.0} />
            </group>

            {/* Targeted Reticle & Holographic Ring on Active World */}
            {isSelected && (
              <group ref={reticleRef} position={[0, 0, 0]}>
                {/* Outer targeting bracket ring */}
                <mesh>
                  <torusGeometry args={[1.5, 0.015, 16, 64]} />
                  <meshStandardMaterial
                    color={accent}
                    emissive={accent}
                    emissiveIntensity={0.8}
                  />
                </mesh>

                {/* 4 Cardinal Targeting ticks */}
                {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
                  <mesh
                    key={i}
                    position={[1.5 * Math.cos(angle), 1.5 * Math.sin(angle), 0]}
                  >
                    <boxGeometry args={[0.1, 0.03, 0.03]} />
                    <meshBasicMaterial color="#ffffff" />
                  </mesh>
                ))}
              </group>
            )}

            {/* Subtle Hover Aura Ring when not selected */}
            {!isSelected && isHovered && (
              <mesh>
                <torusGeometry args={[1.35, 0.008, 16, 48]} />
                <meshBasicMaterial color={accent} transparent opacity={0.6} />
              </mesh>
            )}

            {/* Holographic World Label / Sector Marker */}
            <Html
              position={[0, isSelected ? 1.45 : 1.25, 0]}
              center
              distanceFactor={isMobile ? 8.5 : 7.2}
              className="pointer-events-none select-none"
            >
              <div
                className={`flex flex-col items-center select-none text-center transition-all duration-300 pointer-events-none ${
                  isSelected ? 'opacity-100 scale-100' : isHovered ? 'opacity-90 scale-95' : 'opacity-60 scale-90'
                }`}
              >
                <div
                  className={`px-3 py-1 rounded-xl backdrop-blur-md flex items-center gap-2 border transition-all ${
                    isSelected
                      ? 'bg-slate-950/90 border-cyan-400 shadow-[0_0_20px_rgba(0,245,255,0.6)]'
                      : 'bg-slate-950/70 border-slate-800'
                  }`}
                >
                  <span
                    className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: `${accent}25`,
                      color: accent,
                    }}
                  >
                    {project.doorNumber}
                  </span>
                  <span className="text-xs font-bold font-sans tracking-wide text-white whitespace-nowrap">
                    {project.title}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </div>

                {isSelected && (
                  <span className="mt-1 text-[9px] font-mono tracking-widest text-cyan-300 font-bold uppercase drop-shadow-[0_0_8px_#00f5ff]">
                    ACTIVE WORLD
                  </span>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
