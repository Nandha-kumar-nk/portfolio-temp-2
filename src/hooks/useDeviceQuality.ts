import { useState, useEffect, useMemo } from 'react';

export type QualityTier = 'HIGH' | 'MEDIUM' | 'LOW';
export type QualityMode = 'AUTO' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface DeviceQualityInfo {
  tier: QualityTier;
  mode: QualityMode;
  setMode: (mode: QualityMode) => void;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isUltrawide: boolean;
  isPortrait: boolean;
  width: number;
  height: number;
  aspectRatio: number;
  dpr: number;
  particleCount: number;
  backgroundStarCount: number;
  orbitalRingCount: number;
  techNodeCount: number;
  prefersReducedMotion: boolean;
  touchDevice: boolean;
}

export function useDeviceQuality(): DeviceQualityInfo {
  const [mode, setMode] = useState<QualityMode>('AUTO');
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [touchDevice, setTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect touch capability
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setTouchDevice(isTouch);

    // Detect reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    // Resize listener with debounced raf
    let rafId: number | null = null;
    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', motionListener);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const { width, height } = windowSize;
  const aspectRatio = width / (height || 1);
  const isPortrait = aspectRatio < 1.0;
  const isMobile = width < 640 || (touchDevice && width < 768 && isPortrait);
  const isTablet = !isMobile && width < 1024;
  const isDesktop = width >= 1024 && width < 1920;
  const isUltrawide = width >= 1920;

  // Auto quality resolution based on hardware & viewport
  const autoTier: QualityTier = useMemo(() => {
    // 1. Mobile devices or very narrow screens (< 600px)
    if (width < 600 || (touchDevice && width < 768)) {
      return 'LOW';
    }
    // 2. Tablets or intermediate viewports
    if (width < 1024) {
      return 'MEDIUM';
    }
    // 3. Desktop viewports
    return 'HIGH';
  }, [width, touchDevice]);

  const effectiveTier: QualityTier = mode === 'AUTO' ? autoTier : mode;

  // Device-aware configuration parameters
  const qualityParams = useMemo(() => {
    switch (effectiveTier) {
      case 'LOW':
        return {
          dpr: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.25),
          particleCount: 800,
          backgroundStarCount: 350,
          orbitalRingCount: 1,
          techNodeCount: 3,
        };
      case 'MEDIUM':
        return {
          dpr: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5),
          particleCount: 1400,
          backgroundStarCount: 650,
          orbitalRingCount: 2,
          techNodeCount: 4,
        };
      case 'HIGH':
      default:
        return {
          dpr: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2.0),
          particleCount: 2200,
          backgroundStarCount: 1200,
          orbitalRingCount: 3,
          techNodeCount: 6,
        };
    }
  }, [effectiveTier]);

  return {
    tier: effectiveTier,
    mode,
    setMode,
    isMobile,
    isTablet,
    isDesktop,
    isUltrawide,
    isPortrait,
    width,
    height,
    aspectRatio,
    dpr: qualityParams.dpr,
    particleCount: qualityParams.particleCount,
    backgroundStarCount: qualityParams.backgroundStarCount,
    orbitalRingCount: qualityParams.orbitalRingCount,
    techNodeCount: qualityParams.techNodeCount,
    prefersReducedMotion,
    touchDevice,
  };
}
