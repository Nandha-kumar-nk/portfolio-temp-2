import React, { useState } from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { Studio3DCanvas } from './Studio3DCanvas';
import { StudioBackgroundElements } from './StudioBackgroundElements';
import { ProjectLaptopHero } from './ProjectLaptopHero';
import { ProjectSideInfo } from './ProjectSideInfo';
import { ProjectStations, StationType } from './ProjectStations';
import { StageExploreModal } from './StageExploreModal';

interface DesktopStudioViewProps {
  project: ProjectItem;
  className?: string;
  onPrevProject?: () => void;
  onNextProject?: () => void;
}

export const DesktopStudioView: React.FC<DesktopStudioViewProps> = ({
  project,
  className = '',
  onPrevProject,
  onNextProject,
}) => {
  const [activeStation, setActiveStation] = useState<StationType | null>(null);

  return (
    <div
      id="desktop-innovation-studio"
      className={`relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden select-none pb-8 ${className}`}
    >
      {/* 1. Real-time 3D Three.js Studio Scene (Globe, Drone, Books, Particles) */}
      <Studio3DCanvas />

      {/* 2. Studio Environmental Background Elements (Character, Quote, Holograms, Monologue) */}
      <StudioBackgroundElements />

      {/* 3. Center Top Main Headline (Matching reference visual) */}
      <div className="relative z-20 pt-2 sm:pt-4 text-center flex flex-col items-center select-none">
        {/* Tracked-out small cyan category label */}
        <div className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-cyan-400 font-bold uppercase mb-1">
          &bull; P R O J E C T S &bull;
        </div>

        {/* Big Hero Title: FROM IDEA TO REALITY */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase font-sans">
          FROM <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(0,245,255,0.7)]">IDEA</span> TO{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(192,132,252,0.6)]">
            REALITY
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-sans font-medium text-slate-300/90 tracking-wide mt-1">
          Real problems. Thoughtful solutions. Working products.
        </p>
      </div>

      {/* 4. Center Stage (Central Floating Laptop Hero + Right Info Panel) */}
      <div className="relative z-20 max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left spacing to accommodate the standing developer character */}
        <div className="hidden lg:block lg:col-span-2 xl:col-span-2" />

        {/* Center Hero: Floating 3D Laptop Display */}
        <div className="lg:col-span-6 xl:col-span-6 flex justify-center">
          <ProjectLaptopHero />
        </div>

        {/* Right Flank: Project Specifications & Info Card */}
        <div className="lg:col-span-4 xl:col-span-4 flex justify-center lg:justify-end">
          <ProjectSideInfo
            project={project}
            onPrevProject={onPrevProject}
            onNextProject={onNextProject}
            className="w-full max-w-md"
          />
        </div>
      </div>

      {/* 5. Bottom Horizon: The 5 Physical Pedestal Stations */}
      <div className="relative z-20 w-full mt-4 sm:mt-6 mb-6">
        <ProjectStations
          activeStation={activeStation}
          onSelectStation={(type) => setActiveStation(type)}
        />
      </div>

      {/* 6. In-Depth Interactive Stage Explore Modal */}
      {activeStation && (
        <StageExploreModal
          activeStation={activeStation}
          onClose={() => setActiveStation(null)}
          onSelectStation={(type) => setActiveStation(type)}
        />
      )}
    </div>
  );
};
