import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { HolographicArtifact } from './HolographicArtifact';
import { Sparkles } from 'lucide-react';

interface PortalEnvironmentProps {
  project: ProjectItem;
  index: number;
  total: number;
  onOpenFullscreen?: () => void;
  isDissolving?: boolean;
}

export const PortalEnvironment: React.FC<PortalEnvironmentProps> = ({
  project,
  index,
  total,
  onOpenFullscreen,
  isDissolving = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const formattedNum = String(index + 1).padStart(2, '0');
  const totalNum = String(total).padStart(2, '0');
  const accent = project.accentColor || '#00f5ff';

  // Canvas particle field around the portal background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth || 500);
    let height = (canvas.height = canvas.offsetHeight || 500);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 500;
      height = canvas.height = canvas.offsetHeight || 500;
    };
    window.addEventListener('resize', handleResize);

    // Orbiting particle arcs around the background energy field
    const particles = Array.from({ length: 45 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 90 + Math.random() * 120,
      speed: (0.003 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1),
      size: 1 + Math.random() * 1.8,
      alpha: 0.25 + Math.random() * 0.5,
      color: Math.random() > 0.3 ? accent : '#00f5ff',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      particles.forEach((p) => {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.7;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [accent]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center my-2 sm:my-4 select-none overflow-hidden">
      {/* Top Header & Counter */}
      <div className="relative z-20 flex flex-col items-center text-center space-y-1 mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-bold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(0,245,255,0.12)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>PROJECT DIMENSION</span>
        </div>

        <div className="text-xl sm:text-2xl font-mono font-black tracking-widest text-white drop-shadow-[0_0_10px_rgba(0,245,255,0.4)]">
          {formattedNum} <span className="text-slate-600 text-base font-normal">/</span> {totalNum}
        </div>
      </div>

      {/* Portal Energy Background & Floating Card */}
      <div className="relative w-full max-w-xl aspect-square max-h-[420px] sm:max-h-[460px] flex items-center justify-center">
        {/* Soft Radial Ambient Glow */}
        <div
          className="absolute inset-0 rounded-full filter blur-3xl opacity-30 pointer-events-none transition-colors duration-700"
          style={{
            background: `radial-gradient(circle, ${accent} 0%, rgba(2,8,23,0) 70%)`,
          }}
        />

        {/* Canvas Particle Field Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-80"
        />

        {/* Outer Rotating Energy Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 sm:inset-10 rounded-full pointer-events-none z-10 opacity-60"
        >
          <svg className="w-full h-full" viewBox="0 0 500 500">
            <circle
              cx="250"
              cy="250"
              r="230"
              fill="none"
              stroke={accent}
              strokeWidth="1.5"
              strokeDasharray="12 18"
              strokeOpacity="0.5"
              style={{ filter: `drop-shadow(0 0 10px ${accent})` }}
            />
          </svg>
        </motion.div>

        {/* Counter-Rotating Inner Energy Arc */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-10 sm:inset-16 rounded-full pointer-events-none z-10 opacity-50"
        >
          <svg className="w-full h-full" viewBox="0 0 400 400">
            <circle
              cx="200"
              cy="200"
              r="180"
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeDasharray="25 15 8 15"
              strokeOpacity="0.6"
            />
          </svg>
        </motion.div>

        {/* Central Core: Holds the Small Holographic Project Card */}
        <div className="relative z-20 flex items-center justify-center p-2">
          <HolographicArtifact
            project={project}
            onOpenFullscreen={onOpenFullscreen}
            isDissolving={isDissolving}
          />
        </div>
      </div>

      {/* Project Title & Spatial Typography (No rectangular card container) */}
      <div className="relative z-20 text-center mt-2 px-4 max-w-lg">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          {project.title}
        </h1>
        <p className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mt-1">
          {project.category}
        </p>
        <p className="text-xs text-slate-300 font-sans mt-1 max-w-sm mx-auto line-clamp-2">
          {project.tagline || project.description}
        </p>
      </div>
    </div>
  );
};
