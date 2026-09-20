import React from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { TechLogoItem } from '../TechIconSystem';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';

interface CodexLeftPageProps {
  project: ProjectItem;
  chapterIndex: number;
  totalChapters: number;
}

export const CodexLeftPage: React.FC<CodexLeftPageProps> = ({
  project,
  chapterIndex,
  totalChapters,
}) => {
  const chapterNumber = String(chapterIndex + 1).padStart(2, '0');
  const totalStr = String(totalChapters).padStart(2, '0');

  return (
    <div className="flex flex-col justify-between h-full p-6 sm:p-8 md:p-10 text-white font-sans relative overflow-hidden select-none">
      {/* Subtle Background Spine & Page Details */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hidden md:block" />

      {/* Top Header & Chapter Badge */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-bold tracking-widest shadow-[0_0_12px_rgba(0,245,255,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            CHAPTER {chapterNumber} / {totalStr}
          </div>
          <span className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">
            {project.category}
          </span>
        </div>

        {/* Project Title & Tagline */}
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {project.title}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-cyan-400 font-semibold tracking-wide uppercase">
            {project.tagline}
          </p>
        </div>

        {/* Short Description (2-3 lines) */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Middle: Technologies */}
      <div className="my-6 space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
          <span className="w-1 h-3 bg-cyan-400/80 rounded-full" />
          TECHNOLOGIES
        </div>

        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {project.techStack.map((tech, idx) => (
            <TechLogoItem key={`${tech.name}-${idx}`} name={tech.name} size="sm" showLabel={true} />
          ))}
        </div>
      </div>

      {/* Bottom Action CTAs */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-cyan-500/30 to-blue-600/30 border border-cyan-400/50 text-cyan-200 text-xs font-mono font-bold tracking-wider hover:text-white hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.35)] transition-all duration-300 active:scale-95"
          >
            <span>VIEW PROJECT</span>
            <ChevronRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 transition-transform" />
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 text-xs font-mono font-semibold tracking-wider hover:text-white hover:border-slate-500 hover:bg-slate-800/90 transition-all duration-300 active:scale-95"
          >
            <Github className="w-4 h-4 text-slate-400 group-hover:text-white" />
            <span>VIEW SOURCE</span>
          </a>
        )}
      </div>
    </div>
  );
};
