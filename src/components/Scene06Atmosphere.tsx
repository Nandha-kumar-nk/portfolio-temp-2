import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface Scene06AtmosphereProps {
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
  transitionProgress?: number;
}

// Generate circular soft glow sprite for atmospheric particles
function createGlowTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(56, 189, 248, 0.85)');
  gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.35)');
  gradient.addColorStop(0.8, 'rgba(168, 85, 247, 0.15)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function Scene06Atmosphere({
  isMobile = false,
  prefersReducedMotion = false,
  transitionProgress = 1.0,
}: Scene06AtmosphereProps) {
  const groupRef = useRef<THREE.Group>(null);
  const dustRef = useRef<THREE.Points>(null);
  const lightPointsRef = useRef<THREE.Points>(null);
  const trail1Ref = useRef<THREE.Mesh>(null);
  const trail2Ref = useRef<THREE.Mesh>(null);

  // Fade-in factor as Scene 6 settles
  const fadeAlpha = Math.min(1, Math.max(0, (transitionProgress - 0.15) / 0.5));

  // Particle count according to spec: desktop 400-900 (560), mobile 120-300 (180)
  const particleCount = isMobile ? 180 : 560;
  const globeCenterY = isMobile ? -0.25 : -0.35;

  const glowTexture = useMemo(() => createGlowTexture(), []);

  // 1. Tiny glowing particles & subtle cyan/purple dust
  const { dustPositions, dustColors, dustOriginalPos } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const orig = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Shell distribution around outer perimeter of globe
      const r = 2.6 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta) * 0.75 + globeCenterY;
      const z = r * Math.cos(phi) * 0.75;

      // KEEP CENTER CLEAN: Protect typography (upper center) and Explore button (lower center)
      if (Math.abs(x) < 2.2 && y > 0.6) {
        // Push outward laterally to flank the typography
        x = Math.sign(x || 1) * (2.4 + Math.random() * 1.5);
      } else if (Math.abs(x) < 2.0 && y < -1.8) {
        // Push outward laterally to flank the Explore button
        x = Math.sign(x || 1) * (2.2 + Math.random() * 1.4);
      }

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      // Subtle cyan, sky blue, purple, and white dust
      const cPick = Math.random();
      if (cPick > 0.65) {
        // Cyan
        col[i * 3] = 0.05; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 1.0;
      } else if (cPick > 0.35) {
        // Soft violet/purple
        col[i * 3] = 0.68; col[i * 3 + 1] = 0.38; col[i * 3 + 2] = 0.98;
      } else if (cPick > 0.15) {
        // Sky blue
        col[i * 3] = 0.22; col[i * 3 + 1] = 0.65; col[i * 3 + 2] = 1.0;
      } else {
        // Delicate celestial white
        col[i * 3] = 0.95; col[i * 3 + 1] = 0.98; col[i * 3 + 2] = 1.0;
      }
    }

    return { dustPositions: pos, dustColors: col, dustOriginalPos: orig };
  }, [particleCount, globeCenterY]);

  // 2. Small drifting light points (14 distinct pulsing nodes in outer ring space)
  const lightPointsData = useMemo(() => {
    const count = isMobile ? 8 : 14;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const r = 2.8 + Math.random() * 1.4;
      let x = Math.cos(angle) * r;
      let y = Math.sin(angle) * (r * 0.55) + globeCenterY;
      const z = (Math.random() - 0.5) * 1.8;

      if (Math.abs(x) < 2.0) {
        x = Math.sign(x || 1) * (2.2 + Math.random() * 0.8);
      }

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Soft bright cyan or purple
      if (i % 2 === 0) {
        col[i * 3] = 0.2; col[i * 3 + 1] = 0.9; col[i * 3 + 2] = 1.0;
      } else {
        col[i * 3] = 0.8; col[i * 3 + 1] = 0.5; col[i * 3 + 2] = 1.0;
      }
    }
    return { pos, col, count };
  }, [isMobile, globeCenterY]);

  // 3. 3–5 Very Small Futuristic Code Fragments (placed strictly around outer margins)
  const codeFragments = useMemo(() => {
    const base = [
      { text: '// init.sys', pos: [-3.1, 0.45, 0.4] as [number, number, number], color: 'text-cyan-400/60' },
      { text: '0x7F // sync', pos: [3.0, 0.55, -0.3] as [number, number, number], color: 'text-cyan-300/50' },
      { text: 'λ:core', pos: [-2.7, -0.75, -0.2] as [number, number, number], color: 'text-purple-400/50' },
      { text: '<flow />', pos: [2.8, -0.7, 0.5] as [number, number, number], color: 'text-cyan-400/50' },
    ];
    if (!isMobile) {
      base.push({ text: '::dim', pos: [3.35, -0.1, -0.4] as [number, number, number], color: 'text-purple-300/40' });
    }
    return base;
  }, [isMobile]);

  // 4. Tiny abstract data symbols (✦, ✧, ◇, ⬡, //) in outer empty space
  const dataSymbols = useMemo(() => [
    { symbol: '✦', pos: [-2.4, 0.95, -0.4] as [number, number, number], color: 'text-cyan-300/40', size: 'text-[11px]' },
    { symbol: '✧', pos: [2.5, 0.9, 0.3] as [number, number, number], color: 'text-purple-300/40', size: 'text-[10px]' },
    { symbol: '◇', pos: [-3.2, -0.15, 0.3] as [number, number, number], color: 'text-cyan-400/35', size: 'text-[9px]' },
    { symbol: '⬡', pos: [3.1, -0.25, -0.5] as [number, number, number], color: 'text-purple-400/35', size: 'text-[11px]' },
    { symbol: '✧', pos: [-2.2, -1.25, 0.4] as [number, number, number], color: 'text-cyan-300/35', size: 'text-[10px]' },
    { symbol: '✦', pos: [2.3, -1.2, -0.3] as [number, number, number], color: 'text-purple-300/35', size: 'text-[10px]' },
  ], []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * (prefersReducedMotion ? 0.35 : 1.0);

    // Independent slow atmospheric rotation around the globe
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.035 * (prefersReducedMotion ? 0.3 : 1.0);
    }

    // Gentle organic wave in tiny dust particles
    if (dustRef.current) {
      const posAttr = dustRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const ox = dustOriginalPos[i3];
        const oy = dustOriginalPos[i3 + 1];
        const oz = dustOriginalPos[i3 + 2];

        // Slow organic micro-drift
        arr[i3] = ox + Math.sin(t * 0.45 + i * 0.1) * 0.08;
        arr[i3 + 1] = oy + Math.cos(t * 0.35 + i * 0.12) * 0.08;
        arr[i3 + 2] = oz + Math.sin(t * 0.5 + i * 0.08) * 0.08;
      }
      posAttr.needsUpdate = true;
    }

    // Pulsing light points
    if (lightPointsRef.current) {
      const mat = lightPointsRef.current.material as THREE.PointsMaterial;
      if (mat) {
        mat.opacity = (0.55 + Math.sin(t * 1.5) * 0.25) * fadeAlpha;
      }
    }

    // 5. Thin slow-moving energy trails
    if (trail1Ref.current) {
      trail1Ref.current.rotation.z += delta * 0.04 * (prefersReducedMotion ? 0.3 : 1.0);
      trail1Ref.current.rotation.x = 0.35 + Math.sin(t * 0.3) * 0.05;
    }
    if (trail2Ref.current) {
      trail2Ref.current.rotation.z -= delta * 0.03 * (prefersReducedMotion ? 0.3 : 1.0);
      trail2Ref.current.rotation.y = -0.25 + Math.cos(t * 0.25) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* A. Atmospheric Dust Particles (Tiny glowing dust) */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[dustColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.055 : 0.075}
          map={glowTexture}
          vertexColors
          transparent
          opacity={0.75 * fadeAlpha}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* B. Small Drifting Light Points (Pulsing nodes) */}
      <points ref={lightPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[lightPointsData.pos, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lightPointsData.col, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.11 : 0.14}
          map={glowTexture}
          vertexColors
          transparent
          opacity={0.7 * fadeAlpha}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* C. 1–2 Thin Slow-Moving Energy Trails around outer globe */}
      <mesh
        ref={trail1Ref}
        position={[0, globeCenterY, 0]}
        rotation={[Math.PI / 6, 0.2, 0]}
      >
        <torusGeometry args={[isMobile ? 2.6 : 3.05, 0.007, 12, 100]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.25 * fadeAlpha}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh
        ref={trail2Ref}
        position={[0, globeCenterY, 0]}
        rotation={[-Math.PI / 7, -0.3, 0.4]}
      >
        <torusGeometry args={[isMobile ? 2.85 : 3.4, 0.006, 12, 100]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.2 * fadeAlpha}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* D. 3–5 Very Small Futuristic Code Fragments (outer margins only) */}
      {codeFragments.map((frag, idx) => (
        <Html
          key={`code-frag-${idx}`}
          position={[frag.pos[0], frag.pos[1] + globeCenterY, frag.pos[2]]}
          center
          distanceFactor={10}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: 0.65 * fadeAlpha,
            transition: 'opacity 0.6s ease-out',
          }}
        >
          <span
            className={`font-mono-code text-[9px] sm:text-[10px] ${frag.color} tracking-widest whitespace-nowrap drop-shadow-[0_0_6px_rgba(6,182,212,0.45)] select-none`}
          >
            {frag.text}
          </span>
        </Html>
      ))}

      {/* E. Tiny Abstract Data Symbols (✦, ✧, ◇, ⬡) in outer empty space */}
      {dataSymbols.map((item, idx) => (
        <Html
          key={`data-sym-${idx}`}
          position={[item.pos[0], item.pos[1] + globeCenterY, item.pos[2]]}
          center
          distanceFactor={11}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: 0.55 * fadeAlpha,
            transition: 'opacity 0.6s ease-out',
          }}
        >
          <span
            className={`${item.size} ${item.color} drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] select-none`}
          >
            {item.symbol}
          </span>
        </Html>
      ))}
    </group>
  );
}
