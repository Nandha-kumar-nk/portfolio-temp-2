import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { getTechIconConfig } from '../TechIconSystem';
import { Cpu, Info } from 'lucide-react';

interface ProjectTechnologyNodesProps {
  project: ProjectItem;
}

export const ProjectTechnologyNodes: React.FC<ProjectTechnologyNodesProps> = ({ project }) => {
  const [activeTechIndex, setActiveTechIndex] = useState<number | null>(0);

  const accent = project.accentColor || '#00f5ff';

  return (
    <div className="relative w-full max-w-5xl mx-auto my-10 px-4 font-sans select-none">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-mono font-bold text-cyan-400 tracking-[0.2em] uppercase">
            INTERACTIVE TECHNOLOGY ECOSYSTEM
          </h4>
          <p className="text-xs text-slate-400">Hover or tap any technology node to reveal architectural role</p>
        </div>
      </div>

      {/* Floating Interactive Technology Nodes */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-950/90 to-black/95 border border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {/* Nodes Grid */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 relative z-10">
          {project.techStack.map((tech, idx) => {
            const config = getTechIconConfig(tech.name);
            const Icon = config.icon;
            const isSelected = activeTechIndex === idx;
            const nodeColor = config.brandColor || accent;

            return (
              <motion.button
                key={`${tech.name}-${idx}`}
                onMouseEnter={() => setActiveTechIndex(idx)}
                onClick={() => setActiveTechIndex(idx)}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative group flex items-center gap-3 px-4 py-3 rounded-xl border font-mono text-xs transition-all duration-300 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,245,255,0.35)] z-20'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                }`}
              >
                {/* Brand Logo Icon */}
                <div
                  className="w-6 h-6 flex items-center justify-center transition-transform group-hover:rotate-6"
                  style={{ color: nodeColor }}
                >
                  <Icon className="w-5 h-5 filter drop-shadow-[0_0_6px_currentColor]" />
                </div>

                {/* Tech Short Label */}
                <span className="font-bold tracking-wide">{config.shortLabel || tech.name}</span>

                {/* Selection Indicator Ping */}
                {isSelected && (
                  <span
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping"
                    style={{ backgroundColor: nodeColor }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Selected Node Architecture Inspector Panel */}
        <AnimatePresence mode="wait">
          {activeTechIndex !== null && project.techStack[activeTechIndex] && (
            <motion.div
              key={activeTechIndex}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-6 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
            >
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-300 uppercase">
                      {project.techStack[activeTechIndex].name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-200 border border-cyan-500/20">
                      NODE ROLE
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {project.techStack[activeTechIndex].role ||
                      `Core stack component powering ${project.title} subsystem logic.`}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
