import React, { useState, useCallback, useEffect } from 'react';
import { PROJECTS_DATA, ProjectItem } from '../../../data/projectsData';
import { CodexBook } from './CodexBook';
import { CodexNavigation } from './CodexNavigation';
import { ProjectDnaCodex } from './ProjectDnaCodex';
import { MobileCodexView } from './MobileCodexView';
import { PROJECT_ASSETS } from '../cube/projectAssets';
import { X, BookOpen } from 'lucide-react';

interface CodexMainProps {
  initialProjectId?: string;
  isActive?: boolean;
}

export const CodexMain: React.FC<CodexMainProps> = ({
  initialProjectId = 'swayam-2',
}) => {
  // Find initial index
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
  const [isFullscreenScreenshot, setIsFullscreenScreenshot] = useState<boolean>(false);

  const currentProject: ProjectItem = PROJECTS_DATA[currentIndex] || PROJECTS_DATA[0];

  const handleNext = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
  }, []);

  const handleSelectProject = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setDirection(index > currentIndex ? 'next' : 'prev');
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // Keyboard navigation support (Arrow keys)
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

  const asset = PROJECT_ASSETS[currentProject.id] || PROJECT_ASSETS['speed-taxi'];
  const screenshotUrl = asset?.dataUrl || currentProject.image || currentProject.screenshot;

  return (
    <div className="relative w-full min-h-[100svh] bg-transparent text-white py-8 sm:py-12 px-2 sm:px-6 overflow-x-hidden">
      {/* Top Header Section */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-bold tracking-widest shadow-[0_0_15px_rgba(0,245,255,0.15)]">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>PROJECTS • CHAPTER {String(currentIndex + 1).padStart(2, '0')} / 05</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          THE CODEX OF CREATION
        </h1>

        <p className="text-xs sm:text-sm md:text-base font-mono text-cyan-400/90 tracking-widest uppercase max-w-xl">
          EVERY PROJECT = ONE CHAPTER OF MY JOURNEY
        </p>
      </div>

      {/* Desktop & Tablet Layout */}
      <div className="hidden md:block">
        <CodexBook
          project={currentProject}
          chapterIndex={currentIndex}
          totalChapters={PROJECTS_DATA.length}
          direction={direction}
          onExpandScreenshot={() => setIsFullscreenScreenshot(true)}
        />

        <CodexNavigation
          projects={PROJECTS_DATA}
          currentIndex={currentIndex}
          onSelectProject={handleSelectProject}
          onNext={handleNext}
          onPrev={handlePrev}
        />

        <ProjectDnaCodex project={currentProject} />
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden">
        <MobileCodexView
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
            <span className="text-cyan-400 font-bold">{currentProject.title}</span> — High Resolution Screenshot Preview
          </div>
        </div>
      )}
    </div>
  );
};

export default CodexMain;
