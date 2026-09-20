import * as THREE from 'three';
import { ProjectItem } from '../../../data/projectsData';

// Cache generated textures so canvas drawing runs only once per project
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Procedurally generates a crisp, authentic, high-resolution project screenshot
 * matching each real project's design and features.
 */
export function getProjectScreenTexture(project: ProjectItem): THREE.CanvasTexture {
  if (textureCache.has(project.id)) {
    return textureCache.get(project.id)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallbackTex = new THREE.CanvasTexture(canvas);
    return fallbackTex;
  }

  // Render specific authentic screens based on project.id
  switch (project.id) {
    case 'swayam-2':
      renderSwayamScreen(ctx);
      break;
    case 'speed-taxi':
      renderSpeedTaxiScreen(ctx);
      break;
    case 'wildlife-ai':
      renderWildlifeScreen(ctx);
      break;
    case 'resume-forge':
      renderResumeForgeScreen(ctx);
      break;
    case 'nk-mern-cli':
      renderMernCliScreen(ctx);
      break;
    default:
      renderSwayamScreen(ctx);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;

  textureCache.set(project.id, texture);
  return texture;
}

// 1. SWAYAM 2.0: Authentic Digital Campus Platform Screen
function renderSwayamScreen(ctx: CanvasRenderingContext2D) {
  // Background
  ctx.fillStyle = '#0a1222';
  ctx.fillRect(0, 0, 1280, 800);

  // Top Nav Bar
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 1280, 76);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 75, 1280, 1);

  // Logo & Brand
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.arc(52, 38, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Inter, sans-serif';
  ctx.fillText('SWAYAM', 84, 46);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('2.0', 204, 46);

  // Nav Items
  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 15px Inter, sans-serif';
  ctx.fillText('All Courses', 310, 44);
  ctx.fillText('Live Sessions', 440, 44);
  ctx.fillText('Assignments', 580, 44);
  ctx.fillText('Student Portal', 720, 44);

  // Top Right Profile & Notification
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.roundRect(1080, 18, 150, 40, 20);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px Inter, sans-serif';
  ctx.fillText('Enter Campus', 1105, 43);

  // Hero Card Banner
  ctx.fillStyle = '#0f223d';
  ctx.beginPath();
  ctx.roundRect(50, 106, 1180, 260, 20);
  ctx.fill();
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Tag badge
  ctx.fillStyle = 'rgba(2, 132, 199, 0.25)';
  ctx.beginPath();
  ctx.roundRect(84, 136, 260, 28, 14);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 12px monospace';
  ctx.fillText('FULL STACK EDUCATION PLATFORM', 96, 155);

  // Heading
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 38px Inter, sans-serif';
  ctx.fillText('Learn Without Limits.', 84, 215);

  // Subtitle
  ctx.fillStyle = '#94a3b8';
  ctx.font = '16px Inter, sans-serif';
  ctx.fillText('Reverse-engineered with automated assignment reminders & real-time WebSocket communication.', 84, 255);

  // CTA button inside screen
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.roundRect(84, 285, 170, 46, 23);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px Inter, sans-serif';
  ctx.fillText('Explore Courses', 106, 314);

  // Right illustration / graphic banner
  ctx.fillStyle = '#023859';
  ctx.beginPath();
  ctx.roundRect(870, 126, 330, 220, 16);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 18px Inter, sans-serif';
  ctx.fillText('Real-Time Classroom', 900, 175);
  ctx.fillStyle = '#64748b';
  ctx.font = '14px Inter, sans-serif';
  ctx.fillText('• 1,420 Active Students', 900, 215);
  ctx.fillText('• 28 Live Broadcasts', 900, 245);
  ctx.fillText('• Automated Deadlines', 900, 275);

  // Course Grid Cards (3 modules)
  for (let i = 0; i < 3; i++) {
    const x = 50 + i * 406;
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(x, 396, 370, 360, 16);
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Module image block
    const cardGrad = ctx.createLinearGradient(x, 396, x + 370, 560);
    if (i === 0) {
      cardGrad.addColorStop(0, '#0369a1');
      cardGrad.addColorStop(1, '#0c4a6e');
    } else if (i === 1) {
      cardGrad.addColorStop(0, '#4338ca');
      cardGrad.addColorStop(1, '#1e1b4b');
    } else {
      cardGrad.addColorStop(0, '#0f766e');
      cardGrad.addColorStop(1, '#042f2e');
    }
    ctx.fillStyle = cardGrad;
    ctx.beginPath();
    ctx.roundRect(x, 396, 370, 160, [16, 16, 0, 0]);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Inter, sans-serif';
    const titles = ['Full-Stack MERN Architecture', 'Distributed Systems & WebSockets', 'Automated DevOps & NodeMailer'];
    ctx.fillText(titles[i], x + 24, 600);

    ctx.fillStyle = '#64748b';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText('12 Modules • Interactive Labs • Verified Certificate', x + 24, 635);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText('Enroll Now →', x + 24, 715);
  }
}

// 2. SPEED TAXI: Real-Time Urban Dispatch & Transit Screen
function renderSpeedTaxiScreen(ctx: CanvasRenderingContext2D) {
  // Background map theme
  ctx.fillStyle = '#08111e';
  ctx.fillRect(0, 0, 1280, 800);

  // Road grid lines (GPS vector map simulation)
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 4;
  for (let y = 80; y < 800; y += 90) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1280, y);
    ctx.stroke();
  }
  for (let x = 60; x < 1280; x += 110) {
    ctx.beginPath();
    ctx.moveTo(x, 80);
    ctx.lineTo(x, 800);
    ctx.stroke();
  }

  // Active glowing route polyline
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 7;
  ctx.shadowColor = '#00f5ff';
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.moveTo(180, 520);
  ctx.lineTo(380, 520);
  ctx.lineTo(380, 310);
  ctx.lineTo(720, 310);
  ctx.lineTo(720, 210);
  ctx.lineTo(980, 210);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Destination waypoints
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(180, 520, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(980, 210, 16, 0, Math.PI * 2);
  ctx.fill();

  // Top Nav Bar
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 1280, 76);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 24px Inter, sans-serif';
  ctx.fillText('SPEED TAXI', 60, 46);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px monospace';
  ctx.fillText('// URBAN FLEET DISPATCH ENGINE', 230, 46);

  // Floating Booking & Telemetry Card
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.roundRect(60, 110, 440, 580, 20);
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px Inter, sans-serif';
  ctx.fillText('Live Dispatch Request', 90, 165);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px Inter, sans-serif';
  ctx.fillText('Driver en route to your coordinates', 90, 195);

  // Pickup location box
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(90, 230, 380, 70, 12);
  ctx.fill();
  ctx.fillStyle = '#22c55e';
  ctx.font = 'bold 13px monospace';
  ctx.fillText('● PICKUP LOCATION', 110, 255);
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 16px Inter, sans-serif';
  ctx.fillText('Central Tech Hub, Station West', 110, 282);

  // Dropoff location box
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(90, 315, 380, 70, 12);
  ctx.fill();
  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 13px monospace';
  ctx.fillText('● DESTINATION', 110, 340);
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 16px Inter, sans-serif';
  ctx.fillText('International Airport Terminal 3', 110, 367);

  // Fare calculation summary
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.roundRect(90, 410, 380, 120, 14);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '14px Inter, sans-serif';
  ctx.fillText('Dynamic Fare Estimation', 115, 442);
  ctx.font = 'bold 36px Inter, sans-serif';
  ctx.fillText('$24.50', 115, 488);
  ctx.font = '13px monospace';
  ctx.fillText('• 12.4 km • ETA 14 mins • Stripe Verified', 115, 514);

  // Confirm button
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.roundRect(90, 560, 380, 52, 26);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 17px Inter, sans-serif';
  ctx.fillText('Confirm Ride Dispatch', 180, 593);
}

// 3. AI WILDLIFE CONFLICT SHIELD: Edge Radar & Vision Detection Screen
function renderWildlifeScreen(ctx: CanvasRenderingContext2D) {
  // Deep Radar Background
  ctx.fillStyle = '#04130c';
  ctx.fillRect(0, 0, 1280, 800);

  // Radar Grid Circles
  ctx.strokeStyle = 'rgba(34, 197, 94, 0.2)';
  ctx.lineWidth = 1.5;
  for (let r = 80; r < 400; r += 70) {
    ctx.beginPath();
    ctx.arc(640, 440, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Crosshairs
  ctx.beginPath();
  ctx.moveTo(640, 80);
  ctx.lineTo(640, 800);
  ctx.moveTo(200, 440);
  ctx.lineTo(1080, 440);
  ctx.stroke();

  // Top Nav
  ctx.fillStyle = '#061d11';
  ctx.fillRect(0, 0, 1280, 76);
  ctx.fillStyle = '#22c55e';
  ctx.font = 'bold 24px Inter, sans-serif';
  ctx.fillText('AI WILDLIFE CONFLICT SHIELD', 60, 46);
  ctx.fillStyle = '#86efac';
  ctx.font = '14px monospace';
  ctx.fillText('// EDGE TELEMETRY & COMPUTER VISION', 460, 46);

  // Computer Vision Target Bounding Box
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 3;
  ctx.strokeRect(520, 280, 260, 220);

  // Corner brackets
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(520, 320);
  ctx.lineTo(520, 280);
  ctx.lineTo(560, 280);
  ctx.moveTo(740, 280);
  ctx.lineTo(780, 280);
  ctx.lineTo(780, 320);
  ctx.moveTo(520, 460);
  ctx.lineTo(520, 500);
  ctx.lineTo(560, 500);
  ctx.moveTo(740, 500);
  ctx.lineTo(780, 500);
  ctx.lineTo(780, 460);
  ctx.stroke();

  // Detection Label
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(520, 245, 260, 32);
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 15px monospace';
  ctx.fillText('TARGET: ELEPHAS MAXIMUS', 530, 267);

  // Telemetry HUD Panels (Left & Right)
  ctx.fillStyle = '#0a2315';
  ctx.beginPath();
  ctx.roundRect(60, 120, 360, 580, 16);
  ctx.fill();
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px Inter, sans-serif';
  ctx.fillText('Inference Telemetry', 90, 170);

  const stats = [
    ['Edge Model', 'YOLOv8 Real-Time'],
    ['Inference Latency', '38.2 ms'],
    ['Detection Accuracy', '98.6%'],
    ['Camera Node', 'Boundary Zone 4B'],
    ['Deterrent Trigger', 'Ultrasonic Acoustic'],
    ['SMS/Telegram Broadcast', 'Ranger Alert Active'],
  ];

  stats.forEach(([k, v], i) => {
    ctx.fillStyle = '#86efac';
    ctx.font = '13px monospace';
    ctx.fillText(k, 90, 225 + i * 65);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.fillText(v, 90, 250 + i * 65);
  });
}

// 4. RESUME FORGE: ATS Studio & Live PDF Rendering Screen
function renderResumeForgeScreen(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#0b0c16';
  ctx.fillRect(0, 0, 1280, 800);

  // Top Nav
  ctx.fillStyle = '#14142b';
  ctx.fillRect(0, 0, 1280, 76);
  ctx.fillStyle = '#c084fc';
  ctx.font = 'bold 24px Inter, sans-serif';
  ctx.fillText('RESUME FORGE', 60, 46);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px monospace';
  ctx.fillText('// ATS RESUME STUDIO & PDF COMPILER', 280, 46);

  // Left Editor Workspace
  ctx.fillStyle = '#111226';
  ctx.beginPath();
  ctx.roundRect(60, 110, 480, 640, 16);
  ctx.fill();
  ctx.strokeStyle = '#3b4261';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 20px Inter, sans-serif';
  ctx.fillText('Interactive Document Editor', 90, 160);

  // ATS Score Gauge
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.roundRect(90, 190, 420, 70, 12);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 14px monospace';
  ctx.fillText('ATS OPTIMIZATION SCORE: 94% EXCELLENT', 115, 218);
  ctx.font = '13px sans-serif';
  ctx.fillText('High recruiter keyword match for Full-Stack Developer roles', 115, 242);

  // Markdown Form Fields
  for (let i = 0; i < 4; i++) {
    const y = 285 + i * 95;
    ctx.fillStyle = '#1c1d38';
    ctx.beginPath();
    ctx.roundRect(90, y, 420, 75, 10);
    ctx.fill();

    const labels = ['Experience: Senior Full-Stack Engineer', 'Skills: React, Node, TypeScript, Docker', 'Education: B.Tech Computer Science', 'Projects: Production Cloud Architecture'];
    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(`SECTION 0${i + 1}`, 110, y + 26);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '15px Inter, sans-serif';
    ctx.fillText(labels[i], 110, y + 54);
  }

  // Right High-Res Paper Document Preview
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(580, 110, 640, 640, 8);
  ctx.fill();
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 24;

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 28px Inter, sans-serif';
  ctx.fillText('NANDHAKUMAR K', 620, 165);
  ctx.fillStyle = '#0284c7';
  ctx.font = 'bold 15px Inter, sans-serif';
  ctx.fillText('FULL-STACK ARCHITECT & MERN SPECIALIST', 620, 195);
  ctx.fillStyle = '#64748b';
  ctx.font = '12px Inter, sans-serif';
  ctx.fillText('Salem, Tamil Nadu, India • portfolio.dev • github.com/nandhakumar', 620, 220);

  // Resume Divider line
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(620, 235, 560, 2);

  // Document lines preview
  for (let l = 0; l < 10; l++) {
    ctx.fillStyle = '#334155';
    ctx.fillRect(620, 260 + l * 42, 340 + (l % 3) * 80, 10);
  }
}

// 5. NK MERN CLI: Developer Terminal Scaffolder Screen
function renderMernCliScreen(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#05070e';
  ctx.fillRect(0, 0, 1280, 800);

  // Terminal Window Frame
  ctx.fillStyle = '#0d111d';
  ctx.beginPath();
  ctx.roundRect(80, 60, 1120, 680, 16);
  ctx.fill();
  ctx.strokeStyle = '#00f5ff';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Terminal Window Header Bar
  ctx.fillStyle = '#161d2f';
  ctx.beginPath();
  ctx.roundRect(80, 60, 1120, 48, [16, 16, 0, 0]);
  ctx.fill();

  // Traffic light buttons
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(114, 84, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.arc(136, 84, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(158, 84, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px monospace';
  ctx.fillText('bash - nk-mern-cli@1.4.2: ~ npm i -g nk-mern-cli', 200, 89);

  // Terminal Console Text
  ctx.fillStyle = '#00f5ff';
  ctx.font = 'bold 22px monospace';
  ctx.fillText('$ npx nk-mern-cli init fullstack-production-app', 120, 165);

  const lines = [
    ['? Choose Client Framework:', 'React 18 + Vite + TypeScript [Selected]'],
    ['? Select Server Middleware:', 'Express + CORS + Helmet + Rate Limit'],
    ['? Configure Database:', 'MongoDB Atlas + Mongoose Schema Models'],
    ['? Security & Auth Layer:', 'JWT + Refresh Token Cookie Rotation'],
    ['? Containerization:', 'Docker Multi-Stage & docker-compose.yml'],
    ['✔ Generating project structure...', '42 files written in 1.2s'],
    ['✔ Installing dependencies...', 'npm install completed (0 vulnerabilities)'],
    ['✔ Done!', 'Your enterprise MERN app is ready: cd fullstack-production-app && npm run dev'],
  ];

  lines.forEach(([q, a], i) => {
    ctx.fillStyle = i >= 5 ? '#22c55e' : '#38bdf8';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(q, 120, 220 + i * 50);

    ctx.fillStyle = '#ffffff';
    ctx.font = '16px monospace';
    ctx.fillText(a, 120 + ctx.measureText(q).width + 16, 220 + i * 50);
  });
}
