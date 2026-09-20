import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ForegroundObservationDeck3DProps {
  position?: [number, number, number];
}

export const ForegroundObservationDeck3D: React.FC<ForegroundObservationDeck3DProps> = ({
  position = [0, -3.8, 3.2],
}) => {
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreEmitterRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = t * 0.15;
    }
    if (coreEmitterRef.current) {
      coreEmitterRef.current.intensity = 1.8 + Math.sin(t * 3) * 0.4;
    }
  });

  return (
    <group position={position} rotation={[-0.45, 0, 0]}>
      {/* 1. OUTER METALLIC RING RIM (Tech Deck Perimeter) */}
      <mesh receiveShadow>
        <cylinderGeometry args={[4.8, 5.2, 0.4, 48]} />
        <meshStandardMaterial
          color="#060912"
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* Outer Cyan Neon Ring Inset */}
      <mesh position={[0, 0.205, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.5, 4.62, 48]} />
        <meshBasicMaterial color="#00f5ff" side={THREE.DoubleSide} />
      </mesh>

      {/* 2. INNER STEPPED PLATFORM */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[3.8, 4.2, 0.25, 36]} />
        <meshStandardMaterial
          color="#0a101d"
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>

      {/* Electric Blue Circular Runway Strip */}
      <mesh position={[0, 0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.3, 3.42, 36]} />
        <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
      </mesh>

      {/* Subtle Gold Accent Trim */}
      <mesh position={[0, 0.255, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.56, 36]} />
        <meshBasicMaterial color="#eab308" side={THREE.DoubleSide} />
      </mesh>

      {/* 3. CENTER ROTATING TECH DIAL */}
      <mesh ref={innerRingRef} position={[0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.62, 32]} />
        <meshBasicMaterial color="#00f5ff" side={THREE.DoubleSide} />
      </mesh>

      {/* 4. GLOWING CENTER OBSERVATION CORE */}
      <mesh position={[0, 0.27, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.08, 24]} />
        <meshStandardMaterial
          color="#031122"
          emissive="#00f5ff"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Center Emitter Core Light */}
      <pointLight
        ref={coreEmitterRef}
        position={[0, 0.6, 0]}
        color="#00f5ff"
        distance={8}
        intensity={2.2}
      />
    </group>
  );
};
