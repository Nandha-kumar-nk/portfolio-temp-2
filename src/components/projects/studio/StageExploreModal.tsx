import React from 'react';
import { X, CheckCircle, ArrowRight, Layers, Code, Sparkles, AlertCircle, BarChart3 } from 'lucide-react';
import { STATIONS_CONFIG, StationType } from './ProjectStations';

interface StageExploreModalProps {
  activeStation: StationType;
  onClose: () => void;
  onSelectStation: (type: StationType) => void;
}

export const StageExploreModal: React.FC<StageExploreModalProps> = ({
  activeStation,
  onClose,
  onSelectStation,
}) => {
  const currentStage = STATIONS_CONFIG.find((s) => s.type === activeStation) || STATIONS_CONFIG[0];

  const getStageIcon = (type: StationType) => {
    switch (type) {
      case 'problem':
        return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case 'idea':
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'system':
        return <Layers className="w-5 h-5 text-sky-400" />;
      case 'build':
        return <Code className="w-5 h-5 text-cyan-400" />;
      case 'result':
        return <BarChart3 className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div
      id="stage-explore-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        id="stage-explore-modal-content"
        className="relative w-full max-w-2xl rounded-2xl bg-[#060c18] border border-cyan-400/60 p-5 sm:p-7 shadow-[0_20px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(0,245,255,0.25)] flex flex-col gap-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Light */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-500" />

        {/* Header bar with navigation tabs */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center">
              {getStageIcon(currentStage.type)}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                STAGE {currentStage.number} // SWAYAM 2.0
              </span>
              <span className="text-lg font-black text-white tracking-wide uppercase">
                {currentStage.title}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stage Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950/70 rounded-xl border border-slate-800/80">
          {STATIONS_CONFIG.map((s) => {
            const isActive = s.type === activeStation;
            return (
              <button
                key={s.type}
                type="button"
                onClick={() => onSelectStation(s.type)}
                className={`flex-1 min-w-[80px] py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(0,245,255,0.4)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {s.number} {s.type.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="space-y-3 py-1">
          <h3 className="text-base sm:text-lg font-bold text-cyan-300 font-sans">
            {currentStage.detailedTitle}
          </h3>

          <div className="space-y-2.5">
            {currentStage.detailedPoints.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-[#091122]/80 border border-slate-800/90"
              >
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 mt-1">
          <span className="text-[11px] font-mono text-slate-400">
            Press ESC or click outside to dismiss
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold font-mono tracking-wider transition-all shadow-[0_0_15px_rgba(0,245,255,0.3)] cursor-pointer"
          >
            Return to Studio
          </button>
        </div>
      </div>
    </div>
  );
};
