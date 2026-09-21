import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  Volume2,
  VolumeX,
  Menu,
  X,
  ChevronUp,
  ChevronDown,
  Terminal,
  Award,
} from 'lucide-react';
import { ReactorCore3D, SkillNodeData } from '../3d/ReactorCore3D';
import { isWebGLAvailable } from '../../utils/webgl';
import { WebGLErrorBoundary, WebGLCosmicFallback } from '../WebGLErrorBoundary';
import {
  SkillsTab,
  NavSection,
  NAV_ITEMS,
  SKILLS_TABS,
  CATEGORY_NODES,
} from '../../data/skillsData';

interface DesktopSkillsLayoutProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateProjects?: () => void;
  onNavigateContact?: () => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  selectedTab: SkillsTab;
  onSelectTab: (tab: SkillsTab) => void;
  selectedSkill: SkillNodeData | null;
  onSelectSkill: (skill: SkillNodeData | null) => void;
  hoveredSkillId: string | null;
  onHoverSkill: (id: string | null) => void;
  hideHeader?: boolean;
}

export function DesktopSkillsLayout({
  onNavigateHome,
  onNavigateAbout,
  onNavigateProjects,
  onNavigateContact,
  isAudioOn,
  onToggleAudio,
  selectedTab,
  onSelectTab,
  selectedSkill,
  onSelectSkill,
  hoveredSkillId,
  onHoverSkill,
  hideHeader = true,
}: DesktopSkillsLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasWebGLError, setHasWebGLError] = useState<boolean>(() => !isWebGLAvailable());

  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px 0px 100px 0px', threshold: 0.01 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const currentSkills = CATEGORY_NODES[selectedTab];

  const handleNavClick = (section: NavSection) => {
    setMobileMenuOpen(false);

    if (section === 'HOME') {
      onNavigateHome();
    } else if (section === 'ABOUT') {
      onNavigateAbout();
    } else if (section === 'SKILLS') {
      // already on skills
    } else if (section === 'PROJECTS') {
      if (onNavigateProjects) onNavigateProjects();
      else {
        setToastMessage('Projects module coming soon');
        setTimeout(() => setToastMessage(null), 2000);
      }
    } else if (section === 'CONTACT') {
      if (onNavigateContact) onNavigateContact();
      else {
        setToastMessage('Contact module coming soon');
        setTimeout(() => setToastMessage(null), 2000);
      }
    }
  };

  return (
    <div className="relative w-full min-h-[100svh] select-none bg-transparent text-slate-100 font-mono-code flex flex-col justify-between py-12 box-border">
      {/* 
        ========================================================================
        FUTURISTIC CINEMATIC CHAMBER ENVIRONMENT BACKGROUND
        ========================================================================
      */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Deep cosmic nebula glow behind the reactor */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_55%_45%,rgba(6,182,212,0.14),rgba(15,23,42,0.4)_60%,transparent_100%)]" />

        {/* Ambient celestial star flecks */}
        <div className="absolute inset-0 bg-[radial-gradient(1.5px_1.5px_at_20%_30%,rgba(255,255,255,0.7),transparent),radial-gradient(1px_1px_at_75%_25%,rgba(56,189,248,0.8),transparent),radial-gradient(1.5px_1.5px_at_60%_70%,rgba(6,182,212,0.6),transparent),radial-gradient(1px_1px_at_85%_65%,rgba(255,255,255,0.5),transparent)] opacity-70" />

        {/* Futuristic chamber side structural ribs / arch accents */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 border-r border-cyan-500/15 bg-gradient-to-r from-cyan-950/20 via-transparent to-transparent">
          <div className="absolute top-1/4 bottom-1/4 right-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
        </div>
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 border-l border-cyan-500/15 bg-gradient-to-l from-cyan-950/20 via-transparent to-transparent">
          <div className="absolute top-1/4 bottom-1/4 left-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
        </div>

        {/* Reflective futuristic chamber floor with subtle cyan & amber reflections */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-slate-950/90 via-cyan-950/15 to-transparent border-t border-cyan-500/10">
          <div className="absolute bottom-6 left-1/3 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
          <div className="absolute bottom-10 left-1/4 right-1/3 h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent shadow-[0_0_15px_rgba(245,158,11,0.3)]" />
        </div>
      </div>

      {/* 
        ========================================================================
        3D THREE.JS REACTOR CANVAS (THE HERO - TRANSPARENT OVER ENVIRONMENT)
        ========================================================================
      */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-10" onClick={() => onSelectSkill(null)}>
        {hasWebGLError || !isInView ? (
          <WebGLCosmicFallback className="w-full h-full" />
        ) : (
          <WebGLErrorBoundary fallback={<WebGLCosmicFallback className="w-full h-full" />} name="DesktopSkillsLayout">
            <Canvas
              camera={{ position: [0, 0, 8.0], fov: 55 }}
              onCreated={({ gl }) => {
                const handleContextLost = (e: Event) => {
                  e.preventDefault();
                  setHasWebGLError(true);
                };
                gl.domElement.addEventListener('webglcontextlost', handleContextLost, false);
              }}
              onError={() => setHasWebGLError(true)}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={1.4} />
              <directionalLight position={[5, 6, 6]} intensity={2.8} />
              <pointLight position={[-4, -3, -4]} intensity={1.8} color="#00f5ff" />

              <ReactorCore3D
                skills={currentSkills}
                selectedSkill={selectedSkill}
                onSelectSkill={(skill) => onSelectSkill(skill)}
                hoveredSkillId={hoveredSkillId}
                onHoverSkill={onHoverSkill}
              />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2 + 0.15}
                minPolarAngle={Math.PI / 2 - 0.15}
                maxAzimuthAngle={Math.PI / 12}
                minAzimuthAngle={-Math.PI / 12}
                rotateSpeed={0.25}
              />
            </Canvas>
          </WebGLErrorBoundary>
        )}
      </div>

      {/* 
        ========================================================================
        UI OVERLAY LAYER (CLEAR SPATIAL SEPARATION)
        ========================================================================
      */}
      <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-hidden">
        {/* TOP HEADER & NAVIGATION (Optional, hidden when embedded in single page) */}
        {!hideHeader && (
          <header className="flex items-center justify-between w-full pointer-events-auto gap-3">
            <button
              id="brand-logo-btn"
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 cursor-pointer text-left group"
              title="Return to Home Universe"
            >
              <div className="w-9 h-9 rounded-xl border border-cyan-500/50 bg-slate-950/80 flex items-center justify-center font-orbitron font-bold text-cyan-300 text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:border-cyan-400 group-hover:shadow-[0_0_22px_rgba(6,182,212,0.6)] transition-all">
                NU
              </div>
              <div className="flex flex-col">
                <span className="font-orbitron text-xs font-semibold tracking-wider text-slate-100 group-hover:text-cyan-200 transition-colors">
                  NANDHAKUMAR
                </span>
                <span className="text-[9px] font-mono-code text-cyan-400/80 tracking-widest leading-none">
                  UNIVERSE
                </span>
              </div>
            </button>

            <nav
              aria-label="Portfolio navigation"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/70 border border-cyan-500/35 backdrop-blur-xl shadow-[0_0_25px_rgba(0,0,0,0.6)]"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = item === 'SKILLS';
                return (
                  <button
                    key={item}
                    id={`nav-item-${item.toLowerCase()}`}
                    onClick={() => handleNavClick(item)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono-code tracking-widest transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                      isActive
                        ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/80 shadow-[0_0_16px_rgba(6,182,212,0.5)] font-semibold'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50'
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />}
                    <span>{item}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <button
                id="skills-sound-btn"
                onClick={onToggleAudio}
                className={`w-9 h-9 rounded-xl border transition-all active:scale-95 cursor-pointer flex items-center justify-center text-xs font-mono-code ${
                  isAudioOn
                    ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:text-slate-200'
                }`}
                title={isAudioOn ? 'Sound active (tap to mute)' : 'Enable sound'}
              >
                {isAudioOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-[9px] font-mono-code text-cyan-400/80 tracking-widest">DISCIPLINE</span>
                <span className="text-[9px] font-mono-code text-cyan-400/80 tracking-widest">CREATES FREEDOM</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="md:hidden w-9 h-9 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-200 flex items-center justify-center cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 text-cyan-400" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </header>
        )}

        {/* Mobile Dropdown Menu */}
        {!hideHeader && mobileMenuOpen && (
          <div className="md:hidden pointer-events-auto p-3 rounded-2xl border border-cyan-500/30 bg-slate-950/95 backdrop-blur-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)] max-w-xs mx-auto w-full mt-2">
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`w-full px-4 py-2 rounded-xl text-left font-mono-code text-xs tracking-wider flex items-center justify-between ${
                    item === 'SKILLS'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold'
                      : 'text-slate-300'
                  }`}
                >
                  <span>{item}</span>
                  {item === 'SKILLS' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MIDDLE SECTION: LEFT PANEL & RIGHT SELECTED INFO PANEL */}
        <div className="flex items-center justify-between w-full my-auto pointer-events-none">
          {/* LEFT SKILLS PANEL */}
          <aside
            id="skills-left-panel"
            className="pointer-events-auto w-[290px] sm:w-[310px] md:w-[325px] max-w-[calc(100vw-32px)] rounded-2xl border border-cyan-500/35 bg-slate-950/85 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_0_35px_rgba(6,182,212,0.2)] flex flex-col gap-3.5 sm:gap-4 animate-fade-in"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <h1 className="font-orbitron font-extrabold text-base text-slate-100 tracking-wider">
                  SKILLS
                </h1>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              </div>
              <span className="text-[9px] font-mono-code text-cyan-400 tracking-widest uppercase">
                REACTOR CORE
              </span>
            </div>

            <p className="text-[11px] font-mono-code text-slate-300 leading-relaxed">
              A blend of technology, creativity and problem-solving. These are the tools I use to turn ideas into real-world solutions.
            </p>

            {/* Category Selectors */}
            <div className="flex flex-col gap-1.5 pt-1">
              {SKILLS_TABS.map((tab) => {
                const Icon = tab.icon;
                const isSelected = selectedTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`skills-tab-${tab.id}`}
                    onClick={() => {
                      onSelectTab(tab.id);
                      onSelectSkill(null);
                    }}
                    className={`h-[40px] sm:h-[42px] px-3.5 rounded-xl font-mono-code text-xs tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border border-cyan-400/80 bg-cyan-500/20 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.35)] font-semibold'
                        : 'border border-slate-800/90 bg-slate-900/50 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-300' : 'text-slate-500'}`} />
                      <span className="uppercase">{tab.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-cyan-500/15">
              <p className="text-[10px] font-mono-code text-cyan-300/80 italic leading-relaxed">
                “Skills fuel ideas. Ideas create a better tomorrow.”
              </p>
            </div>
          </aside>

          {/* RIGHT SIDE: SELECTED SKILL INFORMATION PANEL (AS SHOWN IN REFERENCE IMAGE) */}
          {selectedSkill && (
            <aside
              id="selected-skill-panel"
              className="pointer-events-auto fixed md:relative bottom-16 md:bottom-auto inset-x-4 md:inset-x-auto max-w-sm md:max-w-none md:w-[285px] mx-auto md:mx-0 rounded-2xl border border-cyan-500/40 bg-slate-950/95 md:bg-slate-950/90 backdrop-blur-2xl p-4 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex flex-col gap-2.5 animate-fade-in z-40 md:z-auto md:ml-auto"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0"
                    style={{
                      backgroundColor: selectedSkill.color,
                      boxShadow: `0 0 10px ${selectedSkill.color}`,
                    }}
                  />
                  <h3 className="font-orbitron font-bold text-sm text-slate-100 tracking-wider">
                    {selectedSkill.name}
                  </h3>
                </div>
                <span className="text-[9px] font-mono-code text-cyan-400 px-2 py-0.5 rounded-md border border-cyan-500/40 bg-cyan-950/60 font-semibold">
                  {selectedSkill.proficiency}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-cyan-300/90 text-[10px] font-mono-code">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="uppercase tracking-wider">{selectedSkill.category}</span>
              </div>

              <p className="text-[11px] font-mono-code text-slate-300 leading-relaxed border-t border-cyan-500/15 pt-2">
                {selectedSkill.description}
              </p>

              <button
                onClick={() => onSelectSkill(null)}
                className="self-end text-[9px] font-mono-code text-slate-400 hover:text-cyan-300 pt-1 cursor-pointer transition-colors"
              >
                [CLOSE]
              </button>
            </aside>
          )}

          {/* RIGHT SIDE: CERTIFICATIONS OVERVIEW WHEN NO NODE SELECTED */}
          {selectedTab === 'certs' && !selectedSkill && (
            <aside
              id="certs-overview-card"
              className="hidden md:flex pointer-events-auto w-[270px] sm:w-[295px] rounded-2xl border border-cyan-500/40 bg-slate-950/90 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_0_30px_rgba(6,182,212,0.25)] flex-col gap-3 animate-fade-in ml-auto"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span className="font-orbitron font-extrabold text-xs text-cyan-200 tracking-wider uppercase">
                    CERTIFICATIONS
                  </span>
                </div>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <p className="text-[11px] font-mono-code text-slate-300 leading-relaxed pt-1.5 border-t border-cyan-500/20">
                Verified specialized credentials. Select any orbiting node in the reactor core to inspect credential details.
              </p>
              <div className="flex flex-col gap-1.5 pt-1">
                {CATEGORY_NODES.certs.slice(0, 3).map((cert) => (
                  <button
                    key={cert.id}
                    onClick={() => onSelectSkill(cert)}
                    className="text-left px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span className="text-[10px] font-mono-code text-slate-200 group-hover:text-cyan-300 truncate">
                      {cert.name}
                    </span>
                    <span className="text-[9px] font-mono-code text-cyan-400 ml-1 flex-shrink-0">
                      {cert.proficiency}
                    </span>
                  </button>
                ))}
              </div>
            </aside>
          )}
        </div>

        {/* BOTTOM FOOTER */}
        <footer className="flex flex-col items-center justify-center gap-2 pointer-events-auto">
          <div className="text-[10px] font-mono-code text-cyan-400/80 tracking-[0.3em] uppercase">
            EXPLORE • LEARN • BUILD • GROW • REPEAT
          </div>
          <button
            id="proceed-projects-btn"
            type="button"
            onClick={onNavigateProjects}
            className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer group px-4 py-1.5 rounded-full bg-slate-950/70 border border-cyan-950/80 hover:border-cyan-500/40"
            aria-label="Proceed to Projects"
          >
            <span className="text-[9px] font-mono-code tracking-[0.2em] uppercase text-cyan-400/90 group-hover:text-cyan-300 font-semibold">
              EXPLORE PROJECT CUBE ARCHIVE
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-y-0.5 transition-transform drop-shadow-[0_0_6px_#00f5ff]" />
          </button>
        </footer>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-xl border border-cyan-500/40 bg-slate-950/90 backdrop-blur-md text-cyan-300 font-mono-code text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-fade-in flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
