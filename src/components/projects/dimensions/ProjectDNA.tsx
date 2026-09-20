import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { Dna, ChevronRight } from 'lucide-react';

interface ProjectDNAProps {
  project: ProjectItem;
}

interface DnaStage {
  id: string;
  stepNumber: string;
  label: string;
  title: string;
  content: string;
  sublist?: string[];
}

export const ProjectDNA: React.FC<ProjectDNAProps> = ({ project }) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const accent = project.accentColor || '#00f5ff';

  // Construct the 6 DNA story stages from project item
  const stages: DnaStage[] = [
    {
      id: 'problem',
      stepNumber: '01',
      label: 'PROBLEM',
      title: 'The Existing Friction & Usability Gap',
      content: project.problem,
    },
    {
      id: 'idea',
      stepNumber: '02',
      label: 'IDEA',
      title: 'Architectural Concept & Design Paradigm',
      content: project.idea,
    },
    {
      id: 'architecture',
      stepNumber: '03',
      label: 'ARCHITECTURE',
      title: 'Subsystem Flow & Event Pipeline',
      content:
        project.architectureSteps
          ?.map((s) => `${s.layer}: ${s.description}`)
          .join(' • ') || project.build,
      sublist: project.architectureSteps?.map((s) => `${s.step} [${s.layer}] ${s.tech}`),
    },
    {
      id: 'technology',
      stepNumber: '04',
      label: 'TECHNOLOGY',
      title: 'Core Engine Stack & Libraries',
      content: `Built with ${project.techStack.map((t) => t.name).join(', ')}.`,
      sublist: project.techStack.map((t) => `${t.name} — ${t.role || 'System Layer'}`),
    },
    {
      id: 'features',
      stepNumber: '05',
      label: 'FEATURES',
      title: 'Key Operational Capabilities',
      content: 'Engineered for extreme performance, security, and low latency.',
      sublist: project.features,
    },
    {
      id: 'impact',
      stepNumber: '06',
      label: 'IMPACT',
      title: 'Measured Outcome & Performance Metrics',
      content: project.impact || project.result,
    },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto my-12 px-4 font-sans select-none">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-8">
        <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
          <Dna className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-mono font-bold text-cyan-400 tracking-[0.2em] uppercase">
            PROJECT DNA TIMELINE
          </h4>
          <p className="text-xs text-slate-400">Step through the 6 stages of creation</p>
        </div>
      </div>

      {/* 6 Stage Timeline Selector Nodes */}
      <div className="relative mb-8">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0 hidden sm:block" />

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 sm:gap-3 relative z-10">
          {stages.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`flex flex-col items-center p-3 rounded-xl border font-mono transition-all duration-300 ${
                  isActive
                    ? 'bg-slate-900 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,245,255,0.3)] scale-105'
                    : 'bg-slate-950/80 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span
                  className={`text-xs font-black ${
                    isActive ? 'text-cyan-400' : 'text-slate-500'
                  }`}
                >
                  {stage.stepNumber}
                </span>
                <span className="text-[11px] font-bold tracking-wider mt-1 uppercase text-center line-clamp-1">
                  {stage.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detailed Card View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-950/90 to-black border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative"
        >
          {/* Top Stage Marker */}
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-0.5 rounded border border-cyan-500/40 bg-cyan-950 text-cyan-300 font-mono text-xs font-bold">
              STAGE {stages[activeStage].stepNumber} // {stages[activeStage].label}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
            {stages[activeStage].title}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed font-normal mb-4">
            {stages[activeStage].content}
          </p>

          {/* Sublist Items if present */}
          {stages[activeStage].sublist && stages[activeStage].sublist.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800/80">
              {stages[activeStage].sublist.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs font-mono text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
