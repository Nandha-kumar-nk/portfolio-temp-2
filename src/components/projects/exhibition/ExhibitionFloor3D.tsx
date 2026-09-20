import React, { useMemo } from 'react';
import * as THREE from 'three';

interface ExhibitionFloor3DProps {
  isMobile?: boolean;
}

export const ExhibitionFloor3D: React.FC<ExhibitionFloor3DProps> = ({ isMobile = false }) => {
  // Dual glowing perspective rails running into the distance
  const runwayLines = useMemo(() => {
    // Left runway rail points and Right runway rail points
    const leftPoints: THREE.Vector3[] = [
      new THREE.Vector3(-1.8, -1.2, 2.5),
      new THREE.Vector3(-3.2, -1.2, -1.5),
      new THREE.Vector3(-5.5, -1.2, -7.0),
    ];
    const rightPoints: THREE.Vector3[] = [
      new THREE.Vector3(1.8, -1.2, 2.5),
      new THREE.Vector3(3.2, -1.2, -1.5),
      new THREE.Vector3(5.5, -1.2, -7.0),
    ];

    const curveL = new THREE.CatmullRomCurve3(leftPoints);
    const curveR = new THREE.CatmullRomCurve3(rightPoints);

    const geoL = new THREE.BufferGeometry().setFromPoints(curveL.getPoints(50));
    const geoR = new THREE.BufferGeometry().setFromPoints(curveR.getPoints(50));

    return { geoL, geoR };
  }, []);

  return (
    <group position={[0, -1.15, 0]}>
      {/* 1. Dark Highly Reflective Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -2]}>
        <planeGeometry args={[26, 20]} />
        <meshStandardMaterial
          color="#020713"
          roughness={0.12}
          metalness={0.88}
        />
      </mesh>

      {/* 2. Soft Horizon Fog Ground Gradient */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -3]}>
        <planeGeometry args={[22, 14]} />
        <meshBasicMaterial
          color="#041838"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Runway Rail 1: Left Cyan Glowing Perspective Line */}
      <primitive
        object={
          new THREE.Line(
            runwayLines.geoL,
            new THREE.LineBasicMaterial({
              color: '#00f5ff',
              linewidth: 2,
              transparent: true,
              opacity: 0.85,
            })
          )
        }
      />
      {/* Left Runway Outer Glow Tube */}
      <mesh position={[-2.4, 0.02, 0.5]} rotation={[-Math.PI / 2, 0, 0.2]}>
        <planeGeometry args={[0.08, 7.5]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 4. Runway Rail 2: Right Cyan Glowing Perspective Line */}
      <primitive
        object={
          new THREE.Line(
            runwayLines.geoR,
            new THREE.LineBasicMaterial({
              color: '#00f5ff',
              linewidth: 2,
              transparent: true,
              opacity: 0.85,
            })
          )
        }
      />
      {/* Right Runway Outer Glow Tube */}
      <mesh position={[2.4, 0.02, 0.5]} rotation={[-Math.PI / 2, 0, -0.2]}>
        <planeGeometry args={[0.08, 7.5]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 5. Center Corridor Perspective Grid Lines */}
      {[-1.2, -0.6, 0, 0.6, 1.2].map((xOffset, idx) => (
        <mesh key={idx} position={[xOffset, 0.01, -1.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.015, 10]} />
          <meshBasicMaterial
            color="#0ea5e9"
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Transverse Cross Grid Lines */}
      {[-4, -2.5, -1, 0.5, 2].map((zPos, idx) => (
        <mesh key={idx} position={[0, 0.01, zPos]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[14, 0.015]} />
          <meshBasicMaterial
            color="#0ea5e9"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};
