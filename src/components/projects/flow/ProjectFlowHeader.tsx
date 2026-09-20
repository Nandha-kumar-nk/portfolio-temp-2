import React from 'react';
import { Sparkles, Box } from 'lucide-react';

export const ProjectFlowHeader: React.FC = () => {
  return (
    <header className="text-center pt-20 sm:pt-24 md:pt-28 pb-2 px-4 relative z-20 max-w-4xl mx-auto font-mono pointer-events-none select-none">
      {/* Signal Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-400 text-xs tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(0,245,255,0.25)] mb-3 pointer-events-auto">
        <Box className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>NANDHAKUMAR UNIVERSE // PROJECT CUBE 2.0</span>
      </div>

      {/* Main Display Title */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_35px_rgba(0,245,255,0.4)] uppercase">
        PROJECT CUBE 2.0
      </h1>

      {/* Tagline */}
      <p className="mt-2 text-xs sm:text-sm text-cyan-200/90 tracking-[0.3em] font-bold uppercase flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span>3D NAVIGATION & EXPANDABLE PREVIEWS</span>
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
      </p>
    </header>
  );
};



