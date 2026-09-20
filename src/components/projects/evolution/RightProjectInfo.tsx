import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../../../data/projectsData';
import { ExternalLink, Github, Cpu, ArrowRight, Info } from 'lucide-react';

interface RightProjectInfoProps {
  project: ProjectItem;
  currentIndex: number;
  totalProjects: number;
}

export const RightProjectInfo: React.FC<RightProjectInfoProps> = ({
  project,
  currentIndex,
  totalProjects,
}) => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <div className="flex flex-col h-full justify-between gap-4 font-mono">
      {/* Top Header & Title */}
      <div>
        <div className="flex items-center justify-between text-xs text-cyan-400/80 mb-1">
          <span className="tracking-widest font-semibold uppercase">
            {project.category}
          </span>
          <span className="text-cyan-300 font-bold text-sm">
            {formatNumber(currentIndex + 1)} / {formatNumber(totalProjects)}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase drop-shadow-[0_0_15px_rgba(0,245,255,0.2)]">
          {project.title}
        </h2>

        <p className="mt-2 text-xs text-slate-300 leading-relaxed font-sans font-normal">
          {project.description}
        </p>
      </div>

      {/* Technology Pills */}
      <div>
        <div className="flex items-center gap-1.5 mb-2 text-[11px] text-cyan-400 font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          <span>TECHNOLOGY STACK</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => {
            const isSelected = selectedTech === tech.name;

            return (
              <button
                key={tech.name}
                onClick={() =>
                  setSelectedTech(isSelected ? null : tech.name)
                }
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-300 shadow-[0_0_12px_rgba(0,245,255,0.6)] scale-105'
                    : 'bg-cyan-950/40 text-cyan-200 border-cyan-800/50 hover:border-cyan-400 hover:bg-cyan-900/50'
                }`}
              >
                {tech.name}
              </button>
            );
          })}
        </div>

        {/* Selected Tech Detail Callout */}
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-2 p-2 rounded bg-cyan-950/80 border border-cyan-500/40 text-[11px] text-cyan-200 flex items-start gap-2"
            >
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cyan-300">{selectedTech}:</span>{' '}
                Integral layer powering real-time system performance, security, and rendering logic for {project.shortName}.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-cyan-900/40">
        <a
          href={project.liveUrl || project.liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-mono font-bold text-xs hover:brightness-110 transition-all shadow-[0_0_18px_rgba(0,245,255,0.4)] cursor-pointer"
        >
          <span>VIEW LIVE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-cyan-800/60 text-cyan-300 font-mono text-xs hover:border-cyan-400 hover:bg-cyan-950/60 transition-colors cursor-pointer"
        >
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline">SOURCE</span>
        </a>
      </div>
    </div>
  );
};
