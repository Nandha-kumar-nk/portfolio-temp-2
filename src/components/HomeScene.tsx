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
        className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_36%,rgba(6,182,212,0.16)_0%,transparent_70%)] pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Cinematic Vignette framing */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(2,2,8,0.4)_100%)] pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/* ===================================================================== */}
      {/* 2. SIDE HUD TECHNICAL DECORATIONS (Reference Image Atmosphere)        */}
      {/* ===================================================================== */}
      {/* Left HUD Bracket & Elements */}
      <div className="hidden md:flex flex-col justify-between absolute left-4 lg:left-8 top-28 bottom-20 pointer-events-none z-10 select-none">
        {/* Left vertical accent bar */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-cyan-400/35 to-transparent rounded-full shadow-[0_0_8px_rgba(6,182,212,0.4)]" />

        {/* [ creative. ] */}
        <div className="pl-4 pt-12">
          <span className="font-mono-code text-[11px] lg:text-xs text-cyan-400/40 tracking-[0.2em]">
            [ creative. ]
          </span>
        </div>

        {/* </> */}
        <div className="pl-4 py-8">
          <span className="font-mono-code text-sm lg:text-base text-cyan-400/45 font-semibold tracking-widest shadow-[0_0_8px_rgba(6,182,212,0.2)]">
            &lt;/&gt;
          </span>
        </div>

        {/* [ const ideas = true; ] */}
        <div className="pl-4 pb-12">
          <span className="font-mono-code text-[11px] lg:text-xs text-cyan-400/40 tracking-[0.16em]">
            [ const ideas = true; ]
          </span>
        </div>
      </div>

      {/* Right HUD Bracket & Elements */}
      <div className="hidden md:flex flex-col justify-between items-end absolute right-4 lg:right-8 top-28 bottom-20 pointer-events-none z-10 select-none text-right">
        {/* Right vertical accent bar */}
        <div className="absolute right-0 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-cyan-400/35 to-transparent rounded-full shadow-[0_0_8px_rgba(6,182,212,0.4)]" />

        {/* 01 indicator */}
        <div className="pr-4 pt-10">
          <span className="font-mono-code text-xs lg:text-sm text-cyan-400/40 font-bold tracking-[0.25em]">
            01
          </span>
        </div>

        {/* { dream; build; repeat; } */}
        <div className="pr-4 py-8">
          <div className="font-mono-code text-[11px] lg:text-xs text-cyan-400/40 leading-relaxed tracking-wider">
            <div>&#123; dream;</div>
            <div className="pl-3">build;</div>
            <div className="pl-1">repeat; &#125;</div>
          </div>
        </div>

        {/* // bigger dreams */}
        <div className="pr-4 pb-12">
          <span className="font-mono-code text-[11px] lg:text-xs text-cyan-400/40 tracking-wider">
            // bigger dreams
          </span>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. FOREGROUND HTML OVERLAY (Strict Visual Hierarchy)                   */}
      {/* Layered above background Canvas with pointer-events-none              */}
      {/* ===================================================================== */}
      <div className="relative z-10 w-full min-h-[100svh] flex flex-col justify-between pt-16 sm:pt-20 lg:pt-22 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-14 box-border pointer-events-none">

        {/* ------------------------------------------------------------------- */}
        {/* A. UPPER ORBITAL SYSTEM SPACE RESERVED FOR 3D GLOBE + 5 NODES      */}
        {/* ------------------------------------------------------------------- */}
        <div className="w-full h-[36svh] xs:h-[38svh] sm:h-[44svh] md:h-[46svh] pointer-events-none flex-shrink-0" />

        {/* ------------------------------------------------------------------- */}
        {/* B. TITLE SECTION (Positioned Below Orbital Globe Composition)       */}
        {/* ------------------------------------------------------------------- */}
        <div className="flex flex-col items-center text-center w-full pointer-events-auto transition-all duration-700 ease-out mt-1 sm:mt-2">
          <h1 className="font-orbitron font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] leading-none tracking-[0.22em] sm:tracking-[0.28em] text-slate-100 drop-shadow-[0_0_35px_rgba(6,182,212,0.45)] whitespace-nowrap">
            NANDHAKUMAR
          </h1>
          <h2 className="font-orbitron font-semibold text-xl sm:text-3xl md:text-4xl lg:text-[2.3rem] leading-tight tracking-[0.32em] sm:tracking-[0.40em] text-cyan-400 mt-1 sm:mt-1.5 mb-2 sm:mb-2.5 drop-shadow-[0_0_28px_rgba(6,182,212,0.7)] whitespace-nowrap">
            UNIVERSE
          </h2>
          <p className="font-mono-code text-[10px] sm:text-xs md:text-sm tracking-[0.28em] sm:tracking-[0.38em] text-cyan-300/90 font-medium uppercase drop-shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            IDEAS • CODE • CREATE • IMPACT
          </p>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* C. CENTER CTA BUTTON (EXPLORE MY WORK)                              */}
        {/* ------------------------------------------------------------------- */}
        <div className="mt-3 sm:mt-5 mb-2 sm:mb-4 flex flex-col items-center justify-center pointer-events-auto z-20 w-full px-4">
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
        <div className="w-full flex items-end justify-between pt-2 pointer-events-auto max-w-7xl mx-auto z-20">
          {/* Lower-Left Scroll to Explore Indicator */}
          <div className="flex flex-col items-start gap-1 select-none">
            <button
              id="home-scroll-indicator-btn"
              type="button"
              onClick={handleScrollClick}
              className="flex flex-col items-start gap-1 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer group p-1"
              aria-label="Scroll to Explore"
            >
              <span className="text-[9px] sm:text-[10px] font-mono-code tracking-[0.24em] uppercase text-slate-400 group-hover:text-cyan-400 transition-colors">
                SCROLL TO EXPLORE
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-5 sm:h-6 rounded-full border border-slate-700/80 group-hover:border-cyan-400/80 p-0.5 flex justify-center transition-colors shadow-[0_0_8px_rgba(6,182,212,0.15)]">
                  <div className="w-0.5 h-1.5 rounded-full bg-cyan-400 animate-bounce mt-0.5" />
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400/80 animate-bounce" />
              </div>
            </button>
          </div>

          {/* Lower-Right Corner Bracket Message: SAME PERSON. BIGGER DREAMS. */}
          <div className="flex flex-col items-end text-right select-none pr-1 sm:pr-2">
            <div className="relative pl-3 pt-2 border-l border-t border-cyan-500/30 rounded-tl-sm">
              <span className="font-orbitron text-[10px] sm:text-xs tracking-[0.25em] text-slate-300 font-semibold block">
                SAME PERSON.
              </span>
              <span className="font-orbitron text-[10px] sm:text-xs tracking-[0.25em] text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] block mt-0.5">
                BIGGER DREAMS.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

