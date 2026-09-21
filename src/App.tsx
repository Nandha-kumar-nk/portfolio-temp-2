import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { SceneNumber, SCENES_DATA } from './types';
import { useDeviceQuality } from './hooks/useDeviceQuality';
import { useScrollProgress } from './hooks/useScrollProgress';
import { ExperienceCanvas } from './components/ExperienceCanvas';
import { CinematicIntro } from './components/CinematicIntro';
import { GlobalHeader, NavSection } from './components/GlobalHeader';
import { HomeScene } from './components/HomeScene';
import { AboutScene } from './components/AboutScene';
import { SkillsScene } from './components/SkillsScene';
import { ProjectsScene } from './components/ProjectsScene';
import { ContactSection } from './components/ContactSection';
import { GalaxyBackground } from './components/backgrounds/GalaxyBackground';
import { soundEngine } from './utils/audio';
import { WebGLErrorBoundary } from './components/WebGLErrorBoundary';

// Universe Pulse Phase 3 Section Settling Motion Wrapper
function UniverseSection({
  id,
  isActive,
  isReduced,
  children,
}: {
  id: NavSection;
  isActive: boolean;
  isReduced?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      id={id}
      initial={false}
      animate={
        isReduced
          ? { opacity: 1 }
          : isActive
          ? { opacity: 1, y: 0 }
          : { opacity: 0.96, y: 6 }
      }
      transition={{
        duration: isReduced ? 0.2 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative w-full min-h-[100svh] flex flex-col justify-between box-border"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const quality = useDeviceQuality();
  const scrollState = useScrollProgress();

  // 1. Cinematic Intro Boot Sequence
  // Plays on initial entry (Scenes 1 to 6: 01 INIT -> 02 FORMING -> 03 CODE TO UNIVERSE -> 04 LOADING -> 05 READY -> 06 WELCOME)
  const [isIntroActive, setIsIntroActive] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('nu_intro_completed');
    }
    return true;
  });
  const [isIntroFadingOut, setIsIntroFadingOut] = useState<boolean>(false);
  const [currentScene, setCurrentScene] = useState<SceneNumber>(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('nu_intro_completed')) {
      return 7;
    }
    return 1;
  });

  const [progress, setProgress] = useState<number>(15);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);
  const [transitionProgress, setTransitionProgress] = useState<number>(0);

  // 2. Active section tracking for navbar highlighting
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const prevSectionRef = useRef<NavSection>('home');

  const sceneStartTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<number | null>(null);

  // Direct section switcher helper
  const scrollToSection = useCallback(
    (sectionId: NavSection) => {
      if (isIntroActive) return;
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        setActiveSection(sectionId);
        prevSectionRef.current = sectionId;
      }
    },
    [isIntroActive]
  );

  // IntersectionObserver for active navigation highlighting
  useEffect(() => {
    if (isIntroActive) return;

    const sectionIds: NavSection[] = ['home', 'about', 'skills', 'projects', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let mostVisibleId: NavSection | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleId = entry.target.id as NavSection;
          }
        });

        if (mostVisibleId && maxRatio >= 0.2) {
          setActiveSection(mostVisibleId);
          prevSectionRef.current = mostVisibleId;
        }
      },
      {
        root: null,
        rootMargin: '-15% 0px -25% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isIntroActive]);

  // Ensure scroll is locked during cinematic intro to maintain clean full-screen isolation
  useEffect(() => {
    if (isIntroActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isIntroActive]);

  // Switch to a designated scene during intro
  const goToScene = useCallback((targetScene: SceneNumber) => {
    setCurrentScene(targetScene);
    sceneStartTimeRef.current = Date.now();
    soundEngine.playSceneTransition(targetScene);

    if (SCENES_DATA[targetScene]) {
      const targetP = SCENES_DATA[targetScene].targetProgress;
      setProgress(targetP);
    }
  }, []);

  // Audio Toggle
  const handleToggleAudio = useCallback(() => {
    const active = soundEngine.toggleMute();
    setIsAudioOn(active);
  }, []);

  // Toggle Auto Play
  const handleToggleAutoPlay = useCallback(() => {
    setIsAutoPlay((prev) => !prev);
  }, []);

  // Explore / Complete Intro -> Transitions into HOME with smooth cinematic fade
  const handleCompleteIntro = useCallback(() => {
    if (isIntroFadingOut) return;
    soundEngine.playChime(987.77, 2.5);
    sessionStorage.setItem('nu_intro_completed', 'true');
    setIsIntroFadingOut(true);

    // Smooth 950ms cinematic transition into Home (700-1200ms range)
    setTimeout(() => {
      setIsIntroActive(false);
      setIsIntroFadingOut(false);
      setCurrentScene(7); // Scene 7 = HOME
      scrollToSection('home');
    }, 950);
  }, [isIntroFadingOut, scrollToSection]);

  // Replay from Scene 1
  const handleReplayIntro = useCallback(() => {
    sessionStorage.removeItem('nu_intro_completed');
    setIsIntroFadingOut(false);
    setIsIntroActive(true);
    setIsAutoPlay(true);
    goToScene(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [goToScene]);

  // Auto-progression loop through intro scenes 1 to 6 (Target: 5 to 7 seconds total)
  useEffect(() => {
    if (!isIntroActive) return;
    if (!isAutoPlay) return;

    const sceneData = SCENES_DATA[currentScene];
    if (!sceneData) return;
    const duration = sceneData.durationMs;

    // In Scene 6 (WELCOME), auto-transition to HOME after duration expires, or wait for user tap
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - sceneStartTimeRef.current;
      const ratio = Math.min(elapsed / duration, 1);
      setTransitionProgress(ratio);

      const prevProgress =
        currentScene === 1 ? 0 : SCENES_DATA[(currentScene - 1) as SceneNumber]?.targetProgress || 0;
      const nextProgress = sceneData.targetProgress;
      const currentP = prevProgress + (nextProgress - prevProgress) * ratio;
      setProgress(currentP);

      if (ratio >= 1) {
        window.clearInterval(interval);
        if (currentScene < 6) {
          const nextScene = (currentScene + 1) as SceneNumber;
          goToScene(nextScene);
        }
        // In Scene 6 (WELCOME), hold the glorious final state and active EXPLORE button for the user to click
      }
    }, 35);

    timerRef.current = interval;

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [currentScene, isAutoPlay, isIntroActive, goToScene, handleCompleteIntro]);

  return (
    <div className="relative w-full min-h-screen bg-[#020206] text-white overflow-x-hidden selection:bg-cyan-500 selection:text-black">

      {/* ===================================================================== */}
      {/* 1. CINEMATIC INTRO FULL-SCREEN BOOT EXPERIENCE (Scenes 1 to 6)        */}
      {/* Dedicated full-screen overlay at z-[9999], completely isolated        */}
      {/* Sequence: 01 INIT -> 02 FORMING -> 03 CODE TO UNIVERSE                */}
      {/* -> 04 LOADING -> 05 READY -> 06 WELCOME -> smooth 750ms fade to HOME  */}
      {/* ===================================================================== */}
      {isIntroActive && currentScene <= 6 && (
        <CinematicIntro
          currentScene={currentScene}
          progress={progress}
          transitionProgress={transitionProgress}
          isAutoPlay={isAutoPlay}
          isAudioOn={isAudioOn}
          quality={quality}
          isFadingOut={isIntroFadingOut}
          onToggleAutoPlay={handleToggleAutoPlay}
          onToggleAudio={handleToggleAudio}
          onSelectScene={goToScene}
          onComplete={handleCompleteIntro}
        />
      )}

      {/* ===================================================================== */}
      {/* 2. GLOBAL GALAXY PARTICLE BACKGROUND (z-0, bottom layer)               */}
      {/* ===================================================================== */}
      {!isIntroActive && (
        <GalaxyBackground
          activeSection={activeSection}
          quality={quality}
          isTransitioning={false}
          mousePos={scrollState.mousePos}
        />
      )}

      {/* ===================================================================== */}
      {/* 2.5 3D THREE.JS UNIVERSE CANVAS (Cinematic Intro & Home Universe Core) */}
      {/* Background 3D canvas layer: z-[1], pointer-events-none                 */}
      {/* ===================================================================== */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden"
        style={{ background: 'transparent' }}
      >
        <WebGLErrorBoundary name="AppExperienceCanvas">
          <ExperienceCanvas
            currentScene={currentScene}
            transitionProgress={transitionProgress}
            quality={quality}
            scrollSectionProgress={scrollState.scrollSectionProgress}
            mousePos={scrollState.mousePos}
          />
        </WebGLErrorBoundary>
      </div>

      {/* ===================================================================== */}
      {/* 3. UNIFIED GLOBAL NAVIGATION NAVBAR (z-[100])                         */}
      {/* MUST NOT render during intro. Appears ONLY after intro finishes.      */}
      {/* ===================================================================== */}
      {!isIntroActive && (
        <GlobalHeader
          activeSection={activeSection}
          onNavigate={scrollToSection}
          isAudioOn={isAudioOn}
          onToggleAudio={handleToggleAudio}
          onReplayIntro={handleReplayIntro}
        />
      )}

      {/* ===================================================================== */}
      {/* 4. SCROLLABLE WEBSITE SECTIONS                                        */}
      {/* ===================================================================== */}
      {!isIntroActive && (
        <main className="relative z-10 w-full flex flex-col bg-transparent">
          {/* Section 1: HOME */}
          <UniverseSection id="home" isActive={activeSection === 'home'} isReduced={quality.prefersReducedMotion}>
            <HomeScene
              onNavigateAbout={() => scrollToSection('about')}
              onNavigateProjects={() => scrollToSection('projects')}
              quality={quality}
              isAudioOn={isAudioOn}
              onToggleAudio={handleToggleAudio}
              isTransitioning={isIntroFadingOut}
            />
          </UniverseSection>

          {/* Section 2: ABOUT */}
          <UniverseSection id="about" isActive={activeSection === 'about'} isReduced={quality.prefersReducedMotion}>
            <AboutScene
              onNavigateHome={() => scrollToSection('home')}
              onNavigateSkills={() => scrollToSection('skills')}
              quality={quality}
              isAudioOn={isAudioOn}
              onToggleAudio={handleToggleAudio}
            />
          </UniverseSection>

          {/* Section 3: SKILLS */}
          <UniverseSection id="skills" isActive={activeSection === 'skills'} isReduced={quality.prefersReducedMotion}>
            <SkillsScene
              onNavigateHome={() => scrollToSection('home')}
              onNavigateAbout={() => scrollToSection('about')}
              onNavigateProjects={() => scrollToSection('projects')}
              onNavigateContact={() => scrollToSection('contact')}
              onReplaySequence={handleReplayIntro}
              quality={quality}
              isAudioOn={isAudioOn}
              onToggleAudio={handleToggleAudio}
            />
          </UniverseSection>

          {/* Section 4: PROJECTS */}
          <UniverseSection id="projects" isActive={activeSection === 'projects'} isReduced={quality.prefersReducedMotion}>
            <ProjectsScene
              isActive={activeSection === 'projects'}
              onNavigateHome={() => scrollToSection('home')}
              onNavigateAbout={() => scrollToSection('about')}
              onNavigateSkills={() => scrollToSection('skills')}
              onNavigateContact={() => scrollToSection('contact')}
              onReplaySequence={handleReplayIntro}
              quality={quality}
              isAudioOn={isAudioOn}
              onToggleAudio={handleToggleAudio}
            />
          </UniverseSection>

          {/* Section 5: CONTACT */}
          <UniverseSection id="contact" isActive={activeSection === 'contact'} isReduced={quality.prefersReducedMotion}>
            <ContactSection onScrollToTop={() => scrollToSection('home')} />
          </UniverseSection>
        </main>
      )}
    </div>
  );
}

