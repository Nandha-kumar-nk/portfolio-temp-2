import React from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { AlertCircle, Zap, ShieldCheck } from 'lucide-react';

interface SpatialInfoNodesProps {
  project: ProjectItem;
}

export const SpatialInfoNodes: React.FC<SpatialInfoNodesProps> = ({ project }) => {
  const accent = project.accentColor || '#00f5ff';

  return (
    <div className="relative w-full max-w-5xl mx-auto my-8 px-4 font-sans select-none">
      {/* Floating Spatial Nodes Grid connected via subtle glowing lines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        {/* Node 1: Problem */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.95, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/50 transition-all group"
        >
          {/* Accent Node Dot & Line */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
              style={{ color: accent, backgroundColor: accent }}
            />
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>01 // PROBLEM</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {project.problem}
          </p>

          {/* SVG Connector Line visual anchor */}
          <div className="absolute top-1/2 -right-4 w-4 h-[1px] bg-cyan-500/30 hidden md:block" />
        </motion.div>

        {/* Node 2: Solution */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.95, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/50 transition-all group"
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
              style={{ color: accent, backgroundColor: accent }}
            />
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>02 // SOLUTION</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {project.solution}
          </p>

          <div className="absolute top-1/2 -right-4 w-4 h-[1px] bg-cyan-500/30 hidden md:block" />
        </motion.div>

        {/* Node 3: Measured Impact */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.95, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/50 transition-all group"
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
              style={{ color: accent, backgroundColor: accent }}
            />
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>03 // MEASURED IMPACT</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {project.impact || project.result}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
