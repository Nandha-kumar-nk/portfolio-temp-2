import React from 'react';

interface ProjectVoyageAtmosphereProps {
  projectId: string;
  accentColor: string;
}

export const ProjectVoyageAtmosphere: React.FC<ProjectVoyageAtmosphereProps> = ({
  projectId,
  accentColor,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
      {/* Radial Backlight Glow */}
      <div
        className="absolute w-[120%] h-[120%] rounded-full blur-3xl opacity-20 transition-all duration-700 scale-110"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 65%)`,
        }}
      />

      {/* Swayam 2.0 — Floating Data Particles & Streams */}
      {projectId === 'swayam-2' && (
        <div className="absolute w-full h-full opacity-40">
          <span className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-60" />
          <span className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
          <span className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 rounded-full bg-cyan-500/40 blur-[1px]" />
          <span className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-cyan-200 animate-pulse" />
          <div className="absolute top-1/2 left-10 w-24 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse" />
          <div className="absolute bottom-1/3 right-12 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse" />
        </div>
      )}

      {/* Resume Forge — Violet Document Grid & Floating Text Lines */}
      {projectId === 'resume-forge' && (
        <div className="absolute w-full h-full opacity-35">
          <div className="absolute inset-0 bg-[radial-gradient(#c084fc_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
          <span className="absolute top-1/5 right-1/5 w-2 h-2 rounded-full bg-purple-400 blur-[1px] animate-pulse" />
          <span className="absolute bottom-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
        </div>
      )}

      {/* Speed Taxi — GPS Route Line & Vector Pulses */}
      {projectId === 'speed-taxi' && (
        <div className="absolute w-full h-full opacity-30 flex items-center justify-center">
          <svg className="w-full h-full max-w-xl" viewBox="0 0 500 250" fill="none">
            <path
              d="M 30,125 C 150,30 350,220 470,125"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="animate-pulse"
            />
            <path
              d="M 50,180 C 180,220 320,30 450,150"
              stroke="#00f5ff"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle cx="250" cy="125" r="4" fill="#00f5ff" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* AI Wildlife — Emerald Radar Rings & Detection Pulses */}
      {projectId === 'wildlife-ai' || projectId === 'ai-wildlife' ? (
        <div className="absolute w-full h-full opacity-35 flex items-center justify-center">
          <div className="w-72 h-72 rounded-full border border-emerald-500/30 animate-ping opacity-40" />
          <span className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-emerald-400 blur-[1px] animate-pulse" />
          <span className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-cyan-400 blur-[1px] animate-ping" />
        </div>
      ) : null}

      {/* NK MERN CLI — Terminal Scanlines & Code Particles */}
      {projectId === 'nk-mern-cli' && (
        <div className="absolute w-full h-full opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,245,255,0.12)_51%)] [background-size:100%_4px]" />
          <div className="absolute top-1/4 left-16 font-mono text-[10px] text-cyan-400/30 tracking-widest">
            $ npx nk-mern-cli init
          </div>
          <div className="absolute bottom-1/4 right-16 font-mono text-[10px] text-cyan-400/30 tracking-widest">
            ✔ SCAFFOLDING READY
          </div>
        </div>
      )}
    </div>
  );
};
