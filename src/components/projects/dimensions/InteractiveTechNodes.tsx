import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { getTechIconConfig } from '../TechIconSystem';
import { Cpu, Info } from 'lucide-react';

interface InteractiveTechNodesProps {
  project: ProjectItem;
}

export const InteractiveTechNodes: React.FC<InteractiveTechNodesProps> = ({ project }) => {
  const [activeTechIndex, setActiveTechIndex] = useState<number | null>(0);

  const accent = project.accentColor || '#00f5ff';

  return (
    <div className="relative w-full max-w-md mx-auto my-4 font-sans select-none">
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-3 justify-center text-center">
        <div className="p-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
          <Cpu className="w-3.5 h-3.5" />
        </div>
        <h4 className="font-orbitron font-bold text-xs text-cyan-400 tracking-[0.15em] uppercase">
          TECHNOLOGY CONSTELLATION
        </h4>
      </div>

      {/* Floating Interactive Nodes */}
      <div className="p-3.5 sm:p-4 rounded-2xl border border-cyan-500/30 bg-slate-950/80 backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.15)]">
        <div className="flex flex-wrap items-center justify-center gap-2 relative z-10">
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
                className={`relative group flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-xs transition-all duration-300 ${
                  isSelected
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_#00f5ff] scale-105 z-20'
                    : 'bg-slate-900/60 text-cyan-300/90 border border-cyan-500/30 hover:border-cyan-400/60 hover:bg-slate-900/90'
                }`}
              >
                {/* Brand Logo Icon */}
                <div
                  className="w-4 h-4 flex items-center justify-center transition-transform group-hover:rotate-6"
                  style={{ color: isSelected ? '#020617' : nodeColor }}
                >
                  <Icon className="w-3.5 h-3.5 filter drop-shadow-[0_0_4px_currentColor]" />
                </div>

                {/* Tech Short Label */}
                <span className="font-bold tracking-wide text-[11px]">
                  {config.shortLabel || tech.name}
                </span>

                {/* Active Indicator Pulse */}
                {isSelected && (
                  <span
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: nodeColor }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Selected Technology Description Inspector */}
        <AnimatePresence mode="wait">
          {activeTechIndex !== null && project.techStack[activeTechIndex] && (
            <motion.div
              key={activeTechIndex}
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-3 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 backdrop-blur-md flex items-start gap-2.5 text-left"
            >
              <Info className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-orbitron text-xs font-bold text-cyan-300 uppercase">
                    {project.techStack[activeTechIndex].name}
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-900/80 text-cyan-200 border border-cyan-500/30">
                    SUBSYSTEM ROLE
                  </span>
                </div>
                <p className="text-[11px] font-mono text-slate-200 mt-1 leading-relaxed">
                  {project.techStack[activeTechIndex].role ||
                    `Core stack component powering ${project.title} subsystem logic.`}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
