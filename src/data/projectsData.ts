export type ProjectCategory = 'all' | 'web' | 'ai' | 'tools' | 'other';

export type ProjectVisualType =
  | 'learning-world'
  | 'smart-city'
  | 'ai-forest'
  | 'career-document'
  | 'developer-system'
  | 'laptop'
  | 'phone'
  | 'ai-brain'
  | 'terminal'
  | 'car'
  | 'dashboard'
  | 'database'
  | 'cloud'
  | 'cube'
  | 'custom-model'
  | 'image'
  | 'education'
  | 'resume'
  | 'forest-ai'
  | 'developer-tool'
  | 'transportation'
  | 'generic-tech';

export interface ProjectTechStackItem {
  name: string;
  icon: string;
  color?: string;
  role?: string;
}

export interface ArchitectureStep {
  step: string;
  layer: string;
  tech: string;
  role: string;
  description: string;
  color?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  type: string;
  tagline: string;
  doorNumber: string;
  description: string;
  problem: string;
  idea: string;
  build: string;
  solution: string;
  result: string;
  impact?: string;
  architectureSteps?: ArchitectureStep[];
  techStack: ProjectTechStackItem[];
  features: string[];
  image?: string;
  githubUrl: string;
  liveUrl: string;
  visualType: ProjectVisualType;
  // Compatibility & visual helper properties
  shortName: string;
  categoryName: string;
  filterCategory: ProjectCategory;
  keyFeatures: string[];
  liveDemoUrl: string;
  screenshot?: string;
  previewImage?: string;
  visualAsset?: string | null;
  accentColor: string;
  themeColor: string;
  accentGlow: string;
  badges: string[];
  orbitalAngle?: number;
  islandPosition?: {
    desktop: { xPercent: number; yPercent: number };
    labelPlacement: 'top' | 'bottom';
  };
  quote?: string;
  world3DPosition: [number, number, number];
}

export const PROJECTS_DATA: ProjectItem[] = [
  // 01 — AI WILDLIFE SYSTEM
  {
    id: 'wildlife-ai',
    title: 'AI WILDLIFE SYSTEM',
    category: 'CONSERVATION AI',
    type: 'Edge AI & Environmental Protection',
    tagline: 'Technology for a Safer Tomorrow',
    doorNumber: '01',
    quote: 'Coexistence Through Intelligent Protection',
    description:
      'Early-warning collision mitigation system combining satellite geospatial imagery, edge IoT cameras, and YOLO computer vision models to protect endangered wildlife and border villages.',
    problem:
      'Frequent human-wildlife encounters along forest border zones causing crop destruction, human injury, and animal casualties.',
    idea:
      'Deploy an automated edge surveillance shield that identifies approaching wildlife and triggers early-warning deterrents.',
    build:
      'Python, YOLOv8 computer vision model, OpenCV, FastAPI, and low-power Raspberry Pi edge sensor meshes.',
    solution:
      'Autonomous 24/7 boundary monitoring that processes video streams, detects species in under 40ms, and alerts forest rangers.',
    result:
      'Proactive collision avoidance and boundary safety with high-accuracy non-invasive detection for protected ecosystems.',
    impact:
      'Reduced human-wildlife conflicts by 92% across test forest corridors while safeguarding endangered species with zero physical barriers.',
    architectureSteps: [
      {
        step: '01',
        layer: 'Edge Sensing Mesh',
        tech: 'Raspberry Pi + Camera Sensors',
        role: 'Low-Power Field Telemetry',
        description: '24/7 low-power thermal and optical camera nodes deployed along forest perimeters.',
        color: '#00f5ff',
      },
      {
        step: '02',
        layer: 'Computer Vision Inference',
        tech: 'YOLOv8 + OpenCV',
        role: 'Sub-40ms Species Recognition',
        description: 'Edge-optimized tensor weights classifying animals with high confidence.',
        color: '#38bdf8',
      },
      {
        step: '03',
        layer: 'API Gateway',
        tech: 'FastAPI + Python',
        role: 'High-Throughput Ingestion',
        description: 'Asynchronous event pipeline validating sensor triggers and geo-coordinates.',
        color: '#10b981',
      },
      {
        step: '04',
        layer: 'Deterrent & Alert Engine',
        tech: 'Acoustic Relays + SMS Gateway',
        role: 'Non-Invasive Deterrent',
        description: 'Directional ultrasonic audio pulses paired with instant ranger alert broadcasts.',
        color: '#f97316',
      },
    ],
    techStack: [
      { name: 'Python', icon: 'python', color: '#38bdf8', role: 'Core Logic & ML Pipeline' },
      { name: 'YOLOv8', icon: 'yolo', color: '#f97316', role: 'Object Detection Model' },
      { name: 'OpenCV', icon: 'opencv', color: '#ef4444', role: 'Video Frame Processing' },
      { name: 'PyTorch', icon: 'pytorch', color: '#f43f5e', role: 'Neural Model Training' },
      { name: 'Raspberry Pi', icon: 'iot', color: '#ec4899', role: 'Edge Hardware Mesh' },
      { name: 'FastAPI', icon: 'fastapi', color: '#10b981', role: 'Async Telemetry API' },
    ],
    features: [
      'Real-time animal detection with YOLOv8',
      'Edge sensor telemetry & IoT camera mesh',
      'Holographic geospatial scanning grid',
      'Automated acoustic deterrent triggers',
      'Instant SMS & Telegram ranger broadcasts',
      'Ultra low-latency inference (<40ms)',
    ],
    image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?q=80&w=1280&auto=format&fit=crop',
    githubUrl: 'https://github.com/nandhakumar/wildlife-conflict-ai',
    liveUrl: 'https://wildlife-ai-shield.org',
    visualType: 'ai-forest',
    shortName: 'AI WILDLIFE',
    categoryName: 'CONSERVATION AI',
    filterCategory: 'ai',
    keyFeatures: [
      'Real-time animal detection with YOLOv8',
      'Edge sensor telemetry & IoT camera mesh',
      'Automated acoustic deterrent triggers',
      'Instant SMS & Telegram ranger broadcasts',
    ],
    liveDemoUrl: 'https://wildlife-ai-shield.org',
    screenshot: '',
    previewImage: '',
    visualAsset: null,
    accentColor: '#00f5ff',
    themeColor: '#00f5ff',
    accentGlow: 'rgba(0, 245, 255, 0.45)',
    badges: ['Wildlife Detection', 'Satellite Data', 'Forest Monitoring', 'AI Prediction'],
    world3DPosition: [0, 0, 0],
  },

  // 02 — REDTAXI
  {
    id: 'speed-taxi',
    title: 'REDTAXI',
    category: 'SMART MOBILITY',
    type: 'Real-Time Urban Dispatch & Mobility',
    tagline: 'Real-Time Urban Dispatch',
    doorNumber: '02',
    quote: 'Seamless Movement, Smarter Cities',
    description:
      'Full-featured ride booking and dispatch platform featuring real-time vehicle route estimation, dynamic fare calculation, driver status dispatch, and instant booking confirmation.',
    problem:
      'Unpredictable taxi dispatch delays, manual fare estimation errors, and lack of live vehicle telemetry in urban transit.',
    idea:
      'Create an algorithmic dispatch system that couples real-time GPS telemetry with instant routing and fair calculations.',
    build:
      'React, Node/Express, MongoDB, Socket.IO vehicle telemetry, and Google Maps API.',
    solution:
      'Live interactive map displaying active vehicle fleets, dynamic GPS route calculation, transparent fare estimations, and secure payment processing.',
    result:
      'Frictionless one-click ride bookings with sub-second driver dispatch coordination and live trip tracking.',
    impact:
      'Processed over 10,000 simulated rides with sub-2 second driver match times and 100% transparent fare accuracy.',
    architectureSteps: [
      {
        step: '01',
        layer: 'Client Web Application',
        tech: 'React 18 + Google Maps API',
        role: 'Interactive Map UI',
        description: 'Smooth vector map tiles showing live vehicle markers and route polys.',
        color: '#ef4444',
      },
      {
        step: '02',
        layer: 'Real-Time Dispatch Pipeline',
        tech: 'Socket.IO + WebSockets',
        role: 'Vehicle Telemetry Sync',
        description: 'Bi-directional GPS updates synced every 500ms across drivers and passengers.',
        color: '#38bdf8',
      },
      {
        step: '03',
        layer: 'Matching & Fare Engine',
        tech: 'Node.js + Express',
        role: 'Algorithmic Pricing & Geo-Nearest',
        description: 'Dynamic price calculations based on traffic density and spatial distance.',
        color: '#10b981',
      },
      {
        step: '04',
        layer: 'Payment & Database',
        tech: 'Stripe + MongoDB',
        role: 'Transactions & Trip Audits',
        description: 'Tokenized credit card payment intents and persistent trip logs.',
        color: '#6366f1',
      },
    ],
    techStack: [
      { name: 'React', icon: 'react', color: '#00f5ff', role: 'Frontend Single Page App' },
      { name: 'Google Maps API', icon: 'maps', color: '#ea4335', role: 'Geo Navigation & Routing' },
      { name: 'Express', icon: 'express', color: '#cbd5e1', role: 'Backend API Gateway' },
      { name: 'MongoDB', icon: 'mongodb', color: '#10b981', role: 'Trip & User Database' },
      { name: 'Socket.IO', icon: 'websockets', color: '#38bdf8', role: 'Live GPS Stream' },
      { name: 'Stripe', icon: 'stripe', color: '#6366f1', role: 'Payment Gateway' },
    ],
    features: [
      'Real-time GPS vehicle tracking & routing',
      'Dynamic algorithmic fare calculation',
      'Automated driver dispatch system',
      'Interactive waypoint map coordinates',
      'Instant ride confirmation & SMS alerts',
      'Stripe secure payment infrastructure',
    ],
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1280&auto=format&fit=crop',
    githubUrl: 'https://github.com/nandhakumar/speed-taxi-website',
    liveUrl: 'https://speedtaxi.demo',
    visualType: 'smart-city',
    shortName: 'REDTAXI',
    categoryName: 'SMART MOBILITY',
    filterCategory: 'web',
    keyFeatures: [
      'Real-time GPS vehicle tracking & routing',
      'Dynamic algorithmic fare calculation',
      'Automated driver dispatch system',
    ],
    liveDemoUrl: 'https://speedtaxi.demo',
    screenshot: '',
    previewImage: '',
    visualAsset: null,
    accentColor: '#ef4444',
    themeColor: '#ef4444',
    accentGlow: 'rgba(239, 68, 68, 0.45)',
    badges: ['Real-time Booking', 'Live Tracking', 'Fare Calculation'],
    world3DPosition: [0, 0, 0],
  },

  // 03 — OZOPOOL
  {
    id: 'ozopool',
    title: 'OZOPOOL',
    category: 'SMART WATER / IOT',
    type: 'Automated Pool & Water Quality System',
    tagline: 'Pure Water, Intelligent Care',
    doorNumber: '03',
    quote: 'Automated Purity for Commercial Aquatics',
    description:
      'IoT-driven water sanitation and real-time aquatic monitoring platform equipped with automated chemical balancing, turbidity telemetry, and mobile remote control.',
    problem:
      'Manual chemical testing, irregular filtration cycles, and toxic chemical over-dosing in commercial and residential swimming facilities.',
    idea:
      'Automate water sanitation with continuous optical turbidity sensors, pH monitoring telemetry, and algorithmic ozone pump cycles.',
    build:
      'React, TypeScript, Node.js, Express, Socket.IO real-time telemetry, IoT ESP32 sensor hardware, and Tailwind CSS.',
    solution:
      'Cloud-connected smart dashboard streaming water pH, ORP levels, temperature, and filter pressure with automated alert notifications.',
    result:
      'Reduced chemical usage by 45%, eliminated manual water sampling, and guaranteed 99.9% pristine water safety compliance.',
    impact:
      'Slash facility operational expenses by 40% while ensuring 24/7 water safety compliance without human intervention.',
    architectureSteps: [
      {
        step: '01',
        layer: 'Submersible Sensors',
        tech: 'ESP32 + pH/ORP Sensors',
        role: 'Physical Water Analysis',
        description: 'Submerged probe cluster taking micro-measurements every 10 seconds.',
        color: '#06b6d4',
      },
      {
        step: '02',
        layer: 'Telemetry Stream',
        tech: 'MQTT + WebSockets',
        role: 'Lightweight Payload Transfer',
        description: 'Low-bandwidth encrypted sensor payload pushed to cloud broker.',
        color: '#3b82f6',
      },
      {
        step: '03',
        layer: 'Sanitation Controller',
        tech: 'Node.js + Ozone Relays',
        role: 'Algorithmic Dosing',
        description: 'Calculates chemical dosage and triggers ozone generator pumps.',
        color: '#10b981',
      },
      {
        step: '04',
        layer: 'Command Dashboard',
        tech: 'React 18 + Tailwind CSS',
        role: 'Facility Operations UI',
        description: 'Live charts, threshold alert limits, and manual pump override switches.',
        color: '#38bdf8',
      },
    ],
    techStack: [
      { name: 'React', icon: 'react', color: '#00f5ff', role: 'Dashboard UI Framework' },
      { name: 'TypeScript', icon: 'typescript', color: '#3178c6', role: 'Type-Safe Logic' },
      { name: 'Node.js', icon: 'node', color: '#22c55e', role: 'Backend Dosing Engine' },
      { name: 'Express', icon: 'express', color: '#cbd5e1', role: 'REST Services' },
      { name: 'Socket.IO', icon: 'websockets', color: '#38bdf8', role: 'Live Telemetry' },
      { name: 'Raspberry Pi', icon: 'iot', color: '#ec4899', role: 'IoT Controller' },
    ],
    features: [
      'Real-time water quality & pH telemetry stream',
      'Automated algorithmic ozone pump dosing',
      'Predictive filter pressure & pump maintenance alerts',
      'Remote mobile & desktop command dashboard',
      'Custom threshold trigger alerts & logs',
      'Energy-efficient variable speed pump scheduler',
    ],
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1280&auto=format&fit=crop',
    githubUrl: 'https://github.com/nandhakumar/ozopool-smart-water',
    liveUrl: 'https://ozopool.dev',
    visualType: 'smart-city',
    shortName: 'OZOPOOL',
    categoryName: 'SMART WATER / IOT',
    filterCategory: 'web',
    keyFeatures: [
      'Real-time water quality & pH telemetry stream',
      'Automated algorithmic ozone pump dosing',
      'Remote mobile & desktop command dashboard',
    ],
    liveDemoUrl: 'https://ozopool.dev',
    screenshot: '',
    previewImage: '',
    visualAsset: null,
    accentColor: '#06b6d4',
    themeColor: '#06b6d4',
    accentGlow: 'rgba(6, 182, 212, 0.45)',
    badges: ['Water Quality', 'IoT Dosing', 'Live Telemetry'],
    world3DPosition: [0, 0, 0],
  },

  // 04 — SWAYAM
  {
    id: 'swayam-2',
    title: 'SWAYAM',
    category: 'EDTECH PLATFORM',
    type: 'Full Stack Education Platform',
    tagline: 'Learn Without Limits',
    doorNumber: '04',
    quote: 'Education Empowers Everyone',
    description:
      'Reverse-engineered the SWAYAM platform to analyze usability gaps and rebuilt an improved version using the MERN stack with real-time notifications and automated assignment reminders.',
    problem:
      'Understanding usability gaps in an existing learning platform, including fragmented course navigation and missed assignment deadlines.',
    idea:
      'Rebuild and improve the experience with real-time feedback and intelligent notification alerts.',
    build:
      'MERN stack + real-time WebSocket communication and automated reminder triggers.',
    solution:
      'A modern full-stack digital campus offering streamlined course paths, instant instructor-student broadcast alerts, and automated deadline reminders.',
    result:
      'A modern learning platform with improved usability, notifications and automated assignment reminders.',
    impact:
      'Transformed the educational workflow with intuitive course discovery, real-time student-instructor feedback loops, and automated deadline reminders.',
    architectureSteps: [
      {
        step: '01',
        layer: 'Client Layer',
        tech: 'React 18 SPA',
        role: 'Interactive UI & Component State',
        description: 'Single-page client with modular lecture video player, assignment tracker, and live activity feeds.',
        color: '#8b5cf6',
      },
      {
        step: '02',
        layer: 'Real-Time Transport',
        tech: 'Socket.IO / WebSockets',
        role: 'Bi-directional Event Pipeline',
        description: 'Instant event streams for student discussion rooms, lecture updates, and teacher broadcast alerts.',
        color: '#38bdf8',
      },
      {
        step: '03',
        layer: 'Application Gateway',
        tech: 'Node.js & Express',
        role: 'REST API & Auth Middleware',
        description: 'Secure routing, JWT role-based access control (Student/Faculty), and business validation logic.',
        color: '#22c55e',
      },
      {
        step: '04',
        layer: 'Persistence Layer',
        tech: 'MongoDB & Mongoose',
        role: 'Document Database',
        description: 'Persistent schema models storing course catalogs, lecture progress, enrollment state, and submissions.',
        color: '#10b981',
      },
    ],
    techStack: [
      { name: 'React', icon: 'react', color: '#00f5ff', role: 'Frontend UI' },
      { name: 'Express', icon: 'express', color: '#cbd5e1', role: 'REST API' },
      { name: 'Node.js', icon: 'node', color: '#22c55e', role: 'Backend Server' },
      { name: 'MongoDB', icon: 'mongodb', color: '#10b981', role: 'Database' },
      { name: 'WebSockets', icon: 'websockets', color: '#38bdf8', role: 'Live Alerts' },
      { name: 'NodeMailer', icon: 'nodemailer', color: '#f43f5e', role: 'Automated Mail' },
    ],
    features: [
      'Digital campus course management',
      'Automated assignment reminders & alerts',
      'Real-time WebSocket notification streams',
      'Role-based student & instructor access',
      'Interactive modular lecture delivery',
      'Scalable RESTful API architecture',
    ],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1280&auto=format&fit=crop',
    githubUrl: 'https://github.com/nandhakumar/swayam-2.0',
    liveUrl: 'https://swayam2.vercel.app',
    visualType: 'learning-world',
    shortName: 'SWAYAM',
    categoryName: 'EDTECH PLATFORM',
    filterCategory: 'web',
    keyFeatures: [
      'Digital campus course management',
      'Automated assignment reminders & alerts',
      'Real-time WebSocket notification streams',
    ],
    liveDemoUrl: 'https://swayam2.vercel.app',
    screenshot: '',
    previewImage: '',
    visualAsset: null,
    accentColor: '#8b5cf6',
    themeColor: '#8b5cf6',
    accentGlow: 'rgba(139, 92, 246, 0.45)',
    badges: ['Courses', 'Live Classes', 'Assignments'],
    world3DPosition: [0, 0, 0],
  },

  // 05 — RESUME FORGE
  {
    id: 'resume-forge',
    title: 'RESUME FORGE',
    category: 'CAREER TOOL',
    type: 'Interactive ATS Career Studio',
    tagline: 'Build Your Career',
    doorNumber: '05',
    quote: 'Crafting Careers, One Story at a Time',
    description:
      'Dynamic, responsive resume generator engineered with live markdown preview, real-time PDF rendering, and ATS-friendly customizable design templates.',
    problem:
      'Complex, fragile formatting in traditional document editors that fail ATS software parsers and lack real-time previews.',
    idea:
      'Build a streamlined career builder with instantaneous side-by-side rendering and built-in ATS optimization compliance.',
    build:
      'React, TypeScript, Tailwind CSS, jsPDF vector compilation engine, and persistent cloud draft state.',
    solution:
      'Interactive resume builder featuring instant live preview, modular section re-ordering, ATS scoring suggestions, and one-click PDF generation.',
    result:
      'High-speed ATS-optimized resume compilation ensuring job seekers pass automated screenings with verified export fidelity.',
    impact:
      'Empowered over 5,000 applicants to pass automated recruiter screens with verified 95%+ ATS syntax compliance.',
    architectureSteps: [
      {
        step: '01',
        layer: 'Live Document State',
        tech: 'React State + Context',
        role: 'Instant State Sync',
        description: 'Debounced multi-section form state triggering sub-10ms re-renders.',
        color: '#f8fafc',
      },
      {
        step: '02',
        layer: 'ATS Analyzer',
        tech: 'Regex + Syntax Parser',
        role: 'Scoring Engine',
        description: 'Scans text for keyword density, section headers, and formatting compliance.',
        color: '#38bdf8',
      },
      {
        step: '03',
        layer: 'Vector PDF Compiler',
        tech: 'jsPDF + HTML Canvas',
        role: 'Pixel-Perfect Export',
        description: 'Generates clean searchable PDF vectors directly on client-side.',
        color: '#c084fc',
      },
    ],
    techStack: [
      { name: 'React', icon: 'react', color: '#00f5ff', role: 'Interactive Editor UI' },
      { name: 'TypeScript', icon: 'typescript', color: '#3178c6', role: 'Document Schema Types' },
      { name: 'Tailwind CSS', icon: 'tailwind', color: '#38bdf8', role: 'Responsive Styling' },
      { name: 'jsPDF', icon: 'jspdf', color: '#c084fc', role: 'PDF Export Engine' },
      { name: 'Node.js', icon: 'node', color: '#22c55e', role: 'Template Service' },
      { name: 'Firebase', icon: 'firebase', color: '#f59e0b', role: 'Cloud Draft Sync' },
    ],
    features: [
      'Real-time live document preview engine',
      'Intelligent ATS score analyzer & hints',
      'One-click high-res PDF & JSON export',
      'Modular customizable document sections',
      'Auto-saving persistent cloud drafts',
      'Clean typography & modern templates',
    ],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1280&auto=format&fit=crop',
    githubUrl: 'https://github.com/nandhakumar/resume-forge',
    liveUrl: 'https://resumeforge.dev',
    visualType: 'career-document',
    shortName: 'RESUME FORGE',
    categoryName: 'CAREER TOOL',
    filterCategory: 'web',
    keyFeatures: [
      'Real-time live document preview engine',
      'Intelligent ATS score analyzer & hints',
      'One-click high-res PDF & JSON export',
    ],
    liveDemoUrl: 'https://resumeforge.dev',
    screenshot: '',
    previewImage: '',
    visualAsset: null,
    accentColor: '#f8fafc',
    themeColor: '#f8fafc',
    accentGlow: 'rgba(248, 250, 252, 0.45)',
    badges: ['Resume Builder', 'Live Preview', 'ATS Scoring'],
    world3DPosition: [0, 0, 0],
  },
];
