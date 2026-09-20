import React from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { PROJECT_ASSETS } from '../cube/projectAssets';
import { TechLogoItem } from '../TechIconSystem';
import { ExternalLink, Github, Maximize2 } from 'lucide-react';

interface ProjectSheetProps {
  project: ProjectItem;
  chapterIndex: number;
  totalChapters: number;
  direction: 'next' | 'prev';
  onFullscreen?: () => void;
}

export const ProjectSheet: React.FC<ProjectSheetProps> = ({
  project,
  chapterIndex,
  totalChapters,
  direction,
  onFullscreen,
}) => {
  const chapterNumber = String(chapterIndex + 1).padStart(2, '0');
  const totalStr = String(totalChapters).padStart(2, '0');

  const asset = PROJECT_ASSETS[project.id] || PROJECT_ASSETS['speed-taxi'];
  const screenshotUrl = asset?.dataUrl || project.image || project.screenshot;

  const isNext = direction === 'next';

  // Motion variants for sheet particle dissolve / form feel
  const sheetVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      x: isNext ? 30 : -30,
      filter: 'blur(8px)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: 'easeOut' as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      x: isNext ? -30 : 30,
      filter: 'blur(8px)',
      transition: {
        duration: 0.5,
        ease: 'easeIn' as const,
      },
    },
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-4 px-2 sm:px-4">
      {/* Soft Cyan Glow Ambient Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-3xl filter blur-3xl opacity-50 pointer-events-none" />

      {/* Floating Project Sheet Surface */}
      <motion.div
        variants={sheetVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative w-full rounded-3xl bg-[#030919]/80 border border-cyan-500/25 p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(0,245,255,0.08)] backdrop-blur-2xl overflow-hidden select-none"
      >
        {/* Subtle Corner Ticks Accent */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400/80 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-400/80 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80 rounded-br-sm pointer-events-none" />

        {/* Huge Low-Opacity Background Number for Depth */}
        <div className="absolute -top-10 -right-4 text-[160px] sm:text-[240px] md:text-[280px] font-mono font-black text-cyan-500/10 pointer-events-none leading-none select-none z-0">
          {chapterNumber}
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col space-y-6">
          {/* Top Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-bold tracking-widest shadow-[0_0_12px_rgba(0,245,255,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {chapterNumber} / {totalStr}
            </div>

            <span className="text-xs font-mono text-slate-400 tracking-wider uppercase font-semibold">
              {project.category}
            </span>
          </div>

          {/* Project Title & Tagline */}
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-cyan-400 font-bold tracking-wide uppercase">
              {project.tagline}
            </p>
          </div>

          {/* HERO: Actual Project Screenshot (Sharp, Flat, Undistorted, Original Aspect Ratio) */}
          <div className="relative w-full rounded-2xl bg-[#020815]/90 border border-cyan-500/30 p-2 sm:p-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group">
            <img
              src={screenshotUrl}
              alt={`${project.title} Actual Screenshot`}
              className="w-full h-auto max-h-[460px] sm:max-h-[500px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.008]"
              loading="eager"
            />

            {/* Hover Fullscreen Overlay */}
            {onFullscreen && (
              <button
                onClick={onFullscreen}
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-400/50 text-cyan-300 text-xs font-mono flex items-center gap-1.5 shadow-xl hover:bg-cyan-950"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>FULLSCREEN</span>
              </button>
            )}
          </div>

          {/* Short Description (2-3 lines max) */}
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-sans max-w-3xl">
            {project.description}
          </p>

          {/* Compact Technology Row & Action Links */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-800/80">
            {/* Tech Icons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold mr-1">
                TECH:
              </span>
              {project.techStack.map((tech, idx) => (
                <TechLogoItem key={`${tech.name}-${idx}`} name={tech.name} size="sm" showLabel={true} />
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 via-cyan-500/30 to-blue-600/30 border border-cyan-400/50 text-cyan-200 text-xs font-mono font-bold tracking-wider hover:text-white hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.35)] transition-all duration-300 active:scale-95"
                >
                  <span>VIEW PROJECT</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-300 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 text-xs font-mono font-semibold tracking-wider hover:text-white hover:border-slate-500 hover:bg-slate-800/90 transition-all duration-300 active:scale-95"
                >
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <span>SOURCE</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
