import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ExhibitionCosmos3DProps {
  isMobile?: boolean;
  isTransitioning?: boolean;
}

export const ExhibitionCosmos3D: React.FC<ExhibitionCosmos3DProps> = ({
  isMobile = false,
  isTransitioning = false,
}) => {
  const particlesRef = useRef<THREE.Points>(null);
  const asteroidsGroupRef = useRef<THREE.Group>(null);

  // Floating Cosmic Dust Particles
  const particleData = useMemo(() => {
    const count = isMobile ? 220 : 650;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const cCyan = new THREE.Color('#00f5ff');
    const cSky = new THREE.Color('#38bdf8');
    const cWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = -1.2 + Math.random() * 6.5;
      positions[i * 3 + 2] = -8 + Math.random() * 11;

      speeds[i] = 0.2 + Math.random() * 0.4;

      const pickColor = Math.random() > 0.6 ? cCyan : Math.random() > 0.3 ? cSky : cWhite;
      colors[i * 3] = pickColor.r;
      colors[i * 3 + 1] = pickColor.g;
      colors[i * 3 + 2] = pickColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.035 : 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    return { geometry, material, count, speeds, positions };
  }, [isMobile]);

  // Asteroid boulder positions (matching the reference background rocks)
  const asteroids = useMemo(() => [
    { pos: [-4.6, 1.8, -4.5] as [number, number, number], scale: 0.45, rotSpeed: 0.2 },
    { pos: [-5.2, 0.4, -3.2] as [number, number, number], scale: 0.35, rotSpeed: -0.15 },
    { pos: [4.8, 1.5, -4.2] as [number, number, number], scale: 0.5, rotSpeed: 0.18 },
    { pos: [5.4, 0.2, -3.5] as [number, number, number], scale: 0.32, rotSpeed: -0.25 },
  ], []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Animate particles (accelerate into motion streaks during transition)
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      const speedMult = isTransitioning ? 3.5 : 1.0;

      for (let i = 0; i < particleData.count; i++) {
        // Particles drift forward and slowly upward
        arr[i * 3 + 2] += particleData.speeds[i] * delta * speedMult * 2.2;
        arr[i * 3 + 1] += Math.sin(t + i) * 0.0015;

        // Reset if reached camera threshold
        if (arr[i * 3 + 2] > 3.5) {
          arr[i * 3 + 2] = -8.0;
          arr[i * 3] = (Math.random() - 0.5) * 16;
          arr[i * 3 + 1] = -1.2 + Math.random() * 6.5;
        }
      }
      posAttr.needsUpdate = true;
    }

    // Slow tumble of background asteroids
    if (asteroidsGroupRef.current) {
      asteroidsGroupRef.current.children.forEach((ast, idx) => {
        ast.rotation.x += delta * (idx % 2 === 0 ? 0.1 : -0.08);
        ast.rotation.y += delta * (idx % 2 === 0 ? 0.12 : -0.1);
      });
    }
  });

  return (
    <group>
      {/* 1. Deep Celestial Starfield (Distant Stars) */}
      <mesh position={[0, 2, -10]}>
        <planeGeometry args={[30, 20]} />
        <meshBasicMaterial color="#020510" />
      </mesh>

      {/* 2. Giant Distant Blue Celestial Moon / Planet (Upper Left) */}
      <group position={[-5.8, 3.2, -7.5]}>
        {/* Planet Sphere */}
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color="#041b3d"
            emissive="#0284c7"
            emissiveIntensity={0.35}
            roughness={0.7}
          />
        </mesh>
        {/* Planet Atmosphere Glow Rim */}
        <mesh scale={1.06}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* 3. Floating Space Asteroid / Meteorite Rocks */}
      <group ref={asteroidsGroupRef}>
        {asteroids.map((ast, idx) => (
          <mesh key={idx} position={ast.pos} scale={ast.scale}>
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color="#0f172a"
              roughness={0.85}
              metalness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* 4. Nebula Radiance Backdrop Haze */}
      <mesh position={[0, 2.5, -6.5]}>
        <planeGeometry args={[18, 10]} />
        <meshBasicMaterial
          color="#031633"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 5. Floating Cosmic Particles */}
      <primitive
        ref={particlesRef}
        object={new THREE.Points(particleData.geometry, particleData.material)}
      />
    </group>
  );
};
