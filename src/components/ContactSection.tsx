import React, { useState } from 'react';
import { Mail, Send, Github, Linkedin, MapPin, Sparkles, CheckCircle, ArrowUp } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface ContactSectionProps {
  onScrollToTop: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onScrollToTop }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSending(true);
    soundEngine.playChime(784, 1.2);

    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      soundEngine.playChime(1046.5, 2.0);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setIsSent(false), 5000);
    }, 1200);
  };

  return (
    <div
      className="relative w-full min-h-[100svh] bg-transparent text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* ===================================================================== */}
      {/* 1. CINEMATIC ROOFTOP SKYLINE ENVIRONMENT OVERLAY                      */}
      {/* ===================================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft transparent depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#04091a]/30 to-transparent" />

        {/* Ambient celestial star flecks */}
        <div className="absolute inset-0 bg-[radial-gradient(1.5px_1.5px_at_15%_20%,rgba(255,255,255,0.7),transparent),radial-gradient(1px_1px_at_80%_15%,rgba(56,189,248,0.8),transparent),radial-gradient(1.5px_1.5px_at_45%_35%,rgba(6,182,212,0.6),transparent),radial-gradient(1px_1px_at_70%_45%,rgba(255,255,255,0.5),transparent)] opacity-60" />

        {/* Distant Futuristic Skyline Silhouettes */}
        <div className="absolute bottom-0 inset-x-0 h-96 flex items-end justify-between opacity-30 pointer-events-none">
          {/* Skyline Building blocks */}
          <div className="w-[12%] h-72 bg-gradient-to-t from-slate-950 to-slate-900/60 border-t border-cyan-500/20 relative">
            <div className="absolute top-2 left-3 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <div className="absolute top-0 right-1/2 w-0.5 h-12 bg-cyan-400/40 -translate-y-full" />
          </div>
          <div className="w-[15%] h-84 bg-gradient-to-t from-slate-950 to-slate-900/50 border-t border-slate-700/30 relative">
            <div className="absolute top-4 right-4 grid grid-cols-2 gap-1.5 opacity-50">
              <span className="w-1 h-1 bg-amber-300 rounded-xs" />
              <span className="w-1 h-1 bg-cyan-300 rounded-xs" />
              <span className="w-1 h-1 bg-cyan-300 rounded-xs" />
            </div>
          </div>
          <div className="w-[18%] h-96 bg-gradient-to-t from-slate-950 to-slate-900/70 border-t border-cyan-500/30 relative">
            <div className="absolute top-0 left-1/2 w-0.5 h-16 bg-cyan-400/60 -translate-y-full">
              <span className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_10px_#22d3ee]" />
            </div>
          </div>
          <div className="w-[22%] h-80 bg-gradient-to-t from-slate-950 to-slate-900/60 border-t border-slate-700/30" />
          <div className="w-[16%] h-88 bg-gradient-to-t from-slate-950 to-slate-900/50 border-t border-cyan-500/20 relative">
            <div className="absolute top-0 right-1/3 w-0.5 h-10 bg-amber-400/50 -translate-y-full">
              <span className="absolute -top-1 -left-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            </div>
          </div>
          <div className="w-[14%] h-64 bg-gradient-to-t from-slate-950 to-slate-900/40 border-t border-slate-700/20" />
        </div>

        {/* Standing Developer Silhouette on Rooftop Observation Platform */}
        <div className="hidden lg:block absolute bottom-8 right-[7%] xl:right-[10%] w-60 h-80 pointer-events-none select-none z-10 opacity-70 hover:opacity-90 transition-opacity">
          <picture>
            <source srcSet="/standing-developer-silhouette.webp" type="image/webp" />
            <img
              src="/standing-developer-silhouette.png"
              alt="Developer observing the universe horizon from the rooftop"
              className="w-full h-full object-contain object-bottom drop-shadow-[0_0_25px_rgba(6,182,212,0.25)]"
              referrerPolicy="no-referrer"
            />
          </picture>
        </div>

        {/* Rooftop Balustrade / Platform Edge Line */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent border-t border-cyan-500/20">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.5)]" />
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. MAIN CONTENT: TRANSMISSION TERMINAL & CHANNELS                      */}
      {/* ===================================================================== */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8 my-auto overflow-y-auto lg:overflow-visible">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono-code font-bold uppercase tracking-[0.25em] mb-2.5 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
            LET'S CONNECT
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-extrabold tracking-tight text-white drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
            CONTACT
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-mono-code text-slate-300/90 max-w-xl mx-auto leading-relaxed">
            Have an ambitious project, an idea to bring into reality, or want to collaborate? Broadcast your message across the universe.
          </p>
        </div>

        {/* 2-Column Split: Details & Direct Frequencies on Left, Terminal Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Coordinates & Channels */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Status Card */}
            <div className="p-5 sm:p-6 rounded-2xl border border-cyan-500/30 bg-slate-950/70 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.12)]">
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="font-mono-code text-xs font-semibold text-emerald-300 tracking-wider uppercase">
                  STATUS: AVAILABLE FOR TRANSMISSIONS
                </span>
              </div>
              <p className="font-mono-code text-xs sm:text-sm text-slate-300 leading-relaxed">
                Open to senior engineering roles, creative technical architecture, contract collaborations, and cutting-edge web experiences.
              </p>
            </div>

            {/* Direct Frequencies */}
            <div className="p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-950/60 backdrop-blur-md flex flex-col gap-4">
              <h3 className="font-orbitron text-xs font-bold tracking-widest text-cyan-400 uppercase">
                DIRECT FREQUENCIES
              </h3>

              <div className="flex flex-col gap-3">
                <a
                  href="mailto:kumar4112005@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/80 bg-slate-900/40 hover:bg-cyan-950/30 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-200 transition-all group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono-code text-slate-400 tracking-widest uppercase">EMAIL</span>
                    <span className="text-xs sm:text-sm font-mono-code text-slate-100 group-hover:text-cyan-200">
                      kumar4112005@gmail.com
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/80 bg-slate-900/40 text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-slate-850 border border-slate-700/60 flex items-center justify-center text-slate-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono-code text-slate-400 tracking-widest uppercase">LOCATION</span>
                    <span className="text-xs sm:text-sm font-mono-code text-slate-100">
                      India • Global Remote Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                <a
                  href="https://github.com/nandhakumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-850 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-mono-code flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-850 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-mono-code flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Transmission Terminal Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-slate-950/80 backdrop-blur-xl shadow-[0_0_35px_rgba(6,182,212,0.15)] relative">
              {/* Form Terminal Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-cyan-500/20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono-code text-[11px] text-cyan-400/80">
                    TERMINAL://TRANSMIT_MESSAGE
                  </span>
                </div>
                <span className="font-mono-code text-[10px] text-slate-400 uppercase tracking-wider">
                  ENCRYPTED 256-BIT
                </span>
              </div>

              {isSent ? (
                <div className="py-12 flex flex-col items-center text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-400/60 flex items-center justify-center text-cyan-300 mb-4 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-orbitron font-bold text-lg text-white">
                    TRANSMISSION DISPATCHED
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm font-mono-code text-slate-300 max-w-sm">
                    Thank you! Your transmission was safely received. I will establish direct contact shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono-code text-slate-300 uppercase tracking-wider">
                        YOUR IDENTITY / NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900/60 focus:bg-slate-900 focus:border-cyan-400 text-sm font-mono-code text-white placeholder-slate-500 outline-none transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono-code text-slate-300 uppercase tracking-wider">
                        COMMUNICATION EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@nexus.corp"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900/60 focus:bg-slate-900 focus:border-cyan-400 text-sm font-mono-code text-white placeholder-slate-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono-code text-slate-300 uppercase tracking-wider">
                      SUBJECT / PURPOSE
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Collaborative Mission / Opportunity / Inquiries"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900/60 focus:bg-slate-900 focus:border-cyan-400 text-sm font-mono-code text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono-code text-slate-300 uppercase tracking-wider">
                      TRANSMISSION MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your goals, timeline, or thoughts..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900/60 focus:bg-slate-900 focus:border-cyan-400 text-sm font-mono-code text-white placeholder-slate-500 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="mt-2 min-h-[44px] w-full px-6 py-3 rounded-xl border border-cyan-400/60 hover:border-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-100 hover:text-white font-orbitron font-semibold text-xs sm:text-sm tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-50"
                  >
                    {isSending ? (
                      <>
                        <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
                        <span>ENCRYPTING & BROADCASTING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-cyan-400" />
                        <span>TRANSMIT MESSAGE</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. GLOBAL FOOTER                                                      */}
      {/* ===================================================================== */}
      <footer className="relative z-20 w-full border-t border-cyan-500/15 bg-slate-950/80 backdrop-blur-md py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg border border-cyan-500/40 bg-slate-950 flex items-center justify-center font-orbitron font-bold text-cyan-300 text-xs shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              NU
            </div>
            <span className="font-mono-code text-xs text-slate-400">
              © {new Date().getFullYear()} NANDHAKUMAR UNIVERSE • ALL RIGHTS RESERVED
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono-code text-slate-500 italic">
              “Ideas • Code • Create • Impact”
            </span>
            <button
              type="button"
              onClick={onScrollToTop}
              className="p-2 rounded-xl border border-slate-800 hover:border-cyan-500/40 bg-slate-900/60 hover:bg-cyan-950/40 text-slate-400 hover:text-cyan-300 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono-code"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">TOP</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
