import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { getProjectScreenshotUri } from './ProjectScreenshots';
import { ProjectItem } from '../../../data/projectsData';

interface HolographicScreenProps {
  project: ProjectItem;
  position?: [number, number, number];
  rotation?: [number, number, number];
  transitionPhase?: number; // 0=idle, 1=focus, 2=shutter, 3=advance, 4=sweep, 5=materialize
  transitionProgress?: number; // 0 to 1
  accentColor?: string;
  isMobile?: boolean;
}

export const HolographicScreen: React.FC<HolographicScreenProps> = ({
  project,
  position = [1.2, 0.45, 0],
  rotation = [0, -0.12, 0], // Subtle perspective angle matching the beam
  transitionPhase = 0,
  transitionProgress = 0,
  accentColor = '#00f5ff',
  isMobile = false,
}) => {
  const screenGroupRef = useRef<THREE.Group>(null);
  const imageMeshRef = useRef<THREE.Mesh>(null);
  const glowEdgeRef = useRef<THREE.LineSegments>(null);
  const sweepSheenRef = useRef<THREE.Mesh>(null);

  // Screen dimensions: 16:9 ratio
  const screenWidth = isMobile ? 3.0 : 4.6;
  const screenHeight = screenWidth * (9 / 16);

  // Load project texture
  const textureUri = useMemo(() => {
    return getProjectScreenshotUri(project.id);
  }, [project.id]);

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(textureUri);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [textureUri]);

  // Clean up texture when unmounted or changed
  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  // Materials
  const screenGlassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0x050c1a,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      transparent: true,
      opacity: 0.8,
      reflectivity: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
  }, []);

  const imageMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 1.0,
      side: THREE.FrontSide,
    });
  }, [texture]);

  const glowEdgeMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.85,
      linewidth: 2,
    });
  }, [accentColor]);

  const sweepSheenMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      depthWrite: false,
    });
  }, []);

  // Frame bevel geometry
  const frameGeometry = useMemo(() => {
    return new THREE.BoxGeometry(screenWidth + 0.16, screenHeight + 0.16, 0.05);
  }, [screenWidth, screenHeight]);

  const imagePlaneGeometry = useMemo(() => {
    return new THREE.PlaneGeometry(screenWidth, screenHeight);
  }, [screenWidth, screenHeight]);

  const edgesGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.BoxGeometry(screenWidth + 0.16, screenHeight + 0.16, 0.06));
  }, [screenWidth, screenHeight]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Subtle idle floating levitation (gentle, no rotation)
    if (screenGroupRef.current) {
      const floatY = Math.sin(t * 1.5) * 0.035;
      screenGroupRef.current.position.y = position[1] + floatY;
    }

    // 2. Transition visual effects
    let imageOpacity = 1.0;
    let imageScale = 1.0;

    if (transitionPhase === 1) {
      // Step 1: Focus — screen sharpens, subtle zoom
      imageOpacity = 1.0;
      imageScale = 1.0 + transitionProgress * 0.02;
    } else if (transitionPhase === 2) {
      // Step 2: Light Shutter — image fades down
      imageOpacity = Math.max(0.15, 1.0 - transitionProgress * 0.85);
      imageScale = 1.02;
    } else if (transitionPhase === 3) {
      // Step 3: Film Advance — blank / faint projection
      imageOpacity = 0.15;
      imageScale = 0.98;
    } else if (transitionPhase === 4) {
      // Step 4: Light Sweep across screen
      imageOpacity = 0.5 + transitionProgress * 0.4;
      imageScale = 0.99 + transitionProgress * 0.01;

      if (sweepSheenRef.current) {
        sweepSheenRef.current.position.x = (-0.5 + transitionProgress) * screenWidth * 1.2;
        sweepSheenMaterial.opacity = Math.sin(transitionProgress * Math.PI) * 0.6;
      }
    } else if (transitionPhase === 5) {
      // Step 5: New Projection Materializes
      imageOpacity = 0.9 + transitionProgress * 0.1;
      imageScale = 1.0;
      sweepSheenMaterial.opacity = 0;
    } else {
      // Idle
      imageOpacity = 1.0;
      imageScale = 1.0;
      sweepSheenMaterial.opacity = 0;
    }

    if (imageMeshRef.current) {
      imageMaterial.opacity = imageOpacity;
      imageMeshRef.current.scale.set(imageScale, imageScale, 1);
    }

    // Glow Edge intensity
    glowEdgeMaterial.opacity = 0.75 + Math.sin(t * 2.5) * 0.2;
  });

  return (
    <group
      ref={screenGroupRef}
      position={position}
      rotation={rotation}
    >
      {/* 1. Glass Outer Frame & Depth Casing */}
      <mesh geometry={frameGeometry} material={screenGlassMaterial} position={[0, 0, -0.02]} />

      {/* 2. Thin Glowing Cyan Border Frame */}
      <lineSegments ref={glowEdgeRef} geometry={edgesGeometry} material={glowEdgeMaterial} />

      {/* 3. Dark Backplate (so image does not shine through backwards) */}
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[screenWidth + 0.12, screenHeight + 0.12]} />
        <meshBasicMaterial color="#020612" />
      </mesh>

      {/* 4. REAL PROJECT SCREENSHOT DISPLAY PLANE */}
      <mesh
        ref={imageMeshRef}
        geometry={imagePlaneGeometry}
        material={imageMaterial}
        position={[0, 0, 0.01]}
      />

      {/* 5. Holographic Scanline Overlay (Subtle horizontal gridlines) */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[screenWidth, screenHeight]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 6. Sweep Sheen Light Bar (Active during Step 4 transition) */}
      <mesh
        ref={sweepSheenRef}
        material={sweepSheenMaterial}
        position={[0, 0, 0.03]}
      >
        <planeGeometry args={[0.5, screenHeight]} />
      </mesh>

      {/* 7. Subtle Under-Screen Platform Illumination Point Light */}
      <pointLight
        position={[0, -screenHeight * 0.5 - 0.2, 0.3]}
        color={accentColor}
        intensity={1.2}
        distance={3.5}
      />
    </group>
  );
};
