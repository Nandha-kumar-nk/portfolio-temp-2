import React, { useEffect, useRef } from 'react';

interface CubeArchiveChamberBackgroundProps {
  accentColor?: string;
  isMobile?: boolean;
}

export const CubeArchiveChamberBackground: React.FC<CubeArchiveChamberBackgroundProps> = ({
  accentColor = '#00f5ff',
  isMobile = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Floating ambient atmospheric motes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const count = isMobile ? 35 : 75;
    const motes = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -Math.random() * 0.22 - 0.05,
      alpha: Math.random() * 0.35 + 0.12,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.vx;
        m.y += m.vy;

        if (m.y < 0) {
          m.y = height;
          m.x = Math.random() * width;
        }
        if (m.x < 0) m.x = width;
        if (m.x > width) m.x = 0;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 243, 252, ${m.alpha})`;
        ctx.shadowColor = '#00f5ff';
        ctx.shadowBlur = 4;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isMobile]);

  return (
    <div
      id="cube-archive-chamber-background"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. Exact Specified Linear Gradient: Top #020712 -> Mid #061525 -> Bottom #02040B */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #020712 0%, #061525 50%, #02040B 100%)',
        }}
      />

      {/* 2. Soft Radial Glow Behind the Cube (Requirement 15: Not brighter than cube) */}
      <div
        className="absolute top-[24%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] sm:w-[680px] h-[380px] sm:h-[460px] pointer-events-none opacity-40 blur-[90px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0, 245, 255, 0.16) 0%, rgba(14, 116, 144, 0.08) 45%, transparent 75%)',
        }}
      />

      {/* 3. Distant Architectural Vertical Light Structures (left & right sides) */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-48 pointer-events-none flex">
        <div className="w-12 sm:w-20 h-full bg-gradient-to-r from-[#01040a]/90 to-transparent border-r border-slate-800/40 relative">
          <div className="absolute top-[12%] bottom-[25%] right-2 w-[1.5px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-30 shadow-[0_0_8px_#00f5ff]" />
          <div className="absolute top-[28%] bottom-[45%] right-5 w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-20" />
        </div>
      </div>

      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-48 pointer-events-none flex justify-end">
        <div className="w-12 sm:w-20 h-full bg-gradient-to-l from-[#01040a]/90 to-transparent border-l border-slate-800/40 relative">
          <div className="absolute top-[12%] bottom-[25%] left-2 w-[1.5px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-30 shadow-[0_0_8px_#00f5ff]" />
          <div className="absolute top-[28%] bottom-[45%] left-5 w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-20" />
        </div>
      </div>

      {/* 4. Distant Architectural Horizon & Perspective Guide Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <line
          x1="0%"
          y1="54%"
          x2="100%"
          y2="54%"
          stroke="#0e2642"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <line
          x1="50%"
          y1="54%"
          x2="10%"
          y2="100%"
          stroke="#0b1b30"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <line
          x1="50%"
          y1="54%"
          x2="32%"
          y2="100%"
          stroke="#0d2442"
          strokeWidth="1"
          strokeOpacity="0.35"
        />
        <line
          x1="50%"
          y1="54%"
          x2="68%"
          y2="100%"
          stroke="#0d2442"
          strokeWidth="1"
          strokeOpacity="0.35"
        />
        <line
          x1="50%"
          y1="54%"
          x2="90%"
          y2="100%"
          stroke="#0b1b30"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
      </svg>

      {/* 5. Reflective Dark Floor (Subtle reflection, no bright mirror) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[38%] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(2, 4, 11, 0.95) 0%, rgba(6, 21, 37, 0.5) 60%, transparent 100%)',
        }}
      >
        {/* Soft Pedestal Reflection Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-20 rounded-full blur-2xl opacity-25"
          style={{
            background: `radial-gradient(ellipse, ${accentColor} 0%, transparent 70%)`,
          }}
        />
        {/* Subtle horizon line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 max-w-xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
      </div>

      {/* 6. Tiny Ambient Dust Motes Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};
