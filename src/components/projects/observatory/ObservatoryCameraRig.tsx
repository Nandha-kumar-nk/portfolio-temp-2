import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectItem } from '../../../data/projectsData';

interface ObservatoryCameraRigProps {
  selectedProject: ProjectItem;
  isMobile?: boolean;
  isOverviewMode?: boolean;
}

export const ObservatoryCameraRig: React.FC<ObservatoryCameraRigProps> = ({
  selectedProject,
  isMobile = false,
  isOverviewMode = false,
}) => {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetCamPos = useRef(new THREE.Vector3(0, 0.25, 6.6));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.15, 0));

  // Check for prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  useFrame((state) => {
    // 1. Determine target camera & lookAt positions
    if (isOverviewMode) {
      targetCamPos.current.set(0, 0.2, isMobile ? 7.2 : 6.4);
      targetLookAt.current.set(0, 0.1, 0);
    } else if (isMobile) {
      // Mobile: Centered focus on active world + core in vertical perspective
      const [wx, wy, wz] = selectedProject.world3DPosition;
      targetCamPos.current.set(wx * 0.45, wy * 0.45 + 0.1, 5.0);
      targetLookAt.current.set(wx * 0.7, wy * 0.7, wz);
    } else {
      // Desktop: Elegant framing keeping the central NU Universe Core visible
      const [wx, wy, wz] = selectedProject.world3DPosition;

      switch (selectedProject.id) {
        case 'swayam-2': // Mid-Left [-3.1, 0.3, 0.2]
          targetCamPos.current.set(-1.1, 0.2, 5.2);
          targetLookAt.current.set(-1.6, 0.25, 0.1);
          break;

        case 'speed-taxi': // Top [0.2, 2.3, -0.1]
          targetCamPos.current.set(0.1, 1.1, 5.2);
          targetLookAt.current.set(0.15, 1.4, 0.0);
          break;

        case 'wildlife-ai': // Mid-Right [3.1, 0.4, 0.2]
          targetCamPos.current.set(1.1, 0.25, 5.2);
          targetLookAt.current.set(1.6, 0.3, 0.1);
          break;

        case 'resume-forge': // Bottom-Left [-2.1, -1.8, 0.3]
          targetCamPos.current.set(-0.8, -0.9, 5.1);
          targetLookAt.current.set(-1.2, -1.2, 0.2);
          break;

        case 'nk-mern-cli': // Bottom-Right [1.9, -2.1, 0.4]
          targetCamPos.current.set(0.8, -1.0, 5.1);
          targetLookAt.current.set(1.2, -1.3, 0.25);
          break;

        default:
          targetCamPos.current.set(0, 0.25, 5.8);
          targetLookAt.current.set(0, 0.15, 0);
      }
    }

    if (reducedMotion) {
      camera.position.copy(targetCamPos.current);
      camera.lookAt(targetLookAt.current);
      return;
    }

    // 2. Subtle pointer parallax for physical observatory feel (Desktop only, max 2-3 degrees)
    const px = isMobile ? 0 : state.pointer.x * 0.22;
    const py = isMobile ? 0 : state.pointer.y * 0.14;

    const desiredCamPos = new THREE.Vector3(
      targetCamPos.current.x + px,
      targetCamPos.current.y + py,
      targetCamPos.current.z
    );

    // 3. Cinematic smooth damping
    camera.position.lerp(desiredCamPos, 0.05);
    currentLookAt.current.lerp(targetLookAt.current, 0.05);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
