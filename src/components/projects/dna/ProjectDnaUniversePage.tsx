import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Lightbulb,
  Palette,
  Cpu,
  Hammer,
  TrendingUp,
  CheckCircle2,
  X,
  Zap,
} from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../../../data/projectsData';
import { PROJECT_ASSETS } from '../cube/projectAssets';
import { getTechIconConfig } from '../TechIconSystem';

interface ProjectDnaUniversePageProps {
  initialProjectId?: string;
  isActive?: boolean;
}

// ============================================================================
// 5 DNA STAGES CONFIGURATION
// ============================================================================
export interface DnaStageItem {
  id: 'idea' | 'design' | 'technology' | 'build' | 'impact';
  number: string;
  title: string;
  heading: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DNA_STAGES_CONFIG: DnaStageItem[] = [
  { id: 'idea', number: '01', title: 'IDEA', heading: 'THE IDEA', icon: Lightbulb },
  { id: 'design', number: '02', title: 'DESIGN', heading: 'THE DESIGN', icon: Palette },
  { id: 'technology', number: '03', title: 'TECHNOLOGY', heading: 'THE TECHNOLOGY', icon: Cpu },
  { id: 'build', number: '04', title: 'BUILD', heading: 'THE BUILD', icon: Hammer },
  { id: 'impact', number: '05', title: 'IMPACT', heading: 'THE IMPACT', icon: TrendingUp },
];

// Project-specific custom tech stack lists requested by prompt
const PROJECT_TECH_MAP: Record<string, string[]> = {
  'speed-taxi': ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'Tailwind CSS'],
  'swayam-2': ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'REST API'],
  'resume-forge': ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'MongoDB', 'AI'],
  'wildlife-ai': ['Python', 'OpenCV', 'YOLO', 'TensorFlow', 'Arduino', 'IoT'],
  'ai-wildlife': ['Python', 'OpenCV', 'YOLO', 'TensorFlow', 'Arduino', 'IoT'],
  'nk-mern-cli': ['Node.js', 'Express', 'React', 'MongoDB', 'JavaScript', 'CLI'],
};

export const ProjectDnaUniversePage: React.FC<ProjectDnaUniversePageProps> = ({
  initialProjectId = 'speed-taxi',
  isActive = true,
}) => {
  const projects: ProjectItem[] = PROJECTS_DATA;
  const initialIdx = projects.findIndex((p) => p.id === initialProjectId);
  const startIdx = initialIdx >= 0 ? initialIdx : 0; // Default to Speed Taxi (01)

  const [activeIndex, setActiveIndex] = useState<number>(startIdx);
  const [activeStageId, setActiveStageId] = useState<DnaStageItem['id']>('idea');
  const [unlockedStageIndex, setUnlockedStageIndex] = useState<number>(0);
  const [selectedTechName, setSelectedTechName] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Responsive state detection
  const [viewportWidth, setViewportWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') return window.innerWidth;
    return 1200;
  });

  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentProject = projects[activeIndex] || projects[0];

  // Reset stage & tech selection on project change
  useEffect(() => {
    setActiveStageId('idea');
    setUnlockedStageIndex(0);
    setSelectedTechName(null);
  }, [currentProject.id]);

  // Project switching with cinematic transition
  const handleSelectProjectIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= projects.length || index === activeIndex) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsTransitioning(false);
      }, 350);
    },
    [activeIndex, projects.length]
  );

  const handlePrev = useCallback(() => {
    const prevIdx = (activeIndex - 1 + projects.length) % projects.length;
    handleSelectProjectIndex(prevIdx);
  }, [activeIndex, projects.length, handleSelectProjectIndex]);

  const handleNext = useCallback(() => {
    const nextIdx = (activeIndex + 1) % projects.length;
    handleSelectProjectIndex(nextIdx);
  }, [activeIndex, projects.length, handleSelectProjectIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Stage selection with unlock flow
  const handleSelectStage = (stageId: DnaStageItem['id'], idx: number) => {
    setActiveStageId(stageId);
    setUnlockedStageIndex((prev) => Math.max(prev, idx));
  };

  // Asset lookup for screenshot
  const asset = PROJECT_ASSETS[currentProject.id] || PROJECT_ASSETS['speed-taxi'];
  const screenshotUrl = asset?.dataUrl || currentProject.image;
  const accentColor = currentProject.accentColor || '#00f5ff';

  // Tech stack list for current project
  const currentTechList = useMemo(() => {
    return PROJECT_TECH_MAP[currentProject.id] || [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'JavaScript',
      'Tailwind CSS',
    ];
  }, [currentProject.id]);

  // Stage details content for selected stage
  const currentStageContent = useMemo(() => {
    switch (activeStageId) {
      case 'idea':
        return {
          title: 'THE IDEA',
          subtitle: 'Problem & Inspiration',
          text:
            currentProject.problem ||
            currentProject.idea ||
            'A modern algorithmic approach to eliminate system friction and automate manual delays.',
          highlight: 'Addressing real-world problems with intelligent software architecture.',
        };
      case 'design':
        return {
          title: 'THE DESIGN',
          subtitle: 'UI/UX & Architecture',
          text:
            currentProject.idea ||
            'Futuristic glassmorphism UI paired with unidirectional data flow and instant feedback states.',
          highlight: 'Clean typographic hierarchy, responsive layouts, and eye-safe dark atmosphere.',
        };
      case 'technology':
        return {
          title: 'THE TECHNOLOGY',
          subtitle: 'Verified Stack Constellation',
          text: `Engineered using ${currentTechList.join(', ')} for production reliability and sub-second performance.`,
          highlight: 'Modular full-stack components backed by verified API protocols.',
        };
      case 'build':
        return {
          title: 'THE BUILD',
          subtitle: 'Implementation & Engineering',
          text:
            currentProject.build ||
            'Constructed with type-safe modules, automated test gates, and containerized Docker pipelines.',
          highlight: 'High-throughput async execution with sub-millisecond database queries.',
        };
      case 'impact':
        return {
          title: 'THE IMPACT',
          subtitle: 'Real-World Outcome',
          text:
            currentProject.result ||
            currentProject.impact ||
            'Delivered frictionless user workflows, high system reliability, and measurable time savings.',
          highlight: 'Tested, verified, and ready for enterprise-scale deployment.',
        };
      default:
        return {
          title: 'THE IDEA',
          subtitle: 'Problem & Inspiration',
          text: currentProject.description,
          highlight: 'Innovative software execution.',
        };
    }
  }, [activeStageId, currentProject, currentTechList]);

  return (
    <div
      id="project-dna-universe-page"
      className="relative w-full min-h-screen flex flex-col items-center bg-[#020712] text-white overflow-x-hidden pt-2 pb-16 select-none"
    >
      {/* ===================================================================== */}
      {/* 1. ATMOSPHERIC COSMIC NEBULA BACKGROUND                               */}
      {/* ===================================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020712] via-[#051126] to-[#01040a]" />

        {/* Ambient Radial Color Glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[150px] opacity-20 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${accentColor} 0%, transparent 65%)`,
          }}
        />

        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#081f38_1px,transparent_1px),linear-gradient(to_bottom,#081f38_1px,transparent_1px)] [background-size:56px_56px] opacity-15" />
      </div>

      {/* ===================================================================== */}
      {/* 2. PROJECT DNA TITLE SECTION                                          */}
      {/* ===================================================================== */}
      <header
        id="project-dna-header"
        className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-4 sm:pt-6 pb-2 text-center flex flex-col items-center"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="h-px w-6 bg-cyan-500/40" />
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.28em] text-cyan-400 uppercase">
            THE CODE. THE CRAFT. THE JOURNEY.
          </span>
          <span className="h-px w-6 bg-cyan-500/40" />
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-sans drop-shadow-[0_0_30px_rgba(0,245,255,0.35)]">
          PROJECT DNA
        </h1>

        {/* Supporting Quote */}
        <p className="text-xs sm:text-sm font-sans text-slate-300 tracking-wide mt-1 italic max-w-md">
          “More than projects, these are chapters of my journey.”
        </p>
      </header>

      {/* ===================================================================== */}
      {/* 3. MAIN CONTENT STAGE (3-COLUMN DESKTOP / STACKED MOBILE)             */}
      {/* ===================================================================== */}
      <main className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex flex-col items-center">
        
        {/* =================================================================== */}
        {/* PROJECT NODES BAR (FLOATING DNA NODES CONNECTED BY NEON LINES)       */}
        {/* =================================================================== */}
        <div className="w-full max-w-5xl mb-6 p-3 rounded-2xl border border-cyan-500/30 bg-[#030c22]/90 backdrop-blur-md shadow-[0_0_25px_rgba(0,245,255,0.15)] flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          {projects.map((p, idx) => {
            const isSelected = idx === activeIndex;
            const doorNumber = p.doorNumber || `0${idx + 1}`;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectProjectIndex(idx)}
                className={`flex-1 min-w-[130px] p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/80 text-white shadow-[0_0_20px_rgba(0,245,255,0.4)] scale-105 ring-1 ring-cyan-400'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-cyan-500/40 hover:text-slate-200'
                }`}
              >
                <span
                  className={`text-xs font-mono font-bold ${
                    isSelected ? 'text-cyan-400' : 'text-slate-500'
                  }`}
                >
                  {doorNumber}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold truncate uppercase font-sans">
                    {p.shortName || p.title}
                  </span>
                  <span className="text-[9px] font-mono text-cyan-400/80 truncate">
                    {p.categoryName || p.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 3-Column Core Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            {/* =============================================================== */}
            {/* COLUMN 1 (LEFT): PROJECT DNA STAGES (01-05)                     */}
            {/* =============================================================== */}
            <div className="lg:col-span-3 flex flex-col justify-between p-4 rounded-2xl border border-cyan-500/30 bg-[#030d24]/90 backdrop-blur-md shadow-2xl">
              <div>
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                    PROJECT DNA STAGES
                  </span>
                </div>

                {/* 5 Stages Navigation List */}
                <div className="flex flex-col gap-2 mb-4">
                  {DNA_STAGES_CONFIG.map((stage, idx) => {
                    const isSelected = activeStageId === stage.id;
                    const isUnlocked = idx <= unlockedStageIndex;
                    const StageIcon = stage.icon;

                    return (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => handleSelectStage(stage.id, idx)}
                        className={`p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-950/80 text-white shadow-[0_0_15px_rgba(0,245,255,0.3)] ring-1 ring-cyan-400'
                            : isUnlocked
                            ? 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-cyan-500/40 hover:text-white'
                            : 'border-slate-900 bg-slate-950/40 text-slate-600 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-mono font-bold text-cyan-400">
                            {stage.number}
                          </span>
                          <span className="text-xs font-bold font-sans tracking-wide uppercase">
                            {stage.title}
                          </span>
                        </div>
                        <StageIcon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Stage Content Display */}
                <div className="p-3.5 rounded-xl border border-cyan-500/25 bg-slate-950/80 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 uppercase font-bold">
                    <span>{currentStageContent.title}</span>
                    <span>{currentStageContent.subtitle}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {currentStageContent.text}
                  </p>
                  <div className="text-[10px] font-mono text-cyan-300/90 pt-1 border-t border-slate-800">
                    ★ {currentStageContent.highlight}
                  </div>
                </div>
              </div>
            </div>

            {/* =============================================================== */}
            {/* COLUMN 2 (CENTER): CURRENT PROJECT HERO SCREENSHOT & DETAILS   */}
            {/* =============================================================== */}
            <div className="lg:col-span-6 flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl border border-cyan-400/60 bg-[#030a1c]/95 backdrop-blur-md shadow-[0_0_35px_rgba(0,245,255,0.2)] ring-1 ring-cyan-500/30">
              {/* Top Status Bar */}
              <div className="w-full flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                    SYSTEM DISPLAY • {currentProject.category}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase bg-slate-900 px-2 py-0.5 rounded border border-cyan-500/30">
                  {currentProject.doorNumber} / 05
                </span>
              </div>

              {/* Main Screenshot Frame (Front-Facing, Crisp, Flat, Premium Brackets) */}
              <div className="relative w-full aspect-[16/10] bg-[#02050f] rounded-xl overflow-hidden border border-cyan-500/40 p-1 flex items-center justify-center shadow-[0_0_25px_rgba(0,245,255,0.15)] my-auto">
                {/* Corner Brackets (┌ ┐ └ ┘) */}
                <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
                <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
                <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
                <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

                <img
                  src={screenshotUrl}
                  alt={currentProject.title}
                  className="w-full h-full object-contain object-center rounded-lg select-none pointer-events-none"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Glare Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/05 via-transparent to-white/05 pointer-events-none" />
              </div>

              {/* Current Project Info */}
              <div className="w-full mt-4 pt-3 border-t border-slate-800 text-center flex flex-col items-center">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-sans drop-shadow-[0_0_20px_rgba(0,245,255,0.3)]">
                  {currentProject.title}
                </h2>
                <div className="text-xs font-mono text-cyan-300 font-semibold mt-0.5 uppercase tracking-wider">
                  {currentProject.type || currentProject.tagline}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-xl mt-2">
                  {currentProject.description}
                </p>

                {/* Key Features List */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                  {(currentProject.features || currentProject.keyFeatures || [
                    'Live Tracking',
                    'Secure Authentication',
                    'Maps Integration',
                    'Ride Booking',
                    'Responsive UI',
                  ]).slice(0, 5).map((feat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-[10px] font-mono text-cyan-200 uppercase tracking-wider flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-3 w-full max-w-xs mt-4">
                  {currentProject.liveUrl && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 font-mono bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all min-h-[40px] cursor-pointer active:scale-95 uppercase tracking-wider"
                    >
                      <span>VIEW LIVE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {currentProject.githubUrl && (
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white font-mono border border-cyan-500/40 bg-[#041126]/90 hover:bg-slate-900 transition-all min-h-[40px] cursor-pointer active:scale-95 uppercase tracking-wider"
                    >
                      <Github className="w-3.5 h-3.5 text-cyan-400" />
                      <span>SOURCE</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* =============================================================== */}
            {/* COLUMN 3 (RIGHT): TECHNOLOGY CONSTELLATION & TECH DETAIL CARD  */}
            {/* =============================================================== */}
            <div className="lg:col-span-3 flex flex-col justify-between p-4 rounded-2xl border border-cyan-500/30 bg-[#030d24]/90 backdrop-blur-md shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                    TECH STACK CONSTELLATION
                  </span>
                  <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
                </div>

                {/* Satellite Tech Nodes */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                  {currentTechList.map((techName) => {
                    const isSelected = selectedTechName === techName;
                    const config = getTechIconConfig(techName);
                    const Icon = config.icon;

                    return (
                      <button
                        key={techName}
                        type="button"
                        onClick={() => setSelectedTechName(isSelected ? null : techName)}
                        className={`p-2 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-950/90 text-cyan-300 shadow-[0_0_15px_rgba(0,245,255,0.5)] scale-105 ring-1 ring-cyan-400'
                            : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-cyan-500/50 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-cyan-400" style={{ color: config.brandColor }} />
                        <span className="text-xs font-mono font-medium">{techName}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Technology Detail Card */}
                <AnimatePresence>
                  {selectedTechName ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="p-3.5 rounded-xl border border-cyan-400/60 bg-[#041228]/95 backdrop-blur-md shadow-[0_0_20px_rgba(0,245,255,0.25)] relative text-left"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedTechName(null)}
                        aria-label="Close tech details"
                        className="absolute top-2.5 right-2.5 text-slate-400 hover:text-cyan-300 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff]" />
                        <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                          {selectedTechName}
                        </span>
                      </div>

                      <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase mb-1">
                        Core System Technology
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Used to construct the modular architecture, reactive UI, and verified data pipelines of {currentProject.title}.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/60 text-center">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        Click any technology node to inspect its architectural role
                      </span>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom DNA Flow Summary */}
              <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                <div className="text-[9px] font-mono tracking-[0.2em] text-cyan-400 font-bold uppercase mb-1">
                  PROJECT DNA EVOLUTION
                </div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  IDEA → DESIGN → TECH → BUILD → IMPACT
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* =================================================================== */}
        {/* 4. MINIMAL PROJECT NAVIGATOR (BOTTOM DOCK)                          */}
        {/* =================================================================== */}
        <div
          id="project-dna-navigator"
          className="w-full max-w-xl mx-auto flex flex-col items-center mt-8 pb-4 px-4 select-none"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-md shadow-xl w-full">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isTransitioning}
              aria-label="Previous project"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-mono font-bold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all cursor-pointer min-h-[38px]"
            >
              <ChevronLeft className="w-4 h-4 text-cyan-400" />
              <span>PREVIOUS</span>
            </button>

            {/* Numbered indicators */}
            <div className="flex items-center gap-2">
              {projects.map((p, idx) => {
                const isSelected = idx === activeIndex;
                const doorNumber = p.doorNumber || `0${idx + 1}`;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectProjectIndex(idx)}
                    aria-label={`Select project ${doorNumber}`}
                    className={`transition-all duration-300 rounded-xl flex items-center justify-center cursor-pointer min-w-[34px] min-h-[34px] ${
                      isSelected
                        ? 'text-xs font-mono font-bold bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,245,255,0.6)] scale-110'
                        : 'text-[11px] font-mono text-slate-500 border border-slate-800 bg-slate-900/80 hover:text-slate-200'
                    }`}
                  >
                    {doorNumber}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={isTransitioning}
              aria-label="Next project"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-mono font-bold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all cursor-pointer min-h-[38px]"
            >
              <span>NEXT</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>

          {/* Active project tagline */}
          <div className="mt-2 text-center">
            <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-400 uppercase font-semibold">
              CURRENT CHAPTER: {currentProject.shortName || currentProject.title}
            </span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 5. FINAL JOURNEY MESSAGE                                           */}
        {/* =================================================================== */}
        <footer
          id="project-dna-final-message"
          className="w-full max-w-lg mx-auto text-center mt-10 pt-8 border-t border-slate-800/80"
        >
          <p className="text-xs sm:text-sm font-sans text-slate-300 italic">
            “More than projects, these are chapters of my journey.”
          </p>
          <p className="text-xs sm:text-sm font-mono tracking-[0.2em] text-cyan-400 font-bold uppercase mt-1">
            “The journey continues...”
          </p>
          <div className="text-[11px] font-mono tracking-[0.28em] text-slate-400 uppercase font-bold mt-2">
            IDEAS • CODE • CREATE • IMPACT
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ProjectDnaUniversePage;
