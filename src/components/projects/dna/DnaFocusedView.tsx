import React from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { DnaNodeType, DNA_NODES, DnaNodeConfig } from '../../../types/projectDna';
import {
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Layers,
  Lightbulb,
  AlertCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Database,
  Server,
  Monitor,
  Mail,
  Zap,
} from 'lucide-react';

interface DnaFocusedViewProps {
  project: ProjectItem;
  activeNodeType: DnaNodeType;
  onClose: () => void;
  onSelectNode: (type: DnaNodeType) => void;
}

export const DnaFocusedView: React.FC<DnaFocusedViewProps> = ({
  project,
  activeNodeType,
  onClose,
  onSelectNode,
}) => {
  const currentConfig = React.useMemo(() => {
    return DNA_NODES.find((n) => n.type === activeNodeType) || DNA_NODES[0];
  }, [activeNodeType]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        const currentIndex = DNA_NODES.findIndex((n) => n.type === activeNodeType);
        const nextIndex = (currentIndex + 1) % DNA_NODES.length;
        onSelectNode(DNA_NODES[nextIndex].type);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = DNA_NODES.findIndex((n) => n.type === activeNodeType);
        const prevIndex = (currentIndex - 1 + DNA_NODES.length) % DNA_NODES.length;
        onSelectNode(DNA_NODES[prevIndex].type);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeNodeType, onClose, onSelectNode]);

  return (
    <div
      id="dna-focused-layer"
      className="absolute inset-0 z-30 flex items-center justify-center p-3 sm:p-6 md:p-8 select-none pointer-events-auto animate-fadeIn"
    >
      {/* Background backdrop with subtle blur to preserve context */}
      <div
        className="absolute inset-0 bg-[#02040b]/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Focus Card Container */}
      <div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#090e1c] border border-cyan-500/40 shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col z-10 custom-scrollbar"
        style={{
          boxShadow: `0 0 50px -10px ${currentConfig.accentGlow}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar with DNA Pipeline Stepper */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 sm:px-6 py-3.5 bg-[#0d1527] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              id="btn-close-dna-focus"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono font-medium transition-colors border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO DNA [ESC]</span>
            </button>

            <span className="hidden sm:inline-block text-xs font-mono text-slate-500">
              |
            </span>

            <span className="text-xs font-mono text-cyan-400 font-semibold truncate">
              {project.title} • {project.tagline}
            </span>
          </div>

          {/* Quick Stepper tabs (01..06) */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5">
            {DNA_NODES.map((node) => {
              const isCurrent = node.type === activeNodeType;
              return (
                <button
                  key={node.type}
                  onClick={() => onSelectNode(node.type)}
                  className={`px-2 py-1 rounded-md text-[10px] font-mono font-medium transition-all ${
                    isCurrent
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_8px_rgba(0,245,255,0.3)]'
                      : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                  title={`${node.number} ${node.label}`}
                >
                  <span className="opacity-70">{node.number}</span>{' '}
                  <span className="hidden md:inline">{node.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Node Detail Content Body */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Header of focused node */}
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-extrabold text-base shrink-0 shadow-lg border"
              style={{
                backgroundColor: `${currentConfig.color}20`,
                borderColor: currentConfig.color,
                color: currentConfig.color,
              }}
            >
              {currentConfig.number}
            </div>

            <div className="space-y-0.5">
              <div className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">
                STAGE {currentConfig.number} OF 06 • {currentConfig.subtitle}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {currentConfig.label}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans">
                {currentConfig.shortSummary}
              </p>
            </div>
          </div>

          {/* Specific View Switcher based on node type */}
          {activeNodeType === 'problem' && (
            <ProblemDetailView project={project} config={currentConfig} />
          )}

          {activeNodeType === 'idea' && (
            <IdeaDetailView project={project} config={currentConfig} />
          )}

          {activeNodeType === 'architecture' && (
            <ArchitectureDetailView project={project} config={currentConfig} />
          )}

          {activeNodeType === 'technology' && (
            <TechnologyDetailView project={project} config={currentConfig} />
          )}

          {activeNodeType === 'features' && (
            <FeaturesDetailView project={project} config={currentConfig} />
          )}

          {activeNodeType === 'impact' && (
            <ImpactDetailView project={project} config={currentConfig} />
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#0a101f] border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">💡 Navigation tip:</span>
            <span>Use Left / Right arrow keys to step through DNA stages</span>
          </div>

          <button
            onClick={() => {
              const currentIndex = DNA_NODES.findIndex((n) => n.type === activeNodeType);
              const nextIndex = (currentIndex + 1) % DNA_NODES.length;
              onSelectNode(DNA_NODES[nextIndex].type);
            }}
            className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-medium"
          >
            <span>Next Stage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 01. PROBLEM VIEW                                                          */
/* -------------------------------------------------------------------------- */
const ProblemDetailView: React.FC<{ project: ProjectItem; config: DnaNodeConfig }> = ({
  project,
}) => (
  <div className="space-y-4">
    <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-rose-200">The Core Friction</h4>
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          {project.problem}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
      <div className="p-3.5 rounded-xl bg-[#080d18] border border-slate-800 space-y-1.5">
        <div className="text-[11px] font-mono text-rose-400 font-semibold uppercase">
          Observed Usability Gaps
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          Students frequently miss critical assignment deadlines because notifications are
          buried, and course structures require excessive clicks to locate active video modules.
        </p>
      </div>

      <div className="p-3.5 rounded-xl bg-[#080d18] border border-slate-800 space-y-1.5">
        <div className="text-[11px] font-mono text-amber-400 font-semibold uppercase">
          Architectural Fragility
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          Legacy systems lack real-time feedback loops between professors and enrolled students,
          causing delayed submission status and fragmented support threads.
        </p>
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 02. IDEA VIEW                                                             */
/* -------------------------------------------------------------------------- */
const IdeaDetailView: React.FC<{ project: ProjectItem; config: DnaNodeConfig }> = ({
  project,
}) => (
  <div className="space-y-4">
    <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/30 flex items-start gap-3">
      <Lightbulb className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-sky-200">The Solution Hypothesis</h4>
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          {project.idea}
        </p>
      </div>
    </div>

    <div className="p-4 rounded-xl bg-[#080d18] border border-slate-800 space-y-2">
      <div className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">
        Engineered Approach
      </div>
      <p className="text-xs text-slate-300 leading-relaxed font-sans">
        {project.solution}
      </p>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 03. ARCHITECTURE VIEW                                                     */
/* -------------------------------------------------------------------------- */
const ArchitectureDetailView: React.FC<{ project: ProjectItem; config: DnaNodeConfig }> = ({
  project,
}) => {
  const steps = project.architectureSteps || [];

  return (
    <div className="space-y-4">
      <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-semibold text-cyan-200 uppercase">
            Full-Stack Component Pipeline
          </span>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
          5-Stage Flow
        </span>
      </div>

      {/* Visual Pipeline Stepper */}
      <div className="relative space-y-2.5">
        {steps.map((item, idx) => (
          <div
            key={item.step}
            className="relative flex items-start gap-3 p-3 rounded-xl bg-[#070c18] border border-slate-800/90 hover:border-cyan-500/40 transition-colors"
          >
            {/* Step Icon Beacon */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono font-bold text-xs"
              style={{
                backgroundColor: `${item.color || '#00f5ff'}20`,
                color: item.color || '#00f5ff',
                borderColor: `${item.color || '#00f5ff'}40`,
                borderWidth: 1,
              }}
            >
              {idx === 0 ? <Monitor className="w-4 h-4" /> : null}
              {idx === 1 ? <Zap className="w-4 h-4" /> : null}
              {idx === 2 ? <Server className="w-4 h-4" /> : null}
              {idx === 3 ? <Mail className="w-4 h-4" /> : null}
              {idx === 4 ? <Database className="w-4 h-4" /> : null}
            </div>

            {/* Description */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-1 mb-0.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{item.layer}</span>
                  <span className="text-[10px] font-mono text-slate-400 font-normal">
                    ({item.tech})
                  </span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-medium">
                  {item.role}
                </span>
              </div>
              <p className="text-[11.5px] text-slate-300 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 04. TECHNOLOGY VIEW                                                       */
/* -------------------------------------------------------------------------- */
const TechnologyDetailView: React.FC<{ project: ProjectItem; config: DnaNodeConfig }> = ({
  project,
}) => (
  <div className="space-y-4">
    <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 flex items-center gap-2">
      <Cpu className="w-4 h-4 text-indigo-400" />
      <span className="text-xs font-mono font-semibold text-indigo-200 uppercase">
        Engineered Production Technologies
      </span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
      {project.techStack.map((tech) => (
        <div
          key={tech.name}
          className="p-3 rounded-xl bg-[#080d1a] border border-slate-800 hover:border-slate-700 flex flex-col justify-between gap-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">{tech.name}</span>
            <span
              className="w-2 h-2 rounded-full shadow-[0_0_6px]"
              style={{
                backgroundColor: tech.color || '#00f5ff',
                boxShadow: `0 0 8px ${tech.color || '#00f5ff'}`,
              }}
            />
          </div>

          <div className="text-[10px] font-mono text-slate-400">
            {tech.name === 'MongoDB' && 'NoSQL document persistence'}
            {tech.name === 'Express' && 'Routing & API endpoints'}
            {tech.name === 'React' && 'Component SPA & reactive UI'}
            {tech.name === 'Node.js' && 'V8 asynchronous runtime'}
            {tech.name === 'WebSockets' && 'Socket.IO bidirectional event sync'}
            {tech.name === 'NodeMailer' && 'Automated background reminder emails'}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 05. FEATURES VIEW                                                         */
/* -------------------------------------------------------------------------- */
const FeaturesDetailView: React.FC<{ project: ProjectItem; config: DnaNodeConfig }> = ({
  project,
}) => (
  <div className="space-y-4">
    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-2">
      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      <span className="text-xs font-mono font-semibold text-emerald-200 uppercase">
        Key Production Features
      </span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {project.features.map((feature, idx) => (
        <div
          key={feature}
          className="p-3 rounded-xl bg-[#070c18] border border-slate-800/90 flex items-start gap-2.5 transition-all hover:border-emerald-500/40"
        >
          <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-xs mt-0.5">
            ✓
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-slate-200">
              {feature}
            </span>
            <div className="text-[10px] font-mono text-slate-500">
              Module 0{idx + 1} • Verified Active
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 06. IMPACT VIEW                                                           */
/* -------------------------------------------------------------------------- */
const ImpactDetailView: React.FC<{ project: ProjectItem; config: DnaNodeConfig }> = ({
  project,
}) => (
  <div className="space-y-4">
    <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-start gap-3">
      <TrendingUp className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-purple-200">
          Measurable Real-World Outcome
        </h4>
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          {project.impact || project.result}
        </p>
      </div>
    </div>

    <div className="p-4 rounded-xl bg-[#080d18] border border-slate-800 space-y-2">
      <div className="text-[11px] font-mono text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        Engineering Takeaway
      </div>
      <p className="text-xs text-slate-300 leading-relaxed font-sans">
        By re-architecting the monolithic experience into an event-driven MERN system with
        real-time WebSocket updates and proactive NodeMailer cron notifications, student
        engagement increased while assignment submission friction was completely removed.
      </p>
    </div>
  </div>
);
