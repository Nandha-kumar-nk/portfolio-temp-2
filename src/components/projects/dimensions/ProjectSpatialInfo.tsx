import React from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { AlertCircle, Zap, ShieldCheck } from 'lucide-react';

interface ProjectSpatialInfoProps {
  project: ProjectItem;
}

export const ProjectSpatialInfo: React.FC<ProjectSpatialInfoProps> = ({ project }) => {
  const accent = project.accentColor || '#00f5ff';

  return (
    <div className="relative w-full max-w-5xl mx-auto my-8 px-4 font-sans select-none">
      {/* Floating Spatial Grid Layout with Subtle Connector Lines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        {/* Spatial Node 1: Problem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.95, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/50 transition-all group"
        >
          {/* Subtle Accent Glow Line Left */}
          <div
            className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full"
            style={{ backgroundColor: accent }}
          />

          <div className="flex items-center gap-2 mb-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-cyan-400" />
            <span>01 // THE CHALLENGE</span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            {project.problem}
          </p>

          {/* SVG Connector Dot */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,245,255,0.8)] hidden md:block" />
        </motion.div>

        {/* Spatial Node 2: Solution & Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.95, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/50 transition-all group"
        >
          <div
            className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full"
            style={{ backgroundColor: accent }}
          />

          <div className="flex items-center gap-2 mb-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>02 // CORE SOLUTION</span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            {project.solution}
          </p>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,245,255,0.8)] hidden md:block" />
        </motion.div>

        {/* Spatial Node 3: Result & Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.95, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/50 transition-all group"
        >
          <div
            className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full"
            style={{ backgroundColor: accent }}
          />

          <div className="flex items-center gap-2 mb-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>03 // IMPACT & MEASURED RESULT</span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            {project.impact || project.result}
          </p>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,245,255,0.8)] hidden md:block" />
        </motion.div>
      </div>
    </div>
  );
};
