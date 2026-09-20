import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { PROJECT_ASSETS } from '../cube/projectAssets';
import { TechLogoItem } from '../TechIconSystem';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectDnaTimeline } from './ProjectDnaTimeline';

interface MobileManifestViewProps {
  projects: ProjectItem[];
  currentIndex: number;
  onSelectProject: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const MobileManifestView: React.FC<MobileManifestViewProps> = ({
  projects,
  currentIndex,
  onNext,
  onPrev,
}) => {
  const currentProject = projects[currentIndex];
  const asset = PROJECT_ASSETS[currentProject.id] || PROJECT_ASSETS['speed-taxi'];
  const screenshotUrl = asset?.dataUrl || currentProject.image || currentProject.screenshot;

  const chapterNum = String(currentIndex + 1).padStart(2, '0');
  const totalNum = String(projects.length).padStart(2, '0');

  // Touch Swipe Gesture Handling
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    touchStartXRef.current = null;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        onNext(); // Swiped left -> next
      } else {
        onPrev(); // Swiped right -> prev
      }
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full px-3 py-4 flex flex-col space-y-5 select-none"
    >
      {/* Chapter Nav Bar */}
      <div className="flex items-center justify-between bg-[#030919]/90 p-3 rounded-2xl border border-cyan-500/30 backdrop-blur-md shadow-lg">
        <button
          onClick={onPrev}
          className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400 active:scale-95"
          aria-label="Previous Project"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center">
          <div className="text-[10px] font-mono font-bold text-cyan-400 tracking-widest uppercase">
            {chapterNum} / {totalNum}
          </div>
          <div className="text-xs font-extrabold text-white">{currentProject.shortName}</div>
        </div>

        <button
          onClick={onNext}
          className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400 active:scale-95"
          aria-label="Next Project"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Floating Project Sheet for Mobile */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.98 }}
          transition={{ duration: 0.35 }}
          className="w-full p-5 rounded-3xl bg-[#030919]/90 border border-cyan-500/25 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col space-y-4"
        >
          {/* Header */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              {currentProject.category}
            </span>
            <h2 className="text-2xl font-extrabold text-white">{currentProject.title}</h2>
            <p className="text-xs font-mono text-cyan-400 font-bold tracking-wide uppercase">
              {currentProject.tagline}
            </p>
          </div>

          {/* HERO Screenshot (~90-94vw) - original aspect ratio, flat, undistorted */}
          <div className="relative w-full rounded-2xl bg-[#020815] border border-cyan-500/30 p-2 overflow-hidden shadow-md">
            <img
              src={screenshotUrl}
              alt={currentProject.title}
              className="w-full h-auto object-contain rounded-xl"
              loading="eager"
            />
          </div>

          {/* Description */}
          <p className="text-xs text-slate-300 leading-relaxed">{currentProject.description}</p>

          {/* Compact Tech Row */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
              TECHNOLOGIES
            </div>
            <div className="flex flex-wrap gap-2">
              {currentProject.techStack.slice(0, 5).map((tech, idx) => (
                <TechLogoItem key={`${tech.name}-${idx}`} name={tech.name} size="sm" showLabel={true} />
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2 pt-2">
            {currentProject.liveUrl && (
              <a
                href={currentProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/30 to-blue-600/30 border border-cyan-400/50 text-cyan-200 text-xs font-mono font-bold tracking-wider text-center flex items-center justify-center gap-2 active:scale-95"
              >
                <span>VIEW PROJECT</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
              </a>
            )}

            {currentProject.githubUrl && (
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono font-semibold tracking-wider text-center flex items-center justify-center gap-2 active:scale-95"
              >
                <Github className="w-3.5 h-3.5 text-slate-400" />
                <span>SOURCE</span>
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Project DNA Timeline */}
      <ProjectDnaTimeline project={currentProject} />
    </div>
  );
};
