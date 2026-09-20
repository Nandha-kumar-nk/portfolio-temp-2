import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../../../data/projectsData';

interface ProjectInfoCardProps {
  project: ProjectItem;
}

export const ProjectInfoCard: React.FC<ProjectInfoCardProps> = ({ project }) => {
  return (
    <div
      id="dimensional-project-info"
      className="w-full max-w-2xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center select-none"
    >
      {/* 01 / 05 Dimension Tag */}
      <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest mb-1.5">
        <span className="text-cyan-400 font-bold">{project.doorNumber || '01'}</span>
        <span className="text-slate-600">/</span>
        <span className="text-slate-500">05</span>
        <span className="text-slate-600">•</span>
        <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/40 text-cyan-300">
          {project.category || 'EDTECH PLATFORM'}
        </span>
      </div>

      {/* Main Title: SWAYAM 2.0 */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase font-sans mt-0.5">
        {project.title}
      </h2>

      {/* Tagline: "Learn Without Limits" */}
      <h3 className="text-sm sm:text-base font-semibold text-cyan-300 tracking-wide mt-1">
        “{project.tagline}”
      </h3>

      {/* Type: FULL STACK EDUCATION PLATFORM */}
      <div className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mt-1">
        {project.type}
      </div>

      {/* Description */}
      <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-xl text-center">
        {project.description}
      </p>

      {/* Tech Stack Chips */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-lg">
        {project.techStack.map((tech) => (
          <span
            key={tech.name}
            className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-medium tracking-wide bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-1.5"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: tech.color || '#00f5ff' }}
            />
            <span>{tech.name}</span>
          </span>
        ))}
      </div>

      {/* Action Buttons: VIEW LIVE PROJECT → and VIEW SOURCE CODE */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-5 w-full sm:w-auto">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:shadow-[0_0_28px_rgba(0,245,255,0.65)] transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
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
            className="min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium tracking-wider text-slate-300 hover:text-white bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
          >
            <Github className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <span>VIEW SOURCE CODE</span>
          </a>
        )}
      </div>
    </div>
  );
};
