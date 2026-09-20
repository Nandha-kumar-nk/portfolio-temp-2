import { useState, useRef, useCallback } from 'react';

/**
 * 6-Step Signature Transition Phases for the 3D Project Cube Archive:
 * 0: IDLE (Static floating, slow rotation)
 * 1: FOCUS (250ms - slow down, flare glow, particles gather)
 * 2: ROTATE (350ms - rotate 90-180deg, become slightly transparent)
 * 3: DISASSEMBLE (300ms - 8-12 fragments separate outward slightly)
 * 4: FORMATION (350ms - fragments spiral/rotate around center, target project active)
 * 5: REASSEMBLE (300ms - fragments converge, new cube forms, new color/glow appears)
 * 6: REVEAL (250ms - new cube settles, project title & tech stack fade in)
 */
export type CubeTransitionPhase = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface CubeTransitionState {
  phase: CubeTransitionPhase;
  phaseProgress: number; // 0 to 1 within the active phase
  overallProgress: number; // 0 to 1 across the full transition
  direction: number; // 1 for Next, -1 for Previous
  isTransitioning: boolean;
  activeProjectIndex: number;
  displayProjectIndex: number; // Project whose UI info is displayed
  fromProjectIndex: number;
  uiFadeProgress: number; // 0 (hidden) to 1 (fully visible)
  startTransition: (targetIndex: number) => void;
}

const PHASE_DURATIONS: Record<number, number> = {
  1: 250, // FOCUS
  2: 350, // ROTATE
  3: 300, // DISASSEMBLE
  4: 350, // FORMATION
  5: 300, // REASSEMBLE
  6: 250, // REVEAL
};

export function useCubeTransition(
  totalProjects: number,
  initialIndex: number = 0,
  prefersReducedMotion: boolean = false
): CubeTransitionState {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(initialIndex);
  const [displayProjectIndex, setDisplayProjectIndex] = useState<number>(initialIndex);
  const [fromProjectIndex, setFromProjectIndex] = useState<number>(initialIndex);
  const [phase, setPhase] = useState<CubeTransitionPhase>(0);
  const [phaseProgress, setPhaseProgress] = useState<number>(0);
  const [overallProgress, setOverallProgress] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [uiFadeProgress, setUiFadeProgress] = useState<number>(1);

  const animFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);

  const startTransition = useCallback(
    (targetIndex: number) => {
      if (isRunningRef.current) return;
      if (targetIndex === activeProjectIndex) return;

      const normalizedTarget = ((targetIndex % totalProjects) + totalProjects) % totalProjects;
      const dir =
        normalizedTarget === 0 && activeProjectIndex === totalProjects - 1
          ? 1
          : normalizedTarget === totalProjects - 1 && activeProjectIndex === 0
          ? -1
          : normalizedTarget > activeProjectIndex
          ? 1
          : -1;

      setDirection(dir);
      setFromProjectIndex(activeProjectIndex);
      setIsTransitioning(true);
      isRunningRef.current = true;

      // Handle prefers-reduced-motion: clean fast crossfade
      if (prefersReducedMotion) {
        setUiFadeProgress(0);
        setTimeout(() => {
          setActiveProjectIndex(normalizedTarget);
          setDisplayProjectIndex(normalizedTarget);
          setUiFadeProgress(1);
          setIsTransitioning(false);
          isRunningRef.current = false;
        }, 300);
        return;
      }

      // Execute the 6-step signature sequence via high-precision requestAnimationFrame
      const totalDuration =
        PHASE_DURATIONS[1] +
        PHASE_DURATIONS[2] +
        PHASE_DURATIONS[3] +
        PHASE_DURATIONS[4] +
        PHASE_DURATIONS[5] +
        PHASE_DURATIONS[6]; // ~1800ms

      const startTime = performance.now();
      let hasSwitchedProject = false;

      const runLoop = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const oProg = Math.min(1, elapsed / totalDuration);
        setOverallProgress(oProg);

        // Determine current phase based on elapsed time thresholds
        let currentP: CubeTransitionPhase = 1;
        let pStart = 0;
        let pDuration = PHASE_DURATIONS[1];

        const tPhase1 = PHASE_DURATIONS[1];
        const tPhase2 = tPhase1 + PHASE_DURATIONS[2];
        const tPhase3 = tPhase2 + PHASE_DURATIONS[3];
        const tPhase4 = tPhase3 + PHASE_DURATIONS[4];
        const tPhase5 = tPhase4 + PHASE_DURATIONS[5];

        if (elapsed < tPhase1) {
          currentP = 1;
          pStart = 0;
          pDuration = PHASE_DURATIONS[1];
        } else if (elapsed < tPhase2) {
          currentP = 2;
          pStart = tPhase1;
          pDuration = PHASE_DURATIONS[2];
        } else if (elapsed < tPhase3) {
          currentP = 3;
          pStart = tPhase2;
          pDuration = PHASE_DURATIONS[3];
        } else if (elapsed < tPhase4) {
          currentP = 4;
          pStart = tPhase3;
          pDuration = PHASE_DURATIONS[4];
        } else if (elapsed < tPhase5) {
          currentP = 5;
          pStart = tPhase4;
          pDuration = PHASE_DURATIONS[5];
        } else {
          currentP = 6;
          pStart = tPhase5;
          pDuration = PHASE_DURATIONS[6];
        }

        const pProg = Math.min(1, Math.max(0, (elapsed - pStart) / pDuration));
        setPhase(currentP);
        setPhaseProgress(pProg);

        // Switch active project data during Phase 4 (FORMATION)
        if (currentP >= 4 && !hasSwitchedProject) {
          hasSwitchedProject = true;
          setActiveProjectIndex(normalizedTarget);
          setDisplayProjectIndex(normalizedTarget);
        }

        // Manage UI fade progress (text & badges fade out in phase 2-3, fade in during phase 5-6)
        if (currentP === 1) {
          setUiFadeProgress(1 - pProg * 0.4);
        } else if (currentP === 2 || currentP === 3) {
          setUiFadeProgress(Math.max(0, 0.6 - (currentP === 2 ? pProg * 0.4 : 0.2)));
        } else if (currentP === 4) {
          setUiFadeProgress(0);
        } else if (currentP === 5) {
          setUiFadeProgress(pProg * 0.7);
        } else if (currentP === 6) {
          setUiFadeProgress(0.7 + pProg * 0.3);
        }

        if (elapsed < totalDuration) {
          animFrameRef.current = requestAnimationFrame(runLoop);
        } else {
          // Transition Complete: settle back to IDLE
          setPhase(0);
          setPhaseProgress(0);
          setOverallProgress(1);
          setUiFadeProgress(1);
          setIsTransitioning(false);
          isRunningRef.current = false;
        }
      };

      animFrameRef.current = requestAnimationFrame(runLoop);
    },
    [activeProjectIndex, totalProjects, prefersReducedMotion]
  );

  return {
    phase,
    phaseProgress,
    overallProgress,
    direction,
    isTransitioning,
    activeProjectIndex,
    displayProjectIndex,
    fromProjectIndex,
    uiFadeProgress,
    startTransition,
  };
}
