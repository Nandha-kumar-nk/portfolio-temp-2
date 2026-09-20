import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GlowingPlatformProps {
  position?: [number, number, number];
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
}

export function GlowingPlatform({
  position = [0, -2.7, 0],
  isMobile = false,
  prefersReducedMotion = false,
}: GlowingPlatformProps) {
  const platformRef = useRef<THREE.Group>(null);
  const ringInnerRef = useRef<THREE.Mesh>(null);
  const ringOuterRef = useRef<THREE.Mesh>(null);
  const coneRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * (prefersReducedMotion ? 0.3 : 1.0);

    if (platformRef.current) {
      // Slow clockwise rotation
      platformRef.current.rotation.y += delta * (prefersReducedMotion ? 0.02 : 0.06);
    }

    if (ringInnerRef.current) {
      const pulse = 1.0 + (prefersReducedMotion ? 0 : Math.sin(t * 1.8) * 0.03);
      ringInnerRef.current.scale.set(pulse, pulse, 1);
    }

    if (ringOuterRef.current) {
      const pulse = 1.0 + (prefersReducedMotion ? 0 : Math.cos(t * 1.4) * 0.02);
      ringOuterRef.current.scale.set(pulse, pulse, 1);
    }

    if (coneRef.current) {
      const conePulse = 0.12 + Math.sin(t * 1.5) * 0.03;
      (coneRef.current.material as THREE.MeshBasicMaterial).opacity = conePulse;
    }
  });

  const scale = isMobile ? 0.82 : 1.15;

  return (
    <group ref={platformRef} position={position} scale={[scale, scale, scale]}>
      {/* 1. Dark Circular Floor Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[4.2, 64]} />
        <meshBasicMaterial
          color="#010c1c"
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Concentric Cyan Glowing Neon Rings */}
      {/* Outer subtle ring */}
      <mesh ref={ringOuterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[3.8, 3.86, 64]} />
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Secondary ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]}>
        <ringGeometry args={[3.0, 3.05, 64]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main bright platform ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[2.1, 2.16, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner pedestal ring */}
      <mesh ref={ringInnerRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[1.2, 1.24, 48]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.75}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Center glowing focal disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <circleGeometry args={[0.75, 32]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Radial Segmented Dock Marks */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const dist = 2.1;
        const x = Math.cos(rad) * dist;
        const z = Math.sin(rad) * dist;

        return (
          <mesh
            key={i}
            position={[x, 0.018, z]}
            rotation={[0, -rad + Math.PI / 2, 0]}
          >
            <boxGeometry args={[0.035, 0.005, 0.7]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? '#00f5ff' : i % 3 === 1 ? '#06b6d4' : '#818cf8'}
              transparent
              opacity={0.65}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}

      {/* 4. Holographic Energy Cone/Pillar ascending toward the globe */}
      <group position={[0, 1.2, 0]}>
        <mesh ref={coneRef}>
          <cylinderGeometry args={[1.7, 2.5, 2.4, 32, 1, true]} />
          <meshBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.14}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}
