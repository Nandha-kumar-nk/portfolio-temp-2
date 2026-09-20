import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface SmallCompanionCubesProps {
  accentColor: string;
  projectId: string;
  phase: number;
  phaseProgress: number;
  isMobile?: boolean;
}

interface CompanionConfig {
  baseAngle: number;
  radius: number;
  yOffset: number;
  speed: number;
  wobbleSpeed: number;
}

export const SmallCompanionCubes: React.FC<SmallCompanionCubesProps> = ({
  accentColor,
  projectId: _projectId,
  phase,
  phaseProgress,
  isMobile = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Desktop: 4 cubes; Mobile: 2 cubes
  const count = isMobile ? 2 : 4;
  const companionSize = isMobile ? 0.2 : 0.26;

  const boxGeom = useMemo(
    () => new THREE.BoxGeometry(companionSize, companionSize, companionSize),
    [companionSize]
  );
  const edgesGeom = useMemo(() => new THREE.EdgesGeometry(boxGeom), [boxGeom]);

  const cubeMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#030c1d'),
        emissive: new THREE.Color(accentColor),
        emissiveIntensity: 0.25,
        roughness: 0.15,
        metalness: 0.2,
        transmission: 0.75,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      }),
    [accentColor]
  );

  const configs: CompanionConfig[] = useMemo(() => {
    return [
      // Cube 1: Top-Right
      {
        baseAngle: 0.6,
        radius: isMobile ? 1.05 : 1.35,
        yOffset: 0.65,
        speed: 0.12,
        wobbleSpeed: 1.4,
      },
      // Cube 2: Bottom-Left
      {
        baseAngle: 3.6,
        radius: isMobile ? 0.95 : 1.28,
        yOffset: -0.45,
        speed: 0.1,
        wobbleSpeed: 1.2,
      },
      // Cube 3: Top-Left (Desktop only)
      {
        baseAngle: 2.3,
        radius: 1.4,
        yOffset: 0.5,
        speed: 0.14,
        wobbleSpeed: 1.5,
      },
      // Cube 4: Bottom-Right (Desktop only)
      {
        baseAngle: 5.1,
        radius: 1.3,
        yOffset: -0.35,
        speed: 0.11,
        wobbleSpeed: 1.3,
      },
    ].slice(0, count);
  }, [isMobile, count]);

  const itemRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Pulse/gather slightly during transition Phase 1 & 4
    const pulseFactor =
      phase === 1
        ? 1 - phaseProgress * 0.15
        : phase === 4
        ? 1 + Math.sin(phaseProgress * Math.PI) * 0.15
        : 1;

    configs.forEach((cfg, idx) => {
      const item = itemRefs.current[idx];
      if (!item) return;

      const angle = cfg.baseAngle + t * cfg.speed;
      const curRadius = cfg.radius * pulseFactor;

      item.position.x = Math.cos(angle) * curRadius;
      item.position.z = Math.sin(angle) * curRadius;
      item.position.y = cfg.yOffset + Math.sin(t * cfg.wobbleSpeed + idx) * 0.08;

      item.rotation.x += delta * 0.4;
      item.rotation.y += delta * 0.5;
      item.rotation.z += delta * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {configs.map((_cfg, idx) => (
        <group
          key={idx}
          ref={(el) => {
            itemRefs.current[idx] = el;
          }}
        >
          <mesh geometry={boxGeom} material={cubeMaterial}>
            {/* Glowing Cyan Edges */}
            <lineSegments geometry={edgesGeom}>
              <lineBasicMaterial
                color="#00f5ff"
                transparent
                opacity={0.9}
              />
            </lineSegments>

            {/* Micro Inset Core for Companion Cube */}
            <mesh scale={0.4}>
              <boxGeometry args={[companionSize, companionSize, companionSize]} />
              <meshBasicMaterial
                color={accentColor}
                transparent
                opacity={0.7}
              />
            </mesh>
          </mesh>
        </group>
      ))}
    </group>
  );
};
