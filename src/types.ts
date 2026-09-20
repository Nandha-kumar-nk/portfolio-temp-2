export type SceneNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface SceneConfig {
  id: SceneNumber;
  name: string;
  subtitle: string;
  durationMs: number;
  targetProgress: number;
  description: string;
}

export const SCENES_DATA: Record<SceneNumber, SceneConfig> = {
  1: {
    id: 1,
    name: 'INIT',
    subtitle: 'A SINGLE IDEA...',
    durationMs: 950,
    targetProgress: 12,
    description: 'Deep black space. A single tiny glowing cyan particle in the center with breathing pulse.',
  },
  2: {
    id: 2,
    name: 'FORMING',
    subtitle: 'IDEAS TAKING SHAPE...',
    durationMs: 1150,
    targetProgress: 28,
    description: 'Thousands of cyan/blue particles visibly travel and gather to form a large glowing 3D particle "N".',
  },
  3: {
    id: 3,
    name: 'CODE TO UNIVERSE',
    subtitle: 'CONNECTING IDEAS...',
    durationMs: 1250,
    targetProgress: 42,
    description: 'Floating developer code transforms as N particles expand outward and curl into a rotating 3D spherical core.',
  },
  4: {
    id: 4,
    name: 'LOADING',
    subtitle: 'CONNECTING IDEAS...',
    durationMs: 1600,
    targetProgress: 96,
    description: 'Detailed rotating 3D globe with cyan atmosphere, geographic network, orbital rings, light trails, and orbiting tech badges.',
  },
  5: {
    id: 5,
    name: 'READY',
    subtitle: 'ENTERING UNIVERSE...',
    durationMs: 1100,
    targetProgress: 100,
    description: '100% completed state. Vertical cyan energy beam pierces through the globe with expanding shockwaves.',
  },
  6: {
    id: 6,
    name: 'WELCOME',
    subtitle: 'IDEAS • CODE • CREATE • IMPACT',
    durationMs: 3200,
    targetProgress: 100,
    description: 'Final identity reveal: NANDHAKUMAR UNIVERSE with 3D globe active behind typography and EXPLORE button.',
  },
  7: {
    id: 7,
    name: 'HOME',
    subtitle: 'TURNING IDEAS INTO REAL EXPERIENCES',
    durationMs: 0,
    targetProgress: 100,
    description: 'The entered full-width home universe featuring the interactive 3D rotating globe.',
  },
};

export * from './data/projectsData';

export interface TechOrbitItem {
  id: string;
  name: string;
  iconType: 'react' | 'python' | 'js' | 'node' | 'database' | 'code';
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitTilt: [number, number, number];
  initialAngle: number;
}
