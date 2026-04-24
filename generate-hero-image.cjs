#!/usr/bin/env node

const PNG = require('pngjs').PNG;
const fs = require('fs');
const path = require('path');

// Create a 1600x900 PNG image with election theme
const png = new PNG({width: 1600, height: 900});

// Helper function to set pixel color
function setPixel(data, x, y, r, g, b, a = 255) {
  const idx = (png.width * y + x) << 2;
  data[idx] = r;
  data[idx + 1] = g;
  data[idx + 2] = b;
  data[idx + 3] = a;
}

// Helper function for linear gradient
function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}

// Fill with gradient background (navy to deep blue)
for (let y = 0; y < png.height; y++) {
  const ratio = y / png.height;
  const r = lerp(26, 15, ratio);
  const g = lerp(26, 52, ratio);
  const b = lerp(46, 96, ratio);
  
  for (let x = 0; x < png.width; x++) {
    setPixel(png.data, x, y, r, g, b);
  }
}

// Draw semi-transparent left accent (red)
for (let y = 0; y < png.height; y++) {
  for (let x = 0; x < 250; x++) {
    const idx = (png.width * y + x) << 2;
    const a = png.data[idx + 3];
    png.data[idx] = Math.min(255, Math.round(png.data[idx] + 220 * 0.15));
    png.data[idx + 1] = Math.round(png.data[idx + 1] * 0.85);
    png.data[idx + 2] = Math.round(png.data[idx + 2] * 0.85);
  }
}

// Draw semi-transparent right accent (blue)
for (let y = 0; y < png.height; y++) {
  for (let x = 1350; x < 1600; x++) {
    const idx = (png.width * y + x) << 2;
    png.data[idx] = Math.round(png.data[idx] * 0.85);
    png.data[idx + 1] = Math.round(png.data[idx + 1] * 0.85);
    png.data[idx + 2] = Math.min(255, Math.round(png.data[idx + 2] + 255 * 0.15));
  }
}

// Draw circle (voting theme) - simple implementation
function drawCircle(centerX, centerY, radius, r, g, b, a, thickness = 2) {
  for (let x = centerX - radius; x < centerX + radius; x++) {
    for (let y = centerY - radius; y < centerY + radius; y++) {
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (Math.abs(dist - radius) < thickness) {
        if (x >= 0 && x < png.width && y >= 0 && y < png.height) {
          setPixel(png.data, x, y, r, g, b, a);
        }
      }
    }
  }
}

// Draw decorative circles
drawCircle(1250, 450, 220, 255, 255, 255, 76, 3);
drawCircle(1250, 450, 160, 255, 255, 255, 51, 2);
drawCircle(1250, 450, 100, 74, 222, 128, 204, 4);

// Draw a simple "V" checkmark shape
function drawCheckmark() {
  // Draw V shape using lines
  for (let i = 0; i < 60; i++) {
    // Left part of checkmark
    const x1 = Math.round(1170 + i * 0.85);
    const y1 = Math.round(450 + i * 1.0);
    // Right part of checkmark  
    const x2 = Math.round(1220 + i * 1.8);
    const y2 = Math.round(510 - i * 0.8);
    
    if (x1 >= 0 && x1 < png.width && y1 >= 0 && y1 < png.height) {
      setPixel(png.data, x1, y1, 74, 222, 128);
    }
    if (x2 >= 0 && x2 < png.width && y2 >= 0 && y2 < png.height) {
      setPixel(png.data, x2, y2, 74, 222, 128);
    }
  }
}

drawCheckmark();

// Save to file
const outputPath = path.join(__dirname, 'public', 'news', 'vote.png');
png.pack().pipe(fs.createWriteStream(outputPath))
  .on('finish', () => {
    console.log('✅ Hero image created successfully!');
    console.log(`📸 Saved to: ${outputPath}`);
    console.log('📏 Dimensions: 1600x900 (16:9 aspect ratio)');
    console.log('🎨 Theme: Election Results - April 25, 2026');
    process.exit(0);
  })
  .on('error', (err) => {
    console.error('❌ Error creating image:', err);
    process.exit(1);
  });
