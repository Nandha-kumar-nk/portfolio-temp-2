/**
 * Particle calculation algorithms for dynamic transformations
 * between Single Point -> Letter 'N' -> Cyber Globe -> Energy Shockwave.
 */

export interface ParticleData {
  // Target coordinates for each scene phase
  single: [number, number, number];
  letterN: [number, number, number];
  globe: [number, number, number];
  beam: [number, number, number];
  // Particle properties
  size: number;
  speed: number;
  phase: number;
  colorType: number; // 0: electric cyan, 1: blue, 2: purple/violet, 3: white core
}

export function generateParticles(count: number = 2400): ParticleData[] {
  const particles: ParticleData[] = [];

  for (let i = 0; i < count; i++) {
    // 1. Single Point State: all tightly clustered near origin (Scene 1)
    const singleRad = i === 0 ? 0 : 0.04 + Math.random() * 0.08;
    const sTheta = Math.random() * Math.PI * 2;
    const sPhi = Math.acos(2 * Math.random() - 1);
    const single: [number, number, number] = [
      singleRad * Math.sin(sPhi) * Math.cos(sTheta),
      singleRad * Math.sin(sPhi) * Math.sin(sTheta),
      singleRad * Math.cos(sPhi),
    ];

    // 2. Letter 'N' State (Scene 2)
    // 35% on left vertical, 35% on diagonal, 20% on right vertical, 10% ambient halo dust
    let nx = 0;
    let ny = 0;
    let nz = (Math.random() - 0.5) * 0.4; // 3D depth thickness
    const letterRatio = Math.random();

    const nHeight = 3.6; // total height from -1.8 to +1.8
    const nWidth = 2.4;  // from -1.2 to +1.2
    const halfH = nHeight / 2;
    const halfW = nWidth / 2;

    if (letterRatio < 0.30) {
      // Left vertical stroke (x = -halfW)
      const t = Math.random();
      nx = -halfW + (Math.random() - 0.5) * 0.22;
      ny = -halfH + t * nHeight;
    } else if (letterRatio < 0.65) {
      // Diagonal stroke from (-halfW, +halfH) to (+halfW, -halfH)
      const t = Math.random();
      nx = -halfW + t * nWidth + (Math.random() - 0.5) * 0.22;
      ny = halfH - t * nHeight + (Math.random() - 0.5) * 0.15;
    } else if (letterRatio < 0.90) {
      // Right vertical stroke (x = +halfW)
      const t = Math.random();
      nx = halfW + (Math.random() - 0.5) * 0.22;
      ny = -halfH + t * nHeight;
    } else {
      // Ambient swirling cosmic dust surrounding the N
      const haloAngle = Math.random() * Math.PI * 2;
      const haloDist = 1.6 + Math.random() * 2.2;
      nx = Math.cos(haloAngle) * haloDist;
      ny = Math.sin(haloAngle) * haloDist * 1.1;
      nz = (Math.random() - 0.5) * 1.5;
    }

    const letterN: [number, number, number] = [nx, ny, nz];

    // 3. Globe State (Scene 3, 4, 6)
    // Fibonacci sphere distribution for uniform planetary shell + rings
    const isRing = i % 5 === 0;
    let gx = 0;
    let gy = 0;
    let gz = 0;

    if (isRing) {
      // Orbital ring particles
      const ringRadius = 2.5 + (i % 3) * 0.45 + (Math.random() - 0.5) * 0.15;
      const ringAngle = Math.random() * Math.PI * 2;
      const tilt = (i % 2 === 0 ? 0.35 : -0.45);
      gx = Math.cos(ringAngle) * ringRadius;
      gy = Math.sin(ringAngle) * ringRadius * Math.sin(tilt) + (Math.random() - 0.5) * 0.1;
      gz = Math.sin(ringAngle) * ringRadius * Math.cos(tilt);
    } else {
      // Spherical globe shell (radius ~ 1.9)
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const globeRadius = 1.85 + (Math.random() - 0.5) * 0.12;
      gx = globeRadius * Math.sin(phi) * Math.cos(theta);
      gy = globeRadius * Math.sin(phi) * Math.sin(theta);
      gz = globeRadius * Math.cos(phi);
    }
    const globe: [number, number, number] = [gx, gy, gz];

    // 4. Energy Beam State (Scene 5)
    // Vertical beam through center + radial shockwave discs
    let bx = 0;
    let by = 0;
    let bz = 0;
    const isBeam = i % 2 === 0;

    if (isBeam) {
      // High-energy vertical cylinder pillar
      const beamHeight = (Math.random() - 0.5) * 12.0;
      const beamRad = 0.12 + Math.random() * 0.35;
      const bAngle = Math.random() * Math.PI * 2;
      bx = Math.cos(bAngle) * beamRad;
      by = beamHeight;
      bz = Math.sin(bAngle) * beamRad;
    } else {
      // Shockwave disc expanding outward horizontally
      const waveRadius = 0.5 + Math.random() * 3.8;
      const wAngle = Math.random() * Math.PI * 2;
      bx = Math.cos(wAngle) * waveRadius;
      by = (Math.random() - 0.5) * 0.25;
      bz = Math.sin(wAngle) * waveRadius;
    }
    const beam: [number, number, number] = [bx, by, bz];

    // Particle color styling
    // 0: cyan (#06b6d4), 1: bright electric blue (#38bdf8), 2: neon indigo/violet (#818cf8), 3: pure white (#ffffff)
    const colorType = Math.random() > 0.85 ? 3 : Math.random() > 0.6 ? 2 : Math.random() > 0.3 ? 1 : 0;
    const size = 0.035 + Math.random() * 0.055;

    particles.push({
      single,
      letterN,
      globe,
      beam,
      size,
      speed: 0.5 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
      colorType,
    });
  }

  return particles;
}
