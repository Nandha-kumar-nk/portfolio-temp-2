/**
 * Cinematic Web Audio Synthesizer
 * Generates ambient space drones, particle chimes, digital telemetry hums,
 * and energy beam risers completely client-side without external asset dependencies.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    } catch {
      console.warn('Web Audio API not supported');
    }
  }

  public toggleMute(): boolean {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.startAmbientDrone();
      this.playChime(440, 0.2);
    } else {
      this.stopAmbientDrone();
    }
    return !this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public startAmbientDrone() {
    if (!this.ctx || this.isMuted || this.droneOsc1) return;
    try {
      const t = this.ctx.currentTime;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.12, t + 2.5);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, t);

      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, t); // A1 note

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(82.4, t); // E2 fifth

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();

      this.droneOsc1 = osc1;
      this.droneOsc2 = osc2;
      this.ambientGain = gain;
    } catch {
      // Audio fallback
    }
  }

  public stopAmbientDrone() {
    if (!this.ctx || !this.ambientGain) return;
    try {
      const t = this.ctx.currentTime;
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      setTimeout(() => {
        this.droneOsc1?.stop();
        this.droneOsc2?.stop();
        this.droneOsc1?.disconnect();
        this.droneOsc2?.disconnect();
        this.ambientGain?.disconnect();
        this.droneOsc1 = null;
        this.droneOsc2 = null;
        this.ambientGain = null;
      }, 550);
    } catch {
      // Ignore cleanup error
    }
  }

  public playChime(freq: number = 880, duration: number = 1.2) {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.98, t + duration);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + duration);
    } catch {
      // Safe ignore
    }
  }

  public playGlitchSound() {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.setValueAtTime(200, t + 0.1);
      osc.frequency.setValueAtTime(1200, t + 0.2);
      osc.frequency.setValueAtTime(100, t + 0.3);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.6);
    } catch {
      // Safe fallback
    }
  }

  public playSceneTransition(scene: number) {
    if (!this.ctx || this.isMuted) return;

    switch (scene) {
      case 1:
        this.playChime(329.63, 2.5); // E4
        break;
      case 2:
        // Swirling particle shimmer
        [440, 554.37, 659.25, 880].forEach((freq, idx) => {
          setTimeout(() => this.playChime(freq, 1.2), idx * 140);
        });
        break;
      case 3:
        // Tech beep chord
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          setTimeout(() => this.playChime(freq, 0.8), idx * 100);
        });
        break;
      case 4:
        // LOADING - orbital pulse & technology chime
        [587.33, 739.99, 880].forEach((freq, idx) => {
          setTimeout(() => this.playChime(freq, 0.9), idx * 100);
        });
        break;
      case 5:
        // READY - Energy beam crescendo surge (Entering Universe)
        this.playBeamSurge();
        break;
      case 6:
        // WELCOME - Majestic welcome identity reveal chord
        [220, 329.63, 440, 554.37, 659.25, 880].forEach((freq, idx) => {
          setTimeout(() => this.playChime(freq, 3.0), idx * 80);
        });
        break;
      case 7:
        // HOME - serene universe entry chord
        [261.63, 329.63, 392.0, 523.25].forEach((freq, idx) => {
          setTimeout(() => this.playChime(freq, 2.2), idx * 100);
        });
        break;
    }
  }

  private playBeamSurge() {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 1.8);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, t);
      filter.frequency.exponentialRampToValueAtTime(3200, t + 1.8);

      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 2.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 2.5);
    } catch {
      // Safe fallback
    }
  }
}

export const soundEngine = new SoundEngine();
