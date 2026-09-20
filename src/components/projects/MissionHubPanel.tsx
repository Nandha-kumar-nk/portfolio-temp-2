import React, { useState } from 'react';
import {
  Box,
  Monitor,
  BrainCircuit,
  Terminal,
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Filter,
} from 'lucide-react';
import { ProjectCategory } from '../../types';

interface MissionHubPanelProps {
  selectedCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
  projectCounts: Record<ProjectCategory, number>;
  variant?: 'desktop' | 'mobile-dropdown' | 'tablet-compact';
}

const CATEGORIES: {
  id: ProjectCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'all', label: 'ALL PROJECTS', icon: Box },
  { id: 'web', label: 'WEB APPLICATIONS', icon: Monitor },
  { id: 'ai', label: 'AI / ML', icon: BrainCircuit },
  { id: 'tools', label: 'DEVELOPER TOOLS', icon: Terminal },
  { id: 'other', label: 'OTHER PROJECTS', icon: LayoutGrid },
];

export const MissionHubPanel: React.FC<MissionHubPanelProps> = ({
  selectedCategory,
  onSelectCategory,
  projectCounts,
  variant = 'desktop',
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeCategoryObj =
    CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];
  const ActiveIcon = activeCategoryObj.icon;

  // --------------------------------------------------------------------------
  // MOBILE / TABLET COMPACT DROPDOWN
  // Compact filter control that never takes half the mobile screen
  // --------------------------------------------------------------------------
  if (variant === 'mobile-dropdown') {
    return (
      <div id="mobile-mission-hub-filter" className="relative w-full max-w-sm mx-auto z-40">
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-cyan-500/40 backdrop-blur-md flex items-center justify-between shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center">
              <ActiveIcon className="w-3.5 h-3.5 text-cyan-300" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-white tracking-wider">
                {activeCategoryObj.label}
              </span>
              <span className="ml-2 text-[10px] text-cyan-400 font-mono">
                ({projectCounts[selectedCategory] || 0})
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-cyan-400">
            <span className="text-[10px] uppercase tracking-wider font-mono">Filter</span>
            {dropdownOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </button>

        {dropdownOpen && (
          <div className="absolute top-13 left-0 right-0 rounded-xl bg-slate-950/95 border border-cyan-500/50 backdrop-blur-xl p-1.5 shadow-[0_8px_32px_rgba(0,245,255,0.25)] space-y-1 z-50">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              const count = projectCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full min-h-[44px] px-3 py-2 rounded-lg flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 border border-cyan-400 text-white shadow-[0_0_12px_rgba(0,245,255,0.3)]'
                      : 'text-slate-300 hover:bg-slate-900/80 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? 'text-cyan-300' : 'text-slate-400'
                      }`}
                    />
                    <span className="text-xs font-semibold tracking-wide">
                      {cat.label}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-cyan-400/30 text-cyan-200'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // TABLET HORIZONTAL PILL SELECTOR
  // --------------------------------------------------------------------------
  if (variant === 'tablet-compact') {
    return (
      <div
        id="tablet-mission-hub-pills"
        className="w-full flex items-center justify-center flex-wrap gap-2 py-1 px-4 z-20"
      >
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          const count = projectCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-xl flex items-center gap-2 transition-all border ${
                isSelected
                  ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,245,255,0.35)]'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-white'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  isSelected ? 'text-cyan-300' : 'text-slate-400'
                }`}
              />
              <span className="text-xs font-semibold tracking-wider">
                {cat.label}
              </span>
              <span className="text-[10px] font-mono text-cyan-400/80">
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // DESKTOP LEFT PANEL (280–340px)
  // Exact layout and aesthetics from the reference image
  // --------------------------------------------------------------------------
  return (
    <aside
      id="desktop-mission-hub-panel"
      className="w-[280px] xl:w-[320px] 2xl:w-[340px] rounded-2xl bg-slate-950/75 border border-cyan-500/40 backdrop-blur-xl p-5 xl:p-6 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_24px_rgba(0,245,255,0.15)] select-none z-30 transition-all duration-300"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-cyan-900/50 mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg xl:text-xl font-black text-white tracking-widest">
              PROJECTS
            </h2>
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff] animate-pulse" />
          </div>
          <span className="text-[10px] xl:text-[11px] font-bold text-cyan-400 tracking-wider font-mono">
            LIVING ATLAS
          </span>
        </div>

        {/* Narrative Description */}
        <p className="text-xs xl:text-[13px] text-slate-300 leading-relaxed font-normal mb-5">
          Each project is presented as an interactive living digital world, visualizing system architecture, real-time data flows, and design principles.
        </p>

        {/* Category Filter Buttons */}
        <div className="space-y-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = projectCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full min-h-[46px] px-3.5 py-2 rounded-xl flex items-center justify-between text-left transition-all duration-300 group border ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_18px_rgba(0,245,255,0.4)] translate-x-1'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-white hover:border-cyan-500/40 hover:bg-slate-900/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-500/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs xl:text-[13px] font-bold tracking-wider">
                    {cat.label}
                  </span>
                </div>

                <span
                  className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-cyan-400/20 text-cyan-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Mission Quote */}
      <div className="pt-5 border-t border-cyan-950/80 mt-4">
        <p className="text-xs text-cyan-300/90 italic leading-snug">
          “Build. Learn. Improve. Repeat — Turning ideas into impact.”
        </p>
      </div>
    </aside>
  );
};
