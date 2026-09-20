import React, { useEffect, useRef, useState } from 'react';

export interface ProjectDimensionPortalProps {
  qualityTier?: 'LOW' | 'MEDIUM' | 'HIGH';
  isMobile?: boolean;
  onPortalClick?: () => void;
  children?: React.ReactNode;
}

interface DepthParticle {
  angle: number;
  distanceRatio: number; // 0..1 ratio of max radius
  depthZ: number; // 0.1 (far) to 1.0 (near)
  speed: number;
  radius: number;
  alpha: number;
  color: string;
  radialVx: number; // Inward/outward drift
}

interface EnergyArc {
  startAngle: number;
  length: number;
  speed: number;
  opacity: number;
  color: string;
  width: number;
}

export const ProjectDimensionPortal: React.FC<ProjectDimensionPortalProps> = ({
  qualityTier = 'HIGH',
  isMobile = false,
  onPortalClick,
  children,
}) => {
  const portalCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interaction States
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt tracking
  const mouseTiltRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Hover & Pulse state refs for canvas access
  const hoverRef = useRef(0); // Lerped 0 to 1
  const clickPulseRef = useRef(0); // Pulse progress 0 to 1

  // Counts based on quality tier
  const particleCount = isMobile ? 30 : qualityTier === 'LOW' ? 40 : qualityTier === 'MEDIUM' ? 70 : 100;
  const arcCount = isMobile ? 6 : qualityTier === 'LOW' ? 8 : qualityTier === 'MEDIUM' ? 12 : 16;
  const pillarCount = isMobile ? 4 : qualityTier === 'LOW' ? 4 : 6;

  // Mouse move tilt handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized distance from center (-1 to 1)
      const dx = (e.clientX - centerX) / (window.innerWidth * 0.5);
      const dy = (e.clientY - centerY) / (window.innerHeight * 0.5);

      mouseTiltRef.current.targetX = Math.max(-1, Math.min(1, dx));
      mouseTiltRef.current.targetY = Math.max(-1, Math.min(1, dy));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Click trigger handler
  const handleClick = () => {
    clickPulseRef.current = 0.01; // Trigger pulse
    if (onPortalClick) onPortalClick();
  };

  // Main Canvas Animation Loop
  useEffect(() => {
    const canvas = portalCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Responsive Canvas Size
    let baseWidth = isMobile
      ? Math.min(window.innerWidth * 0.78, 320)
      : Math.min(window.innerWidth * 0.38, 460);

    canvas.width = baseWidth * 2; // HiDPI 2x scaling
    canvas.height = baseWidth * 2;

    const handleResize = () => {
      if (!canvas) return;
      baseWidth = isMobile
        ? Math.min(window.innerWidth * 0.78, 320)
        : Math.min(window.innerWidth * 0.38, 460);
      canvas.width = baseWidth * 2;
      canvas.height = baseWidth * 2;
    };

    window.addEventListener('resize', handleResize);

    // Multi-depth 3D Portal Particles
    const particleColors = ['#00f5ff', '#38bdf8', '#818cf8', '#22d3ee', '#38bdf8'];
    const particles: DepthParticle[] = Array.from({ length: particleCount }, () => ({
      angle: Math.random() * Math.PI * 2,
      distanceRatio: Math.random() * 0.85 + 0.08,
      depthZ: Math.random() * 0.85 + 0.15, // 0.15 = Far depth, 1.0 = Near depth
      speed: (Math.random() * 0.005 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
      radius: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.45 + 0.15,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      radialVx: (Math.random() - 0.5) * 0.0006,
    }));

    // Animated Energy Arcs around Main Portal Ring
    const energyArcs: EnergyArc[] = Array.from({ length: arcCount }, (_, i) => ({
      startAngle: (i * Math.PI * 2) / arcCount,
      length: Math.random() * 0.55 + 0.2,
      speed: (Math.random() * 0.01 + 0.005) * (i % 2 === 0 ? 1 : -1),
      opacity: Math.random() * 0.6 + 0.35,
      color: i % 3 === 0 ? '#00f5ff' : i % 3 === 1 ? '#38bdf8' : '#818cf8',
      width: Math.random() * 2.2 + 1.2,
    }));

    let time = 0;
    let autoPulseTimer = 0;

    // Render loop
    const render = () => {
      time += 0.016;
      autoPulseTimer += 0.016;

      // Periodic subtle energy pulse (~every 4.5 seconds)
      if (autoPulseTimer > 4.5 && clickPulseRef.current === 0) {
        clickPulseRef.current = 0.01;
        autoPulseTimer = 0;
      }

      // Progress active pulse wave
      if (clickPulseRef.current > 0) {
        clickPulseRef.current += 0.02;
        if (clickPulseRef.current > 1) clickPulseRef.current = 0;
      }

      // Smooth lerp mouse tilt
      mouseTiltRef.current.x += (mouseTiltRef.current.targetX - mouseTiltRef.current.x) * 0.05;
      mouseTiltRef.current.y += (mouseTiltRef.current.targetY - mouseTiltRef.current.y) * 0.05;

      // Smooth lerp hover factor
      const targetHover = isHovered ? 1 : 0;
      hoverRef.current += (targetHover - hoverRef.current) * 0.08;

      const hoverFactor = hoverRef.current;
      const pulseVal = clickPulseRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const maxRadius = baseWidth * 0.72; // Portal main outer radius

      const tiltMx = mouseTiltRef.current.x;
      const tiltMy = mouseTiltRef.current.y;

      ctx.save();

      // ---------------------------------------------------------------------
      // LAYER 1: OUTER ATMOSPHERIC ENERGY GLOW (Subtle soft aura)
      // ---------------------------------------------------------------------
      const outerAtmoGrad = ctx.createRadialGradient(
        cx + tiltMx * 8,
        cy + tiltMy * 8,
        maxRadius * 0.6,
        cx,
        cy,
        maxRadius * 1.3
      );
      outerAtmoGrad.addColorStop(0, `rgba(0, 245, 255, ${0.05 + hoverFactor * 0.04})`);
      outerAtmoGrad.addColorStop(0.5, `rgba(14, 165, 233, ${0.02 + hoverFactor * 0.015})`);
      outerAtmoGrad.addColorStop(0.85, 'rgba(2, 6, 23, 0.01)');
      outerAtmoGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = outerAtmoGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, maxRadius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // ---------------------------------------------------------------------
      // LAYER 6: DEEP DIMENSIONAL INTERIOR (75-80% Deep Black/Navy Void)
      // ---------------------------------------------------------------------
      // Deep void gradient: Center is deep black void, subtle navy near edges
      const innerVoidGrad = ctx.createRadialGradient(
        cx + tiltMx * 12,
        cy + tiltMy * 12,
        0,
        cx,
        cy,
        maxRadius * 0.96
      );
      innerVoidGrad.addColorStop(0, '#000206');
      innerVoidGrad.addColorStop(0.4, '#000104');
      innerVoidGrad.addColorStop(0.7, '#000612');
      innerVoidGrad.addColorStop(0.88, '#001026'); // Subtle navy depth
      innerVoidGrad.addColorStop(0.97, '#001a3a'); // Dark blue atmosphere near ring edge
      innerVoidGrad.addColorStop(1, '#000610');

      ctx.fillStyle = innerVoidGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, maxRadius * 0.96, 0, Math.PI * 2);
      ctx.fill();

      // Faint Swirling Vortex Rays in Portal Interior (opacity kept very low)
      ctx.save();
      ctx.translate(cx + tiltMx * 10, cy + tiltMy * 10);
      ctx.rotate(time * 0.06);

      const vortexGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, maxRadius * 0.9);
      vortexGrad.addColorStop(0, `rgba(0, 245, 255, ${0.05 + hoverFactor * 0.03})`);
      vortexGrad.addColorStop(0.35, 'rgba(56, 189, 248, 0.02)');
      vortexGrad.addColorStop(0.8, 'rgba(2, 132, 199, 0.01)');
      vortexGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = vortexGrad;
      ctx.beginPath();
      ctx.arc(0, 0, maxRadius * 0.9, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ---------------------------------------------------------------------
      // LAYER 7: CENTRAL ENERGY CORE (Small, Bright, Concentrated)
      // ---------------------------------------------------------------------
      const corePulse = Math.sin(time * 2.2) * 0.12 + 1.0;
      const coreRadius = maxRadius * 0.048 * corePulse * (1 + hoverFactor * 0.15); // Small core!

      ctx.save();
      ctx.shadowColor = '#00f5ff';
      ctx.shadowBlur = 12 + hoverFactor * 6;

      const coreGrad = ctx.createRadialGradient(
        cx + tiltMx * 4,
        cy + tiltMy * 4,
        0,
        cx,
        cy,
        coreRadius * 2.2
      );
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.3, '#00f5ff');
      coreGrad.addColorStop(0.65, 'rgba(14, 165, 233, 0.22)');
      coreGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ---------------------------------------------------------------------
      // PORTAL PARTICLES (Multi-Depth Inward/Outward Floating Specks)
      // ---------------------------------------------------------------------
      particles.forEach((p) => {
        p.angle += p.speed * (1 + hoverFactor * 0.3);
        p.distanceRatio += p.radialVx;

        // Bounce radial drift boundary inside void
        if (p.distanceRatio < 0.1 || p.distanceRatio > 0.9) {
          p.radialVx *= -1;
        }

        // Parallax scaling per Z-depth
        const depthParallaxX = tiltMx * p.depthZ * 25;
        const depthParallaxY = tiltMy * p.depthZ * 25;

        const pRadius = maxRadius * p.distanceRatio;
        const px = cx + Math.cos(p.angle) * pRadius + depthParallaxX;
        const py = cy + Math.sin(p.angle) * (pRadius * 0.9) + depthParallaxY;

        const renderedRadius = p.radius * p.depthZ * (1 + hoverFactor * 0.15);
        const renderedAlpha = p.alpha * p.depthZ * (0.7 + Math.sin(time * 2.2 + p.angle) * 0.3);

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = renderedAlpha;

        if (p.depthZ > 0.65) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 4;
        }

        ctx.beginPath();
        ctx.arc(px, py, renderedRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ---------------------------------------------------------------------
      // LAYER 3 & 4: SECONDARY ORBITAL RINGS (Thin, Darker, Animated)
      // ---------------------------------------------------------------------
      // Outer Counter-Rotating Segmented Ring
      ctx.save();
      ctx.translate(cx + tiltMx * 6, cy + tiltMy * 6);
      ctx.rotate(-time * 0.05);

      ctx.strokeStyle = `rgba(129, 140, 248, ${0.28 + hoverFactor * 0.15})`;
      ctx.lineWidth = 1.1;
      ctx.setLineDash([12, 20, 6, 20]);

      ctx.beginPath();
      ctx.arc(0, 0, maxRadius * 1.07, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Outer Secondary Ring (Clockwise)
      ctx.save();
      ctx.translate(cx + tiltMx * 8, cy + tiltMy * 8);
      ctx.rotate(time * 0.035);

      ctx.strokeStyle = `rgba(56, 189, 248, ${0.22 + hoverFactor * 0.15})`;
      ctx.lineWidth = 1.0;
      ctx.setLineDash([5, 15, 24, 15]);

      ctx.beginPath();
      ctx.arc(0, 0, maxRadius * 1.025, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // ---------------------------------------------------------------------
      // LAYER 2: MAIN DIMENSIONAL ENERGY RING & EDGE ARCS
      // ---------------------------------------------------------------------
      // Main Base Ring Boundary
      ctx.save();
      ctx.translate(cx + tiltMx * 10, cy + tiltMy * 10);

      ctx.strokeStyle = `rgba(0, 245, 255, ${0.3 + hoverFactor * 0.2})`;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = '#00f5ff';
      ctx.shadowBlur = 8 + hoverFactor * 6;

      ctx.beginPath();
      ctx.arc(0, 0, maxRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Active Animated Energy Arcs along Edge
      energyArcs.forEach((arc) => {
        arc.startAngle += arc.speed * (1 + hoverFactor * 0.35);

        ctx.save();
        ctx.translate(cx + tiltMx * 10, cy + tiltMy * 10);

        ctx.strokeStyle = arc.color;
        ctx.lineWidth = arc.width + hoverFactor * 1.0;
        ctx.shadowColor = arc.color;
        ctx.shadowBlur = 12 + hoverFactor * 6;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.arc(0, 0, maxRadius, arc.startAngle, arc.startAngle + arc.length);
        ctx.stroke();
        ctx.restore();
      });

      // Layer 5: Inner Boundary Accent Ring
      ctx.save();
      ctx.translate(cx + tiltMx * 12, cy + tiltMy * 12);

      ctx.strokeStyle = `rgba(56, 189, 248, ${0.38 + hoverFactor * 0.2})`;
      ctx.lineWidth = 1.3;
      ctx.setLineDash([3, 10, 16, 10]);

      ctx.beginPath();
      ctx.arc(0, 0, maxRadius * 0.95, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // ---------------------------------------------------------------------
      // DIMENSIONAL PULSE WAVE RIPPLE
      // ---------------------------------------------------------------------
      if (pulseVal > 0) {
        const pulseRadius = maxRadius * (0.88 + pulseVal * 0.45);
        const pulseAlpha = Math.max(0, (1 - pulseVal) * 0.55);

        ctx.save();
        ctx.translate(cx + tiltMx * 10, cy + tiltMy * 10);

        ctx.strokeStyle = `rgba(0, 245, 255, ${pulseAlpha})`;
        ctx.lineWidth = 3.0 * (1 - pulseVal * 0.5);
        ctx.shadowColor = '#00f5ff';
        ctx.shadowBlur = 14;

        ctx.beginPath();
        ctx.arc(0, 0, pulseRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount, arcCount, isHovered, isMobile]);

  // Mouse tilt CSS transform (max 5 degrees)
  const tiltX = mouseTiltRef.current.x * 5;
  const tiltY = mouseTiltRef.current.y * -5;

  return (
    <div
      ref={containerRef}
      id="project-dimension-portal-container"
      className="relative flex flex-col items-center justify-center select-none cursor-pointer transition-transform duration-300 ease-out"
      style={{
        transform: `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* 1. Main Portal Canvas */}
      <div className="relative flex items-center justify-center">
        <canvas
          ref={portalCanvasRef}
          className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[440px] md:h-[440px] pointer-events-auto"
        />

        {/* Inner Content Slot (e.g. Project Screenshot Materialization) */}
        {children && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            {children}
          </div>
        )}

        {/* Subtle Ambient Outer Aura */}
        <div
          className={`absolute inset-0 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
            isHovered ? 'opacity-30 bg-[#00f5ff]' : 'opacity-15 bg-[#0284c7]'
          }`}
        />
      </div>

      {/* 2. Energy Connecting Field between Portal and Platform */}
      <div className="relative -mt-3 sm:-mt-5 flex flex-col items-center pointer-events-none z-10">
        {/* Soft Vertical Light Streamer Field */}
        <div className="w-24 sm:w-32 md:w-44 h-8 sm:h-10 bg-gradient-to-t from-cyan-500/20 via-sky-400/10 to-transparent blur-xs transform -skew-x-3" />

        {/* Floating Energy Particles bridging vertical gap */}
        <div className="absolute top-1 w-24 flex justify-between opacity-80">
          <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f5ff] animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_#00f5ff] animate-ping" />
          <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f5ff] animate-pulse" />
        </div>
      </div>

      {/* 3. Substantial 3D Futuristic Circular Landing Platform */}
      <div className="relative -mt-2 sm:-mt-3 flex flex-col items-center pointer-events-none z-20">
        {/* Main Platform Container with Real Cylinder Depth */}
        <div className="relative w-56 sm:w-72 md:w-[380px] h-20 sm:h-24 md:h-28 flex items-center justify-center">
          
          {/* LOWER BASE & UNDERSIDE SHADOW / SHADOW GLOW */}
          <div className="absolute bottom-0 w-full h-8 sm:h-10 rounded-full bg-cyan-500/15 blur-xl transform scale-y-40 translate-y-3" />
          
          {/* 3D PLATFORM CYLINDER BEVEL BODY (Side Wall Depth) */}
          <div className="absolute inset-x-2 bottom-1 top-4 rounded-[100%] bg-gradient-to-b from-[#0a1b36] via-[#020b18] to-[#00030a] border-b-2 border-cyan-500/50 shadow-[0_15px_30px_rgba(0,0,0,0.9)] transform scale-y-45 translate-y-3 overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          </div>

          {/* TOP METALLIC DECK / SURFACE */}
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/60 bg-gradient-to-b from-[#03132a] via-[#010814] to-[#000208] shadow-[0_0_30px_rgba(0,245,255,0.25)] transform rotate-x-75 scale-y-50">
            {/* Outer Deck Metallic Edge Glow */}
            <div className="absolute inset-0.5 rounded-full border border-sky-300/30" />
          </div>

          {/* PLATFORM INNER CONCENTRIC RINGS */}
          {/* Secondary Outer Segmented Dashed Ring (Slow Clockwise Rotation) */}
          <div className="absolute inset-3 sm:inset-4 rounded-full border border-sky-400/50 border-dashed animate-[spin_35s_linear_infinite] transform rotate-x-75 scale-y-50" />

          {/* Inner Counter-Rotating Dashed Metallic Energy Ring */}
          <div className="absolute inset-6 sm:inset-8 rounded-full border border-cyan-500/40 border-dotted animate-[spin_25s_linear_infinite_reverse] transform rotate-x-75 scale-y-50" />

          {/* Main Bright Inner Focal Ring */}
          <div className="absolute inset-10 sm:inset-12 rounded-full border-2 border-cyan-400/80 shadow-[0_0_18px_rgba(0,245,255,0.6)] transform rotate-x-75 scale-y-50" />

          {/* Center Dark Landing Surface with Cyan Focal Core Glow */}
          <div className="absolute w-16 sm:w-24 md:w-32 h-8 sm:h-12 rounded-full bg-[#010a18] border border-cyan-500/50 transform rotate-x-75 scale-y-50 flex items-center justify-center">
            <div className="w-6 sm:w-10 h-3 sm:h-5 rounded-full bg-cyan-400/30 blur-xs shadow-[0_0_15px_#00f5ff]" />
          </div>

          {/* VERTICAL HOLOGRAPHIC LIGHT PILLARS (Radially placed around Platform Deck) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {Array.from({ length: pillarCount }).map((_, i) => {
              const angle = (i * Math.PI * 2) / pillarCount;
              // Radius positioning for 3D ellipse deck
              const radiusX = isMobile ? 95 : 155;
              const radiusY = isMobile ? 22 : 36;
              const px = Math.cos(angle) * radiusX;
              const py = Math.sin(angle) * radiusY - 8;

              return (
                <div
                  key={i}
                  className="absolute flex flex-col items-center"
                  style={{
                    transform: `translate(${px}px, ${py}px)`,
                  }}
                >
                  {/* Holographic Light Pillar Beam */}
                  <div className="w-1 sm:w-1.5 h-6 sm:h-9 bg-gradient-to-t from-cyan-400/70 via-sky-400/25 to-transparent blur-[0.5px] animate-pulse" />
                  {/* Base LED Dock Marker */}
                  <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#00f5ff] -mt-1" />
                </div>
              );
            })}
          </div>

          {/* Platform Front Edge Highlight Accent Line */}
          <div className="absolute bottom-1 w-32 sm:w-48 md:w-64 h-1 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent blur-[0.5px]" />
        </div>
      </div>
    </div>
  );
};

export default ProjectDimensionPortal;

