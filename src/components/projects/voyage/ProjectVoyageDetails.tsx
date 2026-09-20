import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Sparkles, X, ChevronRight } from 'lucide-react';
import { ProjectItem, ProjectTechStackItem } from '../../../data/projectsData';

interface ProjectVoyageDetailsProps {
  project: ProjectItem;
  currentIndex: number;
  totalProjects: number;
  isMobile: boolean;
}

export const ProjectVoyageDetails: React.FC<ProjectVoyageDetailsProps> = ({
  project,
  currentIndex,
  totalProjects,
  isMobile,
}) => {
  const [selectedTech, setSelectedTech] = useState<ProjectTechStackItem | null>(null);

  const formattedNumber = `${project.doorNumber || `0${currentIndex + 1}`} / 0${totalProjects}`;
  const techList = project.techStack || [];
  const primaryCategory = project.category || 'PROJECT';
  const tagline = project.tagline || project.type || 'Full Stack Application';

  // Compact DNA Steps
  const dnaSteps = [
    { title: 'IDEA', desc: project.problem || 'Identify opportunity' },
    { title: 'DESIGN', desc: project.idea || 'System architecture' },
    { title: 'BUILD', desc: project.build || 'Full stack execution' },
    { title: 'TEST', desc: project.solution || 'Verification & optimization' },
    { title: 'IMPACT', desc: project.result || 'Measurable outcome' },
  ];

  return (
    <div
      id="project-voyage-details"
      className="w-full max-w-2xl mx-auto flex flex-col items-center text-center mt-6 px-4 select-none z-20"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center"
        >
          {/* 1. Project Number & Category Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] font-bold text-cyan-300 uppercase px-3 py-0.5 rounded-full border border-cyan-500/40 bg-slate-900/90 shadow-[0_0_12px_rgba(0,245,255,0.2)]">
              PROJECT {formattedNumber}
            </span>
            <span className="text-slate-600 text-xs">•</span>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">
              {primaryCategory}
            </span>
          </div>

          {/* 2. Project Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase font-sans leading-tight drop-shadow-[0_0_25px_rgba(0,245,255,0.3)] mb-1">
            {project.title}
          </h2>

          {/* 3. Subtitle / Tagline */}
          <div className="text-xs sm:text-sm font-sans text-cyan-300 font-semibold mb-3 tracking-wide">
            {tagline}
          </div>

          {/* 4. Compact Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal text-center mb-5 max-w-xl">
            {project.description}
          </p>

          {/* 5. Interactive Tech Stack Chips */}
          <div className="w-full flex flex-col items-center mb-5">
            <div className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase font-bold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>TECH STACK (CLICK TO INSPECT)</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg">
              {techList.map((tech) => {
                const isSelected = selectedTech?.name === tech.name;
                return (
                  <button
                    key={tech.name}
                    type="button"
                    onClick={() => setSelectedTech(isSelected ? null : tech)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/70 text-cyan-300 shadow-[0_0_15px_rgba(0,245,255,0.4)] scale-105 ring-1 ring-cyan-400'
                        : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-cyan-500/50 hover:text-white'
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: tech.color || '#00f5ff' }}
                    />
                    <span>{tech.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Floating Selected Technology Detail Popup Card */}
            <AnimatePresence>
              {selectedTech && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 w-full max-w-md p-3.5 rounded-xl border border-cyan-400/60 bg-[#041228]/95 backdrop-blur-md shadow-[0_0_20px_rgba(0,245,255,0.25)] relative text-left"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedTech(null)}
                    aria-label="Close tech detail"
                    className="absolute top-2.5 right-2.5 text-slate-400 hover:text-cyan-300 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2 h-2 rounded-full shadow-[0_0_8px_#00f5ff]"
                      style={{ backgroundColor: selectedTech.color || '#00f5ff' }}
                    />
                    <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                      {selectedTech.name}
                    </span>
                    <span className="text-[9px] font-mono text-cyan-400/80 bg-cyan-950/60 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                      ACTIVE NODE
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    Core technology powering {project.title} for reliable performance, scalable processing, and robust feature execution.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 6. Action Buttons (View Live & Source) */}
          <div className="flex items-center justify-center gap-3 w-full max-w-sm mb-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 font-mono bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_18px_rgba(0,245,255,0.4)] transition-all min-h-[44px] cursor-pointer active:scale-95 uppercase tracking-wider"
              >
                <span>VIEW LIVE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white font-mono border border-cyan-500/40 bg-[#041126]/90 hover:bg-slate-900 hover:border-cyan-400 transition-all min-h-[44px] cursor-pointer active:scale-95 uppercase tracking-wider"
              >
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>SOURCE</span>
              </a>
            )}
          </div>

          {/* 7. Compact Project DNA Steps */}
          <div className="w-full pt-4 border-t border-slate-800/80 flex flex-col items-center">
            <span className="text-[9px] font-mono tracking-[0.25em] text-slate-400 uppercase font-bold mb-3">
              PROJECT DNA STEPS
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full max-w-xl">
              {dnaSteps.map((step, idx) => (
                <div
                  key={step.title}
                  className="p-2 rounded-lg border border-slate-800/80 bg-slate-900/60 flex flex-col items-center text-center"
                >
                  <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase">
                    {`0${idx + 1}`} • {step.title}
                  </span>
                  <span className="text-[10px] font-sans text-slate-400 leading-tight mt-0.5 line-clamp-2">
                    {step.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
