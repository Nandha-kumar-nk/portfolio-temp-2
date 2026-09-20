import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { soundEngine } from '../../../utils/audio';

interface DimensionTransitionProps {
  accentColor?: string;
  projectTitle: string;
  onComplete: () => void;
}

export const DimensionTransition: React.FC<DimensionTransitionProps> = ({
  accentColor = '#00f5ff',
  projectTitle,
  onComplete,
}) => {
  useEffect(() => {
    // Play cinematic portal enter sound
    try {
      soundEngine.playChime(660, 1.5);
    } catch {
      // ignore
    }

    // Sequence timer to complete portal zoom in 1.4 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 1400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden pointer-events-auto">
      {/* Background Energy Particle Zoom Trails */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 2.5, 8], opacity: [0, 1, 0.9] }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 rounded-full filter blur-2xl"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, rgba(0,245,255,0.4) 30%, rgba(2,8,23,0) 70%)`,
        }}
      />

      {/* Expanding Warp Tunnel Rings */}
      <motion.div
        initial={{ scale: 0.1, rotate: 0, opacity: 0 }}
        animate={{ scale: [0.1, 1.8, 5], rotate: [0, 180, 360], opacity: [0, 1, 0] }}
        transition={{ duration: 1.3, ease: 'easeIn' }}
        className="absolute w-[600px] h-[600px] rounded-full border-4 border-cyan-400/80 shadow-[0_0_100px_rgba(0,245,255,0.8)]"
      />

      {/* Center Camera Zoom Label */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 2], y: -20 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="relative z-10 text-center flex flex-col items-center px-6"
      >
        <span className="font-mono text-xs font-black tracking-[0.3em] text-cyan-300 uppercase mb-2">
          WARPING TO DIMENSION
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-[0_0_30px_rgba(0,245,255,0.9)]">
          {projectTitle}
        </h2>
      </motion.div>

      {/* Final Flash Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 0.95, 0] }}
        transition={{ duration: 1.4, times: [0, 0.6, 0.85, 0.95, 1] }}
        className="absolute inset-0 bg-cyan-100 mix-blend-overlay pointer-events-none"
      />
    </div>
  );
};
