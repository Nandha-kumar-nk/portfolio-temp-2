import React, { useEffect, useState, useCallback, useRef } from 'react';
import { DnaNodeType, DNA_NODES } from '../../../types/projectDna';

interface ProjectDnaLinesProps {
  activeNode: DnaNodeType | null;
  hoveredNode: DnaNodeType | null;
  containerRef: React.RefObject<HTMLDivElement>;
  coreRef: React.RefObject<HTMLDivElement>;
  nodeRefs: React.MutableRefObject<Record<DnaNodeType, HTMLDivElement | null>>;
  anchorPortRefs?: React.MutableRefObject<Record<DnaNodeType, HTMLDivElement | null>>;
}

interface ConnectionPath {
  type: DnaNodeType;
  d: string;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  color: string;
}

export const ProjectDnaLines: React.FC<ProjectDnaLinesProps> = ({
  activeNode,
  hoveredNode,
  containerRef,
  coreRef,
  nodeRefs,
  anchorPortRefs,
}) => {
  const [paths, setPaths] = useState<ConnectionPath[]>([]);
  const animOffsetRef = useRef<number>(0);
  const [animTrigger, setAnimTrigger] = useState<number>(0);

  // Recalculate SVG organic paths whenever elements move or resize
  const updatePaths = useCallback(() => {
    if (!containerRef.current || !coreRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const coreRect = coreRef.current.getBoundingClientRect();

    if (containerRect.width === 0 || containerRect.height === 0) return;

    const newPaths: ConnectionPath[] = [];

    DNA_NODES.forEach((nodeConfig) => {
      const nodeEl = nodeRefs.current[nodeConfig.type];
      if (!nodeEl) return;
      const nodeRect = nodeEl.getBoundingClientRect();

      // Start point: Center or edge of the floating node
      const isLeft = nodeConfig.side === 'left';
      const startX = isLeft
        ? nodeRect.right - containerRect.left
        : nodeRect.left - containerRect.left;
      const startY = nodeRect.top + nodeRect.height / 2 - containerRect.top;

      // End point: Physical anchor port on the central display frame
      let endX: number;
      let endY: number;

      const portEl = anchorPortRefs?.current?.[nodeConfig.type];
      if (portEl) {
        const portRect = portEl.getBoundingClientRect();
        endX = portRect.left + portRect.width / 2 - containerRect.left;
        endY = portRect.top + portRect.height / 2 - containerRect.top;
      } else {
        // Fallback to core boundary
        endX = isLeft
          ? coreRect.left - containerRect.left
          : coreRect.right - containerRect.left;
        const coreRelY = nodeRect.top + nodeRect.height / 2 - coreRect.top;
        const clampedY = Math.max(20, Math.min(coreRect.height - 20, coreRelY));
        endY = coreRect.top + clampedY - containerRect.top;
      }

      // Organic Bezier Curve Control Points
      const dx = Math.abs(endX - startX) * 0.52;
      const dy = endY - startY;

      // Natural organic curve with subtle vertical bend
      const cp1X = isLeft ? startX + dx : startX - dx;
      const cp1Y = startY + dy * 0.15;
      const cp2X = isLeft ? endX - dx * 0.6 : endX + dx * 0.6;
      const cp2Y = endY - dy * 0.15;

      const d = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;

      newPaths.push({
        type: nodeConfig.type,
        d,
        startPoint: { x: startX, y: startY },
        endPoint: { x: endX, y: endY },
        color: nodeConfig.color,
      });
    });

    setPaths(newPaths);
  }, [containerRef, coreRef, nodeRefs, anchorPortRefs]);

  useEffect(() => {
    updatePaths();
    window.addEventListener('resize', updatePaths);
    const timer = setTimeout(updatePaths, 200);
    return () => {
      window.removeEventListener('resize', updatePaths);
      clearTimeout(timer);
    };
  }, [updatePaths]);

  // Subtle continuous flow loop for travelling particles
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      animOffsetRef.current = (animOffsetRef.current + 0.4) % 100;
      setAnimTrigger((prev) => (prev + 1) % 1000);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <svg
      id="dna-network-svg"
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
    >
      <defs>
        {paths.map((p) => (
          <linearGradient
            key={`grad-${p.type}`}
            id={`grad-${p.type}`}
            x1={p.startPoint.x}
            y1={p.startPoint.y}
            x2={p.endPoint.x}
            y2={p.endPoint.y}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={p.color} stopOpacity="0.8" />
            <stop offset="60%" stopColor={p.color} stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00f5ff" stopOpacity="0.9" />
          </linearGradient>
        ))}

        {/* Glow filter for active/hovered curves */}
        <filter id="dna-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {paths.map((path) => {
        const isHighlighted = hoveredNode === path.type || activeNode === path.type;
        const isDimmed =
          (activeNode !== null && activeNode !== path.type) ||
          (hoveredNode !== null && hoveredNode !== path.type && activeNode === null);

        return (
          <g key={path.type} className="transition-opacity duration-300">
            {/* 1. Subtle Outer Ambient Glow Track */}
            {isHighlighted && (
              <path
                d={path.d}
                fill="none"
                stroke={path.color}
                strokeWidth="6"
                strokeOpacity="0.3"
                filter="url(#dna-glow)"
              />
            )}

            {/* 2. Base Organic Neural Connection Line */}
            <path
              d={path.d}
              fill="none"
              stroke={isHighlighted ? `url(#grad-${path.type})` : path.color}
              strokeWidth={isHighlighted ? '2.5' : '1.2'}
              strokeOpacity={isHighlighted ? '0.95' : isDimmed ? '0.12' : '0.35'}
              strokeDasharray={isHighlighted ? 'none' : '4 4'}
              className="transition-all duration-300"
            />

            {/* 3. Living Energy Pulse Stream traveling toward central core */}
            {!isDimmed && (
              <path
                d={path.d}
                fill="none"
                stroke={isHighlighted ? '#ffffff' : path.color}
                strokeWidth={isHighlighted ? '3' : '2'}
                strokeOpacity={isHighlighted ? '0.9' : '0.6'}
                strokeDasharray="8 32"
                strokeDashoffset={-animOffsetRef.current * (isHighlighted ? 2.2 : 1.2)}
                filter={isHighlighted ? 'url(#dna-glow)' : undefined}
              />
            )}

            {/* 4. Terminal Sparkle at connection ports */}
            {isHighlighted && (
              <circle
                cx={path.endPoint.x}
                cy={path.endPoint.y}
                r="3.5"
                fill="#ffffff"
                filter="url(#dna-glow)"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};
