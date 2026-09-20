const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Dimensions for the character asset (high-resolution transparent cutout)
const W = 1200;
const H = 1400;

// High-fidelity SVG of the seated developer character on a sleek futuristic ergonomic lounge chair:
// - Viewed from behind at 3/4 angle, looking up toward the moon (top right)
// - Seamless connected anatomy: torso -> hips -> thighs -> knees -> calves -> ribbed cuffs -> sneakers
// - Clear, believable futuristic lounge seat with supportive cushion and solid grounded base
// - Natural contact shadow directly under chair and feet
// - Soft blue moonlight on shoulders and hair crown
// - Subtle cyan rim lighting from circular window
// - Dark streetwear hoodie with glowing cyan NU / NANDHAKUMAR UNIVERSE back emblem
// - Soft feathered transparent boundaries with zero rectangular artifacts

const characterSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <!-- Chair Materials -->
    <linearGradient id="chairShell" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#283242" />
      <stop offset="35%" stop-color="#18202c" />
      <stop offset="70%" stop-color="#0f151f" />
      <stop offset="100%" stop-color="#080b10" />
    </linearGradient>

    <linearGradient id="chairCushion" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1f2734" />
      <stop offset="45%" stop-color="#131922" />
      <stop offset="85%" stop-color="#090d14" />
      <stop offset="100%" stop-color="#05070a" />
    </linearGradient>

    <linearGradient id="chairPedestal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="30%" stop-color="#475569" />
      <stop offset="55%" stop-color="#94a3b8" />
      <stop offset="75%" stop-color="#475569" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>

    <linearGradient id="chairBaseRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="50%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>

    <!-- Hoodie Matte Cotton Gradient -->
    <linearGradient id="hoodieBody" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#262e3a" />
      <stop offset="25%" stop-color="#1a202a" />
      <stop offset="65%" stop-color="#11161d" />
      <stop offset="100%" stop-color="#0a0c10" />
    </linearGradient>

    <!-- Moonlight Shoulder Highlight Gradient -->
    <linearGradient id="moonlightHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bae6fd" stop-opacity="0.9" />
      <stop offset="40%" stop-color="#7dd3fc" stop-opacity="0.6" />
      <stop offset="80%" stop-color="#38bdf8" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />
    </linearGradient>

    <!-- Joggers Fabric Shading -->
    <linearGradient id="joggersGradient" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#222935" />
      <stop offset="40%" stop-color="#151b24" />
      <stop offset="80%" stop-color="#0c1017" />
      <stop offset="100%" stop-color="#06080c" />
    </linearGradient>

    <!-- Contact Shadow Radial -->
    <radialGradient id="groundContactShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.95" />
      <stop offset="35%" stop-color="#000000" stop-opacity="0.8" />
      <stop offset="70%" stop-color="#000000" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <!-- Sneaker Midsole Shading -->
    <linearGradient id="midsoleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="60%" stop-color="#e2e8f0" />
      <stop offset="100%" stop-color="#94a3b8" />
    </linearGradient>

    <!-- Filters -->
    <filter id="softAoBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
    </filter>

    <filter id="nuLogoGlow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="4" result="blur1" />
      <feGaussianBlur stdDeviation="12" result="blur2" />
      <feGaussianBlur stdDeviation="26" result="blur3" />
      <feMerge>
        <feMergeNode in="blur3" />
        <feMergeNode in="blur2" />
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="cyanEdgeRim" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="sneakerLed" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- ===================================================================== -->
  <!-- 1. INTEGRATED GROUND CONTACT SHADOW (SOFT, NATURAL OVALS)             -->
  <!-- ===================================================================== -->
  <g id="contact-shadows" pointer-events="none">
    <!-- Deepest core shadow directly under the chair pedestal & feet -->
    <ellipse cx="680" cy="1260" rx="380" ry="42" fill="url(#groundContactShadow)" />
    <!-- Diffuse outer shadow for seamless room floor blending -->
    <ellipse cx="660" cy="1265" rx="460" ry="65" fill="#000000" opacity="0.45" filter="url(#softAoBlur)" />
    <!-- Sneaker contact occlusions -->
    <ellipse cx="440" cy="1230" rx="90" ry="18" fill="#000000" opacity="0.85" filter="url(#softAoBlur)" />
    <ellipse cx="560" cy="1245" rx="100" ry="20" fill="#000000" opacity="0.85" filter="url(#softAoBlur)" />
  </g>

  <!-- ===================================================================== -->
  <!-- 2. BELIEVABLE FUTURISTIC CHAIR STRUCTURE                              -->
  <!-- ===================================================================== -->
  <g id="futuristic-chair">
    <!-- Weighted Low-Profile Circular / Elliptical Floor Base -->
    <g id="chair-base" transform="translate(690, 1220)">
      <!-- Outer Base Ring -->
      <ellipse cx="0" cy="20" rx="190" ry="36" fill="url(#chairBaseRing)" stroke="#1e293b" stroke-width="2" />
      <ellipse cx="0" cy="16" rx="170" ry="28" fill="#0a0f18" />
      <!-- Subtle Cyan Floor Glow Catch on Base Rim -->
      <ellipse cx="0" cy="18" rx="186" ry="32" fill="none" stroke="#00f5ff" stroke-width="1.8" opacity="0.3" filter="url(#cyanEdgeRim)" />

      <!-- Sleek Central Metallic Pedestal Column -->
      <path d="M -26 -160 L -18 16 C -18 24, 18 24, 18 16 L 26 -160 Z" fill="url(#chairPedestal)" stroke="#334155" stroke-width="1.5" />
      <!-- Pedestal Collar Ring -->
      <ellipse cx="0" cy="16" rx="28" ry="10" fill="#0f172a" stroke="#475569" stroke-width="1" />
    </g>

    <!-- Curved Ergonomic Outer Shell -->
    <g id="chair-shell">
      <!-- Backing Shell Silhouette -->
      <path d="M 430 730 C 410 650, 470 590, 560 580 C 740 565, 960 580, 1020 650 C 1055 690, 1040 780, 990 840 C 930 900, 520 900, 460 840 C 425 800, 420 760, 430 730 Z" fill="url(#chairShell)" stroke="#090d14" stroke-width="3" />

      <!-- Sleek Tubular Chrome Frame Accent running along chair contour -->
      <path d="M 880 570 C 970 590, 1060 660, 1045 770 C 1030 840, 860 910, 680 915" stroke="url(#chairPedestal)" stroke-width="10" stroke-linecap="round" fill="none" opacity="0.85" />
      <path d="M 880 570 C 970 590, 1060 660, 1045 770 C 1030 840, 860 910, 680 915" stroke="#bae6fd" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.4" />

      <!-- Right Armrest (Under developer's right elbow) -->
      <path d="M 820 620 C 950 630, 1030 670, 1020 730 C 1010 775, 935 790, 840 785 L 770 765 Z" fill="url(#chairCushion)" stroke="#1e293b" stroke-width="2" />
      <!-- Armrest Moonlight Rim -->
      <path d="M 840 635 C 930 645, 995 675, 990 715" stroke="#7dd3fc" stroke-width="2" fill="none" opacity="0.4" />
    </g>

    <!-- Deep Padded Seat Cushion (Direct support beneath hips and thighs) -->
    <g id="seat-cushion">
      <path d="M 450 740 C 490 710, 770 710, 940 740 C 970 810, 930 865, 860 880 C 720 900, 520 895, 465 850 C 435 815, 435 765, 450 740 Z" fill="url(#chairCushion)" stroke="#0d131c" stroke-width="2.5" />
      <!-- Ambient Occlusion Shadow in Cushion Crevice -->
      <path d="M 480 770 Q 700 785 910 775" stroke="#05070a" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.9" />
      <path d="M 470 820 Q 690 840 880 830" stroke="#06090d" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.8" />
    </g>
  </g>

  <!-- ===================================================================== -->
  <!-- 3. SNEAKERS & LOWER LEGS (CONNECTED NATURALLY TO FLOOR)               -->
  <!-- ===================================================================== -->
  <g id="legs-and-feet">
    <!-- LEFT LEG & FOOT (Resting firmly forward on floor) -->
    <g id="left-leg-assembly">
      <!-- Left Thigh (Extending from under hoodie hem onto cushion) -->
      <path d="M 480 620 C 410 650, 360 720, 340 820 L 430 835 C 450 750, 500 690, 560 655 Z" fill="url(#joggersGradient)" stroke="#1a222d" stroke-width="2" />
      
      <!-- Left Knee & Shin (Flowing down naturally toward ankle) -->
      <path d="M 340 820 C 330 880, 350 970, 380 1080 L 460 1070 C 435 970, 420 885, 430 835 Z" fill="url(#joggersGradient)" stroke="#1a222d" stroke-width="2" />

      <!-- Left Ankle Ribbed Cuff -->
      <rect x="375" y="1070" width="85" height="22" rx="7" fill="#0c1017" stroke="#334155" stroke-width="1.8" />

      <!-- LEFT SNEAKER (Grounded firmly in 3/4 perspective: x ~ 340 to 490, y ~ 1080 to 1230) -->
      <g id="left-sneaker" transform="translate(340, 1070)">
        <!-- Sneaker Silhouette Upper -->
        <path d="M 45 20 C 70 10, 120 15, 145 45 C 160 65, 160 95, 145 125 L 60 130 C 25 130, -5 120, -15 105 C -25 90, -20 65, -5 45 Z" fill="#0f172a" stroke="#334155" stroke-width="2" />
        
        <!-- Sculpted White/Silver Midsole -->
        <path d="M -20 105 C 0 95, 75 100, 150 120 L 145 145 C 105 152, 20 150, -24 138 C -32 128, -30 115, -20 105 Z" fill="url(#midsoleGrad)" stroke="#64748b" stroke-width="2" />
        
        <!-- Black Outsole Rubber Base -->
        <path d="M -26 138 C 10 148, 100 152, 147 145 L 142 156 C 85 164, -2 160, -28 148 Z" fill="#020617" />
        
        <!-- Cyan LED Strip in Heel -->
        <path d="M 65 125 L 118 134 L 114 142 L 63 133 Z" fill="#00f5ff" filter="url(#sneakerLed)" />
        <path d="M 65 125 L 118 134 L 114 142 L 63 133 Z" fill="#ffffff" opacity="0.85" />

        <!-- Monogram NU on shoe collar -->
        <g transform="translate(68, 80) rotate(-8) scale(0.65)" filter="url(#cyanEdgeRim)">
          <text x="0" y="0" font-family="sans-serif" font-size="18" font-weight="900" fill="#00f5ff" text-anchor="middle">NU</text>
        </g>
      </g>
    </g>

    <!-- RIGHT LEG & FOOT (Bent comfortably with foot resting naturally alongside) -->
    <g id="right-leg-assembly">
      <!-- Right Thigh (Resting over cushion) -->
      <path d="M 580 640 C 540 680, 480 770, 470 870 L 560 885 C 580 800, 640 730, 690 665 Z" fill="url(#joggersGradient)" stroke="#1a222d" stroke-width="2" />

      <!-- Right Knee & Lower Leg (Extending down to floor) -->
      <path d="M 470 870 C 460 930, 480 1030, 500 1110 L 580 1100 C 565 1025, 550 935, 560 885 Z" fill="url(#joggersGradient)" stroke="#1a222d" stroke-width="2" />

      <!-- Right Ankle Ribbed Cuff -->
      <rect x="495" y="1105" width="85" height="22" rx="7" fill="#0c1017" stroke="#334155" stroke-width="1.8" />

      <!-- RIGHT SNEAKER (Resting flat on floor next to left sneaker) -->
      <g id="right-sneaker" transform="translate(470, 1105)">
        <!-- Sneaker Silhouette Upper -->
        <path d="M 35 15 C 60 10, 110 15, 135 40 C 150 60, 150 90, 135 118 L 55 124 C 20 124, -8 115, -16 100 C -24 85, -18 60, -4 40 Z" fill="#0f172a" stroke="#334155" stroke-width="2" />
        
        <!-- Sculpted Midsole -->
        <path d="M -18 100 C 0 92, 70 96, 140 114 L 135 138 C 98 144, 18 142, -22 132 C -28 122, -26 110, -18 100 Z" fill="url(#midsoleGrad)" stroke="#64748b" stroke-width="2" />
        
        <!-- Black Outsole Base -->
        <path d="M -24 132 C 10 142, 95 146, 137 138 L 132 148 C 80 156, -4 152, -26 142 Z" fill="#020617" />
        
        <!-- Cyan LED Strip -->
        <path d="M 60 118 L 110 126 L 106 134 L 58 126 Z" fill="#00f5ff" filter="url(#sneakerLed)" />
        <path d="M 60 118 L 110 126 L 106 134 L 58 126 Z" fill="#ffffff" opacity="0.85" />
      </g>
    </g>

    <!-- Natural Fabric Creases and Folds across both legs -->
    <g stroke="#090d14" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.85">
      <path d="M 390 730 Q 360 790 350 830" />
      <path d="M 430 710 Q 400 780 390 840" />
      <path d="M 370 890 Q 390 980 395 1060" />
      <path d="M 410 880 Q 430 970 435 1050" />
      <path d="M 520 780 Q 490 850 480 900" />
      <path d="M 510 930 Q 525 1010 520 1090" />
    </g>
  </g>

  <!-- ===================================================================== -->
  <!-- 4. UPPER BODY: HOODIE, ARMS, CONTEMPLATIVE POSE & HEAD                -->
  <!-- ===================================================================== -->
  <g id="upper-body">
    <!-- Left Arm resting forward on lap -->
    <path d="M 510 420 C 450 460, 430 550, 470 620 L 530 605 C 495 550, 505 480, 560 445 Z" fill="#131922" stroke="#1c2534" stroke-width="2" />
    
    <!-- Modern Dark Smartwatch on Left Wrist -->
    <g transform="translate(480, 590) rotate(-22)">
      <rect x="-6" y="-14" width="12" height="28" rx="3" fill="#020617" stroke="#334155" stroke-width="1" />
      <rect x="-10" y="-12" width="20" height="24" rx="5" fill="#090e18" stroke="#475569" stroke-width="1.5" />
      <circle cx="0" cy="0" r="3.5" fill="#00f5ff" filter="url(#cyanEdgeRim)" />
    </g>

    <!-- Main Torso: Oversized Dark Streetwear Hoodie -->
    <!-- Viewed from behind, three-quarter rear angle -->
    <path d="M 490 350 C 450 410, 470 530, 520 610 C 590 655, 780 655, 860 600 C 900 540, 920 430, 880 350 C 850 300, 780 250, 710 240 C 620 230, 540 270, 490 350 Z" fill="url(#hoodieBody)" stroke="#1a222f" stroke-width="2.5" />

    <!-- Organic Fabric Folds and Creases across Back -->
    <g stroke="#090d14" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.85">
      <path d="M 520 400 Q 600 480 670 570" />
      <path d="M 850 400 Q 780 480 710 570" />
      <path d="M 570 340 Q 680 380 780 340" />
      <path d="M 590 520 Q 690 550 780 520" />
    </g>

    <!-- Subtle Blue Moonlight Rim along Top Shoulders and Hood (from moon at top right) -->
    <path d="M 680 242 C 750 250, 830 290, 865 340 C 880 365, 890 410, 885 450" stroke="url(#moonlightHighlight)" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.8" />
    <path d="M 500 360 C 475 420, 480 510, 510 570" stroke="#00f5ff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5" filter="url(#cyanEdgeRim)" />

    <!-- Right Arm (Resting on armrest with hand supporting chin/jaw) -->
    <path d="M 860 360 C 920 400, 970 490, 930 600 L 870 570 C 895 490, 870 420, 820 380 Z" fill="#141922" stroke="#1c2534" stroke-width="2" />
    <!-- Forearm extending upward to chin -->
    <path d="M 910 570 C 880 500, 780 360, 680 280 L 720 250 C 810 330, 920 470, 945 560 Z" fill="#131922" stroke="#1c2534" stroke-width="2" />
    <!-- Right Hand propping chin/jaw thoughtfully -->
    <ellipse cx="670" cy="255" rx="24" ry="20" fill="#c28c68" stroke="#382215" stroke-width="2" />
    <circle cx="685" cy="245" r="10" fill="#a46d49" />

    <!-- Draped Hood Collar around Neck -->
    <path d="M 610 250 C 580 290, 600 350, 650 370 C 720 385, 780 380, 830 340 C 860 300, 840 250, 800 230 C 740 220, 650 225, 610 250 Z" fill="#18202c" stroke="#222e40" stroke-width="2" />
    <path d="M 640 290 C 690 330, 770 320, 810 280" stroke="#0a0e16" stroke-width="4.5" fill="none" />

    <!-- Head & Voluminous Dark Textured/Wavy Hair -->
    <!-- Positioned looking up and to the right toward the full moon -->
    <g id="head-and-hair">
      <ellipse cx="715" cy="170" rx="65" ry="75" fill="#0b0f16" stroke="#192232" stroke-width="2" />
      
      <!-- Textured Wavy Hair Volume -->
      <path d="M 640 170 C 630 120, 680 70, 730 65 C 790 60, 840 100, 830 160 C 825 190, 800 220, 750 230 C 690 235, 645 205, 640 170 Z" fill="#07090d" />
      <path d="M 660 120 Q 690 75 730 80 Q 770 85 780 120" stroke="#020305" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M 690 100 Q 730 60 760 70 Q 800 80 810 130" stroke="#0e131d" stroke-width="10" stroke-linecap="round" fill="none" />
      
      <!-- Soft Moonlight Rim Light along Crown of Hair (pointing to moon) -->
      <path d="M 645 180 C 635 120, 685 75, 735 70 C 785 65, 825 90, 828 120" stroke="#7dd3fc" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.9" filter="url(#cyanEdgeRim)" />
      <path d="M 665 140 C 660 100, 700 75, 745 72" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8" />
    </g>

    <!-- =================================================================== -->
    <!-- 5. GLOWING "NU" EMBLEM ON HOODIE BACK                                -->
    <!-- =================================================================== -->
    <g id="glowing-nu-back-emblem" transform="translate(735, 430)">
      <!-- Ambient Bloom across Hoodie Fabric -->
      <circle cx="0" cy="15" r="140" fill="#00f5ff" opacity="0.16" filter="url(#nuLogoGlow)" />
      <circle cx="0" cy="15" r="85" fill="#38bdf8" opacity="0.28" filter="url(#nuLogoGlow)" />

      <!-- BOLD "NU" MONOGRAM -->
      <g filter="url(#nuLogoGlow)">
        <text x="0" y="25" font-family="'Segoe UI', Roboto, sans-serif" font-size="105" font-weight="900" fill="#00f5ff" text-anchor="middle" letter-spacing="8">NU</text>
      </g>
      <text x="0" y="25" font-family="'Segoe UI', Roboto, sans-serif" font-size="105" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="8" opacity="0.95">NU</text>

      <!-- Subtitle: NANDHAKUMAR UNIVERSE -->
      <g filter="url(#cyanEdgeRim)">
        <text x="0" y="65" font-family="'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#38bdf8" text-anchor="middle" letter-spacing="7">NANDHAKUMAR</text>
        <text x="0" y="94" font-family="'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" fill="#38bdf8" text-anchor="middle" letter-spacing="9">UNIVERSE</text>
      </g>
    </g>
  </g>
</svg>
`;

const publicDir = path.join(__dirname, '../public');
const assetsDir = path.join(publicDir, 'assets');
const tmpDir = '/tmp/character_asset';

[publicDir, assetsDir, tmpDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

console.log('Writing updated developer character SVG...');
const svgPath = path.join(tmpDir, 'developer-character.svg');
fs.writeFileSync(svgPath, characterSvg, 'utf8');

console.log('Rendering high-resolution character image...');
const primaryPng = path.join(assetsDir, 'developer-character.png');
const primaryWebp = path.join(assetsDir, 'developer-character.webp');
const layerPng = path.join(assetsDir, 'about-layer-character.png');

execSync(`ffmpeg -i "${svgPath}" -y "${primaryPng}"`, { stdio: 'inherit' });
execSync(`ffmpeg -i "${svgPath}" -y "${primaryWebp}"`, { stdio: 'inherit' });
fs.copyFileSync(primaryPng, layerPng);

// Copy to public root as fallback
const publicPng = path.join(publicDir, 'developer-character.png');
const publicWebp = path.join(publicDir, 'developer-character.webp');
fs.copyFileSync(primaryPng, publicPng);
fs.copyFileSync(primaryWebp, publicWebp);

console.log('Successfully generated updated developer character assets!');
