import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ProjectEnvironmentProps {
  accentColor: string;
}

export const ProjectEnvironment: React.FC<ProjectEnvironmentProps> = ({ accentColor }) => {
  const motesRef = useRef<THREE.Points>(null);

  // Floating ambient atmospheric dust motes (controlled: ~60 motes)
  const motesCount = 60;
  const motesPositions = useMemo(() => {
    const pos = new Float32Array(motesCount * 3);
    for (let i = 0; i < motesCount; i++) {
      const idx = i * 3;
      pos[idx] = (Math.random() - 0.5) * 6;
      pos[idx + 1] = (Math.random() - 0.5) * 4;
      pos[idx + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  const motesGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(motesPositions, 3));
    return geom;
  }, [motesPositions]);

  const motesMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 0xa5f3fc,
      size: 0.024,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  // Smooth radial gradient texture for soft floor reflection that fades out completely
  const floorGlowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 245, 255, 0.45)');
      grad.addColorStop(0.35, 'rgba(14, 116, 144, 0.25)');
      grad.addColorStop(0.7, 'rgba(6, 182, 212, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (motesRef.current) {
      motesRef.current.rotation.y = t * 0.01;
    }
  });

  return (
    <>
      {/* 1. CONTROLLED LIGHTING HIERARCHY */}
      {/* Ambient base: Deep navy, low intensity */}
      <ambientLight intensity={0.45} color="#061224" />

      {/* Primary Key Light: Soft cyan/white key pointing at crystal */}
      <spotLight
        position={[0, 4.0, 2.5]}
        angle={0.65}
        penumbra={0.85}
        intensity={2.2}
        color="#e0f7fe"
      />

      {/* Primary Back / Rim Light: Atmospheric soft cyan behind crystal */}
      <pointLight
        position={[0, 0.6, -1.6]}
        intensity={2.0}
        distance={5}
        color="#00f5ff"
      />

      {/* Secondary side fill lights */}
      <directionalLight position={[-2.5, 2.0, 1]} intensity={0.6} color="#0284c7" />
      <directionalLight position={[2.5, 2.0, 1]} intensity={0.6} color="#0284c7" />

      {/* Accent: Project-specific color illumination */}
      <pointLight
        position={[0, -1.1, 0.3]}
        intensity={1.2}
        distance={2.8}
        color={accentColor}
      />

      {/* 2. ATMOSPHERIC 3D DUST PARTICLES */}
      <points ref={motesRef} geometry={motesGeometry} material={motesMaterial} />

      {/* 3. SOFT PEDESTAL GROUND REFLECTION DISC (No hard edges, no black plane) */}
      <mesh position={[0, -1.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 1.6]} />
        <meshBasicMaterial
          map={floorGlowTexture}
          transparent
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
};
