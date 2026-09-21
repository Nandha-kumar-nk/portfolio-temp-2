import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GlowingPlatform } from './GlowingPlatform';
import { FloatingAsteroids } from './FloatingAsteroids';

interface HomeUniverseCoreProps {
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
  qualityTier?: 'HIGH' | 'MEDIUM' | 'LOW';
}

export function HomeUniverseCore({
  isMobile = false,
  prefersReducedMotion = false,
  qualityTier = 'HIGH',
}: HomeUniverseCoreProps) {
  useEffect(() => {
    console.log('[DIAGNOSTIC] 4. HomeUniverseCore mounted successfully!');
  }, []);

  const globeGroupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringsGroupRef = useRef<THREE.Group>(null);
  const pointerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const frameCountRef = useRef(0);

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

  // Soft circular glowing particle texture (replaces square GPU raster points with smooth glowing circular motes)
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

  // Elegant, high-visibility continental coordinate nodes
  const { continentPositions, continentColors } = useMemo(() => {
    const pointCount = qualityTier === 'LOW' ? 260 : qualityTier === 'MEDIUM' ? 420 : 600;
    const pos = new Float32Array(pointCount * 3);
    const col = new Float32Array(pointCount * 3);

    const continentalCenters = [
      { lat: 40, lon: -100, spread: 32 }, // North America
      { lat: -15, lon: -60, spread: 28 },  // South America
      { lat: 50, lon: 15, spread: 24 },   // Europe
      { lat: 5, lon: 25, spread: 32 },    // Africa
      { lat: 45, lon: 85, spread: 40 },   // Asia
      { lat: -25, lon: 135, spread: 20 }, // Australia
      { lat: 25, lon: 55, spread: 18 },   // Middle East
    ];

    // Radius 1.88 sits slightly outside the 1.84 oceanic sphere for zero depth-clipping
    const globeR = 1.88;

    for (let i = 0; i < pointCount; i++) {
      let lat = 0;
      let lon = 0;

      if (Math.random() < 0.85) {
        const center = continentalCenters[i % continentalCenters.length];
        const rSpread = (Math.random() - 0.5) * center.spread * 1.5;
        const latSpread = (Math.random() - 0.5) * center.spread * 1.1;
        lat = center.lat + latSpread;
        lon = center.lon + rSpread;
      } else {
        lat = (Math.random() - 0.5) * 150;
        lon = (Math.random() - 0.5) * 360;
      }

      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const r = globeR + (Math.random() - 0.5) * 0.02;

      pos[i * 3] = -r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const pick = Math.random();
      if (pick > 0.75) {
        // Pure White node
        col[i * 3] = 1.0; col[i * 3 + 1] = 1.0; col[i * 3 + 2] = 1.0;
      } else if (pick > 0.35) {
        // Electric Cyan glow
        col[i * 3] = 0.0; col[i * 3 + 1] = 0.96; col[i * 3 + 2] = 1.0;
      } else if (pick > 0.12) {
        // Sky Blue
        col[i * 3] = 0.22; col[i * 3 + 1] = 0.75; col[i * 3 + 2] = 1.0;
      } else {
        // Violet Accent
        col[i * 3] = 0.65; col[i * 3 + 1] = 0.45; col[i * 3 + 2] = 1.0;
      }
    }

    return { continentPositions: pos, continentColors: col };
  }, [qualityTier]);

  useFrame((state, delta) => {
    frameCountRef.current++;
    if (frameCountRef.current === 1 || frameCountRef.current === 60) {
      console.log('[DIAGNOSTIC] 5. HomeUniverseCore useFrame is running! Frame count:', frameCountRef.current, 'Camera pos:', state.camera.position.toArray());
      if (globeGroupRef.current) {
        console.log('[DIAGNOSTIC] 6,7,8. Globe world position:', globeGroupRef.current.position.toArray(), 'Globe scale:', globeGroupRef.current.scale.toArray());
      }
    }
    const t = state.clock.elapsedTime * (prefersReducedMotion ? 0.3 : 1.0);

    // Continuous slow majestic globe rotation with gentle pointer responsiveness
    if (globeGroupRef.current) {
      const targetRotationY = globeGroupRef.current.rotation.y + delta * (prefersReducedMotion ? 0.06 : 0.16);
      const targetTiltX = -pointerPosRef.current.y * 0.12;
      const targetTiltZ = pointerPosRef.current.x * 0.1;

      globeGroupRef.current.rotation.y = targetRotationY;
      globeGroupRef.current.rotation.x = THREE.MathUtils.lerp(globeGroupRef.current.rotation.x, targetTiltX, delta * 1.8);
      globeGroupRef.current.rotation.z = THREE.MathUtils.lerp(globeGroupRef.current.rotation.z, targetTiltZ, delta * 1.8);
    }

    // Subtle breathing pulse of inner luminous core
    if (coreRef.current) {
      const pulse = 1.0 + (prefersReducedMotion ? 0 : Math.sin(t * 1.5) * 0.025);
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Outer atmospheric glow fluctuation
    if (atmosphereRef.current) {
      const atmosPulse = 1.0 + (prefersReducedMotion ? 0 : Math.cos(t * 1.1) * 0.018);
      atmosphereRef.current.scale.set(atmosPulse, atmosPulse, atmosPulse);
    }

    // Gentle orbital rings movement
    if (ringsGroupRef.current) {
      ringsGroupRef.current.rotation.z += delta * (prefersReducedMotion ? 0.02 : 0.06);
      ringsGroupRef.current.rotation.y = Math.sin(t * 0.3) * 0.08;
    }
  });

  // Proportional globe scale and position for balanced hero framing:
  // Desktop: occupies ~35–45% viewport width, perfectly framing hero title & CTA
  // Mobile: occupies ~55–65% viewport width without horizontal overflow
  const globeScale = isMobile ? 0.58 : 0.76;
  const globePosition: [number, number, number] = [0, isMobile ? 0.12 : 0.08, 0];
  const platformY = isMobile ? -2.1 : -2.35;

  return (
    <group position={globePosition}>
      {/* 1. Glowing Pedestal Platform beneath the Globe */}
      <GlowingPlatform
        position={[0, platformY, 0]}
        isMobile={isMobile}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* 2. Floating Asteroids/Fragments around the environment */}
      <FloatingAsteroids
        count={qualityTier === 'LOW' ? 8 : qualityTier === 'MEDIUM' ? 14 : 18}
        isMobile={isMobile}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* 3. The Central Rotating Universe Globe Core */}
      <group ref={globeGroupRef} scale={[globeScale, globeScale, globeScale]}>
        {/* A. Dark Oceanic Obsidian Inner Body */}
        <mesh>
          <sphereGeometry args={[1.84, 40, 40]} />
          <meshStandardMaterial
            color="#051c38"
            roughness={0.3}
            metalness={0.6}
            transparent
            opacity={0.82}
            emissive="#0284c7"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* B. Inner Luminous Core (Electric Blue Glow) */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[1.48, 32, 32]} />
          <meshBasicMaterial
            color="#00f5ff"
            transparent
            opacity={0.85}
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
            size={isMobile ? 0.08 : 0.1}
            vertexColors
            transparent
            opacity={1.0}
            map={particleTexture || undefined}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        {/* D. Delicate Holographic Longitude & Latitude Wireframe Grid */}
        <mesh>
          <sphereGeometry args={[1.94, 28, 28]} />
          <meshBasicMaterial
            color="#00f5ff"
            wireframe
            transparent
            opacity={0.45}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* E. Atmospheric Volumetric Glow Shield (Fresnel Effect) */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[2.15, 32, 32]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* F. Multi-Ring Futuristic Orbital System */}
        <group ref={ringsGroupRef}>
          {/* Ring 1 - Slender Cyan Primary Orbit */}
          <group rotation={[Math.PI / 6, 0, 0]}>
            <mesh>
              <torusGeometry args={[2.7, 0.012, 16, 128]} />
              <meshBasicMaterial
                color="#38bdf8"
                transparent
                opacity={0.7}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            {/* Satellite Node 1 */}
            <mesh position={[2.7, 0, 0]}>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshBasicMaterial color="#00f5ff" blending={THREE.AdditiveBlending} />
            </mesh>
          </group>

          {/* Ring 2 - Sky Blue Secondary Orbit (-35 deg tilt) */}
          <group rotation={[-Math.PI / 4, Math.PI / 7, 0]}>
            <mesh>
              <torusGeometry args={[3.2, 0.011, 16, 128]} />
              <meshBasicMaterial
                color="#06b6d4"
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            {/* Satellite Node 2 */}
            <mesh position={[-3.2, 0, 0]}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshBasicMaterial color="#38bdf8" blending={THREE.AdditiveBlending} />
            </mesh>
          </group>

          {/* Ring 3 - Deep Blue Tertiary Orbit (60 deg tilt) */}
          <group rotation={[Math.PI / 3, -Math.PI / 6, Math.PI / 10]}>
            <mesh>
              <torusGeometry args={[3.75, 0.01, 16, 128]} />
              <meshBasicMaterial
                color="#0ea5e9"
                transparent
                opacity={0.5}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            {/* Satellite Node 3 */}
            <mesh position={[0, 3.75, 0]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshBasicMaterial color="#818cf8" blending={THREE.AdditiveBlending} />
            </mesh>
          </group>

          {/* Ring 4 - Outer Ethereal Violet / Cyan Orbit */}
          {!isMobile && (
            <group rotation={[-Math.PI / 5, Math.PI / 3, 0]}>
              <mesh>
                <torusGeometry args={[4.3, 0.009, 16, 128]} />
                <meshBasicMaterial
                  color="#818cf8"
                  transparent
                  opacity={0.4}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
              {/* Satellite Node 4 */}
              <mesh position={[0, -4.3, 0]}>
                <sphereGeometry args={[0.04, 12, 12]} />
                <meshBasicMaterial color="#00f5ff" blending={THREE.AdditiveBlending} />
              </mesh>
            </group>
          )}
        </group>
      </group>
    </group>
  );
}
