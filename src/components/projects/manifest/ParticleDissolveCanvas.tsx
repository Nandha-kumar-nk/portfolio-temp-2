import React, { useEffect, useRef } from 'react';

interface ParticleDissolveCanvasProps {
  isTransitioning: boolean;
  direction: 'next' | 'prev';
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxLife: number;
  life: number;
  color: string;
}

export const ParticleDissolveCanvas: React.FC<ParticleDissolveCanvasProps> = ({
  isTransitioning,
  direction,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isTransitioning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 300);
      return () => clearTimeout(timer);
    }

    // Spawn 140 particles traveling in direction
    const particles: Particle[] = [];
    const count = 140;
    const isNext = direction === 'next';

    const colors = ['#00f5ff', '#38bdf8', '#818cf8', '#22d3ee', '#60a5fa'];

    // Center box area where project sheet is located
    const centerX = width / 2;
    const centerY = height / 2;
    const boxW = Math.min(width * 0.6, 800);
    const boxH = Math.min(height * 0.5, 500);

    for (let i = 0; i < count; i++) {
      const px = centerX + (Math.random() - 0.5) * boxW;
      const py = centerY + (Math.random() - 0.5) * boxH;

      // Dir speed: next moves right, prev moves left
      const vx = (isNext ? 1 : -1) * (3 + Math.random() * 8);
      const vy = (Math.random() - 0.5) * 4;

      particles.push({
        x: px,
        y: py,
        vx,
        vy,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.8 + Math.random() * 0.2,
        maxLife: 40 + Math.random() * 30,
        life: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationFrameId: number;
    let startTime = performance.now();
    const duration = 850; // total animation duration in ms

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Fade out as life increases
        const lifeRatio = p.life / p.maxLife;
        const alpha = Math.max(0, p.alpha * (1 - lifeRatio));

        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        onComplete?.();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTransitioning, direction, onComplete]);

  if (!isTransitioning) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-40 pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
