import React from 'react';
import { motion } from 'framer-motion';
import { EvolutionStageId } from './evolutionTypes';
import { Lightbulb, Layout, Code2, Globe, Sparkles } from 'lucide-react';
import { ProjectItem } from '../../../data/projectsData';

interface LeftVisualEvolutionProps {
  project: ProjectItem;
  activeStage: EvolutionStageId;
  onSelectStage: (stage: EvolutionStageId) => void;
}

export const LeftVisualEvolution: React.FC<LeftVisualEvolutionProps> = ({
  project,
  activeStage,
  onSelectStage,
}) => {
  const stageItems = [
    {
      id: 'idea' as EvolutionStageId,
      step: '01',
      title: 'IDEA',
      icon: Lightbulb,
      previewText: project.problem.slice(0, 45) + '...',
      renderGraphic: () => (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-2 bg-gradient-to-br from-cyan-950/40 to-slate-950/80 rounded">
          <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center animate-pulse">
            <Lightbulb className="w-3.5 h-3.5 text-cyan-300" />
          </div>
          <div className="mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-800" />
          </div>
        </div>
      ),
    },
    {
      id: 'design' as EvolutionStageId,
      step: '02',
      title: 'DESIGN',
      icon: Layout,
      previewText: 'UI/UX Wireframe & Flow Architecture',
      renderGraphic: () => (
        <div className="w-full h-full p-2 bg-slate-950/80 rounded flex flex-col gap-1 border border-cyan-900/40">
          <div className="w-full h-2 bg-cyan-950/60 rounded border border-cyan-800/40 flex items-center justify-between px-1">
            <div className="w-2 h-1 bg-cyan-400/60 rounded-full" />
            <div className="w-4 h-1 bg-cyan-600/40 rounded-full" />
          </div>
          <div className="flex gap-1 flex-1">
            <div className="w-1/3 h-full bg-cyan-950/30 rounded border border-cyan-900/30" />
            <div className="w-2/3 h-full bg-cyan-900/20 rounded border border-cyan-800/30 p-1 flex flex-col gap-1">
              <div className="w-3/4 h-1 bg-cyan-400/40 rounded" />
              <div className="w-1/2 h-1 bg-cyan-600/30 rounded" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'build' as EvolutionStageId,
      step: '03',
      title: 'BUILD',
      icon: Code2,
      previewText: `${project.techStack.slice(0, 3).map((t) => t.name).join(' + ')}`,
      renderGraphic: () => (
        <div className="w-full h-full p-2 bg-black/90 rounded border border-cyan-900/60 font-mono text-[9px] text-cyan-400/80 leading-tight flex flex-col justify-center overflow-hidden">
          <div className="text-cyan-300/90">&gt; const app = express();</div>
          <div className="text-cyan-500/70 pl-2">app.use(routes);</div>
          <div className="text-sky-400/80">&gt; npm run build OK</div>
        </div>
      ),
    },
    {
      id: 'impact' as EvolutionStageId,
      step: '04',
      title: 'REALITY',
      icon: Globe,
      previewText: project.result.slice(0, 45) + '...',
      renderGraphic: () => (
        <div className="relative w-full h-full rounded overflow-hidden border border-cyan-400/40 group-hover:border-cyan-300">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/80 via-transparent to-transparent flex items-end p-1">
            <span className="text-[8px] font-mono text-cyan-300 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-cyan-400" /> LIVE SYSTEM
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center gap-2 pb-1 border-b border-cyan-900/50">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-[11px] font-mono tracking-widest text-cyan-300 uppercase">
          EVOLUTION PHASES
        </span>
      </div>

      <div className="flex flex-col gap-2 relative">
        {/* Connecting Vertical Energy Line */}
        <div className="absolute top-4 bottom-4 left-5 w-[2px] bg-gradient-to-b from-cyan-500/40 via-sky-400/30 to-cyan-800/20 z-0" />

        {stageItems.map((item) => {
          const isActive = activeStage === item.id;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              onClick={() => onSelectStage(item.id)}
              whileHover={{ x: 2 }}
              className={`relative z-10 flex items-center gap-2.5 p-2 rounded-lg border text-left transition-all duration-300 backdrop-blur-md cursor-pointer ${
                isActive
                  ? 'bg-cyan-950/80 border-cyan-400/80 shadow-[0_0_15px_rgba(0,245,255,0.25)]'
                  : 'bg-slate-950/60 border-cyan-900/40 hover:border-cyan-700/60 hover:bg-slate-900/60'
              }`}
            >
              {/* Step Node */}
              <div
                className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                  isActive
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,245,255,0.4)]'
                    : 'bg-slate-900 border-cyan-900/60 text-slate-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Graphic Preview */}
              <div className="w-16 h-10 shrink-0">
                {item.renderGraphic()}
              </div>

              {/* Info Text */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-cyan-400/80">
                    {item.step}
                  </span>
                  <span
                    className={`text-xs font-mono font-semibold tracking-wider ${
                      isActive ? 'text-cyan-300' : 'text-slate-300'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                  {item.previewText}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
