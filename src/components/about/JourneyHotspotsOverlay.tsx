import React, { useEffect, useRef } from 'react';
import { X, Sparkles, ChevronRight } from 'lucide-react';

export interface MilestoneData {
  year: string;
  title: string;
  subtitle: string;
  essence: string;
  tags: string[];
  xPercent: number; // Center percentage in 1920x1080 artwork
  yPercent: number; // Center percentage in 1920x1080 artwork
  cardPlacement: 'top-right' | 'bottom-left' | 'top-left';
}

export const JOURNEY_MILESTONES: MilestoneData[] = [
  {
    year: '2023',
    title: 'THE BEGINNING',
    subtitle: 'A Curious Mind',
    essence:
      'First lines of code sparked an insatiable curiosity for algorithmic foundations, computer science, and software craftsmanship.',
    tags: ['C++', 'Python', 'Algorithms', 'Foundations'],
    xPercent: 33.7,
    yPercent: 65.5,
    cardPlacement: 'top-right',
  },
  {
    year: '2024',
    title: 'LEARNING',
    subtitle: 'Finding My Path',
    essence:
      'Deep dive into modern web architectures, TypeScript, reactive UI systems, and interactive creative graphics.',
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'WebGL'],
    xPercent: 42.8,
    yPercent: 57.5,
    cardPlacement: 'top-right',
  },
  {
    year: '2025',
    title: 'BUILDING',
    subtitle: 'Building Skills',
    essence:
      'Architecting real production projects, interactive 3D web environments, and resilient backend microservices.',
    tags: ['Full-Stack', 'Three.js', 'Node.js', 'PostgreSQL'],
    xPercent: 51.6,
    yPercent: 49.0,
    cardPlacement: 'top-right',
  },
  {
    year: '2026',
    title: 'GROWTH',
    subtitle: 'Real World Impact',
    essence:
      'Designing autonomous AI agents, distributed high-performance architectures, and systems with measurable impact.',
    tags: ['AI Agents', 'System Design', 'Cloud Native', 'Scale'],
    xPercent: 59.9,
    yPercent: 39.5,
    cardPlacement: 'bottom-left',
  },
  {
    year: '2027',
    title: 'FUTURE',
    subtitle: 'Larger Impact',
    essence:
      'Pioneering next-generation immersive computing, advancing human-computer symbiosis, and leading deep-tech ventures.',
    tags: ['Deep Tech', 'Immersive Web', 'Leadership', 'Future'],
    xPercent: 67.8,
    yPercent: 30.0,
    cardPlacement: 'bottom-left',
  },
];

interface JourneyHotspotsOverlayProps {
  activeMilestoneYear: string | null;
  onSelectMilestone: (year: string | null) => void;
  prefersReducedMotion?: boolean;
}

export function JourneyHotspotsOverlay({
  activeMilestoneYear,
  onSelectMilestone,
  prefersReducedMotion = false,
}: JourneyHotspotsOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onSelectMilestone(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectMilestone]);

  const activeMilestone = JOURNEY_MILESTONES.find(
    (m) => m.year === activeMilestoneYear
  );

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
      {/* Interactive Hotspot Beacons placed directly over each marker in the artwork */}
      {JOURNEY_MILESTONES.map((milestone) => {
        const isActive = activeMilestoneYear === milestone.year;

        return (
          <div
            key={milestone.year}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            style={{
              left: `${milestone.xPercent}%`,
              top: `${milestone.yPercent}%`,
            }}
          >
            {/* Interactive Target Circle over the marker in the background */}
            <button
              id={`journey-marker-${milestone.year}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelectMilestone(isActive ? null : milestone.year);
              }}
              aria-label={`Journey milestone ${milestone.year}: ${milestone.title}`}
              aria-expanded={isActive}
              className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 group focus:outline-none ${
                isActive
                  ? 'scale-110'
                  : 'hover:scale-105'
              }`}
            >
              {/* Pulsing Aura on Hover or Active */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'ring-2 ring-cyan-300 shadow-[0_0_24px_#00f5ff,inset_0_0_12px_rgba(0,245,255,0.4)] bg-cyan-400/20'
                    : 'group-hover:ring-2 group-hover:ring-cyan-400/80 group-hover:shadow-[0_0_16px_rgba(0,245,255,0.6)] group-hover:bg-cyan-400/10'
                }`}
              />

              {/* Gentle breathing ring animation */}
              {!isActive && !prefersReducedMotion && (
                <span className="absolute -inset-1 rounded-full border border-cyan-400/30 animate-ping pointer-events-none opacity-40" />
              )}

              {/* Floating Tooltip on Hover when not active */}
              {!isActive && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-950/90 border border-cyan-500/40 text-[9px] font-mono-code text-cyan-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[0_0_10px_rgba(0,245,255,0.3)]">
                  {milestone.year} • {milestone.title}
                </div>
              )}
            </button>

            {/* Anchored Glass Detail Panel */}
            {isActive && (
              <div
                ref={panelRef}
                onClick={(e) => e.stopPropagation()}
                className={`absolute z-50 w-[280px] sm:w-[320px] max-w-[calc(100vw-32px)] rounded-2xl border border-cyan-400/50 bg-slate-950/90 backdrop-blur-2xl p-4 shadow-[0_0_35px_rgba(0,245,255,0.35),inset_0_0_20px_rgba(0,245,255,0.06)] animate-fade-in pointer-events-auto box-border ${
                  milestone.cardPlacement === 'top-right'
                    ? 'bottom-full right-0 sm:left-0 mb-3'
                    : 'top-full right-0 mt-3'
                }`}
              >
                {/* Header: Year Pill + Title + Close Button */}
                <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-[10px] font-orbitron font-bold text-cyan-300 tracking-wider shadow-[0_0_8px_rgba(0,245,255,0.3)]">
                      {milestone.year}
                    </span>
                    <span className="font-orbitron text-xs font-bold text-slate-100 tracking-wider">
                      {milestone.title}
                    </span>
                  </div>

                  <button
                    id={`close-milestone-${milestone.year}`}
                    onClick={() => onSelectMilestone(null)}
                    className="w-6 h-6 rounded-full border border-slate-700 bg-slate-900/60 hover:border-cyan-400 hover:text-cyan-300 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close details"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtitle */}
                <div className="text-[11px] font-mono-code text-cyan-300 font-medium italic mt-2.5">
                  “{milestone.subtitle}”
                </div>

                {/* Essence Description */}
                <p className="text-[11px] sm:text-xs font-mono-code text-slate-300 leading-relaxed mt-1.5">
                  {milestone.essence}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-cyan-500/15">
                  {milestone.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-slate-900/80 border border-cyan-500/25 text-[9px] font-mono-code text-cyan-400 tracking-wider"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Next Milestone Navigation Pill */}
                <div className="mt-3 flex justify-end">
                  {(() => {
                    const currentIndex = JOURNEY_MILESTONES.findIndex(
                      (m) => m.year === milestone.year
                    );
                    const nextMilestone =
                      JOURNEY_MILESTONES[
                        (currentIndex + 1) % JOURNEY_MILESTONES.length
                      ];
                    return (
                      <button
                        onClick={() => onSelectMilestone(nextMilestone.year)}
                        className="flex items-center gap-1 text-[10px] font-mono-code text-cyan-400 hover:text-cyan-200 transition-colors cursor-pointer group"
                      >
                        <span>Next: {nextMilestone.year}</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
