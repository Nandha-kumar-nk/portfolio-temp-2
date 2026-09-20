import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ProjectionBeamProps {
  startPos?: [number, number, number]; // Projector lens tip
  targetPos?: [number, number, number]; // Screen center
  transitionPhase?: number;
  transitionProgress?: number;
  accentColor?: string;
  isMobile?: boolean;
}

export const ProjectionBeam: React.FC<ProjectionBeamProps> = ({
  startPos = [-2.8, 0.35, 0.4],
  targetPos = [0.8, 0.45, 0],
  transitionPhase = 0,
  transitionProgress = 0,
  accentColor = '#00f5ff',
  isMobile = false,
}) => {
  const beamGroupRef = useRef<THREE.Group>(null);
  const outerConeRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const sweepPlaneRef = useRef<THREE.Mesh>(null);
  const dustPointsRef = useRef<THREE.Points>(null);

  // Vector calculation from lens to screen
  const { length, midPos, orientation } = useMemo(() => {
    const start = new THREE.Vector3(...startPos);
    const end = new THREE.Vector3(...targetPos);
    const dir = new THREE.Vector3().subVectors(end, start);
    const len = dir.length();
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

    // Orientation quaternion pointing from Y-up cone along the direction vector
    const orientationQuat = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    dir.normalize();
    orientationQuat.setFromUnitVectors(up, dir);

    return { length: len, midPos: [mid.x, mid.y, mid.z] as [number, number, number], orientation: orientationQuat };
  }, [startPos, targetPos]);

  // Atmospheric dust particles inside the beam
  const particleCount = isMobile ? 30 : 70;
  const { dustGeometry, dustSpeeds } = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const p = Math.random(); // Position along length
      const radiusAtP = 0.08 + p * 1.35;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * radiusAtP;

      pos[i * 3] = r * Math.cos(angle);
      pos[i * 3 + 1] = (p - 0.5) * length;
      pos[i * 3 + 2] = r * Math.sin(angle);

      spd[i] = 0.4 + Math.random() * 0.6;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return { dustGeometry: geom, dustSpeeds: spd };
  }, [particleCount, length]);

  // Volumetric Materials (Soft, additive, semi-transparent)
  const outerBeamMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, [accentColor]);

  const innerCoreMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#e0f2fe'),
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  const dustMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: new THREE.Color('#cffafe'),
      size: isMobile ? 0.035 : 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [isMobile]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Idle breathing pulse
    let beamIntensity = 1.0 + Math.sin(t * 2.8) * 0.12;

    // 2. Transition phase overrides
    if (transitionPhase === 1) {
      // Step 1: Lens Focus — beam brightens
      beamIntensity = 1.6 + transitionProgress * 0.8;
    } else if (transitionPhase === 2) {
      // Step 2: Shutter Pulse — rapid pulse/shutter flicker
      beamIntensity = 0.3 + Math.abs(Math.sin(transitionProgress * Math.PI * 5)) * 1.2;
    } else if (transitionPhase === 4) {
      // Step 4: Light sweep — peak intensity
      beamIntensity = 2.4;
    }

    if (outerConeRef.current) {
      outerBeamMaterial.opacity = 0.16 * beamIntensity;
    }
    if (innerCoreRef.current) {
      innerCoreMaterial.opacity = 0.26 * beamIntensity;
    }

    // 3. Sweep light plane animation (Phase 4)
    if (sweepPlaneRef.current) {
      if (transitionPhase === 4) {
        sweepPlaneRef.current.visible = true;
        // Move sweep wave along the beam towards target
        sweepPlaneRef.current.position.y = (transitionProgress - 0.5) * length;
        const sweepMat = sweepPlaneRef.current.material as THREE.MeshBasicMaterial;
        sweepMat.opacity = Math.sin(transitionProgress * Math.PI) * 0.8;
      } else {
        sweepPlaneRef.current.visible = false;
      }
    }

    // 4. Drift dust particles along the beam
    if (dustPointsRef.current) {
      const posAttr = dustGeometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const yIdx = i * 3 + 1;
        arr[yIdx] += delta * dustSpeeds[i] * (transitionPhase === 3 ? 3.0 : 0.6);

        // Loop back when reaching end of beam
        if (arr[yIdx] > length * 0.5) {
          arr[yIdx] = -length * 0.5;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={beamGroupRef} position={midPos} quaternion={orientation}>
      {/* Outer soft volumetric light cone */}
      <mesh ref={outerConeRef} material={outerBeamMaterial}>
        {/* Cylinder args: radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded */}
        <cylinderGeometry args={[1.55, 0.14, length, 32, 1, true]} />
      </mesh>

      {/* Inner luminous core ray */}
      <mesh ref={innerCoreRef} material={innerCoreMaterial}>
        <cylinderGeometry args={[0.95, 0.07, length, 24, 1, true]} />
      </mesh>

      {/* Slanted volumetric cross-planes for 3D depth and beam fullness */}
      <mesh material={outerBeamMaterial} rotation={[0, Math.PI / 3, 0]}>
        <planeGeometry args={[1.6, length]} />
      </mesh>
      <mesh material={outerBeamMaterial} rotation={[0, -Math.PI / 3, 0]}>
        <planeGeometry args={[1.6, length]} />
      </mesh>

      {/* Transition Phase 4: Light sweep disc/plane travelling along the beam */}
      <mesh ref={sweepPlaneRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 1.6, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Floating atmospheric dust motes flowing through beam */}
      <points ref={dustPointsRef} geometry={dustGeometry} material={dustMaterial} />
    </group>
  );
};
