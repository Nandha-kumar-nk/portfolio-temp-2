import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { PROJECT_ASSETS } from '../cube/projectAssets';
import { ProjectVoyageAtmosphere } from './ProjectVoyageAtmosphere';

interface ProjectVoyageCardProps {
  project: ProjectItem;
  index: number;
  activeIndex: number;
  totalProjects: number;
  isMobile: boolean;
  isTablet: boolean;
  isTransitioning: boolean;
  onSelect: (index: number) => void;
}

export const ProjectVoyageCard: React.FC<ProjectVoyageCardProps> = ({
  project,
  index,
  activeIndex,
  totalProjects,
  isMobile,
  isTablet,
  isTransitioning,
  onSelect,
}) => {
  const k = index - activeIndex; // Distance from active project (0 = center hero)
  const isCenter = k === 0;

  // Asset lookup for preview screenshot
  const asset = PROJECT_ASSETS[project.id] || PROJECT_ASSETS['swayam-2'];
  const screenshotUrl = asset?.dataUrl || project.image;
  const accentColor = project.accentColor || '#00f5ff';
  const formattedIndex = project.doorNumber || `0${index + 1}`;

  // =========================================================================
  // 3D HELICAL SPIRAL POSITIONAL MATH (CSS 3D perspective space)
  // =========================================================================
  let translateX = 0;
  let translateY = 0;
  let translateZ = 0;
  let rotateY = 0;
  let scale = 1;
  let opacity = 1;
  let blur = 0;

  if (isMobile) {
    // Dedicated Mobile Vertical Stack Position Calculations
    translateY = k * 180; // Vertical spacing
    translateX = Math.sin(k * 0.8) * 35; // Subtle S-curve horizontal wobble
    translateZ = -Math.abs(k) * 120;
    rotateY = -k * 8;
    scale = Math.max(0.72, 1 - Math.abs(k) * 0.18);
    opacity = isCenter ? 1 : Math.max(0.2, 0.65 - (Math.abs(k) - 1) * 0.25);
    blur = isCenter ? 0 : Math.min(6, Math.abs(k) * 2.5);
  } else if (isTablet) {
    // Tablet Intermediate Helical Curve
    translateY = k * 140;
    translateX = Math.sin(k * 0.6) * 110;
    translateZ = -Math.abs(k) * 180;
    rotateY = -k * 10;
    scale = Math.max(0.55, 1 - Math.abs(k) * 0.22);
    opacity = isCenter ? 1 : Math.max(0.15, 0.6 - (Math.abs(k) - 1) * 0.25);
    blur = isCenter ? 0 : Math.min(8, Math.abs(k) * 3);
  } else {
    // Desktop Full 3D Helical Spiral Curve
    translateY = k * 135; // Vertical spiral step
    translateX = Math.sin(k * 0.65) * 170; // Spiral radius oscillation
    translateZ = -Math.abs(k) * 220; // Z depth projection
    rotateY = -k * 12; // Y angle alignment along helical curve
    scale = Math.max(0.45, 1 - Math.abs(k) * 0.24);
    opacity = isCenter ? 1 : Math.max(0.1, 0.55 - (Math.abs(k) - 1) * 0.2);
    blur = isCenter ? 0 : Math.min(10, Math.abs(k) * 3.5);
  }

  const zIndex = 100 - Math.abs(k) * 10;

  return (
    <div
      className={`absolute transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        isCenter ? 'pointer-events-auto' : 'cursor-pointer hover:brightness-125'
      }`}
      style={{
        transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
        zIndex,
        width: isMobile ? '92vw' : isTablet ? '82vw' : '640px',
        maxWidth: isMobile ? '440px' : '680px',
      }}
      onClick={() => {
        if (!isCenter && !isTransitioning) {
          onSelect(index);
        }
      }}
    >
      {/* Central Project World Atmospheric Particles */}
      {isCenter && <ProjectVoyageAtmosphere projectId={project.id} accentColor={accentColor} />}

      {/* Floating Device Display Frame */}
      <div
        className={`relative w-full rounded-2xl border bg-[#030919]/90 backdrop-blur-md p-2 sm:p-3 transition-all duration-500 ${
          isCenter
            ? 'border-cyan-400/80 shadow-[0_0_35px_rgba(0,245,255,0.25)] ring-1 ring-cyan-500/40'
            : 'border-slate-800/80 shadow-[0_0_15px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Corner Detail Accents (┌ ┐ └ ┘) */}
        <span className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400/80 pointer-events-none z-30" />
        <span className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400/80 pointer-events-none z-30" />
        <span className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400/80 pointer-events-none z-30" />
        <span className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400/80 pointer-events-none z-30" />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-2 py-1 mb-1.5 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isCenter ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'
              }`}
              style={{ backgroundColor: isCenter ? accentColor : undefined }}
            />
            <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
              ● PROJECT PREVIEW
            </span>
          </div>

          <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-500/30">
            {formattedIndex} / 0{totalProjects}
          </span>
        </div>

        {/* Screenshot Viewport Area */}
        <div className="relative w-full aspect-[16/10] bg-[#020612] rounded-xl overflow-hidden flex items-center justify-center border border-slate-800/90">
          <img
            src={screenshotUrl}
            alt={project.title}
            className="w-full h-full object-contain object-center select-none pointer-events-none"
            loading="eager"
            referrerPolicy="no-referrer"
          />

          {/* Glass Glare Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/05 via-transparent to-white/08 pointer-events-none" />

          {/* Energy Light Scanline Sweep on Central Activation */}
          {isCenter && (
            <motion.div
              initial={{ left: '-20%', opacity: 1 }}
              animate={{ left: '120%', opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute top-0 bottom-0 w-1.5 bg-gradient-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_#00f5ff] pointer-events-none z-20"
            />
          )}
        </div>

        {/* Inactive Card Click Overlay */}
        {!isCenter && (
          <div className="absolute inset-0 rounded-2xl bg-slate-950/40 hover:bg-slate-950/10 transition-colors flex items-center justify-center">
            <span className="text-[10px] font-mono tracking-widest text-cyan-300 font-semibold uppercase bg-slate-900/90 border border-cyan-500/40 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(0,245,255,0.3)]">
              SELECT {formattedIndex}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
