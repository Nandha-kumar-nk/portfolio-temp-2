import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, CheckCircle2, Info, X } from 'lucide-react';
import { GenomeProject, ProjectTechDetail } from './genomeData';

export interface ProjectInfoProps {
  project: GenomeProject;
  selectedTech: string | null;
  onSelectTech: (techName: string | null) => void;
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({
  project,
  selectedTech,
  onSelectTech,
}) => {
  // Find currently selected tech detail if any
  const selectedTechDetail: ProjectTechDetail | undefined = project.technologies.find(
    (t) => t.name === selectedTech
  );

  return (
    <div className="w-full flex flex-col items-start justify-center space-y-4 text-left select-none">
      {/* 1. Project Number & Category Badge */}
      <motion.div
        key={`meta-${project.id}`}
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#020e24]/80 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,245,255,0.12)]"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f5ff]" />
        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-cyan-300 uppercase">
          {project.number} / 05 &bull; {project.category}
        </span>
      </motion.div>

      {/* 2. Project Title */}
      <motion.div
        key={`title-${project.id}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(0,245,255,0.3)]">
          {project.title}
        </h2>
        <p className="text-[11px] sm:text-xs font-mono tracking-[0.2em] text-cyan-400/90 font-semibold uppercase mt-0.5">
          {project.category}
        </p>
      </motion.div>

      {/* 3. Project Description */}
      <motion.p
        key={`desc-${project.id}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
        className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg font-normal"
      >
        {project.description}
      </motion.p>

      {/* 4. 5 Feature Indicators */}
      <motion.div
        key={`feats-${project.id}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
        className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1"
      >
        {project.features.map((feat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#010a18]/90 border border-cyan-500/25 text-[#94a3b8] hover:text-cyan-300 hover:border-cyan-400/50 transition-colors duration-200"
          >
            <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="text-[10px] sm:text-xs font-mono tracking-wider font-semibold uppercase">
              {feat}
            </span>
          </div>
        ))}
      </motion.div>

      {/* 5. Interactive Technology Stack Badges */}
      <motion.div
        key={`techs-${project.id}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.4, ease: 'easeOut' }}
        className="w-full pt-2"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
            TECHNOLOGY STACK (CLICK NODE TO EXPLORE):
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech, idx) => {
            const isSelected = selectedTech === tech.name;
            return (
              <button
                key={idx}
                onClick={() =>
                  onSelectTech(isSelected ? null : tech.name)
                }
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/30 border-cyan-300 text-white shadow-[0_0_12px_#00f5ff]'
                    : 'bg-[#021128]/80 border-cyan-500/20 text-slate-300 hover:border-cyan-400/60 hover:text-cyan-200'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                  style={{ backgroundColor: tech.color }}
                />
                <span className="font-semibold">{tech.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Technology Interactive Callout */}
        <AnimatePresence mode="wait">
          {selectedTechDetail && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="mt-3 p-3 rounded-lg bg-[#020e24]/95 border border-cyan-400/60 shadow-[0_0_20px_rgba(0,245,255,0.2)] backdrop-blur-md relative overflow-hidden"
            >
              <button
                onClick={() => onSelectTech(null)}
                className="absolute top-2 right-2 text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_#00f5ff]"
                  style={{ backgroundColor: selectedTechDetail.color }}
                />
                <span className="text-xs font-mono font-extrabold text-cyan-200 uppercase tracking-wider">
                  {selectedTechDetail.name}
                </span>
                <span className="text-[9px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  {selectedTechDetail.category}
                </span>
              </div>

              <p className="text-xs text-slate-300 font-normal leading-relaxed mt-1">
                {selectedTechDetail.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 6. Action Buttons */}
      <motion.div
        key={`btns-${project.id}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.5, ease: 'easeOut' }}
        className="flex items-center gap-3 pt-3"
      >
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/60 hover:border-cyan-300 text-cyan-200 hover:text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-[0_0_15px_rgba(0,245,255,0.2)] hover:shadow-[0_0_25px_rgba(0,245,255,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <span>VIEW LIVE</span>
          <ExternalLink className="w-3.5 h-3.5 text-cyan-300 group-hover:translate-x-0.5 transition-transform duration-200" />
        </a>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#010a18]/90 hover:bg-[#02132e] border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-200 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <Github className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 transition-colors duration-200" />
          <span>VIEW SOURCE</span>
        </a>
      </motion.div>
    </div>
  );
};

export default ProjectInfo;
