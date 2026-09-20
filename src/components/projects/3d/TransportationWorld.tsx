import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { FloatingIslandBase } from './FloatingIslandBase';
import { ProjectItem } from '../../../types';

interface TransportationWorldProps {
  project: ProjectItem;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: () => void;
}

export const TransportationWorld: React.FC<TransportationWorldProps> = ({
  project,
  isSelected,
  isDimmed,
  onSelect,
}) => {
  const taxiCarRef = useRef<THREE.Group>(null);
  const headlightBeamRef = useRef<THREE.Mesh>(null);
  const gpsPinRef = useRef<THREE.Group>(null);
  const streetLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Gentle hover / engine vibration of the cyber taxi
    if (taxiCarRef.current) {
      taxiCarRef.current.position.y = 0.28 + Math.sin(t * 5) * 0.015;
      taxiCarRef.current.rotation.z = Math.sin(t * 3) * 0.02;
    }
    // Headlight cone pulse
    if (headlightBeamRef.current) {
      const p = 0.5 + Math.sin(t * 4) * 0.15;
      (headlightBeamRef.current.material as THREE.MeshBasicMaterial).opacity = p;
    }
    // GPS Pin bounce
    if (gpsPinRef.current) {
      gpsPinRef.current.position.y = 0.65 + Math.sin(t * 3) * 0.04;
      gpsPinRef.current.rotation.y = t * 1.5;
    }
    if (streetLightRef.current) {
      streetLightRef.current.intensity = 1.4 + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <group onClick={(e) => { e.stopPropagation(); onSelect(); }}>
      <FloatingIslandBase
        themeColor={project.themeColor}
        accentGlow={project.accentGlow}
        isSelected={isSelected}
        isDimmed={isDimmed}
        radius={1.4}
        height={0.55}
        bobSpeed={1.1}
        bobOffset={4.8}
      >
        {/* ================================================================= */}
        {/* 1. CURVED GLOWING NEON ROAD NETWORK                               */}
        {/* ================================================================= */}
        {/* Dark Asphalt Road Bed */}
        <mesh position={[0, 0.08, 0.1]} rotation={[-Math.PI / 2, 0, 0.2]}>
          <ringGeometry args={[0.5, 0.95, 24, 1, 0, Math.PI * 1.4]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} side={THREE.DoubleSide} />
        </mesh>
        {/* Glowing Amber Road Edge Strips */}
        <mesh position={[0, 0.09, 0.1]} rotation={[-Math.PI / 2, 0, 0.2]}>
          <ringGeometry args={[0.93, 0.96, 24, 1, 0, Math.PI * 1.4]} />
          <meshBasicMaterial color="#eab308" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.09, 0.1]} rotation={[-Math.PI / 2, 0, 0.2]}>
          <ringGeometry args={[0.49, 0.52, 24, 1, 0, Math.PI * 1.4]} />
          <meshBasicMaterial color="#eab308" side={THREE.DoubleSide} />
        </mesh>
        {/* Cyan Center Dash Guide */}
        <mesh position={[0, 0.095, 0.1]} rotation={[-Math.PI / 2, 0, 0.2]}>
          <ringGeometry args={[0.71, 0.73, 24, 1, 0, Math.PI * 1.4]} />
          <meshBasicMaterial color="#00f5ff" side={THREE.DoubleSide} />
        </mesh>

        {/* ================================================================= */}
        {/* 2. 3D FUTURISTIC CYBER TAXI                                       */}
        {/* ================================================================= */}
        <group ref={taxiCarRef} position={[-0.15, 0.28, 0.35]} rotation={[0, 0.35, 0]}>
          {/* Aerodynamic Yellow Chassis */}
          <mesh position={[0, 0.07, 0]} castShadow>
            <boxGeometry args={[0.38, 0.12, 0.72]} />
            <meshStandardMaterial
              color="#eab308"
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>

          {/* Aerodynamic Curved Cabin Hood / Roof */}
          <mesh position={[0, 0.16, -0.04]} castShadow>
            <boxGeometry args={[0.32, 0.1, 0.42]} />
            <meshStandardMaterial
              color="#ca8a04"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Cyan Tinted Cockpit Canopy Glass */}
          <mesh position={[0, 0.17, 0.06]}>
            <boxGeometry args={[0.3, 0.09, 0.16]} />
            <meshStandardMaterial
              color="#00f5ff"
              transparent
              opacity={0.7}
              roughness={0.1}
            />
          </mesh>

          {/* Glowing Headlights (Front Face) */}
          <mesh position={[-0.12, 0.07, 0.365]}>
            <boxGeometry args={[0.08, 0.03, 0.01]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.12, 0.07, 0.365]}>
            <boxGeometry args={[0.08, 0.03, 0.01]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Forward Headlight Light Cones */}
          <mesh
            ref={headlightBeamRef}
            position={[0, 0.04, 0.62]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.26, 0.08, 0.5, 12, 1, true]} />
            <meshBasicMaterial
              color="#fef08a"
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Red Taillights (Rear Face) */}
          <mesh position={[0, 0.08, -0.365]}>
            <boxGeometry args={[0.34, 0.03, 0.01]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>

          {/* Glowing "TAXI" Roof Sign Beacon */}
          <group position={[0, 0.24, -0.02]}>
            <mesh>
              <boxGeometry args={[0.16, 0.05, 0.06]} />
              <meshBasicMaterial color="#facc15" />
            </mesh>
            <pointLight position={[0, 0.05, 0]} color="#eab308" distance={1.2} intensity={1.5} />
          </group>

          {/* 4 Mag-Lev Hover Thruster Wheels (Illuminated Cyan Rims) */}
          {[-0.2, 0.2].map((xP, i) =>
            [-0.22, 0.22].map((zP, j) => (
              <group key={`${i}-${j}`} position={[xP, 0, zP]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.065, 0.065, 0.05, 12]} />
                  <meshStandardMaterial color="#0f172a" metalness={0.9} />
                </mesh>
                <mesh position={[xP > 0 ? 0.03 : -0.03, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <ringGeometry args={[0.04, 0.06, 12]} />
                  <meshBasicMaterial color="#00f5ff" side={THREE.DoubleSide} />
                </mesh>
              </group>
            ))
          )}

          {/* Underglow Cyan Neon */}
          <pointLight position={[0, -0.04, 0]} color="#00f5ff" distance={0.8} intensity={2} />
        </group>

        {/* ================================================================= */}
        {/* 3. 3D FUTURISTIC SMARTPHONE WITH GPS ROUTE DISPLAY                 */}
        {/* ================================================================= */}
        <group position={[0.65, 0.55, -0.2]} rotation={[-0.1, -0.5, 0]}>
          {/* Phone Body */}
          <mesh castShadow>
            <boxGeometry args={[0.42, 0.78, 0.025]} />
            <meshStandardMaterial color="#090d16" metalness={0.9} roughness={0.2} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.42, 0.78, 0.025)]} />
            <lineBasicMaterial color="#eab308" linewidth={1.5} />
          </lineSegments>
          {/* Phone Display Screen (Map View) */}
          <mesh position={[0, 0, 0.015]}>
            <planeGeometry args={[0.38, 0.72]} />
            <meshBasicMaterial color="#041226" />
          </mesh>
          {/* GPS Route Vector Lines */}
          <mesh position={[0, -0.05, 0.02]}>
            <planeGeometry args={[0.28, 0.35]} />
            <meshBasicMaterial color="#0284c7" transparent opacity={0.6} />
          </mesh>
          {/* GPS Waypoint Route Ribbon */}
          <mesh position={[-0.02, -0.04, 0.025]} rotation={[0, 0, 0.4]}>
            <planeGeometry args={[0.03, 0.32]} />
            <meshBasicMaterial color="#00f5ff" />
          </mesh>

          {/* Floating GPS Waypoint Pin */}
          <group ref={gpsPinRef} position={[0.06, 0.14, 0.04]}>
            <mesh rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.045, 0.09, 8]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
            <mesh position={[0, 0.06, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </group>
        </group>

        {/* ================================================================= */}
        {/* 4. MINIATURE CYBER CITY BUILDINGS IN BACKGROUND                    */}
        {/* ================================================================= */}
        <group position={[-0.7, 0.35, -0.45]}>
          {/* Building 1 */}
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[0.26, 0.7, 0.26]} />
            <meshStandardMaterial color="#0a101d" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* Window Strips */}
          {[-0.15, 0, 0.15, 0.28].map((yP, i) => (
            <mesh key={i} position={[0, yP, 0.132]}>
              <planeGeometry args={[0.22, 0.03]} />
              <meshBasicMaterial color="#eab308" transparent opacity={0.8} />
            </mesh>
          ))}

          {/* Building 2 (Taller spire) */}
          <mesh position={[0.22, 0.35, -0.1]}>
            <boxGeometry args={[0.2, 0.9, 0.2]} />
            <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.3} />
          </mesh>
          {/* Roof Spire */}
          <mesh position={[0.22, 0.85, -0.1]}>
            <coneGeometry args={[0.03, 0.2, 6]} />
            <meshBasicMaterial color="#00f5ff" />
          </mesh>
        </group>

        {/* Street Light Post */}
        <group position={[-0.35, 0.1, -0.05]}>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.015, 0.02, 0.7, 6]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
          <mesh position={[0.06, 0.7, 0]} rotation={[0, 0, -0.5]}>
            <cylinderGeometry args={[0.012, 0.012, 0.15, 6]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh position={[0.12, 0.72, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          <pointLight
            ref={streetLightRef}
            position={[0.12, 0.72, 0]}
            color="#fef08a"
            distance={2}
          />
        </group>

        {/* ================================================================= */}
        {/* 5. FLOATING 3D HOLOGRAPHIC BADGES & LABELS (MATCHING REFERENCE)   */}
        {/* ================================================================= */}
        {/* Right-Side Connected Pill Badges */}
        <Html position={[1.75, 0.35, 0.2]} center distanceFactor={7.5} pointerEvents="none">
          <div className="flex flex-col items-start gap-1.5 select-none">
            {['Real-time Booking', 'Live Tracking', 'Fare Calculation', 'Responsive UI'].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-yellow-400/80 shadow-[0_0_10px_rgba(234,179,8,0.4)] backdrop-blur-md"
              >
                <span className="w-1 h-1 rounded-full bg-yellow-400" />
                <span className="text-[8.5px] font-mono font-bold text-yellow-300 whitespace-nowrap">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </Html>

        {/* Bottom Title Pill Badge */}
        <Html position={[0, -0.65, 0.9]} center distanceFactor={7.5} pointerEvents="none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/95 border border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.7)] backdrop-blur-xl select-none">
            <div className="w-5 h-5 rounded-full bg-yellow-950/90 border border-yellow-400 flex items-center justify-center text-[10px] text-yellow-300">
              🚕
            </div>
            <div className="text-left leading-tight">
              <div className="text-[11px] font-black text-white font-orbitron tracking-wider whitespace-nowrap">
                {project.title}
              </div>
              <div className="text-[8px] font-mono text-yellow-400 font-bold whitespace-nowrap">
                {project.categoryName}
              </div>
            </div>
          </div>
        </Html>
      </FloatingIslandBase>
    </group>
  );
};
