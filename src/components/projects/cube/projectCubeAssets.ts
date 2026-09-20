/**
 * Centralized Project Assets Configuration for 3D Project Cube Showcase.
 * Easy to replace temporary screenshots/visuals with real project images later.
 */

export interface ProjectCubeAssetConfig {
  id: string;
  shortName: string;
  title: string;
  category: string;
  subtitle: string;
  accentColor: string;
  badge: string;
  // Screenshot URL (optional fallback for custom image textures)
  imageUrl?: string;
  // Custom interface preview config
  uiPreview: {
    headerTitle: string;
    statusText: string;
    primaryMetric: string;
    primaryMetricLabel: string;
    secondaryMetric: string;
    secondaryMetricLabel: string;
    lines: string[];
    features: string[];
  };
}

export const PROJECT_CUBE_ASSETS: Record<string, ProjectCubeAssetConfig> = {
  'swayam-2': {
    id: 'swayam-2',
    shortName: 'SWAYAM 2.0',
    title: 'SWAYAM 2.0',
    category: 'EDTECH PLATFORM',
    subtitle: 'Full Stack Education Platform',
    accentColor: '#00f5ff',
    badge: 'LIVE CAMPUS',
    uiPreview: {
      headerTitle: 'SWAYAM 2.0 — Digital Campus',
      statusText: '3 Pending Assignments',
      primaryMetric: '85%',
      primaryMetricLabel: 'Course Completion',
      secondaryMetric: 'Active',
      secondaryMetricLabel: 'WebSocket Feed',
      lines: [
        'MERN Architecture • NodeMailer Alerts',
        'Lecture Stream: WebSockets & Real-time Systems',
        'Assignment 04: Due Tomorrow at 11:59 PM',
      ],
      features: ['MERN Stack', 'Socket.IO', 'NodeMailer', 'JWT Auth'],
    },
  },

  'resume-forge': {
    id: 'resume-forge',
    shortName: 'RESUME FORGE',
    title: 'Resume Forge',
    category: 'CAREER TOOL',
    subtitle: 'Interactive ATS Career Studio',
    accentColor: '#c084fc',
    badge: '98/100 ATS MATCH',
    uiPreview: {
      headerTitle: 'Resume Forge — ATS Studio',
      statusText: 'Draft Saved to Cloud',
      primaryMetric: '98/100',
      primaryMetricLabel: 'ATS Compliance Score',
      secondaryMetric: '1-Click',
      secondaryMetricLabel: 'Vector PDF Export',
      lines: [
        'React + Supabase + Tailwind CSS',
        'Live Side-by-Side Document Rendering',
        'ATS Score Analyzer & Section Optimizer',
      ],
      features: ['React 18', 'TypeScript', 'jsPDF Engine', 'Tailwind'],
    },
  },

  'speed-taxi': {
    id: 'speed-taxi',
    shortName: 'SPEED TAXI',
    title: 'Speed Taxi Website',
    category: 'SMART MOBILITY',
    subtitle: 'Real-Time Urban Dispatch',
    accentColor: '#38bdf8',
    badge: 'DISPATCH ACTIVE',
    uiPreview: {
      headerTitle: 'Speed Taxi — Mobility Dispatch',
      statusText: 'Driver #402 En Route (2 min)',
      primaryMetric: '$18.50',
      primaryMetricLabel: 'Estimated Trip Fare',
      secondaryMetric: '4.2 km',
      secondaryMetricLabel: 'Calculated Distance',
      lines: [
        'React + Google Maps API + Node/Express',
        'GPS Vehicle Telemetry & Algorithmic Dispatch',
        'Stripe Payment Gateway Integrated',
      ],
      features: ['Google Maps API', 'Socket.IO', 'Express API', 'Stripe'],
    },
  },

  'wildlife-ai': {
    id: 'wildlife-ai',
    shortName: 'AI WILDLIFE',
    title: 'AI Human-Animal Conflict Solution',
    category: 'CONSERVATION AI',
    subtitle: 'Edge AI & Forest Safety',
    accentColor: '#22c55e',
    badge: 'RADAR ACTIVE',
    uiPreview: {
      headerTitle: 'AI Wildlife Shield — Edge AI',
      statusText: 'Detection Latency: 38ms',
      primaryMetric: '98.4%',
      primaryMetricLabel: 'YOLOv8 Detection',
      secondaryMetric: '<40ms',
      secondaryMetricLabel: 'Inference Speed',
      lines: [
        'Python + YOLOv8 + OpenCV + Raspberry Pi',
        'Thermal Camera Stream & Boundary Sensor Mesh',
        'Automated Acoustic Deterrent & Ranger Alert',
      ],
      features: ['Python', 'YOLOv8', 'OpenCV', 'Raspberry Pi'],
    },
  },

  'nk-mern-cli': {
    id: 'nk-mern-cli',
    shortName: 'NK MERN CLI',
    title: 'NK MERN CLI',
    category: 'DEVELOPER TOOL',
    subtitle: 'Full-Stack Architecture CLI',
    accentColor: '#00f5ff',
    badge: 'NPM PACKAGE',
    uiPreview: {
      headerTitle: 'Terminal — nk-mern-cli',
      statusText: 'npm i -g nk-mern-cli',
      primaryMetric: '80%+',
      primaryMetricLabel: 'Bootstrap Time Saved',
      secondaryMetric: '1-Cmd',
      secondaryMetricLabel: 'Full Scaffolding',
      lines: [
        'Node.js + Commander.js + Inquirer + Docker',
        '$ npx nk-mern-cli init my-fullstack-app',
        '✔ JWT Auth, Docker, ESLint & Tailwind Ready',
      ],
      features: ['Commander.js', 'Inquirer', 'Docker Templates', 'Node.js'],
    },
  },
};
