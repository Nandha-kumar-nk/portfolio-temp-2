export type EvolutionStageId = 'idea' | 'design' | 'build' | 'impact';

export interface EvolutionStageInfo {
  id: EvolutionStageId;
  number: string;
  label: string;
  title: string;
  subtitle: string;
}

export const EVOLUTION_STAGES: EvolutionStageInfo[] = [
  {
    id: 'idea',
    number: '01',
    label: 'IDEA',
    title: 'THE IDEA',
    subtitle: 'PROBLEM STATEMENT & CONCEPT',
  },
  {
    id: 'design',
    number: '02',
    label: 'DESIGN',
    title: 'THE DESIGN',
    subtitle: 'UI/UX & ARCHITECTURE',
  },
  {
    id: 'build',
    number: '03',
    label: 'BUILD',
    title: 'THE BUILD',
    subtitle: 'DEVELOPMENT & FEATURES',
  },
  {
    id: 'impact',
    number: '04',
    label: 'IMPACT',
    title: 'THE IMPACT',
    subtitle: 'RESULTS & REAL-WORLD VALUE',
  },
];

export interface StageData {
  problem: string;
  inspiration: string;
  goal: string;
  designConcept: string;
  uxApproach: string;
  architecture: string;
  techChoices: string;
  challenges: string;
  solutions: string;
  results: string;
  takeaways: string;
  futureScope: string;
}

export const PROJECT_EVOLUTION_DETAILS: Record<string, StageData> = {
  'speed-taxi': {
    problem:
      'Unpredictable taxi dispatch delays, manual fare calculation errors, and lack of live vehicle telemetry in urban transit.',
    inspiration:
      'Modern algorithmic dispatch systems coupling real-time GPS telemetry with instant routing.',
    goal:
      'Build a frictionless ride booking and dispatch platform with sub-second driver coordination.',
    designConcept:
      'High-contrast dark terminal aesthetic with live interactive map overlays and real-time route animations.',
    uxApproach:
      '3-step seamless booking flow: drop pin, pick vehicle class, instant dispatch confirmation.',
    architecture:
      'Event-driven Node.js & Socket.IO backend with Google Maps API and MongoDB persistence layer.',
    techChoices:
      'React 18 frontend, Express gateway, WebSockets for telemetry, Stripe for payments.',
    challenges:
      'Handling high-frequency WebSocket updates for multiple active vehicle positions without dropping FPS.',
    solutions:
      'Throttled coordinate interpolation and canvas-based marker rendering for fluid 60fps tracking.',
    results:
      'Frictionless ride bookings with sub-second driver dispatch coordination and live trip tracking.',
    takeaways:
      'Optimized spatial queries and real-time state synchronization across distributed clients.',
    futureScope:
      'AI-driven predictive demand mapping and dynamic surge fare algorithms based on traffic density.',
  },
  'swayam-2': {
    problem:
      'Usability gaps in legacy learning platforms, including fragmented course navigation and missed assignment deadlines.',
    inspiration:
      'Next-generation digital campus platforms offering real-time feedback and intelligent notification alerts.',
    goal:
      'Rebuild SWAYAM with modular course delivery, instant broadcast alerts, and automated deadline reminders.',
    designConcept:
      'Clean cyan and dark navy interface with glassmorphism cards and structured course hierarchies.',
    uxApproach:
      'Minimalist dashboard focusing on immediate action items, upcoming deadlines, and modular video lectures.',
    architecture:
      'Full-stack MERN architecture paired with Socket.IO for real-time broadcasts and NodeMailer for scheduled reminders.',
    techChoices:
      'React 18, Express REST API, MongoDB Mongoose schema, Socket.IO, Cron worker tasks.',
    challenges:
      'Managing role-based authorization rules between students, faculty, and administrative staff safely.',
    solutions:
      'JWT authorization middleware combined with granular permission claims on protected API endpoints.',
    results:
      'Transformed educational workflows with intuitive course discovery and automated deadline reminders.',
    takeaways:
      'Engineered scalable full-stack REST APIs and automated background notification workers.',
    futureScope:
      'AI-powered personalized learning paths and automated assignment grading assistants.',
  },
  'resume-forge': {
    problem:
      'Fragile formatting in traditional document editors that fails ATS software parsers and lacks live previews.',
    inspiration:
      'Instant markdown-to-PDF compilation engines with real-time vector rendering.',
    goal:
      'Create an interactive career studio with instantaneous side-by-side live rendering and ATS compliance.',
    designConcept:
      'Split-screen workspace featuring code/form inputs on the left and a live high-res document page on the right.',
    uxApproach:
      'Real-time typing feedback, drag-and-drop section reordering, and instantaneous ATS score indicators.',
    architecture:
      'Client-side state store driving a custom jsPDF vector compilation pipeline with Firebase draft persistence.',
    techChoices:
      'React, TypeScript, Tailwind CSS, jsPDF vector engine, Firebase cloud draft storage.',
    challenges:
      'Ensuring pixel-perfect pagination and font rendering across PDF export engines.',
    solutions:
      'Implemented custom layout measuring algorithms that calculate page boundaries dynamically before PDF generation.',
    results:
      'High-speed ATS-optimized resume compilation ensuring job seekers pass automated screenings.',
    takeaways:
      'Deep mastery of client-side vector document rendering and real-time state synchronization.',
    futureScope:
      'AI resume content improver that tailor-fits experience bullet points to target job descriptions.',
  },
  'wildlife-ai': {
    problem:
      'Human-wildlife encounters in forest border zones causing crop destruction, human injuries, and animal casualties.',
    inspiration:
      'Non-invasive AI computer vision technology deployed at the edge to protect endangered ecosystems.',
    goal:
      'Deploy an autonomous 24/7 boundary monitoring shield that detects approaching wildlife in <40ms.',
    designConcept:
      'Command center dashboard featuring holographic geospatial scanning grid and live alert feeds.',
    uxApproach:
      'High-urgency telemetry display with immediate audio/visual alert indicators for forest rangers.',
    architecture:
      'YOLOv8 inference engine running on Raspberry Pi edge nodes linked via FastAPI gateway to SMS/Telegram channels.',
    techChoices:
      'Python, YOLOv8, OpenCV, PyTorch, Raspberry Pi edge IoT mesh, FastAPI.',
    challenges:
      'Running computer vision models on low-power edge hardware under variable outdoor lighting conditions.',
    solutions:
      'Quantized YOLOv8 weights with TensorRT acceleration to achieve stable <40ms inference latency on edge nodes.',
    results:
      'Proactive collision avoidance and boundary safety with high-accuracy non-invasive species detection.',
    takeaways:
      'Edge deployment of deep learning models and low-latency alert dispatch systems.',
    futureScope:
      'Thermal imaging mesh integration for high-density night vision monitoring in dense forest canopy.',
  },
  'nk-mern-cli': {
    problem:
      'Repetitive boilerplate setup for authentication, databases, Docker containerization, and linting when launching MERN apps.',
    inspiration:
      'Modern developer tooling that automates friction and accelerates full-stack product scaffolding.',
    goal:
      'Provision enterprise-grade full-stack MERN boilerplates with 1 single command in seconds.',
    designConcept:
      'Cyberpunk terminal wizard experience with interactive CLI prompts and rich colored ASCII outputs.',
    uxApproach:
      'Guided multi-step questionnaire with smart defaults allowing fast custom stack generation.',
    architecture:
      'Node.js CLI executable built with Commander.js and Inquirer, injecting modular template generators.',
    techChoices:
      'Node.js, Commander.js, Inquirer, Docker templates, ShellJS, Chalk formatting.',
    challenges:
      'Dynamically stitching together modular dependencies based on user selections without broken imports.',
    solutions:
      'Abstract syntax tree (AST) template generator that injects conditional imports and configuration blocks cleanly.',
    results:
      'Slashes full-stack project initialization time by over 80%, enabling instant prototyping.',
    takeaways:
      'Authoring published NPM CLI packages and automated code scaffolding tools.',
    futureScope:
      'Extending CLI presets to support Next.js, GraphQL, and automated Cloud Run deployment scripts.',
  },
};
