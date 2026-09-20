import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingIslandBaseProps {
  themeColor: string;
  accentGlow: string;
  isSelected?: boolean;
  isDimmed?: boolean;
  radius?: number;
  height?: number;
  bobSpeed?: number;
  bobOffset?: number;
  children?: React.ReactNode;
}

export const FloatingIslandBase: React.FC<FloatingIslandBaseProps> = ({
  themeColor,
  accentGlow: _accentGlow,
  isSelected = false,
  isDimmed = false,
  radius = 1.3,
  height = 0.5,
  bobSpeed = 1.2,
  bobOffset = 0,
  children,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const thrusterRef = useRef<THREE.PointLight>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle floating bobbing
      const bobY = Math.sin(t * bobSpeed + bobOffset) * 0.08;
      const tiltX = Math.cos(t * bobSpeed * 0.5 + bobOffset) * 0.02;
      const tiltZ = Math.sin(t * bobSpeed * 0.7 + bobOffset) * 0.02;
      groupRef.current.position.y = bobY;
      groupRef.current.rotation.x = tiltX;
      groupRef.current.rotation.z = tiltZ;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
    }

    if (thrusterRef.current) {
      thrusterRef.current.intensity = isSelected
        ? 2.5 + Math.sin(t * 8) * 0.6
        : 1.2 + Math.sin(t * 4) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. TOP CYBER PLATEAU (Faceted hexagonal / circular metallic deck) */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[radius, radius * 1.05, height, 12]} />
        <meshStandardMaterial
          color="#0a1220"
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* Top Deck Surface Bevel Inset */}
      <mesh position={[0, height * 0.505, 0]}>
        <cylinderGeometry args={[radius * 0.94, radius * 0.94, 0.02, 12]} />
        <meshStandardMaterial
          color="#060b14"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* 2. GLOWING RIM ENERGY CONDUIT */}
      <mesh position={[0, height * 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 0.96, radius * 1.02, 32]} />
        <meshBasicMaterial
          color={themeColor}
          transparent
          opacity={isDimmed ? 0.3 : isSelected ? 0.95 : 0.75}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer Orbiting Accent Energy Ring */}
      <mesh ref={ringRef} position={[0, height * 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 1.15, radius * 1.18, 32]} />
        <meshBasicMaterial
          color={themeColor}
          transparent
          opacity={isDimmed ? 0.15 : isSelected ? 0.8 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. INVERTED ROCKY CRAGS & STALACTITES (Underside of the floating island) */}
      <mesh position={[0, -height * 0.6, 0]} castShadow>
        <coneGeometry args={[radius * 0.95, height * 1.6, 8]} />
        <meshStandardMaterial
          color="#060a12"
          roughness={0.85}
          metalness={0.4}
          flatShading
        />
      </mesh>

      {/* Extra rocky crag clusters for organic futuristic rock feel */}
      <mesh position={[radius * 0.45, -height * 0.7, radius * 0.2]} rotation={[0.2, 0.4, -0.1]}>
        <coneGeometry args={[radius * 0.35, height * 1.2, 5]} />
        <meshStandardMaterial
          color="#05080f"
          roughness={0.9}
          metalness={0.3}
          flatShading
        />
      </mesh>
      <mesh position={[-radius * 0.4, -height * 0.75, -radius * 0.25]} rotation={[-0.2, -0.3, 0.2]}>
        <coneGeometry args={[radius * 0.4, height * 1.3, 6]} />
        <meshStandardMaterial
          color="#05080f"
          roughness={0.9}
          metalness={0.3}
          flatShading
        />
      </mesh>

      {/* 4. ANTI-GRAVITY PROPULSION EMITTER (Bottom point) */}
      <mesh position={[0, -height * 1.5, 0]}>
        <sphereGeometry args={[radius * 0.16, 12, 12]} />
        <meshBasicMaterial color={themeColor} />
      </mesh>

      {/* Thruster Point Light */}
      <pointLight
        ref={thrusterRef}
        position={[0, -height * 1.6, 0]}
        color={themeColor}
        distance={radius * 4}
      />

      {/* 5. GLOWING SPHERICAL ENERGY BUBBLE (Matching reference image) */}
      <mesh position={[0, height * 0.5 + 0.3, 0]}>
        <sphereGeometry args={[radius * 1.2, 32, 32]} />
        <meshStandardMaterial
          color={themeColor}
          transparent
          opacity={isSelected ? 0.18 : 0.09}
          roughness={0.1}
          metalness={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bubble Perimeter Glowing Rim Ring */}
      <mesh position={[0, height * 0.5 + 0.3, 0]} rotation={[0.35, 0.25, 0]}>
        <torusGeometry args={[radius * 1.22, 0.016, 16, 64]} />
        <meshBasicMaterial
          color={themeColor}
          transparent
          opacity={isSelected ? 0.95 : 0.65}
        />
      </mesh>

      {/* 6. ACTIVE SELECTION PULSE RING */}
      {isSelected && (
        <mesh position={[0, height * 0.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * 1.28, radius * 1.35, 32]} />
          <meshBasicMaterial
            color={themeColor}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Content resting on top of the island plateau */}
      <group position={[0, height * 0.51, 0]}>{children}</group>
    </group>
  );
};
