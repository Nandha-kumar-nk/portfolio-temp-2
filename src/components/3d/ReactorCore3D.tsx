import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { TechIcon } from '../TechIcons';

export interface SkillNodeData {
  id: string;
  name: string;
  category: string;
  description: string;
  proficiency: string;
  tab: 'stack' | 'tools' | 'soft' | 'certs';
  color: string;
  position?: [number, number, number];
}

interface ReactorCore3DProps {
  skills: SkillNodeData[];
  selectedSkill: SkillNodeData | null;
  onSelectSkill: (skill: SkillNodeData | null) => void;
  hoveredSkillId: string | null;
  onHoverSkill: (id: string | null) => void;
  isMobileContainer?: boolean;
}

// Mobile responsive coordinate system strictly centered and contained within the mobile viewport
const MOBILE_POSITIONS: Record<string, [number, number, number]> = {
  // Tech Stack (10 nodes)
  python: [0, 1.46, 0],           // top center
  react: [-1.12, 1.02, 0.2],      // upper-left
  javascript: [1.12, 1.02, -0.2], // upper-right
  typescript: [-1.42, 0.1, 0.15], // left
  nodejs: [1.42, 0.1, -0.15],     // right
  tailwind: [-1.18, -0.78, 0.2],  // lower-left
  threejs: [1.18, -0.78, -0.2],   // lower-right
  mongodb: [-0.8, -1.36, 0.1],    // bottom-left
  aiml: [0.8, -1.36, -0.1],       // bottom-right
  git: [0, -1.46, 0],             // bottom

  // Tools & Platforms (7 nodes)
  github: [0, 1.44, 0],
  vscode: [1.22, 0.82, -0.15],
  postman: [1.34, -0.22, -0.15],
  vercel: [0.78, -1.34, -0.15],
  firebase: [-0.78, -1.34, 0.15],
  docker: [-1.34, -0.22, 0.15],
  figma: [-1.22, 0.82, 0.15],

  // Soft Skills (8 nodes)
  problem_solving: [0, 1.44, 0],
  communication: [1.14, 0.96, -0.15],
  teamwork: [1.38, 0.08, -0.15],
  leadership: [1.14, -0.82, -0.15],
  time_mgmt: [0, -1.44, 0],
  learning: [-0.82, -1.22, 0.15],
  adaptability: [-1.38, 0.08, 0.15],
  creativity: [-1.14, 0.96, 0.15],

  // Certifications (7 nodes)
  fullstack_cert: [0, 1.44, 0],
  python_cert: [1.22, 0.82, -0.15],
  cloud_cert: [1.34, -0.22, -0.15],
  genai_cert: [0.78, -1.34, -0.15],
  dsa_cert: [-0.78, -1.34, 0.15],
  security_cert: [-1.34, -0.22, 0.15],
  webgl_cert: [-1.22, 0.82, 0.15],
};

export function ReactorCore3D({
  skills,
  selectedSkill,
  onSelectSkill,
  hoveredSkillId,
  onHoverSkill,
  isMobileContainer = false,
}: ReactorCore3DProps) {
  const { width } = useThree((state) => state.size);
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  // Independent rotating component refs
  const coreRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const ring4Ref = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const orbitalBeadsRef = useRef<THREE.Points>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);

  // Center position: perfectly centered on mobile container; shifted right on desktop for left info panel
  const centerPos = useMemo<[number, number, number]>(() => {
    if (isMobileContainer) return [0, 0, 0];
    if (isMobile) return [0, 0.1, 0];
    if (isTablet) return [0.45, 0, 0];
    return [1.05, -0.05, 0];
  }, [isMobileContainer, isMobile, isTablet]);

  // Dedicated THREE.Timer API for animation timing & delta-time calculations
  const timerRef = useRef<THREE.Timer | null>(null);
  if (!timerRef.current) {
    timerRef.current = new THREE.Timer();
  }

  useEffect(() => {
    return () => {
      timerRef.current?.dispose();
    };
  }, []);

  // Base positions for each skill node around the reactor
  const nodeLayout = useMemo(() => {
    return skills.map((skill, index) => {
      if (isMobileContainer) {
        const mobPos = MOBILE_POSITIONS[skill.id] || [
          Math.cos((index / skills.length) * Math.PI * 2 - Math.PI / 2) * 1.44,
          Math.sin((index / skills.length) * Math.PI * 2 - Math.PI / 2) * 1.44,
          (index % 2 === 0 ? 0.15 : -0.15),
        ];
        return {
          skill,
          baseX: mobPos[0],
          baseY: mobPos[1],
          baseZ: mobPos[2],
          phase: index * 0.7,
        };
      }

      // Desktop layout matching original coordinates
      const defaultPos: [number, number, number] = skill.position || [
        Math.cos((index / skills.length) * Math.PI * 2) * 2.3,
        Math.sin((index / skills.length) * Math.PI * 2) * 1.8,
        0,
      ];

      // Scale layout down on tablet to fit viewport
      const scaleX = isTablet ? 0.88 : 1.0;
      const scaleY = isTablet ? 0.9 : 1.0;

      return {
        skill,
        baseX: centerPos[0] + defaultPos[0] * scaleX,
        baseY: centerPos[1] + defaultPos[1] * scaleY,
        baseZ: defaultPos[2] || 0,
        phase: index * 0.7,
      };
    });
  }, [skills, centerPos, isMobileContainer, isTablet]);

  // Frame animation loop using THREE.Timer
  useFrame(() => {
    const timer = timerRef.current!;
    timer.update();
    const delta = timer.getDelta();
    const elapsed = timer.getElapsed();

    const isInteracting = hoveredSkillId !== null || selectedSkill !== null;
    const speedMult = isInteracting ? 0.25 : 1.0;

    // 1. INNER CORE: slow clockwise rotation
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.14 * speedMult;
    }

    // 2. INNER WIRE FRAME: slow counter-clockwise rotation
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.18 * speedMult;
      wireframeRef.current.rotation.x += delta * 0.08 * speedMult;
    }

    // 3. MIDDLE RING (ring2): slow clockwise rotation
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z += delta * 0.16 * speedMult;
      ring2Ref.current.rotation.y += delta * 0.11 * speedMult;
    }

    // 4. RING 1: slow gyroscopic precession
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.13 * speedMult;
      ring1Ref.current.rotation.y += delta * 0.17 * speedMult;
    }

    // 5. OUTER RING (ring3 & ring4): very slow counter-clockwise rotation
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.09 * speedMult;
      ring3Ref.current.rotation.z -= delta * 0.07 * speedMult;
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.y -= delta * 0.06 * speedMult;
    }

    // 6. PARTICLES: slow orbital movement
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.03 * speedMult;
    }
    if (orbitalBeadsRef.current) {
      orbitalBeadsRef.current.rotation.z += delta * 0.05 * speedMult;
    }

    // 7. Subtle core pulse
    if (coreLightRef.current) {
      const pulse = 4.5 + Math.sin(elapsed * 2.4) * 0.8 + (isInteracting ? 1.2 : 0);
      coreLightRef.current.intensity = pulse;
    }
  });

  // Particle positions inside the reactor core
  const particleCount = isMobileContainer ? 40 : 120;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 0.4 + Math.random() * (isMobileContainer ? 1.0 : 1.8);
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      pos[i] = radius * Math.cos(theta) * Math.cos(phi);
      pos[i + 1] = radius * Math.sin(phi);
      pos[i + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    return pos;
  }, [particleCount, isMobileContainer]);

  // Orbital trail beads along the elliptical circuit
  const beadCount = isMobileContainer ? 18 : 36;
  const beadPositions = useMemo(() => {
    const pos = new Float32Array(beadCount * 3);
    const rx = isMobileContainer ? 1.48 : 2.45;
    const ry = isMobileContainer ? 1.48 : 1.95;
    for (let i = 0; i < beadCount; i++) {
      const angle = (i / beadCount) * Math.PI * 2;
      pos[i * 3] = rx * Math.cos(angle);
      pos[i * 3 + 1] = ry * Math.sin(angle);
      pos[i * 3 + 2] = 0.1 * Math.sin(angle * 2);
    }
    return pos;
  }, [beadCount, isMobileContainer]);

  // Elliptical circuit line geometry
  const orbitEllipseGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 96;
    const rx = isMobileContainer ? 1.48 : 2.5;
    const ry = isMobileContainer ? 1.48 : 2.0;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(rx * Math.cos(theta), ry * Math.sin(theta), 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [isMobileContainer]);

  const reactorScale = isMobileContainer ? 0.68 : (isMobile ? 0.85 : isTablet ? 1.05 : 1.25);

  return (
    <group>
      {/* 
        ========================================================================
        CENTRAL 3D REACTOR (THE HERO ~320-380px DIAMETER)
        ========================================================================
      */}
      <group position={centerPos} scale={[reactorScale, reactorScale, reactorScale]}>
        {/* Cinematic Point Lights inside Reactor */}
        <pointLight
          ref={coreLightRef}
          color="#00f5ff"
          intensity={5.5}
          distance={16}
          decay={2}
        />
        <pointLight color="#3b82f6" intensity={3.5} distance={12} position={[0, 1.5, 1]} />
        <pointLight color="#a855f7" intensity={2.2} distance={10} position={[-1, -1.2, -1]} />
        <pointLight color="#f59e0b" intensity={1.8} distance={8} position={[1.5, -0.8, 1]} />

        {/* 1. Glowing Central Energy Core */}
        <group ref={coreRef}>
          {/* Inner brilliant core */}
          <mesh>
            <sphereGeometry args={[0.55, 32, 32]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Electric cyan energy mantle */}
          <mesh>
            <sphereGeometry args={[0.82, 32, 32]} />
            <meshStandardMaterial
              color="#00f5ff"
              emissive="#00f5ff"
              emissiveIntensity={3.8}
              roughness={0.15}
              metalness={0.8}
              transparent
              opacity={0.88}
            />
          </mesh>

          {/* Outer translucent energy corona */}
          <mesh>
            <sphereGeometry args={[1.02, 24, 24]} />
            <meshStandardMaterial
              color="#0284c7"
              emissive="#00f5ff"
              emissiveIntensity={1.8}
              roughness={0.2}
              metalness={0.7}
              transparent
              opacity={0.25}
            />
          </mesh>
        </group>

        {/* 2. Crystalline Wireframe Inner Lattice Structure */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[1.16, 2]} />
          <meshBasicMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.55}
          />
        </mesh>

        {/* 3. Concentric Heavy Metallic Gimbal Rings */}
        {/* Ring 1 (Inner Gimbal Ring with Cyan Energy Strip) */}
        <group ref={ring1Ref}>
          {/* Metallic torus */}
          <mesh>
            <torusGeometry args={[1.45, 0.05, 16, 96]} />
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.92}
              roughness={0.2}
            />
          </mesh>
          {/* Glowing cyan inner energy channel */}
          <mesh>
            <torusGeometry args={[1.45, 0.02, 12, 96]} />
            <meshBasicMaterial color="#00f5ff" />
          </mesh>
          {/* Gold pivot bearing mounts */}
          <mesh position={[1.45, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.12, 12]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.15} />
          </mesh>
          <mesh position={[-1.45, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.12, 12]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>

        {/* Ring 2 (Middle Gimbal Ring tilted ~40 degrees with Blue/Cyan Strip) */}
        <group ref={ring2Ref} rotation={[Math.PI / 4.2, Math.PI / 6, 0]}>
          {/* Metallic torus */}
          <mesh>
            <torusGeometry args={[1.72, 0.055, 16, 96]} />
            <meshStandardMaterial
              color="#1e293b"
              metalness={0.95}
              roughness={0.18}
            />
          </mesh>
          {/* Glowing cyan channel */}
          <mesh>
            <torusGeometry args={[1.72, 0.022, 12, 96]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={3.2}
              metalness={0.9}
            />
          </mesh>
          {/* Accent pivot blocks */}
          <mesh position={[0, 1.72, 0]}>
            <boxGeometry args={[0.1, 0.12, 0.12]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, -1.72, 0]}>
            <boxGeometry args={[0.1, 0.12, 0.12]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Ring 3 (Outer Diagonal Ring with Gold & Violet Accents) */}
        <group ref={ring3Ref} rotation={[-Math.PI / 3.2, Math.PI / 4, 0]}>
          {/* Metallic torus */}
          <mesh>
            <torusGeometry args={[1.98, 0.048, 16, 96]} />
            <meshStandardMaterial
              color="#090d16"
              metalness={0.9}
              roughness={0.25}
            />
          </mesh>
          {/* Glowing violet/cyan energy track */}
          <mesh>
            <torusGeometry args={[1.98, 0.018, 12, 96]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={2.8}
            />
          </mesh>
          {/* Gold pivot cylinders */}
          <mesh position={[1.98, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.12, 12]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[-1.98, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.12, 12]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Ring 4 (Exterior Stabilizer Ring) */}
        <group ref={ring4Ref} rotation={[0.2, -0.4, 0.1]}>
          <mesh>
            <torusGeometry args={[2.22, 0.035, 16, 96]} />
            <meshStandardMaterial
              color="#0284c7"
              emissive="#00f5ff"
              emissiveIntensity={1.9}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Subtle Swarm of Floating Energy Particles */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.038}
            color="#00f5ff"
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      {/* 
        ========================================================================
        ELEGANT ORBITAL CIRCUITS & TRAVELING ENERGY BEADS
        ========================================================================
      */}
      <group position={centerPos}>
        {/* Visual orbital guide ellipse */}
        {/* @ts-ignore */}
        <line geometry={orbitEllipseGeometry}>
          <lineBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.22}
          />
        </line>

        {/* Tiny traveling energy beads along orbital circuit */}
        <points ref={orbitalBeadsRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[beadPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.045}
            color="#38bdf8"
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      {/* 
        ========================================================================
        ORBITING TECHNOLOGY NODES (CIRCULAR GLOWING HOLOGRAPHIC ORBS)
        MATCHING THE EXACT DESIGN AND SPATIAL ARRANGEMENT OF THE REFERENCE IMAGE
        ========================================================================
      */}
      {nodeLayout.map((item) => (
        <SkillNodeItem
          key={item.skill.id}
          skill={item.skill}
          baseX={item.baseX}
          baseY={item.baseY}
          baseZ={item.baseZ}
          phase={item.phase}
          centerPos={centerPos}
          isSelected={selectedSkill?.id === item.skill.id}
          isHovered={hoveredSkillId === item.skill.id}
          onSelectSkill={onSelectSkill}
          onHoverSkill={onHoverSkill}
          isMobileContainer={isMobileContainer}
        />
      ))}
    </group>
  );
}

interface SkillNodeItemProps {
  skill: SkillNodeData;
  baseX: number;
  baseY: number;
  baseZ: number;
  phase: number;
  centerPos: [number, number, number];
  isSelected: boolean;
  isHovered: boolean;
  onSelectSkill: (skill: SkillNodeData | null) => void;
  onHoverSkill: (id: string | null) => void;
  isMobileContainer?: boolean;
}

function SkillNodeItem({
  skill,
  baseX,
  baseY,
  baseZ,
  phase,
  centerPos,
  isSelected,
  isHovered,
  onSelectSkill,
  onHoverSkill,
  isMobileContainer = false,
}: SkillNodeItemProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const elapsed = clock.getElapsedTime();
    const bob = Math.sin(elapsed * 1.4 + phase) * 0.06;
    const driftX = Math.cos(elapsed * 0.8 + phase) * 0.04;
    const zOffset = isSelected ? 0.7 : isHovered ? 0.5 : 0;

    groupRef.current.position.set(
      baseX + driftX,
      baseY + bob,
      baseZ + zOffset
    );
  });

  const lineGeometry = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(centerPos[0] - baseX, centerPos[1] - baseY, -baseZ),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [centerPos, baseX, baseY, baseZ]);

  return (
    <group ref={groupRef} position={[baseX, baseY, baseZ]}>
      {/* Subtle radial energy connector line to reactor core */}
      {/* @ts-ignore */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial
          color={skill.color}
          transparent
          opacity={isSelected ? 0.55 : isHovered ? 0.35 : 0.08}
        />
      </line>

      {/* Circular Glowing Holographic Node in React HTML */}
      <Html center distanceFactor={isMobileContainer ? 7.6 : 8.4} zIndexRange={[isHovered || isSelected ? 80 : 20, 0]}>
        <div className="flex flex-col items-center select-none pointer-events-auto">
          <button
            id={`skill-node-${skill.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectSkill(isSelected ? null : skill);
            }}
            onMouseEnter={() => onHoverSkill(skill.id)}
            onMouseLeave={() => onHoverSkill(null)}
            className={`group relative flex flex-col items-center transition-all duration-300 cursor-pointer ${
              isSelected ? 'scale-115' : isHovered ? 'scale-110' : 'scale-100 hover:scale-105'
            }`}
            title={`${skill.name} • ${skill.category}`}
          >
            {/* Glowing Circular Orb */}
            <div
              className={`rounded-full flex items-center justify-center backdrop-blur-xl border-2 transition-all duration-300 ${
                isMobileContainer ? 'w-9 h-9 sm:w-10 sm:h-10' : 'w-13 h-13 sm:w-14 sm:h-14'
              } ${
                isSelected
                  ? 'bg-slate-950/95 ring-4'
                  : isHovered
                  ? 'bg-slate-900/90'
                  : 'bg-slate-950/85 hover:bg-slate-900/85'
              }`}
              style={{
                borderColor: skill.color,
                boxShadow: isSelected
                  ? `0 0 35px ${skill.color}, 0 0 15px ${skill.color} inset`
                  : isHovered
                  ? `0 0 26px ${skill.color}, 0 0 10px ${skill.color} inset`
                  : `0 0 14px ${skill.color}66`,
              }}
            >
              <TechIcon
                id={skill.id}
                className={isMobileContainer ? 'w-4.5 h-4.5 sm:w-5 sm:h-5 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]' : 'w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'}
              />
            </div>

            {/* Technology Name */}
            <span
              className={`font-orbitron font-bold text-slate-100 tracking-wide text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] whitespace-nowrap ${
                isMobileContainer ? 'text-[9.5px] sm:text-[10px] mt-1' : 'text-xs sm:text-[13px] mt-1.5'
              }`}
              style={{
                textShadow: isSelected || isHovered ? `0 0 12px ${skill.color}` : 'none',
              }}
            >
              {skill.name}
            </span>

            {/* Category / Role Subtitle */}
            <span
              className={`font-mono-code text-cyan-300/85 tracking-wider text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] whitespace-nowrap mt-0.5 ${
                isMobileContainer ? 'text-[7.5px] sm:text-[8px]' : 'text-[9px] sm:text-[9.5px]'
              }`}
            >
              {skill.category}
            </span>
          </button>
        </div>
      </Html>
    </group>
  );
}
