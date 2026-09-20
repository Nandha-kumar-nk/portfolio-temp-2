import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { HolographicArtifact } from './HolographicArtifact';
import { InteractiveTechNodes } from './InteractiveTechNodes';
import { Sparkles, AlertCircle, Lightbulb, Layers, ShieldCheck, Github, ExternalLink } from 'lucide-react';

interface AsymmetricDimensionViewProps {
  project: ProjectItem;
  index: number;
  total: number;
  onOpenFullscreen?: () => void;
  isDissolving?: boolean;
}

export const AsymmetricDimensionView: React.FC<AsymmetricDimensionViewProps> = ({
  project,
  index,
  total,
  onOpenFullscreen,
  isDissolving = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Position logic:
  // Even index (0, 2, 4) -> Artifact on RIGHT, Narrative on LEFT
  // Odd index (1, 3) -> Artifact on LEFT, Narrative on RIGHT
  const isCardOnRight = index % 2 === 0;

  const formattedNum = String(index + 1).padStart(2, '0');
  const totalNum = String(total).padStart(2, '0');
  const accent = project.accentColor || '#00f5ff';

  // Ambient particle canvas around the portal background
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

    const particles = Array.from({ length: 35 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 75 + Math.random() * 110,
      speed: (0.003 + Math.random() * 0.007) * (Math.random() > 0.5 ? 1 : -1),
      size: 1 + Math.random() * 1.8,
      alpha: 0.2 + Math.random() * 0.5,
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
        ctx.shadowBlur = 4;
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

  // Project Story Area (Visually lighter, supports screenshot artifact)
  const storyNarrative = (
    <div className="w-full rounded-2xl border border-cyan-500/20 bg-slate-950/40 backdrop-blur-md p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col justify-between z-20">
      <div>
        {/* Header: PROJECT DIMENSION & Pulse Dot */}
        <div className="flex items-center justify-between pb-2 border-b border-cyan-500/15">
          <div className="flex items-center gap-2">
            <h2 className="font-orbitron font-extrabold text-sm sm:text-base text-slate-100 tracking-wider">
              PROJECT STORY
            </h2>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          </div>
          <span className="text-[10px] font-mono text-cyan-400/90 tracking-widest uppercase font-semibold">
            DIMENSION {formattedNum} / {totalNum}
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="mt-4">
          <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {project.title}
          </h1>
          <p className="text-[11px] font-mono font-bold text-cyan-400 tracking-widest uppercase mt-1">
            {project.category}
          </p>
        </div>

        {/* Narrative Quote (About Page Style) */}
        <div className="mt-3 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20">
          <p className="font-orbitron text-xs sm:text-sm font-semibold text-cyan-100 italic leading-snug">
            “{project.tagline || 'From a real-world problem to a working intelligent system.'}”
          </p>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-2.5 mt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-[11px] font-mono font-bold text-slate-200 hover:text-white hover:border-cyan-400 transition-all shadow-md active:scale-95"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>SOURCE CODE</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-[11px] font-mono font-black uppercase hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,245,255,0.3)] active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>LIVE DEMO</span>
            </a>
          )}
        </div>

        {/* Flowing Narrative Story Nodes */}
        <div className="space-y-3.5 mt-5 pt-4 border-t border-cyan-500/20">
          {/* Node 1: Problem */}
          <div className="relative pl-4 border-l-2 border-cyan-400/60 group">
            <span
              className="absolute -left-[5px] top-1 w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: accent }}
            />
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-0.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>01 // PROBLEM</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-mono">{project.problem}</p>
          </div>

          {/* Node 2: Idea / Solution */}
          <div className="relative pl-4 border-l-2 border-cyan-500/40 group">
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-0.5">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>02 // ARCHITECTURAL SOLUTION</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-mono">{project.solution}</p>
          </div>

          {/* Node 3: Build & Tech */}
          <div className="relative pl-4 border-l-2 border-cyan-500/30 group">
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-0.5">
              <Layers className="w-3.5 h-3.5" />
              <span>03 // CORE ENGINE STACK</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-mono">{project.build}</p>
          </div>

          {/* Node 4: Impact */}
          <div className="relative pl-4 border-l-2 border-cyan-500/20 group">
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>04 // MEASURED IMPACT</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-mono">
              {project.impact || project.result}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Floating Artifact & Technology Column
  const artifactColumn = (
    <div className="relative flex flex-col items-center justify-center z-20">
      {/* Background Energy Field Portal */}
      <div className="relative w-full max-w-md aspect-square max-h-[360px] flex items-center justify-center">
        {/* Soft Ambient Radial Glow */}
        <div
          className="absolute inset-0 rounded-full filter blur-3xl opacity-30 pointer-events-none transition-colors duration-700"
          style={{
            background: `radial-gradient(circle, ${accent} 0%, rgba(2,8,23,0) 70%)`,
          }}
        />

        {/* Canvas Particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"
        />

        {/* Orbiting Energy Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full pointer-events-none z-10 opacity-50"
        >
          <svg className="w-full h-full" viewBox="0 0 400 400">
            <circle
              cx="200"
              cy="200"
              r="185"
              fill="none"
              stroke={accent}
              strokeWidth="1.5"
              strokeDasharray="10 18"
              strokeOpacity="0.5"
            />
          </svg>
        </motion.div>

        {/* Small Floating Holographic Artifact Card */}
        <div className="relative z-20 flex items-center justify-center">
          <HolographicArtifact
            project={project}
            onOpenFullscreen={onOpenFullscreen}
            isDissolving={isDissolving}
          />
        </div>
      </div>

      {/* Floating Interactive Technology Nodes */}
      <div className="w-full max-w-md mt-2">
        <InteractiveTechNodes project={project} />
      </div>
    </div>
  );

  return (
    <div className="relative w-full max-w-7xl mx-auto my-4 sm:my-6 px-4 font-sans select-none overflow-x-hidden">
      {/* DESKTOP ASYMMETRICAL SPLIT LAYOUT (lg: 1024px+) */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center min-h-[560px]">
        {isCardOnRight ? (
          <>
            {/* Left: Project Story (5 cols) */}
            <div className="lg:col-span-5">{storyNarrative}</div>
            {/* Center Energy Line (1 col) */}
            <div className="lg:col-span-1 flex justify-center">
              <div className="w-[1px] h-96 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
            </div>
            {/* Right: Artifact & Tech (6 cols) */}
            <div className="lg:col-span-6">{artifactColumn}</div>
          </>
        ) : (
          <>
            {/* Left: Artifact & Tech (6 cols) */}
            <div className="lg:col-span-6">{artifactColumn}</div>
            {/* Center Energy Line (1 col) */}
            <div className="lg:col-span-1 flex justify-center">
              <div className="w-[1px] h-96 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
            </div>
            {/* Right: Project Story (5 cols) */}
            <div className="lg:col-span-5">{storyNarrative}</div>
          </>
        )}
      </div>

      {/* MOBILE & TABLET VERTICAL STACK (< 1024px) */}
      <div className="flex flex-col lg:hidden space-y-6">
        {/* Top Header & Dimension Counter */}
        <div className="flex flex-col items-center text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-bold tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>PROJECT DIMENSION {formattedNum} / {totalNum}</span>
          </div>
          <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white tracking-tight pt-1">
            {project.title}
          </h1>
          <p className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">
            {project.category}
          </p>
        </div>

        {/* Floating Small Artifact Card */}
        <div className="flex justify-center">{artifactColumn}</div>

        {/* Narrative Nodes Stack */}
        <div className="space-y-3 px-2 pt-2 border-t border-cyan-500/20">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-xs font-bold uppercase mb-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>01 // PROBLEM</span>
            </div>
            <p className="text-xs text-slate-200 font-mono leading-relaxed">{project.problem}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-xs font-bold uppercase mb-1">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>02 // SOLUTION</span>
            </div>
            <p className="text-xs text-slate-200 font-mono leading-relaxed">{project.solution}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-xs font-bold uppercase mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>03 // IMPACT</span>
            </div>
            <p className="text-xs text-slate-200 font-mono leading-relaxed">
              {project.impact || project.result}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
