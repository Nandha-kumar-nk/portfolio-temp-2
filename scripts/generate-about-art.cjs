const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const W = 1920;
const H = 1080;

// Portal Geometry
const PORTAL_CX = 1260;
const PORTAL_CY = 490;
const PORTAL_R = 430;

function generateStars(count) {
  let stars = '';
  let seed = 1337;
  function rand() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  for (let i = 0; i < count; i++) {
    const x = PORTAL_CX - PORTAL_R + rand() * PORTAL_R * 2;
    const y = PORTAL_CY - PORTAL_R + rand() * PORTAL_R * 2;
    const dist = Math.hypot(x - PORTAL_CX, y - PORTAL_CY);
    if (dist < PORTAL_R - 15) {
      const r = 0.6 + rand() * 1.6;
      const opacity = 0.25 + rand() * 0.75;
      const color = rand() > 0.4 ? '#ffffff' : (rand() > 0.5 ? '#7dd3fc' : '#bae6fd');
      stars += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${color}" opacity="${opacity.toFixed(2)}" />\n`;
    }
  }
  return stars;
}

const defsSvg = `
  <defs>
    <!-- Sky Gradient inside circular window -->
    <radialGradient id="skyGrad" cx="68%" cy="28%" r="85%">
      <stop offset="0%" stop-color="#182c4f" />
      <stop offset="35%" stop-color="#0c182e" />
      <stop offset="65%" stop-color="#050c18" />
      <stop offset="100%" stop-color="#02050b" />
    </radialGradient>

    <!-- Moon Corona and Surface Gradients -->
    <radialGradient id="moonCorona" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="25%" stop-color="#bae6fd" stop-opacity="0.6" />
      <stop offset="55%" stop-color="#38bdf8" stop-opacity="0.28" />
      <stop offset="85%" stop-color="#0284c7" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="moonBody" cx="42%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#f0f9ff" />
      <stop offset="80%" stop-color="#dbeafe" />
      <stop offset="100%" stop-color="#93c5fd" />
    </radialGradient>

    <!-- Lake Reflection Gradient -->
    <linearGradient id="lakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#061224" />
      <stop offset="50%" stop-color="#040c18" />
      <stop offset="100%" stop-color="#02060d" />
    </linearGradient>

    <!-- Waterfall Gradient -->
    <linearGradient id="waterfallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.95" />
      <stop offset="30%" stop-color="#7dd3fc" stop-opacity="0.85" />
      <stop offset="75%" stop-color="#38bdf8" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#bae6fd" stop-opacity="0.9" />
    </linearGradient>

    <!-- Metallic Window Rim Shading -->
    <linearGradient id="metalBezel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2a3c54" />
      <stop offset="35%" stop-color="#141e2c" />
      <stop offset="70%" stop-color="#080e18" />
      <stop offset="100%" stop-color="#1e2c40" />
    </linearGradient>

    <!-- Neon Cyan Track -->
    <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#00f5ff" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>

    <!-- Warm Floor Light Bar Gradient -->
    <linearGradient id="warmLightBar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.2" />
      <stop offset="30%" stop-color="#fbbf24" stop-opacity="0.9" />
      <stop offset="50%" stop-color="#fef08a" stop-opacity="1" />
      <stop offset="70%" stop-color="#fbbf24" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.2" />
    </linearGradient>

    <!-- Chair Leather Gradients -->
    <linearGradient id="leatherBack" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#2a3240" />
      <stop offset="35%" stop-color="#181e28" />
      <stop offset="75%" stop-color="#0e1218" />
      <stop offset="100%" stop-color="#080a0e" />
    </linearGradient>

    <linearGradient id="leatherCushion" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#222a36" />
      <stop offset="40%" stop-color="#141922" />
      <stop offset="85%" stop-color="#0a0d13" />
      <stop offset="100%" stop-color="#06070a" />
    </linearGradient>

    <!-- Swivel Star Base Metallic Finish -->
    <linearGradient id="starBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="40%" stop-color="#1e293b" />
      <stop offset="80%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>

    <!-- Metal Tubing -->
    <linearGradient id="metalTubing" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#475569" />
      <stop offset="30%" stop-color="#94a3b8" />
      <stop offset="50%" stop-color="#e2e8f0" />
      <stop offset="70%" stop-color="#64748b" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>

    <!-- Hoodie Body Gradient -->
    <linearGradient id="hoodieFabric" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#262d38" />
      <stop offset="30%" stop-color="#181d24" />
      <stop offset="70%" stop-color="#101318" />
      <stop offset="100%" stop-color="#090b0e" />
    </linearGradient>

    <!-- Joggers Fabric Shading -->
    <linearGradient id="joggersFabric" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1f2530" />
      <stop offset="45%" stop-color="#13171f" />
      <stop offset="85%" stop-color="#0a0c10" />
      <stop offset="100%" stop-color="#050608" />
    </linearGradient>

    <!-- Fog Gradient Bottom -->
    <linearGradient id="fogBottom" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.92" />
      <stop offset="30%" stop-color="#e0f2fe" stop-opacity="0.7" />
      <stop offset="65%" stop-color="#38bdf8" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />
    </linearGradient>

    <radialGradient id="fogRadial" cx="50%" cy="100%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
      <stop offset="40%" stop-color="#e0f2fe" stop-opacity="0.4" />
      <stop offset="75%" stop-color="#bae6fd" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>

    <!-- Filters -->
    <filter id="glowSubtle" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="nuIntenseGlow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="4" result="blur1" />
      <feGaussianBlur stdDeviation="12" result="blur2" />
      <feGaussianBlur stdDeviation="28" result="blur3" />
      <feMerge>
        <feMergeNode in="blur3" />
        <feMergeNode in="blur2" />
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="bloomWide" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="35" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <clipPath id="portalClip">
      <circle cx="${PORTAL_CX}" cy="${PORTAL_CY}" r="${PORTAL_R}" />
    </clipPath>
  </defs>
`;

const environmentSceneSvg = `
  <!-- Sanctuary Room Background & Dark Walls -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="#04070d" />
  <rect x="0" y="0" width="800" height="${H}" fill="#060a12" />
  
  <g stroke="#0f1726" stroke-width="1.5" opacity="0.6">
    <line x1="80" y1="0" x2="80" y2="${H}" />
    <line x1="180" y1="0" x2="180" y2="${H}" />
    <line x1="680" y1="0" x2="680" y2="${H}" />
  </g>

  <!-- Left Wall Vertical Typography -->
  <g font-family="sans-serif" font-size="13" font-weight="700" fill="#38bdf8" opacity="0.6" letter-spacing="6" filter="url(#glowSubtle)">
    <text x="95" y="150">A</text>
    <text x="95" y="190">BETTER</text>
    <text x="95" y="230">VERSION</text>
    <text x="95" y="270">OF</text>
    <text x="95" y="310">MYSELF</text>
  </g>

  <!-- Right Wall Vertical Typography -->
  <g font-family="sans-serif" font-size="13" font-weight="700" fill="#38bdf8" opacity="0.55" letter-spacing="5" filter="url(#glowSubtle)">
    <text x="1750" y="100">DISCIPLINE</text>
    <text x="1750" y="130">CREATES</text>
    <text x="1750" y="160">FREEDOM</text>
    
    <text x="1790" y="350">LEARN</text>
    <text x="1790" y="380">BUILD</text>
    <text x="1790" y="410">GROW</text>
    <text x="1790" y="440">REPEAT</text>
  </g>

  <!-- Circular Window Interior (Outdoor Vista) -->
  <g clip-path="url(#portalClip)">
    <rect x="${PORTAL_CX - PORTAL_R}" y="${PORTAL_CY - PORTAL_R}" width="${PORTAL_R * 2}" height="${PORTAL_R * 2}" fill="url(#skyGrad)" />
    <ellipse cx="${PORTAL_CX + 120}" cy="${PORTAL_CY - 140}" rx="360" ry="180" fill="#0284c7" opacity="0.22" filter="url(#bloomWide)" />
    <ellipse cx="${PORTAL_CX - 150}" cy="${PORTAL_CY - 200}" rx="280" ry="140" fill="#38bdf8" opacity="0.14" filter="url(#bloomWide)" />
    ${generateStars(220)}

    <!-- Moon -->
    <circle cx="1400" cy="270" r="260" fill="url(#moonCorona)" />
    <circle cx="1400" cy="270" r="150" fill="#7dd3fc" opacity="0.35" filter="url(#bloomWide)" />
    <circle cx="1400" cy="270" r="86" fill="url(#moonBody)" filter="url(#glowSubtle)" />
    <g opacity="0.26" fill="#1e3a5f">
      <path d="M 1355 240 Q 1375 220 1395 230 Q 1410 250 1390 270 Q 1365 280 1350 260 Z" />
      <circle cx="1385" cy="245" r="24" />
      <circle cx="1420" cy="255" r="18" />
      <circle cx="1428" cy="280" r="20" />
      <ellipse cx="1458" cy="265" rx="12" ry="9" />
      <circle cx="1410" cy="328" r="6" fill="#ffffff" opacity="0.75" />
    </g>

    <!-- Mountains -->
    <path d="M 800 550 Q 940 450 1080 500 Q 1200 420 1340 480 Q 1460 430 1600 500 Q 1700 460 1780 510 L 1780 1000 L 800 1000 Z" fill="#071424" opacity="0.9" />
    <path d="M 800 550 Q 940 450 1080 500 Q 1200 420 1340 480 Q 1460 430 1600 500 Q 1700 460 1780 510" stroke="#38bdf8" stroke-width="1.5" fill="none" opacity="0.4" />
    <path d="M 820 600 L 910 540 L 980 580 L 1090 510 L 1180 570 L 1260 500 L 1360 560 L 1480 470 L 1580 540 L 1680 490 L 1760 560 L 1760 1000 L 820 1000 Z" fill="#040d1a" />
    <path d="M 820 600 L 910 540 L 980 580 L 1090 510 L 1180 570 L 1260 500 L 1360 560 L 1480 470 L 1580 540 L 1680 490 L 1760 560" stroke="#7dd3fc" stroke-width="2.5" fill="none" opacity="0.75" filter="url(#glowSubtle)" />

    <!-- Pagodas -->
    <g transform="translate(1040, 480) scale(0.7)">
      <polygon points="20,120 120,120 100,80 35,80" fill="#020814" />
      <polygon points="10,80 130,80 115,60 25,60" fill="#0a182c" stroke="#38bdf8" stroke-width="1.2" />
      <rect x="45" y="64" width="12" height="12" fill="#fbbf24" opacity="0.9" filter="url(#glowSubtle)" />
      <rect x="65" y="64" width="12" height="12" fill="#fbbf24" opacity="0.9" filter="url(#glowSubtle)" />
      <polygon points="25,60 115,60 102,42 38,42" fill="#0a182c" stroke="#38bdf8" stroke-width="1" />
      <rect x="55" y="46" width="10" height="10" fill="#fbbf24" opacity="0.9" />
      <polygon points="38,42 102,42 90,26 50,26" fill="#0a182c" stroke="#38bdf8" stroke-width="1" />
      <line x1="70" y1="26" x2="70" y2="10" stroke="#38bdf8" stroke-width="2" />
      <circle cx="70" cy="10" r="3.5" fill="#fef08a" filter="url(#glowSubtle)" />
    </g>

    <g transform="translate(1360, 525) scale(0.55)">
      <polygon points="20,70 100,70 90,50 30,50" fill="#0a182c" stroke="#38bdf8" stroke-width="1" />
      <rect x="42" y="54" width="8" height="8" fill="#fbbf24" opacity="0.95" filter="url(#glowSubtle)" />
      <polygon points="30,50 90,50 80,34 40,34" fill="#0a182c" stroke="#38bdf8" stroke-width="1" />
      <line x1="60" y1="34" x2="60" y2="20" stroke="#38bdf8" stroke-width="1.5" />
      <circle cx="60" cy="20" r="3" fill="#fef08a" />
    </g>

    <!-- Cliffs & Cascading Waterfalls -->
    <path d="M 830 680 Q 940 610 1030 650 L 1070 720 L 1030 820 L 830 820 Z" fill="#030712" />
    <path d="M 1150 610 Q 1280 590 1400 630 L 1420 690 L 1380 770 L 1130 770 Z" fill="#02050e" />

    <g filter="url(#glowSubtle)">
      <path d="M 1035 650 C 1040 685, 1034 725, 1037 760" stroke="url(#waterfallGrad)" stroke-width="7" fill="none" opacity="0.95" />
      <ellipse cx="1038" cy="762" rx="35" ry="12" fill="#38bdf8" opacity="0.5" filter="url(#bloomWide)" />
      <ellipse cx="1038" cy="762" rx="20" ry="7" fill="#ffffff" opacity="0.85" />
      <path d="M 1245 615 C 1248 655, 1243 695, 1246 735" stroke="url(#waterfallGrad)" stroke-width="6" fill="none" opacity="0.9" />
      <ellipse cx="1255" cy="738" rx="32" ry="10" fill="#38bdf8" opacity="0.45" filter="url(#bloomWide)" />
      <ellipse cx="1255" cy="738" rx="18" ry="6" fill="#ffffff" opacity="0.8" />
    </g>

    <!-- Lake -->
    <rect x="800" y="720" width="950" height="260" fill="url(#lakeGrad)" />
    <ellipse cx="1380" cy="770" rx="45" ry="50" fill="#38bdf8" opacity="0.25" filter="url(#bloomWide)" />
    <g stroke="#7dd3fc" opacity="0.5" stroke-linecap="round">
      <line x1="1340" y1="740" x2="1420" y2="740" stroke-width="1.8" />
      <line x1="1320" y1="752" x2="1440" y2="752" stroke-width="2.2" />
      <line x1="1310" y1="765" x2="1455" y2="765" stroke-width="2.6" />
      <line x1="1300" y1="778" x2="1465" y2="778" stroke-width="2.2" />
      <line x1="1325" y1="792" x2="1445" y2="792" stroke-width="1.8" />
    </g>
  </g>

  <!-- Circular Window Frame -->
  <g id="window-frame">
    <circle cx="${PORTAL_CX}" cy="${PORTAL_CY}" r="${PORTAL_R + 32}" stroke="url(#metalBezel)" stroke-width="16" fill="none" opacity="0.95" />
    <circle cx="${PORTAL_CX}" cy="${PORTAL_CY}" r="${PORTAL_R + 18}" stroke="#09101a" stroke-width="12" fill="none" />
    <circle cx="${PORTAL_CX}" cy="${PORTAL_CY}" r="${PORTAL_R + 10}" stroke="url(#neonCyan)" stroke-width="4" fill="none" opacity="0.95" filter="url(#nuIntenseGlow)" />
    <circle cx="${PORTAL_CX}" cy="${PORTAL_CY}" r="${PORTAL_R + 4}" stroke="#101c2e" stroke-width="8" fill="none" />
    <circle cx="${PORTAL_CX}" cy="${PORTAL_CY}" r="${PORTAL_R}" stroke="#22d3ee" stroke-width="3" fill="none" opacity="0.9" filter="url(#glowSubtle)" />
    <circle cx="${PORTAL_CX}" cy="${PORTAL_CY}" r="${PORTAL_R - 2}" stroke="#bae6fd" stroke-width="1.2" fill="none" opacity="0.5" />
  </g>

  <!-- Cherry Blossom Sakura Branch -->
  <g id="cherry-blossoms">
    <path d="M 880 160 Q 980 200 1080 190 Q 1180 180 1260 230 Q 1320 270 1370 250" stroke="#1c1917" stroke-width="22" stroke-linecap="round" fill="none" />
    <path d="M 880 160 Q 980 200 1080 190 Q 1180 180 1260 230 Q 1320 270 1370 250" stroke="#292524" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.6" />
    
    <path d="M 1080 190 Q 1060 250 1030 300 Q 1010 340 980 370" stroke="#1c1917" stroke-width="9" stroke-linecap="round" fill="none" />
    <path d="M 1180 180 Q 1190 230 1170 280 Q 1150 320 1130 360" stroke="#1c1917" stroke-width="8" stroke-linecap="round" fill="none" />
    <path d="M 1260 230 Q 1280 280 1270 330" stroke="#1c1917" stroke-width="7" stroke-linecap="round" fill="none" />

    <g transform="translate(1080, 190)">
      <circle cx="-10" cy="-8" r="11" fill="#fbcfe8" opacity="0.95" />
      <circle cx="10" cy="-8" r="11" fill="#f472b6" opacity="0.9" />
      <circle cx="0" cy="12" r="11" fill="#fda4af" opacity="0.95" />
      <circle cx="0" cy="2" r="4.5" fill="#ffffff" />
    </g>

    <g transform="translate(1180, 180)">
      <circle cx="-9" cy="-7" r="11" fill="#fbcfe8" opacity="0.95" />
      <circle cx="9" cy="-7" r="11" fill="#f472b6" opacity="0.9" />
      <circle cx="0" cy="10" r="11" fill="#fda4af" opacity="0.95" />
      <circle cx="0" cy="1" r="5" fill="#ffffff" />
    </g>

    <g transform="translate(1260, 230)">
      <circle cx="-8" cy="-6" r="10" fill="#fbcfe8" opacity="0.95" />
      <circle cx="8" cy="-6" r="10" fill="#f472b6" opacity="0.9" />
      <circle cx="0" cy="9" r="10" fill="#fda4af" opacity="0.95" />
      <circle cx="0" cy="1" r="4" fill="#ffffff" />
    </g>

    <path d="M 940 470 Q 945 475 952 473 Q 950 480 942 478 Z" fill="#fbcfe8" opacity="0.85" />
    <path d="M 1050 420 Q 1055 425 1062 423 Q 1060 430 1052 428 Z" fill="#f472b6" opacity="0.9" />
    <path d="M 1200 440 Q 1205 445 1212 443 Q 1210 450 1202 448 Z" fill="#fda4af" opacity="0.85" />
  </g>

  <!-- Sanctuary Floor & Warm Light Bar -->
  <rect x="0" y="740" width="${W}" height="340" fill="#070b13" />
  <rect x="340" y="738" width="1400" height="7" fill="url(#warmLightBar)" filter="url(#glowSubtle)" />
  <rect x="500" y="740" width="1080" height="3" fill="#fef08a" opacity="0.9" />
  <line x1="0" y1="745" x2="${W}" y2="745" stroke="#00f5ff" stroke-width="1.8" opacity="0.5" filter="url(#glowSubtle)" />

  <!-- Left Low Coffee Table, Mug & Bonsai -->
  <g id="left-table">
    <polygon points="160,820 480,820 440,880 120,880" fill="#0a1220" stroke="#1e293b" stroke-width="2" opacity="0.9" />
    <line x1="120" y1="880" x2="440" y2="880" stroke="#00f5ff" stroke-width="2" opacity="0.4" filter="url(#glowSubtle)" />
    
    <g transform="translate(230, 775)">
      <rect x="0" y="0" width="48" height="54" rx="5" fill="#141a24" stroke="#334155" stroke-width="2" />
      <path d="M 48 10 C 62 10, 62 44, 48 44" stroke="#334155" stroke-width="4" fill="none" />
      <text x="6" y="18" font-family="sans-serif" font-size="6.5" font-weight="700" fill="#94a3b8">Good</text>
      <text x="6" y="28" font-family="sans-serif" font-size="6.5" font-weight="700" fill="#94a3b8">Code</text>
      <text x="6" y="38" font-family="sans-serif" font-size="6" font-weight="600" fill="#64748b">Better</text>
      <text x="6" y="47" font-family="sans-serif" font-size="5.5" font-weight="600" fill="#64748b">Tomorrow</text>
    </g>

    <g transform="translate(300, 810) rotate(-6)">
      <polygon points="0,10 140,0 150,55 10,65" fill="#0d1422" stroke="#1e293b" stroke-width="2" />
      <g transform="translate(68, 30) scale(0.65)" filter="url(#nuIntenseGlow)">
        <text x="0" y="0" font-family="sans-serif" font-size="24" font-weight="900" fill="#00f5ff" text-anchor="middle">NU</text>
      </g>
    </g>

    <g transform="translate(100, 520) scale(0.85)">
      <polygon points="20,180 80,180 72,200 28,200" fill="#0a0f18" stroke="#1e293b" stroke-width="2" />
      <path d="M 50 180 Q 40 140 60 110 Q 75 90 70 60" stroke="#292524" stroke-width="10" stroke-linecap="round" fill="none" />
      <ellipse cx="70" cy="55" rx="35" ry="18" fill="#065f46" opacity="0.85" />
    </g>
  </g>
`;

const characterFigureSvg = `
  <!-- SEATED DEVELOPER CHARACTER IN LOUNGE CHAIR -->
  <g id="seated-developer-figure" transform="translate(1200, 480) scale(0.58)">
    <ellipse cx="720" cy="1200" rx="360" ry="48" fill="#000000" opacity="0.85" filter="url(#glowSubtle)" />

    <g id="chair-base" transform="translate(720, 1140)">
      <ellipse cx="0" cy="-20" rx="28" ry="12" fill="#334155" />
      <path d="M -28 -20 L -24 35 C -24 45, 24 45, 24 35 L 28 -20 Z" fill="url(#starBaseGrad)" stroke="#1e293b" stroke-width="1.5" />
      <path d="M -15 30 L -250 115 L -270 118 L -260 130 L -180 105 L -5 36 Z" fill="url(#starBaseGrad)" stroke="#334155" stroke-width="1.5" />
      <rect x="-270" y="118" width="18" height="14" rx="4" fill="#020617" stroke="#475569" stroke-width="1" />
      <path d="M 15 30 L 230 115 L 255 118 L 245 130 L 170 105 L 5 36 Z" fill="url(#starBaseGrad)" stroke="#334155" stroke-width="1.5" />
      <rect x="240" y="118" width="18" height="14" rx="4" fill="#020617" stroke="#475569" stroke-width="1" />
      <path d="M -10 38 L 40 145 L 30 155 L -10 148 L -18 42 Z" fill="url(#starBaseGrad)" stroke="#1e293b" stroke-width="1.5" />
      <rect x="25" y="148" width="18" height="12" rx="4" fill="#020617" />
    </g>

    <g id="chair-body">
      <path d="M 440 760 C 420 700, 480 640, 560 635 C 720 625, 960 640, 1020 710 C 1055 750, 1040 830, 990 870 C 930 920, 530 920, 470 870 C 430 835, 430 790, 440 760 Z" fill="url(#leatherBack)" stroke="#090c10" stroke-width="3" />
      <path d="M 880 620 C 970 635, 1070 700, 1050 820 C 1035 880, 850 940, 680 945" stroke="url(#metalTubing)" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.9" />
      <path d="M 820 650 C 960 660, 1040 700, 1030 760 C 1020 810, 940 825, 840 820 L 760 800 Z" fill="url(#leatherCushion)" stroke="#1e293b" stroke-width="2" />
      <path d="M 460 760 C 500 740, 780 740, 940 770 C 970 840, 930 890, 860 905 C 720 920, 530 915, 475 870 C 445 840, 445 780, 460 760 Z" fill="url(#leatherCushion)" stroke="#0f172a" stroke-width="2.5" />
    </g>

    <g id="sneakers-and-feet">
      <g id="left-sneaker" transform="translate(190, 770)">
        <path d="M 0 70 C 20 60, 90 65, 130 95 C 150 110, 160 145, 150 170 L 60 175 C 30 175, -5 170, -20 155 C -35 140, -35 110, -20 85 Z" fill="#0f172a" stroke="#334155" stroke-width="2" />
        <path d="M -25 155 C 0 145, 80 150, 155 170 L 150 195 C 110 202, 20 200, -28 190 C -38 180, -38 165, -25 155 Z" fill="#f8fafc" stroke="#64748b" stroke-width="2" />
        <path d="M 70 174 L 125 184 L 120 192 L 68 182 Z" fill="#00f5ff" filter="url(#glowSubtle)" />
        <g transform="translate(62, 130) rotate(-12) scale(0.65)">
          <text x="0" y="0" font-family="sans-serif" font-size="18" font-weight="900" fill="#00f5ff" text-anchor="middle">NU</text>
        </g>
      </g>
      <g id="right-sneaker" transform="translate(260, 940)">
        <path d="M 0 50 C 30 40, 110 55, 140 85 C 160 105, 165 140, 150 160 L 60 165 C 20 165, -15 155, -25 135 C -35 110, -30 75, 0 50 Z" fill="#0f172a" stroke="#334155" stroke-width="2" />
        <path d="M -28 135 C 10 130, 90 140, 155 160 L 150 182 C 100 188, 15 185, -30 170 C -38 158, -38 145, -28 135 Z" fill="#f8fafc" stroke="#64748b" stroke-width="2" />
        <path d="M 75 160 L 125 170 L 120 178 L 72 168 Z" fill="#00f5ff" filter="url(#glowSubtle)" />
      </g>
    </g>

    <g id="pants-and-legs">
      <path d="M 440 580 C 360 620, 270 700, 260 790 L 320 805 C 340 730, 420 670, 500 635 Z" fill="url(#joggersFabric)" stroke="#1e293b" stroke-width="2" />
      <rect x="250" y="785" width="70" height="20" rx="6" fill="#090d14" stroke="#334155" stroke-width="1.5" />
      <path d="M 480 640 C 440 680, 360 800, 330 950 L 390 965 C 430 830, 520 730, 570 660 Z" fill="url(#joggersFabric)" stroke="#1e293b" stroke-width="2" />
      <rect x="320" y="945" width="70" height="20" rx="6" fill="#090d14" stroke="#334155" stroke-width="1.5" />
    </g>

    <g id="upper-body">
      <path d="M 520 440 C 460 480, 440 560, 480 630 L 530 615 C 500 560, 510 500, 570 465 Z" fill="#13171e" stroke="#1e293b" stroke-width="2" />
      <g transform="translate(485, 600) rotate(-24)">
        <rect x="-6" y="-14" width="12" height="28" rx="3" fill="#020617" stroke="#334155" stroke-width="1" />
        <rect x="-10" y="-12" width="20" height="24" rx="5" fill="#090d16" stroke="#475569" stroke-width="1.5" />
        <circle cx="0" cy="0" r="3" fill="#00f5ff" />
      </g>
      <path d="M 500 370 C 460 430, 480 540, 530 620 C 600 660, 780 660, 860 610 C 900 550, 920 440, 880 370 C 850 320, 780 270, 710 260 C 630 250, 550 290, 500 370 Z" fill="url(#hoodieFabric)" stroke="#1e293b" stroke-width="2.5" />
      <path d="M 870 380 C 930 420, 980 510, 930 620 L 870 590 C 900 510, 870 440, 820 400 Z" fill="#141820" stroke="#1e293b" stroke-width="2" />
      <path d="M 910 590 C 880 520, 780 380, 680 300 L 720 270 C 810 350, 920 490, 950 580 Z" fill="#13171e" stroke="#1e293b" stroke-width="2" />
      <ellipse cx="670" cy="275" rx="24" ry="20" fill="#c28c68" stroke="#382215" stroke-width="2" />
      <path d="M 610 270 C 580 310, 600 370, 650 390 C 720 405, 780 400, 830 360 C 860 320, 840 270, 800 250 C 740 240, 650 245, 610 270 Z" fill="#181d26" stroke="#222b38" stroke-width="2" />
      
      <g id="head-and-hair">
        <ellipse cx="715" cy="190" rx="65" ry="75" fill="#0c1017" stroke="#1c2536" stroke-width="2" />
        <path d="M 640 190 C 630 140, 680 90, 730 85 C 790 80, 840 120, 830 180 C 825 210, 800 240, 750 250 C 690 255, 645 225, 640 190 Z" fill="#080a0e" />
        <path d="M 660 140 Q 690 95 730 100 Q 770 105 780 140" stroke="#040507" stroke-width="12" stroke-linecap="round" fill="none" />
        <path d="M 645 200 C 635 140, 685 95, 735 90 C 785 85, 825 110, 828 140" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.95" filter="url(#glowSubtle)" />
      </g>

      <g id="glowing-nu-back-emblem" transform="translate(735, 450)">
        <circle cx="0" cy="15" r="140" fill="#00f5ff" opacity="0.14" filter="url(#nuIntenseGlow)" />
        <g filter="url(#nuIntenseGlow)">
          <text x="0" y="25" font-family="'Segoe UI', Roboto, sans-serif" font-size="105" font-weight="900" fill="#00f5ff" text-anchor="middle" letter-spacing="8">NU</text>
        </g>
        <text x="0" y="25" font-family="'Segoe UI', Roboto, sans-serif" font-size="105" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="8" opacity="0.9">NU</text>
        <g filter="url(#glowSubtle)">
          <text x="0" y="65" font-family="'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#38bdf8" text-anchor="middle" letter-spacing="7">NANDHAKUMAR</text>
          <text x="0" y="94" font-family="'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" fill="#38bdf8" text-anchor="middle" letter-spacing="9">UNIVERSE</text>
        </g>
      </g>
    </g>
  </g>
`;

const foregroundFogSvg = `
  <!-- Rolling Fog & Cloud Vignettes -->
  <g id="foreground-clouds" pointer-events="none">
    <rect x="0" y="880" width="${W}" height="200" fill="url(#fogBottom)" />
    <ellipse cx="200" cy="1020" rx="350" ry="120" fill="url(#fogRadial)" />
    <ellipse cx="600" cy="1040" rx="420" ry="140" fill="url(#fogRadial)" />
    <ellipse cx="1100" cy="1030" rx="480" ry="130" fill="url(#fogRadial)" />
    <ellipse cx="1600" cy="1020" rx="420" ry="140" fill="url(#fogRadial)" />
    <ellipse cx="1850" cy="980" rx="260" ry="120" fill="url(#fogRadial)" />
  </g>
`;

const masterArtworkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${defsSvg}${environmentSceneSvg}${characterFigureSvg}${foregroundFogSvg}</svg>`;

// Clean background has ABSOLUTELY NO character figure:
const cleanBackgroundSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${defsSvg}${environmentSceneSvg}${foregroundFogSvg}</svg>`;

const publicDir = path.join(__dirname, '../public');
const assetsDir = path.join(publicDir, 'assets');
const tmpDir = '/tmp/about_assets';

[publicDir, assetsDir, tmpDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

console.log('Writing SVGs...');
const masterSvgPath = path.join(tmpDir, 'about-master.svg');
const cleanSvgPath = path.join(tmpDir, 'about-clean.svg');

fs.writeFileSync(masterSvgPath, masterArtworkSvg, 'utf8');
fs.writeFileSync(cleanSvgPath, cleanBackgroundSvg, 'utf8');

console.log('Rendering high-resolution images...');

const primaryMasterPng = path.join(assetsDir, 'about-cinematic.png');
const primaryMasterWebp = path.join(assetsDir, 'about-cinematic.webp');
const cleanPng = path.join(assetsDir, 'about-bg-clean.png');
const cleanWebp = path.join(assetsDir, 'about-bg-clean.webp');

execSync(`ffmpeg -i "${masterSvgPath}" -y "${primaryMasterPng}"`, { stdio: 'inherit' });
execSync(`ffmpeg -i "${masterSvgPath}" -y "${primaryMasterWebp}"`, { stdio: 'inherit' });
execSync(`ffmpeg -i "${cleanSvgPath}" -y "${cleanPng}"`, { stdio: 'inherit' });
execSync(`ffmpeg -i "${cleanSvgPath}" -y "${cleanWebp}"`, { stdio: 'inherit' });

// Copy to public root as well
const publicRefPng = path.join(publicDir, 'about-reference.png');
const publicRefJpg = path.join(publicDir, 'about-reference.jpg');
const assetsRefPng = path.join(assetsDir, 'about-reference.png');
const assetsRefJpg = path.join(assetsDir, 'about-reference.jpg');
const publicMasterPng = path.join(publicDir, 'about-cinematic.png');
const publicMasterWebp = path.join(publicDir, 'about-cinematic.webp');
const publicCleanPng = path.join(publicDir, 'about-bg-clean.png');
const publicCleanWebp = path.join(publicDir, 'about-bg-clean.webp');

fs.copyFileSync(primaryMasterPng, publicRefPng);
fs.copyFileSync(primaryMasterPng, assetsRefPng);
fs.copyFileSync(primaryMasterPng, publicMasterPng);
fs.copyFileSync(primaryMasterWebp, publicMasterWebp);
fs.copyFileSync(cleanPng, publicCleanPng);
fs.copyFileSync(cleanWebp, publicCleanWebp);

execSync(`ffmpeg -i "${primaryMasterPng}" -y "${publicRefJpg}"`, { stdio: 'ignore' });
fs.copyFileSync(publicRefJpg, assetsRefJpg);

console.log('Done rendering updated cinematic assets.');
