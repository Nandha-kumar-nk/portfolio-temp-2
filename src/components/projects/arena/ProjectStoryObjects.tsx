import React, { useState } from 'react';
import {
  Search,
  Lightbulb,
  Layers,
  Code2,
  BarChart3,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { ProjectItem } from '../../../data/projectsData';
import { STORY_STAGES_CONFIG, StoryStageConfig, StoryStageType } from './types';

interface ProjectStoryObjectsProps {
  activeProject: ProjectItem;
  className?: string;
}

export const ProjectStoryObjects: React.FC<ProjectStoryObjectsProps> = ({
  activeProject,
  className = '',
}) => {
  const [selectedStage, setSelectedStage] = useState<StoryStageType | null>(null);

  // Render 3D procedural object inside the glowing orb
  const renderObjectIcon = (config: StoryStageConfig, isSelected: boolean) => {
    switch (config.iconName) {
      case 'lens':
        return <Search className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 drop-shadow-[0_0_8px_#00f5ff]" />;
      case 'bulb':
        return <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 drop-shadow-[0_0_8px_#f59e0b]" />;
      case 'system':
        return <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300 drop-shadow-[0_0_8px_#c084fc]" />;
      case 'code':
        return <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300 drop-shadow-[0_0_8px_#10b981]" />;
      case 'bars':
        return <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 drop-shadow-[0_0_8px_#00f5ff]" />;
      default:
        return <Sparkles className="w-5 h-5 text-white" />;
    }
  };

  // Get active story stage detail content from actual project data
  const getStageDetail = (type: StoryStageType) => {
    switch (type) {
      case 'problem':
        return {
          title: 'THE PROBLEM',
          subtitle: 'Understanding the real need',
          content: activeProject.problem,
          badge: 'Identification & Analysis',
        };
      case 'idea':
        return {
          title: 'THE IDEA',
          subtitle: 'A better way to learn & execute',
          content: activeProject.idea,
          badge: 'Conceptual Solution',
        };
      case 'system':
        return {
          title: 'THE SYSTEM',
          subtitle: 'Architecture that scales',
          content: activeProject.solution,
          badge: 'Scalable Engineering',
          extra: activeProject.architectureSteps,
        };
      case 'build':
        return {
          title: 'THE BUILD',
          subtitle: 'Technologies that power it',
          content: activeProject.build,
          badge: 'Production Implementation',
          techStack: activeProject.techStack,
        };
      case 'result':
        return {
          title: 'THE RESULT',
          subtitle: 'A meaningful impact',
          content: activeProject.result,
          badge: 'Verified Impact',
        };
    }
  };

  const activeDetail = selectedStage ? getStageDetail(selectedStage) : null;
  const activeConfig = selectedStage
    ? STORY_STAGES_CONFIG.find((s) => s.type === selectedStage)
    : null;

  return (
    <div
      id="project-story-objects-container"
      className={`relative z-20 w-full flex flex-col items-center select-none ${className}`}
    >
      {/* 5 Floating Rocky Pedestals with Glowing Orbs */}
      <div className="w-full max-w-5xl mx-auto px-4 grid grid-cols-5 gap-2 sm:gap-4 md:gap-6 items-end justify-items-center">
        {STORY_STAGES_CONFIG.map((stage) => {
          const isSelected = selectedStage === stage.type;

          return (
            <div
              key={stage.type}
              id={`story-station-${stage.type}`}
              onClick={() => setSelectedStage(isSelected ? null : stage.type)}
              className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Glowing Orb Floating in Air */}
              <div
                className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isSelected ? 'scale-110' : 'group-hover:scale-105'
                }`}
                style={{
                  background: `radial-gradient(circle at 35% 30%, ${stage.color}25 0%, #081020 70%, #030610 100%)`,
                  border: `2px solid ${isSelected ? stage.color : `${stage.color}80`}`,
                  boxShadow: `0 0 ${isSelected ? '28px' : '15px'} ${stage.glowColor}, inset 0 0 12px ${stage.glowColor}`,
                }}
              >
                {/* Internal 3D Icon */}
                <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  {renderObjectIcon(stage, isSelected)}
                </div>

                {/* Concentric Halo Ring */}
                <div
                  className="absolute -inset-1.5 rounded-full opacity-40 group-hover:opacity-75 transition-opacity pointer-events-none animate-pulse"
                  style={{ border: `1px dashed ${stage.color}` }}
                />
              </div>

              {/* Pedestal Top Step / Rock Base */}
              <div className="relative w-16 sm:w-20 md:w-24 mt-2 sm:mt-3 flex flex-col items-center">
                {/* Floating Rocky Platform Cap */}
                <div className="w-full h-4 sm:h-5 rounded-t-lg bg-gradient-to-b from-[#162238] via-[#0b1322] to-[#040812] border-t border-x border-cyan-500/30 shadow-[0_5px_15px_rgba(0,0,0,0.8)] relative flex items-center justify-center">
                  {/* Subtle Neon Edge Rim */}
                  <div
                    className="w-8 h-[2px] rounded-full transition-colors"
                    style={{ backgroundColor: stage.color }}
                  />
                </div>

                {/* Dark Floating Rock Body */}
                <div className="w-[85%] h-5 sm:h-7 bg-[#050b14] border-x border-b border-slate-800 rounded-b-md shadow-md" />

                {/* Ground Fog / Mist under rock */}
                <div className="w-20 sm:w-28 h-3 -mt-1 rounded-full bg-cyan-500/10 blur-md pointer-events-none" />
              </div>

              {/* Station Number Badge */}
              <div
                className="mt-1.5 px-2 py-0.2 rounded font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider transition-colors"
                style={{
                  backgroundColor: isSelected ? `${stage.color}25` : '#070f1e',
                  color: isSelected ? stage.color : '#94a3b8',
                  border: `1px solid ${isSelected ? stage.color : '#1e293b'}`,
                }}
              >
                {stage.number}
              </div>

              {/* Station Title */}
              <div className="mt-0.5 text-center">
                <div
                  className="text-[9px] sm:text-[11px] md:text-xs font-black uppercase tracking-tight transition-colors truncate max-w-[70px] sm:max-w-none"
                  style={{ color: isSelected ? stage.color : '#f8fafc' }}
                >
                  {stage.title}
                </div>
                <div className="text-[7.5px] sm:text-[9px] text-slate-400 font-sans hidden sm:block truncate max-w-[90px] md:max-w-[120px]">
                  {stage.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Story Insight Panel (Appears when an object is clicked) */}
      {selectedStage && activeDetail && activeConfig && (
        <div
          id="story-detail-insight-card"
          className="mt-4 w-full max-w-xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#081224]/95 border-2 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300 relative text-left"
          style={{
            borderColor: activeConfig.color,
            boxShadow: `0 0 35px ${activeConfig.glowColor}`,
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setSelectedStage(null)}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-2 py-0.5 rounded font-mono font-bold text-[10px]"
              style={{
                backgroundColor: `${activeConfig.color}20`,
                color: activeConfig.color,
                border: `1px solid ${activeConfig.color}`,
              }}
            >
              {activeConfig.number}
            </span>
            <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
              {activeDetail.badge}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight font-sans">
            {activeDetail.title} &mdash;{' '}
            <span style={{ color: activeConfig.color }}>{activeProject.title}</span>
          </h3>
          <p className="text-xs text-slate-400 font-medium mb-3">
            {activeDetail.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans bg-black/40 p-3 rounded-xl border border-slate-800/80">
            {activeDetail.content}
          </p>

          {/* Optional Architecture / Tech Stack Pills */}
          {activeDetail.techStack && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {activeDetail.techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-300"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          )}

          {/* Optional Architecture Steps if present */}
          {activeDetail.extra && (
            <div className="mt-3 space-y-1.5">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Architecture Breakdown:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] font-mono">
                {activeDetail.extra.slice(0, 4).map((step) => (
                  <div
                    key={step.step}
                    className="p-2 rounded bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-2"
                  >
                    <span className="text-cyan-400 font-bold">{step.step}</span>
                    <span className="truncate">{step.tech} &bull; {step.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
