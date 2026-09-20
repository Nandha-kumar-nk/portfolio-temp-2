import React from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { PROJECT_ASSETS } from '../cube/projectAssets';
import { TechLogoItem } from '../TechIconSystem';
import { ExternalLink, Github, Maximize2 } from 'lucide-react';

interface BookPageContentProps {
  project: ProjectItem;
  chapterIndex: number;
  totalChapters: number;
  onFullscreenScreenshot?: () => void;
}

export const BookPageContent: React.FC<BookPageContentProps> = ({
  project,
  chapterIndex,
  totalChapters,
  onFullscreenScreenshot,
}) => {
  const chapterNumber = String(chapterIndex + 1).padStart(2, '0');
  const totalStr = String(totalChapters).padStart(2, '0');

  const asset = PROJECT_ASSETS[project.id] || PROJECT_ASSETS['speed-taxi'];
  const screenshotUrl = asset?.dataUrl || project.image || project.screenshot;

  return (
    <div className="relative w-full h-full p-5 sm:p-7 md:p-9 flex flex-col justify-between text-white select-none overflow-hidden bg-gradient-to-br from-[#040d21] via-[#020817] to-[#01050e] rounded-r-2xl border-l border-cyan-500/20">
      {/* Background Subtle Paper Texture Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00f5ff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

      {/* Giant Low-Opacity Watermark Chapter Number */}
      <div className="absolute -top-6 -right-2 text-[140px] sm:text-[200px] font-mono font-black text-cyan-500/[0.06] pointer-events-none leading-none select-none z-0">
        {chapterNumber}
      </div>

      {/* Header Row */}
      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-cyan-500/15 pb-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/50 text-cyan-300 text-xs font-mono font-bold tracking-widest shadow-[0_0_10px_rgba(0,245,255,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          CHAPTER {chapterNumber} / {totalStr}
        </div>

        <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase font-semibold">
          {project.category}
        </span>
      </div>

      {/* Title & Tagline */}
      <div className="relative z-10 my-2 space-y-1">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {project.title}
        </h2>
        <p className="text-xs sm:text-sm font-mono text-cyan-400 font-bold tracking-wider uppercase">
          {project.tagline}
        </p>
      </div>

      {/* HERO: Actual Project Screenshot (Sharp, Flat, Undistorted, Original Aspect Ratio) */}
      <div className="relative z-10 w-full my-2 rounded-xl bg-[#020815]/95 border border-cyan-500/30 p-2 sm:p-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.7)] group">
        <img
          src={screenshotUrl}
          alt={`${project.title} Actual Screenshot`}
          className="w-full h-auto max-h-[260px] sm:max-h-[300px] md:max-h-[340px] object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
          loading="eager"
        />

        {/* Fullscreen Expansion Icon */}
        {onFullscreenScreenshot && (
          <button
            onClick={onFullscreenScreenshot}
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-cyan-400/50 text-cyan-300 text-[11px] font-mono flex items-center gap-1.5 shadow-lg hover:bg-cyan-950"
            title="Expand Fullscreen Preview"
          >
            <Maximize2 className="w-3 h-3" />
            <span>ENLARGE</span>
          </button>
        )}
      </div>

      {/* Short Description */}
      <p className="relative z-10 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-3 my-1">
        {project.description}
      </p>

      {/* Technologies & Actions Footer Row */}
      <div className="relative z-10 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        {/* Compact Tech Icons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400 font-bold mr-1">TECH:</span>
          {project.techStack.slice(0, 5).map((tech, idx) => (
            <TechLogoItem key={`${tech.name}-${idx}`} name={tech.name} size="sm" showLabel={true} />
          ))}
        </div>

        {/* Book Action Links */}
        <div className="flex items-center gap-2.5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/30 border border-cyan-400/50 text-cyan-200 text-xs font-mono font-bold tracking-wider hover:text-white hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all duration-200 active:scale-95"
            >
              <span>VIEW PROJECT</span>
              <ExternalLink className="w-3 h-3 text-cyan-300" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 text-xs font-mono font-semibold tracking-wider hover:text-white hover:border-slate-500 transition-all duration-200 active:scale-95"
            >
              <Github className="w-3 h-3 text-slate-400" />
              <span>SOURCE</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
