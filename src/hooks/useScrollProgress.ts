import { useState, useEffect } from 'react';

export interface ScrollProgressState {
  scrollProgress: number; // 0.0 to 1.0 overall page scroll
  scrollSectionProgress: number; // 0.0 (Home) -> 1.0 (About) -> 2.0 (Skills) -> 3.0 (Projects) -> 4.0 (Contact)
  activeSectionIndex: number; // 0, 1, 2, 3, 4
  mousePos: { x: number; y: number }; // Normalized -1 to 1
}

export function useScrollProgress(): ScrollProgressState {
  const [scrollState, setScrollState] = useState<ScrollProgressState>({
    scrollProgress: 0,
    scrollSectionProgress: 0,
    activeSectionIndex: 0,
    mousePos: { x: 0, y: 0 },
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let animFrameId: number | null = null;

    const handleScroll = () => {
      if (animFrameId) return;

      animFrameId = requestAnimationFrame(() => {
        animFrameId = null;
        const scrollY = window.scrollY;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const overallProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

        const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];
        const sectionEls = sectionIds.map((id) => document.getElementById(id));
        const viewportHeight = window.innerHeight;

        let sectionProgress = 0;
        let activeIdx = 0;

        // Calculate continuous section position
        for (let i = 0; i < sectionEls.length; i++) {
          const el = sectionEls[i];
          if (!el) continue;
          const rect = el.getBoundingClientRect();

          if (rect.top <= viewportHeight * 0.5 && rect.bottom >= viewportHeight * 0.2) {
            activeIdx = i;
            // Calculate progress through this section (0 to 1)
            const sectionHeight = Math.max(1, rect.height);
            const internalRatio = Math.min(1, Math.max(0, (viewportHeight * 0.5 - rect.top) / sectionHeight));
            sectionProgress = i + internalRatio;
            break;
          } else if (rect.top > viewportHeight * 0.5 && i === 0) {
            sectionProgress = 0;
            activeIdx = 0;
            break;
          } else if (i === sectionEls.length - 1 && rect.bottom < viewportHeight * 0.5) {
            sectionProgress = sectionEls.length - 1;
            activeIdx = sectionEls.length - 1;
          }
        }

        setScrollState((prev) => ({
          ...prev,
          scrollProgress: overallProgress,
          scrollSectionProgress: sectionProgress,
          activeSectionIndex: activeIdx,
        }));
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setScrollState((prev) => ({
        ...prev,
        mousePos: { x: nx, y: ny },
      }));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return scrollState;
}
