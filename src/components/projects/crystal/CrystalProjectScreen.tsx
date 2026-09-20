import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CrystalProjectScreenProps {
  texture: THREE.Texture;
  accentColor: string;
  dissolveProgress: number; // 0 (normal) to 1 (dissolved)
  isMobile?: boolean;
}

export const CrystalProjectScreen: React.FC<CrystalProjectScreenProps> = ({
  texture,
  accentColor,
  dissolveProgress = 0,
  isMobile = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);

  // Screen display dimensions: strictly 55-65% of crystal's inner visual area
  // Desktop: 1.08 width x 0.68 height (16:10 aspect ratio)
  // Mobile: 0.92 width x 0.58 height
  const width = isMobile ? 0.92 : 1.08;
  const height = isMobile ? 0.58 : 0.68;

  const screenGeom = useMemo(() => new THREE.PlaneGeometry(width, height), [width, height]);
  const edgesGeom = useMemo(() => new THREE.EdgesGeometry(screenGeom), [screenGeom]);
  const backplateGeom = useMemo(
    () => new THREE.BoxGeometry(width + 0.02, height + 0.02, 0.012),
    [width, height]
  );

  // Screen texture material - crisp, fully lit, front-facing
  const screenMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: texture,
      color: 0xffffff,
      transparent: true,
      opacity: 0.98,
      side: THREE.FrontSide,
      depthWrite: false,
    });
  }, [texture]);

  // Thin illuminated border frame
  const borderMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.75,
    });
  }, [accentColor]);

  // Subtle dark glass backplate providing depth
  const backplateMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x030712,
      roughness: 0.25,
      metalness: 0.85,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
  }, []);

  // Soft glow behind screen
  const glowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
    });
  }, [accentColor]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle floating levitation inside crystal
      const floatY = Math.sin(t * 1.3) * 0.015;
      groupRef.current.position.y = floatY;

      // Subtle breathing perspective orientation (permanently facing camera)
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.018;
      groupRef.current.rotation.x = Math.cos(t * 0.4) * 0.012;

      if (dissolveProgress > 0) {
        const p = dissolveProgress;
        const scale = Math.max(0.001, 1 - p * 0.2);
        groupRef.current.scale.set(scale, scale, scale);

        screenMaterial.opacity = Math.max(0, 0.98 * (1 - p * 1.4));
        borderMaterial.opacity = Math.max(0, 0.75 * (1 - p * 1.5));
        backplateMaterial.opacity = Math.max(0, 0.85 * (1 - p * 1.4));
        glowMaterial.opacity = Math.max(0, 0.15 * (1 - p * 2));
      } else {
        groupRef.current.scale.set(1, 1, 1);
        screenMaterial.opacity = 0.98;
        borderMaterial.opacity = 0.75;
        backplateMaterial.opacity = 0.85;
        glowMaterial.opacity = 0.15;
      }
    }

    if (glowMeshRef.current) {
      const breath = 1 + Math.sin(t * 2) * 0.03;
      glowMeshRef.current.scale.set(breath, breath, 1);
    }
  });

  const cornerX = width / 2;
  const cornerY = height / 2;

  return (
    <group ref={groupRef} position={[0, 0, 0.03]}>
      {/* 1. Soft Glow Plane behind backplate */}
      <mesh
        ref={glowMeshRef}
        position={[0, 0, -0.025]}
        geometry={screenGeom}
        material={glowMaterial}
        scale={[1.1, 1.12, 1]}
      />

      {/* 2. Slim Dark Glass Backplate */}
      <mesh
        position={[0, 0, -0.01]}
        geometry={backplateGeom}
        material={backplateMaterial}
      />

      {/* 3. Floating Project Screenshot (Real, Readable Image) */}
      <mesh
        position={[0, 0, 0.006]}
        geometry={screenGeom}
        material={screenMaterial}
      />

      {/* 4. Thin Illuminated Border Frame */}
      <lineSegments
        position={[0, 0, 0.008]}
        geometry={edgesGeom}
        material={borderMaterial}
      />

      {/* 5. Minimalist Corner Accents */}
      <mesh position={[-cornerX, cornerY, 0.012]}>
        <boxGeometry args={[0.05, 0.012, 0.006]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>
      <mesh position={[-cornerX, cornerY, 0.012]}>
        <boxGeometry args={[0.012, 0.05, 0.006]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      <mesh position={[cornerX, cornerY, 0.012]}>
        <boxGeometry args={[0.05, 0.012, 0.006]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>
      <mesh position={[cornerX, cornerY, 0.012]}>
        <boxGeometry args={[0.012, 0.05, 0.006]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      <mesh position={[-cornerX, -cornerY, 0.012]}>
        <boxGeometry args={[0.05, 0.012, 0.006]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>
      <mesh position={[-cornerX, -cornerY, 0.012]}>
        <boxGeometry args={[0.012, 0.05, 0.006]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      <mesh position={[cornerX, -cornerY, 0.012]}>
        <boxGeometry args={[0.05, 0.012, 0.006]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>
      <mesh position={[cornerX, -cornerY, 0.012]}>
        <boxGeometry args={[0.012, 0.05, 0.006]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>
    </group>
  );
};

export const CrystalScreen = CrystalProjectScreen;
