import { useState, useEffect } from 'react';
import * as THREE from 'three';

// Global cache for loaded textures to prevent re-fetching
const textureCache = new Map<string, THREE.Texture>();

/**
 * Creates a clean, attractive fallback canvas texture while the remote image loads.
 */
function createFallbackTexture(title: string, accentColor: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Dark futuristic gradient
    const grad = ctx.createLinearGradient(0, 0, 1024, 640);
    grad.addColorStop(0, '#0a1526');
    grad.addColorStop(0.5, '#050c18');
    grad.addColorStop(1, '#081220');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 640);

    // Subtle digital grid lines
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 1024; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 640);
      ctx.stroke();
    }
    for (let y = 0; y <= 640; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Glowing border frame
    ctx.strokeStyle = accentColor || '#00f5ff';
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 12, 1000, 616);

    // Title & Status
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(title.toUpperCase(), 512, 310);

    ctx.fillStyle = accentColor || '#00f5ff';
    ctx.font = '20px monospace';
    ctx.fillText('INITIALIZING HOLOGRAPHIC STREAM...', 512, 360);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Loads a remote image URL as a Three.js Texture with CORS support and fallback
 */
export function useProjectTexture(
  imageUrl: string | undefined,
  title: string,
  accentColor: string
): THREE.Texture {
  const [texture, setTexture] = useState<THREE.Texture>(() => {
    if (imageUrl && textureCache.has(imageUrl)) {
      return textureCache.get(imageUrl)!;
    }
    return createFallbackTexture(title, accentColor);
  });

  useEffect(() => {
    if (!imageUrl) {
      setTexture(createFallbackTexture(title, accentColor));
      return;
    }

    if (textureCache.has(imageUrl)) {
      setTexture(textureCache.get(imageUrl)!);
      return;
    }

    let isMounted = true;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    loader.load(
      imageUrl,
      (loadedTexture) => {
        if (!isMounted) return;
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        loadedTexture.generateMipmaps = true;
        loadedTexture.needsUpdate = true;
        textureCache.set(imageUrl, loadedTexture);
        setTexture(loadedTexture);
      },
      undefined,
      (_err) => {
        // Fallback on load error
        if (isMounted) {
          const fallback = createFallbackTexture(title, accentColor);
          setTexture(fallback);
        }
      }
    );

    return () => {
      isMounted = false;
    };
  }, [imageUrl, title, accentColor]);

  return texture;
}
