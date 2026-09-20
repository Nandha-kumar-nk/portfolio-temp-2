import React from 'react';
import { DnaNodeConfig, DnaNodeType } from '../../../types/projectDna';
import {
  Target,
  Lightbulb,
  Layers,
  Code,
  Sliders,
  TrendingUp,
} from 'lucide-react';

interface DnaNodeProps {
  config: DnaNodeConfig;
  customSummary?: string;
  isActive: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  onSelect: (type: DnaNodeType) => void;
  onHover: (type: DnaNodeType | null) => void;
  nodeRef: (el: HTMLDivElement | null) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const DnaNode: React.FC<DnaNodeProps> = ({
  config,
  customSummary,
  isActive,
  isHovered,
  isDimmed,
  onSelect,
  onHover,
  nodeRef,
  className = '',
  style,
}) => {
  // Map icon to node type matching the reference icons
  const renderIcon = () => {
    switch (config.type) {
      case 'problem':
        return <Target className="w-4 h-4 text-cyan-400" />;
      case 'idea':
        return <Lightbulb className="w-4 h-4 text-cyan-400" />;
      case 'architecture':
        return <Layers className="w-4 h-4 text-cyan-400" />;
      case 'technology':
        return <Code className="w-4 h-4 text-cyan-400" />;
      case 'features':
        return <Sliders className="w-4 h-4 text-cyan-400" />;
      case 'impact':
        return <TrendingUp className="w-4 h-4 text-cyan-400" />;
      default:
        return <Layers className="w-4 h-4 text-cyan-400" />;
    }
  };

  // Node label text formatted as "01 PROBLEM"
  const titleText = `${config.number} ${config.label}`;
  const displayText = customSummary || config.shortSummary;

  return (
    <div
      ref={nodeRef}
      id={`dna-node-${config.type}`}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(config.type)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(config.type);
        }
      }}
      onMouseEnter={() => onHover(config.type)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(config.type)}
      onBlur={() => onHover(null)}
      className={`group relative cursor-pointer outline-none transition-all duration-300 select-none max-w-[210px] xl:max-w-[240px] ${
        isDimmed ? 'opacity-30 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      } ${className}`}
      style={{
        ...style,
        transform: isActive ? 'scale(1.04)' : isHovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Soft Cyan Ambient Glow behind the card */}
      <div
        className={`absolute -inset-1 rounded-2xl blur-md transition-opacity duration-300 pointer-events-none ${
          isActive
            ? 'opacity-80'
            : isHovered
            ? 'opacity-50'
            : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(0, 245, 255, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Main Card Shell - Identical to approved reference image */}
      <div
        className={`relative flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border transition-all duration-300 backdrop-blur-xl shadow-lg ${
          isActive
            ? 'bg-[#091329]/95 border-cyan-400 shadow-[0_0_20px_rgba(0,245,255,0.4)]'
            : isHovered
            ? 'bg-[#080f20]/90 border-cyan-500/70 shadow-[0_0_15px_rgba(0,245,255,0.25)]'
            : 'bg-[#060b18]/85 border-cyan-500/35 hover:border-cyan-400/60'
        }`}
      >
        {/* Left: Circular Icon Container with glowing ring */}
        <div
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 shadow-sm ${
            isActive || isHovered
              ? 'bg-cyan-950/80 border-cyan-300 shadow-[0_0_10px_rgba(0,245,255,0.5)] scale-105'
              : 'bg-cyan-950/40 border-cyan-500/50'
          }`}
        >
          {renderIcon()}
        </div>

        {/* Right: Stage Title & Summary */}
        <div className="flex flex-col text-left leading-tight min-w-0">
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
            {titleText}
          </span>
          <span className="text-[10px] sm:text-[11px] text-slate-200 mt-0.5 line-clamp-2 leading-tight">
            {displayText}
          </span>
        </div>
      </div>
    </div>
  );
};
