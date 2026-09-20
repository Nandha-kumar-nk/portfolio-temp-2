import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../../data/projectsData';
import { ProjectScreenshotFrame } from './ProjectScreenshotFrame';

interface ProjectArchiveInfoProps {
  project: ProjectItem;
  currentIndex: number;
  totalProjects: number;
  isTransitioning?: boolean;
}

export const ProjectArchiveInfo: React.FC<ProjectArchiveInfoProps> = ({
  project,
  currentIndex,
  totalProjects,
  isTransitioning = false,
}) => {
  const currentFormatted = String(currentIndex + 1).padStart(2, '0');
  const totalFormatted = String(totalProjects).padStart(2, '0');
  const accent = project.themeColor || project.accentColor || '#00f5ff';

  return (
    <div
      id="project-information-section"
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6 mb-8 select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Project Information (01/05, Title, Tagline, Desc, Tech, CTAs) */}
        {/* ========================================================================= */}
        <div
          className={`lg:col-span-6 flex flex-col items-start text-left transition-all duration-500 ${
            isTransitioning ? 'opacity-30 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* 01 / 05 Counter & Category */}
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-widest mb-1">
            <span className="text-cyan-400 font-bold">{currentFormatted}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-500">{totalFormatted}</span>
            <span className="text-slate-600">•</span>
            <span
              className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border"
              style={{
                backgroundColor: `${accent}15`,
                borderColor: `${accent}40`,
                color: accent,
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase font-sans mt-0.5">
            {project.title}
          </h2>

          {/* Tagline */}
          <h3 className="text-sm sm:text-base font-medium text-cyan-300 tracking-wide mt-0.5">
            “{project.tagline}”
          </h3>

          {/* Full-Stack Type */}
          <div className="text-[10px] sm:text-xs font-mono tracking-widest text-slate-400 uppercase mt-1">
            {project.type || project.category}
          </div>

          {/* Short description */}
          <p className="mt-2.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed font-sans max-w-xl">
            {project.description}
          </p>

          {/* Tech Stack Chips */}
          <div className="mt-4 w-full">
            <div className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-2">
              TECH STACK
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-medium tracking-wide bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-1.5"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: tech.color || accent }}
                  />
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons: VIEW LIVE PROJECT → and VIEW SOURCE CODE */}
          <div className="flex flex-wrap items-center gap-3 mt-5 sm:mt-6 w-full sm:w-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:shadow-[0_0_28px_rgba(0,245,255,0.65)] transition-all duration-200 cursor-pointer active:scale-95"
              >
                <span>VIEW LIVE PROJECT</span>
                <span className="font-black">→</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium tracking-wider text-slate-300 hover:text-white bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Github className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                <span>VIEW SOURCE CODE</span>
              </a>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Real Project Screenshot in Elegant Floating Display        */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 w-full flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-[460px]">
            <ProjectScreenshotFrame
              project={project}
              isTransitioning={isTransitioning}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
