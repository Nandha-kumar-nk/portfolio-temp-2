import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CrystalScreenProps {
  texture: THREE.Texture;
  accentColor: string;
  dissolveProgress: number; // 0 (normal) to 1 (fractured/dissolved)
  isMobile?: boolean;
}

export const CrystalScreen: React.FC<CrystalScreenProps> = ({
  texture,
  accentColor,
  dissolveProgress = 0,
  isMobile = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);

  // Screen display dimensions calibrated to 55-65% of crystal's inner diamond area
  // Desktop: 1.22 width x 0.76 height. Mobile: 1.02 width x 0.64 height
  const width = isMobile ? 1.02 : 1.22;
  const height = isMobile ? 0.64 : 0.76;

  const screenGeom = useMemo(() => new THREE.PlaneGeometry(width, height), [width, height]);
  const edgesGeom = useMemo(() => new THREE.EdgesGeometry(screenGeom), [screenGeom]);
  const backplateGeom = useMemo(() => new THREE.BoxGeometry(width + 0.02, height + 0.02, 0.015), [width, height]);

  // Screen texture material
  const screenMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: texture,
      color: 0xffffff,
      transparent: true,
      opacity: 0.96,
      side: THREE.FrontSide,
      depthWrite: false,
    });
  }, [texture]);

  // Thin glass border
  const borderMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.75,
    });
  }, [accentColor]);

  // Slim dark glass backplate
  const backplateMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x030712,
      roughness: 0.25,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
  }, []);

  // Soft ambient glow behind screen
  const glowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
    });
  }, [accentColor]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle floating levitation inside crystal
      const floatY = Math.sin(t * 1.3) * 0.025;
      groupRef.current.position.y = floatY;

      // Subtle 3D perspective orientation
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.025;
      groupRef.current.rotation.x = Math.cos(t * 0.3) * 0.018;

      if (dissolveProgress > 0) {
        const p = dissolveProgress;
        const scale = Math.max(0.001, 1 - p * 0.22);
        groupRef.current.scale.set(scale, scale, scale);

        screenMaterial.opacity = Math.max(0, 0.96 * (1 - p * 1.4));
        borderMaterial.opacity = Math.max(0, 0.75 * (1 - p * 1.5));
        backplateMaterial.opacity = Math.max(0, 0.85 * (1 - p * 1.4));
        glowMaterial.opacity = Math.max(0, 0.14 * (1 - p * 2));
      } else {
        groupRef.current.scale.set(1, 1, 1);
        screenMaterial.opacity = 0.96;
        borderMaterial.opacity = 0.75;
        backplateMaterial.opacity = 0.85;
        glowMaterial.opacity = 0.14;
      }
    }

    if (glowMeshRef.current) {
      const breath = 1 + Math.sin(t * 2) * 0.04;
      glowMeshRef.current.scale.set(breath, breath, 1);
    }
  });

  const cornerX = width / 2;
  const cornerY = height / 2;

  return (
    <group ref={groupRef} position={[0, 0, 0.04]}>
      {/* 1. Soft Glow Plane */}
      <mesh
        ref={glowMeshRef}
        position={[0, 0, -0.03]}
        geometry={screenGeom}
        material={glowMaterial}
        scale={[1.12, 1.15, 1]}
      />

      {/* 2. Slim Dark Glass Backplate */}
      <mesh
        position={[0, 0, -0.01]}
        geometry={backplateGeom}
        material={backplateMaterial}
      />

      {/* 3. Floating Project Screenshot */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0.005]}
        geometry={screenGeom}
        material={screenMaterial}
      />

      {/* 4. Thin Glass Border Frame */}
      <lineSegments
        position={[0, 0, 0.008]}
        geometry={edgesGeom}
        material={borderMaterial}
      />

      {/* 5. Sleek Corner Cyber Accents */}
      {/* Top Left */}
      <mesh position={[-cornerX, cornerY, 0.012]}>
        <boxGeometry args={[0.06, 0.015, 0.008]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>
      <mesh position={[-cornerX, cornerY, 0.012]}>
        <boxGeometry args={[0.015, 0.06, 0.008]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* Top Right */}
      <mesh position={[cornerX, cornerY, 0.012]}>
        <boxGeometry args={[0.06, 0.015, 0.008]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>
      <mesh position={[cornerX, cornerY, 0.012]}>
        <boxGeometry args={[0.015, 0.06, 0.008]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* Bottom Left */}
      <mesh position={[-cornerX, -cornerY, 0.012]}>
        <boxGeometry args={[0.06, 0.015, 0.008]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>
      <mesh position={[-cornerX, -cornerY, 0.012]}>
        <boxGeometry args={[0.015, 0.06, 0.008]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* Bottom Right */}
      <mesh position={[cornerX, -cornerY, 0.012]}>
        <boxGeometry args={[0.06, 0.015, 0.008]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>
      <mesh position={[cornerX, -cornerY, 0.012]}>
        <boxGeometry args={[0.015, 0.06, 0.008]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>
    </group>
  );
};
