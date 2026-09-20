import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectScreenshotFrame } from '../ProjectScreenshotFrame';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ChaptersListViewProps {
  projects: ProjectItem[];
  hoveredProjectId: string | null;
  onHoverProject: (projectId: string | null) => void;
  onSelectProject: (projectId: string) => void;
}

export const ChaptersListView: React.FC<ChaptersListViewProps> = ({
  projects,
  hoveredProjectId,
  onHoverProject,
  onSelectProject,
}) => {
  const activeHoveredProject =
    projects.find((p) => p.id === hoveredProjectId) || projects[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-6 z-20 font-mono">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px]">
        {/* LEFT COLUMN: Large Editorial Typography Chapter List (~55% width / 7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center gap-4 sm:gap-6">
          {projects.map((proj, idx) => {
            const isHovered = proj.id === hoveredProjectId;
            const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

            return (
              <motion.div
                key={proj.id}
                onMouseEnter={() => onHoverProject(proj.id)}
                onMouseLeave={() => onHoverProject(null)}
                onClick={() => onSelectProject(proj.id)}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={`group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isHovered
                    ? 'bg-slate-900/90 border-cyan-400/90 shadow-[0_0_35px_rgba(0,245,255,0.25)] ring-1 ring-cyan-400/50'
                    : 'bg-slate-950/60 border-cyan-900/30 text-slate-400 hover:border-cyan-600/60'
                }`}
              >
                {/* Thin Cyan Focus Line on Left when Hovered */}
                {isHovered && (
                  <motion.div
                    layoutId="activeFocusLine"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 via-sky-300 to-cyan-500 shadow-[0_0_15px_#00f5ff]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Left Content: Number + Title + Category Tagline */}
                <div className="flex items-baseline gap-4 sm:gap-6 min-w-0 pr-4">
                  {/* Chapter Number */}
                  <span
                    className={`text-xl sm:text-2xl font-black transition-colors ${
                      isHovered
                        ? 'text-cyan-400 drop-shadow-[0_0_12px_#00f5ff]'
                        : 'text-slate-600 group-hover:text-cyan-400/80'
                    }`}
                  >
                    {numStr}
                  </span>

                  <div className="min-w-0">
                    {/* Project Title */}
                    <h2
                      className={`text-xl sm:text-2xl md:text-3xl font-black tracking-wider uppercase truncate transition-colors ${
                        isHovered
                          ? 'text-white drop-shadow-[0_0_15px_rgba(0,245,255,0.3)]'
                          : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {proj.title}
                    </h2>

                    {/* Category / Subtitle */}
                    <p
                      className={`text-xs font-semibold tracking-widest uppercase truncate mt-0.5 transition-colors ${
                        isHovered ? 'text-cyan-300' : 'text-slate-500'
                      }`}
                    >
                      {proj.category} — "{proj.tagline}"
                    </p>
                  </div>
                </div>

                {/* Right Arrow Action Icon */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all ${
                    isHovered
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(0,245,255,0.8)] scale-110'
                      : 'bg-slate-900 border-cyan-900/60 text-cyan-400 opacity-60 group-hover:opacity-100'
                  }`}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Floating Editorial Screenshot Preview Frame (~45% width / 5 cols) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center h-full min-h-[420px]">
          <div className="relative w-full h-[400px] rounded-2xl border border-cyan-500/40 bg-slate-950/80 backdrop-blur-2xl p-2 shadow-[0_0_40px_rgba(0,245,255,0.2)] overflow-hidden group">
            {/* Corner Tech Accents */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 z-30 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 z-30 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 z-30 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 z-30 pointer-events-none" />

            {/* Top Status Header */}
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-cyan-900/60 bg-slate-900/90 text-[10px] text-cyan-300 z-20">
              <span className="flex items-center gap-1.5 font-bold tracking-widest text-cyan-400">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                CHAPTER PREVIEW // {activeHoveredProject.shortName.toUpperCase()}
              </span>
              <span className="text-slate-400 text-[9px]">
                CLICK TO EXPLORE →
              </span>
            </div>

            {/* Floating Image Preview Container */}
            <div className="relative w-full h-[350px] bg-black rounded-xl overflow-hidden mt-1 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHoveredProject.id}
                  initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full cursor-pointer"
                  onClick={() => onSelectProject(activeHoveredProject.id)}
                >
                  <ProjectScreenshotFrame
                    project={activeHoveredProject}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
