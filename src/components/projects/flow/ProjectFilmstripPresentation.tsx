import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectScreenshotFrame } from '../ProjectScreenshotFrame';
import { ProjectFlowTechStack } from './ProjectFlowTechStack';
import { ExternalLink, Github, Film, Maximize2, X, Clapperboard } from 'lucide-react';

interface ProjectFilmstripPresentationProps {
  projects: ProjectItem[];
  currentIndex: number;
  onSelectProject: (id: string) => void;
  direction?: 'forward' | 'backward';
  isTransitioning?: boolean;
}

const PROJECT_SIGNALS: Record<string, string> = {
  'speed-taxi': 'REAL-TIME URBAN DISPATCH',
  'swayam-2': 'KNOWLEDGE NETWORK PLATFORM',
  'resume-forge': 'CAREER COMPLIANCE ENGINE',
  'wildlife-ai': 'SAFETY SENSOR MESH',
  'nk-mern-cli': 'ARCHITECTURE AUTOMATION',
};

export const ProjectFilmstripPresentation: React.FC<ProjectFilmstripPresentationProps> = ({
  projects,
  currentIndex,
  onSelectProject,
  direction = 'forward',
  isTransitioning = false,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  const activeProject = projects[currentIndex];
  const totalProjects = projects.length;
  const signalTag = PROJECT_SIGNALS[activeProject.id] || 'CINEMATIC FRAME';
  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  // Subtle 2-5px mouse parallax (no 3D rotation, no tilt)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseParallax({ x: x * 5, y: y * 5 });
  };

  const handleMouseLeave = () => {
    setMouseParallax({ x: 0, y: 0 });
  };

  // Filmstrip Slide Directions (Horizontal for desktop, Vertical for mobile)
  const xOffset = direction === 'forward' ? 80 : -80;
  const exitXOffset = direction === 'forward' ? -80 : 80;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-2 z-20 font-mono relative">
      {/* 1. HUGE SUBTLE BACKGROUND PROJECT NUMBER */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 overflow-hidden w-full text-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeProject.id}
            initial={{ opacity: 0, scale: 0.90, y: direction === 'forward' ? 20 : -20 }}
            animate={{ opacity: 0.07, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.10, y: direction === 'forward' ? -20 : 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[200px] sm:text-[280px] md:text-[360px] font-black text-cyan-400 tracking-tighter inline-block leading-none drop-shadow-[0_0_80px_rgba(0,245,255,0.3)]"
          >
            {activeProject.doorNumber}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* 2. CINEMATIC FILMSTRIP HEADER COUNTER */}
      <div className="flex items-center justify-between px-2 mb-3 z-20 relative">
        <div className="flex items-center gap-2 text-xs text-cyan-400 uppercase tracking-widest font-bold">
          <Clapperboard className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>FRAME {formatNumber(currentIndex + 1)} OF {formatNumber(totalProjects)}</span>
        </div>
        <div className="text-xs text-cyan-300 font-bold bg-cyan-950/80 border border-cyan-500/40 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(0,245,255,0.2)]">
          {signalTag}
        </div>
      </div>

      {/* 3. HERO ACTIVE FILMSTRIP FRAME CONTAINER */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeProject.id}
          initial={{
            opacity: 0,
            scale: 0.96,
            x: xOffset,
            filter: 'blur(8px)',
          }}
          animate={{
            opacity: isTransitioning ? 0.4 : 1,
            scale: isTransitioning ? 0.97 : 1,
            x: 0,
            filter: isTransitioning ? 'blur(4px)' : 'blur(0px)',
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
            x: exitXOffset,
            filter: 'blur(8px)',
          }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0px)`,
          }}
          className="relative z-20 flex flex-col gap-6 p-4 sm:p-6 md:p-8 rounded-3xl bg-slate-950/85 border border-cyan-500/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,245,255,0.2)] transition-transform duration-300 ease-out"
        >
          {/* TOP SECTION: Project Title & Number Badge */}
          <div className="text-center max-w-3xl mx-auto space-y-1">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-xs text-cyan-400 font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-2"
            >
              <span>SCENE {activeProject.doorNumber}</span>
              <span>•</span>
              <span>{activeProject.categoryName}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wide uppercase drop-shadow-[0_0_30px_rgba(0,245,255,0.35)]"
            >
              {activeProject.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}
              className="text-xs sm:text-sm font-bold text-cyan-300/95 tracking-wider uppercase"
            >
              "{activeProject.tagline}"
            </motion.p>
          </div>

          {/* MAIN HERO SCREENSHOT (Flat, Large, Sharp, Undistorted, Centered Hero) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.26, duration: 0.6 }}
            className="relative w-full max-w-4xl mx-auto rounded-2xl border border-cyan-500/50 bg-black overflow-hidden shadow-[0_0_50px_rgba(0,245,255,0.28)] flex flex-col group"
          >
            {/* Corner Filmstrip Notch Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

            {/* Filmstrip Frame Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-cyan-900/60 bg-slate-900/95 text-[11px] text-cyan-300">
              <div className="flex items-center gap-2">
                <Film className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-300 font-mono uppercase text-[10px] tracking-wider">
                  FILMSTRIP // FRAME {activeProject.doorNumber} — {activeProject.shortName}
                </span>
              </div>

              <button
                onClick={() => setIsZoomed(true)}
                className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer p-1 rounded hover:bg-cyan-950/50"
                title="Expand Fullscreen View"
                aria-label="Expand Screenshot Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Actual Screenshot Viewport */}
            <div className="relative flex-1 w-full bg-black flex items-center justify-center p-1 sm:p-2">
              <ProjectScreenshotFrame
                project={activeProject}
                isTransitioning={isTransitioning}
                className="w-full h-full max-h-[480px] object-contain rounded-lg"
              />

              {/* Smooth Cinematic Light Sweep */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent pointer-events-none z-20"
              />
            </div>
          </motion.div>

          {/* BOTTOM SECTION: Short Description, Real Tech Stack & Actions */}
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-4 text-center">
            {/* Short Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.5 }}
              className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto"
            >
              {activeProject.description}
            </motion.p>

            {/* Real Technology Icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.5 }}
              className="flex justify-center"
            >
              <ProjectFlowTechStack
                projectId={activeProject.id}
                techStack={activeProject.techStack}
              />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 pt-2"
            >
              <a
                href={activeProject.liveUrl || activeProject.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live project for ${activeProject.title}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-300 text-slate-950 font-black text-xs hover:brightness-110 transition-all shadow-[0_0_25px_rgba(0,245,255,0.4)] cursor-pointer tracking-wider"
              >
                <span>VIEW PROJECT →</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View GitHub repository for ${activeProject.title}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 border border-cyan-800/70 text-cyan-300 text-xs font-bold hover:border-cyan-400 hover:bg-cyan-950/70 transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>VIEW SOURCE</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 4. FULLSCREEN ZOOM MODAL */}
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
                aria-label="Close Fullscreen View"
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

export default ProjectFilmstripPresentation;
