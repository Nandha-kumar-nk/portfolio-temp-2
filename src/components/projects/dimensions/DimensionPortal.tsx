import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { Sparkles, ArrowDown } from 'lucide-react';

interface DimensionPortalProps {
  project: ProjectItem;
  index: number;
  total: number;
  onEnterDimension: () => void;
  onSelectProject: (idx: number) => void;
  projects: ProjectItem[];
}

export const DimensionPortal: React.FC<DimensionPortalProps> = ({
  project,
  index,
  total,
  onEnterDimension,
  onSelectProject,
  projects,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const formattedNum = String(index + 1).padStart(2, '0');
  const totalNum = String(total).padStart(2, '0');
  const accent = project.accentColor || '#00f5ff';

  // Canvas-based portal particle field & energy vortex
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

    // Particle definitions for the vortex
    const particles = Array.from({ length: 60 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 40 + Math.random() * 160,
      speed: 0.005 + Math.random() * 0.012,
      size: 1 + Math.random() * 2.5,
      alpha: 0.2 + Math.random() * 0.7,
      color: Math.random() > 0.4 ? accent : '#00f5ff',
    }));

    let rotationAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      rotationAngle += 0.004;

      // Draw Orbiting Particles flowing inward
      particles.forEach((p) => {
        p.angle += p.speed;
        p.radius -= 0.15;
        if (p.radius < 20) {
          p.radius = 160 + Math.random() * 40;
          p.angle = Math.random() * Math.PI * 2;
        }

        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.85; // slightly elliptical depth

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * Math.min(1, p.radius / 50);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Inner Core Glow Radial Gradient
      const coreGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 140);
      coreGrad.addColorStop(0, 'rgba(0, 245, 255, 0.4)');
      coreGrad.addColorStop(0.4, `${accent}22`);
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.globalAlpha = 1;
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [accent]);

  return (
    <div className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-between py-6 px-4 select-none overflow-hidden">
      {/* Top Header & Dimension Counter */}
      <div className="relative z-20 flex flex-col items-center text-center space-y-2 mt-2 sm:mt-4">
        {/* Title */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-bold tracking-[0.25em] uppercase shadow-[0_0_15px_rgba(0,245,255,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>PROJECT DIMENSIONS</span>
        </div>

        {/* Counter */}
        <div className="text-2xl sm:text-4xl font-mono font-black tracking-widest text-white drop-shadow-[0_0_10px_rgba(0,245,255,0.5)]">
          {formattedNum} <span className="text-slate-600 text-xl font-normal">/</span> {totalNum}
        </div>
      </div>

      {/* Hero Visual: Large Glowing Multi-Layered Dimensional Portal */}
      <div className="relative w-full max-w-lg aspect-square flex items-center justify-center my-4 sm:my-6">
        {/* Outer Soft Ambient Backdrop Glow */}
        <div
          className="absolute inset-0 rounded-full filter blur-3xl opacity-40 transition-colors duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${accent} 0%, rgba(2,8,23,0) 70%)`,
          }}
        />

        {/* Canvas Particle Field */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Layer 1: Outer Rotating Energy Ring (SVG Dashed & Glowing) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 sm:inset-6 rounded-full pointer-events-none z-10"
        >
          <svg className="w-full h-full" viewBox="0 0 400 400">
            <circle
              cx="200"
              cy="200"
              r="190"
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeDasharray="12 18"
              strokeOpacity="0.5"
              style={{ filter: `drop-shadow(0 0 10px ${accent})` }}
            />
            <circle
              cx="200"
              cy="200"
              r="175"
              fill="none"
              stroke="#00f5ff"
              strokeWidth="1.5"
              strokeDasharray="6 30"
              strokeOpacity="0.4"
            />
          </svg>
        </motion.div>

        {/* Layer 2: Counter-Rotating Middle Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-12 sm:inset-16 rounded-full pointer-events-none z-10"
        >
          <svg className="w-full h-full" viewBox="0 0 300 300">
            <circle
              cx="150"
              cy="150"
              r="140"
              fill="none"
              stroke={accent}
              strokeWidth="2.5"
              strokeDasharray="40 20 10 20"
              strokeOpacity="0.7"
              style={{ filter: `drop-shadow(0 0 12px ${accent})` }}
            />
          </svg>
        </motion.div>

        {/* Layer 3: Inner Pulsing Gateway Ring */}
        <motion.div
          animate={{
            scale: [0.96, 1.04, 0.96],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-20 sm:inset-24 rounded-full border-2 border-cyan-400/80 bg-gradient-to-br from-cyan-500/10 via-black/90 to-blue-950/40 shadow-[0_0_50px_rgba(0,245,255,0.35),inset_0_0_30px_rgba(0,245,255,0.25)] flex flex-col items-center justify-center p-4 text-center z-20 backdrop-blur-md"
        >
          {/* Badge */}
          <div className="px-3 py-0.5 rounded-md border border-cyan-400/40 bg-cyan-950/80 text-cyan-300 font-mono text-[10px] sm:text-xs font-extrabold tracking-widest uppercase mb-2 shadow-[0_0_10px_rgba(0,245,255,0.2)]">
            [ PORTAL ]
          </div>

          {/* Project Title */}
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-[240px] sm:max-w-[280px]">
            {project.title}
          </h2>

          {/* Subtagline */}
          <p className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase mt-1 line-clamp-1 max-w-[200px] sm:max-w-[240px]">
            {project.category}
          </p>

          {/* Enter Dimension CTA Button */}
          <button
            onClick={onEnterDimension}
            className="group relative mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 font-mono text-xs sm:text-sm font-black tracking-widest uppercase hover:text-white hover:shadow-[0_0_30px_rgba(0,245,255,0.7)] transition-all duration-300 active:scale-95 z-30"
          >
            <span>ENTER DIMENSION</span>
            <ArrowDown className="w-4 h-4 text-slate-950 group-hover:text-white group-hover:translate-y-1 transition-all" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Minimal Portal Selector Pills */}
      <div className="relative z-20 flex items-center justify-center gap-2.5 max-w-xl mx-auto overflow-x-auto py-2 no-scrollbar">
        {projects.map((p, idx) => {
          const isActive = idx === index;
          const numStr = String(idx + 1).padStart(2, '0');
          return (
            <button
              key={p.id}
              onClick={() => onSelectProject(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-xs transition-all duration-300 active:scale-95 ${
                isActive
                  ? 'bg-cyan-950/90 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,245,255,0.3)] font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span className={isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                {numStr}
              </span>
              <span className="hidden sm:inline">{p.shortName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
