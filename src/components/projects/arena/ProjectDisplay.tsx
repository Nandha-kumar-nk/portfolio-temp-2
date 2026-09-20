import React, { useState } from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { Car, Shield, FileText, Terminal, BookOpen, ArrowUpRight } from 'lucide-react';
import { PROJECT_THEMES } from './types';

interface ProjectDisplayProps {
  project: ProjectItem;
  position: 'far-left' | 'mid-left' | 'mid-right' | 'far-right';
  onSelect: (projectId: string) => void;
  className?: string;
}

export const ProjectDisplay: React.FC<ProjectDisplayProps> = ({
  project,
  position,
  onSelect,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = PROJECT_THEMES[project.id] || PROJECT_THEMES['swayam-2'];

  // Perspective 3D rotation angles matching the reference image arc
  const transformStyles = {
    'far-left': {
      transform: isHovered
        ? 'perspective(1000px) rotateY(20deg) scale(1.04) translateZ(30px)'
        : 'perspective(1000px) rotateY(25deg) scale(0.92)',
    },
    'mid-left': {
      transform: isHovered
        ? 'perspective(1000px) rotateY(12deg) scale(1.04) translateZ(30px)'
        : 'perspective(1000px) rotateY(16deg) scale(0.95)',
    },
    'mid-right': {
      transform: isHovered
        ? 'perspective(1000px) rotateY(-12deg) scale(1.04) translateZ(30px)'
        : 'perspective(1000px) rotateY(-16deg) scale(0.95)',
    },
    'far-right': {
      transform: isHovered
        ? 'perspective(1000px) rotateY(-20deg) scale(1.04) translateZ(30px)'
        : 'perspective(1000px) rotateY(-25deg) scale(0.92)',
    },
  }[position];

  // Render authentic preview graphic according to project type
  const renderPreviewGraphic = () => {
    switch (project.id) {
      case 'speed-taxi':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#0b162c] to-[#040814] flex flex-col justify-between p-2 overflow-hidden">
            <div className="flex items-center justify-between text-[8px] font-mono text-sky-400">
              <span>GPS DISPATCH</span>
              <span>LIVE</span>
            </div>
            {/* Dark stylized car on road graphic */}
            <div className="relative my-auto flex items-center justify-center">
              <div className="w-16 h-10 rounded bg-sky-950/60 border border-sky-500/40 flex items-center justify-center text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.3)]">
                <Car className="w-6 h-6 text-sky-400" />
              </div>
            </div>
            <div className="text-[7.5px] font-mono text-slate-400 truncate">
              Dynamic Fare &bull; Fast Routing
            </div>
          </div>
        );
      case 'wildlife-ai':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#06170d] to-[#030a05] flex flex-col justify-between p-2 overflow-hidden">
            <div className="flex items-center justify-between text-[8px] font-mono text-emerald-400">
              <span>YOLOv8 DETECT</span>
              <span>98.4%</span>
            </div>
            {/* Elephant in mist graphic */}
            <div className="relative my-auto flex items-center justify-center">
              <div className="w-16 h-10 rounded bg-emerald-950/60 border-2 border-emerald-400/80 flex items-center justify-center text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div className="text-[7.5px] font-mono text-emerald-300/80 truncate">
              Safe Corridor &bull; Edge Mesh
            </div>
          </div>
        );
      case 'resume-forge':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#181132] to-[#0c081c] flex flex-col justify-between p-2 overflow-hidden">
            <div className="flex items-center justify-between text-[8px] font-mono text-purple-400">
              <span>ATS PARSER</span>
              <span>94/100</span>
            </div>
            <div className="relative my-auto flex items-center justify-center">
              <div className="w-16 h-10 rounded bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(192,132,252,0.3)]">
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div className="text-[7.5px] font-mono text-purple-300/80 truncate">
              Instant PDF &bull; Live Preview
            </div>
          </div>
        );
      case 'nk-mern-cli':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#07111e] to-[#040810] flex flex-col justify-between p-2 overflow-hidden font-mono">
            <div className="flex items-center justify-between text-[8px] text-cyan-400">
              <span>npx nk-mern-cli</span>
              <span>v10.8</span>
            </div>
            <div className="my-auto space-y-0.5 text-[7px] text-left pl-1">
              <div className="text-emerald-400">&gt; React 19</div>
              <div className="text-emerald-400">&gt; Express REST</div>
              <div className="text-cyan-400">&gt; MongoDB</div>
            </div>
            <div className="text-[7.5px] text-emerald-400 truncate">
              ✔ Scaffolding Ready
            </div>
          </div>
        );
      default:
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#0d1c38] to-[#060e20] flex flex-col justify-between p-2">
            <div className="text-[8px] font-mono text-cyan-400">SWAYAM 2.0</div>
            <BookOpen className="w-5 h-5 text-cyan-400 self-center my-auto" />
            <div className="text-[7.5px] text-slate-400">Full Stack Campus</div>
          </div>
        );
    }
  };

  return (
    <div
      id={`project-display-${project.id}`}
      onClick={() => onSelect(project.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative w-36 sm:w-44 lg:w-52 aspect-[16/11] rounded-xl p-1.5 sm:p-2 cursor-pointer transition-all duration-500 ease-out select-none ${className}`}
      style={{
        ...transformStyles,
        background: isHovered
          ? 'linear-gradient(135deg, rgba(14,24,42,0.92) 0%, rgba(6,12,24,0.96) 100%)'
          : 'linear-gradient(135deg, rgba(8,16,30,0.85) 0%, rgba(4,8,18,0.92) 100%)',
        border: `1.5px solid ${isHovered ? theme.primary : 'rgba(56, 189, 248, 0.25)'}`,
        boxShadow: isHovered
          ? `0 15px 35px rgba(0,0,0,0.85), 0 0 25px ${theme.glow}`
          : '0 10px 25px rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Glow highlight on hover */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${theme.glow} 0%, transparent 70%)`,
          opacity: isHovered ? 0.35 : 0,
        }}
      />

      {/* Screen Header Info */}
      <div className="relative z-10 flex items-center justify-between px-1 mb-1 text-[9px] font-mono">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className="px-1.5 py-0.2 rounded font-bold text-[8.5px]"
            style={{
              backgroundColor: 'rgba(0, 245, 255, 0.15)',
              color: theme.primary,
              border: `1px solid ${theme.primary}`,
            }}
          >
            {project.doorNumber}
          </span>
          <span className="font-extrabold text-white text-[10px] tracking-wide uppercase truncate">
            {project.title}
          </span>
        </div>

        <ArrowUpRight
          className={`w-3 h-3 transition-transform duration-300 shrink-0 ${
            isHovered ? 'translate-x-0.5 -translate-y-0.5 text-cyan-300' : 'text-slate-500'
          }`}
        />
      </div>

      {/* Category Subtitle */}
      <div className="relative z-10 text-[8px] font-mono font-medium text-slate-400 uppercase tracking-wider px-1 mb-1 truncate">
        {project.category}
      </div>

      {/* Screen Preview Canvas */}
      <div className="relative w-full h-[calc(100%-2.5rem)] rounded-lg overflow-hidden border border-slate-800">
        {renderPreviewGraphic()}

        {/* Diagonal glass glare */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent" />
      </div>

      {/* Ground shadow */}
      <div
        className="w-full h-4 -mb-2 rounded-full bg-black/80 blur-md pointer-events-none"
        style={{ transform: 'scaleY(0.3)' }}
      />
    </div>
  );
};
