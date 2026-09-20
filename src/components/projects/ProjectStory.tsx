import React, { useState } from 'react';
import {
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { ProjectItem } from '../../data/projectsData';

interface ProjectStoryProps {
  project: ProjectItem;
  isMobile?: boolean;
}

interface StepPipeline {
  label: string;
  role: string;
  desc: string;
}

export const ProjectStory: React.FC<ProjectStoryProps> = ({ project, isMobile = false }) => {
  // Desktop active tab
  const [activeTab, setActiveTab] = useState<string>('problem');
  // Mobile accordion open states (multiple can be open or single toggle)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    problem: true,
    idea: false,
    architecture: false,
    technology: false,
    features: false,
    impact: false,
  });

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Pipeline derivation per project
  const pipeline: StepPipeline[] = React.useMemo(() => {
    if (project.id === 'swayam-2') {
      return [
        { label: 'Client App', role: 'React 19 & Tailwind', desc: 'Interactive responsive user interface with optimistic state updates' },
        { label: 'Auth Gateway', role: 'JWT & Bcrypt', desc: 'Secure stateless authorization protecting educator routes' },
        { label: 'Core Server', role: 'Express & Node.js', desc: 'RESTful API routing with rate-limiting and validation' },
        { label: 'Realtime Bus', role: 'WebSocket Socket.IO', desc: 'Sub-50ms live chat rooms and event-driven notifications' },
        { label: 'Database', role: 'MongoDB Atlas', desc: 'Clustered document storage with schema indexing' },
      ];
    }
    if (project.id === 'wildlife-ai') {
      return [
        { label: 'Thermal Sensor', role: 'Edge IoT Camera', desc: 'Captures continuous infrared boundary activity' },
        { label: 'Inference Engine', role: 'YOLOv8 & TensorFlow', desc: 'Real-time multi-species bounding box detection' },
        { label: 'Decision Logic', role: 'Python Server', desc: 'Trajectory calculation and animal corridor classification' },
        { label: 'Alert Dispatch', role: 'Twilio SMS & Web', desc: 'Instant ranger alerts and localized sonic deterrents' },
        { label: 'Map Dashboard', role: 'React & Leaflet', desc: 'Live geo-spatial ranger monitoring command center' },
      ];
    }
    if (project.id === 'speed-taxi') {
      return [
        { label: 'Passenger UI', role: 'React SPA', desc: 'One-tap ride requests and interactive fare estimation' },
        { label: 'Geocoding', role: 'OpenStreetMap API', desc: 'Accurate location lookup and routing waypoint resolution' },
        { label: 'Dispatch Engine', role: 'Node.js Cluster', desc: 'Driver nearest-neighbor matchmaking logic' },
        { label: 'Tracking Stream', role: 'Socket.IO', desc: 'Live cab telemetry updating at 1-second intervals' },
        { label: 'Persistence', role: 'PostgreSQL & Redis', desc: 'Trip ledgers and cached geospatial proximity indexes' },
      ];
    }
    if (project.id === 'resume-forge') {
      return [
        { label: 'Markdown Editor', role: 'Monaco & React', desc: 'Real-time syntax highlighted resume builder' },
        { label: 'ATS Parser', role: 'Regex & NLP', desc: 'Keyword density and parsing compatibility analysis' },
        { label: 'AI Coach', role: 'Gemini 2.5 Flash', desc: 'Dynamic impact verb and bullet point enhancement' },
        { label: 'PDF Renderer', role: 'Puppeteer / Canvas', desc: 'Pixel-perfect vector export matching employer guidelines' },
        { label: 'Cloud Store', role: 'Firebase Cloud', desc: 'Secure versioned document saves and shareable links' },
      ];
    }
    // Default NK MERN CLI
    return [
      { label: 'Terminal Input', role: 'Commander.js', desc: 'Parses interactive CLI prompts and project flags' },
      { label: 'Template Engine', role: 'EJS & AST Parser', desc: 'Custom code generation with customized configs' },
      { label: 'Package Builder', role: 'NPM & Git API', desc: 'Automates git init, dependencies, and lint configs' },
      { label: 'File Scaffold', role: 'FS-Extra Async', desc: 'Writes production-ready clean modular folder structures' },
      { label: 'Dockerization', role: 'Dockerfile Generator', desc: 'Outputs multi-stage container files ready for Cloud Run' },
    ];
  }, [project.id]);

  const featureList = project.features || [
    'Secure user authentication and token refresh',
    'High-throughput state management',
    'Real-time bi-directional messaging pipelines',
    'Micro-interactions with accessible keyboard navigability',
    'Responsive viewport adaptation for mobile and desktop',
  ];

  const tabDefs = [
    { id: 'problem', number: '01', label: 'PROBLEM', icon: AlertTriangle },
    { id: 'idea', number: '02', label: 'IDEA', icon: Lightbulb },
    { id: 'architecture', number: '03', label: 'ARCHITECTURE', icon: Cpu },
    { id: 'technology', number: '04', label: 'TECHNOLOGY', icon: Layers },
    { id: 'features', number: '05', label: 'FEATURES', icon: CheckCircle2 },
    { id: 'impact', number: '06', label: 'IMPACT', icon: TrendingUp },
  ];

  return (
    <div id="project-story-wrapper" className="w-full select-none">
      {/* ========================================================================= */}
      {/* DESKTOP / TABLET: CLEAN RESPONSIVE TABS (NO HORIZONTAL OVERFLOW)         */}
      {/* ========================================================================= */}
      <div className="hidden md:block w-full">
        {/* Responsive Grid of Tabs that naturally fits and never overflows */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 mb-6 w-full max-w-4xl mx-auto">
          {tabDefs.map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[44px] px-3 py-2 rounded-xl border flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer text-xs font-mono font-bold tracking-wider ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_14px_rgba(0,245,255,0.3)]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className={isSelected ? 'text-cyan-300' : 'text-slate-500'}>
                  {tab.number}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="w-full">
          {/* 01 PROBLEM */}
          {activeTab === 'problem' && (
            <div className="rounded-xl border border-red-500/30 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-red-500/20">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-red-500/15 text-red-400">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase">
                    01 // THE PROBLEM
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  PAIN POINTS & FRICTION
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">{project.problem}</p>
            </div>
          )}

          {/* 02 IDEA */}
          {activeTab === 'idea' && (
            <div className="rounded-xl border border-amber-500/30 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-amber-500/20">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-amber-500/15 text-amber-400">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
                    02 // THE IDEA
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  SOLUTION THESIS
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">{project.idea}</p>
            </div>
          )}

          {/* 03 ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-cyan-500/20">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-cyan-500/15 text-cyan-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                    03 // ARCHITECTURE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  SYSTEM PIPELINE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {pipeline.map((step, idx) => (
                  <div
                    key={idx}
                    className="relative p-3 rounded-lg border border-slate-800 bg-slate-900/60 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-mono font-bold text-cyan-400">
                          STEP 0{idx + 1}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 uppercase truncate">
                          {step.role}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white tracking-wide">{step.label}</div>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">{step.desc}</p>
                    {idx < pipeline.length - 1 && (
                      <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-cyan-400/70">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 04 TECHNOLOGY */}
          {activeTab === 'technology' && (
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-cyan-500/15 text-cyan-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                    04 // TECHNOLOGY
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  CORE TECH STACK
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {project.techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: tech.color || '#00f5ff' }}
                    />
                    <span className="text-xs font-mono text-slate-200">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
              {project.build && (
                <p className="text-xs font-mono text-center text-slate-400 mt-3">
                  Implementation: <span className="text-cyan-300">{project.build}</span>
                </p>
              )}
            </div>
          )}

          {/* 05 FEATURES */}
          {activeTab === 'features' && (
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-emerald-500/15 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                    05 // FEATURES
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  ENGINEERED MODULES
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {featureList.slice(0, 6).map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-slate-800/80 bg-slate-900/50 flex items-start gap-2"
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-2 h-2" />
                    </div>
                    <span className="text-xs text-slate-200 leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 06 IMPACT */}
          {activeTab === 'impact' && (
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-cyan-500/20">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-cyan-500/15 text-cyan-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                    06 // IMPACT
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  REAL-WORLD OUTCOME
                </span>
              </div>

              <div className="p-4 rounded-lg border border-cyan-500/30 bg-cyan-950/20 text-center">
                <p className="text-sm font-sans font-semibold text-cyan-200 leading-relaxed">
                  "{project.impact || project.result}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE: VERTICAL ACCORDION (ZERO HORIZONTAL SCROLLBAR, EASY TOUCH)       */}
      {/* ========================================================================= */}
      <div className="md:hidden w-full space-y-2">
        {/* 01 PROBLEM */}
        <div className="rounded-xl border border-red-500/25 bg-slate-950/70 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('problem')}
            aria-expanded={expandedSections.problem}
            className="w-full flex items-center justify-between p-3.5 text-left min-h-[48px] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-red-500/15 text-red-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-bold text-red-400 tracking-wider">
                01 // THE PROBLEM
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                expandedSections.problem ? 'rotate-180 text-red-400' : ''
              }`}
            />
          </button>
          {expandedSections.problem && (
            <div className="px-3.5 pb-3.5 pt-1 border-t border-red-500/15">
              <p className="text-xs text-slate-200 leading-relaxed">{project.problem}</p>
            </div>
          )}
        </div>

        {/* 02 IDEA */}
        <div className="rounded-xl border border-amber-500/25 bg-slate-950/70 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('idea')}
            aria-expanded={expandedSections.idea}
            className="w-full flex items-center justify-between p-3.5 text-left min-h-[48px] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-amber-500/15 text-amber-400">
                <Lightbulb className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
                02 // THE IDEA
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                expandedSections.idea ? 'rotate-180 text-amber-400' : ''
              }`}
            />
          </button>
          {expandedSections.idea && (
            <div className="px-3.5 pb-3.5 pt-1 border-t border-amber-500/15">
              <p className="text-xs text-slate-200 leading-relaxed">{project.idea}</p>
            </div>
          )}
        </div>

        {/* 03 ARCHITECTURE */}
        <div className="rounded-xl border border-cyan-500/25 bg-slate-950/70 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('architecture')}
            aria-expanded={expandedSections.architecture}
            className="w-full flex items-center justify-between p-3.5 text-left min-h-[48px] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-cyan-500/15 text-cyan-400">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                03 // ARCHITECTURE
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                expandedSections.architecture ? 'rotate-180 text-cyan-400' : ''
              }`}
            />
          </button>
          {expandedSections.architecture && (
            <div className="px-3.5 pb-3.5 pt-1 border-t border-cyan-500/15 space-y-2">
              {pipeline.map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 font-bold mb-0.5">
                    <span>STEP 0{idx + 1}</span>
                    <span className="text-slate-400">{step.role}</span>
                  </div>
                  <div className="text-xs font-semibold text-white">{step.label}</div>
                  <p className="text-[11px] text-slate-300 mt-1">{step.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 04 TECHNOLOGY */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('technology')}
            aria-expanded={expandedSections.technology}
            className="w-full flex items-center justify-between p-3.5 text-left min-h-[48px] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-cyan-500/15 text-cyan-400">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-300 tracking-wider">
                04 // TECHNOLOGY
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                expandedSections.technology ? 'rotate-180 text-cyan-400' : ''
              }`}
            />
          </button>
          {expandedSections.technology && (
            <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-800">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
              {project.build && (
                <p className="text-[11px] font-mono text-slate-400">
                  Build: <span className="text-cyan-300">{project.build}</span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* 05 FEATURES */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('features')}
            aria-expanded={expandedSections.features}
            className="w-full flex items-center justify-between p-3.5 text-left min-h-[48px] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-emerald-500/15 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-300 tracking-wider">
                05 // FEATURES
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                expandedSections.features ? 'rotate-180 text-emerald-400' : ''
              }`}
            />
          </button>
          {expandedSections.features && (
            <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-800 space-y-1.5">
              {featureList.slice(0, 5).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 06 IMPACT */}
        <div className="rounded-xl border border-cyan-500/25 bg-slate-950/70 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('impact')}
            aria-expanded={expandedSections.impact}
            className="w-full flex items-center justify-between p-3.5 text-left min-h-[48px] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-cyan-500/15 text-cyan-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                06 // IMPACT
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                expandedSections.impact ? 'rotate-180 text-cyan-400' : ''
              }`}
            />
          </button>
          {expandedSections.impact && (
            <div className="px-3.5 pb-3.5 pt-1 border-t border-cyan-500/15">
              <p className="text-xs font-semibold text-cyan-200 leading-relaxed">
                "{project.impact || project.result}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
