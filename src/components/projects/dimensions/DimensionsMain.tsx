import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PROJECTS_DATA, ProjectItem } from '../../../data/projectsData';
import { AsymmetricDimensionView } from './AsymmetricDimensionView';
import { ProgressiveDNA } from './ProgressiveDNA';
import { DimensionTransitionOverlay } from './DimensionTransitionOverlay';
import { PROJECT_ASSETS } from '../cube/projectAssets';
import { ArrowLeft, ArrowRight, X, ExternalLink, Github, Sparkles } from 'lucide-react';
import { soundEngine } from '../../../utils/audio';

interface DimensionsMainProps {
  initialProjectId?: string;
  isActive?: boolean;
  onNavigateHome?: () => void;
}

export const DimensionsMain: React.FC<DimensionsMainProps> = ({
  initialProjectId,
  isActive = true,
  onNavigateHome,
}) => {
  const initialIdx = Math.max(
    0,
    PROJECTS_DATA.findIndex((p) => p.id === initialProjectId)
  );

  const [currentIndex, setCurrentIndex] = useState<number>(initialIdx !== -1 ? initialIdx : 0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isDissolving, setIsDissolving] = useState<boolean>(false);
  const [nextTargetIdx, setNextTargetIdx] = useState<number | null>(null);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState<boolean>(false);

  const activeProject: ProjectItem = PROJECTS_DATA[currentIndex] || PROJECTS_DATA[0];
  const totalProjects = PROJECTS_DATA.length;

  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Trigger continuous transition between dimensions
  const triggerTransitionTo = useCallback(
    (targetIdx: number) => {
      if (isTransitioning || targetIdx === currentIndex) return;

      try {
        soundEngine.playChime(520, 0.4);
      } catch {
        // ignore
      }

      setIsDissolving(true);
      setNextTargetIdx(targetIdx);

      setTimeout(() => {
        setIsDissolving(false);
        setIsTransitioning(true);
      }, 400);
    },
    [isTransitioning, currentIndex]
  );

  const handleNextProject = useCallback(() => {
    const nextIdx = (currentIndex + 1) % totalProjects;
    triggerTransitionTo(nextIdx);
  }, [currentIndex, totalProjects, triggerTransitionTo]);

  const handlePrevProject = useCallback(() => {
    const prevIdx = (currentIndex - 1 + totalProjects) % totalProjects;
    triggerTransitionTo(prevIdx);
  }, [currentIndex, totalProjects, triggerTransitionTo]);

  const handleTransitionComplete = useCallback(() => {
    if (nextTargetIdx !== null) {
      setCurrentIndex(nextTargetIdx);
      setNextTargetIdx(null);
    }
    setIsTransitioning(false);
  }, [nextTargetIdx]);

  // Keyboard navigation
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreenOpen) {
        if (e.key === 'Escape') setIsFullscreenOpen(false);
        return;
      }

      if (e.key === 'ArrowRight') {
        handleNextProject();
      } else if (e.key === 'ArrowLeft') {
        handlePrevProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, isFullscreenOpen, handleNextProject, handlePrevProject]);

  // Touch & Swipe Gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        handleNextProject();
      } else {
        handlePrevProject();
      }
    }
  };

  // Fullscreen modal image source
  const asset = PROJECT_ASSETS[activeProject.id];
  const imgSrc =
    asset?.dataUrl ||
    activeProject.image ||
    activeProject.screenshot ||
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1280&auto=format&fit=crop';

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[100svh] bg-transparent text-white font-sans select-none flex flex-col justify-between py-6 box-border"
    >
      {/* Background Subtle Spatial Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00f5ff_1px,transparent_1px)] [background-size:36px_36px] opacity-10 pointer-events-none" />

      {/* Top Floating Minimal Navigation Dock */}
      <div className="sticky top-3 z-40 max-w-5xl mx-auto px-3 my-2">
        <div className="flex items-center justify-between p-2.5 sm:p-3.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          {/* Dimension Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {PROJECTS_DATA.map((p, idx) => {
              const isActivePill = idx === currentIndex;
              const numStr = String(idx + 1).padStart(2, '0');
              return (
                <button
                  key={p.id}
                  onClick={() => triggerTransitionTo(idx)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border font-mono text-xs transition-all duration-300 active:scale-95 shrink-0 ${
                    isActivePill
                      ? 'bg-cyan-950/90 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,245,255,0.3)] font-bold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span className={isActivePill ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                    {numStr}
                  </span>
                  <span className="hidden md:inline">{p.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Left/Right Arrows */}
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <button
              onClick={handlePrevProject}
              className="p-1.5 sm:p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-cyan-400 transition-all active:scale-95"
              title="Previous Dimension"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextProject}
              className="p-1.5 sm:p-2 rounded-lg border border-cyan-500/40 bg-cyan-950/80 text-cyan-300 hover:text-white hover:border-cyan-400 transition-all active:scale-95"
              title="Next Dimension"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Asymmetrical Dimension View (Alternates Left / Right per project) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`dimension-${activeProject.id}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
        >
          <AsymmetricDimensionView
            project={activeProject}
            index={currentIndex}
            total={totalProjects}
            onOpenFullscreen={() => setIsFullscreenOpen(true)}
            isDissolving={isDissolving}
          />

          {/* Progressive Project DNA Timeline */}
          <ProgressiveDNA project={activeProject} />
        </motion.div>
      </AnimatePresence>

      {/* Transition Overlay during Dimension Switch */}
      {isTransitioning && nextTargetIdx !== null && (
        <DimensionTransitionOverlay
          accentColor={PROJECTS_DATA[nextTargetIdx]?.accentColor}
          nextProjectTitle={PROJECTS_DATA[nextTargetIdx]?.title || ''}
          onComplete={handleTransitionComplete}
        />
      )}

      {/* Bottom Floating Navigation Dock */}
      <div className="max-w-3xl mx-auto mt-8 mb-6 flex items-center justify-between gap-3 px-4">
        <button
          onClick={handlePrevProject}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs font-bold hover:border-cyan-400 hover:text-white transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>PREV DIMENSION</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>SWIPE OR USE ARROWS</span>
        </div>

        <button
          onClick={handleNextProject}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-500/50 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono text-xs font-black tracking-widest uppercase hover:text-white transition-all active:scale-95"
        >
          <span>NEXT DIMENSION</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Fullscreen High-Resolution Artifact Modal */}
      <AnimatePresence>
        {isFullscreenOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl"
          >
            <button
              onClick={() => setIsFullscreenOpen(false)}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-slate-900/90 border border-slate-700 text-white hover:border-cyan-400 hover:text-cyan-300 transition-all shadow-xl"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center overflow-auto rounded-2xl border border-cyan-500/40 bg-slate-950 p-3 sm:p-5 shadow-[0_0_80px_rgba(0,245,255,0.3)]">
              <img
                src={imgSrc}
                alt={activeProject.title}
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
              />

              <div className="w-full mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">{activeProject.title}</h3>
                  <p className="text-xs font-mono text-cyan-400">{activeProject.category}</p>
                </div>

                <div className="flex items-center gap-3">
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 text-xs font-mono font-bold text-white hover:bg-slate-700 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>SOURCE</span>
                    </a>
                  )}
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-mono font-black uppercase hover:bg-cyan-400 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>LIVE DEMO</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
