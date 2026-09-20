import * as THREE from 'three';

// Cache generated textures so canvas drawing happens only once
const textureCache: Record<string, THREE.CanvasTexture> = {};

export function getProjectTexture(projectId: string): THREE.CanvasTexture {
  if (textureCache[projectId]) {
    return textureCache[projectId];
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    return fallback;
  }

  switch (projectId) {
    case 'swayam-2':
      renderSwayamArtwork(ctx);
      break;
    case 'speed-taxi':
      renderSpeedTaxiArtwork(ctx);
      break;
    case 'wildlife-ai':
      renderWildlifeArtwork(ctx);
      break;
    case 'resume-forge':
      renderResumeForgeArtwork(ctx);
      break;
    case 'nk-mern-cli':
      renderMernCliArtwork(ctx);
      break;
    default:
      renderSwayamArtwork(ctx);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  textureCache[projectId] = texture;
  return texture;
}

// 01 — SWAYAM 2.0 (Cyan University Campus + Graduation Cap + Cosmic Radiance)
function renderSwayamArtwork(ctx: CanvasRenderingContext2D) {
  const w = 1024;
  const h = 768;

  // Cosmic Background
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#020614');
  bg.addColorStop(0.5, '#061633');
  bg.addColorStop(1, '#020b1c');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Starfield
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 90; i++) {
    const x = Math.sin(i * 99) * 0.5 + 0.5;
    const y = Math.cos(i * 33) * 0.5 + 0.5;
    const r = (i % 3 === 0) ? 1.8 : 1;
    ctx.globalAlpha = 0.2 + (i % 5) * 0.15;
    ctx.beginPath();
    ctx.arc(x * w, y * h * 0.7, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  // Radiant Cosmic Light Core behind Campus
  const glow = ctx.createRadialGradient(w / 2, h * 0.42, 20, w / 2, h * 0.42, 380);
  glow.addColorStop(0, 'rgba(0, 245, 255, 0.5)');
  glow.addColorStop(0.4, 'rgba(6, 182, 212, 0.25)');
  glow.addColorStop(0.8, 'rgba(2, 22, 54, 0.1)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Concentric Celestial Rings behind Campus
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.lineWidth = 1.5;
  [140, 200, 260].forEach((r) => {
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.42, r, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Perspective Cyber Ground Grid
  ctx.strokeStyle = 'rgba(0, 245, 255, 0.25)';
  ctx.lineWidth = 1.5;
  const horizonY = h * 0.65;
  for (let x = 0; x <= w; x += 64) {
    ctx.beginPath();
    ctx.moveTo(w / 2 + (x - w / 2) * 0.2, horizonY);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = horizonY; y <= h; y += 24) {
    const p = (y - horizonY) / (h - horizonY);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Neoclassical Digital University Campus Façade
  const campusY = h * 0.66;
  const campusW = 380;
  const campusX = (w - campusW) / 2;

  // Base platform
  ctx.fillStyle = '#081e3d';
  ctx.fillRect(campusX - 30, campusY - 20, campusW + 60, 24);
  ctx.strokeStyle = '#00f5ff';
  ctx.lineWidth = 2;
  ctx.strokeRect(campusX - 30, campusY - 20, campusW + 60, 24);

  // Steps
  ctx.fillStyle = '#0b274e';
  ctx.fillRect(campusX - 15, campusY - 34, campusW + 30, 14);

  // Main Building Block
  ctx.fillStyle = '#0a2346';
  ctx.fillRect(campusX, campusY - 170, campusW, 136);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
  ctx.lineWidth = 2;
  ctx.strokeRect(campusX, campusY - 170, campusW, 136);

  // Columns
  const colCount = 8;
  const colSpacing = campusW / (colCount + 1);
  for (let i = 1; i <= colCount; i++) {
    const cx = campusX + i * colSpacing;
    ctx.fillStyle = '#0f3566';
    ctx.fillRect(cx - 7, campusY - 170, 14, 136);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 7, campusY - 170, 14, 136);
  }

  // Grand Portico Pediment Triangle
  ctx.beginPath();
  ctx.moveTo(campusX - 10, campusY - 170);
  ctx.lineTo(w / 2, campusY - 240);
  ctx.lineTo(campusX + campusW + 10, campusY - 170);
  ctx.closePath();
  ctx.fillStyle = '#0d2d58';
  ctx.fill();
  ctx.strokeStyle = '#00f5ff';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Central University Dome
  ctx.beginPath();
  ctx.arc(w / 2, campusY - 240, 75, Math.PI, 0);
  ctx.fillStyle = '#123e74';
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Glowing Arch Gateway
  ctx.beginPath();
  ctx.arc(w / 2, campusY - 80, 45, Math.PI, 0);
  ctx.lineTo(w / 2 + 45, campusY - 20);
  ctx.lineTo(w / 2 - 45, campusY - 20);
  ctx.closePath();
  ctx.fillStyle = '#00f5ff';
  ctx.globalAlpha = 0.85;
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Radiant Glowing Graduation Cap floating above
  const capY = h * 0.22;
  ctx.save();
  ctx.translate(w / 2, capY);

  // Cap Diamond Top
  ctx.beginPath();
  ctx.moveTo(0, -32);
  ctx.lineTo(75, 0);
  ctx.lineTo(0, 32);
  ctx.lineTo(-75, 0);
  ctx.closePath();
  ctx.fillStyle = '#0284c7';
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Cap Skull Skull-cap underneath
  ctx.beginPath();
  ctx.ellipse(0, 20, 40, 20, 0, 0, Math.PI);
  ctx.fillStyle = '#0369a1';
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Tassel
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(45, 10, 60, 45);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = '#00f5ff';
  ctx.beginPath();
  ctx.arc(60, 48, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // Cyan Horizon Glow
  const horizonGlow = ctx.createLinearGradient(0, horizonY - 20, 0, horizonY + 20);
  horizonGlow.addColorStop(0, 'transparent');
  horizonGlow.addColorStop(0.5, 'rgba(0, 245, 255, 0.6)');
  horizonGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = horizonGlow;
  ctx.fillRect(0, horizonY - 20, w, 40);

  // Watermark/badge
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('01 // SWAYAM 2.0 • DIGITAL EDUCATION CORE', w / 2, h - 36);
}

// 02 — SPEED TAXI (Golden Amber City Skyline + Futuristic Taxi Cab)
function renderSpeedTaxiArtwork(ctx: CanvasRenderingContext2D) {
  const w = 1024;
  const h = 768;

  // Amber/Gold Night Sky
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#0c0702');
  bg.addColorStop(0.5, '#261705');
  bg.addColorStop(1, '#110a03');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Golden Horizon Radiance
  const rad = ctx.createRadialGradient(w / 2, h * 0.55, 10, w / 2, h * 0.55, 360);
  rad.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
  rad.addColorStop(0.4, 'rgba(217, 119, 6, 0.25)');
  rad.addColorStop(1, 'transparent');
  ctx.fillStyle = rad;
  ctx.fillRect(0, 0, w, h);

  // Distant Skyscraper Silhouettes with illuminated amber windows
  const buildings = [
    { x: 120, w: 90, h: 260 },
    { x: 220, w: 110, h: 330 },
    { x: 340, w: 85, h: 290 },
    { x: 440, w: 140, h: 380 },
    { x: 590, w: 100, h: 310 },
    { x: 700, w: 120, h: 350 },
    { x: 830, w: 80, h: 250 },
  ];

  const baseY = h * 0.62;
  buildings.forEach((b) => {
    ctx.fillStyle = '#1c1105';
    ctx.fillRect(b.x, baseY - b.h, b.w, b.h);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(b.x, baseY - b.h, b.w, b.h);

    // Windows
    ctx.fillStyle = 'rgba(251, 191, 36, 0.7)';
    for (let r = baseY - b.h + 20; r < baseY - 20; r += 24) {
      for (let c = b.x + 14; c < b.x + b.w - 14; c += 18) {
        if (Math.sin(r * 13 + c) > -0.2) {
          ctx.fillRect(c, r, 8, 12);
        }
      }
    }
  });

  // Perspective Golden Asphalt Road
  ctx.fillStyle = '#0f0a04';
  ctx.beginPath();
  ctx.moveTo(w / 2 - 80, baseY);
  ctx.lineTo(w / 2 + 80, baseY);
  ctx.lineTo(w + 120, h);
  ctx.lineTo(-120, h);
  ctx.closePath();
  ctx.fill();

  // Glowing Road Median Strips
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 4;
  for (let y = baseY; y < h; y += 32) {
    ctx.beginPath();
    ctx.moveTo(w / 2, y);
    ctx.lineTo(w / 2, y + 18);
    ctx.stroke();
  }

  // Futuristic Sleek Sports Taxi on Road
  const carX = w / 2;
  const carY = h * 0.76;
  ctx.save();
  ctx.translate(carX, carY);

  // Car Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.beginPath();
  ctx.ellipse(0, 36, 120, 20, 0, 0, Math.PI * 2);
  ctx.fill();

  // Car Body (Aerodynamic gold chassis)
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.roundRect(-90, 0, 180, 36, 12);
  ctx.fill();
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Cockpit/Roof
  ctx.fillStyle = '#1e1b18';
  ctx.beginPath();
  ctx.moveTo(-55, 0);
  ctx.lineTo(-35, -28);
  ctx.lineTo(35, -28);
  ctx.lineTo(55, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Roof TAXI Sign
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(-22, -38, 44, 10);
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 8px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('TAXI', 0, -30);

  // Dual Blinding Headlights
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(-65, 14, 14, 8, 0, 0, Math.PI * 2);
  ctx.ellipse(65, 14, 14, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Headlight Light Cones
  const coneL = ctx.createRadialGradient(-65, 14, 5, -85, 90, 80);
  coneL.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
  coneL.addColorStop(1, 'transparent');
  ctx.fillStyle = coneL;
  ctx.beginPath();
  ctx.moveTo(-65, 14);
  ctx.lineTo(-140, 110);
  ctx.lineTo(-30, 110);
  ctx.closePath();
  ctx.fill();

  const coneR = ctx.createRadialGradient(65, 14, 5, 85, 90, 80);
  coneR.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
  coneR.addColorStop(1, 'transparent');
  ctx.fillStyle = coneR;
  ctx.beginPath();
  ctx.moveTo(65, 14);
  ctx.lineTo(30, 110);
  ctx.lineTo(140, 110);
  ctx.closePath();
  ctx.fill();

  ctx.restore();

  // Label
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('02 // SPEED TAXI • URBAN MOBILITY DISPATCH', w / 2, h - 36);
}

// 03 — AI WILDLIFE (Emerald Green Forest Canopy + Holographic Wireframe Grid + Elephant)
function renderWildlifeArtwork(ctx: CanvasRenderingContext2D) {
  const w = 1024;
  const h = 768;

  // Dark Forest Green Background
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#010c06');
  bg.addColorStop(0.5, '#042211');
  bg.addColorStop(1, '#021208');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Emerald Radial Atmosphere
  const rad = ctx.createRadialGradient(w / 2, h * 0.48, 10, w / 2, h * 0.48, 380);
  rad.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
  rad.addColorStop(0.5, 'rgba(5, 150, 105, 0.2)');
  rad.addColorStop(1, 'transparent');
  ctx.fillStyle = rad;
  ctx.fillRect(0, 0, w, h);

  // Forest Tree Canopy Silhouettes
  ctx.fillStyle = '#02170b';
  for (let x = 60; x <= w - 60; x += 90) {
    ctx.beginPath();
    ctx.arc(x, h * 0.65, 70, Math.PI, 0);
    ctx.fill();
  }

  // Holographic Radar Scanning Grid Lines
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.3)';
  ctx.lineWidth = 1.5;
  [120, 200, 280, 360].forEach((r) => {
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.5, r, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Crosshair Target Axis
  ctx.beginPath();
  ctx.moveTo(w / 2, 80);
  ctx.lineTo(w / 2, h * 0.85);
  ctx.moveTo(100, h * 0.5);
  ctx.lineTo(w - 100, h * 0.5);
  ctx.stroke();

  // Majestic Elephant Silhouette
  const elX = w / 2;
  const elY = h * 0.54;
  ctx.save();
  ctx.translate(elX, elY);

  // Elephant Body
  ctx.fillStyle = '#031f0f';
  ctx.beginPath();
  ctx.ellipse(0, 0, 110, 80, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Head
  ctx.beginPath();
  ctx.arc(-85, -25, 45, 0, Math.PI * 2);
  ctx.fillStyle = '#042813';
  ctx.fill();
  ctx.stroke();

  // Trunk
  ctx.beginPath();
  ctx.moveTo(-110, -10);
  ctx.quadraticCurveTo(-145, 30, -135, 75);
  ctx.quadraticCurveTo(-125, 85, -115, 70);
  ctx.quadraticCurveTo(-125, 30, -95, 5);
  ctx.closePath();
  ctx.fillStyle = '#031f0f';
  ctx.fill();
  ctx.stroke();

  // Tusks
  ctx.strokeStyle = '#6ee7b7';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-105, 5);
  ctx.quadraticCurveTo(-125, 25, -110, 45);
  ctx.stroke();

  // Legs
  [-50, -10, 30, 70].forEach((lx) => {
    ctx.fillStyle = '#02170b';
    ctx.fillRect(lx - 15, 30, 30, 80);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.strokeRect(lx - 15, 30, 30, 80);
  });

  // AI Target Tracking Bounding Box
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 2;
  ctx.strokeRect(-160, -85, 300, 200);

  // Corner brackets
  const bSize = 24;
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 4;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(-160, -85 + bSize);
  ctx.lineTo(-160, -85);
  ctx.lineTo(-160 + bSize, -85);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(140 - bSize, -85);
  ctx.lineTo(140, -85);
  ctx.lineTo(140, -85 + bSize);
  ctx.stroke();

  // AI Detection Tag
  ctx.fillStyle = '#10b981';
  ctx.fillRect(-160, -112, 180, 24);
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('ELEPHAS MAXIMUS 98.4%', -154, -96);

  ctx.restore();

  // Label
  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('03 // AI WILDLIFE CONFLICT SHIELD • BOUNDARY SENTRY', w / 2, h - 36);
}

// 04 — RESUME FORGE (Violet/Purple Floating ATS Resume Sheets + Verification Badges)
function renderResumeForgeArtwork(ctx: CanvasRenderingContext2D) {
  const w = 1024;
  const h = 768;

  // Dark Indigo/Violet Cosmic Background
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#090314');
  bg.addColorStop(0.5, '#1e0b38');
  bg.addColorStop(1, '#0c041a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Violet Nebula Radial
  const rad = ctx.createRadialGradient(w / 2, h * 0.48, 10, w / 2, h * 0.48, 380);
  rad.addColorStop(0, 'rgba(192, 132, 252, 0.45)');
  rad.addColorStop(0.4, 'rgba(147, 51, 234, 0.25)');
  rad.addColorStop(1, 'transparent');
  ctx.fillStyle = rad;
  ctx.fillRect(0, 0, w, h);

  // Floating Perspective Resume Document Sheets
  const drawResumeDoc = (
    x: number,
    y: number,
    scale: number,
    angle: number,
    alpha: number,
    accent: string
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.globalAlpha = alpha;

    const docW = 260;
    const docH = 340;

    // Drop shadow
    ctx.shadowColor = 'rgba(168, 85, 247, 0.4)';
    ctx.shadowBlur = 30;

    // Doc paper
    ctx.fillStyle = '#140c28';
    ctx.beginPath();
    ctx.roundRect(-docW / 2, -docH / 2, docW, docH, 12);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Top Header Banner
    ctx.fillStyle = accent;
    ctx.fillRect(-docW / 2 + 16, -docH / 2 + 20, 70, 16);

    // Profile Avatar
    ctx.beginPath();
    ctx.arc(docW / 2 - 36, -docH / 2 + 36, 18, 0, Math.PI * 2);
    ctx.fillStyle = '#2e1065';
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text Lines
    ctx.fillStyle = 'rgba(233, 213, 255, 0.85)';
    ctx.fillRect(-docW / 2 + 16, -docH / 2 + 48, 120, 8);

    ctx.fillStyle = 'rgba(216, 180, 254, 0.4)';
    for (let i = 0; i < 6; i++) {
      ctx.fillRect(-docW / 2 + 16, -docH / 2 + 75 + i * 16, docW - 32, 6);
    }

    // Skills Badges
    const badgeColors = ['#c084fc', '#38bdf8', '#34d399'];
    badgeColors.forEach((col, idx) => {
      ctx.fillStyle = col;
      ctx.fillRect(-docW / 2 + 16 + idx * 56, -docH / 2 + 185, 48, 14);
    });

    // ATS Score Card
    ctx.fillStyle = '#1e1035';
    ctx.fillRect(-docW / 2 + 16, -docH / 2 + 220, docW - 32, 65);
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-docW / 2 + 16, -docH / 2 + 220, docW - 32, 65);

    ctx.fillStyle = '#a855f7';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('ATS PASS SCORE: 98 / 100', -docW / 2 + 26, -docH / 2 + 245);

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('✓ KEYWORDS VERIFIED', -docW / 2 + 26, -docH / 2 + 265);

    ctx.restore();
  };

  // Three floating cards in perspective
  drawResumeDoc(w * 0.28, h * 0.5, 0.85, -12, 0.7, '#a855f7');
  drawResumeDoc(w * 0.72, h * 0.52, 0.85, 12, 0.7, '#c084fc');
  drawResumeDoc(w / 2, h * 0.48, 1.05, 0, 1.0, '#e879f9');

  // Label
  ctx.fillStyle = '#c084fc';
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('04 // RESUME FORGE • INTERACTIVE ATS STUDIO', w / 2, h - 36);
}

// 05 — NK MERN CLI (Dark Terminal Console + Cyan >_ Prompt + Docker Containers)
function renderMernCliArtwork(ctx: CanvasRenderingContext2D) {
  const w = 1024;
  const h = 768;

  // Dark Slate / Cyber Matrix Background
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#010914');
  bg.addColorStop(0.5, '#04152d');
  bg.addColorStop(1, '#020b17');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Cyan Radial Nebula
  const rad = ctx.createRadialGradient(w / 2, h * 0.48, 10, w / 2, h * 0.48, 380);
  rad.addColorStop(0, 'rgba(0, 245, 255, 0.35)');
  rad.addColorStop(0.5, 'rgba(3, 105, 161, 0.2)');
  rad.addColorStop(1, 'transparent');
  ctx.fillStyle = rad;
  ctx.fillRect(0, 0, w, h);

  // Floating Terminal Window
  const termW = 680;
  const termH = 440;
  const termX = (w - termW) / 2;
  const termY = (h - termH) / 2 - 10;

  // Terminal Window Box
  ctx.fillStyle = '#061020';
  ctx.beginPath();
  ctx.roundRect(termX, termY, termW, termH, 14);
  ctx.fill();
  ctx.strokeStyle = '#00f5ff';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Terminal Window Title Bar
  ctx.fillStyle = '#0c1d38';
  ctx.beginPath();
  ctx.roundRect(termX, termY, termW, 40, [14, 14, 0, 0]);
  ctx.fill();

  // Traffic Light Window Control Dots
  const dots = [
    { x: termX + 24, c: '#ef4444' },
    { x: termX + 44, c: '#f59e0b' },
    { x: termX + 64, c: '#10b981' },
  ];
  dots.forEach((d) => {
    ctx.beginPath();
    ctx.arc(d.x, termY + 20, 6, 0, Math.PI * 2);
    ctx.fillStyle = d.c;
    ctx.fill();
  });

  // Title Bar text
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('bash — nk-mern-cli v2.4.0 — 80x24', w / 2, termY + 25);

  // Terminal Content Lines
  ctx.textAlign = 'left';
  ctx.font = '16px monospace';

  const lines = [
    { text: '$ npm install -g nk-mern-cli', color: '#38bdf8' },
    { text: '$ nk-mern init modern-enterprise-app', color: '#00f5ff' },
    { text: '  ✔ Validating architectural dependencies...', color: '#10b981' },
    { text: '  ✔ Generating React 18 + Vite client boilerplate', color: '#10b981' },
    { text: '  ✔ Provisioning Node.js Express JWT authentication', color: '#10b981' },
    { text: '  ✔ Configuring MongoDB Mongoose schemas', color: '#10b981' },
    { text: '  ✔ Scaffolding Docker & Docker-Compose cluster', color: '#38bdf8' },
    { text: '  ✔ Generating GitHub Actions CI/CD workflows', color: '#f59e0b' },
    { text: '', color: '#ffffff' },
    { text: '✨ Success! Enterprise full-stack scaffold ready in 2.8s', color: '#34d399' },
    { text: '$ cd modern-enterprise-app && npm run dev', color: '#ffffff' },
    { text: '⚡ Ready on http://localhost:3000', color: '#00f5ff' },
  ];

  lines.forEach((l, idx) => {
    ctx.fillStyle = l.color;
    ctx.fillText(l.text, termX + 28, termY + 75 + idx * 27);
  });

  // Blinking Cyan Cursor
  ctx.fillStyle = '#00f5ff';
  ctx.fillRect(termX + 28 + ctx.measureText('⚡ Ready on http://localhost:3000').width + 10, termY + 360, 10, 18);

  // Label
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('05 // NK MERN CLI • ARCHITECTURE AUTOMATION', w / 2, h - 36);
}
