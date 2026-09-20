import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ProjectItem } from '../../../data/projectsData';
import { isWebGLAvailable } from '../../../utils/webgl';
import { CosmicSpace3D } from '../3d/CosmicSpace3D';
import { ObservatoryUniverseCore } from './ObservatoryUniverseCore';
import { ObservatoryEnergyConduits } from './ObservatoryEnergyConduits';
import { ObservatoryProjectWorlds } from './ObservatoryProjectWorlds';
import { ObservatoryCameraRig } from './ObservatoryCameraRig';

interface ObservatoryStage3DProps {
  projects: ProjectItem[];
  selectedProject: ProjectItem;
  onSelectProject: (id: string) => void;
  isMobile?: boolean;
  isOverviewMode?: boolean;
  isTransitioning?: boolean;
  transitionPhase?: 'idle' | 'collapsing' | 'core-pulse' | 'expanding';
}

export const ObservatoryStage3D: React.FC<ObservatoryStage3DProps> = ({
  projects,
  selectedProject,
  onSelectProject,
  isMobile = false,
  isOverviewMode = false,
  isTransitioning = false,
  transitionPhase = 'idle',
}) => {
  const [webglSupported, setWebglSupported] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  if (!webglSupported || hasError) {
    return (
      <div className="w-full h-[280px] sm:h-[420px] md:h-[500px] flex flex-col items-center justify-center bg-[#020612] text-slate-400 p-6 text-center rounded-2xl border border-slate-800">
        <div className="text-cyan-400 font-bold font-mono tracking-widest text-sm mb-2">
          NANDHAKUMAR UNIVERSE // 3D CORE
        </div>
        <p className="text-xs font-mono max-w-sm">
          WebGL acceleration is recommended for real-time 3D universe exploration. Please enable hardware acceleration in your browser.
        </p>
      </div>
    );
  }

  const activeColor = selectedProject.themeColor || selectedProject.accentColor || '#00f5ff';

  return (
    <div
      id="observatory-stage-container"
      className="relative w-full h-[280px] xs:h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] max-h-[55vh] overflow-hidden select-none rounded-2xl sm:rounded-3xl border border-slate-800/60 shadow-[0_10px_40px_rgba(0,0,0,0.7)] bg-radial from-[#030d22] via-[#020612] to-[#010308]"
    >
      <Canvas
        camera={{
          position: [0, 0.25, isMobile ? 7.2 : 6.4],
          fov: isMobile ? 56 : 46,
        }}
        onError={() => setHasError(true)}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        {/* 1. CINEMATIC CAMERA CONTROLLER */}
        <ObservatoryCameraRig
          selectedProject={selectedProject}
          isMobile={isMobile}
          isOverviewMode={isOverviewMode}
        />

        {/* 2. SUBTLE AMBIENT COSMIC STARS */}
        <CosmicSpace3D />

        {/* 3. ATMOSPHERIC OBSERVATORY LIGHTING */}
        <ambientLight intensity={0.7} color="#05162e" />

        {/* Key Light */}
        <directionalLight
          position={[4, 5, 4]}
          intensity={1.6}
          color="#f0f9ff"
        />

        {/* Cyan Counter Rim Light */}
        <directionalLight
          position={[-4, 3, -3]}
          intensity={1.3}
          color="#00f5ff"
        />

        {/* Uplight from Universe Core */}
        <pointLight
          position={[0, 0.25, 1]}
          intensity={1.0}
          distance={7}
          color={activeColor}
        />

        {/* 4. CENTRAL NU UNIVERSE CORE */}
        <ObservatoryUniverseCore
          position={[0, 0.25, -0.2]}
          activeColor={activeColor}
          isMobile={isMobile}
          isPulseTriggered={transitionPhase === 'core-pulse'}
        />

        {/* 5. SUBTLE CURVED CONDUITS WITH TRAVELING PHOTONS */}
        <ObservatoryEnergyConduits
          projects={projects}
          selectedProjectId={selectedProject.id}
          corePosition={[0, 0.25, -0.2]}
          transitionPhase={transitionPhase}
        />

        {/* 6. THE FIVE PROJECT WORLDS */}
        <ObservatoryProjectWorlds
          projects={projects}
          selectedProjectId={selectedProject.id}
          onSelectProject={onSelectProject}
          isMobile={isMobile}
        />
      </Canvas>

      {/* Decorative Observatory Crosshairs Corner Brackets */}
      <div className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-l border-t border-cyan-400/40" />
      <div className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-r border-t border-cyan-400/40" />
      <div className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-l border-b border-cyan-400/40" />
      <div className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-r border-b border-cyan-400/40" />
    </div>
  );
};
