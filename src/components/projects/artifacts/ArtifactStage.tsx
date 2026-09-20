import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectArtifactRenderer, ArtifactVisualType } from './ProjectArtifactRenderer';
import { ArtifactEnvironment } from './ArtifactEnvironment';
import { BurstParticles } from './BurstParticles';

interface ArtifactStageProps {
  currentVisualType: ArtifactVisualType;
  outgoingVisualType: ArtifactVisualType | null;
  phase: 'idle' | 'pulse' | 'burst' | 'forming';
  transitionProgress: number; // 0 to 1 during transition
  direction: number; // 1: next, -1: prev
  accentColor?: string;
  mousePos: { x: number; y: number };
}

// Scene inner camera and parallax controller
const CameraAndLighting: React.FC<{
  mousePos: { x: number; y: number };
  glowPulse: number;
  accentColor: string;
}> = ({ mousePos, glowPulse, accentColor }) => {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    // Subtle mouse parallax (smooth damping)
    const targetX = mousePos.x * 0.9;
    const targetY = 0.3 + mousePos.y * 0.6;

    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0.1, 0);

    if (lightRef.current) {
      lightRef.current.intensity = 2.5 + glowPulse * 6;
    }
  });

  return (
    <>
      <ambientLight intensity={0.65} color="#0a192f" />
      {/* Soft key light */}
      <directionalLight position={[4, 7, 5]} intensity={1.8} color="#e0f2fe" />
      {/* Cyan Rim light */}
      <directionalLight position={[-6, 3, -4]} intensity={2.2} color="#00f5ff" />
      {/* Violet back fill */}
      <directionalLight position={[0, -2, -6]} intensity={1.4} color="#8b5cf6" />
      {/* Dynamic central pulse point light */}
      <pointLight ref={lightRef} position={[0, 0.5, 1.2]} color={accentColor} intensity={2.5} distance={10} />
    </>
  );
};

// Generates procedural texture snapshot for the subtle supporting screen
function useSwayamTexture() {
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 1024, 640);

    // Header bar
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 1024, 72);

    // Brand logo
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(48, 36, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText('SWAYAM 2.0', 80, 44);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText('• ACADEMIC CLOUD', 250, 44);

    // Nav pills
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.roundRect(840, 20, 140, 36, 18);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText('ENTER CAMPUS', 855, 43);

    // Hero banner in screen
    ctx.fillStyle = '#021e3d';
    ctx.beginPath();
    ctx.roundRect(48, 100, 928, 260, 16);
    ctx.fill();

    // Subtle gradient in hero
    const grad = ctx.createLinearGradient(48, 100, 976, 360);
    grad.addColorStop(0, 'rgba(0, 245, 255, 0.15)');
    grad.addColorStop(1, 'rgba(139, 92, 246, 0.15)');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('ONLINE COURSE REPOSITORY & NOTIFICATIONS', 80, 140);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 36px Inter, sans-serif';
    ctx.fillText('Learn Without Limits.', 80, 190);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px Inter, sans-serif';
    ctx.fillText('Automated assignment reminders & real-time WebSocket communication.', 80, 230);

    // Course modules cards preview inside screen
    for (let i = 0; i < 3; i++) {
      const x = 48 + i * 315;
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(x, 390, 295, 200, 12);
      ctx.fill();

      ctx.fillStyle = '#0284c7';
      ctx.fillRect(x + 20, 410, 80, 12);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.fillText(`CS Module ${i + 1}`, x + 20, 450);

      ctx.fillStyle = '#64748b';
      ctx.font = '13px Inter, sans-serif';
      ctx.fillText('Live Interactive Lab + Syllabus', x + 20, 480);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

export const ArtifactStage: React.FC<ArtifactStageProps> = ({
  currentVisualType,
  outgoingVisualType,
  phase,
  transitionProgress,
  direction,
  accentColor = '#00f5ff',
  mousePos,
}) => {
  const swayamTexture = useSwayamTexture();

  // Calculate glow pulse intensity
  const glowPulse = useMemo(() => {
    if (phase === 'pulse') {
      return 1.0;
    }
    if (phase === 'burst') {
      return Math.max(0, 1 - transitionProgress * 1.2);
    }
    return 0;
  }, [phase, transitionProgress]);

  // Determine which artifact to render and how
  const isTransitioning = phase === 'burst' || phase === 'forming';

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.3, 5.2], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        dpr={[1, 2]}
      >
        <CameraAndLighting
          mousePos={mousePos}
          glowPulse={glowPulse}
          accentColor={accentColor}
        />

        {/* 3D Dark Environment Floor & Concentric Platform */}
        <ArtifactEnvironment accentColor={accentColor} glowPulse={glowPulse} />

        {/* Artifact Rendering */}
        {/* If outgoing artifact is dissolving during burst */}
        {outgoingVisualType && phase === 'burst' && (
          <ProjectArtifactRenderer
            visualType={outgoingVisualType}
            transitionProgress={transitionProgress}
            burstDirection={direction}
            accentColor={accentColor}
            screenshotTexture={outgoingVisualType === 'knowledge' ? swayamTexture : null}
          />
        )}

        {/* Incoming artifact forming or idle */}
        {(!outgoingVisualType || phase === 'forming' || phase === 'idle' || phase === 'pulse') && (
          <ProjectArtifactRenderer
            visualType={currentVisualType}
            transitionProgress={phase === 'forming' ? 1 - transitionProgress : 0}
            burstDirection={-direction}
            accentColor={accentColor}
            screenshotTexture={currentVisualType === 'knowledge' ? swayamTexture : null}
          />
        )}

        {/* Transition Burst Particle Explosion */}
        <BurstParticles
          progress={isTransitioning ? transitionProgress : 0}
          direction={direction}
        />
      </Canvas>
    </div>
  );
};
