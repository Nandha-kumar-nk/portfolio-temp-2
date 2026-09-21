import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable } from '../../../utils/webgl';

interface Studio3DCanvasProps {
  className?: string;
}

export const Studio3DCanvas: React.FC<Studio3DCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isWebGLAvailable()) return;
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0a192f, 2.5);
    scene.add(ambientLight);

    const cyanSpot = new THREE.PointLight(0x00f5ff, 4, 30);
    cyanSpot.position.set(0, 5, 5);
    scene.add(cyanSpot);

    const blueRimLight = new THREE.PointLight(0x3b82f6, 3, 25);
    blueRimLight.position.set(8, 4, -2);
    scene.add(blueRimLight);

    /* -------------------------------------------------------------------------- */
    /* 1. FLOATING DIGITAL GLOBE (Upper Right)                                     */
    /* -------------------------------------------------------------------------- */
    const globeGroup = new THREE.Group();
    globeGroup.position.set(6.8, 4.2, -4);

    // Core Sphere
    const globeGeo = new THREE.SphereGeometry(2.4, 32, 32);
    const globeMat = new THREE.MeshPhongMaterial({
      color: 0x071e3d,
      emissive: 0x002b4d,
      specular: 0x00f5ff,
      shininess: 40,
      transparent: true,
      opacity: 0.85,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // Wireframe Grid on Globe
    const wireGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(2.42, 20, 20));
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.35,
    });
    const wireLine = new THREE.LineSegments(wireGeo, wireMat);
    globeGroup.add(wireLine);

    // Orbital Rings around Globe
    const ringGeo = new THREE.TorusGeometry(3.6, 0.03, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 2.8;
    ringMesh1.rotation.y = Math.PI / 6;
    globeGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh2.rotation.x = -Math.PI / 3;
    ringMesh2.rotation.z = Math.PI / 4;
    globeGroup.add(ringMesh2);

    // Orbital satellite/photon point
    const satGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff });
    const satMesh = new THREE.Mesh(satGeo, satMat);
    satMesh.position.set(3.6, 0, 0);
    ringMesh1.add(satMesh);

    scene.add(globeGroup);

    /* -------------------------------------------------------------------------- */
    /* 2. SMALL FUTURISTIC DRONE / ROBOT (Upper Left)                             */
    /* -------------------------------------------------------------------------- */
    const droneGroup = new THREE.Group();
    droneGroup.position.set(-7.2, 4.0, -3.5);

    // Spherical Drone Body
    const droneBodyGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const droneBodyMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      metalness: 0.85,
      roughness: 0.25,
    });
    const droneBody = new THREE.Mesh(droneBodyGeo, droneBodyMat);
    droneGroup.add(droneBody);

    // Glowing Cyan Visor Ring
    const visorGeo = new THREE.TorusGeometry(0.85, 0.06, 16, 64);
    const visorMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.rotation.y = Math.PI / 2;
    droneGroup.add(visor);

    // Drone Eye Light
    const eyeGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff });
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.position.set(0.75, 0.1, 0.5);
    droneGroup.add(eye);

    // Small Antenna / Ring Thrusters
    const thrusterGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 16);
    const thrusterMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const thrusterL = new THREE.Mesh(thrusterGeo, thrusterMat);
    thrusterL.position.set(-0.8, -0.6, 0);
    thrusterL.rotation.z = Math.PI / 4;
    droneGroup.add(thrusterL);

    const thrusterR = new THREE.Mesh(thrusterGeo, thrusterMat);
    thrusterR.position.set(0.8, -0.6, 0);
    thrusterR.rotation.z = -Math.PI / 4;
    droneGroup.add(thrusterR);

    scene.add(droneGroup);

    /* -------------------------------------------------------------------------- */
    /* 3. FLOATING BOOKS (Near Drone / Upper Left Flank)                          */
    /* -------------------------------------------------------------------------- */
    const booksGroup = new THREE.Group();
    booksGroup.position.set(-5.6, 2.6, -4.5);

    const createBook = (color: number, yOffset: number, rotY: number) => {
      const bookMeshGroup = new THREE.Group();
      // Cover
      const coverGeo = new THREE.BoxGeometry(1.2, 0.15, 0.85);
      const coverMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.4,
      });
      const cover = new THREE.Mesh(coverGeo, coverMat);
      bookMeshGroup.add(cover);

      // White Pages
      const pagesGeo = new THREE.BoxGeometry(1.15, 0.11, 0.8);
      const pagesMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
      const pages = new THREE.Mesh(pagesGeo, pagesMat);
      pages.position.set(0.02, 0, 0);
      bookMeshGroup.add(pages);

      bookMeshGroup.position.y = yOffset;
      bookMeshGroup.rotation.y = rotY;
      bookMeshGroup.rotation.z = 0.08;
      return bookMeshGroup;
    };

    const book1 = createBook(0x0284c7, 0, 0.3);
    const book2 = createBook(0x0369a1, 0.25, -0.2);
    const book3 = createBook(0x0f172a, 0.5, 0.1);
    booksGroup.add(book1);
    booksGroup.add(book2);
    booksGroup.add(book3);
    scene.add(booksGroup);

    /* -------------------------------------------------------------------------- */
    /* 4. SUBTLE ATMOSPHERIC DRIFTING PARTICLES                                   */
    /* -------------------------------------------------------------------------- */
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 26;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 14;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f5ff,
      size: 0.06,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    /* -------------------------------------------------------------------------- */
    /* ANIMATION LOOP                                                             */
    /* -------------------------------------------------------------------------- */
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Globe rotation & gentle wobble
      globeMesh.rotation.y = elapsed * 0.08;
      wireLine.rotation.y = elapsed * 0.08;
      ringMesh1.rotation.z = elapsed * 0.15;
      ringMesh2.rotation.z = -elapsed * 0.12;
      globeGroup.position.y = 4.2 + Math.sin(elapsed * 0.8) * 0.15;

      // Drone subtle hovering bobbing motion
      droneGroup.position.y = 4.0 + Math.sin(elapsed * 1.2) * 0.2;
      droneGroup.rotation.y = Math.sin(elapsed * 0.6) * 0.15;
      droneGroup.rotation.z = Math.cos(elapsed * 0.8) * 0.08;

      // Floating Books gentle levitation
      booksGroup.position.y = 2.6 + Math.sin(elapsed * 0.7 + 1) * 0.15;
      booksGroup.rotation.y = Math.sin(elapsed * 0.3) * 0.1;

      // Subtle particle drift
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        array[i] -= 0.005;
        if (array[i] < -8) array[i] = 8;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="threejs-studio-canvas"
      className={`absolute inset-0 pointer-events-none z-5 overflow-hidden ${className}`}
    />
  );
};
