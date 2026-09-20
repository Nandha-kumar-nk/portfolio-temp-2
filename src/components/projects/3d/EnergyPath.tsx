import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EnergyPathProps {
  start: [number, number, number];
  end: [number, number, number];
  isSelected: boolean;
  isDimmed: boolean;
  themeColor: string;
}

export const EnergyPath: React.FC<EnergyPathProps> = ({
  start,
  end,
  isSelected,
  isDimmed,
  themeColor,
}) => {
  const pulseGroupRef = useRef<THREE.Group>(null);
  const pulse1Ref = useRef<THREE.Mesh>(null);
  const pulse2Ref = useRef<THREE.Mesh>(null);

  // Compute 3D bridge geometry from start to end
  const { pathLength, pathRotation, pathMidpoint, curvePoints } = useMemo(() => {
    const vStart = new THREE.Vector3(...start);
    const vEnd = new THREE.Vector3(...end);
    const delta = new THREE.Vector3().subVectors(vEnd, vStart);
    const length = delta.length();
    const midpoint = new THREE.Vector3().addVectors(vStart, vEnd).multiplyScalar(0.5);

    // Subtle upward arch in the center
    const controlPoint = midpoint.clone().add(new THREE.Vector3(0, 0.08, 0.04));
    const curve = new THREE.QuadraticBezierCurve3(vStart, controlPoint, vEnd);
    const points = curve.getPoints(24);

    // Calculate rotation to align cylinder/box along delta
    const up = new THREE.Vector3(0, 1, 0);
    const dir = delta.clone().normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, dir);
    const euler = new THREE.Euler().setFromQuaternion(quaternion);

    return {
      pathLength: length,
      pathRotation: [euler.x, euler.y, euler.z] as [number, number, number],
      pathMidpoint: [midpoint.x, midpoint.y, midpoint.z] as [number, number, number],
      curvePoints: points,
    };
  }, [start, end]);

  // Generate Bezier path line
  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(curvePoints);
  }, [curvePoints]);

  // Animate pulse packets traveling along the curve
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speed = isSelected ? 1.4 : 0.6;

    // Progress along curve 0..1
    const p1 = (t * speed) % 1;
    const p2 = (t * speed + 0.5) % 1;

    if (curvePoints.length > 0) {
      if (pulse1Ref.current) {
        const idx1 = Math.floor(p1 * (curvePoints.length - 1));
        const pt1 = curvePoints[idx1];
        if (pt1) pulse1Ref.current.position.set(pt1.x, pt1.y + 0.04, pt1.z);
      }
      if (pulse2Ref.current) {
        const idx2 = Math.floor(p2 * (curvePoints.length - 1));
        const pt2 = curvePoints[idx2];
        if (pt2) pulse2Ref.current.position.set(pt2.x, pt2.y + 0.04, pt2.z);
      }
    }
  });

  const opacity = isDimmed ? 0.25 : isSelected ? 1.0 : 0.65;
  const coreColor = isSelected ? '#ffffff' : themeColor;

  return (
    <group>
      {/* 1. Metallic Bridge Deck */}
      <group position={pathMidpoint} rotation={pathRotation}>
        {/* Main dark metallic roadbed */}
        <mesh>
          <cylinderGeometry args={[0.16, 0.16, pathLength * 0.92, 6]} />
          <meshStandardMaterial
            color="#0b1120"
            metalness={0.9}
            roughness={0.25}
            transparent
            opacity={isDimmed ? 0.4 : 0.95}
          />
        </mesh>

        {/* Central glowing energy conduit strip */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[0.06, pathLength * 0.94, 0.03]} />
          <meshBasicMaterial
            color={coreColor}
            transparent
            opacity={opacity * 0.9}
          />
        </mesh>

        {/* Left Guardrail Neon Strip */}
        <mesh position={[-0.14, 0, 0.06]}>
          <boxGeometry args={[0.02, pathLength * 0.92, 0.04]} />
          <meshBasicMaterial
            color={isSelected ? '#00f5ff' : '#0284c7'}
            transparent
            opacity={opacity * 0.8}
          />
        </mesh>

        {/* Right Guardrail Neon Strip */}
        <mesh position={[0.14, 0, 0.06]}>
          <boxGeometry args={[0.02, pathLength * 0.92, 0.04]} />
          <meshBasicMaterial
            color={isSelected ? '#00f5ff' : '#0284c7'}
            transparent
            opacity={opacity * 0.8}
          />
        </mesh>
      </group>

      {/* 2. Glowing Upper Energy Arc Line */}
      <primitive
        object={
          new THREE.Line(
            lineGeometry,
            new THREE.LineBasicMaterial({
              color: coreColor,
              transparent: true,
              opacity: isSelected ? 0.95 : 0.45,
              linewidth: isSelected ? 2 : 1,
            })
          )
        }
      />

      {/* 3. Animated Energy Pulse Node 1 */}
      <mesh ref={pulse1Ref}>
        <sphereGeometry args={[isSelected ? 0.08 : 0.05, 8, 8]} />
        <meshBasicMaterial
          color={isSelected ? '#ffffff' : coreColor}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* 4. Animated Energy Pulse Node 2 (Offset) */}
      <mesh ref={pulse2Ref}>
        <sphereGeometry args={[isSelected ? 0.06 : 0.04, 8, 8]} />
        <meshBasicMaterial
          color={coreColor}
          transparent
          opacity={opacity * 0.8}
        />
      </mesh>
    </group>
  );
};
