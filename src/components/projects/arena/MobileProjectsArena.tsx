import React, { useState, useRef } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectScreen } from './ProjectScreens';
import { ProjectStoryObjects } from './ProjectStoryObjects';
import { PROJECT_THEMES } from './types';

interface MobileProjectsArenaProps {
  projects: ProjectItem[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export const MobileProjectsArena: React.FC<MobileProjectsArenaProps> = ({
  projects,
  currentIndex,
  onPrev,
  onNext,
  className = '',
}) => {
  const currentProject = projects[currentIndex] || projects[0];
  const theme = PROJECT_THEMES[currentProject.id] || PROJECT_THEMES['swayam-2'];

  // Swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setIsSwiping(true);
      setTimeout(() => setIsSwiping(false), 600);
      onNext();
    } else if (isRightSwipe) {
      setIsSwiping(true);
      setTimeout(() => setIsSwiping(false), 600);
      onPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      id="mobile-projects-arena"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`w-full px-4 py-4 flex flex-col gap-5 text-white select-none relative overflow-x-hidden ${className}`}
    >
      {/* 1. Mobile Header */}
      <div className="text-center space-y-1">
        <div className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
          &bull; P R O J E C T S &bull;
        </div>
        <h1 className="text-2xl font-black tracking-tight uppercase leading-tight font-sans">
          IDEAS <span className="text-cyan-400">TAKE SHAPE</span> HERE
        </h1>
        <p className="text-xs text-slate-400 font-medium">
          Real Projects. Real Learning. Real Impact.
        </p>
      </div>

      {/* 2. Large Central 3D Display Panel (Mobile Responsive) */}
      <div className="relative flex flex-col items-center">
        {/* Glow halo */}
        <div
          className="absolute inset-0 rounded-full blur-2xl pointer-events-none transition-all duration-500"
          style={{
            background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
            opacity: 0.35,
          }}
        />

        {/* Display Frame */}
        <div
          className={`relative w-full max-w-sm aspect-[16/11] rounded-xl p-2 transition-all duration-500 ${
            isSwiping ? 'scale-95 opacity-75' : 'scale-100 opacity-100'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(14,24,42,0.95) 0%, rgba(6,12,24,0.98) 100%)',
            border: `1.5px solid ${theme.primary}`,
            boxShadow: `0 15px 35px rgba(0,0,0,0.9), 0 0 20px ${theme.glow}`,
          }}
        >
          {/* Header inside frame */}
          <div className="w-full px-2 py-1 rounded-t-lg bg-[#081020]/95 border-b border-cyan-500/30 flex items-center justify-between text-[10px] font-mono mb-1.5">
            <div className="flex items-center gap-1.5 truncate">
              <span
                className="px-1.5 py-0.2 rounded font-bold"
                style={{
                  backgroundColor: `${theme.primary}25`,
                  color: theme.primary,
                  border: `1px solid ${theme.primary}`,
                }}
              >
                {currentProject.doorNumber}
              </span>
              <span className="font-extrabold text-white truncate">{currentProject.title}</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: theme.primary }} />
              <span>LIVE</span>
            </div>
          </div>

          {/* Screen Content */}
          <div className="relative w-full h-[calc(100%-2rem)] rounded-b-lg overflow-hidden bg-slate-950 border border-slate-800">
            <ProjectScreen projectId={currentProject.id} />
          </div>
        </div>

        {/* Platform Plaque */}
        <div className="mt-3 px-4 py-1.5 rounded-xl bg-[#060c18] border border-cyan-500/60 shadow-[0_0_15px_rgba(0,245,255,0.3)] text-center">
          <div className="text-sm font-black tracking-wider text-white uppercase font-sans">
            {currentProject.title}
          </div>
          <div className="text-[9px] font-serif italic text-cyan-300">
            &ldquo;{currentProject.tagline}&rdquo;
          </div>
        </div>
      </div>

      {/* 3. Project Description & Tech Stack */}
      <div className="p-4 rounded-2xl bg-[#060b17]/90 border border-cyan-500/40 space-y-3 text-left">
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          {currentProject.description}
        </p>

        {/* Technologies */}
        <div>
          <div className="text-[9.5px] font-mono text-slate-400 uppercase mb-1.5 font-bold">
            Technologies:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {currentProject.techStack.map((tech) => (
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
        <div className="flex flex-col gap-2 pt-1">
          {currentProject.liveUrl && (
            <a
              href={currentProject.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              style={{
                backgroundColor: theme.primary,
                color: '#030712',
                boxShadow: `0 0 15px ${theme.glow}`,
              }}
            >
              <span>VIEW LIVE PROJECT</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {currentProject.githubUrl && (
            <a
              href={currentProject.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-mono text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>VIEW SOURCE CODE</span>
            </a>
          )}
        </div>
      </div>

      {/* 4. Story Objects (01 Problem, 02 Idea, 03 System, 04 Build, 05 Result) */}
      <div className="w-full pt-2">
        <div className="text-center text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest mb-2">
          &mdash;&mdash; PROJECT STORY & ARCHITECTURE &mdash;&mdash;
        </div>
        <ProjectStoryObjects activeProject={currentProject} />
      </div>

      {/* 5. Mobile Project Navigation Footer */}
      <div className="py-2 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-3">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-1 text-cyan-300 font-bold p-2 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>PREV</span>
        </button>

        <span className="text-cyan-400 font-bold">
          0{currentIndex + 1} / 0{projects.length}
        </span>

        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-1 text-cyan-300 font-bold p-2 cursor-pointer"
        >
          <span>NEXT</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
