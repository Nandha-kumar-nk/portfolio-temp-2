import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { CodexLeftPage } from './CodexLeftPage';
import { CodexRightPage } from './CodexRightPage';

interface CodexBookProps {
  project: ProjectItem;
  chapterIndex: number;
  totalChapters: number;
  direction: 'next' | 'prev';
  onExpandScreenshot?: () => void;
}

export const CodexBook: React.FC<CodexBookProps> = ({
  project,
  chapterIndex,
  totalChapters,
  direction,
  onExpandScreenshot,
}) => {
  // Digital Page Turn Animation Variants
  const isNext = direction === 'next';

  const pageVariants = {
    initial: {
      rotateY: isNext ? 35 : -35,
      opacity: 0,
      scale: 0.96,
      filter: 'brightness(0.5) blur(4px)',
    },
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      filter: 'brightness(1) blur(0px)',
      transition: {
        duration: 0.85,
        ease: 'easeInOut' as const,
      },
    },
    exit: {
      rotateY: isNext ? -35 : 35,
      opacity: 0,
      scale: 0.96,
      filter: 'brightness(0.4) blur(4px)',
      transition: {
        duration: 0.65,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto my-4 px-2 sm:px-4 perspective-[1400px]">
      {/* Soft Ambient Atmospheric Glow behind Codex */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-purple-600/10 rounded-3xl filter blur-3xl opacity-60 pointer-events-none" />

      {/* Main 3D Floating Codex Structure */}
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full min-h-[580px] sm:min-h-[600px] grid grid-cols-1 md:grid-cols-2 rounded-3xl bg-[#030919]/90 border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,245,255,0.1)] backdrop-blur-xl overflow-hidden"
        >
          {/* Subtle Metallic Top Edge Highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent z-20 pointer-events-none" />

          {/* Central Book Spine Divider */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-slate-950/80 via-cyan-950/40 to-slate-950/80 hidden md:block z-20 pointer-events-none border-x border-cyan-500/20" />

          {/* Animated Light Sweep Glare Line during Page Flip */}
          <motion.div
            initial={{ x: isNext ? '-100%' : '100%', opacity: 0.8 }}
            animate={{ x: isNext ? '200%' : '-200%', opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent skew-x-12 pointer-events-none z-30"
          />

          {/* Left Page (Chapter Info & Tech Stack) */}
          <div className="relative z-10 h-full">
            <CodexLeftPage
              project={project}
              chapterIndex={chapterIndex}
              totalChapters={totalChapters}
            />
          </div>

          {/* Right Page (Actual Project Screenshot) */}
          <div className="relative z-10 h-full">
            <CodexRightPage
              project={project}
              onExpandScreenshot={onExpandScreenshot}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
