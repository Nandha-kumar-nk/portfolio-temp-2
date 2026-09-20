import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Sparkles } from 'lucide-react';
import { ArtifactStage } from './artifacts/ArtifactStage';
import { ArtifactVisualType } from './artifacts/ProjectArtifactRenderer';
import { PROJECTS_DATA, ProjectItem } from '../../data/projectsData';

// Map existing project items to the artifact visual type structure
function getArtifactVisualType(project: ProjectItem): ArtifactVisualType {
  if (project.id === 'swayam-2') return 'knowledge';
  if (project.id === 'speed-taxi') return 'mobility';
  if (project.id === 'wildlife-ai') return 'ai';
  if (project.id === 'resume-forge') return 'document';
  return 'code';
}

interface ProjectShowcaseProps {
  initialProjectId?: string;
  onNavigateHome?: () => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  initialProjectId = 'swayam-2',
}) => {
  const projects = PROJECTS_DATA;
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const idx = projects.findIndex((p) => p.id === initialProjectId);
    return idx >= 0 ? idx : 0;
  });

  // Transition state machine
  // Phases: 'idle' -> 'pulse' -> 'burst' -> 'forming' -> 'idle'
  const [phase, setPhase] = useState<'idle' | 'pulse' | 'burst' | 'forming'>('idle');
  const [transitionProgress, setTransitionProgress] = useState<number>(0);
  const [outgoingVisualType, setOutgoingVisualType] = useState<ArtifactVisualType | null>(null);
  const [direction, setDirection] = useState<number>(1); // 1 = next, -1 = prev

  // Parallax mouse position
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const currentProject = projects[currentIndex] || projects[0];
  const currentVisualType = getArtifactVisualType(currentProject);

  // Smooth mouse movement tracking
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const nx = (clientX / innerWidth) * 2 - 1;
    const ny = -(clientY / innerHeight) * 2 + 1;
    setMousePos({ x: nx * 0.5, y: ny * 0.5 });
  }, []);

  // Touch move for mobile
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const { innerWidth, innerHeight } = window;
      const nx = (touch.clientX / innerWidth) * 2 - 1;
      const ny = -(touch.clientY / innerHeight) * 2 + 1;
      setMousePos({ x: nx * 0.4, y: ny * 0.4 });
    }
  }, []);

  // Keyboard navigation [ArrowLeft] and [ArrowRight]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // CINEMATIC TRANSITION SYSTEM (900ms - 1300ms)
  // When Next or Prev is clicked:
  // Step 1: Glow pulse (0-200ms)
  // Step 2: Geometry separates & particles burst outward (200-600ms)
  // Step 3: Particles travel toward the side, scene clears (600-850ms)
  // Step 4: Next artifact forms into place (850-1200ms)
  const isTransitioning = phase !== 'idle';

  const triggerTransition = useCallback(
    (targetIndex: number, dir: number) => {
      if (isTransitioning) return;

      const outgoing = currentVisualType;
      setOutgoingVisualType(outgoing);
      setDirection(dir);
      setPhase('pulse');
      setTransitionProgress(0);

      const startTime = performance.now();
      const totalDuration = 1100; // within 900-1300ms window

      let animId: number;

      const animateTransition = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const p = Math.min(1, elapsed / totalDuration);

        if (elapsed < 200) {
          // Glow pulse phase
          setPhase('pulse');
          setTransitionProgress(elapsed / 200);
        } else if (elapsed < 600) {
          // Burst outward phase
          setPhase('burst');
          const burstProgress = (elapsed - 200) / 400;
          setTransitionProgress(burstProgress);
        } else if (elapsed < 850) {
          // Side drift & clearing phase
          // Switch target project index at mid-point
          setCurrentIndex(targetIndex);
          setPhase('burst');
          const driftProgress = 0.8 + ((elapsed - 600) / 250) * 0.2;
          setTransitionProgress(driftProgress);
        } else if (elapsed < totalDuration) {
          // Forming next artifact
          setPhase('forming');
          const formingProgress = (elapsed - 850) / (totalDuration - 850);
          setTransitionProgress(formingProgress);
        } else {
          // Complete
          setPhase('idle');
          setTransitionProgress(0);
          setOutgoingVisualType(null);
          return;
        }

        animId = requestAnimationFrame(animateTransition);
      };

      animId = requestAnimationFrame(animateTransition);
    },
    [currentVisualType, isTransitioning]
  );

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    const nextIdx = (currentIndex + 1) % projects.length;
    triggerTransition(nextIdx, 1);
  }, [currentIndex, isTransitioning, projects.length, triggerTransition]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    triggerTransition(prevIdx, -1);
  }, [currentIndex, isTransitioning, projects.length, triggerTransition]);

  // Touch swipe support for mobile
  const touchStartX = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  const formattedCounter = `0${currentIndex + 1} / 0${projects.length}`;

  return (
    <div
      className="relative w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-between overflow-hidden bg-[#02040a] select-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Subtle Atmospheric Ambient Backing & Soft Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-violet-600/4 rounded-full blur-[120px]" />
      </div>

      {/* 2. Top Header Title & Subtitle */}
      <div className="relative z-20 pt-6 sm:pt-10 flex flex-col items-center text-center px-4">
        <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.35em] text-cyan-400 uppercase">
          PROJECTS
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans">
          THINGS I BUILT
        </h1>
      </div>

      {/* 3. The Hero 3D Project Artifact Canvas Stage */}
      {/* Occupies the dominant majority of the visual screen space */}
      <div className="relative z-10 w-full flex-1 min-h-[380px] sm:min-h-[460px] md:min-h-[520px] max-w-6xl mx-auto flex items-center justify-center">
        <ArtifactStage
          currentVisualType={currentVisualType}
          outgoingVisualType={outgoingVisualType}
          phase={phase}
          transitionProgress={transitionProgress}
          direction={direction}
          accentColor={currentProject.accentColor || '#00f5ff'}
          mousePos={mousePos}
        />

        {/* Floating Artifact Type Badge (Subtle, Top Left of Artifact) */}
        <div className="absolute top-4 left-6 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/60 border border-cyan-500/20 backdrop-blur-md text-[11px] font-mono text-cyan-300">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>ARTIFACT CLASSIFICATION : {currentVisualType.toUpperCase()}</span>
        </div>

        {/* Supporting Code / Live Links (Discreetly Floating Top Right of Artifact) */}
        <div className="absolute top-4 right-6 flex items-center gap-2">
          {currentProject.liveUrl && (
            <a
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 text-xs font-mono flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,245,255,0.15)]"
            >
              <span>Live System</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {currentProject.githubUrl && (
            <a
              href={currentProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 text-xs transition-all"
              aria-label="GitHub Repository"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* 4. Bottom Composition: Title, Tagline, Navigation & Pager */}
      <div className="relative z-20 pb-8 sm:pb-12 flex flex-col items-center text-center px-4 w-full max-w-xl mx-auto">
        {/* Project Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white transition-opacity duration-300">
          {currentProject.title}
        </h2>

        {/* Project Tagline */}
        <p className="mt-1 text-sm sm:text-base text-cyan-300/80 font-medium tracking-wide">
          {currentProject.tagline}
        </p>

        {/* Concise Description */}
        <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 max-w-md">
          {currentProject.description}
        </p>

        {/* Prev / Next Navigation Controls */}
        <div className="mt-6 flex items-center gap-8">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isTransitioning}
            className={`group flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-slate-950/60 hover:bg-cyan-950/40 hover:border-cyan-400 text-xs font-mono tracking-wider text-slate-300 hover:text-cyan-300 transition-all cursor-pointer ${
              isTransitioning ? 'opacity-40 cursor-not-allowed' : 'active:scale-95'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>PREVIOUS</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={isTransitioning}
            className={`group flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-400/80 bg-cyan-950/60 hover:bg-cyan-900/60 hover:border-cyan-300 text-xs font-mono font-bold tracking-wider text-cyan-200 hover:text-white transition-all shadow-[0_0_16px_rgba(0,245,255,0.25)] cursor-pointer ${
              isTransitioning ? 'opacity-40 cursor-not-allowed' : 'active:scale-95'
            }`}
          >
            <span>NEXT</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Horizon Pager Counter */}
        <div className="mt-4 text-xs font-mono tracking-widest text-slate-500 font-bold">
          {formattedCounter}
        </div>
      </div>
    </div>
  );
};
