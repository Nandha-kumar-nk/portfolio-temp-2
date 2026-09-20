import fs from 'fs';
import path from 'path';
import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

// Polyfill FileReader for Node
globalThis.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onload) this.onload({ target: this });
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
};

/**
 * Creates the exact Blender hierarchy requested:
 * CrystalArchive
 * ├── Crystal_Main
 * ├── Inner_Core
 * ├── Crystal_Shard_01 .. Crystal_Shard_08
 * ├── Energy_Ring
 * └── Inner_Project_Display
 */
function buildCrystalArchiveScene() {
  const root = new THREE.Group();
  root.name = 'CrystalArchive';

  // --- 1. CRYSTAL MAIN (Hexagonal Bipyramidal with flat front display face & bevels) ---
  const hApex = 1.25;
  const rWaist = 0.55;
  const frontZ = 0.22;
  const backZ = -0.28;
  const wFront = 0.46;
  const hFront = 0.42;

  // Build vertex array for double-pyramid crystal
  const vertices = [
    // 0: Top Apex
    0, hApex, 0,
    // 1: Bottom Apex
    0, -hApex, 0,
    // 2: Front Top Left
    -wFront, hFront, frontZ,
    // 3: Front Top Right
    wFront, hFront, frontZ,
    // 4: Front Bottom Right
    wFront, -hFront, frontZ,
    // 5: Front Bottom Left
    -wFront, -hFront, frontZ,
    // 6: Waist Left
    -rWaist * 1.15, 0, 0,
    // 7: Waist Right
    rWaist * 1.15, 0, 0,
    // 8: Back Top Left
    -wFront * 0.85, hFront * 0.9, backZ,
    // 9: Back Top Right
    wFront * 0.85, hFront * 0.9, backZ,
    // 10: Back Bottom Right
    wFront * 0.85, -hFront * 0.9, backZ,
    // 11: Back Bottom Left
    -wFront * 0.85, -hFront * 0.9, backZ,
    // 12: Back Keel Ridge
    0, 0, backZ * 1.35,
  ];

  const indices = [
    // Front window face
    2, 5, 4,
    2, 4, 3,
    // Top bevel to apex
    0, 2, 3,
    // Bottom bevel to apex
    1, 4, 5,
    // Left front bevel
    0, 6, 2,
    2, 6, 5,
    1, 5, 6,
    // Right front bevel
    0, 3, 7,
    3, 4, 7,
    1, 7, 4,
    // Back facets
    0, 8, 6,
    0, 9, 8,
    0, 7, 9,
    1, 6, 11,
    1, 11, 10,
    1, 10, 7,
    // Keel facets
    12, 8, 9,
    12, 9, 10,
    12, 10, 11,
    12, 11, 8,
    // Side flank fills
    6, 8, 11,
    7, 10, 9,
  ];

  const crystalGeo = new THREE.BufferGeometry();
  crystalGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  crystalGeo.setIndex(indices);
  crystalGeo.computeVertexNormals();

  const crystalMat = new THREE.MeshStandardMaterial({
    name: 'CrystalGlassMaterial',
    color: new THREE.Color(0xd6f4fe),
    emissive: new THREE.Color(0x00f5ff),
    emissiveIntensity: 0.15,
    roughness: 0.06,
    metalness: 0.15,
    transparent: true,
    opacity: 0.8,
  });

  const crystalMain = new THREE.Mesh(crystalGeo, crystalMat);
  crystalMain.name = 'Crystal_Main';
  root.add(crystalMain);

  // --- 2. INNER CORE (Glowing core) ---
  const coreGeo = new THREE.OctahedronGeometry(0.16, 1);
  const coreMat = new THREE.MeshStandardMaterial({
    name: 'InnerCoreMaterial',
    color: new THREE.Color(0x00f5ff),
    emissive: new THREE.Color(0x00f5ff),
    emissiveIntensity: 1.6,
    roughness: 0.2,
    metalness: 0.1,
  });
  const innerCore = new THREE.Mesh(coreGeo, coreMat);
  innerCore.name = 'Inner_Core';
  innerCore.position.set(0, 0, -0.05);
  root.add(innerCore);

  // --- 3. CRYSTAL SHARDS 01 TO 08 (Predefined geometric shards) ---
  const shardParams = [
    { pos: [-0.45, 0.55, 0.15], rot: [0.3, 0.4, 0.2], s: 0.11 },
    { pos: [0.45, 0.55, 0.15], rot: [-0.3, -0.4, 0.1], s: 0.12 },
    { pos: [-0.55, -0.05, 0.12], rot: [0.1, 0.6, -0.3], s: 0.13 },
    { pos: [0.55, -0.05, 0.12], rot: [-0.1, -0.6, 0.3], s: 0.13 },
    { pos: [-0.4, -0.55, 0.15], rot: [0.4, -0.2, 0.5], s: 0.11 },
    { pos: [0.4, -0.55, 0.15], rot: [-0.4, 0.2, -0.5], s: 0.12 },
    { pos: [0.0, 0.85, -0.15], rot: [0.5, 0.0, 0.2], s: 0.14 },
    { pos: [0.0, -0.85, -0.15], rot: [-0.5, 0.0, -0.2], s: 0.14 },
  ];

  shardParams.forEach((param, i) => {
    const shardGeo = new THREE.TetrahedronGeometry(param.s, 0);
    const shardMat = new THREE.MeshStandardMaterial({
      name: `ShardMaterial_0${i + 1}`,
      color: new THREE.Color(0xe2f7ff),
      emissive: new THREE.Color(0x00f5ff),
      emissiveIntensity: 0.35,
      roughness: 0.08,
      metalness: 0.15,
      transparent: true,
      opacity: 0.72,
    });
    const shard = new THREE.Mesh(shardGeo, shardMat);
    shard.name = `Crystal_Shard_0${i + 1}`;
    shard.position.set(...param.pos);
    shard.rotation.set(...param.rot);
    root.add(shard);
  });

  // --- 4. ENERGY RING ---
  const ringGeo = new THREE.TorusGeometry(0.72, 0.012, 16, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    name: 'EnergyRingMaterial',
    color: new THREE.Color(0x00f5ff),
  });
  const energyRing = new THREE.Mesh(ringGeo, ringMat);
  energyRing.name = 'Energy_Ring';
  energyRing.rotation.x = Math.PI / 2;
  energyRing.position.set(0, -hApex - 0.12, 0);
  root.add(energyRing);

  // --- 5. INNER PROJECT DISPLAY (Hologram plane inside crystal) ---
  const displayGeo = new THREE.PlaneGeometry(0.62, 0.46);
  const displayMat = new THREE.MeshBasicMaterial({
    name: 'InnerDisplayMaterial',
    color: new THREE.Color(0x00f5ff),
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide,
  });
  const innerDisplay = new THREE.Mesh(displayGeo, displayMat);
  innerDisplay.name = 'Inner_Project_Display';
  innerDisplay.position.set(0, 0, 0.04);
  root.add(innerDisplay);

  const scene = new THREE.Scene();
  scene.add(root);
  return scene;
}

const scene = buildCrystalArchiveScene();
const exporter = new GLTFExporter();

new Promise((resolve, reject) => {
  exporter.parse(scene, resolve, reject, { binary: true });
})
  .then((gltf) => {
    const outDir = path.join(process.cwd(), 'public', 'models');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    const outPath = path.join(outDir, 'CrystalArchive.glb');
    fs.writeFileSync(outPath, Buffer.from(gltf));
    console.log(`CrystalArchive.glb successfully built at ${outPath}, size: ${fs.statSync(outPath).size} bytes`);
  })
  .catch((err) => {
    console.error('Error generating CrystalArchive.glb:', err);
  });
