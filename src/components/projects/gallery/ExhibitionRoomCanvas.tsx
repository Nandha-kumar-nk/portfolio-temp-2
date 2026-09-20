import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ExhibitionRoomCanvasProps {
  activeProjectId: string;
  hoveredProjectId: string | null;
  isDetailOpen: boolean;
}

export const ExhibitionRoomCanvas: React.FC<ExhibitionRoomCanvasProps> = ({
  activeProjectId: _activeProjectId,
  hoveredProjectId: _hoveredProjectId,
  isDetailOpen,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030308');
    scene.fog = new THREE.FogExp2('#030308', 0.045);

    // Camera setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 8.5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // 1. Reflective Obsidian Exhibition Floor
    const floorGeometry = new THREE.PlaneGeometry(30, 30, 24, 24);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: '#050711',
      roughness: 0.25,
      metalness: 0.85,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.2;
    scene.add(floor);

    // 2. Subtle Architectural Perspective Grid
    const gridHelper = new THREE.GridHelper(26, 26, '#00f5ff', '#0e172a');
    gridHelper.position.y = -1.19;
    const gridMat = gridHelper.material as THREE.LineBasicMaterial;
    gridMat.opacity = 0.18;
    gridMat.transparent = true;
    scene.add(gridHelper);

    // 3. Subtle Volumetric Ambient Lighting & Spotlights
    const ambientLight = new THREE.AmbientLight('#081020', 1.2);
    scene.add(ambientLight);

    // Center ceiling key light
    const centerSpot = new THREE.SpotLight('#00f5ff', 2.0, 20, Math.PI / 4, 0.4, 1.2);
    centerSpot.position.set(0, 7, 3);
    centerSpot.target.position.set(0, 0, 0);
    scene.add(centerSpot);
    scene.add(centerSpot.target);

    // Secondary subtle purple/blue fill
    const purpleFill = new THREE.DirectionalLight('#818cf8', 0.6);
    purpleFill.position.set(-5, 4, 2);
    scene.add(purpleFill);

    const warmFill = new THREE.DirectionalLight('#38bdf8', 0.5);
    warmFill.position.set(5, 4, 2);
    scene.add(warmFill);

    // 4. Subtle Exhibition Dust Motes / Particles (Restrained count)
    const particleCount = prefersReducedMotion ? 40 : 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = Math.random() * 5 - 1.0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      opacities[i] = Math.random() * 0.5 + 0.2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: '#38bdf8',
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 5. Mouse Parallax Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = normX * 0.4;
      mouseRef.current.targetY = normY * 0.2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      if (!prefersReducedMotion) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        // Camera gentle drift & parallax
        const targetZ = isDetailOpen ? 6.2 : 8.5;
        camera.position.x = mouseRef.current.x * 0.8;
        camera.position.y = 1.8 + mouseRef.current.y * 0.4;
        camera.position.z += (targetZ - camera.position.z) * 0.04;
        camera.lookAt(0, 0.4, 0);

        // Gentle dust drift
        const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          posArray[i * 3 + 1] += 0.002 * Math.sin(elapsedTime + i);
          if (posArray[i * 3 + 1] > 4.5) {
            posArray[i * 3 + 1] = -0.5;
          }
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      floorGeometry.dispose();
      floorMaterial.dispose();
      gridHelper.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isDetailOpen]);

  return (
    <div
      ref={containerRef}
      id="exhibition-room-canvas-container"
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
};
