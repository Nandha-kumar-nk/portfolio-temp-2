import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectTechStackItem } from '../../../data/projectsData';
import { getTechIconConfig } from '../TechIconSystem';
import { PROJECT_TECH_DETAILS } from './archiveTypes';
import { Cpu, Info } from 'lucide-react';

interface ArchiveTechnologyStackProps {
  projectId: string;
  techStack: ProjectTechStackItem[];
}

export const ArchiveTechnologyStack: React.FC<ArchiveTechnologyStackProps> = ({
  projectId,
  techStack,
}) => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const projectDetails = PROJECT_TECH_DETAILS[projectId] || {};

  return (
    <div className="w-full font-mono mt-3">
      {/* Header Label */}
      <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-cyan-400">
        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
        <span>TECHNOLOGY ARCHITECTURE</span>
      </div>

      {/* Grid of Real Brand Logos */}
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => {
          const config = getTechIconConfig(tech.name);
          const Icon = config.icon;
          const isSelected = selectedTech === tech.name;
          const isHovered = hoveredTech === tech.name;

          return (
            <div key={tech.name} className="relative group">
              <button
                onClick={() =>
                  setSelectedTech(isSelected ? null : tech.name)
                }
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`relative flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all duration-300 cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,245,255,0.5)] scale-105 z-10'
                    : 'bg-slate-950/70 border-cyan-900/50 text-slate-300 hover:border-cyan-500/70 hover:bg-slate-900/80 hover:scale-102'
                }`}
              >
                {/* Brand Logo Icon */}
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <Icon
                    className="w-4 h-4 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_currentColor]"
                    style={{ color: config.brandColor }}
                  />
                </div>

                {/* Small Clean Label */}
                <span className="text-xs font-medium tracking-tight">
                  {config.shortLabel}
                </span>
              </button>

              {/* Hover Tooltip */}
              <AnimatePresence>
                {isHovered && !isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/60 text-[10px] font-mono text-cyan-200 whitespace-nowrap z-50 shadow-lg pointer-events-none"
                  >
                    {config.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
            className="mt-3 p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/50 text-xs text-cyan-200 flex items-start gap-2.5 shadow-[0_0_15px_rgba(0,245,255,0.15)]"
          >
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-cyan-300 uppercase">
                {selectedTech}:
              </span>{' '}
              <span className="font-sans">
                {projectDetails[selectedTech] ||
                  `Core architectural component powering real-time system stability and high-performance operations for ${projectId}.`}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
