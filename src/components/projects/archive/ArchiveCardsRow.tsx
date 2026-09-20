import React from 'react';
import { motion } from 'framer-motion';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectScreenshotFrame } from '../ProjectScreenshotFrame';
import { ExternalLink, Layers, FolderOpen } from 'lucide-react';

interface ArchiveCardsRowProps {
  projects: ProjectItem[];
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
  isOpen: boolean;
}

export const ArchiveCardsRow: React.FC<ArchiveCardsRowProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  isOpen,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 my-4 z-20 font-mono">
      {/* Desktop / Laptop 5-Column Horizontal Archive Grid */}
      <div className="hidden md:grid md:grid-cols-5 gap-3 lg:gap-4 items-stretch">
        {projects.map((proj, idx) => {
          const isSelected = proj.id === selectedProjectId;
          const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

          return (
            <motion.button
              key={proj.id}
              onClick={() => onSelectProject(proj.id)}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`relative flex flex-col justify-between p-3.5 rounded-2xl border text-left transition-all duration-300 backdrop-blur-xl overflow-hidden cursor-pointer group ${
                isSelected && isOpen
                  ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_30px_rgba(0,245,255,0.35)] ring-1 ring-cyan-400/50 scale-[1.02] z-10'
                  : 'bg-slate-950/70 border-cyan-900/40 text-slate-300 hover:border-cyan-500/80 hover:bg-slate-900/80 hover:text-white hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]'
              }`}
            >
              {/* Corner Tech Accents */}
              <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-cyan-400/60 pointer-events-none" />
              <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-cyan-400/60 pointer-events-none" />
              <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-cyan-400/60 pointer-events-none" />
              <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-cyan-400/60 pointer-events-none" />

              {/* Light Sweep Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

              {/* Card Header: Project Number & Badge */}
              <div className="flex items-center justify-between mb-2 z-10">
                <span
                  className={`text-xs font-bold transition-colors ${
                    isSelected && isOpen
                      ? 'text-cyan-400 drop-shadow-[0_0_8px_#00f5ff]'
                      : 'text-slate-500 group-hover:text-cyan-400'
                  }`}
                >
                  {numStr}
                </span>

                <span className="text-[9px] uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded-full font-mono">
                  {proj.shortName}
                </span>
              </div>

              {/* Screenshot Preview Box */}
              <div className="relative w-full rounded-xl overflow-hidden border border-cyan-900/60 my-1 bg-black group-hover:border-cyan-400/80 transition-colors">
                <ProjectScreenshotFrame
                  project={proj}
                  className="w-full transform transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Card Bottom Info */}
              <div className="mt-2.5 z-10">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-xs font-extrabold uppercase truncate transition-colors ${
                      isSelected && isOpen ? 'text-cyan-300' : 'text-slate-200 group-hover:text-cyan-200'
                    }`}
                  >
                    {proj.title}
                  </h3>
                  <FolderOpen className="w-3.5 h-3.5 text-cyan-400/70 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {proj.categoryName}
                </p>
              </div>

              {/* Active Glow Line */}
              {isSelected && isOpen && (
                <motion.div
                  layoutId="activeBarHorizontal"
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-cyan-400 shadow-[0_0_12px_rgba(0,245,255,0.9)]"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Mobile & Tablet Compact Horizontal Archive Selector Bar */}
      <div className="md:hidden flex gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x snap-mandatory">
        {projects.map((proj, idx) => {
          const isSelected = proj.id === selectedProjectId;
          const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

          return (
            <button
              key={proj.id}
              onClick={() => onSelectProject(proj.id)}
              className={`snap-center flex items-center gap-2.5 p-2.5 rounded-xl border shrink-0 transition-all cursor-pointer font-mono text-left max-w-[240px] ${
                isSelected && isOpen
                  ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_18px_rgba(0,245,255,0.35)] ring-1 ring-cyan-400'
                  : 'bg-slate-950/70 border-cyan-900/40 text-slate-400'
              }`}
            >
              <div className="w-12 h-10 rounded-lg overflow-hidden border border-cyan-800 shrink-0 bg-black">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-cyan-400">
                    {numStr}
                  </span>
                  <span className="text-xs font-bold uppercase text-slate-200 truncate">
                    {proj.shortName}
                  </span>
                </div>
                <p className="text-[9px] text-slate-400 truncate mt-0.5">
                  {proj.categoryName}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
