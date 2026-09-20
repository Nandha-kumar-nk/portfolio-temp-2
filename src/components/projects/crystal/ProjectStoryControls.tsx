import React, { useState } from 'react';
import { ProjectItem } from '../../../data/projectsData';
import { AlertCircle, Lightbulb, Cpu, Hammer, Trophy, X } from 'lucide-react';

interface ProjectStoryControlsProps {
  project: ProjectItem;
  accentColor: string;
}

type StoryTab = 'PROBLEM' | 'IDEA' | 'SYSTEM' | 'BUILD' | 'RESULT';

export const ProjectStoryControls: React.FC<ProjectStoryControlsProps> = ({
  project,
  accentColor,
}) => {
  const [activeTab, setActiveTab] = useState<StoryTab | null>(null);

  const tabs: Array<{ id: StoryTab; label: string; icon: React.ReactNode }> = [
    { id: 'PROBLEM', label: 'PROBLEM', icon: <AlertCircle className="w-3 h-3" /> },
    { id: 'IDEA', label: 'IDEA', icon: <Lightbulb className="w-3 h-3" /> },
    { id: 'SYSTEM', label: 'SYSTEM', icon: <Cpu className="w-3 h-3" /> },
    { id: 'BUILD', label: 'BUILD', icon: <Hammer className="w-3 h-3" /> },
    { id: 'RESULT', label: 'RESULT', icon: <Trophy className="w-3 h-3" /> },
  ];

  const getTabContent = (tab: StoryTab) => {
    switch (tab) {
      case 'PROBLEM':
        return {
          title: 'THE CORE CHALLENGE',
          text: project.problem || project.description,
          detail: 'Analyzing friction points, latency bottlenecks, and real-world system inefficiencies.',
        };
      case 'IDEA':
        return {
          title: 'THE ARCHITECTURAL VISION',
          text: project.idea || project.tagline,
          detail: 'Designing an algorithmic, resilient, and human-centered engineering approach.',
        };
      case 'SYSTEM':
        return {
          title: 'SUBSYSTEM ARCHITECTURE',
          text: project.solution || (project.architectureSteps ? project.architectureSteps.map((s) => `${s.layer}: ${s.role}`).join(' • ') : 'Modular component hierarchy and decoupled backend microservices.'),
          detail: project.architectureSteps
            ? `${project.architectureSteps.length} modular layers orchestrated with low-latency transport.`
            : 'Distributed data synchronization and RESTful API endpoints.',
        };
      case 'BUILD':
        return {
          title: 'ENGINEERING & TOOLCHAIN',
          text: project.build || project.techStack.map((t) => t.name).join(', '),
          detail: 'Engineered with modern TypeScript, reactive client-side state, and cloud deployment.',
        };
      case 'RESULT':
        return {
          title: 'MEASURABLE OUTCOME & IMPACT',
          text: project.result || project.impact || 'Delivered a robust, high-performance production system.',
          detail: 'Battle-tested across multiple browsers and responsive viewports.',
        };
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl px-4 pointer-events-auto">
      {/* 1. Five Compact Segment Pills */}
      <div className="flex items-center justify-center flex-wrap gap-1.5 p-1 rounded-full bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(isActive ? null : tab.id)}
              className={`min-h-[34px] px-3 sm:px-3.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-cyan-950/90 text-white border border-cyan-400 shadow-[0_0_12px_rgba(0,245,255,0.45)]'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-900/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Sleek Compact Narrative Story Modal / Capsule */}
      {activeTab && (
        <div className="relative mt-3 w-full p-4 rounded-2xl bg-[#090e1a]/95 border border-cyan-500/40 backdrop-blur-2xl shadow-[0_12px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(0,245,255,0.15)] animate-in fade-in slide-in-from-bottom-2 duration-300 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                {getTabContent(activeTab).title}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab(null)}
              className="w-6 h-6 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-medium">
            {getTabContent(activeTab).text}
          </p>

          <p className="text-[10px] sm:text-[11px] font-mono text-cyan-300/80 mt-2">
            // {getTabContent(activeTab).detail}
          </p>
        </div>
      )}
    </div>
  );
};
