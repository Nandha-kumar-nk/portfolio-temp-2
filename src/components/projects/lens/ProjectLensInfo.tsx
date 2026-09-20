import React from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectLensTechStack } from './ProjectLensTechStack';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

interface ProjectLensInfoProps {
  project: ProjectItem;
  currentIndex: number;
  totalProjects: number;
}

export const ProjectLensInfo: React.FC<ProjectLensInfoProps> = ({
  project,
  currentIndex,
  totalProjects,
}) => {
  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <div className="flex flex-col justify-between gap-4 font-mono h-full">
      <div>
        {/* Number & Category */}
        <div className="flex items-center justify-between text-xs text-cyan-400 mb-1.5">
          <span className="tracking-widest font-bold uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{project.category}</span>
          </span>
          <span className="text-cyan-300 font-bold text-xs bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded-full">
            {formatNumber(currentIndex + 1)} / {formatNumber(totalProjects)}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wide uppercase drop-shadow-[0_0_20px_rgba(0,245,255,0.25)]">
          {project.title}
        </h2>

        {/* Tagline Subtitle */}
        <p className="text-xs font-bold text-cyan-300/90 tracking-wider uppercase mt-1">
          "{project.tagline}"
        </p>

        {/* Short Description */}
        <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {project.description}
        </p>

        {/* Key Features Badges */}
        {project.features && project.features.length > 0 && (
          <div className="mt-3.5">
            <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase block mb-1.5">
              KEY CAPABILITIES
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.features.slice(0, 4).map((feat) => (
                <span
                  key={feat}
                  className="px-2.5 py-1 rounded-lg bg-cyan-950/50 border border-cyan-800/50 text-[10px] text-cyan-200"
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Technology Stack with Real Brand SVG Logos */}
      <ProjectLensTechStack
        projectId={project.id}
        techStack={project.techStack}
      />

      {/* Action CTA Buttons */}
      <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-cyan-900/50">
        <a
          href={project.liveUrl || project.liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-extrabold text-xs hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,245,255,0.4)] cursor-pointer"
        >
          <span>VIEW PROJECT →</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-800/60 text-cyan-300 text-xs font-bold hover:border-cyan-400 hover:bg-cyan-950/60 transition-colors cursor-pointer"
        >
          <Github className="w-4 h-4" />
          <span>VIEW SOURCE</span>
        </a>
      </div>
    </div>
  );
};
