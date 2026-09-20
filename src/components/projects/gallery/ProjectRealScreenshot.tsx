import React from 'react';
import { ProjectItem } from '../../../data/projectsData';

interface ProjectRealScreenshotProps {
  project: ProjectItem;
  className?: string;
  isHero?: boolean;
}

export const ProjectRealScreenshot: React.FC<ProjectRealScreenshotProps> = ({
  project,
  className = '',
  isHero = false,
}) => {
  // Domain URL mapping for browser address bar simulation
  const domainUrl = React.useMemo(() => {
    switch (project.id) {
      case 'swayam-2':
        return 'swayam2.vercel.app/courses/cs101/lectures';
      case 'speed-taxi':
        return 'speedtaxi.urban/dispatch/live-map';
      case 'wildlife-ai':
        return 'wildlife-shield.ai/ranger-dashboard/zones';
      case 'resume-forge':
        return 'resumeforge.dev/studio/ats-preview';
      case 'nk-mern-cli':
        return 'terminal.dev/packages/nk-mern-cli';
      default:
        return 'nandhakumar.universe/projects';
    }
  }, [project.id]);

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden bg-[#070913] border border-slate-700/60 shadow-[0_12px_36px_rgba(0,0,0,0.8)] flex flex-col ${className}`}
    >
      {/* Browser / Application Window Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0d111e] border-b border-slate-800/90 select-none">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80 border border-rose-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 border border-amber-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-400/50" />
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#05070e] border border-slate-800 text-[10px] font-mono text-slate-400 max-w-[260px] sm:max-w-[340px] truncate">
          <span className="text-emerald-400 text-[9px]">🔒</span>
          <span className="text-slate-500">https://</span>
          <span className="text-slate-200 font-medium truncate">{domainUrl}</span>
        </div>

        {/* Window tag */}
        <div className="hidden sm:flex items-center gap-1 text-[9px] font-mono font-semibold text-cyan-400/90 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>PRODUCTION</span>
        </div>
      </div>

      {/* Screen Content Viewport */}
      <div className={`relative w-full overflow-hidden ${isHero ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}>
        {/* Project Specific High-Fidelity UI Interface */}
        {project.id === 'swayam-2' && <SwayamScreenMockup />}
        {project.id === 'speed-taxi' && <SpeedTaxiScreenMockup />}
        {project.id === 'wildlife-ai' && <WildlifeAIScreenMockup />}
        {project.id === 'resume-forge' && <ResumeForgeScreenMockup />}
        {project.id === 'nk-mern-cli' && <MernCliScreenMockup />}

        {/* Subtle glass glare overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-cyan-400/[0.04] pointer-events-none" />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 1. SWAYAM 2.0 UI MOCKUP                                                   */
/* -------------------------------------------------------------------------- */
const SwayamScreenMockup: React.FC = () => (
  <div className="w-full h-full bg-[#050b14] text-white p-3 sm:p-4 flex flex-col gap-2 font-sans select-none overflow-hidden">
    {/* Inner Subnav */}
    <div className="flex items-center justify-between pb-2 border-b border-cyan-950/80">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-[10px] font-bold text-cyan-300">
          S2
        </div>
        <span className="text-xs font-bold tracking-wide text-white">SWAYAM 2.0 DIGITAL CAMPUS</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[9px] font-mono text-cyan-300">
          ● WebSocket Live
        </span>
        <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-mono">
          NK
        </div>
      </div>
    </div>

    {/* Main Dashboard Layout */}
    <div className="grid grid-cols-12 gap-2 flex-1 min-h-0">
      {/* Left Sidebar: Course navigation */}
      <div className="col-span-4 bg-[#0a1220] rounded-lg p-2 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider mb-1 font-semibold">
            My Enrolled Courses
          </div>
          <div className="space-y-1">
            <div className="p-1.5 rounded bg-cyan-950/40 border border-cyan-500/40 text-[10px] flex items-center justify-between">
              <span className="font-medium text-white truncate">Full Stack MERN Architecture</span>
              <span className="text-[8px] font-mono text-cyan-300">92%</span>
            </div>
            <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800 text-[10px] text-slate-300 flex items-center justify-between">
              <span className="truncate">Distributed Cloud Systems</span>
              <span className="text-[8px] font-mono text-slate-400">74%</span>
            </div>
            <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800 text-[10px] text-slate-300 flex items-center justify-between">
              <span className="truncate">Data Structures & Algo</span>
              <span className="text-[8px] font-mono text-slate-400">100%</span>
            </div>
          </div>
        </div>

        {/* Automated Reminder Alert Banner */}
        <div className="mt-1 p-1.5 rounded bg-rose-950/40 border border-rose-500/40 flex items-start gap-1.5">
          <span className="text-rose-400 text-[10px]">⏰</span>
          <div className="text-[8.5px] leading-tight">
            <div className="font-bold text-rose-300">Assignment Reminder</div>
            <div className="text-slate-400">MERN Microservices due in 4 hours</div>
          </div>
        </div>
      </div>

      {/* Right Content: Active Lecture & Video Stream */}
      <div className="col-span-8 bg-[#080e1a] rounded-lg p-2.5 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[11px] font-bold text-cyan-300">Module 07: Real-Time Event Pipelines</div>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
              Interactive Lab
            </span>
          </div>

          {/* Interactive Player Mockup */}
          <div className="w-full aspect-[16/7] rounded bg-slate-950 border border-cyan-900/50 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/60 via-slate-950 to-blue-950/40" />
            <div className="relative z-10 flex items-center gap-2 text-cyan-400">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(0,245,255,0.4)]">
                ▶
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-white">Lecture 7.3: WebSocket Handshake & Rooms</div>
                <div className="text-[8px] font-mono text-slate-400">Duration: 24:18 • Professor Nandhakumar</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Discussion Stream */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80 text-[9px] font-mono text-slate-400">
          <span className="text-cyan-400">💬 Live Q&A (18 active)</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400">✓ Automated NodeMailer Sync Active</span>
        </div>
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 2. SPEED TAXI UI MOCKUP                                                   */
/* -------------------------------------------------------------------------- */
const SpeedTaxiScreenMockup: React.FC = () => (
  <div className="w-full h-full bg-[#05070e] text-white p-3 sm:p-4 flex flex-col gap-2 font-sans select-none overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between pb-1.5 border-b border-amber-950/60">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-amber-500/20 border border-amber-400 flex items-center justify-center text-[10px] font-black text-amber-300">
          🚖
        </div>
        <span className="text-xs font-bold tracking-wide text-white">SPEED TAXI URBAN DISPATCH</span>
      </div>
      <div className="flex items-center gap-2 text-[9px] font-mono">
        <span className="text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          48 Cabs Active
        </span>
      </div>
    </div>

    {/* Dispatch Grid */}
    <div className="grid grid-cols-12 gap-2 flex-1 min-h-0">
      {/* Left: Map telemetry canvas view */}
      <div className="col-span-8 bg-[#080d1a] rounded-lg p-2 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
        {/* Procedural Map Grid Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="city-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#city-grid)" />
          {/* Active Route Polyline */}
          <path
            d="M 30 110 L 90 70 L 160 85 L 240 40 L 310 55"
            fill="none"
            stroke="#eab308"
            strokeWidth="3"
            strokeDasharray="6 3"
          />
        </svg>

        <div className="relative z-10 flex items-center justify-between">
          <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-amber-500/40 text-[9px] font-mono text-amber-300">
            Route #TX-8820 • ETA: 4 mins
          </span>
          <span className="text-[9px] font-mono text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded">
            GPS Lat: 13.0827° N, 80.2707° E
          </span>
        </div>

        {/* Map Markers */}
        <div className="relative z-10 flex items-center justify-between px-4 pb-1">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950/90 border border-cyan-500/60 text-[9px]">
            <span className="text-cyan-400 font-bold">📍 Pickup:</span>
            <span className="text-white font-mono">Central Tech Park</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950/90 border border-amber-500/60 text-[9px]">
            <span className="text-amber-400 font-bold">🏁 Dropoff:</span>
            <span className="text-white font-mono">International Airport</span>
          </div>
        </div>
      </div>

      {/* Right: Booking & Fare Calculator */}
      <div className="col-span-4 bg-[#0a101f] rounded-lg p-2 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="text-[9px] font-mono text-amber-400 uppercase tracking-wider font-semibold mb-1">
            Dynamic Fare Engine
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between text-slate-400">
              <span>Base Fare:</span>
              <span className="font-mono text-white">$4.50</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Distance (14.2 km):</span>
              <span className="font-mono text-white">$18.20</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Traffic Factor:</span>
              <span className="font-mono text-emerald-400">1.0x (Optimal)</span>
            </div>
            <div className="pt-1 border-t border-slate-800 flex justify-between font-bold text-white">
              <span>Total Est:</span>
              <span className="font-mono text-amber-400 text-xs">$22.70</span>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          type="button"
          className="w-full py-1.5 rounded bg-amber-500/20 border border-amber-400 hover:bg-amber-500/30 text-amber-300 font-bold text-[10px] tracking-wider transition-all pointer-events-none"
        >
          DISPATCH IMMEDIATE RIDE
        </button>
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 3. AI WILDLIFE CONFLICT SHIELD UI MOCKUP                                  */
/* -------------------------------------------------------------------------- */
const WildlifeAIScreenMockup: React.FC = () => (
  <div className="w-full h-full bg-[#030906] text-white p-3 sm:p-4 flex flex-col gap-2 font-sans select-none overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between pb-1.5 border-b border-emerald-950/80">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-[10px] font-bold text-emerald-300">
          🛰️
        </div>
        <span className="text-xs font-bold tracking-wide text-white">AI WILDLIFE CONFLICT SHIELD</span>
      </div>
      <div className="flex items-center gap-2 text-[9px] font-mono">
        <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
          YOLOv8 Inference: 38ms
        </span>
      </div>
    </div>

    {/* Main Sensor Viewport */}
    <div className="grid grid-cols-12 gap-2 flex-1 min-h-0">
      {/* Left: Edge Camera Stream with Bounding Box */}
      <div className="col-span-8 bg-[#04120a] rounded-lg p-2 border border-emerald-900/60 relative overflow-hidden flex flex-col justify-between">
        {/* Radar Scanning Grid Line */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15),transparent_70%)]" />

        <div className="relative z-10 flex items-center justify-between text-[9px] font-mono">
          <span className="text-emerald-400 font-bold">CAM-04: Forest Perimeter Buffer 2</span>
          <span className="text-red-400 animate-pulse font-bold">● LIVE DETECT</span>
        </div>

        {/* AI Bounding Box Graphic */}
        <div className="relative z-10 my-auto mx-auto w-44 h-24 rounded border-2 border-emerald-400 bg-emerald-500/10 flex flex-col justify-between p-1.5 shadow-[0_0_15px_rgba(34,197,94,0.4)]">
          <div className="flex items-center justify-between text-[8px] font-mono font-bold bg-emerald-950/90 text-emerald-300 px-1 rounded">
            <span>[ELEPHAS MAXIMUS]</span>
            <span>97.4% CONF</span>
          </div>
          <div className="text-[7.5px] font-mono text-emerald-200">
            Vector: 1.2 m/s toward Village Sector B
          </div>
        </div>

        {/* Telemetry Status Bar */}
        <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-emerald-400/80 pt-1 border-t border-emerald-950">
          <span>Thermal: Normal</span>
          <span>Acoustic Deterrent: ARMED</span>
          <span>Mesh Ping: 12ms</span>
        </div>
      </div>

      {/* Right: Ranger Notification Feed */}
      <div className="col-span-4 bg-[#05140b] rounded-lg p-2 border border-emerald-900/60 flex flex-col justify-between">
        <div>
          <div className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider font-semibold mb-1">
            Autonomous Ranger Alerts
          </div>
          <div className="space-y-1">
            <div className="p-1 rounded bg-red-950/50 border border-red-500/50 text-[8.5px] leading-tight">
              <div className="text-red-300 font-bold">⚠️ Warning Dispatched</div>
              <div className="text-slate-400">Telegram SMS sent to 14 Forest Rangers</div>
            </div>
            <div className="p-1 rounded bg-emerald-950/40 border border-emerald-600/40 text-[8.5px] leading-tight">
              <div className="text-emerald-300 font-bold">Zone 3 Cleared</div>
              <div className="text-slate-400">Animal redirected away from boundary</div>
            </div>
          </div>
        </div>

        <div className="p-1.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-center">
          <span className="text-[9px] font-mono text-emerald-300 font-bold">
            Conflict Avoidance: 100%
          </span>
        </div>
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 4. RESUME FORGE UI MOCKUP                                                 */
/* -------------------------------------------------------------------------- */
const ResumeForgeScreenMockup: React.FC = () => (
  <div className="w-full h-full bg-[#080511] text-white p-3 sm:p-4 flex flex-col gap-2 font-sans select-none overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between pb-1.5 border-b border-purple-950/80">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-purple-500/20 border border-purple-400 flex items-center justify-center text-[10px] font-bold text-purple-300">
          📄
        </div>
        <span className="text-xs font-bold tracking-wide text-white">RESUME FORGE ATS STUDIO</span>
      </div>
      <div className="flex items-center gap-2 text-[9px] font-mono">
        <span className="text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/40">
          ATS Score: 98/100
        </span>
      </div>
    </div>

    {/* Studio Layout */}
    <div className="grid grid-cols-12 gap-2 flex-1 min-h-0">
      {/* Left: Interactive Section Editor */}
      <div className="col-span-5 bg-[#0e091e] rounded-lg p-2 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="text-[9px] font-mono text-purple-400 uppercase tracking-wider font-semibold mb-1">
            Document Sections
          </div>
          <div className="space-y-1 text-[9px]">
            <div className="p-1 rounded bg-purple-950/50 border border-purple-500/40 text-purple-200 flex items-center justify-between">
              <span>● Experience & Achievements</span>
              <span className="text-emerald-400">✓ ATS Parsed</span>
            </div>
            <div className="p-1 rounded bg-slate-900/70 border border-slate-800 text-slate-300 flex items-center justify-between">
              <span>● Technical Core Stack</span>
              <span className="text-emerald-400">✓ ATS Parsed</span>
            </div>
            <div className="p-1 rounded bg-slate-900/70 border border-slate-800 text-slate-300 flex items-center justify-between">
              <span>● Education & Honors</span>
              <span className="text-emerald-400">✓ ATS Parsed</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="w-full py-1 rounded bg-purple-500/20 border border-purple-400 text-purple-300 font-bold text-[9px] tracking-wider pointer-events-none"
        >
          EXPORT HIGH-RES PDF
        </button>
      </div>

      {/* Right: Live ATS Resume Preview Sheet */}
      <div className="col-span-7 bg-[#ffffff] text-slate-900 rounded-lg p-3 shadow-inner flex flex-col justify-between overflow-hidden">
        <div>
          <div className="border-b border-slate-300 pb-1.5 mb-1.5 flex items-start justify-between">
            <div>
              <div className="text-[12px] font-black tracking-tight text-slate-900 leading-none">
                NANDHAKUMAR
              </div>
              <div className="text-[8px] font-medium text-cyan-700 font-mono mt-0.5">
                Full-Stack Systems Architect & AI Engineer
              </div>
            </div>
            <div className="text-[7.5px] text-slate-500 text-right font-mono">
              portfolio.dev • github.com/nandhakumar
            </div>
          </div>

          <div className="space-y-1 text-[8px] leading-tight">
            <div>
              <span className="font-bold text-slate-900">SWAYAM 2.0:</span> Built full-stack digital education platform using MERN & WebSockets.
            </div>
            <div>
              <span className="font-bold text-slate-900">AI Conflict Shield:</span> Trained YOLOv8 models for sub-40ms wildlife detection.
            </div>
            <div>
              <span className="font-bold text-slate-900">NK MERN CLI:</span> Scaffolds enterprise containerized architectures in seconds.
            </div>
          </div>
        </div>

        <div className="pt-1 border-t border-slate-200 flex items-center justify-between text-[7.5px] font-mono text-slate-500">
          <span>Format: Vector PDF / JSON</span>
          <span className="text-emerald-700 font-bold">✓ 100% Parser Compliant</span>
        </div>
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 5. NK MERN CLI UI MOCKUP                                                  */
/* -------------------------------------------------------------------------- */
const MernCliScreenMockup: React.FC = () => (
  <div className="w-full h-full bg-[#020509] text-white p-3 sm:p-4 flex flex-col gap-1.5 font-mono select-none overflow-hidden">
    {/* Terminal Header */}
    <div className="flex items-center justify-between pb-1.5 border-b border-cyan-950/80">
      <div className="flex items-center gap-1.5">
        <span className="text-cyan-400 font-bold text-xs">&gt;_</span>
        <span className="text-[11px] font-bold tracking-wider text-cyan-300">
          NK-MERN-CLI // BASH SHELL
        </span>
      </div>
      <div className="text-[9px] text-slate-400">node v22.14.0 • npm 10.8</div>
    </div>

    {/* Terminal Interactive Session */}
    <div className="flex-1 bg-[#010408] rounded p-2.5 border border-slate-800/80 text-[9.5px] leading-relaxed flex flex-col justify-between overflow-hidden">
      <div className="space-y-1">
        <div className="text-cyan-400">
          $ <span className="text-white font-bold">npx nk-mern-cli init cloud-production-app</span>
        </div>
        <div className="text-slate-400">? Select UI Framework: <span className="text-cyan-300 font-bold">React 18 + Tailwind CSS</span></div>
        <div className="text-slate-400">? Authentication Model: <span className="text-purple-300 font-bold">JWT + Refresh Tokens + RBAC</span></div>
        <div className="text-slate-400">? Containerization: <span className="text-blue-300 font-bold">Docker + Docker-Compose Multi-Stage</span></div>

        <div className="pt-1 text-emerald-400 space-y-0.5">
          <div>✔ Created /server (Express, Mongoose, Jest)</div>
          <div>✔ Created /client (Vite, React, Tailwind)</div>
          <div>✔ Configured Dockerfile & docker-compose.yml</div>
          <div>✔ Initialized Git repository & CI/CD workflow</div>
        </div>
      </div>

      <div className="p-1.5 rounded bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-between text-[9px]">
        <span className="text-cyan-300 font-bold">
          ✨ Successfully generated in 1.4s! Saved ~3 hours.
        </span>
        <span className="text-emerald-400 font-bold">$ cd cloud-app &amp;&amp; npm run dev</span>
      </div>
    </div>
  </div>
);
