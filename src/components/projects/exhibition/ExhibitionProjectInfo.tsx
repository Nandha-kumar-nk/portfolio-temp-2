import React from 'react';
import { Github, ArrowLeft, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../../../data/projectsData';

interface ExhibitionProjectInfoProps {
  project: ProjectItem;
  activeIndex: number;
  totalProjects: number;
  isMobile?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

export const ExhibitionProjectInfo: React.FC<ExhibitionProjectInfoProps> = ({
  project,
  activeIndex,
  totalProjects,
  isMobile = false,
  onPrev,
  onNext,
  onSelectIndex,
}) => {
  const doorNum = String(activeIndex + 1).padStart(2, '0');
  const totalNum = String(totalProjects).padStart(2, '0');

  // Tech stack icon colors mapping
  const getTechIconColor = (name: string, fallback?: string) => {
    const n = name.toLowerCase();
    if (n.includes('react')) return '#00f5ff';
    if (n.includes('node')) return '#22c55e';
    if (n.includes('mongo')) return '#10b981';
    if (n.includes('express')) return '#cbd5e1';
    if (n.includes('socket')) return '#38bdf8';
    if (n.includes('mail')) return '#38bdf8';
    if (n.includes('python')) return '#38bdf8';
    if (n.includes('yolo')) return '#f97316';
    if (n.includes('docker')) return '#0284c7';
    if (n.includes('tailwind')) return '#38bdf8';
    return fallback || '#00f5ff';
  };

  return (
    <div
      id="exhibition-project-info"
      className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 select-none flex flex-col items-center"
    >
      {/* Desktop Layout: Flanked with PREVIOUS and NEXT buttons */}
      <div className="w-full flex items-center justify-between gap-4">
        {/* Desktop Left Button: ← PREVIOUS */}
        <div className="hidden md:flex items-center justify-start w-36">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous project"
            className="min-h-[44px] px-4 py-2 rounded-full border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-900/50 hover:border-cyan-400 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-2 shadow-[0_0_12px_rgba(0,245,255,0.15)]"
          >
            <span>←</span>
            <span>PREVIOUS</span>
          </button>
        </div>

        {/* Center Content: Project Details */}
        <div className="flex-1 flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* 01 / 05 Counter */}
          <div className="font-mono text-xs font-bold tracking-widest mb-1 flex items-center gap-2">
            <span className="text-cyan-400 text-sm">{doorNum}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{totalNum}</span>
          </div>

          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase font-sans">
            {project.title}
          </h2>

          {/* Tagline: "Learn Without Limits" in Cyan */}
          <h3 className="text-sm sm:text-base font-semibold text-cyan-400 tracking-wide mt-0.5">
            “{project.tagline}”
          </h3>

          {/* Category / Type */}
          <div className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mt-1">
            {project.type || project.category}
          </div>

          {/* Concise Description */}
          <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-xl text-center">
            {project.description}
          </p>

          {/* Tech Stack Chips with Brand Dots */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 max-w-lg">
            {project.techStack.map((tech) => {
              const dotColor = getTechIconColor(tech.name, tech.color);
              return (
                <span
                  key={tech.name}
                  className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-medium tracking-wide bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-1.5 shadow-sm"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: dotColor, boxShadow: `0 0 6px ${dotColor}` }}
                  />
                  <span>{tech.name}</span>
                </span>
              );
            })}
          </div>

          {/* Action Buttons: View Live Project → & View Source Code */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 w-full sm:w-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${project.title}`}
                className="min-h-[44px] px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,245,255,0.45)] hover:shadow-[0_0_28px_rgba(0,245,255,0.7)] transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <span>View Live Project</span>
                <span className="font-black">→</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code of ${project.title} on GitHub`}
                className="min-h-[44px] px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono font-medium tracking-wider text-slate-300 hover:text-white bg-slate-950/90 hover:bg-slate-900 border border-slate-700/80 hover:border-cyan-500/60 shadow-sm transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4 text-slate-400" />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Desktop Right Button: NEXT → */}
        <div className="hidden md:flex items-center justify-end w-36">
          <button
            type="button"
            onClick={onNext}
            aria-label="Next project"
            className="min-h-[44px] px-4 py-2 rounded-full border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-900/50 hover:border-cyan-400 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-2 shadow-[0_0_12px_rgba(0,245,255,0.15)]"
          >
            <span>NEXT</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Navigation Indicators & Mobile Controls */}
      <div className="mt-5 flex flex-col items-center gap-2.5">
        {/* On Mobile: Arrow Controls around Indicators */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous project"
            className="md:hidden w-11 h-11 rounded-full border border-slate-700 bg-slate-900/80 text-cyan-400 flex items-center justify-center hover:border-cyan-400 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* 5 Indicator Bars/Pills */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Project selection">
            {Array.from({ length: totalProjects }).map((_, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Select project ${idx + 1}`}
                  onClick={() => onSelectIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'w-8 bg-cyan-400 shadow-[0_0_10px_#00f5ff]'
                      : 'w-4 bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next project"
            className="md:hidden w-11 h-11 rounded-full border border-slate-700 bg-slate-900/80 text-cyan-400 flex items-center justify-center hover:border-cyan-400 active:scale-95 transition-all"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Swipe Helper with Hand Icon */}
        <div className="flex md:hidden items-center gap-2 text-[11px] font-sans text-slate-400 mt-1">
          <span className="text-cyan-400 text-sm">👆</span>
          <span>Swipe to explore more projects</span>
        </div>
      </div>
    </div>
  );
};
