import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Helix3DCanvasProps {
  activeStageIndex: number;
  visitedStages: Set<number>;
  onSelectStage: (index: number) => void;
  isMobile?: boolean;
}

// Stage positions configuration
const STAGE_PROGRESS = [0.06, 0.23, 0.41, 0.59, 0.77, 0.94];

// ---------------------------------------------------------------------------
// 1. 3D DOUBLE HELIX MESH COMPONENT
// ---------------------------------------------------------------------------
const DoubleHelixMesh: React.FC<{
  activeStageIndex: number;
  visitedStages: Set<number>;
  onSelectStage: (index: number) => void;
  isMobile: boolean;
}> = ({ activeStageIndex, visitedStages, onSelectStage, isMobile }) => {
  const groupRef = useRef<THREE.Group>(null);
  const activeLightRef = useRef<THREE.PointLight>(null);

  const width = isMobile ? 6.2 : 8.8;
  const radius = isMobile ? 0.65 : 0.88;
  const turns = 2.4;
  const tubeRadius = isMobile ? 0.025 : 0.035;
  const rungCount = 14;

  // Build 3D Helix Curves, Rungs & Node Positions
  const { curveA, curveB, geomA, geomB, rungs, stageNodes } = useMemo(() => {
    const pointsA: THREE.Vector3[] = [];
    const pointsB: THREE.Vector3[] = [];
    const samples = 140;

    for (let i = 0; i <= samples; i++) {
      const progress = i / samples;
      const x = (progress - 0.5) * width;
      const angle = progress * turns * Math.PI * 2;

      const yA = Math.cos(angle) * radius;
      const zA = Math.sin(angle) * radius;
      const yB = -yA;
      const zB = -zA;

      pointsA.push(new THREE.Vector3(x, yA, zA));
      pointsB.push(new THREE.Vector3(x, yB, zB));
    }

    const cA = new THREE.CatmullRomCurve3(pointsA);
    const cB = new THREE.CatmullRomCurve3(pointsB);

    const gA = new THREE.TubeGeometry(cA, samples, tubeRadius, 10, false);
    const gB = new THREE.TubeGeometry(cB, samples, tubeRadius, 10, false);

    // Calculate 3D Rungs
    const rungList: {
      pos: THREE.Vector3;
      quaternion: THREE.Quaternion;
      length: number;
      index: number;
    }[] = [];

    for (let r = 0; r < rungCount; r++) {
      const progress = 0.05 + (r / (rungCount - 1)) * 0.9;
      const x = (progress - 0.5) * width;
      const angle = progress * turns * Math.PI * 2;

      const pA = new THREE.Vector3(x, Math.cos(angle) * radius, Math.sin(angle) * radius);
      const pB = new THREE.Vector3(x, -Math.cos(angle) * radius, -Math.sin(angle) * radius);

      const dir = new THREE.Vector3().subVectors(pA, pB);
      const length = dir.length();
      const quat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.clone().normalize()
      );

      rungList.push({
        pos: new THREE.Vector3(x, 0, 0),
        quaternion: quat,
        length,
        index: r,
      });
    }

    // Calculate 6 Stage Node Positions
    const nodeList = STAGE_PROGRESS.map((prog, idx) => {
      const x = (prog - 0.5) * width;
      const angle = prog * turns * Math.PI * 2;
      const y = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      return {
        pos: new THREE.Vector3(x, y, z),
        stageIndex: idx,
      };
    });

    return {
      curveA: cA,
      curveB: cB,
      geomA: gA,
      geomB: gB,
      rungs: rungList,
      stageNodes: nodeList,
    };
  }, [width, radius, turns, tubeRadius, rungCount, isMobile]);

  // Continuous 3D Rotation and Floating Motion Loop
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Rotation around long X axis creates authentic 3D helix spin
      groupRef.current.rotation.x += delta * 0.22;
      // Gentle vertical floating motion
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
    }

    if (activeLightRef.current && stageNodes[activeStageIndex]) {
      // Position point light at the current active stage node
      const activeNodePos = stageNodes[activeStageIndex].pos;
      if (groupRef.current) {
        // Transform local node position to world coordinates as group rotates
        const worldPos = activeNodePos.clone().applyMatrix4(groupRef.current.matrixWorld);
        activeLightRef.current.position.copy(worldPos);
      }
    }
  });

  return (
    <>
      {/* Dynamic Point Light tracking selected 3D Node */}
      <pointLight
        ref={activeLightRef}
        color="#00f5ff"
        intensity={3.5}
        distance={3.5}
        decay={2}
      />

      <group ref={groupRef}>
        {/* Strand A - Glowing Primary Tube */}
        <mesh geometry={geomA}>
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00b4d8"
            emissiveIntensity={0.85}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Strand B - Secondary Electric Blue Tube */}
        <mesh geometry={geomB}>
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.65}
            roughness={0.25}
            metalness={0.75}
          />
        </mesh>

        {/* Connecting 3D DNA Rungs */}
        {rungs.map((r) => {
          const isVisited = r.index <= activeStageIndex * 2.5;
          return (
            <mesh key={r.index} position={r.pos} quaternion={r.quaternion}>
              <cylinderGeometry args={[tubeRadius * 0.5, tubeRadius * 0.5, r.length, 8]} />
              <meshStandardMaterial
                color={isVisited ? '#00f5ff' : '#0f2942'}
                emissive={isVisited ? '#0284c7' : '#04101f'}
                emissiveIntensity={isVisited ? 0.9 : 0.2}
                roughness={0.3}
                metalness={0.7}
              />
            </mesh>
          );
        })}

        {/* 6 Stage 3D Spherical Nodes */}
        {stageNodes.map((node) => {
          const isActive = node.stageIndex === activeStageIndex;
          const isVisited = visitedStages.has(node.stageIndex);

          const sphereRadius = isActive
            ? isMobile
              ? 0.18
              : 0.24
            : isVisited
            ? isMobile
              ? 0.12
              : 0.16
            : isMobile
            ? 0.09
            : 0.12;

          return (
            <group key={node.stageIndex} position={node.pos}>
              {/* Main Glowing 3D Node Sphere */}
              <mesh
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectStage(node.stageIndex);
                }}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                  document.body.style.cursor = 'default';
                }}
              >
                <sphereGeometry args={[sphereRadius, 24, 24]} />
                <meshStandardMaterial
                  color={isActive ? '#ffffff' : isVisited ? '#00f5ff' : '#0ea5e9'}
                  emissive={isActive ? '#00f5ff' : isVisited ? '#0284c7' : '#0369a1'}
                  emissiveIntensity={isActive ? 2.8 : isVisited ? 1.2 : 0.4}
                  roughness={0.1}
                  metalness={0.9}
                />
              </mesh>

              {/* Active Outer Pulsing Halo */}
              {isActive && (
                <mesh rotation={[0, 0, 0]}>
                  <sphereGeometry args={[sphereRadius * 1.45, 16, 16]} />
                  <meshBasicMaterial
                    color="#00f5ff"
                    transparent
                    opacity={0.3}
                    wireframe
                  />
                </mesh>
              )}
            </group>
          );
        })}
      </group>
    </>
  );
};

// ---------------------------------------------------------------------------
// 2. ATMOSPHERIC DNA PARTICLES
// ---------------------------------------------------------------------------
const HelixParticles: React.FC<{ count: number; isMobile: boolean }> = ({ count, isMobile }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const width = isMobile ? 7 : 10;
    const height = 3;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx] = (Math.random() - 0.5) * width;
      pos[idx + 1] = (Math.random() - 0.5) * height;
      pos[idx + 2] = (Math.random() - 0.5) * 2.5;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      color: 0x00f5ff,
      size: isMobile ? 0.028 : 0.038,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return { geometry: geom, material: mat };
  }, [count, isMobile]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

// ---------------------------------------------------------------------------
// 3. EXPORTED HELIX 3D CANVAS COMPONENT
// ---------------------------------------------------------------------------
export const Helix3DCanvas: React.FC<Helix3DCanvasProps> = ({
  activeStageIndex,
  visitedStages,
  onSelectStage,
  isMobile = false,
}) => {
  return (
    <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[420px] select-none rounded-2xl overflow-hidden bg-slate-950/40 border border-cyan-500/20 backdrop-blur-md shadow-[0_0_40px_rgba(0,245,255,0.08)]">
      <Canvas
        camera={{
          position: [0, 0, isMobile ? 5.2 : 5.8],
          fov: isMobile ? 48 : 42,
          near: 0.1,
          far: 20,
        }}
        dpr={isMobile ? [1, 1.2] : [1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} color="#030b1e" />
        <directionalLight position={[3, 5, 4]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-4, -2, 2]} intensity={0.8} color="#00f5ff" />
        <pointLight position={[0, -2, -2]} intensity={0.6} color="#0284c7" />

        {/* Double Helix 3D Object */}
        <DoubleHelixMesh
          activeStageIndex={activeStageIndex}
          visitedStages={visitedStages}
          onSelectStage={onSelectStage}
          isMobile={isMobile}
        />

        {/* Ambient Cyan Particles */}
        <HelixParticles count={isMobile ? 40 : 90} isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default Helix3DCanvas;
