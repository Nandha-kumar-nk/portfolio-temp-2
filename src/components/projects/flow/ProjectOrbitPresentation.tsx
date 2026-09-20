import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectScreenshotFrame } from '../ProjectScreenshotFrame';
import { ProjectFlowTechStack } from './ProjectFlowTechStack';
import { ExternalLink, Github, Sparkles, Maximize2, X, Orbit } from 'lucide-react';

interface ProjectOrbitPresentationProps {
  projects: ProjectItem[];
  currentIndex: number;
  onSelectProject: (id: string) => void;
  direction?: 'forward' | 'backward';
  isTransitioning?: boolean;
}

const PROJECT_SIGNALS: Record<string, string> = {
  'speed-taxi': 'REAL-TIME DISPATCH',
  'swayam-2': 'KNOWLEDGE NETWORK',
  'resume-forge': 'CAREER COMPLIANCE',
  'wildlife-ai': 'SAFETY SENSOR MESH',
  'nk-mern-cli': 'ARCHITECTURE AUTOMATION',
};

export const ProjectOrbitPresentation: React.FC<ProjectOrbitPresentationProps> = ({
  projects,
  currentIndex,
  onSelectProject,
  isTransitioning = false,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  const activeProject = projects[currentIndex];
  const totalProjects = projects.length;
  const signalTag = PROJECT_SIGNALS[activeProject.id] || 'ORBITAL SIGNAL';
  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  // Mouse hover parallax effect (max 8px shift)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseParallax({ x: x * 12, y: y * 12 });
  };

  const handleMouseLeave = () => {
    setMouseParallax({ x: 0, y: 0 });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-2 z-20 font-mono relative">
      {/* 1. HUGE SUBTLE BACKGROUND PROJECT NUMBER */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 overflow-hidden w-full text-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeProject.id}
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            animate={{ opacity: 0.08, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.15, y: 20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[180px] sm:text-[260px] md:text-[320px] font-black text-cyan-300 tracking-tighter inline-block leading-none drop-shadow-[0_0_60px_rgba(0,245,255,0.4)]"
          >
            {activeProject.doorNumber}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* 2. CURVED ORBITAL PATH BACKGROUND SVG (Desktop / Laptop) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <svg className="w-full h-full opacity-40" viewBox="0 0 1200 600" fill="none">
          {/* Outer Luminous Orbit Arc */}
          <path
            d="M 50 480 C 350 180, 850 180, 1150 480"
            stroke="url(#orbit-glow-grad)"
            strokeWidth="1.8"
            strokeDasharray="6 4"
          />
          {/* Inner Sharp Orbit Path */}
          <path
            d="M 120 440 C 400 220, 800 220, 1080 440"
            stroke="#00f5ff"
            strokeWidth="1"
            strokeOpacity="0.35"
          />
          <defs>
            <linearGradient id="orbit-glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00f5ff" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Orbiting Ambient Particle Accents */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -15, 10, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f5ff]"
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_#38bdf8]"
        />
      </div>

      {/* 3. DESKTOP ORBITAL PREVIEW NODES (Secondary Orbiting Projects) */}
      <div className="hidden lg:block relative z-20 pointer-events-none mb-4">
        <div className="flex items-center justify-between px-8">
          {projects.map((proj, idx) => {
            const offset = idx - currentIndex;
            const isActive = offset === 0;

            if (isActive) return <div key={proj.id} className="w-1" />; // Active is hero centered below

            // Calculate orbital perspective transformation
            let scale = 0.75;
            let opacity = 0.60;
            let blur = 'blur(2px)';
            let translateY = '0px';

            if (Math.abs(offset) === 1) {
              scale = 0.75;
              opacity = 0.65;
              blur = 'blur(1px)';
              translateY = '-10px';
            } else {
              scale = 0.55;
              opacity = 0.35;
              blur = 'blur(3px)';
              translateY = '15px';
            }

            return (
              <motion.button
                key={proj.id}
                onClick={() => onSelectProject(proj.id)}
                whileHover={{ scale: scale * 1.1, opacity: 0.9, filter: 'blur(0px)' }}
                style={{
                  transform: `scale(${scale}) translateY(${translateY})`,
                  opacity,
                  filter: blur,
                }}
                className="pointer-events-auto cursor-pointer p-3 rounded-2xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,245,255,0.15)] flex items-center gap-3 transition-all duration-500 hover:border-cyan-400 group max-w-[200px]"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center font-bold text-xs text-cyan-300 group-hover:bg-cyan-900 shrink-0">
                  {proj.doorNumber}
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider truncate">
                    {proj.categoryName}
                  </div>
                  <div className="text-xs font-black text-white group-hover:text-cyan-300 truncate uppercase">
                    {proj.shortName}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 4. MAIN HERO ACTIVE PROJECT CONTAINER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          initial={{
            opacity: 0,
            scale: 0.92,
            y: 20,
            filter: 'blur(10px)',
          }}
          animate={{
            opacity: isTransitioning ? 0.35 : 1,
            scale: isTransitioning ? 0.94 : 1,
            y: 0,
            filter: isTransitioning ? 'blur(6px)' : 'blur(0px)',
          }}
          exit={{
            opacity: 0,
            scale: 0.92,
            y: -20,
            filter: 'blur(10px)',
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${-mouseParallax.y * 0.15}deg) rotateY(${mouseParallax.x * 0.15}deg)`,
          }}
          className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-4 sm:p-6 md:p-8 rounded-3xl bg-slate-950/85 border border-cyan-500/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,245,255,0.22)] transition-transform duration-200 ease-out"
        >
          {/* LEFT: HERO Screenshot Frame (Flat, readable, centered, visually dominant ~60% width) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[280px] sm:min-h-[400px]">
            <div className="relative w-full h-full rounded-2xl border border-cyan-500/45 bg-black overflow-hidden shadow-[0_0_40px_rgba(0,245,255,0.25)] flex flex-col group">
              {/* Corner Tech Accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

              {/* Window Header */}
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-cyan-900/60 bg-slate-900/95 text-[11px] text-cyan-300">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-slate-400 border-l border-slate-800 pl-2.5 text-[10px] font-mono uppercase">
                    ORBIT // {activeProject.shortName}
                  </span>
                </div>

                <button
                  onClick={() => setIsZoomed(true)}
                  className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer p-1 rounded hover:bg-cyan-950/50"
                  title="Expand Fullscreen View"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Real Project UI Screenshot */}
              <div className="relative flex-1 w-full bg-black flex items-center justify-center overflow-hidden p-1">
                <ProjectScreenshotFrame
                  project={activeProject}
                  isTransitioning={isTransitioning}
                  className="w-full h-full max-h-[460px] object-contain"
                />

                {/* Particle Flow Sweep Effect */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.4, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none shadow-[0_0_20px_rgba(0,245,255,0.8)] z-20"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Project Metadata & Real Tech Stack (~40% width) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div>
              {/* Category & Signal Tag */}
              <div className="flex items-center justify-between text-xs text-cyan-400 mb-2">
                <span className="tracking-widest font-bold uppercase flex items-center gap-1.5">
                  <Orbit className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{signalTag}</span>
                </span>
                <span className="text-cyan-300 font-bold text-xs bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-full font-mono shadow-[0_0_10px_rgba(0,245,255,0.2)]">
                  {formatNumber(currentIndex + 1)} / {formatNumber(totalProjects)}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wide uppercase drop-shadow-[0_0_25px_rgba(0,245,255,0.3)]">
                {activeProject.title}
              </h2>

              {/* Tagline */}
              <p className="text-xs font-bold text-cyan-300/95 tracking-wider uppercase mt-1">
                "{activeProject.tagline}"
              </p>

              {/* Short Description */}
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {activeProject.description}
              </p>
            </div>

            {/* Real Technology Stack */}
            <ProjectFlowTechStack
              projectId={activeProject.id}
              techStack={activeProject.techStack}
            />

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-cyan-900/60">
              <a
                href={activeProject.liveUrl || activeProject.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-300 text-slate-950 font-black text-xs hover:brightness-110 transition-all shadow-[0_0_25px_rgba(0,245,255,0.45)] cursor-pointer tracking-wider"
              >
                <span>VIEW PROJECT →</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900/90 border border-cyan-800/70 text-cyan-300 text-xs font-bold hover:border-cyan-400 hover:bg-cyan-950/70 transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>VIEW SOURCE</span>
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 5. FULLSCREEN ZOOM MODAL */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden border border-cyan-500/60 bg-slate-950 shadow-[0_0_50px_rgba(0,245,255,0.3)]">
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-900/90 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-950 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-4 bg-black flex items-center justify-center">
                <ProjectScreenshotFrame project={activeProject} className="w-full max-h-[80vh]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectOrbitPresentation;
