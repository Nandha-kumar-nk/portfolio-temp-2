import React from 'react';
import { ExternalLink, Github, Sparkles, Code, Cpu } from 'lucide-react';
import { ProjectItem } from '../../../data/projectsData';
import { PROJECT_THEMES } from './types';

interface ProjectInfoProps {
  project: ProjectItem;
  className?: string;
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({
  project,
  className = '',
}) => {
  const theme = PROJECT_THEMES[project.id] || PROJECT_THEMES['swayam-2'];

  return (
    <div
      id="arena-project-info-panel"
      className={`relative z-20 p-4 sm:p-5 rounded-2xl bg-[#070f20]/90 border border-cyan-500/40 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.85)] flex flex-col justify-between gap-3 text-left select-none ${className}`}
      style={{
        boxShadow: `0 20px 45px rgba(0,0,0,0.8), 0 0 20px ${theme.glow}`,
        borderColor: `${theme.primary}80`,
      }}
    >
      {/* Header Info */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span
            className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${theme.primary}20`,
              color: theme.primary,
              border: `1px solid ${theme.primary}60`,
            }}
          >
            {project.category}
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {project.type}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-sans">
          {project.title}
        </h2>
        
        <p className="text-xs font-serif italic text-cyan-300 font-medium">
          &ldquo;{project.tagline}&rdquo;
        </p>

        <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
          {project.description}
        </p>
      </div>

      {/* Technology Badges */}
      <div className="space-y-1.5 pt-1">
        <div className="text-[9.5px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          TECHNOLOGIES:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech.name}
              className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/80 text-[10px] font-mono text-slate-200 transition-colors hover:border-cyan-400"
              style={{
                borderLeft: `2px solid ${tech.color || theme.primary}`,
              }}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2 px-3 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer hover:brightness-110 active:scale-98"
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

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400/80 text-slate-200 font-mono text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:text-white active:scale-98"
          >
            <Github className="w-3.5 h-3.5 text-cyan-400" />
            <span>VIEW SOURCE CODE</span>
          </a>
        )}
      </div>
    </div>
  );
};
