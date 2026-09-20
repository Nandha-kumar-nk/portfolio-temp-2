import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem } from '../../../../types';

interface AiForestWorld3DProps {
  project?: ProjectItem;
  scale?: number;
}

export const AiForestWorld3D: React.FC<AiForestWorld3DProps> = ({
  project,
  scale = 1,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const scanPlaneRef = useRef<THREE.Group>(null);
  const radarPulseRef = useRef<THREE.Mesh>(null);
  const targetGroupRef = useRef<THREE.Group>(null);

  const themeColor = project?.accentColor || '#22c55e';

  // Procedural tree cluster
  const trees = useMemo(() => {
    const list: { x: number; z: number; scale: number; h: number }[] = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const radius = 0.5 + Math.random() * 1.35;
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      list.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        scale: 0.7 + Math.random() * 0.5,
        h: 0.5 + Math.random() * 0.4,
      });
    }
    return list;
  }, []);

  // Animal detection markers
  const detectionMarkers = useMemo(() => {
    return [
      { id: 'target-1', x: -0.85, z: 0.45, label: 'Elephant #04', conf: '98.4%' },
      { id: 'target-2', x: 0.75, z: -0.65, label: 'Tiger #02', conf: '96.1%' },
      { id: 'target-3', x: 0.35, z: 0.95, label: 'Herd Cluster', conf: '94.8%' },
    ];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // World gentle hover
    if (rootRef.current) {
      rootRef.current.rotation.y = t * 0.14;
      rootRef.current.position.y = Math.sin(t * 1.2) * 0.05;
    }

    // AI LiDAR Scanning Grid Plane sweep (sweeps back and forth)
    if (scanPlaneRef.current) {
      scanPlaneRef.current.position.y = 0.4 + Math.sin(t * 1.8) * 0.35;
    }

    // Radar scanning pulse expansion
    if (radarPulseRef.current) {
      const p = (t * 0.8) % 1;
      const s = THREE.MathUtils.lerp(0.2, 2.0, p);
      radarPulseRef.current.scale.set(s, s, 1);
      const mat = radarPulseRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = (1 - p) * 0.6;
      }
    }

    // Target markers oscillation
    if (targetGroupRef.current) {
      targetGroupRef.current.children.forEach((child, idx) => {
        child.position.y = 0.5 + Math.sin(t * 3 + idx * 2) * 0.05;
      });
    }
  });

  return (
    <group ref={rootRef} scale={scale}>
      {/* ================================================================= */}
      {/* 1. DARK FOREST TERRAIN BASE                                       */}
      {/* ================================================================= */}
      <group position={[0, -0.12, 0]}>
        {/* Base Cylinder */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2.0, 2.2, 0.2, 12]} />
          <meshStandardMaterial color="#08140c" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Forest Organic Ground Mound */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[1.88, 1.98, 0.08, 12]} />
          <meshStandardMaterial color="#0b1e12" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Outer Bio-luminescent Rim */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.142, 0]}>
          <ringGeometry args={[1.84, 1.9, 12]} />
          <meshBasicMaterial color={themeColor} transparent opacity={0.65} />
        </mesh>

        {/* Terrain Topo Grid Lines */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.143, 0]}>
          <ringGeometry args={[0.2, 1.78, 24]} />
          <meshBasicMaterial color="#166534" wireframe transparent opacity={0.3} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 2. PROCEDURAL TREES (LOW-POLY BIOME CANOPY)                       */}
      {/* ================================================================= */}
      <group position={[0, 0.02, 0]}>
        {trees.map((tr, idx) => (
          <group key={idx} position={[tr.x, 0, tr.z]} scale={tr.scale}>
            {/* Trunk */}
            <mesh position={[0, tr.h * 0.3, 0]}>
              <cylinderGeometry args={[0.03, 0.05, tr.h * 0.6, 5]} />
              <meshStandardMaterial color="#1a2e1d" roughness={0.9} />
            </mesh>

            {/* Lower Foliage Cone */}
            <mesh position={[0, tr.h * 0.6, 0]}>
              <coneGeometry args={[0.24, tr.h * 0.6, 6]} />
              <meshStandardMaterial
                color="#0f3920"
                roughness={0.4}
                metalness={0.2}
              />
            </mesh>

            {/* Upper Foliage Cone */}
            <mesh position={[0, tr.h * 0.9, 0]}>
              <coneGeometry args={[0.18, tr.h * 0.5, 6]} />
              <meshStandardMaterial
                color="#15803d"
                roughness={0.3}
                emissive="#15803d"
                emissiveIntensity={0.15}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================================================================= */}
      {/* 3. CENTRAL IOT TELEMETRY SENSOR TOWER                             */}
      {/* ================================================================= */}
      <group position={[0, 0.02, 0]}>
        {/* Foundation mount */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.1, 6]} />
          <meshStandardMaterial color="#0e2417" metalness={0.9} />
        </mesh>

        {/* Mast Lattice */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.04, 0.8, 6]} />
          <meshStandardMaterial color="#22c55e" metalness={0.8} />
        </mesh>

        {/* Telemetry Sensor Head */}
        <mesh position={[0, 0.92, 0]}>
          <octahedronGeometry args={[0.09, 0]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
        </mesh>

        {/* Solar Paneling */}
        <mesh position={[0, 0.75, 0]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.22, 0.02, 0.12]} />
          <meshStandardMaterial color="#0284c7" metalness={0.9} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 4. EXPANDING RADAR SCANNING PULSE                                 */}
      {/* ================================================================= */}
      <mesh
        ref={radarPulseRef}
        position={[0, 0.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.95, 1.0, 32]} />
        <meshBasicMaterial color={themeColor} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* ================================================================= */}
      {/* 5. AI LIDAR SCANNING GRID PLANE                                   */}
      {/* ================================================================= */}
      <group ref={scanPlaneRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.2, 3.2]} />
          <meshBasicMaterial
            color="#22c55e"
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>

        {/* High-intensity scan beam border */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.58, 1.6, 32]} />
          <meshBasicMaterial color="#86efac" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 6. GLOWING ANIMAL-DETECTION TARGET MARKERS                        */}
      {/* ================================================================= */}
      <group ref={targetGroupRef}>
        {detectionMarkers.map((marker) => (
          <group key={marker.id} position={[marker.x, 0.5, marker.z]}>
            {/* Holographic Target Reticle */}
            <mesh rotation={[0, 0, 0]}>
              <torusGeometry args={[0.16, 0.012, 6, 24]} />
              <meshBasicMaterial color="#22c55e" transparent opacity={0.8} />
            </mesh>

            {/* Center target dot */}
            <mesh>
              <sphereGeometry args={[0.04, 10, 10]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Vertical Telemetry Line to Forest Floor */}
            <mesh position={[0, -0.25, 0]}>
              <cylinderGeometry args={[0.005, 0.005, 0.5, 4]} />
              <meshBasicMaterial color="#22c55e" transparent opacity={0.4} />
            </mesh>

            {/* Ground Ping Ring */}
            <mesh position={[0, -0.49, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.08, 0.12, 16]} />
              <meshBasicMaterial color="#22c55e" transparent opacity={0.7} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Environmental Bio-lights */}
      <pointLight position={[0, 1.1, 0]} color="#22c55e" intensity={1.8} distance={3.5} />
      <pointLight position={[0, 0.3, 0]} color="#15803d" intensity={1.2} distance={2.5} />
    </group>
  );
};
