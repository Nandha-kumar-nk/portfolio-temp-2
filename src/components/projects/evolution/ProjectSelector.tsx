import React from 'react';
import { motion } from 'framer-motion';
import { ProjectItem } from '../../../data/projectsData';
import { Layers, ChevronRight } from 'lucide-react';

interface ProjectSelectorProps {
  projects: ProjectItem[];
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
}) => {
  return (
    <div className="w-full flex flex-col gap-2 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-cyan-900/50">
        <div className="flex items-center gap-2 text-cyan-300 text-xs tracking-wider">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>PROJECT DIRECTORY</span>
        </div>
        <span className="text-[10px] text-slate-400">05 WORLDS</span>
      </div>

      {/* Projects List */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
        {projects.map((proj, idx) => {
          const isSelected = proj.id === selectedProjectId;
          const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

          return (
            <motion.button
              key={proj.id}
              onClick={() => onSelectProject(proj.id)}
              whileHover={{ x: isSelected ? 0 : 3 }}
              className={`relative flex items-center justify-between p-3 rounded-xl border transition-all duration-300 text-left shrink-0 w-[220px] lg:w-full cursor-pointer backdrop-blur-md ${
                isSelected
                  ? 'bg-cyan-950/80 border-cyan-400/90 text-white shadow-[0_0_20px_rgba(0,245,255,0.25)]'
                  : 'bg-slate-950/60 border-cyan-950 text-slate-400 hover:border-cyan-800 hover:bg-slate-900/70 hover:text-slate-200'
              }`}
            >
              {/* Active Indicator Bar */}
              {isSelected && (
                <motion.div
                  layoutId="activeBar"
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-cyan-400 shadow-[0_0_10px_rgba(0,245,255,0.8)]"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}

              <div className="min-w-0 flex-1 pl-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-cyan-400' : 'text-slate-500'
                    }`}
                  >
                    {numStr}
                  </span>
                  <span className="text-xs font-semibold uppercase truncate">
                    {proj.shortName}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {proj.categoryName}
                </p>
              </div>

              <ChevronRight
                className={`w-4 h-4 shrink-0 transition-transform ${
                  isSelected
                    ? 'text-cyan-400 translate-x-0.5'
                    : 'text-slate-600'
                }`}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
