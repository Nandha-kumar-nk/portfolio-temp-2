import { useState } from 'react';
import {
  Volume2,
  VolumeX,
  ChevronUp,
  Terminal,
  ShieldCheck,
} from 'lucide-react';
import { TechIcon } from '../TechIcons';
import { SkillNodeData } from '../3d/ReactorCore3D';
import {
  SkillsTab,
  NavSection,
  NAV_ITEMS,
  SKILLS_TABS,
  CATEGORY_NODES,
  CERTIFICATIONS_LIST,
} from '../../data/skillsData';

interface TabletSkillsLayoutProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateProjects?: () => void;
  onNavigateContact?: () => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  selectedTab: SkillsTab;
  onSelectTab: (tab: SkillsTab) => void;
  selectedSkill: SkillNodeData | null;
  onSelectSkill: (skill: SkillNodeData | null) => void;
}

const TABLET_RADIAL_LAYOUT: Record<string, { x: string; y: string }> = {
  python: { x: '50%', y: '11%' },
  react: { x: '22%', y: '22%' },
  javascript: { x: '78%', y: '22%' },
  typescript: { x: '13%', y: '46%' },
  nodejs: { x: '87%', y: '46%' },
  tailwind: { x: '20%', y: '70%' },
  threejs: { x: '80%', y: '70%' },
  mongodb: { x: '30%', y: '87%' },
  git: { x: '50%', y: '90%' },
  aiml: { x: '70%', y: '87%' },

  github: { x: '50%', y: '12%' },
  vscode: { x: '80%', y: '26%' },
  postman: { x: '86%', y: '58%' },
  vercel: { x: '68%', y: '87%' },
  firebase: { x: '32%', y: '87%' },
  docker: { x: '14%', y: '58%' },
  figma: { x: '20%', y: '26%' },

  problem_solving: { x: '50%', y: '12%' },
  communication: { x: '78%', y: '24%' },
  teamwork: { x: '87%', y: '52%' },
  leadership: { x: '77%', y: '77%' },
  time_mgmt: { x: '50%', y: '89%' },
  learning: { x: '27%', y: '81%' },
  adaptability: { x: '13%', y: '52%' },
  creativity: { x: '22%', y: '24%' },

  fullstack_cert: { x: '50%', y: '12%' },
  python_cert: { x: '80%', y: '26%' },
  cloud_cert: { x: '86%', y: '58%' },
  genai_cert: { x: '68%', y: '87%' },
  dsa_cert: { x: '32%', y: '87%' },
  security_cert: { x: '14%', y: '58%' },
  webgl_cert: { x: '20%', y: '26%' },
};

export function TabletSkillsLayout({
  onNavigateHome,
  onNavigateAbout,
  onNavigateProjects,
  onNavigateContact,
  isAudioOn,
  onToggleAudio,
  selectedTab,
  onSelectTab,
  selectedSkill,
  onSelectSkill,
}: TabletSkillsLayoutProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentSkills = CATEGORY_NODES[selectedTab];

  const handleNavClick = (section: NavSection) => {
    if (section === 'HOME') onNavigateHome();
    else if (section === 'ABOUT') onNavigateAbout();
    else if (section === 'SKILLS') {
      // already on skills
    } else if (section === 'PROJECTS') {
      if (onNavigateProjects) onNavigateProjects();
      else {
        setToastMessage('Projects module coming soon');
        setTimeout(() => setToastMessage(null), 2000);
      }
    } else if (section === 'CONTACT') {
      if (onNavigateContact) onNavigateContact();
      else {
        setToastMessage('Contact module coming soon');
        setTimeout(() => setToastMessage(null), 2000);
      }
    }
  };

  return (
    <div className="relative w-full min-h-[100svh] bg-transparent text-slate-100 flex flex-col items-center select-none font-mono-code box-border">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_40%,rgba(6,182,212,0.12),rgba(15,23,42,0.5)_60%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1.5px_1.5px_at_25%_25%,rgba(255,255,255,0.7),transparent),radial-gradient(1px_1px_at_75%_35%,rgba(56,189,248,0.7),transparent)] opacity-60" />
      </div>

      {/* Background */}

      {/* Main 2-Column Body for Tablet (768px - 1023px) */}
      <main className="relative z-10 w-full max-w-5xl px-6 py-8 flex flex-col gap-8 box-border">
        {/* Top Split: Skills Panel on Left, Skill Core on Right */}
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Left Column: Skills Panel (5 cols) */}
          <div className="col-span-5 flex flex-col gap-4">
            <div className="rounded-2xl border border-cyan-500/35 bg-slate-950/90 backdrop-blur-xl p-5 shadow-[0_0_30px_rgba(6,182,212,0.2)] flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <h1 className="font-orbitron font-extrabold text-base text-slate-100 tracking-wider">
                    SKILLS
                  </h1>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                </div>
                <span className="text-[9px] font-mono-code text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 uppercase font-semibold">
                  REACTOR CORE
                </span>
              </div>

              <p className="text-xs font-mono-code text-slate-300 leading-relaxed">
                A blend of technology, creativity and problem-solving. These are the tools I use to turn ideas into real-world solutions.
              </p>

              {/* Category Selectors */}
              <div className="flex flex-col gap-2 pt-1">
                {SKILLS_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = selectedTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        onSelectTab(tab.id);
                        onSelectSkill(null);
                      }}
                      className={`h-11 px-3 rounded-xl font-mono-code text-xs tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border border-cyan-400/90 bg-cyan-500/25 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.35)] font-semibold'
                          : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-300' : 'text-slate-500'}`} />
                        <span className="uppercase">{tab.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-cyan-500/15">
                <p className="text-[10px] font-mono-code text-cyan-300/80 italic leading-relaxed">
                  “Skills fuel ideas. Ideas create a better tomorrow.”
                </p>
              </div>
            </div>

            {/* Selected Skill Info Card */}
            {selectedSkill && (
              <div className="rounded-2xl border border-cyan-400/70 bg-slate-950/95 backdrop-blur-xl p-4 shadow-[0_0_25px_rgba(6,182,212,0.3)] flex flex-col gap-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{
                        backgroundColor: selectedSkill.color,
                        boxShadow: `0 0 10px ${selectedSkill.color}`,
                      }}
                    />
                    <h3 className="font-orbitron font-bold text-sm text-slate-100">
                      {selectedSkill.name}
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono-code text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/40 bg-cyan-950/60 font-semibold">
                    {selectedSkill.proficiency}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-cyan-300 text-[10px]">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span>{selectedSkill.category}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed border-t border-cyan-500/20 pt-1.5">
                  {selectedSkill.description}
                </p>
                <button
                  onClick={() => onSelectSkill(null)}
                  className="self-end text-[9px] text-cyan-400 hover:text-cyan-200 cursor-pointer pt-1"
                >
                  [CLOSE]
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Skill Core (7 cols) */}
          <div className="col-span-7 flex items-center justify-center">
            <div
              className="tablet-skills-core relative"
              style={{ width: '380px', height: '380px' }}
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.2)_0%,rgba(14,165,233,0.06)_45%,transparent_70%)] pointer-events-none" />

              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 380 380"
                fill="none"
              >
                <circle
                  cx="190"
                  cy="190"
                  r="142"
                  stroke="#00f5ff"
                  strokeWidth="1.6"
                  strokeDasharray="4 6"
                  strokeOpacity="0.45"
                  className="animate-spin-slow origin-center"
                />
                <ellipse
                  cx="190"
                  cy="190"
                  rx="155"
                  ry="128"
                  stroke="#3b82f6"
                  strokeWidth="1.2"
                  strokeOpacity="0.3"
                  transform="rotate(-18 190 190)"
                />
                <circle
                  cx="190"
                  cy="190"
                  r="68"
                  stroke="#38bdf8"
                  strokeWidth="1"
                  strokeOpacity="0.2"
                  strokeDasharray="2 4"
                />
              </svg>

              {/* Center Core */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center cursor-pointer pointer-events-auto"
                onClick={() => onSelectSkill(null)}
              >
                <div className="absolute inset-[-10px] rounded-full bg-cyan-400/20 blur-xl animate-pulse" />
                <div className="absolute inset-[-4px] rounded-full border border-cyan-400/50 border-dashed animate-spin-reverse" />
                <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-cyan-600 via-sky-400 to-white opacity-90 shadow-[0_0_25px_#00f5ff] flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-white shadow-[0_0_15px_#ffffff] flex items-center justify-center">
                    <span className="font-orbitron font-black text-[9px] text-slate-950">NU</span>
                  </div>
                </div>
              </div>

              {/* Orbiting Nodes */}
              {currentSkills.map((skill) => {
                const coords = TABLET_RADIAL_LAYOUT[skill.id] || { x: '50%', y: '50%' };
                const isSelected = selectedSkill?.id === skill.id;

                return (
                  <div
                    key={skill.id}
                    className="absolute pointer-events-auto"
                    style={{
                      left: coords.x,
                      top: coords.y,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <button
                      id={`tablet-node-${skill.id}`}
                      onClick={() => onSelectSkill(isSelected ? null : skill)}
                      className={`group relative flex flex-col items-center cursor-pointer transition-all duration-200 ${
                        isSelected ? 'scale-115 z-30' : 'scale-100 hover:scale-105 z-20'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl border-2 transition-all ${
                          isSelected
                            ? 'bg-slate-950 ring-4'
                            : 'bg-slate-950/90 hover:bg-slate-900/90'
                        }`}
                        style={{
                          borderColor: skill.color,
                          boxShadow: isSelected
                            ? `0 0 28px ${skill.color}, 0 0 12px ${skill.color} inset`
                            : `0 0 12px ${skill.color}66`,
                        }}
                      >
                        <TechIcon id={skill.id} className="w-5 h-5 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                      </div>
                      <span
                        className="font-orbitron font-bold text-[11px] text-slate-100 tracking-wide mt-1 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] whitespace-nowrap"
                        style={{
                          textShadow: isSelected ? `0 0 10px ${skill.color}` : 'none',
                        }}
                      >
                        {skill.name}
                      </span>
                      <span className="text-[8.5px] font-mono-code text-cyan-300/85 tracking-wider text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] whitespace-nowrap mt-0.5">
                        {skill.category}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Information Cards Grid */}
        <section className="w-full flex flex-col gap-4 pt-4 border-t border-cyan-500/20">
          <div className="flex items-center justify-between">
            <h3 className="font-orbitron font-extrabold text-sm text-cyan-200 tracking-wider uppercase">
              {SKILLS_TABS.find((t) => t.id === selectedTab)?.label} ({currentSkills.length})
            </h3>
            <span className="text-[10px] font-mono-code text-cyan-400">
              ACTIVE MATRIX OVERVIEW
            </span>
          </div>

          {selectedTab === 'certs' ? (
            <div className="grid grid-cols-2 gap-3.5">
              {CERTIFICATIONS_LIST.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-xl border border-cyan-500/30 bg-slate-950/80 p-4 flex flex-col gap-2 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col">
                      <h4 className="font-orbitron font-bold text-xs text-slate-100">
                        {cert.name}
                      </h4>
                      <span className="text-[10px] text-cyan-300/90 mt-0.5">
                        {cert.issuer} • {cert.year}
                      </span>
                    </div>
                    <span className="text-[8.5px] px-2 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 text-cyan-300 flex-shrink-0">
                      {cert.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {cert.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-cyan-500/15">
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 3).map((s) => (
                        <span key={s} className="text-[8.5px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="text-[9px] text-cyan-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-cyan-400" />
                      {cert.credentialId}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {currentSkills.map((skill) => {
                const isSelected = selectedSkill?.id === skill.id;
                return (
                  <button
                    key={skill.id}
                    onClick={() => onSelectSkill(isSelected ? null : skill)}
                    className={`w-full text-left rounded-xl p-3.5 border transition-all cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? 'border-cyan-400/90 bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                        : 'border-slate-800/90 bg-slate-950/70 hover:border-cyan-500/40 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center border"
                          style={{
                            borderColor: skill.color,
                            backgroundColor: `${skill.color}15`,
                          }}
                        >
                          <TechIcon id={skill.id} className="w-4 h-4" />
                        </div>
                        <span className="font-orbitron font-bold text-xs text-slate-100">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-[9px] text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/40">
                        {skill.proficiency}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {skill.description}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Motto & Return */}
        <div className="w-full flex flex-col items-center gap-4 my-6">
          <span className="text-[10px] text-cyan-400/80 tracking-[0.25em] uppercase">
            EXPLORE • LEARN • BUILD • GROW • REPEAT
          </span>
          <button
            onClick={onNavigateHome}
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer px-6 py-2 rounded-full border border-cyan-500/30 bg-slate-950/80 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            <ChevronUp className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-cyan-300 font-bold">
              RETURN TO HOME UNIVERSE
            </span>
          </button>
        </div>

        {/* Footer */}
        <footer className="w-full py-6 border-t border-cyan-500/20 text-center text-slate-500 text-[11px]">
          <div className="flex items-center justify-center gap-2 mb-1 text-cyan-400/70">
            <span>NANDHAKUMAR UNIVERSE</span>
            <span>•</span>
            <span>SKILLS MATRIX ACTIVE</span>
          </div>
          <p>© {new Date().getFullYear()} Nandhakumar. Crafted with precision.</p>
        </footer>
      </main>

      {toastMessage && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl border border-cyan-500/50 bg-slate-950/95 backdrop-blur-md text-cyan-300 text-xs shadow-[0_0_25px_rgba(6,182,212,0.4)] animate-fade-in">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
