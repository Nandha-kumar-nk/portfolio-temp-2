import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SwayamCampusWorldProps {
  isMobile?: boolean;
}

export const SwayamCampusWorld: React.FC<SwayamCampusWorldProps> = ({ isMobile = false }) => {
  const worldGroupRef = useRef<THREE.Group>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // 1. Procedural Campus Foundation Grid Lines
  const gridRings = useMemo(() => {
    const rings: { radius: number; opacity: number }[] = [
      { radius: 0.45, opacity: 0.5 },
      { radius: 0.75, opacity: 0.35 },
      { radius: 1.05, opacity: 0.2 },
    ];
    return rings;
  }, []);

  // 2. Learning Nodes Data (Glowing Orbs)
  const learningNodes = useMemo(() => [
    { id: 'node-core', pos: [0, 0.75, -0.3] as [number, number, number], color: '#38bdf8', size: 0.05, speed: 1.8, phase: 0 },
    { id: 'node-lib', pos: [-0.48, 0.12, -0.2] as [number, number, number], color: '#00f5ff', size: 0.042, speed: 2.1, phase: 1.2 },
    { id: 'node-lab', pos: [0.52, 0.22, -0.25] as [number, number, number], color: '#38bdf8', size: 0.045, speed: 1.6, phase: 2.4 },
    { id: 'node-collab', pos: [-0.28, -0.25, 0.05] as [number, number, number], color: '#f59e0b', size: 0.038, speed: 2.4, phase: 3.5 },
    { id: 'node-eval', pos: [0.32, -0.28, 0.02] as [number, number, number], color: '#10b981', size: 0.038, speed: 1.9, phase: 4.8 },
  ], []);

  // 3. Thin Data Connections (Line Segments linking campus nodes)
  const connectionLines = useMemo(() => {
    const lines: THREE.Line[] = [];
    const pointsPairs: [ [number, number, number], [number, number, number], string ][] = [
      [[0, 0.75, -0.3], [-0.48, 0.12, -0.2], '#00f5ff'],
      [[0, 0.75, -0.3], [0.52, 0.22, -0.25], '#38bdf8'],
      [[0, 0.75, -0.3], [0, 0.15, -0.3], '#00f5ff'],
      [[-0.48, 0.12, -0.2], [-0.28, -0.25, 0.05], '#00f5ff'],
      [[0.52, 0.22, -0.25], [0.32, -0.28, 0.02], '#38bdf8'],
      [[-0.28, -0.25, 0.05], [0.32, -0.28, 0.02], '#f59e0b'],
    ];

    pointsPairs.forEach(([p1, p2, color]) => {
      const v1 = new THREE.Vector3(...p1);
      const v2 = new THREE.Vector3(...p2);
      // Gentle arching midpoint
      const mid = v1.clone().lerp(v2, 0.5);
      mid.y += 0.05;
      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      const curvePoints = curve.getPoints(16);
      const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.4,
      });
      lines.push(new THREE.Line(geometry, material));
    });

    return lines;
  }, []);

  // 4. Subtle Floating Knowledge Particles
  const particleData = useMemo(() => {
    const count = isMobile ? 22 : 36;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const bounds = { x: 0.9, y: 1.6, z: 0.6 };

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2 * bounds.x;
      positions[i * 3 + 1] = -0.8 + Math.random() * bounds.y;
      positions[i * 3 + 2] = -0.4 + (Math.random() - 0.5) * bounds.z;
      speeds[i] = 0.12 + Math.random() * 0.18;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: new THREE.Color('#38bdf8'),
      size: 0.028,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    return { geometry, material, count, speeds, positions };
  }, [isMobile]);

  // Frame animation: slow breathing, node oscillation, rising particles
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Subtle campus group idle breath
    if (worldGroupRef.current) {
      worldGroupRef.current.rotation.y = Math.sin(t * 0.35) * 0.05;
      worldGroupRef.current.position.y = -0.15 + Math.sin(t * 0.6) * 0.015;
    }

    // 2. Oscillate learning nodes
    if (nodesGroupRef.current) {
      const children = nodesGroupRef.current.children;
      learningNodes.forEach((node, idx) => {
        const mesh = children[idx] as THREE.Mesh;
        if (mesh) {
          mesh.position.y = node.pos[1] + Math.sin(t * node.speed + node.phase) * 0.035;
          mesh.position.x = node.pos[0] + Math.cos(t * (node.speed * 0.7) + node.phase) * 0.015;
        }
      });
    }

    // 3. Float knowledge particles upward
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < particleData.count; i++) {
        // move y upward
        arr[i * 3 + 1] += particleData.speeds[i] * 0.005;
        // reset if above upper threshold
        if (arr[i * 3 + 1] > 1.05) {
          arr[i * 3 + 1] = -0.85;
          arr[i * 3] = (Math.random() - 0.5) * 1.6;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={worldGroupRef} position={[0, -0.15, -0.2]}>
      {/* Soft atmospheric internal point lights */}
      <pointLight position={[0, 0.6, -0.1]} intensity={1.8} color="#00f5ff" distance={3.5} />
      <pointLight position={[-0.6, -0.3, 0.4]} intensity={1.0} color="#38bdf8" distance={2.5} />
      <pointLight position={[0.6, -0.2, 0.3]} intensity={0.9} color="#f59e0b" distance={2.5} />

      {/* ========================================================================= */}
      {/* 1. CAMPUS PLATFORM & FOUNDATION                                          */}
      {/* ========================================================================= */}
      {/* Base Disc */}
      <mesh position={[0, -0.9, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.1, 1.15, 0.06, 32]} />
        <meshStandardMaterial
          color="#070f20"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Outer Luminous Platform Bevel Ring */}
      <mesh position={[0, -0.87, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.08, 1.12, 32]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Concentric Procedural Grid Rings */}
      {gridRings.map((ring, idx) => (
        <mesh key={idx} position={[0, -0.865, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ring.radius - 0.008, ring.radius, 32]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={ring.opacity} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* ========================================================================= */}
      {/* 2. PROCEDURAL CAMPUS BUILDINGS (Minimalist & Premium)                      */}
      {/* ========================================================================= */}

      {/* A. Central Knowledge Spire (Main Academic Tower) */}
      <group position={[0, -0.32, -0.3]}>
        {/* Lower tier */}
        <mesh position={[0, -0.25, 0]}>
          <boxGeometry args={[0.34, 0.58, 0.34]} />
          <meshStandardMaterial color="#0b162c" metalness={0.75} roughness={0.25} />
        </mesh>
        {/* Horizontal cyan light band on tower */}
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.346, 0.03, 0.346]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.85} />
        </mesh>

        {/* Upper tier */}
        <mesh position={[0, 0.16, 0]}>
          <boxGeometry args={[0.24, 0.36, 0.24]} />
          <meshStandardMaterial color="#0f203e" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Upper light band */}
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.246, 0.025, 0.246]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.9} />
        </mesh>

        {/* Spire needle */}
        <mesh position={[0, 0.46, 0]}>
          <cylinderGeometry args={[0.015, 0.035, 0.28, 8]} />
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.6} />
        </mesh>

        {/* Spire tip crown */}
        <mesh position={[0, 0.61, 0]}>
          <sphereGeometry args={[0.024, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* B. Library & Digital Archive Wing (Left) */}
      <group position={[-0.48, -0.52, -0.2]} rotation={[0, 0.25, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.65, 0.28]} />
          <meshStandardMaterial color="#091428" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Slanted glass solar roof */}
        <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.32, 0.05, 0.3]} />
          <meshStandardMaterial color="#0284c7" emissive="#00f5ff" emissiveIntensity={0.3} />
        </mesh>
        {/* Vertical window slits */}
        <mesh position={[0.155, 0, 0]}>
          <boxGeometry args={[0.01, 0.45, 0.18]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* C. Research & Innovation Laboratory (Right) */}
      <group position={[0.5, -0.48, -0.25]} rotation={[0, -0.22, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.28, 0.74, 0.26]} />
          <meshStandardMaterial color="#091428" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Dual luminous vertical bands */}
        <mesh position={[-0.145, 0, 0]}>
          <boxGeometry args={[0.01, 0.52, 0.16]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
        </mesh>
        {/* Upper observatory dome */}
        <mesh position={[0, 0.41, 0]}>
          <sphereGeometry args={[0.08, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#0284c7" emissive="#38bdf8" emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* D. Collaborative Student Hub (Foreground Left) */}
      <group position={[-0.28, -0.68, 0.08]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.26, 0.36, 0.24]} />
          <meshStandardMaterial color="#0b172e" metalness={0.75} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.19, 0]}>
          <boxGeometry args={[0.28, 0.02, 0.26]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.8} />
        </mesh>
      </group>

      {/* E. Evaluation & Assessment Center (Foreground Right) */}
      <group position={[0.32, -0.7, 0.05]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.24, 0.32, 0.22]} />
          <meshStandardMaterial color="#0b172e" metalness={0.75} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.17, 0]}>
          <boxGeometry args={[0.26, 0.02, 0.24]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.8} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 3. GLOWING LEARNING NODES                                                 */}
      {/* ========================================================================= */}
      <group ref={nodesGroupRef}>
        {learningNodes.map((node) => (
          <mesh key={node.id} position={node.pos}>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={node.color}
              emissiveIntensity={1.8}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>

      {/* ========================================================================= */}
      {/* 4. THIN DATA CONNECTIONS                                                  */}
      {/* ========================================================================= */}
      {connectionLines.map((line, idx) => (
        <primitive key={idx} object={line} />
      ))}

      {/* ========================================================================= */}
      {/* 5. FLOATING KNOWLEDGE PARTICLES                                           */}
      {/* ========================================================================= */}
      <points ref={particlesRef} geometry={particleData.geometry} material={particleData.material} />
    </group>
  );
};
