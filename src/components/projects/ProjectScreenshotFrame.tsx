import React from 'react';
import { ProjectItem } from '../../data/projectsData';
import {
  ExternalLink,
  Search,
  BookOpen,
  Users,
  Video,
  MapPin,
  Navigation,
  ShieldAlert,
  Radio,
  FileText,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ProjectScreenshotFrameProps {
  project: ProjectItem;
  className?: string;
  isTransitioning?: boolean;
}

export const ProjectScreenshotFrame: React.FC<ProjectScreenshotFrameProps> = ({
  project,
  className = '',
  isTransitioning = false,
}) => {
  const accent = project.themeColor || project.accentColor || '#00f5ff';

  // Render authentic procedural UI screenshot based on project.id
  const renderScreenshotContent = () => {
    switch (project.id) {
      case 'swayam-2':
        return (
          <div className="w-full h-full bg-slate-900 text-slate-100 flex flex-col font-sans select-none overflow-hidden text-[11px]">
            {/* Top Navigation Bar */}
            <div className="w-full h-9 bg-slate-950 border-b border-slate-800/80 px-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff]" />
                <span className="font-bold tracking-wider text-xs text-white">SWAYAM 2.0</span>
                <span className="hidden sm:inline text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  EDU-OS
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <span className="text-cyan-300 font-medium">Courses</span>
                <span>Lectures</span>
                <span>Assignments</span>
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-[9px] font-bold text-cyan-300">
                  NK
                </span>
              </div>
            </div>

            {/* Hero / Dashboard Area */}
            <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-slate-900 via-[#071326] to-slate-950">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[9px] font-mono text-cyan-300 mb-1.5">
                  <BookOpen className="w-2.5 h-2.5 text-cyan-400" />
                  <span>MODERN FULL-STACK LEARNING</span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-white tracking-tight">
                  Learn Without Limits
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                  Rebuilt MERN platform with real-time notifications & deadline reminders.
                </p>

                {/* Search Bar Mock */}
                <div className="mt-2.5 w-full h-7 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center px-2.5 gap-2 text-[10px] text-slate-400">
                  <Search className="w-3 h-3 text-cyan-400" />
                  <span>Search computer science, AI, systems...</span>
                </div>
              </div>

              {/* Metrics & Active Module Card */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 flex flex-col">
                  <span className="text-xs font-bold text-cyan-300">10K+</span>
                  <span className="text-[8px] text-slate-400 font-mono">Learners</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 flex flex-col">
                  <span className="text-xs font-bold text-blue-400">500+</span>
                  <span className="text-[8px] text-slate-400 font-mono">Courses</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 flex flex-col">
                  <span className="text-xs font-bold text-emerald-400">99.8%</span>
                  <span className="text-[8px] text-slate-400 font-mono">On-Time Submissions</span>
                </div>
              </div>

              {/* Live WebSocket Event Strip */}
              <div className="mt-2.5 px-2.5 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-between text-[9px]">
                <div className="flex items-center gap-1.5 text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="font-mono">Socket.IO Broadcast: Assignment Due in 2h</span>
                </div>
                <span className="font-mono text-[8px] text-slate-400">Live</span>
              </div>
            </div>
          </div>
        );

      case 'speed-taxi':
        return (
          <div className="w-full h-full bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-hidden text-[11px]">
            {/* Header */}
            <div className="w-full h-9 bg-slate-950 border-b border-slate-800 px-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                <span className="font-bold tracking-wider text-xs text-white">SPEED TAXI</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-mono">
                  DISPATCH 2.4
                </span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 18 Cabs Active
              </span>
            </div>

            {/* Map Simulation Body */}
            <div className="relative flex-1 bg-[#09111e] p-3 flex flex-col justify-between overflow-hidden">
              {/* Simulated GPS Map Grid Lines */}
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Dynamic Map Route Line & Vehicle */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <div>
                    <div className="text-[10px] font-bold text-white">Pickup: Tech Park Hub</div>
                    <div className="text-[8px] text-slate-400">Dropoff: International Terminal</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-amber-300 font-mono">$24.50</div>
                  <div className="text-[8px] font-mono text-slate-400">ETA 12 MINS</div>
                </div>
              </div>

              {/* Waypoint graphic */}
              <div className="relative z-10 my-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
                    🚕
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white">Prius EV • Driver: Alex M.</div>
                    <div className="text-[8px] font-mono text-cyan-300">Dynamic Surge Fare: 1.0x (Optimal)</div>
                  </div>
                </div>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  DISPATCHED
                </span>
              </div>

              {/* Telemetry bottom bar */}
              <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-slate-400 border-t border-slate-800 pt-1.5">
                <span>LAT: 12.9716° N</span>
                <span>LON: 77.5946° E</span>
                <span className="text-cyan-400">SPEED: 42 KM/H</span>
              </div>
            </div>
          </div>
        );

      case 'wildlife-ai':
        return (
          <div className="w-full h-full bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-hidden text-[11px]">
            {/* Header */}
            <div className="w-full h-9 bg-slate-950 border-b border-slate-800 px-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                <span className="font-bold tracking-wider text-xs text-white">WILDLIFE CONFLICT SHIELD</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-mono">
                AI SENSOR MESH
              </span>
            </div>

            {/* Radar / Thermal Feed */}
            <div className="relative flex-1 bg-[#041209] p-3 flex flex-col justify-between overflow-hidden">
              {/* Radar Rings Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-25">
                <div className="w-48 h-48 rounded-full border border-emerald-400" />
                <div className="absolute w-32 h-32 rounded-full border border-emerald-400" />
                <div className="absolute w-16 h-16 rounded-full border border-emerald-400" />
              </div>

              {/* Top Alert Banner */}
              <div className="relative z-10 flex items-center justify-between p-2 rounded-lg bg-emerald-950/80 border border-emerald-400/40">
                <div className="flex items-center gap-2 text-emerald-300">
                  <ShieldAlert className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <div>
                    <div className="text-[10px] font-bold text-white">Elephant Herd Detected</div>
                    <div className="text-[8px] font-mono text-emerald-300">Corridor Sector 4A • Range 120m</div>
                  </div>
                </div>
                <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                  WARNING
                </span>
              </div>

              {/* Real-time Telemetry Card */}
              <div className="relative z-10 grid grid-cols-2 gap-2 my-1">
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <div className="text-[8px] font-mono text-slate-400">YOLOv8 CONFIDENCE</div>
                  <div className="text-xs font-mono font-bold text-emerald-300 mt-0.5">97.4% ACCURACY</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <div className="text-[8px] font-mono text-slate-400">BIO-ACOUSTIC DETERRENT</div>
                  <div className="text-xs font-mono font-bold text-cyan-300 mt-0.5">ACTIVE (FREQ: 18.5kHz)</div>
                </div>
              </div>

              {/* Status footer */}
              <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-emerald-400/80 pt-1 border-t border-emerald-900/60">
                <span>SENSORS ONLINE: 24/24</span>
                <span>ZERO CASUALTIES RECORDED</span>
              </div>
            </div>
          </div>
        );

      case 'resume-forge':
        return (
          <div className="w-full h-full bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-hidden text-[11px]">
            {/* Header */}
            <div className="w-full h-9 bg-slate-950 border-b border-slate-800 px-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a855f7]" />
                <span className="font-bold tracking-wider text-xs text-white">RESUME FORGE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-500/30">
                  ATS OPTIMIZER: 96/100
                </span>
              </div>
            </div>

            {/* Split Screen Editor + Preview Mock */}
            <div className="flex-1 bg-[#0d0718] p-3 flex gap-2 overflow-hidden">
              {/* Left Column: Form Builder Fields */}
              <div className="w-1/2 flex flex-col justify-between">
                <div>
                  <div className="text-[9px] font-mono text-violet-300 uppercase tracking-wider mb-1">
                    Live Document Builder
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-5 rounded bg-slate-900 border border-violet-500/30 px-2 flex items-center text-[8px] text-slate-300">
                      Nandhakumar • Full Stack Dev
                    </div>
                    <div className="h-5 rounded bg-slate-900 border border-slate-800 px-2 flex items-center text-[8px] text-slate-400">
                      React, Node, Three.js, AI Systems
                    </div>
                    <div className="h-5 rounded bg-slate-900 border border-slate-800 px-2 flex items-center text-[8px] text-slate-400">
                      Experience: 3+ Production Apps
                    </div>
                  </div>
                </div>

                <div className="p-1.5 rounded-lg bg-violet-950/40 border border-violet-500/20 text-[8px] font-mono text-violet-300 flex items-center justify-between">
                  <span>Keyword Density: Optimal</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                </div>
              </div>

              {/* Right Column: Clean Document Paper Preview */}
              <div className="w-1/2 bg-white text-slate-900 rounded-lg p-2 flex flex-col justify-between shadow-lg text-[7px] leading-tight">
                <div>
                  <div className="font-bold text-[9px] text-slate-900 uppercase tracking-tight">
                    NANDHAKUMAR
                  </div>
                  <div className="text-[7px] text-slate-600 font-mono border-b border-slate-200 pb-1 mb-1">
                    Full Stack & 3D Systems Engineer
                  </div>
                  <div className="font-bold text-slate-800 mt-1">EXPERIENCE</div>
                  <div className="text-slate-600 mt-0.5">• Engineered real-time MERN systems</div>
                  <div className="text-slate-600">• Built WebGL & React Three Fiber tools</div>
                  <div className="font-bold text-slate-800 mt-1">SKILLS</div>
                  <div className="text-slate-600">TypeScript, Three.js, MongoDB, Express</div>
                </div>
                <div className="text-right text-[6px] text-emerald-600 font-mono font-bold">
                  ✓ ATS COMPLIANT
                </div>
              </div>
            </div>
          </div>
        );

      case 'nk-mern-cli':
        return (
          <div className="w-full h-full bg-[#030712] text-slate-100 flex flex-col font-mono select-none overflow-hidden text-[10px]">
            {/* Terminal Window Header */}
            <div className="w-full h-8 bg-slate-950 border-b border-slate-800 px-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[9px] text-slate-400 font-mono">bash — nk-mern-cli</span>
              </div>
              <span className="text-[8px] text-cyan-400">v1.4.0</span>
            </div>

            {/* Terminal Output Stream */}
            <div className="flex-1 p-3 flex flex-col justify-between text-[9px] leading-relaxed text-slate-300 overflow-hidden">
              <div className="space-y-1">
                <div className="text-cyan-300">
                  $ npx nk-mern-cli create fullstack-app --template production
                </div>
                <div className="text-slate-400 pl-2">
                  → Analyzing target architecture: MERN + Vite + Socket.IO
                </div>
                <div className="text-emerald-400 pl-2 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Configured Express backend with JWT role auth</span>
                </div>
                <div className="text-emerald-400 pl-2 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Bootstrapped React 18 TypeScript frontend</span>
                </div>
                <div className="text-emerald-400 pl-2 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Generated Mongoose models & database seeders</span>
                </div>
              </div>

              {/* Ready prompt */}
              <div className="p-2 rounded bg-slate-950 border border-cyan-500/30 text-cyan-300 flex items-center justify-between text-[8.5px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>Server running on http://localhost:3000</span>
                </div>
                <span className="text-slate-500 text-[8px]">0.9s scaffold time</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      id="project-screenshot-frame"
      className={`relative w-full rounded-2xl overflow-hidden border border-slate-800/90 bg-slate-950/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-500 ${
        isTransitioning ? 'opacity-30 scale-95 blur-[1px]' : 'opacity-100 scale-100 blur-0'
      } ${className}`}
      style={{
        boxShadow: `0 0 30px ${accent}15, 0 16px 40px rgba(0,0,0,0.7)`,
      }}
    >
      {/* Outer subtle glow rim */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] opacity-80"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
      />

      {/* Screen Frame Aspect Ratio Wrapper */}
      <div className="relative w-full aspect-[16/10] min-h-[220px] max-h-[290px] overflow-hidden">
        {renderScreenshotContent()}
      </div>

      {/* Frame Bottom Status Bar */}
      <div className="w-full px-3 py-1.5 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between text-[9px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
          <span className="uppercase text-slate-300 font-bold">{project.category}</span>
        </span>
        <span className="text-[8px] text-slate-500">LIVE SYSTEM PREVIEW</span>
      </div>
    </div>
  );
};
