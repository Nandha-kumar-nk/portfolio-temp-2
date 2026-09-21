let cachedWebGLStatus: boolean | null = null;

export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  if (cachedWebGLStatus !== null) {
    return cachedWebGLStatus;
  }

  try {
    const canvas = document.createElement('canvas');

    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl');

    cachedWebGLStatus = gl !== null;

    return cachedWebGLStatus;
  } catch (error) {
    console.error('[WebGL] Detection failed:', error);
    cachedWebGLStatus = false;
    return false;
  }
}

export function resetWebGLCache(): void {
  cachedWebGLStatus = null;
}