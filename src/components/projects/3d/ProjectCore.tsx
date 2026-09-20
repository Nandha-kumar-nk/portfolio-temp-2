import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectCoreProps {
  position?: [number, number, number];
  scale?: number;
  activeColor?: string;
  isMobile?: boolean;
}

export const ProjectCore: React.FC<ProjectCoreProps> = ({
  position = [0, 0, 0],
  scale = 1,
  activeColor = '#00f5ff',
  isMobile = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreSphereRef = useRef<THREE.Mesh>(null);
  const wireframeGlobeRef = useRef<THREE.Mesh>(null);
  const innerEnergyRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const ringParticlesRef = useRef<THREE.Points>(null);

  // Generate particles along orbital rings
  const ringParticlePositions = useMemo(() => {
    const count = isMobile ? 36 : 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.65 + (i % 3) * 0.25;
      const tilt = (i % 2 === 0 ? 1 : -1) * 0.15;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * tilt;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, [isMobile]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Central Sphere & Wireframe slow rotation
    if (coreSphereRef.current) {
      coreSphereRef.current.rotation.y = t * 0.08;
    }
    if (wireframeGlobeRef.current) {
      wireframeGlobeRef.current.rotation.y = -t * 0.05;
      wireframeGlobeRef.current.rotation.x = Math.sin(t * 0.1) * 0.08;
    }
    if (innerEnergyRef.current) {
      const pulse = 0.95 + Math.sin(t * 2.2) * 0.05;
      innerEnergyRef.current.scale.set(pulse, pulse, pulse);
    }

    // Three orbital rings with independent, subtle motion
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.15;
      ring1Ref.current.rotation.x = Math.PI / 5 + Math.sin(t * 0.05) * 0.04;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.12;
      ring2Ref.current.rotation.y = Math.PI / 3 + Math.cos(t * 0.06) * 0.05;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.1;
      ring3Ref.current.rotation.z = -Math.PI / 4;
    }

    if (ringParticlesRef.current) {
      ringParticlesRef.current.rotation.y = t * 0.14;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* =================================================================== */}
      {/* 1. CENTRAL GLOWING 3D SPHERE / PLANET                               */}
      {/* =================================================================== */}
      {/* Inner Glowing Plasma Core */}
      <mesh ref={innerEnergyRef}>
        <sphereGeometry args={[0.78, 32, 32]} />
        <meshBasicMaterial
          color={activeColor}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Main Celestial Sphere Body */}
      <mesh ref={coreSphereRef}>
        <sphereGeometry args={[1.05, 36, 36]} />
        <meshStandardMaterial
          color="#030c1e"
          emissive="#0284c7"
          emissiveIntensity={0.5}
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* Outer Rotating Wireframe Globe */}
      <mesh ref={wireframeGlobeRef}>
        <sphereGeometry args={[1.08, 20, 20]} />
        <meshBasicMaterial
          color={activeColor}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Soft Volumetric Atmosphere Glow */}
      <mesh>
        <sphereGeometry args={[1.16, 32, 32]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* =================================================================== */}
      {/* 2. SEVERAL THIN ORBITAL RINGS                                       */}
      {/* =================================================================== */}
      {/* Ring 1: Primary Cyan Orbital Ring with Orbiting Beads */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[1.55, 0.012, 16, 96]} />
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={1.0}
            metalness={0.9}
          />
        </mesh>
        {/* Orbiting Beads */}
        {[0, Math.PI * 0.66, Math.PI * 1.33].map((angle, i) => (
          <mesh
            key={i}
            position={[1.55 * Math.cos(angle), 1.55 * Math.sin(angle), 0]}
          >
            <sphereGeometry args={[0.038, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>

      {/* Ring 2: Amber Secondary Ring */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[1.85, 0.01, 16, 96]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#facc15"
            emissiveIntensity={0.8}
            metalness={0.9}
          />
        </mesh>
        {/* Orbiting Golden Bead */}
        <mesh position={[1.85, 0, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
      </group>

      {/* Ring 3: Wide Violet Outer Ring */}
      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[2.15, 0.009, 16, 96]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={0.7}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* Small Particles Travelling along the rings */}
      <points ref={ringParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[ringParticlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#00f5ff"
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>

      {/* =================================================================== */}
      {/* 2B. HOLOGRAPHIC GRID & SUBTLE LIGHT RAYS                             */}
      {/* =================================================================== */}
      {/* Holographic Radial Grid Floor */}
      <group position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Concentric Grid Rings */}
        {[1.2, 1.8, 2.4, 3.0].map((r, i) => (
          <mesh key={i}>
            <ringGeometry args={[r - 0.015, r, 64]} />
            <meshBasicMaterial
              color="#00f5ff"
              transparent
              opacity={0.18 - i * 0.03}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
        {/* Cross Hair Coordinate Rays */}
        {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((ang, i) => (
          <mesh key={i} rotation={[0, 0, ang]}>
            <planeGeometry args={[6.0, 0.01]} />
            <meshBasicMaterial
              color="#00f5ff"
              transparent
              opacity={0.12}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* Subtle Vertical Light Rays Cone */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 1.6, 2.8, 32, 1, true]} />
        <meshBasicMaterial
          color={activeColor}
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* =================================================================== */}
      {/* 3. CENTRAL HOLOGRAPHIC TITLE & HUD ELEMENTS                         */}
      {/* "MY PROJECTS \n IDEAS • CODE • IMPACT"                              */}
      {/* =================================================================== */}
      <Html
        position={[0, -0.45, 1.25]}
        center
        distanceFactor={isMobile ? 8.5 : 7.2}
        className="pointer-events-none select-none"
      >
        <div className="flex flex-col items-center select-none text-center pointer-events-none">
          <div className="px-4 py-2 rounded-2xl bg-slate-950/85 border border-cyan-400/80 shadow-[0_0_25px_rgba(0,245,255,0.45)] backdrop-blur-xl flex flex-col items-center">
            <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-300 font-bold uppercase">
              MY
            </span>
            <span className="text-base sm:text-lg font-black tracking-[0.25em] text-white font-orbitron drop-shadow-[0_0_12px_#00f5ff] whitespace-nowrap">
              PROJECTS
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#00f5ff]" />
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-cyan-300 font-bold uppercase">
                IDEAS • CODE • IMPACT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#00f5ff]" />
            </div>
          </div>
        </div>
      </Html>

      {/* Dynamic Core Point Light */}
      <pointLight
        color={activeColor}
        intensity={2.8}
        distance={4.5}
        position={[0, 0, 0]}
      />
    </group>
  );
};
