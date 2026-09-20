import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectScreenshotFrame } from '../ProjectScreenshotFrame';
import { ProjectFlowTechStack } from './ProjectFlowTechStack';
import { ProjectDNA } from '../ProjectDNA';
import { ExternalLink, Github, Box, Maximize2, X, Rotate3d, Eye, ArrowLeft } from 'lucide-react';

interface ProjectCubePresentationProps {
  projects: ProjectItem[];
  currentIndex: number;
  onSelectProject: (id: string) => void;
  direction?: 'forward' | 'backward';
  isTransitioning?: boolean;
}

// Rotation angles for 6 faces to bring each cleanly to the front (rotateY, rotateX)
const FACE_ROTATIONS: Array<{ ry: number; rx: number }> = [
  { ry: 0, rx: 0 },       // Face 1 (Front) -> Project 01
  { ry: -90, rx: 0 },     // Face 2 (Right) -> Project 02
  { ry: -180, rx: 0 },    // Face 3 (Back)  -> Project 03
  { ry: 90, rx: 0 },      // Face 4 (Left)  -> Project 04
  { ry: 0, rx: -90 },     // Face 5 (Top)   -> Project 05
  { ry: 0, rx: 90 },      // Face 6 (Bottom)-> Portfolio Core
];

const PROJECT_SIGNALS: Record<string, string> = {
  'speed-taxi': 'SMART MOBILITY DISPATCH',
  'swayam-2': 'KNOWLEDGE MESH PLATFORM',
  'resume-forge': 'CAREER COMPLIANCE ENGINE',
  'wildlife-ai': 'SAFETY SENSOR SYSTEM',
  'nk-mern-cli': 'ARCHITECTURE AUTOMATION',
};

export const ProjectCubePresentation: React.FC<ProjectCubePresentationProps> = ({
  projects,
  currentIndex,
  onSelectProject,
  isTransitioning = false,
}) => {
  const [isProjectOpened, setIsProjectOpened] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [cubeTilt, setCubeTilt] = useState({ x: -12, y: 18 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const activeProject = projects[currentIndex];
  const totalProjects = projects.length;
  const signalTag = PROJECT_SIGNALS[activeProject.id] || '3D NAVIGATION NODE';
  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  // Auto reset cube tilt on project switch
  useEffect(() => {
    setCubeTilt({ x: -10, y: 15 });
  }, [currentIndex]);

  // Target rotation for current face
  const activeFaceRotation = FACE_ROTATIONS[currentIndex % FACE_ROTATIONS.length] || { ry: 0, rx: 0 };

  // Mouse tilt drag handlers on 3D cube
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setCubeTilt((prev) => ({
      x: prev.x - deltaY * 0.25,
      y: prev.y + deltaX * 0.25,
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-2 z-20 font-mono relative">
      {/* 1. ENORMOUS SUBTLE BACKGROUND PROJECT NUMBER */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 overflow-hidden w-full text-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeProject.id}
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            animate={{ opacity: 0.07, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.15, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[220px] sm:text-[300px] md:text-[380px] font-black text-cyan-400 tracking-tighter inline-block leading-none drop-shadow-[0_0_90px_rgba(0,245,255,0.35)]"
          >
            {activeProject.doorNumber}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* 2. TOP CUBE / EXPAND TOGGLE CONTROL BAR */}
      <div className="flex items-center justify-between px-2 mb-4 z-20 relative">
        <div className="flex items-center gap-2 text-xs text-cyan-400 uppercase tracking-widest font-bold">
          <Box className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>CUBE NODE {formatNumber(currentIndex + 1)} / {formatNumber(totalProjects)}</span>
        </div>

        <button
          onClick={() => setIsProjectOpened(!isProjectOpened)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-bold hover:bg-cyan-900 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,245,255,0.25)]"
          aria-label={isProjectOpened ? 'Return to 3D Cube View' : 'Expand Project Preview'}
        >
          {isProjectOpened ? (
            <>
              <Rotate3d className="w-3.5 h-3.5 text-cyan-400" />
              <span>EXPLORE CUBE VIEW</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>OPEN PROJECT PREVIEW →</span>
            </>
          )}
        </button>
      </div>

      {/* 3. MAIN CUBE + EXPANDED PROJECT CONTAINER */}
      <div className="relative z-20 min-h-[460px] flex flex-col items-center justify-center">
        {/* MODE A: 3D NAVIGATION CUBE VIEW */}
        {!isProjectOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center my-6 py-6 w-full"
          >
            {/* 3D Perspective Canvas Container */}
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="relative w-64 h-64 sm:w-72 sm:h-72 cursor-grab active:cursor-grabbing select-none"
              style={{ perspective: '1200px' }}
            >
              {/* The 3D Cube Object */}
              <div
                className="w-full h-full relative transition-transform duration-700 ease-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${activeFaceRotation.rx + cubeTilt.x}deg) rotateY(${activeFaceRotation.ry + cubeTilt.y}deg)`,
                }}
              >
                {/* CUBE FACE 1: FRONT (Project 01) */}
                <CubeFace
                  index={0}
                  project={projects[0]}
                  isActive={currentIndex === 0}
                  translateZ="135px"
                  rotation="rotateY(0deg)"
                  onSelect={() => {
                    onSelectProject(projects[0].id);
                    setIsProjectOpened(true);
                  }}
                />

                {/* CUBE FACE 2: RIGHT (Project 02) */}
                <CubeFace
                  index={1}
                  project={projects[1]}
                  isActive={currentIndex === 1}
                  translateZ="135px"
                  rotation="rotateY(90deg)"
                  onSelect={() => {
                    onSelectProject(projects[1].id);
                    setIsProjectOpened(true);
                  }}
                />

                {/* CUBE FACE 3: BACK (Project 03) */}
                <CubeFace
                  index={2}
                  project={projects[2]}
                  isActive={currentIndex === 2}
                  translateZ="135px"
                  rotation="rotateY(180deg)"
                  onSelect={() => {
                    onSelectProject(projects[2].id);
                    setIsProjectOpened(true);
                  }}
                />

                {/* CUBE FACE 4: LEFT (Project 04) */}
                <CubeFace
                  index={3}
                  project={projects[3]}
                  isActive={currentIndex === 3}
                  translateZ="135px"
                  rotation="rotateY(-90deg)"
                  onSelect={() => {
                    onSelectProject(projects[3].id);
                    setIsProjectOpened(true);
                  }}
                />

                {/* CUBE FACE 5: TOP (Project 05) */}
                <CubeFace
                  index={4}
                  project={projects[4]}
                  isActive={currentIndex === 4}
                  translateZ="135px"
                  rotation="rotateX(90deg)"
                  onSelect={() => {
                    onSelectProject(projects[4].id);
                    setIsProjectOpened(true);
                  }}
                />

                {/* CUBE FACE 6: BOTTOM (Portfolio Identity) */}
                <div
                  className="absolute inset-0 rounded-2xl bg-slate-950/90 border border-cyan-500/30 p-5 flex flex-col justify-between text-cyan-300 font-mono shadow-[0_0_25px_rgba(0,245,255,0.15)] backdrop-blur-md"
                  style={{
                    transform: `rotateX(-90deg) translateZ(135px)`,
                  }}
                >
                  <div className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">
                    PORTFOLIO CORE
                  </div>
                  <div className="text-center my-auto">
                    <div className="text-xl font-black text-white tracking-widest">NANDHAKUMAR</div>
                    <div className="text-[10px] text-cyan-400/80 tracking-wider">UNIVERSE // 2026</div>
                  </div>
                  <div className="text-[9px] text-slate-500 text-center uppercase">ROTATIONAL AXIS</div>
                </div>
              </div>
            </div>

            {/* Hint & Direct Open CTA */}
            <div className="mt-8 text-center space-y-2">
              <p className="text-xs text-cyan-300 font-bold uppercase tracking-widest">
                ACTIVE FACE: {activeProject.doorNumber} — {activeProject.title}
              </p>
              <button
                onClick={() => setIsProjectOpened(true)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-300 text-slate-950 font-black text-xs hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,245,255,0.4)] cursor-pointer tracking-wider"
              >
                OPEN PROJECT PREVIEW →
              </button>
            </div>
          </motion.div>
        )}

        {/* MODE B: EXPANDED LARGE FLAT PROJECT PREVIEW HERO */}
        {isProjectOpened && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{
                opacity: isTransitioning ? 0.35 : 1,
                scale: isTransitioning ? 0.96 : 1,
                y: 0,
              }}
              exit={{ opacity: 0, scale: 0.94, y: -15 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-4 sm:p-6 md:p-8 rounded-3xl bg-slate-950/85 border border-cyan-500/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,245,255,0.22)]"
            >
              {/* LEFT: HERO FLAT SCREENSHOT PREVIEW (~60% desktop width, ~90-94vw mobile) */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[280px] sm:min-h-[400px]">
                <div className="relative w-full h-full rounded-2xl border border-cyan-500/45 bg-black overflow-hidden shadow-[0_0_40px_rgba(0,245,255,0.25)] flex flex-col group">
                  {/* Corner Tech Accents */}
                  <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

                  {/* Window Header */}
                  <div className="flex items-center justify-between px-3.5 py-2 border-b border-cyan-900/60 bg-slate-900/95 text-[11px] text-cyan-300">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      </div>
                      <span className="text-slate-400 border-l border-slate-800 pl-2.5 text-[10px] font-mono uppercase">
                        CUBE PREVIEW // {activeProject.shortName}
                      </span>
                    </div>

                    <button
                      onClick={() => setIsZoomed(true)}
                      className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer p-1 rounded hover:bg-cyan-950/50"
                      title="Expand Fullscreen View"
                      aria-label="Expand Screenshot Fullscreen"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Flat Actual Screenshot Viewport */}
                  <div className="relative flex-1 w-full bg-black flex items-center justify-center p-1">
                    <ProjectScreenshotFrame
                      project={activeProject}
                      isTransitioning={isTransitioning}
                      className="w-full h-full max-h-[460px] object-contain rounded-lg"
                    />

                    {/* Subtle Opening Light Sweep */}
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 1.1, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none z-20"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT: PROJECT METADATA & REAL TECH STACK (~40% width) */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div>
                  {/* Category & Signal Tag */}
                  <div className="flex items-center justify-between text-xs text-cyan-400 mb-2">
                    <span className="tracking-widest font-bold uppercase flex items-center gap-1.5">
                      <Box className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{signalTag}</span>
                    </span>
                    <span className="text-cyan-300 font-bold text-xs bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-full font-mono shadow-[0_0_10px_rgba(0,245,255,0.2)]">
                      {formatNumber(currentIndex + 1)} / {formatNumber(totalProjects)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wide uppercase drop-shadow-[0_0_25px_rgba(0,245,255,0.3)]">
                    {activeProject.title}
                  </h2>

                  {/* Tagline */}
                  <p className="text-xs font-bold text-cyan-300/95 tracking-wider uppercase mt-1">
                    "{activeProject.tagline}"
                  </p>

                  {/* Short Description */}
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {activeProject.description}
                  </p>
                </div>

                {/* Real Technology Stack */}
                <ProjectFlowTechStack
                  projectId={activeProject.id}
                  techStack={activeProject.techStack}
                />

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-cyan-900/60">
                  <a
                    href={activeProject.liveUrl || activeProject.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live project for ${activeProject.title}`}
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-300 text-slate-950 font-black text-xs hover:brightness-110 transition-all shadow-[0_0_25px_rgba(0,245,255,0.45)] cursor-pointer tracking-wider"
                  >
                    <span>VIEW PROJECT →</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View GitHub repository for ${activeProject.title}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900/90 border border-cyan-800/70 text-cyan-300 text-xs font-bold hover:border-cyan-400 hover:bg-cyan-950/70 transition-colors cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>VIEW SOURCE</span>
                  </a>

                  <button
                    onClick={() => setIsProjectOpened(false)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 border border-cyan-900/50 text-cyan-400/80 hover:text-cyan-300 hover:border-cyan-500/50 text-xs font-bold transition-colors cursor-pointer mt-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>RETURN TO 3D CUBE NAVIGATION</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* 4. PROJECT-LEVEL DNA (PROBLEM -> IDEA -> ARCHITECTURE -> TECH -> FEATURES -> IMPACT) */}
      <div className="mt-12 w-full pt-8 border-t border-cyan-900/40 z-20 relative">
        <ProjectDNA project={activeProject} />
      </div>

      {/* 4. FULLSCREEN ZOOM MODAL */}
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
                aria-label="Close Fullscreen View"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-4 bg-black flex items-center justify-center">
                <ProjectScreenshotFrame project={activeProject} className="w-full max-h-[80vh]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// HELPER COMPONENT FOR A SINGLE CUBE FACE
interface CubeFaceProps {
  index: number;
  project?: ProjectItem;
  isActive: boolean;
  translateZ: string;
  rotation: string;
  onSelect: () => void;
}

const CubeFace: React.FC<CubeFaceProps> = ({
  index,
  project,
  isActive,
  translateZ,
  rotation,
  onSelect,
}) => {
  if (!project) return null;

  return (
    <div
      onClick={onSelect}
      className={`absolute inset-0 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 select-none ${
        isActive
          ? 'bg-slate-950/95 border-2 border-cyan-400 shadow-[0_0_35px_rgba(0,245,255,0.4)] text-white z-10'
          : 'bg-slate-950/80 border border-cyan-500/30 text-slate-400 hover:border-cyan-400/60 hover:bg-slate-900/90'
      }`}
      style={{
        transform: `${rotation} translateZ(${translateZ})`,
      }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-bold font-mono ${
            isActive ? 'text-cyan-300' : 'text-slate-500'
          }`}
        >
          {project.doorNumber} / 05
        </span>
        {isActive && (
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f5ff] animate-ping" />
        )}
      </div>

      {/* Center Title & Tagline */}
      <div className="my-auto text-center space-y-1">
        <h3
          className={`text-lg font-black tracking-wider uppercase truncate ${
            isActive ? 'text-white drop-shadow-[0_0_12px_rgba(0,245,255,0.5)]' : 'text-slate-300'
          }`}
        >
          {project.title}
        </h3>
        <p className="text-[10px] text-cyan-400/90 font-mono tracking-widest uppercase truncate">
          {project.shortName}
        </p>
      </div>

      {/* Bottom Footer */}
      <div className="flex items-center justify-between text-[10px] border-t border-cyan-900/40 pt-2 font-mono">
        <span className="text-slate-400 truncate max-w-[120px]">{project.categoryName}</span>
        <span className="text-cyan-400 font-bold group-hover:underline">OPEN →</span>
      </div>
    </div>
  );
};

export default ProjectCubePresentation;
