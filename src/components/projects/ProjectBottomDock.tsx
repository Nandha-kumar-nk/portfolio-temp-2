import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Building2,
  Trees,
  FileText,
  Terminal,
  Globe2,
} from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectBottomDockProps {
  projects: ProjectItem[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  onPrevProject: () => void;
  onNextProject: () => void;
}

export const ProjectBottomDock: React.FC<ProjectBottomDockProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onPrevProject,
  onNextProject,
}) => {
  // Helper to render visual world type badge and icon
  const getVisualTypeBadge = (type?: string) => {
    const v = (type || 'learning-world').toLowerCase();
    switch (v) {
      case 'learning-world':
      case 'laptop':
      case 'education':
        return { label: 'CAMPUS', icon: GraduationCap };
      case 'smart-city':
      case 'car':
      case 'transportation':
        return { label: 'SMART CITY', icon: Building2 };
      case 'ai-forest':
      case 'brain':
      case 'ai-brain':
      case 'forest-ai':
        return { label: 'AI FOREST', icon: Trees };
      case 'career-document':
      case 'phone':
      case 'resume':
        return { label: 'CAREER DOC', icon: FileText };
      case 'developer-system':
      case 'terminal':
      case 'developer-tool':
        return { label: 'DEV SYSTEM', icon: Terminal };
      default:
        return { label: 'ATLAS WORLD', icon: Globe2 };
    }
  };

  return (
    <div
      id="project-bottom-dock"
      className="relative z-30 flex items-center justify-center pointer-events-auto select-none"
    >
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/85 border border-cyan-500/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_20px_rgba(0,245,255,0.15)] max-w-full overflow-hidden">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={onPrevProject}
          className="w-8 h-10 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400 text-cyan-300 hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer flex-shrink-0"
          aria-label="Previous Project"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Project Dock Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5">
          {projects.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            const { label, icon: Icon } = getVisualTypeBadge(proj.visualType);
            const accent = proj.accentColor || '#00f5ff';

            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => onSelectProject(proj.id)}
                className={`flex-shrink-0 min-h-[42px] px-3 py-1.5 rounded-xl flex items-center gap-2 transition-all duration-300 border cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_18px_rgba(0,245,255,0.4)] scale-[1.02]'
                    : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 hover:border-cyan-500/30'
                }`}
              >
                {/* Visual Type Tag [ LAPTOP ], [ CAR ], etc. */}
                <div
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold tracking-wider ${
                    isSelected
                      ? 'bg-cyan-400/20 text-cyan-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>[{label}]</span>
                </div>

                {/* Project Title */}
                <span
                  className={`text-xs font-bold tracking-wide whitespace-nowrap ${
                    isSelected ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {proj.shortName || proj.title}
                </span>

                {/* Active Glowing Dot Indicator */}
                {isSelected && (
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      backgroundColor: accent,
                      boxShadow: `0 0 6px ${accent}`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={onNextProject}
          className="w-8 h-10 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400 text-cyan-300 hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer flex-shrink-0"
          aria-label="Next Project"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
