import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SwayamCampusWorld } from './SwayamCampusWorld';

interface DimensionalDoorwayProps {
  isMobile?: boolean;
}

export const DimensionalDoorway: React.FC<DimensionalDoorwayProps> = ({ isMobile = false }) => {
  const doorwayGroupRef = useRef<THREE.Group>(null);
  const portalGlowRef = useRef<THREE.MeshBasicMaterial>(null);

  // Doorway dimensions:
  // Outer width: ~2.6, outer height: ~3.6, depth: ~0.3
  // Aperture width: ~2.1, aperture height: ~3.0
  const pillarW = 0.18;
  const pillarH = 3.2;
  const pillarD = 0.28;
  const apertureW = 2.05;
  const apertureH = 2.95;

  const pillarX = (apertureW + pillarW) / 2; // ~1.115
  const topY = apertureH / 2 + 0.1; // ~1.575
  const bottomY = -apertureH / 2 - 0.08; // ~-1.555

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Gentle majestic idle floating
    if (doorwayGroupRef.current) {
      doorwayGroupRef.current.position.y = Math.sin(t * 0.6) * 0.035;
      doorwayGroupRef.current.rotation.y = Math.sin(t * 0.3) * 0.02;
    }

    // Portal inner threshold pulse
    if (portalGlowRef.current) {
      portalGlowRef.current.opacity = 0.85 + Math.sin(t * 1.5) * 0.15;
    }
  });

  return (
    <group ref={doorwayGroupRef} position={[0, 0, 0]}>
      {/* ========================================================================= */}
      {/* 1. PROCEDURAL ARCHITECTURAL DOORWAY FRAME                                */}
      {/* ========================================================================= */}

      {/* Left Pillar */}
      <mesh position={[-pillarX, 0, 0]}>
        <boxGeometry args={[pillarW, pillarH, pillarD]} />
        <meshStandardMaterial
          color="#0a1222"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Right Pillar */}
      <mesh position={[pillarX, 0, 0]}>
        <boxGeometry args={[pillarW, pillarH, pillarD]} />
        <meshStandardMaterial
          color="#0a1222"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Top Lintel Arch */}
      <mesh position={[0, topY, 0]}>
        <boxGeometry args={[apertureW + pillarW * 2 + 0.15, 0.22, pillarD + 0.04]} />
        <meshStandardMaterial
          color="#0c162a"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Top Decorative Keystone / Emblem Block */}
      <mesh position={[0, topY + 0.08, 0.08]}>
        <boxGeometry args={[0.32, 0.14, 0.12]} />
        <meshStandardMaterial
          color="#0f213f"
          emissive="#00f5ff"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Base Foundation Threshold */}
      <mesh position={[0, bottomY, 0]}>
        <boxGeometry args={[apertureW + pillarW * 2 + 0.25, 0.16, pillarD + 0.18]} />
        <meshStandardMaterial
          color="#070e1b"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Base Step Step-Up Platform */}
      <mesh position={[0, bottomY + 0.08, 0.06]}>
        <boxGeometry args={[apertureW + 0.1, 0.06, pillarD + 0.08]} />
        <meshStandardMaterial
          color="#091426"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* ========================================================================= */}
      {/* 2. INNER LUMINOUS THRESHOLD / GLOWING RIM                                */}
      {/* ========================================================================= */}

      {/* Left Glow Strip */}
      <mesh position={[-apertureW / 2 - 0.01, 0, 0.06]}>
        <boxGeometry args={[0.025, apertureH, 0.04]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.85} />
      </mesh>

      {/* Right Glow Strip */}
      <mesh position={[apertureW / 2 + 0.01, 0, 0.06]}>
        <boxGeometry args={[0.025, apertureH, 0.04]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.85} />
      </mesh>

      {/* Top Glow Strip */}
      <mesh position={[0, topY - 0.11, 0.06]}>
        <boxGeometry args={[apertureW, 0.025, 0.04]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.85} />
      </mesh>

      {/* Bottom Threshold Glow Strip */}
      <mesh position={[0, bottomY + 0.12, 0.06]}>
        <boxGeometry args={[apertureW, 0.025, 0.04]} />
        <meshBasicMaterial ref={portalGlowRef} color="#38bdf8" transparent opacity={0.9} />
      </mesh>

      {/* Subtle Corner Tech Accent Brackets */}
      {[
        [-apertureW / 2 + 0.06, topY - 0.17],
        [apertureW / 2 - 0.06, topY - 0.17],
        [-apertureW / 2 + 0.06, bottomY + 0.18],
        [apertureW / 2 - 0.06, bottomY + 0.18],
      ].map(([x, y], idx) => (
        <mesh key={idx} position={[x, y, 0.08]}>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.7} />
        </mesh>
      ))}

      {/* Pillar Tech Status Node Lights */}
      {[-0.6, 0, 0.6].map((yOffset, idx) => (
        <group key={idx}>
          <mesh position={[-pillarX, yOffset, pillarD / 2 + 0.01]}>
            <boxGeometry args={[0.04, 0.02, 0.01]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[pillarX, yOffset, pillarD / 2 + 0.01]}>
            <boxGeometry args={[0.04, 0.02, 0.01]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
      ))}

      {/* ========================================================================= */}
      {/* 3. DIMENSIONAL APERTURE DEPTH PLANE (Back Wall of the Portal)             */}
      {/* ========================================================================= */}
      {/* Dark cosmic backdrop inside doorway */}
      <mesh position={[0, 0, -0.75]}>
        <planeGeometry args={[apertureW + 0.05, apertureH + 0.05]} />
        <meshBasicMaterial color="#020612" />
      </mesh>

      {/* Soft gradient atmospheric depth plane */}
      <mesh position={[0, 0.1, -0.7]}>
        <planeGeometry args={[apertureW * 0.95, apertureH * 0.85]} />
        <meshBasicMaterial
          color="#071b38"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ========================================================================= */}
      {/* 4. VISUAL ENVIRONMENT INSIDE DOORWAY: SWAYAM 2.0 DIGITAL CAMPUS          */}
      {/* ========================================================================= */}
      <SwayamCampusWorld isMobile={isMobile} />
    </group>
  );
};
