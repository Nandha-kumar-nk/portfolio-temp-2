import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface PlaceholderMobilityArtifactProps {
  transitionProgress: number; // 0: fully formed, 1: dissolved
  burstDirection?: number;
}

export const PlaceholderMobilityArtifact: React.FC<PlaceholderMobilityArtifactProps> = ({
  transitionProgress = 0,
  burstDirection = 1,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const mobAccent = useMemo(() => new THREE.Color('#38bdf8'), []);
  const amberAccent = useMemo(() => new THREE.Color('#f59e0b'), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (rootRef.current) {
      rootRef.current.position.y = Math.sin(t * 1.1) * 0.08;
      rootRef.current.rotation.y = t * 0.25;

      if (transitionProgress > 0) {
        rootRef.current.position.x = transitionProgress * transitionProgress * 8.0 * burstDirection;
        rootRef.current.scale.setScalar(Math.max(0.001, 1 - transitionProgress * 0.7));
      } else {
        rootRef.current.position.x = 0;
        rootRef.current.scale.setScalar(1);
      }
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.7;
    }
  });

  return (
    <group ref={rootRef} position={[0, 0, 0]}>
      {/* Inner Mobility Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.65, 0]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.4}
          transmission={0.6}
          transparent
          opacity={0.85}
        />
      </mesh>
      <pointLight color="#38bdf8" intensity={2.5} distance={7} />

      {/* Urban Transit Vector Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.65, 0.02, 16, 80]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.9, 0.015, 16, 80]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
      </mesh>

      {/* Waypoint Coordinates */}
      <mesh position={[1.4, 0.5, 0]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
      <mesh position={[-1.3, -0.6, 0.4]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
    </group>
  );
};
