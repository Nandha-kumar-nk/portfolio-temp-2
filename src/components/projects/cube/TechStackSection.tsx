import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectTechStackItem } from '../../../data/projectsData';
import { getTechIconConfig } from '../TechIconSystem';

interface TechStackSectionProps {
  techList: ProjectTechStackItem[];
  isMobile?: boolean;
}

// Role descriptions lookup table for technologies
const TECH_ROLE_DESCRIPTIONS: Record<string, string> = {
  react: 'Frontend Component Engine & State Manager',
  typescript: 'Strict Type-Safe Codebase & Interfaces',
  tailwind: 'Utility-First Responsive Design System',
  'node.js': 'High-Performance Asynchronous Runtime',
  express: 'RESTful API Routing & Middleware Pipeline',
  mongodb: 'NoSQL Document Database Engine',
  'socket.io': 'Bi-Directional Real-Time Event Feed',
  firebase: 'Realtime Cloud Database & Auth Pipeline',
  'google maps': 'Geospatial Route Mapping & Autocomplete',
  stripe: 'Secure Payment Processing API Gateway',
  python: 'AI / Data Processing Core Logic',
  yolov8: 'Real-Time Edge Computer Vision Detector',
  opencv: 'Computer Vision & Image Processing Engine',
  commander: 'Interactive CLI Option Parser & Launcher',
  inquirer: 'Interactive Terminal Prompt Engine',
  shelljs: 'Cross-Platform Unix Shell Automation',
  jspdf: 'Client-Side Dynamic Vector PDF Compiler',
  nodemailer: 'Automated SMTP Mailer & Alert Dispatcher',
  docker: 'Containerized Deployment Engine',
};

export const TechStackSection: React.FC<TechStackSectionProps> = ({ techList, isMobile = false }) => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const handleTechClick = (techName: string) => {
    if (selectedTech === techName) {
      setSelectedTech(null); // Toggle off if clicked twice
    } else {
      setSelectedTech(techName);
    }
  };

  const activeTechName = selectedTech || (techList[0]?.name ?? '');
  const activeConfig = activeTechName ? getTechIconConfig(activeTechName) : null;
  const activeRole = activeTechName
    ? TECH_ROLE_DESCRIPTIONS[activeTechName.toLowerCase()] || 'Core Technology Component'
    : '';

  return (
    <div className="w-full flex flex-col items-center sm:items-start mb-5 select-none">
      {/* Section Sub-Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-mono font-bold tracking-[0.22em] text-cyan-400 uppercase">
          TECH STACK
        </span>
        <span className="h-px w-12 bg-cyan-500/30" />
      </div>

      {/* Grid of Interactive Tech Icons (2-row constellation of 3 columns) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 w-full">
        {techList.slice(0, 6).map((tech, idx) => {
          const iconConfig = getTechIconConfig(tech.name);
          const IconComponent = iconConfig.icon;
          const isSelected = selectedTech === tech.name || (!selectedTech && idx === 0);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleTechClick(tech.name)}
              onMouseEnter={() => setSelectedTech(tech.name)}
              className={`relative flex flex-col items-center p-2 rounded-xl border transition-all duration-300 focus:outline-none cursor-pointer ${
                isSelected
                  ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_18px_rgba(0,245,255,0.35)] scale-105 z-10'
                  : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700 opacity-70 hover:opacity-100'
              }`}
            >
              {/* Energy Ring overlay when selected */}
              {isSelected && (
                <motion.span
                  layoutId="tech-ring"
                  className="absolute -inset-0.5 rounded-xl border border-cyan-400/80 pointer-events-none"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}

              {/* Icon Container */}
              <div className="relative flex items-center justify-center w-8 h-8 mb-1">
                <IconComponent
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isSelected ? 'brightness-125 scale-110' : 'brightness-90'
                  }`}
                  style={{ color: iconConfig.brandColor }}
                />
              </div>

              {/* Label */}
              <span
                className={`text-[10px] font-mono font-bold tracking-tight truncate max-w-full transition-colors ${
                  isSelected ? 'text-cyan-300' : 'text-slate-400'
                }`}
              >
                {iconConfig.shortLabel}
              </span>

              {/* Tiny VERIFIED Tag on Selected Icon */}
              {isSelected && (
                <span className="absolute -top-1 -right-1 z-20 px-1 py-0.2 rounded bg-cyan-400 text-[#020817] text-[7px] font-mono font-black uppercase tracking-tighter shadow-[0_0_6px_#00f5ff]">
                  VERIFIED
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Compact Technology Detail Card */}
      <AnimatePresence mode="wait">
        {activeConfig && (
          <motion.div
            key={activeConfig.name}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="w-full mt-3 p-2.5 rounded-lg border border-cyan-500/30 bg-[#041126]/90 backdrop-blur-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center border border-cyan-500/30 bg-slate-900"
                style={{ borderColor: `${activeConfig.brandColor}60` }}
              >
                <activeConfig.icon className="w-3.5 h-3.5" style={{ color: activeConfig.brandColor }} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  {activeConfig.shortLabel}
                </span>
                <span className="text-[10px] font-sans text-cyan-300/90 font-medium">
                  {activeRole}
                </span>
              </div>
            </div>
            <span className="text-[9px] font-mono text-cyan-400/80 font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/40">
              ACTIVE NODE
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
