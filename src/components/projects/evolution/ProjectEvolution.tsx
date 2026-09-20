import React, { useState } from 'react';
import { ProjectDimensionsBackground } from '../dimensions/ProjectDimensionsBackground';
import { PROJECTS_DATA, ProjectItem } from '../../../data/projectsData';
import { EvolutionHeader } from './EvolutionHeader';
import { EvolutionTimeline } from './EvolutionTimeline';
import { EvolutionStageId } from './evolutionTypes';
import { LeftVisualEvolution } from './LeftVisualEvolution';
import { CenterScreenshot } from './CenterScreenshot';
import { RightProjectInfo } from './RightProjectInfo';
import { ProjectSelector } from './ProjectSelector';
import { EvolutionStageDetails } from './EvolutionStageDetails';
import { ClosingStatement } from './ClosingStatement';

interface ProjectEvolutionProps {
  initialProjectId?: string;
}

export const ProjectEvolution: React.FC<ProjectEvolutionProps> = ({
  initialProjectId,
}) => {
  const projects = PROJECTS_DATA;
  const initialIndex = initialProjectId
    ? projects.findIndex((p) => p.id === initialProjectId)
    : 0;

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects[initialIndex >= 0 ? initialIndex : 0].id
  );
  const [activeStage, setActiveStage] = useState<EvolutionStageId>('idea');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentProjectIndex = projects.findIndex((p) => p.id === selectedProjectId);
  const currentProject: ProjectItem =
    projects[currentProjectIndex >= 0 ? currentProjectIndex : 0];

  const handleSelectProject = (projectId: string) => {
    if (projectId === selectedProjectId) return;

    // Smooth 700ms transition
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProjectId(projectId);
      setIsTransitioning(false);
    }, 350);
  };

  return (
    <ProjectDimensionsBackground qualityTier="HIGH">
      <div className="w-full min-h-screen text-slate-100 flex flex-col justify-between pb-12">
        {/* Top Header Section */}
        <EvolutionHeader />

        {/* Top Evolution Stage Timeline */}
        <EvolutionTimeline
          activeStage={activeStage}
          onSelectStage={setActiveStage}
          accentColor={currentProject.accentColor}
        />

        {/* Main Central Showcase Grid */}
        <main className="w-full max-w-7xl mx-auto px-4 my-4 z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Left Visual Evolution Column */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <LeftVisualEvolution
                project={currentProject}
                activeStage={activeStage}
                onSelectStage={setActiveStage}
              />
            </div>

            {/* Center & Info Combined Column */}
            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4 p-3.5 rounded-2xl bg-slate-950/70 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_35px_rgba(0,245,255,0.12)]">
              {/* Center Screenshot */}
              <div className="md:col-span-1 flex items-center justify-center">
                <CenterScreenshot
                  project={currentProject}
                  isTransitioning={isTransitioning}
                />
              </div>

              {/* Right Info Panel */}
              <div className="md:col-span-1 flex flex-col justify-between">
                <RightProjectInfo
                  project={currentProject}
                  currentIndex={currentProjectIndex}
                  totalProjects={projects.length}
                />
              </div>
            </div>

            {/* Far Right Project Directory Selector Column */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <ProjectSelector
                projects={projects}
                selectedProjectId={selectedProjectId}
                onSelectProject={handleSelectProject}
              />
            </div>
          </div>
        </main>

        {/* Active Stage Details Panel */}
        <EvolutionStageDetails
          project={currentProject}
          activeStage={activeStage}
        />

        {/* Bottom Closing Statement */}
        <ClosingStatement />
      </div>
    </ProjectDimensionsBackground>
  );
};

export default ProjectEvolution;
