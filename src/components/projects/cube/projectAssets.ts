/**
 * Centralized Project Asset System for 3D Project Cube Showcase.
 * Generates self-contained, high-definition SVG Data URL preview screenshots
 * that load 100% reliably with THREE.TextureLoader / HTML5 Canvas.
 */

export interface ProjectAsset {
  id: string;
  name: string;
  title: string;
  category: string;
  accentColor: string;
  dataUrl: string;
}

/**
 * Creates an SVG Data URL representing a realistic dark-mode SaaS application UI.
 */
function createSaasPreviewDataUrl(
  title: string,
  badge: string,
  accentColor: string,
  svgContent: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#020817" />
        <stop offset="50%" stop-color="#071830" />
        <stop offset="100%" stop-color="#020817" />
      </linearGradient>
      <linearGradient id="panelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0a1d38" />
        <stop offset="100%" stop-color="#040f24" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- Background Base -->
    <rect width="1024" height="1024" fill="url(#bgGrad)" />
    <rect x="24" y="24" width="976" height="976" rx="28" fill="none" stroke="${accentColor}" stroke-opacity="0.4" stroke-width="4" />

    <!-- Window Header -->
    <rect x="24" y="24" width="976" height="88" rx="28" fill="#091b36" />
    <circle cx="72" cy="68" r="12" fill="#ff5f56" />
    <circle cx="108" cy="68" r="12" fill="#ffbd2e" />
    <circle cx="144" cy="68" r="12" fill="#27c93f" />

    <text x="184" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="bold" fill="#ffffff">${title}</text>

    <!-- Badge Pill -->
    <rect x="760" y="44" width="200" height="48" rx="24" fill="${accentColor}" fill-opacity="0.15" stroke="${accentColor}" stroke-width="2" />
    <text x="860" y="75" font-family="monospace" font-size="20" font-weight="bold" fill="${accentColor}" text-anchor="middle">${badge}</text>

    <!-- Content Slot -->
    ${svgContent}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// 1. Resume Forge UI Preview (SaaS Resume Builder Studio)
const resumeForgeSvgContent = `
  <!-- Left Editor Panel -->
  <rect x="56" y="140" width="360" height="820" rx="20" fill="url(#panelGrad)" stroke="rgba(192, 132, 252, 0.3)" stroke-width="2" />
  <text x="88" y="196" font-family="monospace" font-size="22" font-weight="bold" fill="#c084fc">RESUME EDITOR</text>
  
  <rect x="88" y="230" width="296" height="64" rx="12" fill="#c084fc" />
  <text x="112" y="270" font-family="system-ui" font-size="20" font-weight="bold" fill="#030816">1. Personal Info ✓</text>

  <rect x="88" y="314" width="296" height="64" rx="12" fill="#0d2547" stroke="#c084fc" stroke-width="2" />
  <text x="112" y="354" font-family="system-ui" font-size="20" font-weight="bold" fill="#ffffff">2. Work Experience ▶</text>

  <rect x="88" y="398" width="296" height="64" rx="12" fill="#07162c" />
  <text x="112" y="438" font-family="system-ui" font-size="20" font-weight="bold" fill="#94a3b8">3. Projects &amp; Code</text>

  <rect x="88" y="482" width="296" height="64" rx="12" fill="#07162c" />
  <text x="112" y="522" font-family="system-ui" font-size="20" font-weight="bold" fill="#94a3b8">4. Technical Skills</text>

  <rect x="88" y="566" width="296" height="64" rx="12" fill="#07162c" />
  <text x="112" y="606" font-family="system-ui" font-size="20" font-weight="bold" fill="#94a3b8">5. ATS Optimizer</text>

  <!-- Right Paper Resume Document Preview -->
  <rect x="448" y="140" width="520" height="820" rx="20" fill="#f8fafc" />
  
  <!-- Resume Header -->
  <text x="496" y="210" font-family="system-ui, sans-serif" font-size="38" font-weight="900" fill="#0f172a">NANDHAKUMAR</text>
  <text x="496" y="248" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#0284c7">FULL STACK SOFTWARE ENGINEER</text>
  <line x1="496" y1="270" x2="920" y2="270" stroke="#cbd5e1" stroke-width="3" />

  <!-- Experience Section -->
  <text x="496" y="316" font-family="monospace" font-size="20" font-weight="bold" fill="#0369a1">WORK EXPERIENCE</text>
  <text x="496" y="350" font-family="system-ui" font-size="20" font-weight="bold" fill="#1e293b">Senior MERN Developer • Tech Studio</text>
  <text x="496" y="382" font-family="system-ui" font-size="18" fill="#475569">• Designed high-throughput real-time APIs using Node.js &amp; WebSockets</text>
  <text x="496" y="412" font-family="system-ui" font-size="18" fill="#475569">• Built ATS resume studio with instant PDF generation and scoring</text>

  <!-- Skills Section -->
  <text x="496" y="470" font-family="monospace" font-size="20" font-weight="bold" fill="#0369a1">TECHNICAL SKILLS</text>
  <text x="496" y="504" font-family="system-ui" font-size="18" fill="#334155">React 18, TypeScript, Node.js, Express, Supabase, Tailwind CSS, Docker</text>

  <!-- Projects Section -->
  <text x="496" y="562" font-family="monospace" font-size="20" font-weight="bold" fill="#0369a1">FEATURED PROJECTS</text>
  <text x="496" y="596" font-family="system-ui" font-size="20" font-weight="bold" fill="#1e293b">Resume Forge — Interactive ATS Resume Studio</text>
  <text x="496" y="626" font-family="system-ui" font-size="18" fill="#475569">Real-time resume builder with 98% ATS scoring compliance.</text>

  <!-- Floating ATS Badge Card -->
  <rect x="680" y="740" width="260" height="180" rx="20" fill="#030816" stroke="#c084fc" stroke-width="4" filter="url(#glow)" />
  <text x="810" y="800" font-family="monospace" font-size="44" font-weight="900" fill="#c084fc" text-anchor="middle">98/100</text>
  <text x="810" y="845" font-family="system-ui" font-size="20" font-weight="bold" fill="#e2e8f0" text-anchor="middle">ATS SCORE MATCH ✓</text>
  <text x="810" y="880" font-family="system-ui" font-size="16" fill="#94a3b8" text-anchor="middle">Ready for Top Tech Companies</text>
`;

// 2. SWAYAM 2.0 UI Preview
const swayamSvgContent = `
  <rect x="56" y="140" width="912" height="180" rx="20" fill="url(#panelGrad)" stroke="#00f5ff" stroke-width="2" />
  <text x="96" y="210" font-family="system-ui" font-size="36" font-weight="900" fill="#ffffff">SWAYAM 2.0 Digital Campus</text>
  <text x="96" y="254" font-family="system-ui" font-size="22" fill="#94a3b8">Full Stack Education Platform • MERN + WebSockets + Automated Alerts</text>

  <!-- Video Lecture Card -->
  <rect x="56" y="350" width="520" height="360" rx="20" fill="#020817" stroke="#00f5ff" stroke-width="3" />
  <circle cx="316" cy="510" r="50" fill="#00f5ff" />
  <polygon points="306,485 336,510 306,535" fill="#020817" />
  <text x="88" y="670" font-family="system-ui" font-size="22" font-weight="bold" fill="#ffffff">Lecture 14: Socket.IO Live Feed Broadcast</text>

  <!-- Progress Metrics Cards -->
  <rect x="608" y="350" width="360" height="165" rx="20" fill="url(#panelGrad)" stroke="rgba(0,245,255,0.3)" stroke-width="2" />
  <text x="648" y="420" font-family="monospace" font-size="48" font-weight="900" fill="#00f5ff">85%</text>
  <text x="648" y="470" font-family="system-ui" font-size="22" font-weight="bold" fill="#ffffff">Course Completion Rate</text>

  <rect x="608" y="545" width="360" height="165" rx="20" fill="url(#panelGrad)" stroke="#10b981" stroke-width="2" />
  <text x="648" y="615" font-family="monospace" font-size="40" font-weight="900" fill="#10b981">ACTIVE</text>
  <text x="648" y="665" font-family="system-ui" font-size="22" font-weight="bold" fill="#ffffff">NodeMailer Alert Service</text>

  <!-- Bottom Alert Bar -->
  <rect x="56" y="740" width="912" height="140" rx="20" fill="#062038" stroke="#10b981" stroke-width="3" />
  <text x="96" y="795" font-family="monospace" font-size="26" font-weight="bold" fill="#10b981">🔔 REAL-TIME BROADCAST DISPATCH</text>
  <text x="96" y="840" font-family="system-ui" font-size="22" fill="#e2e8f0">Assignment 04 submission deadline alert broadcast to 1,240 enrolled students.</text>
`;

// 3. Speed Taxi UI Preview
const speedTaxiSvgContent = `
  <rect x="56" y="140" width="912" height="540" rx="20" fill="#041226" stroke="#38bdf8" stroke-width="3" />
  <!-- Map Roads Grid -->
  <line x1="56" y1="280" x2="968" y2="280" stroke="rgba(56,189,248,0.2)" stroke-width="8" />
  <line x1="56" y1="460" x2="968" y2="460" stroke="rgba(56,189,248,0.2)" stroke-width="8" />
  <line x1="320" y1="140" x2="320" y2="680" stroke="rgba(56,189,248,0.2)" stroke-width="8" />
  <line x1="700" y1="140" x2="700" y2="680" stroke="rgba(56,189,248,0.2)" stroke-width="8" />

  <!-- Active Route Vector -->
  <path d="M 180 520 L 320 380 L 700 460 L 840 240" fill="none" stroke="#00f5ff" stroke-width="10" stroke-linecap="round" />

  <!-- Vehicle Pin -->
  <circle cx="700" cy="460" r="28" fill="#f59e0b" filter="url(#glow)" />
  <text x="700" y="468" font-family="system-ui" font-size="22" text-anchor="middle">🚕</text>

  <!-- Dispatch Panel -->
  <rect x="120" y="720" width="784" height="200" rx="24" fill="#020919" stroke="#38bdf8" stroke-width="4" />
  <text x="160" y="780" font-family="system-ui" font-size="32" font-weight="900" fill="#ffffff">Speed Taxi — Smart Urban Mobility</text>
  <text x="160" y="840" font-family="monospace" font-size="42" font-weight="900" fill="#38bdf8">$18.50</text>
  <text x="360" y="840" font-family="system-ui" font-size="22" fill="#94a3b8">Distance: 4.2 km • Driver #402 En Route (2 min)</text>

  <rect x="680" y="760" width="190" height="70" rx="16" fill="#0284c7" />
  <text x="775" y="805" font-family="monospace" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">BOOK TAXI →</text>
`;

// 4. AI Wildlife UI Preview
const aiWildlifeSvgContent = `
  <rect x="56" y="140" width="912" height="560" rx="20" fill="#02140a" stroke="#22c55e" stroke-width="3" />
  
  <!-- YOLOv8 Bounding Box -->
  <rect x="240" y="220" width="480" height="340" fill="none" stroke="#f97316" stroke-width="6" />
  <rect x="240" y="170" width="420" height="50" fill="#f97316" />
  <text x="260" y="205" font-family="monospace" font-size="24" font-weight="bold" fill="#000000">ELEPHANT DETECTED [98.4%]</text>

  <!-- Radar Overlay -->
  <circle cx="840" cy="240" r="70" fill="#021f0f" stroke="#22c55e" stroke-width="3" />
  <line x1="840" y1="240" x2="890" y2="190" stroke="#22c55e" stroke-width="4" />

  <!-- Ranger Warning Bar -->
  <rect x="56" y="730" width="912" height="180" rx="20" fill="#0a2a16" stroke="#f97316" stroke-width="4" />
  <text x="96" y="790" font-family="monospace" font-size="30" font-weight="bold" fill="#f97316">⚠️ RANGER SMS &amp; ACOUSTIC DETERRENT SENT</text>
  <text x="96" y="840" font-family="system-ui" font-size="22" fill="#e2e8f0">Inference Latency: 38ms • Boundary Zone 04 Protected</text>
`;

// 5. NK MERN CLI UI Preview
const nkMernCliSvgContent = `
  <rect x="56" y="140" width="912" height="780" rx="20" fill="#030b17" stroke="#00f5ff" stroke-width="3" />
  <text x="100" y="210" font-family="monospace" font-size="28" font-weight="bold" fill="#00f5ff">$ npx nk-mern-cli@latest init my-app</text>
  <text x="100" y="270" font-family="monospace" font-size="24" fill="#10b981">✔ Scaffolding MERN Architecture v2.4...</text>
  <text x="100" y="330" font-family="monospace" font-size="24" fill="#38bdf8">? Select Database: › MongoDB (Mongoose)</text>
  <text x="100" y="390" font-family="monospace" font-size="24" fill="#38bdf8">? Select Auth: › JWT + Role-Based Access</text>
  <text x="100" y="450" font-family="monospace" font-size="24" fill="#38bdf8">? Include Docker &amp; CI/CD: › Yes</text>

  <!-- Progress Bar -->
  <rect x="100" y="520" width="824" height="40" rx="10" fill="#081e3a" />
  <rect x="100" y="520" width="824" height="40" rx="10" fill="#22c55e" />
  <text x="512" y="548" font-family="monospace" font-size="22" font-weight="bold" fill="#000000" text-anchor="middle">100% SCAFFOLDING COMPLETE</text>

  <text x="100" y="630" font-family="monospace" font-size="26" font-weight="bold" fill="#10b981">✔ Created 42 files in 1.2 seconds. 80%+ setup time saved!</text>
  <text x="100" y="700" font-family="monospace" font-size="28" font-weight="bold" fill="#00f5ff">$ cd my-app &amp;&amp; npm run dev █</text>
`;

// 6. OZOPOOL UI Preview
const ozopoolSvgContent = `
  <rect x="56" y="140" width="912" height="560" rx="20" fill="#021226" stroke="#06b6d4" stroke-width="3" />
  
  <!-- Water Wave Visualizer & Telemetry -->
  <path d="M 56 320 Q 280 260 512 320 T 968 320 L 968 700 L 56 700 Z" fill="url(#panelGrad)" opacity="0.6" />
  <path d="M 56 360 Q 280 420 512 360 T 968 360 L 968 700 L 56 700 Z" fill="#0284c7" opacity="0.2" />

  <!-- Telemetry Metrics Gauges -->
  <rect x="100" y="180" width="220" height="110" rx="16" fill="#031b38" stroke="#06b6d4" stroke-width="2" />
  <text x="120" y="220" font-family="monospace" font-size="18" fill="#06b6d4">pH LEVEL</text>
  <text x="120" y="265" font-family="monospace" font-size="38" font-weight="900" fill="#ffffff">7.42</text>

  <rect x="350" y="180" width="220" height="110" rx="16" fill="#031b38" stroke="#06b6d4" stroke-width="2" />
  <text x="370" y="220" font-family="monospace" font-size="18" fill="#06b6d4">ORP (mV)</text>
  <text x="370" y="265" font-family="monospace" font-size="38" font-weight="900" fill="#ffffff">750</text>

  <rect x="600" y="180" width="220" height="110" rx="16" fill="#031b38" stroke="#22c55e" stroke-width="2" />
  <text x="620" y="220" font-family="monospace" font-size="18" fill="#22c55e">PURITY</text>
  <text x="620" y="265" font-family="monospace" font-size="38" font-weight="900" fill="#22c55e">99.9%</text>

  <!-- Ozone Pump Control Card -->
  <rect x="56" y="730" width="912" height="180" rx="20" fill="#04223d" stroke="#06b6d4" stroke-width="4" />
  <text x="96" y="790" font-family="monospace" font-size="28" font-weight="bold" fill="#06b6d4">⚡ AUTOMATED OZONE PURIFICATION DISPATCH</text>
  <text x="96" y="840" font-family="system-ui" font-size="22" fill="#e2e8f0">Chemical Dosage: -45% • Pump Flow Rate: 42 GPM (Optimal)</text>
`;

export const PROJECT_ASSETS: Record<string, ProjectAsset> = {
  'ozopool': {
    id: 'ozopool',
    name: 'ozopool',
    title: 'OZOPOOL — Smart Aquatic Sanitation',
    category: 'SMART WATER / IOT',
    accentColor: '#06b6d4',
    dataUrl: createSaasPreviewDataUrl(
      'OZOPOOL — Smart Water System',
      'PURITY 99.9%',
      '#06b6d4',
      ozopoolSvgContent
    ),
  },
  'resume-forge': {
    id: 'resume-forge',
    name: 'resumeForge',
    title: 'Resume Forge — ATS Career Studio',
    category: 'CAREER STUDIO',
    accentColor: '#c084fc',
    dataUrl: createSaasPreviewDataUrl(
      'Resume Forge — ATS Studio',
      '98/100 ATS MATCH',
      '#c084fc',
      resumeForgeSvgContent
    ),
  },
  'swayam-2': {
    id: 'swayam-2',
    name: 'swayam',
    title: 'SWAYAM 2.0 — Digital Campus',
    category: 'EDTECH PLATFORM',
    accentColor: '#8b5cf6',
    dataUrl: createSaasPreviewDataUrl(
      'SWAYAM 2.0 — Education Platform',
      'LIVE CAMPUS',
      '#8b5cf6',
      swayamSvgContent
    ),
  },
  'speed-taxi': {
    id: 'speed-taxi',
    name: 'speedTaxi',
    title: 'REDTAXI — Mobility Dispatch',
    category: 'SMART MOBILITY',
    accentColor: '#ef4444',
    dataUrl: createSaasPreviewDataUrl(
      'REDTAXI — Live Dispatch',
      'DISPATCH ACTIVE',
      '#ef4444',
      speedTaxiSvgContent
    ),
  },
  'ai-wildlife': {
    id: 'ai-wildlife',
    name: 'aiWildlife',
    title: 'AI Wildlife Shield — YOLOv8 Protection',
    category: 'CONSERVATION AI',
    accentColor: '#00f5ff',
    dataUrl: createSaasPreviewDataUrl(
      'AI Wildlife Shield — Edge AI',
      'RADAR ACTIVE',
      '#00f5ff',
      aiWildlifeSvgContent
    ),
  },
  'wildlife-ai': {
    id: 'ai-wildlife',
    name: 'aiWildlife',
    title: 'AI Wildlife Shield — YOLOv8 Protection',
    category: 'CONSERVATION AI',
    accentColor: '#00f5ff',
    dataUrl: createSaasPreviewDataUrl(
      'AI Wildlife Shield — Edge AI',
      'RADAR ACTIVE',
      '#00f5ff',
      aiWildlifeSvgContent
    ),
  },
  'nk-mern-cli': {
    id: 'nk-mern-cli',
    name: 'nkMernCli',
    title: 'NK MERN CLI — Scaffolding Engine',
    category: 'DEVELOPER TOOL',
    accentColor: '#00f5ff',
    dataUrl: createSaasPreviewDataUrl(
      'Terminal — nk-mern-cli',
      'NPM PACKAGE',
      '#00f5ff',
      nkMernCliSvgContent
    ),
  },
};
