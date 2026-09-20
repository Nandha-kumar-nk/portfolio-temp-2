export interface TechDetailInfo {
  name: string;
  roleDescription: string;
}

export const PROJECT_TECH_DETAILS: Record<string, Record<string, string>> = {
  'speed-taxi': {
    React: 'Component-based frontend UI architecture with real-time reactive state updates.',
    'Node.js': 'Non-blocking asynchronous runtime driving event loops and real-time vehicle dispatch.',
    Express: 'Lightweight REST API framework routing auth requests and fare estimates.',
    MongoDB: 'Document database storing user profiles, active rides, and trip history.',
    JavaScript: 'Core ES6+ dynamic logic powering map math and client state.',
    'Tailwind CSS': 'Utility-first styling powering high-contrast dark terminal UI.',
    'Google Maps API': 'Interactive map rendering, place autocomplete, and route distance matrix API.',
    'Socket.IO': 'Bi-directional WebSocket engine broadcasting vehicle GPS telemetry in real-time.',
    Stripe: 'PCI-compliant payment processing API for instant fare settlements.',
  },
  'swayam-2': {
    React: 'Modular frontend view rendering course lectures and assignment dashboards.',
    JavaScript: 'Client-side event handlers and async API fetch requests.',
    'Node.js': 'Backend runtime powering automated deadline cron jobs and user routes.',
    Express: 'Application gateway managing JWT auth middleware and course APIs.',
    MongoDB: 'Persistent document database storing course catalogs and student enrollments.',
    'REST API': 'Standardized JSON endpoints enabling clean client-server communication.',
  },
  'resume-forge': {
    React: 'Reactive state management synchronizing live markdown input with PDF rendering.',
    JavaScript: 'Dynamic section reordering and client-side vector calculations.',
    'Tailwind CSS': 'Modern typography and clean document styling for ATS templates.',
    'Node.js': 'Server environment facilitating automated PDF generation builds.',
    MongoDB: 'Database engine persisting cloud draft states and user templates.',
    AI: 'Intelligent ATS keyword analyzer offering resume improvement suggestions.',
  },
  'wildlife-ai': {
    Python: 'Core deep learning script execution and computer vision pipelines.',
    OpenCV: 'Image processing and video stream frame capture engine.',
    YOLO: 'Ultra low-latency computer vision model detecting species in <40ms.',
    TensorFlow: 'Deep learning framework handling neural network inference weights.',
    Arduino: 'Microcontroller interface managing hardware sensor triggers.',
    IoT: 'Low-power edge device mesh broadcasting telemetry to forest rangers.',
  },
  'nk-mern-cli': {
    'Node.js': 'Executable CLI runtime built with Commander.js and ShellJS.',
    React: 'Generates modern Vite React frontend templates on command.',
    Express: 'Scaffolds production-grade Express backend routing structures.',
    MongoDB: 'Configures Mongoose ODM database connection schemas automatically.',
    JavaScript: 'Core Node ES module logic driving template injection engines.',
    CLI: 'Interactive terminal shell questionnaire provisioning projects in seconds.',
  },
};
