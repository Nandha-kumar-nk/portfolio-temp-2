import { SceneNumber } from '../types';

interface CodeHologramProps {
  currentScene: SceneNumber;
}

export function CodeHologram({ currentScene }: CodeHologramProps) {
  // Visible during Scene 3 ("CODE TO UNIVERSE")
  const isVisible = currentScene === 3;

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center">
      {/* Floating Holographic Interface: Left side of screen */}
      <div className="relative ml-4 sm:ml-10 md:ml-16 lg:ml-24 p-4 sm:p-5 rounded-xl border border-cyan-500/50 bg-slate-950/85 backdrop-blur-xl shadow-[0_0_35px_rgba(6,182,212,0.3)] max-w-[290px] sm:max-w-xs md:max-w-sm animate-fade-in -translate-y-4 sm:-translate-y-8">
        {/* Hologram Corner Accents */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

        {/* Header telemetry */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-500/30 text-[10px] sm:text-xs font-mono-code text-cyan-400/90">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>CORE_KERNEL.ts</span>
          </div>
          <span className="text-cyan-300/70 font-semibold tracking-wider">MEM // 0x7F2A</span>
        </div>

        {/* Code body matching exact specification */}
        <div className="font-mono-code text-xs sm:text-sm leading-relaxed space-y-1.5">
          <div className="text-slate-400/80 italic text-[11px]">// ideas</div>
          <div>
            <span className="text-purple-400 font-semibold">const</span>{' '}
            <span className="text-cyan-300 font-medium">developer</span> ={' '}
            <span className="text-emerald-400 font-semibold">true</span>;
          </div>
          <div>
            <span className="text-sky-300 font-medium">build</span>();
          </div>
          <div>
            <span className="text-blue-400 font-medium">create</span>();
          </div>
          <div>
            <span className="text-emerald-400 font-medium">impact</span>();
          </div>
        </div>

        {/* Hologram scan line effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none rounded-xl" />
      </div>

      {/* Floating Holographic Telemetry Badge (Top Right of screen) */}
      <div className="hidden sm:block absolute top-24 md:top-28 right-8 md:right-20 p-3 rounded-lg border border-sky-500/30 bg-slate-950/75 backdrop-blur-md text-[10px] font-mono-code text-sky-400/80 shadow-[0_0_20px_rgba(56,189,248,0.2)] animate-fade-in">
        <div className="text-cyan-300 font-semibold">STAGE: 03 CODE_TO_UNIVERSE</div>
        <div className="text-slate-400 mt-1">STATUS: COMPILING PARTICLES...</div>
      </div>
    </div>
  );
}
