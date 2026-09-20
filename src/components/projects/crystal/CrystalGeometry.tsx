import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CrystalGeometryProps {
  accentColor: string;
  themeColor: string;
  fractureProgress: number; // 0 (idle) to 1 (fractured)
  focusPulse?: number; // 0 to 1 for step 1 glow
  isMobile?: boolean;
}

/**
 * Creates an elongated, elegant faceted crystal geometry procedurally
 * with ~8-12 major visible facets and a flat front window facet
 * so the inner project screenshot is perfectly legible and unwarped.
 */
function createFacetedCrystalGeometry(scale: number = 1.0) {
  const geom = new THREE.BufferGeometry();

  // Coordinates scaled to match specifications
  const w = 0.72 * scale;      // Half-width of front window
  const h = 0.58 * scale;      // Half-height of front window
  const dFront = 0.22 * scale; // Z-depth of front facet
  const wOuter = 0.88 * scale; // Outer lateral waist edge
  const dBack = -0.32 * scale; // Back Z-depth
  const yApex = 1.32 * scale;  // Top/bottom apex height

  // Vertices definition:
  // 0: Top Apex
  // 1: Bottom Apex
  // 2: Front-Top-Left
  // 3: Front-Top-Right
  // 4: Front-Bot-Right
  // 5: Front-Bot-Left
  // 6: Left-Waist
  // 7: Right-Waist
  // 8: Back-Top-Left
  // 9: Back-Top-Right
  // 10: Back-Bot-Right
  // 11: Back-Bot-Left
  // 12: Back-Center Keel
  const vertices = [
    // 0: Top Apex
    0, yApex, 0,
    // 1: Bottom Apex
    0, -yApex, 0,
    // 2: Front-Top-Left
    -w, h, dFront,
    // 3: Front-Top-Right
    w, h, dFront,
    // 4: Front-Bot-Right
    w, -h, dFront,
    // 5: Front-Bot-Left
    -w, -h, dFront,
    // 6: Left-Waist
    -wOuter, 0, 0,
    // 7: Right-Waist
    wOuter, 0, 0,
    // 8: Back-Top-Left
    -w * 0.85, h * 0.9, dBack,
    // 9: Back-Top-Right
    w * 0.85, h * 0.9, dBack,
    // 10: Back-Bot-Right
    w * 0.85, -h * 0.9, dBack,
    // 11: Back-Bot-Left
    -w * 0.85, -h * 0.9, dBack,
    // 12: Back-Center Keel
    0, 0, dBack * 1.25,
  ];

  // Triangles defining the 8-12 major facets (CCW winding for outward normals)
  const indices = [
    // 1. Front Window Facet (Flat, camera-facing)
    2, 5, 4,
    2, 4, 3,

    // 2. Front-Top Bevel to Apex
    0, 2, 3,

    // 3. Front-Bottom Bevel to Bottom Apex
    1, 4, 5,

    // 4. Left-Front Bevel
    2, 6, 5,

    // 5. Right-Front Bevel
    3, 4, 7,

    // 6. Top-Left Facet
    0, 6, 2,

    // 7. Top-Right Facet
    0, 3, 7,

    // 8. Bottom-Left Facet
    1, 5, 6,

    // 9. Bottom-Right Facet
    1, 7, 4,

    // 10. Back-Top Facets
    0, 8, 6,
    0, 9, 8,
    0, 7, 9,

    // 11. Back-Bottom Facets
    1, 6, 11,
    1, 11, 10,
    1, 10, 7,

    // 12. Back-Center Spine
    8, 12, 6,
    9, 7, 12,
    6, 12, 11,
    7, 10, 12,
    8, 9, 12,
    11, 12, 10,
  ];

  geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();

  return geom;
}

export const CrystalGeometry: React.FC<CrystalGeometryProps> = ({
  accentColor,
  fractureProgress = 0,
  focusPulse = 0,
  isMobile = false,
}) => {
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const innerWireRef = useRef<THREE.LineSegments>(null);

  // Outer elongated faceted crystal geometry (clean, luxury sculpture)
  const outerGeom = useMemo(() => {
    return createFacetedCrystalGeometry(isMobile ? 0.88 : 1.02);
  }, [isMobile]);

  // Facet edge highlights (only true facet edges)
  const edgesGeom = useMemo(() => {
    return new THREE.EdgesGeometry(outerGeom, 20); // 20-degree threshold for clean facet outlines
  }, [outerGeom]);

  // Secondary inner shell (78% scale) positioned behind screenshot for optical depth
  const innerGeom = useMemo(() => {
    return createFacetedCrystalGeometry(isMobile ? 0.68 : 0.78);
  }, [isMobile]);

  const innerEdgesGeom = useMemo(() => {
    return new THREE.EdgesGeometry(innerGeom, 20);
  }, [innerGeom]);

  // Luxury transparent glass material: 75-80% visually transparent
  const outerMaterial = useMemo(() => {
    if (isMobile) {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#f0f9ff'),
        emissive: new THREE.Color(accentColor),
        emissiveIntensity: 0.12,
        roughness: 0.06,
        metalness: 0.18,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
        side: THREE.FrontSide,
      });
    }

    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f8fafc'),
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.14,
      roughness: 0.04,
      metalness: 0.12,
      transmission: 0.88,
      ior: 1.48,
      thickness: 0.35,
      transparent: true,
      opacity: 0.23,
      depthWrite: false,
      side: THREE.FrontSide,
    });
  }, [accentColor, isMobile]);

  // Thin illuminated facet edge lines (cyan/accent glow)
  const wireframeMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.6,
    });
  }, [accentColor]);

  // Inner subtle secondary facet layer with violet sheen
  const innerMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x071126,
      emissive: new THREE.Color('#8b5cf6'),
      emissiveIntensity: 0.22,
      roughness: 0.15,
      metalness: 0.35,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
      side: THREE.FrontSide,
    });
  }, []);

  const innerWireMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color('#a855f7'),
      transparent: true,
      opacity: 0.32,
    });
  }, []);

  useFrame((_state) => {
    if (outerMeshRef.current && wireframeRef.current) {
      if (fractureProgress > 0) {
        const expansion = 1 + fractureProgress * 0.32;
        outerMeshRef.current.scale.set(expansion, expansion, expansion);
        wireframeRef.current.scale.set(expansion, expansion, expansion);

        const fade = Math.max(0, 1 - fractureProgress * 1.5);
        outerMaterial.opacity = 0.23 * fade;
        wireframeMaterial.opacity = 0.6 * fade;
      } else {
        outerMeshRef.current.scale.set(1, 1, 1);
        wireframeRef.current.scale.set(1, 1, 1);

        if (focusPulse > 0) {
          outerMaterial.opacity = 0.23 + focusPulse * 0.22;
          wireframeMaterial.opacity = 0.6 + focusPulse * 0.3;
        } else {
          outerMaterial.opacity = 0.23;
          wireframeMaterial.opacity = 0.6;
        }
      }
    }

    if (innerMeshRef.current && innerWireRef.current) {
      if (fractureProgress > 0) {
        const p = fractureProgress;
        innerMaterial.opacity = Math.max(0, 0.16 * (1 - p * 2));
        innerWireMaterial.opacity = Math.max(0, 0.32 * (1 - p * 2));
      } else {
        innerMaterial.opacity = 0.16;
        innerWireMaterial.opacity = 0.32;
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Outer Faceted Glass Shell (~75-80% transparent) */}
      <mesh ref={outerMeshRef} geometry={outerGeom} material={outerMaterial} />

      {/* 2. Thin Glowing Facet Outlines */}
      <lineSegments ref={wireframeRef} geometry={edgesGeom} material={wireframeMaterial} />

      {/* 3. Inner Secondary Facets Layer (Behind screenshot at Z = -0.16) */}
      <group position={[0, 0, -0.16]}>
        <mesh ref={innerMeshRef} geometry={innerGeom} material={innerMaterial} />
        <lineSegments ref={innerWireRef} geometry={innerEdgesGeom} material={innerWireMaterial} />
      </group>
    </group>
  );
};
