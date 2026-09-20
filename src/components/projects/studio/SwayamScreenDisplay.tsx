import React from 'react';
import { Globe, Bell, Layout, Target, BookOpen, ExternalLink, Play } from 'lucide-react';

interface SwayamScreenDisplayProps {
  className?: string;
}

export const SwayamScreenDisplay: React.FC<SwayamScreenDisplayProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`relative w-full h-full bg-[#f8fafc] text-slate-800 font-sans select-none flex flex-col overflow-hidden ${className}`}
    >
      {/* 1. Swayam Top Navigation Bar */}
      <div className="w-full bg-white/95 backdrop-blur border-b border-slate-200/90 px-3 sm:px-5 py-2 flex items-center justify-between shadow-xs shrink-0">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-blue-900 font-sans">
            SWAYAM <span className="text-blue-600 text-xs font-mono font-bold">2.0</span>
          </span>
        </div>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-600">
          <span className="text-blue-600 font-semibold cursor-pointer">Home</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Courses</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">About</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Dashboard</span>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold tracking-wide shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Get Started</span>
          </button>
        </div>
      </div>

      {/* 2. Main Hero Section */}
      <div className="flex-1 p-3 sm:p-5 flex flex-col justify-between bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 overflow-hidden">
        {/* Hero Card Container */}
        <div className="relative rounded-2xl bg-white/90 border border-slate-200/80 p-3 sm:p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden">
          {/* Subtle geometric pattern background */}
          <div
            className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-blue-100/60 blur-2xl pointer-events-none"
          />

          {/* Left Text & CTAs */}
          <div className="flex-1 z-10 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>Full Stack Education Platform</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              SWAYAM <span className="text-blue-600">2.0</span>
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-blue-800 tracking-wide mt-0.5">
              Learn Without Limits™
            </p>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-1 max-w-sm leading-relaxed">
              A modern learning platform with course management, assignments, real-time notifications and an intuitive UI.
            </p>

            {/* Action buttons */}
            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explore Courses</span>
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Play className="w-2.5 h-2.5 fill-current text-blue-600" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Right Architectural Heritage Illustration (Matching reference visual) */}
          <div className="relative w-36 sm:w-44 lg:w-52 h-28 sm:h-32 rounded-xl overflow-hidden shadow-xs border border-blue-100 bg-gradient-to-b from-sky-400 via-amber-100 to-amber-200 shrink-0 flex items-end justify-center">
            {/* Sun rays / sky */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-300/60 blur-md pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-600/30 via-transparent to-transparent pointer-events-none" />

            {/* Architectural Dome / Palace Silhouette Graphic in SVG */}
            <svg
              viewBox="0 0 200 120"
              className="w-full h-full object-cover drop-shadow-md"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Sky background clouds */}
              <ellipse cx="60" cy="30" rx="30" ry="10" fill="white" opacity="0.6" />
              <ellipse cx="140" cy="25" rx="35" ry="12" fill="white" opacity="0.5" />
              
              {/* Grand Central Dome */}
              <path
                d="M 85 70 C 85 45, 115 45, 115 70 Z"
                fill="#f59e0b"
                stroke="#d97706"
                strokeWidth="1.5"
              />
              <path
                d="M 100 45 L 100 35"
                stroke="#d97706"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="100" cy="34" r="2.5" fill="#b45309" />

              {/* Side Domes */}
              <path
                d="M 50 78 C 50 60, 75 60, 75 78 Z"
                fill="#fbbf24"
                stroke="#d97706"
                strokeWidth="1"
              />
              <path
                d="M 125 78 C 125 60, 150 60, 150 78 Z"
                fill="#fbbf24"
                stroke="#d97706"
                strokeWidth="1"
              />

              {/* Main Facade Pillars & Portico */}
              <rect x="40" y="78" width="120" height="35" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
              {/* Colonnade */}
              <rect x="52" y="82" width="6" height="30" fill="#d97706" />
              <rect x="70" y="82" width="6" height="30" fill="#d97706" />
              <rect x="88" y="82" width="6" height="30" fill="#d97706" />
              <rect x="106" y="82" width="6" height="30" fill="#d97706" />
              <rect x="124" y="82" width="6" height="30" fill="#d97706" />
              <rect x="142" y="82" width="6" height="30" fill="#d97706" />

              {/* Center Arch Entrance */}
              <path
                d="M 92 113 L 92 92 C 92 86, 108 86, 108 92 L 108 113 Z"
                fill="#78350f"
              />

              {/* Steps / Foundation */}
              <rect x="25" y="113" width="150" height="7" fill="#b45309" />
            </svg>

            {/* Badge overlay */}
            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[8.5px] font-mono text-amber-200">
              National EdTech
            </div>
          </div>
        </div>

        {/* 3. Four Feature Cards in a row (Matching reference image) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
          {/* Card 1 */}
          <div className="bg-white p-2 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
              <Globe className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col min-w-0 text-left">
              <span className="text-[11px] font-bold text-slate-800 truncate">Global Access</span>
              <span className="text-[9.5px] text-slate-500 truncate">Learn Anywhere</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-2 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
              <Bell className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col min-w-0 text-left">
              <span className="text-[11px] font-bold text-slate-800 truncate">Real-time</span>
              <span className="text-[9.5px] text-slate-500 truncate">Get Notified</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-2 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 shrink-0">
              <Layout className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col min-w-0 text-left">
              <span className="text-[11px] font-bold text-slate-800 truncate">Modern</span>
              <span className="text-[9.5px] text-slate-500 truncate">Clean UI</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-2 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <Target className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col min-w-0 text-left">
              <span className="text-[11px] font-bold text-slate-800 truncate">Focused</span>
              <span className="text-[9.5px] text-slate-500 truncate">Better Learning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
