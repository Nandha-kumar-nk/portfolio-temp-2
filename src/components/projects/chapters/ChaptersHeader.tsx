import React from 'react';
import { Sparkles, Compass } from 'lucide-react';

export const ChaptersHeader: React.FC = () => {
  return (
    <header className="text-center pt-20 sm:pt-24 md:pt-28 pb-4 px-4 relative z-20 max-w-4xl mx-auto font-mono">
      {/* Category Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs tracking-[0.25em] uppercase shadow-[0_0_18px_rgba(0,245,255,0.2)] mb-3">
        <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
        <span>NANDHAKUMAR UNIVERSE / PROJECTS</span>
      </div>

      {/* Main Editorial Display Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_30px_rgba(0,245,255,0.3)] uppercase">
        PROJECTS
      </h1>

      {/* Editorial Subtitle */}
      <p className="mt-2 text-xs sm:text-sm text-cyan-200/90 tracking-[0.25em] font-bold uppercase flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span>CHAPTERS OF MY UNIVERSE</span>
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
      </p>
    </header>
  );
};
