import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem } from '../../../../types';

interface LearningWorld3DProps {
  project?: ProjectItem;
  scale?: number;
}

export const LearningWorld3D: React.FC<LearningWorld3DProps> = ({
  project,
  scale = 1,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const coreTowerRef = useRef<THREE.Group>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);
  const dataPacketsRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const themeColor = project?.accentColor || '#00f5ff';

  // Floating learning nodes data
  const learningNodes = useMemo(() => {
    return [
      { id: 'courses', angle: 0, radius: 1.6, y: 0.6, label: 'Course Catalog', color: '#00f5ff' },
      { id: 'live', angle: (Math.PI * 2) / 3, radius: 1.7, y: 0.85, label: 'Live Lecture', color: '#38bdf8' },
      { id: 'assess', angle: (Math.PI * 4) / 3, radius: 1.55, y: 0.45, label: 'Assignments', color: '#22c55e' },
    ];
  }, []);

  // Ambient particles
  const particleCount = 45;
  const [particlePositions, particleVelocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 0.5 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = 0.2 + Math.random() * 1.8;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = 0.002 + Math.random() * 0.004;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return [pos, vel];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Gentle global hover & slow rotation
    if (rootRef.current) {
      rootRef.current.rotation.y = t * 0.15;
      rootRef.current.position.y = Math.sin(t * 1.2) * 0.06;
    }

    // Central tower pulsation
    if (coreTowerRef.current) {
      coreTowerRef.current.rotation.y = -t * 0.2;
    }

    // Ring pulsation
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
      const s = 1 + Math.sin(t * 2) * 0.03;
      ringRef.current.scale.set(s, s, 1);
    }

    // Orbiting nodes subtle oscillation
    if (nodesGroupRef.current) {
      nodesGroupRef.current.children.forEach((child, idx) => {
        child.position.y = learningNodes[idx].y + Math.sin(t * 2 + idx * 1.5) * 0.08;
      });
    }

    // Animate data flow packets along connection beams
    if (dataPacketsRef.current) {
      dataPacketsRef.current.children.forEach((packet, idx) => {
        const node = learningNodes[idx % learningNodes.length];
        const progress = (t * 0.8 + idx * 0.33) % 1;
        // Interpolate between center building (0, 0.7, 0) and node target
        const nx = Math.cos(node.angle) * node.radius;
        const ny = node.y;
        const nz = Math.sin(node.angle) * node.radius;

        packet.position.x = THREE.MathUtils.lerp(0, nx, progress);
        packet.position.y = THREE.MathUtils.lerp(0.7, ny, progress);
        packet.position.z = THREE.MathUtils.lerp(0, nz, progress);

        // Flash packet scale at mid-flight
        const pScale = Math.sin(progress * Math.PI) * 0.08 + 0.03;
        packet.scale.set(pScale, pScale, pScale);
      });
    }

    // Float particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleVelocities[i * 3 + 1];
        positions[i * 3] += particleVelocities[i * 3];
        positions[i * 3 + 2] += particleVelocities[i * 3 + 2];

        // Wrap around when too high
        if (positions[i * 3 + 1] > 2.2) {
          positions[i * 3 + 1] = 0.2;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={rootRef} scale={scale}>
      {/* ================================================================= */}
      {/* 1. CAMPUS FOUNDATION (FUTURISTIC TERRACE PLATFORM)                */}
      {/* ================================================================= */}
      <group position={[0, -0.2, 0]}>
        {/* Main Base Cylinder */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2.0, 2.2, 0.16, 6]} />
          <meshStandardMaterial
            color="#08101e"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* Upper Cyber Plaza Plate */}
        <mesh position={[0, 0.09, 0]}>
          <cylinderGeometry args={[1.85, 1.95, 0.05, 6]} />
          <meshStandardMaterial
            color="#0b172a"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Outer Glowing Energy Border */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}>
          <ringGeometry args={[1.82, 1.88, 6]} />
          <meshBasicMaterial color={themeColor} transparent opacity={0.7} />
        </mesh>

        {/* Plaza Grid Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.121, 0]}>
          <ringGeometry args={[0.3, 1.75, 24]} />
          <meshBasicMaterial color="#0284c7" wireframe transparent opacity={0.25} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 2. CENTRAL LEARNING BUILDING (ACADEMY ATRIUM & TOWER)             */}
      {/* ================================================================= */}
      <group position={[0, 0, 0]}>
        {/* Atrium Podium Steps */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.7, 0.85, 0.12, 8]} />
          <meshStandardMaterial color="#0d1b2e" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Glass Academy Core Building */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.42, 0.55, 0.7, 8]} />
          <meshStandardMaterial
            color="#0284c7"
            metalness={0.3}
            roughness={0.1}
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* Inner Luminescent Core Pillar */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.8, 8]} />
          <meshBasicMaterial color={themeColor} wireframe transparent opacity={0.8} />
        </mesh>

        {/* Rotating Architectural Fin Spine */}
        <group ref={coreTowerRef} position={[0, 0.45, 0]}>
          {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((rad, i) => (
            <mesh key={i} rotation={[0, rad, 0]} position={[0.42, 0, 0]}>
              <boxGeometry args={[0.04, 0.65, 0.12]} />
              <meshStandardMaterial
                color="#38bdf8"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          ))}
        </group>

        {/* Upper Academy Spire */}
        <mesh position={[0, 0.95, 0]}>
          <coneGeometry args={[0.22, 0.45, 8]} />
          <meshStandardMaterial color="#0e2439" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Beacon Crown */}
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Pulsing Holo Ring around Academy Crown */}
        <mesh
          ref={ringRef}
          position={[0, 0.85, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.55, 0.62, 32]} />
          <meshBasicMaterial color={themeColor} transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>

        <pointLight position={[0, 1.2, 0]} color={themeColor} intensity={2} distance={3.5} />
      </group>

      {/* ================================================================= */}
      {/* 3. FLOATING LEARNING NODES & DATA BRIDGES                         */}
      {/* ================================================================= */}
      <group ref={nodesGroupRef}>
        {learningNodes.map((node) => {
          const x = Math.cos(node.angle) * node.radius;
          const z = Math.sin(node.angle) * node.radius;

          return (
            <group key={node.id} position={[x, node.y, z]}>
              {/* Outer Gyro Ring */}
              <mesh rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[0.2, 0.015, 8, 24]} />
                <meshBasicMaterial color={node.color} transparent opacity={0.7} />
              </mesh>

              {/* Node Core Crystal */}
              <mesh>
                <octahedronGeometry args={[0.13, 0]} />
                <meshStandardMaterial
                  color={node.color}
                  metalness={0.7}
                  roughness={0.15}
                  emissive={node.color}
                  emissiveIntensity={0.6}
                />
              </mesh>

              {/* Downward Telemetry Beacon to Campus Surface */}
              <mesh position={[0, -node.y / 2, 0]}>
                <cylinderGeometry args={[0.008, 0.008, node.y, 6]} />
                <meshBasicMaterial color={node.color} transparent opacity={0.3} />
              </mesh>

              {/* Small Ground Anchor Pad */}
              <mesh position={[0, -node.y + 0.12, 0]}>
                <cylinderGeometry args={[0.14, 0.16, 0.02, 6]} />
                <meshStandardMaterial color="#0c1829" metalness={0.8} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* ================================================================= */}
      {/* 4. SUBTLE DATA CONNECTION LINES TO NODES                          */}
      {/* ================================================================= */}
      <group>
        {learningNodes.map((node) => {
          const nx = Math.cos(node.angle) * node.radius;
          const ny = node.y;
          const nz = Math.sin(node.angle) * node.radius;

          const points = [
            new THREE.Vector3(0, 0.7, 0),
            new THREE.Vector3(nx * 0.4, 0.8, nz * 0.4),
            new THREE.Vector3(nx, ny, nz),
          ];
          const curve = new THREE.CatmullRomCurve3(points);
          const tubeGeo = new THREE.TubeGeometry(curve, 16, 0.012, 6, false);

          return (
            <mesh key={`bridge-${node.id}`} geometry={tubeGeo}>
              <meshBasicMaterial color={node.color} transparent opacity={0.4} />
            </mesh>
          );
        })}
      </group>

      {/* ================================================================= */}
      {/* 5. ANIMATED FLOWING DATA PACKETS                                  */}
      {/* ================================================================= */}
      <group ref={dataPacketsRef}>
        {learningNodes.map((_, i) => (
          <mesh key={`pkt-${i}`}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>

      {/* ================================================================= */}
      {/* 6. GLOWING AMBIENT PARTICLES                                      */}
      {/* ================================================================= */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color={themeColor}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Local Ambient / Fill Lights */}
      <pointLight position={[0, 0.5, 0]} color="#00f5ff" intensity={1.2} distance={3} />
      <pointLight position={[0, -0.3, 0]} color="#38bdf8" intensity={0.8} distance={2.5} />
    </group>
  );
};
