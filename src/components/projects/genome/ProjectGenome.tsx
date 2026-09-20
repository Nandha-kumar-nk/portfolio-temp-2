import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Dna, Code2, Globe, Shield, Terminal } from 'lucide-react';
import { GENOME_PROJECTS, GenomeProject } from './genomeData';
import ProjectCube from './ProjectCube';
import ProjectInfo from './ProjectInfo';
import ProjectGenomeDNA from './ProjectGenomeDNA';
import ProjectSelector from './ProjectSelector';
import ProjectDimensionsBackground from '../dimensions/ProjectDimensionsBackground';

export const ProjectGenome: React.FC = () => {
  // Selected Project ID
  const [activeProjectId, setActiveProjectId] = useState<string>('speed-taxi');
  
  // Selected Technology Node
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Transitioning state for cinematic crossfades
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Get active project data object
  const activeProject: GenomeProject =
    GENOME_PROJECTS.find((p) => p.id === activeProjectId) || GENOME_PROJECTS[0];

  // Handle Project Selection with 700ms cinematic transition
  const handleSelectProject = (projectId: string) => {
    if (projectId === activeProjectId || isTransitioning) return;
    setIsTransitioning(true);
    setSelectedTech(null);

    setTimeout(() => {
      setActiveProjectId(projectId);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 250);
    }, 350);
  };

  return (
    <ProjectDimensionsBackground>
      <div className="relative min-h-screen w-full text-white pt-20 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between z-10 font-sans">
        
        {/* ================================================================= */}
        {/* 1. HEADER & PAGE TITLE */}
        {/* ================================================================= */}
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between mb-6 pb-4 border-b border-cyan-500/20 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#020e24]/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-[0.2em] mb-2 shadow-[0_0_12px_rgba(0,245,255,0.15)]">
              <Dna className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>PROJECTS &bull; NANDHAKUMAR UNIVERSE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_25px_rgba(0,245,255,0.35)]">
              PROJECT GENOME
            </h1>

            <p className="text-xs sm:text-sm font-mono tracking-[0.2em] text-cyan-300/90 font-semibold uppercase mt-1">
              EVERY PROJECT HAS A STORY. EVERY STORY HAS A GENOME.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-slate-300">
            <div className="px-3 py-1.5 rounded-lg bg-[#010a18]/90 border border-cyan-500/25 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#00f5ff]" />
              <span>5 ENTERPRISE GENOMES</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#010a18]/90 border border-cyan-500/25 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>3D INTERACTIVE CUBE</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. MAIN 3-ZONE LAYOUT (LEFT / CENTER / RIGHT) */}
        {/* ================================================================= */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
          
          {/* --------------------------------------------------------------- */}
          {/* LEFT ZONE: INTRODUCTION & METRICS (3 Cols) */}
          {/* --------------------------------------------------------------- */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-4 text-left order-2 lg:order-1">
            <div className="p-4 rounded-xl bg-[#020d21]/80 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,245,255,0.15)] relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2 border-b border-cyan-500/20 pb-2">
                <Dna className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-extrabold tracking-wider text-cyan-300 uppercase">
                  THE GENOME CONCEPT
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Every project is a creation inside the <span className="text-cyan-300 font-semibold">Nandhakumar Universe</span>. The 3D Cube holds the project's visual identity and architecture, while the DNA path unveils its development journey across 5 evolutionary stages.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
              <div className="p-3 rounded-lg bg-[#010918]/80 border border-cyan-500/20 flex items-center gap-3">
                <div className="p-2 rounded bg-cyan-500/15 border border-cyan-400/40 text-cyan-300">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-extrabold font-mono text-white">MERN & AI</p>
                  <p className="text-[10px] font-mono text-slate-400">Core Tech Stack</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#010918]/80 border border-cyan-500/20 flex items-center gap-3">
                <div className="p-2 rounded bg-cyan-500/15 border border-cyan-400/40 text-cyan-300">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-extrabold font-mono text-white">100% VERIFIED</p>
                  <p className="text-[10px] font-mono text-slate-400">Production Code</p>
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* CENTER ZONE: 3D PROJECT CUBE (5 Cols) */}
          {/* --------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={`cube-wrap-${activeProjectId}`}
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{
                  opacity: isTransitioning ? 0.2 : 1,
                  scale: isTransitioning ? 0.92 : 1,
                  rotateY: 0,
                }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full flex justify-center"
              >
                <ProjectCube
                  project={activeProject}
                  selectedTech={selectedTech}
                  onSelectTech={(techName) =>
                    setSelectedTech((prev) => (prev === techName ? null : techName))
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* RIGHT ZONE: PROJECT METADATA & ACTIONS (4 Cols) */}
          {/* --------------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col justify-center order-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-wrap-${activeProjectId}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: isTransitioning ? 0.2 : 1,
                  x: isTransitioning ? 10 : 0,
                }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full"
              >
                <ProjectInfo
                  project={activeProject}
                  selectedTech={selectedTech}
                  onSelectTech={(techName) => setSelectedTech(techName)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. BOTTOM ZONE: DNA DEVELOPMENT JOURNEY & PROJECT SELECTOR */}
        {/* ================================================================= */}
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center mt-6">
          {/* DNA Stages Path */}
          <ProjectGenomeDNA project={activeProject} />

          {/* Project Selector Bar */}
          <ProjectSelector
            activeProjectId={activeProjectId}
            onSelectProject={handleSelectProject}
            isTransitioning={isTransitioning}
          />

          {/* Footer Motto */}
          <div className="mt-8 pt-4 border-t border-cyan-500/20 text-center w-full max-w-3xl">
            <p className="text-xs sm:text-sm font-mono tracking-widest text-cyan-200/90 font-semibold italic">
              “Every project has a story. Every story has a genome.”
            </p>
            <p className="text-[10px] font-mono tracking-[0.3em] text-slate-500 uppercase mt-1">
              IDEAS &bull; CODE &bull; CREATE &bull; IMPACT
            </p>
          </div>
        </div>

      </div>
    </ProjectDimensionsBackground>
  );
};

export default ProjectGenome;
