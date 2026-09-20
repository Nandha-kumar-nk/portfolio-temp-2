import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../../../data/projectsData';
import { ExternalLink, Maximize2, ShieldCheck, Sparkles, X } from 'lucide-react';

interface CenterScreenshotProps {
  project: ProjectItem;
  isTransitioning?: boolean;
}

export const CenterScreenshot: React.FC<CenterScreenshotProps> = ({
  project,
  isTransitioning = false,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] md:min-h-[420px] flex flex-col items-center justify-center">
        {/* Outer Glow Halo */}
        <div
          className="absolute -inset-2 rounded-2xl opacity-40 blur-xl transition-all duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${project.accentGlow || 'rgba(0, 245, 255, 0.4)'} 0%, transparent 70%)`,
          }}
        />

        {/* Main Screenshot Container Frame */}
        <div className="relative w-full h-full rounded-2xl border border-cyan-500/40 bg-slate-950/80 backdrop-blur-xl overflow-hidden shadow-[0_0_30px_rgba(0,245,255,0.15)] flex flex-col">
          {/* Top Frame Header Bar */}
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-cyan-900/50 bg-slate-900/60 font-mono text-[11px] text-cyan-300">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-slate-400 border-l border-slate-800 pl-2 text-[10px] hidden sm:inline">
                INTERFACE // {project.shortName.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3" />
                <span>LIVE VERIFIED</span>
              </span>

              <button
                onClick={() => setIsZoomed(true)}
                className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer p-1 rounded hover:bg-cyan-950/50"
                title="Full View"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Screenshot Display Image */}
          <div className="relative flex-1 w-full bg-black flex items-center justify-center overflow-hidden group">
            {/* HUD Corner Tech Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />

            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f5ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f5ff08_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-10" />

            {/* Image Transition Switcher */}
            <AnimatePresence mode="wait">
              <motion.img
                key={project.id}
                src={project.image}
                alt={project.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{
                  opacity: isTransitioning ? 0.4 : 1,
                  scale: isTransitioning ? 0.98 : 1,
                }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </AnimatePresence>

            {/* Hover Live Demo Overlay */}
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-30 backdrop-blur-sm">
              <a
                href={project.liveUrl || project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-mono font-bold text-xs hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,245,255,0.6)] cursor-pointer"
              >
                <span>OPEN LIVE DEMO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setIsZoomed(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/90 border border-cyan-500/50 text-cyan-300 font-mono text-xs hover:border-cyan-400 transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>EXPAND</span>
              </button>
            </div>
          </div>

          {/* Bottom Footer Info Bar */}
          <div className="px-3.5 py-2 border-t border-cyan-900/50 bg-slate-950/90 flex items-center justify-between font-mono text-[10px] text-slate-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span className="text-cyan-300 font-semibold">{project.type}</span>
            </div>
            <span className="text-slate-500">{project.tagline}</span>
          </div>
        </div>
      </div>

      {/* Full Image Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden border border-cyan-500/60 bg-slate-950 shadow-[0_0_50px_rgba(0,245,255,0.3)]">
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-900/90 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-950 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full max-h-[85vh] object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
