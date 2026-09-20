import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem } from '../../../data/projectsData';

interface ObservatoryEnergyConduitsProps {
  projects: ProjectItem[];
  selectedProjectId: string;
  corePosition?: [number, number, number];
  transitionPhase?: 'idle' | 'collapsing' | 'core-pulse' | 'expanding';
}

export const ObservatoryEnergyConduits: React.FC<ObservatoryEnergyConduitsProps> = ({
  projects,
  selectedProjectId,
  corePosition = [0, 0.25, -0.4],
  transitionPhase = 'idle',
}) => {
  // Energy particle meshes along active connection
  const activeParticlesRef = useRef<THREE.Group>(null);

  // Compute Bezier curves and THREE.Line objects from Core surface to each project world
  const conduitData = useMemo(() => {
    const vCore = new THREE.Vector3(...corePosition);

    return projects.map((project) => {
      const [wx, wy, wz] = project.world3DPosition;
      const vWorld = new THREE.Vector3(wx, wy, wz);

      // Direction from core to world
      const dir = new THREE.Vector3().subVectors(vWorld, vCore).normalize();

      // Start on core outer shell (~1.05 units away from core center)
      const start = vCore.clone().add(dir.clone().multiplyScalar(1.05));

      // Arching midpoint
      const mid = start.clone().lerp(vWorld, 0.5);
      mid.y += 0.22;
      mid.z += 0.12;

      const curve = new THREE.QuadraticBezierCurve3(start, mid, vWorld);
      const points = curve.getPoints(36);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const color = project.themeColor || project.accentColor || '#00f5ff';

      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: project.id === selectedProjectId ? 0.75 : 0.12,
      });

      const lineObject = new THREE.Line(geometry, material);

      return {
        id: project.id,
        color,
        points,
        geometry,
        material,
        lineObject,
        curve,
      };
    });
  }, [projects, corePosition, selectedProjectId]);

  // Find active conduit curve
  const activeConduit = useMemo(() => {
    return conduitData.find((c) => c.id === selectedProjectId) || conduitData[0];
  }, [conduitData, selectedProjectId]);

  // Update line opacities when selectedProjectId changes
  useMemo(() => {
    conduitData.forEach((conduit) => {
      const isSelected = conduit.id === selectedProjectId;
      conduit.material.opacity = isSelected ? 0.8 : 0.14;
      conduit.material.color.set(isSelected ? conduit.color : '#0369a1');
    });
  }, [conduitData, selectedProjectId]);

  // Number of traveling energy photon particles along active connection
  const activePhotonCount = 5;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (activeParticlesRef.current && activeConduit) {
      const children = activeParticlesRef.current.children;

      for (let i = 0; i < children.length; i++) {
        const mesh = children[i] as THREE.Mesh;
        if (!mesh) continue;

        let speed = 0.85;
        let direction = 1; // 1 = outward to world, -1 = inward to core

        if (transitionPhase === 'collapsing') {
          speed = 1.8;
          direction = -1;
        } else if (transitionPhase === 'expanding') {
          speed = 2.4;
          direction = 1;
        }

        const offset = i / activePhotonCount;
        let progress = 0;

        if (direction === 1) {
          progress = (t * speed + offset) % 1;
        } else {
          progress = 1 - ((t * speed + offset) % 1);
        }

        const pos = activeConduit.curve.getPoint(progress);
        mesh.position.copy(pos);

        // Scale pulses along path
        const pulse = Math.sin(progress * Math.PI);
        mesh.scale.setScalar(0.7 + pulse * 0.6);
      }
    }
  });

  return (
    <group>
      {/* 1. Subtle Inactive and Bright Active Curved Conduits via Three.js Line Primitives */}
      {conduitData.map((conduit) => (
        <primitive key={conduit.id} object={conduit.lineObject} />
      ))}

      {/* 2. Active Energy Photons Traveling along Connection */}
      <group ref={activeParticlesRef}>
        {Array.from({ length: activePhotonCount }).map((_, idx) => (
          <mesh key={idx}>
            <sphereGeometry args={[0.048, 12, 12]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={activeConduit?.color || '#00f5ff'}
              emissiveIntensity={1.2}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
