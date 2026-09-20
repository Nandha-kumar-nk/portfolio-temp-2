import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ProjectorModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  transitionPhase?: number; // 0=idle, 1=focus, 2=shutter, 3=advance, 4=sweep, 5=materialize
  transitionProgress?: number; // 0 to 1
  accentColor?: string;
  isMobile?: boolean;
}

export const ProjectorModel: React.FC<ProjectorModelProps> = ({
  position = [-3.8, 0.2, 0.4],
  rotation = [0, 0.45, 0], // Angled toward the center screen
  scale = 1.0,
  transitionPhase = 0,
  transitionProgress = 0,
  accentColor = '#00f5ff',
  isMobile = false,
}) => {
  const projectorGroup = useRef<THREE.Group>(null);
  const rearReelRef = useRef<THREE.Group>(null);
  const frontReelRef = useRef<THREE.Group>(null);
  const lensGlowMeshRef = useRef<THREE.Mesh>(null);
  const internalBulbLightRef = useRef<THREE.PointLight>(null);
  const lensSpotLightRef = useRef<THREE.SpotLight>(null);

  // Responsive scale factor
  const effectiveScale = useMemo(() => {
    if (typeof scale === 'number') {
      return isMobile ? scale * 0.72 : scale;
    }
    return scale;
  }, [scale, isMobile]);

  // Metallic materials
  const chassisMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x0a101d,
      roughness: 0.35,
      metalness: 0.85,
    });
  }, []);

  const darkSteelMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x060a12,
      roughness: 0.5,
      metalness: 0.9,
    });
  }, []);

  const chromeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.2,
      metalness: 0.95,
    });
  }, []);

  const brassAccentsMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.3,
      metalness: 0.8,
    });
  }, []);

  const lensGlassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x00f5ff,
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 1.8,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.9,
    });
  }, [accentColor]);

  // Reel spoke geometry: 6 circular spoke cutouts
  const spokeHoleGeometry = useMemo(() => new THREE.CylinderGeometry(0.16, 0.16, 0.08, 16), []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Reel spin speed: idle = slow, film advance (phase 3) = fast spin
    let reelSpeed = 0.5;
    if (transitionPhase === 3) {
      reelSpeed = 6.0;
    } else if (transitionPhase === 1 || transitionPhase === 2) {
      reelSpeed = 1.2;
    }

    if (rearReelRef.current) {
      rearReelRef.current.rotation.z -= delta * reelSpeed;
    }
    if (frontReelRef.current) {
      frontReelRef.current.rotation.z -= delta * (reelSpeed * 1.35);
    }

    // Lens glow brightness & shutter breathing
    let glowMultiplier = 1.0;
    if (transitionPhase === 1) {
      // Step 1: Lens focus flash
      glowMultiplier = 2.4 + transitionProgress * 1.2;
    } else if (transitionPhase === 2) {
      // Step 2: Shutter pulse
      glowMultiplier = 0.5 + Math.sin(transitionProgress * Math.PI * 4) * 0.5;
    } else if (transitionPhase === 4) {
      // Step 4: Light sweep peak
      glowMultiplier = 2.8;
    } else {
      // Idle gentle breath
      glowMultiplier = 1.0 + Math.sin(time * 2.5) * 0.18;
    }

    if (lensGlowMeshRef.current) {
      const mat = lensGlowMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.8 * glowMultiplier;
    }

    if (lensSpotLightRef.current) {
      lensSpotLightRef.current.intensity = 3.5 * glowMultiplier;
    }

    if (internalBulbLightRef.current) {
      internalBulbLightRef.current.intensity = 1.2 + Math.sin(time * 3) * 0.2;
    }
  });

  return (
    <group
      ref={projectorGroup}
      position={position}
      rotation={rotation}
      scale={effectiveScale}
    >
      {/* 1. LOWER PEDESTAL BASE & MOUNTING PLATE */}
      <group position={[0, -0.7, 0]}>
        {/* Heavy cast base */}
        <mesh position={[0, 0, 0]} material={darkSteelMaterial}>
          <boxGeometry args={[1.5, 0.25, 1.2]} />
        </mesh>
        {/* Vibration rubber damping feet */}
        <mesh position={[-0.6, -0.16, -0.45]} material={chassisMaterial}>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
        </mesh>
        <mesh position={[0.6, -0.16, -0.45]} material={chassisMaterial}>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
        </mesh>
        <mesh position={[-0.6, -0.16, 0.45]} material={chassisMaterial}>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
        </mesh>
        <mesh position={[0.6, -0.16, 0.45]} material={chassisMaterial}>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
        </mesh>

        {/* Nameplate: NU PROJECTOR_01 plaque */}
        <mesh position={[0, 0.04, 0.61]}>
          <boxGeometry args={[0.8, 0.12, 0.02]} />
          <meshStandardMaterial
            color="#081426"
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* 2. MAIN PROJECTOR CHASSIS BODY */}
      <group position={[0, 0, 0]}>
        {/* Main box */}
        <mesh position={[0, 0, 0]} material={chassisMaterial}>
          <boxGeometry args={[1.3, 1.1, 0.9]} />
        </mesh>

        {/* Top beveled casing */}
        <mesh position={[0, 0.6, 0]} material={chassisMaterial}>
          <boxGeometry args={[1.15, 0.15, 0.8]} />
        </mesh>

        {/* Side Cooling Louvers / Heat Vents */}
        <group position={[-0.66, 0.1, 0]}>
          {[-0.25, -0.12, 0.01, 0.14, 0.27].map((y, idx) => (
            <mesh key={idx} position={[0, y, 0]} material={darkSteelMaterial}>
              <boxGeometry args={[0.03, 0.04, 0.6]} />
            </mesh>
          ))}
        </group>

        {/* Front-Facing Status LEDs & Dials */}
        <group position={[0.45, -0.15, 0.46]}>
          {/* Cyan LED 1 */}
          <mesh position={[-0.2, 0.15, 0]}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshBasicMaterial color="#00f5ff" />
          </mesh>
          {/* Amber LED 2 */}
          <mesh position={[-0.1, 0.15, 0]}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
          {/* Green Power LED */}
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
          {/* Rotary control dial */}
          <mesh position={[-0.1, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]} material={chromeMaterial}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
          </mesh>
        </group>

        {/* Internal Lamp Bulb Glow (casting warm light inside projector) */}
        <pointLight
          ref={internalBulbLightRef}
          position={[-0.1, 0.2, 0]}
          color="#f59e0b"
          intensity={1.2}
          distance={1.5}
        />
      </group>

      {/* 3. REAR LARGE FILM REEL */}
      <group position={[-0.45, 1.25, 0]}>
        {/* Support Mast / Arm */}
        <mesh position={[0.1, -0.4, 0]} rotation={[0, 0, -0.3]} material={darkSteelMaterial}>
          <boxGeometry args={[0.08, 0.8, 0.12]} />
        </mesh>

        {/* Rotating Reel Assembly */}
        <group ref={rearReelRef}>
          {/* Center Axle Hub */}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={brassAccentsMaterial}>
            <cylinderGeometry args={[0.2, 0.2, 0.16, 24]} />
          </mesh>
          {/* Center lock nut */}
          <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]} material={chromeMaterial}>
            <cylinderGeometry args={[0.08, 0.08, 0.08, 6]} />
          </mesh>

          {/* Film Spool Core (dark wound film inside reel) */}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={darkSteelMaterial}>
            <cylinderGeometry args={[0.55, 0.55, 0.1, 32]} />
          </mesh>

          {/* Outer Rim Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={chromeMaterial}>
            <torusGeometry args={[0.75, 0.035, 12, 32]} />
          </mesh>

          {/* 6 Radial Spokes with Perforation Holes */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <group key={i} rotation={[0, 0, rad]}>
                <mesh position={[0.42, 0, 0]} material={chromeMaterial}>
                  <boxGeometry args={[0.55, 0.06, 0.04]} />
                </mesh>
                <mesh position={[0.45, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={darkSteelMaterial} geometry={spokeHoleGeometry} />
              </group>
            );
          })}
        </group>
      </group>

      {/* 4. FRONT SMALLER FILM REEL */}
      <group position={[0.42, 0.95, 0.2]}>
        {/* Support Bracket */}
        <mesh position={[-0.1, -0.35, 0]} rotation={[0, 0, 0.35]} material={darkSteelMaterial}>
          <boxGeometry args={[0.07, 0.65, 0.09]} />
        </mesh>

        {/* Rotating Front Reel Assembly */}
        <group ref={frontReelRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={brassAccentsMaterial}>
            <cylinderGeometry args={[0.15, 0.15, 0.12, 20]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={darkSteelMaterial}>
            <cylinderGeometry args={[0.38, 0.38, 0.08, 24]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={chromeMaterial}>
            <torusGeometry args={[0.52, 0.025, 10, 28]} />
          </mesh>

          {/* 4 Spokes */}
          {[0, 90, 180, 270].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <mesh key={i} rotation={[0, 0, rad]} position={[0.25 * Math.cos(rad), 0.25 * Math.sin(rad), 0]} material={chromeMaterial}>
                <boxGeometry args={[0.35, 0.04, 0.03]} />
              </mesh>
            );
          })}
        </group>
      </group>

      {/* 5. THREADED FILM STRIP (Looping between reels and lens gate) */}
      <group position={[0, 0.55, 0.08]}>
        {/* Top ribbon curve */}
        <mesh position={[-0.05, 0.22, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.65, 0.008, 0.08]} />
          <meshStandardMaterial color="#020617" roughness={0.7} />
        </mesh>
        {/* Sprocket Guide Rollers */}
        <mesh position={[0.28, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]} material={brassAccentsMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
        </mesh>
        <mesh position={[-0.28, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]} material={brassAccentsMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
        </mesh>
      </group>

      {/* 6. CENTRAL PROJECTION LENS ASSEMBLY */}
      {/* Points along +X (towards the central screen) */}
      <group position={[0.7, 0.05, 0]} rotation={[0, 0, -Math.PI / 2]}>
        {/* Heavy rear lens mount */}
        <mesh position={[0, 0.05, 0]} material={darkSteelMaterial}>
          <cylinderGeometry args={[0.26, 0.3, 0.14, 24]} />
        </mesh>

        {/* Stepped Barrel Ring 1 */}
        <mesh position={[0, 0.18, 0]} material={chassisMaterial}>
          <cylinderGeometry args={[0.24, 0.25, 0.12, 24]} />
        </mesh>

        {/* Aperture adjustment knurled ring */}
        <mesh position={[0, 0.28, 0]} material={chromeMaterial}>
          <cylinderGeometry args={[0.25, 0.25, 0.08, 32]} />
        </mesh>

        {/* Lens Barrel Snout (flaring outwards) */}
        <mesh position={[0, 0.4, 0]} material={darkSteelMaterial}>
          <cylinderGeometry args={[0.28, 0.23, 0.16, 24]} />
        </mesh>

        {/* Front Brass Accent Ring */}
        <mesh position={[0, 0.49, 0]} material={brassAccentsMaterial}>
          <torusGeometry args={[0.27, 0.018, 12, 32]} />
        </mesh>

        {/* GLOWING APERTURE GLASS LENS */}
        <mesh ref={lensGlowMeshRef} position={[0, 0.49, 0]} material={lensGlassMaterial}>
          <cylinderGeometry args={[0.26, 0.26, 0.02, 32]} />
        </mesh>

        {/* Concentric glass lens inner element */}
        <mesh position={[0, 0.45, 0]}>
          <sphereGeometry args={[0.22, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
          <meshBasicMaterial color="#e0f2fe" transparent opacity={0.7} />
        </mesh>

        {/* Projector Spotlight casting along +X in local space (points towards center screen) */}
        <spotLight
          ref={lensSpotLightRef}
          position={[0, 0.55, 0]}
          target-position={[0, 4.0, 0]}
          color="#a5f3fc"
          intensity={3.5}
          angle={0.5}
          penumbra={0.7}
          distance={12}
        />
      </group>
    </group>
  );
};
