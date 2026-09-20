import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import {
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  Sparkles,
  Award,
  ChevronRight,
} from 'lucide-react';
import { TechLogoItem } from '../TechIconSystem';

interface ProjectDnaCodexProps {
  project: ProjectItem;
}

type DnaStageId = 'problem' | 'idea' | 'architecture' | 'technology' | 'features' | 'impact';

interface DnaStageConfig {
  id: DnaStageId;
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STAGES: DnaStageConfig[] = [
  { id: 'problem', number: '01', label: 'PROBLEM', icon: AlertTriangle },
  { id: 'idea', number: '02', label: 'IDEA', icon: Lightbulb },
  { id: 'architecture', number: '03', label: 'ARCHITECTURE', icon: Cpu },
  { id: 'technology', number: '04', label: 'TECHNOLOGY', icon: Layers },
  { id: 'features', number: '05', label: 'FEATURES', icon: Sparkles },
  { id: 'impact', number: '06', label: 'IMPACT', icon: Award },
];

export const ProjectDnaCodex: React.FC<ProjectDnaCodexProps> = ({ project }) => {
  const [activeStage, setActiveStage] = useState<DnaStageId>('problem');

  // Reset stage to 'problem' whenever selected project changes
  useEffect(() => {
    setActiveStage('problem');
  }, [project.id]);

  const activeStageConfig = STAGES.find((s) => s.id === activeStage)!;

  return (
    <div className="w-full max-w-6xl mx-auto my-10 px-4 sm:px-6 select-none">
      {/* Header Label */}
      <div className="flex flex-col items-center justify-center text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-bold tracking-widest shadow-[0_0_12px_rgba(0,245,255,0.15)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          PROJECT DNA • CREATION CHRONICLES
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          The Engineering Journey of <span className="text-cyan-400">{project.title}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 font-mono max-w-xl">
          Progressive 6-stage blueprint from initial challenge to real-world outcome
        </p>
      </div>

      {/* DNA Interactive Timeline Nodes */}
      <div className="relative w-full max-w-4xl mx-auto mb-8">
        {/* Glowing Connected Timeline Bar */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-0.5 bg-slate-800 rounded-full z-0">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_#00f5ff]"
            initial={{ width: '0%' }}
            animate={{
              width: `${((STAGES.findIndex((s) => s.id === activeStage) + 1) / STAGES.length) * 100}%`,
            }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* 6 Stage Nodes */}
        <div className="relative z-10 flex items-center justify-between">
          {STAGES.map((stage) => {
            const isActive = stage.id === activeStage;
            const Icon = stage.icon;

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className="group relative flex flex-col items-center gap-2 focus:outline-none"
              >
                {/* Node Orb */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 active:scale-95 ${
                    isActive
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,245,255,0.4)] scale-110'
                      : 'bg-slate-900/90 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Stage Label */}
                <div className="flex flex-col items-center">
                  <span
                    className={`text-[10px] font-mono tracking-wider transition-colors ${
                      isActive ? 'text-cyan-400 font-bold' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  >
                    {stage.number}
                  </span>
                  <span
                    className={`text-[11px] font-mono tracking-wider uppercase hidden md:inline transition-colors ${
                      isActive ? 'text-white font-bold' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Active Stage Content Panel */}
      <div className="relative w-full max-w-4xl mx-auto min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${project.id}-${activeStage}`}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="p-6 sm:p-8 rounded-2xl bg-[#030a1c]/90 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,245,255,0.08)] backdrop-blur-xl relative overflow-hidden"
          >
            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full pointer-events-none" />

            {/* Stage Header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
                <activeStageConfig.icon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest uppercase">
                  STAGE {activeStageConfig.number} • {activeStageConfig.label}
                </span>
                <h4 className="text-lg font-bold text-white">
                  {getStageTitle(activeStage, project)}
                </h4>
              </div>
            </div>

            {/* Dynamic Stage Content Body */}
            <div className="text-sm text-slate-300 leading-relaxed font-sans space-y-4">
              {renderStageBody(activeStage, project)}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper: Stage Display Titles
function getStageTitle(stage: DnaStageId, project: ProjectItem): string {
  switch (stage) {
    case 'problem':
      return 'The Challenge & Operational Friction';
    case 'idea':
      return 'Core Concept & Strategic Vision';
    case 'architecture':
      return 'System Flow & Pipeline Architecture';
    case 'technology':
      return 'Verified Tech Stack Constellation';
    case 'features':
      return 'Core Product Capabilities';
    case 'impact':
      return 'Real-World Outcome & Measured Impact';
  }
}

// Helper: Stage Body Renderer
function renderStageBody(stage: DnaStageId, project: ProjectItem): React.ReactNode {
  switch (stage) {
    case 'problem':
      return (
        <div className="space-y-3">
          <p className="text-slate-300">{project.problem}</p>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-red-500/20 text-xs font-mono text-slate-400">
            <span className="text-red-400 font-bold mr-2">KEY FRICTION:</span>
            {project.description}
          </div>
        </div>
      );

    case 'idea':
      return (
        <div className="space-y-3">
          <p className="text-slate-300">{project.idea}</p>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <span className="text-cyan-400 font-bold mr-2">SOLUTION STRATEGY:</span>
            {project.solution}
          </div>
        </div>
      );

    case 'architecture':
      return (
        <div className="space-y-3">
          <p className="text-slate-300">{project.build}</p>

          {project.architectureSteps && project.architectureSteps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {project.architectureSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5"
                >
                  <span className="text-xs font-mono font-bold text-cyan-400">{step.step}</span>
                  <div>
                    <div className="text-xs font-bold text-white">{step.layer}</div>
                    <div className="text-[11px] font-mono text-slate-400">{step.tech}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
              {project.solution}
            </div>
          )}
        </div>
      );

    case 'technology':
      return (
        <div className="space-y-4">
          <p className="text-slate-300">
            Built using standard production tools tailored specifically for {project.title}.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            {project.techStack.map((tech, idx) => (
              <TechLogoItem key={`${tech.name}-${idx}`} name={tech.name} size="md" showLabel={true} />
            ))}
          </div>
        </div>
      );

    case 'features':
      return (
        <div className="space-y-3">
          <p className="text-slate-300">Key capabilities engineered into this release:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs font-mono text-slate-300 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800"
              >
                <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'impact':
      return (
        <div className="space-y-3">
          <p className="text-slate-300 font-medium">{project.impact || project.result}</p>
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-200 shadow-md">
            <span className="text-cyan-400 font-bold mr-2">VERIFIED OUTCOME:</span>
            {project.result}
          </div>
        </div>
      );
  }
}
