import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem } from '../../../../types';

interface CareerDocumentWorld3DProps {
  project?: ProjectItem;
  scale?: number;
}

export const CareerDocumentWorld3D: React.FC<CareerDocumentWorld3DProps> = ({
  project,
  scale = 1,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const docRef = useRef<THREE.Group>(null);
  const leftCardRef = useRef<THREE.Group>(null);
  const rightCardRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const themeColor = project?.accentColor || '#c084fc';

  // Assembling particles
  const particleCount = 40;
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.8;
      pos[i * 3 + 1] = -0.5 + Math.random() * 1.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.2;

      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = 0.003 + Math.random() * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vel];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // World subtle movement
    if (rootRef.current) {
      rootRef.current.position.y = Math.sin(t * 1.2) * 0.05;
    }

    // Document subtle rotation & floating wave
    if (docRef.current) {
      docRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
      docRef.current.rotation.x = 0.1 + Math.cos(t * 0.8) * 0.04;
      docRef.current.position.y = 0.2 + Math.sin(t * 1.5) * 0.04;
    }

    // Floating UI cards bobbing
    if (leftCardRef.current) {
      leftCardRef.current.position.y = 0.4 + Math.sin(t * 2 + 1) * 0.05;
      leftCardRef.current.rotation.y = 0.25 + Math.sin(t * 1.2) * 0.05;
    }
    if (rightCardRef.current) {
      rightCardRef.current.position.y = 0.1 + Math.cos(t * 2.2) * 0.05;
      rightCardRef.current.rotation.y = -0.3 + Math.cos(t * 1.4) * 0.05;
    }

    // Assembling particles flowing up
    if (particlesRef.current) {
      const posArr = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += velocities[i * 3 + 1];
        posArr[i * 3] += velocities[i * 3];
        posArr[i * 3 + 2] += velocities[i * 3 + 2];

        if (posArr[i * 3 + 1] > 1.2) {
          posArr[i * 3 + 1] = -0.4;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={rootRef} scale={scale}>
      {/* ================================================================= */}
      {/* 1. PEDESTAL PLATFORM                                              */}
      {/* ================================================================= */}
      <group position={[0, -0.2, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.9, 2.1, 0.16, 8]} />
          <meshStandardMaterial color="#120c22" metalness={0.85} roughness={0.25} />
        </mesh>

        <mesh position={[0, 0.09, 0]}>
          <cylinderGeometry args={[1.75, 1.85, 0.04, 8]} />
          <meshStandardMaterial color="#1a1130" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Luminous Neon Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.115, 0]}>
          <ringGeometry args={[1.72, 1.78, 8]} />
          <meshBasicMaterial color={themeColor} transparent opacity={0.65} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 2. FLOATING HOLOGRAPHIC CAREER DOCUMENT (RESUME)                  */}
      {/* ================================================================= */}
      <group ref={docRef} position={[0, 0.2, 0]}>
        {/* Main Document Slate (Paper/Glass Sheet) */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[1.1, 1.5, 0.03]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.5}
            roughness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Document Border Frame */}
        <mesh position={[0, 0, 0.016]}>
          <planeGeometry args={[1.1, 1.5]} />
          <meshBasicMaterial color="#c084fc" wireframe transparent opacity={0.3} />
        </mesh>

        {/* Header Ribbon / Candidate Avatar bar */}
        <group position={[0, 0.55, 0.02]}>
          <mesh position={[-0.32, 0, 0]}>
            <circleGeometry args={[0.1, 16]} />
            <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0.08, 0.03, 0]}>
            <planeGeometry args={[0.55, 0.05]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.04, -0.04, 0]}>
            <planeGeometry args={[0.48, 0.03]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>

        {/* Section 1: Experience Blocks */}
        <group position={[0, 0.25, 0.02]}>
          <mesh position={[-0.25, 0.08, 0]}>
            <planeGeometry args={[0.4, 0.03]} />
            <meshBasicMaterial color="#c084fc" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[0.9, 0.06]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <planeGeometry args={[0.9, 0.06]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>

        {/* Section 2: Technical Skills Grid */}
        <group position={[0, -0.1, 0.02]}>
          <mesh position={[-0.25, 0.08, 0]}>
            <planeGeometry args={[0.4, 0.03]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <group>
            {[-0.3, 0, 0.3].map((sx, idx) => (
              <mesh key={idx} position={[sx, 0, 0]}>
                <planeGeometry args={[0.26, 0.06]} />
                <meshBasicMaterial color="#0284c7" transparent opacity={0.6} />
              </mesh>
            ))}
          </group>
        </group>

        {/* Section 3: Projects & Achievements */}
        <group position={[0, -0.42, 0.02]}>
          <mesh position={[-0.25, 0.08, 0]}>
            <planeGeometry args={[0.4, 0.03]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[0.9, 0.08]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
      </group>

      {/* ================================================================= */}
      {/* 3. FLOATING UI CARD 1: ATS SCORE 98% (LEFT)                       */}
      {/* ================================================================= */}
      <group ref={leftCardRef} position={[-1.15, 0.4, 0.4]}>
        {/* Glass Card Base */}
        <mesh>
          <boxGeometry args={[0.65, 0.45, 0.03]} />
          <meshStandardMaterial
            color="#0b1329"
            metalness={0.7}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Card Border */}
        <mesh position={[0, 0, 0.016]}>
          <planeGeometry args={[0.65, 0.45]} />
          <meshBasicMaterial color="#22c55e" wireframe transparent opacity={0.4} />
        </mesh>

        {/* ATS Score Progress Ring */}
        <mesh position={[-0.15, 0, 0.02]}>
          <ringGeometry args={[0.1, 0.13, 24]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>

        {/* Card Text Placeholders */}
        <mesh position={[0.12, 0.06, 0.02]}>
          <planeGeometry args={[0.28, 0.04]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.12, -0.04, 0.02]}>
          <planeGeometry args={[0.25, 0.03]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 4. FLOATING UI CARD 2: REAL-TIME PDF EXPORT (RIGHT)               */}
      {/* ================================================================= */}
      <group ref={rightCardRef} position={[1.15, 0.15, 0.35]}>
        {/* Glass Card Base */}
        <mesh>
          <boxGeometry args={[0.65, 0.45, 0.03]} />
          <meshStandardMaterial
            color="#140f28"
            metalness={0.7}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Card Border */}
        <mesh position={[0, 0, 0.016]}>
          <planeGeometry args={[0.65, 0.45]} />
          <meshBasicMaterial color="#c084fc" wireframe transparent opacity={0.4} />
        </mesh>

        {/* PDF Badge Icon */}
        <mesh position={[-0.15, 0, 0.02]}>
          <planeGeometry args={[0.18, 0.22]} />
          <meshBasicMaterial color="#e11d48" />
        </mesh>

        {/* Status Line */}
        <mesh position={[0.12, 0.04, 0.02]}>
          <planeGeometry args={[0.26, 0.035]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.12, -0.04, 0.02]}>
          <planeGeometry args={[0.22, 0.025]} />
          <meshBasicMaterial color="#c084fc" />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 5. PARTICLES ASSEMBLING FROM BELOW                                */}
      {/* ================================================================= */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color={themeColor}
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Point Lights */}
      <pointLight position={[0, 0.8, 0.8]} color="#c084fc" intensity={1.8} distance={3.2} />
      <pointLight position={[-0.8, 0.4, 0.5]} color="#22c55e" intensity={1} distance={2.5} />
    </group>
  );
};
