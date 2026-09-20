import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingAsteroids3D: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const asteroids = useMemo(() => {
    return [
      { pos: [-6.8, 3.2, -2.5] as [number, number, number], size: 0.35, rotSpeed: 0.15, rotAxis: [1, 0.5, 0] },
      { pos: [7.2, 2.8, -2.8] as [number, number, number], size: 0.42, rotSpeed: -0.12, rotAxis: [0.5, 1, 0.2] },
      { pos: [-7.5, -2.4, -1.8] as [number, number, number], size: 0.38, rotSpeed: 0.18, rotAxis: [-0.2, 1, 0.5] },
      { pos: [6.9, -3.1, -1.9] as [number, number, number], size: 0.45, rotSpeed: -0.14, rotAxis: [0.8, -0.4, 0.1] },
      { pos: [0, 5.2, -3.2] as [number, number, number], size: 0.5, rotSpeed: 0.1, rotAxis: [0, 1, 0] },
      { pos: [-4.5, 4.8, -2.0] as [number, number, number], size: 0.28, rotSpeed: 0.22, rotAxis: [1, 1, 0] },
      { pos: [5.1, 4.5, -2.2] as [number, number, number], size: 0.32, rotSpeed: -0.2, rotAxis: [0, 0.5, 1] },
    ];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      {asteroids.map((ast, idx) => (
        <mesh
          key={idx}
          position={ast.pos}
          rotation={[idx * 1.2, idx * 0.8, idx * 0.5]}
        >
          <dodecahedronGeometry args={[ast.size, 1]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.9}
            metalness={0.2}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
};
