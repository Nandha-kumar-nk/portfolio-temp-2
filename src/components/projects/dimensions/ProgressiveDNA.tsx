import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { Helix3DCanvas } from './Helix3DCanvas';
import {
  Dna,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  Sparkles,
  TrendingUp,
  Check,
  CheckCircle2,
  ExternalLink,
  Github,
} from 'lucide-react';

interface ProgressiveDNAProps {
  project: ProjectItem;
}

export type DnaStageId = 'problem' | 'idea' | 'architecture' | 'technology' | 'features' | 'impact';

interface DnaStageConfig {
  id: DnaStageId;
  step: string;
  label: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const DNA_STAGES: DnaStageConfig[] = [
  {
    id: 'problem',
    step: '01',
    label: 'PROBLEM',
    title: 'Usability Gap & Operational Friction',
    icon: AlertTriangle,
  },
  {
    id: 'idea',
    step: '02',
    label: 'IDEA',
    title: 'Architectural Concept & Solution Paradigm',
    icon: Lightbulb,
  },
  {
    id: 'architecture',
    step: '03',
    label: 'ARCHITECTURE',
    title: 'Subsystem Flow & Event Pipeline',
    icon: Cpu,
  },
  {
    id: 'technology',
    step: '04',
    label: 'TECHNOLOGY',
    title: 'Core Engine Stack & Libraries',
    icon: Layers,
  },
  {
    id: 'features',
    step: '05',
    label: 'FEATURES',
    title: 'Key Operational Capabilities',
    icon: Sparkles,
  },
  {
    id: 'impact',
    step: '06',
    label: 'IMPACT',
    title: 'Measured Outcome & Real-World Impact',
    icon: TrendingUp,
  },
];

export const ProgressiveDNA: React.FC<ProgressiveDNAProps> = ({ project }) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [visitedStages, setVisitedStages] = useState<Set<number>>(new Set([0]));

  // Reset state when project changes
  const [prevProjectId, setPrevProjectId] = useState<string>(project.id);
  if (project.id !== prevProjectId) {
    setPrevProjectId(project.id);
    setActiveStageIndex(0);
    setVisitedStages(new Set([0]));
  }

  const handleSelectStage = (idx: number) => {
    if (idx === activeStageIndex) return;
    setActiveStageIndex(idx);
    setVisitedStages((prev) => new Set([...prev, idx]));
  };

  const currentStage = DNA_STAGES[activeStageIndex];
  const accentColor = project.accentColor || '#00f5ff';

  // Extract features list
  const featuresList =
    project.features && project.features.length > 0
      ? project.features
      : project.keyFeatures && project.keyFeatures.length > 0
      ? project.keyFeatures
      : [
          'Real-time state management and updates',
          'Automated background event pipeline',
          'Production-tested security & access control',
          'Seamless cross-device responsiveness',
        ];

  // Percentage along the horizontal strand (0%, 20%, 40%, 60%, 80%, 100%)
  const nodePercentage = (activeStageIndex / 5) * 100;

  return (
    <div className="relative w-full max-w-5xl mx-auto my-12 px-3 sm:px-6 font-sans select-none box-border">
      {/* ========================================================================= */}
      {/* 1. SECTION HEADER                                                         */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 shadow-[0_0_12px_rgba(0,245,255,0.2)]">
            <Dna className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h2 className="font-orbitron font-extrabold text-sm sm:text-base text-slate-100 tracking-wider">
              PROJECT DNA PATHWAY
            </h2>
          </div>
        </div>
        <span className="text-[10px] sm:text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-500/20">
          EVOLUTIONARY SEQUENCE
        </span>
      </div>

      {/* ========================================================================= */}
      {/* 2. REAL 3D DIGITAL DNA DOUBLE HELIX CANVAS                                */}
      {/* ========================================================================= */}
      <div className="relative w-full mb-4">
        <Helix3DCanvas
          activeStageIndex={activeStageIndex}
          visitedStages={visitedStages}
          onSelectStage={handleSelectStage}
        />
      </div>

      {/* ========================================================================= */}
      {/* 3. STAGE NODE SELECTOR BUTTONS (DESKTOP & MOBILE RESPONSIVE)               */}
      {/* ========================================================================= */}
      <div className="relative w-full overflow-x-auto no-scrollbar pb-3 px-1">
        <div className="flex items-center justify-between min-w-[580px] sm:min-w-0 max-w-4xl mx-auto px-2">
          {DNA_STAGES.map((st, idx) => {
            const isActive = idx === activeStageIndex;
            const isVisited = visitedStages.has(idx);

            return (
              <button
                key={st.id}
                type="button"
                onClick={() => handleSelectStage(idx)}
                className="group flex flex-col items-center focus:outline-none cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                {/* Step Number Above */}
                <span
                  className={`font-orbitron font-black text-[11px] sm:text-xs mb-1 transition-all duration-300 ${
                    isActive
                      ? 'text-cyan-300 drop-shadow-[0_0_10px_#00f5ff]'
                      : isVisited
                      ? 'text-cyan-400/80'
                      : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                >
                  {st.step}
                </span>

                {/* Stage Button Pill */}
                <div
                  className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl border text-[10px] sm:text-xs font-extrabold font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950 border-white shadow-[0_0_20px_rgba(0,245,255,0.7)] scale-105'
                      : isVisited
                      ? 'bg-slate-900/90 text-cyan-300 border-cyan-500/50 hover:border-cyan-400'
                      : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:border-cyan-500/40 hover:text-slate-200'
                  }`}
                >
                  {isVisited && !isActive && <Check className="w-3 h-3 text-cyan-300 stroke-[3]" />}
                  <span>{st.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CONNECTING POINTER STEM (Visually locks selected stage to content area) */}
      {/* ========================================================================= */}
      <div className="relative w-full h-6 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 w-[2px] h-full bg-gradient-to-b from-cyan-400 via-cyan-500/80 to-cyan-400/10 shadow-[0_0_12px_#00f5ff]"
          animate={{
            left: `calc(32px + (100% - 64px) * ${nodePercentage / 100})`,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Arrowhead pointing to content panel */}
          <div className="absolute -bottom-1 -left-[3px] w-2 h-2 rotate-45 border-r-2 border-b-2 border-cyan-400 shadow-[0_0_6px_#00f5ff]" />
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 4. UNIFIED ACTIVE STAGE CONTENT PANEL                                     */}
      {/* ========================================================================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${project.id}-${currentStage.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="p-5 sm:p-7 rounded-2xl border border-cyan-500/30 bg-slate-950/85 backdrop-blur-xl shadow-[0_0_35px_rgba(0,245,255,0.12)] relative"
        >
          {/* Stage Header Tag & Subtitle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-cyan-500/20 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(0,245,255,0.15)]">
                <currentStage.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                  STAGE {currentStage.step} // {currentStage.label}
                </span>
                <h3 className="font-orbitron text-base sm:text-lg font-extrabold text-white tracking-wider">
                  {currentStage.title}
                </h3>
              </div>
            </div>

            {/* Quick Next Stage Trigger */}
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span>STEP {activeStageIndex + 1} OF 6</span>
            </div>
          </div>

          {/* STAGE 01 — PROBLEM */}
          {currentStage.id === 'problem' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                {project.problem ||
                  'Traditional manual methods created severe bottlenecks in processing time, latency, false triggers, and lack of real-time visibility.'}
              </p>

              <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20 text-xs text-rose-200/90 leading-relaxed font-mono">
                <div className="flex items-center gap-2 font-bold text-rose-300 uppercase tracking-wider mb-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>CORE SYSTEM FRICTION</span>
                </div>
                Fragmented tools, high operational latency, manual overhead, and absent real-time automated telemetry loops.
              </div>
            </div>
          )}

          {/* STAGE 02 — IDEA */}
          {currentStage.id === 'idea' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                {project.idea ||
                  'Engineering an automated edge intelligence platform with continuous stream ingestion, algorithmic analysis, and instantaneous verification.'}
              </p>

              <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-xs text-cyan-200/90 leading-relaxed font-mono">
                <div className="flex items-center gap-2 font-bold text-cyan-300 uppercase tracking-wider mb-1.5">
                  <Lightbulb className="w-4 h-4 text-cyan-400" />
                  <span>SOLUTION PARADIGM</span>
                </div>
                {project.solution ||
                  'Coupling responsive interactive client interfaces with real-time event pipelines and automated feedback triggers.'}
              </div>
            </div>
          )}

          {/* STAGE 03 — ARCHITECTURE */}
          {currentStage.id === 'architecture' && (
            <div className="space-y-5">
              <p className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                {project.build ||
                  'Integrated modular architecture built for low-latency event processing and fault-tolerant data routing.'}
              </p>

              {/* Step-by-Step Architecture Pathway */}
              {project.architectureSteps && project.architectureSteps.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                  {project.architectureSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-cyan-500/25 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-cyan-400 mb-1">
                          <span>STEP {step.step}</span>
                          <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-slate-300">
                            {step.tech}
                          </span>
                        </div>
                        <div className="text-xs font-bold font-sans text-white uppercase tracking-tight mb-1">
                          {step.layer}
                        </div>
                        <p className="text-[11px] font-mono text-slate-300 leading-snug">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-cyan-500/25 bg-slate-900/50 text-xs font-mono text-cyan-200">
                  <span className="text-cyan-400 font-bold block mb-1">PIPELINE SUMMARY:</span>
                  {project.build}
                </div>
              )}
            </div>
          )}

          {/* STAGE 04 — TECHNOLOGY */}
          {currentStage.id === 'technology' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                Engineered with high-performance frameworks, real-time protocols, and resilient data storage engines.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                {project.techStack.map((tech, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-cyan-500/40 transition-all flex items-center gap-3"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 border"
                      style={{
                        borderColor: `${tech.color || accentColor}60`,
                        backgroundColor: `${tech.color || accentColor}15`,
                        color: tech.color || accentColor,
                      }}
                    >
                      {tech.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-white tracking-tight truncate">
                        {tech.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 truncate">
                        {tech.role || 'Subsystem Engine'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 05 — FEATURES */}
          {currentStage.id === 'features' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuresList.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-800/90 bg-slate-900/60 hover:border-cyan-500/30 transition-all"
                  >
                    <div className="p-1 rounded bg-cyan-950 border border-cyan-400/40 text-cyan-400 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-mono text-slate-200 leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 06 — IMPACT */}
          {currentStage.id === 'impact' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                {project.impact ||
                  project.result ||
                  'Delivered verified performance gains, eliminating latency and empowering users with a responsive digital experience.'}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-cyan-500/20">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold tracking-wider">
                    STATUS: PRODUCTION PROVEN
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-slate-200 hover:text-white hover:border-cyan-400 transition-all"
                    >
                      <Github className="w-3.5 h-3.5 text-cyan-400" />
                      <span>SOURCE CODE</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-mono font-black uppercase hover:bg-cyan-400 transition-all shadow-[0_0_12px_rgba(0,245,255,0.3)]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>LIVE DEMO</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
