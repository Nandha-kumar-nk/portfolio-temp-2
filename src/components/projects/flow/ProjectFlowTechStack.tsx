import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectTechStackItem } from '../../../data/projectsData';
import { getTechIconConfig } from '../TechIconSystem';
import { Cpu, Info } from 'lucide-react';

interface ProjectFlowTechStackProps {
  projectId: string;
  techStack: ProjectTechStackItem[];
}

const TECH_EXPLANATIONS: Record<string, Record<string, string>> = {
  'speed-taxi': {
    React: 'Component-driven reactive frontend UI handling instant ride bookings.',
    'Google Maps API': 'Turn-by-turn routing, polyline plotting, and dynamic map rendering.',
    Express: 'REST API backend dispatching driver locations and ride status updates.',
    MongoDB: 'Document storage preserving driver profiles, trip histories, and telemetry.',
    'Socket.IO': 'Bi-directional WebSocket connection for sub-second driver GPS tracking.',
    Stripe: 'Secure payment gateway automating fare calculation and digital receipts.',
  },
  'swayam-2': {
    React: 'Modular educational platform UI with custom video player integration.',
    Express: 'Backend API controller handling course enrollments and assignment logic.',
    MongoDB: 'Persistent document database storing student profiles and rosters.',
    'Node.js': 'JavaScript runtime driving backend queues and background task processing.',
    WebSockets: 'Instant notification stream delivering course alerts and instructor updates.',
    NodeMailer: 'Automated email worker delivering scheduled assignment reminders.',
  },
  'resume-forge': {
    React: 'Side-by-side markdown editor and real-time vector document preview.',
    TypeScript: 'Strict type safety across section schemas and ATS scoring engines.',
    'Tailwind CSS': 'Utility-first CSS styling powering responsive document templates.',
    jsPDF: 'Client-side PDF compilation engine outputting high-resolution resumes.',
    'Node.js': 'Backend service validating export schemas and document templates.',
    Firebase: 'Cloud store saving user draft resumes and profile preferences.',
  },
  'wildlife-ai': {
    Python: 'Primary computer vision and machine learning execution language.',
    YOLOv8: 'Ultra-fast object detection model identifying animal species in <40ms.',
    OpenCV: 'Real-time camera sensor stream intake and image frame processing.',
    PyTorch: 'Deep learning framework used for model training and edge inference.',
    'Raspberry Pi': 'Low-power IoT hardware unit deployed along forest border zones.',
    FastAPI: 'Asynchronous Python web server dispatching instant ranger alerts.',
  },
  'nk-mern-cli': {
    'Node.js': 'Cross-platform CLI execution runtime driving project generation.',
    'Commander.js': 'Terminal command parsing framework for argument flags and menus.',
    Inquirer: 'Interactive terminal prompt system guiding developers through options.',
    Docker: 'Automated containerization generator bootstrapping docker-compose setups.',
    Chalk: 'Terminal color formatting library powering vibrant status logs.',
    ShellJS: 'Cross-platform Unix shell commands executor automating git setup and installs.',
  },
};

export const ProjectFlowTechStack: React.FC<ProjectFlowTechStackProps> = ({
  projectId,
  techStack,
}) => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const explanations = TECH_EXPLANATIONS[projectId] || {};

  return (
    <div className="w-full font-mono mt-3">
      {/* Header Label */}
      <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-cyan-400">
        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
        <span className="uppercase tracking-wider">BUILT WITH</span>
      </div>

      {/* Grid of Real SVG Brand Logos */}
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
                    : 'bg-slate-950/80 border-cyan-900/50 text-slate-300 hover:border-cyan-400 hover:bg-slate-900/80 hover:scale-102'
                }`}
              >
                {/* Brand Logo Icon */}
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  <Icon
                    className="w-4 h-4 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_currentColor]"
                    style={{ color: config.brandColor }}
                  />
                </div>

                {/* Short Label */}
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
                {explanations[selectedTech] ||
                  `Core architectural component driving high-performance operations for ${projectId}.`}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
