import React, { useState, useRef } from 'react';
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Trophy,
} from 'lucide-react';
import { ProjectItem, ProjectCategory } from '../../../data/projectsData';
import { ProjectRealScreenshot } from './ProjectRealScreenshot';

interface MobileExhibitionViewProps {
  projects: ProjectItem[];
  activeProject: ProjectItem;
  onSelectProject: (id: string) => void;
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  onPrevProject: () => void;
  onNextProject: () => void;
}

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'ALL' },
  { id: 'web', label: 'WEB' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'tools', label: 'TOOLS' },
];

export const MobileExhibitionView: React.FC<MobileExhibitionViewProps> = ({
  projects,
  activeProject,
  onSelectProject,
  selectedCategory,
  onSelectCategory,
  onPrevProject,
  onNextProject,
}) => {
  // Touch swipe gesture handlers
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onNextProject();
    } else if (isRightSwipe) {
      onPrevProject();
    }
  };

  return (
    <div
      id="mobile-exhibition-view"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative w-full min-h-[100dvh] pt-18 pb-24 px-4 flex flex-col gap-6 text-white font-sans select-none overflow-x-hidden"
      style={{
        paddingTop: 'calc(env(safe-area-inset-top) + 4.5rem)',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 5rem)',
      }}
    >
      {/* 1. HEADER */}
      <div className="flex flex-col items-center text-center">
        <div className="px-3 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono tracking-widest font-bold mb-2">
          PROJECTS // EXHIBITION
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
          STEP INTO <span className="text-cyan-400">MY WORK</span>
        </h1>

        <p className="mt-2 text-xs text-slate-300 max-w-sm leading-relaxed">
          "Each project represents a problem I wanted to solve, a system I wanted to build, and an idea I wanted to turn into something real."
        </p>

        {/* Category Chips */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-4 p-1 rounded-full bg-slate-950/80 border border-slate-800">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`min-h-[38px] px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-950 text-cyan-200 border border-cyan-400 shadow-[0_0_10px_rgba(0,245,255,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. PROJECT DOOR CARD (ONE HERO PROJECT AT A TIME) */}
      <div className="w-full rounded-2xl bg-slate-950/90 border border-cyan-500/50 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(0,245,255,0.2)] flex flex-col gap-3">
        {/* Top Door Identification */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-cyan-300">
              PORTAL // {activeProject.doorNumber}
            </span>
          </div>

          <span className="text-[10px] font-mono uppercase text-slate-300 font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
            {activeProject.category}
          </span>
        </div>

        {/* Project Title & Tagline */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {activeProject.title}
          </h2>
          <p className="text-xs font-mono italic text-cyan-300 mt-0.5 font-medium">
            "{activeProject.tagline}"
          </p>
        </div>

        {/* REAL PROJECT IMAGE / SCREENSHOT */}
        <div className="w-full my-1">
          <ProjectRealScreenshot project={activeProject} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          {activeProject.description}
        </p>
      </div>

      {/* 3. PROJECT STORY (PROBLEM -> IDEA -> BUILD -> RESULT) */}
      <div className="w-full rounded-2xl bg-slate-950/80 border border-slate-800/90 p-4 flex flex-col gap-3.5">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
            PROJECT STORY
          </h3>
        </div>

        {/* Problem */}
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-md bg-rose-950/80 border border-rose-500/50 flex items-center justify-center text-rose-400 flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-rose-400 uppercase">
              THE PROBLEM
            </div>
            <p className="text-xs text-slate-300 leading-snug mt-0.5">
              {activeProject.problem}
            </p>
          </div>
        </div>

        {/* Idea */}
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-md bg-cyan-950/80 border border-cyan-400/70 flex items-center justify-center text-cyan-300 flex-shrink-0 mt-0.5">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
              THE IDEA
            </div>
            <p className="text-xs text-slate-300 leading-snug mt-0.5">
              {activeProject.idea}
            </p>
          </div>
        </div>

        {/* Build */}
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-md bg-blue-950/80 border border-blue-400/70 flex items-center justify-center text-blue-300 flex-shrink-0 mt-0.5">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-blue-400 uppercase">
              THE BUILD
            </div>
            <p className="text-xs text-slate-300 leading-snug mt-0.5">
              {activeProject.build}
            </p>
          </div>
        </div>

        {/* Result */}
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-md bg-emerald-950/80 border border-emerald-400/70 flex items-center justify-center text-emerald-300 flex-shrink-0 mt-0.5">
            <Trophy className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
              THE RESULT
            </div>
            <p className="text-xs text-slate-200 font-medium leading-snug mt-0.5">
              {activeProject.result}
            </p>
          </div>
        </div>
      </div>

      {/* 4. TECH STACK & FEATURES */}
      <div className="w-full rounded-2xl bg-slate-950/80 border border-slate-800/90 p-4 flex flex-col gap-3">
        <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
          TECH STACK ARCHITECTURE
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {activeProject.techStack.map((tech) => (
            <span
              key={tech.name}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-1.5"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: tech.color || '#00f5ff' }}
              />
              <span>{tech.name}</span>
            </span>
          ))}
        </div>

        <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mt-2">
          KEY FEATURES
        </h4>
        <div className="space-y-1.5">
          {activeProject.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. ACTION BUTTONS (TOUCH FRIENDLY >= 44PX) */}
      <div className="flex flex-col gap-2.5">
        {activeProject.githubUrl && (
          <a
            href={activeProject.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 active:border-cyan-400 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <Github className="w-4 h-4 text-cyan-400" />
            <span>VIEW CODE (GITHUB)</span>
          </a>
        )}

        {activeProject.liveUrl && (
          <a
            href={activeProject.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-cyan-950 border border-cyan-400 active:bg-cyan-900 text-cyan-200 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all active:scale-98"
          >
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            <span>LAUNCH LIVE DEMO</span>
          </a>
        )}
      </div>

      {/* 6. SWIPE PROJECT SELECTOR PILLS */}
      <div className="w-full flex flex-col items-center gap-2 pt-3 border-t border-slate-800">
        <div className="text-[10px] font-mono text-cyan-400/80 font-semibold tracking-wider">
          &lt; SWIPE OR TAP TO SWITCH DOORS &gt;
        </div>

        <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1">
          {projects.map((p) => {
            const isActive = p.id === activeProject.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProject(p.id)}
                className={`min-h-[40px] px-3 py-1 rounded-xl text-xs font-mono font-bold tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(0,245,255,0.3)]'
                    : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                {p.shortName || p.title}
              </button>
            );
          })}
        </div>

        {/* Prev / Next touch buttons */}
        <div className="flex items-center justify-between w-full mt-2">
          <button
            type="button"
            onClick={onPrevProject}
            className="min-h-[44px] px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 flex items-center gap-1 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>PREV</span>
          </button>

          <span className="text-[11px] font-mono text-slate-400">
            {activeProject.doorNumber} / 05
          </span>

          <button
            type="button"
            onClick={onNextProject}
            className="min-h-[44px] px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 flex items-center gap-1 active:scale-95"
          >
            <span>NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
