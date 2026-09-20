import React from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectRealScreenshot } from '../gallery/ProjectRealScreenshot';
import { DnaNodeType } from '../../../types/projectDna';
import { Database, Server, Atom, Terminal, Zap, Mail, Code, Layers } from 'lucide-react';

interface ProjectCoreProps {
  project: ProjectItem;
  activeNode: DnaNodeType | null;
  hoveredNode: DnaNodeType | null;
  coreRef: React.RefObject<HTMLDivElement>;
  anchorPortRefs?: React.MutableRefObject<Record<DnaNodeType, HTMLDivElement | null>>;
}

export const ProjectCore: React.FC<ProjectCoreProps> = ({
  project,
  activeNode,
  hoveredNode,
  coreRef,
  anchorPortRefs,
}) => {
  const isDimmed = activeNode !== null;

  // Icon mapping for tech stack
  const getTechIcon = (techName: string) => {
    const lower = techName.toLowerCase();
    if (lower.includes('mongo')) return <Database className="w-3.5 h-3.5 text-emerald-400" />;
    if (lower.includes('express')) return <Server className="w-3.5 h-3.5 text-slate-300" />;
    if (lower.includes('react')) return <Atom className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow-3d" />;
    if (lower.includes('node')) return <Terminal className="w-3.5 h-3.5 text-green-400" />;
    if (lower.includes('socket')) return <Zap className="w-3.5 h-3.5 text-sky-400" />;
    if (lower.includes('mail')) return <Mail className="w-3.5 h-3.5 text-rose-400" />;
    if (lower.includes('python')) return <Terminal className="w-3.5 h-3.5 text-blue-400" />;
    if (lower.includes('docker')) return <Layers className="w-3.5 h-3.5 text-blue-400" />;
    return <Code className="w-3.5 h-3.5 text-cyan-400" />;
  };

  return (
    <div
      ref={coreRef}
      id="project-dna-core"
      className="relative z-20 flex flex-col items-center max-w-[560px] xl:max-w-[620px] w-full select-none"
    >
      {/* Floating 3D Laptop Display Artifact */}
      <div
        className={`relative w-full transition-all duration-500 group ${
          isDimmed ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
        }`}
        style={{ perspective: '1200px' }}
      >
        {/* Soft volumetric glow halo behind the floating laptop */}
        <div
          className="absolute -inset-4 rounded-3xl opacity-50 blur-3xl pointer-events-none transition-all duration-500"
          style={{
            background:
              hoveredNode || activeNode
                ? 'radial-gradient(ellipse at center, rgba(0, 245, 255, 0.45) 0%, rgba(56, 189, 248, 0.2) 45%, transparent 70%)'
                : 'radial-gradient(ellipse at center, rgba(0, 245, 255, 0.3) 0%, rgba(14, 116, 144, 0.15) 45%, transparent 70%)',
          }}
        />

        {/* 1. Laptop Screen Lid (Angled back slightly in 3D) */}
        <div
          id="central-laptop-screen"
          className="relative rounded-2xl bg-[#090e1a] border border-slate-700/90 p-2 sm:p-2.5 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95),0_0_35px_rgba(0,245,255,0.15)] transition-transform duration-500"
          style={{
            transform: 'perspective(1200px) rotateX(2.5deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Subtle Top Metallic Glare Highlight & Webcam */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none" />
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-700/80 flex items-center justify-center pointer-events-none">
            <div className="w-0.5 h-0.5 rounded-full bg-cyan-400/60" />
          </div>

          {/* Anchor Ports where organic living DNA lines physically dock */}
          {/* 01 Problem (Upper Left) */}
          <div
            ref={(el) => {
              if (anchorPortRefs) anchorPortRefs.current.problem = el;
            }}
            id="port-problem"
            className={`absolute -left-1.5 top-[22%] w-3 h-3 rounded-full border transition-all duration-300 pointer-events-none ${
              hoveredNode === 'problem' || activeNode === 'problem'
                ? 'bg-rose-400 border-white shadow-[0_0_14px_#f43f5e] scale-125'
                : 'bg-slate-900 border-rose-500/70'
            }`}
          />

          {/* 02 Idea (Middle Left) */}
          <div
            ref={(el) => {
              if (anchorPortRefs) anchorPortRefs.current.idea = el;
            }}
            id="port-idea"
            className={`absolute -left-1.5 top-[56%] w-3 h-3 rounded-full border transition-all duration-300 pointer-events-none ${
              hoveredNode === 'idea' || activeNode === 'idea'
                ? 'bg-sky-400 border-white shadow-[0_0_14px_#38bdf8] scale-125'
                : 'bg-slate-900 border-sky-500/70'
            }`}
          />

          {/* 03 Architecture (Lower Left) */}
          <div
            ref={(el) => {
              if (anchorPortRefs) anchorPortRefs.current.architecture = el;
            }}
            id="port-architecture"
            className={`absolute left-[20%] -bottom-1.5 w-3 h-3 rounded-full border transition-all duration-300 pointer-events-none ${
              hoveredNode === 'architecture' || activeNode === 'architecture'
                ? 'bg-cyan-400 border-white shadow-[0_0_14px_#00f5ff] scale-125'
                : 'bg-slate-900 border-cyan-500/70'
            }`}
          />

          {/* 04 Technology (Lower Right) */}
          <div
            ref={(el) => {
              if (anchorPortRefs) anchorPortRefs.current.technology = el;
            }}
            id="port-technology"
            className={`absolute right-[20%] -bottom-1.5 w-3 h-3 rounded-full border transition-all duration-300 pointer-events-none ${
              hoveredNode === 'technology' || activeNode === 'technology'
                ? 'bg-indigo-400 border-white shadow-[0_0_14px_#818cf8] scale-125'
                : 'bg-slate-900 border-indigo-500/70'
            }`}
          />

          {/* 05 Features (Middle Right) */}
          <div
            ref={(el) => {
              if (anchorPortRefs) anchorPortRefs.current.features = el;
            }}
            id="port-features"
            className={`absolute -right-1.5 top-[56%] w-3 h-3 rounded-full border transition-all duration-300 pointer-events-none ${
              hoveredNode === 'features' || activeNode === 'features'
                ? 'bg-emerald-400 border-white shadow-[0_0_14px_#10b981] scale-125'
                : 'bg-slate-900 border-emerald-500/70'
            }`}
          />

          {/* 06 Impact (Upper Right) */}
          <div
            ref={(el) => {
              if (anchorPortRefs) anchorPortRefs.current.impact = el;
            }}
            id="port-impact"
            className={`absolute -right-1.5 top-[22%] w-3 h-3 rounded-full border transition-all duration-300 pointer-events-none ${
              hoveredNode === 'impact' || activeNode === 'impact'
                ? 'bg-purple-400 border-white shadow-[0_0_14px_#c084fc] scale-125'
                : 'bg-slate-900 border-purple-500/70'
            }`}
          />

          {/* Real Project Screen Content (Undistorted & Interactive) */}
          <div className="relative rounded-xl overflow-hidden border border-cyan-950/80 shadow-2xl">
            <ProjectRealScreenshot project={project} isHero={true} />

            {/* Specular Diagonal Glass Glare */}
            <div
              className="absolute inset-0 pointer-events-none opacity-35"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, transparent 45%, rgba(0,245,255,0.03) 75%, transparent 100%)',
              }}
            />

            {/* Live production tag */}
            <div className="absolute bottom-2.5 right-3 px-2.5 py-0.5 rounded-full bg-slate-950/90 backdrop-blur-md border border-slate-700/80 text-[9px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-md pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE ARTIFACT</span>
            </div>
          </div>
        </div>

        {/* 2. Physical Angled Laptop Keyboard Deck (giving authentic 3D open laptop depth) */}
        <div
          id="laptop-keyboard-deck"
          className="relative -mt-1 mx-auto w-[94%] h-9 rounded-b-xl bg-gradient-to-b from-[#11192e] to-[#080d19] border-x border-b border-slate-700/80 shadow-[0_16px_30px_rgba(0,0,0,0.9)] flex items-center justify-center px-6 overflow-hidden pointer-events-none"
          style={{
            transform: 'perspective(600px) rotateX(55deg)',
            transformOrigin: 'top center',
          }}
        >
          {/* Subtle Key rows hint with faint cyan glow */}
          <div className="w-full flex items-center justify-center gap-1 opacity-40">
            <div className="h-1.5 w-12 rounded bg-cyan-400/20 border border-cyan-400/40" />
            <div className="h-1.5 w-24 rounded bg-cyan-400/25 border border-cyan-400/40" />
            <div className="h-1.5 w-12 rounded bg-cyan-400/20 border border-cyan-400/40" />
          </div>
          {/* Trackpad outline */}
          <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-16 h-2 rounded-t border-t border-x border-cyan-400/30 bg-cyan-950/20" />
        </div>

        {/* Floating Under-Chassis Reflection Shadow */}
        <div
          className="w-[75%] h-5 mx-auto -mt-1 rounded-full bg-black/90 blur-md pointer-events-none"
          style={{ transform: 'scaleY(0.4)' }}
        />
      </div>

      {/* 3. Concentric Illuminated Pedestal & Project Plaque (Identical to reference image) */}
      <div className="relative mt-2 flex flex-col items-center w-full">
        {/* Glowing Plaque on Front of Pedestal */}
        <div
          id="pedestal-plaque"
          className="relative z-10 px-6 py-2 rounded-2xl bg-[#091122]/90 border border-cyan-400/60 shadow-[0_0_25px_rgba(0,245,255,0.25)] backdrop-blur-xl flex flex-col items-center text-center transition-all duration-300"
        >
          <div className="text-sm sm:text-base font-black tracking-wider text-white uppercase font-sans">
            {project.title}
          </div>
          <div className="text-xs sm:text-[13px] font-serif italic text-cyan-300 font-medium">
            &ldquo;{project.tagline}&rdquo;
          </div>
          <div className="text-[9.5px] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
            - {project.type} -
          </div>
        </div>

        {/* Concentric Neon Rings of the Pedestal base */}
        <div className="relative w-[340px] sm:w-[420px] h-8 -mt-3 pointer-events-none overflow-visible">
          {/* Outer glowing ring */}
          <div
            className="absolute inset-0 rounded-full border border-cyan-400/40 shadow-[0_0_20px_rgba(0,245,255,0.3)]"
            style={{ transform: 'scaleY(0.25)' }}
          />
          {/* Inner ring */}
          <div
            className="absolute inset-x-8 inset-y-1 rounded-full border border-cyan-300/60 shadow-[0_0_15px_rgba(0,245,255,0.4)]"
            style={{ transform: 'scaleY(0.25)' }}
          />
          {/* Blue floor pool glow */}
          <div
            className="absolute inset-x-12 inset-y-0 rounded-full bg-cyan-400/20 blur-xl"
            style={{ transform: 'scaleY(0.25)' }}
          />
        </div>

        {/* 4. Tech Stack Dock (Directly below pedestal plaque as in approved reference image) */}
        <div
          id="tech-stack-dock"
          className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-2 px-2 max-w-lg"
        >
          {project.techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#080e1c]/90 border border-slate-700/80 hover:border-cyan-400/80 shadow-md backdrop-blur-md transition-all duration-200 group"
            >
              <span className="shrink-0 group-hover:scale-110 transition-transform">
                {getTechIcon(tech.name)}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono font-medium text-slate-200">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
