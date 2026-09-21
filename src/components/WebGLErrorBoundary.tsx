import React, { Component, ErrorInfo, ReactNode } from 'react';

interface WebGLErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class WebGLErrorBoundary extends Component<WebGLErrorBoundaryProps, WebGLErrorBoundaryState> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): WebGLErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.warn(
      `[WebGLErrorBoundary] Caught WebGL/Rendering error in ${this.props.name || 'Component'}:`,
      error,
      errorInfo
    );
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) {
        return this.props.fallback;
      }
      return <WebGLCosmicFallback />;
    }

    return this.props.children;
  }
}

/**
 * Visual fallback with dark cosmic background, subtle CSS star particles,
 * and cyan glow when WebGL is unavailable or fails.
 */
export const WebGLCosmicFallback: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full h-full min-h-[220px] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#030712]/90 via-[#020617]/80 to-[#020208]/95 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Cyan Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.12)_0%,rgba(2,6,23,0)_70%)] animate-pulse" />

      {/* Subtle Star Particles (CSS-only) */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute w-1 h-1 rounded-full bg-cyan-300 shadow-[0_0_8px_#00f5ff] top-[20%] left-[25%] animate-ping"
          style={{ animationDuration: '3s' }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_#38bdf8] top-[60%] left-[70%] animate-pulse"
          style={{ animationDuration: '2.5s' }}
        />
        <div
          className="absolute w-1 h-1 rounded-full bg-teal-200 shadow-[0_0_6px_#5eead4] top-[35%] left-[80%] animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div
          className="absolute w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] top-[75%] left-[30%] animate-ping"
          style={{ animationDuration: '3.5s' }}
        />
      </div>

      {/* Subtle Structural Framing Ring */}
      <div className="relative w-28 h-28 rounded-full border border-cyan-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        <div className="w-20 h-20 rounded-full border border-cyan-400/30 flex items-center justify-center animate-spin" style={{ animationDuration: '20s' }}>
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f5ff]" />
        </div>
      </div>
    </div>
  );
};
