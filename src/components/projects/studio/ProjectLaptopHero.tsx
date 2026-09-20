import React from 'react';
import { SwayamScreenDisplay } from './SwayamScreenDisplay';

interface ProjectLaptopHeroProps {
  onInteract?: () => void;
  className?: string;
}

export const ProjectLaptopHero: React.FC<ProjectLaptopHeroProps> = ({
  onInteract,
  className = '',
}) => {
  return (
    <div
      id="studio-central-hero-platform"
      className={`relative flex flex-col items-center select-none ${className}`}
    >
      {/* Volumetric ambient backlight aura */}
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-[520px] sm:w-[680px] h-[360px] pointer-events-none rounded-full opacity-45 blur-[80px]"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 245, 255, 0.4) 0%, rgba(37, 99, 235, 0.25) 45%, transparent 75%)',
        }}
      />

      {/* 1. Floating 3D Laptop Container with Gentle Levitation */}
      <div
        className="relative w-[340px] sm:w-[480px] md:w-[560px] lg:w-[620px] xl:w-[660px] z-20 transition-transform duration-500 hover:scale-[1.01]"
        style={{ perspective: '1400px' }}
      >
        {/* Floating Screen Lid (Tilted back slightly in 3D) */}
        <div
          id="laptop-screen-frame"
          className="relative rounded-2xl bg-[#090e1a] border border-cyan-400/50 p-2 sm:p-2.5 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95),0_0_35px_rgba(0,245,255,0.22)] transition-all duration-300"
          style={{
            transform: 'perspective(1400px) rotateX(2deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Top Metallic Rim Glare & Webcam */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent pointer-events-none" />
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-800 flex items-center justify-center pointer-events-none">
            <div className="w-0.5 h-0.5 rounded-full bg-cyan-400/80" />
          </div>

          {/* Real Screen Content inside the laptop display */}
          <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-slate-700/60 shadow-inner">
            <SwayamScreenDisplay />

            {/* Specular Diagonal Glass Glare */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                background:
                  'linear-gradient(130deg, rgba(255,255,255,0.18) 0%, transparent 40%, rgba(0,245,255,0.06) 70%, transparent 100%)',
              }}
            />

            {/* Live Artifact Status Badge */}
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-[9px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-md pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE SYSTEM</span>
            </div>
          </div>
        </div>

        {/* 2. Physical 3D Keyboard Base / Chassis */}
        <div
          id="laptop-keyboard-chassis"
          className="relative -mt-1 mx-auto w-[95%] h-8 sm:h-10 rounded-b-xl bg-gradient-to-b from-[#11192e] via-[#090f1d] to-[#040812] border-x border-b border-cyan-500/40 shadow-[0_18px_40px_rgba(0,0,0,0.9)] flex items-center justify-center px-6 overflow-hidden pointer-events-none"
          style={{
            transform: 'perspective(600px) rotateX(55deg)',
            transformOrigin: 'top center',
          }}
        >
          {/* Backlit Keyboard rows simulation */}
          <div className="w-full flex items-center justify-center gap-1 opacity-50">
            <div className="h-1.5 w-12 rounded-xs bg-cyan-400/20 border border-cyan-400/40" />
            <div className="h-1.5 w-28 rounded-xs bg-cyan-400/30 border border-cyan-400/50" />
            <div className="h-1.5 w-12 rounded-xs bg-cyan-400/20 border border-cyan-400/40" />
          </div>

          {/* Trackpad silhouette */}
          <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-20 h-2 rounded-t-xs border-t border-x border-cyan-400/40 bg-cyan-950/40" />
        </div>

        {/* Floating Under-Chassis Floor Contact Shadow */}
        <div
          className="w-[80%] h-6 mx-auto -mt-1 rounded-full bg-black/95 blur-md pointer-events-none"
          style={{ transform: 'scaleY(0.35)' }}
        />
      </div>

      {/* 3. Circular Futuristic Physical Pedestal Base */}
      <div className="relative mt-1 flex flex-col items-center w-full z-10">
        {/* Front Glowing Plaque on Platform */}
        <div
          id="hero-platform-plaque"
          className="relative z-20 px-6 sm:px-8 py-1.5 sm:py-2 rounded-xl bg-[#060c18]/90 border border-cyan-400/70 shadow-[0_0_25px_rgba(0,245,255,0.35)] backdrop-blur-xl flex flex-col items-center text-center transition-all duration-300"
        >
          <div className="text-sm sm:text-base font-black tracking-widest text-white uppercase font-sans">
            SWAYAM 2.0
          </div>
          <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-cyan-300 uppercase font-semibold">
            A FULL STACK WEB APPLICATION
          </div>
        </div>

        {/* Concentric Neon Rings of Platform Base */}
        <div className="relative w-[360px] sm:w-[480px] md:w-[560px] h-10 -mt-4 pointer-events-none">
          {/* Outer glowing neon ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-cyan-400/50 shadow-[0_0_25px_rgba(0,245,255,0.4)]"
            style={{ transform: 'scaleY(0.24)' }}
          />
          {/* Inner intense neon ring */}
          <div
            className="absolute inset-x-8 inset-y-1 rounded-full border border-cyan-300 shadow-[0_0_18px_rgba(0,245,255,0.6)]"
            style={{ transform: 'scaleY(0.24)' }}
          />
          {/* Core floor ambient light pool */}
          <div
            className="absolute inset-x-12 inset-y-0 rounded-full bg-cyan-400/25 blur-xl"
            style={{ transform: 'scaleY(0.24)' }}
          />
        </div>
      </div>
    </div>
  );
};
