import * as THREE from 'three';
import { PROJECT_ASSETS } from './projectAssets';

// Cache generated textures to avoid recreating on every render
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Generates high-resolution 512x512 textures for 3D Project Cube faces.
 * Applies THREE.TextureLoader / HTML5 Canvas image rendering with zero purple-flooding.
 */
export function getCubeFaceTexture(
  projectId: string,
  face: 'front' | 'side' | 'top',
  accentColor: string = '#00f5ff'
): THREE.CanvasTexture {
  const cacheKey = `${projectId}_${face}_${accentColor}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const asset = PROJECT_ASSETS[projectId] || PROJECT_ASSETS['resume-forge'];
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // 1. Base Dark Navy Glass Fill
  ctx.fillStyle = '#020919';
  ctx.fillRect(0, 0, 512, 512);

  // Soft Radial Glow
  const radGrad = ctx.createRadialGradient(256, 256, 20, 256, 256, 260);
  radGrad.addColorStop(0, 'rgba(8, 25, 50, 0.9)');
  radGrad.addColorStop(0.7, 'rgba(4, 15, 32, 0.95)');
  radGrad.addColorStop(1, '#020919');
  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, 512, 512);

  // Immediate synchronous fallback render
  if (face === 'front') {
    drawFrontFaceUiFallback(ctx, asset, accentColor);
  } else if (face === 'side') {
    drawSideFaceTelemetry(ctx, asset, accentColor);
  } else {
    drawTopFaceBadge(ctx, asset, accentColor);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  // Asynchronous Image Loader using SVG Data URL
  if (face === 'front' && asset.dataUrl) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.clearRect(0, 0, 512, 512);
      ctx.drawImage(img, 0, 0, 512, 512);
      texture.needsUpdate = true;
    };
    img.src = asset.dataUrl;
  }

  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Synchronous immediate renderer for front face software UI screenshot.
 */
function drawFrontFaceUiFallback(
  ctx: CanvasRenderingContext2D,
  asset: typeof PROJECT_ASSETS['resume-forge'],
  accentColor: string
) {
  const x = 16;
  const y = 16;
  const w = 480;
  const h = 480;

  ctx.save();
  // Window frame
  ctx.fillStyle = '#030e22';
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, x, y, w, h, 16);
  ctx.fill();
  ctx.stroke();

  // Top header bar
  ctx.fillStyle = '#091b36';
  drawRoundedRectTop(ctx, x, y, w, 44, 16);
  ctx.fill();

  // Window dots
  ctx.fillStyle = '#ff5f56';
  ctx.beginPath();
  ctx.arc(x + 22, y + 22, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffbd2e';
  ctx.beginPath();
  ctx.arc(x + 40, y + 22, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#27c93f';
  ctx.beginPath();
  ctx.arc(x + 58, y + 22, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px system-ui, sans-serif';
  ctx.fillText(asset.title, x + 76, y + 26);

  // Body preview specifics
  if (asset.id === 'resume-forge') {
    // Left Editor Panel
    ctx.fillStyle = '#081730';
    ctx.strokeStyle = 'rgba(192, 132, 252, 0.4)';
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, x + 12, y + 54, 160, 396, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('RESUME EDITOR', x + 24, y + 78);

    const steps = ['1. Profile', '2. Experience', '3. Projects', '4. Skills', '5. ATS Score'];
    steps.forEach((s, idx) => {
      ctx.fillStyle = idx === 1 ? '#c084fc' : '#0f2444';
      drawRoundedRect(ctx, x + 20, y + 92 + idx * 42, 144, 32, 6);
      ctx.fill();

      ctx.fillStyle = idx === 1 ? '#030816' : '#cbd5e1';
      ctx.font = 'bold 10px system-ui, sans-serif';
      ctx.fillText(s, x + 28, y + 112 + idx * 42);
    });

    // Right Paper Resume Document
    const rx = x + 182;
    ctx.fillStyle = '#f8fafc';
    drawRoundedRect(ctx, rx, y + 54, 270, 396, 8);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText('NANDHAKUMAR', rx + 14, y + 80);

    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 10px system-ui, sans-serif';
    ctx.fillText('FULL STACK SOFTWARE ENGINEER', rx + 14, y + 96);

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(rx + 14, y + 104);
    ctx.lineTo(rx + 256, y + 104);
    ctx.stroke();

    // Document Lines
    ctx.fillStyle = '#0369a1';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('WORK EXPERIENCE', rx + 14, y + 122);

    ctx.fillStyle = '#334155';
    ctx.font = '9px system-ui, sans-serif';
    ctx.fillText('Senior MERN Developer • Tech Studio', rx + 14, y + 138);
    ctx.fillText('• Designed real-time APIs with WebSockets', rx + 14, y + 152);
    ctx.fillText('• Built ATS studio with instant PDF scoring', rx + 14, y + 166);

    ctx.fillStyle = '#0369a1';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('TECHNICAL SKILLS', rx + 14, y + 190);

    ctx.fillStyle = '#334155';
    ctx.font = '9px system-ui, sans-serif';
    ctx.fillText('React, TypeScript, Node.js, Supabase, Tailwind', rx + 14, y + 206);

    // Floating ATS Badge
    ctx.fillStyle = '#030816';
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, rx + 110, y + 290, 146, 140, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 26px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('98/100', rx + 183, y + 340);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px system-ui, sans-serif';
    ctx.fillText('ATS MATCH SCORE ✓', rx + 183, y + 368);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px system-ui, sans-serif';
    ctx.fillText('Ready for Top Tech', rx + 183, y + 390);
    ctx.textAlign = 'left';
  } else {
    // Generic Software Preview
    ctx.fillStyle = '#071830';
    drawRoundedRect(ctx, x + 20, y + 60, 440, 380, 12);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillText(asset.title, x + 40, y + 110);

    ctx.fillStyle = accentColor;
    ctx.font = 'bold 14px monospace';
    ctx.fillText(asset.category, x + 40, y + 140);
  }

  ctx.restore();
}

function drawSideFaceTelemetry(
  ctx: CanvasRenderingContext2D,
  asset: typeof PROJECT_ASSETS['resume-forge'],
  accentColor: string
) {
  ctx.save();
  ctx.translate(256, 256);

  ctx.lineWidth = 3;
  ctx.strokeStyle = accentColor;

  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const px = Math.cos(angle) * 160;
    const py = Math.sin(angle) * 160;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(asset.name.toUpperCase(), 0, -10);

  ctx.fillStyle = accentColor;
  ctx.font = 'bold 13px monospace';
  ctx.fillText(asset.category, 0, 18);

  ctx.restore();
}

function drawTopFaceBadge(
  ctx: CanvasRenderingContext2D,
  asset: typeof PROJECT_ASSETS['resume-forge'],
  accentColor: string
) {
  ctx.save();
  ctx.translate(256, 256);

  ctx.lineWidth = 4;
  ctx.strokeStyle = accentColor;
  ctx.beginPath();
  ctx.arc(0, 0, 150, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = accentColor;
  ctx.font = 'bold 44px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('NK', 0, 10);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px monospace';
  ctx.fillText(asset.category, 0, 48);

  ctx.restore();
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawRoundedRectTop(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
