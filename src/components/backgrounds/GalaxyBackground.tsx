import React, { useEffect, useRef } from 'react';
import { NavSection } from '../GlobalHeader';
import { DeviceQualityInfo } from '../../hooks/useDeviceQuality';

export interface GalaxyBackgroundProps {
  activeSection: NavSection;
  quality: DeviceQualityInfo;
  isTransitioning?: boolean;
  mousePos?: { x: number; y: number };
}

// Particle types: 'dot' (micro space particle) | 'code' (developer code fragment)
interface DigitalParticle {
  type: 'dot' | 'code';
  nx: number;
  ny: number;
  nz: number; // 0.01 (far) to 1.0 (near)
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
  colorPrefix: string;
  baseAlpha: number;
  isTwinkling: boolean;
  twinklePhase: number;
  twinkleSpeed: number;
  layer: 'bg' | 'mid' | 'fg';
  // Code specific
  codeText?: string;
  codeFontSize?: number;
  // Signature specific
  isSignaturePoint?: boolean;
  sigTargetX?: number;
  sigTargetY?: number;
}

// Energy Wave Pulse
interface EnergyPulse {
  cx: number;
  cy: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
}

// Orbital Arc Line
interface OrbitalArc {
  cxRatio: number; // Center X ratio (-0.5 to 1.5)
  cyRatio: number; // Center Y ratio (-0.5 to 1.5)
  rxRatio: number; // Radius X ratio
  ryRatio: number; // Radius Y ratio
  rotation: number; // Angle
  rotSpeed: number;
  dashPattern: number[];
  alpha: number;
  color: string;
}

// Code fragments for the Digital Universe
const CODE_FRAGMENTS = [
  '< />',
  '{ }',
  '01',
  'npm',
  'AI',
  'JS',
  'CSS',
  'react',
  'const',
  '<>',
  '()',
  '&&',
  '=>',
  '[ ]',
  'import',
  'async',
  'fn',
  '0101',
];

// Color Palette
const COLOR_PALETTE = [
  'rgba(0, 245, 255, ',   // Electric Cyan #00f5ff (Primary)
  'rgba(56, 189, 248, ',  // Sky Blue #38bdf8 (Primary)
  'rgba(14, 165, 233, ',  // Deep Cyan #0ea5e9 (Primary)
  'rgba(240, 249, 255, ', // Luminous White #f0f9ff (Primary)
  'rgba(168, 85, 247, ',  // Subtle Violet #a855f7 (Accent)
];

// Generate Signature "NU" Matrix points in normalized coordinates [-0.2 to 0.2]
function generateNUSignaturePoints(): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = [];

  // "N" - Left Vertical Stem
  for (let i = 0; i <= 10; i++) {
    points.push({ x: -0.18, y: -0.12 + (i / 10) * 0.24 });
  }
  // "N" - Diagonal
  for (let i = 1; i <= 9; i++) {
    points.push({ x: -0.18 + (i / 10) * 0.13, y: -0.12 + (i / 10) * 0.24 });
  }
  // "N" - Right Vertical Stem
  for (let i = 0; i <= 10; i++) {
    points.push({ x: -0.05, y: -0.12 + (i / 10) * 0.24 });
  }

  // "U" - Left Vertical Stem
  for (let i = 0; i <= 8; i++) {
    points.push({ x: 0.05, y: -0.12 + (i / 8) * 0.18 });
  }
  // "U" - Bottom Curve
  for (let i = 1; i <= 7; i++) {
    const angle = Math.PI + (i / 8) * Math.PI;
    points.push({ x: 0.115 + Math.cos(angle) * 0.065, y: 0.06 + Math.sin(angle) * 0.06 });
  }
  // "U" - Right Vertical Stem
  for (let i = 0; i <= 8; i++) {
    points.push({ x: 0.18, y: -0.12 + (i / 8) * 0.18 });
  }

  return points;
}

const NU_SIGNATURE_POINTS = generateNUSignaturePoints();

export const GalaxyBackground: React.FC<GalaxyBackgroundProps> = ({
  activeSection,
  quality,
  isTransitioning = false,
  mousePos = { x: 0, y: 0 },
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Smooth Section Alpha & Scroll Velocity state refs
  const currentSectionAlphaRef = useRef<number>(0.35);
  const scrollVelRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);

  // Smooth mouse coordinates ref
  const mouseSmoothRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Section Change Universe Pulse trigger refs
  const prevActiveSectionRef = useRef<NavSection>(activeSection);
  const universePulseTriggerRef = useRef<{ active: boolean; startTime: number }>({
    active: false,
    startTime: 0,
  });

  useEffect(() => {
    if (prevActiveSectionRef.current !== activeSection) {
      prevActiveSectionRef.current = activeSection;
      universePulseTriggerRef.current = {
        active: true,
        startTime: performance.now(),
      };
    }
  }, [activeSection]);

  // Scroll velocity listener to temporarily boost particle movement when fast-scrolling
  useEffect(() => {
    let timeoutId: number | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;

      scrollVelRef.current = Math.min(delta * 0.08, 6.0);

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        scrollVelRef.current = 0;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    const isSmallScreen = width / dpr < 600 || quality.isMobile;
    const isMediumScreen = (width / dpr >= 600 && width / dpr < 1024) || quality.isTablet;

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
    };

    window.addEventListener('resize', handleResize);

    // Responsive particle count based on device capability & screen tier
    let dotParticleCount = 2200;
    let codeParticleCount = 45;
    if (isSmallScreen) {
      dotParticleCount = 450;
      codeParticleCount = 15;
    } else if (isMediumScreen) {
      dotParticleCount = 1000;
      codeParticleCount = 28;
    } else if (quality.tier === 'MEDIUM') {
      dotParticleCount = 1600;
      codeParticleCount = 35;
    } else if (quality.tier === 'LOW') {
      dotParticleCount = 700;
      codeParticleCount = 20;
    }

    // Helper to generate a single Digital Particle (dot or code)
    const createParticle = (
      type: 'dot' | 'code' = 'dot',
      forceZ?: number,
      sigTarget?: { x: number; y: number }
    ): DigitalParticle => {
      const nz = forceZ !== undefined ? forceZ : 0.01 + Math.random() * 0.99;
      const layer: 'bg' | 'mid' | 'fg' = nz < 0.4 ? 'bg' : nz < 0.8 ? 'mid' : 'fg';

      const angle = Math.random() * Math.PI * 2;
      const distRadius = 0.15 + Math.pow(Math.random(), 0.85) * 1.35;

      const nx = Math.cos(angle) * distRadius;
      const ny = Math.sin(angle) * distRadius;

      const randColor = Math.random();
      let colorPrefix = COLOR_PALETTE[0];
      if (randColor > 0.95) colorPrefix = COLOR_PALETTE[4]; // Violet
      else if (randColor > 0.85) colorPrefix = COLOR_PALETTE[3]; // White
      else if (randColor > 0.7) colorPrefix = COLOR_PALETTE[2]; // Deep Cyan
      else if (randColor > 0.4) colorPrefix = COLOR_PALETTE[1]; // Sky Blue

      const isTwinkling = type === 'dot' && Math.random() < 0.25;
      const baseAlpha =
        type === 'code'
          ? 0.12 + Math.random() * 0.22
          : layer === 'bg'
          ? 0.12 + Math.random() * 0.22
          : layer === 'mid'
          ? 0.28 + Math.random() * 0.32
          : 0.48 + Math.random() * 0.38;

      const baseRadius =
        layer === 'bg'
          ? (0.4 + Math.random() * 0.4) * dpr
          : layer === 'mid'
          ? (0.8 + Math.random() * 0.5) * dpr
          : (1.3 + Math.random() * 0.7) * dpr;

      const codeText =
        type === 'code'
          ? CODE_FRAGMENTS[Math.floor(Math.random() * CODE_FRAGMENTS.length)]
          : undefined;
      const codeFontSize = type === 'code' ? (8 + Math.random() * 4) * dpr : undefined;

      return {
        type,
        nx,
        ny,
        nz,
        vx: (Math.random() - 0.5) * 0.00012,
        vy: (Math.random() - 0.5) * 0.00012,
        vz: 0.0003 + Math.random() * 0.0007,
        baseRadius,
        colorPrefix,
        baseAlpha,
        isTwinkling,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.012 + Math.random() * 0.025,
        layer,
        codeText,
        codeFontSize,
        isSignaturePoint: !!sigTarget,
        sigTargetX: sigTarget?.x,
        sigTargetY: sigTarget?.y,
      };
    };

    // Instantiate Micro Particles
    const particles: DigitalParticle[] = [];

    // Assign a subset of particles as "NU" Signature Points
    for (let i = 0; i < dotParticleCount; i++) {
      const sigTarget = i < NU_SIGNATURE_POINTS.length ? NU_SIGNATURE_POINTS[i] : undefined;
      particles.push(createParticle('dot', undefined, sigTarget));
    }

    // Instantiate Code Fragments
    for (let i = 0; i < codeParticleCount; i++) {
      particles.push(createParticle('code'));
    }

    // Setup Abstract Orbital Arcs
    const orbitalArcs: OrbitalArc[] = [
      {
        cxRatio: 0.5,
        cyRatio: 0.48,
        rxRatio: 0.45,
        ryRatio: 0.28,
        rotation: -0.15,
        rotSpeed: 0.00008,
        dashPattern: [14 * dpr, 28 * dpr, 4 * dpr, 18 * dpr],
        alpha: 0.06,
        color: 'rgba(0, 245, 255, ',
      },
      {
        cxRatio: 0.52,
        cyRatio: 0.52,
        rxRatio: 0.62,
        ryRatio: 0.38,
        rotation: 0.25,
        rotSpeed: -0.00006,
        dashPattern: [30 * dpr, 45 * dpr],
        alpha: 0.045,
        color: 'rgba(56, 189, 248, ',
      },
      {
        cxRatio: 0.48,
        cyRatio: 0.5,
        rxRatio: 0.78,
        ryRatio: 0.48,
        rotation: -0.35,
        rotSpeed: 0.00004,
        dashPattern: [8 * dpr, 32 * dpr, 20 * dpr, 40 * dpr],
        alpha: 0.035,
        color: 'rgba(168, 85, 247, ',
      },
    ];

    // Energy Pulses state
    const pulses: EnergyPulse[] = [];
    let lastPulseTime = performance.now();

    // Signature State Machine
    let sigState: 'OFF' | 'FORMING' | 'HOLD' | 'DISPERSING' = 'OFF';
    let sigStateTime = performance.now();
    let sigProgress = 0;

    // Main Render Loop
    const render = (now: number) => {
      const isReducedMotion = quality.prefersReducedMotion;
      const motionMultiplier = isReducedMotion ? 0.2 : 1.0;

      // 1. Calculate Section Target Opacity & Center Protection Radius
      let targetSectionAlpha = 0.5;
      let centerProtectionRadius = 0.32;

      if (activeSection === 'home') {
        targetSectionAlpha = 0.42;
        centerProtectionRadius = 0.36;
      } else if (activeSection === 'about') {
        targetSectionAlpha = 0.58;
        centerProtectionRadius = 0.30;
      } else if (activeSection === 'skills') {
        targetSectionAlpha = 0.48;
        centerProtectionRadius = 0.35;
      } else if (activeSection === 'projects') {
        targetSectionAlpha = 0.82;
        centerProtectionRadius = 0.28;
      } else if (activeSection === 'contact') {
        targetSectionAlpha = 0.65;
        centerProtectionRadius = 0.28;
      }

      // During transitions, keep universe visible and boost ambient brightness slightly
      if (isTransitioning) {
        targetSectionAlpha = Math.max(targetSectionAlpha, 0.50);
      }

      currentSectionAlphaRef.current += (targetSectionAlpha - currentSectionAlphaRef.current) * 0.06;

      // Mouse tracking smoothing
      const targetMouseX = ((mousePos.x + 1) / 2) * width;
      const targetMouseY = ((1 - mousePos.y) / 2) * height;
      mouseSmoothRef.current.x += (targetMouseX - mouseSmoothRef.current.x) * 0.05;
      mouseSmoothRef.current.y += (targetMouseY - mouseSmoothRef.current.y) * 0.05;

      scrollVelRef.current *= 0.92;

      // Clear Canvas (#010308 Near Black)
      ctx.fillStyle = '#010308';
      ctx.fillRect(0, 0, width, height);

      if (currentSectionAlphaRef.current < 0.01) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // 2. Midnight Navy Deep Space Radial Atmosphere
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.1,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      bgGrad.addColorStop(0, '#010308');
      bgGrad.addColorStop(0.45, 'rgba(2, 10, 28, 0.42)');
      bgGrad.addColorStop(0.82, 'rgba(1, 6, 18, 0.75)');
      bgGrad.addColorStop(1, '#010308');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Define Center Protection Bounds
      const centerMinX = width * (0.5 - centerProtectionRadius * 0.6);
      const centerMaxX = width * (0.5 + centerProtectionRadius * 0.6);
      const centerMinY = height * (0.5 - centerProtectionRadius * 0.6);
      const centerMaxY = height * (0.5 + centerProtectionRadius * 0.6);

      const aspect = width / (height || 1);
      const scrollAddZ = scrollVelRef.current * 0.0003;

      // 3. Render Abstract Orbital Arcs
      for (const arc of orbitalArcs) {
        if (!isReducedMotion) {
          arc.rotation += arc.rotSpeed * motionMultiplier;
        }

        const arcCx = width * arc.cxRatio;
        const arcCy = height * arc.cyRatio;
        const rx = width * arc.rxRatio;
        const ry = (height * arc.ryRatio) / aspect;

        ctx.save();
        ctx.translate(arcCx, arcCy);
        ctx.rotate(arc.rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.setLineDash(arc.dashPattern);
        ctx.lineWidth = 1.0 * dpr;
        const arcAlpha = arc.alpha * currentSectionAlphaRef.current;
        ctx.strokeStyle = `${arc.color}${arcAlpha.toFixed(3)})`;
        ctx.stroke();
        ctx.restore();
      }

      // 4. Update & Render Energy Waves
      if (!isReducedMotion && now - lastPulseTime > 16000) {
        lastPulseTime = now;
        pulses.push({
          cx: width * (0.3 + Math.random() * 0.4),
          cy: height * (0.3 + Math.random() * 0.4),
          radius: 0,
          maxRadius: Math.max(width, height) * 0.55,
          speed: (1.2 + Math.random() * 0.8) * dpr,
          alpha: 0.18,
        });
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        if (!isReducedMotion) {
          pulse.radius += pulse.speed;
          pulse.alpha = (1 - pulse.radius / pulse.maxRadius) * 0.18;
        }

        if (pulse.radius >= pulse.maxRadius || pulse.alpha <= 0.005) {
          pulses.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(pulse.cx, pulse.cy, pulse.radius, 0, Math.PI * 2);
        ctx.lineWidth = 1.2 * dpr;
        ctx.strokeStyle = `rgba(0, 245, 255, ${(pulse.alpha * currentSectionAlphaRef.current).toFixed(3)})`;
        ctx.stroke();
        ctx.restore();
      }

      // 4b. Render Section-Change "Universe Pulse" Micro-Interaction (450ms max)
      if (universePulseTriggerRef.current.active && !isReducedMotion) {
        const elapsed = now - universePulseTriggerRef.current.startTime;
        const maxRadius = (isSmallScreen ? 100 : 160) * dpr;

        // Phase 1 (0-120ms): Center subtle cyan glow
        if (elapsed < 120) {
          const glowAlpha = (elapsed / 120) * 0.22 * currentSectionAlphaRef.current;
          const glowGrad = ctx.createRadialGradient(
            width * 0.5,
            height * 0.5,
            0,
            width * 0.5,
            height * 0.5,
            50 * dpr
          );
          glowGrad.addColorStop(0, `rgba(0, 245, 255, ${glowAlpha.toFixed(3)})`);
          glowGrad.addColorStop(1, 'rgba(0, 245, 255, 0)');
          ctx.save();
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(width * 0.5, height * 0.5, 50 * dpr, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        // Phase 2 (120-450ms): Thin cyan circular energy ring pulse
        else if (elapsed >= 120 && elapsed <= 450) {
          const progress = (elapsed - 120) / 330; // 0.0 to 1.0
          const radius = progress * maxRadius;
          const ringAlpha = (1 - progress) * 0.32 * currentSectionAlphaRef.current;

          if (ringAlpha > 0.005) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(width * 0.5, height * 0.5, radius, 0, Math.PI * 2);
            ctx.lineWidth = 1.2 * dpr;
            ctx.strokeStyle = `rgba(0, 245, 255, ${ringAlpha.toFixed(3)})`;
            ctx.stroke();
            ctx.restore();

            // Particle micro-reaction (nearby particles react subtly)
            const reactionRadiusNorm = (radius / (width * 0.45));
            for (let i = 0; i < Math.min(particles.length, isSmallScreen ? 30 : 90); i++) {
              const p = particles[i];
              const pDistNorm = Math.sqrt(p.nx * p.nx + p.ny * p.ny);
              if (Math.abs(pDistNorm - reactionRadiusNorm) < 0.08) {
                p.nx += (p.nx > 0 ? 0.00012 : -0.00012);
                p.ny += (p.ny > 0 ? 0.00012 : -0.00012);
              }
            }
          }
        } else {
          universePulseTriggerRef.current.active = false;
        }
      }

      // 5. Signature "NU" Alignment Cycle State Machine
      const elapsedSig = now - sigStateTime;
      if (sigState === 'OFF' && elapsedSig > 28000) {
        sigState = 'FORMING';
        sigStateTime = now;
      } else if (sigState === 'FORMING') {
        sigProgress = Math.min(1, elapsedSig / 3200);
        if (sigProgress >= 1) {
          sigState = 'HOLD';
          sigStateTime = now;
        }
      } else if (sigState === 'HOLD' && elapsedSig > 3500) {
        sigState = 'DISPERSING';
        sigStateTime = now;
      } else if (sigState === 'DISPERSING') {
        sigProgress = 1 - Math.min(1, elapsedSig / 3000);
        if (sigProgress <= 0) {
          sigState = 'OFF';
          sigStateTime = now;
          sigProgress = 0;
        }
      }

      // Store projected 2D coordinates for Constellations
      const projected2D: Array<{ px: number; py: number; alpha: number; layer: string }> = [];

      // 6. Render Digital Particles (Micro Dots & Code Fragments)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!isReducedMotion) {
          p.nz += (p.vz + scrollAddZ) * (p.nz * 1.4 + 0.5) * motionMultiplier;

          const rotSpeed = 0.00018 * (1.1 - p.nz) * motionMultiplier;
          const cosR = Math.cos(rotSpeed);
          const sinR = Math.sin(rotSpeed);
          let rx = p.nx * cosR - p.ny * sinR;
          let ry = p.nx * sinR + p.ny * cosR;

          // Signature Alignment interpolation
          if (p.isSignaturePoint && p.sigTargetX !== undefined && p.sigTargetY !== undefined) {
            if (sigProgress > 0) {
              rx = rx * (1 - sigProgress) + p.sigTargetX * sigProgress;
              ry = ry * (1 - sigProgress) + p.sigTargetY * sigProgress;
            }
          }

          if (activeSection === 'contact') {
            rx -= rx * 0.001;
            ry -= ry * 0.001;
          }

          p.nx = rx + p.vx * motionMultiplier;
          p.ny = ry + p.vy * motionMultiplier;

          if (p.nz > 1.0) {
            const sigTarget =
              p.isSignaturePoint && p.sigTargetX !== undefined && p.sigTargetY !== undefined
                ? { x: p.sigTargetX, y: p.sigTargetY }
                : undefined;
            particles[i] = createParticle(p.type, 0.01, sigTarget);
            continue;
          }
        }

        const perspective = 1 / Math.max(0.05, 1.05 - p.nz);
        const px = width * 0.5 + p.nx * (width * 0.45) * perspective;
        const py = height * 0.5 + p.ny * ((height * 0.45) / aspect) * perspective;

        if (px < -30 || px > width + 30 || py < -30 || py > height + 30) {
          if (!isReducedMotion && p.nz > 0.8) {
            const sigTarget =
              p.isSignaturePoint && p.sigTargetX !== undefined && p.sigTargetY !== undefined
                ? { x: p.sigTargetX, y: p.sigTargetY }
                : undefined;
            particles[i] = createParticle(p.type, 0.01, sigTarget);
          }
          continue;
        }

        // Mouse Deflection
        let dx = 0;
        let dy = 0;
        if (!isReducedMotion && !isSmallScreen && !quality.touchDevice) {
          const mdx = mouseSmoothRef.current.x - px;
          const mdy = mouseSmoothRef.current.y - py;
          const distSq = mdx * mdx + mdy * mdy;
          const maxDist = 130 * dpr * p.nz;

          if (distSq < maxDist * maxDist && distSq > 10) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / maxDist) * 10 * dpr * p.nz;
            dx = -(mdx / dist) * force;
            dy = -(mdy / dist) * force;
          }
        }

        const finalPx = px + dx;
        const finalPy = py + dy;

        // Alpha calculation
        let alpha = p.baseAlpha;
        if (
          finalPx > centerMinX &&
          finalPx < centerMaxX &&
          finalPy > centerMinY &&
          finalPy < centerMaxY
        ) {
          const distX = Math.min(finalPx - centerMinX, centerMaxX - finalPx) / ((centerMaxX - centerMinX) * 0.5);
          const distY = Math.min(finalPy - centerMinY, centerMaxY - finalPy) / ((centerMaxY - centerMinY) * 0.5);
          const centerFactor = Math.min(distX, distY);
          alpha *= Math.max(0.06, centerFactor * centerFactor);
        }

        alpha *= currentSectionAlphaRef.current;

        if (p.isTwinkling && !isReducedMotion) {
          p.twinklePhase += p.twinkleSpeed * motionMultiplier;
          alpha *= 0.72 + Math.sin(p.twinklePhase) * 0.28;
        }

        // Signature boost
        if (p.isSignaturePoint && sigProgress > 0) {
          alpha += sigProgress * 0.35;
        }

        if (alpha < 0.01) continue;

        // Collect for Digital Constellations
        if (p.type === 'dot' && (p.layer === 'mid' || p.layer === 'fg') && alpha > 0.15) {
          projected2D.push({ px: finalPx, py: finalPy, alpha, layer: p.layer });
        }

        // Draw Particle
        if (p.type === 'code' && p.codeText && p.codeFontSize) {
          ctx.font = `${p.codeFontSize}px monospace`;
          ctx.fillStyle = `${p.colorPrefix}${Math.min(1, alpha * 0.85).toFixed(3)})`;
          ctx.fillText(p.codeText, finalPx, finalPy);
        } else {
          const radius = Math.max(0.3 * dpr, p.baseRadius * (0.65 + p.nz * 0.75));

          ctx.beginPath();
          ctx.arc(finalPx, finalPy, radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.colorPrefix}${Math.min(1, alpha).toFixed(3)})`;
          ctx.fill();

          if (p.layer === 'fg' && alpha > 0.25 && radius > 1.2 * dpr) {
            ctx.beginPath();
            ctx.arc(finalPx, finalPy, radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `${p.colorPrefix}${(alpha * 0.18).toFixed(3)})`;
            ctx.fill();
          }
        }
      }

      // 7. Render Digital Constellations (Idea Networks)
      const maxLines = isSmallScreen ? 12 : isMediumScreen ? 25 : 45;
      const maxConnectDistSq = Math.pow(90 * dpr, 2);
      let lineCount = 0;

      for (let a = 0; a < projected2D.length && lineCount < maxLines; a++) {
        const pA = projected2D[a];
        for (let b = a + 1; b < projected2D.length && lineCount < maxLines; b++) {
          const pB = projected2D[b];
          const dX = pA.px - pB.px;
          const dY = pA.py - pB.py;
          const distSq = dX * dX + dY * dY;

          if (distSq < maxConnectDistSq) {
            const distRatio = 1 - Math.sqrt(distSq) / (90 * dpr);
            const lineAlpha = distRatio * Math.min(pA.alpha, pB.alpha) * 0.35;

            if (lineAlpha > 0.02) {
              ctx.beginPath();
              ctx.moveTo(pA.px, pA.py);
              ctx.lineTo(pB.px, pB.py);
              ctx.lineWidth = 0.6 * dpr;
              ctx.strokeStyle = `rgba(0, 245, 255, ${lineAlpha.toFixed(3)})`;
              ctx.stroke();
              lineCount++;
            }
          }
        }
      }

      // 8. Center Contrast Vignette Overlay
      const centerVignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.2,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.55
      );
      centerVignette.addColorStop(0, 'rgba(1, 3, 8, 0.45)');
      centerVignette.addColorStop(0.65, 'rgba(1, 3, 8, 0.15)');
      centerVignette.addColorStop(1, 'transparent');

      ctx.fillStyle = centerVignette;
      ctx.fillRect(0, 0, width, height);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeSection, quality, isTransitioning, mousePos]);

  return (
    <div
      id="global-galaxy-background"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
    </div>
  );
};

export default GalaxyBackground;
