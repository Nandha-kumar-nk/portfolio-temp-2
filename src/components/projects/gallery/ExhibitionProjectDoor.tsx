import React from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectDoorVisual } from './ProjectDoorVisual';
import { ArrowUpRight } from 'lucide-react';

interface ExhibitionProjectDoorProps {
  project: ProjectItem;
  isSelected: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (project: ProjectItem) => void;
  style?: React.CSSProperties;
  className?: string;
}

export const ExhibitionProjectDoor: React.FC<ExhibitionProjectDoorProps> = ({
  project,
  isSelected,
  isHovered,
  onHover,
  onSelect,
  style,
  className = '',
}) => {
  return (
    <div
      id={`project-door-${project.id}`}
      style={style}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(project)}
      className={`group relative flex flex-col justify-between rounded-2xl cursor-pointer transition-all duration-500 transform-gpu select-none ${
        isHovered
          ? 'scale-[1.03] -translate-y-2 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(0,245,255,0.3)]'
          : isSelected
          ? 'scale-[1.01] -translate-y-1 z-20 shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(0,245,255,0.2)]'
          : 'scale-100 opacity-90 hover:opacity-100 z-10 shadow-[0_12px_32px_rgba(0,0,0,0.7)]'
      } ${className}`}
    >
      {/* 1. Outer Architectural Portal Frame with Glass Trims */}
      <div
        className={`absolute inset-0 rounded-2xl transition-colors duration-500 pointer-events-none ${
          isHovered
            ? 'bg-slate-950/90 border border-cyan-400/90'
            : isSelected
            ? 'bg-slate-950/85 border border-cyan-500/60'
            : 'bg-slate-950/75 border border-slate-800/80 hover:border-slate-700'
        }`}
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      />

      {/* 2. Top Portal Header Bar */}
      <div className="relative z-10 px-4 pt-3.5 pb-2 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest font-bold text-cyan-400">
            PORTAL // {project.doorNumber}
          </span>
        </div>

        <span className="text-[9px] font-mono tracking-wider text-slate-400 uppercase font-semibold px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800">
          {project.category}
        </span>
      </div>

      {/* 3. Door Visual Aperture (Procedural Interactive Canvas) */}
      <div className="relative z-10 px-3.5 py-2 flex-1 min-h-[160px] flex flex-col justify-center">
        <div className="relative w-full h-[180px] rounded-xl overflow-hidden border border-slate-800/90 group-hover:border-cyan-500/40 transition-colors">
          <ProjectDoorVisual project={project} isHovered={isHovered} isActive={isSelected} />

          {/* Holographic aperture overlay reflection */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none" />
        </div>
      </div>

      {/* 4. Door Info & Identity */}
      <div className="relative z-10 px-4 pb-4 pt-1 flex flex-col gap-1.5">
        <div>
          <h3
            className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 ${
              isHovered ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'text-slate-100'
            }`}
          >
            {project.title}
          </h3>
          <p className="text-xs font-mono italic text-cyan-300/90 mt-0.5 font-medium">
            "{project.tagline}"
          </p>
        </div>

        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-sans">
          {project.description}
        </p>

        {/* Enter Prompt Badge */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-400 transition-colors flex items-center gap-1 font-semibold">
            <span>STEP INSIDE</span>
            <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>

          <span className="text-[9px] font-mono text-slate-400">
            [ENTER]
          </span>
        </div>
      </div>

      {/* 5. Floor Reflection / Ground Light Bar */}
      <div
        className={`absolute -bottom-2 left-4 right-4 h-2 rounded-full filter blur-sm transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-80' : isSelected ? 'opacity-50' : 'opacity-20'
        }`}
        style={{
          background: `radial-gradient(circle, ${project.accentColor}, transparent 80%)`,
        }}
      />
    </div>
  );
};
