import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ProjectSpecificInternalsProps {
  projectId: string;
  accentColor: string;
  dissolveProgress: number; // 0 to 1 during transition
}

export const ProjectSpecificInternals: React.FC<ProjectSpecificInternalsProps> = ({
  projectId,
  accentColor,
  dissolveProgress = 0,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;

      if (dissolveProgress > 0) {
        const s = Math.max(0.001, 1 - dissolveProgress);
        groupRef.current.scale.setScalar(s);
      } else {
        groupRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {projectId === 'swayam-2' && <SwayamKnowledgeInternals accentColor={accentColor} />}
      {projectId === 'speed-taxi' && <SpeedTaxiTransitInternals accentColor={accentColor} />}
      {projectId === 'wildlife-ai' && <WildlifeRadarInternals accentColor={accentColor} />}
      {projectId === 'resume-forge' && <ResumeForgeDocumentInternals accentColor={accentColor} />}
      {projectId === 'nk-mern-cli' && <MernCliDevInternals accentColor={accentColor} />}
    </group>
  );
};

// 1. SWAYAM 2.0: Knowledge nodes, orbital learning rings & academic beacons
const SwayamKnowledgeInternals: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const nodes = useMemo(() => {
    return [
      [0.9, 0.4, 0.2],
      [-0.8, -0.3, 0.4],
      [0.3, -0.7, -0.6],
      [-0.5, 0.6, -0.5],
      [0.7, -0.2, 0.7],
    ] as [number, number, number][];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.x = t * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.35;
  });

  return (
    <group>
      {/* Orbital Learning Ellipse 1 */}
      <mesh ref={ring1Ref} rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[1.1, 0.012, 16, 48]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.65} />
      </mesh>

      {/* Orbital Learning Ellipse 2 */}
      <mesh ref={ring2Ref} rotation={[-0.5, -0.3, 0.4]}>
        <torusGeometry args={[0.95, 0.01, 16, 48]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
      </mesh>

      {/* Knowledge Nodes */}
      {nodes.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <octahedronGeometry args={[0.06, 0]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
      ))}
    </group>
  );
};

// 2. SPEED TAXI: Road vectors, city grid lines & vehicle telemetry nodes
const SpeedTaxiTransitInternals: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pulseRef.current) {
      const p = (t * 0.8) % 1;
      pulseRef.current.position.x = -0.8 + p * 1.6;
      pulseRef.current.position.z = Math.sin(p * Math.PI) * 0.4;
    }
  });

  return (
    <group>
      {/* 3D Vector Road Paths */}
      <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.72, 32]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.6} />
      </mesh>

      {/* Cross transit grid */}
      <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
        <planeGeometry args={[1.5, 0.02]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>

      {/* Moving Telemetry Pulse Cab */}
      <mesh ref={pulseRef} position={[-0.8, -0.38, 0]}>
        <boxGeometry args={[0.08, 0.05, 0.12]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
    </group>
  );
};

// 3. AI WILDLIFE CONFLICT SHIELD: Geospatial scanning radar & detection pulses
const WildlifeRadarInternals: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const sweepRef = useRef<THREE.Mesh>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sweepRef.current) sweepRef.current.rotation.y = t * 1.2;
    if (pulseRingRef.current) {
      const p = (t * 0.6) % 1;
      pulseRingRef.current.scale.setScalar(0.2 + p * 1.2);
      (pulseRingRef.current.material as THREE.Material).opacity = Math.max(0, 0.7 * (1 - p));
    }
  });

  return (
    <group>
      {/* Radar Scan Dish Ring */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.62, 32]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.5} />
      </mesh>

      {/* Expanding Detection Ring */}
      <mesh ref={pulseRingRef} position={[0, -0.49, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.53, 32]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.7} />
      </mesh>

      {/* Sweeping Radar Beam */}
      <mesh ref={sweepRef} position={[0, -0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.65, 0.02]} />
        <meshBasicMaterial color="#86efac" transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

// 4. RESUME FORGE: Floating document layers & ATS career beacons
const ResumeForgeDocumentInternals: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const docGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (docGroupRef.current) {
      docGroupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group ref={docGroupRef}>
      {/* Back Layer Document Plane */}
      <mesh position={[-0.2, 0.1, -0.2]} rotation={[0, 0.2, 0]}>
        <planeGeometry args={[0.6, 0.85]} />
        <meshBasicMaterial color="#3b4261" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Front Layer Document Plane */}
      <mesh position={[0.2, -0.1, 0.2]} rotation={[0, -0.15, 0]}>
        <planeGeometry args={[0.5, 0.75]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// 5. NK MERN CLI: Terminal bracket symbols & developer pipeline energy
const MernCliDevInternals: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const bracketsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (bracketsRef.current) {
      bracketsRef.current.rotation.z = Math.sin(t * 0.6) * 0.15;
    }
  });

  return (
    <group ref={bracketsRef}>
      {/* Dev Terminal Wireframe Cube Cage */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshBasicMaterial color={accentColor} wireframe transparent opacity={0.35} />
      </mesh>

      {/* Floating Node points */}
      <mesh position={[0.4, 0.4, 0.4]}>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
      <mesh position={[-0.4, -0.4, -0.4]}>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshBasicMaterial color="#eab308" />
      </mesh>
    </group>
  );
};
