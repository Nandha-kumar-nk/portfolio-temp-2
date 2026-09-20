import React from 'react';
import { Sparkles } from 'lucide-react';

export const EvolutionHeader: React.FC = () => {
  return (
    <div className="text-center pt-6 pb-4 px-4 relative z-20 max-w-4xl mx-auto">
      {/* Category Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs tracking-[0.25em] font-mono mb-2 shadow-[0_0_15px_rgba(0,245,255,0.15)]">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>PROJECTS EXPERIENCE</span>
      </div>

      {/* Main Display Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_25px_rgba(0,245,255,0.25)] uppercase font-mono">
        PROJECT EVOLUTION
      </h1>

      {/* Subtitle */}
      <p className="mt-1 text-xs sm:text-sm text-cyan-200/80 font-mono tracking-widest uppercase">
        FROM AN <span className="text-cyan-400 font-semibold">IDEA</span> TO A{' '}
        <span className="text-cyan-400 font-semibold">REAL-WORLD IMPACT</span>
      </p>
    </div>
  );
};
