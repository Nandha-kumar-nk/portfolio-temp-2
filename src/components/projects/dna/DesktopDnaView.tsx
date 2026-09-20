import React, { useRef, useState, useEffect, useMemo } from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { DnaNodeType, DNA_NODES } from '../../../types/projectDna';
import { ProjectCore } from './ProjectCore';
import { DnaNode } from './DnaNode';
import { ProjectDnaLines } from './ProjectDnaLines';
import { DnaFocusedView } from './DnaFocusedView';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

interface DesktopDnaViewProps {
  project: ProjectItem;
  allProjects?: ProjectItem[];
  onSelectProject?: (id: string) => void;
}

export const DesktopDnaView: React.FC<DesktopDnaViewProps> = ({
  project,
  allProjects = [],
  onSelectProject,
}) => {
  const [activeNode, setActiveNode] = useState<DnaNodeType | null>(null);
  const [hoveredNode, setHoveredNode] = useState<DnaNodeType | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  // References for all 6 floating nodes
  const nodeRefs = useRef<Record<DnaNodeType, HTMLDivElement | null>>({
    problem: null,
    idea: null,
    architecture: null,
    technology: null,
    features: null,
    impact: null,
  });

  // References for anchor ports on the central frame
  const anchorPortRefs = useRef<Record<DnaNodeType, HTMLDivElement | null>>({
    problem: null,
    idea: null,
    architecture: null,
    technology: null,
    features: null,
    impact: null,
  });

  // Current project index and navigation
  const currentIndex = useMemo(() => {
    const idx = allProjects.findIndex((p) => p.id === project.id);
    return idx >= 0 ? idx : 0;
  }, [allProjects, project.id]);

  const handlePrevProject = () => {
    if (!onSelectProject || allProjects.length === 0) return;
    const prevIdx = (currentIndex - 1 + allProjects.length) % allProjects.length;
    onSelectProject(allProjects[prevIdx].id);
  };

  const handleNextProject = () => {
    if (!onSelectProject || allProjects.length === 0) return;
    const nextIdx = (currentIndex + 1) % allProjects.length;
    onSelectProject(allProjects[nextIdx].id);
  };

  // Keyboard shortcuts 1-6 & ESC & Arrow keys for project switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 6) {
        const nodeType = DNA_NODES[num - 1].type;
        setActiveNode(nodeType);
      } else if (e.key === 'Escape') {
        setActiveNode(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Node lookup
  const nodeMap = useMemo(() => {
    const map: Partial<Record<DnaNodeType, typeof DNA_NODES[0]>> = {};
    DNA_NODES.forEach((n) => {
      map[n.type] = n;
    });
    return map;
  }, []);

  // Dynamic project summaries for each node
  const getNodeSummary = (type: DnaNodeType) => {
    switch (type) {
      case 'problem':
        return project.id === 'swayam-2'
          ? 'Understanding usability gaps in the existing platform.'
          : project.problem || 'Addressing real-world friction and bottlenecks.';
      case 'idea':
        return project.id === 'swayam-2'
          ? 'Rebuild with a modern, user-friendly experience.'
          : project.idea || 'Intelligent algorithmic solution hypothesis.';
      case 'architecture':
        return project.id === 'swayam-2'
          ? 'MERN stack with real-time features.'
          : `${project.type.split(' ')[0]} architectural pipeline.`;
      case 'technology':
        return project.id === 'swayam-2'
          ? 'Modern web technologies.'
          : 'High-performance production tech stack.';
      case 'features':
        return project.id === 'swayam-2'
          ? 'Course management, quizzes, notifications and more.'
          : project.features[0] || 'Modular full-stack production features.';
      case 'impact':
        return project.id === 'swayam-2'
          ? 'Improved usability and better learning experience.'
          : project.result || 'Measurable outcome and frictionless workflow.';
      default:
        return '';
    }
  };

  // Metrics for active project
  const projectMetrics = useMemo(() => {
    switch (project.id) {
      case 'swayam-2':
        return [
          { value: '120+', label: 'Courses' },
          { value: '100K+', label: 'Learners (Simulated)' },
          { value: '24/7', label: 'Access' },
        ];
      case 'speed-taxi':
        return [
          { value: '48+', label: 'Active Cabs' },
          { value: '< 4m', label: 'Avg Arrival ETA' },
          { value: '100%', label: 'GPS Precision' },
        ];
      case 'wildlife-ai':
        return [
          { value: '38ms', label: 'YOLOv8 Latency' },
          { value: '97.4%', label: 'Detection Conf' },
          { value: 'Zero', label: 'Border Collisions' },
        ];
      case 'resume-forge':
        return [
          { value: '98/100', label: 'ATS Score' },
          { value: '< 1s', label: 'PDF Compilation' },
          { value: '5+', label: 'Vector Templates' },
        ];
      case 'nk-mern-cli':
        return [
          { value: '1.4s', label: 'Scaffold Speed' },
          { value: '80%+', label: 'Time Saved' },
          { value: '10K+', label: 'NPM Installs' },
        ];
      default:
        return [
          { value: '100%', label: 'Production Ready' },
          { value: 'Full Stack', label: 'Architecture' },
          { value: 'Modern UI', label: 'Design' },
        ];
    }
  }, [project.id]);

  return (
    <div
      ref={containerRef}
      id="desktop-dna-viewport"
      className="relative w-full h-[calc(100vh-68px)] min-h-[660px] max-h-[1050px] px-4 xl:px-8 py-2 select-none overflow-hidden flex flex-col justify-between"
    >
      {/* 3-Column Wide Cinematic Stage */}
      <div className="grid grid-cols-12 gap-3 xl:gap-6 w-full max-w-[1650px] mx-auto flex-1 min-h-0 items-stretch">
        
        {/* ========================================================================= */}
        {/* COLUMN 1 (LEFT FLANK): Project Selector + Developer Character + Quote     */}
        {/* ========================================================================= */}
        <div className="col-span-3 flex flex-col justify-between py-1 z-20">
          {/* Top: Projects Label & Selector List */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                PROJECTS
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f5ff]" />
            </div>

            {/* List of 5 Projects with Numbered Badges */}
            <div className="flex flex-col gap-2">
              {allProjects.map((item, idx) => {
                const isActive = item.id === project.id;
                const formattedNum = String(idx + 1).padStart(2, '0');

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectProject && onSelectProject(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all duration-300 cursor-pointer backdrop-blur-md ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/40 border border-cyan-400 shadow-[0_0_18px_rgba(0,245,255,0.35)] scale-[1.02]'
                        : 'bg-[#070b16]/70 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`text-xs font-mono font-bold ${
                          isActive ? 'text-cyan-400' : 'text-slate-500'
                        }`}
                      >
                        {formattedNum}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span
                          className={`text-xs font-bold truncate ${
                            isActive ? 'text-white' : 'text-slate-300'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400/80 truncate">
                          {item.categoryName || item.category}
                        </span>
                      </div>
                    </div>

                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff] shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Middle/Lower: Developer Character (Looking toward the central laptop) */}
          <div className="relative mt-auto pt-2 flex flex-col items-center">
            <div
              className="relative w-44 xl:w-52 h-56 xl:h-64 pointer-events-none transition-transform duration-700"
              style={{
                filter: 'drop-shadow(0 0 25px rgba(0, 245, 255, 0.18))',
              }}
            >
              <picture>
                <source srcSet="/assets/developer-character.webp" type="image/webp" />
                <img
                  src="/assets/developer-character.png"
                  alt="Nandhakumar - Creator observing the project"
                  className="w-full h-full object-contain object-bottom pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </picture>
              {/* Realistic floor shadow beneath developer character */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-5 rounded-full bg-black/95 blur-md pointer-events-none" />
            </div>

            {/* Bottom Quote: "Ideas become powerful when they solve real problems." — Nandhakumar */}
            <div className="mt-1 text-center max-w-xs px-2">
              <p className="text-xs xl:text-sm font-serif italic text-cyan-300/90 leading-relaxed font-medium">
                &ldquo;Ideas become powerful when they solve real problems.&rdquo;
              </p>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5 tracking-wider">
                — Nandhakumar
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COLUMN 2 (CENTER STAGE): Headline + Floating Laptop + 6 DNA Nodes + Pedestal*/}
        {/* ========================================================================= */}
        <div className="col-span-6 flex flex-col items-center justify-between py-1 relative z-20">
          {/* Top Editorial Headline */}
          <div className="flex flex-col items-center text-center mt-0.5">
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-black tracking-wider uppercase font-sans">
              <span className="text-white">PROJECT </span>
              <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,245,255,0.7)]">DNA</span>
            </h1>
            <div className="text-xs sm:text-sm font-mono tracking-widest text-cyan-400 font-semibold uppercase mt-0.5">
              EXPLORE HOW I BUILD.
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 font-sans mt-0.5 max-w-lg">
              Every project starts with a problem. The interesting part is what happens next.
            </p>
          </div>

          {/* Center Stage: Floating Laptop surrounded by the living DNA Network */}
          <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-[440px]">
            {/* SVG Living Neural Lines connecting all 6 nodes directly into the laptop screen */}
            <ProjectDnaLines
              activeNode={activeNode}
              hoveredNode={hoveredNode}
              containerRef={containerRef}
              coreRef={coreRef}
              nodeRefs={nodeRefs}
              anchorPortRefs={anchorPortRefs}
            />

            {/* Floating DNA Node 01: PROBLEM (Upper Left) */}
            {nodeMap.problem && (
              <div className="absolute left-[0%] xl:left-[2%] top-[10%] z-30">
                <DnaNode
                  config={nodeMap.problem}
                  customSummary={getNodeSummary('problem')}
                  isActive={activeNode === 'problem'}
                  isHovered={hoveredNode === 'problem'}
                  isDimmed={activeNode !== null && activeNode !== 'problem'}
                  onSelect={(type) => setActiveNode(type)}
                  onHover={(type) => setHoveredNode(type)}
                  nodeRef={(el) => {
                    nodeRefs.current.problem = el;
                  }}
                />
              </div>
            )}

            {/* Floating DNA Node 02: IDEA (Middle Left) */}
            {nodeMap.idea && (
              <div className="absolute left-[-2%] xl:left-[0%] top-[48%] z-30">
                <DnaNode
                  config={nodeMap.idea}
                  customSummary={getNodeSummary('idea')}
                  isActive={activeNode === 'idea'}
                  isHovered={hoveredNode === 'idea'}
                  isDimmed={activeNode !== null && activeNode !== 'idea'}
                  onSelect={(type) => setActiveNode(type)}
                  onHover={(type) => setHoveredNode(type)}
                  nodeRef={(el) => {
                    nodeRefs.current.idea = el;
                  }}
                />
              </div>
            )}

            {/* Floating DNA Node 03: ARCHITECTURE (Lower Left) */}
            {nodeMap.architecture && (
              <div className="absolute left-[3%] xl:left-[6%] bottom-[12%] z-30">
                <DnaNode
                  config={nodeMap.architecture}
                  customSummary={getNodeSummary('architecture')}
                  isActive={activeNode === 'architecture'}
                  isHovered={hoveredNode === 'architecture'}
                  isDimmed={activeNode !== null && activeNode !== 'architecture'}
                  onSelect={(type) => setActiveNode(type)}
                  onHover={(type) => setHoveredNode(type)}
                  nodeRef={(el) => {
                    nodeRefs.current.architecture = el;
                  }}
                />
              </div>
            )}

            {/* Central Hero: Floating Laptop & Concentric Illuminated Pedestal */}
            <ProjectCore
              project={project}
              activeNode={activeNode}
              hoveredNode={hoveredNode}
              coreRef={coreRef}
              anchorPortRefs={anchorPortRefs}
            />

            {/* Floating DNA Node 06: IMPACT (Upper Right) */}
            {nodeMap.impact && (
              <div className="absolute right-[0%] xl:right-[2%] top-[10%] z-30">
                <DnaNode
                  config={nodeMap.impact}
                  customSummary={getNodeSummary('impact')}
                  isActive={activeNode === 'impact'}
                  isHovered={hoveredNode === 'impact'}
                  isDimmed={activeNode !== null && activeNode !== 'impact'}
                  onSelect={(type) => setActiveNode(type)}
                  onHover={(type) => setHoveredNode(type)}
                  nodeRef={(el) => {
                    nodeRefs.current.impact = el;
                  }}
                />
              </div>
            )}

            {/* Floating DNA Node 05: FEATURES (Middle Right) */}
            {nodeMap.features && (
              <div className="absolute right-[-2%] xl:right-[0%] top-[48%] z-30">
                <DnaNode
                  config={nodeMap.features}
                  customSummary={getNodeSummary('features')}
                  isActive={activeNode === 'features'}
                  isHovered={hoveredNode === 'features'}
                  isDimmed={activeNode !== null && activeNode !== 'features'}
                  onSelect={(type) => setActiveNode(type)}
                  onHover={(type) => setHoveredNode(type)}
                  nodeRef={(el) => {
                    nodeRefs.current.features = el;
                  }}
                />
              </div>
            )}

            {/* Floating DNA Node 04: TECHNOLOGY (Lower Right) */}
            {nodeMap.technology && (
              <div className="absolute right-[3%] xl:right-[6%] bottom-[12%] z-30">
                <DnaNode
                  config={nodeMap.technology}
                  customSummary={getNodeSummary('technology')}
                  isActive={activeNode === 'technology'}
                  isHovered={hoveredNode === 'technology'}
                  isDimmed={activeNode !== null && activeNode !== 'technology'}
                  onSelect={(type) => setActiveNode(type)}
                  onHover={(type) => setHoveredNode(type)}
                  nodeRef={(el) => {
                    nodeRefs.current.technology = el;
                  }}
                />
              </div>
            )}
          </div>

          {/* Bottom Hint */}
          <div className="text-[10px] font-mono text-slate-500 pb-0.5">
            Click any node to inspect deep architectural implementation • Press 1-6
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COLUMN 3 (RIGHT FLANK): Pager + Title + Description + CTAs + Stats + Note */}
        {/* ========================================================================= */}
        <div className="col-span-3 flex flex-col justify-between py-1 z-20 pl-2">
          {/* Top: Pager Header with Previous & Next circular arrow buttons */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                PROJECT // {String(currentIndex + 1).padStart(2, '0')}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevProject}
                  aria-label="Previous project"
                  className="w-7 h-7 rounded-full bg-slate-900/80 border border-slate-700 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextProject}
                  aria-label="Next project"
                  className="w-7 h-7 rounded-full bg-slate-900/80 border border-slate-700 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Big Project Typography */}
            <div className="space-y-1">
              <h2 className="text-3xl xl:text-4xl font-black text-white tracking-tight uppercase font-sans">
                {project.title}
              </h2>
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                {project.categoryName || project.category}
              </div>
              <div className="text-sm font-serif italic text-cyan-300/90 font-medium">
                &ldquo;{project.tagline}&rdquo;
              </div>
            </div>

            {/* Description */}
            <p className="text-xs xl:text-sm text-slate-300 leading-relaxed font-sans">
              {project.description}
            </p>

            {/* Action Buttons: Visit Live Project & View Source Code */}
            <div className="flex flex-col gap-2 pt-1">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  id="btn-desktop-live"
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,245,255,0.4)] active:scale-[0.98] cursor-pointer"
                >
                  <span>Visit Live Project</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  id="btn-desktop-source"
                  className="w-full py-2 px-4 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View Source Code</span>
                </a>
              )}
            </div>

            {/* Key Project Metrics / Impact Statistics */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
              {projectMetrics.map((stat, idx) => (
                <div key={idx} className="flex flex-col text-left">
                  <span className="text-sm xl:text-base font-mono font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Handwritten Signature: "Building a smarter tomorrow --" */}
          <div className="mt-auto pt-4 text-right">
            <div className="font-script text-2xl xl:text-3xl text-cyan-300/80 tracking-wide select-none">
              Building a smarter tomorrow &mdash;&mdash;
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Focused Modal View when a DNA Node is clicked */}
      {activeNode && (
        <DnaFocusedView
          project={project}
          activeNodeType={activeNode}
          onClose={() => setActiveNode(null)}
          onSelectNode={(type) => setActiveNode(type)}
        />
      )}
    </div>
  );
};
