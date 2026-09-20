import * as THREE from 'three';

// Accurate geographical continent polygon coordinates (latitude, longitude)
// Equirectangular projection: lon (-180 to 180), lat (-90 to 90)
const CONTINENT_POLYGONS: [number, number][][] = [
  // North America
  [
    [70, -165], [72, -130], [68, -100], [58, -94], [62, -75], [52, -56],
    [45, -65], [42, -70], [30, -81], [25, -80], [28, -96], [20, -97],
    [16, -92], [14, -88], [9, -83], [8, -78], [14, -87], [16, -95],
    [23, -107], [32, -117], [38, -123], [48, -125], [58, -136], [60, -148],
    [65, -168], [70, -165]
  ],
  // Greenland
  [
    [78, -70], [83, -30], [80, -18], [70, -22], [60, -44], [65, -52], [76, -68]
  ],
  // South America
  [
    [11, -73], [8, -60], [4, -51], [-3, -40], [-8, -35], [-18, -39],
    [-23, -42], [-32, -51], [-39, -61], [-54, -68], [-52, -74], [-42, -74],
    [-33, -72], [-18, -71], [-5, -81], [5, -77], [11, -73]
  ],
  // Europe
  [
    [71, 28], [69, 15], [58, 6], [54, 9], [53, 5], [47, -2], [43, -9],
    [37, -9], [36, -3], [40, 0], [44, 4], [43, 10], [40, 18], [37, 22],
    [40, 27], [46, 31], [46, 37], [55, 38], [60, 30], [65, 32], [71, 28]
  ],
  // British Isles
  [
    [58, -5], [54, -1], [51, 1], [50, -5], [55, -5], [58, -5]
  ],
  // Africa
  [
    [36, -6], [37, 10], [32, 24], [31, 32], [28, 34], [22, 37], [12, 44],
    [11, 51], [2, 45], [-11, 40], [-26, 33], [-34, 26], [-34, 18], [-22, 14],
    [-10, 13], [4, 9], [5, 1], [4, -7], [11, -16], [21, -17], [32, -9], [36, -6]
  ],
  // Madagascar
  [
    [-12, 49], [-16, 50], [-25, 47], [-25, 44], [-16, 44], [-12, 49]
  ],
  // Eurasia / Asia & India
  [
    [77, 105], [72, 135], [68, 175], [60, 163], [58, 143], [44, 136],
    [38, 128], [32, 121], [23, 117], [21, 108], [11, 103], [8, 98],
    [15, 96], [22, 90], [21, 87], [14, 80], [8, 77], [13, 74], [20, 73],
    [24, 68], [25, 61], [27, 51], [30, 48], [37, 36], [41, 29], [47, 40],
    [50, 50], [55, 60], [60, 70], [65, 80], [70, 90], [75, 100], [77, 105]
  ],
  // Indian Subcontinent (detailed outline)
  [
    [25, 68], [24, 70], [21, 72], [19, 73], [15, 74], [10, 76], [8, 77],
    [8, 78], [10, 80], [13, 80], [16, 82], [19, 85], [21, 87], [22, 89],
    [25, 88], [27, 85], [29, 80], [31, 77], [32, 74], [28, 70], [25, 68]
  ],
  // Japan
  [
    [45, 142], [43, 145], [38, 141], [35, 140], [33, 131], [34, 136], [40, 140], [45, 142]
  ],
  // Southeast Asia & Indonesia
  [
    [5, 100], [1, 104], [-6, 106], [-8, 114], [-7, 116], [-3, 107], [2, 101], [5, 100]
  ],
  // Australia
  [
    [-11, 142], [-14, 136], [-12, 131], [-20, 119], [-22, 114], [-32, 115],
    [-35, 117], [-35, 136], [-38, 144], [-38, 148], [-33, 151], [-25, 153],
    [-19, 148], [-15, 145], [-11, 142]
  ],
  // New Zealand
  [
    [-35, 173], [-41, 175], [-46, 169], [-46, 167], [-41, 172], [-35, 173]
  ]
];

// Major global city coordinates for authentic night-light clusters
// High density in India, East Asia, Europe, North America
interface CityPoint {
  lat: number;
  lon: number;
  intensity: number; // 0 to 1
  size: number;      // pixel radius
  techHue?: string;  // cyan or golden
}

const GLOBAL_CITY_LIGHTS: CityPoint[] = [
  // --- INDIA & SOUTH ASIA (Primary Focus - Golden & Vibrant) ---
  { lat: 28.61, lon: 77.20, intensity: 1.0, size: 7.5, techHue: '#00f5ff' }, // Delhi NCR
  { lat: 19.07, lon: 72.87, intensity: 1.0, size: 7.0, techHue: '#38bdf8' }, // Mumbai
  { lat: 12.97, lon: 77.59, intensity: 1.0, size: 7.5, techHue: '#00f5ff' }, // Bengaluru (Tech Capital)
  { lat: 13.08, lon: 80.27, intensity: 0.95, size: 6.5 },                     // Chennai
  { lat: 17.38, lon: 78.48, intensity: 0.95, size: 6.5, techHue: '#00f5ff' }, // Hyderabad
  { lat: 22.57, lon: 88.36, intensity: 0.9, size: 6.0 },                      // Kolkata
  { lat: 18.52, lon: 73.85, intensity: 0.85, size: 5.5 },                     // Pune
  { lat: 23.02, lon: 72.57, intensity: 0.85, size: 5.5 },                     // Ahmedabad
  { lat: 26.91, lon: 75.78, intensity: 0.75, size: 4.5 },                     // Jaipur
  { lat: 26.84, lon: 80.94, intensity: 0.8, size: 5.0 },                      // Lucknow
  { lat: 9.93, lon: 76.26, intensity: 0.75, size: 4.5 },                      // Kochi
  { lat: 11.01, lon: 76.95, intensity: 0.7, size: 4.0 },                      // Coimbatore
  { lat: 21.17, lon: 72.83, intensity: 0.7, size: 4.0 },                      // Surat
  { lat: 24.86, lon: 67.00, intensity: 0.8, size: 5.0 },                      // Karachi
  { lat: 31.52, lon: 74.35, intensity: 0.8, size: 5.0 },                      // Lahore
  { lat: 23.81, lon: 90.41, intensity: 0.85, size: 5.5 },                     // Dhaka
  { lat: 6.92, lon: 79.86, intensity: 0.7, size: 4.0 },                       // Colombo

  // Secondary Indian Peninsula Cluster points
  { lat: 20.29, lon: 85.82, intensity: 0.6, size: 3.5 }, // Bhubaneswar
  { lat: 25.59, lon: 85.13, intensity: 0.65, size: 3.5 }, // Patna
  { lat: 22.71, lon: 75.85, intensity: 0.65, size: 3.5 }, // Indore
  { lat: 15.31, lon: 75.71, intensity: 0.55, size: 3.0 }, // Hubli-Dharwad
  { lat: 17.68, lon: 83.21, intensity: 0.6, size: 3.5 }, // Vizag
  { lat: 12.29, lon: 76.63, intensity: 0.55, size: 3.0 }, // Mysore
  { lat: 8.52, lon: 76.93, intensity: 0.55, size: 3.0 }, // Thiruvananthapuram

  // --- EAST & SOUTHEAST ASIA ---
  { lat: 35.67, lon: 139.65, intensity: 1.0, size: 7.5, techHue: '#00f5ff' }, // Tokyo
  { lat: 34.69, lon: 135.50, intensity: 0.9, size: 6.0 },                     // Osaka
  { lat: 31.23, lon: 121.47, intensity: 1.0, size: 7.5, techHue: '#38bdf8' }, // Shanghai
  { lat: 39.90, lon: 116.40, intensity: 0.95, size: 6.5 },                    // Beijing
  { lat: 22.31, lon: 114.16, intensity: 0.95, size: 6.5, techHue: '#00f5ff' }, // Hong Kong
  { lat: 23.12, lon: 113.26, intensity: 0.9, size: 6.0 },                     // Guangzhou / Shenzhen
  { lat: 37.56, lon: 126.97, intensity: 0.95, size: 6.5, techHue: '#00f5ff' }, // Seoul
  { lat: 25.03, lon: 121.56, intensity: 0.85, size: 5.5, techHue: '#00f5ff' }, // Taipei
  { lat: 1.35, lon: 103.81, intensity: 1.0, size: 6.5, techHue: '#00f5ff' },  // Singapore
  { lat: 13.75, lon: 100.50, intensity: 0.85, size: 5.5 },                    // Bangkok
  { lat: -6.20, lon: 106.84, intensity: 0.9, size: 6.0 },                     // Jakarta
  { lat: 3.13, lon: 101.68, intensity: 0.8, size: 5.0 },                      // Kuala Lumpur
  { lat: 14.59, lon: 120.98, intensity: 0.8, size: 5.0 },                     // Manila

  // --- EUROPE ---
  { lat: 51.50, lon: -0.12, intensity: 1.0, size: 7.0, techHue: '#00f5ff' },  // London
  { lat: 48.85, lon: 2.35, intensity: 0.95, size: 6.5 },                      // Paris
  { lat: 52.52, lon: 13.40, intensity: 0.85, size: 5.5, techHue: '#00f5ff' }, // Berlin
  { lat: 50.11, lon: 8.68, intensity: 0.85, size: 5.5 },                      // Frankfurt / Rhine
  { lat: 45.46, lon: 9.19, intensity: 0.8, size: 5.0 },                       // Milan
  { lat: 40.41, lon: -3.70, intensity: 0.8, size: 5.0 },                      // Madrid
  { lat: 41.38, lon: 2.17, intensity: 0.75, size: 4.5 },                      // Barcelona
  { lat: 52.36, lon: 4.90, intensity: 0.85, size: 5.5 },                      // Amsterdam
  { lat: 55.75, lon: 37.61, intensity: 0.9, size: 6.0 },                      // Moscow
  { lat: 59.32, lon: 18.06, intensity: 0.7, size: 4.5 },                      // Stockholm

  // --- MIDDLE EAST ---
  { lat: 25.20, lon: 55.27, intensity: 1.0, size: 7.0, techHue: '#00f5ff' },  // Dubai
  { lat: 24.45, lon: 54.37, intensity: 0.8, size: 5.0 },                      // Abu Dhabi
  { lat: 24.71, lon: 46.67, intensity: 0.8, size: 5.0 },                      // Riyadh
  { lat: 21.48, lon: 39.19, intensity: 0.75, size: 4.5 },                     // Jeddah
  { lat: 30.04, lon: 31.23, intensity: 0.9, size: 6.0 },                      // Cairo / Nile Delta
  { lat: 32.08, lon: 34.78, intensity: 0.8, size: 5.0 },                      // Tel Aviv

  // --- NORTH AMERICA ---
  { lat: 40.71, lon: -74.00, intensity: 1.0, size: 7.5, techHue: '#00f5ff' }, // New York
  { lat: 37.77, lon: -122.41, intensity: 1.0, size: 7.0, techHue: '#00f5ff' }, // San Francisco
  { lat: 34.05, lon: -118.24, intensity: 0.95, size: 6.5 },                    // Los Angeles
  { lat: 41.87, lon: -87.62, intensity: 0.9, size: 6.0 },                     // Chicago
  { lat: 47.60, lon: -122.33, intensity: 0.85, size: 5.5, techHue: '#00f5ff' }, // Seattle
  { lat: 30.26, lon: -97.74, intensity: 0.85, size: 5.5, techHue: '#00f5ff' }, // Austin
  { lat: 29.76, lon: -95.36, intensity: 0.85, size: 5.5 },                    // Houston
  { lat: 33.74, lon: -84.38, intensity: 0.85, size: 5.5 },                    // Atlanta
  { lat: 25.76, lon: -80.19, intensity: 0.8, size: 5.0 },                     // Miami
  { lat: 43.65, lon: -79.38, intensity: 0.85, size: 5.5 },                    // Toronto
  { lat: 49.28, lon: -123.12, intensity: 0.8, size: 5.0 },                    // Vancouver
  { lat: 19.43, lon: -99.13, intensity: 0.9, size: 6.0 },                     // Mexico City

  // --- SOUTH AMERICA ---
  { lat: -23.55, lon: -46.63, intensity: 0.95, size: 6.5 },                    // São Paulo
  { lat: -22.90, lon: -43.17, intensity: 0.85, size: 5.5 },                    // Rio de Janeiro
  { lat: -34.60, lon: -58.38, intensity: 0.85, size: 5.5 },                    // Buenos Aires
  { lat: -33.44, lon: -70.66, intensity: 0.75, size: 4.5 },                    // Santiago
  { lat: 4.71, lon: -74.07, intensity: 0.75, size: 4.5 },                     // Bogotá

  // --- AUSTRALIA & OCEANIA ---
  { lat: -33.86, lon: 151.20, intensity: 0.9, size: 6.0, techHue: '#00f5ff' }, // Sydney
  { lat: -37.81, lon: 144.96, intensity: 0.85, size: 5.5 },                    // Melbourne
  { lat: -27.46, lon: 153.02, intensity: 0.75, size: 4.5 },                    // Brisbane
  { lat: -31.95, lon: 115.86, intensity: 0.7, size: 4.0 },                     // Perth
  { lat: -36.84, lon: 174.76, intensity: 0.7, size: 4.0 },                     // Auckland

  // --- AFRICA ---
  { lat: -26.20, lon: 28.04, intensity: 0.8, size: 5.0 },                     // Johannesburg
  { lat: -33.92, lon: 18.42, intensity: 0.75, size: 4.5 },                    // Cape Town
  { lat: 6.52, lon: 3.37, intensity: 0.8, size: 5.0 },                       // Lagos
  { lat: -1.29, lon: 36.82, intensity: 0.7, size: 4.0 },                      // Nairobi
  { lat: 33.57, lon: -7.58, intensity: 0.7, size: 4.0 },                      // Casablanca
];

/**
 * Procedural Earth Texture Generator
 * Generates an equirectangular texture with deep navy oceans, realistic continental landmasses,
 * latitude/longitude coordinate grid, and glowing golden/cyan nocturnal city light clusters.
 */
let cachedEarthTextures: {
  mobile?: { diffuseMap: THREE.CanvasTexture; emissiveMap: THREE.CanvasTexture };
  desktop?: { diffuseMap: THREE.CanvasTexture; emissiveMap: THREE.CanvasTexture };
} = {};

export function generateEarthTextures(isMobile = false): {
  diffuseMap: THREE.CanvasTexture;
  emissiveMap: THREE.CanvasTexture;
} {
  const key = isMobile ? 'mobile' : 'desktop';
  if (cachedEarthTextures[key]) {
    return cachedEarthTextures[key]!;
  }

  const width = isMobile ? 1024 : 1536;
  const height = isMobile ? 512 : 768;

  // 1. Diffuse & Base Map
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // 2. Emissive Map (night city lights & cyber grid nodes)
  const eCanvas = document.createElement('canvas');
  eCanvas.width = width;
  eCanvas.height = height;
  const eCtx = eCanvas.getContext('2d');

  if (!ctx || !eCtx) {
    const dummy = new THREE.CanvasTexture(canvas);
    return { diffuseMap: dummy, emissiveMap: dummy };
  }

  // --- Ocean Background ---
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#010812');
  oceanGrad.addColorStop(0.3, '#02121F');
  oceanGrad.addColorStop(0.5, '#041C2E');
  oceanGrad.addColorStop(0.7, '#02121F');
  oceanGrad.addColorStop(1, '#010812');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Emissive canvas starts pitch black
  eCtx.fillStyle = '#000000';
  eCtx.fillRect(0, 0, width, height);

  // Helper to map lat/lon to canvas coordinates
  const coordToXY = (lat: number, lon: number): [number, number] => {
    const x = ((lon + 180) / 360) * width;
    const y = ((90 - lat) / 180) * height;
    return [x, y];
  };

  // --- Draw Continental Landmasses ---
  ctx.fillStyle = '#062038';
  ctx.strokeStyle = '#0066FF';
  ctx.lineWidth = width > 1024 ? 1.5 : 1;

  CONTINENT_POLYGONS.forEach((poly) => {
    if (poly.length < 3) return;
    ctx.beginPath();
    const [startX, startY] = coordToXY(poly[0][0], poly[0][1]);
    ctx.moveTo(startX, startY);

    for (let i = 1; i < poly.length; i++) {
      const [px, py] = coordToXY(poly[i][0], poly[i][1]);
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  // --- Subtle Cyber Geographic Network Lines (Lat/Long Grid) ---
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.12)';
  ctx.lineWidth = 1;

  // Latitudes
  for (let lat = -60; lat <= 60; lat += 30) {
    const [, y] = coordToXY(lat, 0);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  // Longitudes
  for (let lon = -150; lon <= 180; lon += 30) {
    const [x] = coordToXY(0, lon);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // --- Draw Glowing Technology City Lights on Both Maps ---
  // Palette Distribution: 70% Electric Cyan (#00E5FF), 20% Bright Blue (#168BFF), 10% Subtle Violet (#7C5CFF)
  GLOBAL_CITY_LIGHTS.forEach((city, idx) => {
    const [cx, cy] = coordToXY(city.lat, city.lon);
    const radius = city.size * (width / 1024);

    // Color selection matching exact technology palette distribution
    let techHue = '#00E5FF';
    let techRgb = '0, 229, 255';
    if (city.techHue) {
      techHue = city.techHue;
      techRgb = city.techHue === '#38bdf8' ? '22, 139, 255' : '0, 229, 255';
    } else {
      const mod = idx % 10;
      if (mod === 9) {
        techHue = '#7C5CFF'; // 10% Subtle Violet
        techRgb = '124, 92, 255';
      } else if (mod >= 7) {
        techHue = '#168BFF'; // 20% Bright Blue
        techRgb = '22, 139, 255';
      } else {
        techHue = '#00E5FF'; // 70% Electric Cyan
        techRgb = '0, 229, 255';
      }
    }

    // 1. Draw to Emissive Canvas (Glowing Bloom without large white areas)
    const eGrad = eCtx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.2);
    eGrad.addColorStop(0, '#e0f7fc'); // Subtle soft center highlight
    eGrad.addColorStop(0.35, techHue);
    eGrad.addColorStop(1, `rgba(${techRgb}, 0)`);

    eCtx.fillStyle = eGrad;
    eCtx.beginPath();
    eCtx.arc(cx, cy, radius * 2.2, 0, Math.PI * 2);
    eCtx.fill();

    // 2. Draw to Base Diffuse Canvas
    const dGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.5);
    dGrad.addColorStop(0, '#ffffff');
    dGrad.addColorStop(0.4, techHue);
    dGrad.addColorStop(1, `rgba(${techRgb}, 0)`);
    ctx.fillStyle = dGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Secondary scatter dots around large tech hubs
    if (city.intensity >= 0.85) {
      const scatterCount = 8;
      for (let s = 0; s < scatterCount; s++) {
        const angle = (s / scatterCount) * Math.PI * 2;
        const dist = (radius * 1.2 + Math.random() * radius * 1.8);
        const sx = cx + Math.cos(angle) * dist;
        const sy = cy + Math.sin(angle) * dist;

        eCtx.fillStyle = `rgba(${techRgb}, 0.75)`;
        eCtx.beginPath();
        eCtx.arc(sx, sy, 1.2, 0, Math.PI * 2);
        eCtx.fill();

        ctx.fillStyle = `rgba(${techRgb}, 0.6)`;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });

  // Convert to Three.js CanvasTextures
  const diffuseMap = new THREE.CanvasTexture(canvas);
  diffuseMap.wrapS = THREE.RepeatWrapping;
  diffuseMap.wrapT = THREE.ClampToEdgeWrapping;
  diffuseMap.needsUpdate = true;

  const emissiveMap = new THREE.CanvasTexture(eCanvas);
  emissiveMap.wrapS = THREE.RepeatWrapping;
  emissiveMap.wrapT = THREE.ClampToEdgeWrapping;
  emissiveMap.needsUpdate = true;

  const result = { diffuseMap, emissiveMap };
  cachedEarthTextures[key] = result;
  return result;
}

/**
 * Converts Latitude and Longitude to 3D Cartesian Vector
 */
export function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}
