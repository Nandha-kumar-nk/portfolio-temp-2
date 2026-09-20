import React from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Database, Server, Atom, Terminal, Zap, Mail } from 'lucide-react';
import { ProjectItem } from '../../../data/projectsData';

interface ProjectSideInfoProps {
  project: ProjectItem;
  className?: string;
  onPrevProject?: () => void;
  onNextProject?: () => void;
}

export const ProjectSideInfo: React.FC<ProjectSideInfoProps> = ({
  project,
  className = '',
  onPrevProject,
  onNextProject,
}) => {
  // Tech stack items with authentic iconography
  const techStackList = [
    { name: 'MongoDB', icon: <Database className="w-3.5 h-3.5 text-emerald-400" /> },
    { name: 'Express', icon: <span className="text-[10px] font-mono font-bold text-slate-200">ex</span> },
    { name: 'React', icon: <Atom className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow-3d" /> },
    { name: 'Node.js', icon: <Terminal className="w-3.5 h-3.5 text-green-400" /> },
    { name: 'Socket.IO', icon: <Zap className="w-3.5 h-3.5 text-sky-400" /> },
    { name: 'NodeMailer', icon: <Mail className="w-3.5 h-3.5 text-rose-400" /> },
  ];

  return (
    <div
      id="studio-right-project-info"
      className={`relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#060b17]/85 border border-cyan-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(0,245,255,0.12)] backdrop-blur-xl select-none ${className}`}
    >
      {/* Top ambient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Main Content Group */}
      <div className="space-y-3.5 z-10">
        {/* Pager Header */}
        <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400">
            01 / 05
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onPrevProject}
              aria-label="Previous project"
              className="w-7 h-7 rounded-full bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onNextProject}
              aria-label="Next project"
              className="w-7 h-7 rounded-full bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Project Header & Tagline */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-sans">
            {project.title}
          </h2>
          <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            {project.categoryName || 'EdTech Platform'}
          </div>
          <div className="text-sm sm:text-base font-serif italic text-cyan-300 font-medium">
            &ldquo;{project.tagline || 'Learn Without Limits'}&rdquo;
          </div>
        </div>

        {/* Real Project Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          A feature-rich learning platform with course management, assignment submission, real-time notifications and a modern UI.
        </p>

        {/* Technologies Grid / Badges */}
        <div className="pt-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Technologies:
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {techStackList.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0a1224]/90 border border-slate-700/80 hover:border-cyan-400/80 transition-colors shadow-2xs group"
              >
                <span className="shrink-0 group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-200">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col gap-2 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              id="btn-view-live-project"
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,245,255,0.45)] active:scale-[0.98] cursor-pointer"
            >
              <span>View Live Project</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              id="btn-view-source-code"
              className="w-full py-2 px-4 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>View Source Code</span>
            </a>
          )}
        </div>
      </div>

      {/* Handwritten Cursive Note (Matching reference image) */}
      <div className="mt-4 pt-2 border-t border-slate-800/60 text-right select-none">
        <span className="font-script text-xl sm:text-2xl text-cyan-300/85 tracking-wide">
          Education for a brighter tomorrow. &mdash;&mdash;
        </span>
      </div>
    </div>
  );
};
