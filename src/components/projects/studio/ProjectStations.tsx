import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export type StationType = 'problem' | 'idea' | 'system' | 'build' | 'result';

export interface StationData {
  type: StationType;
  number: string;
  title: string;
  summary: string;
  detailedTitle: string;
  detailedPoints: string[];
}

export const STATIONS_CONFIG: StationData[] = [
  {
    type: 'problem',
    number: '01',
    title: 'THE PROBLEM',
    summary: 'Understanding usability gaps in existing learning platforms.',
    detailedTitle: 'Fragmented Learning & Missed Deadlines',
    detailedPoints: [
      'Legacy platforms suffer from cluttered navigation, making it hard for students to track active lectures.',
      'Students frequently miss assignment cutoffs due to lack of automated push notifications or proactive reminders.',
      'Slow, disconnected forum interfaces lead to delayed instructor assistance and student disengagement.',
    ],
  },
  {
    type: 'idea',
    number: '02',
    title: 'THE IDEA',
    summary: 'Rebuild with a modern, user-friendly experience focused on real learning.',
    detailedTitle: 'Real-Time Interactive Campus Experience',
    detailedPoints: [
      'Create a unified, distraction-free digital campus that puts current courses and deadlines front and center.',
      'Integrate WebSocket pipelines for instant broadcast alerts and assignment countdown reminders.',
      'Provide an accessible, clean architectural experience that works seamlessly across desktop and mobile devices.',
    ],
  },
  {
    type: 'system',
    number: '03',
    title: 'THE SYSTEM',
    summary: 'Full-stack architecture with real-time communication and scalable design.',
    detailedTitle: 'Full-Stack Scalable MERN Architecture',
    detailedPoints: [
      'Client Layer: React 18 SPA with modular component hierarchy, custom responsive views, and optimistic UI updates.',
      'API & Socket Gateway: Express 4 REST endpoints paired with Socket.IO bidirectional event rooms for real-time broadcasts.',
      'Data & Notification Engine: MongoDB document persistence with indexed queries and automated NodeMailer background dispatch.',
    ],
  },
  {
    type: 'build',
    number: '04',
    title: 'THE BUILD',
    summary: 'Modern technologies, clean code and powerful features.',
    detailedTitle: 'Engineered for Performance & Reliability',
    detailedPoints: [
      'Modular Course & Assignment Management: Clean state management with real-time submission verification.',
      'Automated Reminder Triggers: Scheduled cron tasks and notification badges that proactively warn students 24h/4h before deadlines.',
      'Polished UI & Ergonomics: Modern Tailwind design system with high-contrast typography and intuitive dashboard workflows.',
    ],
  },
  {
    type: 'result',
    number: '05',
    title: 'THE RESULT',
    summary: 'A modern learning platform that makes education simpler, more accessible and engaging for learners.',
    detailedTitle: 'High Engagement & Zero Missed Deadlines',
    detailedPoints: [
      'Achieved seamless real-time student notification delivery with zero latency degradation.',
      'Streamlined course discovery and assignment submission into a cohesive 3-click workflow.',
      'Delivered a verified production-ready learning ecosystem built to empower students everywhere.',
    ],
  },
];

interface ProjectStationsProps {
  activeStation: StationType | null;
  onSelectStation: (type: StationType) => void;
  className?: string;
}

export const ProjectStations: React.FC<ProjectStationsProps> = ({
  activeStation,
  onSelectStation,
  className = '',
}) => {
  const [hoveredStation, setHoveredStation] = useState<StationType | null>(null);

  // Render 3D Station Visual Artifacts based on exact reference image
  const renderStationVisual = (type: StationType, isHovered: boolean, isActive: boolean) => {
    switch (type) {
      case 'problem':
        // Glowing incandescent filament / lightbulb inside glass
        return (
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* Glowing filament core */}
            <div
              className={`absolute w-8 h-8 rounded-full transition-all duration-300 ${
                isHovered || isActive
                  ? 'bg-amber-400/40 blur-md scale-125'
                  : 'bg-amber-400/20 blur-sm'
              }`}
            />
            {/* Clear glass bulb silhouette with warm filament */}
            <svg
              viewBox="0 0 40 40"
              className="w-10 h-10 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="18" r="10" stroke="#fef08a" strokeWidth="1.5" fill="rgba(254, 240, 138, 0.15)" />
              {/* Glowing filament loop */}
              <path
                d="M 17 21 L 18 14 L 20 18 L 22 14 L 23 21"
                stroke="#f59e0b"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Base screw */}
              <rect x="17" y="28" width="6" height="4" rx="1" fill="#78716c" stroke="#d6d3d1" strokeWidth="0.8" />
            </svg>
          </div>
        );

      case 'idea':
        // Holographic blueprint board with lightbulb & circuit
        return (
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div
              className={`absolute w-8 h-8 rounded-md transition-all duration-300 ${
                isHovered || isActive
                  ? 'bg-cyan-400/40 blur-md scale-125'
                  : 'bg-cyan-400/20 blur-sm'
              }`}
            />
            <div className="relative w-9 h-11 rounded-sm bg-[#07172b]/90 border border-cyan-400/90 shadow-[0_0_15px_rgba(0,245,255,0.7)] flex flex-col items-center justify-center p-1">
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
              {/* Circuit lines */}
              <div className="w-5 h-[1px] bg-cyan-400/70 mt-1" />
              <div className="w-4 h-[1px] bg-cyan-400/50 mt-0.5" />
            </div>
          </div>
        );

      case 'system':
        // Layered futuristic 3D glowing slabs / discs
        return (
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div
              className={`absolute w-8 h-8 rounded-full transition-all duration-300 ${
                isHovered || isActive
                  ? 'bg-sky-400/40 blur-md scale-125'
                  : 'bg-sky-400/20 blur-sm'
              }`}
            />
            <div className="relative flex flex-col items-center gap-1">
              <div
                className="w-8 h-2 rounded-xs bg-gradient-to-r from-sky-400 to-cyan-300 border border-cyan-200 shadow-[0_0_10px_rgba(0,245,255,0.9)] animate-pulse"
                style={{ transform: 'rotateX(45deg)' }}
              />
              <div
                className="w-9 h-2 rounded-xs bg-gradient-to-r from-blue-500 to-cyan-400 border border-cyan-300 shadow-[0_0_10px_rgba(0,245,255,0.7)]"
                style={{ transform: 'rotateX(45deg)' }}
              />
              <div
                className="w-10 h-2.5 rounded-xs bg-gradient-to-r from-indigo-600 to-blue-500 border border-cyan-400 shadow-[0_0_10px_rgba(0,245,255,0.5)]"
                style={{ transform: 'rotateX(45deg)' }}
              />
            </div>
          </div>
        );

      case 'build':
        // Glowing neon 3D </> code bracket symbol
        return (
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div
              className={`absolute w-8 h-8 rounded-full transition-all duration-300 ${
                isHovered || isActive
                  ? 'bg-cyan-400/50 blur-md scale-125'
                  : 'bg-cyan-400/20 blur-sm'
              }`}
            />
            <span className="font-mono font-black text-xl text-cyan-300 drop-shadow-[0_0_14px_rgba(0,245,255,1)] tracking-tight">
              &lt;/&gt;
            </span>
          </div>
        );

      case 'result':
        // 3D bar chart analytics hologram (cyan & magenta columns)
        return (
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div
              className={`absolute w-8 h-8 rounded-full transition-all duration-300 ${
                isHovered || isActive
                  ? 'bg-purple-400/40 blur-md scale-125'
                  : 'bg-purple-400/20 blur-sm'
              }`}
            />
            <div className="flex items-end gap-1.5 h-8">
              <div className="w-2 h-4 rounded-t-xs bg-cyan-400 border border-cyan-200 shadow-[0_0_10px_#00f5ff]" />
              <div className="w-2 h-6 rounded-t-xs bg-blue-400 border border-blue-200 shadow-[0_0_10px_#60a5fa]" />
              <div className="w-2 h-8 rounded-t-xs bg-fuchsia-400 border border-fuchsia-200 shadow-[0_0_12px_#e879f9]" />
            </div>
          </div>
        );
    }
  };

  return (
    <div id="studio-bottom-stations" className={`relative w-full select-none ${className}`}>
      {/* Horizontal glowing cyan conduit energy pipe spanning all 5 stations */}
      <div className="absolute top-10 inset-x-8 h-[2px] pointer-events-none hidden md:block">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#00f5ff]" />
        {/* Animated streaming energy photon particle */}
        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white blur-xs shadow-[0_0_15px_#00f5ff] animate-pulse" />
      </div>

      {/* 5 Physical Pedestals in a balanced horizontal row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 lg:gap-4 relative z-10 max-w-[1580px] mx-auto px-2">
        {STATIONS_CONFIG.map((station) => {
          const isHovered = hoveredStation === station.type;
          const isActive = activeStation === station.type;

          return (
            <div
              key={station.type}
              id={`station-card-${station.type}`}
              onMouseEnter={() => setHoveredStation(station.type)}
              onMouseLeave={() => setHoveredStation(null)}
              onClick={() => onSelectStation(station.type)}
              className={`group relative flex flex-col items-center text-center p-3 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-xl ${
                isActive
                  ? 'bg-[#081224]/95 border-cyan-400 shadow-[0_0_25px_rgba(0,245,255,0.45)] scale-[1.03]'
                  : isHovered
                  ? 'bg-[#070e1c]/90 border-cyan-400/80 shadow-[0_0_18px_rgba(0,245,255,0.25)] scale-[1.02]'
                  : 'bg-[#050914]/80 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              {/* Pedestal Platform Base & 3D Object Top */}
              <div className="relative mb-2 flex flex-col items-center">
                {/* Floating 3D Symbol */}
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {renderStationVisual(station.type, isHovered, isActive)}
                </div>

                {/* Dark Stone Pedestal Top Ring with Glow */}
                <div
                  className={`w-18 h-4 rounded-full border transition-all duration-300 -mt-2 ${
                    isActive || isHovered
                      ? 'bg-[#0b172d] border-cyan-400 shadow-[0_0_14px_rgba(0,245,255,0.6)]'
                      : 'bg-[#070d1a] border-slate-700'
                  }`}
                  style={{ transform: 'scaleY(0.35)' }}
                />
              </div>

              {/* Station Number Badge & Title */}
              <div className="flex flex-col items-center gap-0.5">
                <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-[10px] font-mono font-bold text-cyan-300">
                  {station.number}
                </span>
                <span className="text-xs sm:text-[13px] font-black tracking-wider text-white uppercase font-sans mt-0.5">
                  {station.title}
                </span>
              </div>

              {/* Summary Description */}
              <p className="text-[10px] sm:text-[11px] text-slate-300 mt-1 leading-snug line-clamp-2 px-1">
                {station.summary}
              </p>

              {/* Explore Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectStation(station.type);
                }}
                className={`mt-2.5 px-3 py-1 rounded-full border text-[10px] font-mono font-bold tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                  isActive || isHovered
                    ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_12px_rgba(0,245,255,0.5)]'
                    : 'bg-slate-900/80 text-cyan-300 border-cyan-500/40 hover:bg-cyan-950'
                }`}
              >
                <span>Explore</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
