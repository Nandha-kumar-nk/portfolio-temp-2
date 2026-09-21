import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { DeviceQualityInfo } from '../hooks/useDeviceQuality';
import { soundEngine } from '../utils/audio';

interface HomeSceneProps {
  onNavigateAbout?: () => void;
  onNavigateProjects?: () => void;
  onReplaySequence?: () => void;
  quality?: DeviceQualityInfo;
  isAudioOn?: boolean;
  onToggleAudio?: () => void;
  isTransitioning?: boolean;
}

export function HomeScene({
  onNavigateAbout,
  onNavigateProjects,
  onReplaySequence: _onReplaySequence,
  quality: _quality,
  isAudioOn: _isAudioOn,
  onToggleAudio: _onToggleAudio,
  isTransitioning: _isTransitioning = false,
}: HomeSceneProps) {
  const [isExploring, setIsExploring] = useState<boolean>(false);
  const exploreTimerRef = useRef<number | null>(null);

  const handleCtaClick = () => {
    if (isExploring) return;
    setIsExploring(true);

    try {
      soundEngine.playChime(640, 0.4);
    } catch {
      // Audio fallback
    }

    // Smooth explore pulse before navigating to Projects (or About as fallback)
    exploreTimerRef.current = window.setTimeout(() => {
      setIsExploring(false);
      if (onNavigateProjects) {
        onNavigateProjects();
      } else if (onNavigateAbout) {
        onNavigateAbout();
      }
    }, 650);
  };

  const handleScrollClick = () => {
    if (onNavigateAbout) {
      onNavigateAbout();
    }
  };

  return (
    <div
      aria-label="Home — Nandhakumar Universe"
      className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden bg-transparent select-none box-border"
      style={{ zIndex: 10 }}
    >
      {/* ===================================================================== */}
      {/* 1. DEEP SPACE BACKGROUND & CINEMATIC ATMOSPHERIC GLOW                 */}
      {/* ===================================================================== */}
      {/* Central Cyan Luminous Haze directly behind the 3D Universe */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_38%,rgba(6,182,212,0.14)_0%,transparent_70%)] pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Cinematic Vignette framing */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(2,2,8,0.35)_100%)] pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Subtle Structural Vertical Halos */}
      <div
        className="absolute left-6 sm:left-12 lg:left-16 inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute right-6 sm:right-12 lg:right-16 inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Subtle Cosmic Floor Light Reflection */}
      <div
        className="absolute bottom-0 inset-x-0 h-40 sm:h-56 bg-gradient-to-t from-cyan-950/20 via-[#020208]/30 to-transparent pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* ===================================================================== */}
      {/* 3. FOREGROUND HTML OVERLAY (Strict Visual Hierarchy)                   */}
      {/* Layered above background Canvas with pointer-events-none              */}
      {/* ===================================================================== */}
      <div className="relative z-10 w-full min-h-[100svh] flex flex-col justify-between pt-16 sm:pt-20 lg:pt-24 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-14 box-border pointer-events-none">

        {/* ------------------------------------------------------------------- */}
        {/* A. UPPER ORBITAL SYSTEM SPACE RESERVED FOR 3D GLOBE + 6 NODES      */}
        {/* ------------------------------------------------------------------- */}
        <div className="w-full h-[38svh] xs:h-[40svh] sm:h-[45svh] md:h-[48svh] pointer-events-none flex-shrink-0" />

        {/* ------------------------------------------------------------------- */}
        {/* B. TITLE SECTION (Positioned Below Orbital Globe Composition)       */}
        {/* ------------------------------------------------------------------- */}
        <div className="flex flex-col items-center text-center w-full pointer-events-auto transition-all duration-700 ease-out mt-1 sm:mt-2">
          <h1 className="font-orbitron font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[3.6rem] leading-none tracking-[0.20em] sm:tracking-[0.26em] text-slate-100 drop-shadow-[0_0_30px_rgba(6,182,212,0.45)] whitespace-nowrap">
            NANDHAKUMAR
          </h1>
          <h2 className="font-orbitron font-semibold text-xl sm:text-3xl md:text-4xl lg:text-[2.2rem] leading-tight tracking-[0.30em] sm:tracking-[0.38em] text-cyan-400 mt-1 sm:mt-1.5 mb-1.5 sm:mb-2 drop-shadow-[0_0_25px_rgba(6,182,212,0.65)] whitespace-nowrap">
            UNIVERSE
          </h2>
          <p className="font-mono-code text-[10px] sm:text-xs md:text-sm tracking-[0.26em] sm:tracking-[0.36em] text-cyan-300/90 font-medium uppercase drop-shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            IDEAS • CODE • CREATE • IMPACT
          </p>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* C. CENTER CTA BUTTON (EXPLORE MY WORK)                              */}
        {/* ------------------------------------------------------------------- */}
        <div className="mt-3 sm:mt-5 mb-3 sm:mb-5 flex flex-col items-center justify-center pointer-events-auto z-20 w-full px-4">
          <button
            id="explore-my-work-btn"
            type="button"
            onClick={handleCtaClick}
            disabled={isExploring}
            className={`group relative min-h-[46px] sm:min-h-[50px] w-[88%] sm:w-auto px-8 sm:px-12 py-3 rounded-full border border-cyan-400/80 hover:border-cyan-300 bg-slate-950/85 hover:bg-cyan-950/60 backdrop-blur-md text-slate-100 hover:text-white font-orbitron font-semibold text-xs sm:text-sm tracking-[0.24em] shadow-[0_0_25px_rgba(6,182,212,0.4),inset_0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_42px_rgba(6,182,212,0.8),inset_0_0_20px_rgba(56,189,248,0.5)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 overflow-hidden ${
              isExploring ? 'ring-2 ring-cyan-400 shadow-[0_0_45px_rgba(6,182,212,0.9)]' : ''
            }`}
          >
            {/* Shimmer sweep animation */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent pointer-events-none" />
            <span className="relative z-10 text-cyan-50 group-hover:text-white tracking-[0.24em]">
              {isExploring ? 'EXPLORING...' : 'EXPLORE MY WORK'}
            </span>
            <ArrowRight
              className={`relative z-10 w-4 h-4 text-cyan-400 transition-transform duration-200 ${
                isExploring ? 'translate-x-2 text-white' : 'group-hover:translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* D. BOTTOM ROW: Supporting Identity Elements & Scroll Indicator      */}
        {/* ------------------------------------------------------------------- */}
        <div className="w-full flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 pt-2 pointer-events-auto max-w-7xl mx-auto z-20">
          {/* Lower-Left Supporting Statement: DIGITAL ARCHITECTURE */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left select-none">
            <div className="flex items-center gap-2 mb-1 opacity-90">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
              <span className="text-[10px] sm:text-[11px] font-mono-code tracking-[0.26em] text-cyan-400 font-semibold uppercase">
                DIGITAL ARCHITECTURE
              </span>
            </div>
            <h3 className="font-orbitron text-xs sm:text-sm font-bold text-slate-100 leading-snug tracking-wider">
              Turning <span className="text-cyan-300">Ideas</span> into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.35)]">
                Real Experiences
              </span>
            </h3>
            <div className="w-20 sm:w-28 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent my-1" />
            <p className="text-[9px] sm:text-[10px] font-mono-code tracking-[0.22em] text-slate-400 uppercase">
              FULL STACK • CREATIVE TECH • REAL IMPACT
            </p>
          </div>

          {/* Lower-Right Scroll to Explore Indicator */}
          <div className="flex flex-col items-center sm:items-end gap-1 select-none">
            <div className="hidden sm:flex flex-col items-end text-right opacity-85 mb-1">
              <span className="font-orbitron text-[10px] lg:text-[11px] tracking-[0.28em] text-slate-300 font-semibold">
                SAME PERSON.
              </span>
              <span className="font-orbitron text-[10px] lg:text-[11px] tracking-[0.28em] text-cyan-400 font-medium mt-0.5">
                BIGGER DREAMS.
              </span>
            </div>

            <button
              id="home-scroll-indicator-btn"
              type="button"
              onClick={handleScrollClick}
              className="flex flex-col items-center sm:items-end gap-1 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer group p-1"
              aria-label="Scroll to Explore"
            >
              <span className="text-[9px] sm:text-[10px] font-mono-code tracking-[0.24em] uppercase text-slate-400 group-hover:text-cyan-400 transition-colors">
                SCROLL TO EXPLORE
              </span>
              <div className="w-4 h-6 sm:h-7 rounded-full border border-slate-700/80 group-hover:border-cyan-400/80 p-0.5 flex justify-center transition-colors shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                <div className="w-1 h-1.5 rounded-full bg-cyan-400 animate-bounce mt-0.5" />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400/80 animate-bounce -mt-0.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

