import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

interface BookCoverViewProps {
  onOpenBook: () => void;
}

export const BookCoverView: React.FC<BookCoverViewProps> = ({ onOpenBook }) => {
  return (
    <div className="relative w-full h-full p-8 sm:p-12 flex flex-col items-center justify-between text-center select-none bg-gradient-to-br from-[#08152c] via-[#040d1f] to-[#01050e] rounded-2xl border-2 border-cyan-500/40 shadow-[inset_0_0_40px_rgba(0,245,255,0.1)] overflow-hidden">
      {/* Corner Metallic Brass / Cyan Brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-sm pointer-events-none" />

      {/* Subtle Inner Frame Embossing */}
      <div className="absolute inset-5 rounded-xl border border-cyan-500/20 pointer-events-none" />

      {/* Top Header Label */}
      <div className="relative z-10 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-[11px] font-mono font-bold tracking-widest shadow-[0_0_12px_rgba(0,245,255,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>VOLUME 01 • THE LIVING ARCHIVE</span>
        </div>
      </div>

      {/* Main Cover Title */}
      <div className="relative z-10 my-8 space-y-3">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_4px_20px_rgba(0,245,255,0.2)]">
          NANDHAKUMAR
        </h1>
        <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-cyan-400 tracking-[0.25em] uppercase">
          UNIVERSE
        </div>
        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-4" />
        <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-widest uppercase">
          PROJECTS &amp; ENGINEERING CHRONICLES
        </p>
      </div>

      {/* Open Book Interactive CTA Button */}
      <div className="relative z-10 pb-4">
        <button
          onClick={onOpenBook}
          className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-cyan-500/40 to-blue-600/40 border border-cyan-400/60 text-cyan-200 text-xs sm:text-sm font-mono font-bold tracking-widest hover:text-white hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all duration-300 active:scale-95"
        >
          <BookOpen className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
          <span>OPEN THE BOOK</span>
        </button>
      </div>
    </div>
  );
};
