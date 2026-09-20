import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { CrystalThematicInterior } from './CrystalThematicInterior';

interface CrystalModelProps {
  projectId: string;
  accentColor: string;
  themeColor?: string;
  phase: number; // 0=IDLE, 1=FOCUS, 2=CHARGE, 3=FRACTURE, 4=SHATTER, 5=PARTICLE, 6=REBUILD, 7=NEW PROJECT
  phaseProgress: number; // 0 to 1
  overallProgress: number;
  direction: number; // 1 for next, -1 for prev
  isMobile?: boolean;
}

// Preload the GLB model asset
if (typeof window !== 'undefined') {
  useGLTF.preload('/models/CrystalArchive.glb');
}

export const CrystalModel: React.FC<CrystalModelProps> = ({
  projectId,
  accentColor,
  themeColor: _themeColor,
  phase,
  phaseProgress,
  overallProgress: _overallProgress,
  direction = 1,
  isMobile = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF('/models/CrystalArchive.glb');

  // Clone scene so materials/transforms can be dynamically modulated per instance
  const clonedScene = useMemo(() => {
    return gltf.scene.clone(true);
  }, [gltf.scene]);

  // Extract nodes from the GLB hierarchy
  const {
    crystalMain,
    innerCore,
    energyRing,
    innerDisplay,
    shards,
    crackLines,
  } = useMemo(() => {
    let main: THREE.Mesh | null = null;
    let core: THREE.Mesh | null = null;
    let ring: THREE.Mesh | null = null;
    let display: THREE.Mesh | null = null;
    const shardList: Array<{
      mesh: THREE.Mesh;
      defaultPos: THREE.Vector3;
      defaultRot: THREE.Euler;
      outwardDir: THREE.Vector3;
    }> = [];
    let cracks: THREE.LineSegments | null = null;

    clonedScene.traverse((child) => {
      if (child.name === 'Crystal_Main' && child instanceof THREE.Mesh) {
        main = child;
      } else if (child.name === 'Inner_Core' && child instanceof THREE.Mesh) {
        core = child;
      } else if (child.name === 'Energy_Ring' && child instanceof THREE.Mesh) {
        ring = child;
      } else if (child.name === 'Inner_Project_Display' && child instanceof THREE.Mesh) {
        display = child;
      } else if (child.name.startsWith('Crystal_Shard_') && child instanceof THREE.Mesh) {
        const defPos = child.position.clone();
        const defRot = child.rotation.clone();
        // Calculate an intentional radial trajectory vector
        const outX = (defPos.x === 0 ? 0.3 : defPos.x * 1.4) + direction * 0.2;
        const outY = defPos.y * 1.2;
        const outZ = (defPos.z === 0 ? 0.35 : defPos.z * 1.5);
        shardList.push({
          mesh: child,
          defaultPos: defPos,
          defaultRot: defRot,
          outwardDir: new THREE.Vector3(outX, outY, outZ),
        });
      } else if (child.name === 'CrackMesh' && child instanceof THREE.LineSegments) {
        cracks = child;
      }
    });

    return {
      crystalMain: main,
      innerCore: core,
      energyRing: ring,
      innerDisplay: display,
      shards: shardList,
      crackLines: cracks,
    };
  }, [clonedScene, direction]);

  // Create customized materials with glass refraction and project accent integration
  const crystalMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#e2f4ff'),
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.14,
      roughness: 0.07,
      metalness: 0.08,
      transmission: 0.70,
      ior: 1.54,
      thickness: 0.85,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      clearcoat: 0.8,
      clearcoatRoughness: 0.05,
    });
  }, [accentColor]);

  const coreMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(accentColor),
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 1.8,
      roughness: 0.15,
      metalness: 0.2,
    });
  }, [accentColor]);

  const shardMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#d8f2fd'),
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.22,
      roughness: 0.08,
      metalness: 0.12,
      transmission: 0.68,
      ior: 1.50,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
  }, [accentColor]);

  const ringMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.85,
    });
  }, [accentColor]);

  // Facet edge line segments to guarantee crisp silhouette definition
  const edgeLines = useMemo(() => {
    if (!crystalMain || !crystalMain.geometry) return null;
    const eg = new THREE.EdgesGeometry(crystalMain.geometry, 18);
    const em = new THREE.LineBasicMaterial({
      color: new THREE.Color('#a5f3fc'),
      transparent: true,
      opacity: 0.32,
    });
    return new THREE.LineSegments(eg, em);
  }, [crystalMain]);

  // Apply materials and add edge highlights
  useEffect(() => {
    if (crystalMain) {
      crystalMain.material = crystalMaterial;
      if (edgeLines && !crystalMain.children.includes(edgeLines)) {
        crystalMain.add(edgeLines);
      }
    }
    if (innerCore) innerCore.material = coreMaterial;
    if (energyRing) energyRing.material = ringMaterial;
    shards.forEach((s) => {
      s.mesh.material = shardMaterial;
    });
    // Hide default placeholder display plane from GLB
    if (innerDisplay) innerDisplay.visible = false;
  }, [crystalMain, innerCore, energyRing, innerDisplay, shards, edgeLines, crystalMaterial, coreMaterial, shardMaterial, ringMaterial]);

  // Runtime animation hook across the 7 phases
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Idle vs Phase transforms for Crystal_Main
    if (crystalMain) {
      if (phase === 1) {
        // Phase 1 (Focus): Orient toward camera, brighten inner core
        crystalMain.rotation.y += (0 - crystalMain.rotation.y) * delta * 7;
        crystalMaterial.emissiveIntensity = 0.14 + phaseProgress * 0.35;
        coreMaterial.emissiveIntensity = 1.8 + phaseProgress * 1.4;
      } else if (phase === 2) {
        // Phase 2 (Charge): Subtle rapid energy tremor, high glow
        crystalMain.position.y = Math.sin(t * 22) * 0.007;
        crystalMaterial.emissiveIntensity = 0.45 + Math.sin(phaseProgress * Math.PI * 4) * 0.15;
        coreMaterial.emissiveIntensity = 3.0;
      } else if (phase === 3) {
        // Phase 3 (Fracture): Controlled cracks appear, slight separation
        crystalMaterial.opacity = 0.85 * (1 - phaseProgress * 0.3);
        crystalMaterial.emissiveIntensity = 0.35;
        if (crackLines) (crackLines as THREE.LineSegments).visible = true;
      } else if (phase === 4) {
        // Phase 4 (Shatter): Main crystal fades out as shards travel outward
        crystalMaterial.opacity = Math.max(0, 0.6 * (1 - phaseProgress * 1.5));
        crystalMaterial.emissiveIntensity = 0.2;
        if (crackLines) (crackLines as THREE.LineSegments).visible = false;
      } else if (phase === 5) {
        // Phase 5 (Particle Transition): Crystal is dissolved
        crystalMaterial.opacity = 0;
        coreMaterial.emissiveIntensity = 0.5;
        crystalMain.visible = false;
      } else if (phase === 6) {
        // Phase 6 (Rebuild): Crystal reappears and reforms
        crystalMain.visible = true;
        crystalMaterial.opacity = Math.min(0.85, phaseProgress * 0.85);
        coreMaterial.emissiveIntensity = 1.0 + phaseProgress * 0.8;
      } else if (phase === 7) {
        // Phase 7 (New Project): Stabilize and return to calm idle
        crystalMain.visible = true;
        crystalMaterial.opacity = 0.85;
        crystalMaterial.emissiveIntensity = 0.14 + (1 - phaseProgress) * 0.25;
        coreMaterial.emissiveIntensity = 1.8;
      } else {
        // Idle: Calm floating, very slow rotation (~6-8 degrees/sec)
        crystalMain.visible = true;
        crystalMaterial.opacity = 0.85;
        crystalMaterial.emissiveIntensity = 0.14 + Math.sin(t * 1.5) * 0.04;
        coreMaterial.emissiveIntensity = 1.8 + Math.sin(t * 2.0) * 0.25;
        if (crackLines) (crackLines as THREE.LineSegments).visible = false;
      }
    }

    // 2. Animate the 20 intentional faceted shards
    // Shards are ONLY visible during Fracture, Shatter, Particle, and Rebuild
    let burstFactor = 0;
    let shardVisibility = 0;

    if (phase === 0 || phase === 1 || phase === 2) {
      // Idle & Focus & Charge: Shards are hidden, crystal is pristine
      shardVisibility = 0;
      burstFactor = 0;
    } else if (phase === 3) {
      // Fracture: slight initial tension (0 -> 0.15)
      burstFactor = phaseProgress * 0.15;
      shardVisibility = phaseProgress * 0.6;
    } else if (phase === 4) {
      // Shatter: controlled outward movement (0.15 -> 0.75)
      burstFactor = 0.15 + phaseProgress * 0.6;
      shardVisibility = 1;
    } else if (phase === 5) {
      // Shards dissolve into particle stream
      burstFactor = 0.75 + phaseProgress * 0.15;
      shardVisibility = Math.max(0, 1 - phaseProgress * 2.0);
    } else if (phase === 6) {
      // Rebuild: reverse converge
      burstFactor = (1 - phaseProgress) * 0.6;
      shardVisibility = Math.min(1, phaseProgress * 1.8);
    } else if (phase === 7) {
      // Settled
      burstFactor = 0;
      shardVisibility = Math.max(0, 1 - phaseProgress * 3.0);
    }

    shards.forEach((item, idx) => {
      const { mesh, defaultPos, defaultRot, outwardDir } = item;
      mesh.visible = shardVisibility > 0.02;

      if (mesh.visible) {
        mesh.position.x = defaultPos.x + outwardDir.x * burstFactor;
        mesh.position.y = defaultPos.y + outwardDir.y * burstFactor;
        mesh.position.z = defaultPos.z + outwardDir.z * burstFactor;

        mesh.rotation.x = defaultRot.x + burstFactor * ((idx % 2 === 0 ? 1 : -1) * 0.6);
        mesh.rotation.y = defaultRot.y + burstFactor * 0.9;
        mesh.scale.setScalar(Math.max(0.001, shardVisibility));
      }
    });

    shardMaterial.opacity = 0.8 * shardVisibility;

    // 3. Energy ring rotation & acceleration during Phase 2 (Charge)
    if (energyRing) {
      const speed = phase === 2 ? 2.5 + phaseProgress * 4 : 0.6;
      energyRing.rotation.z += delta * speed;
    }

    // 4. Subtle overall assembly float during idle
    if (groupRef.current && phase === 0) {
      groupRef.current.position.y = Math.sin(t * 1.1) * 0.025;
      groupRef.current.rotation.y += delta * 0.09; // approx 5 degrees/sec
    }
  });

  // Dissolve progress calculation for interior
  const dissolveProgress =
    phase === 3
      ? phaseProgress * 0.3
      : phase === 4
      ? 0.3 + phaseProgress * 0.7
      : phase === 5
      ? 1
      : phase === 6
      ? 1 - phaseProgress
      : 0;

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={isMobile ? 0.85 : 0.95}>
      {/* GLB Blender Asset Hierarchy */}
      <primitive object={clonedScene} />

      {/* Embedded High-Fidelity Holographic Project Interior */}
      <CrystalThematicInterior
        projectId={projectId}
        accentColor={accentColor}
        dissolveProgress={dissolveProgress}
        isMobile={isMobile}
      />
    </group>
  );
};
