import { Volume2, VolumeX, Play, Pause, RotateCcw, ChevronRight, Sparkles } from 'lucide-react';
import { SceneNumber, SCENES_DATA } from '../types';
import { DeviceQualityInfo } from '../hooks/useDeviceQuality';

interface CinematicHUDProps {
  currentScene: SceneNumber;
  transitionProgress?: number;
  progress: number;
  isAutoPlay: boolean;
  isAudioOn: boolean;
  quality: DeviceQualityInfo;
  onToggleAutoPlay: () => void;
  onToggleAudio: () => void;
  onSelectScene: (scene: SceneNumber) => void;
  onExplore: () => void;
  onReplay: () => void;
}

export function CinematicHUD({
  currentScene,
  progress,
  isAutoPlay,
  isAudioOn,
  quality,
  onToggleAutoPlay,
  onToggleAudio,
  onSelectScene,
  onExplore,
  onReplay,
}: CinematicHUDProps) {
  const activeSceneData = SCENES_DATA[currentScene];

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-3 sm:p-6 md:p-8 select-none pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))]">
      {/* 1. Cinematic Atmospheric Vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-60" />

      {/* 2. Top Header Navigation Bar */}
      <header className="relative z-40 flex items-center justify-between w-full pointer-events-auto gap-2">
        {/* Brand Monogram */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-cyan-500/40 bg-slate-950/80 flex items-center justify-center font-orbitron font-bold text-cyan-400 text-xs sm:text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            NU
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-orbitron font-semibold tracking-wider text-slate-200">
              NANDHAKUMAR
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono-code text-cyan-400/80 tracking-widest">
              CINEMATIC UNIVERSE
            </span>
          </div>
        </div>

        {/* Scene Navigation Scrub Pills (1 to 6) */}
        <nav
          aria-label="Scene selector"
          className="flex items-center gap-0.5 sm:gap-1.5 p-1 rounded-full bg-slate-950/75 border border-slate-800/80 backdrop-blur-md overflow-x-auto scrollbar-none max-w-[55vw] sm:max-w-none justify-center"
        >
          {([1, 2, 3, 4, 5, 6] as SceneNumber[]).map((num) => {
            const isActive = currentScene === num;
            return (
              <button
                key={num}
                id={`scene-btn-${num}`}
                onClick={() => onSelectScene(num)}
                className={`min-h-[44px] min-w-[34px] sm:min-w-[40px] px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono-code transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
                title={SCENES_DATA[num].name}
              >
                <span className={isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                  0{num}
                </span>
                <span className="hidden lg:inline font-medium">
                  {SCENES_DATA[num].name}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Utility Controls (Sound, Auto-Play, Replay) */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={onToggleAudio}
            className={`min-h-[44px] min-w-[44px] p-2 rounded-xl border transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 text-xs font-mono-code ${
              isAudioOn
                ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'border-slate-800 bg-slate-950/75 text-slate-400 hover:text-slate-200'
            }`}
            title={isAudioOn ? 'Sound On' : 'Enable Audio'}
          >
            {isAudioOn ? <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden xl:inline">{isAudioOn ? 'AUDIO ON' : 'MUTED'}</span>
          </button>

          {/* Auto-Play Toggle */}
          {currentScene < 6 && (
            <button
              id="autoplay-toggle-btn"
              onClick={onToggleAutoPlay}
              className="min-h-[44px] min-w-[44px] p-2 rounded-xl border border-slate-800 bg-slate-950/75 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              title={isAutoPlay ? 'Pause Auto Sequence' : 'Resume Auto Sequence'}
            >
              {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-cyan-400" />}
            </button>
          )}

          {/* Replay */}
          <button
            id="replay-btn"
            onClick={onReplay}
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl border border-slate-800 bg-slate-950/75 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            title="Replay from Scene 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 3. Center Display: Grand Reveal in Scene 6 (Guaranteed never to crop or wrap on any device) */}
      {currentScene === 6 && (
        <div className="relative z-40 flex flex-col items-center justify-center my-auto text-center px-2 sm:px-4 pointer-events-auto w-full max-w-5xl mx-auto">
          {/* Subtle cosmic glow aura behind title */}
          <div className="absolute w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

          {/* Title Monogram badge */}
          <div className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-slate-950/70 backdrop-blur-md text-[10px] sm:text-xs font-mono-code text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>DEVELOPER PORTFOLIO • V1.0</span>
          </div>

          {/* Title: Fluid typography preventing any clipping on 320px to 430px */}
          <h1 className="font-orbitron font-black text-[clamp(1.75rem,7.4vw,5.5rem)] leading-none tracking-[0.06em] sm:tracking-[0.14em] md:tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_35px_rgba(6,182,212,0.6)] whitespace-nowrap">
            NANDHAKUMAR
          </h1>
          <h2 className="font-orbitron font-extrabold text-[clamp(1.15rem,4.6vw,3.75rem)] leading-tight tracking-[0.18em] sm:tracking-[0.28em] text-cyan-300 mt-1 sm:mt-2 mb-3 sm:mb-4 drop-shadow-[0_0_25px_rgba(56,189,248,0.5)] whitespace-nowrap">
            UNIVERSE
          </h2>

          {/* Subtitle */}
          <p className="font-mono-code text-[clamp(0.65rem,2.2vw,0.9rem)] tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.35em] text-slate-300 max-w-lg uppercase mb-6 sm:mb-8 px-2">
            IDEAS • CODE • CREATE • IMPACT
          </p>

          {/* Premium Glowing EXPLORE Button (Touch target >= 48px, immediate tap feedback) */}
          <button
            id="explore-btn"
            onClick={onExplore}
            className="group relative min-h-[48px] px-8 sm:px-11 py-3.5 rounded-full border-2 border-cyan-400 bg-slate-950/90 text-white font-orbitron font-bold text-xs sm:text-sm md:text-base tracking-widest shadow-[0_0_30px_rgba(6,182,212,0.6),inset_0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.9),inset_0_0_25px_rgba(56,189,248,0.5)] hover:border-cyan-300 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2.5 sm:gap-3 overflow-hidden"
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent pointer-events-none" />
            <span className="relative z-10 text-glow-cyan">EXPLORE</span>
            <ChevronRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>
      )}

      {/* 4. Bottom Cinematic Subtitles & Progress Bar (Scenes 1 to 5) */}
      {currentScene < 6 && (
        <footer className="relative z-40 w-full max-w-xl mx-auto flex flex-col items-center text-center pb-1 sm:pb-3 pointer-events-auto">
          {/* Cinematic Subtitle */}
          <div className="mb-3 sm:mb-4 px-2">
            <span className="font-space text-[clamp(1rem,4.2vw,2rem)] font-medium tracking-[0.14em] sm:tracking-[0.22em] text-slate-100 uppercase drop-shadow-[0_0_20px_rgba(6,182,212,0.5)] leading-tight block">
              {activeSceneData.subtitle}
            </span>
          </div>

          {/* Progress Bar (Visible in Scenes 3, 4, 5) */}
          {currentScene >= 3 && (
            <div className="w-full px-4 max-w-md sm:max-w-lg">
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono-code text-cyan-400/90 mb-1.5">
                <span className="tracking-wider">
                  {currentScene === 5 ? 'SYNCHRONIZED' : 'INITIALIZING SYSTEM'}
                </span>
                <span className="font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-900/80 border border-slate-800 overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                <div
                  className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-200 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
            </div>
          )}

          {/* Scene Step Indicator Dots */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
            {([1, 2, 3, 4, 5, 6] as SceneNumber[]).map((num) => (
              <button
                key={num}
                onClick={() => onSelectScene(num)}
                aria-label={`Go to scene ${num}`}
                className="p-1 min-h-[36px] min-w-[24px] flex items-center justify-center cursor-pointer"
              >
                <div
                  className={`h-1 sm:h-1.5 transition-all duration-300 rounded-full ${
                    currentScene === num
                      ? 'w-6 sm:w-8 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                      : currentScene > num
                      ? 'w-2 sm:w-2.5 bg-slate-600'
                      : 'w-2 sm:w-2.5 bg-slate-800'
                  }`}
                />
              </button>
            ))}
          </div>
        </footer>
      )}
    </div>
  );
}

export default CinematicHUD;
