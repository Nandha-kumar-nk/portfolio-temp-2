import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CubePedestalProps {
  accentColor: string;
  phase?: number;
  phaseProgress?: number;
  isMobile?: boolean;
}

export const CubePedestal: React.FC<CubePedestalProps> = ({
  accentColor,
  phase = 0,
  phaseProgress = 0,
  isMobile = false,
}) => {
  const sweepRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  // Compact circular pedestal radius (approx 190px desktop, 120px mobile)
  const radius = isMobile ? 0.48 : 0.72;
  const posY = isMobile ? -1.05 : -1.15;

  // Pre-generate circular text canvas for "NANDHAKUMAR UNIVERSE" along the rim
  const rimTextTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#060e1d';
    ctx.fillRect(0, 0, 1024, 128);

    ctx.fillStyle = '#00f5ff';
    ctx.shadowColor = '#00f5ff';
    ctx.shadowBlur = 10;
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const text = '✦  NANDHAKUMAR UNIVERSE  ✦  PROJECT ARCHIVE  ✦';
    ctx.fillText(text, 512, 64);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(1, 1);
    return tex;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speedMult = phase === 1 || phase === 2 ? 1 + phaseProgress * 2.5 : 1;

    if (sweepRef.current) {
      sweepRef.current.rotation.z = t * 1.2 * speedMult;
    }

    if (pulseRef.current) {
      const p = Math.sin(t * 2.5) * 0.08 + (phase === 1 ? phaseProgress * 0.2 : 0);
      const s = 1 + p * 0.12;
      pulseRef.current.scale.set(s, s, 1);
    }
  });

  return (
    <group position={[0, posY, 0]}>
      {/* 1. Base Dark Brushed Metallic Tier */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[radius, radius + 0.05, 0.06, 64]} />
        <meshStandardMaterial
          color="#060e1d"
          roughness={0.22}
          metalness={0.92}
        />
      </mesh>

      {/* 2. Beveled Inset Tier with "NANDHAKUMAR UNIVERSE" Inscription Rim */}
      <mesh position={[0, -0.015, 0]}>
        <cylinderGeometry args={[radius * 0.88, radius * 0.9, 0.035, 64]} />
        <meshStandardMaterial
          color="#081427"
          roughness={0.28}
          metalness={0.88}
          map={rimTextTexture}
        />
      </mesh>

      {/* 3. Glowing Concentric Light Rings (Horizontal plane directly under cube) */}
      <group position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Outer Thin Cyan Light Ring */}
        <mesh>
          <ringGeometry args={[radius * 0.82, radius * 0.85, 64]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.85} />
        </mesh>

        {/* Secondary Project Accent Ring */}
        <mesh>
          <ringGeometry args={[radius * 0.58, radius * 0.6, 48]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.75} />
        </mesh>

        {/* Rotating Light Arc */}
        <mesh ref={sweepRef} position={[0, 0, 0.001]}>
          <ringGeometry args={[radius * 0.58, radius * 0.64, 32, 1, 0, Math.PI / 2.2]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} side={THREE.DoubleSide} />
        </mesh>

        {/* Pulsing Core Energy Light */}
        <mesh ref={pulseRef} position={[0, 0, 0.002]}>
          <ringGeometry args={[radius * 0.32, radius * 0.35, 32]} />
          <meshBasicMaterial
            color={phase === 1 ? '#ffffff' : '#00f5ff'}
            transparent
            opacity={phase === 1 ? 0.95 : 0.65}
          />
        </mesh>
      </group>

      {/* 4. Soft Circular Floor Reflection (subtle ground glow, no giant platform) */}
      <mesh position={[0, -0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, radius * 1.5, 48]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
