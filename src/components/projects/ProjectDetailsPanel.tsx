import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  Code2,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectDetailsPanelProps {
  project: ProjectItem;
  variant?: 'desktop' | 'mobile-inline';
}

export const ProjectDetailsPanel: React.FC<ProjectDetailsPanelProps> = ({
  project,
  variant = 'desktop',
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Reset image error when project changes
  useEffect(() => {
    setImgError(false);
  }, [project.id]);

  const screenshotUrl = project.screenshot || project.previewImage;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(project.liveDemoUrl || window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Helper to render tech stack icon badge
  const renderTechIcon = (iconName: string) => {
    switch (iconName) {
      case 'mongodb':
        return (
          <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-[10px] text-emerald-400 font-bold">
            🍃
          </div>
        );
      case 'express':
        return (
          <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center text-[9px] text-slate-200 font-mono font-bold">
            EX
          </div>
        );
      case 'react':
        return (
          <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-[10px] text-cyan-300 font-bold animate-spin" style={{ animationDuration: '10s' }}>
            ⚛
          </div>
        );
      case 'node':
        return (
          <div className="w-5 h-5 rounded-full bg-green-950 border border-green-500/50 flex items-center justify-center text-[9px] text-green-300 font-bold font-mono">
            JS
          </div>
        );
      case 'websockets':
        return (
          <div className="w-5 h-5 rounded-full bg-sky-950 border border-sky-500/40 flex items-center justify-center text-[9px] text-sky-300 font-bold">
            ⚡
          </div>
        );
      case 'nodemailer':
        return (
          <div className="w-5 h-5 rounded-full bg-rose-950 border border-rose-500/40 flex items-center justify-center text-[9px] text-rose-300 font-bold">
            ✉
          </div>
        );
      case 'python':
        return (
          <div className="w-5 h-5 rounded-full bg-blue-950 border border-blue-500/40 flex items-center justify-center text-[9px] text-blue-300 font-bold">
            🐍
          </div>
        );
      case 'yolo':
        return (
          <div className="w-5 h-5 rounded-full bg-orange-950 border border-orange-500/40 flex items-center justify-center text-[8px] text-orange-300 font-mono font-bold">
            AI
          </div>
        );
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-[9px] text-cyan-300 font-bold">
            <Code2 className="w-3 h-3" />
          </div>
        );
    }
  };

  // --------------------------------------------------------------------------
  // MOBILE INLINE DETAILS (STACKED BELOW PROJECT WORLD)
  // Strict order requested:
  // PROJECT VISUAL -> PROJECT NAME -> CATEGORY -> DESCRIPTION -> TECH STACK -> KEY FEATURES -> GITHUB / LIVE DEMO
  // --------------------------------------------------------------------------
  if (variant === 'mobile-inline') {
    return (
      <div
        id={`mobile-details-${project.id}`}
        className="w-full max-w-md mx-auto rounded-2xl bg-slate-950/85 border border-cyan-500/40 backdrop-blur-xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_20px_rgba(0,245,255,0.15)] select-none text-left"
      >
        {/* 1. PROJECT NAME */}
        <h3 className="text-xl font-black text-white tracking-wide">
          {project.title}
        </h3>

        {/* 2. PROJECT TYPE */}
        <p
          className="text-xs font-semibold tracking-wider uppercase mt-1"
          style={{ color: project.themeColor }}
        >
          {project.type || project.categoryName}
        </p>

        {/* 3. DESCRIPTION */}
        <p className="text-xs text-slate-300 leading-relaxed font-normal mt-3 pb-3 border-b border-slate-800/80">
          {project.description}
        </p>

        {/* 4. TECH STACK */}
        <div className="mt-4">
          <h4 className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest font-mono mb-2.5">
            TECH STACK
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {project.techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-900/70 border border-slate-800"
              >
                {renderTechIcon(tech.icon)}
                <span className="text-[11px] text-slate-200 font-medium truncate">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. KEY FEATURES */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <h4 className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest font-mono mb-2">
            KEY FEATURES
          </h4>
          <ul className="space-y-1.5">
            {(project.features || project.keyFeatures).map((feat) => (
              <li
                key={feat}
                className="flex items-start gap-2 text-xs text-slate-300"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: project.themeColor }}
                />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 6. GITHUB / LIVE DEMO ACTION BUTTONS (44px min touch height) */}
        <div className="grid grid-cols-2 gap-3 mt-5 pt-3 border-t border-cyan-950">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-3 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-white flex items-center justify-center gap-2 text-xs font-bold tracking-wider transition-all active:scale-95"
          >
            <Github className="w-4 h-4 text-slate-300" />
            <span>VIEW CODE</span>
          </a>

          <a
            href={project.liveUrl || project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-3 rounded-xl bg-cyan-950/70 border border-cyan-400 hover:bg-cyan-900/80 text-cyan-300 hover:text-white flex items-center justify-center gap-2 text-xs font-bold tracking-wider shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all active:scale-95"
          >
            <ExternalLink className="w-4 h-4" />
            <span>LIVE DEMO</span>
          </a>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // DESKTOP RIGHT DETAILS PANEL (280–340px)
  // Exact layout from the reference image
  // --------------------------------------------------------------------------
  return (
    <aside
      id="desktop-project-details-panel"
      className="w-[280px] xl:w-[320px] 2xl:w-[340px] rounded-2xl bg-slate-950/75 border border-cyan-500/40 backdrop-blur-xl p-5 xl:p-6 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_24px_rgba(0,245,255,0.15)] select-none z-30 overflow-y-auto max-h-[calc(100vh-140px)] transition-all duration-300"
    >
      <div>
        {/* Project Visual Preview / Screenshot */}
        <div className="relative w-full h-28 xl:h-32 rounded-xl bg-slate-900/80 border border-cyan-500/30 overflow-hidden mb-4 group flex items-center justify-center shadow-inner">
          {screenshotUrl && !imgError ? (
            <img
              src={screenshotUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <>
              {/* Subtle Cyber Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#082f4915_1px,transparent_1px),linear-gradient(to_bottom,#082f4915_1px,transparent_1px)] bg-[size:16px_16px]" />

              {/* Hologram Light Cone */}
              <div
                className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity"
                style={{
                  background: `radial-gradient(circle at center, ${project.accentGlow} 0%, transparent 70%)`,
                }}
              />

              {/* Mini Holographic wireframe placeholder */}
              <div className="relative z-10 w-4/5 h-4/5 rounded-lg bg-slate-950/90 border border-slate-700/60 p-2 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="text-[8px] font-mono text-cyan-300">
                      {project.shortName.toLowerCase()}.app
                    </span>
                  </div>
                  <span className="text-[7px] text-slate-400 font-mono">v2.4</span>
                </div>
                <div className="space-y-1">
                  <div className="w-full h-1.5 bg-cyan-950/60 rounded border border-cyan-500/20" />
                  <div className="grid grid-cols-2 gap-1">
                    <div className="h-4 bg-slate-900 rounded" />
                    <div className="h-4 bg-slate-900 rounded" />
                  </div>
                </div>
                <div className="flex justify-between items-center text-[7px] text-slate-400 pt-1">
                  <span className="text-cyan-400">● LIVE READY</span>
                  <span>COMMAND CENTER</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-xl xl:text-2xl font-black text-white tracking-wide">
          {project.title}
        </h3>

        {/* Project Type */}
        <p
          className="text-xs font-semibold tracking-wider uppercase mt-1"
          style={{ color: project.themeColor }}
        >
          {project.type || project.categoryName}
        </p>

        {/* Narrative Description */}
        <p className="text-xs xl:text-[13px] text-slate-300 leading-relaxed font-normal mt-3 pb-3 border-b border-cyan-950/80">
          {project.description}
        </p>

        {/* Tech Stack Icons Grid */}
        <div className="mt-4">
          <h4 className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest font-mono mb-2.5">
            TECH STACK
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {project.techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 transition-colors group/tech"
              >
                {renderTechIcon(tech.icon)}
                <span className="text-[10px] text-slate-300 font-medium mt-1 truncate max-w-full text-center group-hover/tech:text-white">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-4 pt-3 border-t border-cyan-950/80">
          <h4 className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest font-mono mb-2">
            KEY FEATURES
          </h4>
          <ul className="space-y-1.5">
            {(project.features || project.keyFeatures).map((feat) => (
              <li
                key={feat}
                className="flex items-start gap-2 text-xs xl:text-[12.5px] text-slate-300"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: project.themeColor }}
                />
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* GitHub and Live Demo Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-cyan-900/40">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[40px] px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-white flex items-center justify-center gap-2 text-xs font-bold tracking-wider transition-all hover:bg-slate-800 active:scale-95"
        >
          <Github className="w-4 h-4 text-slate-300" />
          <span>VIEW CODE</span>
        </a>

        <a
          href={project.liveUrl || project.liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[40px] px-3 py-2 rounded-xl bg-cyan-950/60 border border-cyan-400 hover:bg-cyan-900/80 text-cyan-300 hover:text-white flex items-center justify-center gap-2 text-xs font-bold tracking-wider shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all active:scale-95"
        >
          <ExternalLink className="w-4 h-4" />
          <span>LIVE DEMO</span>
        </a>
      </div>
    </aside>
  );
};
