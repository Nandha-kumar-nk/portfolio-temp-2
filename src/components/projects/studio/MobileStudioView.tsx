import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectItem } from '../../../data/projectsData';
import { SwayamScreenDisplay } from './SwayamScreenDisplay';
import { STATIONS_CONFIG, StationType } from './ProjectStations';
import { StageExploreModal } from './StageExploreModal';

interface MobileStudioViewProps {
  project: ProjectItem;
  className?: string;
}

export const MobileStudioView: React.FC<MobileStudioViewProps> = ({
  project,
  className = '',
}) => {
  const [activeModalStation, setActiveModalStation] = useState<StationType | null>(null);

  return (
    <div
      id="mobile-studio-container"
      className={`w-full px-4 py-6 flex flex-col gap-6 text-white select-none ${className}`}
    >
      {/* 1. Mobile Header Title */}
      <div className="text-center space-y-1">
        <div className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
          &bull; P R O J E C T S &bull;
        </div>
        <h1 className="text-2xl font-black tracking-tight uppercase leading-tight font-sans">
          FROM <span className="text-cyan-400">IDEA</span> TO{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            REALITY
          </span>
        </h1>
        <p className="text-xs text-slate-400 font-medium">
          Real problems. Thoughtful solutions. Working products.
        </p>
      </div>

      {/* 2. Hero Project Display (Physical Frame in Mobile Scale) */}
      <div className="relative flex flex-col items-center">
        {/* Glow halo */}
        <div className="absolute inset-0 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Laptop Frame Viewport */}
        <div className="relative w-full max-w-sm rounded-xl bg-[#090e1a] border border-cyan-400/50 p-2 shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
          <div className="relative rounded-lg overflow-hidden aspect-[16/10] border border-slate-700/60">
            <SwayamScreenDisplay />
            {/* Live badge */}
            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-full bg-slate-950/90 text-[8.5px] font-mono text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE</span>
            </div>
          </div>
        </div>

        {/* Platform Plaque */}
        <div className="mt-3 px-4 py-1 rounded-xl bg-[#060c18] border border-cyan-500/60 shadow-[0_0_15px_rgba(0,245,255,0.3)] text-center">
          <div className="text-xs font-black tracking-wider text-white uppercase font-sans">
            {project.title}
          </div>
          <div className="text-[8.5px] font-mono tracking-widest text-cyan-300 uppercase">
            A FULL STACK WEB APPLICATION
          </div>
        </div>
      </div>

      {/* 3. The 5 Journey Stations (Vertical Interactive Flow) */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase text-center">
          &mdash;&mdash; PROJECT JOURNEY &mdash;&mdash;
        </div>

        <div className="flex flex-col gap-2.5">
          {STATIONS_CONFIG.map((station) => (
            <div
              key={station.type}
              onClick={() => setActiveModalStation(station.type)}
              className="p-3 rounded-xl bg-[#070d1c]/90 border border-slate-800 hover:border-cyan-400/80 transition-all flex items-center justify-between cursor-pointer active:scale-98"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/40 text-[9.5px] font-mono font-bold text-cyan-300 shrink-0">
                  {station.number}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white uppercase tracking-wide truncate">
                    {station.title}
                  </span>
                  <span className="text-[10px] text-slate-300 truncate">
                    {station.summary}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-300 shrink-0 ml-2">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Project Details & CTAs */}
      <div className="p-4 rounded-2xl bg-[#060b17]/90 border border-cyan-500/40 space-y-3">
        <div className="space-y-1">
          <div className="text-lg font-black text-white">{project.title}</div>
          <div className="text-xs font-serif italic text-cyan-300 font-medium">
            &ldquo;{project.tagline}&rdquo;
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="pt-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase mb-1.5">
            Technologies:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech.name}
                className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-200"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,245,255,0.4)] cursor-pointer"
            >
              <span>View Live Project</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-mono text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>View Source Code</span>
            </a>
          )}
        </div>
      </div>

      {/* 5. Minimal Swipe / Pager Indicator */}
      <div className="py-2 flex items-center justify-center gap-4 text-xs font-mono text-slate-500">
        <ChevronLeft className="w-4 h-4 text-slate-600" />
        <span className="text-cyan-400 font-bold">01 / 05 &bull; SWAYAM 2.0</span>
        <ChevronRight className="w-4 h-4 text-slate-600" />
      </div>

      {/* Modal Popup */}
      {activeModalStation && (
        <StageExploreModal
          activeStation={activeModalStation}
          onClose={() => setActiveModalStation(null)}
          onSelectStation={setActiveModalStation}
        />
      )}
    </div>
  );
};
