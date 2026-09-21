import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { SceneNumber } from '../types';

interface CyberGlobeProps {
  currentScene: SceneNumber;
  orbitalRingCount?: number;
  techNodeCount?: number;
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
}

export function CyberGlobe({
  currentScene,
  orbitalRingCount = 3,
  techNodeCount = 6,
  isMobile = false,
  prefersReducedMotion = false,
}: CyberGlobeProps) {
  console.log('[CyberGlobe] mounted for scene:', currentScene);
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireSphereRef = useRef<THREE.Mesh>(null);
  const ringsGroupRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const beamGlowRef = useRef<THREE.Mesh>(null);
  const shockwavesRef = useRef<THREE.Group>(null);

  // Fade factor based on scene (visible from scene 3 onwards)
  const isVisible = currentScene >= 3;
  const isDetailRings = currentScene >= 4;
  const isBeamActive = currentScene === 5;

  // Tech orbit items specifications matching storyboard Scene 4
  const allTechNodes = useMemo(() => [
    { name: 'React', symbol: '⚛', color: '#38bdf8', orbitR: isMobile ? 2.6 : 3.1, speed: 0.65, tilt: [0.35, 0.2, 0.4] as [number, number, number], offset: 0 },
    { name: 'Python', symbol: '🐍', color: '#facc15', orbitR: isMobile ? 2.9 : 3.4, speed: 0.55, tilt: [-0.4, 0.3, -0.2] as [number, number, number], offset: 1.05 },
    { name: 'JavaScript', symbol: 'JS', color: '#f59e0b', orbitR: isMobile ? 2.5 : 2.9, speed: 0.75, tilt: [0.1, -0.4, 0.5] as [number, number, number], offset: 2.1 },
    { name: 'Node.js', symbol: '⬢', color: '#4ade80', orbitR: isMobile ? 2.75 : 3.2, speed: 0.6, tilt: [-0.25, -0.3, -0.3] as [number, number, number], offset: 3.2 },
    { name: 'Database', symbol: '🗄️', color: '#60a5fa', orbitR: isMobile ? 3.0 : 3.5, speed: 0.5, tilt: [0.5, 0.1, -0.4] as [number, number, number], offset: 4.3 },
    { name: 'Code', symbol: '</>', color: '#a855f7', orbitR: isMobile ? 2.4 : 2.8, speed: 0.8, tilt: [-0.15, 0.5, 0.2] as [number, number, number], offset: 5.2 },
  ], [isMobile]);

  const activeTechNodes = useMemo(() => {
    return allTechNodes.slice(0, Math.max(1, Math.min(techNodeCount, allTechNodes.length)));
  }, [allTechNodes, techNodeCount]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * (prefersReducedMotion ? 0.35 : 1.0);

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (prefersReducedMotion ? 0.08 : 0.3);
    }

    if (coreRef.current) {
      const scale = 1.0 + (prefersReducedMotion ? 0 : Math.sin(t * 2.5) * 0.05);
      coreRef.current.scale.set(scale, scale, scale);
    }

    if (ringsGroupRef.current) {
      ringsGroupRef.current.rotation.z += delta * (prefersReducedMotion ? 0.04 : 0.15);
      ringsGroupRef.current.rotation.x = prefersReducedMotion ? 0 : Math.sin(t * 0.5) * 0.15;
    }

    // Energy beam pulse in Scene 5
    if (beamRef.current && isBeamActive) {
      const beamScale = 1.0 + (prefersReducedMotion ? 0 : Math.sin(t * 15) * 0.2);
      beamRef.current.scale.set(beamScale, 1, beamScale);
    }

    // Shockwave pulse rings in Scene 5
    if (shockwavesRef.current && isBeamActive) {
      shockwavesRef.current.children.forEach((child, idx) => {
        const ring = child as THREE.Mesh;
        const phase = (t * (prefersReducedMotion ? 1.0 : 2.0) + idx * 0.8) % 3.0;
        const ringScale = 0.5 + phase * 2.2;
        ring.scale.set(ringScale, ringScale, ringScale);
        const mat = ring.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = Math.max(0, 1.0 - phase / 3.0) * 0.8;
        }
      });
    }
  });

  if (!isVisible) return null;

  const baseScale = isMobile ? 0.95 : 1.2;

  return (
    <group ref={groupRef} scale={[baseScale, baseScale, baseScale]} position={[0, 0, 0]}>
      {/* 0. Solid Dark Obsidian Body with Cyan Emissive Glow */}
      <mesh>
        <sphereGeometry args={[1.78, 36, 36]} />
        <meshStandardMaterial
          color="#071827"
          emissive="#00d9ff"
          emissiveIntensity={isBeamActive ? 1.2 : 0.65}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>

      {/* 1. Luminous Inner Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.45, 32, 32]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={isBeamActive ? 0.95 : 0.75}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 2. Holographic Latitude & Longitude Wireframe Globe */}
      <mesh ref={wireSphereRef}>
        <sphereGeometry args={[1.92, 28, 28]} />
        <meshBasicMaterial
          color="#00f5ff"
          wireframe
          transparent
          opacity={isBeamActive ? 0.85 : 0.65}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Outer Atmospheric Fresnel Glow Shield */}
      <mesh>
        <sphereGeometry args={[2.12, 32, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={isBeamActive ? 0.45 : 0.3}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 4. Orbital Rings (Scene 4+) */}
      {isDetailRings && (
        <group ref={ringsGroupRef}>
          {/* Ring 1 - inclined 35 deg (rendered if orbitalRingCount >= 1) */}
          {orbitalRingCount >= 1 && (
            <mesh rotation={[Math.PI / 5, 0, 0]}>
              <torusGeometry args={[2.75, 0.018, 16, 100]} />
              <meshBasicMaterial
                color="#38bdf8"
                transparent
                opacity={0.7}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )}

          {/* Ring 2 - inclined -40 deg (rendered if orbitalRingCount >= 2) */}
          {orbitalRingCount >= 2 && (
            <mesh rotation={[-Math.PI / 4.5, Math.PI / 6, 0]}>
              <torusGeometry args={[3.15, 0.022, 16, 100]} />
              <meshBasicMaterial
                color="#06b6d4"
                transparent
                opacity={0.65}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )}

          {/* Ring 3 - Outer Thin Violet Ring (rendered if orbitalRingCount >= 3) */}
          {orbitalRingCount >= 3 && (
            <mesh rotation={[Math.PI / 3, -Math.PI / 5, 0]}>
              <torusGeometry args={[3.55, 0.015, 16, 100]} />
              <meshBasicMaterial
                color="#818cf8"
                transparent
                opacity={0.5}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )}

          {/* Tech Badges Orbiting along rings */}
          {activeTechNodes.map((tech) => (
            <TechOrbitNode
              key={tech.name}
              node={tech}
              isMobile={isMobile}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </group>
      )}

      {/* 5. Vertical Cyan Energy Beam & Pulse Shockwaves (Scene 5) */}
      {isBeamActive && (
        <>
          {/* Main intense piercing cylinder beam */}
          <mesh ref={beamRef} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 18, 32]} />
            <meshBasicMaterial
              color="#e0f2fe"
              transparent
              opacity={0.95}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Outer glow cylinder */}
          <mesh ref={beamGlowRef} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.75, 0.75, 18, 32]} />
            <meshBasicMaterial
              color="#06b6d4"
              transparent
              opacity={0.45}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Concentric expanding shockwave rings on equator plane */}
          <group ref={shockwavesRef} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
              <ringGeometry args={[1.8, 2.05, 64]} />
              <meshBasicMaterial
                color="#38bdf8"
                transparent
                opacity={0.7}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            <mesh>
              <ringGeometry args={[2.2, 2.45, 64]} />
              <meshBasicMaterial
                color="#06b6d4"
                transparent
                opacity={0.6}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            <mesh>
              <ringGeometry args={[2.8, 3.1, 64]} />
              <meshBasicMaterial
                color="#a855f7"
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        </>
      )}
    </group>
  );
}

// Sub-component for each orbiting tech badge (React, Python, JS, Node, DB, Code)
interface OrbitNodeConfig {
  name: string;
  symbol: string;
  color: string;
  orbitR: number;
  speed: number;
  tilt: [number, number, number];
  offset: number;
}

function TechOrbitNode({
  node,
  isMobile = false,
  prefersReducedMotion = false,
}: {
  node: OrbitNodeConfig;
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const speedMult = prefersReducedMotion ? 0.35 : 1.0;
    const t = state.clock.elapsedTime * (node.speed * speedMult) + node.offset;
    if (groupRef.current) {
      const x = Math.cos(t) * node.orbitR;
      const z = Math.sin(t) * node.orbitR;
      const y = Math.sin(t * 1.5) * (isMobile ? 0.25 : 0.4);
      groupRef.current.position.set(x, y, z);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glowing point marker */}
      <mesh>
        <sphereGeometry args={[isMobile ? 0.06 : 0.09, 16, 16]} />
        <meshBasicMaterial
          color={node.color}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Cyber Badge in 3D space */}
      <Html center distanceFactor={isMobile ? 12 : 10}>
        <div
          className={`flex items-center gap-1 sm:gap-1.5 rounded-full border border-cyan-500/50 backdrop-blur-md transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] pointer-events-none whitespace-nowrap ${
            isMobile ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[11px]'
          }`}
          style={{
            backgroundColor: 'rgba(5, 12, 28, 0.9)',
            borderColor: node.color,
            boxShadow: `0 0 ${isMobile ? '10px' : '16px'} ${node.color}55`,
          }}
        >
          <span className={isMobile ? 'text-xs font-bold' : 'text-sm font-bold'} style={{ color: node.color }}>
            {node.symbol}
          </span>
          <span className="font-mono-code tracking-wider text-slate-200 font-semibold">
            {node.name}
          </span>
        </div>
      </Html>
    </group>
  );
}
