import React, { useState } from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { DnaNodeType, DNA_NODES } from '../../../types/projectDna';
import { ProjectRealScreenshot } from '../gallery/ProjectRealScreenshot';
import { ProjectNavigation } from './ProjectNavigation';
import { DnaFocusedView } from './DnaFocusedView';
import {
  ExternalLink,
  Github,
  AlertCircle,
  Lightbulb,
  Layers,
  Cpu,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

interface TabletDnaViewProps {
  project: ProjectItem;
  allProjects?: ProjectItem[];
  onSelectProject?: (id: string) => void;
}

export const TabletDnaView: React.FC<TabletDnaViewProps> = ({
  project,
  allProjects,
  onSelectProject,
}) => {
  const [activeNode, setActiveNode] = useState<DnaNodeType | null>(null);

  const renderIcon = (type: DnaNodeType) => {
    switch (type) {
      case 'problem':
        return <AlertCircle className="w-3.5 h-3.5" />;
      case 'idea':
        return <Lightbulb className="w-3.5 h-3.5" />;
      case 'architecture':
        return <Layers className="w-3.5 h-3.5" />;
      case 'technology':
        return <Cpu className="w-3.5 h-3.5" />;
      case 'features':
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'impact':
        return <TrendingUp className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div
      id="tablet-dna-viewport"
      className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between items-center px-6 py-4 select-none"
    >
      {/* 1. Header Section & Project Navigation */}
      <div className="flex flex-col items-center text-center mt-2 mb-3">
        <div className="flex items-center gap-2 mb-1.5">
          <h1 className="text-2xl font-black tracking-wider text-white uppercase font-sans">
            PROJECT DNA
          </h1>
          <span className="text-slate-600 font-mono text-sm">•</span>
          <span className="text-xs font-mono tracking-widest text-cyan-400 font-semibold uppercase">
            EXPLORE HOW I BUILD
          </span>
        </div>

        <ProjectNavigation
          currentProject={project}
          allProjects={allProjects}
          onSelectProject={onSelectProject}
        />
      </div>

      {/* 2. Central Physical Artifact Frame */}
      <div className="w-full max-w-[620px] flex flex-col items-center my-auto">
        <div className="text-center mb-2.5">
          <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
            {project.type}
          </div>
          <h2 className="text-2xl font-black text-white">{project.title}</h2>
          <p className="text-xs text-slate-300 italic max-w-md mt-0.5">
            &ldquo;{project.tagline}&rdquo;
          </p>
        </div>

        {/* Physical 3D Display Frame */}
        <div
          className="relative w-full rounded-2xl bg-[#090f1d] border border-slate-700/80 p-2 shadow-[0_24px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,245,255,0.12)]"
          style={{
            transform: 'perspective(1000px) rotateX(2.5deg)',
          }}
        >
          <div className="relative rounded-xl overflow-hidden border border-cyan-950/80 shadow-2xl">
            <ProjectRealScreenshot project={project} isHero={true} />

            {/* Specular Glare */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, rgba(0,245,255,0.03) 70%, transparent 100%)',
              }}
            />
          </div>
        </div>

        {/* Quick Action Links */}
        <div className="flex items-center gap-3 mt-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-mono transition-all"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>VIEW SOURCE</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-400/50 text-cyan-300 hover:text-white text-xs font-mono font-bold tracking-wider transition-all"
            >
              <span>LIVE DEMO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* 3. Ergonomic 6-Node DNA Grid for Tablet Touch Navigation */}
      <div className="w-full max-w-3xl grid grid-cols-3 gap-2.5 mt-4 mb-2">
        {DNA_NODES.map((node) => (
          <button
            key={node.type}
            type="button"
            onClick={() => setActiveNode(node.type)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#070c18]/90 border border-slate-800 hover:border-cyan-400 active:scale-95 transition-all text-left cursor-pointer shadow-md"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-[10px] shrink-0 border"
              style={{
                borderColor: node.color,
                backgroundColor: `${node.color}15`,
                color: node.color,
              }}
            >
              {node.number}
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white tracking-wider flex items-center gap-1">
                <span>{node.label}</span>
                <span className="text-slate-400 opacity-80">{renderIcon(node.type)}</span>
              </span>
              <span className="text-[9.5px] font-mono text-slate-400 truncate">
                {node.subtitle}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* 4. Interactive Focused View on Tablet */}
      {activeNode && (
        <DnaFocusedView
          project={project}
          activeNodeType={activeNode}
          onClose={() => setActiveNode(null)}
          onSelectNode={(type) => setActiveNode(type)}
        />
      )}
    </div>
  );
};
