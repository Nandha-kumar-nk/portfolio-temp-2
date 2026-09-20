import React from 'react';
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSocketdotio,
  SiFirebase,
  SiGooglemaps,
  SiStripe,
  SiPython,
  SiOpencv,
  SiPytorch,
  SiRaspberrypi,
  SiFastapi,
  SiDocker,
  SiJavascript,
  SiGnubash,
  SiNpm,
  SiPostgresql,
  SiRedis,
  SiVite,
  SiNextdotjs,
  SiGit,
} from 'react-icons/si';
import { FaFilePdf, FaEnvelope, FaTerminal, FaCodeBranch } from 'react-icons/fa6';

export interface TechIconConfig {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  brandColor: string;
  shortLabel: string;
}

/**
 * Maps technology names to verified SVG icons and authentic brand colors
 */
export function getTechIconConfig(techName: string): TechIconConfig {
  const norm = techName.toLowerCase().trim();

  if (norm.includes('react')) {
    return { name: techName, icon: SiReact, brandColor: '#00d8ff', shortLabel: 'React' };
  }
  if (norm.includes('typescript')) {
    return { name: techName, icon: SiTypescript, brandColor: '#3178c6', shortLabel: 'TypeScript' };
  }
  if (norm.includes('tailwind')) {
    return { name: techName, icon: SiTailwindcss, brandColor: '#06b6d4', shortLabel: 'Tailwind' };
  }
  if (norm.includes('node') && !norm.includes('mail')) {
    return { name: techName, icon: SiNodedotjs, brandColor: '#5fa04e', shortLabel: 'Node.js' };
  }
  if (norm.includes('express')) {
    return { name: techName, icon: SiExpress, brandColor: '#cbd5e1', shortLabel: 'Express' };
  }
  if (norm.includes('mongo')) {
    return { name: techName, icon: SiMongodb, brandColor: '#47a248', shortLabel: 'MongoDB' };
  }
  if (norm.includes('socket') || norm.includes('websocket')) {
    return { name: techName, icon: SiSocketdotio, brandColor: '#38bdf8', shortLabel: 'Socket.IO' };
  }
  if (norm.includes('firebase')) {
    return { name: techName, icon: SiFirebase, brandColor: '#ffca28', shortLabel: 'Firebase' };
  }
  if (norm.includes('jspdf') || norm.includes('pdf')) {
    return { name: techName, icon: FaFilePdf, brandColor: '#ef4444', shortLabel: 'jsPDF' };
  }
  if (norm.includes('map') || norm.includes('google maps')) {
    return { name: techName, icon: SiGooglemaps, brandColor: '#4285f4', shortLabel: 'Google Maps' };
  }
  if (norm.includes('stripe')) {
    return { name: techName, icon: SiStripe, brandColor: '#635bff', shortLabel: 'Stripe' };
  }
  if (norm.includes('python')) {
    return { name: techName, icon: SiPython, brandColor: '#3776ab', shortLabel: 'Python' };
  }
  if (norm.includes('yolo') || norm.includes('cv') || norm.includes('opencv')) {
    return { name: techName, icon: SiOpencv, brandColor: '#5c3ee8', shortLabel: norm.includes('yolo') ? 'YOLOv8' : 'OpenCV' };
  }
  if (norm.includes('pytorch')) {
    return { name: techName, icon: SiPytorch, brandColor: '#ee4c2c', shortLabel: 'PyTorch' };
  }
  if (norm.includes('raspberry') || norm.includes('iot')) {
    return { name: techName, icon: SiRaspberrypi, brandColor: '#c51a4a', shortLabel: 'Raspberry Pi' };
  }
  if (norm.includes('fastapi')) {
    return { name: techName, icon: SiFastapi, brandColor: '#009688', shortLabel: 'FastAPI' };
  }
  if (norm.includes('docker')) {
    return { name: techName, icon: SiDocker, brandColor: '#2496ed', shortLabel: 'Docker' };
  }
  if (norm.includes('nodemailer') || norm.includes('mailer')) {
    return { name: techName, icon: FaEnvelope, brandColor: '#f43f5e', shortLabel: 'NodeMailer' };
  }
  if (norm.includes('commander')) {
    return { name: techName, icon: FaTerminal, brandColor: '#38bdf8', shortLabel: 'Commander' };
  }
  if (norm.includes('inquirer')) {
    return { name: techName, icon: SiJavascript, brandColor: '#f7df1e', shortLabel: 'Inquirer' };
  }
  if (norm.includes('chalk') || norm.includes('npm')) {
    return { name: techName, icon: SiNpm, brandColor: '#cb3837', shortLabel: 'Chalk/NPM' };
  }
  if (norm.includes('shell')) {
    return { name: techName, icon: SiGnubash, brandColor: '#4eaa25', shortLabel: 'ShellJS' };
  }
  if (norm.includes('postgres')) {
    return { name: techName, icon: SiPostgresql, brandColor: '#4169e1', shortLabel: 'PostgreSQL' };
  }
  if (norm.includes('redis')) {
    return { name: techName, icon: SiRedis, brandColor: '#dc382d', shortLabel: 'Redis' };
  }
  if (norm.includes('vite')) {
    return { name: techName, icon: SiVite, brandColor: '#bd34fe', shortLabel: 'Vite' };
  }
  if (norm.includes('next')) {
    return { name: techName, icon: SiNextdotjs, brandColor: '#ffffff', shortLabel: 'Next.js' };
  }
  if (norm.includes('git')) {
    return { name: techName, icon: SiGit, brandColor: '#f05032', shortLabel: 'Git' };
  }

  // Generic clean fallback
  return { name: techName, icon: FaCodeBranch, brandColor: '#00f5ff', shortLabel: techName };
}

interface TechBadgeProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const TechLogoItem: React.FC<TechBadgeProps> = ({ name, size = 'md', showLabel = true }) => {
  const config = getTechIconConfig(name);
  const Icon = config.icon;

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5 sm:w-5.5 sm:h-5.5',
    lg: 'w-7 h-7',
  };

  const boxSizes = {
    sm: 'p-1.5',
    md: 'p-2 sm:p-2.5',
    lg: 'p-3',
  };

  return (
    <div className="group relative flex flex-col items-center gap-1.5 transition-all duration-200">
      {/* Icon frame with dark futuristic metallic styling & authentic brand glow on hover */}
      <div
        className={`relative flex items-center justify-center rounded-xl border border-slate-800/90 bg-slate-900/80 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-500/50 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_14px_rgba(0,245,255,0.3)] ${boxSizes[size]}`}
        style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Icon
          className={`${iconSizes[size]} transition-all duration-300 group-hover:drop-shadow-[0_0_8px_currentColor]`}
          style={{ color: config.brandColor }}
        />
      </div>

      {/* Small clean label underneath */}
      {showLabel && (
        <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-medium tracking-tight whitespace-nowrap group-hover:text-slate-200 transition-colors">
          {config.shortLabel}
        </span>
      )}
    </div>
  );
};
