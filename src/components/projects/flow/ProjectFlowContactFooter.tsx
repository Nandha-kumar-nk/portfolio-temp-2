import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

export const ProjectFlowContactFooter: React.FC = () => {
  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="w-full max-w-4xl mx-auto px-4 mt-8 mb-4 text-center font-mono z-30 select-none">
      <div className="p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,245,255,0.12)]">
        {/* Subtle Heading */}
        <p className="text-xs sm:text-sm font-bold text-cyan-200 tracking-[0.25em] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>MORE THAN PROJECTS. THESE ARE CHAPTERS OF MY JOURNEY.</span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        </p>

        {/* Scroll CTA Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleScrollToContact}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-950/90 border border-cyan-400/80 text-cyan-300 font-extrabold text-xs tracking-wider hover:bg-cyan-900 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(0,245,255,0.25)] cursor-pointer group"
          >
            <span>CONTINUE TO CONTACT</span>
            <ArrowDown className="w-4 h-4 text-cyan-400 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
