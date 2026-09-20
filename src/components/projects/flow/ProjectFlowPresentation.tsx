import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectScreenshotFrame } from '../ProjectScreenshotFrame';
import { ProjectFlowTechStack } from './ProjectFlowTechStack';
import { ExternalLink, Github, Sparkles, Maximize2, X } from 'lucide-react';

interface ProjectFlowPresentationProps {
  project: ProjectItem;
  currentIndex: number;
  totalProjects: number;
  direction?: 'forward' | 'backward';
  isTransitioning?: boolean;
}

const PROJECT_SIGNALS: Record<string, string> = {
  'speed-taxi': 'MOBILITY SIGNAL',
  'swayam-2': 'KNOWLEDGE SIGNAL',
  'resume-forge': 'CAREER SIGNAL',
  'wildlife-ai': 'SAFETY SIGNAL',
  'nk-mern-cli': 'DEVELOPER SIGNAL',
};

export const ProjectFlowPresentation: React.FC<ProjectFlowPresentationProps> = ({
  project,
  currentIndex,
  totalProjects,
  direction = 'forward',
  isTransitioning = false,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const signalTag = PROJECT_SIGNALS[project.id] || 'MOTION SIGNAL';
  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);
  const xOffset = direction === 'forward' ? 45 : -45;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-2 z-20 font-mono">
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{
            opacity: 0,
            scale: 0.94,
            x: xOffset,
            filter: 'blur(10px)',
          }}
          animate={{
            opacity: isTransitioning ? 0.35 : 1,
            scale: isTransitioning ? 0.94 : 1,
            x: 0,
            filter: isTransitioning ? 'blur(6px)' : 'blur(0px)',
          }}
          exit={{
            opacity: 0,
            scale: 0.94,
            x: -xOffset,
            filter: 'blur(10px)',
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch p-4 sm:p-6 rounded-3xl bg-slate-950/80 border border-cyan-500/35 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,245,255,0.18)]"
        >
          {/* LEFT: HERO Screenshot Frame (~60% visual weight / 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[420px]">
            <div className="relative w-full h-full rounded-2xl border border-cyan-500/40 bg-black overflow-hidden shadow-[0_0_35px_rgba(0,245,255,0.2)] flex flex-col group">
              {/* Corner Tech Accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

              {/* Window Header */}
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-cyan-900/60 bg-slate-900/90 text-[11px] text-cyan-300">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-slate-400 border-l border-slate-800 pl-2.5 text-[10px]">
                    FLOW // {project.shortName.toUpperCase()}
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
                  project={project}
                  isTransitioning={isTransitioning}
                  className="w-full h-full max-h-[480px] object-contain"
                />

                {/* Particle Flow Sweep Effect */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none shadow-[0_0_20px_rgba(0,245,255,0.8)] z-20"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Project Metadata & Real Tech Stack (~40% weight / 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div>
              {/* Category & Signal Tag */}
              <div className="flex items-center justify-between text-xs text-cyan-400 mb-1.5">
                <span className="tracking-widest font-bold uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{signalTag}</span>
                </span>
                <span className="text-cyan-300 font-bold text-xs bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                  {formatNumber(currentIndex + 1)} / {formatNumber(totalProjects)}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide uppercase drop-shadow-[0_0_20px_rgba(0,245,255,0.25)]">
                {project.title}
              </h2>

              {/* Tagline */}
              <p className="text-xs font-bold text-cyan-300/90 tracking-wider uppercase mt-1">
                "{project.tagline}"
              </p>

              {/* Short Description */}
              <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {project.description}
              </p>

              {/* Key Features Badges */}
              {project.features && project.features.length > 0 && (
                <div className="mt-3.5">
                  <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase block mb-1.5">
                    KEY CAPABILITIES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.features.slice(0, 4).map((feat) => (
                      <span
                        key={feat}
                        className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-800/50 text-[10px] text-cyan-200"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Real Technology Stack */}
            <ProjectFlowTechStack
              projectId={project.id}
              techStack={project.techStack}
            />

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-cyan-900/50">
              <a
                href={project.liveUrl || project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-extrabold text-xs hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,245,255,0.4)] cursor-pointer"
              >
                <span>VIEW PROJECT →</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-800/60 text-cyan-300 text-xs font-bold hover:border-cyan-400 hover:bg-cyan-950/60 transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>VIEW SOURCE</span>
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Full View Modal */}
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
                <ProjectScreenshotFrame project={project} className="w-full max-h-[80vh]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
