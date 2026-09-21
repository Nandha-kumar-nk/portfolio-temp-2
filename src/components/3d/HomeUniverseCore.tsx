import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Code2, Box, Lightbulb, Cog, Target } from 'lucide-react';
import * as THREE from 'three';
import { GlowingPlatform } from './GlowingPlatform';
import { FloatingAsteroids } from './FloatingAsteroids';

interface HomeUniverseCoreProps {
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
  qualityTier?: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface ConceptNodeData {
  id: string;
  name: string;
  icon: 'code' | 'box' | 'lightbulb' | 'cog' | 'target';
  pos: [number, number, number];
  layout: 'icon-first' | 'label-first';
  orbitSpeed: number;
  orbitPhase: number;
  connectionTarget: [number, number, number];
}

export function HomeUniverseCore({
  isMobile = false,
  prefersReducedMotion = false,
  qualityTier = 'HIGH',
}: HomeUniverseCoreProps) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringsGroupRef = useRef<THREE.Group>(null);
  const pointerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Track pointer for subtle interactive globe tilt
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      pointerPosRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  // Soft circular glowing particle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(125, 230, 255, 0.85)');
    gradient.addColorStop(0.65, 'rgba(6, 182, 212, 0.35)');
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Continental coordinate nodes
  const { continentPositions, continentColors } = useMemo(() => {
    const pointCount = qualityTier === 'LOW' ? 220 : qualityTier === 'MEDIUM' ? 340 : 460;
    const pos = new Float32Array(pointCount * 3);
    const col = new Float32Array(pointCount * 3);

    const continentalCenters = [
      { lat: 40, lon: -100, spread: 28 },
      { lat: -15, lon: -60, spread: 24 },
      { lat: 50, lon: 15, spread: 20 },
      { lat: 5, lon: 25, spread: 28 },
      { lat: 45, lon: 85, spread: 35 },
      { lat: -25, lon: 135, spread: 18 },
      { lat: 25, lon: 55, spread: 16 },
    ];

    const globeR = 1.88;

    for (let i = 0; i < pointCount; i++) {
      let lat = 0;
      let lon = 0;

      if (Math.random() < 0.85) {
        const center = continentalCenters[i % continentalCenters.length];
        lat = center.lat + (Math.random() - 0.5) * center.spread * 1.1;
        lon = center.lon + (Math.random() - 0.5) * center.spread * 1.4;
      } else {
        lat = (Math.random() - 0.5) * 140;
        lon = (Math.random() - 0.5) * 360;
      }

      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const r = globeR + (Math.random() - 0.5) * 0.02;

      pos[i * 3] = -r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const pick = Math.random();
      if (pick > 0.85) {
        // Bright edge highlight (#B8F7FF)
        col[i * 3] = 0.72; col[i * 3 + 1] = 0.97; col[i * 3 + 2] = 1.0;
      } else if (pick > 0.5) {
        // Primary Electric Cyan (#00D9FF)
        col[i * 3] = 0.0; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 1.0;
      } else if (pick > 0.2) {
        // Vibrant Light Blue (#38BDF8)
        col[i * 3] = 0.22; col[i * 3 + 1] = 0.74; col[i * 3 + 2] = 0.97;
      } else {
        // Cyan Highlight (#7DEBFF)
        col[i * 3] = 0.49; col[i * 3 + 1] = 0.92; col[i * 3 + 2] = 1.0;
      }
    }

    return { continentPositions: pos, continentColors: col };
  }, [qualityTier]);

  // 5 Concept Nodes arrangement surrounding the compact globe:
  // BUILD (Top, clearly visible below navbar), DEVELOP (Upper-Left), INNOVATE (Upper-Right),
  // IDEAS (Lower-Left), IMPACT (Lower-Right)
  const conceptNodes: ConceptNodeData[] = useMemo(() => [
    {
      id: 'build',
      name: 'BUILD',
      icon: 'box',
      pos: [isMobile ? 0.15 : 0.28, isMobile ? 1.35 : 1.55, 0.25],
      layout: 'icon-first',
      orbitSpeed: 0.15,
      orbitPhase: 0.2,
      connectionTarget: [0.2, 1.0, 0.1],
    },
    {
      id: 'develop',
      name: 'DEVELOP',
      icon: 'code',
      pos: [isMobile ? -1.65 : -2.15, isMobile ? 0.55 : 0.65, 0.35],
      layout: 'label-first',
      orbitSpeed: 0.18,
      orbitPhase: 1.4,
      connectionTarget: [-1.0, 0.45, 0.1],
    },
    {
      id: 'innovate',
      name: 'INNOVATE',
      icon: 'lightbulb',
      pos: [isMobile ? 1.65 : 2.15, isMobile ? 0.35 : 0.45, 0.35],
      layout: 'icon-first',
      orbitSpeed: 0.16,
      orbitPhase: 2.8,
      connectionTarget: [1.0, 0.35, 0.1],
    },
    {
      id: 'ideas',
      name: 'IDEAS',
      icon: 'cog',
      pos: [isMobile ? -1.45 : -1.85, isMobile ? -0.55 : -0.65, 0.35],
      layout: 'label-first',
      orbitSpeed: 0.2,
      orbitPhase: 4.1,
      connectionTarget: [-0.9, -0.4, 0.1],
    },
    {
      id: 'impact',
      name: 'IMPACT',
      icon: 'target',
      pos: [isMobile ? 1.45 : 1.75, isMobile ? -0.65 : -0.75, 0.35],
      layout: 'icon-first',
      orbitSpeed: 0.17,
      orbitPhase: 5.3,
      connectionTarget: [0.85, -0.45, 0.1],
    },
  ], [isMobile]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * (prefersReducedMotion ? 0.3 : 1.0);

    // Continuous slow majestic globe rotation
    if (globeGroupRef.current) {
      const targetRotationY = globeGroupRef.current.rotation.y + delta * (prefersReducedMotion ? 0.05 : 0.12);
      const targetTiltX = -pointerPosRef.current.y * 0.06;
      const targetTiltZ = pointerPosRef.current.x * 0.05;

      globeGroupRef.current.rotation.y = targetRotationY;
      globeGroupRef.current.rotation.x = THREE.MathUtils.lerp(globeGroupRef.current.rotation.x, targetTiltX, delta * 1.5);
      globeGroupRef.current.rotation.z = THREE.MathUtils.lerp(globeGroupRef.current.rotation.z, targetTiltZ, delta * 1.5);
    }

    if (coreRef.current) {
      const pulse = 1.0 + (prefersReducedMotion ? 0 : Math.sin(t * 1.5) * 0.025);
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    if (atmosphereRef.current) {
      const atmosPulse = 1.0 + (prefersReducedMotion ? 0 : Math.cos(t * 1.1) * 0.018);
      atmosphereRef.current.scale.set(atmosPulse, atmosPulse, atmosPulse);
    }

    if (ringsGroupRef.current) {
      ringsGroupRef.current.rotation.z += delta * (prefersReducedMotion ? 0.012 : 0.035);
      ringsGroupRef.current.rotation.y = Math.sin(t * 0.25) * 0.04;
    }
  });

  // Proportional sizing matching Visual Reference:
  // Compact globe in upper-middle hero region (approx 220-280px visual diameter)
  const globeScale = isMobile ? 0.32 : 0.40;
  const globePosition: [number, number, number] = [0, isMobile ? 0.72 : 0.85, 0];
  const platformY = isMobile ? -1.05 : -1.2;

  return (
    <group position={globePosition}>
      {/* 1. Subtle Proportional Glowing Pedestal Platform beneath the Globe */}
      <GlowingPlatform
        position={[0, platformY, 0]}
        isMobile={isMobile}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* 2. Floating Peripheral Crystal Fragments (Clean, non-intrusive) */}
      <FloatingAsteroids
        count={qualityTier === 'LOW' ? 3 : qualityTier === 'MEDIUM' ? 6 : 8}
        isMobile={isMobile}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* 3. The Central Rotating Universe Globe Core */}
      <group ref={globeGroupRef} scale={[globeScale, globeScale, globeScale]}>
        {/* A. Deep Inner Electric Blue Body (#0878D1 + #00D9FF glow) */}
        <mesh>
          <sphereGeometry args={[1.84, 36, 36]} />
          <meshStandardMaterial
            color="#0878D1"
            roughness={0.3}
            metalness={0.65}
            transparent
            opacity={0.85}
            emissive="#00D9FF"
            emissiveIntensity={0.55}
          />
        </mesh>

        {/* B. Inner Luminous Core (Electric Blue Glow #0878D1 / #00D9FF) */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[1.48, 32, 32]} />
          <meshBasicMaterial
            color="#0878D1"
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* C. Cyber Continents / Soft Circular Glowing Landmass Points */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[continentPositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[continentColors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={isMobile ? 0.05 : 0.065}
            vertexColors
            transparent
            opacity={1.0}
            map={particleTexture || undefined}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        {/* D. Bright Cyan Holographic Longitude & Latitude Wireframe Grid (#00D9FF / #38BDF8) */}
        <mesh>
          <sphereGeometry args={[1.94, 28, 28]} />
          <meshBasicMaterial
            color="#00D9FF"
            wireframe
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* E. Atmospheric Volumetric Glow Shield (Soft Light Cyan #38BDF8) */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[2.15, 32, 32]} />
          <meshBasicMaterial
            color="#38BDF8"
            transparent
            opacity={0.32}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* F. Slender 3-Orbit System around the Globe (#00D9FF / #5CEFFF) */}
        <group ref={ringsGroupRef}>
          {/* Orbit Ring 1 - Slender Primary Cyan Orbit */}
          <group rotation={[Math.PI / 6, 0, 0]}>
            <mesh>
              <torusGeometry args={[2.35, 0.008, 16, 128]} />
              <meshBasicMaterial
                color="#00d9ff"
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            {/* Satellite 1 */}
            <mesh position={[2.35, 0, 0]}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshBasicMaterial color="#f5fcff" blending={THREE.AdditiveBlending} />
            </mesh>
          </group>

          {/* Orbit Ring 2 - Sky Blue Secondary Orbit (-35 deg tilt) */}
          <group rotation={[-Math.PI / 4.5, Math.PI / 6.5, 0]}>
            <mesh>
              <torusGeometry args={[2.75, 0.007, 16, 128]} />
              <meshBasicMaterial
                color="#19e6ff"
                transparent
                opacity={0.65}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            {/* Satellite 2 */}
            <mesh position={[-2.75, 0, 0]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshBasicMaterial color="#5cefff" blending={THREE.AdditiveBlending} />
            </mesh>
          </group>

          {/* Orbit Ring 3 - Faint outer subtle halo orbit */}
          <group rotation={[Math.PI / 3.5, -Math.PI / 5, 0]}>
            <mesh>
              <torusGeometry args={[3.15, 0.006, 16, 128]} />
              <meshBasicMaterial
                color="#168bff"
                transparent
                opacity={0.45}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        </group>
      </group>

      {/* 4. Delicate Connection Lines linking Nodes to Orbital Hub */}
      <group>
        {conceptNodes.map((node) => (
          <OrbitalConnectionLine
            key={`line-${node.id}`}
            startPos={node.pos}
            endPos={node.connectionTarget}
            isHovered={hoveredNodeId === node.id}
          />
        ))}
      </group>

      {/* 5. The 5 Orbital Concept Nodes (BUILD, DEVELOP, INNOVATE, IDEAS, IMPACT) */}
      <group>
        {conceptNodes.map((node) => (
          <ConceptOrbitalNode
            key={node.id}
            node={node}
            isMobile={isMobile}
            prefersReducedMotion={prefersReducedMotion}
            isHovered={hoveredNodeId === node.id}
            onHover={(hover) => setHoveredNodeId(hover ? node.id : null)}
          />
        ))}
      </group>
    </group>
  );
}

// Subcomponent for delicate glowing connection line from orbital system to each node
function OrbitalConnectionLine({
  startPos,
  endPos,
  isHovered,
}: {
  startPos: [number, number, number];
  endPos: [number, number, number];
  isHovered: boolean;
}) {
  const lineGeom = useMemo(() => {
    const points = [
      new THREE.Vector3(...startPos),
      new THREE.Vector3(...endPos),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [startPos, endPos]);

  return (
    <line geometry={lineGeom}>
      <lineBasicMaterial
        color={isHovered ? '#f5fcff' : '#00d9ff'}
        transparent
        opacity={isHovered ? 0.85 : 0.4}
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
}

// Subcomponent for each Concept Orbital Node around the Globe
function ConceptOrbitalNode({
  node,
  isMobile,
  prefersReducedMotion,
  isHovered,
  onHover,
}: {
  node: ConceptNodeData;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  isHovered: boolean;
  onHover: (hover: boolean) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * (prefersReducedMotion ? 0.3 : 0.7) + node.orbitPhase;
    // Gentle floating bob
    const floatY = Math.sin(t * 1.3) * (isMobile ? 0.025 : 0.04);
    const floatX = Math.cos(t * 1.0) * (isMobile ? 0.015 : 0.03);
    groupRef.current.position.set(
      node.pos[0] + floatX,
      node.pos[1] + floatY,
      node.pos[2]
    );
  });

  const renderIcon = () => {
    const iconProps = { className: 'w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5cefff]' };
    switch (node.icon) {
      case 'code':
        return <Code2 {...iconProps} />;
      case 'box':
        return <Box {...iconProps} />;
      case 'lightbulb':
        return <Lightbulb {...iconProps} />;
      case 'cog':
        return <Cog {...iconProps} />;
      case 'target':
        return <Target {...iconProps} />;
    }
  };

  return (
    <group ref={groupRef}>
      {/* 3D Satellite Point Marker */}
      <mesh>
        <sphereGeometry args={[isMobile ? 0.035 : 0.05, 16, 16]} />
        <meshBasicMaterial
          color={isHovered ? '#ffffff' : '#00d9ff'}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Cyber Concept Node Badge */}
      <Html center distanceFactor={isMobile ? 11 : 9.2} zIndexRange={[15, 25]}>
        <div
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          className={`flex items-center gap-1.5 p-1 rounded-full border transition-all duration-300 cursor-pointer pointer-events-auto select-none backdrop-blur-md ${
            isHovered
              ? 'border-[#5cefff] bg-[#031528]/95 shadow-[0_0_28px_rgba(0,217,255,0.95),inset_0_0_16px_rgba(92,239,255,0.45)] ring-1 ring-[#00d9ff]'
              : 'border-[#00d9ff]/75 bg-[#020d1c]/90 shadow-[0_0_18px_rgba(0,217,255,0.55),inset_0_0_10px_rgba(0,217,255,0.2)] hover:border-[#19e6ff]'
          }`}
          style={{
            transform: `scale(${isHovered ? 1.06 : 1.0})`,
            transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
          }}
        >
          {node.layout === 'label-first' ? (
            <>
              <span className="font-orbitron text-[10px] sm:text-xs font-bold tracking-wider text-[#00d9ff] drop-shadow-[0_0_8px_rgba(0,217,255,0.6)] pl-2.5 pr-1 whitespace-nowrap">
                {node.name}
              </span>
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#00d9ff]/80 bg-[#02182c]/85 flex items-center justify-center transition-all ${
                  isHovered ? 'shadow-[0_0_14px_rgba(0,217,255,0.9)] scale-105' : 'shadow-[0_0_10px_rgba(0,217,255,0.5)]'
                }`}
              >
                {renderIcon()}
              </div>
            </>
          ) : (
            <>
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#00d9ff]/80 bg-[#02182c]/85 flex items-center justify-center transition-all ${
                  isHovered ? 'shadow-[0_0_14px_rgba(0,217,255,0.9)] scale-105' : 'shadow-[0_0_10px_rgba(0,217,255,0.5)]'
                }`}
              >
                {renderIcon()}
              </div>
              <span className="font-orbitron text-[10px] sm:text-xs font-bold tracking-wider text-[#00d9ff] drop-shadow-[0_0_8px_rgba(0,217,255,0.6)] pr-2.5 pl-1 whitespace-nowrap">
                {node.name}
              </span>
            </>
          )}
        </div>
      </Html>
    </group>
  );
}
