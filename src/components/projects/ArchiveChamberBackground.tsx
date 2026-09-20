import React, { useEffect, useRef } from 'react';

interface ArchiveChamberBackgroundProps {
  accentColor?: string;
  isMobile?: boolean;
}

interface ParticlePoint {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  ribbon: 'left' | 'right' | 'bottom' | 'top' | 'ambient';
  layer: 0 | 1 | 2; // 0: foreground, 1: middle, 2: background
  size: number;
  speed: number;
  colorPrefix: string;
  baseAlpha: number;
  pulsePhase: number;
  offsetPerp: number;
}

const COLOR_PALETTE = [
  'rgba(0, 245, 255, ',   // Cyan #00f5ff
  'rgba(56, 189, 248, ',  // Electric Blue #38bdf8
  'rgba(168, 85, 247, ',  // Subtle Violet #a855f7
  'rgba(255, 255, 255, ', // Soft White
  'rgba(6, 182, 212, ',   // Deep Cyan #06b6d4
];

export const ArchiveChamberBackground: React.FC<ArchiveChamberBackgroundProps> = ({
  accentColor = '#00f5ff',
  isMobile = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
    };
    window.addEventListener('resize', handleResize);

    const totalParticles = isMobile ? 650 : 2200;
    const particles: ParticlePoint[] = [];

    // Initialize particles focused around LEFT, RIGHT, BOTTOM edges, keeping CENTER clean
    for (let i = 0; i < totalParticles; i++) {
      const rand = Math.random();
      let ribbon: ParticlePoint['ribbon'] = 'left';
      if (rand < 0.38) ribbon = 'left';
      else if (rand < 0.76) ribbon = 'right';
      else if (rand < 0.92) ribbon = 'bottom';
      else if (rand < 0.97) ribbon = 'top';
      else ribbon = 'ambient';

      const layerRand = Math.random();
      const layer: ParticlePoint['layer'] = layerRand > 0.82 ? 0 : layerRand > 0.38 ? 1 : 2;

      let size = 1.0;
      if (layer === 0) size = (1.8 + Math.random() * 1.6) * dpr;
      else if (layer === 1) size = (1.1 + Math.random() * 0.8) * dpr;
      else size = (0.5 + Math.random() * 0.5) * dpr;

      // Color selection strictly aligned with palette
      let colorPrefix = COLOR_PALETTE[0]; // default cyan
      if (ribbon === 'right') {
        const c = Math.random();
        if (c > 0.6) colorPrefix = COLOR_PALETTE[2]; // violet highlight on right
        else if (c > 0.3) colorPrefix = COLOR_PALETTE[1]; // electric blue
        else colorPrefix = COLOR_PALETTE[0];
      } else if (ribbon === 'left') {
        const c = Math.random();
        if (c > 0.7) colorPrefix = COLOR_PALETTE[3]; // white
        else if (c > 0.35) colorPrefix = COLOR_PALETTE[1]; // electric blue
        else colorPrefix = COLOR_PALETTE[0];
      } else {
        colorPrefix = Math.random() > 0.5 ? COLOR_PALETTE[0] : COLOR_PALETTE[1];
      }

      const baseAlpha =
        layer === 0
          ? 0.4 + Math.random() * 0.45
          : layer === 1
          ? 0.25 + Math.random() * 0.35
          : 0.12 + Math.random() * 0.22;

      // Positioning according to composition rules
      let baseX = Math.random() * width;
      let baseY = Math.random() * height;

      if (ribbon === 'left') {
        // Curve along left 25% of viewport
        baseX = Math.random() * width * 0.26;
      } else if (ribbon === 'right') {
        // Curve along right 25% of viewport
        baseX = width - Math.random() * width * 0.26;
      } else if (ribbon === 'bottom') {
        // Diagonal stream along bottom 22%
        baseY = height - Math.random() * height * 0.22;
      } else if (ribbon === 'top') {
        // Sparse top particles
        baseY = Math.random() * height * 0.18;
      }

      particles.push({
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        ribbon,
        layer,
        size,
        speed: (0.3 + Math.random() * 0.7) * (layer === 0 ? 1.3 : 1.0),
        colorPrefix,
        baseAlpha,
        pulsePhase: Math.random() * Math.PI * 2,
        offsetPerp: (Math.random() - 0.5) * 120 * dpr,
      });
    }

    let startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic Sine Ribbon Wave Dynamics
        if (p.ribbon === 'left') {
          p.y += p.speed * dpr;
          if (p.y > height) p.y = -20;
          const wave = Math.sin(p.y * 0.0015 + elapsed * 0.8) * 45 * dpr;
          p.x = p.baseX + wave;
        } else if (p.ribbon === 'right') {
          p.y += p.speed * dpr;
          if (p.y > height) p.y = -20;
          const wave = Math.cos(p.y * 0.0018 - elapsed * 0.9) * 50 * dpr;
          p.x = p.baseX + wave;
        } else if (p.ribbon === 'bottom') {
          p.x += p.speed * 1.2 * dpr;
          if (p.x > width) p.x = -20;
          const wave = Math.sin(p.x * 0.002 + elapsed * 1.1) * 25 * dpr;
          p.y = p.baseY + wave;
        } else {
          p.x += p.speed * 0.5 * dpr;
          if (p.x > width) p.x = -20;
        }

        // Keep Center 45% clear from heavy particles
        const distFromCenterX = Math.abs(p.x - width / 2) / (width / 2);
        const distFromCenterY = Math.abs(p.y - height / 2) / (height / 2);
        const centerProximity = Math.max(0, 1 - Math.sqrt(distFromCenterX ** 2 + distFromCenterY ** 2));

        let alphaMultiplier = 1.0;
        if (centerProximity > 0.4) {
          alphaMultiplier = Math.max(0.05, 1 - (centerProximity - 0.4) * 2.2);
        }

        p.pulsePhase += 0.02;
        const pulse = 0.75 + Math.sin(p.pulsePhase) * 0.25;
        const finalAlpha = Math.max(0, Math.min(1, p.baseAlpha * pulse * alphaMultiplier));

        // Draw particle point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorPrefix}${finalAlpha.toFixed(3)})`;
        ctx.fill();

        // Luminous Halo Glow for Foreground particles
        if (p.layer === 0 && finalAlpha > 0.25 && !isMobile) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `${p.colorPrefix}${(finalAlpha * 0.22).toFixed(3)})`;
          ctx.fill();
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isMobile, accentColor]);

  return (
    <div
      id="archive-chamber-background"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#02050f]"
      aria-hidden="true"
    >
      {/* 1. Deep Space Atmospheric Canvas Base: Midnight navy / Deep Black */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#010308] to-[#010206]" />

      {/* 2. Soft Edge Nebula Haze (Left: Cyan/Blue, Right: Electric/Violet, Center: Dark Negative Space) */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -left-[10%] w-[42%] h-[80%] pointer-events-none opacity-30 blur-[120px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(0, 245, 255, 0.25) 0%, rgba(14, 116, 144, 0.1) 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -right-[10%] w-[42%] h-[80%] pointer-events-none opacity-25 blur-[120px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(168, 85, 247, 0.22) 0%, rgba(56, 189, 248, 0.1) 50%, transparent 80%)',
        }}
      />

      {/* 3. Center Vignette Overlay ensuring dark 50% clean space for Project Showcase Content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(1,3,8,0.85)_0%,rgba(1,3,8,0.4)_55%,transparent_100%)] pointer-events-none" />

      {/* 4. Canvas for Dynamic Edge Particle Aurora Ribbons */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};

export default ArchiveChamberBackground;

