import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { PROJECT_ASSETS } from '../cube/projectAssets';
import { Maximize2, ExternalLink, Github } from 'lucide-react';

interface ProjectArtifactProps {
  project: ProjectItem;
  onOpenFullscreen: () => void;
}

export const ProjectArtifact: React.FC<ProjectArtifactProps> = ({
  project,
  onOpenFullscreen,
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  // Resolve screenshot image or high-definition SVG data URL
  const asset = PROJECT_ASSETS[project.id];
  const imgSrc =
    asset?.dataUrl ||
    project.image ||
    project.screenshot ||
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1280&auto=format&fit=crop';

  const accent = project.accentColor || '#00f5ff';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle parallax tilt (-6 to 6 deg)
    setRotate({
      x: (-y / rect.height) * 10,
      y: (x / rect.width) * 10,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-6 sm:my-10 px-4 perspective-1000 select-none">
      {/* Outer Atmospheric Backdrop Glow */}
      <div
        className="absolute inset-0 rounded-3xl filter blur-3xl opacity-30 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${accent} 0%, rgba(2,8,23,0) 75%)`,
        }}
      />

      {/* Floating 3D Artifact Container */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative group rounded-2xl overflow-hidden border border-cyan-500/40 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-black/95 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,245,255,0.2)] transition-all duration-500"
      >
        {/* Subtle Top Accent Energy Line */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />

        {/* Floating Spatial Badge Overlay */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,0,0,0.5)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>DIMENSIONAL ARTIFACT</span>
        </div>

        {/* Action Controls Bar Top Right */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-black/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-all shadow-md"
              title="View Source Code"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-black/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-all shadow-md"
              title="Launch Live App"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <button
            onClick={onOpenFullscreen}
            className="p-2 rounded-lg bg-cyan-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-900 transition-all shadow-md"
            title="Expand Full Resolution"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Screenshot Image Artifact */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-slate-950 flex items-center justify-center">
          <img
            src={imgSrc}
            alt={project.title}
            className="w-full h-full object-cover object-top filter brightness-105 contrast-105 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            loading="eager"
          />

          {/* Vignette & Corner Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Bottom Caption Bar */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/90 border-t border-slate-800/80">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-cyan-400/90 mt-0.5">
              {project.tagline || project.type}
            </p>
          </div>

          <button
            onClick={onOpenFullscreen}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 font-mono text-xs font-bold hover:bg-cyan-900/60 hover:border-cyan-400 transition-all"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>FULL RESOLUTION ARTIFACT</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
