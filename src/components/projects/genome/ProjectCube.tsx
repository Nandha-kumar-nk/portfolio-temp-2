import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RotateCcw,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Github,
  Layers,
  Code,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { GenomeProject } from './genomeData';

export interface ProjectCubeProps {
  project: GenomeProject;
  onSelectTech?: (techName: string) => void;
  selectedTech?: string | null;
}

export const ProjectCube: React.FC<ProjectCubeProps> = ({
  project,
  onSelectTech,
  selectedTech,
}) => {
  // Active Face State: 'FRONT' | 'RIGHT' | 'TOP' | 'LEFT' | 'BACK'
  const [activeFace, setActiveFace] = useState<'FRONT' | 'RIGHT' | 'TOP' | 'LEFT'>('FRONT');
  
  // Custom rotation angles (degrees)
  const [rotation, setRotation] = useState({ x: -10, y: 15 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Target rotation angles for face snapping
  const faceAngles: Record<'FRONT' | 'RIGHT' | 'TOP' | 'LEFT', { x: number; y: number }> = {
    FRONT: { x: -8, y: 12 },
    RIGHT: { x: -10, y: -78 },
    TOP: { x: 70, y: 0 },
    LEFT: { x: -10, y: 102 },
  };

  // Reset face rotation when active project changes
  useEffect(() => {
    setActiveFace('FRONT');
    setRotation(faceAngles.FRONT);
    setImgLoaded(false);
    setImgError(false);
  }, [project.id]);

  // Snap to face angle when face control clicked
  const handleSnapToFace = (face: 'FRONT' | 'RIGHT' | 'TOP' | 'LEFT') => {
    setActiveFace(face);
    setRotation(faceAngles[face]);
  };

  // Mouse / Touch Drag Rotation Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotation((prev) => ({
      x: Math.max(-65, Math.min(65, prev.x - deltaY * 0.4)),
      y: (prev.y + deltaX * 0.4) % 360,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStart.x;
    const deltaY = e.touches[0].clientY - dragStart.y;

    setRotation((prev) => ({
      x: Math.max(-65, Math.min(65, prev.x - deltaY * 0.4)),
      y: (prev.y + deltaX * 0.4) % 360,
    }));

    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Reset cube orientation
  const handleResetOrientation = () => {
    handleSnapToFace('FRONT');
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center select-none py-2"
    >
      {/* 3D Cube Perspective Viewport */}
      <div
        className="relative w-[280px] h-[220px] sm:w-[340px] sm:h-[260px] md:w-[420px] md:h-[310px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: '1200px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ambient Under-Cube Energy Aura */}
        <div
          className={`absolute w-52 sm:w-64 md:w-80 h-16 sm:h-20 rounded-full blur-2xl pointer-events-none transition-all duration-500 transform translate-y-36 sm:translate-y-44 ${
            isHovered
              ? 'opacity-45 bg-cyan-400 scale-110'
              : 'opacity-25 bg-sky-500 scale-100'
          }`}
        />

        {/* 3D CUBE CONTAINER */}
        <div
          className="relative w-[220px] h-[160px] sm:w-[270px] sm:h-[190px] md:w-[330px] md:h-[230px] transition-transform duration-300 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
              isHovered ? 'scale3d(1.03, 1.03, 1.03)' : 'scale3d(1, 1, 1)'
            }`,
          }}
        >
          {/* ================================================================= */}
          {/* FACE 1: FRONT FACE — PROJECT SCREENSHOT */}
          {/* ================================================================= */}
          <div
            className="absolute inset-0 rounded-xl bg-[#020b18]/90 border-2 border-cyan-400/60 shadow-[0_0_30px_rgba(0,245,255,0.3)] backdrop-blur-md overflow-hidden flex flex-col"
            style={{
              transform: 'translateZ(115px)',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Top Cyan Status Bar */}
            <div className="h-6 sm:h-7 px-2.5 bg-[#010814] border-b border-cyan-500/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#00f5ff]" />
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-cyan-300 font-bold uppercase">
                  {project.number} &bull; {project.shortName}
                </span>
              </div>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-200 border border-cyan-500/40">
                LIVE DEMO
              </span>
            </div>

            {/* Main Screenshot Image or Cyber Fallback */}
            <div className="relative flex-1 w-full h-full bg-[#00050f] overflow-hidden group">
              {!imgError ? (
                <img
                  src={project.image}
                  alt={project.title}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgError(true)}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    imgLoaded ? 'opacity-95 group-hover:opacity-100' : 'opacity-0'
                  }`}
                />
              ) : null}

              {/* Cyber Fallback View */}
              {(!imgLoaded || imgError) && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#02112a] via-[#010918] to-[#00040e] p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1">
                    <span className="text-[10px] font-mono text-cyan-300 font-bold">
                      {project.title}
                    </span>
                    <span className="text-[8px] font-mono text-slate-400">
                      {project.category}
                    </span>
                  </div>

                  <div className="my-auto space-y-1">
                    <p className="text-[10px] text-slate-300 line-clamp-2 leading-tight">
                      {project.description}
                    </p>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-cyan-400 animate-pulse" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[8px] font-mono text-cyan-400/80 pt-1 border-t border-cyan-500/20">
                    <span>SYSTEM READY</span>
                    <span>100% VERIFIED</span>
                  </div>
                </div>
              )}

              {/* Holographic Edge Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-sky-400/10 pointer-events-none" />

              {/* Corner Frame Notch Accents */}
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400 z-10 pointer-events-none" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400 z-10 pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400 z-10 pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400 z-10 pointer-events-none" />
            </div>
          </div>

          {/* ================================================================= */}
          {/* FACE 2: RIGHT FACE — TECHNOLOGY STACK */}
          {/* ================================================================= */}
          <div
            className="absolute inset-0 rounded-xl bg-[#010917]/95 border-2 border-cyan-500/50 shadow-[0_0_25px_rgba(0,245,255,0.25)] backdrop-blur-md p-3 flex flex-col justify-between overflow-hidden"
            style={{
              transform: 'rotateY(90deg) translateZ(115px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-1.5">
              <div className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] font-mono tracking-wider text-cyan-200 font-bold uppercase">
                  TECH GENOME STACK
                </span>
              </div>
              <span className="text-[8px] font-mono text-slate-400">
                {project.technologies.length} NODES
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 my-auto">
              {project.technologies.map((tech, idx) => {
                const isSelected = selectedTech === tech.name;
                return (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectTech) onSelectTech(tech.name);
                    }}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-left transition-all duration-200 border ${
                      isSelected
                        ? 'bg-cyan-500/30 border-cyan-300 text-white shadow-[0_0_10px_#00f5ff]'
                        : 'bg-[#02132b]/80 border-cyan-500/20 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-200'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: tech.color }}
                    />
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-mono font-bold leading-tight truncate">
                        {tech.name}
                      </p>
                      <p className="text-[8px] font-mono text-slate-400 truncate">
                        {tech.category}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-[8px] font-mono text-cyan-400/70 text-center border-t border-cyan-500/20 pt-1">
              CLICK NODE FOR ARCHITECTURE DETAILS
            </div>
          </div>

          {/* ================================================================= */}
          {/* FACE 3: TOP FACE — CATEGORY & NUMBER */}
          {/* ================================================================= */}
          <div
            className="absolute inset-0 rounded-xl bg-[#020d21]/95 border-2 border-cyan-400/50 shadow-[0_0_25px_rgba(0,245,255,0.25)] backdrop-blur-md p-4 flex flex-col items-center justify-center text-center overflow-hidden"
            style={{
              transform: 'rotateX(90deg) translateZ(115px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/60 flex items-center justify-center mb-2 shadow-[0_0_15px_#00f5ff]">
              <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
            </div>

            <span className="text-xl font-mono font-extrabold text-white tracking-widest drop-shadow-[0_0_10px_#00f5ff]">
              {project.number} / 05
            </span>

            <span className="text-[11px] font-mono tracking-[0.25em] text-cyan-300 uppercase font-bold mt-1">
              {project.category}
            </span>

            <p className="text-[9px] text-slate-300 max-w-[180px] mt-2 line-clamp-2">
              {project.type}
            </p>
          </div>

          {/* ================================================================= */}
          {/* FACE 4: LEFT FACE — ARCHITECTURE & HIGHLIGHTS */}
          {/* ================================================================= */}
          <div
            className="absolute inset-0 rounded-xl bg-[#010918]/95 border-2 border-cyan-500/50 shadow-[0_0_25px_rgba(0,245,255,0.25)] backdrop-blur-md p-3 flex flex-col justify-between overflow-hidden"
            style={{
              transform: 'rotateY(-90deg) translateZ(115px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-cyan-500/30 pb-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-mono tracking-wider text-cyan-200 font-bold uppercase">
                SYSTEM ARCHITECTURE
              </span>
            </div>

            <div className="space-y-1.5 my-auto text-[9px] font-mono text-slate-300">
              <div className="p-1.5 rounded bg-[#02122b] border border-cyan-500/20">
                <span className="text-cyan-400 font-bold">FRONTEND:</span>{' '}
                {project.architectureSummary.frontend}
              </div>
              <div className="p-1.5 rounded bg-[#02122b] border border-cyan-500/20">
                <span className="text-cyan-400 font-bold">BACKEND:</span>{' '}
                {project.architectureSummary.backend}
              </div>
              <div className="p-1.5 rounded bg-[#02122b] border border-cyan-500/20">
                <span className="text-cyan-400 font-bold">DATABASE:</span>{' '}
                {project.architectureSummary.database}
              </div>
            </div>

            <div className="text-[8px] font-mono text-cyan-300/80 text-center border-t border-cyan-500/20 pt-1">
              DEPLOYED & OPERATIONAL
            </div>
          </div>
        </div>
      </div>

      {/* CUBE CONTROL BAR (Interactive Snap Controls) */}
      <div className="mt-4 flex items-center gap-2 bg-[#020d21]/80 border border-cyan-500/30 rounded-full px-3 py-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(0,245,255,0.15)]">
        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mr-1">
          CUBE VIEW:
        </span>

        <button
          onClick={() => handleSnapToFace('FRONT')}
          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider transition-all duration-200 ${
            activeFace === 'FRONT'
              ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400 shadow-[0_0_10px_#00f5ff]'
              : 'text-slate-400 hover:text-cyan-300'
          }`}
        >
          FRONT
        </button>

        <button
          onClick={() => handleSnapToFace('RIGHT')}
          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider transition-all duration-200 ${
            activeFace === 'RIGHT'
              ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400 shadow-[0_0_10px_#00f5ff]'
              : 'text-slate-400 hover:text-cyan-300'
          }`}
        >
          TECH STACK
        </button>

        <button
          onClick={() => handleSnapToFace('TOP')}
          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider transition-all duration-200 ${
            activeFace === 'TOP'
              ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400 shadow-[0_0_10px_#00f5ff]'
              : 'text-slate-400 hover:text-cyan-300'
          }`}
        >
          CATEGORY
        </button>

        <button
          onClick={() => handleSnapToFace('LEFT')}
          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider transition-all duration-200 ${
            activeFace === 'LEFT'
              ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400 shadow-[0_0_10px_#00f5ff]'
              : 'text-slate-400 hover:text-cyan-300'
          }`}
        >
          SYSTEM
        </button>

        <button
          onClick={handleResetOrientation}
          title="Reset Cube View"
          className="p-1 rounded-full text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/20 transition-colors ml-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCube;
