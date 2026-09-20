import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { ProjectItem } from '../../data/projectsData';
import { getTechIconConfig } from './TechIconSystem';

interface DynamicTechConstellationProps {
  project: ProjectItem;
  isMobile?: boolean;
}

export interface DetailedTechItem {
  name: string;
  category: string;
  description: string;
  highlights: string[];
  usedFor: string[];
}

/**
 * Provides authentic, project-tailored descriptions, key highlights, and usage tags for technologies.
 */
export function getTechDetails(techName: string, project: ProjectItem): DetailedTechItem {
  const norm = techName.toLowerCase().trim();

  // 1. React
  if (norm.includes('react')) {
    return {
      name: 'React.js',
      category: 'Frontend Component Engine',
      description: `Powers the interactive user interface for ${project.title}, providing smooth state management, instant component re-renders, and a responsive learning experience.`,
      highlights: [
        'Component-based modular architecture',
        'Virtual DOM for high performance',
        'Custom hooks for state management',
        'Responsive and interactive UI',
        'Large developer ecosystem',
      ],
      usedFor: ['UI Components', 'Routing', 'State Management', 'Interactive Pages', 'Performance Optimization'],
    };
  }

  // 2. TypeScript
  if (norm.includes('typescript')) {
    return {
      name: 'TypeScript',
      category: 'Type-Safe Language Standard',
      description: `Enforces strict static typing across ${project.title}, preventing runtime defects, ensuring code maintainability, and defining precise data interfaces.`,
      highlights: [
        'Strict compile-time type safety',
        'Auto-documented interface definitions',
        'Enhanced IDE refactoring & intelligence',
        'Zero runtime overhead type system',
      ],
      usedFor: ['Type Definitions', 'Compile Safety', 'Interface Guards', 'IDE Support', 'Refactoring'],
    };
  }

  // 3. Tailwind CSS
  if (norm.includes('tailwind')) {
    return {
      name: 'Tailwind CSS',
      category: 'Utility-First Styling Framework',
      description: `Delivers the sleek, futuristic UI design of ${project.title} with custom glassmorphism, responsive breakpoint scaling, and dark-mode color palettes.`,
      highlights: [
        'JIT compilation for minimal CSS bundle',
        'Custom glassmorphism & backdrop filters',
        'Responsive mobile-first utility classes',
        'Consistent typographic & spacing rhythm',
      ],
      usedFor: ['Glassmorphism', 'Responsive Layouts', 'Dark Mode', 'Custom Utilities', 'Theme System'],
    };
  }

  // 4. Node.js
  if (norm.includes('node') && !norm.includes('mail')) {
    return {
      name: 'Node.js',
      category: 'Asynchronous JavaScript Runtime',
      description: `Executes high-throughput non-blocking server operations in ${project.title}, handling concurrent API requests, streaming telemetry, and background system tasks.`,
      highlights: [
        'Event-driven non-blocking I/O loop',
        'High concurrency request processing',
        'Scalable backend API architecture',
        'Seamless JSON data stream pipeline',
      ],
      usedFor: ['Backend Server', 'API Gateway', 'Streaming Data', 'Async Tasks', 'Event Loop'],
    };
  }

  // 5. Express
  if (norm.includes('express')) {
    return {
      name: 'Express.js',
      category: 'REST API & Web Server Middleware',
      description: `Serves as the backend routing gateway for ${project.title}, managing API endpoints, JWT authentication middleware, and input validation pipelines.`,
      highlights: [
        'Lightweight RESTful API endpoint routing',
        'Custom middleware for security & CORS',
        'Robust error handling & response status',
        'JWT role-based authorization guards',
      ],
      usedFor: ['API Routes', 'Auth Middleware', 'CORS Guard', 'Request Validation', 'JSON Endpoints'],
    };
  }

  // 6. MongoDB
  if (norm.includes('mongo')) {
    return {
      name: 'MongoDB',
      category: 'NoSQL Document Database',
      description: `Stores structured documents, user state, and operational logs for ${project.title} with flexible Mongoose schema validation and fast indexing.`,
      highlights: [
        'High-performance document store',
        'Flexible Mongoose schema validation',
        'Sub-millisecond index-backed queries',
        'Scalable document aggregation pipelines',
      ],
      usedFor: ['Document Store', 'User Profiles', 'Course Data', 'Schema Models', 'Fast Indexing'],
    };
  }

  // 7. Socket.IO / WebSockets
  if (norm.includes('socket') || norm.includes('websocket')) {
    return {
      name: 'Socket.IO',
      category: 'Bi-Directional Telemetry Protocol',
      description: `Enables instant real-time data broadcasting for ${project.title}, pushing live updates, position markers, and alert dispatches without polling latency.`,
      highlights: [
        'Sub-second bi-directional event stream',
        'Automated heartbeat & reconnection',
        'Low-overhead binary & JSON transport',
        'Instant multi-client broadcast channels',
      ],
      usedFor: ['Live Alerts', 'Real-time Telemetry', 'Event Bus', 'Bi-directional Stream', 'WebSockets'],
    };
  }

  // 8. Firebase
  if (norm.includes('firebase')) {
    return {
      name: 'Firebase',
      category: 'Cloud Authentication & Storage',
      description: `Provides persistent cloud draft sync, secure user authentication, and document state persistence for ${project.title}.`,
      highlights: [
        'Secure multi-provider authentication',
        'Real-time document state listener',
        'Offline persistence & cloud sync',
        'Fine-grained Firestore security rules',
      ],
      usedFor: ['Authentication', 'Firestore Sync', 'Cloud Drafts', 'Security Rules', 'User Session'],
    };
  }

  // 9. jsPDF
  if (norm.includes('jspdf') || norm.includes('pdf')) {
    return {
      name: 'jsPDF Engine',
      category: 'Vector PDF Compilation Engine',
      description: `Compiles document structures directly into client-side vector PDF files for ${project.title} with pixel-exact typography and layout bounds.`,
      highlights: [
        'Client-side vector PDF compilation',
        'Exact ATS-friendly text formatting',
        'Zero-server rendering latency',
        'Custom page size & font embedding',
      ],
      usedFor: ['PDF Export', 'ATS Templates', 'Vector Graphics', 'Client Rendering', 'Document Engine'],
    };
  }

  // 10. Google Maps API
  if (norm.includes('map') || norm.includes('google maps')) {
    return {
      name: 'Google Maps API',
      category: 'Geospatial Telemetry & Routing Engine',
      description: `Renders vector map canvases, plots real-time GPS coordinates, calculates route waypoints, and estimates transit fares for ${project.title}.`,
      highlights: [
        'Live vector map canvas rendering',
        'Real-time GPS coordinate plotting',
        'Distance Matrix fare estimations',
        'Smooth marker animation interpolation',
      ],
      usedFor: ['Map Canvas', 'GPS Plotting', 'Fare Matrix', 'Waypoints', 'Live Tracking'],
    };
  }

  // 11. Stripe
  if (norm.includes('stripe')) {
    return {
      name: 'Stripe API',
      category: 'Secure Payment Gateway API',
      description: `Handles PCI-compliant checkout transactions, payment intents, and automated receipt dispatches for ${project.title}.`,
      highlights: [
        'PCI-DSS compliant payment processing',
        'Instant payment intent verification',
        'Automated webhook status handlers',
        'Encrypted card tokenization flow',
      ],
      usedFor: ['Payment Intent', 'Checkout Flow', 'Webhooks', 'Tokenization', 'Receipts'],
    };
  }

  // 12. Python
  if (norm.includes('python')) {
    return {
      name: 'Python',
      category: 'AI & Edge Analytics Engine',
      description: `Drives computer vision models, data preprocessing pipelines, and machine learning inference loops for ${project.title}.`,
      highlights: [
        'Tensor manipulation & NumPy matrix math',
        'Asynchronous event loop execution',
        'Seamless OpenCV & PyTorch integration',
        'Rapid AI prototyping & deployment',
      ],
      usedFor: ['AI Pipeline', 'NumPy Matrix', 'Model Training', 'Data Cleaning', 'Edge Scripting'],
    };
  }

  // 13. YOLO / OpenCV
  if (norm.includes('yolo') || norm.includes('opencv') || norm.includes('cv')) {
    return {
      name: norm.includes('yolo') ? 'YOLOv8 Vision' : 'OpenCV Engine',
      category: 'Sub-40ms Object Detection Vision Model',
      description: `Processes raw video feeds frame-by-frame for ${project.title}, identifying target species and objects with bounding box inference under 40ms.`,
      highlights: [
        'Sub-40ms edge inference velocity',
        'High mAP bounding box classification',
        'Frame-by-frame image matrix parsing',
        'Low-light & thermal stream detection',
      ],
      usedFor: ['Sub-40ms Vision', 'Bounding Boxes', 'Species Detection', 'Thermal Streams', 'Frame Parsing'],
    };
  }

  // 14. PyTorch
  if (norm.includes('pytorch')) {
    return {
      name: 'PyTorch',
      category: 'Deep Learning Tensor Framework',
      description: `Executes deep neural network layers and tensor operations powering the automated visual recognition system in ${project.title}.`,
      highlights: [
        'GPU-accelerated tensor computation',
        'Dynamic computation graph execution',
        'Optimized neural network layers',
        'Quantized edge model execution',
      ],
      usedFor: ['Deep Learning', 'GPU Tensors', 'Neural Layers', 'Model Quantization', 'Inference'],
    };
  }

  // 15. Raspberry Pi / IoT
  if (norm.includes('raspberry') || norm.includes('iot')) {
    return {
      name: 'Raspberry Pi / IoT',
      category: 'Edge IoT Hardware Sensor Mesh',
      description: `Acts as the remote physical computing unit for ${project.title}, capturing video, triggering physical warning sirens, and relaying alerts.`,
      highlights: [
        'Low-power continuous edge operation',
        'GPIO pin relay & acoustic siren trigger',
        'Local camera module stream capture',
        'Resilient cellular telemetry dispatch',
      ],
      usedFor: ['Edge Sensors', 'GPIO Sirens', 'Camera Modules', 'Field Telemetry', 'Low Power'],
    };
  }

  // 16. FastAPI
  if (norm.includes('fastapi')) {
    return {
      name: 'FastAPI',
      category: 'Asynchronous Python Microservice API',
      description: `Serves high-performance Python inference endpoints for ${project.title} with Pydantic type validation and OpenAPI documentation.`,
      highlights: [
        'Asynchronous ASGI request throughput',
        'Automatic OpenAPI schema docs',
        'Pydantic request payload validation',
        'Sub-10ms route resolution speed',
      ],
      usedFor: ['Python API', 'Asynchronous Routing', 'OpenAPI Specs', 'Pydantic Models', 'Sub-10ms Speed'],
    };
  }

  // 17. Docker
  if (norm.includes('docker')) {
    return {
      name: 'Docker',
      category: 'Containerization & Isolation Engine',
      description: `Packages ${project.title} applications into portable, lightweight containers ensuring zero configuration drift across environments.`,
      highlights: [
        'Isolated multi-stage container builds',
        'Reproducible production runtime',
        'Fast Docker-Compose orchestration',
        'Minimal footprint container images',
      ],
      usedFor: ['Containerization', 'Isolated Environments', 'CI/CD Pipelines', 'Docker Compose', 'Microservices'],
    };
  }

  // 18. NodeMailer
  if (norm.includes('nodemailer') || norm.includes('mail')) {
    return {
      name: 'NodeMailer',
      category: 'Automated SMTP Email Dispatch',
      description: `Dispatches automated HTML transactional notifications, deadline reminders, and alert emails for ${project.title}.`,
      highlights: [
        'Automated scheduled email dispatch',
        'Responsive HTML template compiling',
        'Secure TLS/SMTP authentication',
        'Asynchronous queue-backed delivery',
      ],
      usedFor: ['Email Alerts', 'SMTP Gateway', 'HTML Templates', 'Security Codes', 'Notifications'],
    };
  }

  // 19. Commander / Inquirer / CLI Tools
  if (norm.includes('commander') || norm.includes('inquirer') || norm.includes('chalk') || norm.includes('shell')) {
    return {
      name: techName,
      category: 'Interactive Terminal Shell Engine',
      description: `Drives the interactive CLI prompts, option parsing, formatted output, and automated file generation in ${project.title}.`,
      highlights: [
        'Interactive shell wizard prompts',
        'Robust flag & option parsing',
        'Automated directory & file creation',
        'Colorized ANSI status formatting',
      ],
      usedFor: ['CLI Prompts', 'Option Parsing', 'File Scaffolding', 'ANSI Formatting', 'Terminal Shell'],
    };
  }

  // Generic fallback for any tech
  return {
    name: techName,
    category: 'Core System Technology',
    description: `Integral component of ${project.title}, providing core functionality, verified security standards, and production-tested performance.`,
    highlights: [
      'Production-tested stability & speed',
      'Modular system integration',
      'Seamless API & data pipeline fit',
      'Verified performance standards',
    ],
    usedFor: ['Core System', 'Data Processing', 'Security Standard', 'Modular Logic', 'Performance'],
  };
}

export const DynamicTechConstellation: React.FC<DynamicTechConstellationProps> = ({
  project,
  isMobile = false,
}) => {
  // Selected tech index (default 0 for React/first tech)
  const [selectedTechIndex, setSelectedTechIndex] = useState<number | null>(0);
  const [hoveredTechIndex, setHoveredTechIndex] = useState<number | null>(null);

  // Slow orbital rotation offset (radians)
  const [orbitOffset, setOrbitOffset] = useState<number>(0);

  // Reset selected tech index when project changes
  useEffect(() => {
    setSelectedTechIndex(0);
    setHoveredTechIndex(null);
  }, [project.id]);

  // Cinematic slow orbital drift loop (~52s per full rotation)
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      setOrbitOffset((prev) => (prev + deltaTime * 0.00012) % (Math.PI * 2));
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // List of tech stack items for the current project
  const techStack = useMemo(() => {
    if (project.techStack && project.techStack.length > 0) {
      return project.techStack;
    }
    // Fallback default tech stack
    return [
      { name: 'React', category: 'Frontend', description: '' },
      { name: 'Node.js', category: 'Backend', description: '' },
      { name: 'Express', category: 'Backend', description: '' },
      { name: 'MongoDB', category: 'Database', description: '' },
      { name: 'Socket.IO', category: 'Real-time', description: '' },
      { name: 'NodeMailer', category: 'Email', description: '' },
    ];
  }, [project.techStack]);

  const nodeCount = techStack.length;

  // Active tech item (or null if deselected)
  const activeTech = selectedTechIndex !== null ? techStack[selectedTechIndex] || techStack[0] : null;

  // Detailed info for active tech
  const activeDetails = useMemo(() => {
    if (!activeTech) return null;
    return getTechDetails(activeTech.name, project);
  }, [activeTech, project]);

  // Active icon config
  const activeConfig = activeTech ? getTechIconConfig(activeTech.name) : null;
  const ActiveIcon = activeConfig?.icon;

  // Layout dimensions for constellation viewport
  const containerHeight = isMobile ? 310 : 380;
  const centerY = containerHeight / 2;
  const orbitRadiusX = isMobile ? 95 : 135;
  const orbitRadiusY = isMobile ? 85 : 115;

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch select-none">
      {/* =================================================================== */}
      {/* CENTER COLUMN: CONSTELLATION ORBIT CARD                            */}
      {/* =================================================================== */}
      <div className="xl:col-span-7 flex flex-col justify-between p-4 rounded-2xl border border-cyan-500/30 bg-[#040f26]/90 backdrop-blur-md shadow-2xl relative overflow-hidden min-h-[440px]">
        {/* Card Top Bar */}
        <div className="w-full flex items-center justify-between pb-2.5 border-b border-slate-800/80 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              VERIFIED TECH CONSTELLATION
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
            {nodeCount} SATELLITE NODES
          </span>
        </div>

        {/* Orbit Canvas Viewport */}
        <div
          className="relative w-full flex items-center justify-center overflow-hidden my-auto"
          style={{ height: `${containerHeight}px` }}
        >
          {/* SVG Connection Spokes & Orbital Rings */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Outer Subtle Radial Glow Ring */}
            <ellipse
              cx="50%"
              cy={centerY}
              rx={orbitRadiusX + 18}
              ry={orbitRadiusY + 16}
              fill="none"
              stroke="rgba(0, 245, 255, 0.06)"
              strokeWidth="1"
            />

            {/* Main Primary Dashed Orbital Ring */}
            <ellipse
              cx="50%"
              cy={centerY}
              rx={orbitRadiusX}
              ry={orbitRadiusY}
              fill="none"
              stroke={hoveredTechIndex !== null ? 'rgba(0, 245, 255, 0.45)' : 'rgba(0, 245, 255, 0.22)'}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="transition-colors duration-300"
            />

            {/* Connection Energy Lines from Core Hub to Satellites */}
            {techStack.map((_, idx) => {
              const baseAngleRad = (idx * (2 * Math.PI)) / nodeCount - Math.PI / 2;
              const currentAngleRad = baseAngleRad + orbitOffset;

              const nodeY = centerY + Math.sin(currentAngleRad) * orbitRadiusY;
              const isSelected = selectedTechIndex === idx;
              const isHovered = hoveredTechIndex === idx;
              const isActiveLine = isSelected || isHovered;

              return (
                <g key={`spoke-${idx}`}>
                  <line
                    x1="50%"
                    y1={centerY}
                    x2={`calc(50% + ${Math.cos(currentAngleRad) * orbitRadiusX}px)`}
                    y2={nodeY}
                    stroke={isActiveLine ? '#00f5ff' : 'rgba(0, 229, 255, 0.22)'}
                    strokeWidth={isActiveLine ? 2 : 1}
                    strokeDasharray={isActiveLine ? 'none' : '3 3'}
                    style={{ transition: 'stroke 300ms ease, stroke-width 300ms ease' }}
                  />
                  {/* Energy Pulse along Active Connection Line */}
                  {isSelected && (
                    <circle
                      r="3"
                      fill="#00f5ff"
                      className="shadow-[0_0_10px_#00f5ff]"
                    >
                      <animateMotion
                        path={`M 0,0 L ${Math.cos(currentAngleRad) * orbitRadiusX},${nodeY - centerY}`}
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Central TECH STACK Core Hub (120-130px diameter on desktop) */}
          <div
            className="absolute z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-cyan-400/50 bg-[#030d22]/95 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(0,245,255,0.25)] ring-1 ring-cyan-500/30"
            style={{
              top: `${centerY}px`,
              left: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 28px ${project.accentColor}30, inset 0 0 15px rgba(0, 245, 255, 0.15)`,
            }}
          >
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mb-0.5 animate-pulse drop-shadow-[0_0_8px_#00f5ff]" />
            <span className="text-xs sm:text-sm font-mono font-black text-white tracking-widest uppercase leading-tight">
              TECH
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase leading-tight">
              STACK
            </span>
          </div>

          {/* Orbiting Satellite Tech Nodes */}
          {techStack.map((tech, idx) => {
            const isSelected = selectedTechIndex === idx;
            const isHovered = hoveredTechIndex === idx;
            const isDimmed = selectedTechIndex !== null && selectedTechIndex !== idx && !isHovered;

            // Compute orbital position
            const baseAngleRad = (idx * (2 * Math.PI)) / nodeCount - Math.PI / 2;
            const currentAngleRad = baseAngleRad + orbitOffset;

            const nodeXOffset = Math.cos(currentAngleRad) * orbitRadiusX;
            const nodeY = centerY + Math.sin(currentAngleRad) * orbitRadiusY;

            const config = getTechIconConfig(tech.name);
            const Icon = config.icon;

            return (
              <div
                key={tech.name + idx}
                className="absolute z-20 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
                style={{
                  left: `calc(50% + ${nodeXOffset}px)`,
                  top: `${nodeY}px`,
                  transform: `translate(-50%, -50%) scale(${isSelected || isHovered ? 1.1 : 1})`,
                  opacity: isDimmed ? 0.45 : 1,
                }}
                onClick={() => setSelectedTechIndex(idx)}
                onMouseEnter={() => setHoveredTechIndex(idx)}
                onMouseLeave={() => setHoveredTechIndex(null)}
              >
                {/* Node Button Circle (52-58px desktop, 42-46px mobile) */}
                <div
                  className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/95 shadow-[0_0_28px_#00f5ff] ring-2 ring-cyan-400/60'
                      : isHovered
                      ? 'border-cyan-400/80 bg-slate-900/90 shadow-[0_0_20px_rgba(0,245,255,0.45)]'
                      : 'border-slate-800 bg-[#081328]/95 shadow-lg hover:border-cyan-500/50'
                  }`}
                  style={{
                    boxShadow: isSelected
                      ? `0 0 24px ${config.brandColor}`
                      : isHovered
                      ? `0 0 16px ${config.brandColor}`
                      : '0 4px 12px rgba(0,0,0,0.5)',
                  }}
                >
                  <Icon
                    className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300"
                    style={{ color: isSelected || isHovered ? '#00f5ff' : config.brandColor }}
                  />

                  {/* Pulsing Outer Halo for Selected Node */}
                  {isSelected && (
                    <span className="absolute -inset-1 rounded-full border border-cyan-400/60 animate-ping opacity-40 pointer-events-none" />
                  )}
                </div>

                {/* Camera-Facing Text Labels with 10–14px Spacing */}
                <div className="mt-2 flex flex-col items-center text-center pointer-events-none">
                  <span
                    className={`text-[10px] sm:text-xs font-mono font-bold tracking-tight whitespace-nowrap transition-colors duration-200 ${
                      isSelected || isHovered ? 'text-cyan-300 font-black' : 'text-slate-200'
                    }`}
                  >
                    {config.shortLabel}
                  </span>
                  <span className="text-[7.5px] font-mono text-cyan-400/90 uppercase tracking-widest mt-0.5 font-semibold">
                    VERIFIED
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Card Bottom Instructions Caption */}
        <div className="w-full pt-2.5 border-t border-slate-800/80 text-center z-10">
          <p className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1.5">
            <span>🖱 Click on any technology to explore its role in this project</span>
          </p>
        </div>
      </div>

      {/* =================================================================== */}
      {/* RIGHT COLUMN: TECHNOLOGY DETAILS PANEL                             */}
      {/* =================================================================== */}
      <div className="xl:col-span-5 flex flex-col justify-between p-4 rounded-2xl border border-cyan-500/30 bg-[#040f26]/90 backdrop-blur-md shadow-2xl relative">
        <AnimatePresence mode="wait">
          {activeDetails && activeConfig && ActiveIcon ? (
            <motion.div
              key={activeDetails.name + project.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full flex flex-col justify-between h-full space-y-4"
            >
              <div>
                {/* Header: Title & Close Button */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    TECHNOLOGY DETAILS
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedTechIndex(null)}
                    title="Deselect technology"
                    className="w-6 h-6 rounded-full border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 flex items-center justify-center transition-colors text-xs font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Tech Main Branding Frame */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-cyan-500/40 bg-slate-900/90 flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.2)] shrink-0"
                    style={{ boxShadow: `0 0 20px ${activeConfig.brandColor}40` }}
                  >
                    <ActiveIcon className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: activeConfig.brandColor }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-lg sm:text-xl font-black font-sans text-white uppercase tracking-tight">
                        {activeDetails.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-[9px] font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                        VERIFIED
                      </span>
                    </div>
                    <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wide mt-0.5">
                      {activeDetails.category}
                    </div>
                  </div>
                </div>

                {/* Tech Description */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans mb-4">
                  {activeDetails.description}
                </p>

                {/* Key Highlights Checklist */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    KEY HIGHLIGHTS
                  </span>
                  <div className="space-y-1.5">
                    {activeDetails.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-2 rounded-lg border border-slate-800/80 bg-slate-900/40"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-200 font-medium leading-snug">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* USED IN [PROJECT] FOR Tags */}
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    USED IN {project.title.toUpperCase()} FOR
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDetails.usedFor.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-[11px] font-mono font-medium text-cyan-200 hover:border-cyan-400/60 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Empty / Unselected Default State */
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center justify-center text-center my-auto py-12 space-y-3"
            >
              <div className="w-14 h-14 rounded-full border border-cyan-500/40 bg-slate-900/80 flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.2)]">
                <Zap className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
              <h4 className="text-base font-mono font-bold text-white uppercase tracking-wider">
                SELECT A TECHNOLOGY
              </h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-sans">
                Click on any satellite node in the constellation to explore its architectural role, implementation highlights, and system dependencies for this project.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DynamicTechConstellation;
