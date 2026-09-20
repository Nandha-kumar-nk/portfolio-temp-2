import * as THREE from 'three';

/**
 * Modern THREE.Timer-backed replacement for deprecated THREE.Clock.
 * Adheres to THREE.Timer API while providing 100% backward compatibility
 * for libraries like @react-three/fiber without triggering deprecation warnings.
 */
export class TimerClock {
  autoStart: boolean;
  startTime: number;
  oldTime: number;
  elapsedTime: number;
  running: boolean;
  private _timer: THREE.Timer;

  constructor(autoStart = true) {
    this.autoStart = autoStart;
    this.startTime = 0;
    this.oldTime = 0;
    this.elapsedTime = 0;
    this.running = false;
    this._timer = new THREE.Timer();

    if (this.autoStart) {
      this.start();
    }
  }

  start() {
    this.startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
    this.oldTime = this.startTime;
    this.elapsedTime = 0;
    this.running = true;
    this._timer.reset();
  }

  stop() {
    this.getElapsedTime();
    this.running = false;
    this.autoStart = false;
  }

  getElapsedTime(): number {
    this.getDelta();
    return this.elapsedTime;
  }

  getDelta(): number {
    let diff = 0;
    if (this.autoStart && !this.running) {
      this.start();
      return 0;
    }
    if (this.running) {
      this._timer.update();
      diff = this._timer.getDelta();
      this.oldTime = this.elapsedTime;
      this.elapsedTime += diff;
    }
    return diff;
  }
}

// Export TimerClock for safe usage
export default TimerClock;
