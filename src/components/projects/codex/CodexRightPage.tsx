import React from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { PROJECT_ASSETS } from '../cube/projectAssets';
import { Maximize2 } from 'lucide-react';

interface CodexRightPageProps {
  project: ProjectItem;
  onExpandScreenshot?: () => void;
}

export const CodexRightPage: React.FC<CodexRightPageProps> = ({
  project,
  onExpandScreenshot,
}) => {
  const asset = PROJECT_ASSETS[project.id] || PROJECT_ASSETS['speed-taxi'];
  const screenshotUrl = asset?.dataUrl || project.image || project.screenshot;

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 md:p-8 select-none relative">
      {/* Clean Dark Obsidian Glass Presentation Frame */}
      <div className="relative w-full h-full max-h-[520px] flex items-center justify-center rounded-2xl bg-[#020a18]/90 border border-cyan-500/30 p-3 sm:p-4 shadow-[0_0_35px_rgba(0,245,255,0.12)] backdrop-blur-md overflow-hidden group">
        
        {/* Four Subtle Corner Accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/80 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/80 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80 rounded-br-sm pointer-events-none" />

        {/* Subtle Top Status Line */}
        <div className="absolute top-2.5 left-8 right-8 flex items-center justify-between text-[10px] font-mono text-cyan-400/60 uppercase pointer-events-none">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
            ACTUAL PROJECT PREVIEW
          </span>
          <span className="tracking-widest">{project.shortName}</span>
        </div>

        {/* Actual Project Screenshot - Sharp, Flat, Undistorted, Original Aspect Ratio */}
        <div className="relative w-full h-full flex items-center justify-center pt-5 pb-1">
          <img
            src={screenshotUrl}
            alt={`${project.title} Actual Screenshot`}
            className="w-full h-full object-contain rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
            loading="eager"
          />
        </div>

        {/* Subtle Hover Action Overlay */}
        {onExpandScreenshot && (
          <button
            onClick={onExpandScreenshot}
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-400/50 text-cyan-300 text-[11px] font-mono flex items-center gap-1.5 shadow-lg hover:bg-cyan-950"
            title="View Full Resolution Screenshot"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>FULLSCREEN</span>
          </button>
        )}
      </div>
    </div>
  );
};
