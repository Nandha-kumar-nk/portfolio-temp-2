import React from 'react';
import { Activity, Sparkles, BookMarked, Mouse } from 'lucide-react';

interface StudioBackgroundElementsProps {
  className?: string;
}

export const StudioBackgroundElements: React.FC<StudioBackgroundElementsProps> = ({
  className = '',
}) => {
  return (
    <div
      id="studio-background-elements"
      className={`absolute inset-0 pointer-events-none z-10 overflow-hidden select-none ${className}`}
    >
      {/* 1. Upper Left Quote & Developer Sign */}
      <div className="absolute top-20 sm:top-24 left-4 sm:left-10 max-w-[280px] sm:max-w-xs space-y-3 hidden md:block">
        {/* Quote */}
        <div className="space-y-1">
          <p className="font-serif italic text-sm sm:text-base text-slate-300/90 leading-snug">
            &ldquo;Ideas don&apos;t stay ideas here, they become real.&rdquo;
          </p>
          <p className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider">
            &mdash; Nandhakumar
          </p>
        </div>

        {/* Vertical Holographic Directional Board */}
        <div className="p-3 rounded-xl bg-[#060c18]/80 border border-cyan-500/30 backdrop-blur-md space-y-1.5 shadow-[0_0_20px_rgba(0,245,255,0.12)]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
            <span className="text-cyan-400">&rarr;</span>
            <span>LEARN</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-300">
            <span className="text-sky-400">&rarr;</span>
            <span>BUILD</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-300">
            <span className="text-indigo-400">&rarr;</span>
            <span>INNOVATE</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300">
            <span className="text-purple-400">&rarr;</span>
            <span>IMPACT</span>
          </div>
        </div>
      </div>

      {/* 2. Developer Character (Standing on the left, looking toward the project) */}
      <div
        id="developer-character-container"
        className="absolute bottom-16 sm:bottom-20 left-2 sm:left-8 lg:left-14 w-44 sm:w-56 md:w-64 lg:w-72 z-20 pointer-events-none hidden sm:block"
      >
        <div className="relative flex flex-col items-center">
          {/* Character Image */}
          <picture className="relative z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
            <source srcSet="/assets/developer-character.webp" type="image/webp" />
            <img
              src="/assets/developer-character.png"
              alt="Nandhakumar - Developer behind SWAYAM 2.0"
              className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
            />
          </picture>

          {/* Backpack Mission Badge & Typography Overlay matching reference image */}
          <div className="absolute top-[48%] left-[28%] -translate-x-1/2 p-1.5 rounded-lg bg-black/80 border border-cyan-500/60 backdrop-blur-xs flex flex-col items-center shadow-[0_0_12px_rgba(0,245,255,0.4)]">
            <div className="w-5 h-5 rounded bg-cyan-950 border border-cyan-400 flex items-center justify-center font-black text-[9px] text-cyan-300">
              NU
            </div>
            <div className="text-[7.5px] font-mono font-bold text-slate-300 mt-0.5 tracking-tighter text-center leading-tight">
              BUILD<br />LEARN<br />EXPLORE
            </div>
          </div>

          {/* Realistic Floor Contact Shadow on Pedestal */}
          <div
            className="w-36 h-6 -mt-3 rounded-full bg-black/95 blur-md"
            style={{ transform: 'scaleY(0.3)' }}
          />
        </div>
      </div>

      {/* 3. Upper Right Floating Hologram Panels */}
      <div className="absolute top-24 right-6 sm:right-16 lg:right-28 space-y-4 hidden lg:block">
        {/* Hologram Card 1: TECHNOLOGY EMPOWERS PEOPLE */}
        <div className="p-3 rounded-xl bg-[#060c18]/85 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,245,255,0.2)] max-w-[210px] space-y-1.5 animate-pulse">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
              TECHNOLOGY EMPOWERS PEOPLE
            </span>
            <Activity className="w-3 h-3 text-cyan-400" />
          </div>
          {/* Animated Waveform ECG */}
          <div className="h-6 flex items-center gap-0.5">
            {[40, 60, 25, 90, 45, 75, 30, 85, 50, 70, 95, 35, 60, 40].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-cyan-400 rounded-full transition-all duration-300"
                style={{
                  height: `${h}%`,
                  opacity: 0.4 + (i % 3) * 0.25,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hologram Card 2: KNOWLEDGE HAS NO BOUNDARIES */}
        <div className="p-2.5 rounded-xl bg-[#060b17]/80 border border-slate-700/80 backdrop-blur-md shadow-md max-w-[190px] flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-950/80 border border-indigo-500/50 flex items-center justify-center text-indigo-300 shrink-0">
            <BookMarked className="w-3.5 h-3.5" />
          </div>
          <div className="text-[9.5px] font-mono font-bold text-slate-300 leading-tight">
            KNOWLEDGE HAS NO BOUNDARIES
          </div>
        </div>
      </div>

      {/* 4. Right Background Developer Workshop Desk (Monitors & Ambient Lights) */}
      <div className="absolute bottom-24 right-4 sm:right-8 opacity-45 hidden xl:block pointer-events-none">
        <div className="flex flex-col items-end gap-1.5 font-mono text-[9px] text-slate-400 p-2 rounded-lg bg-black/40 border border-slate-800">
          <div className="text-cyan-400 font-bold tracking-wider">SAME IDEAS DIFFERENT UNIVERSE</div>
          <div className="text-slate-500">Code &bull; Create &bull; Learn &bull; Repeat</div>
        </div>
      </div>

      {/* 5. Bottom Horizon Bar */}
      <div className="absolute bottom-3 inset-x-6 sm:inset-x-12 flex items-center justify-between text-[10px] font-mono text-slate-500 select-none z-30">
        {/* Left: Scroll to explore */}
        <div className="flex items-center gap-1.5 text-slate-400">
          <Mouse className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
          <span className="tracking-widest uppercase">Scroll to explore</span>
        </div>

        {/* Right: Pipeline motto */}
        <div className="hidden sm:flex items-center gap-3 text-slate-400 font-mono tracking-widest text-[9.5px]">
          <span className="text-slate-300">IDEAS</span>
          <span className="text-cyan-400">&rarr;</span>
          <span className="text-slate-300">CODE</span>
          <span className="text-cyan-400">&rarr;</span>
          <span className="text-slate-300">PEOPLE</span>
          <span className="text-cyan-400">&rarr;</span>
          <span className="text-cyan-300 font-bold">IMPACT</span>
        </div>
      </div>
    </div>
  );
};
