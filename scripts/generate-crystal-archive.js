import fs from 'fs';
import path from 'path';

// Polyfill FileReader for GLTFExporter in Node.js
global.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result =
        'data:application/octet-stream;base64,' +
        Buffer.from(buf).toString('base64');
      if (this.onloadend) this.onloadend();
    });
  }
};

async function generateCrystalArchive() {
  const THREE = await import('three');
  const { GLTFExporter } = await import(
    'three/examples/jsm/exporters/GLTFExporter.js'
  );

  const scene = new THREE.Scene();
  scene.name = 'CrystalArchiveScene';

  const rootGroup = new THREE.Group();
  rootGroup.name = 'CrystalArchive';
  scene.add(rootGroup);

  // =========================================================================
  // 1. PRECISION ASYMMETRICAL FACETED CRYSTAL GEOMETRY
  // =========================================================================
  // 5 Tiers + Apex + Base
  const pTop = new THREE.Vector3(0.06, 1.18, 0.04);

  // Tier 1: Upper Cap Ring (y ~ 0.82) - 6 vertices
  const ring1 = [
    new THREE.Vector3(0.28, 0.82, 0.30),
    new THREE.Vector3(0.44, 0.80, -0.06),
    new THREE.Vector3(0.25, 0.83, -0.36),
    new THREE.Vector3(-0.30, 0.81, -0.32),
    new THREE.Vector3(-0.46, 0.80, 0.08),
    new THREE.Vector3(-0.18, 0.83, 0.36),
  ];

  // Tier 2: Shoulder Ring (y ~ 0.38) - 8 vertices
  const ring2 = [
    new THREE.Vector3(0.42, 0.38, 0.40),
    new THREE.Vector3(0.60, 0.36, 0.10),
    new THREE.Vector3(0.54, 0.39, -0.28),
    new THREE.Vector3(0.14, 0.40, -0.50),
    new THREE.Vector3(-0.36, 0.38, -0.46),
    new THREE.Vector3(-0.58, 0.37, -0.10),
    new THREE.Vector3(-0.52, 0.36, 0.32),
    new THREE.Vector3(-0.06, 0.39, 0.52),
  ];

  // Tier 3: Waist Ring (y ~ -0.18) - 8 vertices
  const ring3 = [
    new THREE.Vector3(0.46, -0.18, 0.44),
    new THREE.Vector3(0.64, -0.18, 0.08),
    new THREE.Vector3(0.52, -0.18, -0.34),
    new THREE.Vector3(0.12, -0.18, -0.54),
    new THREE.Vector3(-0.40, -0.18, -0.48),
    new THREE.Vector3(-0.62, -0.18, -0.06),
    new THREE.Vector3(-0.50, -0.18, 0.38),
    new THREE.Vector3(-0.04, -0.18, 0.54),
  ];

  // Tier 4: Lower Taper Ring (y ~ -0.72) - 6 vertices
  const ring4 = [
    new THREE.Vector3(0.36, -0.72, 0.34),
    new THREE.Vector3(0.48, -0.72, -0.06),
    new THREE.Vector3(0.28, -0.72, -0.38),
    new THREE.Vector3(-0.28, -0.72, -0.36),
    new THREE.Vector3(-0.44, -0.72, 0.08),
    new THREE.Vector3(-0.16, -0.72, 0.38),
  ];

  // Tier 5: Flat Base Ring (y ~ -1.06) - 6 vertices
  const baseRing = [
    new THREE.Vector3(0.20, -1.06, 0.18),
    new THREE.Vector3(0.26, -1.06, -0.06),
    new THREE.Vector3(0.14, -1.06, -0.22),
    new THREE.Vector3(-0.16, -1.06, -0.20),
    new THREE.Vector3(-0.24, -1.06, 0.06),
    new THREE.Vector3(-0.08, -1.06, 0.22),
  ];
  const pBottom = new THREE.Vector3(0.01, -1.07, 0.01);

  // Build triangle soup with flat face normals
  const triVertices = [];

  function addTri(a, b, c) {
    triVertices.push(a.x, a.y, a.z);
    triVertices.push(b.x, b.y, b.z);
    triVertices.push(c.x, c.y, c.z);
  }

  function addQuad(a, b, c, d) {
    // 2 triangles: a-b-c and a-c-d
    addTri(a, b, c);
    addTri(a, c, d);
  }

  // 1. Apex to Ring 1 (6 triangles)
  for (let i = 0; i < 6; i++) {
    const next = (i + 1) % 6;
    addTri(pTop, ring1[i], ring1[next]);
  }

  // 2. Ring 1 (6 vertices) to Ring 2 (8 vertices)
  // Connect with clean polygonal bridge
  addQuad(ring1[0], ring2[0], ring2[1], ring1[1]);
  addTri(ring1[1], ring2[1], ring2[2]);
  addQuad(ring1[1], ring2[2], ring2[3], ring1[2]);
  addQuad(ring1[2], ring2[3], ring2[4], ring1[3]);
  addQuad(ring1[3], ring2[4], ring2[5], ring1[4]);
  addTri(ring1[4], ring2[5], ring2[6]);
  addQuad(ring1[4], ring2[6], ring2[7], ring1[5]);
  addQuad(ring1[5], ring2[7], ring2[0], ring1[0]);

  // 3. Ring 2 (8 vertices) to Ring 3 (8 vertices) - 8 quads (midriff facets)
  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    addQuad(ring2[i], ring3[i], ring3[next], ring2[next]);
  }

  // 4. Ring 3 (8 vertices) to Ring 4 (6 vertices)
  addQuad(ring3[0], ring4[0], ring4[1], ring3[1]);
  addTri(ring3[1], ring3[2], ring4[1]);
  addQuad(ring3[2], ring4[1], ring4[2], ring3[3]);
  addQuad(ring3[3], ring4[2], ring4[3], ring3[4]);
  addQuad(ring3[4], ring4[3], ring4[4], ring3[5]);
  addTri(ring3[5], ring3[6], ring4[4]);
  addQuad(ring3[6], ring4[4], ring4[5], ring3[7]);
  addQuad(ring3[7], ring4[5], ring4[0], ring3[0]);

  // 5. Ring 4 (6 vertices) to Base Ring (6 vertices) - 6 quads
  for (let i = 0; i < 6; i++) {
    const next = (i + 1) % 6;
    addQuad(ring4[i], baseRing[i], baseRing[next], ring4[next]);
  }

  // 6. Base bottom cap (6 triangles toward pBottom)
  for (let i = 0; i < 6; i++) {
    const next = (i + 1) % 6;
    addTri(pBottom, baseRing[next], baseRing[i]);
  }

  // Build non-indexed geometry for crystalMain
  const mainGeom = new THREE.BufferGeometry();
  mainGeom.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(triVertices, 3)
  );
  mainGeom.computeVertexNormals();

  const crystalMat = new THREE.MeshStandardMaterial({
    color: 0xe0f4ff,
    roughness: 0.1,
    metalness: 0.1,
    transparent: true,
    opacity: 0.82,
  });

  const crystalMesh = new THREE.Mesh(mainGeom, crystalMat);
  crystalMesh.name = 'Crystal_Main';
  rootGroup.add(crystalMesh);

  // =========================================================================
  // 2. INNER GLOWING CORE (Inner_Core)
  // =========================================================================
  const coreGeom = new THREE.OctahedronGeometry(0.28, 1);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff });
  const coreMesh = new THREE.Mesh(coreGeom, coreMat);
  coreMesh.name = 'Inner_Core';
  coreMesh.position.set(0, 0.02, 0);
  rootGroup.add(coreMesh);

  // =========================================================================
  // 3. ENERGY ORBIT RING (Energy_Ring)
  // =========================================================================
  const ringGeom = new THREE.TorusGeometry(0.65, 0.012, 16, 64);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff });
  const ringMesh = new THREE.Mesh(ringGeom, ringMat);
  ringMesh.name = 'Energy_Ring';
  ringMesh.rotation.x = Math.PI / 2;
  ringMesh.position.set(0, -0.05, 0);
  rootGroup.add(ringMesh);

  // =========================================================================
  // 4. INNER DISPLAY PLANE (Placeholder for compatibility)
  // =========================================================================
  const displayGeom = new THREE.PlaneGeometry(0.5, 0.35);
  const displayMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0,
  });
  const displayMesh = new THREE.Mesh(displayGeom, displayMat);
  displayMesh.name = 'Inner_Project_Display';
  displayMesh.position.set(0, 0, 0.04);
  displayMesh.visible = false;
  rootGroup.add(displayMesh);

  // =========================================================================
  // 5. 20 CONTROLLED, MEANINGFUL CRYSTAL SHARDS (Crystal_Shard_01 to 20)
  // =========================================================================
  // Group vertices into ~20 distinct facet clusters to create 3D shards
  const totalTriangles = triVertices.length / 9; // each triangle has 9 floats
  const shardCount = 20;
  const trisPerShard = Math.floor(totalTriangles / shardCount);

  for (let s = 0; s < shardCount; s++) {
    const startTri = s * trisPerShard;
    const endTri =
      s === shardCount - 1 ? totalTriangles : (s + 1) * trisPerShard;

    const shardTriFloats = [];
    let cx = 0,
      cy = 0,
      cz = 0,
      vCount = 0;

    for (let t = startTri; t < endTri; t++) {
      const idx = t * 9;
      for (let k = 0; k < 3; k++) {
        const vx = triVertices[idx + k * 3];
        const vy = triVertices[idx + k * 3 + 1];
        const vz = triVertices[idx + k * 3 + 2];
        cx += vx;
        cy += vy;
        cz += vz;
        vCount++;
      }
    }
    cx /= Math.max(1, vCount);
    cy /= Math.max(1, vCount);
    cz /= Math.max(1, vCount);

    // Build extruded shard geometry around its centroid
    for (let t = startTri; t < endTri; t++) {
      const idx = t * 9;
      // Outer face (relative to shard centroid)
      const a = new THREE.Vector3(
        triVertices[idx] - cx,
        triVertices[idx + 1] - cy,
        triVertices[idx + 2] - cz
      );
      const b = new THREE.Vector3(
        triVertices[idx + 3] - cx,
        triVertices[idx + 4] - cy,
        triVertices[idx + 5] - cz
      );
      const c = new THREE.Vector3(
        triVertices[idx + 6] - cx,
        triVertices[idx + 7] - cy,
        triVertices[idx + 8] - cz
      );

      // Inner thickness face (inset slightly toward origin)
      const inset = 0.88;
      const ai = a.clone().multiplyScalar(inset);
      const bi = b.clone().multiplyScalar(inset);
      const ci = c.clone().multiplyScalar(inset);

      // Front
      shardTriFloats.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
      // Back
      shardTriFloats.push(
        ci.x,
        ci.y,
        ci.z,
        bi.x,
        bi.y,
        bi.z,
        ai.x,
        ai.y,
        ai.z
      );
      // Sides
      shardTriFloats.push(a.x, a.y, a.z, ai.x, ai.y, ai.z, bi.x, bi.y, bi.z);
      shardTriFloats.push(a.x, a.y, a.z, bi.x, bi.y, bi.z, b.x, b.y, b.z);

      shardTriFloats.push(b.x, b.y, b.z, bi.x, bi.y, bi.z, ci.x, ci.y, ci.z);
      shardTriFloats.push(b.x, b.y, b.z, ci.x, ci.y, ci.z, c.x, c.y, c.z);

      shardTriFloats.push(c.x, c.y, c.z, ci.x, ci.y, ci.z, ai.x, ai.y, ai.z);
      shardTriFloats.push(c.x, c.y, c.z, ai.x, ai.y, ai.z, a.x, a.y, a.z);
    }

    const shardGeom = new THREE.BufferGeometry();
    shardGeom.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(shardTriFloats, 3)
    );
    shardGeom.computeVertexNormals();

    const shardMat = new THREE.MeshStandardMaterial({
      color: 0xd8f2fd,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.75,
    });

    const shardMesh = new THREE.Mesh(shardGeom, shardMat);
    const sId = (s + 1).toString().padStart(2, '0');
    shardMesh.name = `Crystal_Shard_${sId}`;
    shardMesh.position.set(cx, cy, cz);
    rootGroup.add(shardMesh);
  }

  // =========================================================================
  // 6. CRACK NETWORK MESH (CrackMesh)
  // =========================================================================
  const crackPoints = [];
  // Internal fractures radiating from center
  const crackAngles = [
    0.3, 1.1, 1.9, 2.7, 3.5, 4.3, 5.1, 5.9,
  ];
  crackAngles.forEach((ang) => {
    crackPoints.push(0, 0.05, 0);
    crackPoints.push(
      Math.cos(ang) * 0.45,
      Math.sin(ang * 1.5) * 0.55,
      Math.sin(ang) * 0.35
    );
    // Fork
    crackPoints.push(
      Math.cos(ang) * 0.45,
      Math.sin(ang * 1.5) * 0.55,
      Math.sin(ang) * 0.35
    );
    crackPoints.push(
      Math.cos(ang + 0.25) * 0.72,
      Math.sin(ang * 1.5) * 0.75,
      Math.sin(ang + 0.25) * 0.5
    );
  });
  const crackGeom = new THREE.BufferGeometry();
  crackGeom.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(crackPoints, 3)
  );
  const crackMat = new THREE.LineBasicMaterial({
    color: 0x00f5ff,
    transparent: true,
    opacity: 0.85,
  });
  const crackMesh = new THREE.LineSegments(crackGeom, crackMat);
  crackMesh.name = 'CrackMesh';
  crackMesh.visible = false;
  rootGroup.add(crackMesh);

  // =========================================================================
  // EXPORT TO GLB
  // =========================================================================
  const exporter = new GLTFExporter();
  return new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (glb) => {
        const outPath = path.resolve(
          process.cwd(),
          'public/models/CrystalArchive.glb'
        );
        fs.writeFileSync(outPath, Buffer.from(glb));
        console.log(
          `Successfully created museum-grade CrystalArchive.glb at: ${outPath} (${glb.byteLength} bytes)`
        );
        resolve(glb);
      },
      reject,
      { binary: true }
    );
  });
}

generateCrystalArchive().catch((err) => {
  console.error('Failed to generate crystal archive:', err);
  process.exit(1);
});
