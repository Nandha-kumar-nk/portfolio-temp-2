import React from 'react';

export const TransitionPreviewStrip: React.FC = () => {
  const steps = [
    {
      step: '1. ACCELERATING',
      desc: 'Through the universe',
      gradient: 'from-blue-950 via-cyan-950/40 to-slate-950',
      border: 'border-cyan-500/40',
      accent: '#00f5ff',
      icon: (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
          {/* Light speed streaks */}
          {[-45, -20, 0, 20, 45].map((deg, i) => (
            <div
              key={i}
              className="absolute h-0.5 w-16 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{
                transform: `rotate(${deg}deg) translateX(${i * 6}px)`,
                opacity: 0.8,
              }}
            />
          ))}
          <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#00f5ff]" />
        </div>
      ),
    },
    {
      step: '2. TRANSITION',
      desc: 'Project dissolves into particles',
      gradient: 'from-indigo-950 via-purple-950/40 to-slate-950',
      border: 'border-purple-500/40',
      accent: '#c084fc',
      icon: (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
          <div className="w-10 h-12 rounded border border-purple-400/80 bg-purple-950/60 shadow-[0_0_15px_#c084fc] flex items-center justify-center">
            <div className="w-6 h-7 rounded border border-cyan-400/60 bg-cyan-950/40" />
          </div>
          {/* Particle dots */}
          <span className="absolute top-2 left-4 w-1 h-1 rounded-full bg-purple-300" />
          <span className="absolute bottom-3 right-5 w-1.5 h-1.5 rounded-full bg-cyan-300" />
        </div>
      ),
    },
    {
      step: '3. TRAVEL',
      desc: 'Moving to next dimension',
      gradient: 'from-blue-950 via-indigo-950/40 to-slate-950',
      border: 'border-blue-500/40',
      accent: '#38bdf8',
      icon: (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border border-blue-400/40 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border border-cyan-400/70 shadow-[0_0_12px_#38bdf8]" />
          </div>
        </div>
      ),
    },
    {
      step: '4. ARRIVING',
      desc: 'New project world appears',
      gradient: 'from-amber-950 via-yellow-950/30 to-slate-950',
      border: 'border-amber-500/40',
      accent: '#fbbf24',
      icon: (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
          <div className="w-10 h-12 rounded border border-amber-400/80 bg-amber-950/50 shadow-[0_0_14px_#fbbf24] flex items-center justify-center">
            <div className="w-4 h-6 bg-amber-400/40 rounded-sm" />
          </div>
        </div>
      ),
    },
    {
      step: '5. EXPLORE',
      desc: 'New project is ready',
      gradient: 'from-cyan-950 via-teal-950/30 to-slate-950',
      border: 'border-cyan-500/50',
      accent: '#00f5ff',
      icon: (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
          <div className="w-12 h-14 rounded-lg border-2 border-cyan-400 bg-cyan-950/60 shadow-[0_0_18px_#00f5ff] flex items-center justify-center">
            <div className="w-8 h-10 rounded border border-cyan-300/60 bg-cyan-900/40 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00f5ff]" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      id="transition-preview-section"
      className="w-full border-t border-slate-800/80 bg-[#020512] px-4 sm:px-6 lg:px-8 py-6 select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: 5 Step Cards */}
        <div className="flex-1">
          {/* Header Title */}
          <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase mb-4 flex items-center gap-2">
            <span className="text-cyan-400 font-bold">TRANSITION PREVIEW</span>
            <span className="text-slate-600">—</span>
            <span>TRAVELING BETWEEN PROJECT WORLDS</span>
          </div>

          {/* 5 Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-xl border ${item.border} bg-gradient-to-b ${item.gradient} p-2.5 flex flex-col justify-between h-28 sm:h-32 transition-all duration-200 hover:border-cyan-400/80`}
              >
                <div className="w-full h-14 sm:h-16 rounded-lg bg-black/40 border border-slate-800/60 overflow-hidden">
                  {item.icon}
                </div>
                <div className="mt-2">
                  <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wide text-white">
                    {item.step}
                  </div>
                  <div className="text-[9px] font-sans text-slate-400 leading-tight">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Inspirational Quote */}
        <div className="lg:w-72 flex flex-col lg:items-end justify-center text-left lg:text-right border-t lg:border-t-0 lg:border-l border-slate-800/60 pt-4 lg:pt-0 lg:pl-6">
          <p className="text-base sm:text-lg italic font-serif text-slate-200 leading-snug">
            “Different dimensions.
            <br />
            A brighter tomorrow.”
          </p>
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase mt-2">
            — NANDHAKUMAR
          </span>
        </div>
      </div>
    </div>
  );
};
