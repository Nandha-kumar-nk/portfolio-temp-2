import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CrystalFragmentsProps {
  accentColor: string;
  phase: number; // 0 to 7
  phaseProgress: number; // 0 to 1 in phase
  overallProgress: number;
  direction: number; // 1 for next, -1 for prev
  isMobile?: boolean;
}

export const CrystalFragments: React.FC<CrystalFragmentsProps> = ({
  accentColor,
  phase,
  phaseProgress,
  overallProgress: _overallProgress,
  direction = 1,
  isMobile = false,
}) => {
  const shardsGroupRef = useRef<THREE.Group>(null);

  // Approximately 20-40 major shards (32 on desktop, 18 on mobile)
  const shardCount = isMobile ? 18 : 32;

  const shards = useMemo(() => {
    const list: Array<{
      basePos: [number, number, number];
      outwardDir: [number, number, number];
      rotation: [number, number, number];
      rotSpeed: [number, number, number];
      scale: number;
      geometryType: number; // 0=tetra, 1=octa, 2=box
    }> = [];

    for (let i = 0; i < shardCount; i++) {
      const u = (i + 0.5) / shardCount;
      const phi = Math.acos(2 * u - 1);
      const theta = Math.sqrt(shardCount * Math.PI) * phi;
      const r = 0.85 + (i % 5) * 0.08;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi) * 1.35; // elongated like crystal
      const z = r * Math.sin(phi) * Math.sin(theta) * 0.7;

      // Controlled outward trajectory (bounded, smooth, max distance ~1.3 units)
      const outX = x * 1.35 + direction * (0.2 + (i % 4) * 0.12);
      const outY = y * 1.25 + ((i % 3) - 1) * 0.15;
      const outZ = z * 1.35;

      list.push({
        basePos: [x, y, z],
        outwardDir: [outX, outY, outZ],
        rotation: [(i * 0.7) % Math.PI, (i * 1.3) % Math.PI, (i * 0.5) % Math.PI],
        rotSpeed: [
          (0.8 + (i % 3) * 0.3) * (i % 2 === 0 ? 1 : -1),
          (0.9 + (i % 4) * 0.25) * (i % 3 === 0 ? -1 : 1),
          0.6,
        ],
        scale: (isMobile ? 0.065 : 0.085) + ((i * 3) % 4) * 0.015,
        geometryType: i % 3,
      });
    }
    return list;
  }, [shardCount, direction, isMobile]);

  const tetraGeom = useMemo(() => new THREE.TetrahedronGeometry(1, 0), []);
  const octaGeom = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0xe2f4ff,
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.45,
      roughness: 0.08,
      metalness: 0.2,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
  }, [accentColor]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!shardsGroupRef.current) return;

    const children = shardsGroupRef.current.children;

    // Calculate displacement based on the 7-phase transition:
    // Phase 1 (Focus): 0
    // Phase 2 (Charge): subtle jitter (0.01)
    // Phase 3 (Fracture): 0 to 0.22 offset
    // Phase 4 (Shatter): 0.22 to 1.0 (move outward smoothly)
    // Phase 5 (Particle Transition): dissolve out (scale -> 0)
    // Phase 6 (Reconstruction): reverse converge from 1.0 to 0.1
    // Phase 7 (New Project): 0.1 to 0 (lock in place)
    // Phase 0 (Idle): very subtle breathing orbit

    let burstFactor = 0;
    let visibility = 1;

    if (phase === 1) {
      burstFactor = 0;
      visibility = 1;
    } else if (phase === 2) {
      burstFactor = Math.sin(phaseProgress * Math.PI * 4) * 0.025;
      visibility = 1;
    } else if (phase === 3) {
      // Fracture: slight separation
      burstFactor = phaseProgress * 0.25;
      visibility = 1;
    } else if (phase === 4) {
      // Shatter: smooth outward movement (0.25 -> 1.0)
      burstFactor = 0.25 + phaseProgress * 0.75;
      visibility = 1;
    } else if (phase === 5) {
      // Shards dissolve into particles
      burstFactor = 1.0 + phaseProgress * 0.2;
      visibility = Math.max(0, 1 - phaseProgress * 2.2);
    } else if (phase === 6) {
      // Reconstruction: reverse direction & converge inward
      burstFactor = 1.0 - phaseProgress * 0.85;
      visibility = Math.min(1, phaseProgress * 2);
    } else if (phase === 7) {
      // Lock into stabilized crystal
      burstFactor = 0.15 * (1 - phaseProgress);
      visibility = 1;
    } else {
      burstFactor = 0;
      visibility = 1;
    }

    shards.forEach((shard, i) => {
      const child = children[i] as THREE.Mesh;
      if (!child) return;

      if (phase > 0) {
        // Outward expansion / convergence
        child.position.x = shard.basePos[0] + shard.outwardDir[0] * burstFactor;
        child.position.y = shard.basePos[1] + shard.outwardDir[1] * burstFactor;
        child.position.z = shard.basePos[2] + shard.outwardDir[2] * burstFactor;

        child.rotation.x += shard.rotSpeed[0] * 0.04;
        child.rotation.y += shard.rotSpeed[1] * 0.04;
        child.rotation.z += shard.rotSpeed[2] * 0.03;

        child.scale.setScalar(Math.max(0.0001, shard.scale * visibility));
      } else {
        // Calm idle orbit
        const idleWobble = Math.sin(t * 0.9 + i) * 0.02;
        child.position.x = shard.basePos[0] + idleWobble;
        child.position.y = shard.basePos[1] + Math.cos(t * 0.7 + i) * 0.02;
        child.position.z = shard.basePos[2];

        child.rotation.x = shard.rotation[0] + t * shard.rotSpeed[0] * 0.08;
        child.rotation.y = shard.rotation[1] + t * shard.rotSpeed[1] * 0.08;
        child.scale.setScalar(shard.scale);
      }
    });

    material.opacity = 0.65 * visibility;
  });

  return (
    <group ref={shardsGroupRef}>
      {shards.map((shard, i) => (
        <mesh
          key={i}
          geometry={shard.geometryType === 0 ? tetraGeom : octaGeom}
          material={material}
        />
      ))}
    </group>
  );
};
