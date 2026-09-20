import React from 'react';
import {
  Globe,
  Bell,
  Layout,
  Target,
  BookOpen,
  Car,
  Navigation,
  Shield,
  FileText,
  Terminal,
  Play,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  Cpu,
  Layers,
  Flame,
} from 'lucide-react';
import { SwayamScreenDisplay } from '../studio/SwayamScreenDisplay';

// =========================================================================
// 1. SPEED TAXI LIVE DISPLAY
// =========================================================================
export const SpeedTaxiScreenDisplay: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-[#0a0f1d] text-white font-sans select-none flex flex-col overflow-hidden">
      {/* Navbar */}
      <div className="w-full bg-[#0d1527]/90 border-b border-sky-500/30 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-400">
            <Car className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-sm tracking-wide text-white">
            SPEED<span className="text-sky-400">TAXI</span>
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="text-sky-400">FLEET ACTIVE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>
      </div>

      {/* Main Content: Map & Telemetry Split */}
      <div className="flex-1 p-3 grid grid-cols-1 md:grid-cols-12 gap-3 overflow-hidden">
        {/* Map Viewport */}
        <div className="md:col-span-7 relative rounded-xl overflow-hidden border border-sky-500/40 bg-[#060b14] flex flex-col justify-between p-3">
          {/* Simulated Dark City Map Grid in SVG */}
          <div className="absolute inset-0 opacity-40">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#0284c7" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Glowing Highway paths */}
              <path d="M 10 90 Q 90 20 180 80 T 320 120" fill="none" stroke="#38bdf8" strokeWidth="3" filter="drop-shadow(0 0 6px #38bdf8)" />
              <path d="M 40 180 Q 140 120 220 180 T 340 90" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
            </svg>
          </div>

          {/* Map Overlay Markers */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="px-2.5 py-1 rounded-full bg-black/80 border border-sky-400/60 text-[10px] font-mono text-sky-300 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-sky-400 animate-bounce" />
              <span>Downtown Sector 7 &rarr; Airport Terminal 2</span>
            </div>
            <div className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[9px] font-mono text-emerald-400">
              ETA: 8 MIN
            </div>
          </div>

          {/* Car Vehicle Marker */}
          <div className="relative z-10 self-center my-auto flex flex-col items-center">
            <div className="relative p-2.5 rounded-full bg-sky-500/20 border border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.5)]">
              <Car className="w-5 h-5 text-sky-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
            </div>
            <div className="mt-1 px-2 py-0.5 rounded bg-black/90 text-[8.5px] font-mono text-slate-300 border border-slate-700">
              Toyota Camry Hybrid (NK-4112)
            </div>
          </div>

          {/* Route Status bar */}
          <div className="relative z-10 p-2 rounded-lg bg-black/80 border border-slate-700 flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400">Distance: <strong className="text-white">14.2 km</strong></span>
            <span className="text-slate-400">Traffic: <strong className="text-emerald-400">Light</strong></span>
            <span className="text-slate-400">Est. Fare: <strong className="text-amber-400">$18.50</strong></span>
          </div>
        </div>

        {/* Right Dispatch & Telemetry Panel */}
        <div className="md:col-span-5 flex flex-col justify-between gap-2">
          <div className="p-3 rounded-xl bg-[#0d1629] border border-sky-500/30 space-y-2">
            <div className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider">
              RAPID RIDE DISPATCH
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="p-2 rounded-lg bg-[#070b14] border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Pick-up</span>
                <span className="text-white font-medium text-[11px] truncate">104 Tech Boulevard</span>
              </div>
              <div className="p-2 rounded-lg bg-[#070b14] border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Destination</span>
                <span className="text-white font-medium text-[11px] truncate">Metro Grand Terminal</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all cursor-pointer"
            >
              Confirm Rapid Ride
            </button>
          </div>

          {/* Driver Fleet Telemetry */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 rounded-lg bg-[#0d1629] border border-slate-800">
              <div className="text-[14px] font-black text-white font-mono">14</div>
              <div className="text-[9px] text-slate-400 uppercase font-mono">Active Drivers</div>
            </div>
            <div className="p-2 rounded-lg bg-[#0d1629] border border-slate-800">
              <div className="text-[14px] font-black text-emerald-400 font-mono">99.4%</div>
              <div className="text-[9px] text-slate-400 uppercase font-mono">Dispatch Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. AI WILDLIFE CONFLICT SHIELD LIVE DISPLAY
// =========================================================================
export const WildlifeAiScreenDisplay: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-[#06120b] text-white font-sans select-none flex flex-col overflow-hidden">
      {/* Header */}
      <div className="w-full bg-[#091a10]/95 border-b border-emerald-500/30 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-sm tracking-wide text-white">
            WILDLIFE<span className="text-emerald-400">SHIELD AI</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>EDGE YOLOv8 RUNNING &bull; 38ms</span>
        </div>
      </div>

      {/* Main Viewport: Live Thermal/Camera Feed */}
      <div className="flex-1 p-3 grid grid-cols-1 md:grid-cols-12 gap-3 overflow-hidden">
        {/* Visual Camera Feed with Elephant & Bounding Box */}
        <div className="md:col-span-8 relative rounded-xl overflow-hidden border border-emerald-500/50 bg-[#040a06] flex items-center justify-center">
          {/* Forest & Elephant Silhouette Artwork */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-[#081a0e] to-[#040e07]" />
          
          {/* Mist / Fog */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_70%)]" />

          {/* Elephant SVG Illustration */}
          <div className="relative z-10 w-48 h-36 flex items-center justify-center">
            <svg viewBox="0 0 200 140" className="w-full h-full text-emerald-200/90 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <path
                d="M 60 110 L 60 75 Q 60 40 100 40 Q 140 40 150 70 L 150 110 L 140 110 L 140 85 L 120 85 L 120 110 L 110 110 L 110 85 L 75 85 L 75 110 Z"
                fill="#1e3a29"
                stroke="#10b981"
                strokeWidth="1.5"
              />
              <path
                d="M 60 60 Q 40 65 35 90 Q 30 105 45 105 Q 50 95 50 80"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="65" cy="55" r="2" fill="#4ade80" />
            </svg>

            {/* Neural Computer Vision Bounding Box Overlay */}
            <div className="absolute inset-2 border-2 border-emerald-400 rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.7)] pointer-events-none">
              <div className="absolute -top-3 left-2 px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-400 text-[8.5px] font-mono text-emerald-300 font-bold flex items-center gap-1">
                <span>ELEPHANT</span>
                <span className="text-white">98.4%</span>
              </div>
              <div className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-[7.5px] font-mono text-emerald-400">
                DIST: 42m &bull; SPEED: 3.2km/h
              </div>
            </div>
          </div>

          {/* Grid Crosshairs */}
          <div className="absolute inset-0 pointer-events-none border border-emerald-500/20 flex items-center justify-center">
            <div className="w-8 h-8 border border-emerald-400/40 rounded-full" />
            <div className="absolute w-full h-[1px] bg-emerald-500/10" />
            <div className="absolute h-full w-[1px] bg-emerald-500/10" />
          </div>
        </div>

        {/* Ranger Telemetry & Actions */}
        <div className="md:col-span-4 flex flex-col justify-between gap-2">
          <div className="p-3 rounded-xl bg-[#07170c] border border-emerald-500/30 space-y-2">
            <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
              ZONE TELEMETRY
            </div>
            <div className="space-y-1 font-mono text-[10px]">
              <div className="flex justify-between text-slate-300">
                <span>Geofence:</span>
                <span className="text-emerald-400 font-bold">Sector 4B (Corridor)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Deterrent:</span>
                <span className="text-amber-400">Acoustic Ready</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Ranger Alert:</span>
                <span className="text-emerald-300">Dispatched (SMS)</span>
              </div>
            </div>
          </div>

          {/* Sensor Matrix */}
          <div className="p-2.5 rounded-xl bg-[#07170c] border border-emerald-500/30 space-y-1.5">
            <div className="text-[9px] font-mono text-slate-400 uppercase">Edge IoT Nodes</div>
            <div className="grid grid-cols-3 gap-1 text-center font-mono text-[9px]">
              <div className="p-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">Node A &bull; OK</div>
              <div className="p-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">Node B &bull; OK</div>
              <div className="p-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">Node C &bull; OK</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. RESUME FORGE LIVE DISPLAY
// =========================================================================
export const ResumeForgeScreenDisplay: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-[#120e24] text-white font-sans select-none flex flex-col overflow-hidden">
      {/* Header */}
      <div className="w-full bg-[#171230]/95 border-b border-purple-500/30 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-purple-500/20 border border-purple-400 flex items-center justify-center text-purple-300">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-sm tracking-wide text-white">
            RESUME<span className="text-purple-400">FORGE</span>
          </span>
        </div>
        <div className="px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-500/50 text-[10px] font-mono text-purple-300 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>ATS OPTIMIZED: 94/100</span>
        </div>
      </div>

      {/* Main Studio Viewport */}
      <div className="flex-1 p-3 grid grid-cols-1 md:grid-cols-12 gap-3 overflow-hidden">
        {/* Left: Interactive Section Config */}
        <div className="md:col-span-5 p-3 rounded-xl bg-[#191336] border border-purple-500/30 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-wider">
              DOCUMENT SECTIONS
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="p-2 rounded bg-[#100c24] border border-purple-500/30 flex items-center justify-between text-slate-200">
                <span className="text-[11px]">&bull; Experience & Impact</span>
                <span className="text-emerald-400 text-[9px]">Verified</span>
              </div>
              <div className="p-2 rounded bg-[#100c24] border border-purple-500/30 flex items-center justify-between text-slate-200">
                <span className="text-[11px]">&bull; Technical Skills</span>
                <span className="text-emerald-400 text-[9px]">Verified</span>
              </div>
              <div className="p-2 rounded bg-[#100c24] border border-purple-500/30 flex items-center justify-between text-slate-200">
                <span className="text-[11px]">&bull; Education & Awards</span>
                <span className="text-emerald-400 text-[9px]">Verified</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <button
              type="button"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(192,132,252,0.4)] cursor-pointer"
            >
              Export ATS-Ready PDF
            </button>
          </div>
        </div>

        {/* Right: Live Document Canvas Rendering */}
        <div className="md:col-span-7 rounded-xl bg-white text-slate-900 p-4 shadow-md flex flex-col justify-between overflow-hidden">
          <div className="space-y-2 text-left">
            <div className="border-b border-slate-200 pb-2">
              <div className="text-sm font-black tracking-tight text-slate-900 uppercase">
                NANDHAKUMAR
              </div>
              <div className="text-[10px] font-mono text-purple-700 font-bold">
                FULL STACK & AI SYSTEMS ENGINEER
              </div>
            </div>

            <div className="space-y-1 text-[9.5px] text-slate-700">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[9px] border-b border-slate-100">
                Summary
              </div>
              <p className="line-clamp-2 leading-relaxed">
                Proven developer specializing in scalable MERN architectures, real-time WebSockets, and edge AI vision systems.
              </p>
            </div>

            <div className="space-y-1 text-[9.5px] text-slate-700">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[9px] border-b border-slate-100">
                Key Highlights
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="px-1.5 py-0.5 rounded bg-purple-50 border border-purple-200 text-[8.5px] font-mono text-purple-800">
                  React 19
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200 text-[8.5px] font-mono text-blue-800">
                  Node.js
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[8.5px] font-mono text-emerald-800">
                  Docker
                </span>
              </div>
            </div>
          </div>

          <div className="text-[8.5px] font-mono text-slate-400 text-right">
            Page 1 of 1 &bull; 100% ATS Fidelity
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. NK MERN CLI LIVE DISPLAY
// =========================================================================
export const NkMernCliScreenDisplay: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-[#080d16] text-white font-mono select-none flex flex-col overflow-hidden">
      {/* Terminal Titlebar */}
      <div className="w-full bg-[#0c1322] border-b border-cyan-500/30 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-[11px] text-slate-400 ml-2">bash - nk-mern-cli</span>
        </div>
        <div className="text-[10px] text-cyan-400 font-bold">npm v10.8.2</div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-4 text-xs space-y-2 overflow-hidden text-left">
        <div className="flex items-center gap-2 text-cyan-300">
          <span className="text-emerald-400">$</span>
          <span className="font-bold">npx nk-mern-cli init my-fullstack-app</span>
        </div>

        <div className="text-slate-400 text-[11px] leading-relaxed">
          ⚡ Initializing enterprise MERN boilerplate with JWT, Docker & Tailwind...
        </div>

        <div className="space-y-1 pt-1 text-[11px]">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>✔ React 19 + Vite Frontend initialized</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>✔ Node.js & Express REST Gateway scaffolded</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>✔ MongoDB schemas & JWT Auth guards configured</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>✔ Docker Compose & Healthcheck scripts generated</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-black/60 border border-cyan-500/40 text-[10px] space-y-1 text-cyan-300">
          <div className="font-bold text-white uppercase tracking-wider">Scaffold Summary:</div>
          <div>Bootstrap time: <span className="text-emerald-400 font-bold">4.2 seconds</span> (80%+ saved)</div>
          <div>Run <span className="text-amber-400">cd my-fullstack-app && npm run dev</span> to launch!</div>
        </div>

        {/* Blinking Cursor */}
        <div className="flex items-center gap-1 text-emerald-400 text-xs">
          <span>&gt; Ready for development</span>
          <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block" />
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 5. MASTER CENTRAL SCREEN ROUTER
// =========================================================================
interface ProjectScreenProps {
  projectId: string;
}

export const ProjectScreen: React.FC<ProjectScreenProps> = ({ projectId }) => {
  switch (projectId) {
    case 'swayam-2':
      return <SwayamScreenDisplay />;
    case 'speed-taxi':
      return <SpeedTaxiScreenDisplay />;
    case 'wildlife-ai':
      return <WildlifeAiScreenDisplay />;
    case 'resume-forge':
      return <ResumeForgeScreenDisplay />;
    case 'nk-mern-cli':
      return <NkMernCliScreenDisplay />;
    default:
      return <SwayamScreenDisplay />;
  }
};
