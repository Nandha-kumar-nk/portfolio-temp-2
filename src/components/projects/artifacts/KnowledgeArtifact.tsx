import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface KnowledgeArtifactProps {
  transitionProgress: number; // 0: fully formed, 1: fully burst/dissolved
  burstDirection?: number; // 1 for next (travel to side), -1 for prev
  accentColor?: string;
  screenshotTexture?: THREE.Texture | null;
}

export const KnowledgeArtifact: React.FC<KnowledgeArtifactProps> = ({
  transitionProgress = 0,
  burstDirection = 1,
  accentColor = '#00f5ff',
  screenshotTexture = null,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const outerCageRef = useRef<THREE.Group>(null);
  const ringsGroupRef = useRef<THREE.Group>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);
  const shardsGroupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const lightStreamPointsRef = useRef<THREE.Points>(null);
  const screenPanelRef = useRef<THREE.Group>(null);

  // Parse accent color
  const threeAccent = useMemo(() => new THREE.Color(accentColor), [accentColor]);
  const threeViolet = useMemo(() => new THREE.Color('#8b5cf6'), []);
  const threeDeepBlue = useMemo(() => new THREE.Color('#0284c7'), []);

  // 1. Procedural Crystalline Cage Geometries & Layers
  // Outer icosahedron cage & inner octahedron cage
  const outerGeom = useMemo(() => new THREE.IcosahedronGeometry(1.5, 0), []);
  const innerOctaGeom = useMemo(() => new THREE.OctahedronGeometry(1.05, 0), []);
  const dodecaGeom = useMemo(() => new THREE.DodecahedronGeometry(0.75, 0), []);

  // Outer transparent crystalline material with specular shine and dual-sided refraction look
  const crystalMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0x80e5ff,
      emissive: 0x003355,
      emissiveIntensity: 0.35,
      roughness: 0.1,
      metalness: 0.15,
      transmission: 0.72,
      ior: 1.52,
      thickness: 0.8,
      transparent: true,
      opacity: 0.82,
      wireframe: false,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  // Outer wireframe edge accent
  const wireframeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
  }, []);

  // Core pulsating glowing sphere material
  const coreMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: false,
      transparent: true,
      opacity: 0.95,
    });
  }, []);

  // Inner energy aura mesh
  const coreAuraMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
  }, []);

  // 2. Orbital Curves & Energy Conduits
  const orbitalRings = useMemo(() => {
    const ringGeom1 = new THREE.TorusGeometry(2.05, 0.014, 16, 120);
    const ringGeom2 = new THREE.TorusGeometry(1.78, 0.012, 16, 100);
    const ringGeom3 = new THREE.TorusGeometry(2.32, 0.016, 16, 140);
    return [
      { geom: ringGeom1, rot: [0.35, 0.2, 0.8] as [number, number, number], speed: 0.6 },
      { geom: ringGeom2, rot: [-0.6, 0.7, -0.2] as [number, number, number], speed: -0.8 },
      { geom: ringGeom3, rot: [0.9, -0.4, 0.3] as [number, number, number], speed: 0.45 },
    ];
  }, []);

  const ringMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x00f5ff,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.75,
    });
  }, []);

  // 3. Floating Knowledge Nodes (small glowing satellite coordinates)
  const knowledgeNodes = useMemo(() => {
    const nodes: Array<{
      position: [number, number, number];
      basePos: [number, number, number];
      size: number;
      speed: number;
      orbitRadius: number;
      phi: number;
      theta: number;
      color: string;
    }> = [];
    const count = 14;
    const colors = ['#00f5ff', '#38bdf8', '#818cf8', '#c084fc', '#67e8f9'];
    for (let i = 0; i < count; i++) {
      const radius = 1.6 + Math.random() * 0.9;
      const theta = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const phi = (Math.PI / 2) + (Math.random() - 0.5) * 1.2;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      nodes.push({
        position: [x, y, z],
        basePos: [x, y, z],
        size: 0.045 + Math.random() * 0.035,
        speed: 0.4 + Math.random() * 0.5,
        orbitRadius: radius,
        phi,
        theta,
        color: colors[i % colors.length],
      });
    }
    return nodes;
  }, []);

  // 4. Floating Geometric Crystalline Shards/Fragments
  const shardsData = useMemo(() => {
    const shards: Array<{
      basePos: [number, number, number];
      rotation: [number, number, number];
      scale: number;
      burstVector: [number, number, number];
    }> = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 1.35 + Math.random() * 1.1;
      const x = dist * Math.sin(phi) * Math.cos(theta);
      const y = dist * Math.sin(phi) * Math.sin(theta);
      const z = dist * Math.cos(phi);
      shards.push({
        basePos: [x, y, z],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.08 + Math.random() * 0.12,
        burstVector: [x * (1.8 + Math.random()), y * (1.5 + Math.random()), z * (1.5 + Math.random())],
      });
    }
    return shards;
  }, []);

  const shardGeom = useMemo(() => new THREE.TetrahedronGeometry(1, 0), []);
  const shardMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.4,
      roughness: 0.15,
      metalness: 0.2,
      transmission: 0.65,
      transparent: true,
      opacity: 0.75,
      thickness: 0.5,
    });
  }, []);

  // 5. Surrounding Subtle Ambient Particles & Light Streams
  const particlesGeo = useMemo(() => {
    const pCount = 280;
    const positions = new Float32Array(pCount * 3);
    const colors = new Float32Array(pCount * 3);
    const randomSizes = new Float32Array(pCount);
    const cCyan = new THREE.Color('#00f5ff');
    const cViolet = new THREE.Color('#a855f7');
    const cBlue = new THREE.Color('#38bdf8');

    for (let i = 0; i < pCount; i++) {
      const r = 0.8 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const colorMix = Math.random();
      const col = colorMix > 0.65 ? cViolet : colorMix > 0.3 ? cCyan : cBlue;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      randomSizes[i] = Math.random() * 2.5 + 1.0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  // Particles Material with soft circular alpha
  const particlesMat = useMemo(() => {
    // Generate soft circular glow canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.35, 'rgba(100,240,255,0.8)');
      grad.addColorStop(1, 'rgba(0,10,30,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);

    return new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  // Frame Loop Animation
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Root group gentle floating & responsive slight rotation
    if (rootGroupRef.current) {
      // Gentle vertical float
      const floatY = Math.sin(t * 0.9) * 0.09;
      // Slight base yaw rotation
      rootGroupRef.current.position.y = floatY;

      // Handle transition burst / separation
      if (transitionProgress > 0) {
        // Smooth exponential expansion
        const tp = transitionProgress;
        // Travel toward the side according to burstDirection
        rootGroupRef.current.position.x = tp * tp * 8.5 * burstDirection;
        rootGroupRef.current.position.z = -tp * 4.0;
        rootGroupRef.current.scale.setScalar(Math.max(0.001, 1 - tp * 0.7));
      } else {
        rootGroupRef.current.position.x = 0;
        rootGroupRef.current.position.z = 0;
        rootGroupRef.current.scale.setScalar(1);
      }
    }

    // 2. Outer cage slow counter-rotation & subtle pulse
    if (outerCageRef.current) {
      outerCageRef.current.rotation.y = t * 0.18;
      outerCageRef.current.rotation.x = Math.sin(t * 0.15) * 0.12;

      if (transitionProgress > 0) {
        // Explode outer geometry
        const exp = 1 + transitionProgress * 3.2;
        outerCageRef.current.scale.set(exp, exp, exp);
        crystalMaterial.opacity = Math.max(0, 0.82 * (1 - transitionProgress * 1.5));
        wireframeMaterial.opacity = Math.max(0, 0.45 * (1 - transitionProgress * 1.8));
      } else {
        const pulse = 1 + Math.sin(t * 1.8) * 0.03;
        outerCageRef.current.scale.set(pulse, pulse, pulse);
        crystalMaterial.opacity = 0.82;
        wireframeMaterial.opacity = 0.45;
      }
    }

    // 3. Core sphere pulsing light & glow
    if (coreMeshRef.current) {
      const corePulse = 0.45 + Math.sin(t * 2.4) * 0.06;
      coreMeshRef.current.scale.setScalar(corePulse);
      coreMeshRef.current.rotation.y = -t * 0.4;
      coreMeshRef.current.rotation.z = Math.cos(t * 0.3) * 0.2;

      if (transitionProgress > 0) {
        // Core flashes bright then shrinks into singularity
        const flash = transitionProgress < 0.25 ? 1 + transitionProgress * 4 : Math.max(0, 2 - transitionProgress * 2.5);
        coreMeshRef.current.scale.setScalar(corePulse * flash);
        coreMaterial.opacity = Math.max(0, 1 - transitionProgress);
      } else {
        coreMaterial.opacity = 0.95;
      }
    }

    // 4. Orbital rings individual rotational paths
    if (ringsGroupRef.current) {
      ringsGroupRef.current.children.forEach((child, i) => {
        const cfg = orbitalRings[i];
        if (cfg) {
          child.rotation.z = t * cfg.speed;
          child.rotation.y = Math.sin(t * 0.4 * cfg.speed) * 0.3;
        }
      });

      if (transitionProgress > 0) {
        const ringExp = 1 + transitionProgress * 4.0;
        ringsGroupRef.current.scale.set(ringExp, ringExp, ringExp);
        ringMaterial.opacity = Math.max(0, 0.75 * (1 - transitionProgress * 1.6));
      } else {
        ringsGroupRef.current.scale.set(1, 1, 1);
        ringMaterial.opacity = 0.75;
      }
    }

    // 5. Floating knowledge nodes orbital progression
    if (nodesGroupRef.current) {
      nodesGroupRef.current.children.forEach((child, i) => {
        const node = knowledgeNodes[i];
        if (node) {
          const curTheta = node.theta + t * 0.25 * node.speed;
          const r = node.orbitRadius + Math.sin(t * 1.2 + i) * 0.08;
          let nx = r * Math.sin(node.phi) * Math.cos(curTheta);
          let ny = r * Math.cos(node.phi) + Math.sin(t * 0.8 + i) * 0.05;
          let nz = r * Math.sin(node.phi) * Math.sin(curTheta);

          if (transitionProgress > 0) {
            // Nodes scatter outward violently
            const scatter = transitionProgress * 6.0;
            nx += (node.basePos[0] * scatter) + (burstDirection * transitionProgress * 4);
            ny += node.basePos[1] * scatter;
            nz += node.basePos[2] * scatter;
            child.scale.setScalar(Math.max(0.001, node.size * (1 - transitionProgress)));
          } else {
            child.scale.setScalar(node.size * (1 + Math.sin(t * 3 + i) * 0.18));
          }
          child.position.set(nx, ny, nz);
        }
      });
    }

    // 6. Shards scatter
    if (shardsGroupRef.current) {
      shardsGroupRef.current.children.forEach((child, i) => {
        const shard = shardsData[i];
        if (shard) {
          child.rotation.x += delta * 0.3;
          child.rotation.y += delta * 0.5;

          if (transitionProgress > 0) {
            const burstAmount = transitionProgress * 5.5;
            child.position.x = shard.basePos[0] + shard.burstVector[0] * burstAmount + (burstDirection * transitionProgress * 3.5);
            child.position.y = shard.basePos[1] + shard.burstVector[1] * burstAmount;
            child.position.z = shard.basePos[2] + shard.burstVector[2] * burstAmount;
            child.scale.setScalar(Math.max(0.001, shard.scale * (1 - transitionProgress * 0.9)));
          } else {
            const hover = Math.sin(t * 0.8 + i) * 0.05;
            child.position.set(shard.basePos[0], shard.basePos[1] + hover, shard.basePos[2]);
            child.scale.setScalar(shard.scale);
          }
        }
      });
      shardMat.opacity = Math.max(0, 0.75 * (1 - transitionProgress * 1.4));
    }

    // 7. Ambient particles swirl
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.08;
      particlesRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;

      if (transitionProgress > 0) {
        particlesMat.size = 0.08 + transitionProgress * 0.22;
        particlesMat.opacity = Math.max(0, 0.75 * (1 - transitionProgress * 1.1));
        particlesRef.current.position.x = burstDirection * transitionProgress * 6.0;
      } else {
        particlesMat.size = 0.08;
        particlesMat.opacity = 0.75;
        particlesRef.current.position.x = 0;
      }
    }

    // 8. Subtle Holographic Screen Panel tilt & response
    if (screenPanelRef.current) {
      // Subtle float slightly behind/inside the artifact
      const panelFloat = Math.sin(t * 0.95 + 1.2) * 0.04;
      screenPanelRef.current.position.y = -0.05 + panelFloat;
      screenPanelRef.current.rotation.y = -0.15 + Math.sin(t * 0.5) * 0.05;
      screenPanelRef.current.rotation.x = 0.08 + Math.cos(t * 0.4) * 0.03;

      if (transitionProgress > 0) {
        screenPanelRef.current.scale.setScalar(Math.max(0.001, 1 - transitionProgress * 1.5));
      } else {
        screenPanelRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group ref={rootGroupRef} position={[0, 0, 0]}>
      {/* 1. Core Pulsing Glowing Sphere & Inner Aura */}
      <mesh ref={coreMeshRef} material={coreMaterial}>
        <sphereGeometry args={[0.42, 32, 32]} />
      </mesh>
      <mesh material={coreAuraMaterial} scale={[0.58, 0.58, 0.58]}>
        <icosahedronGeometry args={[1, 1]} />
      </mesh>
      {/* Inner Point Light radiating from core */}
      <pointLight color="#00f5ff" intensity={2.8} distance={8} decay={2} />
      <pointLight color="#8b5cf6" intensity={1.6} distance={6} decay={2} position={[0, 0.4, 0]} />

      {/* 2. Procedural Crystalline Layer (Outer Icosahedron + Inner Octahedron) */}
      <group ref={outerCageRef}>
        {/* Main Crystal Mesh */}
        <mesh geometry={outerGeom} material={crystalMaterial} />
        {/* Wireframe Glowing Ridge Accents */}
        <mesh geometry={outerGeom} material={wireframeMaterial} scale={[1.005, 1.005, 1.005]} />
        {/* Inner Secondary Crystalline Facet */}
        <mesh geometry={innerOctaGeom} material={crystalMaterial} rotation={[0.4, 0.6, 0.2]} scale={[0.85, 0.85, 0.85]} />
        <mesh geometry={dodecaGeom} material={wireframeMaterial} rotation={[-0.3, 0.4, 0.5]} scale={[0.9, 0.9, 0.9]} />
      </group>

      {/* 3. Thin Orbital Curves & Energy Conduits */}
      <group ref={ringsGroupRef}>
        {orbitalRings.map((ring, idx) => (
          <mesh
            key={idx}
            geometry={ring.geom}
            material={ringMaterial}
            rotation={ring.rot}
          />
        ))}
      </group>

      {/* 4. Small Knowledge Nodes (Glowing Satellites) */}
      <group ref={nodesGroupRef}>
        {knowledgeNodes.map((node, idx) => (
          <mesh key={idx} position={node.position}>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshBasicMaterial color={node.color} />
          </mesh>
        ))}
      </group>

      {/* 5. Floating Geometric Fragments/Shards */}
      <group ref={shardsGroupRef}>
        {shardsData.map((shard, idx) => (
          <mesh
            key={idx}
            geometry={shardGeom}
            material={shardMat}
            position={shard.basePos}
            rotation={shard.rotation}
            scale={shard.scale}
          />
        ))}
      </group>

      {/* 6. Subtle Atmospheric Particles */}
      <primitive object={new THREE.Points(particlesGeo, particlesMat)} ref={particlesRef} />

      {/* 7. Subtle Holographic Supporting Screenshot Surface */}
      {/* Placed gracefully behind/within the crystal with slight perspective and transparency */}
      <group ref={screenPanelRef} position={[0.1, -0.05, -0.55]}>
        {/* Holographic Frame Border */}
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(1.65, 1.05)]} />
          <lineBasicMaterial color="#00f5ff" transparent opacity={0.55} />
        </lineSegments>

        {/* Screenshot Plane */}
        {screenshotTexture ? (
          <mesh>
            <planeGeometry args={[1.6, 1.0]} />
            <meshBasicMaterial
              map={screenshotTexture}
              transparent
              opacity={0.68}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        ) : (
          /* Procedural Holographic Digital Preview Screen if texture still loading */
          <mesh>
            <planeGeometry args={[1.6, 1.0]} />
            <meshPhysicalMaterial
              color={0x02162e}
              emissive={0x0369a1}
              emissiveIntensity={0.5}
              roughness={0.2}
              transmission={0.6}
              transparent
              opacity={0.55}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Corner Cyber Accents on Holographic Screen */}
        <mesh position={[-0.8, 0.5, 0.01]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0.8, 0.5, 0.01]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.8} />
        </mesh>
        <mesh position={[-0.8, -0.5, 0.01]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0.8, -0.5, 0.01]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.8} />
        </mesh>

        {/* Floating Hologram Label */}
        <mesh position={[0, -0.58, 0]}>
          <planeGeometry args={[0.7, 0.08]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
};
