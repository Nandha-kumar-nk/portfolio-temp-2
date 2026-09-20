import React from 'react';
import { Sparkles, Radio, Activity } from 'lucide-react';

export const ObservatoryHeader: React.FC = () => {
  return (
    <div
      id="observatory-header"
      className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4 flex flex-col items-center text-center select-none"
    >
      {/* Small Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] text-cyan-300 uppercase mb-2 shadow-[0_0_12px_rgba(0,245,255,0.15)]">
        <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
        <span>NANDHAKUMAR UNIVERSE // PROJECT WORLDS</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
      </div>

      {/* Main Heading */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-sans">
        PROJECTS <span className="text-slate-600 font-light mx-1">/</span>{' '}
        <span className="text-cyan-400 drop-shadow-[0_0_24px_rgba(0,245,255,0.5)]">
          THINGS I BUILT
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-1.5 text-xs sm:text-sm font-mono tracking-widest text-slate-300 uppercase max-w-xl">
        “Different ideas. Different worlds. One universe.”
      </p>
    </div>
  );
};
