import React from 'react';
import { Database, Sparkles } from 'lucide-react';

export const ArchiveHeader: React.FC = () => {
  return (
    <header className="text-center pt-20 sm:pt-24 md:pt-28 pb-4 px-4 relative z-20 max-w-4xl mx-auto font-mono">
      {/* Category Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(0,245,255,0.2)] mb-2">
        <Database className="w-3.5 h-3.5 text-cyan-400" />
        <span>NANDHAKUMAR UNIVERSE / ARCHIVE</span>
      </div>

      {/* Main Display Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_25px_rgba(0,245,255,0.25)] uppercase">
        PROJECT ARCHIVE
      </h1>

      {/* Subtitle */}
      <p className="mt-1.5 text-xs sm:text-sm text-cyan-200/80 tracking-widest uppercase flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span>FIVE THINGS I BUILT. FIVE STORIES WORTH EXPLORING.</span>
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
      </p>
    </header>
  );
};
