import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Code2, Lightbulb, Box, Cpu, Rocket, Target } from 'lucide-react';
import { generateEarthTextures, latLonToVector3 } from '../../utils/earthTexture';
import { isWebGLAvailable } from '../../utils/webgl';
import { WebGLErrorBoundary, WebGLCosmicFallback } from '../WebGLErrorBoundary';

export interface HomeGlobeCanvasProps {
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
  isTransitioning?: boolean;
  isExploring?: boolean;
  onExploreComplete?: () => void;
}

// ============================================================================
// 1. DELICATE CONTINENTAL POINT CLOUD
// ============================================================================
function ContinentalPointCloud({ radius }: { radius: number }) {
  const { positions, colors } = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const continentalCenters = [
      { lat: 42, lon: -100, spread: 26 }, // North America
      { lat: -14, lon: -58, spread: 22 }, // South America
      { lat: 50, lon: 18, spread: 20 },   // Europe
      { lat: 8, lon: 24, spread: 26 },    // Africa
      { lat: 46, lon: 86, spread: 30 },   // Asia
      { lat: 22, lon: 78, spread: 16 },   // India
      { lat: -24, lon: 134, spread: 18 }, // Australia
      { lat: 14, lon: 104, spread: 14 },  // SE Asia
      { lat: 36, lon: 138, spread: 10 },  // Japan
    ];

    for (let i = 0; i < count; i++) {
      let lat = 0;
      let lon = 0;

      if (Math.random() < 0.88) {
        const center = continentalCenters[i % continentalCenters.length];
        lat = center.lat + (Math.random() - 0.5) * center.spread * 1.2;
        lon = center.lon + (Math.random() - 0.5) * center.spread * 1.4;
      } else {
        lat = (Math.random() - 0.5) * 130;
        lon = (Math.random() - 0.5) * 360;
      }

      const v = latLonToVector3(lat, lon, radius + 0.005 + Math.random() * 0.005);
      pos[i * 3] = v.x;
      pos[i * 3 + 1] = v.y;
      pos[i * 3 + 2] = v.z;

      const pick = Math.random();
      if (pick > 0.95) {
        col[i * 3] = 0.90; col[i * 3 + 1] = 0.98; col[i * 3 + 2] = 1.0;
      } else if (pick > 0.82) {
        col[i * 3] = 0.086; col[i * 3 + 1] = 0.545; col[i * 3 + 2] = 1.0;
      } else {
        col[i * 3] = 0.0; col[i * 3 + 1] = 0.898; col[i * 3 + 2] = 1.0;
      }
    }

    return { positions: pos, colors: col };
  }, [radius]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.016}
        vertexColors
        transparent
        opacity={0.50}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ============================================================================
// 2. THE SIX PLANETARY ORBITAL NODES AROUND THE EARTH GLOBE
// ============================================================================
interface PlanetaryNodeConfig {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  initialAngle: number;
}

const PLANETARY_NODES_CONFIG: PlanetaryNodeConfig[] = [
  // 6 Synchronized Nodes maintaining constant 60° (Math.PI / 3) angular spacing
  {
    id: 'develop',
    label: 'DEVELOP',
    Icon: Code2,
    initialAngle: Math.PI / 2,         // Top Center (90°)
  },
  {
    id: 'build',
    label: 'BUILD',
    Icon: Box,
    initialAngle: Math.PI / 6,         // Upper Right (30°)
  },
  {
    id: 'innovate',
    label: 'INNOVATE',
    Icon: Rocket,
    initialAngle: -Math.PI / 6,        // Lower Right (330°)
  },
  {
    id: 'impact',
    label: 'IMPACT',
    Icon: Target,
    initialAngle: (3 * Math.PI) / 2,   // Bottom Center (270°)
  },
  {
    id: 'ai',
    label: 'AI',
    Icon: Cpu,
    initialAngle: (7 * Math.PI) / 6,   // Lower Left (210°)
  },
  {
    id: 'ideas',
    label: 'IDEAS',
    Icon: Lightbulb,
    initialAngle: (5 * Math.PI) / 6,   // Upper Left (150°)
  },
];

interface SixOrbitalNodesProps {
  globeRadius: number;
  isMobile: boolean;
  prefersReducedMotion?: boolean;
  isExploring?: boolean;
}

function SixOrbitalNodes({
  globeRadius,
  isMobile,
  prefersReducedMotion,
  isExploring,
}: SixOrbitalNodesProps) {
  const nodeRefs = useRef<(THREE.Group | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Single elliptical orbit dimensions
  const rx = globeRadius * (isMobile ? 1.65 : 1.90);
  const ry = globeRadius * (isMobile ? 1.15 : 1.25);
  const rz = globeRadius * 0.40;

  useFrame((state) => {
    const timeScale = (prefersReducedMotion ? 0.3 : 1.0) * (isExploring ? 2.5 : 1.0);
    const t = state.clock.elapsedTime * timeScale;
    const speed = 0.008; // Very slow cinematic planet-like orbit

    PLANETARY_NODES_CONFIG.forEach((config, idx) => {
      const group = nodeRefs.current[idx];
      if (!group) return;

      const currentAngle = config.initialAngle + t * speed;

      // Elliptical 3D orbital trajectory
      const x = Math.cos(currentAngle) * rx;
      const y = Math.sin(currentAngle) * ry;
      const z = Math.sin(currentAngle) * rz;

      group.position.set(x, y, z);

      // Depth occlusion when passing behind Earth
      const cardEl = cardRefs.current[idx];
      if (cardEl) {
        const isBehind = z < -0.05 && Math.abs(x) < globeRadius * 1.1;
        cardEl.style.opacity = isBehind ? '0.40' : '1.0';
        cardEl.style.filter = isBehind ? 'blur(0.5px)' : 'none';
      }
    });
  });

  return (
    <group>
      {PLANETARY_NODES_CONFIG.map((node, idx) => {
        const Icon = node.Icon;
        return (
          <group key={node.id} ref={(el) => { nodeRefs.current[idx] = el; }}>
            <Html
              center
              style={{
                pointerEvents: 'auto',
                userSelect: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <div
                ref={(el) => { cardRefs.current[idx] = el; }}
                className="group flex flex-col items-center justify-center cursor-default transition-all duration-300 hover:scale-110"
              >
                {/* LABEL ABOVE ICON */}
                <span className="font-mono-code text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.6)] group-hover:text-white transition-colors mb-1 uppercase">
                  {node.label}
                </span>

                {/* CIRCULAR DARK GLASS ICON CONTAINER */}
                <div className="relative flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 rounded-full border border-[#00E5FF]/80 bg-[#02121F]/90 backdrop-blur-md shadow-[0_0_12px_rgba(0,229,255,0.4)] group-hover:shadow-[0_0_24px_rgba(0,229,255,0.85)] group-hover:border-white transition-all duration-300">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00E5FF] group-hover:text-white transition-colors" />
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

// ============================================================================
// 3. MAIN COSMIC GLOBE WITH SINGLE PRIMARY ORBIT
// ============================================================================
interface GlobeProps {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  isExploring?: boolean;
}

function MainCosmicGlobe({ isMobile, prefersReducedMotion, isExploring }: GlobeProps) {
  const mainGroupRef = useRef<THREE.Group>(null);
  const globeGroupRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const outerCoronaRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const globeMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // High-resolution procedural Earth maps
  const { diffuseMap, emissiveMap } = useMemo(() => {
    return generateEarthTextures(isMobile);
  }, [isMobile]);

  // Animation frame loop
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * (prefersReducedMotion ? 0.3 : 1.0);
    const rotSpeed = (prefersReducedMotion ? 0.02 : 0.05) * (isExploring ? 2.5 : 1.0);

    // Continuous ultra-slow celestial axial rotation
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * rotSpeed;
    }

    // Subtle atmospheric pulsing
    if (atmosphereRef.current) {
      const pulse = 1.0 + (isExploring ? 0.10 : Math.sin(t * 1.5) * 0.015);
      atmosphereRef.current.scale.set(pulse, pulse, pulse);
    }
    if (outerCoronaRef.current) {
      const coronaPulse = 1.0 + (isExploring ? 0.18 : Math.cos(t * 1.2) * 0.02);
      outerCoronaRef.current.scale.set(coronaPulse, coronaPulse, coronaPulse);
    }

    // Brightness surge during explore transition
    if (globeMaterialRef.current) {
      const targetEmissive = isExploring ? 2.2 : 1.0;
      globeMaterialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        globeMaterialRef.current.emissiveIntensity,
        targetEmissive,
        delta * 3.0
      );
    }

    // Subtle mouse parallax for the entire planetary system on desktop
    if (mainGroupRef.current && !isMobile) {
      const targetRotX = mouseRef.current.y * 0.04;
      const targetRotY = mouseRef.current.x * 0.06;
      mainGroupRef.current.rotation.x = THREE.MathUtils.lerp(mainGroupRef.current.rotation.x, targetRotX, 0.05);
      mainGroupRef.current.rotation.y = THREE.MathUtils.lerp(mainGroupRef.current.rotation.y, targetRotY, 0.05);
    }
  });

  const globeRadius = isMobile ? 0.235 : 0.355;
  const rx = globeRadius * (isMobile ? 1.65 : 1.90);
  const ry = globeRadius * (isMobile ? 1.15 : 1.25);

  return (
    <group ref={mainGroupRef} position={[0, isMobile ? 0.44 : 0.55, 0]}>
      {/* ----------------------------------------------------------------- */}
      {/* A. ROTATING FLAT HOLOGRAPHIC DIGITAL EARTH GLOBE BODY              */}
      {/* ----------------------------------------------------------------- */}
      <group ref={globeGroupRef} rotation={[0, 0, 0]}>
        {/* 1. Inner Luminous Core (Dark Navy Core) */}
        <mesh>
          <sphereGeometry args={[globeRadius * 0.88, 32, 32]} />
          <meshBasicMaterial
            color="#02121F"
            transparent
            opacity={0.92}
          />
        </mesh>

        {/* 2. Dark Earth Sphere with Continents & Technology Lights */}
        <mesh receiveShadow castShadow>
          <sphereGeometry args={[globeRadius, 48, 48]} />
          <meshStandardMaterial
            ref={globeMaterialRef}
            map={diffuseMap}
            emissiveMap={emissiveMap}
            emissive="#00e5ff"
            emissiveIntensity={0.80}
            roughness={0.50}
            metalness={0.10}
          />
        </mesh>

        {/* 3. Clean Continental Point Cloud */}
        <ContinentalPointCloud radius={globeRadius} />

        {/* 4. Delicate Digital Wireframe Grid */}
        <mesh>
          <sphereGeometry args={[globeRadius + 0.003, 24, 24]} />
          <meshBasicMaterial
            color="#00E5FF"
            wireframe
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* 5. Thin Atmosphere Edge (#168BFF) */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[globeRadius + 0.015, 32, 32]} />
          <meshBasicMaterial
            color="#168BFF"
            transparent
            opacity={isExploring ? 0.28 : 0.14}
            blending={THREE.AdditiveBlending}
            side={THREE.FrontSide}
          />
        </mesh>
      </group>

      {/* ----------------------------------------------------------------- */}
      {/* B. SUBTLE ATMOSPHERIC CORONA GLOW (BackSide)                      */}
      {/* ----------------------------------------------------------------- */}
      <mesh ref={outerCoronaRef}>
        <sphereGeometry args={[globeRadius + 0.03, 32, 32]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={isExploring ? 0.22 : 0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* ----------------------------------------------------------------- */}
      {/* C. ONE PRIMARY PLANETARY ORBITAL RING                             */}
      {/* ----------------------------------------------------------------- */}
      <group scale={[rx, ry, 1]}>
        <mesh ref={ringRef} rotation={[Math.PI / 2.3, 0, 0]}>
          <torusGeometry args={[1, 0.0018, 16, 128]} />
          <meshBasicMaterial
            color="#00E5FF"
            transparent
            opacity={isExploring ? 0.75 : 0.45}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Subtle secondary outer line for visual richness */}
        <mesh ref={ring2Ref} scale={[1.04, 1.04, 1]} rotation={[Math.PI / 2.3, 0, 0]}>
          <torusGeometry args={[1, 0.001, 16, 128]} />
          <meshBasicMaterial
            color="#168BFF"
            transparent
            opacity={isExploring ? 0.40 : 0.18}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* ----------------------------------------------------------------- */}
      {/* D. THE 6 ORBITAL NODES (DEVELOP, BUILD, INNOVATE, IMPACT, AI, IDEAS) */}
      {/* ----------------------------------------------------------------- */}
      <SixOrbitalNodes
        globeRadius={globeRadius}
        isMobile={isMobile}
        prefersReducedMotion={prefersReducedMotion}
        isExploring={isExploring}
      />
    </group>
  );
}

// ============================================================================
// 4. RADIAL EXPLORE BURST PARTICLES & SHOCKWAVE
// ============================================================================
function ExploreBurst({ active }: { active?: boolean }) {
  const shockwaveRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const { burstDirs, burstPositions } = useMemo(() => {
    const count = 36;
    const dirs: THREE.Vector3[] = [];
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random());
      const sinPhi = Math.sin(phi);

      const dir = new THREE.Vector3(
        r * sinPhi * Math.cos(theta),
        r * sinPhi * Math.sin(theta),
        r * Math.cos(phi)
      ).normalize();

      dirs.push(dir);
      pos[i * 3] = dir.x * 1.25;
      pos[i * 3 + 1] = dir.y * 1.25;
      pos[i * 3 + 2] = dir.z * 1.25;
    }

    return { burstDirs: dirs, burstPositions: pos };
  }, []);

  useFrame((_, delta) => {
    if (!active) return;

    if (shockwaveRef.current) {
      shockwaveRef.current.scale.addScalar(delta * 4.2);
      const mat = shockwaveRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, mat.opacity - delta * 1.2);
    }

    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      burstDirs.forEach((dir, i) => {
        posArr[i * 3] += dir.x * delta * 3.5;
        posArr[i * 3 + 1] += dir.y * delta * 3.5;
        posArr[i * 3 + 2] += dir.z * delta * 3.5;
      });
      posAttr.needsUpdate = true;
    }
  });

  if (!active) return null;

  return (
    <group>
      <mesh ref={shockwaveRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.025, 16, 64]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[burstPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.050}
          color="#ffffff"
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// ============================================================================
// 5. UNIFIED SCENE RIG
// ============================================================================
function SceneRig({
  isMobile,
  prefersReducedMotion,
  isExploring,
}: {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  isExploring?: boolean;
}) {
  const sceneRootRef = useRef<THREE.Group>(null);
  const pointerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: PointerEvent) => {
      pointerPosRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [isMobile]);

  useFrame((_, delta) => {
    if (sceneRootRef.current && !isMobile) {
      const targetTiltX = -pointerPosRef.current.y * 0.05;
      const targetTiltY = pointerPosRef.current.x * 0.08;

      sceneRootRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneRootRef.current.rotation.x,
        targetTiltX,
        delta * 2.0
      );
      sceneRootRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneRootRef.current.rotation.y,
        targetTiltY,
        delta * 2.0
      );
    }
  });

  return (
    <group ref={sceneRootRef}>
      <MainCosmicGlobe
        isMobile={isMobile}
        prefersReducedMotion={prefersReducedMotion}
        isExploring={isExploring}
      />
      <ExploreBurst active={isExploring} />
    </group>
  );
}

// ============================================================================
// 6. MAIN EXPORTED COMPONENT
// ============================================================================
export const HomeGlobeCanvas: React.FC<HomeGlobeCanvasProps> = ({
  isMobile = false,
  prefersReducedMotion = false,
  isExploring = false,
}) => {
  const [webglSupported, setWebglSupported] = React.useState<boolean>(() => isWebGLAvailable());

  React.useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  if (!webglSupported) {
    return (
      <div
        id="home-3d-globe-wrapper"
        className="w-full h-full relative pointer-events-auto select-none overflow-hidden"
      >
        <WebGLCosmicFallback />
      </div>
    );
  }

  return (
    <div
      id="home-3d-globe-wrapper"
      className="w-full h-full relative pointer-events-auto select-none overflow-hidden"
    >
      <WebGLErrorBoundary fallback={<WebGLCosmicFallback />} name="HomeGlobeCanvas">
        <Canvas
          camera={{ position: [0, 0, 4.1], fov: 45 }}
          dpr={isMobile ? [1, 1.2] : [1, 1.5]}
          onCreated={({ gl }) => {
            const handleContextLost = (e: Event) => {
              e.preventDefault();
              console.warn('[HomeGlobeCanvas] WebGL context lost.');
            };
            gl.domElement.addEventListener('webglcontextlost', handleContextLost, false);
          }}
          gl={{
            alpha: true,
            antialias: !isMobile,
            powerPreference: isMobile ? 'low-power' : 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.35,
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Futuristic Studio Lighting */}
          <ambientLight intensity={0.8} color="#041C2E" />
          <pointLight position={[0, 1.8, 3.8]} intensity={3.0} color="#00E5FF" />
          <directionalLight position={[-3.8, 2.5, 2.2]} intensity={2.0} color="#168BFF" />
          <pointLight position={[3.6, -1.5, 2.0]} intensity={1.5} color="#7C5CFF" />
          <pointLight position={[0, -2.4, 1.4]} intensity={2.2} color="#00E5FF" />

          {/* Scene Rig */}
          <SceneRig
            isMobile={isMobile}
            prefersReducedMotion={prefersReducedMotion}
            isExploring={isExploring}
          />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};
