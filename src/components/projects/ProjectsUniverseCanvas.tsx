import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { isWebGLAvailable } from '../../utils/webgl';
import { ProjectsUniverse3D } from './3d/ProjectsUniverse3D';
import { ProjectItem, ProjectCategory } from '../../types';

interface ProjectsUniverseCanvasProps {
  projects: ProjectItem[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  selectedCategory: ProjectCategory;
  isMobile?: boolean;
  isTablet?: boolean;
  onReturnHome?: () => void;
}

export const ProjectsUniverseCanvas: React.FC<ProjectsUniverseCanvasProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  selectedCategory,
  isMobile = false,
  isTablet = false,
}) => {
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden bg-[#020206]">
      {/* 3D WebGL Canvas Universe */}
      {webglSupported && !hasWebGLError ? (
        <Canvas
          camera={{ position: [0, 0.4, isMobile ? 7.2 : 6.6], fov: isMobile ? 50 : 45 }}
          onError={() => setHasWebGLError(true)}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full"
        >
          <ProjectsUniverse3D
            projects={projects}
            selectedProjectId={selectedProjectId}
            onSelectProject={onSelectProject}
            selectedCategory={selectedCategory}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </Canvas>
      ) : (
        /* Fallback if WebGL disabled */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-400">
          <div className="text-cyan-400 font-bold text-lg mb-2 tracking-widest font-mono">
            3D PROJECT SHOWCASE BAY
          </div>
          <p className="text-xs font-mono max-w-md">
            WebGL acceleration is unavailable. Please enable hardware acceleration in your browser settings.
          </p>
        </div>
      )}
    </div>
  );
};
