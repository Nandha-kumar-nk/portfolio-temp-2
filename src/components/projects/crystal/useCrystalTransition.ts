import { useState, useRef, useCallback, useEffect } from 'react';

export type CrystalPhase =
  | 0 // IDLE
  | 1 // FOCUS (0.0 - 0.3s)
  | 2 // CHARGE (0.3 - 0.6s)
  | 3 // FRACTURE (0.6 - 1.0s)
  | 4 // SHATTER (1.0 - 1.4s)
  | 5 // PARTICLE TRANSITION (1.4 - 1.8s)
  | 6 // RECONSTRUCTION (1.8 - 2.2s)
  | 7; // NEW PROJECT STABILIZE (2.2 - 2.5s)

export interface CrystalTransitionState {
  phase: CrystalPhase;
  phaseProgress: number; // 0 to 1 within the current phase
  overallProgress: number; // 0 to 1 across entire transition
  direction: number; // 1 for next, -1 for prev
  isTransitioning: boolean;
  activeProjectIndex: number;
  displayProjectIndex: number; // Project currently visible in HTML UI
  fromProjectIndex: number;
  uiFadeProgress: number; // 1 = fully visible, 0 = faded during shatter/particle
  startTransition: (targetIndex: number) => boolean;
}

export function useCrystalTransition(
  totalProjects: number,
  initialIndex: number = 0,
  prefersReducedMotion: boolean = false
): CrystalTransitionState {
  const [phase, setPhase] = useState<CrystalPhase>(0);
  const [phaseProgress, setPhaseProgress] = useState<number>(0);
  const [overallProgress, setOverallProgress] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(initialIndex);
  const [displayProjectIndex, setDisplayProjectIndex] = useState<number>(initialIndex);
  const [fromProjectIndex, setFromProjectIndex] = useState<number>(initialIndex);
  const [uiFadeProgress, setUiFadeProgress] = useState<number>(1);

  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const targetIndexRef = useRef<number>(initialIndex);
  const fromIndexRef = useRef<number>(initialIndex);

  const TOTAL_DURATION_MS = prefersReducedMotion ? 600 : 2400;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const tick = useCallback(
    (timestamp: number) => {
      const elapsed = timestamp - startTimeRef.current;
      const totalDur = TOTAL_DURATION_MS;

      if (prefersReducedMotion) {
        // Simple graceful crossfade for reduced motion
        const progress = Math.min(1, elapsed / totalDur);
        setOverallProgress(progress);

        if (progress < 0.5) {
          const fade = 1 - progress * 2;
          setUiFadeProgress(fade);
          setPhase(1);
          setPhaseProgress(progress * 2);
        } else {
          setDisplayProjectIndex(targetIndexRef.current);
          setActiveProjectIndex(targetIndexRef.current);
          const fadeIn = (progress - 0.5) * 2;
          setUiFadeProgress(fadeIn);
          setPhase(7);
          setPhaseProgress(fadeIn);
        }

        if (progress >= 1) {
          setPhase(0);
          setPhaseProgress(0);
          setOverallProgress(0);
          setUiFadeProgress(1);
          setIsTransitioning(false);
          return;
        }

        animFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      // Standard 7-Phase Cinematic Sequence (2400ms)
      // Phase 1 — FOCUS: 0 to 300ms (dur: 300)
      // Phase 2 — CHARGE: 300 to 600ms (dur: 300)
      // Phase 3 — FRACTURE: 600 to 1000ms (dur: 400)
      // Phase 4 — SHATTER: 1000 to 1400ms (dur: 400)
      // Phase 5 — PARTICLE: 1400 to 1800ms (dur: 400) -> Switch project at 1600ms
      // Phase 6 — RECONSTRUCTION: 1800 to 2200ms (dur: 400)
      // Phase 7 — NEW PROJECT: 2200 to 2400ms (dur: 200)

      const overall = Math.min(1, elapsed / 2400);
      setOverallProgress(overall);

      let currentPhase: CrystalPhase = 0;
      let pProgress = 0;
      let uiFade = 1;

      if (elapsed < 300) {
        // Phase 1: FOCUS
        currentPhase = 1;
        pProgress = elapsed / 300;
        uiFade = 1;
      } else if (elapsed < 600) {
        // Phase 2: CHARGE
        currentPhase = 2;
        pProgress = (elapsed - 300) / 300;
        uiFade = 1 - pProgress * 0.3; // subtle UI dimming as charge builds
      } else if (elapsed < 1000) {
        // Phase 3: FRACTURE
        currentPhase = 3;
        pProgress = (elapsed - 600) / 400;
        uiFade = 0.7 - pProgress * 0.4;
      } else if (elapsed < 1400) {
        // Phase 4: SHATTER
        currentPhase = 4;
        pProgress = (elapsed - 1000) / 400;
        uiFade = Math.max(0, 0.3 - pProgress * 0.3); // UI fades out
      } else if (elapsed < 1800) {
        // Phase 5: PARTICLE TRANSITION
        currentPhase = 5;
        pProgress = (elapsed - 1400) / 400;
        uiFade = 0;

        // Switch to target project during dense center particle cloud at 1600ms
        if (elapsed >= 1600 && displayProjectIndex !== targetIndexRef.current) {
          setDisplayProjectIndex(targetIndexRef.current);
          setActiveProjectIndex(targetIndexRef.current);
        }
      } else if (elapsed < 2200) {
        // Phase 6: RECONSTRUCTION
        currentPhase = 6;
        pProgress = (elapsed - 1800) / 400;
        // UI begins softly returning
        uiFade = Math.min(1, pProgress * 0.7);
      } else if (elapsed < 2400) {
        // Phase 7: NEW PROJECT STABILIZE
        currentPhase = 7;
        pProgress = (elapsed - 2200) / 200;
        uiFade = 0.7 + pProgress * 0.3;
      } else {
        // Sequence Complete -> IDLE
        currentPhase = 0;
        pProgress = 0;
        uiFade = 1;
        setDisplayProjectIndex(targetIndexRef.current);
        setActiveProjectIndex(targetIndexRef.current);
        setPhase(0);
        setPhaseProgress(0);
        setOverallProgress(0);
        setUiFadeProgress(1);
        setIsTransitioning(false);
        return;
      }

      setPhase(currentPhase);
      setPhaseProgress(pProgress);
      setUiFadeProgress(uiFade);

      animFrameRef.current = requestAnimationFrame(tick);
    },
    [TOTAL_DURATION_MS, prefersReducedMotion, displayProjectIndex]
  );

  const startTransition = useCallback(
    (targetIdx: number) => {
      // Rapid clicking protection: Ignore if already running or if target is current
      if (isTransitioning) return false;
      if (targetIdx === activeProjectIndex) return false;
      if (targetIdx < 0 || targetIdx >= totalProjects) return false;

      // Determine directional trajectory (for shards & particles)
      let dir = 1;
      if (targetIdx === 0 && activeProjectIndex === totalProjects - 1) {
        dir = 1; // wrapping forward
      } else if (targetIdx === totalProjects - 1 && activeProjectIndex === 0) {
        dir = -1; // wrapping backward
      } else {
        dir = targetIdx > activeProjectIndex ? 1 : -1;
      }

      setIsTransitioning(true);
      setDirection(dir);
      setFromProjectIndex(activeProjectIndex);
      fromIndexRef.current = activeProjectIndex;
      targetIndexRef.current = targetIdx;
      startTimeRef.current = performance.now();

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(tick);

      return true;
    },
    [isTransitioning, activeProjectIndex, totalProjects, tick]
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
