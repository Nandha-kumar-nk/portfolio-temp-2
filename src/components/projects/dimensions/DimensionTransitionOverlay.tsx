import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { soundEngine } from '../../../utils/audio';

interface DimensionTransitionOverlayProps {
  accentColor?: string;
  nextProjectTitle: string;
  onComplete: () => void;
}

export const DimensionTransitionOverlay: React.FC<DimensionTransitionOverlayProps> = ({
  accentColor = '#00f5ff',
  nextProjectTitle,
  onComplete,
}) => {
  useEffect(() => {
    try {
      soundEngine.playChime(750, 1.4);
    } catch {
      // ignore
    }

    const timer = setTimeout(() => {
      onComplete();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden pointer-events-auto">
      {/* Background Energy Particle Zoom Trails */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 2.2, 6], opacity: [0, 1, 0.8] }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 rounded-full filter blur-2xl"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, rgba(0,245,255,0.4) 30%, rgba(2,8,23,0) 70%)`,
        }}
      />

      {/* Expanding Energy Wave Rings */}
      <motion.div
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{ scale: [0.1, 1.8, 4.5], opacity: [0, 1, 0] }}
        transition={{ duration: 1.1, ease: 'easeIn' }}
        className="absolute w-[500px] h-[500px] rounded-full border-4 border-cyan-400/80 shadow-[0_0_80px_rgba(0,245,255,0.8)]"
      />

      {/* Center Label Reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.1, 1.8] }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        className="relative z-10 text-center flex flex-col items-center px-6"
      >
        <span className="font-mono text-xs font-black tracking-[0.3em] text-cyan-300 uppercase mb-2">
          MATERIALIZING DIMENSION
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-[0_0_25px_rgba(0,245,255,0.9)]">
          {nextProjectTitle}
        </h2>
      </motion.div>

      {/* Final Flash Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.9, 0] }}
        transition={{ duration: 1.2, times: [0, 0.6, 0.85, 1] }}
        className="absolute inset-0 bg-cyan-100 mix-blend-overlay pointer-events-none"
      />
    </div>
  );
};
