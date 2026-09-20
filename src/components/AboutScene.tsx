import React, { useState, useRef } from 'react';
import { motion, Variants } from 'motion/react';
import {
  User,
  Sparkles,
  Code2,
  Cpu,
  Globe,
  Compass,
  ArrowDown,
} from 'lucide-react';
import { DeviceQualityInfo } from '../hooks/useDeviceQuality';
import { SakuraPetalsOverlay } from './about/SakuraPetalsOverlay';
import { soundEngine } from '../utils/audio';
import aboutPersonImg from '../assets/about-person.png';

interface AboutSceneProps {
  onNavigateHome?: () => void;
  onNavigateSkills?: () => void;
  onNavigateProjects?: () => void;
  onReplaySequence?: () => void;
  quality?: DeviceQualityInfo;
  isAudioOn?: boolean;
  onToggleAudio?: () => void;
}

// Small floating nodes around the Image Card
const ATMOSPHERIC_LABELS = [
  { label: 'LEARN', pos: '-top-6 -left-6 sm:-top-8 sm:-left-10' },
  { label: 'BUILD', pos: 'top-16 -right-6 sm:top-20 sm:-right-12' },
  { label: 'CREATE', pos: '-bottom-6 -left-6 sm:-bottom-8 sm:-left-10' },
  { label: 'EXPLORE', pos: 'bottom-16 -right-6 sm:bottom-20 sm:-right-12' },
];

export function AboutScene({
  onNavigateSkills,
  quality,
}: AboutSceneProps) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cardMouse, setCardMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeCorner, setActiveCorner] = useState<'tl' | 'tr' | 'bl' | 'br' | null>(null);
  const [isHoveringCard, setIsHoveringCard] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse move handler for interactive subtle parallax across background
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Dedicated Card Hover & Corner Detection Handler
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // 0 to rect.width
    const y = e.clientY - rect.top;  // 0 to rect.height

    // Normalize -1 to 1 for 3D tilt
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;
    setCardMouse({ x: normX, y: normY });

    // Determine nearest corner
    const isLeft = x < rect.width * 0.5;
    const isTop = y < rect.height * 0.5;

    if (isTop && isLeft) setActiveCorner('tl');
    else if (isTop && !isLeft) setActiveCorner('tr');
    else if (!isTop && isLeft) setActiveCorner('bl');
    else setActiveCorner('br');
  };

  const handleHoverLabel = () => {
    try {
      soundEngine.playChime(620, 0.1);
    } catch {
      // ignore audio error
    }
  };

  // Motion variants for sequential text entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100svh] select-none bg-transparent text-slate-100 font-sans flex flex-col justify-between box-border"
    >
      {/* ===================================================================== */}
      {/* 1. ATMOSPHERIC UNIVERSE OVERLAY                                        */}
      {/* ===================================================================== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Subtle Transparent Radial Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_0%,rgba(2,6,23,0.4)_100%)]" />

        {/* Falling Particles / Code Petals */}
        <SakuraPetalsOverlay prefersReducedMotion={quality?.prefersReducedMotion ?? false} />
      </div>

      {/* ===================================================================== */}
      {/* 2. MAIN FULL-SCREEN HERO VIEWPORT                                      */}
      {/* ===================================================================== */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 flex flex-col justify-between">

        {/* ------------------------------------------------------------------- */}
        {/* DESKTOP & TABLET LAYOUT (lg: 1024px+)                               */}
        {/* ------------------------------------------------------------------- */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center h-full my-auto relative">

          {/* LEFT ~45%: ANIMATED PERSONAL TYPOGRAPHY */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex flex-col justify-center space-y-4 z-20"
            style={{
              transform: `translate3d(${mousePos.x * 5}px, ${mousePos.y * 5}px, 0)`,
            }}
          >
            {/* Small Eyebrow Label */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-bold tracking-[0.25em] uppercase shadow-[0_0_15px_rgba(0,245,255,0.15)]">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>ABOUT ME</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-0.5">
              <h1 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
                THE PERSON <br />
                BEHIND THE <br />
                <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(0,245,255,0.7)]">
                  UNIVERSE
                </span>
              </h1>
            </motion.div>

            {/* Name & Subtitle */}
            <motion.div variants={itemVariants} className="pt-1">
              <h2 className="font-orbitron font-extrabold text-2xl lg:text-3xl text-slate-100 tracking-wider">
                NANDHAKUMAR
              </h2>
              <p className="font-mono text-xs font-bold text-cyan-400 tracking-[0.2em] uppercase mt-1">
                FRONTEND DEVELOPER • <span className="text-cyan-200/90">CREATIVE TECHNOLOGIST</span>
              </p>
            </motion.div>

            {/* Short Introduction Paragraph */}
            <motion.p variants={itemVariants} className="font-mono text-xs lg:text-sm text-slate-300 leading-relaxed max-w-md pt-0.5">
              “A curious mind who loves to learn, build, and create meaningful solutions. Turning ideas into impact through technology.”
            </motion.p>

            {/* Identity Details Line (Simple typography with glowing separators, NO cards) */}
            <motion.div variants={itemVariants} className="pt-2 pb-1 border-t border-cyan-500/20 max-w-md">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-mono font-bold text-cyan-200/90 tracking-wider">
                <span className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  B.TECH IT
                </span>
                <span className="text-cyan-500 font-bold">•</span>
                <span className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  FRONTEND
                </span>
                <span className="text-cyan-500 font-bold">•</span>
                <span className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  AI & 3D WEB
                </span>
              </div>
            </motion.div>

            {/* Main Emotional Quote */}
            <motion.div variants={itemVariants} className="pt-1">
              <blockquote className="font-orbitron font-black text-xl lg:text-2xl text-white italic tracking-wider">
                SAME PERSON. <span className="text-cyan-400 drop-shadow-[0_0_18px_#00f5ff]">BIGGER DREAMS.</span>
              </blockquote>
            </motion.div>

            {/* Subtle Scroll Indicator */}
            <motion.div variants={itemVariants} className="pt-2">
              <button
                type="button"
                onClick={onNavigateSkills}
                className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-300 text-xs font-mono tracking-widest uppercase transition-colors group cursor-pointer"
              >
                <span>EXPLORE MORE ABOUT ME</span>
                <ArrowDown className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT ~55%: PERSON IMAGE CARD VISUAL FOCUS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative flex items-center justify-center h-full"
          >
            {/* Ambient Celestial Glow behind the card */}
            <div className="absolute w-80 h-80 rounded-full bg-cyan-500/20 filter blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute w-96 h-96 rounded-full bg-blue-600/15 filter blur-3xl pointer-events-none" />

            {/* Orbiting Faint Light Rings */}
            <svg className="absolute w-[560px] h-[560px] pointer-events-none overflow-visible z-0 opacity-50">
              <ellipse
                cx="280"
                cy="280"
                rx="260"
                ry="190"
                fill="none"
                stroke="#00f5ff"
                strokeWidth="1"
                strokeDasharray="8 12"
                strokeOpacity="0.35"
                className="animate-[spin_45s_linear_infinite]"
              />
              <ellipse
                cx="280"
                cy="280"
                rx="230"
                ry="240"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1"
                strokeDasharray="6 10"
                strokeOpacity="0.25"
                className="animate-[spin_30s_linear_infinite_reverse]"
              />
            </svg>

            {/* MAIN PERSON IMAGE CARD */}
            <motion.div
              ref={cardRef}
              onMouseEnter={() => setIsHoveringCard(true)}
              onMouseLeave={() => {
                setIsHoveringCard(false);
                setActiveCorner(null);
                setCardMouse({ x: 0, y: 0 });
              }}
              onMouseMove={handleCardMouseMove}
              animate={{
                y: isHoveringCard ? -4 : [-5, 5, -5],
                rotateX: isHoveringCard ? cardMouse.y * -3.5 : 0,
                rotateY: isHoveringCard ? cardMouse.x * 3.5 : 0,
              }}
              transition={{
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                rotateX: { duration: 0.2, ease: 'easeOut' },
                rotateY: { duration: 0.2, ease: 'easeOut' },
              }}
              style={{
                perspective: 1000,
                transformStyle: 'preserve-3d',
              }}
              className={`relative w-full max-w-[420px] h-[500px] sm:h-[540px] rounded-2xl p-3.5 bg-slate-950/85 backdrop-blur-2xl border transition-all duration-300 z-10 group overflow-hidden ${
                isHoveringCard
                  ? 'border-cyan-400 shadow-[0_0_45px_rgba(0,245,255,0.35)]'
                  : 'border-cyan-400/40 shadow-[0_0_30px_rgba(0,245,255,0.2)]'
              }`}
            >
              {/* ============================================================= */}
              {/* INTERACTIVE FUTURISTIC CORNER MARKERS                        */}
              {/* ============================================================= */}
              {/* Top-Left Corner */}
              <div
                className={`absolute top-2 left-2 z-30 transition-all duration-300 ${
                  activeCorner === 'tl'
                    ? 'w-7 h-7 border-t-2 border-l-2 border-cyan-300 shadow-[0_0_12px_#00f5ff]'
                    : 'w-4 h-4 border-t-2 border-l-2 border-cyan-400/70'
                }`}
              >
                {activeCorner === 'tl' && (
                  <span className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping" />
                )}
              </div>

              {/* Top-Right Corner */}
              <div
                className={`absolute top-2 right-2 z-30 transition-all duration-300 ${
                  activeCorner === 'tr'
                    ? 'w-7 h-7 border-t-2 border-r-2 border-cyan-300 shadow-[0_0_12px_#00f5ff]'
                    : 'w-4 h-4 border-t-2 border-r-2 border-cyan-400/70'
                }`}
              >
                {activeCorner === 'tr' && (
                  <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping" />
                )}
              </div>

              {/* Bottom-Left Corner */}
              <div
                className={`absolute bottom-2 left-2 z-30 transition-all duration-300 ${
                  activeCorner === 'bl'
                    ? 'w-7 h-7 border-b-2 border-l-2 border-cyan-300 shadow-[0_0_12px_#00f5ff]'
                    : 'w-4 h-4 border-b-2 border-l-2 border-cyan-400/70'
                }`}
              >
                {activeCorner === 'bl' && (
                  <span className="absolute bottom-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping" />
                )}
              </div>

              {/* Bottom-Right Corner */}
              <div
                className={`absolute bottom-2 right-2 z-30 transition-all duration-300 ${
                  activeCorner === 'br'
                    ? 'w-7 h-7 border-b-2 border-r-2 border-cyan-300 shadow-[0_0_12px_#00f5ff]'
                    : 'w-4 h-4 border-b-2 border-r-2 border-cyan-400/70'
                }`}
              >
                {activeCorner === 'br' && (
                  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping" />
                )}
              </div>

              {/* Holographic Light Sweep Sweep Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-30 pointer-events-none" />

              {/* Inner Image Frame containing the uploaded Person Reference Image */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={aboutPersonImg}
                  alt="Nandhakumar - The Person Behind The Universe"
                  className={`w-full h-full object-cover object-center transition-all duration-500 ${
                    isHoveringCard ? 'scale-[1.02] brightness-105 contrast-105' : 'scale-100 brightness-100'
                  }`}
                />

                {/* Soft Gradient Overlay for depth & text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30 pointer-events-none" />

                {/* Minimal Card Labels */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 border border-cyan-500/30 text-[9px] font-mono font-bold text-cyan-300 tracking-wider uppercase backdrop-blur-md">
                  <Compass className="w-3 h-3 text-cyan-400" />
                  <span>A GLIMPSE INTO MY WORLD</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between p-2.5 rounded-lg bg-slate-950/85 border border-cyan-500/30 backdrop-blur-md">
                  <div>
                    <span className="font-orbitron font-extrabold text-xs text-white tracking-wider block">
                      NANDHAKUMAR
                    </span>
                    <span className="font-mono text-[9px] font-bold text-cyan-400 uppercase tracking-widest">
                      IDEAS → CODE → IMPACT
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f5ff]" />
                </div>
              </div>
            </motion.div>

            {/* Orbiting Atmospheric Labels (LEARN, BUILD, CREATE, EXPLORE) */}
            {ATMOSPHERIC_LABELS.map((item, idx) => (
              <motion.div
                key={item.label}
                onMouseEnter={handleHoverLabel}
                animate={{
                  y: [-3, 3, -3],
                  opacity: [0.75, 1, 0.75],
                }}
                transition={{
                  duration: 3 + idx,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.3,
                }}
                className={`absolute ${item.pos} z-20 cursor-default`}
              >
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300 tracking-widest uppercase shadow-[0_0_12px_rgba(0,245,255,0.2)] hover:border-cyan-400 hover:text-white transition-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f5ff]" />
                  <span>{item.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* ------------------------------------------------------------------- */}
        {/* MOBILE LAYOUT (< 1024px) - FITS ONE VIEWPORT STRICTLY               */}
        {/* ------------------------------------------------------------------- */}
        <div className="flex lg:hidden flex-col justify-between items-center text-center h-full py-2 z-10 overflow-hidden">
          
          {/* Top Header */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-0.5 mt-1"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
              <User className="w-3 h-3 text-cyan-400" />
              <span>ABOUT ME</span>
            </div>
            <h1 className="font-orbitron font-black text-xl sm:text-2xl text-white tracking-tight leading-tight">
              THE PERSON BEHIND THE <span className="text-cyan-400">UNIVERSE</span>
            </h1>
          </motion.div>

          {/* Center Mobile Person Image Card (82-88vw, max 380px width) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-[85vw] max-w-[360px] aspect-[4/3] my-1 p-2 bg-slate-950/85 backdrop-blur-xl border border-cyan-400/40 rounded-xl shadow-[0_0_25px_rgba(0,245,255,0.2)] rotate-1"
          >
            {/* Mobile Corner Reticle Markers */}
            <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-400 z-30" />
            <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-400 z-30" />
            <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-400 z-30" />
            <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-400 z-30" />

            <div className="relative w-full h-full rounded-lg overflow-hidden bg-slate-900">
              <img
                src={aboutPersonImg}
                alt="Nandhakumar - The Person Behind The Universe"
                className="w-full h-full object-cover object-[center_30%] filter brightness-95"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between text-left">
                <div>
                  <span className="font-orbitron font-bold text-[11px] text-white block">
                    NANDHAKUMAR
                  </span>
                  <span className="font-mono text-[8px] font-bold text-cyan-400 uppercase tracking-widest">
                    IDEAS → CODE → IMPACT
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Bottom Details & Name */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1.5 mb-2 px-2 max-w-md mx-auto"
          >
            <div>
              <h2 className="font-orbitron font-extrabold text-base text-cyan-300 tracking-wider">
                NANDHAKUMAR
              </h2>
              <p className="font-mono text-[9px] font-bold text-slate-300 tracking-widest uppercase">
                FRONTEND DEVELOPER • CREATIVE TECHNOLOGIST
              </p>
            </div>

            <p className="font-mono text-[10px] text-slate-300 leading-snug line-clamp-2">
              A curious mind who loves to learn, build, and create meaningful solutions through code.
            </p>

            <div className="pt-0.5 text-[9px] font-mono font-bold text-cyan-200/90 tracking-wider flex items-center justify-center gap-1.5 flex-wrap">
              <span>B.TECH IT</span>
              <span className="text-cyan-500">•</span>
              <span>FRONTEND</span>
              <span className="text-cyan-500">•</span>
              <span>AI</span>
              <span className="text-cyan-500">•</span>
              <span>3D WEB</span>
            </div>

            <blockquote className="font-orbitron font-black text-xs text-white italic">
              SAME PERSON. <span className="text-cyan-400">BIGGER DREAMS.</span>
            </blockquote>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
