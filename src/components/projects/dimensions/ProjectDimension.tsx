import React from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectArtifact } from './ProjectArtifact';
import { ProjectSpatialInfo } from './ProjectSpatialInfo';
import { ProjectTechnologyNodes } from './ProjectTechnologyNodes';
import { ProjectDNA } from './ProjectDNA';
import { ArrowLeft, ArrowRight, X, ExternalLink, Github } from 'lucide-react';

interface ProjectDimensionProps {
  project: ProjectItem;
  currentIndex: number;
  totalProjects: number;
  onExitDimension: () => void;
  onPrevDimension: () => void;
  onNextDimension: () => void;
  onOpenFullscreen: () => void;
}

export const ProjectDimension: React.FC<ProjectDimensionProps> = ({
  project,
  currentIndex,
  totalProjects,
  onExitDimension,
  onPrevDimension,
  onNextDimension,
  onOpenFullscreen,
}) => {
  const formattedNum = String(currentIndex + 1).padStart(2, '0');
  const totalNum = String(totalProjects).padStart(2, '0');
  const accent = project.accentColor || '#00f5ff';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className="relative w-full min-h-screen bg-[#02040a] text-white py-6 px-3 sm:px-6 select-none overflow-x-hidden"
    >
      {/* Top Floating HUD Bar */}
      <div className="sticky top-4 z-40 max-w-6xl mx-auto flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        {/* Left Indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExitDimension}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 font-mono text-xs font-bold hover:text-white hover:border-cyan-400 transition-all active:scale-95"
          >
            <X className="w-4 h-4 text-cyan-400" />
            <span>EXIT DIMENSION</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 border-l border-slate-800 pl-3">
            <span className="font-mono text-xs font-extrabold text-cyan-400">
              DIMENSION {formattedNum} / {totalNum}
            </span>
            <span className="text-slate-600">•</span>
            <span className="font-bold text-xs text-white uppercase tracking-wider">
              {project.title}
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400 transition-all hidden sm:flex"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400 transition-all hidden sm:flex"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
            <button
              onClick={onPrevDimension}
              className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-cyan-400 transition-all active:scale-95"
              title="Previous Dimension"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNextDimension}
              className="p-2 rounded-lg border border-cyan-500/40 bg-cyan-950/80 text-cyan-300 hover:text-white hover:border-cyan-400 transition-all active:scale-95"
              title="Next Dimension"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Project Artifact Section */}
      <ProjectArtifact project={project} onOpenFullscreen={onOpenFullscreen} />

      {/* Floating Spatial Information Section */}
      <ProjectSpatialInfo project={project} />

      {/* Interactive Technology Subsystem Ecosystem */}
      <ProjectTechnologyNodes project={project} />

      {/* Project DNA Story Timeline */}
      <ProjectDNA project={project} />

      {/* Bottom Floating Navigation Dock */}
      <div className="max-w-4xl mx-auto mt-12 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-slate-800">
        <button
          onClick={onPrevDimension}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs font-bold hover:border-cyan-400 hover:text-white transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>PREVIOUS DIMENSION</span>
        </button>

        <button
          onClick={onExitDimension}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-cyan-500/50 bg-cyan-950/80 text-cyan-300 font-mono text-xs font-black tracking-widest uppercase hover:bg-cyan-900 hover:border-cyan-400 transition-all active:scale-95"
        >
          <X className="w-4 h-4" />
          <span>EXIT TO PORTAL HUB</span>
        </button>

        <button
          onClick={onNextDimension}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-500/50 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono text-xs font-black tracking-widest uppercase hover:text-white transition-all active:scale-95"
        >
          <span>NEXT DIMENSION</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
