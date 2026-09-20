import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { PROJECT_ASSETS } from './projectAssets';
import { ProjectEnergyPlatform } from './ProjectEnergyPlatform';

interface ProjectHolographicDisplayProps {
  project: ProjectItem;
  isMobile?: boolean;
  direction?: number;
  prefersReducedMotion?: boolean;
  currentIndex?: number;
  totalProjects?: number;
  isTransitioning?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}

// Special Project Worlds atmospheric styling
const WORLD_ATMOSPHERES: Record<string, { color: string; shadow: string; border: string; glowBg: string }> = {
  'swayam-2': {
    color: '#00f5ff',
    shadow: 'rgba(0, 245, 255, 0.25)',
    border: 'rgba(0, 245, 255, 0.45)',
    glowBg: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)',
  },
  'resume-forge': {
    color: '#a855f7',
    shadow: 'rgba(168, 85, 247, 0.25)',
    border: 'rgba(168, 85, 247, 0.45)',
    glowBg: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
  },
  'speed-taxi': {
    color: '#3b82f6',
    shadow: 'rgba(59, 130, 246, 0.25)',
    border: 'rgba(59, 130, 246, 0.45)',
    glowBg: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
  },
  'ai-wildlife': {
    color: '#10b981',
    shadow: 'rgba(16, 185, 129, 0.25)',
    border: 'rgba(16, 185, 129, 0.45)',
    glowBg: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
  },
  'nk-mern-cli': {
    color: '#06b6d4',
    shadow: 'rgba(6, 182, 212, 0.25)',
    border: 'rgba(6, 182, 212, 0.45)',
    glowBg: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
  },
};

export const ProjectHolographicDisplay: React.FC<ProjectHolographicDisplayProps> = ({
  project,
  isMobile = false,
  direction = 1,
  prefersReducedMotion = false,
  currentIndex = 0,
  totalProjects = 5,
  isTransitioning = false,
  onPrev,
  onNext,
}) => {
  // Parallax state for mouse hover on desktop
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Mouse Drag navigation tracking for desktop
  const dragStartXRef = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    dragStartXRef.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isMobile || !isDragging) return;
    setIsDragging(false);
    const deltaX = dragStartXRef.current - e.clientX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0 && onNext) {
        onNext(); // Dragged left -> Next
      } else if (deltaX < 0 && onPrev) {
        onPrev(); // Dragged right -> Prev
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Cap tilt angle strictly: Y max ±1.5 deg, X max ±2.5 deg
    setRotateX((-y / (rect.height / 2)) * 1.5);
    setRotateY((x / (rect.width / 2)) * 2.5);
  };

  const handleMouseEnter = () => {
    if (!isMobile) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
    setIsDragging(false);
  };

  // Asset lookup for real project preview image or high-res asset
  const asset = PROJECT_ASSETS[project.id] || PROJECT_ASSETS['swayam-2'];
  const screenshotUrl = asset?.dataUrl || project.image;

  // Atmospheric World Theme
  const atmosphere = WORLD_ATMOSPHERES[project.id] || WORLD_ATMOSPHERES['swayam-2'];
  const formattedIndex = project.doorNumber || `0${currentIndex + 1}`;

  // Directional variants for transition
  const isNext = direction >= 0;

  // Cinematic Portal & World Transfer Transition Variants
  const desktopVariants = {
    initial: {
      x: isNext ? 55 : -55,
      scale: 0.94,
      opacity: 0,
      filter: 'brightness(1.2) blur(1px)',
    },
    animate: {
      x: 0,
      scale: 1,
      opacity: 1,
      filter: 'brightness(1) blur(0px)',
    },
    exit: {
      x: isNext ? -55 : 55,
      scale: 0.94,
      opacity: 0,
      filter: 'brightness(1.2) blur(1px)',
    },
  };

  // Mobile 2D Slide Transition Variants
  const mobileVariants = {
    initial: {
      x: isNext ? 30 : -30,
      opacity: 0,
      scale: 0.97,
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      x: isNext ? -30 : 30,
      opacity: 0,
      scale: 0.97,
    },
  };

  // Reduced Motion Variants
  const reducedMotionVariants = {
    initial: { opacity: 0, x: isNext ? 10 : -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isNext ? -10 : 10 },
  };

  const activeVariants = prefersReducedMotion
    ? reducedMotionVariants
    : isMobile
    ? mobileVariants
    : desktopVariants;

  return (
    <div
      id="holographic-project-display"
      className="relative w-full flex flex-col items-center justify-center select-none"
    >
      {/* Background World Atmospheric Ambient Backlight & Project-Specific Atmospheric World */}
      <div
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-30 scale-110"
        style={{ background: atmosphere.glowBg }}
      />

      {/* Project-Specific Atmospheric Background FX (behind screenshot frame) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        {project.id === 'swayam-2' && (
          /* Swayam: Floating cyan data particles */
          <div className="absolute w-full h-full opacity-40">
            <span className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-60" />
            <span className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-cyan-300 animate-pulse" />
            <span className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-cyan-500/40 blur-[1px]" />
            <span className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-cyan-200 animate-pulse" />
          </div>
        )}
        {project.id === 'resume-forge' && (
          /* Resume Forge: Subtle violet + cyan grid atmosphere */
          <div className="absolute w-full h-full opacity-30 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]" />
        )}
        {project.id === 'speed-taxi' && (
          /* Speed Taxi: Subtle animated route lines */
          <div className="absolute w-full h-full opacity-25 flex items-center justify-center">
            <svg className="w-full h-full max-w-lg" viewBox="0 0 400 200" fill="none">
              <path d="M 20,100 C 100,20 300,180 380,100" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 6" />
              <path d="M 40,140 C 140,180 260,20 360,120" stroke="#00f5ff" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>
        )}
        {project.id === 'ai-wildlife' && (
          /* AI Wildlife: Emerald + cyan organic floating particles */
          <div className="absolute w-full h-full opacity-35">
            <span className="absolute top-1/3 left-1/5 w-2 h-2 rounded-full bg-emerald-400 blur-[1px] animate-pulse" />
            <span className="absolute bottom-1/3 right-1/5 w-1.5 h-1.5 rounded-full bg-cyan-400 blur-[1px] animate-ping" />
            <span className="absolute top-1/2 right-1/3 w-2.5 h-2.5 rounded-full bg-emerald-300/40 blur-sm" />
          </div>
        )}
        {project.id === 'nk-mern-cli' && (
          /* NK MERN CLI: Teal + cyan terminal scanline grid */
          <div className="absolute w-full h-full opacity-25 bg-[linear-gradient(to_bottom,transparent_50%,rgba(6,182,212,0.15)_51%)] [background-size:100%_4px]" />
        )}
      </div>

      {/* Optional World Indicator Above Screenshot */}
      <div className="flex items-center gap-2 mb-2 z-10">
        <span
          className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_#00f5ff]"
          style={{ backgroundColor: atmosphere.color }}
        />
        <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-300 font-bold uppercase">
          PROJECT WORLD {formattedIndex} / 0{totalProjects}
        </span>
      </div>

      {/* ===================================================================== */}
      {/* HERO RECTANGULAR DEVICE FRAME & REAL SCREENSHOT                       */}
      {/* ===================================================================== */}
      <div
        className="relative w-full max-w-[380px] sm:max-w-[460px] lg:max-w-[540px] xl:max-w-[600px] flex flex-col items-center z-10"
        style={{ perspective: 1200 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* Floating Hero Frame Container */}
        <motion.div
          key={`frame-${project.id}`}
          initial={{ boxShadow: `0 0 24px ${atmosphere.shadow}`, borderColor: atmosphere.border }}
          animate={{
            y: isHovered ? -3 : [-2, 2, -2],
            boxShadow: isHovered || isTransitioning
              ? `0 0 35px ${atmosphere.shadow}`
              : `0 0 20px ${atmosphere.shadow}`,
            borderColor: isHovered || isTransitioning ? atmosphere.border : 'rgba(0, 245, 255, 0.35)',
          }}
          transition={{
            y: isHovered
              ? { duration: 0.25, ease: 'easeOut' }
              : { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            boxShadow: { duration: 0.4, ease: 'easeOut' },
            borderColor: { duration: 0.4, ease: 'easeOut' },
          }}
          style={{
            transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${
              isHovered ? 1.01 : 1
            })`,
            transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className={`relative w-full rounded-2xl overflow-hidden border bg-[#030a1d]/90 backdrop-blur-md p-1.5 sm:p-2 shadow-[0_0_25px_rgba(0,245,255,0.2)] ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {/* Futuristic Corner Detail Accents (┌ ┐ └ ┘) */}
          <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-30" />
          <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-30" />
          <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-30" />
          <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-30" />

          {/* Top-Left Live System Preview Status Indicator */}
          <div className="absolute top-3 left-4 z-30 flex items-center gap-1.5 bg-[#020817]/85 border border-cyan-500/30 px-2 py-0.5 rounded-md backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
              LIVE SYSTEM PREVIEW
            </span>
          </div>

          {/* Top-Right Project Number Badge */}
          <div className="absolute top-3 right-4 z-30 flex items-center gap-1.5 bg-[#020817]/85 border border-cyan-500/30 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-[0_0_8px_rgba(0,245,255,0.2)]">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: atmosphere.color }}
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={`label-${project.id}`}
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.25 }}
                className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-cyan-300 uppercase"
              >
                PROJECT {formattedIndex} / 0{totalProjects}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Screenshot Display Area with Portal / World Transfer Transition */}
          <div className="relative w-full aspect-[16/10] bg-[#020612] rounded-xl overflow-hidden flex items-center justify-center border border-slate-800/80 mt-6 sm:mt-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                variants={activeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: isMobile ? 0.45 : 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full h-full relative flex items-center justify-center p-1"
              >
                {/* Real Project Screenshot Image (Uncropped, Fully Readable, object-contain) */}
                <img
                  src={screenshotUrl}
                  alt={project.title}
                  className="w-full h-full object-contain object-center select-none pointer-events-none"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Glass Reflection Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/05 via-transparent to-white/08 pointer-events-none" />

                {/* Portal Energy Light Sweep Line (Left to Right or Right to Left) */}
                <motion.div
                  initial={{
                    left: isNext ? '-20%' : '120%',
                    opacity: 1,
                  }}
                  animate={{
                    left: isNext ? '120%' : '-20%',
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_#00f5ff] pointer-events-none z-20"
                />

                {/* Subtle Hover Shine */}
                {isHovered && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none transform -skew-x-12"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Futuristic Circular Energy Platform directly under screenshot */}
        <ProjectEnergyPlatform
          accentColor={atmosphere.color}
          isTransitioning={isTransitioning}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

