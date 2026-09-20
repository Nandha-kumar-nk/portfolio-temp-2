import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem } from '../../../../types';

interface DeveloperSystemWorld3DProps {
  project?: ProjectItem;
  scale?: number;
}

export const DeveloperSystemWorld3D: React.FC<DeveloperSystemWorld3DProps> = ({
  project,
  scale = 1,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const terminalRef = useRef<THREE.Group>(null);
  const archNodesRef = useRef<THREE.Group>(null);
  const laserBeamsRef = useRef<THREE.Group>(null);
  const cursorRef = useRef<THREE.Mesh>(null);

  const themeColor = project?.accentColor || '#00f5ff';

  // Architecture nodes data (MERN stack layers)
  const archNodes = useMemo(() => {
    return [
      { id: 'client', name: 'client/ (React)', x: -1.0, y: 0.35, z: 0.5, color: '#00f5ff' },
      { id: 'server', name: 'server/ (Express)', x: 1.0, y: 0.35, z: 0.5, color: '#38bdf8' },
      { id: 'db', name: 'models/ (MongoDB)', x: -0.7, y: 0.7, z: -0.6, color: '#22c55e' },
      { id: 'docker', name: 'docker-compose', x: 0.7, y: 0.7, z: -0.6, color: '#0284c7' },
    ];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // World hover
    if (rootRef.current) {
      rootRef.current.position.y = Math.sin(t * 1.2) * 0.05;
      rootRef.current.rotation.y = t * 0.12;
    }

    // Terminal floating oscillation
    if (terminalRef.current) {
      terminalRef.current.position.y = 0.45 + Math.sin(t * 2) * 0.03;
      terminalRef.current.rotation.x = 0.08 + Math.cos(t * 1.5) * 0.03;
    }

    // Cursor blink
    if (cursorRef.current) {
      cursorRef.current.visible = Math.floor(t * 2.5) % 2 === 0;
    }

    // Architecture nodes gentle float
    if (archNodesRef.current) {
      archNodesRef.current.children.forEach((child, idx) => {
        child.position.y = archNodes[idx].y + Math.sin(t * 2.2 + idx * 1.2) * 0.05;
      });
    }

    // Code generation laser pulse scale
    if (laserBeamsRef.current) {
      laserBeamsRef.current.children.forEach((beam, idx) => {
        const mat = (beam as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = 0.2 + Math.abs(Math.sin(t * 3 + idx * 1.5)) * 0.6;
        }
      });
    }
  });

  return (
    <group ref={rootRef} scale={scale}>
      {/* ================================================================= */}
      {/* 1. CYBER MATRIX PLATFORM                                          */}
      {/* ================================================================= */}
      <group position={[0, -0.18, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2.0, 2.2, 0.18, 8]} />
          <meshStandardMaterial color="#07111c" metalness={0.9} roughness={0.2} />
        </mesh>

        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[1.85, 1.95, 0.04, 8]} />
          <meshStandardMaterial color="#0a1929" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Outer Cyan Rim */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.125, 0]}>
          <ringGeometry args={[1.82, 1.88, 8]} />
          <meshBasicMaterial color={themeColor} transparent opacity={0.7} />
        </mesh>

        {/* Matrix Grid Lines */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.126, 0]}>
          <ringGeometry args={[0.3, 1.75, 24]} />
          <meshBasicMaterial color="#0284c7" wireframe transparent opacity={0.25} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 2. PROCEDURAL HOLOGRAPHIC TERMINAL WINDOW                         */}
      {/* ================================================================= */}
      <group ref={terminalRef} position={[0, 0.45, 0]}>
        {/* Terminal Glass Slab */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.95, 0.04]} />
          <meshStandardMaterial
            color="#091424"
            metalness={0.6}
            roughness={0.2}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Terminal Neon Outer Rim */}
        <mesh position={[0, 0, 0.021]}>
          <planeGeometry args={[1.5, 0.95]} />
          <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.4} />
        </mesh>

        {/* Header Bar */}
        <mesh position={[0, 0.4, 0.022]}>
          <planeGeometry args={[1.46, 0.09]} />
          <meshStandardMaterial color="#0d2138" />
        </mesh>

        {/* Window Control Buttons (Red, Yellow, Green) */}
        <group position={[-0.62, 0.4, 0.025]}>
          <mesh position={[0, 0, 0]}>
            <circleGeometry args={[0.022, 12]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh position={[0.065, 0, 0]}>
            <circleGeometry args={[0.022, 12]} />
            <meshBasicMaterial color="#eab308" />
          </mesh>
          <mesh position={[0.13, 0, 0]}>
            <circleGeometry args={[0.022, 12]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
        </group>

        {/* Animated Command Lines Representation */}
        <group position={[-0.65, 0.25, 0.025]}>
          {/* Prompt: $ npx nk-mern-cli init */}
          <mesh position={[0.25, 0, 0]}>
            <planeGeometry args={[0.5, 0.035]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>

          {/* Line 2: ✔ Scaffolding client/ (React + Vite) */}
          <mesh position={[0.35, -0.09, 0]}>
            <planeGeometry args={[0.7, 0.03]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>

          {/* Line 3: ✔ Scaffolding server/ (Express + JWT) */}
          <mesh position={[0.35, -0.17, 0]}>
            <planeGeometry args={[0.7, 0.03]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>

          {/* Line 4: ✔ Configured Docker containers */}
          <mesh position={[0.32, -0.25, 0]}>
            <planeGeometry args={[0.64, 0.03]} />
            <meshBasicMaterial color="#00f5ff" />
          </mesh>

          {/* Line 5: ✔ System initialized successfully */}
          <mesh position={[0.38, -0.33, 0]}>
            <planeGeometry args={[0.76, 0.035]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Blinking Cursor */}
          <mesh ref={cursorRef} position={[0.8, -0.33, 0]}>
            <planeGeometry args={[0.035, 0.045]} />
            <meshBasicMaterial color="#00f5ff" />
          </mesh>
        </group>
      </group>

      {/* ================================================================= */}
      {/* 3. PROJECT ARCHITECTURE & DIRECTORY NODES                         */}
      {/* ================================================================= */}
      <group ref={archNodesRef}>
        {archNodes.map((node) => (
          <group key={node.id} position={[node.x, node.y, node.z]}>
            {/* Modular Cube Node */}
            <mesh>
              <boxGeometry args={[0.32, 0.25, 0.32]} />
              <meshStandardMaterial
                color="#0f2238"
                metalness={0.8}
                roughness={0.2}
                emissive={node.color}
                emissiveIntensity={0.2}
              />
            </mesh>

            {/* Glowing Wireframe Trim */}
            <mesh>
              <boxGeometry args={[0.322, 0.252, 0.322]} />
              <meshBasicMaterial color={node.color} wireframe transparent opacity={0.65} />
            </mesh>

            {/* Node Status LED */}
            <mesh position={[0, 0.14, 0]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial color={node.color} />
            </mesh>

            {/* Ground Anchor Pillar */}
            <mesh position={[0, -node.y / 2, 0]}>
              <cylinderGeometry args={[0.012, 0.012, node.y, 6]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.3} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================================================================= */}
      {/* 4. CODE GENERATION LASER BEAMS                                    */}
      {/* ================================================================= */}
      <group ref={laserBeamsRef}>
        {archNodes.map((node) => {
          const points = [
            new THREE.Vector3(0, 0.45, 0),
            new THREE.Vector3(node.x * 0.5, 0.5, node.z * 0.5),
            new THREE.Vector3(node.x, node.y, node.z),
          ];
          const curve = new THREE.CatmullRomCurve3(points);
          const tubeGeo = new THREE.TubeGeometry(curve, 16, 0.014, 6, false);

          return (
            <mesh key={`laser-${node.id}`} geometry={tubeGeo}>
              <meshBasicMaterial color={node.color} transparent opacity={0.5} />
            </mesh>
          );
        })}
      </group>

      {/* Point Lights */}
      <pointLight position={[0, 1.2, 0.5]} color="#00f5ff" intensity={1.8} distance={3.5} />
      <pointLight position={[0, -0.2, 0]} color="#38bdf8" intensity={1} distance={2.5} />
    </group>
  );
};
