import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundEngine } from '../../utils/audio';

export interface TransitionState {
  isTransitioning: boolean;
  phase: number; // 0=IDLE, 1=FOCUS, 2=FRACTURE, 3=FLOW, 4=REBUILD, 5=MATERIALIZE, 6=UPDATE
  phaseProgress: number; // 0 to 1
  fromIndex: number;
  toIndex: number;
  direction: number; // 1 for next, -1 for prev
}

interface UseProjectTransitionOptions {
  totalProjects: number;
  isMobile?: boolean;
  onProjectChange: (newIndex: number) => void;
}

export function useProjectTransition({
  totalProjects: _totalProjects,
  isMobile = false,
  onProjectChange,
}: UseProjectTransitionOptions) {
  const [state, setState] = useState<TransitionState>({
    isTransitioning: false,
    phase: 0,
    phaseProgress: 0,
    fromIndex: 0,
    toIndex: 0,
    direction: 1,
  });

  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Exact durations from master specification:
  // Desktop: 1400ms total
  // Mobile: 750ms total
  const totalDuration = isMobile ? 750 : 1400;

  // Phase milestones in normalized time (0 to 1)
  // Phase 1 FOCUS: 0 to 150ms / 1400ms = 0.0 to 0.107
  // Phase 2 FRACTURE: 150 to 400ms / 1400ms = 0.107 to 0.286
  // Phase 3 TRANSMISSION: 400 to 700ms / 1400ms = 0.286 to 0.500
  // Phase 4 RECONSTRUCTION: 700 to 1000ms / 1400ms = 0.500 to 0.714
  // Phase 5 MATERIALIZATION: 1000 to 1250ms / 1400ms = 0.714 to 0.893
  // Phase 6 STORY UPDATE: 1250 to 1400ms / 1400ms = 0.893 to 1.000
  const phases = [
    { phase: 1, start: 0.0, end: 0.107 },
    { phase: 2, start: 0.107, end: 0.286 },
    { phase: 3, start: 0.286, end: 0.5 },
    { phase: 4, start: 0.5, end: 0.714 },
    { phase: 5, start: 0.714, end: 0.893 },
    { phase: 6, start: 0.893, end: 1.0 },
  ];

  const triggerTransition = useCallback(
    (targetIndex: number, forcedDirection?: number) => {
      if (state.isTransitioning) return;

      const fromIdx = state.toIndex;
      if (targetIndex === fromIdx) return;

      const dir =
        forcedDirection !== undefined
          ? forcedDirection
          : targetIndex > fromIdx
          ? 1
          : -1;

      // Audio cue for transition start
      try {
        soundEngine.playChime(523.25 * (1 + targetIndex * 0.1), 1.2);
      } catch (_e) {
        // Safe fallback
      }

      // Check for user preference for reduced motion
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        onProjectChange(targetIndex);
        setState({
          isTransitioning: false,
          phase: 0,
          phaseProgress: 0,
          fromIndex: targetIndex,
          toIndex: targetIndex,
          direction: dir,
        });
        return;
      }

      startTimeRef.current = performance.now();
      let projectSwapped = false;

      const step = (now: number) => {
        const elapsed = now - startTimeRef.current;
        const rawProgress = Math.min(1, elapsed / totalDuration);

        // Find active phase and its internal 0..1 progress
        let activePhase = 6;
        let phaseProg = 1;

        for (const p of phases) {
          if (rawProgress >= p.start && rawProgress <= p.end) {
            activePhase = p.phase;
            phaseProg = (rawProgress - p.start) / (p.end - p.start);
            break;
          }
        }

        // Project swap occurs at start of Phase 4 (Reconstruction, 700ms),
        // so new crystal geometry & image materialize cleanly inside the reforming facets
        if (rawProgress >= 0.5 && !projectSwapped) {
          projectSwapped = true;
          onProjectChange(targetIndex);
        }

        if (rawProgress < 1) {
          setState({
            isTransitioning: true,
            phase: activePhase,
            phaseProgress: phaseProg,
            fromIndex: fromIdx,
            toIndex: targetIndex,
            direction: dir,
          });
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          // Completed
          setState({
            isTransitioning: false,
            phase: 0,
            phaseProgress: 0,
            fromIndex: targetIndex,
            toIndex: targetIndex,
            direction: dir,
          });
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    },
    [state.isTransitioning, state.toIndex, totalDuration, onProjectChange, phases]
  );

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return {
    state,
    triggerTransition,
  };
}

export const ProjectTransition: React.FC<{
  phase: number;
  fromName?: string;
  toName?: string;
}> = ({ phase, fromName, toName }) => {
  if (phase === 0) return null;

  const phaseLabels: Record<number, string> = {
    1: 'PHASE 1: FOCUSING CORE',
    2: 'PHASE 2: FRACTURING GEOMETRY',
    3: 'PHASE 3: TRANSMITTING DATA',
    4: 'PHASE 4: RECONSTRUCTING CRYSTAL',
    5: 'PHASE 5: MATERIALIZING PROJECT',
    6: 'PHASE 6: SYNCHRONIZING STORY',
  };

  return (
    <div className="pointer-events-none fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/85 border border-cyan-400/50 text-[10px] font-mono text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,245,255,0.25)] animate-pulse">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
      <span className="font-bold">{phaseLabels[phase] || 'TRANSMITTING...'}</span>
      {fromName && toName && (
        <span className="text-slate-400 text-[9px]">
          ({fromName} → {toName})
        </span>
      )}
    </div>
  );
};
