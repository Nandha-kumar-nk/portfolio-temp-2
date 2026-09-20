import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Node.js FileReader shim for GLTFExporter
global.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then(buf => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
};

console.log('Building 3D Developer Character matching strict character sheet...');

// Root Group
const characterRoot = new THREE.Group();
characterRoot.name = 'DeveloperCharacter';

// Color Palette from Character Reference Sheet
const PALETTE = {
  skin: 0xc68e68,
  skinShadow: 0xaa704c,
  hair: 0x0c0f14,
  beard: 0x141820,
  hoodie: 0x141820,
  hoodieDark: 0x0e1117,
  hoodieTrim: 0x1e2430,
  cyanGlow: 0x00f5ff,
  cyanBright: 0x7dd3fc,
  pants: 0x10131a,
  pantsPocket: 0x161a24,
  sneakerUpper: 0x0b0e14,
  sneakerMidsole: 0xf1f5f9,
  sneakerSole: 0x05070a,
  chairLeather: 0x161c26,
  chairCushion: 0x0f131a,
  chairChrome: 0x94a3b8,
  chairBase: 0x1e293b,
  shadow: 0x000000,
};

// Materials
const skinMat = new THREE.MeshStandardMaterial({
  color: PALETTE.skin,
  roughness: 0.65,
  metalness: 0.05,
  name: 'SkinMaterial',
});

const hairMat = new THREE.MeshStandardMaterial({
  color: PALETTE.hair,
  roughness: 0.75,
  metalness: 0.15,
  name: 'HairMaterial',
});

const beardMat = new THREE.MeshStandardMaterial({
  color: PALETTE.beard,
  roughness: 0.85,
  metalness: 0.05,
  name: 'BeardMaterial',
});

const hoodieMat = new THREE.MeshStandardMaterial({
  color: PALETTE.hoodie,
  roughness: 0.88,
  metalness: 0.02,
  name: 'HoodieMaterial',
});

const hoodieTrimMat = new THREE.MeshStandardMaterial({
  color: PALETTE.hoodieTrim,
  roughness: 0.85,
  metalness: 0.05,
  name: 'HoodieTrimMaterial',
});

const cyanGlowMat = new THREE.MeshStandardMaterial({
  color: PALETTE.cyanGlow,
  emissive: PALETTE.cyanGlow,
  emissiveIntensity: 2.8,
  roughness: 0.2,
  metalness: 0.1,
  name: 'CyanGlowMaterial',
});

const pantsMat = new THREE.MeshStandardMaterial({
  color: PALETTE.pants,
  roughness: 0.9,
  metalness: 0.02,
  name: 'CargoPantsMaterial',
});

const pantsPocketMat = new THREE.MeshStandardMaterial({
  color: PALETTE.pantsPocket,
  roughness: 0.88,
  metalness: 0.05,
  name: 'CargoPocketMaterial',
});

const sneakerUpperMat = new THREE.MeshStandardMaterial({
  color: PALETTE.sneakerUpper,
  roughness: 0.75,
  metalness: 0.15,
  name: 'SneakerUpperMaterial',
});

const sneakerMidsoleMat = new THREE.MeshStandardMaterial({
  color: PALETTE.sneakerMidsole,
  roughness: 0.35,
  metalness: 0.05,
  name: 'SneakerMidsoleMaterial',
});

const chairLeatherMat = new THREE.MeshStandardMaterial({
  color: PALETTE.chairLeather,
  roughness: 0.55,
  metalness: 0.1,
  name: 'ChairLeatherMaterial',
});

const chairCushionMat = new THREE.MeshStandardMaterial({
  color: PALETTE.chairCushion,
  roughness: 0.6,
  metalness: 0.08,
  name: 'ChairCushionMaterial',
});

const chromeMat = new THREE.MeshStandardMaterial({
  color: PALETTE.chairChrome,
  roughness: 0.2,
  metalness: 0.85,
  name: 'ChromeMaterial',
});

const baseMat = new THREE.MeshStandardMaterial({
  color: PALETTE.chairBase,
  roughness: 0.45,
  metalness: 0.6,
  name: 'ChairBaseMaterial',
});

// Helper for mesh creation
function createBox(w, h, d, mat, pos = [0, 0, 0], rot = [0, 0, 0], name = '') {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(...pos);
  mesh.rotation.set(...rot);
  if (name) mesh.name = name;
  return mesh;
}

function createCylinder(rT, rB, h, seg, mat, pos = [0, 0, 0], rot = [0, 0, 0], name = '') {
  const geo = new THREE.CylinderGeometry(rT, rB, h, seg);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(...pos);
  mesh.rotation.set(...rot);
  if (name) mesh.name = name;
  return mesh;
}

function createSphere(r, wSeg, hSeg, mat, pos = [0, 0, 0], scale = [1, 1, 1], name = '') {
  const geo = new THREE.SphereGeometry(r, wSeg, hSeg);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(...pos);
  mesh.scale.set(...scale);
  if (name) mesh.name = name;
  return mesh;
}

// =========================================================================
// 1. FUTURISTIC LOUNGE CHAIR (Matching "SITTING (CHAIR)" & "BACK VIEW (SITTING)")
// =========================================================================
const chairGroup = new THREE.Group();
chairGroup.name = 'LoungeChair';

// 5-Star Swivel Base
const swivelColumn = createCylinder(0.045, 0.055, 0.35, 16, chromeMat, [0, 0.175, 0], [0, 0, 0], 'SwivelColumn');
chairGroup.add(swivelColumn);

const baseCollar = createCylinder(0.07, 0.08, 0.05, 16, baseMat, [0, 0.035, 0], [0, 0, 0], 'BaseCollar');
chairGroup.add(baseCollar);

for (let i = 0; i < 5; i++) {
  const angle = (i * 2 * Math.PI) / 5;
  const leg = createBox(0.05, 0.03, 0.42, baseMat, [
    Math.sin(angle) * 0.22,
    0.02,
    Math.cos(angle) * 0.22
  ], [0, angle, 0], `ChairLeg_${i}`);
  chairGroup.add(leg);

  // Foot Glide Pad
  const glide = createCylinder(0.022, 0.025, 0.02, 12, baseMat, [
    Math.sin(angle) * 0.41,
    0.01,
    Math.cos(angle) * 0.41
  ], [0, 0, 0], `ChairGlide_${i}`);
  chairGroup.add(glide);
}

// Curved Outer Shell (Under-seat and backrest)
const seatShell = createBox(0.68, 0.08, 0.62, chairLeatherMat, [0, 0.38, 0.02], [-0.05, 0, 0], 'SeatShell');
chairGroup.add(seatShell);

const backrestShell = createBox(0.64, 0.65, 0.09, chairLeatherMat, [0, 0.72, -0.28], [0.18, 0, 0], 'BackrestShell');
chairGroup.add(backrestShell);

// Plush Leather Cushions
const seatCushion = createBox(0.62, 0.11, 0.58, chairCushionMat, [0, 0.45, 0.04], [-0.05, 0, 0], 'SeatCushion');
chairGroup.add(seatCushion);

const backrestCushion = createBox(0.58, 0.58, 0.1, chairCushionMat, [0, 0.74, -0.23], [0.18, 0, 0], 'BackrestCushion');
chairGroup.add(backrestCushion);

// Left & Right Armrests
const leftArmrest = createBox(0.08, 0.06, 0.52, chairCushionMat, [-0.34, 0.58, 0], [0.05, 0, 0], 'LeftArmrest');
const rightArmrest = createBox(0.08, 0.06, 0.52, chairCushionMat, [0.34, 0.58, 0], [0.05, 0, 0], 'RightArmrest');
chairGroup.add(leftArmrest, rightArmrest);

const leftArmPost = createCylinder(0.025, 0.025, 0.16, 12, chromeMat, [-0.34, 0.48, 0.05], [0, 0, 0], 'LeftArmPost');
const rightArmPost = createCylinder(0.025, 0.025, 0.16, 12, chromeMat, [0.34, 0.48, 0.05], [0, 0, 0], 'RightArmPost');
chairGroup.add(leftArmPost, rightArmPost);

characterRoot.add(chairGroup);

// =========================================================================
// 2. DEVELOPER CHARACTER (Seated in contemplative pose, looking toward moon)
// =========================================================================
const devGroup = new THREE.Group();
devGroup.name = 'Developer';

// Torso / Oversized Streetwear Hoodie
const torsoGroup = new THREE.Group();
torsoGroup.name = 'TorsoGroup';
torsoGroup.position.set(0, 0.62, -0.06);
torsoGroup.rotation.set(0.08, 0, 0);

// Main Hoodie Body (slightly relaxed, dropped shoulders)
const hoodieBody = createSphere(0.32, 24, 16, hoodieMat, [0, 0.16, 0], [1.02, 1.25, 0.88], 'HoodieBody');
torsoGroup.add(hoodieBody);

// Kangaroo Pocket (Front)
const pocket = createBox(0.34, 0.16, 0.07, hoodieTrimMat, [0, 0.08, 0.25], [-0.15, 0, 0], 'KangarooPocket');
torsoGroup.add(pocket);

// Ribbed Waistband Hem
const waistband = createCylinder(0.28, 0.29, 0.09, 20, hoodieTrimMat, [0, -0.16, 0], [0, 0, 0], 'Waistband');
torsoGroup.add(waistband);

// Draped Hood Collar on Shoulders/Back
const hoodCollar = createSphere(0.24, 18, 14, hoodieMat, [0, 0.35, -0.14], [1.1, 0.65, 0.95], 'HoodCollar');
torsoGroup.add(hoodCollar);

// -------------------------------------------------------------------------
// GLOWING "NU" BACK EMBLEM (Character Reference Sheet Back View)
// Large brilliant glowing cyan "NU" + "NANDHAKUMAR UNIVERSE" subtitle
// -------------------------------------------------------------------------
const backLogoGroup = new THREE.Group();
backLogoGroup.name = 'GlowingBackLogo';
backLogoGroup.position.set(0, 0.22, -0.275);
backLogoGroup.rotation.set(-0.06, Math.PI, 0);

// Bold "N"
const nLeft = createBox(0.024, 0.13, 0.012, cyanGlowMat, [-0.07, 0.02, 0], [0, 0, 0], 'N_Left');
const nDiag = createBox(0.024, 0.14, 0.012, cyanGlowMat, [-0.038, 0.02, 0], [0, 0, -0.52], 'N_Diag');
const nRight = createBox(0.024, 0.13, 0.012, cyanGlowMat, [-0.005, 0.02, 0], [0, 0, 0], 'N_Right');

// Bold "U"
const uLeft = createBox(0.024, 0.11, 0.012, cyanGlowMat, [0.032, 0.03, 0], [0, 0, 0], 'U_Left');
const uRight = createBox(0.024, 0.11, 0.012, cyanGlowMat, [0.088, 0.03, 0], [0, 0, 0], 'U_Right');
const uBottom = createBox(0.08, 0.024, 0.012, cyanGlowMat, [0.06, -0.035, 0], [0, 0, 0], 'U_Bottom');

// Subtitle bar
const subtitleBar = createBox(0.18, 0.014, 0.01, cyanGlowMat, [0.02, -0.068, 0], [0, 0, 0], 'SubtitleBar');

backLogoGroup.add(nLeft, nDiag, nRight, uLeft, uRight, uBottom, subtitleBar);
torsoGroup.add(backLogoGroup);

// Small Cyan Chest Logo (Left Front)
const chestLogo = createBox(0.045, 0.025, 0.01, cyanGlowMat, [-0.12, 0.25, 0.24], [0.1, 0.2, 0], 'ChestLogo');
torsoGroup.add(chestLogo);

// -------------------------------------------------------------------------
// HEAD, HAIR, FACE & BEARD (Tilted upward and turned toward the moon)
// -------------------------------------------------------------------------
const headGroup = new THREE.Group();
headGroup.name = 'HeadGroup';
// Head placed at neck, turned 30 deg to the right and tilted 15 deg upward (looking toward top-right moon!)
headGroup.position.set(0.02, 0.48, -0.04);
headGroup.rotation.set(-0.22, 0.42, 0.08);

// Neck
const neck = createCylinder(0.085, 0.095, 0.12, 16, skinMat, [0, -0.04, 0], [0, 0, 0], 'Neck');
headGroup.add(neck);

// Head / Face Core
const headBase = createSphere(0.17, 24, 18, skinMat, [0, 0.08, 0], [0.94, 1.08, 1.02], 'HeadBase');
headGroup.add(headBase);

// Jaw and Chin
const jaw = createBox(0.15, 0.11, 0.14, skinMat, [0, 0.02, 0.07], [0.35, 0, 0], 'Jaw');
headGroup.add(jaw);

// Trimmed Goatee & Beard
const beardChin = createBox(0.08, 0.06, 0.05, beardMat, [0, -0.04, 0.12], [0.4, 0, 0], 'BeardChin');
const mustache = createBox(0.09, 0.022, 0.03, beardMat, [0, 0.03, 0.15], [0.1, 0, 0], 'Mustache');
const sideburnL = createBox(0.02, 0.09, 0.03, beardMat, [-0.145, 0.07, 0.02], [0, 0, 0], 'Sideburn_L');
const sideburnR = createBox(0.02, 0.09, 0.03, beardMat, [0.145, 0.07, 0.02], [0, 0, 0], 'Sideburn_R');
headGroup.add(beardChin, mustache, sideburnL, sideburnR);

// Stylized Voluminous Wavy Dark Hair (Swept up and back, matching character sheet)
const hairGroup = new THREE.Group();
hairGroup.name = 'StylizedHair';

// Main Hair Volume (Crown & Back)
const hairMain = createSphere(0.19, 20, 16, hairMat, [0, 0.14, -0.03], [1.08, 1.15, 1.12], 'HairMain');
hairGroup.add(hairMain);

// Swept-Up Top Quiff Locks
const quiffLock1 = createSphere(0.12, 16, 12, hairMat, [0.03, 0.24, 0.05], [0.9, 1.25, 0.85], 'QuiffLock1');
const quiffLock2 = createSphere(0.11, 14, 10, hairMat, [-0.05, 0.22, 0.08], [0.8, 1.15, 0.9], 'QuiffLock2');
const quiffLock3 = createSphere(0.10, 14, 10, hairMat, [0.09, 0.21, 0.02], [1.0, 1.1, 0.85], 'QuiffLock3');
hairGroup.add(quiffLock1, quiffLock2, quiffLock3);

// Flowing Right-Swept Fringe
const hairFringe = createSphere(0.11, 14, 10, hairMat, [0.06, 0.18, 0.12], [1.2, 0.85, 0.75], 'HairFringe');
hairGroup.add(hairFringe);

// Hair Back Nape Tufts
const hairNape = createSphere(0.14, 16, 12, hairMat, [0, 0.04, -0.12], [1.05, 0.85, 0.8], 'HairNape');
hairGroup.add(hairNape);

headGroup.add(hairGroup);
torsoGroup.add(headGroup);

// -------------------------------------------------------------------------
// ARMS & HANDS (Contemplative Sitting Pose: Right arm props jaw, Left arm rests)
// -------------------------------------------------------------------------
// RIGHT ARM: Resting on armrest, forearm reaching up with hand supporting jaw
const rightArmGroup = new THREE.Group();
rightArmGroup.name = 'RightArm';
rightArmGroup.position.set(0.32, 0.28, 0);

const rightShoulder = createSphere(0.09, 14, 12, hoodieMat, [0, 0, 0], [1, 1, 1], 'R_Shoulder');
const rightBicep = createCylinder(0.075, 0.07, 0.24, 14, hoodieMat, [0.06, -0.11, 0.04], [0.35, 0, -0.45], 'R_Bicep');
const rightElbow = createSphere(0.072, 12, 10, hoodieMat, [0.12, -0.21, 0.10], [1, 1, 1], 'R_Elbow');
const rightForearm = createCylinder(0.065, 0.06, 0.26, 14, hoodieMat, [0.06, -0.06, 0.16], [-1.15, 0.45, -0.45], 'R_Forearm');
const rightWristCuff = createCylinder(0.062, 0.064, 0.04, 12, hoodieTrimMat, [0.0, 0.06, 0.21], [-1.15, 0.45, -0.45], 'R_Cuff');

// Right Hand supporting jaw/chin thoughtfully
const rightHand = createSphere(0.048, 12, 10, skinMat, [-0.03, 0.12, 0.23], [1.15, 0.85, 0.95], 'R_Hand');

rightArmGroup.add(rightShoulder, rightBicep, rightElbow, rightForearm, rightWristCuff, rightHand);
torsoGroup.add(rightArmGroup);

// LEFT ARM: Resting comfortably forward on lap / left thigh
const leftArmGroup = new THREE.Group();
leftArmGroup.name = 'LeftArm';
leftArmGroup.position.set(-0.32, 0.28, 0);

const leftShoulder = createSphere(0.09, 14, 12, hoodieMat, [0, 0, 0], [1, 1, 1], 'L_Shoulder');
const leftBicep = createCylinder(0.075, 0.07, 0.26, 14, hoodieMat, [-0.04, -0.13, 0.06], [0.45, 0, 0.25], 'L_Bicep');
const leftElbow = createSphere(0.072, 12, 10, hoodieMat, [-0.07, -0.24, 0.15], [1, 1, 1], 'L_Elbow');
const leftForearm = createCylinder(0.065, 0.06, 0.26, 14, hoodieMat, [-0.04, -0.23, 0.28], [1.25, -0.2, 0.15], 'L_Forearm');
const leftWristCuff = createCylinder(0.062, 0.064, 0.04, 12, hoodieTrimMat, [-0.02, -0.21, 0.41], [1.25, -0.2, 0.15], 'L_Cuff');

// Smartwatch on Left Wrist
const smartwatch = createBox(0.045, 0.042, 0.02, chromeMat, [-0.02, -0.19, 0.41], [0, 0.3, 0], 'Smartwatch');
const watchScreen = createBox(0.032, 0.032, 0.005, cyanGlowMat, [-0.02, -0.19, 0.422], [0, 0.3, 0], 'WatchScreen');
leftArmGroup.add(smartwatch, watchScreen);

// Left Hand relaxed on thigh
const leftHand = createSphere(0.048, 12, 10, skinMat, [-0.01, -0.2, 0.47], [1.15, 0.75, 1.05], 'L_Hand');

leftArmGroup.add(leftShoulder, leftBicep, leftElbow, leftForearm, leftWristCuff, leftHand);
torsoGroup.add(leftArmGroup);

devGroup.add(torsoGroup);

// =========================================================================
// 3. LOWER BODY: CARGO PANTS & SNEAKERS (Naturally Seated on Chair Cushion)
// =========================================================================
const legsGroup = new THREE.Group();
legsGroup.name = 'LegsGroup';
legsGroup.position.set(0, 0.48, 0.05);

// Pelvis
const pelvis = createBox(0.46, 0.16, 0.36, pantsMat, [0, -0.04, -0.05], [0.05, 0, 0], 'Pelvis');
legsGroup.add(pelvis);

// LEFT LEG: Thigh forward over cushion, knee bent, shin down to floor
const leftLegGroup = new THREE.Group();
leftLegGroup.name = 'LeftLeg';
leftLegGroup.position.set(-0.16, -0.04, 0.02);

// Left Thigh
const leftThigh = createCylinder(0.11, 0.095, 0.38, 16, pantsMat, [0, 0, 0.16], [Math.PI / 2 - 0.08, 0, 0.08], 'L_Thigh');
// Cargo Pocket Left
const leftCargoPocket = createBox(0.035, 0.14, 0.16, pantsPocketMat, [-0.11, 0.02, 0.16], [0, 0, 0.12], 'L_CargoPocket');
leftLegGroup.add(leftThigh, leftCargoPocket);

// Left Knee
const leftKnee = createSphere(0.095, 14, 12, pantsMat, [0.02, -0.02, 0.35], [1, 1, 1], 'L_Knee');
leftLegGroup.add(leftKnee);

// Left Shin (Vertical down to floor)
const leftShin = createCylinder(0.085, 0.075, 0.36, 16, pantsMat, [0.02, -0.21, 0.34], [0.15, 0, 0], 'L_Shin');
const leftCuff = createCylinder(0.078, 0.082, 0.05, 14, pantsPocketMat, [0.02, -0.38, 0.32], [0.15, 0, 0], 'L_Cuff');
leftLegGroup.add(leftShin, leftCuff);

// LEFT SNEAKER (Grounded on Floor: y = 0)
const leftSneakerGroup = new THREE.Group();
leftSneakerGroup.name = 'L_Sneaker';
leftSneakerGroup.position.set(0.02, -0.42, 0.38);

const lSneakerUpper = createBox(0.12, 0.09, 0.24, sneakerUpperMat, [0, 0.03, 0], [0.05, 0, 0], 'L_SneakerUpper');
const lSneakerMidsole = createBox(0.13, 0.035, 0.26, sneakerMidsoleMat, [0, -0.02, 0], [0.05, 0, 0], 'L_SneakerMidsole');
const lSneakerSole = createBox(0.132, 0.015, 0.265, sneakerUpperMat, [0, -0.042, 0], [0.05, 0, 0], 'L_SneakerSole');

// Glowing Cyan LED Strip in Heel
const lLedStrip = createBox(0.122, 0.014, 0.08, cyanGlowMat, [0, -0.018, -0.08], [0.05, 0, 0], 'L_SneakerLED');

leftSneakerGroup.add(lSneakerUpper, lSneakerMidsole, lSneakerSole, lLedStrip);
leftLegGroup.add(leftSneakerGroup);
legsGroup.add(leftLegGroup);

// RIGHT LEG: Thigh resting over cushion, angled slightly for natural relaxed posture
const rightLegGroup = new THREE.Group();
rightLegGroup.name = 'RightLeg';
rightLegGroup.position.set(0.16, -0.04, 0.02);

// Right Thigh
const rightThigh = createCylinder(0.11, 0.095, 0.38, 16, pantsMat, [0, 0, 0.16], [Math.PI / 2 - 0.06, 0, -0.12], 'R_Thigh');
// Cargo Pocket Right
const rightCargoPocket = createBox(0.035, 0.14, 0.16, pantsPocketMat, [0.11, 0.02, 0.16], [0, 0, -0.12], 'R_CargoPocket');
rightLegGroup.add(rightThigh, rightCargoPocket);

// Right Knee
const rightKnee = createSphere(0.095, 14, 12, pantsMat, [-0.02, -0.02, 0.35], [1, 1, 1], 'R_Knee');
rightLegGroup.add(rightKnee);

// Right Shin (Angled down to floor)
const rightShin = createCylinder(0.085, 0.075, 0.36, 16, pantsMat, [-0.01, -0.21, 0.35], [0.18, 0, -0.06], 'R_Shin');
const rightCuff = createCylinder(0.078, 0.082, 0.05, 14, pantsPocketMat, [-0.01, -0.38, 0.33], [0.18, 0, -0.06], 'R_Cuff');
rightLegGroup.add(rightShin, rightCuff);

// RIGHT SNEAKER (Grounded on floor alongside left sneaker)
const rightSneakerGroup = new THREE.Group();
rightSneakerGroup.name = 'R_Sneaker';
rightSneakerGroup.position.set(-0.01, -0.42, 0.39);
rightSneakerGroup.rotation.set(0, -0.1, 0);

const rSneakerUpper = createBox(0.12, 0.09, 0.24, sneakerUpperMat, [0, 0.03, 0], [0.05, 0, 0], 'R_SneakerUpper');
const rSneakerMidsole = createBox(0.13, 0.035, 0.26, sneakerMidsoleMat, [0, -0.02, 0], [0.05, 0, 0], 'R_SneakerMidsole');
const rSneakerSole = createBox(0.132, 0.015, 0.265, sneakerUpperMat, [0, -0.042, 0], [0.05, 0, 0], 'R_SneakerSole');

// Glowing Cyan LED Strip in Heel
const rLedStrip = createBox(0.122, 0.014, 0.08, cyanGlowMat, [0, -0.018, -0.08], [0.05, 0, 0], 'R_SneakerLED');

rightSneakerGroup.add(rSneakerUpper, rSneakerMidsole, rSneakerSole, rLedStrip);
rightLegGroup.add(rightSneakerGroup);
legsGroup.add(rightLegGroup);

devGroup.add(legsGroup);
characterRoot.add(devGroup);

// =========================================================================
// 4. SOFT GROUND CONTACT SHADOW PLANE
// =========================================================================
const shadowGeo = new THREE.PlaneGeometry(1.5, 1.5);
const shadowMat = new THREE.MeshBasicMaterial({
  color: PALETTE.shadow,
  transparent: true,
  opacity: 0.65,
  depthWrite: false,
  name: 'GroundShadowMat',
});
const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
contactShadow.rotation.x = -Math.PI / 2;
contactShadow.position.set(0, 0.002, 0.1);
contactShadow.name = 'FloorContactShadow';
characterRoot.add(contactShadow);

// Export GLB file
const publicDir = path.join(__dirname, '../public');
const modelsDir = path.join(publicDir, 'models');
const assetsDir = path.join(publicDir, 'assets');

[modelsDir, assetsDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const modelPath1 = path.join(modelsDir, 'developer-character.glb');
const modelPath2 = path.join(assetsDir, 'developer-character.glb');

console.log('Exporting GLTF binary (.glb)...');
const exporter = new GLTFExporter();
exporter.parse(
  characterRoot,
  (glbBuffer) => {
    const buffer = Buffer.from(glbBuffer);
    fs.writeFileSync(modelPath1, buffer);
    fs.writeFileSync(modelPath2, buffer);
    console.log(`SUCCESS! Saved real 3D GLB character (${(buffer.length / 1024).toFixed(1)} KB) to:`);
    console.log(' -', modelPath1);
    console.log(' -', modelPath2);
  },
  (err) => {
    console.error('Error exporting GLB:', err);
    process.exit(1);
  },
  { binary: true }
);

setTimeout(() => {}, 2000);
