import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export type CharacterPose =
  | 'sitting'
  | 'standing'
  | 'walking'
  | 'working_laptop'
  | 'looking_moon';

export interface DeveloperCharacterProps {
  pose?: CharacterPose;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  enableBreathing?: boolean;
  enableRimLight?: boolean;
  rimLightColor?: string;
  modelUrl?: string;
}

/**
 * DeveloperCharacter (Modular React Three Fiber 3D Component)
 * - Strict visual match to Nandhakumar Universe 3D Character Developer Edition:
 *   * Young adult male developer
 *   * Dark stylized wavy/textured hair
 *   * Trimmed neat beard and goatee
 *   * Black oversized streetwear hoodie with glowing cyan 'NU' logo on back and chest
 *   * Black cargo pants with thigh flap pockets and ribbed cuffs
 *   * Black futuristic tech sneakers with white midsoles and glowing cyan LED sole lines
 *   * Futuristic ergonomic lounge chair with 5-star metallic swivel base
 * - Suitable for: sitting, standing, walking, working on laptop, looking toward moon
 * - Continuous subtle idle breathing animation
 */
export function DeveloperCharacter({
  pose = 'sitting',
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  enableBreathing = true,
  enableRimLight = true,
  rimLightColor = '#00f5ff',
  modelUrl = '/models/developer-character.glb',
}: DeveloperCharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group | null>(null);
  const headRef = useRef<THREE.Group | null>(null);
  const chairRef = useRef<THREE.Group | null>(null);
  const laptopRef = useRef<THREE.Group | null>(null);

  // Load the GLB asset
  const { scene } = useGLTF(modelUrl);

  // Clone scene so multiple instances in HOME, ABOUT, PROJECTS, CONTACT don't conflict
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Optimize materials and enhance emissive glows
    clone.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();

          // Enhance glowing cyan elements (Back Logo, Chest Logo, Sneaker LEDs, Watch)
          if (
            mesh.name.includes('N_') ||
            mesh.name.includes('U_') ||
            mesh.name.includes('SubtitleBar') ||
            mesh.name.includes('ChestLogo') ||
            mesh.name.includes('LED') ||
            mesh.name.includes('WatchScreen') ||
            mat.name.includes('CyanGlow')
          ) {
            mat.emissive = new THREE.Color(0x00f5ff);
            mat.emissiveIntensity = 2.8;
            mat.roughness = 0.2;
            mat.metalness = 0.1;
          }

          // Enhance deep matte black on streetwear hoodie
          if (mesh.name.includes('Hoodie') || mat.name.includes('Hoodie')) {
            mat.roughness = 0.88;
            mat.metalness = 0.04;
          }

          // Enhance cargo pants fabric
          if (mesh.name.includes('Cargo') || mesh.name.includes('Pants') || mat.name.includes('Cargo')) {
            mat.roughness = 0.92;
            mat.metalness = 0.02;
          }

          mesh.material = mat;
        }
      }
    });

    return clone;
  }, [scene]);

  // Bind key sub-hierarchies for dynamic posing & idle breathing
  useEffect(() => {
    if (!clonedScene) return;

    torsoRef.current = clonedScene.getObjectByName('TorsoGroup') as THREE.Group | null;
    headRef.current = clonedScene.getObjectByName('HeadGroup') as THREE.Group | null;
    chairRef.current = clonedScene.getObjectByName('LoungeChair') as THREE.Group | null;
    laptopRef.current = clonedScene.getObjectByName('Laptop') as THREE.Group | null;

    // Apply pose-specific structural adjustments
    if (chairRef.current) {
      chairRef.current.visible = pose === 'sitting' || pose === 'working_laptop';
    }

    if (laptopRef.current) {
      laptopRef.current.visible = pose === 'working_laptop';
    }

    // Pose adjustments for head and gaze
    if (headRef.current) {
      if (pose === 'sitting' || pose === 'looking_moon') {
        // Looking up toward the moon in the upper right
        headRef.current.rotation.set(-0.24, 0.44, 0.08);
      } else if (pose === 'working_laptop') {
        // Focused downward slightly on the screen
        headRef.current.rotation.set(0.28, 0, 0);
      } else {
        // Straight / natural forward gaze
        headRef.current.rotation.set(0, 0, 0);
      }
    }
  }, [clonedScene, pose]);

  // Subtle natural idle breathing animation
  useFrame((state) => {
    if (!enableBreathing || !torsoRef.current) return;

    const time = state.clock.getElapsedTime();
    // Gentle breathing cycle (~3.8s period)
    const breathCycle = Math.sin(time * 1.65);
    const microPulse = Math.cos(time * 3.3) * 0.002;

    // Torso gentle heave
    torsoRef.current.position.y = 0.62 + breathCycle * 0.006 + microPulse;
    torsoRef.current.scale.set(
      1 + breathCycle * 0.008,
      1 + breathCycle * 0.006,
      1 + breathCycle * 0.012
    );

    // Subtle responsive head nod/tilt
    if (headRef.current) {
      if (pose === 'sitting' || pose === 'looking_moon') {
        headRef.current.rotation.x = -0.24 + breathCycle * 0.012;
        headRef.current.rotation.y = 0.44 + Math.sin(time * 0.8) * 0.015;
      } else {
        headRef.current.rotation.x = breathCycle * 0.01;
      }
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={clonedScene} />

      {/* Real-time Cyan Rim Light to catch character edge & hoodie silhouette */}
      {enableRimLight && (
        <directionalLight
          position={[2.5, 2.8, -2.5]}
          intensity={2.4}
          color={rimLightColor}
          castShadow={false}
        />
      )}
    </group>
  );
}

// Preload the GLB model in background for instantaneous rendering
useGLTF.preload('/models/developer-character.glb');
