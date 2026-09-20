export type Project = {
  id: string;
  title: string;
  category: string;
  type: string;
  tagline: string;
  description: string;
  problem?: string;
  idea?: string;
  architecture?: string[];
  techStack: string[];
  features: string[];
  impact?: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
};

export type DnaNodeType =
  | 'problem'
  | 'idea'
  | 'architecture'
  | 'technology'
  | 'features'
  | 'impact';

export interface DnaNodeConfig {
  type: DnaNodeType;
  number: string;
  label: string;
  subtitle: string;
  shortSummary: string;
  side: 'left' | 'right';
  color: string;
  accentGlow: string;
}

export const DNA_NODES: DnaNodeConfig[] = [
  {
    type: 'problem',
    number: '01',
    label: 'PROBLEM',
    subtitle: 'Pain Points',
    shortSummary: 'Usability gaps in existing platform & missed assignment deadlines',
    side: 'left',
    color: '#f43f5e', // rose / crimson
    accentGlow: 'rgba(244, 63, 94, 0.45)',
  },
  {
    type: 'idea',
    number: '02',
    label: 'IDEA',
    subtitle: 'Solution',
    shortSummary: 'Real-time reactive digital campus with automated alerts',
    side: 'left',
    color: '#38bdf8', // sky blue
    accentGlow: 'rgba(56, 189, 248, 0.45)',
  },
  {
    type: 'architecture',
    number: '03',
    label: 'ARCHITECTURE',
    subtitle: 'System Design',
    shortSummary: 'React 18 SPA → Socket.IO & Express → MongoDB + NodeMailer worker',
    side: 'left',
    color: '#00f5ff', // electric cyan
    accentGlow: 'rgba(0, 245, 255, 0.5)',
  },
  {
    type: 'technology',
    number: '04',
    label: 'TECHNOLOGY',
    subtitle: 'Core Stack',
    shortSummary: 'MongoDB • Express • React • Node.js • Socket.IO • NodeMailer',
    side: 'right',
    color: '#818cf8', // indigo / violet
    accentGlow: 'rgba(129, 140, 248, 0.45)',
  },
  {
    type: 'features',
    number: '05',
    label: 'FEATURES',
    subtitle: 'Engineered Modules',
    shortSummary: 'Course management, assignments, real-time alerts & responsive UI',
    side: 'right',
    color: '#10b981', // emerald
    accentGlow: 'rgba(16, 185, 129, 0.45)',
  },
  {
    type: 'impact',
    number: '06',
    label: 'IMPACT',
    subtitle: 'Real Outcome',
    shortSummary: 'Eliminated missed submissions with automated notification cadence',
    side: 'right',
    color: '#c084fc', // purple / violet
    accentGlow: 'rgba(192, 132, 252, 0.45)',
  },
];
