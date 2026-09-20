import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ProjectItem } from '../../../data/projectsData';
import { PROJECT_THEMES } from './types';

interface ArenaEnvironmentProps {
  activeProject: ProjectItem;
  className?: string;
}

export const ArenaEnvironment: React.FC<ArenaEnvironmentProps> = ({
  activeProject,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const themeGroupRef = useRef<THREE.Group | null>(null);

  const activeTheme = PROJECT_THEMES[activeProject.id] || PROJECT_THEMES['swayam-2'];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Initialize Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x040814, 0.045);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3.2, 11);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0a1428, 1.2);
    scene.add(ambientLight);

    // Warm Sunset Key Light from back distance
    const sunLight = new THREE.DirectionalLight(0xffaa55, 1.5);
    sunLight.position.set(-15, 10, -25);
    scene.add(sunLight);

    // Front Cyan Rim Lights
    const cyanRim = new THREE.PointLight(0x00f5ff, 2.5, 30);
    cyanRim.position.set(0, 0.5, 2);
    scene.add(cyanRim);

    const purpleFill = new THREE.PointLight(0x9333ea, 1.8, 25);
    purpleFill.position.set(6, 4, -4);
    scene.add(purpleFill);

    // 3. Reflective Floor Grid with Concentric Rings
    const floorGeo = new THREE.PlaneGeometry(60, 60, 32, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x030712,
      roughness: 0.25,
      metalness: 0.85,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.2;
    scene.add(floor);

    // Concentric Neon Floor Rings
    const ringsGroup = new THREE.Group();
    ringsGroup.position.y = -1.18;
    ringsGroup.rotation.x = -Math.PI / 2;

    const ringRadii = [2.2, 3.4, 4.8, 6.5, 8.5];
    ringRadii.forEach((radius, idx) => {
      const ringGeo = new THREE.RingGeometry(radius, radius + 0.03, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? 0x00f5ff : 0x0284c7,
        transparent: true,
        opacity: 0.25 + idx * 0.08,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringsGroup.add(ringMesh);
    });
    scene.add(ringsGroup);

    // 4. Distant Floating Islands & Citadel
    const distantGroup = new THREE.Group();
    distantGroup.position.set(0, 0, -22);

    // Floating island rocks (procedural low-poly dodecahedrons / cones)
    const islandGeo = new THREE.DodecahedronGeometry(1.5, 1);
    const islandMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.9,
    });

    const islandPositions = [
      { x: -14, y: 3.5, z: -5, s: 1.6 },
      { x: 13, y: 4.2, z: -8, s: 2.2 },
      { x: -8, y: 1.8, z: -10, s: 1.1 },
      { x: 9, y: 1.5, z: -6, s: 1.4 },
      { x: 15, y: 6.5, z: -12, s: 1.8 }, // Citadels high up
    ];

    const islands: THREE.Mesh[] = [];
    islandPositions.forEach((pos) => {
      const mesh = new THREE.Mesh(islandGeo, islandMat);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.scale.set(pos.s, pos.s * 0.7, pos.s);
      distantGroup.add(mesh);
      islands.push(mesh);
    });
    scene.add(distantGroup);

    // 5. Atmospheric Floating Particle Field
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = Math.random() * 8 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      scales[i] = Math.random() * 0.08 + 0.02;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00f5ff,
      size: 0.12,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Dynamic Project Thematic Objects Group
    const themeGroup = new THREE.Group();
    scene.add(themeGroup);
    themeGroupRef.current = themeGroup;

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Camera subtle parallax
      camera.position.x += (mouseX - camera.position.x) * 0.04;
      camera.position.y += (3.2 - mouseY - camera.position.y) * 0.04;
      camera.lookAt(0, 1.2, 0);

      // Floor rings slow breathing rotation
      ringsGroup.rotation.z = elapsed * 0.04;

      // Particle floating drift
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += Math.sin(elapsed + i) * 0.002;
        if (posArray[i * 3 + 1] > 8) posArray[i * 3 + 1] = -0.5;
      }
      posAttr.needsUpdate = true;

      // Island slow levitation
      islands.forEach((island, i) => {
        island.position.y += Math.sin(elapsed * 0.6 + i) * 0.001;
      });

      // Thematic elements rotation
      if (themeGroupRef.current) {
        themeGroupRef.current.rotation.y = elapsed * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects cleanly
      floorGeo.dispose();
      floorMat.dispose();
      islandGeo.dispose();
      islandMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update theme-specific accent elements when active project changes
  useEffect(() => {
    if (!themeGroupRef.current) return;
    const group = themeGroupRef.current;

    // Clear previous theme objects
    while (group.children.length > 0) {
      const child = group.children[0] as THREE.Mesh;
      group.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
        else child.material.dispose();
      }
    }

    // Build project-specific floating elements
    const primaryColor = new THREE.Color(activeTheme.primary);

    if (activeProject.id === 'swayam-2') {
      // Floating Books & Knowledge Nodes
      const bookGeo = new THREE.BoxGeometry(0.35, 0.45, 0.08);
      const bookMat = new THREE.MeshStandardMaterial({
        color: 0x1e3a8a,
        emissive: 0x00f5ff,
        emissiveIntensity: 0.25,
      });
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const book = new THREE.Mesh(bookGeo, bookMat);
        book.position.set(Math.cos(angle) * 4.2, 1.8 + (i % 2) * 0.4, Math.sin(angle) * 4.2 - 2);
        book.rotation.set(0.2, angle + 0.4, 0.1);
        group.add(book);
      }
    } else if (activeProject.id === 'speed-taxi') {
      // Route Nodes & Waypoint Spheres
      const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      for (let i = 0; i < 8; i++) {
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set((Math.random() - 0.5) * 8, 1 + Math.random() * 2, (Math.random() - 0.5) * 6 - 2);
        group.add(node);
      }
    } else if (activeProject.id === 'wildlife-ai') {
      // Scanning Geospatial Rings
      const scanGeo = new THREE.RingGeometry(2.5, 2.54, 32);
      const scanMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const ring = new THREE.Mesh(scanGeo, scanMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(0, 0.5, -1);
      group.add(ring);
    } else if (activeProject.id === 'resume-forge') {
      // Floating Typographic Layer Slabs
      const docGeo = new THREE.PlaneGeometry(0.5, 0.7);
      const docMat = new THREE.MeshBasicMaterial({
        color: 0xc084fc,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      });
      for (let i = 0; i < 5; i++) {
        const slab = new THREE.Mesh(docGeo, docMat);
        slab.position.set(-3 + i * 1.5, 2.2 + (i % 2) * 0.3, -2 - (i % 3));
        slab.rotation.set(0.1, 0.2 * i, 0.05);
        group.add(slab);
      }
    } else if (activeProject.id === 'nk-mern-cli') {
      // Floating Terminal Brackets
      const codeGeo = new THREE.TorusGeometry(0.2, 0.03, 8, 24);
      const codeMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff });
      for (let i = 0; i < 6; i++) {
        const mesh = new THREE.Mesh(codeGeo, codeMat);
        mesh.position.set((i - 2.5) * 1.4, 2 + (i % 2) * 0.5, -2);
        group.add(mesh);
      }
    }
  }, [activeProject.id, activeTheme]);

  return (
    <div
      id="arena-3d-environment-container"
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
    >
      {/* Cinematic Background Panorama Layer (Misty Mountains & Floating Citadel Vista) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-screen pointer-events-none transition-opacity duration-1000"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 50% 30%, rgba(20, 35, 75, 0.75) 0%, rgba(6, 12, 26, 0.95) 75%, #030712 100%)',
        }}
      />

      {/* Atmospheric Volumetric Lighting Gradients (Matching reference concept image) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,245,255,0.12)_0%,rgba(147,51,234,0.06)_40%,transparent_75%)] pointer-events-none" />

      {/* Distant Temple/Citadel Silhouette overlay in deep twilight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <svg
          viewBox="0 0 1440 600"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Distant Floating Sanctuary Spires */}
          <path
            d="M 1200 350 L 1220 180 L 1240 350 Z"
            fill="#1e1b4b"
            opacity="0.5"
          />
          <path
            d="M 1230 350 L 1250 120 L 1270 350 Z"
            fill="#312e81"
            opacity="0.4"
          />
          <path
            d="M 1260 350 L 1280 220 L 1300 350 Z"
            fill="#1e1b4b"
            opacity="0.5"
          />

          {/* Left Archway Architecture Pillars */}
          <path
            d="M 0 0 L 120 0 L 120 450 Q 80 400 40 450 L 40 600 L 0 600 Z"
            fill="#050a14"
            opacity="0.85"
          />
          {/* Right Archway Architecture Pillars */}
          <path
            d="M 1320 0 L 1440 0 L 1440 600 L 1400 600 L 1400 450 Q 1360 400 1320 450 Z"
            fill="#050a14"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Soft Bottom Wet Floor Reflection & Vignette */}
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none" />
    </div>
  );
};
