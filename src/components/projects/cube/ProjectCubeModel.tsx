import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ProjectItem } from '../../../data/projectsData';
import { getCubeFaceTexture } from './cubeFaceTextures';

interface ProjectCubeModelProps {
  project: ProjectItem;
  phase: number; // 0=IDLE, 1=FOCUS, 2=ROTATE, 3=DISASSEMBLE, 4=FORMATION, 5=REASSEMBLE, 6=REVEAL
  phaseProgress: number; // 0 to 1
  overallProgress: number;
  direction: number; // 1 for Next, -1 for Previous
  isMobile?: boolean;
}

export const ProjectCubeModel: React.FC<ProjectCubeModelProps> = ({
  project,
  phase,
  phaseProgress,
  overallProgress: _overallProgress,
  direction = 1,
  isMobile = false,
}) => {
  const masterGroupRef = useRef<THREE.Group>(null);
  const mainCubeRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Group>(null);
  const fragmentsGroupRef = useRef<THREE.Group>(null);

  // Responsive cube sizing (1.55 on desktop = ~200px visual, 1.25 on mobile = ~125px)
  const cubeSize = isMobile ? 1.25 : 1.55;
  const halfSize = cubeSize / 2;

  // 1. Box Geometry & Edge Lines
  const boxGeom = useMemo(() => new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), [cubeSize]);
  const edgesGeom = useMemo(() => new THREE.EdgesGeometry(boxGeom), [boxGeom]);

  // 2. High-Resolution Holographic Face Textures for this project
  const frontTex = useMemo(
    () => getCubeFaceTexture(project.id, 'front', project.accentColor),
    [project.id, project.accentColor]
  );
  const sideTex = useMemo(
    () => getCubeFaceTexture(project.id, 'side', project.accentColor),
    [project.id, project.accentColor]
  );
  const topTex = useMemo(
    () => getCubeFaceTexture(project.id, 'top', project.accentColor),
    [project.id, project.accentColor]
  );

  // 3. Multi-material for 6 faces: [Right(+x), Left(-x), Top(+y), Bottom(-y), Front(+z), Back(-z)]
  const cubeMaterials = useMemo(() => {
    // Front face (+Z): Software screenshot face (Resume Forge & active project)
    const frontMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      map: frontTex,
      emissive: new THREE.Color('#000000'),
      emissiveIntensity: 0,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.98,
      depthWrite: true,
    });

    // Side & Top faces: Dark glass with subtle accent emissive
    const sideMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#020919'),
      map: sideTex,
      emissive: new THREE.Color(project.accentColor),
      emissiveIntensity: 0.14,
      roughness: 0.15,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92,
      depthWrite: true,
    });

    const topMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#020919'),
      map: topTex,
      emissive: new THREE.Color(project.accentColor),
      emissiveIntensity: 0.14,
      roughness: 0.15,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92,
      depthWrite: true,
    });

    const darkMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#020919'),
      emissive: new THREE.Color(project.accentColor),
      emissiveIntensity: 0.08,
      roughness: 0.15,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92,
      depthWrite: true,
    });

    return [
      sideMat, // Right face (+x)
      sideMat, // Left face (-x)
      topMat,  // Top face (+y)
      darkMat, // Bottom face (-y)
      frontMat,// Front face (+z)
      darkMat, // Back face (-z)
    ];
  }, [frontTex, sideTex, topTex, project.accentColor]);

  // 4. Subtle Internal Glowing Energy Particles
  const internalParticles = useMemo(() => {
    const count = 28;
    const positions = new Float32Array(count * 3);
    const r = halfSize * 0.75;
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2 * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2 * r;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2 * r;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [halfSize]);

  // 5. Eight Disassembly Sub-Cubes (2x2x2 Octants)
  const fragmentPieces = useMemo(() => {
    const fragSize = cubeSize * 0.46;
    const fragGeom = new THREE.BoxGeometry(fragSize, fragSize, fragSize);
    const fragEdges = new THREE.EdgesGeometry(fragGeom);
    const offset = cubeSize * 0.25;

    const corners = [
      [-offset, -offset, -offset],
      [-offset, -offset, offset],
      [-offset, offset, -offset],
      [-offset, offset, offset],
      [offset, -offset, -offset],
      [offset, -offset, offset],
      [offset, offset, -offset],
      [offset, offset, offset],
    ];

    return corners.map(([x, y, z]) => ({
      origin: new THREE.Vector3(x, y, z),
      outwardDir: new THREE.Vector3(x, y, z).normalize(),
      geometry: fragGeom,
      edgesGeometry: fragEdges,
    }));
  }, [cubeSize]);

  const fragmentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#020919'),
        emissive: new THREE.Color(project.accentColor),
        emissiveIntensity: 0.28,
        roughness: 0.15,
        metalness: 0.2,
        transparent: true,
        opacity: 0.9,
        depthWrite: true,
      }),
    [project.accentColor]
  );

  // Runtime Animation Loop Across the 6 Transition Steps
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Idle Floating & Rotation
    if (phase === 0) {
      if (masterGroupRef.current) {
        masterGroupRef.current.position.y = Math.sin(t * 1.2) * 0.035;
        masterGroupRef.current.rotation.y += delta * 0.14; // very slow, smooth
        masterGroupRef.current.rotation.x = Math.sin(t * 0.6) * 0.025;
      }
      if (mainCubeRef.current) mainCubeRef.current.visible = true;
      if (fragmentsGroupRef.current) fragmentsGroupRef.current.visible = false;
      return;
    }

    // 2. STEP 1 — FOCUS (250ms): Slow down, flare emissive glow
    if (phase === 1) {
      if (mainCubeRef.current) {
        mainCubeRef.current.visible = true;
        // Dampen rotation smoothly
        masterGroupRef.current?.rotation.set(
          Math.sin(t * 0.6) * 0.02 * (1 - phaseProgress),
          (masterGroupRef.current?.rotation.y || 0) + delta * 0.04 * (1 - phaseProgress),
          0
        );
        cubeMaterials.forEach((m) => {
          m.emissiveIntensity = 0.16 + phaseProgress * 0.5;
        });
      }
      if (fragmentsGroupRef.current) fragmentsGroupRef.current.visible = false;
    }

    // 3. STEP 2 — ROTATE (350ms): Rotates 90-180deg, becomes slightly transparent
    else if (phase === 2) {
      if (masterGroupRef.current) {
        masterGroupRef.current.rotation.y += delta * 4.5 * direction;
      }
      if (mainCubeRef.current) {
        mainCubeRef.current.visible = true;
        cubeMaterials.forEach((m) => {
          m.opacity = Math.max(0.35, 0.88 * (1 - phaseProgress * 0.55));
        });
      }
      if (fragmentsGroupRef.current) fragmentsGroupRef.current.visible = false;
    }

    // 4. STEP 3 — DISASSEMBLE (300ms): Main cube separates into 8 fragments moving slightly outward
    else if (phase === 3) {
      if (mainCubeRef.current) mainCubeRef.current.visible = false;
      if (fragmentsGroupRef.current) {
        fragmentsGroupRef.current.visible = true;
        const burst = 0.1 + phaseProgress * 0.55; // Controlled outward movement
        fragmentsGroupRef.current.children.forEach((child, idx) => {
          const frag = fragmentPieces[idx];
          if (frag && child instanceof THREE.Group) {
            child.position.x = frag.origin.x + frag.outwardDir.x * burst;
            child.position.y = frag.origin.y + frag.outwardDir.y * burst;
            child.position.z = frag.origin.z + frag.outwardDir.z * burst;
            child.rotation.y += delta * 2 * direction;
          }
        });
      }
    }

    // 5. STEP 4 — FORMATION (350ms): Fragments rotate around center in smooth circular/spiral motion
    else if (phase === 4) {
      if (mainCubeRef.current) mainCubeRef.current.visible = false;
      if (fragmentsGroupRef.current) {
        fragmentsGroupRef.current.visible = true;
        const angleOffset = phaseProgress * Math.PI * 1.2 * direction;
        fragmentsGroupRef.current.rotation.y += delta * 3.5 * direction;

        fragmentsGroupRef.current.children.forEach((child, idx) => {
          const frag = fragmentPieces[idx];
          if (frag && child instanceof THREE.Group) {
            // Spiral orbit pattern around center
            const rad = 0.65 - phaseProgress * 0.1;
            const theta = (idx / 8) * Math.PI * 2 + angleOffset;
            child.position.x = Math.cos(theta) * rad;
            child.position.z = Math.sin(theta) * rad;
            child.position.y = frag.origin.y + Math.sin(theta * 2) * 0.15;
            child.rotation.x += delta * 2;
            child.rotation.z += delta * 2;
          }
        });
      }
    }

    // 6. STEP 5 — REASSEMBLE (300ms): Fragments converge inward back to cube form
    else if (phase === 5) {
      if (mainCubeRef.current) mainCubeRef.current.visible = false;
      if (fragmentsGroupRef.current) {
        fragmentsGroupRef.current.visible = true;
        const convergeFactor = 1 - phaseProgress; // 1 down to 0
        fragmentsGroupRef.current.rotation.y += delta * 1.5 * direction * convergeFactor;

        fragmentsGroupRef.current.children.forEach((child, idx) => {
          const frag = fragmentPieces[idx];
          if (frag && child instanceof THREE.Group) {
            child.position.x = frag.origin.x + frag.outwardDir.x * 0.65 * convergeFactor;
            child.position.y = frag.origin.y + frag.outwardDir.y * 0.65 * convergeFactor;
            child.position.z = frag.origin.z + frag.outwardDir.z * 0.65 * convergeFactor;
            child.rotation.set(0, 0, 0);
          }
        });
      }
    }

    // 7. STEP 6 — REVEAL (250ms): New whole cube appears, settles into calm rotation
    else if (phase === 6) {
      if (fragmentsGroupRef.current) fragmentsGroupRef.current.visible = false;
      if (mainCubeRef.current) {
        mainCubeRef.current.visible = true;
        cubeMaterials.forEach((m) => {
          m.opacity = Math.min(0.88, 0.4 + phaseProgress * 0.48);
          m.emissiveIntensity = 0.16 + (1 - phaseProgress) * 0.35;
        });
      }
      if (masterGroupRef.current) {
        masterGroupRef.current.rotation.y += delta * 0.18;
      }
    }

    // Floating internal core animation
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x = Math.sin(t * 1.5) * 0.1;
    }
  });

  return (
    <group ref={masterGroupRef} position={[0, 0, 0]}>
      {/* 1. Main Holographic Translucent Cube */}
      <mesh ref={mainCubeRef} geometry={boxGeom} material={cubeMaterials}>
        {/* Glowing Cyan / Electric Blue Beveled Edge Lines */}
        <lineSegments geometry={edgesGeom}>
          <lineBasicMaterial
            color="#00f5ff"
            transparent
            opacity={0.95}
            linewidth={2}
          />
        </lineSegments>

        {/* Secondary Inset Glowing Frame for Dimensional Thickness */}
        <lineSegments scale={0.96} geometry={edgesGeom}>
          <lineBasicMaterial
            color={project.accentColor}
            transparent
            opacity={0.45}
            linewidth={1}
          />
        </lineSegments>

        {/* Internal Floating Holographic Core & Particles */}
        <group ref={coreRef}>
          <points geometry={internalParticles}>
            <pointsMaterial
              color="#00f5ff"
              size={isMobile ? 0.035 : 0.045}
              transparent
              opacity={0.75}
              blending={THREE.AdditiveBlending}
            />
          </points>

          {/* Central Holographic Axis Ring */}
          <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[cubeSize * 0.28, 0.012, 16, 32]} />
            <meshBasicMaterial
              color="#00f5ff"
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      </mesh>

      {/* 2. Disassembly Fragment Pieces (Visible during Step 3, 4, 5) */}
      <group ref={fragmentsGroupRef} visible={false}>
        {fragmentPieces.map((piece, idx) => (
          <group key={idx} position={piece.origin.toArray()}>
            <mesh geometry={piece.geometry} material={fragmentMat}>
              <lineSegments geometry={piece.edgesGeometry}>
                <lineBasicMaterial
                  color="#00f5ff"
                  transparent
                  opacity={0.9}
                />
              </lineSegments>
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
