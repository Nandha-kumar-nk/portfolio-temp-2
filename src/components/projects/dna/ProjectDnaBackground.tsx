import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  pulseSpeed: number;
  pulseOffset: number;
}

export const ProjectDnaBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle atmospheric dust particle colors
    const colors = [
      'rgba(0, 245, 255,',   // Cyan
      'rgba(56, 189, 248,',  // Electric blue
      'rgba(147, 197, 253,', // Soft sky
      'rgba(168, 85, 247,',  // Restrained purple
    ];

    const count = prefersReducedMotion ? 18 : 36;
    const particles: Particle[] = Array.from({ length: count }, () => {
      const baseAlpha = Math.random() * 0.28 + 0.12;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.35 - 0.08,
        size: Math.random() * 1.5 + 0.7,
        alpha: baseAlpha,
        baseAlpha,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      };
    });

    let time = 0;
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.014;
      ctx.clearRect(0, 0, width, height);

      // Render drifting atmospheric light motes
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        const alpha = p.baseAlpha * (0.7 + 0.3 * Math.sin(time * 2 + p.pulseOffset));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${alpha})`;
        ctx.shadowColor = `${p.color} ${alpha * 0.6})`;
        ctx.shadowBlur = 4;
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* 1. Base Midnight Atmospheric Canvas */}
      <div className="absolute inset-0 bg-[#02040a]" />

      {/* 2. Architectural Sanctuary Interior Layer with Deep Blue Atmospheric Tint */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-45 mix-blend-screen">
        <picture>
          <source srcSet="/assets/about-bg-clean.webp" type="image/webp" />
          <img
            src="/assets/about-bg-clean.png"
            alt=""
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.15] saturate-[1.2]"
            aria-hidden="true"
          />
        </picture>
        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-[#02040a]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02040a]/90 via-transparent to-[#02040a]/90" />
      </div>

      {/* 3. Deep Midnight Blue & Cyan Volumetric Lights */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1100px] h-[750px] pointer-events-none opacity-40 blur-[90px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(0, 245, 255, 0.35) 0%, rgba(14, 116, 144, 0.25) 35%, rgba(15, 23, 42, 0.4) 65%, transparent 85%)',
        }}
      />

      {/* 4. Canvas for Drifting Light Motes */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-65" />

      {/* 5. Physical Pedestal Platform & Perspective Floor Grid (Exhibition Hall Floor) */}
      <div
        className="absolute bottom-0 inset-x-0 h-[380px] pointer-events-none overflow-hidden"
        style={{
          perspective: '700px',
          perspectiveOrigin: '50% 20%',
        }}
      >
        {/* Receding perspective floor grid */}
        <div
          className="absolute inset-0 w-full h-[600px] opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 245, 255, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 245, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            transform: 'rotateX(68deg) translateY(-40px)',
            transformOrigin: 'top center',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 85%)',
          }}
        />

        {/* Central Exhibition Pedestal (Illuminated concentric rings where artifact hovers) */}
        <div className="absolute bottom-[35px] left-1/2 -translate-x-1/2 w-[580px] sm:w-[720px] h-[220px] pointer-events-none">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border border-cyan-500/20 opacity-40 shadow-[0_0_45px_rgba(0,245,255,0.15)]"
            style={{
              transform: 'scaleY(0.28)',
            }}
          />
          {/* Inner illuminated ring */}
          <div
            className="absolute inset-[30px] rounded-full border border-cyan-400/35 opacity-55 shadow-[0_0_30px_rgba(0,245,255,0.25)]"
            style={{
              transform: 'scaleY(0.28)',
            }}
          />
          {/* Pedestal core glow pool */}
          <div
            className="absolute inset-[60px] rounded-full bg-cyan-400/10 blur-[28px]"
            style={{
              transform: 'scaleY(0.25)',
            }}
          />
        </div>
      </div>

      {/* 6. Deep Bottom Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#02040a] via-[#02040a]/70 to-transparent pointer-events-none" />
    </div>
  );
};
