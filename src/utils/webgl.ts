// Cached WebGL availability status
let cachedWebGLStatus: boolean | null = null;

export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  if (cachedWebGLStatus !== null) return cachedWebGLStatus;

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');

    if (!gl) {
      cachedWebGLStatus = false;
      return false;
    }

    // Release test context immediately to avoid wasting context quota
    const ext = (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context');
    if (ext) {
      ext.loseContext();
    }

    cachedWebGLStatus = true;
    return true;
  } catch {
    cachedWebGLStatus = false;
    return false;
  }
}

export function resetWebGLCache(): void {
  cachedWebGLStatus = null;
}
