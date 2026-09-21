import { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { DeviceQualityInfo } from '../../hooks/useDeviceQuality';

interface TransformingParticleFieldProps {
  scrollSectionProgress: number; // 0.0 (Home) -> 1.0 (About) -> 2.0 (Skills) -> 3.0 (Projects) -> 4.0 (Contact)
  mousePos: { x: number; y: number };
  isDestroyed?: boolean;
  destructionProgress?: number; // 0 to 1 during destruction/reconstruction sequence
  quality: DeviceQualityInfo;
}

interface ParticleNode {
  // Base targets for each section stage
  homePos: [number, number, number];
  aboutRibbonPos: [number, number, number];
  crystalPos: [number, number, number];
  skillsNetworkPos: [number, number, number];
  contactNkPos: [number, number, number];
  
  // Dynamic properties
  phase: number;
  speed: number;
  colorType: number; // 0: Cyan, 1: Sky Blue, 2: Violet, 3: Pure White
  velocity: [number, number, number];
  explosionDir: [number, number, number];
}

// Letter N & K coordinate generators for 3D particle typography
function generateNkPositions(count: number): Array<[number, number, number]> {
  const result: Array<[number, number, number]> = [];
  const half = Math.floor(count / 2);

  // Letter N
  for (let i = 0; i < half; i++) {
    const t = i / half;
    let x = 0;
    let y = 0;
    if (t < 0.35) {
      // Left vertical stem
      x = -1.8;
      y = -1.8 + (t / 0.35) * 3.6;
    } else if (t < 0.65) {
      // Diagonal stem
      const dt = (t - 0.35) / 0.3;
      x = -1.8 + dt * 1.4;
      y = 1.8 - dt * 3.6;
    } else {
      // Right vertical stem
      const dt = (t - 0.65) / 0.35;
      x = -0.4;
      y = -1.8 + dt * 3.6;
    }
    const z = (Math.random() - 0.5) * 0.4;
    result.push([x, y, z]);
  }

  // Letter K
  for (let i = half; i < count; i++) {
    const t = (i - half) / (count - half);
    let x = 0;
    let y = 0;
    if (t < 0.4) {
      // Vertical stem
      x = 0.5;
      y = -1.8 + (t / 0.4) * 3.6;
    } else if (t < 0.7) {
      // Upper arm
      const dt = (t - 0.4) / 0.3;
      x = 0.5 + dt * 1.4;
      y = 0.0 + dt * 1.8;
    } else {
      // Lower arm
      const dt = (t - 0.7) / 0.3;
      x = 0.5 + dt * 1.4;
      y = 0.0 - dt * 1.8;
    }
    const z = (Math.random() - 0.5) * 0.4;
    result.push([x, y, z]);
  }

  return result;
}

export function TransformingParticleField({
  scrollSectionProgress,
  mousePos,
  isDestroyed = false,
  destructionProgress = 0,
  quality,
}: TransformingParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const particleCount = quality.particleCount || 1800;
  const prefersReducedMotion = quality.prefersReducedMotion;
  const isMobile = quality.isMobile;

  const { viewport } = useThree();

  // Create crisp pin-point star particle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(0, 217, 255, 0.85)');
    gradient.addColorStop(0.5, 'rgba(0, 217, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Pre-generate target node layouts for all sections
  const { particleData, currentPositions, colors, nkCoords } = useMemo(() => {
    const data: ParticleNode[] = [];
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const nkPos = generateNkPositions(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // 1. Home Distant Star Dust (Subtle peripheral background stars only, center & typography completely clean)
      const isTinyBackdrop = i % 8 === 0; // Only ~12% of particles active in home backdrop
      let homeX = 0;
      let homeY = 0;
      let homeZ = 0;

      if (isTinyBackdrop) {
        const radius = 5.2 + (Math.random() * 4.5);
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.9;
        homeX = radius * Math.cos(theta) * Math.cos(phi);
        homeY = radius * Math.sin(phi) + 0.4;
        homeZ = -1.5 - Math.random() * 3.5; // Distant depth
      } else {
        // Dormant offscreen / distant stars for Home, ready to assemble when scrolling to About
        const radius = 8.5 + (Math.random() * 4.0);
        const theta = Math.random() * Math.PI * 2;
        homeX = radius * Math.cos(theta);
        homeY = (Math.random() - 0.5) * 8.0;
        homeZ = -4.0 - Math.random() * 4.0;
      }

      // 2. About Flowing Ribbon Pos
      const ribbonT = (i / particleCount) * 14 - 7;
      const ribbonX = ribbonT * 0.95;
      const ribbonY = Math.sin(ribbonT * 0.8) * 1.4 + (Math.random() - 0.5) * 0.8;
      const ribbonZ = Math.cos(ribbonT * 0.6) * 1.2 + (Math.random() - 0.5) * 0.6;

      // 3. Crystalline Solid Polyhedron Pos
      const polyRadius = 1.6 + (i % 3) * 0.25;
      const phiC = Math.acos(1 - 2 * (i / particleCount));
      const thetaC = Math.PI * (1 + Math.sqrt(5)) * i;
      const crystalX = polyRadius * Math.sin(phiC) * Math.cos(thetaC);
      const crystalY = polyRadius * Math.sin(phiC) * Math.sin(thetaC);
      const crystalZ = polyRadius * Math.cos(phiC);

      // 4. Skills Network Node Pos
      const netAngle = (i / particleCount) * Math.PI * 2 * 3;
      const netRadius = 1.2 + (i % 5) * 0.6;
      const skillsX = Math.cos(netAngle) * netRadius + (Math.random() - 0.5) * 0.4;
      const skillsY = Math.sin(netAngle) * netRadius * 0.7 + (Math.random() - 0.5) * 0.4;
      const skillsZ = (Math.random() - 0.5) * 1.2;

      // 5. Contact NK Pos
      const nk = nkPos[i] || [0, 0, 0];

      // Colors - Pure Electric Cyan, Sky Blue & White Palette (No purple/violet)
      const colorPick = Math.random();
      let colorType = 0;
      if (colorPick > 0.75) {
        // Pure White Core
        colorType = 3;
        col[i * 3] = 0.96; col[i * 3 + 1] = 0.99; col[i * 3 + 2] = 1.0;
      } else if (colorPick > 0.4) {
        // Bright Electric Cyan (#00D9FF)
        colorType = 0;
        col[i * 3] = 0.0; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 1.0;
      } else if (colorPick > 0.15) {
        // Light Cyan (#5CEFFF)
        colorType = 1;
        col[i * 3] = 0.36; col[i * 3 + 1] = 0.94; col[i * 3 + 2] = 1.0;
      } else {
        // Cool Electric Blue (#168BFF)
        colorType = 2;
        col[i * 3] = 0.09; col[i * 3 + 1] = 0.55; col[i * 3 + 2] = 1.0;
      }

      // Explosion Direction
      const exTheta = Math.random() * Math.PI * 2;
      const exPhi = (Math.random() - 0.5) * Math.PI;
      const exSpd = 4.0 + Math.random() * 8.0;

      data.push({
        homePos: [homeX, homeY, homeZ],
        aboutRibbonPos: [ribbonX, ribbonY, ribbonZ],
        crystalPos: [crystalX, crystalY, crystalZ],
        skillsNetworkPos: [skillsX, skillsY, skillsZ],
        contactNkPos: [nk[0], nk[1], nk[2]],
        phase: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 0.8,
        colorType,
        velocity: [0, 0, 0],
        explosionDir: [
          exSpd * Math.cos(exTheta) * Math.cos(exPhi),
          exSpd * Math.sin(exPhi),
          exSpd * Math.sin(exTheta) * Math.cos(exPhi),
        ],
      });

      // Initial positions
      pos[i * 3] = homeX;
      pos[i * 3 + 1] = homeY;
      pos[i * 3 + 2] = homeZ;
    }

    return {
      particleData: data,
      currentPositions: pos,
      colors: col,
      nkCoords: nkPos,
    };
  }, [particleCount]);

  // Buffer geometry for dynamic network lines during Skills stage
  const linePositions = useMemo(() => new Float32Array(200 * 6), []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute | undefined;
    if (!posAttr || !posAttr.array) return;
    const posArr = posAttr.array as Float32Array;

    const time = state.clock.elapsedTime * (prefersReducedMotion ? 0.3 : 1.0);
    const lerpSpeed = Math.min(delta * 3.5, 0.18);

    // Mouse influence vector in 3D world space
    const targetMouseX = mousePos.x * (viewport.width * 0.4);
    const targetMouseY = -mousePos.y * (viewport.height * 0.4);

    const secProg = scrollSectionProgress;

    for (let i = 0; i < particleCount; i++) {
      const p = particleData[i];
      const idx = i * 3;

      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;

      // Check for DESTRUCTION / RECONSTRUCTION state first
      if (isDestroyed) {
        if (destructionProgress < 0.5) {
          // Explosion stage (0 -> 0.5): Particles explode outward along chaotic trajectories
          const expRatio = destructionProgress * 2.0;
          targetX = p.homePos[0] + p.explosionDir[0] * expRatio;
          targetY = p.homePos[1] + p.explosionDir[1] * expRatio;
          targetZ = p.homePos[2] + p.explosionDir[2] * expRatio;
        } else {
          // Reconstruction stage (0.5 -> 1.0): Curved Bezier recall trajectory back to origin
          const reconRatio = (destructionProgress - 0.5) * 2.0;
          const curveT = Math.sin(reconRatio * Math.PI * 0.5); // Smooth ease curve

          const explodedX = p.homePos[0] + p.explosionDir[0];
          const explodedY = p.homePos[1] + p.explosionDir[1];
          const explodedZ = p.homePos[2] + p.explosionDir[2];

          targetX = THREE.MathUtils.lerp(explodedX, p.homePos[0], curveT);
          targetY = THREE.MathUtils.lerp(explodedY, p.homePos[1], curveT);
          targetZ = THREE.MathUtils.lerp(explodedZ, p.homePos[2], curveT);
        }
      } else {
        // Continuous Section Progress Transformations:
        // Stage 0.0 -> 1.0: Home Globe -> About Ribbon
        // Stage 1.0 -> 2.0: About Ribbon -> Crystal Polyhedron -> Fractured Pieces
        // Stage 2.0 -> 3.0: Fractured Pieces -> Skills Reactor Network
        // Stage 3.0 -> 4.0: Skills Network -> Contact NK Monogram

        if (secProg <= 1.0) {
          // 1. HERO -> ABOUT
          const t1 = secProg; // 0 to 1
          const rotAngle = time * 0.25;
          const cosR = Math.cos(rotAngle);
          const sinR = Math.sin(rotAngle);

          const hx = p.homePos[0] * cosR - p.homePos[2] * sinR;
          const hz = p.homePos[0] * sinR + p.homePos[2] * cosR;
          const hy = p.homePos[1];

          // Ribbon flow with noise
          const waveY = Math.sin(time * 1.5 + p.phase) * 0.18;
          const waveZ = Math.cos(time * 1.2 + p.phase) * 0.15;
          const rx = p.aboutRibbonPos[0];
          const ry = p.aboutRibbonPos[1] + waveY;
          const rz = p.aboutRibbonPos[2] + waveZ;

          targetX = THREE.MathUtils.lerp(hx, rx, t1);
          targetY = THREE.MathUtils.lerp(hy, ry, t1);
          targetZ = THREE.MathUtils.lerp(hz, rz, t1);
        } else if (secProg <= 2.0) {
          // 2. ABOUT -> PROJECTS (CRYSTALLINE POLYHEDRON & CRACK TRANSITION)
          const t2 = secProg - 1.0; // 0 to 1
          const waveY = Math.sin(time * 1.5 + p.phase) * 0.18;
          const rx = p.aboutRibbonPos[0];
          const ry = p.aboutRibbonPos[1] + waveY;
          const rz = p.aboutRibbonPos[2];

          // Rotating Crystal Polyhedron
          const rotC = time * 0.4;
          const cosC = Math.cos(rotC);
          const sinC = Math.sin(rotC);

          const cx = p.crystalPos[0] * cosC - p.crystalPos[2] * sinC;
          const cz = p.crystalPos[0] * sinC + p.crystalPos[2] * cosC;
          const cy = p.crystalPos[1];

          if (t2 > 0.7) {
            // CRACK! Object fractures into floating fragments
            const crackProgress = (t2 - 0.7) / 0.3;
            const fracX = cx * (1.0 + crackProgress * 1.2);
            const fracY = cy * (1.0 + crackProgress * 1.2);
            const fracZ = cz * (1.0 + crackProgress * 1.2);

            targetX = fracX;
            targetY = fracY;
            targetZ = fracZ;
          } else {
            targetX = THREE.MathUtils.lerp(rx, cx, t2);
            targetY = THREE.MathUtils.lerp(ry, cy, t2);
            targetZ = THREE.MathUtils.lerp(rz, cz, t2);
          }
        } else if (secProg <= 3.0) {
          // 3. PROJECTS -> SKILLS (SKILLS REACTOR NETWORK)
          const t3 = secProg - 2.0; // 0 to 1

          const rotC = time * 0.4;
          const fracX = p.crystalPos[0] * Math.cos(rotC) * 2.2;
          const fracY = p.crystalPos[1] * 2.2;
          const fracZ = p.crystalPos[2] * Math.sin(rotC) * 2.2;

          const waveNet = Math.sin(time * 1.8 + p.phase) * 0.1;
          const sx = p.skillsNetworkPos[0];
          const sy = p.skillsNetworkPos[1] + waveNet;
          const sz = p.skillsNetworkPos[2];

          targetX = THREE.MathUtils.lerp(fracX, sx, t3);
          targetY = THREE.MathUtils.lerp(fracY, sy, t3);
          targetZ = THREE.MathUtils.lerp(fracZ, sz, t3);
        } else {
          // 4. SKILLS -> CONTACT (NK MONOGRAM & EXPANSION)
          const t4 = Math.min(1.0, secProg - 3.0); // 0 to 1

          const sx = p.skillsNetworkPos[0];
          const sy = p.skillsNetworkPos[1];
          const sz = p.skillsNetworkPos[2];

          const floatNk = Math.sin(time * 1.4 + p.phase) * 0.08;
          const nkx = p.contactNkPos[0];
          const nky = p.contactNkPos[1] + floatNk;
          const nkz = p.contactNkPos[2];

          targetX = THREE.MathUtils.lerp(sx, nkx, t4);
          targetY = THREE.MathUtils.lerp(sy, nky, t4);
          targetZ = THREE.MathUtils.lerp(sz, nkz, t4);
        }

        // Mouse disturbance (Attraction / Repulsion)
        const dx = posArr[idx] - targetMouseX;
        const dy = posArr[idx + 1] - targetMouseY;
        const distSq = dx * dx + dy * dy;
        const maxDist = 4.0;

        if (distSq < maxDist && distSq > 0.001) {
          const force = (1.0 - distSq / maxDist) * 0.15;
          targetX += (dx / Math.sqrt(distSq)) * force;
          targetY += (dy / Math.sqrt(distSq)) * force;
        }
      }

      // Smooth lerp movement
      posArr[idx] += (targetX - posArr[idx]) * lerpSpeed;
      posArr[idx + 1] += (targetY - posArr[idx + 1]) * lerpSpeed;
      posArr[idx + 2] += (targetZ - posArr[idx + 2]) * lerpSpeed;
    }

    posAttr.needsUpdate = true;

    // Update connecting lines for Network stage (when secProg is around 2.0 to 3.2)
    if (linesRef.current && secProg >= 1.8 && secProg <= 3.4) {
      const lineGeom = linesRef.current.geometry;
      const lineAttr = lineGeom.getAttribute('position') as THREE.BufferAttribute | undefined;
      if (!lineAttr || !lineAttr.array) return;
      const lineArr = lineAttr.array as Float32Array;

      let lineIdx = 0;
      const maxLines = 200;

      for (let i = 0; i < particleCount && lineIdx < maxLines; i += 8) {
        for (let j = i + 1; j < particleCount && lineIdx < maxLines; j += 12) {
          const p1x = posArr[i * 3];
          const p1y = posArr[i * 3 + 1];
          const p1z = posArr[i * 3 + 2];

          const p2x = posArr[j * 3];
          const p2y = posArr[j * 3 + 1];
          const p2z = posArr[j * 3 + 2];

          const dist = Math.sqrt((p1x - p2x) ** 2 + (p1y - p2y) ** 2 + (p1z - p2z) ** 2);

          if (dist < 1.6) {
            const lPtr = lineIdx * 6;
            lineArr[lPtr] = p1x;
            lineArr[lPtr + 1] = p1y;
            lineArr[lPtr + 2] = p1z;
            lineArr[lPtr + 3] = p2x;
            lineArr[lPtr + 4] = p2y;
            lineArr[lPtr + 5] = p2z;
            lineIdx++;
          }
        }
      }

      lineAttr.needsUpdate = true;
    }
  });

  const pointSize = scrollSectionProgress < 0.5
    ? (isMobile ? 0.035 : 0.048)
    : (isMobile ? 0.09 : 0.13);

  return (
    <group>
      {/* Dynamic 3D Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[currentPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={pointSize}
          map={particleTexture || undefined}
          vertexColors
          transparent
          opacity={scrollSectionProgress < 0.5 ? 0.35 : 0.88}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Dynamic Connecting Network Lines during Skills/Projects stage */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#06b6d4"
          transparent
          opacity={scrollSectionProgress >= 1.8 && scrollSectionProgress <= 3.4 ? 0.25 : 0}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
