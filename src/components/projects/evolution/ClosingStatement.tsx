import React from 'react';
import { Sparkles } from 'lucide-react';

export const ClosingStatement: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-8 text-center relative z-20">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-950/80 to-cyan-950/40 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(0,245,255,0.1)]">
        <div className="flex items-center justify-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>DEVELOPMENT PHILOSOPHY</span>
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
        </div>

        <h3 className="text-xl sm:text-2xl font-black font-mono text-white tracking-wider uppercase drop-shadow-[0_0_15px_rgba(0,245,255,0.2)]">
          IDEAS DON'T STAY IDEAS.
        </h3>

        <p className="mt-1 text-sm sm:text-base font-mono text-cyan-300 tracking-wide uppercase font-semibold">
          THEY EVOLVE INTO SOMETHING REAL.
        </p>

        <div className="mt-4 pt-3 border-t border-cyan-900/50 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
          <span className="text-cyan-400 font-bold">IDEAS</span>
          <span className="text-cyan-600">•</span>
          <span className="text-cyan-400 font-bold">CODE</span>
          <span className="text-cyan-600">•</span>
          <span className="text-cyan-400 font-bold">CREATE</span>
          <span className="text-cyan-600">•</span>
          <span className="text-cyan-400 font-bold">IMPACT</span>
        </div>
      </div>
    </div>
  );
};
