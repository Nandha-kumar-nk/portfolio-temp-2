import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { isWebGLAvailable } from '../../utils/webgl';
import { WebGLErrorBoundary, WebGLCosmicFallback } from '../WebGLErrorBoundary';

export interface Dna3DSceneProps {
  stageIndex: number; // 0 to 5
  maxFormedIndex: number; // 0 to 5
  accentColor?: string;
  mode: 'full' | 'fragment'; // full = desktop/laptop/tablet, fragment = mobile
}

// ---------------------------------------------------------------------------
// 1. SMALL FUTURISTIC CIRCULAR PEDESTAL (Grounds the Vertical DNA)
// ---------------------------------------------------------------------------
const DnaPedestal: React.FC<{ yPos: number; isMobile: boolean; stageIndex: number }> = ({
  yPos,
  isMobile,
  stageIndex,
}) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.35;
    }
    if (coreRef.current) {
      const pulseSpeed = stageIndex === 0 ? 5 : stageIndex === 5 ? 3.5 : 2.5;
      coreRef.current.opacity = 0.55 + Math.sin(t * pulseSpeed) * 0.25;
    }
  });

  const baseRadius = isMobile ? 0.4 : 0.52;
  const innerRadius = baseRadius * 0.72;

  // Pedestal color shifts based on stage (Red tint for problem stage, Cyan for others, Emerald for impact)
  const pedestalColor = stageIndex === 0 ? '#ff4d4d' : stageIndex === 5 ? '#10b981' : '#00f5ff';

  return (
    <group position={[0, yPos, 0]}>
      {/* Reflective dark floor circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <circleGeometry args={[baseRadius * 2.2, 32]} />
        <meshStandardMaterial
          color="#020716"
          roughness={0.25}
          metalness={0.8}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Dark metallic base disc */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[baseRadius * 0.95, baseRadius, 0.05, 32]} />
        <meshStandardMaterial color="#0a1224" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* Thin colored ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.028, 0]}>
        <ringGeometry args={[innerRadius * 0.96, innerRadius, 32]} />
        <meshBasicMaterial color={pedestalColor} transparent opacity={0.75} side={THREE.DoubleSide} />
      </mesh>

      {/* Raised inner core platform */}
      <mesh position={[0, 0.035, 0]}>
        <cylinderGeometry args={[innerRadius * 0.65, innerRadius * 0.7, 0.03, 24]} />
        <meshStandardMaterial color="#060c18" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Pulsing center energy emitter */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.052, 0]}>
        <circleGeometry args={[innerRadius * 0.45, 20]} />
        <meshBasicMaterial ref={coreRef} color={pedestalColor} transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

// ---------------------------------------------------------------------------
// 2. ORBITING TECH SATELLITES (For STAGE 04 - TECHNOLOGY)
// ---------------------------------------------------------------------------
const OrbitingTechSatellites: React.FC<{
  stageIndex: number;
  reducedMotion: boolean;
}> = ({ stageIndex, reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.4;
  });

  if (stageIndex !== 3) return null; // Only active in Stage 04 (Technology)

  const satellites = [
    { y: -0.6, radius: 0.65, color: '#38bdf8' },
    { y: 0.0, radius: 0.75, color: '#00f5ff' },
    { y: 0.6, radius: 0.65, color: '#a855f7' },
  ];

  return (
    <group ref={groupRef}>
      {satellites.map((sat, i) => {
        const angle = (i * Math.PI * 2) / 3;
        const x = Math.cos(angle) * sat.radius;
        const z = Math.sin(angle) * sat.radius;

        return (
          <group key={i} position={[x, sat.y, z]}>
            {/* Small Orbiting Tech Sphere */}
            <mesh>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial
                color={sat.color}
                emissive={sat.color}
                emissiveIntensity={1.8}
                roughness={0.1}
              />
            </mesh>

            {/* Orbiting Halo Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.06, 0.08, 16]} />
              <meshBasicMaterial color={sat.color} transparent opacity={0.7} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// ---------------------------------------------------------------------------
// 3. SLEEK VERTICAL 3D DOUBLE HELIX
// ---------------------------------------------------------------------------
const SleekVerticalDnaMesh: React.FC<{
  stageIndex: number;
  maxFormedIndex: number;
  isMobile: boolean;
  reducedMotion: boolean;
}> = ({ stageIndex, maxFormedIndex, isMobile, reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const pulseLightRef = useRef<THREE.PointLight>(null);
  const problemFlickerRef = useRef<THREE.PointLight>(null);

  const totalStages = 6;
  const visibleStages = Math.min(totalStages, maxFormedIndex + 1);
  const isFullyFormed = maxFormedIndex >= 5;

  const totalHeight = isMobile ? 2.0 : 2.4;
  const startY = -totalHeight / 2;
  const stageHeight = totalHeight / totalStages;
  const formedHeight = (visibleStages / totalStages) * totalHeight;

  const turns = isMobile ? 2.4 : 3.4;
  const radius = isMobile ? 0.36 : 0.44;
  const tubeRadius = isMobile ? 0.02 : 0.024;
  const rungCount = isMobile ? 6 : 8;

  // Generate 3D Helix Curves along Y axis
  const { geomA, geomB, rungs, stageNodes } = useMemo(() => {
    const pointsA: THREE.Vector3[] = [];
    const pointsB: THREE.Vector3[] = [];
    const rungList: {
      pos: THREE.Vector3;
      quaternion: THREE.Quaternion;
      length: number;
      isActive: boolean;
      isProblemFlicker?: boolean;
    }[] = [];
    const nodeList: {
      pos: THREE.Vector3;
      isActive: boolean;
      isCurrent: boolean;
      stage: number;
    }[] = [];

    const samples = visibleStages * 28;
    for (let i = 0; i <= samples; i++) {
      const progress = i / samples;
      const y = startY + progress * formedHeight;
      const t = (y - startY) / totalHeight;
      const angle = t * turns * Math.PI * 2;

      const xA = Math.cos(angle) * radius;
      const zA = Math.sin(angle) * radius;
      const xB = -xA;
      const zB = -zA;

      pointsA.push(new THREE.Vector3(xA, y, zA));
      pointsB.push(new THREE.Vector3(xB, y, zB));
    }

    // Connecting rungs
    for (let r = 0; r < rungCount; r++) {
      const rungProgress = (r + 0.5) / rungCount;
      const rungY = startY + rungProgress * totalHeight;

      if (rungY <= startY + formedHeight + 0.04) {
        const t = (rungY - startY) / totalHeight;
        const angle = t * turns * Math.PI * 2;

        const pA = new THREE.Vector3(Math.cos(angle) * radius, rungY, Math.sin(angle) * radius);
        const pB = new THREE.Vector3(-Math.cos(angle) * radius, rungY, -Math.sin(angle) * radius);

        const dir = new THREE.Vector3().subVectors(pA, pB);
        const length = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        );

        const currentStageForRung = Math.min(5, Math.floor((rungY - startY) / stageHeight));
        const isActive = currentStageForRung === stageIndex || isFullyFormed;

        rungList.push({
          pos: new THREE.Vector3(0, rungY, 0),
          quaternion: quat,
          length,
          isActive,
          isProblemFlicker: r === 1 || r === 3, // Selective warning points for Stage 01
        });
      }
    }

    // 6 Spherical Nodes
    for (let s = 0; s < visibleStages; s++) {
      const nodeY = startY + (s + 0.5) * stageHeight;
      const t = (nodeY - startY) / totalHeight;
      const angle = t * turns * Math.PI * 2;
      const isStrandA = s % 2 === 0;
      const nodeX = (isStrandA ? 1 : -1) * Math.cos(angle) * radius;
      const nodeZ = (isStrandA ? 1 : -1) * Math.sin(angle) * radius;

      nodeList.push({
        pos: new THREE.Vector3(nodeX, nodeY, nodeZ),
        isActive: s <= maxFormedIndex,
        isCurrent: s === stageIndex || isFullyFormed,
        stage: s,
      });
    }

    let tubeA = new THREE.BufferGeometry();
    let tubeB = new THREE.BufferGeometry();

    if (pointsA.length > 2) {
      const curveA = new THREE.CatmullRomCurve3(pointsA);
      const curveB = new THREE.CatmullRomCurve3(pointsB);
      tubeA = new THREE.TubeGeometry(curveA, pointsA.length * 2, tubeRadius, 8, false);
      tubeB = new THREE.TubeGeometry(curveB, pointsB.length * 2, tubeRadius, 8, false);
    }

    return { geomA: tubeA, geomB: tubeB, rungs: rungList, stageNodes: nodeList };
  }, [visibleStages, maxFormedIndex, stageIndex, isFullyFormed, formedHeight, startY, totalHeight, stageHeight, radius, turns, tubeRadius, rungCount]);

  // Stage-based Color & Lighting Values
  const strandColors = useMemo(() => {
    if (stageIndex === 0) {
      // Stage 01: Problem — Muted cyan base with red alert warning accent
      return {
        colorA: '#0284c7',
        emissiveA: '#003e5c',
        emissiveIntensityA: 0.35,
        colorB: '#ff4d4d',
        emissiveB: '#990000',
        emissiveIntensityB: 0.5,
      };
    }
    if (stageIndex === 5) {
      // Stage 06: Impact — Radiant Emerald & Electric Cyan
      return {
        colorA: '#00f5ff',
        emissiveA: '#00b4d8',
        emissiveIntensityA: 1.2,
        colorB: '#10b981',
        emissiveB: '#059669',
        emissiveIntensityB: 1.1,
      };
    }
    // Default Stage Colors (Idea, Architecture, Technology, Features)
    return {
      colorA: '#00f5ff',
      emissiveA: '#00b4d8',
      emissiveIntensityA: stageIndex === 4 ? 0.95 : 0.7,
      colorB: '#7dd3fc',
      emissiveB: '#0284c7',
      emissiveIntensityB: stageIndex === 4 ? 0.85 : 0.6,
    };
  }, [stageIndex]);

  // Idle Animation Loop
  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Stage 01 has slightly hesitant, erratic rotation; others rotate smooth and calm
      const rotSpeed = stageIndex === 0 ? 0.08 : stageIndex === 5 ? 0.14 : 0.11;
      groupRef.current.rotation.y = t * rotSpeed;
      groupRef.current.position.y = Math.sin(t * 1.1) * 0.02;
    }

    if (pulseLightRef.current) {
      const pulseSpeed = stageIndex === 0 ? 0.6 : stageIndex === 1 ? 1.8 : 1.2;
      const cycle = (t * pulseSpeed) % 1;
      pulseLightRef.current.position.y = startY + cycle * formedHeight;
      pulseLightRef.current.intensity = stageIndex === 0 ? 0.9 : isFullyFormed ? 2.5 : 1.6;
    }

    if (problemFlickerRef.current && stageIndex === 0) {
      // Erratic flickering red warning pulse for Stage 01 Problem
      problemFlickerRef.current.intensity = Math.sin(t * 12) > 0.4 ? 1.8 : 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary Strand */}
      <mesh geometry={geomA}>
        <meshStandardMaterial
          color={strandColors.colorA}
          emissive={strandColors.emissiveA}
          emissiveIntensity={strandColors.emissiveIntensityA}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>

      {/* Secondary Strand */}
      <mesh geometry={geomB}>
        <meshStandardMaterial
          color={strandColors.colorB}
          emissive={strandColors.emissiveB}
          emissiveIntensity={strandColors.emissiveIntensityB}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>

      {/* 3D Connecting Rungs */}
      {rungs.map((r, i) => {
        const isProblemRung = stageIndex === 0 && r.isProblemFlicker;
        const rungColor = isProblemRung ? '#ff4d4d' : r.isActive ? '#38bdf8' : '#1e3a5f';
        const rungEmissive = isProblemRung ? '#990000' : r.isActive ? '#0284c7' : '#081a33';

        return (
          <mesh key={i} position={r.pos} quaternion={r.quaternion}>
            <cylinderGeometry args={[tubeRadius * 0.55, tubeRadius * 0.55, r.length, 6]} />
            <meshStandardMaterial
              color={rungColor}
              emissive={rungEmissive}
              emissiveIntensity={isProblemRung ? 1.2 : r.isActive ? 0.9 : 0.2}
              roughness={0.3}
              metalness={0.6}
            />
          </mesh>
        );
      })}

      {/* Exactly Six Spherical 3D Nodes */}
      {stageNodes.map((n, i) => {
        const isCurrentStageNode = n.stage === stageIndex;
        const nodeColor = isCurrentStageNode
          ? stageIndex === 0
            ? '#ff6b6b'
            : stageIndex === 5
            ? '#10b981'
            : '#ffffff'
          : '#00f5ff';

        return (
          <group key={i} position={n.pos}>
            <mesh>
              <sphereGeometry args={[isCurrentStageNode ? 0.08 : 0.05, 16, 16]} />
              <meshStandardMaterial
                color={nodeColor}
                emissive={isCurrentStageNode ? '#00f5ff' : '#0284c7'}
                emissiveIntensity={isCurrentStageNode ? 2.2 : 0.6}
                roughness={0.15}
                metalness={0.8}
              />
            </mesh>

            {/* Subtle Halo Ring for Active Stage Node */}
            {isCurrentStageNode && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.1, 0.135, 20]} />
                <meshBasicMaterial
                  color={stageIndex === 0 ? '#ff4d4d' : '#00f5ff'}
                  transparent
                  opacity={0.75}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Orbiting Satellites for Stage 04 Technology */}
      <OrbitingTechSatellites stageIndex={stageIndex} reducedMotion={reducedMotion} />

      {/* Traveling Energy Light */}
      <pointLight
        ref={pulseLightRef}
        color={stageIndex === 0 ? '#ff4d4d' : stageIndex === 5 ? '#10b981' : '#00f5ff'}
        intensity={1.5}
        distance={2.4}
      />

      {/* Erratic Red Warning Light for Stage 01 Problem */}
      {stageIndex === 0 && (
        <pointLight
          ref={problemFlickerRef}
          position={[0, startY + 0.6, 0.2]}
          color="#ff0000"
          intensity={1.2}
          distance={1.8}
        />
      )}
    </group>
  );
};

// ---------------------------------------------------------------------------
// 4. DYNAMIC ATMOSPHERIC PARTICLES (Reacts to Stage)
// ---------------------------------------------------------------------------
const DynamicAtmosphericParticles: React.FC<{
  count: number;
  rangeY: number;
  stageIndex: number;
  reducedMotion: boolean;
}> = ({ count, rangeY, stageIndex, reducedMotion }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const r = 0.3 + Math.random() * 1.3;
      pos[idx] = Math.cos(angle) * r;
      pos[idx + 1] = (Math.random() - 0.5) * rangeY;
      pos[idx + 2] = Math.sin(angle) * r;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const particleColor = stageIndex === 0 ? 0xff6b6b : stageIndex === 5 ? 0x34d399 : 0x7dd3fc;

    const mat = new THREE.PointsMaterial({
      color: particleColor,
      size: stageIndex === 5 ? 0.032 : 0.026,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return { geometry: geom, material: mat };
  }, [count, rangeY, stageIndex]);

  useFrame((state) => {
    if (reducedMotion) return;
    if (pointsRef.current) {
      const speed = stageIndex === 0 ? 0.02 : stageIndex === 5 ? 0.07 : 0.04;
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * speed;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

// ---------------------------------------------------------------------------
// 5. CAMERA PARALLAX
// ---------------------------------------------------------------------------
const CameraParallax: React.FC<{ isMobile: boolean; reducedMotion: boolean }> = ({
  isMobile,
  reducedMotion,
}) => {
  useFrame((state) => {
    if (reducedMotion) return;

    if (!isMobile) {
      const targetX = state.pointer.x * 0.4;
      const targetY = 0.2 + state.pointer.y * 0.2;
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
      state.camera.lookAt(0, 0, 0);
    } else {
      state.camera.position.set(0, 0.15, 3.1);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return null;
};

// ---------------------------------------------------------------------------
// 6. EXPORTED ROOT COMPONENT
// ---------------------------------------------------------------------------
export const Dna3DScene: React.FC<Dna3DSceneProps> = ({
  stageIndex,
  maxFormedIndex,
  mode,
}) => {
  const isMobile = mode === 'fragment';
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState<boolean>(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '200px 0px 200px 0px', threshold: 0.01 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  const totalHeight = isMobile ? 2.0 : 2.4;
  const pedestalY = -totalHeight / 2 - 0.06;

  if (!isInView || !isWebGLAvailable()) {
    return (
      <div
        ref={containerRef}
        id={isMobile ? 'mobile-3d-dna-canvas' : 'desktop-3d-dna-canvas'}
        className="relative w-full h-full flex items-center justify-center select-none overflow-hidden"
      >
        <WebGLCosmicFallback className="w-full h-full" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id={isMobile ? 'mobile-3d-dna-canvas' : 'desktop-3d-dna-canvas'}
      className="relative w-full h-full flex items-center justify-center select-none overflow-hidden"
    >
      <WebGLErrorBoundary fallback={<WebGLCosmicFallback className="w-full h-full" />} name="Dna3DScene">
        <Canvas
          camera={{
            position: isMobile ? [0, 0.15, 3.1] : [0, 0.2, 3.3],
            fov: isMobile ? 40 : 38,
            near: 0.1,
            far: 20,
          }}
          dpr={isMobile ? [1, 1] : [1, 1.5]}
          onCreated={({ gl }) => {
            const handleContextLost = (e: Event) => {
              e.preventDefault();
              console.warn('[Dna3DScene] WebGL context lost.');
            };
            gl.domElement.addEventListener('webglcontextlost', handleContextLost, false);
          }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.45} color="#040c1e" />
          <directionalLight position={[2, 3.5, 2.5]} intensity={1.5} color="#f0f9ff" />
          <directionalLight
            position={[-2.5, -0.5, 1.2]}
            intensity={0.8}
            color={stageIndex === 0 ? '#ff4d4d' : '#00f5ff'}
          />
          <directionalLight position={[0, -2, 1.5]} intensity={0.5} color="#0284c7" />

          {/* Small Pedestal at the Base */}
          <DnaPedestal yPos={pedestalY} isMobile={isMobile} stageIndex={stageIndex} />

          {/* Sleek Vertical 3D Helix Mesh */}
          <SleekVerticalDnaMesh
            stageIndex={stageIndex}
            maxFormedIndex={maxFormedIndex}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />

          {/* Dynamic Particles */}
          <DynamicAtmosphericParticles
            count={isMobile ? 35 : 120}
            rangeY={totalHeight * 1.3}
            stageIndex={stageIndex}
            reducedMotion={reducedMotion}
          />

          {/* Perspective Parallax Controller */}
          <CameraParallax isMobile={isMobile} reducedMotion={reducedMotion} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};

export default Dna3DScene;
