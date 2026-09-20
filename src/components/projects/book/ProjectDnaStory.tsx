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
  Dna,
} from 'lucide-react';
import { TechLogoItem } from '../TechIconSystem';

interface ProjectDnaStoryProps {
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

export const ProjectDnaStory: React.FC<ProjectDnaStoryProps> = ({ project }) => {
  const [activeStage, setActiveStage] = useState<DnaStageId>('problem');

  // Reset stage to 'problem' whenever project changes
  useEffect(() => {
    setActiveStage('problem');
  }, [project.id]);

  const activeStageConfig = STAGES.find((s) => s.id === activeStage)!;

  return (
    <div className="w-full max-w-4xl mx-auto my-10 px-4 select-none">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center space-y-1.5 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-[11px] font-mono font-bold tracking-widest shadow-[0_0_12px_rgba(0,245,255,0.15)]">
          <Dna className="w-3.5 h-3.5 text-cyan-400" />
          <span>CHAPTER DNA • EVOLUTION OF {project.title.toUpperCase()}</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
          Engineering Chronicles &amp; Architectural Blueprint
        </h3>
      </div>

      {/* Thin Glowing Double-Line Path with Connected Nodes */}
      <div className="relative w-full max-w-3xl mx-auto mb-6">
        {/* Top & Bottom Thin Double-Line Path */}
        <div className="absolute top-[18px] sm:top-[22px] left-4 right-4 h-0.5 bg-slate-800/80 rounded-full z-0">
          <motion.div
            className="h-full bg-cyan-400 shadow-[0_0_8px_#00f5ff]"
            initial={{ width: '0%' }}
            animate={{
              width: `${((STAGES.findIndex((s) => s.id === activeStage) + 1) / STAGES.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Connected Stage Nodes */}
        <div className="relative z-10 flex items-center justify-between">
          {STAGES.map((stage) => {
            const isActive = stage.id === activeStage;
            const Icon = stage.icon;

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className="group relative flex flex-col items-center gap-1.5 focus:outline-none"
              >
                {/* Node Button */}
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300 active:scale-95 ${
                    isActive
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_16px_rgba(0,245,255,0.4)] scale-110'
                      : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Node Label */}
                <span
                  className={`text-[10px] font-mono tracking-wider uppercase transition-colors hidden sm:inline ${
                    isActive ? 'text-cyan-400 font-bold' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                >
                  {stage.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Single Stage Details Box */}
      <div className="relative w-full max-w-3xl mx-auto min-h-[140px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${project.id}-${activeStage}`}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="p-5 sm:p-6 rounded-2xl bg-[#030919]/90 border border-cyan-500/25 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-slate-800">
              <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
                <activeStageConfig.icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest uppercase">
                STAGE {activeStageConfig.number} • {activeStageConfig.label}
              </span>
            </div>

            {/* Body */}
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {renderStageBody(activeStage, project)}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

function renderStageBody(stage: DnaStageId, project: ProjectItem): React.ReactNode {
  switch (stage) {
    case 'problem':
      return <p className="text-slate-300">{project.problem}</p>;

    case 'idea':
      return <p className="text-slate-300">{project.idea}</p>;

    case 'architecture':
      return (
        <div className="space-y-2">
          <p className="text-slate-300">{project.build}</p>
          {project.architectureSteps && project.architectureSteps.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {project.architectureSteps.slice(0, 4).map((step, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-2 text-xs"
                >
                  <span className="font-mono text-cyan-400 font-bold">{step.step}</span>
                  <span className="text-slate-200 font-medium">{step.layer}:</span>
                  <span className="text-slate-400 font-mono text-[11px]">{step.tech}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case 'technology':
      return (
        <div className="space-y-3">
          <p className="text-slate-300">Technology architecture utilized in this chapter:</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <TechLogoItem key={`${tech.name}-${idx}`} name={tech.name} size="sm" showLabel={true} />
            ))}
          </div>
        </div>
      );

    case 'features':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {project.features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-xs font-mono text-slate-300 p-2 rounded-lg bg-slate-900/60 border border-slate-800"
            >
              <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      );

    case 'impact':
      return <p className="text-slate-300 font-medium">{project.impact || project.result}</p>;
  }
}
