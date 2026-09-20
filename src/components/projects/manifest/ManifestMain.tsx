import React, { useState, useCallback, useEffect, useRef } from 'react';
import { PROJECTS_DATA, ProjectItem } from '../../../data/projectsData';
import { ProjectSheet } from './ProjectSheet';
import { ProjectSelectorBar } from './ProjectSelectorBar';
import { ProjectDnaTimeline } from './ProjectDnaTimeline';
import { MobileManifestView } from './MobileManifestView';
import { ParticleDissolveCanvas } from './ParticleDissolveCanvas';
import { PROJECT_ASSETS } from '../cube/projectAssets';
import { X, Sparkles } from 'lucide-react';

interface ManifestMainProps {
  initialProjectId?: string;
  isActive?: boolean;
}

export const ManifestMain: React.FC<ManifestMainProps> = ({
  initialProjectId = 'swayam-2',
}) => {
  // Find initial project index
  const initialIndex = Math.max(
    0,
    PROJECTS_DATA.findIndex(
      (p) => p.id === initialProjectId || p.id === 'speed-taxi'
    )
  );

  const [currentIndex, setCurrentIndex] = useState<number>(
    initialIndex >= 0 ? initialIndex : 0
  );
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isFullscreenScreenshot, setIsFullscreenScreenshot] = useState<boolean>(false);

  const currentProject: ProjectItem = PROJECTS_DATA[currentIndex] || PROJECTS_DATA[0];

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
  }, [isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
  }, [isTransitioning]);

  const handleSelectProject = useCallback(
    (index: number) => {
      if (index === currentIndex || isTransitioning) return;
      setIsTransitioning(true);
      setDirection(index > currentIndex ? 'next' : 'prev');
      setCurrentIndex(index);
    },
    [currentIndex, isTransitioning]
  );

  const handleParticleComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setIsFullscreenScreenshot(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Wheel Scroll Navigation with Debounce
  const lastWheelTimeRef = useRef<number>(0);
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTimeRef.current < 800) return; // Debounce 800ms

    if (e.deltaY > 30) {
      lastWheelTimeRef.current = now;
      handleNext();
    } else if (e.deltaY < -30) {
      lastWheelTimeRef.current = now;
      handlePrev();
    }
  };

  const asset = PROJECT_ASSETS[currentProject.id] || PROJECT_ASSETS['speed-taxi'];
  const screenshotUrl = asset?.dataUrl || currentProject.image || currentProject.screenshot;

  return (
    <div
      onWheel={handleWheel}
      className="relative w-full min-h-[100svh] bg-transparent text-white py-8 sm:py-12 px-2 sm:px-6 overflow-x-hidden select-none"
    >
      {/* Particle Dissolve & Formation Transition Canvas */}
      <ParticleDissolveCanvas
        isTransitioning={isTransitioning}
        direction={direction}
        onComplete={handleParticleComplete}
      />

      {/* Main Header */}
      <div className="flex flex-col items-center justify-center text-center space-y-2 mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-bold tracking-widest shadow-[0_0_15px_rgba(0,245,255,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>PROJECTS • MANIFEST {String(currentIndex + 1).padStart(2, '0')} / 05</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          PROJECT MANIFEST
        </h1>
      </div>

      {/* Desktop & Tablet View */}
      <div className="hidden md:block">
        <ProjectSheet
          project={currentProject}
          chapterIndex={currentIndex}
          totalChapters={PROJECTS_DATA.length}
          direction={direction}
          onFullscreen={() => setIsFullscreenScreenshot(true)}
        />

        <ProjectSelectorBar
          projects={PROJECTS_DATA}
          currentIndex={currentIndex}
          onSelectProject={handleSelectProject}
          onNext={handleNext}
          onPrev={handlePrev}
        />

        <ProjectDnaTimeline project={currentProject} />
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <MobileManifestView
          projects={PROJECTS_DATA}
          currentIndex={currentIndex}
          onSelectProject={handleSelectProject}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>

      {/* Fullscreen Screenshot Modal */}
      {isFullscreenScreenshot && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <button
            onClick={() => setIsFullscreenScreenshot(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 border border-cyan-500/50 text-cyan-300 hover:text-white hover:bg-cyan-950 transition-all shadow-2xl active:scale-95"
            title="Close Fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-6xl max-h-[85vh] w-full flex items-center justify-center p-2 rounded-2xl bg-[#030a1c] border border-cyan-500/40 shadow-[0_0_50px_rgba(0,245,255,0.2)]">
            <img
              src={screenshotUrl}
              alt={currentProject.title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl"
            />
          </div>

          <div className="mt-4 text-center font-mono text-xs text-slate-300">
            <span className="text-cyan-400 font-bold">{currentProject.title}</span> — High Resolution Actual Screenshot Preview
          </div>
        </div>
      )}
    </div>
  );
};

export default ManifestMain;
