import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem } from '../../../data/projectsData';
import { getProjectTexture } from './ProjectTextures';

interface ProjectDisplay3DProps {
  project: ProjectItem;
  index: number;
  activeIdx: number;
  totalProjects: number;
  isMobile?: boolean;
  isTablet?: boolean;
  onSelectProject: (index: number) => void;
}

export const ProjectDisplay3D: React.FC<ProjectDisplay3DProps> = ({
  project,
  index,
  activeIdx,
  totalProjects,
  isMobile = false,
  isTablet = false,
  onSelectProject,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Compute circular offset relative to active project (-2, -1, 0, 1, 2)
  const relOffset = useMemo(() => {
    let diff = (index - activeIdx) % totalProjects;
    if (diff > 2) diff -= totalProjects;
    if (diff < -2) diff += totalProjects;
    return diff;
  }, [index, activeIdx, totalProjects]);

  const isActive = relOffset === 0;

  // Thematic Accent Color for edge lights
  const themeColor = useMemo(() => {
    switch (project.id) {
      case 'swayam-2':
        return '#00f5ff';
      case 'speed-taxi':
        return '#fbbf24';
      case 'wildlife-ai':
        return '#10b981';
      case 'resume-forge':
        return '#c084fc';
      case 'nk-mern-cli':
        return '#38bdf8';
      default:
        return project.accentColor || '#00f5ff';
    }
  }, [project]);

  // Project screen texture
  const texture = useMemo(() => {
    return getProjectTexture(project.id);
  }, [project.id]);

  // Target 3D transform based on viewport & relative offset
  const targetTransform = useMemo(() => {
    if (isMobile) {
      // Mobile: Only the active display is prominent
      if (isActive) {
        return {
          pos: [0, -0.05, 0] as [number, number, number],
          rotY: 0,
          scale: 0.95,
          opacity: 1.0,
        };
      } else if (relOffset === 1) {
        // Peek slightly on the right
        return {
          pos: [2.8, -0.15, -1.8] as [number, number, number],
          rotY: -0.3,
          scale: 0.55,
          opacity: 0.25,
        };
      } else if (relOffset === -1) {
        // Peek slightly on the left
        return {
          pos: [-2.8, -0.15, -1.8] as [number, number, number],
          rotY: 0.3,
          scale: 0.55,
          opacity: 0.25,
        };
      } else {
        // Far hidden
        return {
          pos: [relOffset > 0 ? 5.5 : -5.5, -0.3, -4.5] as [number, number, number],
          rotY: 0,
          scale: 0.3,
          opacity: 0.0,
        };
      }
    }

    if (isTablet) {
      if (isActive) {
        return {
          pos: [0, 0, 0] as [number, number, number],
          rotY: 0,
          scale: 1.0,
          opacity: 1.0,
        };
      } else if (relOffset === 1) {
        return {
          pos: [2.1, -0.1, -1.4] as [number, number, number],
          rotY: -0.3,
          scale: 0.65,
          opacity: 0.75,
        };
      } else if (relOffset === -1) {
        return {
          pos: [-2.1, -0.1, -1.4] as [number, number, number],
          rotY: 0.3,
          scale: 0.65,
          opacity: 0.75,
        };
      } else {
        return {
          pos: [relOffset > 0 ? 3.8 : -3.8, -0.22, -2.8] as [number, number, number],
          rotY: relOffset > 0 ? -0.45 : 0.45,
          scale: 0.45,
          opacity: 0.4,
        };
      }
    }

    // Desktop: 5 Project corridor exactly matching the reference
    switch (relOffset) {
      case 0: // Center (Active)
        return {
          pos: [0, 0, 0] as [number, number, number],
          rotY: 0,
          scale: 1.08,
          opacity: 1.0,
        };
      case 1: // Right 1 (02 Speed Taxi)
        return {
          pos: [2.55, -0.06, -1.35] as [number, number, number],
          rotY: -0.32,
          scale: 0.72,
          opacity: 0.88,
        };
      case 2: // Right 2 (03 AI Wildlife)
        return {
          pos: [4.45, -0.16, -2.55] as [number, number, number],
          rotY: -0.5,
          scale: 0.52,
          opacity: 0.65,
        };
      case -1: // Left 1 (04 Resume Forge)
        return {
          pos: [-2.55, -0.06, -1.35] as [number, number, number],
          rotY: 0.32,
          scale: 0.72,
          opacity: 0.88,
        };
      case -2: // Left 2 (05 NK MERN CLI)
        return {
          pos: [-4.45, -0.16, -2.55] as [number, number, number],
          rotY: 0.5,
          scale: 0.52,
          opacity: 0.65,
        };
      default:
        return {
          pos: [0, -10, 0] as [number, number, number],
          rotY: 0,
          scale: 0.1,
          opacity: 0.0,
        };
    }
  }, [isMobile, isTablet, isActive, relOffset]);

  // Smooth lerp frame animation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Target position with hover nudge & subtle idle breathing
    let targetX = targetTransform.pos[0];
    let targetY = targetTransform.pos[1];
    let targetZ = targetTransform.pos[2];

    if (isActive) {
      targetY += Math.sin(t * 1.2) * 0.02;
    } else if (hovered && !isMobile) {
      targetZ += 0.25; // Move display forward slightly on hover
      targetY += 0.04;
    }

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.09);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.09);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.09);

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetTransform.rotY,
      0.09
    );

    const targetScale = targetTransform.scale * (hovered && !isActive && !isMobile ? 1.06 : 1.0);
    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.09);
    groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, 0.09);
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.09);

    // Pulse edge glow
    if (glowMeshRef.current) {
      const mat = glowMeshRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        const basePulse = isActive ? 0.85 + Math.sin(t * 2) * 0.15 : hovered ? 0.7 : 0.45;
        mat.opacity = basePulse * targetTransform.opacity;
      }
    }
  });

  // Display Dimensions
  const screenW = 2.0;
  const screenH = 1.48;
  const frameBorder = 0.07;
  const outerW = screenW + frameBorder * 2;
  const outerH = screenH + frameBorder * 2;
  const depth = 0.14;

  return (
    <group
      ref={groupRef}
      position={targetTransform.pos}
      rotation={[0, targetTransform.rotY, 0]}
      scale={targetTransform.scale}
      onClick={(e) => {
        e.stopPropagation();
        if (!isActive) {
          onSelectProject(index);
        }
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (!isMobile) setHovered(true);
      }}
      onPointerOut={() => {
        if (!isMobile) setHovered(false);
      }}
    >
      {/* ===================================================================== */}
      {/* 1. FUTURISTIC BEVELED DISPLAY FRAME (Metallic Outer Chassis)          */}
      {/* ===================================================================== */}

      {/* Main Chassis Box */}
      <mesh position={[0, 0, -depth / 2]}>
        <boxGeometry args={[outerW, outerH, depth]} />
        <meshStandardMaterial
          color="#070e1c"
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Outer Glow Trim / Rim Frame */}
      <mesh ref={glowMeshRef} position={[0, 0, 0.01]}>
        <ringGeometry args={[outerW * 0.48, outerW * 0.51, 4, 1, Math.PI / 4]} />
        <meshBasicMaterial
          color={themeColor}
          transparent
          opacity={isActive ? 0.9 : 0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Frame Edge Neon Strips */}
      {/* Top Edge Strip */}
      <mesh position={[0, outerH / 2, 0.02]}>
        <boxGeometry args={[outerW - 0.04, 0.025, 0.03]} />
        <meshBasicMaterial color={themeColor} transparent opacity={isActive ? 0.95 : 0.6} />
      </mesh>
      {/* Bottom Edge Strip */}
      <mesh position={[0, -outerH / 2, 0.02]}>
        <boxGeometry args={[outerW - 0.04, 0.025, 0.03]} />
        <meshBasicMaterial color={themeColor} transparent opacity={isActive ? 0.95 : 0.6} />
      </mesh>
      {/* Left Edge Strip */}
      <mesh position={[-outerW / 2, 0, 0.02]}>
        <boxGeometry args={[0.025, outerH - 0.04, 0.03]} />
        <meshBasicMaterial color={themeColor} transparent opacity={isActive ? 0.95 : 0.6} />
      </mesh>
      {/* Right Edge Strip */}
      <mesh position={[outerW / 2, 0, 0.02]}>
        <boxGeometry args={[0.025, outerH - 0.04, 0.03]} />
        <meshBasicMaterial color={themeColor} transparent opacity={isActive ? 0.95 : 0.6} />
      </mesh>

      {/* Top Header Badge Block with Door Number */}
      <group position={[0, outerH / 2 + 0.1, 0.02]}>
        {/* Metal Plate */}
        <mesh>
          <boxGeometry args={[0.85, 0.16, 0.04]} />
          <meshStandardMaterial color="#08152b" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Neon Accent Line */}
        <mesh position={[0, -0.07, 0.02]}>
          <boxGeometry args={[0.8, 0.015, 0.01]} />
          <meshBasicMaterial color={themeColor} />
        </mesh>
      </group>

      {/* ===================================================================== */}
      {/* 2. PROJECT SCREEN (Real Graphic Artwork Texture)                      */}
      {/* ===================================================================== */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[screenW, screenH]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.15}
          metalness={0.1}
          emissive="#ffffff"
          emissiveIntensity={isActive ? 0.15 : 0.05}
          emissiveMap={texture}
        />
      </mesh>

      {/* Glass Reflection Plane Over Screen */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[screenW, screenH]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={isActive ? 0.08 : 0.12}
          roughness={0.05}
          metalness={0.9}
        />
      </mesh>

      {/* ===================================================================== */}
      {/* 3. FUTURISTIC PEDESTAL BASE & GROUND LIGHT EMITTER                    */}
      {/* ===================================================================== */}
      <group position={[0, -outerH / 2 - 0.12, 0]}>
        {/* Upper Plinth Neck */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.22, 0.32, 0.12, 16]} />
          <meshStandardMaterial color="#0b172a" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Base Pedestal Ring */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.65, 0.08, 24]} />
          <meshStandardMaterial color="#08101e" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Glowing Base Light Ring */}
        <mesh position={[0, 0.045, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.42, 0.52, 24]} />
          <meshBasicMaterial color={themeColor} transparent opacity={isActive ? 0.85 : 0.4} />
        </mesh>

        {/* Downward Ground Reflection Light Pool */}
        <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.85, 24]} />
          <meshBasicMaterial
            color={themeColor}
            transparent
            opacity={isActive ? 0.25 : 0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Point Light emitted from Active Project Frame */}
      {isActive && (
        <pointLight position={[0, 0, 0.8]} color={themeColor} intensity={1.4} distance={4.5} />
      )}
    </group>
  );
};
