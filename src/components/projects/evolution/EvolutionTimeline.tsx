import React from 'react';
import { motion } from 'framer-motion';
import { EVOLUTION_STAGES, EvolutionStageId } from './evolutionTypes';
import { Lightbulb, Layout, Code2, Rocket } from 'lucide-react';

interface EvolutionTimelineProps {
  activeStage: EvolutionStageId;
  onSelectStage: (stage: EvolutionStageId) => void;
  accentColor?: string;
}

const getStageIcon = (id: EvolutionStageId) => {
  switch (id) {
    case 'idea':
      return Lightbulb;
    case 'design':
      return Layout;
    case 'build':
      return Code2;
    case 'impact':
      return Rocket;
  }
};

export const EvolutionTimeline: React.FC<EvolutionTimelineProps> = ({
  activeStage,
  onSelectStage,
  accentColor = '#00f5ff',
}) => {
  const activeIndex = EVOLUTION_STAGES.findIndex((s) => s.id === activeStage);

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-3 z-20">
      {/* Background Connecting Line */}
      <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[2px] bg-cyan-950/80 border-b border-cyan-900/40 z-0">
        {/* Active Progress Fill Line */}
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-300 shadow-[0_0_12px_rgba(0,245,255,0.8)]"
          initial={false}
          animate={{
            width: `${(activeIndex / (EVOLUTION_STAGES.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Nodes Container */}
      <div className="relative z-10 flex items-center justify-between">
        {EVOLUTION_STAGES.map((stage, idx) => {
          const isActive = stage.id === activeStage;
          const isPassed = idx < activeIndex;
          const Icon = getStageIcon(stage.id);

          return (
            <button
              key={stage.id}
              onClick={() => onSelectStage(stage.id)}
              className="group flex flex-col items-center focus:outline-none cursor-pointer"
            >
              {/* Node Circle */}
              <div className="relative flex items-center justify-center">
                {/* Active Outer Glow Halo */}
                {isActive && (
                  <motion.div
                    layoutId="activeHalo"
                    className="absolute -inset-2 rounded-full border border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,245,255,0.5)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}

                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border transition-all duration-300 backdrop-blur-md ${
                    isActive
                      ? 'bg-cyan-950/90 border-cyan-400 text-cyan-300 shadow-[0_0_18px_rgba(0,245,255,0.6)] scale-110'
                      : isPassed
                      ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-400/80'
                      : 'bg-slate-950/80 border-cyan-900/50 text-slate-500 group-hover:border-cyan-700 group-hover:text-cyan-300'
                  }`}
                  style={{
                    borderColor: isActive ? accentColor : undefined,
                  }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              {/* Node Label */}
              <div className="mt-2 text-center">
                <span
                  className={`block text-[10px] font-mono tracking-wider transition-colors ${
                    isActive
                      ? 'text-cyan-400 font-bold'
                      : 'text-slate-400 group-hover:text-cyan-300'
                  }`}
                >
                  {stage.number} {stage.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
