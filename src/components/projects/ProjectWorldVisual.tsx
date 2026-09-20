import React from 'react';
import {
  GraduationCap,
  FileText,
  Leaf,
  Terminal,
  Car,
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  Cpu,
  Radio,
} from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectWorldVisualProps {
  project: ProjectItem;
  isSelected?: boolean;
  onSelect?: () => void;
  size?: 'desktop' | 'tablet' | 'mobile' | 'preview';
  showBadges?: boolean;
  showTitlePlate?: boolean;
}

export const ProjectWorldVisual: React.FC<ProjectWorldVisualProps> = ({
  project,
  isSelected = false,
  onSelect,
  size = 'desktop',
  showBadges = true,
  showTitlePlate = true,
}) => {
  // Theme color variables
  const isCyan = project.themeColor === '#00f5ff';
  const isPurple = project.themeColor === '#c084fc';
  const isGreen = project.themeColor === '#22c55e';
  const isYellow = project.themeColor === '#eab308';

  const glowColor = project.accentGlow;
  const primaryColor = project.themeColor;

  // Icon mapping
  const renderIcon = () => {
    switch (project.id) {
      case 'swayam-2':
        return <GraduationCap className="w-4 h-4 text-[#00f5ff]" />;
      case 'resume-forge':
        return <FileText className="w-4 h-4 text-[#c084fc]" />;
      case 'wildlife-ai':
        return <Leaf className="w-4 h-4 text-[#22c55e]" />;
      case 'nk-mern-cli':
        return <Terminal className="w-4 h-4 text-[#00f5ff]" />;
      case 'speed-taxi':
        return <Car className="w-4 h-4 text-[#eab308]" />;
      default:
        return <Layers className="w-4 h-4 text-cyan-400" />;
    }
  };

  // Dimensional scaling based on device size
  const getContainerDimensions = () => {
    switch (size) {
      case 'preview':
        return 'w-full h-44';
      case 'mobile':
        return 'w-full max-w-[340px] h-[260px] sm:h-[300px] mx-auto';
      case 'tablet':
        return 'w-[240px] h-[210px]';
      case 'desktop':
      default:
        return 'w-[280px] h-[240px] xl:w-[320px] xl:h-[260px]';
    }
  };

  return (
    <div
      id={`project-world-${project.id}`}
      onClick={onSelect}
      className={`relative select-none transition-all duration-500 group ${
        onSelect ? 'cursor-pointer' : ''
      } ${getContainerDimensions()}`}
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(2,6,23,0) 70%)`,
          opacity: isSelected ? 0.75 : 0.35,
          transform: isSelected ? 'scale(1.15)' : 'scale(0.95)',
        }}
      />

      {/* Floating Orbital Particle Rings */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed animate-spin transition-all duration-700"
          style={{
            width: size === 'mobile' ? '240px' : '280px',
            height: size === 'mobile' ? '120px' : '140px',
            borderColor: isSelected ? `${primaryColor}66` : 'rgba(255,255,255,0.12)',
            animationDuration: isSelected ? '18s' : '36s',
            transform: 'translate(-50%, -50%) rotateX(65deg)',
          }}
        />
        {isSelected && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/40 animate-pulse pointer-events-none"
            style={{
              width: size === 'mobile' ? '260px' : '300px',
              height: size === 'mobile' ? '130px' : '150px',
              boxShadow: `0 0 25px ${glowColor}`,
              transform: 'translate(-50%, -50%) rotateX(65deg)',
            }}
          />
        )}
      </div>

      {/* Floating Badges (Desktop & Mobile) */}
      {showBadges && size !== 'preview' && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {project.badges.map((badge, idx) => {
            // Precise floating badge positions around the island
            const badgeConfigs = [
              { top: '12%', left: size === 'mobile' ? '4%' : '6%', delay: '0s' },
              { top: '24%', right: size === 'mobile' ? '4%' : '8%', delay: '0.4s' },
              { top: '48%', right: size === 'mobile' ? '2%' : '4%', delay: '0.8s' },
              { top: '48%', left: size === 'mobile' ? '2%' : '4%', delay: '1.2s' },
            ];
            const cfg = badgeConfigs[idx % badgeConfigs.length];

            return (
              <div
                key={badge}
                className="absolute px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-medium tracking-wide whitespace-nowrap backdrop-blur-md transition-all duration-300 pointer-events-auto"
                style={{
                  top: cfg.top,
                  left: cfg.left,
                  right: cfg.right,
                  backgroundColor: 'rgba(5, 12, 30, 0.75)',
                  border: `1px solid ${isSelected ? `${primaryColor}99` : 'rgba(56, 189, 248, 0.25)'}`,
                  color: isSelected ? '#ffffff' : '#cbd5e1',
                  boxShadow: isSelected ? `0 0 12px ${glowColor}` : '0 2px 8px rgba(0,0,0,0.5)',
                  animation: `floatBadge 4s ease-in-out infinite alternate ${cfg.delay}`,
                }}
              >
                <span className="flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  {badge}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Island Artwork Graphic Render */}
      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
        <div
          className={`relative transition-transform duration-500 ${
            isSelected ? 'scale-105 -translate-y-1' : 'group-hover:scale-102'
          }`}
          style={{
            filter: isSelected ? `drop-shadow(0 0 20px ${glowColor})` : undefined,
          }}
        >
          {/* Specific Project Visual Renderings */}
          {project.id === 'swayam-2' && <SwayamWorldGraphic isSelected={isSelected} size={size} />}
          {project.id === 'resume-forge' && <ResumeWorldGraphic isSelected={isSelected} size={size} />}
          {project.id === 'wildlife-ai' && <WildlifeWorldGraphic isSelected={isSelected} size={size} />}
          {project.id === 'nk-mern-cli' && <MernCliWorldGraphic isSelected={isSelected} size={size} />}
          {project.id === 'speed-taxi' && <SpeedTaxiWorldGraphic isSelected={isSelected} size={size} />}

          {/* Floating Cyber Island Base (Craggy Dark Metallic Rock with Glowing Cyan Grooves) */}
          <div className="relative -mt-6 sm:-mt-8 flex justify-center">
            <svg
              className="w-48 sm:w-56 md:w-64 h-20 sm:h-24 filter drop-shadow-[0_12px_16px_rgba(0,0,0,0.8)]"
              viewBox="0 0 240 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`rockGrad-${project.id}`} x1="0" y1="0" x2="0" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="40%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>
                <linearGradient id={`rimGrad-${project.id}`} x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor={primaryColor} stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor={primaryColor} stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Upper plateau rim */}
              <ellipse cx="120" cy="24" rx="100" ry="20" fill={`url(#rockGrad-${project.id})`} />
              <ellipse
                cx="120"
                cy="24"
                rx="100"
                ry="20"
                stroke={`url(#rimGrad-${project.id})`}
                strokeWidth={isSelected ? '2' : '1'}
                strokeOpacity={isSelected ? '1' : '0.6'}
              />

              {/* Jagged subterranean crags tapering downward */}
              <path
                d="M 20 24 L 38 48 L 60 40 L 78 68 L 102 54 L 120 86 L 138 56 L 162 66 L 182 42 L 202 48 L 220 24 C 200 38 40 38 20 24 Z"
                fill={`url(#rockGrad-${project.id})`}
              />

              {/* Glowing energy fractures in the rock */}
              <path
                d="M 60 32 L 72 48 L 84 44 M 110 32 L 120 62 L 126 50 M 150 32 L 160 52"
                stroke={primaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeOpacity={isSelected ? '0.9' : '0.5'}
              />

              {/* Bottom stalactite emitter node */}
              <circle
                cx="120"
                cy="86"
                r="3"
                fill={primaryColor}
                className="animate-ping"
                style={{ animationDuration: '3s' }}
              />
              <circle cx="120" cy="86" r="3" fill="#ffffff" />
            </svg>
          </div>
        </div>

        {/* Title Plate & Category Badge */}
        {showTitlePlate && (
          <div
            className={`mt-2 px-3.5 py-1.5 rounded-lg backdrop-blur-md transition-all duration-300 flex items-center gap-2.5 max-w-[90%] border ${
              isSelected
                ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.4)]'
                : 'bg-slate-950/75 border-slate-700/60 hover:border-cyan-500/50'
            }`}
          >
            <div
              className="p-1 rounded flex-shrink-0"
              style={{
                backgroundColor: `${primaryColor}22`,
                border: `1px solid ${primaryColor}66`,
              }}
            >
              {renderIcon()}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                {project.title}
              </span>
              <span
                className="text-[10px] sm:text-[11px] font-medium tracking-wider uppercase truncate"
                style={{ color: primaryColor }}
              >
                {project.categoryName}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 1. SWAYAM 2.0 GRAPHIC
// Holographic laptop with multi-tiered floating screens, education icons, code
// ----------------------------------------------------------------------------
function SwayamWorldGraphic({ isSelected, size }: { isSelected: boolean; size: string }) {
  const scale = size === 'preview' ? 'scale-75' : size === 'mobile' ? 'scale-90' : 'scale-100';

  return (
    <div className={`relative w-48 sm:w-56 h-32 flex items-center justify-center ${scale}`}>
      {/* Ambient Hologram Glow */}
      <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />

      {/* Floating secondary left screen */}
      <div
        className="absolute -left-2 top-2 w-14 h-10 bg-slate-900/80 border border-cyan-400/60 rounded p-1 shadow-lg transform -rotate-12 backdrop-blur-md z-10 animate-bounce"
        style={{ animationDuration: '6s' }}
      >
        <div className="w-full h-1 bg-cyan-400/80 rounded mb-1" />
        <div className="space-y-0.5">
          <div className="w-3/4 h-0.5 bg-slate-500 rounded" />
          <div className="w-1/2 h-0.5 bg-cyan-500 rounded" />
          <div className="w-2/3 h-0.5 bg-slate-600 rounded" />
        </div>
      </div>

      {/* Floating secondary right screen */}
      <div
        className="absolute -right-2 top-4 w-16 h-12 bg-slate-900/80 border border-blue-400/60 rounded p-1 shadow-lg transform rotate-12 backdrop-blur-md z-10 animate-bounce"
        style={{ animationDuration: '7s', animationDelay: '1s' }}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <div className="text-[7px] text-cyan-300 font-mono">LIVE</div>
        </div>
        <div className="space-y-0.5">
          <div className="w-full h-1 bg-slate-700 rounded" />
          <div className="w-4/5 h-1 bg-blue-500/70 rounded" />
        </div>
      </div>

      {/* Main Holographic Laptop */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Laptop Screen */}
        <div className="relative w-28 sm:w-32 h-20 bg-slate-950 border-2 border-cyan-400/80 rounded-t-md p-1.5 shadow-[0_0_15px_rgba(0,245,255,0.4)] overflow-hidden">
          {/* Top window bar */}
          <div className="flex items-center gap-1 mb-1 pb-1 border-b border-cyan-900/60">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[7px] text-cyan-300 ml-1 font-mono">swayam.edu/portal</span>
          </div>

          {/* Screen content - Course Dashboard */}
          <div className="grid grid-cols-3 gap-1">
            <div className="col-span-2 space-y-1">
              <div className="h-4 bg-cyan-950/60 border border-cyan-500/30 rounded p-0.5 flex items-center">
                <span className="text-[8px] text-cyan-200 font-semibold truncate">
                  CS101 Algorithms
                </span>
              </div>
              <div className="h-5 bg-slate-900 border border-slate-700/50 rounded p-0.5">
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full w-4/5" />
                </div>
                <span className="text-[6px] text-slate-400">Progress: 80%</span>
              </div>
            </div>
            <div className="bg-cyan-900/30 border border-cyan-500/40 rounded p-1 flex flex-col items-center justify-center">
              <GraduationCap className="w-4 h-4 text-cyan-300 mb-0.5" />
              <span className="text-[6px] text-cyan-200">MERN</span>
            </div>
          </div>

          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent pointer-events-none" />
        </div>

        {/* Laptop Keyboard Base */}
        <div className="w-36 sm:w-40 h-3 bg-gradient-to-b from-slate-700 to-slate-900 border-x border-b border-cyan-500/50 rounded-b shadow-lg flex items-center justify-center">
          <div className="w-8 h-1 bg-cyan-400/60 rounded" />
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 2. RESUME FORGE GRAPHIC
// Glowing purple smartphone & floating holographic resume documents
// ----------------------------------------------------------------------------
function ResumeWorldGraphic({ isSelected, size }: { isSelected: boolean; size: string }) {
  const scale = size === 'preview' ? 'scale-75' : size === 'mobile' ? 'scale-90' : 'scale-100';

  return (
    <div className={`relative w-48 sm:w-56 h-32 flex items-center justify-center ${scale}`}>
      {/* Ambient Purple Glow */}
      <div className="absolute inset-0 bg-purple-600/25 blur-xl rounded-full" />

      {/* Floating secondary document preview */}
      <div
        className="absolute -right-3 top-2 w-14 h-18 bg-purple-950/80 border border-purple-400/60 rounded-sm p-1 shadow-lg transform rotate-12 backdrop-blur-md z-10 animate-pulse"
        style={{ animationDuration: '4s' }}
      >
        <div className="w-3 h-3 rounded-full bg-purple-400/80 mb-1" />
        <div className="w-full h-1 bg-purple-400/70 rounded mb-0.5" />
        <div className="w-3/4 h-0.5 bg-slate-400 rounded mb-0.5" />
        <div className="w-1/2 h-0.5 bg-purple-300 rounded" />
      </div>

      {/* Central Glowing Resume Mobile/Tablet Canvas */}
      <div className="relative z-20 flex items-center justify-center">
        <div className="w-24 sm:w-28 h-24 bg-slate-950 border-2 border-purple-400/90 rounded-lg p-2 shadow-[0_0_20px_rgba(192,132,252,0.4)] backdrop-blur-md">
          {/* Header */}
          <div className="flex items-center gap-1.5 pb-1 border-b border-purple-500/40 mb-1.5">
            <div className="w-4 h-4 rounded-full bg-purple-500/40 border border-purple-400 flex items-center justify-center">
              <span className="text-[7px] font-bold text-purple-200">NK</span>
            </div>
            <div>
              <div className="w-10 h-1 bg-purple-300 rounded" />
              <div className="w-6 h-0.5 bg-purple-400/70 rounded mt-0.5" />
            </div>
          </div>

          {/* Resume Sections */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="w-8 h-1 bg-slate-300 rounded" />
              <span className="text-[6px] text-purple-300 font-mono">ATS 96%</span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-purple-400 h-full w-5/6" />
            </div>

            <div className="grid grid-cols-2 gap-1 pt-0.5">
              <div className="bg-purple-900/40 p-0.5 rounded border border-purple-500/30">
                <span className="text-[6px] text-purple-200 font-mono">React</span>
              </div>
              <div className="bg-purple-900/40 p-0.5 rounded border border-purple-500/30">
                <span className="text-[6px] text-purple-200 font-mono">Node.js</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 3. WILDLIFE CONFLICT AI GRAPHIC
// Lush green biome, trees, elephant silhouette, IoT satellite tower
// ----------------------------------------------------------------------------
function WildlifeWorldGraphic({ isSelected, size }: { isSelected: boolean; size: string }) {
  const scale = size === 'preview' ? 'scale-75' : size === 'mobile' ? 'scale-90' : 'scale-100';

  return (
    <div className={`relative w-48 sm:w-56 h-32 flex items-center justify-center ${scale}`}>
      {/* Ambient Green Glow */}
      <div className="absolute inset-0 bg-emerald-500/25 blur-xl rounded-full" />

      {/* Cyber IoT Tower & Dish */}
      <div className="absolute left-4 top-2 flex flex-col items-center z-20">
        <Radio className="w-4 h-4 text-emerald-300 animate-pulse" />
        <div className="w-0.5 h-10 bg-gradient-to-b from-emerald-400 to-slate-800" />
      </div>

      {/* Lush Biome Forest & Elephant with AI Bounding Box */}
      <div className="relative z-20 flex items-center justify-center">
        {/* Stylized Foliage */}
        <div className="absolute -left-2 top-6 flex gap-1 z-10">
          <div className="w-6 h-8 bg-emerald-600/80 rounded-t-full border border-emerald-400/50" />
          <div className="w-8 h-10 bg-green-500/80 rounded-t-full border border-emerald-300/60 -ml-2" />
        </div>

        {/* Center Wildlife Figure with AI YOLO Bounding Box */}
        <div className="relative p-1.5 border border-dashed border-emerald-400/80 rounded bg-slate-950/60 backdrop-blur-sm">
          <div className="absolute -top-3 left-1 px-1 bg-emerald-500 text-[6px] text-black font-mono font-bold rounded">
            ELEPHANT: 98%
          </div>

          {/* Elephant Silhouette SVG */}
          <svg className="w-14 sm:w-16 h-10" viewBox="0 0 100 65" fill="#a7f3d0">
            {/* Stylized Elephant Body */}
            <path d="M 75 15 C 70 8 50 10 38 16 C 28 20 20 25 15 35 C 12 42 12 55 12 60 L 20 60 L 22 45 L 30 45 L 30 60 L 38 60 L 40 42 L 52 42 L 54 60 L 62 60 L 65 38 C 70 38 76 42 80 48 L 84 45 C 80 35 84 28 85 24 C 86 18 80 14 75 15 Z" />
            <circle cx="72" cy="20" r="1.5" fill="#064e3b" />
          </svg>
        </div>

        {/* Right side trees */}
        <div className="absolute -right-2 top-5 flex gap-1 z-10">
          <div className="w-7 h-9 bg-emerald-500/80 rounded-t-full border border-emerald-300/50" />
          <div className="w-5 h-7 bg-green-600/80 rounded-t-full border border-emerald-400/50 -ml-1" />
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 4. NK MERN CLI GRAPHIC
// Cyber server racks, blinking LEDs, terminal code prompt
// ----------------------------------------------------------------------------
function MernCliWorldGraphic({ isSelected, size }: { isSelected: boolean; size: string }) {
  const scale = size === 'preview' ? 'scale-75' : size === 'mobile' ? 'scale-90' : 'scale-100';

  return (
    <div className={`relative w-48 sm:w-56 h-32 flex items-center justify-center ${scale}`}>
      {/* Ambient Cyan Glow */}
      <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />

      {/* Left Server Rack */}
      <div className="w-9 h-20 bg-slate-950 border border-cyan-500/60 rounded p-1 flex flex-col justify-between shadow-lg z-10 mr-1">
        {[0, 1, 2, 3].map((slot) => (
          <div
            key={slot}
            className="w-full h-3 bg-slate-900 border border-slate-700 rounded flex items-center justify-between px-1"
          >
            <div className="flex gap-0.5">
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
              <span className="w-1 h-1 rounded-full bg-green-400" />
            </div>
            <div className="w-2 h-0.5 bg-cyan-600" />
          </div>
        ))}
      </div>

      {/* Main Terminal Screen */}
      <div className="w-28 sm:w-32 h-20 bg-slate-950 border-2 border-cyan-400 rounded-md p-1.5 shadow-[0_0_16px_rgba(0,245,255,0.4)] z-20 flex flex-col">
        <div className="flex items-center gap-1 pb-1 border-b border-cyan-900 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-[7px] text-cyan-300 font-mono">bash: nk-mern-cli</span>
        </div>
        <div className="font-mono text-[7px] space-y-0.5 overflow-hidden">
          <p className="text-cyan-400">$ npx nk-mern create</p>
          <p className="text-green-400">✓ Auth: JWT + OAuth</p>
          <p className="text-yellow-300">✓ Database: MongoDB</p>
          <p className="text-cyan-200">✓ Stack scaffolded (1.2s)</p>
        </div>
      </div>

      {/* Right Server Rack */}
      <div className="w-9 h-20 bg-slate-950 border border-cyan-500/60 rounded p-1 flex flex-col justify-between shadow-lg z-10 ml-1">
        {[0, 1, 2, 3].map((slot) => (
          <div
            key={slot}
            className="w-full h-3 bg-slate-900 border border-slate-700 rounded flex items-center justify-between px-1"
          >
            <div className="flex gap-0.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
            </div>
            <div className="w-2 h-0.5 bg-slate-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 5. SPEED TAXI WEBSITE GRAPHIC
// Sleek yellow sports car, glowing headlights, GPS mobile route
// ----------------------------------------------------------------------------
function SpeedTaxiWorldGraphic({ isSelected, size }: { isSelected: boolean; size: string }) {
  const scale = size === 'preview' ? 'scale-75' : size === 'mobile' ? 'scale-90' : 'scale-100';

  return (
    <div className={`relative w-48 sm:w-56 h-32 flex items-center justify-center ${scale}`}>
      {/* Ambient Yellow Glow */}
      <div className="absolute inset-0 bg-yellow-500/25 blur-xl rounded-full" />

      {/* Floating GPS Smartphone Map */}
      <div className="absolute right-1 top-1 w-14 h-22 bg-slate-950 border border-amber-400/80 rounded-md p-1 shadow-lg z-10 rotate-6 backdrop-blur-md">
        <div className="w-full h-2 bg-amber-500/20 rounded mb-1 flex items-center justify-between px-0.5">
          <span className="text-[5px] text-amber-300">ETA 4m</span>
          <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping" />
        </div>
        {/* Route line */}
        <div className="relative w-full h-12 bg-slate-900 rounded overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 50 50">
            <path
              d="M 10 40 Q 25 20 40 10"
              stroke="#eab308"
              strokeWidth="2"
              fill="none"
              strokeDasharray="2 2"
            />
            <circle cx="10" cy="40" r="2.5" fill="#38bdf8" />
            <circle cx="40" cy="10" r="3" fill="#ef4444" />
          </svg>
        </div>
      </div>

      {/* Cyber Sports Car Visual */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Sports Car SVG */}
        <svg
          className="w-28 sm:w-32 h-14 filter drop-shadow-[0_4px_12px_rgba(234,179,8,0.5)]"
          viewBox="0 0 140 60"
          fill="none"
        >
          {/* Aerodynamic Car Body */}
          <path
            d="M 10 42 L 24 38 L 45 22 L 85 22 L 105 34 L 132 38 L 134 46 L 10 46 Z"
            fill="#eab308"
          />
          {/* Tinted Windshield & Cabin */}
          <path d="M 46 24 L 62 24 L 82 24 L 98 34 L 42 34 Z" fill="#0f172a" opacity="0.9" />
          {/* Headlights beam */}
          <polygon points="132,40 140,36 140,46" fill="#fef08a" opacity="0.9" />
          {/* Wheels */}
          <circle cx="34" cy="46" r="8" fill="#1e293b" stroke="#fef08a" strokeWidth="1.5" />
          <circle cx="108" cy="46" r="8" fill="#1e293b" stroke="#fef08a" strokeWidth="1.5" />
          <circle cx="34" cy="46" r="3" fill="#eab308" />
          <circle cx="108" cy="46" r="3" fill="#eab308" />
        </svg>

        {/* Glowing Road surface */}
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full shadow-[0_0_8px_#eab308]" />
      </div>
    </div>
  );
}
