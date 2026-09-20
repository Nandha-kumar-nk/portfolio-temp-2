import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw, Menu, X } from 'lucide-react';

export type NavSection = 'home' | 'about' | 'skills' | 'projects' | 'contact';

export const NAV_ITEMS: { id: NavSection; label: string }[] = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact', label: 'CONTACT' },
];

interface GlobalHeaderProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  onReplayIntro?: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  activeSection,
  onNavigate,
  isAudioOn,
  onToggleAudio,
  onReplayIntro,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: NavSection) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header
      id="global-header"
      className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#02040b]/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-2.5 sm:py-3'
          : 'bg-gradient-to-b from-[#02040b]/90 via-[#02040b]/50 to-transparent py-3 sm:py-4'
      }`}
      style={{
        paddingTop: 'calc(env(safe-area-inset-top) + 0.5rem)',
      }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram & Title */}
        <button
          id="global-brand-btn"
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer text-left group select-none"
          title="Return to Home Universe"
        >
          <div className="w-8 h-8 rounded-lg border border-cyan-500/40 bg-slate-950/80 flex items-center justify-center font-orbitron font-bold text-cyan-300 text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
            NU
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron text-xs sm:text-sm font-bold tracking-wider text-slate-100 group-hover:text-cyan-200 transition-colors">
              NANDHAKUMAR
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono-code text-cyan-400/90 tracking-widest leading-none">
              UNIVERSE
            </span>
            <span className="hidden xl:inline text-[7.5px] font-mono-code text-slate-400/80 tracking-wider">
              IDEAS • CODE • CREATE • IMPACT
            </span>
          </div>
        </button>

        {/* Desktop Nav Capsule */}
        <nav
          aria-label="Global Portfolio Navigation"
          className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/75 border border-cyan-500/30 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                id={`global-nav-${id}`}
                type="button"
                onClick={() => handleNavClick(id)}
                className={`min-h-[34px] px-3.5 py-1 rounded-full text-xs font-mono-code tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                  isActive
                    ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 shadow-[0_0_14px_rgba(6,182,212,0.4)] font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
                )}
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Sound, Replay, Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Audio Toggle */}
          <button
            id="global-sound-toggle-btn"
            type="button"
            onClick={onToggleAudio}
            className={`min-h-[36px] min-w-[36px] p-2 rounded-xl border transition-all active:scale-95 cursor-pointer flex items-center justify-center text-xs font-mono-code ${
              isAudioOn
                ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300 shadow-[0_0_14px_rgba(6,182,212,0.35)]'
                : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
            title={isAudioOn ? 'Sound active (tap to mute)' : 'Enable atmospheric sound'}
          >
            {isAudioOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Replay Cinematic Sequence (optional) */}
          {onReplayIntro && (
            <button
              id="global-replay-intro-btn"
              type="button"
              onClick={onReplayIntro}
              className="hidden lg:flex min-h-[36px] px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950/70 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 active:scale-95 transition-all cursor-pointer items-center gap-1.5 text-xs font-mono-code"
              title="Replay cinematic opening sequence"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px]">PROLOGUE</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            id="global-mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden min-h-[40px] min-w-[40px] p-2 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-200 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full px-4 pt-3 pb-4 bg-slate-950/95 backdrop-blur-2xl border-b border-cyan-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-fade-in">
          <div className="flex flex-col gap-1.5">
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  id={`mobile-nav-${id}`}
                  type="button"
                  onClick={() => handleNavClick(id)}
                  className={`min-h-[44px] w-full px-4 py-2.5 rounded-xl text-left font-mono-code text-xs tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/50 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900/60'
                  }`}
                >
                  <span>{label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />}
                </button>
              );
            })}

            {onReplayIntro && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
                className="min-h-[44px] w-full px-4 py-2.5 rounded-xl text-left font-mono-code text-xs tracking-wider text-slate-400 hover:text-cyan-300 hover:bg-slate-900/60 flex items-center gap-2 border-t border-slate-800/80 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>WATCH OPENING PROLOGUE</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

