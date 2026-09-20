import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CrystalThematicInteriorProps {
  projectId: string;
  accentColor: string;
  dissolveProgress: number; // 0 (active) to 1 (dissolved)
  isMobile?: boolean;
}

export const CrystalThematicInterior: React.FC<CrystalThematicInteriorProps> = ({
  projectId,
  accentColor,
  dissolveProgress = 0,
  isMobile = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    // Gentle thematic floating & subtle sway
    groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.08;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.02;

    // Transition dissolution scale and visibility
    const visibleScale = Math.max(0.001, 1 - dissolveProgress * 0.8);
    groupRef.current.scale.setScalar(visibleScale);
    groupRef.current.visible = dissolveProgress < 0.95;
  });

  return (
    <group ref={groupRef} position={[0, 0, -0.08]}>
      {projectId === 'swayam-2' && (
        <SwayamInterior accentColor={accentColor} isMobile={isMobile} />
      )}
      {projectId === 'resume-forge' && (
        <ResumeForgeInterior accentColor={accentColor} isMobile={isMobile} />
      )}
      {projectId === 'speed-taxi' && (
        <SpeedTaxiInterior accentColor={accentColor} isMobile={isMobile} />
      )}
      {projectId === 'wildlife-ai' && (
        <WildlifeInterior accentColor={accentColor} isMobile={isMobile} />
      )}
      {projectId === 'nk-mern-cli' && (
        <MernCliInterior accentColor={accentColor} isMobile={isMobile} />
      )}
    </group>
  );
};

/* ========================================================================= */
/* 01 — SWAYAM 2.0: Education/Course Interface, Learning Nodes, Grad Symbol  */
/* ========================================================================= */
const SwayamInterior: React.FC<{ accentColor: string; isMobile: boolean }> = ({
  accentColor,
  isMobile,
}) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const nodes = useMemo(() => {
    return [
      [-0.42, 0.26, -0.05],
      [0.44, 0.22, -0.06],
      [-0.36, -0.24, -0.04],
      [0.38, -0.22, -0.05],
      [0, 0.38, -0.08],
    ] as [number, number, number][];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.25;
    }
  });

  return (
    <group>
      {/* 1. Subtle Course Interface Card (Backdrop) */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[isMobile ? 0.75 : 0.88, isMobile ? 0.48 : 0.56]} />
        <meshStandardMaterial
          color="#041226"
          emissive={accentColor}
          emissiveIntensity={0.15}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      {/* Course UI Wireframe lines */}
      <lineSegments position={[0, 0, -0.04]}>
        <edgesGeometry
          args={[new THREE.PlaneGeometry(isMobile ? 0.75 : 0.88, isMobile ? 0.48 : 0.56)]}
        />
        <lineBasicMaterial color={accentColor} transparent opacity={0.4} />
      </lineSegments>

      {/* 2. Education Graduation Cap Geometric Hologram */}
      <group position={[0, 0.08, 0.04]} scale={isMobile ? 0.75 : 0.9}>
        {/* Diamond cap mortarboard */}
        <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
          <boxGeometry args={[0.22, 0.015, 0.22]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.8} />
        </mesh>
        {/* Cap skull cap under */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.08, 0.09, 0.06, 16]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
        </mesh>
        {/* Hanging tassel node */}
        <mesh position={[0.12, -0.06, 0.12]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#00f5ff" />
        </mesh>
      </group>

      {/* 3. Learning Network Nodes */}
      {nodes.map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh>
            <octahedronGeometry args={[isMobile ? 0.035 : 0.045, 0]} />
            <meshBasicMaterial color="#00f5ff" transparent opacity={0.85} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.055, 0.07, 16]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
          </mesh>
        </group>
      ))}

      {/* Knowledge Orbit Ring */}
      <mesh ref={ringRef} rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[0.55, 0.008, 12, 48]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

/* ========================================================================= */
/* 02 — RESUME FORGE: Document/Resume Layers, Page Holograms, Violet Accent   */
/* ========================================================================= */
const ResumeForgeInterior: React.FC<{ accentColor: string; isMobile: boolean }> = ({
  accentColor,
  isMobile,
}) => {
  const docGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (docGroupRef.current) {
      docGroupRef.current.rotation.y = Math.sin(t * 0.4) * 0.08;
    }
  });

  return (
    <group ref={docGroupRef}>
      {/* 1. Base Layer: Back Document Draft */}
      <mesh position={[0.08, 0.05, -0.06]} rotation={[0, 0, -0.08]}>
        <planeGeometry args={[isMobile ? 0.7 : 0.82, isMobile ? 0.46 : 0.54]} />
        <meshStandardMaterial
          color="#2e1065"
          emissive="#c084fc"
          emissiveIntensity={0.15}
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Middle Layer: Front Active Resume */}
      <mesh position={[-0.02, 0, -0.02]}>
        <planeGeometry args={[isMobile ? 0.72 : 0.85, isMobile ? 0.48 : 0.58]} />
        <meshStandardMaterial
          color="#1e1b4b"
          emissive="#a855f7"
          emissiveIntensity={0.2}
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </mesh>

      {/* Document border edges */}
      <lineSegments position={[-0.02, 0, 0]}>
        <edgesGeometry
          args={[new THREE.PlaneGeometry(isMobile ? 0.72 : 0.85, isMobile ? 0.48 : 0.58)]}
        />
        <lineBasicMaterial color={accentColor} transparent opacity={0.65} />
      </lineSegments>

      {/* 3. Resume Holographic Profile & Section Lines */}
      <group position={[-0.02, 0, 0.02]} scale={isMobile ? 0.78 : 0.9}>
        {/* Profile Avatar Ring */}
        <mesh position={[-0.24, 0.16, 0]}>
          <ringGeometry args={[0.045, 0.06, 20]} />
          <meshBasicMaterial color="#e9d5ff" transparent opacity={0.8} />
        </mesh>
        {/* Name Header Line */}
        <mesh position={[0.05, 0.18, 0]}>
          <planeGeometry args={[0.36, 0.02]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.85} />
        </mesh>
        <mesh position={[0.02, 0.13, 0]}>
          <planeGeometry args={[0.3, 0.012]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.65} />
        </mesh>

        {/* Section Divider */}
        <mesh position={[0, 0.06, 0]}>
          <planeGeometry args={[0.55, 0.008]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.5} />
        </mesh>

        {/* Section 1 Lines */}
        <mesh position={[-0.05, 0.01, 0]}>
          <planeGeometry args={[0.42, 0.012]} />
          <meshBasicMaterial color="#e9d5ff" transparent opacity={0.7} />
        </mesh>
        <mesh position={[-0.08, -0.04, 0]}>
          <planeGeometry args={[0.36, 0.012]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
        </mesh>

        {/* Section 2 Lines */}
        <mesh position={[0, -0.1, 0]}>
          <planeGeometry args={[0.55, 0.008]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.5} />
        </mesh>
        <mesh position={[-0.04, -0.15, 0]}>
          <planeGeometry args={[0.44, 0.012]} />
          <meshBasicMaterial color="#e9d5ff" transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
};

/* ========================================================================= */
/* 03 — SPEED TAXI: Miniature Futuristic Taxi, Route Line, City Grid         */
/* ========================================================================= */
const SpeedTaxiInterior: React.FC<{ accentColor: string; isMobile: boolean }> = ({
  accentColor,
  isMobile,
}) => {
  const taxiRef = useRef<THREE.Group>(null);
  const routeBeamRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (taxiRef.current) {
      // Vehicle travels smoothly along curved transit corridor
      const progress = (t * 0.35) % 1;
      const x = -0.45 + progress * 0.9;
      const z = Math.sin(progress * Math.PI) * 0.12;
      taxiRef.current.position.x = x;
      taxiRef.current.position.z = z;
      taxiRef.current.position.y = -0.08 + Math.sin(t * 6) * 0.004; // subtle suspension vibration
    }

    if (routeBeamRef.current) {
      routeBeamRef.current.scale.x = 0.9 + Math.sin(t * 4) * 0.1;
    }
  });

  return (
    <group>
      {/* 1. Miniature City Grid Matrix */}
      <group position={[0, -0.16, -0.05]} rotation={[-Math.PI / 2.8, 0, 0]}>
        <gridHelper args={[0.9, 8, '#00f5ff', '#0f3854']} />
        {/* Subtle low-poly skyscraper blocks */}
        {[-0.32, 0.32].map((x, i) => (
          <mesh key={i} position={[x, 0.22, 0.05]}>
            <boxGeometry args={[0.1, 0.1, 0.15]} />
            <meshStandardMaterial
              color="#071a2e"
              emissive="#00f5ff"
              emissiveIntensity={0.2}
              transparent
              opacity={0.65}
            />
          </mesh>
        ))}
      </group>

      {/* 2. Animated Glowing Route Arc */}
      <mesh ref={routeBeamRef} position={[0, -0.08, 0]}>
        <planeGeometry args={[isMobile ? 0.75 : 0.9, 0.015]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.75} />
      </mesh>

      {/* 3. Miniature Futuristic Taxi Vehicle Hologram */}
      <group ref={taxiRef} scale={isMobile ? 0.65 : 0.8}>
        {/* Aerodynamic cab chassis */}
        <mesh>
          <boxGeometry args={[0.18, 0.05, 0.08]} />
          <meshStandardMaterial
            color="#0f263d"
            emissive="#38bdf8"
            emissiveIntensity={0.4}
            roughness={0.2}
          />
        </mesh>
        {/* Cabin cockpit canopy */}
        <mesh position={[0.01, 0.035, 0]}>
          <boxGeometry args={[0.09, 0.03, 0.065]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.85} />
        </mesh>
        {/* Headlight beams */}
        <mesh position={[0.09, -0.005, 0]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
        {/* Taillight glow */}
        <mesh position={[-0.09, -0.005, 0]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshBasicMaterial color="#f43f5e" />
        </mesh>
      </group>

      {/* Waypoint beacons */}
      <mesh position={[-0.38, -0.08, 0]}>
        <octahedronGeometry args={[0.035, 0]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
      <mesh position={[0.38, -0.08, 0]}>
        <octahedronGeometry args={[0.035, 0]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
    </group>
  );
};

/* ========================================================================= */
/* 04 — AI WILDLIFE: Terrain Wireframe, Animal Detection Box, Radar Pulse    */
/* ========================================================================= */
const WildlifeInterior: React.FC<{ accentColor: string; isMobile: boolean }> = ({
  accentColor,
  isMobile,
}) => {
  const radarSweepRef = useRef<THREE.Mesh>(null);
  const targetBoxRef = useRef<THREE.Group>(null);
  const pulseCircleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (radarSweepRef.current) {
      radarSweepRef.current.rotation.z = t * 1.5;
    }

    if (pulseCircleRef.current) {
      const s = 0.8 + ((t * 0.8) % 1) * 0.6;
      pulseCircleRef.current.scale.set(s, s, 1);
    }

    if (targetBoxRef.current) {
      // Animal marker tracks slightly
      targetBoxRef.current.position.x = 0.18 + Math.sin(t * 0.7) * 0.06;
      targetBoxRef.current.position.y = 0.08 + Math.cos(t * 0.5) * 0.04;
    }
  });

  return (
    <group>
      {/* 1. Radar Perimeter Rings */}
      <group position={[0, 0, -0.08]}>
        <mesh>
          <ringGeometry args={[0.42, 0.435, 48]} />
          <meshBasicMaterial color="#15803d" transparent opacity={0.65} />
        </mesh>
        <mesh>
          <ringGeometry args={[0.26, 0.275, 40]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.5} />
        </mesh>
        <mesh>
          <ringGeometry args={[0.12, 0.13, 32]} />
          <meshBasicMaterial color="#4ade80" transparent opacity={0.7} />
        </mesh>

        {/* Pulsing expand circle */}
        <mesh ref={pulseCircleRef}>
          <ringGeometry args={[0.2, 0.21, 36]} />
          <meshBasicMaterial color="#86efac" transparent opacity={0.4} />
        </mesh>

        {/* Rotating Radar Sweep Cone */}
        <mesh ref={radarSweepRef} position={[0, 0, 0.002]}>
          <ringGeometry args={[0.02, 0.43, 32, 1, 0, Math.PI / 3]} />
          <meshBasicMaterial
            color="#22c55e"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* 2. Terrain Surface Grid */}
      <group position={[0, -0.18, -0.06]} rotation={[-Math.PI / 2.6, 0, 0]}>
        <gridHelper args={[0.85, 8, '#22c55e', '#064e3b']} />
      </group>

      {/* 3. AI Detection Marker & Bounding Box */}
      <group ref={targetBoxRef} position={[0.18, 0.08, 0.02]} scale={isMobile ? 0.75 : 0.9}>
        {/* Bounding box outline */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.16, 0.14, 0.04)]} />
          <lineBasicMaterial color="#4ade80" linewidth={2} />
        </lineSegments>

        {/* Small animal silhouette placeholder / indicator */}
        <mesh position={[0, -0.01, 0]}>
          <sphereGeometry args={[0.028, 12, 12]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
        <mesh position={[0.032, 0.025, 0]}>
          <sphereGeometry args={[0.014, 8, 8]} />
          <meshBasicMaterial color="#86efac" />
        </mesh>

        {/* Detection Tag Marker */}
        <mesh position={[0, 0.09, 0]}>
          <planeGeometry args={[0.12, 0.025]} />
          <meshBasicMaterial color="#15803d" />
        </mesh>
      </group>
    </group>
  );
};

/* ========================================================================= */
/* 05 — NK MERN CLI: Terminal, Code Particles, Command-Line Visualization    */
/* ========================================================================= */
const MernCliInterior: React.FC<{ accentColor: string; isMobile: boolean }> = ({
  accentColor,
  isMobile,
}) => {
  const terminalGroupRef = useRef<THREE.Group>(null);
  const promptBlinkRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (promptBlinkRef.current) {
      promptBlinkRef.current.visible = Math.floor(t * 3) % 2 === 0;
    }
  });

  return (
    <group ref={terminalGroupRef}>
      {/* 1. Terminal Window Base Frame */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[isMobile ? 0.76 : 0.9, isMobile ? 0.5 : 0.58]} />
        <meshStandardMaterial
          color="#040b17"
          emissive="#00f5ff"
          emissiveIntensity={0.12}
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </mesh>

      {/* Terminal Wireframe Outer Edge */}
      <lineSegments position={[0, 0, -0.04]}>
        <edgesGeometry
          args={[new THREE.PlaneGeometry(isMobile ? 0.76 : 0.9, isMobile ? 0.5 : 0.58)]}
        />
        <lineBasicMaterial color={accentColor} transparent opacity={0.6} />
      </lineSegments>

      {/* 2. Terminal Header Bar with Control Dots */}
      <group position={[0, isMobile ? 0.2 : 0.23, -0.02]} scale={isMobile ? 0.8 : 0.9}>
        <mesh position={[-0.38, 0, 0]}>
          <circleGeometry args={[0.016, 12]} />
          <meshBasicMaterial color="#f43f5e" />
        </mesh>
        <mesh position={[-0.33, 0, 0]}>
          <circleGeometry args={[0.016, 12]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
        <mesh position={[-0.28, 0, 0]}>
          <circleGeometry args={[0.016, 12]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        {/* Terminal Header Divider */}
        <mesh position={[0, -0.035, 0]}>
          <planeGeometry args={[0.85, 0.008]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* 3. Command Prompt `>_` and CLI Code Lines */}
      <group position={[-0.28, 0.06, 0.02]} scale={isMobile ? 0.75 : 0.9}>
        {/* Chevron `>` */}
        <lineSegments>
          <bufferGeometry
            attributes={{
              position: new THREE.Float32BufferAttribute(
                [-0.04, 0.04, 0, 0.02, 0, 0, 0.02, 0, 0, -0.04, -0.04, 0],
                3
              ),
            }}
          />
          <lineBasicMaterial color="#00f5ff" linewidth={2} />
        </lineSegments>

        {/* Command line text bar: `npx nk-mern-cli` */}
        <mesh position={[0.18, 0, 0]}>
          <planeGeometry args={[0.26, 0.018]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.85} />
        </mesh>

        {/* Blinking cursor block `_` */}
        <mesh ref={promptBlinkRef} position={[0.33, -0.005, 0]}>
          <planeGeometry args={[0.025, 0.03]} />
          <meshBasicMaterial color="#00f5ff" />
        </mesh>

        {/* Scaffolding output bars */}
        <mesh position={[0.12, -0.07, 0]}>
          <planeGeometry args={[0.38, 0.012]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0.08, -0.12, 0]}>
          <planeGeometry args={[0.3, 0.012]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.65} />
        </mesh>
        <mesh position={[0.15, -0.17, 0]}>
          <planeGeometry args={[0.44, 0.012]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
};
