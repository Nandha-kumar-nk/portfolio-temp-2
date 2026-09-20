import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CrystalCoreProps {
  accentColor: string;
  focusPulse: number; // 0 (idle) to 1 (full focus flash)
  fractureProgress: number; // 0 to 1
  isMobile?: boolean;
}

export const CrystalCore: React.FC<CrystalCoreProps> = ({
  accentColor,
  focusPulse = 0,
  fractureProgress = 0,
  isMobile = false,
}) => {
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const colorAccent = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  // Small, subtle glowing sphere (not a giant wireframe cage)
  const coreMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: colorAccent,
      transparent: true,
      opacity: 0.85,
    });
  }, [colorAccent]);

  // Radius strictly small and soft
  const baseRadius = isMobile ? 0.11 : 0.14;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (coreMeshRef.current) {
      const breath = baseRadius + Math.sin(t * 2.2) * 0.012;
      const pulseScale = breath * (1 + focusPulse * 0.5);

      if (fractureProgress > 0) {
        const dissolve = Math.max(0.001, (1 - fractureProgress * 1.5) * pulseScale);
        coreMeshRef.current.scale.setScalar(dissolve);
        coreMaterial.opacity = Math.max(0, 0.85 * (1 - fractureProgress));
      } else {
        coreMeshRef.current.scale.setScalar(pulseScale);
        coreMaterial.opacity = 0.85;
      }
    }

    if (lightRef.current) {
      lightRef.current.intensity = 1.1 + focusPulse * 2.5;
    }
  });

  return (
    <group position={[0, 0, -0.26]}>
      {/* 1. Small Subtle Glowing Sphere */}
      <mesh ref={coreMeshRef} material={coreMaterial}>
        <sphereGeometry args={[1, 20, 20]} />
      </mesh>

      {/* 2. Soft Ambient Point Light */}
      <pointLight
        ref={lightRef}
        color={accentColor}
        intensity={1.1}
        distance={4.2}
        decay={2}
      />
      <pointLight
        color="#8b5cf6"
        intensity={0.65}
        distance={3.2}
        decay={2}
        position={[0, 0.15, -0.1]}
      />
    </group>
  );
};
