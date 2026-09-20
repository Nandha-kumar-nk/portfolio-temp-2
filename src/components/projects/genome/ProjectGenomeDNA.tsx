import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Layout, Cpu, Code2, Rocket, Lock, Check, Sparkles } from 'lucide-react';
import { GenomeProject, GenomeStageContent } from './genomeData';

export interface ProjectGenomeDNAProps {
  project: GenomeProject;
}

export const ProjectGenomeDNA: React.FC<ProjectGenomeDNAProps> = ({ project }) => {
  // Active selected stage ID: 'idea' | 'design' | 'technology' | 'build' | 'impact'
  const [activeStageId, setActiveStageId] = useState<
    'idea' | 'design' | 'technology' | 'build' | 'impact'
  >('idea');

  type StageKey = 'idea' | 'design' | 'technology' | 'build' | 'impact';

  // Track unlocked stages for progressive journey exploration
  const [unlockedStages, setUnlockedStages] = useState<Record<StageKey, boolean>>({
    idea: true,
    design: false,
    technology: false,
    build: false,
    impact: false,
  });

  // Reset stage selection when project changes
  useEffect(() => {
    setActiveStageId('idea');
    setUnlockedStages({
      idea: true,
      design: false,
      technology: false,
      build: false,
      impact: false,
    });
  }, [project.id]);

  const stagesList: {
    id: 'idea' | 'design' | 'technology' | 'build' | 'impact';
    number: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'idea', number: '01', label: 'IDEA', icon: Lightbulb },
    { id: 'design', number: '02', label: 'DESIGN', icon: Layout },
    { id: 'technology', number: '03', label: 'TECHNOLOGY', icon: Cpu },
    { id: 'build', number: '04', label: 'BUILD', icon: Code2 },
    { id: 'impact', number: '05', label: 'IMPACT', icon: Rocket },
  ];

  // Handle stage selection with progressive unlocking
  const handleSelectStage = (
    stageId: 'idea' | 'design' | 'technology' | 'build' | 'impact'
  ) => {
    setActiveStageId(stageId);

    // Progressive unlocking sequence up to selected stage
    setUnlockedStages((prev) => {
      const nextUnlocked = { ...prev, [stageId]: true };
      // Unlock all preceding stages as well
      const stageOrder: ('idea' | 'design' | 'technology' | 'build' | 'impact')[] = [
        'idea',
        'design',
        'technology',
        'build',
        'impact',
      ];
      const targetIndex = stageOrder.indexOf(stageId);
      for (let i = 0; i <= targetIndex; i++) {
        nextUnlocked[stageOrder[i]] = true;
      }
      return nextUnlocked;
    });
  };

  const currentStageContent: GenomeStageContent =
    project.dnaStages[activeStageId];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-6 select-none px-2 sm:px-4">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f5ff]" />
        <span className="text-xs sm:text-sm font-mono font-extrabold tracking-[0.25em] text-cyan-300 uppercase">
          PROJECT GENOME DEVELOPMENT JOURNEY
        </span>
      </div>

      {/* 1. FUTURISTIC DOUBLE-HELIX ENERGY DNA PATH */}
      <div className="relative w-full py-4 flex items-center justify-between max-w-4xl">
        {/* Background Energy Helix Waves */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-12 pointer-events-none opacity-60">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="helixGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Upper Sine Energy Strand */}
            <path
              d="M 0 24 Q 80 0, 160 24 T 320 24 T 480 24 T 640 24 T 800 24"
              fill="none"
              stroke="url(#helixGrad)"
              strokeWidth="1.8"
              className="drop-shadow-[0_0_8px_#00f5ff]"
            />

            {/* Lower Inverted Sine Energy Strand */}
            <path
              d="M 0 24 Q 80 48, 160 24 T 320 24 T 480 24 T 640 24 T 800 24"
              fill="none"
              stroke="url(#helixGrad)"
              strokeWidth="1.8"
              strokeDasharray="4 4"
              className="opacity-70 drop-shadow-[0_0_8px_#38bdf8]"
            />
          </svg>
        </div>

        {/* 5 STAGE NODES */}
        {stagesList.map((stg) => {
          const isActive = activeStageId === stg.id;
          const isUnlocked = unlockedStages[stg.id];
          const IconComp = stg.icon;

          return (
            <button
              key={stg.id}
              onClick={() => handleSelectStage(stg.id)}
              className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
            >
              {/* Circular Stage Node Frame */}
              <div
                className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                  isActive
                    ? 'bg-cyan-500/30 border-cyan-300 shadow-[0_0_20px_#00f5ff] scale-110'
                    : isUnlocked
                    ? 'bg-[#020e24]/90 border-cyan-500/50 hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(0,245,255,0.3)]'
                    : 'bg-[#010612]/90 border-slate-800 text-slate-600'
                }`}
              >
                {/* Active Outer Pulsing Ring */}
                {isActive && (
                  <span className="absolute -inset-1 rounded-full border border-cyan-400 animate-ping opacity-60" />
                )}

                {/* Node Icon */}
                <IconComp
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : isUnlocked
                      ? 'text-cyan-300 group-hover:text-cyan-200'
                      : 'text-slate-600'
                  }`}
                />

                {/* Status Indicator */}
                {!isUnlocked && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                    <Lock className="w-2.5 h-2.5 text-slate-500" />
                  </div>
                )}
              </div>

              {/* Stage Number & Label */}
              <div className="mt-2 text-center">
                <p
                  className={`text-[9px] sm:text-[10px] font-mono tracking-widest font-bold uppercase transition-colors ${
                    isActive
                      ? 'text-cyan-300'
                      : isUnlocked
                      ? 'text-slate-300'
                      : 'text-slate-600'
                  }`}
                >
                  {stg.number} &bull; {stg.label}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. ACTIVE STAGE CONTENT DETAILS PANEL */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`dna-stage-${project.id}-${activeStageId}`}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-3xl mt-4 p-4 sm:p-6 rounded-xl bg-[#020d21]/90 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,245,255,0.2)] backdrop-blur-md relative overflow-hidden"
        >
          {/* Subtle Ambient Background Gradient Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

          {/* Stage Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-cyan-500/30 pb-3 mb-4 gap-2">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-bold">
                STAGE {currentStageContent.stageNumber}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold font-mono tracking-wider text-white drop-shadow-[0_0_10px_#00f5ff]">
                {currentStageContent.title}
              </h3>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider">
              {currentStageContent.subtitle}
            </span>
          </div>

          {/* Goal Statement */}
          <div className="mb-4 p-3 rounded-lg bg-[#010918]/80 border border-cyan-500/20">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              <span className="text-cyan-400 font-bold font-mono uppercase mr-2">
                CORE FOCUS:
              </span>
              {currentStageContent.problemOrGoal}
            </p>
          </div>

          {/* Key Breakdown Points Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentStageContent.keyPoints.map((pt, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#010815]/90 border border-cyan-500/20 hover:border-cyan-400/50 transition-colors"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
                    {pt.label}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-normal font-normal">
                  {pt.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProjectGenomeDNA;
