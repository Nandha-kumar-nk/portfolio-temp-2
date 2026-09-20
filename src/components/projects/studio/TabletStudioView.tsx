import React, { useState } from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectLaptopHero } from './ProjectLaptopHero';
import { ProjectSideInfo } from './ProjectSideInfo';
import { ProjectStations, StationType } from './ProjectStations';
import { StageExploreModal } from './StageExploreModal';

interface TabletStudioViewProps {
  project: ProjectItem;
  className?: string;
  onPrevProject?: () => void;
  onNextProject?: () => void;
}

export const TabletStudioView: React.FC<TabletStudioViewProps> = ({
  project,
  className = '',
  onPrevProject,
  onNextProject,
}) => {
  const [activeStation, setActiveStation] = useState<StationType | null>(null);

  return (
    <div
      id="tablet-innovation-studio"
      className={`relative w-full min-h-screen px-6 py-6 flex flex-col justify-between select-none ${className}`}
    >
      {/* 1. Tablet Header Title */}
      <div className="text-center space-y-1">
        <div className="text-xs font-mono tracking-[0.3em] text-cyan-400 font-bold uppercase">
          &bull; P R O J E C T S &bull;
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white uppercase font-sans">
          FROM <span className="text-cyan-400">IDEA</span> TO{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            REALITY
          </span>
        </h1>
        <p className="text-xs font-medium text-slate-300">
          Real problems. Thoughtful solutions. Working products.
        </p>
      </div>

      {/* 2. Middle Section: Central Laptop Display & Side Info */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 flex justify-center">
          <ProjectLaptopHero className="scale-95" />
        </div>
        <div className="md:col-span-5 flex justify-center">
          <ProjectSideInfo
            project={project}
            onPrevProject={onPrevProject}
            onNextProject={onNextProject}
            className="w-full"
          />
        </div>
      </div>

      {/* 3. Bottom Stations */}
      <div className="mt-4 mb-4">
        <ProjectStations
          activeStation={activeStation}
          onSelectStation={setActiveStation}
        />
      </div>

      {/* Modal */}
      {activeStation && (
        <StageExploreModal
          activeStation={activeStation}
          onClose={() => setActiveStation(null)}
          onSelectStation={setActiveStation}
        />
      )}
    </div>
  );
};
