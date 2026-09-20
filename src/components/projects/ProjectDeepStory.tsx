import React from 'react';
import { ProjectItem } from '../../data/projectsData';
import { Layers, Terminal, CheckCircle2, Award, ArrowDown, MousePointer } from 'lucide-react';

interface ProjectDeepStoryProps {
  project: ProjectItem;
}

export const ProjectDeepStory: React.FC<ProjectDeepStoryProps> = ({ project }) => {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 flex flex-col items-center">
      {/* Visual Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-[11px] font-mono tracking-widest uppercase mb-2">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>IN-DEPTH ENGINEERING ARCHIVE</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-sans">
          HOW <span className="text-cyan-400">{project.title}</span> WAS BUILT
        </h3>
        <p className="text-xs sm:text-sm font-mono text-slate-400 uppercase mt-1">
          Full-stack system architecture, technologies, and verified capabilities
        </p>
      </div>

      {/* 1. Architecture Flow Pipeline */}
      {project.architectureSteps && project.architectureSteps.length > 0 && (
        <div className="w-full mb-12">
          <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>03 // SYSTEM ARCHITECTURE &amp; DATA PIPELINE</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {project.architectureSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between hover:border-cyan-500/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-cyan-400">STEP {step.step}</span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: step.color || '#00f5ff' }} />
                  </div>
                  <div className="text-sm font-bold text-white mb-0.5">{step.layer}</div>
                  <div className="text-xs font-mono font-semibold text-cyan-300 mb-2">{step.tech}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{step.description}</p>
                </div>
                {idx < (project.architectureSteps?.length || 0) - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-cyan-400 font-black text-xs">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Tech Stack & Features 2-Column Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Tech Stack Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>04 // ENGINEERED TECHNOLOGY STACK</span>
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {project.techStack.map((tech) => (
              <div
                key={tech.name}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs font-mono font-semibold text-slate-200 hover:border-cyan-400/60 transition-colors"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tech.color || '#00f5ff' }} />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Checklist */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>05 // VERIFIED KEY CAPABILITIES</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Real Impact & Measurable Outcome Banner */}
      <div className="w-full p-6 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-950 to-slate-950 border border-cyan-500/30 mb-16 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-cyan-900/60 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shrink-0 shadow-[0_0_15px_rgba(0,245,255,0.3)]">
          <Award className="w-6 h-6 text-cyan-400" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
            06 // REAL-WORLD IMPACT
          </span>
          <p className="mt-1 text-sm sm:text-base text-slate-200 leading-relaxed font-sans font-medium">
            {project.impact || project.result}
          </p>
        </div>
      </div>

      {/* FOOTER BAR (Matching Visual Reference Bottom) */}
      <footer className="w-full pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
        <div className="text-center sm:text-left">
          <span>© 2024 Nandhakumar Universe</span>
          <span className="mx-2 text-slate-700">•</span>
          <span className="text-slate-400">Building Ideas. Creating Impact.</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <MousePointer className="w-3.5 h-3.5 text-cyan-400" />
          <span>Scroll to explore the complete story</span>
          <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce ml-0.5" />
        </div>

        <div className="text-center sm:text-right text-slate-400">
          <span>Designed &amp; Developed by Nandhakumar</span>
        </div>
      </footer>
    </div>
  );
};
