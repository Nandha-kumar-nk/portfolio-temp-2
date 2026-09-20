import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem } from '../../../../types';

interface SmartCityWorld3DProps {
  project?: ProjectItem;
  scale?: number;
}

export const SmartCityWorld3D: React.FC<SmartCityWorld3DProps> = ({
  project,
  scale = 1,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const vehicleRef = useRef<THREE.Group>(null);
  const pulseRingPickup = useRef<THREE.Mesh>(null);
  const pulseRingDropoff = useRef<THREE.Mesh>(null);

  const themeColor = project?.accentColor || '#eab308';

  // Procedural city buildings layout
  const buildings = useMemo(() => {
    const list: {
      x: number;
      z: number;
      w: number;
      d: number;
      h: number;
      color: string;
      roofLight?: boolean;
    }[] = [];

    // Blocks arranged in a 4-quadrant grid leaving streets at x=0 and z=0, plus arterial loops
    const gridPositions = [
      // Quadrant 1 (top-right)
      { x: 0.65, z: 0.65, w: 0.45, d: 0.45, h: 0.9, color: '#0d1d33' },
      { x: 1.25, z: 0.65, w: 0.4, d: 0.45, h: 0.6, color: '#0b1626' },
      { x: 0.65, z: 1.25, w: 0.45, d: 0.4, h: 0.75, color: '#0b1626' },
      { x: 1.25, z: 1.25, w: 0.35, d: 0.35, h: 0.4, color: '#09121f' },

      // Quadrant 2 (top-left)
      { x: -0.7, z: 0.65, w: 0.5, d: 0.45, h: 1.15, color: '#0d1d33', roofLight: true },
      { x: -1.3, z: 0.65, w: 0.4, d: 0.45, h: 0.5, color: '#0b1626' },
      { x: -0.7, z: 1.25, w: 0.5, d: 0.4, h: 0.7, color: '#0b1626' },
      { x: -1.3, z: 1.25, w: 0.35, d: 0.35, h: 0.35, color: '#09121f' },

      // Quadrant 3 (bottom-left)
      { x: -0.7, z: -0.7, w: 0.45, d: 0.5, h: 0.85, color: '#0d1d33' },
      { x: -1.3, z: -0.7, w: 0.4, d: 0.5, h: 0.55, color: '#0b1626' },
      { x: -0.7, z: -1.3, w: 0.45, d: 0.35, h: 0.45, color: '#09121f' },

      // Quadrant 4 (bottom-right)
      { x: 0.7, z: -0.7, w: 0.5, d: 0.5, h: 1.3, color: '#0d1d33', roofLight: true },
      { x: 1.3, z: -0.7, w: 0.38, d: 0.5, h: 0.65, color: '#0b1626' },
      { x: 0.7, z: -1.3, w: 0.5, d: 0.35, h: 0.5, color: '#09121f' },
    ];

    return gridPositions;
  }, []);

  // Road route spline: starting at Pickup (-1.1, 0.08, -0.1), traversing intersections to Drop-off (1.1, 0.08, 0.1)
  const routeCurve = useMemo(() => {
    const points = [
      new THREE.Vector3(-1.1, 0.08, -0.1),
      new THREE.Vector3(-0.1, 0.08, -0.1),
      new THREE.Vector3(-0.1, 0.08, 0.8),
      new THREE.Vector3(0.1, 0.08, 0.8),
      new THREE.Vector3(0.1, 0.08, 0.1),
      new THREE.Vector3(1.1, 0.08, 0.1),
      // Loop back for seamless continuous patrol
      new THREE.Vector3(1.1, 0.08, -0.8),
      new THREE.Vector3(-0.1, 0.08, -0.8),
      new THREE.Vector3(-1.1, 0.08, -0.1),
    ];
    return new THREE.CatmullRomCurve3(points, true);
  }, []);

  // Route tube geometry
  const routeTubeGeo = useMemo(() => {
    return new THREE.TubeGeometry(routeCurve, 64, 0.02, 6, true);
  }, [routeCurve]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Gentle world float
    if (rootRef.current) {
      rootRef.current.rotation.y = t * 0.12;
      rootRef.current.position.y = Math.sin(t * 1.1) * 0.05;
    }

    // Vehicle light marker movement along route
    if (vehicleRef.current) {
      const loopTime = 8; // 8 seconds per loop
      const progress = (t % loopTime) / loopTime;
      const point = routeCurve.getPointAt(progress);
      const tangent = routeCurve.getTangentAt(progress);

      vehicleRef.current.position.copy(point);
      // Orient vehicle along movement direction
      const lookTarget = point.clone().add(tangent);
      vehicleRef.current.lookAt(lookTarget);
    }

    // Pulsing waypoint rings
    if (pulseRingPickup.current) {
      const s = 1 + Math.sin(t * 4) * 0.25;
      pulseRingPickup.current.scale.set(s, s, 1);
    }
    if (pulseRingDropoff.current) {
      const s = 1 + Math.cos(t * 4) * 0.25;
      pulseRingDropoff.current.scale.set(s, s, 1);
    }
  });

  return (
    <group ref={rootRef} scale={scale}>
      {/* ================================================================= */}
      {/* 1. CITY FOUNDATION PLATE                                          */}
      {/* ================================================================= */}
      <group position={[0, -0.1, 0]}>
        {/* Base Slab */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2.1, 2.25, 0.18, 8]} />
          <meshStandardMaterial color="#080f1a" metalness={0.9} roughness={0.25} />
        </mesh>

        {/* Top Cyber Grid Surface */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[1.98, 2.05, 0.04, 8]} />
          <meshStandardMaterial color="#091322" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Glowing Rim Border */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.125, 0]}>
          <ringGeometry args={[1.92, 1.98, 8]} />
          <meshBasicMaterial color={themeColor} transparent opacity={0.65} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 2. ROAD ARTERIES & STREET NETWORK                                 */}
      {/* ================================================================= */}
      <group position={[0, 0.025, 0]}>
        {/* Crossroad horizontal */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[3.2, 0.35]} />
          <meshStandardMaterial color="#0b1a2e" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Crossroad vertical */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[0.35, 3.2]} />
          <meshStandardMaterial color="#0b1a2e" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Outer Ring Street */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
          <ringGeometry args={[1.4, 1.68, 32]} />
          <meshStandardMaterial color="#0b1a2e" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Road Lane Neon Guidelines */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
          <ringGeometry args={[1.53, 1.545, 32]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 3. PROCEDURAL BUILDINGS & SKYSCRAPERS                             */}
      {/* ================================================================= */}
      <group>
        {buildings.map((b, idx) => (
          <group key={idx} position={[b.x, b.h / 2 + 0.02, b.z]}>
            {/* Building Main Volume */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[b.w, b.h, b.d]} />
              <meshStandardMaterial
                color={b.color}
                metalness={0.8}
                roughness={0.25}
              />
            </mesh>

            {/* Glowing Window Strips */}
            <mesh position={[0, 0, b.d / 2 + 0.002]}>
              <planeGeometry args={[b.w * 0.8, b.h * 0.75]} />
              <meshBasicMaterial
                color={idx % 2 === 0 ? '#38bdf8' : '#eab308'}
                wireframe
                transparent
                opacity={0.35}
              />
            </mesh>

            {/* Rooftop Antenna / Spire on tall skyscrapers */}
            {b.roofLight && (
              <group position={[0, b.h / 2, 0]}>
                <mesh position={[0, 0.15, 0]}>
                  <cylinderGeometry args={[0.015, 0.02, 0.3, 6]} />
                  <meshStandardMaterial color="#64748b" metalness={0.9} />
                </mesh>
                <mesh position={[0, 0.3, 0]}>
                  <sphereGeometry args={[0.035, 8, 8]} />
                  <meshBasicMaterial color="#ef4444" />
                </mesh>
              </group>
            )}
          </group>
        ))}
      </group>

      {/* ================================================================= */}
      {/* 4. ANIMATED ROUTE (ACTIVE TAXI DISPATCH PATH)                     */}
      {/* ================================================================= */}
      <mesh geometry={routeTubeGeo}>
        <meshBasicMaterial color={themeColor} transparent opacity={0.65} />
      </mesh>

      {/* ================================================================= */}
      {/* 5. PICKUP LOCATION NODE (GREEN)                                   */}
      {/* ================================================================= */}
      <group position={[-1.1, 0.05, -0.1]}>
        {/* Ground Holo Ring */}
        <mesh ref={pulseRingPickup} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.12, 0.16, 24]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>

        {/* Vertical Waypoint Light Column */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.015, 0.05, 0.7, 8]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.4} />
        </mesh>

        {/* Waypoint Marker Icon */}
        <mesh position={[0, 0.7, 0]}>
          <octahedronGeometry args={[0.07, 0]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 6. DROP-OFF LOCATION NODE (AMBER / GOLD)                          */}
      {/* ================================================================= */}
      <group position={[1.1, 0.05, 0.1]}>
        {/* Ground Holo Ring */}
        <mesh ref={pulseRingDropoff} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.12, 0.16, 24]} />
          <meshBasicMaterial color="#eab308" transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>

        {/* Vertical Waypoint Light Column */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.015, 0.05, 0.7, 8]} />
          <meshBasicMaterial color="#eab308" transparent opacity={0.4} />
        </mesh>

        {/* Waypoint Marker Icon */}
        <mesh position={[0, 0.7, 0]}>
          <octahedronGeometry args={[0.07, 0]} />
          <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 7. MOVING VEHICLE LIGHT MARKER (SPEED TAXI)                       */}
      {/* ================================================================= */}
      <group ref={vehicleRef}>
        {/* Vehicle Body capsule */}
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.14, 0.05, 0.08]} />
          <meshStandardMaterial color="#eab308" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Glowing Windshield / Roof Dome */}
        <mesh position={[0.01, 0.075, 0]}>
          <boxGeometry args={[0.08, 0.03, 0.065]} />
          <meshBasicMaterial color="#00f5ff" />
        </mesh>

        {/* Headlight beam */}
        <pointLight position={[0.15, 0.05, 0]} color="#ffffff" intensity={1.5} distance={1.2} />

        {/* Amber Underglow */}
        <pointLight position={[0, 0.02, 0]} color="#eab308" intensity={2} distance={0.8} />
      </group>

      {/* City Center Illumination */}
      <pointLight position={[0, 1.2, 0]} color="#38bdf8" intensity={1.5} distance={3.5} />
      <pointLight position={[0, 0.3, 0]} color="#eab308" intensity={1} distance={2.5} />
    </group>
  );
};
