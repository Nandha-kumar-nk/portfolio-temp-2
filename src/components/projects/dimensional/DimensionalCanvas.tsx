import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DimensionalDoorway } from './DimensionalDoorway';

interface DimensionalCanvasProps {
  isMobile?: boolean;
}

const SceneController: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  useFrame((state) => {
    // Subtle pointer parallax on desktop
    if (!isMobile) {
      const targetX = state.pointer.x * 0.3;
      const targetY = state.pointer.y * 0.2;
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      {/* Lighting Suite */}
      <ambientLight color="#0c192c" intensity={0.75} />
      <directionalLight position={[2.5, 3.5, 4]} intensity={1.2} color="#f0f9ff" />
      <directionalLight position={[-2.5, -1.5, 2]} intensity={0.4} color="#38bdf8" />
      <pointLight position={[0, 1.6, -1.2]} intensity={1.4} color="#00f5ff" distance={4} />

      {/* The Central Dimensional Doorway */}
      <DimensionalDoorway isMobile={isMobile} />
    </>
  );
};

export const DimensionalCanvas: React.FC<DimensionalCanvasProps> = ({ isMobile = false }) => {
  return (
    <div
      id="dimensional-doorway-canvas-container"
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      <Canvas
        camera={{
          position: [0, 0, isMobile ? 5.4 : 5.1],
          fov: isMobile ? 46 : 42,
          near: 0.1,
          far: 50,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <SceneController isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
};
