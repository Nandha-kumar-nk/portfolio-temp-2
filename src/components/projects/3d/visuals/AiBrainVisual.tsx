import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem } from '../../../../types';

interface VisualProps {
  project: ProjectItem;
  isSelected: boolean;
  isDimmed: boolean;
  scale?: number;
}

export const AiBrainVisual: React.FC<VisualProps> = ({
  project,
  isSelected,
  isDimmed,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Group>(null);
  const leftHemiRef = useRef<THREE.Group>(null);
  const rightHemiRef = useRef<THREE.Group>(null);
  const synapseLinesRef = useRef<THREE.LineSegments>(null);

  // Generate organic neural synaptic points for both hemispheres
  const [leftPts, rightPts, connectionLines] = useMemo(() => {
    const ptsLeft: number[] = [];
    const ptsRight: number[] = [];
    const lines: number[] = [];

    const nodeCount = 38;

    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      // Distort into organic ellipsoid brain lobe
      const rx = 0.35 + Math.sin(phi * 3) * 0.05;
      const ry = 0.45;
      const rz = 0.38 + Math.cos(theta * 2) * 0.04;

      const x = rx * Math.sin(phi) * Math.cos(theta);
      const y = ry * Math.cos(phi);
      const z = rz * Math.sin(phi) * Math.sin(theta);

      // Left lobe (shifted left)
      ptsLeft.push(x - 0.22, y + 0.42, z);
      // Right lobe (shifted right)
      ptsRight.push(x + 0.22, y + 0.42, z);
    }

    // Connect nearest nodes with synaptic lines
    for (let i = 0; i < nodeCount; i += 2) {
      const idx1 = i * 3;
      const idx2 = ((i + 1) % nodeCount) * 3;
      lines.push(
        ptsLeft[idx1], ptsLeft[idx1 + 1], ptsLeft[idx1 + 2],
        ptsLeft[idx2], ptsLeft[idx2 + 1], ptsLeft[idx2 + 2]
      );
      lines.push(
        ptsRight[idx1], ptsRight[idx1 + 1], ptsRight[idx1 + 2],
        ptsRight[idx2], ptsRight[idx2 + 1], ptsRight[idx2 + 2]
      );

      // Cross-hemisphere corpus callosum bridges
      if (i % 4 === 0) {
        lines.push(
          ptsLeft[idx1], ptsLeft[idx1 + 1], ptsLeft[idx1 + 2],
          ptsRight[idx1], ptsRight[idx1 + 1], ptsRight[idx1 + 2]
        );
      }
    }

    return [
      new Float32Array(ptsLeft),
      new Float32Array(ptsRight),
      new Float32Array(lines),
    ];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.8) * 0.04;
      groupRef.current.rotation.y = t * 0.18;
    }
    if (haloRef.current) {
      haloRef.current.rotation.z = -t * 0.35;
      haloRef.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.5) * 0.1;
    }
    if (leftHemiRef.current && rightHemiRef.current) {
      const pulse = 1 + Math.sin(t * 3.0) * 0.03;
      leftHemiRef.current.scale.set(pulse, pulse, pulse);
      rightHemiRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const accent = project.accentColor || '#22c55e';
  const opacity = isDimmed ? 0.35 : 1.0;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* 1. CENTRAL NEURAL CORE SPHERE (EMITTING PULSES) */}
      <mesh position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.6 * opacity}
        />
      </mesh>

      {/* 2. DUAL-HEMISPHERE ORGANIC LOBES (WIREFRAME SHELLS) */}
      <group ref={leftHemiRef} position={[-0.2, 0.42, 0]}>
        <mesh>
          <sphereGeometry args={[0.34, 16, 16]} />
          <meshBasicMaterial
            color={accent}
            wireframe
            transparent
            opacity={0.35 * opacity}
          />
        </mesh>
      </group>

      <group ref={rightHemiRef} position={[0.2, 0.42, 0]}>
        <mesh>
          <sphereGeometry args={[0.34, 16, 16]} />
          <meshBasicMaterial
            color={accent}
            wireframe
            transparent
            opacity={0.35 * opacity}
          />
        </mesh>
      </group>

      {/* 3. SYNAPTIC NODES (POINTS) */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[leftPts, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#ffffff"
          transparent
          opacity={0.9 * opacity}
        />
      </points>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[rightPts, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#ffffff"
          transparent
          opacity={0.9 * opacity}
        />
      </points>

      {/* 4. SYNAPTIC CONNECTION FIBERS */}
      <lineSegments ref={synapseLinesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[connectionLines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={accent}
          transparent
          opacity={0.7 * opacity}
        />
      </lineSegments>

      {/* 5. FLOATING AI DATA HALO RING */}
      <group ref={haloRef} position={[0, 0.42, 0]}>
        <mesh>
          <torusGeometry args={[0.62, 0.012, 12, 48]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={isSelected ? 1.4 : 0.8}
          />
        </mesh>
        {/* Halo Orbiting Beads */}
        {[0, Math.PI * 0.66, Math.PI * 1.33].map((angle, i) => (
          <mesh
            key={i}
            position={[0.62 * Math.cos(angle), 0.62 * Math.sin(angle), 0]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>

      {/* Point Light */}
      <pointLight
        color={accent}
        intensity={isSelected ? 2.8 : 1.5}
        distance={2.8}
        position={[0, 0.42, 0]}
      />
    </group>
  );
};
