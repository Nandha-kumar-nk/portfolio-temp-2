import React from 'react';
import { ProjectItem } from '../../data/projectsData';

interface ProjectInfoProps {
  project: ProjectItem;
  className?: string;
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({ project, className = '' }) => {
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* Category / Type Chip */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-1.5 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>{project.category}</span>
        <span className="text-slate-600">•</span>
        <span className="text-slate-400">{project.type}</span>
      </div>

      {/* Main Project Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase drop-shadow-[0_2px_12px_rgba(0,245,255,0.2)]">
        {project.title}
      </h2>

      {/* Tagline */}
      <p className="mt-1 text-sm sm:text-base font-medium text-cyan-300/90 tracking-wide max-w-lg italic">
        "{project.tagline}"
      </p>
    </div>
  );
};
