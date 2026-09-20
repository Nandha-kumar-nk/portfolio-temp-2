import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EvolutionStageId, PROJECT_EVOLUTION_DETAILS } from './evolutionTypes';
import { ProjectItem } from '../../../data/projectsData';
import {
  Lightbulb,
  Layout,
  Code2,
  Rocket,
  AlertCircle,
  Compass,
  Target,
  Palette,
  Layers,
  Wrench,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

interface EvolutionStageDetailsProps {
  project: ProjectItem;
  activeStage: EvolutionStageId;
}

export const EvolutionStageDetails: React.FC<EvolutionStageDetailsProps> = ({
  project,
  activeStage,
}) => {
  const stageData =
    PROJECT_EVOLUTION_DETAILS[project.id] ||
    PROJECT_EVOLUTION_DETAILS['speed-taxi'];

  const renderContent = () => {
    switch (activeStage) {
      case 'idea':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-900/40 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1.5">
                <AlertCircle className="w-4 h-4 text-cyan-400" />
                <span>THE PROBLEM</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {stageData.problem}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-900/40 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>INSPIRATION</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {stageData.inspiration}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-900/40 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1.5">
                <Target className="w-4 h-4 text-cyan-400" />
                <span>PROJECT GOAL</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {stageData.goal}
              </p>
            </div>
          </div>
        );

      case 'design':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-900/40 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1.5">
                <Palette className="w-4 h-4 text-cyan-400" />
                <span>DESIGN CONCEPT</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {stageData.designConcept}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-900/40 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1.5">
                <Layout className="w-4 h-4 text-cyan-400" />
                <span>UX APPROACH</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {stageData.uxApproach}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-900/40 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>SYSTEM ARCHITECTURE</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {stageData.architecture}
              </p>
            </div>
          </div>
        );

      case 'build':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-900/40 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1.5">
                <Wrench className="w-4 h-4 text-cyan-400" />
                <span>TECH SELECTION</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {stageData.techChoices}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-900/40 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1.5">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>ENGINEERING CHALLENGES</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {stageData.challenges}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-900/40 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>TECHNICAL SOLUTIONS</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {stageData.solutions}
              </p>
            </div>
          </div>
        );

      case 'impact':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-900/40 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1.5">
                <Rocket className="w-4 h-4 text-cyan-400" />
                <span>DELIVERED RESULTS</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {stageData.results}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-900/40 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1.5">
                <Lightbulb className="w-4 h-4 text-cyan-400" />
                <span>KEY TAKEAWAYS</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {stageData.takeaways}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-900/40 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1.5">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>FUTURE SCOPE</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {stageData.futureScope}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-6 z-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage + project.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
