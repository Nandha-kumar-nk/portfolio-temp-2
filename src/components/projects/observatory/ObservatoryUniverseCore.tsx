import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface ObservatoryUniverseCoreProps {
  position?: [number, number, number];
  scale?: number;
  activeColor?: string;
  isMobile?: boolean;
  isPulseTriggered?: boolean;
}

export const ObservatoryUniverseCore: React.FC<ObservatoryUniverseCoreProps> = ({
  position = [0, 0.25, -0.4],
  scale = 1,
  activeColor = '#00f5ff',
  isMobile = false,
  isPulseTriggered = false,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const outerShellRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const wireframeLatticeRef = useRef<THREE.LineSegments>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Core base radius: tuned so the core is ~220-280px on desktop
  const baseRadius = isMobile ? 0.72 : 0.95;

  // 1. Procedural Geometries for the layered nucleus
  const outerShellGeom = useMemo(() => new THREE.SphereGeometry(baseRadius, 32, 32), [baseRadius]);
  const innerCoreGeom = useMemo(() => new THREE.IcosahedronGeometry(baseRadius * 0.58, 2), [baseRadius]);
  const wireframeGeom = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(baseRadius * 0.82, 1);
    return new THREE.WireframeGeometry(ico);
  }, [baseRadius]);

  // 2. Orbital Torus Rings
  const ring1Geom = useMemo(() => new THREE.TorusGeometry(baseRadius * 1.32, 0.012, 16, 80), [baseRadius]);
  const ring2Geom = useMemo(() => new THREE.TorusGeometry(baseRadius * 1.55, 0.01, 16, 80), [baseRadius]);
  const ring3Geom = useMemo(() => new THREE.TorusGeometry(baseRadius * 1.78, 0.009, 16, 80), [baseRadius]);

  // 3. Orbiting Core Particles (Points)
  const particleCount = isMobile ? 36 : 64;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = baseRadius * (1.1 + Math.random() * 0.9);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.cos(phi);
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, [particleCount, baseRadius]);

  // Pulse flash tracking for transition interaction
  const pulseScale = useRef(1);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle breathing scale
    const breath = 1 + Math.sin(t * 1.4) * 0.022;

    // Handle transition pulse
    if (isPulseTriggered) {
      pulseScale.current = THREE.MathUtils.lerp(pulseScale.current, 1.22, 0.12);
    } else {
      pulseScale.current = THREE.MathUtils.lerp(pulseScale.current, 1.0, 0.05);
    }

    if (rootGroupRef.current) {
      const currentScale = breath * pulseScale.current * scale;
      rootGroupRef.current.scale.set(currentScale, currentScale, currentScale);
    }

    // 1. Slow, majestic rotation of the outer shell and inner core
    if (outerShellRef.current) {
      outerShellRef.current.rotation.y = t * 0.08;
      outerShellRef.current.rotation.x = Math.sin(t * 0.05) * 0.08;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = -t * 0.16;
      innerCoreRef.current.rotation.z = t * 0.1;
    }

    if (wireframeLatticeRef.current) {
      wireframeLatticeRef.current.rotation.y = t * 0.12;
      wireframeLatticeRef.current.rotation.x = -t * 0.06;
    }

    // 2. Orbital rings rotate independently at gentle speeds
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.18;
      ring1Ref.current.rotation.y = Math.sin(t * 0.2) * 0.35;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.14;
      ring2Ref.current.rotation.z = -t * 0.12;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.16;
      ring3Ref.current.rotation.x = Math.cos(t * 0.22) * 0.4;
    }

    // 3. Orbiting particles gentle rotation
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.09;
      particlesRef.current.rotation.x = Math.sin(t * 0.08) * 0.1;
    }
  });

  return (
    <group ref={rootGroupRef} position={position}>
      {/* 1. OUTER SUBTLE TRANSLUCENT SHELL */}
      <mesh ref={outerShellRef} geometry={outerShellGeom}>
        <meshPhysicalMaterial
          color="#061a3a"
          emissive="#00385c"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.1}
          transmission={0.65}
          ior={1.45}
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </mesh>

      {/* 2. THIN GEOMETRIC STRUCTURE (WIREFRAME LATTICE) */}
      <lineSegments ref={wireframeLatticeRef} geometry={wireframeGeom}>
        <lineBasicMaterial color={activeColor} transparent opacity={0.35} />
      </lineSegments>

      {/* 3. INNER GLOWING ENERGY NUCLEUS */}
      <mesh ref={innerCoreRef} geometry={innerCoreGeom}>
        <meshStandardMaterial
          color={activeColor}
          emissive={activeColor}
          emissiveIntensity={0.85}
          roughness={0.3}
          wireframe={false}
        />
      </mesh>

      {/* 4. THREE INDEPENDENT ORBITAL RINGS */}
      {/* Ring 1 - Cyan primary inclination */}
      <group ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh geometry={ring1Geom}>
          <meshStandardMaterial
            color={activeColor}
            emissive={activeColor}
            emissiveIntensity={0.7}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Orbiting Ring Node */}
        <mesh position={[baseRadius * 1.32, 0, 0]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Ring 2 - Amber/Gold harmonic inclination */}
      <group ref={ring2Ref} rotation={[-Math.PI / 5, Math.PI / 6, 0]}>
        <mesh geometry={ring2Geom}>
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
        {/* Orbiting Ring Node */}
        <mesh position={[0, baseRadius * 1.55, 0]}>
          <sphereGeometry args={[0.038, 12, 12]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
      </group>

      {/* Ring 3 - Deep Electric Blue outer orbital */}
      <group ref={ring3Ref} rotation={[Math.PI / 3, -Math.PI / 4, 0]}>
        <mesh geometry={ring3Geom}>
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.6}
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Orbiting Ring Node */}
        <mesh position={[-baseRadius * 1.78, 0, 0]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* 5. SMALL ORBITING ENERGY PARTICLES */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.035 : 0.045}
          color="#a5f3fc"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* 6. CENTRAL NU SYMBOL (GENTLY GLOWING NUCLEUS LABEL) */}
      <Html center position={[0, 0, 0]} className="pointer-events-none select-none">
        <div className="flex flex-col items-center justify-center text-center select-none pointer-events-none">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex flex-col items-center justify-center backdrop-blur-sm border shadow-[0_0_24px_rgba(0,245,255,0.6)] transition-all duration-300"
            style={{
              backgroundColor: 'rgba(2, 6, 23, 0.85)',
              borderColor: activeColor,
            }}
          >
            <span
              className="font-mono text-base sm:text-lg font-black tracking-widest text-white drop-shadow-[0_0_12px_#00f5ff]"
            >
              NU
            </span>
          </div>
          <span className="mt-1 text-[8px] font-mono tracking-widest text-cyan-300 font-bold uppercase opacity-85">
            UNIVERSE CORE
          </span>
        </div>
      </Html>
    </group>
  );
};
