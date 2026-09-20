import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneNumber } from '../types';

interface CinematicCameraProps {
  currentScene: SceneNumber;
  prefersReducedMotion?: boolean;
}

export function CinematicCamera({ currentScene, prefersReducedMotion = false }: CinematicCameraProps) {
  const { camera, size } = useThree();
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchActiveRef = useRef<boolean>(false);

  // Handle subtle pointer parallax
  useEffect(() => {
    const onPointerMove = (e: MouseEvent) => {
      if (touchActiveRef.current) return;
      mousePosRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchActiveRef.current = true;
        const touch = e.touches[0];
        mousePosRef.current = {
          x: (touch.clientX / window.innerWidth - 0.5) * 1.2,
          y: (touch.clientY / window.innerHeight - 0.5) * 1.2,
        };
      }
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  useFrame((state, delta) => {
    const aspect = size.width / (size.height || 1);
    const isPortrait = aspect < 1.0;
    const isTablet = aspect >= 1.0 && aspect < 1.4;
    const isUltrawide = aspect > 2.0;

    // Motion damping for reduced motion
    const motionFactor = prefersReducedMotion ? 0.2 : 1.0;
    const mouseParallaxX = mousePosRef.current.x * (isPortrait ? 0.2 : 0.45) * motionFactor;
    const mouseParallaxY = -mousePosRef.current.y * (isPortrait ? 0.15 : 0.35) * motionFactor;
    const t = state.clock.elapsedTime * motionFactor;

    // Responsive camera distance multiplier based on aspect ratio
    // In portrait mode, narrow horizontal FOV requires greater camera distance to prevent clipping
    let zDistanceMod = 1.0;
    if (isPortrait) {
      // Scale inversely with aspect ratio, clamped safely
      zDistanceMod = Math.min(1.75, Math.max(1.35, 0.75 / aspect));
    } else if (isTablet) {
      zDistanceMod = 1.18;
    } else if (isUltrawide) {
      zDistanceMod = 0.95;
    }

    // Responsive vertical offset: on mobile portrait, lift the 3D focal center slightly
    // so it doesn't collide with the bottom HUD subtitles & progress bar
    const verticalOffset = isPortrait ? 0.45 : 0;

    let targetPos = new THREE.Vector3(0, verticalOffset, 7 * zDistanceMod);
    let lookTargetY = isPortrait ? 0.25 : 0;

    switch (currentScene as number) {
      case 1:
        // Scene 1: Close center focus on single seed particle
        targetPos.set(
          0,
          verticalOffset,
          (5.8 + Math.sin(t * 0.8) * 0.1) * (isPortrait ? 1.2 : 1.0)
        );
        break;

      case 2:
        // Scene 2: Wide head-on view of the majestic Letter N
        targetPos.set(
          mouseParallaxX * 0.6,
          verticalOffset + mouseParallaxY * 0.6,
          7.2 * zDistanceMod
        );
        break;

      case 3:
        // Scene 3: Angled 3D view showcasing globe depth
        targetPos.set(
          (isPortrait ? 0.2 : 0.8) + mouseParallaxX * 0.6,
          verticalOffset + 0.2 + mouseParallaxY * 0.5,
          7.4 * zDistanceMod
        );
        break;

      case 4:
        // Scene 4: Cinematic gentle camera drift around orbital rings
        targetPos.set(
          Math.sin(t * 0.2) * (isPortrait ? 0.6 : 1.2) + mouseParallaxX,
          verticalOffset + Math.cos(t * 0.25) * (isPortrait ? 0.3 : 0.5) + mouseParallaxY,
          7.8 * zDistanceMod
        );
        break;

      case 5:
        // Scene 5: Centered view capturing vertical energy beam
        targetPos.set(
          mouseParallaxX * 0.3,
          verticalOffset + mouseParallaxY * 0.3,
          8.2 * zDistanceMod
        );
        break;

      case 6:
        // Scene 6: Majestic framing for identity typography
        targetPos.set(
          mouseParallaxX * 0.4,
          verticalOffset + (isPortrait ? 0.4 : 0) + mouseParallaxY * 0.4,
          8.5 * zDistanceMod
        );
        lookTargetY = isPortrait ? 0.4 : 0;
        break;

      case 7:
        // Scene 7: Interactive responsive framing for Home Universe Core and glowing pedestal
        targetPos.set(
          mouseParallaxX * (isPortrait ? 0.3 : 0.4),
          (isPortrait ? 0.2 : 0.0) + mouseParallaxY * (isPortrait ? 0.25 : 0.35),
          (isPortrait ? 7.6 : 6.8) * zDistanceMod
        );
        lookTargetY = isPortrait ? 0.15 : 0.0;
        break;

      case 8:
        // Scene 8: Futuristic Japanese Sanctuary (Huge Circular Moonlit Window)
        if (isPortrait) {
          // On portrait mobile: lift camera and frame the circular portal in the upper half
          targetPos.set(
            0.6 + mouseParallaxX * 0.2,
            0.45 + mouseParallaxY * 0.2,
            5.8 * zDistanceMod
          );
          lookTargetY = 0.5;
        } else {
          // On desktop/tablet landscape: frame so portal & character occupy the right side, left side clear for UI panel
          targetPos.set(
            0.2 + mouseParallaxX * 0.35,
            -0.12 + mouseParallaxY * 0.3,
            4.8 * zDistanceMod
          );
          lookTargetY = 0.12;
        }
        break;
    }

    // Smooth camera position interpolation
    const lerpSpeed = prefersReducedMotion ? Math.min(delta * 1.5, 0.08) : Math.min(delta * 2.2, 0.12);
    camera.position.lerp(targetPos, lerpSpeed);
    const lookTargetX = currentScene === 7 ? 0 : (isPortrait ? 0.6 : 0.2);
    camera.lookAt(lookTargetX, lookTargetY, 0);
  });

  return null;
}
