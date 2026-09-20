import React from 'react';
import { motion } from 'motion/react';

interface ProjectEnergyPlatformProps {
  accentColor?: string;
  isTransitioning?: boolean;
  isMobile?: boolean;
}

export const ProjectEnergyPlatform: React.FC<ProjectEnergyPlatformProps> = ({
  accentColor = '#00f5ff',
  isTransitioning = false,
  isMobile = false,
}) => {
  return (
    <div className="relative w-full max-w-[480px] sm:max-w-[560px] h-[75px] sm:h-[95px] flex items-center justify-center select-none pointer-events-none -mt-4 sm:-mt-6 z-10">
      {/* Soft Holographic Ambient Light Beam Rising Up */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-[90px] rounded-full blur-2xl opacity-35 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at bottom, ${accentColor} 0%, rgba(0,245,255,0.08) 50%, transparent 80%)`,
        }}
      />

      {/* 3D Perspective Elliptical Platform Wrapper */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: 800, transformStyle: 'preserve-3d' }}
      >
        {/* Main 3D Tilting Ring Base */}
        <div
          className="relative w-full h-full flex items-center justify-center transition-all duration-500"
          style={{ transform: 'rotateX(72deg)' }}
        >
          {/* Outer Glowing Energy Ring */}
          <motion.div
            animate={{
              boxShadow: isTransitioning
                ? [`0 0 35px ${accentColor}`, `0 0 55px ${accentColor}`, `0 0 35px ${accentColor}`]
                : [`0 0 15px ${accentColor}40`, `0 0 25px ${accentColor}60`, `0 0 15px ${accentColor}40`],
              borderColor: isTransitioning ? accentColor : 'rgba(0, 245, 255, 0.4)',
            }}
            transition={{ duration: isTransitioning ? 0.4 : 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[92%] h-[92%] rounded-full border-2 border-cyan-400/50 flex items-center justify-center bg-[#020919]/60 backdrop-blur-sm"
          >
            {/* Concentric Inner Rotating Ring 1 (Clockwise) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: isTransitioning ? 6 : 24,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute w-[82%] h-[82%] rounded-full border border-dashed border-cyan-400/60"
            />

            {/* Concentric Inner Rotating Ring 2 (Counter-Clockwise) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: isTransitioning ? 4 : 16,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute w-[68%] h-[68%] rounded-full border border-cyan-300/40"
              style={{
                background: `radial-gradient(circle, ${accentColor}20 0%, transparent 75%)`,
              }}
            />

            {/* Core Energy Center Spot */}
            <motion.div
              animate={{
                scale: isTransitioning ? [1, 1.25, 1] : [1, 1.1, 1],
                opacity: isTransitioning ? [0.6, 1, 0.6] : [0.3, 0.6, 0.3],
              }}
              transition={{ duration: isTransitioning ? 0.35 : 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[44%] h-[44%] rounded-full bg-cyan-400/40 blur-md"
            />

            {/* Outer Ring Text Label (IDEAS • PROJECTS • REAL IMPACT) */}
            {!isMobile && (
              <div className="absolute inset-0 flex items-center justify-center text-[9px] font-mono tracking-[0.35em] text-cyan-300/80 uppercase font-bold">
                IDEAS &nbsp;•&nbsp; PROJECTS &nbsp;•&nbsp; REAL IMPACT
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
