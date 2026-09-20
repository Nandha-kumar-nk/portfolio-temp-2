import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ExternalLink,
  Github,
  Radio,
  ShieldCheck,
  MapPin,
  Car,
  Smartphone,
} from 'lucide-react';
import { ProjectDimensionPortal } from './ProjectDimensionPortal';
import { PROJECTS_DATA } from '../../../data/projectsData';

export const SpeedTaxiDimension: React.FC = () => {
  // Find Speed Taxi data or fallback
  const project =
    PROJECTS_DATA.find((p) => p.id === 'speed-taxi') || PROJECTS_DATA[2];

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Subtle micro-parallax mouse listener (max ±4px)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMouseOffset({
        x: Math.max(-4, Math.min(4, dx * 4)),
        y: Math.max(-4, Math.min(4, dy * 4)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const featuresList = [
    { label: 'LIVE TRACKING', icon: Radio },
    { label: 'SECURE AUTH', icon: ShieldCheck },
    { label: 'MAPS INTEGRATION', icon: MapPin },
    { label: 'RIDE BOOKING', icon: Car },
    { label: 'RESPONSIVE UI', icon: Smartphone },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center pt-1 sm:pt-2 pb-8 px-4 select-none">
      {/* 1. Header Category & Index Badge */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        className="mb-2 sm:mb-3 flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#020f26]/80 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,245,255,0.15)] backdrop-blur-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f5ff]" />
        <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-cyan-300 font-semibold uppercase">
          01 / 05 &bull; SMART MOBILITY PLATFORM
        </span>
      </motion.div>

      {/* 2. Central Dimensional Portal with Materialized Screenshot Inside */}
      <ProjectDimensionPortal>
        <div
          className="pointer-events-auto transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
          }}
        >
          {/* Screenshot Container & Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.91, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.95,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-[190px] h-[120px] sm:w-[245px] sm:h-[155px] md:w-[305px] md:h-[192px] rounded-lg p-[3px] bg-gradient-to-b from-cyan-400/60 via-sky-500/20 to-cyan-500/50 shadow-[0_0_28px_rgba(0,245,255,0.32)] border border-cyan-400/40 overflow-hidden group"
          >
            {/* Dark Metallic Inner Chassis */}
            <div className="relative w-full h-full bg-[#010918] rounded-[5px] overflow-hidden flex items-center justify-center">
              {/* Materialization Scanline Bar */}
              <motion.div
                initial={{ top: '-10%', opacity: 1 }}
                animate={{ top: '110%', opacity: 0 }}
                transition={{ duration: 1.1, delay: 0.35, ease: 'easeInOut' }}
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_#00f5ff] z-30 pointer-events-none"
              />

              {/* Corner Frame Notch Accents */}
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />

              {/* Screenshot Image or Cyber Fallback UI */}
              {!imgError ? (
                <img
                  src={project.image}
                  alt="Speed Taxi Ride Booking Platform"
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgError(true)}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    imgLoaded ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'
                  }`}
                />
              ) : null}

              {/* Cyber Fallback Interface (Shown while loading or if image unloads) */}
              {(!imgLoaded || imgError) && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#02122c] via-[#010a1a] to-[#00040e] p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span className="text-[10px] font-mono tracking-wider text-cyan-200 font-bold">
                        SPEED TAXI DISPATCH
                      </span>
                    </div>
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      LIVE
                    </span>
                  </div>

                  <div className="space-y-1.5 my-auto">
                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-300">
                      <span>ORIGIN: DOWNTOWN CORE</span>
                      <span className="text-cyan-400">ETA 2 MIN</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden p-[1px]">
                      <div className="w-3/4 h-full bg-gradient-to-r from-cyan-500 to-sky-300 rounded-full animate-pulse" />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-slate-400">
                      <span>DRIVER: DISPATCHED</span>
                      <span>GPS TELEMETRY ACTIVE</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[8px] font-mono text-cyan-400/80 border-t border-cyan-500/20 pt-1">
                    <span>ROUTE: OPTIMIZED</span>
                    <span>$18.50 EST</span>
                  </div>
                </div>
              )}

              {/* Subtle Image Gloss Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-sky-400/10 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </ProjectDimensionPortal>

      {/* 3. Project Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.55, ease: 'easeOut' }}
        className="text-center mt-3 sm:mt-4 mb-1"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(0,245,255,0.35)]">
          SPEED TAXI
        </h1>
        <p className="text-[11px] sm:text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold mt-1">
          SMART MOBILITY PLATFORM
        </p>
      </motion.div>

      {/* 4. Project Description */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.7, ease: 'easeOut' }}
        className="text-xs sm:text-sm md:text-base text-slate-300 max-w-[580px] text-center leading-relaxed font-normal my-2 sm:my-3 px-2"
      >
        “A modern ride-booking platform focused on seamless booking, secure
        authentication, live tracking and an intuitive mobility experience.”
      </motion.p>

      {/* 5. Feature Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.85, ease: 'easeOut' }}
        className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 my-2 sm:my-3 max-w-xl"
      >
        {featuresList.map((feat, idx) => {
          const IconComp = feat.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#020e24]/80 border border-cyan-500/25 text-[#94a3b8] hover:text-cyan-300 hover:border-cyan-400/50 transition-colors duration-200 shadow-xs"
            >
              <IconComp className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="text-[10px] sm:text-xs font-mono tracking-wider uppercase font-medium">
                {feat.label}
              </span>
            </div>
          );
        })}
      </motion.div>

      {/* 6. Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 1.0, ease: 'easeOut' }}
        className="flex items-center gap-3 sm:gap-4 mt-3"
      >
        {/* VIEW LIVE BUTTON */}
        <a
          href={project.liveUrl || 'https://speedtaxi.demo'}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/60 hover:border-cyan-300 text-cyan-200 hover:text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 shadow-[0_0_15px_rgba(0,245,255,0.2)] hover:shadow-[0_0_25px_rgba(0,245,255,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <span>VIEW LIVE</span>
          <ExternalLink className="w-3.5 h-3.5 text-cyan-300 group-hover:translate-x-0.5 transition-transform duration-200" />
        </a>

        {/* VIEW SOURCE BUTTON */}
        <a
          href={project.githubUrl || 'https://github.com/nandhakumar/speed-taxi-website'}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-[#020d21]/90 hover:bg-[#031533] border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-200 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <Github className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 transition-colors duration-200" />
          <span>VIEW SOURCE</span>
        </a>
      </motion.div>
    </div>
  );
};

export default SpeedTaxiDimension;
