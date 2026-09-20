export interface GenomeStageContent {
  stageId: 'idea' | 'design' | 'technology' | 'build' | 'impact';
  stageNumber: string;
  stageName: string;
  title: string;
  subtitle: string;
  problemOrGoal: string;
  keyPoints: { label: string; text: string }[];
  accentColor: string;
}

export interface ProjectTechDetail {
  name: string;
  category: string;
  iconName: string;
  description: string;
  color: string;
}

export interface GenomeProject {
  id: string;
  number: string;
  title: string;
  shortName: string;
  category: string;
  type: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  accentColor: string;
  themeGlow: string;
  features: string[];
  technologies: ProjectTechDetail[];
  dnaStages: Record<
    'idea' | 'design' | 'technology' | 'build' | 'impact',
    GenomeStageContent
  >;
  architectureSummary: {
    frontend: string;
    backend: string;
    database: string;
    deployment: string;
  };
}

export const GENOME_PROJECTS: GenomeProject[] = [
  {
    id: 'speed-taxi',
    number: '01',
    title: 'SPEED TAXI',
    shortName: 'SPEED TAXI',
    category: 'SMART MOBILITY PLATFORM',
    type: 'Real-Time Urban Dispatch & Mobility',
    description:
      'A modern ride-booking platform focused on seamless booking, secure authentication, live tracking and an intuitive mobility experience.',
    image:
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1280&auto=format&fit=crop',
    liveUrl: 'https://speedtaxi.demo',
    githubUrl: 'https://github.com/nandhakumar/speed-taxi-website',
    accentColor: '#00f5ff',
    themeGlow: 'rgba(0, 245, 255, 0.45)',
    features: [
      'LIVE TRACKING',
      'SECURE AUTHENTICATION',
      'MAPS INTEGRATION',
      'RIDE BOOKING',
      'RESPONSIVE UI',
    ],
    technologies: [
      {
        name: 'React',
        category: 'Frontend Framework',
        iconName: 'Atom',
        description:
          'Component-based frontend architecture with responsive state management and interactive booking flows.',
        color: '#00f5ff',
      },
      {
        name: 'Node.js',
        category: 'Runtime Environment',
        iconName: 'Server',
        description:
          'Non-blocking asynchronous server runtime handling live ride dispatches and client telemetries.',
        color: '#22c55e',
      },
      {
        name: 'Express',
        category: 'Backend Framework',
        iconName: 'Cpu',
        description:
          'Lightweight REST API web server providing secure endpoint routing and authentication middleware.',
        color: '#cbd5e1',
      },
      {
        name: 'MongoDB',
        category: 'NoSQL Database',
        iconName: 'Database',
        description:
          'High-availability document store preserving user booking history, active trip logs, and driver coordinates.',
        color: '#10b981',
      },
      {
        name: 'JavaScript',
        category: 'Language Core',
        iconName: 'Code',
        description:
          'Core language powering full-stack business logic, dynamic fare algorithms, and async APIs.',
        color: '#eab308',
      },
      {
        name: 'Tailwind CSS',
        category: 'Styling Engine',
        iconName: 'Palette',
        description:
          'Utility-first CSS styling enabling high-contrast dark urban interfaces and responsive layouts.',
        color: '#38bdf8',
      },
    ],
    dnaStages: {
      idea: {
        stageId: 'idea',
        stageNumber: '01',
        stageName: 'IDEA',
        title: 'THE IDEA',
        subtitle: 'Urban Transit Friction & Live Dispatch',
        problemOrGoal:
          'Eliminate manual fare estimations, ride delays, and opaque vehicle tracking in urban taxi services.',
        keyPoints: [
          {
            label: 'Problem',
            text: 'Passengers face uncertain arrival times, manual fare disputes, and lack of real-time vehicle visibility.',
          },
          {
            label: 'Inspiration',
            text: 'Next-generation intelligent dispatch platforms that synchronize GPS telemetry with instant route planning.',
          },
          {
            label: 'Goal',
            text: 'Deliver a frictionless, 1-click ride booking platform with live driver tracking and dynamic pricing.',
          },
        ],
        accentColor: '#00f5ff',
      },
      design: {
        stageId: 'design',
        stageNumber: '02',
        stageName: 'DESIGN',
        title: 'THE DESIGN',
        subtitle: 'High-Contrast Urban Mobility Interface',
        problemOrGoal:
          'Craft an intuitive, night-optimized interface prioritizing instant route selection and driver map focus.',
        keyPoints: [
          {
            label: 'UI/UX Focus',
            text: 'Dark-mode glassmorphism with high contrast waypoint markers and smooth map viewport bounds.',
          },
          {
            label: 'User Flow',
            text: 'Origin input → Instant route calculation → Fare preview → Driver dispatch in under 3 taps.',
          },
          {
            label: 'Architecture',
            text: 'Modular component hierarchy separating map viewports, trip fare cards, and active telemetry.',
          },
        ],
        accentColor: '#38bdf8',
      },
      technology: {
        stageId: 'technology',
        stageNumber: '03',
        stageName: 'TECHNOLOGY',
        title: 'THE TECHNOLOGY',
        subtitle: 'MERN Stack + Google Maps + Real-Time Telemetry',
        problemOrGoal:
          'Select low-latency web technologies to broadcast active driver locations and instant trip updates.',
        keyPoints: [
          {
            label: 'Tech Stack',
            text: 'React 18 frontend, Node.js/Express REST server, MongoDB document persistence.',
          },
          {
            label: 'Mapping Engine',
            text: 'Google Maps JavaScript API with Directions Service for route compilation.',
          },
          {
            label: 'Security',
            text: 'JWT role-based token auth and encrypted payload transport over SSL.',
          },
        ],
        accentColor: '#818cf8',
      },
      build: {
        stageId: 'build',
        stageNumber: '04',
        stageName: 'BUILD',
        title: 'THE BUILD',
        subtitle: 'Algorithmic Pricing & Dispatch Pipeline',
        problemOrGoal:
          'Implement distance matrix calculations, driver state machines, and real-time socket events.',
        keyPoints: [
          {
            label: 'Implementation',
            text: 'Built dynamic fare calculation combining distance matrix, traffic delay, and base rates.',
          },
          {
            label: 'Key Challenge',
            text: 'Ensuring fluid marker movements without jittering during continuous GPS telemetry stream updates.',
          },
          {
            label: 'Solution',
            text: 'Implemented lerp-interpolated marker movement vectors between coordinate updates.',
          },
        ],
        accentColor: '#a78bfa',
      },
      impact: {
        stageId: 'impact',
        stageNumber: '05',
        stageName: 'IMPACT',
        title: 'THE IMPACT',
        subtitle: 'Sub-Second Dispatch & Frictionless Mobility',
        problemOrGoal:
          'Achieve instant booking confirmations and high-accuracy route arrival estimates.',
        keyPoints: [
          {
            label: 'Results',
            text: 'Sub-second trip confirmation velocity and 99.4% route estimation accuracy in city scenarios.',
          },
          {
            label: 'Key Learning',
            text: 'Optimizing spatial queries in MongoDB and managing WebSocket lifecycle states.',
          },
          {
            label: 'Future Scope',
            text: 'Automated multi-passenger carpool routing and electric vehicle charging node integration.',
          },
        ],
        accentColor: '#00f5ff',
      },
    },
    architectureSummary: {
      frontend: 'React 18 + Tailwind CSS',
      backend: 'Node.js & Express REST',
      database: 'MongoDB & Mongoose',
      deployment: 'Cloud Vercel / Render',
    },
  },

  {
    id: 'swayam-2',
    number: '02',
    title: 'SWAYAM 2.0',
    shortName: 'SWAYAM 2.0',
    category: 'LEARNING PLATFORM',
    type: 'Full Stack Digital Education Platform',
    description:
      'Reverse-engineered the SWAYAM platform to analyze usability gaps and rebuilt an improved version using the MERN stack with real-time notifications and automated assignment reminders.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1280&auto=format&fit=crop',
    liveUrl: 'https://swayam2.vercel.app',
    githubUrl: 'https://github.com/nandhakumar/swayam-2.0',
    accentColor: '#38bdf8',
    themeGlow: 'rgba(56, 189, 248, 0.45)',
    features: [
      'DIGITAL CAMPUS',
      'AUTOMATED REMINDERS',
      'WEBSOCKET ALERTS',
      'ROLE-BASED ACCESS',
      'LECTURE DELIVERY',
    ],
    technologies: [
      {
        name: 'React',
        category: 'Frontend Framework',
        iconName: 'Atom',
        description:
          'Interactive student dashboard, course directory, and lecture video player components.',
        color: '#00f5ff',
      },
      {
        name: 'JavaScript',
        category: 'Language Core',
        iconName: 'Code',
        description:
          'Full-stack JavaScript logic handling real-time WebSocket events and automated background tasks.',
        color: '#eab308',
      },
      {
        name: 'Node.js',
        category: 'Runtime Environment',
        iconName: 'Server',
        description:
          'Scalable server runtime driving assignment dispatch schedules and student enrollments.',
        color: '#22c55e',
      },
      {
        name: 'Express',
        category: 'Backend Framework',
        iconName: 'Cpu',
        description:
          'REST API endpoints handling student credentials, course catalogs, and submission pipelines.',
        color: '#cbd5e1',
      },
      {
        name: 'MongoDB',
        category: 'NoSQL Database',
        iconName: 'Database',
        description:
          'Persistent document schema storing course structures, assignment progress, and student grades.',
        color: '#10b981',
      },
      {
        name: 'REST API',
        category: 'API Layer',
        iconName: 'Globe',
        description:
          'Clean RESTful service design enabling decoupled client-server data synchronization.',
        color: '#a855f7',
      },
    ],
    dnaStages: {
      idea: {
        stageId: 'idea',
        stageNumber: '01',
        stageName: 'IDEA',
        title: 'THE IDEA',
        subtitle: 'Modernizing Digital Campus Workflows',
        problemOrGoal:
          'Overcome fragmented course navigation and missed assignment deadlines in legacy e-learning platforms.',
        keyPoints: [
          {
            label: 'Problem',
            text: 'Existing government portals suffer from complex navigation, lack of notifications, and missed deadlines.',
          },
          {
            label: 'Inspiration',
            text: 'Seamless modern LMS platforms with real-time feedback loops and push reminder systems.',
          },
          {
            label: 'Goal',
            text: 'Rebuild SWAYAM with intuitive navigation, automated deadline alerts, and instructor broadcasts.',
          },
        ],
        accentColor: '#38bdf8',
      },
      design: {
        stageId: 'design',
        stageNumber: '02',
        stageName: 'DESIGN',
        title: 'THE DESIGN',
        subtitle: 'Structured Learning & Clean Dashboards',
        problemOrGoal:
          'Design an engaging course discovery experience with clear progress tracking and lecture video layouts.',
        keyPoints: [
          {
            label: 'UI/UX Focus',
            text: 'Structured sidebar course modules, progress bar trackers, and high-visibility assignment cards.',
          },
          {
            label: 'User Flow',
            text: 'Dashboard → Active Course → Video Lecture → Assignment Submission → Automated Confirmation.',
          },
          {
            label: 'Architecture',
            text: 'Role-based UI access tailored for Students vs. Faculty instructors.',
          },
        ],
        accentColor: '#00f5ff',
      },
      technology: {
        stageId: 'technology',
        stageNumber: '03',
        stageName: 'TECHNOLOGY',
        title: 'THE TECHNOLOGY',
        subtitle: 'MERN Stack + Socket.IO + Background Workers',
        problemOrGoal:
          'Combine real-time communication protocols with scheduled background cron alerts.',
        keyPoints: [
          {
            label: 'Tech Stack',
            text: 'React 18 SPA, Node.js/Express server, MongoDB database layer.',
          },
          {
            label: 'Real-Time Stream',
            text: 'Socket.IO WebSockets for instant student broadcasts and teacher discussion rooms.',
          },
          {
            label: 'Automation',
            text: 'NodeMailer + node-cron workers dispatching email reminders for upcoming due dates.',
          },
        ],
        accentColor: '#818cf8',
      },
      build: {
        stageId: 'build',
        stageNumber: '04',
        stageName: 'BUILD',
        title: 'THE BUILD',
        subtitle: 'Role-Based Auth & Real-Time Broadcasts',
        problemOrGoal:
          'Construct secure JWT authentication and background assignment reminder schedules.',
        keyPoints: [
          {
            label: 'Implementation',
            text: 'Built modular assignment submitter with automated file validation and instant teacher scoring.',
          },
          {
            label: 'Key Challenge',
            text: 'Preventing duplicate notification alerts when cron workers poll upcoming deadlines.',
          },
          {
            label: 'Solution',
            text: 'Implemented idempotent notification state flags inside MongoDB document models.',
          },
        ],
        accentColor: '#a78bfa',
      },
      impact: {
        stageId: 'impact',
        stageNumber: '05',
        stageName: 'IMPACT',
        title: 'THE IMPACT',
        subtitle: 'Eliminating Missed Deadlines & Enhancing Usability',
        problemOrGoal:
          'Provide a seamless digital campus environment that boosts course completion rates.',
        keyPoints: [
          {
            label: 'Results',
            text: 'Drastic reduction in late submissions with automated 24h assignment reminders.',
          },
          {
            label: 'Key Learning',
            text: 'Effective state management for nested course hierarchies and WebSocket room partitioning.',
          },
          {
            label: 'Future Scope',
            text: 'AI-assisted lecture auto-summarization and peer-to-peer coding practice rooms.',
          },
        ],
        accentColor: '#38bdf8',
      },
    },
    architectureSummary: {
      frontend: 'React 18 + Modular CSS',
      backend: 'Node.js & Express API',
      database: 'MongoDB Document Database',
      deployment: 'Vercel + Cloud DB',
    },
  },

  {
    id: 'resume-forge',
    number: '03',
    title: 'RESUME FORGE',
    shortName: 'RESUME FORGE',
    category: 'SMART RESUME BUILDER',
    type: 'Interactive ATS Career Studio',
    description:
      'Dynamic, responsive resume generator engineered with live markdown preview, real-time PDF rendering, and ATS-friendly customizable design templates.',
    image:
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1280&auto=format&fit=crop',
    liveUrl: 'https://resumeforge.dev',
    githubUrl: 'https://github.com/nandhakumar/resume-forge',
    accentColor: '#a855f7',
    themeGlow: 'rgba(168, 85, 247, 0.45)',
    features: [
      'LIVE PREVIEW ENGINE',
      'ATS SCORE ANALYZER',
      'PDF EXPORT',
      'CUSTOM TEMPLATES',
      'CLOUD DRAFTS',
    ],
    technologies: [
      {
        name: 'React',
        category: 'Frontend Framework',
        iconName: 'Atom',
        description:
          'Side-by-side split editor and instantaneous live vector document preview engine.',
        color: '#00f5ff',
      },
      {
        name: 'JavaScript',
        category: 'Language Core',
        iconName: 'Code',
        description:
          'Parsing engine powering dynamic document serialization and formatting rules.',
        color: '#eab308',
      },
      {
        name: 'Tailwind CSS',
        category: 'Styling Engine',
        iconName: 'Palette',
        description:
          'Pixel-perfect print styles and high-fidelity desktop workspace layouts.',
        color: '#38bdf8',
      },
      {
        name: 'Node.js',
        category: 'Runtime Environment',
        iconName: 'Server',
        description:
          'Backend service handling cloud document drafts and template compilation.',
        color: '#22c55e',
      },
      {
        name: 'MongoDB',
        category: 'NoSQL Database',
        iconName: 'Database',
        description:
          'Cloud storage engine for saved career profiles and custom user templates.',
        color: '#10b981',
      },
      {
        name: 'AI',
        category: 'Intelligence Layer',
        iconName: 'Sparkles',
        description:
          'Keyword analysis and action-verb generator for ATS resume optimization.',
        color: '#a855f7',
      },
    ],
    dnaStages: {
      idea: {
        stageId: 'idea',
        stageNumber: '01',
        stageName: 'IDEA',
        title: 'THE IDEA',
        subtitle: 'Solving ATS Formatting Failures',
        problemOrGoal:
          'Overcome fragile formatting in document editors that break during automated applicant tracking screening.',
        keyPoints: [
          {
            label: 'Problem',
            text: 'Job seekers lose interview opportunities due to unparseable PDF structures and poor section ordering.',
          },
          {
            label: 'Inspiration',
            text: 'Developer-grade Markdown resume generators with instant live PDF export fidelity.',
          },
          {
            label: 'Goal',
            text: 'Engineered an interactive resume studio that guarantees ATS compliance with instant side-by-side rendering.',
          },
        ],
        accentColor: '#a855f7',
      },
      design: {
        stageId: 'design',
        stageNumber: '02',
        stageName: 'DESIGN',
        title: 'THE DESIGN',
        subtitle: 'Split Workspace & Instant Feedback',
        problemOrGoal:
          'Build an intuitive side-by-side workspace separating raw data entry from vector document rendering.',
        keyPoints: [
          {
            label: 'UI/UX Focus',
            text: 'Dual-pane workspace with form inputs on the left and pixel-perfect document preview on the right.',
          },
          {
            label: 'User Flow',
            text: 'Fill sections → Review ATS score hints → Choose template → Download 1-click vector PDF.',
          },
          {
            label: 'Typography',
            text: 'Curated font pairs with strict line-heights optimized for both digital screen and paper print.',
          },
        ],
        accentColor: '#38bdf8',
      },
      technology: {
        stageId: 'technology',
        stageNumber: '03',
        stageName: 'TECHNOLOGY',
        title: 'THE TECHNOLOGY',
        subtitle: 'React + jsPDF Compilation + AI Hints',
        problemOrGoal:
          'Compile dynamic React document DOMs directly into clean, selectable PDF vector documents.',
        keyPoints: [
          {
            label: 'PDF Engine',
            text: 'jsPDF + html2canvas vector pipeline producing crisp selectable text outputs.',
          },
          {
            label: 'ATS Scoring',
            text: 'Rule-based text analyzer parsing action verbs, section headers, and keyword density.',
          },
          {
            label: 'Persistence',
            text: 'Auto-saving local state with optional MongoDB cloud account synchronization.',
          },
        ],
        accentColor: '#00f5ff',
      },
      build: {
        stageId: 'build',
        stageNumber: '04',
        stageName: 'BUILD',
        title: 'THE BUILD',
        subtitle: 'Modular Sections & Dynamic Rendering',
        problemOrGoal:
          'Allow drag-and-drop section re-ordering without breaking document layout bounds.',
        keyPoints: [
          {
            label: 'Implementation',
            text: 'Created modular data schemas for Experience, Education, Projects, and Skill badges.',
          },
          {
            label: 'Key Challenge',
            text: 'Preventing multi-page PDF page breaks from cutting text lines in half.',
          },
          {
            label: 'Solution',
            text: 'Implemented dynamic page height calculation with automatic section block wrapping.',
          },
        ],
        accentColor: '#c084fc',
      },
      impact: {
        stageId: 'impact',
        stageNumber: '05',
        stageName: 'IMPACT',
        title: 'THE IMPACT',
        subtitle: 'Higher ATS Screening Success Rates',
        problemOrGoal:
          'Empower job applicants with professional, error-free resume creation.',
        keyPoints: [
          {
            label: 'Results',
            text: '100% verified ATS parser compatibility and instant zero-latency PDF compilation.',
          },
          {
            label: 'Key Learning',
            text: 'Print-oriented CSS layout techniques and high-performance vector rendering in browser environments.',
          },
          {
            label: 'Future Scope',
            text: 'AI-driven job description matching and automated cover letter generator.',
          },
        ],
        accentColor: '#a855f7',
      },
    },
    architectureSummary: {
      frontend: 'React 18 + Tailwind CSS',
      backend: 'Node.js Microservice',
      database: 'MongoDB / Cloud Local Storage',
      deployment: 'Vercel Production Edge',
    },
  },

  {
    id: 'wildlife-ai',
    number: '04',
    title: 'AI WILDLIFE',
    shortName: 'AI WILDLIFE',
    category: 'AI WILDLIFE DETECTION',
    type: 'Edge AI & Environmental Protection Shield',
    description:
      'Early-warning collision mitigation system combining satellite geospatial imagery, edge IoT cameras, and YOLO computer vision models to protect endangered wildlife and border villages.',
    image:
      'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?q=80&w=1280&auto=format&fit=crop',
    liveUrl: 'https://wildlife-ai-shield.org',
    githubUrl: 'https://github.com/nandhakumar/wildlife-conflict-ai',
    accentColor: '#22c55e',
    themeGlow: 'rgba(34, 197, 94, 0.45)',
    features: [
      'REAL-TIME ANIMAL DETECTION',
      'EDGE IOT SENSORS',
      'HOLOGRAPHIC SCANNING',
      'AUTOMATED DETERRENTS',
      'RANGER ALERTS',
    ],
    technologies: [
      {
        name: 'Python',
        category: 'Core AI Language',
        iconName: 'Terminal',
        description:
          'Primary language driving PyTorch computer vision pipelines and FastAPI endpoints.',
        color: '#38bdf8',
      },
      {
        name: 'OpenCV',
        category: 'Vision Processing',
        iconName: 'Eye',
        description:
          'Video stream decoding, frame preprocessing, and spatial bounding box overlays.',
        color: '#ef4444',
      },
      {
        name: 'YOLO',
        category: 'Object Detection',
        iconName: 'Zap',
        description:
          'YOLOv8 deep learning neural network identifying animal species in under 40ms.',
        color: '#22c55e',
      },
      {
        name: 'TensorFlow',
        category: 'Deep Learning',
        iconName: 'Cpu',
        description:
          'Model quantization and edge optimization for low-power sensor microcontrollers.',
        color: '#f97316',
      },
      {
        name: 'Arduino',
        category: 'Microcontroller',
        iconName: 'HardDrive',
        description:
          'Hardware interface controlling acoustic sound deterrents and flashing light nodes.',
        color: '#00f5ff',
      },
      {
        name: 'IoT',
        category: 'Sensor Telemetry',
        iconName: 'Wifi',
        description:
          'Low-power wireless mesh network transmitting telemetry alerts from remote forest borders.',
        color: '#ec4899',
      },
    ],
    dnaStages: {
      idea: {
        stageId: 'idea',
        stageNumber: '01',
        stageName: 'IDEA',
        title: 'THE IDEA',
        subtitle: 'Preventing Human-Wildlife Conflicts',
        problemOrGoal:
          'Mitigate accidental collisions and crop loss in forest border zones using non-invasive edge AI technology.',
        keyPoints: [
          {
            label: 'Problem',
            text: 'Encroaching animal herds in border villages cause crop destruction and casualties due to late warning.',
          },
          {
            label: 'Inspiration',
            text: 'Autonomous satellite imagery and low-cost IoT edge camera meshes positioned along forest perimeters.',
          },
          {
            label: 'Goal',
            text: 'Build an automated 24/7 boundary shield that identifies species in under 40ms and triggers soft deterrents.',
          },
        ],
        accentColor: '#22c55e',
      },
      design: {
        stageId: 'design',
        stageNumber: '02',
        stageName: 'DESIGN',
        title: 'THE DESIGN',
        subtitle: 'Geospatial Grid & Ranger Alert Center',
        problemOrGoal:
          'Design an intuitive ranger dashboard displaying live camera node health and geospatial threat maps.',
        keyPoints: [
          {
            label: 'UI/UX Focus',
            text: 'Holographic GIS map displaying active camera nodes, detection confidence, and alert levels.',
          },
          {
            label: 'User Flow',
            text: 'Camera detect → Edge YOLO inference → Species verification → Ranger SMS / Telegram alert.',
          },
          {
            label: 'Hardware Layout',
            text: 'Solar-powered Raspberry Pi + Coral TPU edge camera enclosures mounted on border poles.',
          },
        ],
        accentColor: '#10b981',
      },
      technology: {
        stageId: 'technology',
        stageNumber: '03',
        stageName: 'TECHNOLOGY',
        title: 'THE TECHNOLOGY',
        subtitle: 'YOLOv8 + OpenCV + FastAPI + IoT Mesh',
        problemOrGoal:
          'Deploy low-power computer vision models operating reliably under dark night conditions.',
        keyPoints: [
          {
            label: 'AI Model',
            text: 'YOLOv8 fine-tuned on custom infrared thermal wildlife datasets for night vision accuracy.',
          },
          {
            label: 'Edge Inference',
            text: 'Quantized INT8 TensorRT engine running on Raspberry Pi 4 with Coral Accelerator.',
          },
          {
            label: 'Communication',
            text: 'FastAPI gateway broadcasting alerts over LoRa / GSM cellular telemetry channels.',
          },
        ],
        accentColor: '#38bdf8',
      },
      build: {
        stageId: 'build',
        stageNumber: '04',
        stageName: 'BUILD',
        title: 'THE BUILD',
        subtitle: 'Edge Optimization & Hardware Triggers',
        problemOrGoal:
          'Train neural network weights to recognize elephants, tigers, and wild boars with high precision.',
        keyPoints: [
          {
            label: 'Implementation',
            text: 'Collected and annotated 12,000+ local forest camera trap images across varying weather states.',
          },
          {
            label: 'Key Challenge',
            text: 'High false-alarm rates triggered by moving tree branches and shadows during high winds.',
          },
          {
            label: 'Solution',
            text: 'Implemented temporal multi-frame confidence tracking before firing physical deterrents.',
          },
        ],
        accentColor: '#22c55e',
      },
      impact: {
        stageId: 'impact',
        stageNumber: '05',
        stageName: 'IMPACT',
        title: 'THE IMPACT',
        subtitle: 'Proactive Conservation & Peaceful Coexistence',
        problemOrGoal:
          'Protect endangered animal species while securing rural agricultural communities.',
        keyPoints: [
          {
            label: 'Results',
            text: 'Sub-40ms detection latency with 94.2% species classification accuracy across test zones.',
          },
          {
            label: 'Key Learning',
            text: 'Embedded AI model quantization techniques and low-power hardware thermal management.',
          },
          {
            label: 'Future Scope',
            text: 'Drone-assisted thermal patrolling and predictive animal migration path modeling.',
          },
        ],
        accentColor: '#10b981',
      },
    },
    architectureSummary: {
      frontend: 'React 18 + Mapbox GIS',
      backend: 'FastAPI Python Engine',
      database: 'Edge SQLite / TimescaleDB',
      deployment: 'Edge IoT Hardware + Cloud Hub',
    },
  },

  {
    id: 'nk-mern-cli',
    number: '05',
    title: 'NK MERN CLI',
    shortName: 'NK MERN CLI',
    category: 'DEVELOPER TOOL',
    type: 'Full-Stack Architecture Scaffolding CLI',
    description:
      'Interactive terminal command-line tool that scaffolds enterprise-grade full-stack MERN boilerplates with JWT auth, Docker containers, Tailwind, and CI/CD pipelines in seconds.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1280&auto=format&fit=crop',
    liveUrl: 'https://www.npmjs.com/package/nk-mern-cli',
    githubUrl: 'https://github.com/nandhakumar/nk-mern-cli',
    accentColor: '#00f5ff',
    themeGlow: 'rgba(0, 245, 255, 0.45)',
    features: [
      '1-COMMAND GENERATOR',
      'JWT AUTH SCAFFOLDING',
      'DOCKER INTEGRATION',
      'PRE-CONFIGURED LINTING',
      'INTERACTIVE WIZARD',
    ],
    technologies: [
      {
        name: 'Node.js',
        category: 'Runtime Environment',
        iconName: 'Server',
        description:
          'CLI execution engine reading developer terminal inputs and parsing file templates.',
        color: '#22c55e',
      },
      {
        name: 'Express',
        category: 'Backend Framework',
        iconName: 'Cpu',
        description:
          'Generated server templates featuring pre-built routing and error middleware.',
        color: '#cbd5e1',
      },
      {
        name: 'React',
        category: 'Frontend Framework',
        iconName: 'Atom',
        description:
          'Generated Vite SPA templates with Tailwind CSS and React Router pre-configured.',
        color: '#00f5ff',
      },
      {
        name: 'MongoDB',
        category: 'NoSQL Database',
        iconName: 'Database',
        description:
          'Pre-configured Mongoose connection boilerplate and user authentication schemas.',
        color: '#10b981',
      },
      {
        name: 'JavaScript',
        category: 'Language Core',
        iconName: 'Code',
        description:
          'ES6+ asynchronous modules driving template generator pipelines.',
        color: '#eab308',
      },
      {
        name: 'CLI',
        category: 'Developer Utilities',
        iconName: 'Terminal',
        description:
          'Commander.js + Inquirer interactive prompts for zero-config project initialization.',
        color: '#a855f7',
      },
    ],
    dnaStages: {
      idea: {
        stageId: 'idea',
        stageNumber: '01',
        stageName: 'IDEA',
        title: 'THE IDEA',
        subtitle: 'Automating Repetitive Architecture Setup',
        problemOrGoal:
          'Eliminate hours spent repeatedly configuring authentication, folder structures, and Docker files.',
        keyPoints: [
          {
            label: 'Problem',
            text: 'Developers waste 3-5 hours per new project setting up JWT auth, environment configs, and linters.',
          },
          {
            label: 'Inspiration',
            text: 'Production CLI generators like Create-React-App and NestJS CLI tailored for full-stack MERN.',
          },
          {
            label: 'Goal',
            text: 'Build a zero-config terminal command tool that scaffolds production MERN apps in under 10 seconds.',
          },
        ],
        accentColor: '#00f5ff',
      },
      design: {
        stageId: 'design',
        stageNumber: '02',
        stageName: 'DESIGN',
        title: 'THE DESIGN',
        subtitle: 'Interactive Terminal Shell Wizard',
        problemOrGoal:
          'Design an engaging command-line interface with step-by-step feature prompts and styled outputs.',
        keyPoints: [
          {
            label: 'UI/UX Focus',
            text: 'Colorful terminal prompts (Chalk + Gradient-String) with spin animations during npm dependency installs.',
          },
          {
            label: 'User Flow',
            text: 'npx nk-mern-cli → Select Features → Name Project → Automated Scaffolding → npm run dev ready.',
          },
          {
            label: 'Architecture',
            text: 'Clean separation between raw template assets and dynamic generator functions.',
          },
        ],
        accentColor: '#38bdf8',
      },
      technology: {
        stageId: 'technology',
        stageNumber: '03',
        stageName: 'TECHNOLOGY',
        title: 'THE TECHNOLOGY',
        subtitle: 'Commander.js + Inquirer + EJS Templates',
        problemOrGoal:
          'Select lightweight Node.js CLI packages to handle command arguments and interactive user prompts.',
        keyPoints: [
          {
            label: 'CLI Core',
            text: 'Commander.js for flag parsing, Inquirer.js for interactive radio / checkbox prompts.',
          },
          {
            label: 'Template Engine',
            text: 'EJS templating engine injecting custom project parameters into backend and frontend code.',
          },
          {
            label: 'Automation',
            text: 'ShellJS for automated git init and npm dependency installation scripts.',
          },
        ],
        accentColor: '#a855f7',
      },
      build: {
        stageId: 'build',
        stageNumber: '04',
        stageName: 'BUILD',
        title: 'THE BUILD',
        subtitle: 'Modular Scaffolding Engine & NPM Release',
        problemOrGoal:
          'Ensure generated code passes strict ESLint rules and boots instantly on `npm run dev`.',
        keyPoints: [
          {
            label: 'Implementation',
            text: 'Packaged modular auth presets (JWT, Session, OAuth2) and database driver options.',
          },
          {
            label: 'Key Challenge',
            text: 'Supporting varying OS terminal environments (Windows CMD, PowerShell, macOS Zsh, Linux Bash).',
          },
          {
            label: 'Solution',
            text: 'Used cross-platform Node path resolution and cross-spawn process runners.',
          },
        ],
        accentColor: '#00f5ff',
      },
      impact: {
        stageId: 'impact',
        stageNumber: '05',
        stageName: 'IMPACT',
        title: 'THE IMPACT',
        subtitle: '80%+ Bootstrap Time Reduction',
        problemOrGoal:
          'Provide developers with a trusted production starting point for full-stack Web applications.',
        keyPoints: [
          {
            label: 'Results',
            text: 'Saves 3+ hours per project start, deployed on NPM with zero-config setup.',
          },
          {
            label: 'Key Learning',
            text: 'Node.js binary packaging, terminal stream styling, and cross-platform process execution.',
          },
          {
            label: 'Future Scope',
            text: 'TypeScript boilerplate generator and automated GraphQL API layer options.',
          },
        ],
        accentColor: '#38bdf8',
      },
    },
    architectureSummary: {
      frontend: 'React 18 + Vite Preset',
      backend: 'Express REST Generator',
      database: 'MongoDB Connection Script',
      deployment: 'Docker & Docker-Compose',
    },
  },
];
