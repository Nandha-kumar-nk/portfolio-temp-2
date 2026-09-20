// High-fidelity procedural SVG screenshots for the 5 projects
// Rendered at 1920x1080 for razor-sharp 3D holographic projection

export const getProjectScreenshotUri = (projectId: string): string => {
  switch (projectId) {
    case 'swayam-2':
      return createSwayamSvg();
    case 'speed-taxi':
      return createSpeedTaxiSvg();
    case 'wildlife-ai':
      return createWildlifeAiSvg();
    case 'resume-forge':
      return createResumeForgeSvg();
    case 'nk-mern-cli':
      return createMernCliSvg();
    default:
      return createSwayamSvg();
  }
};

function createSwayamSvg(): string {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <linearGradient id="btnGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0ea5e9"/>
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" rx="16" fill="url(#bg)"/>

  <!-- Top Navigation -->
  <rect width="1200" height="70" fill="#ffffff" filter="url(#cardShadow)"/>
  <circle cx="50" cy="35" r="14" fill="#0284c7"/>
  <text x="75" y="41" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900" fill="#0f172a" letter-spacing="1">SWAYAM 2.0</text>

  <!-- Nav links -->
  <text x="600" y="40" font-family="-apple-system, sans-serif" font-size="14" font-weight="600" fill="#0284c7">Home</text>
  <text x="680" y="40" font-family="-apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748b">Courses</text>
  <text x="770" y="40" font-family="-apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748b">Events</text>
  <text x="850" y="40" font-family="-apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748b">Community</text>

  <!-- CTA Button -->
  <rect x="1010" y="18" width="130" height="36" rx="18" fill="url(#btnGrad)"/>
  <text x="1075" y="41" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">Get Started</text>

  <!-- Hero Content Left -->
  <g transform="translate(90, 160)">
    <text x="0" y="40" font-family="-apple-system, sans-serif" font-size="44" font-weight="900" fill="#0f172a">
      Learn <tspan fill="#0284c7">Without Limits</tspan>
    </text>
    <text x="0" y="76" font-family="-apple-system, sans-serif" font-size="16" font-weight="500" fill="#64748b">
      A modern learning platform for curious minds. Real-time broadcast &amp; assignments.
    </text>

    <!-- Search Bar -->
    <rect x="0" y="110" width="460" height="52" rx="26" fill="#ffffff" filter="url(#cardShadow)"/>
    <circle cx="32" cy="136" r="8" fill="none" stroke="#94a3b8" stroke-width="2"/>
    <line x1="38" y1="142" x2="44" y2="148" stroke="#94a3b8" stroke-width="2"/>
    <text x="60" y="141" font-family="-apple-system, sans-serif" font-size="14" fill="#94a3b8">Search for courses, topics, or skills...</text>
    <rect x="360" y="116" width="90" height="40" rx="20" fill="url(#btnGrad)"/>
    <text x="405" y="141" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">Explore</text>

    <!-- Stats Row -->
    <g transform="translate(0, 210)">
      <g>
        <text x="0" y="24" font-family="-apple-system, sans-serif" font-size="28" font-weight="800" fill="#0f172a">10K+</text>
        <text x="0" y="44" font-family="-apple-system, sans-serif" font-size="12" font-weight="600" fill="#64748b" text-transform="uppercase">Learners</text>
      </g>
      <g transform="translate(130, 0)">
        <text x="0" y="24" font-family="-apple-system, sans-serif" font-size="28" font-weight="800" fill="#0f172a">500+</text>
        <text x="0" y="44" font-family="-apple-system, sans-serif" font-size="12" font-weight="600" fill="#64748b" text-transform="uppercase">Courses</text>
      </g>
      <g transform="translate(260, 0)">
        <text x="0" y="24" font-family="-apple-system, sans-serif" font-size="28" font-weight="800" fill="#0f172a">50+</text>
        <text x="0" y="44" font-family="-apple-system, sans-serif" font-size="12" font-weight="600" fill="#64748b" text-transform="uppercase">Instructors</text>
      </g>
    </g>
  </g>

  <!-- Hero Content Right (Illustration & Floating Badges) -->
  <g transform="translate(730, 130)">
    <!-- Main illustration circular backdrop -->
    <circle cx="210" cy="220" r="180" fill="#e0f2fe" opacity="0.6"/>
    <circle cx="210" cy="220" r="140" fill="#bae6fd" opacity="0.4"/>

    <!-- Stylized Student with Laptop Graphic -->
    <circle cx="210" cy="160" r="46" fill="#0284c7"/>
    <rect x="150" y="220" width="120" height="150" rx="30" fill="#0369a1"/>
    <!-- Backpack -->
    <rect x="135" y="235" width="25" height="85" rx="12" fill="#0284c7"/>
    <!-- Laptop -->
    <rect x="160" y="280" width="100" height="60" rx="6" fill="#38bdf8" stroke="#ffffff" stroke-width="2"/>
    <polygon points="150,340 270,340 255,350 165,350" fill="#cbd5e1"/>

    <!-- Floating Icon Badges -->
    <g transform="translate(40, 80)" filter="url(#cardShadow)">
      <rect width="56" height="56" rx="16" fill="#0284c7"/>
      <path d="M28 18 L16 25 L28 32 L40 25 Z" fill="#ffffff"/>
      <path d="M20 30 L20 37 Q28 42 36 37 L36 30" fill="none" stroke="#ffffff" stroke-width="2"/>
    </g>

    <g transform="translate(320, 110)" filter="url(#cardShadow)">
      <rect width="52" height="52" rx="14" fill="#0ea5e9"/>
      <circle cx="26" cy="22" r="8" fill="#ffffff"/>
      <rect x="16" y="32" width="20" height="12" rx="6" fill="#ffffff"/>
    </g>

    <g transform="translate(290, 310)" filter="url(#cardShadow)">
      <rect width="60" height="60" rx="16" fill="#0369a1"/>
      <text x="30" y="36" font-family="-apple-system, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle">A+</text>
    </g>

    <!-- Bottom Capsule Tag -->
    <rect x="40" y="420" width="340" height="42" rx="21" fill="#ffffff" filter="url(#cardShadow)"/>
    <circle cx="64" cy="441" r="7" fill="#10b981"/>
    <text x="82" y="446" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#0f172a">
      Education for a Brighter Tomorrow
    </text>
  </g>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function createSpeedTaxiSvg(): string {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="darkMap" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1329"/>
      <stop offset="100%" stop-color="#030712"/>
    </linearGradient>
    <linearGradient id="cyanAmber" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>

  <!-- Background Map Grid -->
  <rect width="1200" height="675" rx="16" fill="url(#darkMap)"/>

  <!-- Stylized road lines -->
  <path d="M0 320 Q300 280 600 350 T1200 310" stroke="#1e293b" stroke-width="32" fill="none"/>
  <path d="M200 0 Q400 300 350 675" stroke="#1e293b" stroke-width="24" fill="none"/>
  <path d="M850 0 Q780 350 950 675" stroke="#1e293b" stroke-width="28" fill="none"/>

  <!-- Active Route Line -->
  <path d="M220 480 C360 460 520 280 780 260 S1020 380 1080 390" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" fill="none" stroke-dasharray="14 8"/>
  <path d="M220 480 C360 460 520 280 780 260" stroke="#f59e0b" stroke-width="8" stroke-linecap="round" fill="none"/>

  <!-- Taxi Vehicle Center -->
  <g transform="translate(560, 240)">
    <rect x="-80" y="-35" width="160" height="70" rx="20" fill="#0f172a" stroke="#f59e0b" stroke-width="4"/>
    <rect x="-40" y="-20" width="80" height="40" rx="8" fill="#1e293b"/>
    <!-- Yellow Cab Sign -->
    <rect x="-24" y="-45" width="48" height="15" rx="4" fill="#fbbf24"/>
    <text x="0" y="-34" font-family="-apple-system, sans-serif" font-size="9" font-weight="900" fill="#000" text-anchor="middle">TAXI</text>
    <!-- Headlights -->
    <polygon points="80,-20 220,-80 220,40 80,10" fill="#fef08a" opacity="0.3"/>
  </g>

  <!-- Left Dispatch Panel -->
  <rect x="60" y="60" width="340" height="555" rx="16" fill="#090d16" stroke="#1e293b" stroke-width="2"/>
  <text x="90" y="110" font-family="-apple-system, sans-serif" font-size="22" font-weight="900" fill="#ffffff">SPEED TAXI</text>
  <text x="90" y="132" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#f59e0b" letter-spacing="1">REAL-TIME DISPATCH SYSTEM</text>

  <!-- Pickup & Dropoff Inputs -->
  <rect x="90" y="160" width="280" height="48" rx="10" fill="#131b2e" stroke="#38bdf8" stroke-width="1.5"/>
  <circle cx="110" cy="184" r="6" fill="#10b981"/>
  <text x="128" y="189" font-family="-apple-system, sans-serif" font-size="13" fill="#ffffff">Airport Terminal 3</text>

  <rect x="90" y="220" width="280" height="48" rx="10" fill="#131b2e" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="110" cy="244" r="6" fill="#f59e0b"/>
  <text x="128" y="249" font-family="-apple-system, sans-serif" font-size="13" fill="#ffffff">Central Tech Park</text>

  <!-- Fare Card -->
  <rect x="90" y="300" width="280" height="120" rx="12" fill="#0f172a" stroke="#1e293b"/>
  <text x="110" y="335" font-family="-apple-system, sans-serif" font-size="14" fill="#94a3b8">Estimated Fare</text>
  <text x="110" y="375" font-family="-apple-system, sans-serif" font-size="34" font-weight="900" fill="#38bdf8">$24.50</text>
  <text x="250" y="375" font-family="-apple-system, sans-serif" font-size="12" fill="#10b981">14 mins away</text>

  <!-- Confirm Button -->
  <rect x="90" y="450" width="280" height="50" rx="12" fill="url(#cyanAmber)"/>
  <text x="230" y="482" font-family="-apple-system, sans-serif" font-size="15" font-weight="800" fill="#020617" text-anchor="middle">CONFIRM INSTANT RIDE</text>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function createWildlifeAiSvg(): string {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="forestBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#022c22"/>
      <stop offset="100%" stop-color="#064e3b"/>
    </linearGradient>
    <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#22c55e" stop-opacity="0"/>
      <stop offset="50%" stop-color="#22c55e" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#22c55e" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="675" rx="16" fill="url(#forestBg)"/>

  <!-- Radar Grid Circles -->
  <circle cx="600" cy="337" r="280" fill="none" stroke="#10b981" stroke-width="1.5" opacity="0.3"/>
  <circle cx="600" cy="337" r="200" fill="none" stroke="#10b981" stroke-width="1.5" opacity="0.4"/>
  <circle cx="600" cy="337" r="120" fill="none" stroke="#10b981" stroke-width="1.5" opacity="0.5"/>
  <line x1="600" y1="50" x2="600" y2="625" stroke="#10b981" stroke-width="1.5" opacity="0.3"/>
  <line x1="320" y1="337" x2="880" y2="337" stroke="#10b981" stroke-width="1.5" opacity="0.3"/>

  <!-- Scan Sweep -->
  <rect width="1200" height="180" y="240" fill="url(#scanGrad)"/>

  <!-- Elephant Graphic / Detection Silhouette -->
  <g transform="translate(480, 210)">
    <!-- Bounding Box -->
    <rect x="0" y="0" width="240" height="190" fill="#22c55e" fill-opacity="0.1" stroke="#22c55e" stroke-width="3" stroke-dasharray="16 8"/>
    <!-- Corner Markers -->
    <path d="M-6 24 L-6 -6 L24 -6" fill="none" stroke="#22c55e" stroke-width="4"/>
    <path d="M216 -6 L246 -6 L246 24" fill="none" stroke="#22c55e" stroke-width="4"/>
    <path d="M-6 166 L-6 196 L24 196" fill="none" stroke="#22c55e" stroke-width="4"/>
    <path d="M216 196 L246 196 L246 166" fill="none" stroke="#22c55e" stroke-width="4"/>

    <!-- Tag Label -->
    <rect x="0" y="-30" width="180" height="26" rx="4" fill="#22c55e"/>
    <text x="8" y="-12" font-family="monospace" font-size="12" font-weight="900" fill="#022c22">ELEPHANT [CONF: 98.4%]</text>

    <!-- Stylized Silhouette -->
    <ellipse cx="120" cy="95" rx="85" ry="60" fill="#047857"/>
    <ellipse cx="65" cy="80" rx="35" ry="45" fill="#047857"/>
    <path d="M50 110 Q40 160 30 180" stroke="#047857" stroke-width="18" stroke-linecap="round" fill="none"/>
    <rect x="60" y="140" width="20" height="45" rx="6" fill="#065f46"/>
    <rect x="150" y="140" width="20" height="45" rx="6" fill="#065f46"/>
  </g>

  <!-- Telemetry HUD Overlay -->
  <rect x="60" y="60" width="300" height="180" rx="12" fill="#022c22" fill-opacity="0.85" stroke="#10b981" stroke-width="2"/>
  <text x="80" y="95" font-family="monospace" font-size="14" font-weight="700" fill="#34d399">SECTOR 04 BOUNDARY</text>
  <text x="80" y="125" font-family="monospace" font-size="12" fill="#a7f3d0">Lat: 11.4032 N | Lon: 76.6958 E</text>
  <text x="80" y="150" font-family="monospace" font-size="12" fill="#a7f3d0">Detection Latency: 38ms (YOLOv8)</text>
  <text x="80" y="180" font-family="monospace" font-size="14" font-weight="900" fill="#f87171">STATUS: EARLY WARNING ACTIVE</text>

  <!-- Ranger Alert Pill -->
  <rect x="820" y="60" width="320" height="60" rx="30" fill="#ef4444" fill-opacity="0.9"/>
  <circle cx="850" cy="90" r="12" fill="#ffffff"/>
  <text x="874" y="96" font-family="-apple-system, sans-serif" font-size="14" font-weight="800" fill="#ffffff">ACOUSTIC DETERRENT SENT</text>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function createResumeForgeSvg(): string {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="purpleBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="675" rx="16" fill="url(#purpleBg)"/>

  <!-- Left Code/Markdown Editor Pane -->
  <rect x="50" y="50" width="500" height="575" rx="14" fill="#0f172a" stroke="#334155" stroke-width="2"/>
  <rect x="50" y="50" width="500" height="42" rx="14" fill="#1e293b"/>
  <circle cx="75" cy="71" r="6" fill="#ef4444"/>
  <circle cx="95" cy="71" r="6" fill="#f59e0b"/>
  <circle cx="115" cy="71" r="6" fill="#10b981"/>
  <text x="140" y="76" font-family="monospace" font-size="12" fill="#94a3b8">profile.md - RESUME FORGE ATS</text>

  <!-- Code text -->
  <text x="80" y="130" font-family="monospace" font-size="13" fill="#c084fc"># Nandhakumar M</text>
  <text x="80" y="160" font-family="monospace" font-size="12" fill="#38bdf8">role: Full-Stack Engineer &amp; AI Builder</text>
  <text x="80" y="190" font-family="monospace" font-size="12" fill="#94a3b8">skills: [React, Node.js, Python, Three.js]</text>
  <text x="80" y="230" font-family="monospace" font-size="13" fill="#c084fc">## Key Experience</text>
  <text x="80" y="260" font-family="monospace" font-size="12" fill="#e2e8f0">• Engineered SWAYAM 2.0 with real-time sockets</text>
  <text x="80" y="285" font-family="monospace" font-size="12" fill="#e2e8f0">• Deployed Edge YOLO AI for Wildlife Conflict</text>
  <text x="80" y="310" font-family="monospace" font-size="12" fill="#e2e8f0">• Built CLI scpholding enterprise MERN setups</text>

  <!-- Right Paper Preview Pane -->
  <rect x="600" y="50" width="550" height="575" rx="14" fill="#ffffff" filter="drop-shadow(0 12px 24px rgba(0,0,0,0.4))"/>

  <!-- Resume Header -->
  <rect x="600" y="50" width="550" height="90" rx="14" fill="#1e293b"/>
  <text x="640" y="95" font-family="-apple-system, sans-serif" font-size="24" font-weight="900" fill="#ffffff">NANDHAKUMAR M</text>
  <text x="640" y="120" font-family="-apple-system, sans-serif" font-size="13" font-weight="600" fill="#38bdf8">FULL STACK &amp; AI ENGINEER</text>

  <!-- ATS Badge Top Right -->
  <rect x="990" y="70" width="130" height="40" rx="20" fill="#10b981"/>
  <text x="1055" y="95" font-family="-apple-system, sans-serif" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle">ATS SCORE: 98%</text>

  <!-- Paper Document Structure Mockup -->
  <g transform="translate(640, 170)">
    <rect x="0" y="0" width="470" height="6" fill="#cbd5e1"/>
    <rect x="0" y="20" width="420" height="4" fill="#e2e8f0"/>
    <rect x="0" y="32" width="450" height="4" fill="#e2e8f0"/>

    <text x="0" y="70" font-family="-apple-system, sans-serif" font-size="14" font-weight="800" fill="#1e293b">EXPERIENCE</text>
    <rect x="0" y="85" width="470" height="2" fill="#94a3b8"/>
    <rect x="0" y="100" width="380" height="5" fill="#cbd5e1"/>
    <rect x="0" y="115" width="440" height="4" fill="#e2e8f0"/>
    <rect x="0" y="130" width="410" height="4" fill="#e2e8f0"/>

    <text x="0" y="170" font-family="-apple-system, sans-serif" font-size="14" font-weight="800" fill="#1e293b">PROJECTS</text>
    <rect x="0" y="185" width="470" height="2" fill="#94a3b8"/>
    <rect x="0" y="200" width="400" height="5" fill="#cbd5e1"/>
    <rect x="0" y="215" width="450" height="4" fill="#e2e8f0"/>
    <rect x="0" y="230" width="390" height="4" fill="#e2e8f0"/>
  </g>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function createMernCliSvg(): string {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="termBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="675" rx="16" fill="url(#termBg)"/>

  <!-- Terminal Window -->
  <rect x="60" y="50" width="1080" height="575" rx="14" fill="#050a14" stroke="#00f5ff" stroke-width="2"/>
  <rect x="60" y="50" width="1080" height="46" rx="14" fill="#0b1528"/>
  <circle cx="90" cy="73" r="7" fill="#ef4444"/>
  <circle cx="114" cy="73" r="7" fill="#f59e0b"/>
  <circle cx="138" cy="73" r="7" fill="#10b981"/>
  <text x="600" y="78" font-family="monospace" font-size="14" font-weight="700" fill="#38bdf8" text-anchor="middle">bash - nk-mern-cli --init my-production-app</text>

  <!-- Terminal Content -->
  <g transform="translate(100, 140)">
    <text x="0" y="0" font-family="monospace" font-size="18" font-weight="900" fill="#00f5ff">
  _   _ _  __  __  __ _____ ____  _   _    ____ _     ___ 
    </text>
    <text x="0" y="24" font-family="monospace" font-size="18" font-weight="900" fill="#00f5ff">
 | \\ | | |/ / |  \\/  | ____|  _ \\| \\ | |  / ___| |   |_ _|
    </text>
    <text x="0" y="48" font-family="monospace" font-size="18" font-weight="900" fill="#00f5ff">
 |  \\| | ' /  | |\\/| |  _| | |_) |  \\| | | |   | |    | | 
    </text>
    <text x="0" y="72" font-family="monospace" font-size="18" font-weight="900" fill="#00f5ff">
 | |\\  | . \\  | |  | | |___|  _ &lt;| |\\  | | |___| |___ | | 
    </text>
    <text x="0" y="96" font-family="monospace" font-size="18" font-weight="900" fill="#00f5ff">
 |_| \\_|_|\\_\\ |_|  |_|_____|_| \\_\\_| \\_|  \\____|_____|___|
    </text>

    <text x="0" y="140" font-family="monospace" font-size="15" fill="#94a3b8">v2.4.0 — Zero-Config Full-Stack Scaffolding Engine</text>

    <!-- Prompts -->
    <text x="0" y="185" font-family="monospace" font-size="15" fill="#22c55e">✔ Project name: <tspan fill="#ffffff">enterprise-crm-v1</tspan></text>
    <text x="0" y="215" font-family="monospace" font-size="15" fill="#22c55e">✔ Select Architecture: <tspan fill="#38bdf8">Production MERN (Vite 5 + Node/Express + TS)</tspan></text>
    <text x="0" y="245" font-family="monospace" font-size="15" fill="#22c55e">✔ Authentication Strategy: <tspan fill="#38bdf8">JWT + Refresh Token Cookie Middleware</tspan></text>
    <text x="0" y="275" font-family="monospace" font-size="15" fill="#22c55e">✔ Containerization: <tspan fill="#38bdf8">Multi-stage Dockerfile + docker-compose.yml</tspan></text>
    <text x="0" y="305" font-family="monospace" font-size="15" fill="#22c55e">✔ Styling framework: <tspan fill="#38bdf8">Tailwind CSS v4 + Motion animations</tspan></text>

    <!-- Progress bar -->
    <rect x="0" y="340" width="500" height="14" rx="7" fill="#1e293b"/>
    <rect x="0" y="340" width="500" height="14" rx="7" fill="#00f5ff"/>
    <text x="520" y="352" font-family="monospace" font-size="14" font-weight="700" fill="#00f5ff">100% DONE (1.2s)</text>

    <text x="0" y="395" font-family="monospace" font-size="15" font-weight="700" fill="#e2e8f0">&gt; cd enterprise-crm-v1 &amp;&amp; npm run dev</text>
  </g>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
