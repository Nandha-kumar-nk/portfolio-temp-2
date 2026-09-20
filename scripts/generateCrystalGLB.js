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

function buildCrystalModel() {
  const scene = new THREE.Scene();
  scene.name = 'CrystalArchiveHero';

  // 1. MAIN FACETED CRYSTAL
  // Height: ~2.6 units (apex to apex)
  // Half-height: 1.3
  // Waist radius: 0.62
  const hApex = 1.32;
  const wFront = 0.58;
  const hFront = 0.46;
  const dFront = 0.22;
  const wOuter = 0.72;
  const dBack = -0.28;

  const vertices = [
    // 0: Top Apex
    0, hApex, 0,
    // 1: Bottom Apex
    0, -hApex, 0,
    // 2: Front-Top-Left
    -wFront, hFront, dFront,
    // 3: Front-Top-Right
    wFront, hFront, dFront,
    // 4: Front-Bot-Right
    wFront, -hFront, dFront,
    // 5: Front-Bot-Left
    -wFront, -hFront, dFront,
    // 6: Left-Waist
    -wOuter, 0, 0,
    // 7: Right-Waist
    wOuter, 0, 0,
    // 8: Back-Top-Left
    -wFront * 0.82, hFront * 0.85, dBack,
    // 9: Back-Top-Right
    wFront * 0.82, hFront * 0.85, dBack,
    // 10: Back-Bot-Right
    wFront * 0.82, -hFront * 0.85, dBack,
    // 11: Back-Bot-Left
    -wFront * 0.82, -hFront * 0.85, dBack,
    // 12: Back-Keel (Center)
    0, 0, dBack * 1.3,
  ];

  const indices = [
    // Front flat window
    2, 5, 4,
    2, 4, 3,
    // Top bevel to apex
    0, 2, 3,
    // Bottom bevel to apex
    1, 4, 5,
    // Left front bevel
    2, 6, 5,
    // Right front bevel
    3, 4, 7,
    // Top lateral facets
    0, 6, 2,
    0, 3, 7,
    0, 8, 6,
    0, 7, 9,
    0, 9, 8,
    // Bottom lateral facets
    1, 5, 6,
    1, 7, 4,
    1, 6, 11,
    1, 10, 7,
    1, 11, 10,
    // Back facets to Keel
    12, 8, 9,
    12, 9, 10,
    12, 10, 11,
    12, 11, 8,
    // Flanks
    6, 8, 11,
    7, 10, 9,
  ];

  const crystalGeo = new THREE.BufferGeometry();
  crystalGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  crystalGeo.setIndex(indices);
  crystalGeo.computeVertexNormals();

  const crystalMat = new THREE.MeshStandardMaterial({
    name: 'CrystalShellMaterial',
    color: new THREE.Color(0xd9f2fe),
    emissive: new THREE.Color(0x00f5ff),
    emissiveIntensity: 0.12,
    roughness: 0.08,
    metalness: 0.15,
    transparent: true,
    opacity: 0.82,
  });

  const mainCrystal = new THREE.Mesh(crystalGeo, crystalMat);
  mainCrystal.name = 'MainCrystal';
  scene.add(mainCrystal);

  // 2. INNER CORE
  const coreGeo = new THREE.IcosahedronGeometry(0.14, 2);
  const coreMat = new THREE.MeshStandardMaterial({
    name: 'InnerCoreMaterial',
    color: new THREE.Color(0x00f5ff),
    emissive: new THREE.Color(0x00f5ff),
    emissiveIntensity: 1.8,
    roughness: 0.2,
    metalness: 0.1,
  });
  const innerCore = new THREE.Mesh(coreGeo, coreMat);
  innerCore.name = 'InnerCore';
  innerCore.position.set(0, 0, -0.15);
  scene.add(innerCore);

  // 3. CONTROLLED CRACKS
  const crackLines = [];
  const crackSeeds = [
    [-0.3, 0.4, 0.15, -0.1, 0.1, 0.2],
    [-0.1, 0.1, 0.2, 0.2, 0.2, 0.18],
    [0.2, 0.2, 0.18, 0.35, -0.2, 0.16],
    [0.35, -0.2, 0.16, 0.1, -0.35, 0.19],
    [-0.2, -0.15, 0.18, -0.35, -0.35, 0.14],
    [-0.1, 0.1, 0.2, -0.2, -0.15, 0.18],
    [0, 0.6, 0.08, 0.15, 0.3, 0.14],
    [0, -0.6, 0.08, -0.15, -0.3, 0.14],
  ];
  crackSeeds.forEach(([x1, y1, z1, x2, y2, z2]) => {
    crackLines.push(x1, y1, z1, x2, y2, z2);
  });
  const crackGeo = new THREE.BufferGeometry();
  crackGeo.setAttribute('position', new THREE.Float32BufferAttribute(crackLines, 3));
  const crackMesh = new THREE.LineSegments(
    crackGeo,
    new THREE.LineBasicMaterial({ name: 'CrackMaterial', color: new THREE.Color(0x00f5ff) })
  );
  crackMesh.name = 'CrackMesh';
  scene.add(crackMesh);

  // 4. SHARD GROUP (32 shards for smooth cinematic shatter)
  const shardGroup = new THREE.Group();
  shardGroup.name = 'ShardGroup';
  const shardCount = 32;

  for (let i = 0; i < shardCount; i++) {
    const s = 0.045 + (i % 3) * 0.015;
    const shardGeo = new THREE.TetrahedronGeometry(s, 0);
    const shardMat = new THREE.MeshStandardMaterial({
      name: `ShardMat_${i}`,
      color: new THREE.Color(0xdff4fd),
      emissive: new THREE.Color(0x00f5ff),
      emissiveIntensity: 0.35,
      roughness: 0.12,
      metalness: 0.2,
      transparent: true,
      opacity: 0.65,
    });
    const shard = new THREE.Mesh(shardGeo, shardMat);
    shard.name = `Shard_${i.toString().padStart(2, '0')}`;

    const angle = (i / shardCount) * Math.PI * 2;
    const y = ((i % 8) - 3.5) / 4 * 0.85;
    const r = (1 - Math.abs(y) * 0.45) * 0.68;
    shard.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r);
    shard.rotation.set((i * 0.7) % Math.PI, (i * 1.1) % Math.PI, (i * 0.4) % Math.PI);

    shardGroup.add(shard);
  }
  scene.add(shardGroup);

  // 5. METALLIC PLATFORM & ENERGY RING
  const platform = new THREE.Group();
  platform.name = 'Platform';
  platform.position.set(0, -hApex - 0.18, 0);

  // Base tier
  const dais = new THREE.Mesh(
    new THREE.CylinderGeometry(0.92, 1.0, 0.08, 48),
    new THREE.MeshStandardMaterial({
      name: 'PlatformDais',
      color: new THREE.Color(0x060c18),
      metalness: 0.85,
      roughness: 0.25,
    })
  );
  dais.position.set(0, -0.04, 0);
  dais.name = 'PlatformDais';
  platform.add(dais);

  // Raised inner tier
  const tier = new THREE.Mesh(
    new THREE.CylinderGeometry(0.72, 0.75, 0.04, 48),
    new THREE.MeshStandardMaterial({
      name: 'PlatformTier',
      color: new THREE.Color(0x0a1526),
      metalness: 0.9,
      roughness: 0.18,
    })
  );
  tier.position.set(0, 0.02, 0);
  tier.name = 'PlatformTier';
  platform.add(tier);

  // Energy ring
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.74, 0.01, 16, 64),
    new THREE.MeshBasicMaterial({
      name: 'EnergyRing',
      color: new THREE.Color(0x00f5ff),
    })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.set(0, 0.045, 0);
  ring.name = 'EnergyRing';
  platform.add(ring);

  scene.add(platform);

  return scene;
}

const scene = buildCrystalModel();
const exporter = new GLTFExporter();

new Promise((resolve, reject) => {
  exporter.parse(scene, resolve, reject, { binary: true });
})
  .then((gltf) => {
    const outDir = path.join(process.cwd(), 'public', 'models');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    const outPath = path.join(outDir, 'crystal.glb');
    fs.writeFileSync(outPath, Buffer.from(gltf));
    console.log(`Crystal GLB successfully built at ${outPath}, size: ${fs.statSync(outPath).size} bytes`);
  })
  .catch((err) => {
    console.error('Error generating GLB:', err);
  });
