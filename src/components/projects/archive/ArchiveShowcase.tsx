import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../../../data/projectsData';
import { ArchiveTechnologyStack } from './ArchiveTechnologyStack';
import {
  ExternalLink,
  Github,
  Maximize2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

interface ArchiveShowcaseProps {
  project: ProjectItem;
  currentIndex: number;
  totalProjects: number;
  onPrevProject: () => void;
  onNextProject: () => void;
  onBackToArchive?: () => void;
  isTransitioning?: boolean;
}

export const ArchiveShowcase: React.FC<ArchiveShowcaseProps> = ({
  project,
  currentIndex,
  totalProjects,
  onPrevProject,
  onNextProject,
  onBackToArchive,
  isTransitioning = false,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onPrevProject();
      } else if (e.key === 'ArrowRight') {
        onNextProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrevProject, onNextProject]);

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 my-2 z-20 font-mono">
        {/* Top Controls Bar: Back to Archive & Previous/Next */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-cyan-900/40">
          {onBackToArchive ? (
            <button
              onClick={onBackToArchive}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/40 text-cyan-300 text-xs hover:bg-cyan-950/80 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← BACK TO ARCHIVE</span>
            </button>
          ) : (
            <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>ARCHIVED SYSTEM RECORD</span>
            </div>
          )}

          {/* Prev / Next Compact Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevProject}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-cyan-800/60 text-cyan-300 text-xs hover:border-cyan-400 hover:bg-cyan-950 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PREVIOUS</span>
            </button>

            <span className="text-xs text-slate-400 px-1 font-bold">
              {formatNumber(currentIndex + 1)} / {formatNumber(totalProjects)}
            </span>

            <button
              onClick={onNextProject}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-cyan-800/60 text-cyan-300 text-xs hover:border-cyan-400 hover:bg-cyan-950 transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">NEXT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Showcase Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch p-4 rounded-2xl bg-slate-950/75 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_40px_rgba(0,245,255,0.12)]">
          {/* LEFT / CENTER: Large Hero Screenshot Frame (~60% / 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[320px] sm:min-h-[400px]">
            <div className="relative w-full h-full rounded-2xl border border-cyan-500/40 bg-black overflow-hidden shadow-[0_0_30px_rgba(0,245,255,0.15)] flex flex-col group">
              {/* Corner Tech Accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

              {/* Top Frame Status Bar */}
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-cyan-900/50 bg-slate-900/80 text-[11px] text-cyan-300">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-slate-400 border-l border-slate-800 pl-2 text-[10px]">
                    ARCHIVE ID // {project.shortName.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3" />
                    <span>VERIFIED ARCHIVE</span>
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

              {/* Screenshot Image Container */}
              <div className="relative flex-1 w-full bg-black flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={project.id}
                    src={project.image}
                    alt={project.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{
                      opacity: isTransitioning ? 0.3 : 1,
                      scale: isTransitioning ? 0.98 : 1,
                    }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </AnimatePresence>

                {/* Subtle Single Scanline Movement */}
                <motion.div
                  initial={{ top: '-10%' }}
                  animate={{ top: '110%' }}
                  transition={{ duration: 2.2, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none shadow-[0_0_15px_rgba(0,245,255,0.8)] z-20"
                />

                {/* Hover Live Demo Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-30 backdrop-blur-sm">
                  <a
                    href={project.liveUrl || project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,245,255,0.6)] cursor-pointer"
                  >
                    <span>VIEW LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setIsZoomed(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/90 border border-cyan-500/50 text-cyan-300 text-xs hover:border-cyan-400 transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>FULL VIEW</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Project Information & Real Tech Logos (~40% / 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div>
              {/* Number & Category */}
              <div className="flex items-center justify-between text-xs text-cyan-400/80 mb-1">
                <span className="tracking-widest font-semibold uppercase">
                  {project.category}
                </span>
                <span className="text-cyan-300 font-bold text-sm">
                  {formatNumber(currentIndex + 1)} / {formatNumber(totalProjects)}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase drop-shadow-[0_0_15px_rgba(0,245,255,0.2)]">
                {project.title}
              </h2>

              {/* Description */}
              <p className="mt-2 text-xs text-slate-300 leading-relaxed font-sans">
                {project.description}
              </p>

              {/* Features Badges */}
              {project.features && project.features.length > 0 && (
                <div className="mt-3">
                  <span className="text-[10px] text-cyan-400 font-semibold tracking-wider uppercase block mb-1.5">
                    KEY CAPABILITIES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.features.map((feat) => (
                      <span
                        key={feat}
                        className="px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40 text-[10px] text-cyan-200"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tech Stack with Real Logos */}
            <ArchiveTechnologyStack
              projectId={project.id}
              techStack={project.techStack}
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-cyan-900/40">
              <a
                href={project.liveUrl || project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-[0_0_18px_rgba(0,245,255,0.4)] cursor-pointer"
              >
                <span>VIEW LIVE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900/90 border border-cyan-800/60 text-cyan-300 text-xs hover:border-cyan-400 hover:bg-cyan-950/60 transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>VIEW SOURCE</span>
              </a>
            </div>
          </div>
        </div>
      </div>

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

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full max-h-[85vh] object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
