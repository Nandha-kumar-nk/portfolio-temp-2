import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { PROJECT_ASSETS } from '../cube/projectAssets';
import { Maximize2, ExternalLink, Github } from 'lucide-react';

interface HolographicArtifactProps {
  project: ProjectItem;
  onOpenFullscreen?: () => void;
  isDissolving?: boolean;
}

export const HolographicArtifact: React.FC<HolographicArtifactProps> = ({
  project,
  onOpenFullscreen,
  isDissolving = false,
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const asset = PROJECT_ASSETS[project.id];
  const imgSrc =
    asset?.dataUrl ||
    project.image ||
    project.screenshot ||
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1280&auto=format&fit=crop';

  const accent = project.accentColor || '#00f5ff';

  // Subtle pointer parallax limited to 3-5 degrees maximum (keeps screenshot readable)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setRotate({
      x: (-y / rect.height) * 4,
      y: (x / rect.width) * 4,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="relative flex items-center justify-center select-none perspective-1000 my-2">
      {/* Soft Radial Ambient Glow in Universe Background */}
      <div
        className="absolute inset-0 rounded-full filter blur-3xl opacity-35 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accent} 0%, rgba(2,8,23,0) 70%)`,
        }}
      />

      {/* Floating Project Card (Exact size target: ~360px-400px wide on desktop, 84vw max on mobile) */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={
          isDissolving
            ? {
                y: -50,
                opacity: 0,
                scale: 1.1,
                filter: 'blur(10px)',
              }
            : {
                y: [-5, 5, -5],
                scale: [0.995, 1.01, 0.995],
                rotateX: rotate.x,
                rotateY: rotate.y,
              }
        }
        transition={
          isDissolving
            ? { duration: 0.45, ease: 'easeIn' }
            : {
                y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
                rotateX: { type: 'spring', stiffness: 180, damping: 22 },
                rotateY: { type: 'spring', stiffness: 180, damping: 22 },
              }
        }
        style={{ transformStyle: 'preserve-3d' }}
        className="relative group w-[84vw] max-w-[340px] sm:w-[320px] md:w-[360px] lg:w-[380px] aspect-[16/10] rounded-xl overflow-hidden bg-slate-950/95 border border-cyan-400/50 shadow-[0_0_25px_rgba(0,245,255,0.3),inset_0_0_15px_rgba(0,245,255,0.12)] backdrop-blur-xl transition-shadow duration-500 cursor-pointer"
        onClick={onOpenFullscreen}
      >
        {/* Minimal Reticle Crosshairs (Futuristic Frame, NO browser toolbar) */}
        <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
        <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-20" />
        <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
        <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-20" />

        {/* Animated Light Sweep Border Accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />

        {/* Screenshot Image Area */}
        <div className="relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center">
          <img
            src={imgSrc}
            alt={project.title}
            className="w-full h-full object-cover object-top filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="eager"
          />

          {/* Holographic Scanline Sweeping Effect */}
          <motion.div
            animate={{ y: ['-100%', '300%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent pointer-events-none z-10"
          />

          {/* Soft Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none z-10" />
        </div>

        {/* Floating Action Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 z-30 backdrop-blur-xs">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenFullscreen?.();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/90 border border-cyan-400 text-cyan-300 font-mono text-xs font-bold shadow-lg hover:bg-cyan-900 transition-all"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>FULL RES ARTIFACT</span>
          </button>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-400 transition-all"
              title="Source Code"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-400 transition-all"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};
