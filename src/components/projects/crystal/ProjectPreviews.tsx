import React from 'react';
import { ProjectItem } from '../../../data/projectsData';

interface ProjectPreviewsProps {
  projects: ProjectItem[];
  selectedIndex: number;
  onSelectProject: (index: number) => void;
  disabled?: boolean;
  phase?: number; // 0=IDLE, 1=FOCUS, 2=FRACTURE, 3=FLOW, 4=REBUILD, 5=MATERIALIZE
}

export const ProjectPreviews: React.FC<ProjectPreviewsProps> = ({
  projects,
  selectedIndex,
  onSelectProject,
  disabled = false,
  phase = 0,
}) => {
  const surroundingProjects = React.useMemo(() => {
    return projects
      .map((proj, idx) => ({ proj, originalIndex: idx }))
      .filter((item) => item.originalIndex !== selectedIndex);
  }, [projects, selectedIndex]);

  // Symmetrical 4-point constellation framing the central crystal on Desktop (>=1200px)
  const desktopPositions = [
    {
      // 1. Top-Left
      className: 'hidden xl:flex absolute left-4 2xl:left-8 top-3 [transform:perspective(850px)_rotateY(14deg)_rotateX(6deg)]',
      hoverTransform: 'hover:[transform:perspective(850px)_rotateY(0deg)_rotateX(0deg)_scale(1.04)]',
    },
    {
      // 2. Top-Right
      className: 'hidden xl:flex absolute right-4 2xl:right-8 top-3 [transform:perspective(850px)_rotateY(-14deg)_rotateX(6deg)]',
      hoverTransform: 'hover:[transform:perspective(850px)_rotateY(0deg)_rotateX(0deg)_scale(1.04)]',
    },
    {
      // 3. Bottom-Left
      className: 'hidden xl:flex absolute left-4 2xl:left-8 bottom-3 [transform:perspective(850px)_rotateY(14deg)_rotateX(-6deg)]',
      hoverTransform: 'hover:[transform:perspective(850px)_rotateY(0deg)_rotateX(0deg)_scale(1.04)]',
    },
    {
      // 4. Bottom-Right
      className: 'hidden xl:flex absolute right-4 2xl:right-8 bottom-3 [transform:perspective(850px)_rotateY(-14deg)_rotateX(-6deg)]',
      hoverTransform: 'hover:[transform:perspective(850px)_rotateY(0deg)_rotateX(0deg)_scale(1.04)]',
    },
  ];

  const isMoving = phase === 3 || phase === 4;

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP (>=1200px): 4 COMPACT SURROUNDING PREVIEWS FRAMING THE CRYSTAL    */}
      {/* ========================================================================= */}
      {surroundingProjects.slice(0, 4).map((item, i) => {
        const config = desktopPositions[i];
        if (!config) return null;

        return (
          <div
            key={item.proj.id}
            className={`${config.className} z-20 transition-all duration-500 ease-out ${
              isMoving ? 'scale-95 opacity-30 translate-y-1' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <FloatingPreviewCard
              project={item.proj}
              originalIndex={item.originalIndex}
              onClick={() => !disabled && onSelectProject(item.originalIndex)}
              disabled={disabled}
              hoverTransform={config.hoverTransform}
            />
          </div>
        );
      })}

      {/* ========================================================================= */}
      {/* TABLET (768px-1199px): ONLY 1-2 SURROUNDING PREVIEWS                      */}
      {/* ========================================================================= */}
      <div className="hidden md:flex xl:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 opacity-60 hover:opacity-100 transition-all duration-300">
        {surroundingProjects[0] && (
          <FloatingPreviewCard
            project={surroundingProjects[0].proj}
            originalIndex={surroundingProjects[0].originalIndex}
            onClick={() => !disabled && onSelectProject(surroundingProjects[0].originalIndex)}
            disabled={disabled}
            compact
          />
        )}
      </div>

      <div className="hidden md:flex xl:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-60 hover:opacity-100 transition-all duration-300">
        {surroundingProjects[1] && (
          <FloatingPreviewCard
            project={surroundingProjects[1].proj}
            originalIndex={surroundingProjects[1].originalIndex}
            onClick={() => !disabled && onSelectProject(surroundingProjects[1].originalIndex)}
            disabled={disabled}
            compact
          />
        )}
      </div>
      {/* (Mobile: Completely hidden as strictly mandated) */}
    </>
  );
};

interface FloatingPreviewCardProps {
  project: ProjectItem;
  originalIndex: number;
  onClick: () => void;
  disabled: boolean;
  compact?: boolean;
  hoverTransform?: string;
}

const FloatingPreviewCard: React.FC<FloatingPreviewCardProps> = ({
  project,
  originalIndex,
  onClick,
  disabled,
  compact = false,
  hoverTransform = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group relative ${
        compact ? 'w-30 p-1.5' : 'w-36 2xl:w-40 p-2'
      } rounded-xl border border-slate-800/80 bg-slate-950/80 backdrop-blur-md hover:border-cyan-400/80 hover:bg-slate-900/90 shadow-[0_6px_20px_rgba(0,0,0,0.6)] cursor-pointer text-left transition-all duration-300 select-none ${hoverTransform} disabled:pointer-events-none`}
    >
      <div className="relative w-full h-12 2xl:h-14 rounded-lg overflow-hidden border border-slate-800 group-hover:border-cyan-400/50 transition-colors bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-85 group-hover:brightness-100"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
        <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-slate-950/85 border border-slate-700 text-[9px] font-mono font-bold text-cyan-400">
          {project.doorNumber || `0${originalIndex + 1}`}
        </span>
      </div>

      <div className="mt-1 flex flex-col">
        <span className="text-[10.5px] 2xl:text-[11px] font-bold text-white uppercase tracking-wider truncate group-hover:text-cyan-300 transition-colors">
          {project.shortName || project.title}
        </span>
        <span className="text-[8.5px] 2xl:text-[9px] font-mono text-cyan-400/90 truncate">
          {project.category}
        </span>
      </div>
    </button>
  );
};
