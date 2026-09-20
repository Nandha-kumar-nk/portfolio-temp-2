import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ProjectItem } from '../../data/projectsData';

interface ProjectActionsProps {
  project: ProjectItem;
  className?: string;
}

export const ProjectActions: React.FC<ProjectActionsProps> = ({ project, className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_20px_rgba(0,245,255,0.35)] hover:shadow-[0_0_28px_rgba(0,245,255,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>View Live Project</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      )}

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium tracking-wider uppercase text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/70 hover:border-cyan-400/60 shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Github className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
          <span>Source Code</span>
        </a>
      )}
    </div>
  );
};
