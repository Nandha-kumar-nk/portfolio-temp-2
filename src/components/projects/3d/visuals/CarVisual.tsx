import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem } from '../../../../types';

interface VisualProps {
  project: ProjectItem;
  isSelected?: boolean;
  isDimmed?: boolean;
  scale?: number;
}

export const CarVisual: React.FC<VisualProps> = ({
  project,
  isSelected = true,
  isDimmed = false,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const routeLineRef = useRef<THREE.LineLoop>(null);

  // Curved holographic route line beneath the car
  const routePoints = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.9, 0.01, -0.6),
      new THREE.Vector3(-0.4, 0.01, -0.2),
      new THREE.Vector3(0, 0.01, 0.1),
      new THREE.Vector3(0.5, 0.01, 0.4),
      new THREE.Vector3(0.9, 0.01, 0.8),
    ]);
    const pts = curve.getPoints(50);
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle floating hover
      groupRef.current.position.y = Math.sin(t * 1.8) * 0.025;
      // Slight responsive turning motion
      groupRef.current.rotation.y = -0.42 + Math.sin(t * 0.6) * 0.04;
    }
  });

  const accent = project.accentColor || '#eab308';
  const opacity = isDimmed ? 0.35 : 1.0;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} rotation={[0, -0.42, 0]}>
      {/* =================================================================== */}
      {/* 1. SUBTLE HOLOGRAPHIC ROUTE LINE BENEATH THE CAR                    */}
      {/* =================================================================== */}
      <group position={[0, -0.06, 0]}>
        <lineLoop geometry={routePoints}>
          <lineBasicMaterial
            color={accent}
            transparent
            opacity={0.45 * opacity}
            linewidth={2}
          />
        </lineLoop>

        {/* Small glowing waypoint dots along route */}
        {[
          [-0.9, 0.01, -0.6],
          [-0.4, 0.01, -0.2],
          [0, 0.01, 0.1],
          [0.5, 0.01, 0.4],
          [0.9, 0.01, 0.8],
        ].map((pt, i) => (
          <mesh key={i} position={pt as [number, number, number]}>
            <sphereGeometry args={[0.02, 12, 12]} />
            <meshBasicMaterial color={accent} />
          </mesh>
        ))}
      </group>

      {/* =================================================================== */}
      {/* 2. FUTURISTIC COMPACT PREMIUM VEHICLE BODY                          */}
      {/* =================================================================== */}
      <group position={[0, 0.16, 0]}>
        {/* Main Lower Body Hull (Sleek Metallic Finish) */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.68, 0.16, 1.35]} />
          <meshStandardMaterial
            color="#080e1a"
            metalness={0.92}
            roughness={0.18}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Aerodynamic Cockpit Glass Canopy */}
        <mesh position={[0, 0.22, -0.06]}>
          <boxGeometry args={[0.52, 0.17, 0.72]} />
          <meshStandardMaterial
            color="#030712"
            emissive={accent}
            emissiveIntensity={isSelected ? 0.45 : 0.2}
            metalness={0.95}
            roughness={0.1}
            transparent
            opacity={0.9 * opacity}
          />
        </mesh>

        {/* Front Windshield Rake */}
        <mesh position={[0, 0.18, 0.38]} rotation={[-0.52, 0, 0]}>
          <planeGeometry args={[0.5, 0.24]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.65 * opacity} />
        </mesh>

        {/* Rear Window Slope */}
        <mesh position={[0, 0.18, -0.48]} rotation={[0.48, 0, 0]}>
          <planeGeometry args={[0.48, 0.22]} />
          <meshBasicMaterial color="#0ea5e9" transparent opacity={0.5 * opacity} />
        </mesh>

        {/* Illuminated Futuristic Taxi Roof Pod */}
        <group position={[0, 0.34, -0.06]}>
          <mesh>
            <boxGeometry args={[0.26, 0.06, 0.12]} />
            <meshStandardMaterial
              color="#eab308"
              emissive="#facc15"
              emissiveIntensity={isSelected ? 1.6 : 0.9}
            />
          </mesh>
          <mesh position={[0, -0.035, 0]}>
            <boxGeometry args={[0.08, 0.02, 0.04]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
        </group>

        {/* Front LED Light Blades */}
        <mesh position={[0.24, 0.07, 0.68]}>
          <boxGeometry args={[0.14, 0.03, 0.015]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.24, 0.07, 0.68]}>
          <boxGeometry args={[0.14, 0.03, 0.015]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Front Grille Cyber Light Strip */}
        <mesh position={[0, 0.04, 0.685]}>
          <boxGeometry args={[0.32, 0.015, 0.01]} />
          <meshBasicMaterial color={accent} />
        </mesh>

        {/* Rear Continuous OLED Tail Light Bar */}
        <mesh position={[0, 0.09, -0.68]}>
          <boxGeometry args={[0.6, 0.03, 0.015]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>

        {/* Soft Cyber Underglow Plate */}
        <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.64, 1.28]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={isSelected ? 0.65 : 0.35}
          />
        </mesh>

        {/* 4 Sleek Wheels with Neon Rim Accents */}
        {[
          [-0.35, -0.02, 0.42],
          [0.35, -0.02, 0.42],
          [-0.35, -0.02, -0.42],
          [0.35, -0.02, -0.42],
        ].map((pos, idx) => (
          <group key={idx} position={pos as [number, number, number]}>
            {/* Tire Body */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.115, 0.115, 0.075, 18]} />
              <meshStandardMaterial color="#020617" roughness={0.7} />
            </mesh>
            {/* Neon Rim Ring */}
            <mesh position={[pos[0] > 0 ? 0.04 : -0.04, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <ringGeometry args={[0.06, 0.095, 18]} />
              <meshBasicMaterial color={accent} side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Subtle Warm Point Light for Underglow */}
      <pointLight
        color={accent}
        intensity={isSelected ? 2.2 : 1.2}
        distance={2.4}
        position={[0, 0.2, 0]}
      />
    </group>
  );
};
