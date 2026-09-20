import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface BurstParticlesProps {
  progress: number; // 0 to 1
  direction: number; // 1: next (travel to right), -1: prev (travel to left)
}

export const BurstParticles: React.FC<BurstParticlesProps> = ({
  progress,
  direction = 1,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Pre-generate burst trajectories
  const { geometry, velocities, colors } = useMemo(() => {
    const count = 450;
    const positions = new Float32Array(count * 3);
    const vels = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const color1 = new THREE.Color('#00f5ff'); // cyan
    const color2 = new THREE.Color('#8b5cf6'); // violet
    const color3 = new THREE.Color('#38bdf8'); // sky blue
    const colorWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      // Start in spherical cluster around origin
      const r = 0.2 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Velocity: radial burst outwards + strong directional drift
      const speed = 2.5 + Math.random() * 5.0;
      vels[i * 3] = (Math.sin(phi) * Math.cos(theta) * 0.8 + direction * 2.2) * speed;
      vels[i * 3 + 1] = (Math.sin(phi) * Math.sin(theta) * 0.9 + (Math.random() - 0.5) * 0.8) * speed;
      vels[i * 3 + 2] = (Math.cos(phi) * 0.8) * speed;

      // Color distribution
      const pick = Math.random();
      const col = pick > 0.7 ? colorWhite : pick > 0.4 ? color1 : pick > 0.2 ? color2 : color3;
      cols[i * 3] = col.r;
      cols[i * 3 + 1] = col.g;
      cols[i * 3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));

    return { geometry: geo, velocities: vels, colors: cols };
  }, [direction]);

  // Canvas texture for particles
  const particleMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.3, 'rgba(0,245,255,0.9)');
      g.addColorStop(0.7, 'rgba(139,92,246,0.4)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 32, 32);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.14,
      map: particleMap,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [particleMap]);

  useFrame(() => {
    if (!pointsRef.current || progress <= 0) return;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    const count = array.length / 3;

    // Cubic ease out for outward blast
    const p = progress;
    const blastAmount = p * 1.6;

    for (let i = 0; i < count; i++) {
      // Calculate current position based on initial spread + velocity * progress
      array[i * 3] = velsCurrent(i, 0, blastAmount, direction);
      array[i * 3 + 1] = velsCurrent(i, 1, blastAmount, direction);
      array[i * 3 + 2] = velsCurrent(i, 2, blastAmount, direction);
    }
    posAttr.needsUpdate = true;

    // Particle opacity envelope: fade in quickly then fade out as progress approaches 1
    if (p < 0.15) {
      material.opacity = p / 0.15;
    } else if (p > 0.6) {
      material.opacity = Math.max(0, 1 - (p - 0.6) / 0.4);
    } else {
      material.opacity = 1;
    }

    material.size = 0.14 + p * 0.18;
  });

  function velsCurrent(i: number, axis: number, blast: number, dir: number) {
    const v = velocities[i * 3 + axis];
    // Directional drift along x
    if (axis === 0) {
      return (v * blast) + (dir * blast * blast * 4.0);
    }
    return v * blast;
  }

  if (progress <= 0 || progress >= 1) return null;

  return <primitive object={new THREE.Points(geometry, material)} ref={pointsRef} />;
};
