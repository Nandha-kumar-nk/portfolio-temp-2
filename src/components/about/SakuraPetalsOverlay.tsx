import React, { useMemo } from 'react';

interface SakuraPetalsOverlayProps {
  prefersReducedMotion?: boolean;
}

interface PetalData {
  id: number;
  x: number; // %
  y: number; // %
  size: number;
  duration: number; // s
  delay: number; // s
  opacity: number;
}

interface ParticleData {
  id: number;
  x: number; // %
  y: number; // %
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function SakuraPetalsOverlay({ prefersReducedMotion = false }: SakuraPetalsOverlayProps) {
  if (prefersReducedMotion) return null;

  // Pre-calculate stable random positions for cherry blossom petals
  const petals: PetalData[] = useMemo(() => [
    { id: 1, x: 58, y: 22, size: 7, duration: 8.5, delay: 0.2, opacity: 0.75 },
    { id: 2, x: 66, y: 16, size: 6, duration: 10.0, delay: 1.8, opacity: 0.65 },
    { id: 3, x: 52, y: 38, size: 8, duration: 9.2, delay: 3.5, opacity: 0.8 },
    { id: 4, x: 74, y: 28, size: 5, duration: 11.5, delay: 0.9, opacity: 0.6 },
    { id: 5, x: 62, y: 48, size: 7, duration: 9.8, delay: 4.2, opacity: 0.7 },
    { id: 6, x: 78, y: 42, size: 6, duration: 8.9, delay: 2.7, opacity: 0.65 },
  ], []);

  // Subtle floating cyan holographic chamber micro-particles
  const cyanParticles: ParticleData[] = useMemo(() => [
    { id: 101, x: 45, y: 65, size: 3, duration: 6.5, delay: 0.1, opacity: 0.7 },
    { id: 102, x: 55, y: 75, size: 2, duration: 7.8, delay: 1.4, opacity: 0.6 },
    { id: 103, x: 48, y: 45, size: 2.5, duration: 8.2, delay: 2.5, opacity: 0.8 },
    { id: 104, x: 60, y: 55, size: 3, duration: 7.1, delay: 3.2, opacity: 0.65 },
    { id: 105, x: 38, y: 35, size: 2, duration: 9.0, delay: 0.7, opacity: 0.55 },
    { id: 106, x: 68, y: 70, size: 2.5, duration: 8.4, delay: 4.0, opacity: 0.75 },
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {/* Drifting Cherry Blossom Petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-petal"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg
            width={p.size * 2}
            height={p.size * 2.5}
            viewBox="0 0 16 20"
            style={{ opacity: p.opacity }}
          >
            <path
              d="M 8 0 C 14 4, 16 11, 10 18 C 8 20, 6 18, 4 15 C 0 10, 2 4, 8 0 Z"
              fill="#fda4af"
              opacity="0.85"
            />
            <path
              d="M 8 2 C 12 5, 13 10, 9 15 C 8 16, 7 15, 6 13 C 3 9, 4 5, 8 2 Z"
              fill="#fbcfe8"
              opacity="0.5"
            />
          </svg>
        </div>
      ))}

      {/* Floating Luminous Cyan Energy Micro-Particles */}
      {cyanParticles.map((pt) => (
        <div
          key={pt.id}
          className="absolute rounded-full bg-cyan-300 animate-pulse"
          style={{
            left: `${pt.x}%`,
            top: `${pt.y}%`,
            width: `${pt.size}px`,
            height: `${pt.size}px`,
            opacity: pt.opacity,
            boxShadow: '0 0 8px #22d3ee, 0 0 14px #06b6d4',
            transition: 'transform 8s ease-in-out',
            transform: 'translateY(-15px)',
          }}
        />
      ))}
    </div>
  );
}
