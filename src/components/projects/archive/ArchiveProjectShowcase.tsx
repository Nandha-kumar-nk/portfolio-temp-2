import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectScreenshotFrame } from '../ProjectScreenshotFrame';
import { ArchiveTechnologyStack } from './ArchiveTechnologyStack';
import {
  ExternalLink,
  Github,
  Maximize2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

interface ArchiveProjectShowcaseProps {
  project: ProjectItem;
  currentIndex: number;
  totalProjects: number;
  onPrevProject: () => void;
  onNextProject: () => void;
  onCloseShowcase: () => void;
  isTransitioning?: boolean;
}

export const ArchiveProjectShowcase: React.FC<ArchiveProjectShowcaseProps> = ({
  project,
  currentIndex,
  totalProjects,
  onPrevProject,
  onNextProject,
  onCloseShowcase,
  isTransitioning = false,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onPrevProject();
      } else if (e.key === 'ArrowRight') {
        onNextProject();
      } else if (e.key === 'Escape') {
        onCloseShowcase();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrevProject, onNextProject, onCloseShowcase]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        onNextProject(); // Swipe Left -> Next
      } else {
        onPrevProject(); // Swipe Right -> Prev
      }
    }
    setTouchStartX(null);
  };

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full max-w-7xl mx-auto px-4 my-2 z-20 font-mono"
      >
        {/* Top Controls Bar: Back to Archive & Previous/Next */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-900/50">
          <button
            onClick={onCloseShowcase}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-900/80 hover:border-cyan-400 transition-all shadow-[0_0_12px_rgba(0,245,255,0.15)] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>← BACK TO ARCHIVE</span>
          </button>

          {/* Prev / Next Compact Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevProject}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-800/60 text-cyan-300 text-xs hover:border-cyan-400 hover:bg-cyan-950 transition-colors cursor-pointer"
              title="Previous Project (Left Arrow)"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PREVIOUS</span>
            </button>

            <span className="text-xs text-slate-300 px-1 font-bold">
              {formatNumber(currentIndex + 1)} / {formatNumber(totalProjects)}
            </span>

            <button
              onClick={onNextProject}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-800/60 text-cyan-300 text-xs hover:border-cyan-400 hover:bg-cyan-950 transition-colors cursor-pointer"
              title="Next Project (Right Arrow)"
            >
              <span className="hidden sm:inline">NEXT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Showcase Layout Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: isTransitioning ? 0.3 : 1, scale: isTransitioning ? 0.98 : 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/35 backdrop-blur-2xl shadow-[0_0_45px_rgba(0,245,255,0.15)]"
          >
            {/* LEFT / CENTER: Large Hero Screenshot Frame (~60% / 7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[280px] sm:min-h-[380px]">
              <div className="relative w-full h-full rounded-2xl border border-cyan-500/40 bg-black overflow-hidden shadow-[0_0_35px_rgba(0,245,255,0.18)] flex flex-col group">
                {/* Corner Tech Accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

                {/* Top Frame Status Bar */}
                <div className="flex items-center justify-between px-3.5 py-2 border-b border-cyan-900/60 bg-slate-900/90 text-[11px] text-cyan-300">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-slate-400 border-l border-slate-800 pl-2.5 text-[10px]">
                      SYSTEM PREVIEW // {project.shortName.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" />
                      <span>VERIFIED SYSTEM</span>
                    </span>

                    <button
                      onClick={() => setIsZoomed(true)}
                      className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer p-1 rounded hover:bg-cyan-950/50"
                      title="Expand View"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Real UI Screenshot Frame */}
                <div className="relative flex-1 w-full bg-black flex items-center justify-center overflow-hidden p-1">
                  <ProjectScreenshotFrame
                    project={project}
                    isTransitioning={isTransitioning}
                    className="w-full h-full"
                  />

                  {/* Single Scan Line Pass on Load */}
                  <motion.div
                    initial={{ top: '-10%' }}
                    animate={{ top: '110%' }}
                    transition={{ duration: 2.0, ease: 'easeInOut' }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none shadow-[0_0_15px_rgba(0,245,255,0.9)] z-20"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-30 backdrop-blur-sm">
                    <a
                      href={project.liveUrl || project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,245,255,0.6)] cursor-pointer"
                    >
                      <span>VIEW LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => setIsZoomed(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-cyan-500/50 text-cyan-300 text-xs hover:border-cyan-400 transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>FULL VIEW</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Project Information & Real Tech Stack (~40% / 5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div>
                {/* Number & Category */}
                <div className="flex items-center justify-between text-xs text-cyan-400 mb-1">
                  <span className="tracking-widest font-semibold uppercase">
                    {project.category}
                  </span>
                  <span className="text-cyan-300 font-bold text-sm">
                    {formatNumber(currentIndex + 1)} / {formatNumber(totalProjects)}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide uppercase drop-shadow-[0_0_18px_rgba(0,245,255,0.25)]">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Key Features Badges */}
                {project.features && project.features.length > 0 && (
                  <div className="mt-3.5">
                    <span className="text-[10px] text-cyan-400 font-bold tracking-wider uppercase block mb-1.5">
                      KEY CAPABILITIES
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.features.map((feat) => (
                        <span
                          key={feat}
                          className="px-2.5 py-1 rounded-lg bg-cyan-950/50 border border-cyan-800/50 text-[10px] text-cyan-200"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Technology Stack with Authentic Logos */}
              <ArchiveTechnologyStack
                projectId={project.id}
                techStack={project.techStack}
              />

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-3.5 border-t border-cyan-900/50">
                <a
                  href={project.liveUrl || project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,245,255,0.4)] cursor-pointer"
                >
                  <span>VIEW LIVE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-800/60 text-cyan-300 text-xs hover:border-cyan-400 hover:bg-cyan-950/60 transition-colors cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>VIEW SOURCE</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

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
    </>
  );
};
