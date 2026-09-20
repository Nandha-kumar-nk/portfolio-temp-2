import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectTechStackItem } from '../../../data/projectsData';
import { getTechIconConfig } from '../TechIconSystem';
import { Cpu, Info } from 'lucide-react';

interface ProjectLensTechStackProps {
  projectId: string;
  techStack: ProjectTechStackItem[];
}

const TECH_DESCRIPTIONS: Record<string, Record<string, string>> = {
  'speed-taxi': {
    React: 'Component-driven reactive frontend UI architecture with real-time state synchronization.',
    'Google Maps API': 'Dynamic map render engine, route estimation, turn-by-turn waypoint polyline plotting.',
    Express: 'High-performance RESTful API gateway handling ride requests, authentication, and dispatch middleware.',
    MongoDB: 'Document storage for driver profiles, trip logs, location telemetry, and transaction records.',
    'Socket.IO': 'Sub-second bi-directional WebSocket connection for real-time driver GPS tracking.',
    Stripe: 'PCI-compliant payment processing gateway for automated fare transactions and digital receipts.',
  },
  'swayam-2': {
    React: 'Modular frontend architecture with custom video player controls and course navigation.',
    Express: 'RESTful API controller layer routing assignments, student enrollments, and grading logic.',
    MongoDB: 'Persistent document database for course catalogs, student rosters, and assignment submissions.',
    'Node.js': 'Scalable JavaScript runtime driving backend application logic and background worker queues.',
    WebSockets: 'Real-time notification stream dispatching instant instructor broadcasts and deadline alerts.',
    NodeMailer: 'Automated background email worker sending scheduled assignment due-date reminders.',
  },
  'resume-forge': {
    React: 'Instant side-by-side markdown editor and live document rendering engine.',
    TypeScript: 'Strict type safety across document schemas, section ordering, and ATS scoring algorithms.',
    'Tailwind CSS': 'Utility-first styling powering responsive ATS document templates and typography.',
    jsPDF: 'Client-side vector PDF compilation engine generating high-resolution downloadable resumes.',
    'Node.js': 'Backend compilation runtime supporting template validation and export pipelines.',
    Firebase: 'Cloud persistence store saving draft resumes and user account preferences.',
  },
  'wildlife-ai': {
    Python: 'Primary computer vision and edge machine learning pipeline execution language.',
    YOLOv8: 'Ultra-fast object detection model identifying species in under 40 milliseconds.',
    OpenCV: 'Real-time video frame processing, image filtering, and camera sensor stream intake.',
    PyTorch: 'Deep learning framework used for model training, weights optimization, and edge inference.',
    'Raspberry Pi': 'Low-power IoT edge hardware unit deployed along forest border zones.',
    FastAPI: 'Asynchronous Python web server dispatching instant ranger alerts and sensor telemetry.',
  },
  'nk-mern-cli': {
    'Node.js': 'Cross-platform CLI execution runtime driving project scaffolding scripts.',
    'Commander.js': 'Terminal command parsing framework for argument flags and interactive CLI option menus.',
    Inquirer: 'Interactive terminal prompt system guiding developers through architecture options.',
    Docker: 'Automated containerization generator bootstrapping docker-compose setups in seconds.',
    Chalk: 'Terminal color formatting library powering vibrant status logs and warning highlights.',
    ShellJS: 'Cross-platform Unix shell commands executor automating git setup and npm installs.',
  },
};

export const ProjectLensTechStack: React.FC<ProjectLensTechStackProps> = ({
  projectId,
  techStack,
}) => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const projectDetails = TECH_DESCRIPTIONS[projectId] || {};

  return (
    <div className="w-full font-mono mt-3">
      {/* Label Header */}
      <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-cyan-400">
        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
        <span className="uppercase tracking-wider">TECHNOLOGY ARCHITECTURE</span>
      </div>

      {/* Grid of Real Brand Logos */}
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => {
          const config = getTechIconConfig(tech.name);
          const Icon = config.icon;
          const isSelected = selectedTech === tech.name;
          const isHovered = hoveredTech === tech.name;

          return (
            <div key={tech.name} className="relative group">
              <button
                onClick={() => setSelectedTech(isSelected ? null : tech.name)}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300 cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_18px_rgba(0,245,255,0.5)] scale-105 z-10'
                    : 'bg-slate-950/70 border-cyan-900/50 text-slate-300 hover:border-cyan-400 hover:bg-slate-900/80 hover:scale-102'
                }`}
              >
                {/* Brand Logo Icon */}
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  <Icon
                    className="w-4 h-4 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_currentColor]"
                    style={{ color: config.brandColor }}
                  />
                </div>

                {/* Tech Label */}
                <span className="text-xs font-semibold tracking-tight">
                  {config.shortLabel}
                </span>
              </button>

              {/* Hover Tooltip */}
              <AnimatePresence>
                {isHovered && !isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/60 text-[10px] font-mono text-cyan-200 whitespace-nowrap z-50 shadow-xl pointer-events-none"
                  >
                    {config.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Selected Tech Detail Callout */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-3 p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/50 text-xs text-cyan-200 flex items-start gap-2.5 shadow-[0_0_15px_rgba(0,245,255,0.15)]"
          >
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-cyan-300 uppercase">
                {selectedTech}:
              </span>{' '}
              <span className="font-sans">
                {projectDetails[selectedTech] ||
                  `Core architectural component driving high-performance operations for ${projectId}.`}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
