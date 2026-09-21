import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingAsteroidsProps {
  count?: number;
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
}

interface AsteroidData {
  radius: number;
  theta: number;
  y: number;
  orbitSpeed: number;
  rotationSpeed: [number, number, number];
  scale: number;
  polyType: 0 | 1 | 2; // 0: Dodecahedron, 1: Icosahedron, 2: Octahedron
  color: string;
}

export function FloatingAsteroids({
  count = 18,
  isMobile = false,
  prefersReducedMotion = false,
}: FloatingAsteroidsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const asteroidsRef = useRef<THREE.Mesh[]>([]);

  // Fixed positions across strategic regions (upper-left, upper-right, mid-left, mid-right, lower-left, lower-right)
  const asteroids = useMemo<AsteroidData[]>(() => {
    const data: AsteroidData[] = [];
    const effectiveCount = isMobile ? 8 : count;

    // Subtle peripheral crystal fragments to keep hero center clean
    const fixedAnchors: Array<{ radius: number; theta: number; y: number; scale: number; polyType: 0 | 1 | 2; color: string }> = [
      // Left side subtle fragments
      { radius: 6.2, theta: Math.PI * 0.85, y: 2.2, scale: 0.11, polyType: 1, color: '#00d9ff' },
      { radius: 5.8, theta: Math.PI * 0.98, y: 0.4, scale: 0.12, polyType: 0, color: '#19e6ff' },
      { radius: 6.5, theta: Math.PI * 1.15, y: -2.0, scale: 0.14, polyType: 2, color: '#168bff' },
      { radius: 5.0, theta: Math.PI * 0.75, y: 2.6, scale: 0.08, polyType: 1, color: '#5cefff' },

      // Right side subtle fragments
      { radius: 6.4, theta: Math.PI * 0.15, y: 2.0, scale: 0.12, polyType: 0, color: '#00d9ff' },
      { radius: 5.6, theta: Math.PI * 0.05, y: -0.6, scale: 0.11, polyType: 2, color: '#19e6ff' },
      { radius: 6.8, theta: Math.PI * 1.85, y: -2.2, scale: 0.15, polyType: 1, color: '#168bff' },
      { radius: 5.2, theta: Math.PI * 0.25, y: 2.8, scale: 0.09, polyType: 0, color: '#5cefff' },
    ];

    for (let i = 0; i < effectiveCount; i++) {
      if (i < fixedAnchors.length) {
        const anchor = fixedAnchors[i];
        data.push({
          radius: anchor.radius * (isMobile ? 0.75 : 1.0),
          theta: anchor.theta,
          y: anchor.y * (isMobile ? 0.8 : 1.0),
          orbitSpeed: (0.012 + Math.random() * 0.02) * (i % 2 === 0 ? 1 : -1),
          rotationSpeed: [(Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.4],
          scale: anchor.scale * (isMobile ? 0.65 : 0.9),
          polyType: anchor.polyType,
          color: anchor.color,
        });
      } else {
        const radius = (isMobile ? 4.5 : 5.8) + Math.random() * 2.0;
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * (isMobile ? 3.0 : 4.5);
        data.push({
          radius,
          theta,
          y,
          orbitSpeed: (0.01 + Math.random() * 0.02) * (i % 2 === 0 ? 1 : -1),
          rotationSpeed: [(Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.4],
          scale: (0.06 + Math.random() * 0.08) * (isMobile ? 0.65 : 0.9),
          polyType: (i % 3) as 0 | 1 | 2,
          color: i % 4 === 0 ? '#00d9ff' : i % 4 === 1 ? '#19e6ff' : i % 4 === 2 ? '#5cefff' : '#168bff',
        });
      }
    }

    return data;
  }, [count, isMobile]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * (prefersReducedMotion ? 0.3 : 1.0);

    asteroidsRef.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const data = asteroids[idx];
      if (!data) return;

      // Orbit around the center
      const currentTheta = data.theta + t * data.orbitSpeed;
      const x = Math.cos(currentTheta) * data.radius;
      const z = Math.sin(currentTheta) * data.radius;
      const yBob = data.y + Math.sin(t * 1.2 + idx) * 0.15;

      mesh.position.set(x, yBob, z);

      // Independent tumbling
      if (!prefersReducedMotion) {
        mesh.rotation.x += delta * data.rotationSpeed[0];
        mesh.rotation.y += delta * data.rotationSpeed[1];
        mesh.rotation.z += delta * data.rotationSpeed[2];
      }
    });
  });

  return (
    <group ref={groupRef}>
      {asteroids.map((ast, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) asteroidsRef.current[i] = el;
          }}
          scale={[ast.scale, ast.scale, ast.scale]}
        >
          {ast.polyType === 0 ? (
            <dodecahedronGeometry args={[1, 0]} />
          ) : ast.polyType === 1 ? (
            <icosahedronGeometry args={[1, 0]} />
          ) : (
            <octahedronGeometry args={[1, 0]} />
          )}
          {/* Futuristic asteroid material: Dark metallic with glowing cyber rims */}
          <meshStandardMaterial
            color="#091224"
            roughness={0.4}
            metalness={0.8}
            emissive={ast.color}
            emissiveIntensity={0.35}
            wireframe={i % 3 === 0}
          />
        </mesh>
      ))}
    </group>
  );
}
