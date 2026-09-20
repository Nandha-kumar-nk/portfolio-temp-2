import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ProjectItem } from '../../../types';

interface CentralTechGlobe3DProps {
  projects: ProjectItem[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  position?: [number, number, number];
  scale?: number;
}

export const CentralTechGlobe3D: React.FC<CentralTechGlobe3DProps> = ({
  projects,
  selectedProjectId,
  onSelectProject: _onSelectProject,
  position = [0, 0.25, -0.4],
  scale = 1,
}) => {
  const globeGroupRef = useRef<THREE.Group>(null);
  const planetBodyRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const pulseScaleRef = useRef(1);

  // Generate technological continent coordinates / cyber grid points on sphere surface
  const [gridPoints, continentPoints] = useMemo(() => {
    const latCount = 28;
    const lonCount = 36;
    const pts: number[] = [];

    // Latitude & longitude tech nodes
    for (let i = 0; i < latCount; i++) {
      const phi = (i / latCount) * Math.PI;
      for (let j = 0; j < lonCount; j++) {
        const theta = (j / lonCount) * Math.PI * 2;
        const r = 1.82;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.cos(phi);
        const z = r * Math.sin(phi) * Math.sin(theta);
        pts.push(x, y, z);
      }
    }

    // Pseudo continent landmass clusters (cyan dense points)
    const contPts: number[] = [];
    for (let k = 0; k < 600; k++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      // Masking to create landmass clusters
      const noise =
        Math.sin(theta * 3.0) * Math.cos(phi * 3.0) +
        Math.sin(theta * 5.0 + 1.2) * Math.cos(phi * 2.0);
      if (noise > 0.15) {
        const r = 1.835 + Math.random() * 0.02;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.cos(phi);
        const z = r * Math.sin(phi) * Math.sin(theta);
        contPts.push(x, y, z);
      }
    }

    return [new Float32Array(pts), new Float32Array(contPts)];
  }, []);

  // Golden spires rising from the top pole of the globe (matching reference image)
  const spires = useMemo(() => {
    return [
      { x: 0, z: 0, h: 1.4, w: 0.14, color: '#fef08a' },
      { x: -0.15, z: 0.1, h: 1.1, w: 0.1, color: '#facc15' },
      { x: 0.16, z: 0.12, h: 1.2, w: 0.11, color: '#eab308' },
      { x: -0.12, z: -0.14, h: 0.95, w: 0.09, color: '#ca8a04' },
      { x: 0.14, z: -0.12, h: 1.05, w: 0.1, color: '#facc15' },
      { x: 0.28, z: 0, h: 0.75, w: 0.08, color: '#eab308' },
      { x: -0.26, z: 0, h: 0.78, w: 0.08, color: '#fef08a' },
    ];
  }, []);

  // Independent rotation of globe, wireframe, and orbital rings
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Planet body slow smooth rotation
    if (planetBodyRef.current) {
      planetBodyRef.current.rotation.y = t * 0.08;
    }
    // Wireframe rotates slightly faster for technological parallax
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = t * 0.12;
      wireframeRef.current.rotation.x = 0.1 + Math.sin(t * 0.05) * 0.04;
    }
    // Inner core breathing glow
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 2.5) * 0.08;
      coreRef.current.scale.set(s, s, s);
    }
    // Outer atmosphere subtle shimmer
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = -t * 0.04;
    }

    // Three orbital rings rotating independently at different speeds and angles
    if (ring1Ref.current) {
      // Golden prominent orbital ring
      ring1Ref.current.rotation.z = t * 0.22;
      ring1Ref.current.rotation.x = Math.PI / 3.2 + Math.sin(t * 0.1) * 0.05;
    }
    if (ring2Ref.current) {
      // Cyan counter-rotating ring
      ring2Ref.current.rotation.y = -t * 0.28;
      ring2Ref.current.rotation.z = Math.PI / 5.5;
    }
    if (ring3Ref.current) {
      // Amber/Gold tilted orbital ring
      ring3Ref.current.rotation.x = t * 0.16;
      ring3Ref.current.rotation.y = -Math.PI / 4 + Math.sin(t * 0.08) * 0.06;
    }

    // Swirling orbital energy particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.15;
    }

    // Reaction pulse animation when project changes
    if (globeGroupRef.current) {
      if (pulseScaleRef.current > 1) {
        pulseScaleRef.current -= 0.015;
      } else {
        pulseScaleRef.current = 1;
      }
      globeGroupRef.current.scale.set(
        scale * pulseScaleRef.current,
        scale * pulseScaleRef.current,
        scale * pulseScaleRef.current
      );
    }
  });

  return (
    <group ref={globeGroupRef} position={position}>
      {/* =================================================================== */}
      {/* 1. CORE & PLANET BODY (High-Tech Energy Planet)                     */}
      {/* =================================================================== */}
      {/* Inner Glowing Cyan/Blue Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.35} />
      </mesh>
      <pointLight color="#00f5ff" intensity={3.5} distance={10} />

      {/* Dark Blue/Black Main Sphere Surface */}
      <mesh ref={planetBodyRef} receiveShadow>
        <sphereGeometry args={[1.8, 48, 48]} />
        <meshStandardMaterial
          color="#030712"
          emissive="#021427"
          emissiveIntensity={0.6}
          roughness={0.4}
          metalness={0.85}
        />
      </mesh>

      {/* Outer Cyan Wireframe Layer */}
      <mesh ref={wireframeRef}>
        <sphereGeometry args={[1.815, 36, 36]} />
        <meshBasicMaterial
          color="#00f5ff"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Glowing Procedural Continent Clusters */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[continentPoints, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#38bdf8"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Latitude / Longitude Tech Grid Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[gridPoints, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#00f5ff"
          transparent
          opacity={0.45}
          sizeAttenuation
        />
      </points>

      {/* Transparent Outer Atmospheric Shell with Cyan Fresnel Rim Glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.92, 48, 48]} />
        <meshStandardMaterial
          color="#0284c7"
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.9}
          side={THREE.BackSide}
        />
      </mesh>

      {/* =================================================================== */}
      {/* 2. GOLDEN FUTURISTIC CITADEL / SPIRES (Top Pole of the Globe)      */}
      {/* =================================================================== */}
      <group position={[0, 1.76, 0]}>
        {spires.map((sp, idx) => (
          <group key={idx} position={[sp.x, 0, sp.z]}>
            <mesh position={[0, sp.h / 2, 0]}>
              <coneGeometry args={[sp.w, sp.h, 6]} />
              <meshStandardMaterial
                color={sp.color}
                emissive={sp.color}
                emissiveIntensity={0.4}
                metalness={0.95}
                roughness={0.15}
              />
            </mesh>
            {/* Beacon Tip Light */}
            <mesh position={[0, sp.h, 0]}>
              <sphereGeometry args={[0.025, 6, 6]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}
        {/* Top Spire Warm Beacon Light */}
        <pointLight position={[0, 1.4, 0]} color="#facc15" intensity={2.0} distance={4} />
      </group>

      {/* =================================================================== */}
      {/* 3. MULTIPLE INDEPENDENT ORBITAL RINGS (Gold & Cyan)                 */}
      {/* =================================================================== */}
      {/* Ring 1: Primary Golden Orbital Ring with Particle Beads */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.55, 0.025, 16, 96]} />
          <meshStandardMaterial
            color="#eab308"
            emissive="#facc15"
            emissiveIntensity={0.8}
            metalness={0.9}
          />
        </mesh>
        {/* Orbiting Golden Power Nodes */}
        {[0, Math.PI * 0.6, Math.PI * 1.3].map((angle, i) => (
          <mesh
            key={i}
            position={[
              2.55 * Math.cos(angle),
              2.55 * Math.sin(angle),
              0,
            ]}
          >
            <sphereGeometry args={[0.065, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>

      {/* Ring 2: Cyan Counter-Rotating Ring */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[2.95, 0.022, 16, 96]} />
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={0.9}
            metalness={0.9}
          />
        </mesh>
        {/* Orbiting Cyan Nodes */}
        {[Math.PI * 0.25, Math.PI * 1.1, Math.PI * 1.7].map((angle, i) => (
          <mesh
            key={i}
            position={[
              2.95 * Math.cos(angle),
              2.95 * Math.sin(angle),
              0,
            ]}
          >
            <sphereGeometry args={[0.055, 8, 8]} />
            <meshBasicMaterial color="#00f5ff" />
          </mesh>
        ))}
      </group>

      {/* Ring 3: Wide Amber Ring with glowing energy conduit */}
      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[3.35, 0.018, 16, 96]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#eab308"
            emissiveIntensity={0.7}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* Orbiting Dust Particles around globe */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[gridPoints, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#00f5ff"
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>

      {/* =================================================================== */}
      {/* 4. GLOWING ENERGY CONDUITS TO THE 5 SURROUNDING PROJECT WORLDS      */}
      {/* =================================================================== */}
      {projects.map((proj) => {
        const isSelected = proj.id === selectedProjectId;
        const [wx, wy, wz] = proj.world3DPosition;
        // Vector from globe center [0,0,0] to project world position
        const target = new THREE.Vector3(wx - position[0], wy - position[1], wz - position[2]);
        const start = target.clone().normalize().multiplyScalar(1.95);
        const mid = start.clone().lerp(target, 0.5).add(new THREE.Vector3(0, 0.2, 0.1));

        const curve = new THREE.QuadraticBezierCurve3(start, mid, target);
        const points = curve.getPoints(24);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <group key={proj.id}>
            {/* Energy Line */}
            <primitive object={new THREE.Line(
              lineGeo,
              new THREE.LineBasicMaterial({
                color: isSelected ? '#ffffff' : proj.themeColor,
                transparent: true,
                opacity: isSelected ? 0.95 : 0.45,
                linewidth: isSelected ? 2 : 1,
              })
            )} />

            {/* Glowing Pulse Node traveling on active connection */}
            {isSelected && (
              <mesh position={[mid.x, mid.y, mid.z]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            )}
          </group>
        );
      })}

      {/* =================================================================== */}
      {/* 5. CENTER HOLOGRAPHIC BADGE: "MY PROJECTS \n • IDEAS • CODE • IMPACT •" */}
      {/* =================================================================== */}
      <Html position={[0, 0.05, 1.88]} center distanceFactor={7.5} pointerEvents="none">
        <div className="flex flex-col items-center select-none text-center pointer-events-none">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/90 border border-cyan-400/90 shadow-[0_0_30px_rgba(0,245,255,0.7)] backdrop-blur-xl flex flex-col items-center">
            <span className="text-[13px] sm:text-[15px] font-black tracking-[0.25em] text-white font-orbitron drop-shadow-[0_0_12px_#00f5ff] whitespace-nowrap">
              MY PROJECTS
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#00f5ff]" />
              <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.2em] text-cyan-300 font-bold uppercase">
                IDEAS • CODE • IMPACT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#00f5ff]" />
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};
