export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return false;
    // Release the test context immediately so browser WebGL context quota is preserved
    const ext = (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context');
    if (ext) {
      ext.loseContext();
    }
    return true;
  } catch {
    return false;
  }
}
