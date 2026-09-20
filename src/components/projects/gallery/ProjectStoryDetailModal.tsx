import React, { useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Trophy,
} from 'lucide-react';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectRealScreenshot } from './ProjectRealScreenshot';

interface ProjectStoryDetailModalProps {
  project: ProjectItem;
  onClose: () => void;
  onPrevProject: () => void;
  onNextProject: () => void;
  currentIndex: number;
  totalProjects: number;
}

export const ProjectStoryDetailModal: React.FC<ProjectStoryDetailModalProps> = ({
  project,
  onClose,
  onPrevProject,
  onNextProject,
  currentIndex,
  totalProjects,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever active project changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [project.id]);

  // Global keydown handler for Esc, ArrowLeft, ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrevProject();
      } else if (e.key === 'ArrowRight') {
        onNextProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevProject, onNextProject]);

  return (
    <div
      id="project-story-detail-modal"
      className="fixed inset-0 z-50 flex flex-col bg-[#020206]/95 backdrop-blur-2xl text-white animate-fade-in overflow-hidden select-none"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {/* 1. Modal Top Bar */}
      <header className="flex-shrink-0 h-16 px-4 sm:px-8 border-b border-slate-800/80 bg-[#03050c]/90 flex items-center justify-between z-20">
        {/* Back Button */}
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all cursor-pointer shadow-[0_0_12px_rgba(0,0,0,0.5)] active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-xs font-mono font-bold tracking-wider">
            STEP OUT TO EXHIBITION
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
            ESC
          </span>
        </button>

        {/* Center Project Counter */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest uppercase">
            PORTAL {project.doorNumber} OF {String(totalProjects).padStart(2, '0')}
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-mono text-slate-300 font-medium">
            {project.category}
          </span>
        </div>

        {/* Next / Prev Project Quick Navigation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevProject}
            className="w-9 h-9 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
            aria-label="Previous Project"
            title="Previous Project (Arrow Left)"
          >
            <ChevronLeft className="w-4 h-4 text-cyan-400" />
          </button>
          <span className="text-xs font-mono text-slate-400 px-1">
            {currentIndex + 1}/{totalProjects}
          </span>
          <button
            type="button"
            onClick={onNextProject}
            className="w-9 h-9 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
            aria-label="Next Project"
            title="Next Project (Arrow Right)"
          >
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </header>

      {/* 2. Scrollable Detail Container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: HERO IDENTITY + REAL SCREENSHOT + ACTIONS */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Project Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400 text-[10px] font-mono font-bold text-cyan-300 tracking-wider">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  // {project.type}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
                {project.title}
              </h1>

              <p className="text-sm sm:text-base font-mono italic text-cyan-300/90 mt-1 font-medium">
                "{project.tagline}"
              </p>
            </div>

            {/* REAL PROJECT SCREENSHOT */}
            <div className="w-full">
              <ProjectRealScreenshot project={project} isHero />
            </div>

            {/* Short Narrative Description */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 backdrop-blur-md">
              <h4 className="text-xs font-mono uppercase font-bold text-slate-400 mb-1.5 tracking-wider">
                System Overview
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* ACTION BUTTONS: GITHUB & LIVE DEMO */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[160px] min-h-[48px] px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-all cursor-pointer active:scale-95"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>VIEW SOURCE (GITHUB)</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[160px] min-h-[48px] px-5 py-3 rounded-xl bg-cyan-950 border border-cyan-400 hover:bg-cyan-900 text-cyan-200 hover:text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.25)] transition-all cursor-pointer active:scale-95"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  <span>LAUNCH LIVE DEMO</span>
                </a>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: PROJECT STORY + TECH STACK + KEY FEATURES */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* 1. THE PROJECT STORY (PROBLEM -> IDEA -> BUILD -> RESULT) */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-800">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <h3 className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
                  THE PROJECT STORY
                </h3>
              </div>

              <div className="space-y-4">
                {/* 1. PROBLEM */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-lg bg-rose-950/80 border border-rose-500/60 flex items-center justify-center text-rose-400 flex-shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-rose-500/40 to-cyan-500/40 my-1" />
                  </div>
                  <div className="pb-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-rose-400 uppercase">
                      THE PROBLEM
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-snug mt-0.5">
                      {project.problem}
                    </p>
                  </div>
                </div>

                {/* 2. IDEA */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-400/80 flex items-center justify-center text-cyan-300 flex-shrink-0">
                      <Lightbulb className="w-3.5 h-3.5" />
                    </div>
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-cyan-500/40 to-blue-500/40 my-1" />
                  </div>
                  <div className="pb-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
                      THE IDEA
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-snug mt-0.5">
                      {project.idea}
                    </p>
                  </div>
                </div>

                {/* 3. BUILD */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-lg bg-blue-950/80 border border-blue-400/80 flex items-center justify-center text-blue-300 flex-shrink-0">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-500/40 to-emerald-500/40 my-1" />
                  </div>
                  <div className="pb-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-blue-400 uppercase">
                      THE BUILD
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-snug mt-0.5">
                      {project.build}
                    </p>
                  </div>
                </div>

                {/* 4. RESULT */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-400/80 flex items-center justify-center text-emerald-300 flex-shrink-0">
                      <Trophy className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
                      THE RESULT
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-snug mt-0.5">
                      {project.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. TECH STACK */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 backdrop-blur-xl">
              <h4 className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase mb-3">
                TECH STACK ARCHITECTURE
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-medium text-slate-200 flex items-center gap-1.5 shadow-sm"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: tech.color || '#00f5ff' }}
                    />
                    <span>{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* 3. KEY SYSTEM FEATURES */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 backdrop-blur-xl">
              <h4 className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase mb-3">
                KEY HIGHLIGHTS & CAPABILITIES
              </h4>
              <div className="space-y-2">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
