import React from 'react';
import { motion } from 'framer-motion';

interface ProjectLensRingProps {
  currentNum: string;
  totalNum: string;
  isFocusing?: boolean;
  children: React.ReactNode;
}

export const ProjectLensRing: React.FC<ProjectLensRingProps> = ({
  currentNum,
  totalNum,
  isFocusing = false,
  children,
}) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 group font-mono">
      {/* Outer Glow Background Halo */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-cyan-500/10 blur-2xl pointer-events-none" />

      {/* Futuristic Circular Lens Mechanism Frame */}
      <div className="relative w-full h-full rounded-2xl border border-cyan-500/40 bg-slate-950/80 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,245,255,0.18)] overflow-hidden flex flex-col justify-between">
        {/* HUD Top Bar */}
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-cyan-900/60 bg-slate-900/90 text-[10px] text-cyan-300 z-20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold tracking-widest uppercase text-cyan-200">
              FOCUS SYSTEM // OPTICAL LENS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400">
              PROJECT {currentNum} / {totalNum}
            </span>
            <span className="hidden sm:inline text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded text-[9px] font-bold">
              IDEA DETECTED
            </span>
          </div>
        </div>

        {/* Center Optical Lens Container */}
        <div className="relative flex-1 w-full flex items-center justify-center p-2 sm:p-4 overflow-hidden">
          {/* Concentric Decorative SVG Lens Rings */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-40"
            viewBox="0 0 800 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Concentric Ring */}
            <circle
              cx="400"
              cy="250"
              r="230"
              stroke="#00f5ff"
              strokeWidth="1"
              strokeDasharray="4 8"
              className="animate-[spin_40s_linear_infinite]"
            />
            {/* Middle Rotating Ring */}
            <circle
              cx="400"
              cy="250"
              r="200"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="12 12"
              className="animate-[spin_25s_linear_infinite_reverse]"
            />
            {/* Inner Ring */}
            <circle
              cx="400"
              cy="250"
              r="170"
              stroke="#00f5ff"
              strokeWidth="0.8"
              opacity="0.6"
            />
            {/* Crosshair Radial Lines */}
            <line x1="170" y1="250" x2="210" y2="250" stroke="#00f5ff" strokeWidth="1.5" />
            <line x1="590" y1="250" x2="630" y2="250" stroke="#00f5ff" strokeWidth="1.5" />
            <line x1="400" y1="50" x2="400" y2="90" stroke="#00f5ff" strokeWidth="1.5" />
            <line x1="400" y1="410" x2="400" y2="450" stroke="#00f5ff" strokeWidth="1.5" />
          </svg>

          {/* Corner Tech Brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

          {/* Animated Light Sweep Pass across Lens on Focus */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: isFocusing ? '100%' : '-100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none z-20 shadow-[0_0_20px_rgba(0,245,255,0.8)]"
          />

          {/* Actual Hero Screenshot Content */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {children}
          </div>
        </div>

        {/* HUD Bottom Status Bar */}
        <div className="flex items-center justify-between px-3.5 py-1.5 border-t border-cyan-900/60 bg-slate-900/90 text-[9px] text-cyan-400/80 z-20">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>BUILD STATUS: ACTIVE</span>
          </span>
          <span className="hidden sm:inline text-slate-500">
            OPTICAL DENSITY: 100% // RESOLUTION: HIGH
          </span>
        </div>
      </div>
    </div>
  );
};
