import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Menu,
  X,
  ChevronUp,
  ShieldCheck,
  Sparkles,
  MoveHorizontal,
  CheckCircle2,
} from 'lucide-react';
import { TechIcon } from '../TechIcons';
import { SkillNodeData } from '../3d/ReactorCore3D';
import {
  SkillsTab,
  NavSection,
  NAV_ITEMS,
  SKILLS_TABS,
  CATEGORY_NODES,
  CERTIFICATIONS_LIST,
  CertificationDetail,
  SKILL_TAGS,
} from '../../data/skillsData';

interface MobileSkillsLayoutProps {
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
}

// Normalized radial coordinates for 10 Tech Stack nodes
const MOBILE_RADIAL_LAYOUT: Record<string, { x: string; y: string }> = {
  python: { x: '50%', y: '12%' },
  react: { x: '24%', y: '22%' },
  javascript: { x: '76%', y: '22%' },
  typescript: { x: '16%', y: '43%' },
  nodejs: { x: '84%', y: '43%' },
  tailwind: { x: '21%', y: '65%' },
  threejs: { x: '79%', y: '65%' },
  mongodb: { x: '32%', y: '83%' },
  git: { x: '50%', y: '86%' },
  aiml: { x: '68%', y: '83%' },
};

// Short visual labels for mobile reactor nodes
const MOBILE_NODE_SHORT_NAMES: Record<string, string> = {
  python: 'Python',
  react: 'React',
  javascript: 'JS',
  typescript: 'TS',
  nodejs: 'Node',
  tailwind: 'Tailwind',
  threejs: 'Three.js',
  mongodb: 'MongoDB',
  aiml: 'AI / ML',
  git: 'Git',
};

// Ambient background micro-sparks for reactor
const AMBIENT_SPARKS = [
  { x: 32, y: 38, r: 1.5, opacity: 0.6, delay: 0 },
  { x: 68, y: 28, r: 1.2, opacity: 0.5, delay: 1.2 },
  { x: 22, y: 72, r: 1.4, opacity: 0.7, delay: 2.1 },
  { x: 78, y: 68, r: 1.6, opacity: 0.6, delay: 0.8 },
  { x: 48, y: 24, r: 1.3, opacity: 0.5, delay: 1.7 },
  { x: 54, y: 76, r: 1.5, opacity: 0.6, delay: 2.5 },
];

export function MobileSkillsLayout({
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
}: MobileSkillsLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Intro animation stage
  const [introStep, setIntroStep] = useState<number>(0);

  // Touch Swipe & Rotation State for Reactor
  const [userRotation, setUserRotation] = useState<number>(0);
  const dragStartXRef = useRef<number>(0);
  const dragStartYRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);
  const currentRotationRef = useRef<number>(0);

  // Active Energy Pulse animation tracking
  const [pulseActive, setPulseActive] = useState<{ id: string; x: number; y: number } | null>(null);

  // Selected certification state for Certifications tab
  const [selectedCertId, setSelectedCertId] = useState<string>(CERTIFICATIONS_LIST[0].id);

  // Selected tool / soft skill item tracking
  const [selectedToolId, setSelectedToolId] = useState<string>(CATEGORY_NODES.tools[0].id);
  const [selectedSoftId, setSelectedSoftId] = useState<string>(CATEGORY_NODES.soft[0].id);

  const currentTechSkills = CATEGORY_NODES.stack;

  // Set default selection when tab changes or initially
  useEffect(() => {
    if (selectedTab === 'stack' && !selectedSkill) {
      const defaultReact = currentTechSkills.find((s) => s.id === 'react') || currentTechSkills[0];
      onSelectSkill(defaultReact);
    }
  }, [selectedTab, selectedSkill, currentTechSkills, onSelectSkill]);

  // Cinematic Intro Sequence Handler
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntroStep(6);
      return;
    }

    const t1 = setTimeout(() => setIntroStep(2), 50);
    const t2 = setTimeout(() => setIntroStep(4), 150);
    const t3 = setTimeout(() => setIntroStep(6), 280);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    currentRotationRef.current = userRotation;
  }, [userRotation]);

  // Handle Category Tab Change
  const handleTabChange = (tab: SkillsTab) => {
    onSelectTab(tab);
    if (tab === 'stack') {
      const defaultReact = CATEGORY_NODES.stack.find((s) => s.id === 'react') || CATEGORY_NODES.stack[0];
      onSelectSkill(defaultReact);
    } else if (tab === 'tools') {
      setSelectedToolId(CATEGORY_NODES.tools[0].id);
    } else if (tab === 'soft') {
      setSelectedSoftId(CATEGORY_NODES.soft[0].id);
    } else if (tab === 'certs') {
      setSelectedCertId(CERTIFICATIONS_LIST[0].id);
    }
  };

  // Node selection handler
  const handleNodeClick = (skill: SkillNodeData) => {
    if (hasMovedRef.current) return;
    onSelectSkill(skill);

    const coords = MOBILE_RADIAL_LAYOUT[skill.id] || { x: '50%', y: '50%' };
    const nx = (parseFloat(coords.x) / 100) * 380;
    const ny = (parseFloat(coords.y) / 100) * 380;
    setPulseActive({ id: skill.id, x: nx, y: ny });

    setTimeout(() => {
      setPulseActive(null);
    }, 600);
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartXRef.current = e.touches[0].clientX;
    dragStartYRef.current = e.touches[0].clientY;
    hasMovedRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - dragStartXRef.current;
    const deltaY = currentY - dragStartYRef.current;

    if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
      hasMovedRef.current = true;
      setUserRotation(currentRotationRef.current + deltaX * 0.35);
      dragStartXRef.current = currentX;
    }
  };

  const handleNavClick = (section: NavSection) => {
    setMobileMenuOpen(false);
    if (section === 'HOME') onNavigateHome();
    else if (section === 'ABOUT') onNavigateAbout();
    else if (section === 'SKILLS') {
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

  // Currently active single detail information based on selectedTab
  const activeTechSkill = selectedSkill || CATEGORY_NODES.stack[0];
  const activeToolSkill = CATEGORY_NODES.tools.find((t) => t.id === selectedToolId) || CATEGORY_NODES.tools[0];
  const activeSoftSkill = CATEGORY_NODES.soft.find((s) => s.id === selectedSoftId) || CATEGORY_NODES.soft[0];
  const activeCertDetail: CertificationDetail =
    CERTIFICATIONS_LIST.find((c) => c.id === selectedCertId) || CERTIFICATIONS_LIST[0];

  return (
    <div className="relative w-full min-h-[100svh] bg-transparent text-slate-100 flex flex-col items-center select-none font-mono-code box-border">
      <style>{`
        @keyframes mobileDetailFade {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-detail-fade {
          animation: mobileDetailFade 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Cosmic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(6,182,212,0.12),rgba(15,23,42,0.7)_60%,#020617_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_25%_20%,rgba(255,255,255,0.7),transparent),radial-gradient(1px_1px_at_70%_15%,rgba(56,189,248,0.7),transparent)] opacity-60" />
      </div>

      {/* Main Flow */}
      <main className="relative z-10 w-full max-w-full flex flex-col items-center px-3.5 box-border pb-12">
        {/* 
          1. SKILLS HEADING & SHORT INTRODUCTION
        */}
        <section
          id="mobile-skills-header-card"
          className={`w-full max-w-[420px] mx-auto mt-4 mb-3 rounded-2xl border border-cyan-500/30 bg-slate-950/90 backdrop-blur-xl p-4 shadow-[0_0_25px_rgba(6,182,212,0.15)] flex flex-col gap-2.5 box-border transition-all duration-300 ${
            introStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="font-orbitron font-extrabold text-base text-slate-100 tracking-wider">
                SKILLS
              </h1>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            </div>
            <span className="text-[8.5px] font-mono-code text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 tracking-widest uppercase font-semibold">
              INTERACTIVE SELECTOR
            </span>
          </div>

          <p className="text-[11px] font-mono-code text-slate-300 leading-relaxed">
            A blend of technology, creativity and problem-solving. Tap a category and item below to inspect specific skills.
          </p>

          {/* 
            2. CATEGORY SELECTOR (2-column compact grid)
          */}
          <div className="grid grid-cols-2 gap-2 pt-1" role="tablist">
            {SKILLS_TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`mobile-category-tab-${tab.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleTabChange(tab.id)}
                  className={`min-h-[44px] px-2.5 py-2 rounded-xl font-mono-code text-[10.5px] tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 text-left active:scale-98 ${
                    isSelected
                      ? 'border border-cyan-400 bg-cyan-500/25 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.4)] font-bold'
                      : 'border border-slate-800/90 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-cyan-300' : 'text-slate-500'}`} />
                    <span className="uppercase leading-tight font-semibold truncate">{tab.label}</span>
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff] flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* 
          3. CATEGORY CONTENT & SELECTABLE MATRIX
        */}
        <div className="w-full max-w-[420px] mx-auto flex flex-col items-center gap-3">
          {/* ========================================================= */}
          {/* CATEGORY A: TECH STACK (Compact 3D Reactor + 1 Detail)    */}
          {/* ========================================================= */}
          {selectedTab === 'stack' && (
            <div className="w-full flex flex-col items-center animate-fade-in">
              <div className="flex items-center gap-1.5 text-[9px] font-mono-code text-cyan-400/80 uppercase tracking-widest my-1 select-none">
                <MoveHorizontal className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>TAP NODE TO INSPECT • SWIPE TO ROTATE</span>
              </div>

              {/* Compact 3D Reactor Container (max 86vw) */}
              <div
                className="relative mx-auto select-none flex items-center justify-center cursor-grab active:cursor-grabbing"
                style={{
                  width: 'clamp(260px, 86vw, 320px)',
                  height: 'clamp(260px, 86vw, 320px)',
                  margin: '8px auto 14px',
                  touchAction: 'pan-y',
                  perspective: '800px',
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                title="Compact 3D Skill Reactor"
              >
                {/* Ambient Nebula */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.22)_0%,rgba(14,165,233,0.08)_45%,transparent_72%)] pointer-events-none" />

                {/* Micro Sparks */}
                {AMBIENT_SPARKS.map((spark, idx) => (
                  <div
                    key={`spark-${idx}`}
                    className="absolute rounded-full bg-cyan-300 pointer-events-none"
                    style={{
                      left: `${spark.x}%`,
                      top: `${spark.y}%`,
                      width: `${spark.r * 2}px`,
                      height: `${spark.r * 2}px`,
                      opacity: spark.opacity,
                      boxShadow: '0 0 6px rgba(6,182,212,0.8)',
                    }}
                  />
                ))}

                {/* Rotating Orbit System */}
                <div
                  className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-150 ease-out"
                  style={{
                    transform: `rotate(${userRotation}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 380 380" fill="none">
                    <defs>
                      <linearGradient id="mobileOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.5" />
                        <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>

                    {/* Radial Connecting Lines to active node */}
                    {currentTechSkills.map((skill) => {
                      const coords = MOBILE_RADIAL_LAYOUT[skill.id] || { x: '50%', y: '50%' };
                      const nx = (parseFloat(coords.x) / 100) * 380;
                      const ny = (parseFloat(coords.y) / 100) * 380;
                      const isSelected = activeTechSkill.id === skill.id;
                      return (
                        <line
                          key={`spoke-${skill.id}`}
                          x1="190"
                          y1="190"
                          x2={nx}
                          y2={ny}
                          stroke={isSelected ? skill.color : '#00f5ff'}
                          strokeWidth={isSelected ? '2' : '0.8'}
                          strokeOpacity={isSelected ? 0.9 : 0.2}
                          strokeDasharray={isSelected ? 'none' : '3 4'}
                        />
                      );
                    })}

                    {/* Outer Orbit Circle */}
                    <circle cx="190" cy="190" r="134" stroke="url(#mobileOrbitGrad)" strokeWidth="1.5" strokeDasharray="4 6" />

                    {/* Traveling Energy Pulse */}
                    {pulseActive && (
                      <circle cx={pulseActive.x} cy={pulseActive.y} r="4" fill="#00f5ff" className="filter drop-shadow-[0_0_8px_#00f5ff]">
                        <animate attributeName="cx" from={pulseActive.x} to="190" dur="0.5s" fill="freeze" />
                        <animate attributeName="cy" from={pulseActive.y} to="190" dur="0.5s" fill="freeze" />
                        <animate attributeName="opacity" values="1;0.8;0" dur="0.5s" fill="freeze" />
                      </circle>
                    )}
                  </svg>

                  {/* 10 Technology Nodes */}
                  {currentTechSkills.map((skill) => {
                    const coords = MOBILE_RADIAL_LAYOUT[skill.id] || { x: '50%', y: '50%' };
                    const isSelected = activeTechSkill.id === skill.id;

                    return (
                      <div
                        key={skill.id}
                        className="absolute pointer-events-auto"
                        style={{
                          left: coords.x,
                          top: coords.y,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <button
                          id={`mobile-tech-node-${skill.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNodeClick(skill);
                          }}
                          className={`group relative flex flex-col items-center cursor-pointer transition-all duration-200 ${
                            isSelected ? 'z-30 scale-110' : 'z-20 opacity-70 hover:opacity-100 hover:scale-105'
                          }`}
                          title={`${skill.name} • ${skill.category}`}
                          aria-label={`${skill.name}, ${skill.category}`}
                        >
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-xl border-2 transition-all ${
                              isSelected ? 'bg-slate-950 ring-4' : 'bg-slate-950/90'
                            }`}
                            style={{
                              borderColor: skill.color,
                              boxShadow: isSelected
                                ? `0 0 24px ${skill.color}, 0 0 10px ${skill.color} inset`
                                : `0 0 10px ${skill.color}60`,
                            }}
                          >
                            <TechIcon id={skill.id} className="w-4 h-4 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
                          </div>

                          <span
                            className="font-orbitron font-bold text-[9px] text-slate-100 tracking-wide mt-1 text-center max-w-[70px] truncate"
                            style={{
                              textShadow: isSelected ? `0 0 8px ${skill.color}` : 'none',
                              color: isSelected ? '#ffffff' : '#cbd5e1',
                            }}
                          >
                            {MOBILE_NODE_SHORT_NAMES[skill.id] || skill.name}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Central NU Core */}
                <div
                  id="mobile-central-core"
                  className="relative w-18 h-18 rounded-full flex items-center justify-center cursor-pointer pointer-events-auto z-25"
                  onClick={() => onSelectSkill(CATEGORY_NODES.stack[0])}
                  title="Reactor Core Center"
                >
                  <div className="absolute inset-[-10px] rounded-full bg-cyan-400/20 blur-xl animate-pulse pointer-events-none" />
                  <div className="absolute inset-[-3px] rounded-full border border-cyan-400/50 border-dashed animate-spin-reverse pointer-events-none" />
                  <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-cyan-600 via-sky-400 to-white opacity-95 shadow-[0_0_24px_#00f5ff] flex items-center justify-center">
                    <div className="w-6.5 h-6.5 rounded-full bg-white shadow-[0_0_14px_#ffffff] flex items-center justify-center">
                      <span className="font-orbitron font-black text-[9px] text-slate-950">NU</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 
                ONLY ONE SINGLE DETAIL PANEL FOR TECH STACK
              */}
              <div
                key={activeTechSkill.id}
                id="mobile-single-tech-detail"
                className="w-full rounded-2xl border border-cyan-400/70 bg-slate-950/95 backdrop-blur-2xl p-4 shadow-[0_0_30px_rgba(6,182,212,0.35)] flex flex-col gap-2.5 animate-detail-fade box-border"
                aria-live="polite"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center border-2"
                      style={{
                        borderColor: activeTechSkill.color,
                        backgroundColor: `${activeTechSkill.color}20`,
                        boxShadow: `0 0 12px ${activeTechSkill.color}`,
                      }}
                    >
                      <TechIcon id={activeTechSkill.id} className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="font-orbitron font-bold text-sm text-slate-100 tracking-wider">
                        {activeTechSkill.name}
                      </h3>
                      <span className="text-[9.5px] font-mono-code text-cyan-300/90 uppercase tracking-widest font-semibold block">
                        {activeTechSkill.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono-code text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 font-semibold">
                    {activeTechSkill.proficiency}
                  </span>
                </div>

                <p className="text-[11px] font-mono-code text-slate-300 leading-relaxed border-t border-cyan-500/20 pt-2">
                  {activeTechSkill.description}
                </p>

                {SKILL_TAGS[activeTechSkill.id] && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {SKILL_TAGS[activeTechSkill.id].map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono-code px-2 py-0.5 rounded-md border border-cyan-500/30 bg-cyan-950/40 text-cyan-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* CATEGORY B: TOOLS & PLATFORMS                             */}
          {/* ========================================================= */}
          {selectedTab === 'tools' && (
            <div className="w-full flex flex-col items-center gap-3 animate-fade-in">
              <div className="w-full text-left">
                <span className="text-[9.5px] font-mono-code text-cyan-400/80 uppercase tracking-widest block mb-1.5">
                  SELECT A TOOL OR PLATFORM:
                </span>

                {/* Compact Selectable Chips Grid */}
                <div className="grid grid-cols-2 gap-1.5">
                  {CATEGORY_NODES.tools.map((tool) => {
                    const isSelected = selectedToolId === tool.id;
                    return (
                      <button
                        key={tool.id}
                        id={`mobile-tool-chip-${tool.id}`}
                        onClick={() => setSelectedToolId(tool.id)}
                        className={`min-h-[44px] px-3 py-2 rounded-xl font-mono-code text-[10.5px] tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-start gap-2.5 text-left border ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-500/25 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.35)] font-bold'
                            : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center border"
                          style={{
                            borderColor: tool.color,
                            backgroundColor: `${tool.color}20`,
                          }}
                        >
                          <TechIcon id={tool.id} className="w-3 h-3" />
                        </div>
                        <span className="truncate">{tool.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ONLY ONE SINGLE DETAIL PANEL FOR TOOLS */}
              <div
                key={activeToolSkill.id}
                id="mobile-single-tool-detail"
                className="w-full rounded-2xl border border-cyan-400/70 bg-slate-950/95 backdrop-blur-2xl p-4 shadow-[0_0_30px_rgba(6,182,212,0.35)] flex flex-col gap-2.5 animate-detail-fade mt-1 box-border"
                aria-live="polite"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center border-2"
                      style={{
                        borderColor: activeToolSkill.color,
                        backgroundColor: `${activeToolSkill.color}20`,
                        boxShadow: `0 0 12px ${activeToolSkill.color}`,
                      }}
                    >
                      <TechIcon id={activeToolSkill.id} className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="font-orbitron font-bold text-sm text-slate-100 tracking-wider">
                        {activeToolSkill.name}
                      </h3>
                      <span className="text-[9.5px] font-mono-code text-cyan-300/90 uppercase tracking-widest font-semibold block">
                        {activeToolSkill.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono-code text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 font-semibold">
                    {activeToolSkill.proficiency}
                  </span>
                </div>

                <p className="text-[11px] font-mono-code text-slate-300 leading-relaxed border-t border-cyan-500/20 pt-2">
                  {activeToolSkill.description}
                </p>

                {SKILL_TAGS[activeToolSkill.id] && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {SKILL_TAGS[activeToolSkill.id].map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono-code px-2 py-0.5 rounded-md border border-cyan-500/30 bg-cyan-950/40 text-cyan-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* CATEGORY C: SOFT SKILLS                                   */}
          {/* ========================================================= */}
          {selectedTab === 'soft' && (
            <div className="w-full flex flex-col items-center gap-3 animate-fade-in">
              <div className="w-full text-left">
                <span className="text-[9.5px] font-mono-code text-cyan-400/80 uppercase tracking-widest block mb-1.5">
                  SELECT A SOFT SKILL:
                </span>

                {/* Compact Selectable Chips Grid */}
                <div className="grid grid-cols-2 gap-1.5">
                  {CATEGORY_NODES.soft.map((soft) => {
                    const isSelected = selectedSoftId === soft.id;
                    return (
                      <button
                        key={soft.id}
                        id={`mobile-soft-chip-${soft.id}`}
                        onClick={() => setSelectedSoftId(soft.id)}
                        className={`min-h-[44px] px-3 py-2 rounded-xl font-mono-code text-[10.5px] tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-start gap-2 text-left border ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-500/25 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.35)] font-bold'
                            : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-cyan-300' : 'text-slate-600'}`}
                        />
                        <span className="truncate">{soft.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ONLY ONE SINGLE DETAIL PANEL FOR SOFT SKILLS */}
              <div
                key={activeSoftSkill.id}
                id="mobile-single-soft-detail"
                className="w-full rounded-2xl border border-cyan-400/70 bg-slate-950/95 backdrop-blur-2xl p-4 shadow-[0_0_30px_rgba(6,182,212,0.35)] flex flex-col gap-2.5 animate-detail-fade mt-1 box-border"
                aria-live="polite"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center border-2"
                      style={{
                        borderColor: activeSoftSkill.color,
                        backgroundColor: `${activeSoftSkill.color}20`,
                        boxShadow: `0 0 12px ${activeSoftSkill.color}`,
                      }}
                    >
                      <TechIcon id={activeSoftSkill.id} className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="font-orbitron font-bold text-sm text-slate-100 tracking-wider">
                        {activeSoftSkill.name}
                      </h3>
                      <span className="text-[9.5px] font-mono-code text-cyan-300/90 uppercase tracking-widest font-semibold block">
                        {activeSoftSkill.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono-code text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 font-semibold">
                    {activeSoftSkill.proficiency}
                  </span>
                </div>

                <p className="text-[11px] font-mono-code text-slate-300 leading-relaxed border-t border-cyan-500/20 pt-2">
                  {activeSoftSkill.description}
                </p>

                {SKILL_TAGS[activeSoftSkill.id] && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {SKILL_TAGS[activeSoftSkill.id].map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono-code px-2 py-0.5 rounded-md border border-cyan-500/30 bg-cyan-950/40 text-cyan-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* CATEGORY D: CERTIFICATIONS                                */}
          {/* ========================================================= */}
          {selectedTab === 'certs' && (
            <div className="w-full flex flex-col items-center gap-3 animate-fade-in">
              <div className="w-full text-left">
                <span className="text-[9.5px] font-mono-code text-cyan-400/80 uppercase tracking-widest block mb-1.5">
                  SELECT A CERTIFICATION:
                </span>

                {/* Compact Selectable Rows/Badges Grid */}
                <div className="grid grid-cols-1 gap-1.5">
                  {CERTIFICATIONS_LIST.map((cert) => {
                    const isSelected = selectedCertId === cert.id;
                    return (
                      <button
                        key={cert.id}
                        id={`mobile-cert-chip-${cert.id}`}
                        onClick={() => setSelectedCertId(cert.id)}
                        className={`min-h-[44px] px-3 py-2.5 rounded-xl font-mono-code text-[11px] tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-between text-left border ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-500/25 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.35)] font-bold'
                            : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:text-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <ShieldCheck className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-cyan-300' : 'text-slate-500'}`} />
                          <span className="truncate">{cert.name}</span>
                        </div>
                        <span className="text-[8.5px] font-mono-code text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/50 flex-shrink-0 ml-2">
                          {cert.year}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ONLY ONE SINGLE DETAIL PANEL FOR CERTIFICATIONS */}
              <div
                key={activeCertDetail.id}
                id="mobile-single-cert-detail"
                className="w-full rounded-2xl border border-cyan-400/70 bg-slate-950/95 backdrop-blur-2xl p-4 shadow-[0_0_30px_rgba(6,182,212,0.35)] flex flex-col gap-2.5 animate-detail-fade mt-1 box-border"
                aria-live="polite"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <h3 className="font-orbitron font-bold text-xs sm:text-sm text-slate-100 leading-snug">
                      {activeCertDetail.name}
                    </h3>
                    <span className="text-[10px] font-mono-code text-cyan-300/90 mt-0.5 font-semibold">
                      {activeCertDetail.issuer} • {activeCertDetail.year}
                    </span>
                  </div>

                  <span className="text-[8.5px] font-mono-code px-2 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 text-cyan-300 flex-shrink-0 font-semibold">
                    {activeCertDetail.badge}
                  </span>
                </div>

                <p className="text-[11px] font-mono-code text-slate-300 leading-relaxed border-t border-cyan-500/20 pt-2">
                  {activeCertDetail.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-cyan-500/15">
                  <div className="flex flex-wrap gap-1">
                    {activeCertDetail.skills.map((s) => (
                      <span key={s} className="text-[8.5px] font-mono-code px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-200">
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="text-[9px] font-mono-code text-cyan-400 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    ID: {activeCertDetail.credentialId}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Motto & Return */}
        <div className="w-full text-center mt-8 mb-2">
          <span className="text-[9.5px] font-mono-code text-cyan-400/80 tracking-[0.2em] uppercase">
            EXPLORE • LEARN • BUILD • GROW • REPEAT
          </span>
        </div>

        <div className="w-full flex justify-center mb-6">
          <button
            id="mobile-return-home-btn"
            onClick={onNavigateHome}
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer px-5 py-2 rounded-full border border-cyan-500/30 bg-slate-950/80 shadow-[0_0_20px_rgba(6,182,212,0.2)] active:scale-95"
            aria-label="Return to Home Universe"
          >
            <ChevronUp className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span className="text-[9px] font-mono-code tracking-[0.18em] uppercase text-cyan-300 font-bold">
              RETURN TO HOME UNIVERSE
            </span>
          </button>
        </div>

        {/* Footer */}
        <footer className="w-full py-5 border-t border-cyan-500/20 text-center text-slate-500 text-[10px] font-mono-code">
          <div className="flex items-center justify-center gap-2 mb-1 text-cyan-400/70">
            <span>NANDHAKUMAR UNIVERSE</span>
            <span>•</span>
            <span>SKILLS MATRIX ACTIVE</span>
          </div>
          <p>© {new Date().getFullYear()} Nandhakumar. Crafted with precision.</p>
        </footer>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl border border-cyan-500/50 bg-slate-950/95 backdrop-blur-md text-cyan-300 font-mono-code text-xs shadow-[0_0_25px_rgba(6,182,212,0.4)] animate-fade-in flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default MobileSkillsLayout;
