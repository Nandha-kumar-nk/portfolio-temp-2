import React, { useState } from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { DnaNodeType, DNA_NODES } from '../../../types/projectDna';
import { ProjectRealScreenshot } from '../gallery/ProjectRealScreenshot';
import { ProjectNavigation } from './ProjectNavigation';
import {
  ExternalLink,
  Github,
  ChevronDown,
  AlertCircle,
  Lightbulb,
  Layers,
  Cpu,
  CheckCircle2,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

interface MobileDnaViewProps {
  project: ProjectItem;
  allProjects?: ProjectItem[];
  onSelectProject?: (id: string) => void;
}

export const MobileDnaView: React.FC<MobileDnaViewProps> = ({
  project,
  allProjects,
  onSelectProject,
}) => {
  // Expanded accordion sections on mobile (defaults to 'architecture')
  const [expandedSection, setExpandedSection] = useState<DnaNodeType | null>('problem');

  const toggleSection = (type: DnaNodeType) => {
    setExpandedSection((prev) => (prev === type ? null : type));
  };

  const renderIcon = (type: DnaNodeType) => {
    switch (type) {
      case 'problem':
        return <AlertCircle className="w-4 h-4" />;
      case 'idea':
        return <Lightbulb className="w-4 h-4" />;
      case 'architecture':
        return <Layers className="w-4 h-4" />;
      case 'technology':
        return <Cpu className="w-4 h-4" />;
      case 'features':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'impact':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div
      id="mobile-dna-viewport"
      className="relative w-full px-4 pt-3 pb-16 flex flex-col items-center select-none overflow-x-hidden"
    >
      {/* 1. Mobile Header & Title Hierarchy */}
      <div className="flex flex-col items-center text-center mt-1 mb-3 w-full">
        <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
          EXPLORE HOW I BUILD
        </span>
        <h1 className="text-2xl font-black tracking-wider text-white uppercase font-sans">
          PROJECT DNA
        </h1>

        {/* Minimal Project Navigation Strip */}
        <ProjectNavigation
          currentProject={project}
          allProjects={allProjects}
          onSelectProject={onSelectProject}
          className="mt-2"
        />
      </div>

      {/* 2. Central Physical Digital Artifact Frame */}
      <div className="w-full max-w-sm flex flex-col items-center my-2">
        <div className="text-center mb-2">
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-cyan-400">
            <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>SWAYAM 2.0 • DIGITAL CAMPUS</span>
          </div>
          <p className="text-[11px] text-slate-400 italic mt-0.5">
            &ldquo;{project.tagline}&rdquo;
          </p>
        </div>

        {/* Physical 3D Display Frame */}
        <div
          className="relative w-full rounded-2xl bg-[#090f1d] border border-slate-700/80 p-1.5 shadow-[0_16px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(0,245,255,0.1)]"
          style={{
            transform: 'perspective(800px) rotateX(2deg)',
          }}
        >
          <div className="relative rounded-xl overflow-hidden border border-cyan-950/80">
            <ProjectRealScreenshot project={project} isHero={true} />

            {/* Specular Glare */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 45%, rgba(0,245,255,0.03) 75%, transparent 100%)',
              }}
            />
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-2.5 w-full justify-center mt-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="min-h-[44px] flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 text-xs font-mono font-medium active:scale-95 transition-all cursor-pointer"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>SOURCE</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="min-h-[44px] flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 text-xs font-mono font-bold tracking-wider active:scale-95 transition-all cursor-pointer shadow-[0_0_12px_rgba(0,245,255,0.2)]"
            >
              <span>LIVE DEMO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* 3. Vertical DNA Path Storytelling */}
      <div className="w-full max-w-md mt-6 relative">
        {/* Continuous Animated Vertical DNA Core Line */}
        <div className="absolute left-[23px] top-4 bottom-8 w-[2px] bg-gradient-to-b from-cyan-500/40 via-blue-500/40 to-purple-500/40 pointer-events-none">
          {/* Moving Energy Pulse Dot */}
          <div className="w-2 h-2 -left-[3px] rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff] absolute animate-bounce" />
        </div>

        {/* The 6 Sequential Story Stages */}
        <div className="flex flex-col gap-3.5 relative z-10">
          {DNA_NODES.map((node) => {
            const isExpanded = expandedSection === node.type;

            return (
              <div
                key={node.type}
                className="flex items-start gap-3 w-full"
              >
                {/* Node Beacon (●) */}
                <button
                  type="button"
                  onClick={() => toggleSection(node.type)}
                  className="w-10 h-10 min-w-[40px] rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 border transition-all cursor-pointer shadow-md mt-0.5"
                  style={{
                    borderColor: isExpanded ? node.color : 'rgba(51, 65, 85, 0.8)',
                    backgroundColor: isExpanded ? node.color : '#070c18',
                    color: isExpanded ? '#000000' : node.color,
                    boxShadow: isExpanded ? `0 0 14px ${node.accentGlow}` : undefined,
                  }}
                  aria-label={`Toggle stage ${node.label}`}
                >
                  {node.number}
                </button>

                {/* Interactive Content Card */}
                <div
                  className={`flex-1 rounded-xl border transition-all duration-300 overflow-hidden backdrop-blur-md ${
                    isExpanded
                      ? 'bg-[#091124] border-cyan-400/70 shadow-[0_8px_20px_rgba(0,0,0,0.8)]'
                      : 'bg-[#060a15]/90 border-slate-800/90'
                  }`}
                >
                  {/* Tap header target (>= 44px) */}
                  <button
                    type="button"
                    onClick={() => toggleSection(node.type)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white tracking-wider flex items-center gap-1.5">
                        <span>{node.label}</span>
                        <span className="opacity-80">{renderIcon(node.type)}</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {node.subtitle}
                      </span>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>

                  {/* Expanded Technical Detail Accordion */}
                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-800/80 text-left animate-fadeIn">
                      {/* 01 PROBLEM */}
                      {node.type === 'problem' && (
                        <div className="space-y-2">
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {project.problem ||
                              'Understanding usability gaps in an existing learning platform, including fragmented course navigation and missed assignment deadlines.'}
                          </p>
                          <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/30 text-[11px] text-rose-300 font-mono">
                            Friction: Students missed assignments due to lack of automated notification cadence.
                          </div>
                        </div>
                      )}

                      {/* 02 IDEA */}
                      {node.type === 'idea' && (
                        <div className="space-y-2">
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {project.idea ||
                              'Rebuild and improve the experience with real-time feedback and intelligent notification alerts.'}
                          </p>
                          <div className="p-2 rounded-lg bg-sky-950/40 border border-sky-500/30 text-[11px] text-sky-300 font-mono">
                            Thesis: Unified digital campus combining reactive WebSockets and automated mail triggers.
                          </div>
                        </div>
                      )}

                      {/* 03 ARCHITECTURE */}
                      {node.type === 'architecture' && (
                        <div className="space-y-2">
                          <div className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
                            Full-Stack Pipeline:
                          </div>
                          <div className="space-y-1.5 text-xs font-mono">
                            <div className="p-1.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300">
                              01. React 18 SPA (Interactive Lecture UI)
                            </div>
                            <div className="p-1.5 rounded bg-blue-950/40 border border-blue-500/30 text-blue-300">
                              02. Socket.IO (Real-Time Bi-Directional Event Stream)
                            </div>
                            <div className="p-1.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                              03. Node.js & Express (REST API & JWT Auth)
                            </div>
                            <div className="p-1.5 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300">
                              04. NodeMailer + Cron (Automated Reminders)
                            </div>
                            <div className="p-1.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                              05. MongoDB & Mongoose (Course & User State)
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 04 TECHNOLOGY */}
                      {node.type === 'technology' && (
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech.name}
                                className="px-2 py-1 rounded-md bg-[#050812] border border-slate-700 text-[11px] font-mono text-slate-200 flex items-center gap-1"
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: tech.color || '#00f5ff' }}
                                />
                                {tech.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 05 FEATURES */}
                      {node.type === 'features' && (
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {project.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* 06 IMPACT */}
                      {node.type === 'impact' && (
                        <div className="space-y-2">
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {project.impact ||
                              'Transformed the educational workflow with intuitive course discovery, real-time student-instructor feedback loops, and automated deadline reminders that eliminate missed submissions.'}
                          </p>
                          <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-500/30 text-[11px] text-purple-300 font-mono">
                            Outcome: Zero missed assignment deadlines through automated email triggers.
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
