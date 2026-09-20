const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Dimensions for the standing character silhouette (crisp transparent asset)
const W = 600;
const H = 1200;

// Highly stylized standing human developer silhouette:
// - Viewed from behind (3/4 rear), looking up toward the moon on the upper right
// - Standing relaxed and confident near the observation railing
// - Dark streetwear oversized hoodie with subtle cyan rim lighting from the portal
// - Soft blue moonlight on shoulders and hair
// - Black cargo pants with ribbed cuffs
// - Futuristic sneakers with subtle cyan LED accents
// - Natural human anatomy, zero robotic or primitive shapes

const standingSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <!-- Cyan Rim Filter -->
    <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Moonlight Highlight Filter -->
    <filter id="moonlightGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Contact Shadow Radial -->
    <radialGradient id="footShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.95" />
      <stop offset="50%" stop-color="#000000" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <!-- Hoodie Gradient (Obsidian to deep charcoal navy) -->
    <linearGradient id="hoodieBody" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#1e2530" />
      <stop offset="35%" stop-color="#141a24" />
      <stop offset="75%" stop-color="#0c1017" />
      <stop offset="100%" stop-color="#05070a" />
    </linearGradient>

    <!-- Joggers Gradient -->
    <linearGradient id="joggers" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#18202b" />
      <stop offset="45%" stop-color="#0f141c" />
      <stop offset="100%" stop-color="#06090e" />
    </linearGradient>

    <!-- Sneaker Midsole -->
    <linearGradient id="soleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#cbd5e1" />
      <stop offset="100%" stop-color="#64748b" />
    </linearGradient>
  </defs>

  <!-- ===================================================================== -->
  <!-- 1. FEET CONTACT SHADOW                                                -->
  <!-- ===================================================================== -->
  <g id="contact-shadow" pointer-events="none">
    <ellipse cx="280" cy="1160" rx="200" ry="24" fill="url(#footShadow)" />
    <ellipse cx="220" cy="1162" rx="90" ry="16" fill="#000000" opacity="0.9" />
    <ellipse cx="340" cy="1158" rx="85" ry="15" fill="#000000" opacity="0.85" />
  </g>

  <!-- ===================================================================== -->
  <!-- 2. LOWER BODY: CARGO PANTS & SNEAKERS                                  -->
  <!-- ===================================================================== -->
  <g id="legs">
    <!-- Left Leg (Slightly forward) -->
    <path d="M 235 620 C 205 690, 185 800, 175 920 C 170 980, 180 1050, 190 1100 L 255 1090 C 245 1040, 240 970, 248 900 C 255 830, 275 720, 285 620 Z" fill="url(#joggers)" stroke="#090d14" stroke-width="2" />
    
    <!-- Left Cargo Pocket on Thigh -->
    <path d="M 175 750 C 165 770, 165 830, 178 860 L 215 850 C 215 820, 210 760, 205 745 Z" fill="#101620" stroke="#1e293b" stroke-width="1.5" />

    <!-- Left Ankle Cuff -->
    <rect x="188" y="1090" width="68" height="20" rx="5" fill="#0a0d13" stroke="#1e293b" stroke-width="1.5" />

    <!-- Left Sneaker -->
    <g id="left-shoe" transform="translate(160, 1090)">
      <path d="M 30 15 C 50 10, 95 12, 115 35 C 128 50, 128 75, 115 95 L 50 98 C 20 98, -2 90, -10 75 C -18 60, -10 40, 5 25 Z" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
      <path d="M -12 75 C 5 68, 60 70, 120 85 L 115 102 C 85 108, 15 106, -15 96 Z" fill="url(#soleGrad)" />
      <!-- Cyan LED accent -->
      <path d="M 50 88 L 92 94 L 88 100 L 48 93 Z" fill="#00f5ff" filter="url(#cyanGlow)" />
    </g>

    <!-- Right Leg (Weight-bearing, standing natural) -->
    <path d="M 285 620 C 300 700, 315 810, 325 910 C 330 970, 335 1040, 335 1095 L 400 1090 C 405 1035, 400 960, 390 890 C 380 810, 360 700, 335 620 Z" fill="url(#joggers)" stroke="#090d14" stroke-width="2" />

    <!-- Right Cargo Pocket -->
    <path d="M 350 760 C 365 775, 370 835, 365 865 L 330 860 C 330 830, 330 770, 335 755 Z" fill="#101620" stroke="#1e293b" stroke-width="1.5" />

    <!-- Right Ankle Cuff -->
    <rect x="330" y="1088" width="70" height="20" rx="5" fill="#0a0d13" stroke="#1e293b" stroke-width="1.5" />

    <!-- Right Sneaker -->
    <g id="right-shoe" transform="translate(305, 1088)">
      <path d="M 28 15 C 48 10, 92 12, 112 35 C 124 50, 124 75, 112 95 L 48 98 C 18 98, -2 90, -10 75 C -16 60, -8 40, 5 25 Z" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
      <path d="M -10 75 C 5 68, 60 70, 118 85 L 112 102 C 82 108, 15 106, -14 96 Z" fill="url(#soleGrad)" />
      <!-- Cyan LED accent -->
      <path d="M 48 88 L 90 94 L 86 100 L 46 93 Z" fill="#00f5ff" filter="url(#cyanGlow)" />
    </g>

    <!-- Folds & Fabric Creases -->
    <g stroke="#070a0f" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.8">
      <path d="M 215 720 Q 235 770 230 830" />
      <path d="M 220 930 Q 230 990 225 1060" />
      <path d="M 345 730 Q 330 780 340 840" />
      <path d="M 360 930 Q 365 990 370 1060" />
    </g>
  </g>

  <!-- ===================================================================== -->
  <!-- 3. UPPER BODY: OVERSIZED HOODIE & ARMS (HANDS IN POCKETS)              -->
  <!-- ===================================================================== -->
  <g id="upper-body">
    <!-- Left Arm & Shoulder (Hands casually in front pocket) -->
    <path d="M 190 290 C 145 340, 140 440, 175 530 C 195 560, 230 580, 260 560 L 265 520 C 235 520, 205 490, 195 440 C 185 390, 190 340, 215 300 Z" fill="#121822" stroke="#0b0f16" stroke-width="2" />

    <!-- Right Arm & Shoulder (Relaxed posture, facing moon) -->
    <path d="M 370 280 C 420 330, 435 430, 410 520 C 390 555, 350 575, 320 560 L 315 520 C 345 520, 375 480, 385 430 C 395 380, 385 330, 360 290 Z" fill="#131924" stroke="#0b0f16" stroke-width="2" />

    <!-- Main Torso: Oversized Dark Streetwear Hoodie -->
    <path d="M 210 270 C 170 330, 180 450, 210 550 C 230 590, 340 600, 370 560 C 400 460, 410 340, 375 270 C 345 220, 240 220, 210 270 Z" fill="url(#hoodieBody)" stroke="#0b0f16" stroke-width="2.5" />

    <!-- Kangaroo Pocket Folds -->
    <path d="M 240 480 C 265 470, 315 470, 340 480 C 350 530, 335 570, 290 575 C 245 570, 230 530, 240 480 Z" fill="#0d121a" stroke="#1e293b" stroke-width="1.5" />

    <!-- Natural Hoodie Creases -->
    <g stroke="#080b10" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.85">
      <path d="M 230 330 Q 280 400 330 460" />
      <path d="M 350 330 Q 300 400 270 470" />
      <path d="M 250 280 Q 290 310 335 285" />
    </g>

    <!-- Draped Hood Collar -->
    <path d="M 230 220 C 215 250, 230 290, 270 305 C 310 315, 345 305, 365 275 C 380 245, 365 215, 335 195 C 295 190, 245 195, 230 220 Z" fill="#18202d" stroke="#0a0e16" stroke-width="2" />

    <!-- =================================================================== -->
    <!-- 4. GLOWING "NU" LOGO ON HOODIE BACK                                 -->
    <!-- =================================================================== -->
    <g id="glowing-nu-logo" transform="translate(290, 370)">
      <!-- Soft Cyan Bloom -->
      <circle cx="0" cy="8" r="75" fill="#00f5ff" opacity="0.16" filter="url(#cyanGlow)" />
      
      <!-- Cyan Emblem -->
      <text x="0" y="16" font-family="'Segoe UI', Roboto, sans-serif" font-size="54" font-weight="900" fill="#00f5ff" text-anchor="middle" letter-spacing="4" filter="url(#cyanGlow)">NU</text>
      <text x="0" y="16" font-family="'Segoe UI', Roboto, sans-serif" font-size="54" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="4" opacity="0.95">NU</text>

      <!-- Subtitle -->
      <text x="0" y="38" font-family="'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#38bdf8" text-anchor="middle" letter-spacing="3" opacity="0.85">NANDHAKUMAR</text>
      <text x="0" y="52" font-family="'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800" fill="#38bdf8" text-anchor="middle" letter-spacing="4" opacity="0.85">UNIVERSE</text>
    </g>

    <!-- =================================================================== -->
    <!-- 5. HEAD, MODERN WAVY HAIR & MOONLIGHT HIGHLIGHT                      -->
    <!-- =================================================================== -->
    <g id="head">
      <!-- Head Base -->
      <ellipse cx="295" cy="145" rx="44" ry="52" fill="#0b0f16" />

      <!-- Wavy Textured Hair Volume (Looking toward top-right moon) -->
      <path d="M 248 145 C 240 105, 275 65, 310 60 C 350 56, 380 85, 375 130 C 370 155, 350 178, 318 185 C 280 188, 252 168, 248 145 Z" fill="#06080c" />
      <path d="M 260 110 Q 285 75 315 78 Q 345 82 350 110" stroke="#020305" stroke-width="8" stroke-linecap="round" fill="none" />
      <path d="M 285 92 Q 315 62 335 70 Q 360 78 368 115" stroke="#0d121c" stroke-width="7" stroke-linecap="round" fill="none" />

      <!-- Subtle Cool Moonlight Rim on Hair Crown & Right Silhouette -->
      <path d="M 252 148 C 248 108, 280 70, 315 66 C 352 62, 375 80, 376 105" stroke="#7dd3fc" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.85" filter="url(#moonlightGlow)" />
      <path d="M 270 115 C 265 85, 295 68, 325 67" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8" />
    </g>

    <!-- =================================================================== -->
    <!-- 6. PORTAL CYAN RIM LIGHTING (RIGHT AND LEFT SILHOUETTES)            -->
    <!-- =================================================================== -->
    <!-- Subtle Cyan Rim along Right Arm & Shoulder (Facing circular window) -->
    <path d="M 370 280 C 418 330, 432 425, 410 515 C 395 545, 360 565, 335 558" stroke="#00f5ff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6" filter="url(#cyanGlow)" />
    <!-- Left Shoulder Cool Light -->
    <path d="M 210 270 C 180 320, 175 410, 195 490" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.35" />
  </g>
</svg>
`;

const publicDir = path.join(__dirname, '../public');
const assetsDir = path.join(publicDir, 'assets');
const tmpDir = '/tmp/character_assets';

[publicDir, assetsDir, tmpDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

console.log('Writing standing developer silhouette SVG...');
const svgPath = path.join(tmpDir, 'standing-developer-silhouette.svg');
fs.writeFileSync(svgPath, standingSvg, 'utf8');

console.log('Rendering standing developer silhouette PNG & WebP...');
const primaryPng = path.join(assetsDir, 'standing-developer-silhouette.png');
const primaryWebp = path.join(assetsDir, 'standing-developer-silhouette.webp');

execSync(`ffmpeg -i "${svgPath}" -y "${primaryPng}"`, { stdio: 'inherit' });
execSync(`ffmpeg -i "${svgPath}" -y "${primaryWebp}"`, { stdio: 'inherit' });

// Also copy to public root
fs.copyFileSync(primaryPng, path.join(publicDir, 'standing-developer-silhouette.png'));
fs.copyFileSync(primaryWebp, path.join(publicDir, 'standing-developer-silhouette.webp'));

console.log('Successfully generated standing developer silhouette!');
