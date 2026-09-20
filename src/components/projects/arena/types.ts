import { ProjectItem } from '../../../data/projectsData';

export type StoryStageType = 'problem' | 'idea' | 'system' | 'build' | 'result';

export interface StoryStageConfig {
  type: StoryStageType;
  number: string;
  title: string;
  subtitle: string;
  color: string;
  glowColor: string;
  iconName: 'lens' | 'bulb' | 'system' | 'code' | 'bars';
}

export const STORY_STAGES_CONFIG: StoryStageConfig[] = [
  {
    type: 'problem',
    number: '01',
    title: 'THE PROBLEM',
    subtitle: 'Understanding the real need',
    color: '#00f5ff',
    glowColor: 'rgba(0, 245, 255, 0.5)',
    iconName: 'lens',
  },
  {
    type: 'idea',
    number: '02',
    title: 'THE IDEA',
    subtitle: 'A better way to learn',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    iconName: 'bulb',
  },
  {
    type: 'system',
    number: '03',
    title: 'THE SYSTEM',
    subtitle: 'Architecture that scales',
    color: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.5)',
    iconName: 'system',
  },
  {
    type: 'build',
    number: '04',
    title: 'THE BUILD',
    subtitle: 'Technologies that power it',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    iconName: 'code',
  },
  {
    type: 'result',
    number: '05',
    title: 'THE RESULT',
    subtitle: 'A meaningful impact',
    color: '#00f5ff',
    glowColor: 'rgba(0, 245, 255, 0.5)',
    iconName: 'bars',
  },
];

export interface ProjectThemePalette {
  primary: string;
  glow: string;
  accent: string;
  secondary: string;
  particleColors: [string, string, string];
  ambientClass: string;
}

export const PROJECT_THEMES: Record<string, ProjectThemePalette> = {
  'swayam-2': {
    primary: '#00f5ff',
    glow: 'rgba(0, 245, 255, 0.65)',
    accent: '#38bdf8',
    secondary: '#818cf8',
    particleColors: ['#00f5ff', '#38bdf8', '#818cf8'],
    ambientClass: 'from-cyan-500/10 via-blue-600/5 to-transparent',
  },
  'speed-taxi': {
    primary: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.65)',
    accent: '#f59e0b',
    secondary: '#0284c7',
    particleColors: ['#38bdf8', '#fbbf24', '#0284c7'],
    ambientClass: 'from-sky-500/10 via-amber-500/5 to-transparent',
  },
  'wildlife-ai': {
    primary: '#10b981',
    glow: 'rgba(16, 185, 129, 0.65)',
    accent: '#22c55e',
    secondary: '#065f46',
    particleColors: ['#10b981', '#4ade80', '#00f5ff'],
    ambientClass: 'from-emerald-500/10 via-teal-600/5 to-transparent',
  },
  'resume-forge': {
    primary: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.65)',
    accent: '#f43f5e',
    secondary: '#7c3aed',
    particleColors: ['#c084fc', '#f472b6', '#a855f7'],
    ambientClass: 'from-purple-500/10 via-pink-600/5 to-transparent',
  },
  'nk-mern-cli': {
    primary: '#00f5ff',
    glow: 'rgba(0, 245, 255, 0.65)',
    accent: '#22c55e',
    secondary: '#eab308',
    particleColors: ['#00f5ff', '#22c55e', '#eab308'],
    ambientClass: 'from-cyan-500/10 via-emerald-600/5 to-transparent',
  },
};
