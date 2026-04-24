const fs = require('fs');
const path = require('path');

// Create SVG content for the hero image
const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f3460;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#e74c3c;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3498db;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1600" height="900" fill="url(#bgGradient)"/>
  
  <!-- Left accent bar -->
  <rect x="0" y="0" width="250" height="900" fill="#dc3545" opacity="0.15"/>
  
  <!-- Right accent bar -->
  <rect x="1350" y="0" width="250" height="900" fill="#0096ff" opacity="0.15"/>
  
  <!-- Decorative circles (voting theme) -->
  <circle cx="1250" cy="450" r="220" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.3"/>
  <circle cx="1250" cy="450" r="160" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.2"/>
  <circle cx="1250" cy="450" r="100" fill="none" stroke="#4ade80" stroke-width="3" opacity="0.8"/>
  
  <!-- Checkmark symbol (voting) -->
  <g stroke="#4ade80" stroke-width="12" stroke-linecap="round" fill="none">
    <polyline points="1170,450 1220,510 1330,380"/>
  </g>
  
  <!-- Main title -->
  <text x="100" y="200" font-family="Arial, sans-serif" font-size="140" font-weight="bold" fill="#ffffff" letter-spacing="2">
    ELECTION
  </text>
  <text x="100" y="310" font-family="Arial, sans-serif" font-size="140" font-weight="bold" fill="#ffffff" letter-spacing="2">
    RESULTS
  </text>
  
  <!-- Subtitle -->
  <text x="100" y="420" font-family="Arial, sans-serif" font-size="60" fill="#e0e0e0" font-weight="500">
    Kongu Region 2026
  </text>
  
  <!-- Date -->
  <text x="100" y="510" font-family="Arial, sans-serif" font-size="50" fill="#64b5f6" font-weight="bold">
    April 25, 2026
  </text>
  
  <!-- Decorative line -->
  <line x1="100" y1="550" x2="600" y2="550" stroke="#4ade80" stroke-width="4" opacity="0.7"/>
  
  <!-- Tagline -->
  <text x="100" y="670" font-family="Arial, sans-serif" font-size="45" fill="#b0bec5" font-weight="400">
    Live Updates • 8 Districts • Real-time Coverage
  </text>
  
  <!-- Badge -->
  <rect x="100" y="740" width="280" height="80" rx="10" fill="none" stroke="#4ade80" stroke-width="2" opacity="0.8"/>
  <text x="140" y="797" font-family="Arial, sans-serif" font-size="40" fill="#4ade80" font-weight="bold">
    BREAKING NEWS
  </text>
</svg>`;

// Save as SVG first
const svgPath = path.join(__dirname, 'public', 'news', 'vote.svg');
fs.writeFileSync(svgPath, svgContent);
console.log('SVG created successfully at:', svgPath);

// Try to convert SVG to PNG using a data URL approach
// For now, save the SVG and we'll use that
const pngPath = path.join(__dirname, 'public', 'news', 'vote.png');

// Create a simple PNG using canvas if available, otherwise just use SVG
try {
  const { createCanvas } = require('canvas');
  const canvas = createCanvas(1600, 900);
  const ctx = canvas.getContext('2d');
  
  // Draw gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, 900);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(1, '#0f3460');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1600, 900);
  
  // Draw accents
  ctx.fillStyle = 'rgba(220, 53, 69, 0.15)';
  ctx.fillRect(0, 0, 250, 900);
  ctx.fillStyle = 'rgba(0, 150, 255, 0.15)';
  ctx.fillRect(1350, 0, 250, 900);
  
  // Draw circles
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(1250, 450, 220, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(1250, 450, 160, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.strokeStyle = 'rgba(74, 222, 128, 0.8)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(1250, 450, 100, 0, Math.PI * 2);
  ctx.stroke();
  
  // Draw checkmark
  ctx.strokeStyle = '#4ade80';
  ctx.lineWidth = 12;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(1170, 450);
  ctx.lineTo(1220, 510);
  ctx.lineTo(1330, 380);
  ctx.stroke();
  
  // Draw text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 140px Arial';
  ctx.letterSpacing = '2px';
  ctx.fillText('ELECTION', 100, 200);
  ctx.fillText('RESULTS', 100, 310);
  
  ctx.fillStyle = '#e0e0e0';
  ctx.font = '500 60px Arial';
  ctx.fillText('Kongu Region 2026', 100, 420);
  
  ctx.fillStyle = '#64b5f6';
  ctx.font = 'bold 50px Arial';
  ctx.fillText('April 25, 2026', 100, 510);
  
  // Line
  ctx.strokeStyle = '#4ade80';
  ctx.lineWidth = 4;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.moveTo(100, 550);
  ctx.lineTo(600, 550);
  ctx.stroke();
  ctx.globalAlpha = 1;
  
  // Tagline
  ctx.fillStyle = '#b0bec5';
  ctx.font = '400 45px Arial';
  ctx.fillText('Live Updates • 8 Districts • Real-time Coverage', 100, 670);
  
  // Badge
  ctx.strokeStyle = '#4ade80';
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.8;
  ctx.strokeRect(100, 740, 280, 80);
  ctx.globalAlpha = 1;
  
  ctx.fillStyle = '#4ade80';
  ctx.font = 'bold 40px Arial';
  ctx.fillText('BREAKING NEWS', 140, 797);
  
  // Save to PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(pngPath, buffer);
  console.log('PNG image created successfully at:', pngPath);
} catch (err) {
  console.log('Canvas not available, saved as SVG instead');
  console.log('You can convert the SVG to PNG manually or use an online converter');
}
