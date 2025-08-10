#!/usr/bin/env node

/**
 * Script to add AP Dojo watermarks to whiteboard images
 * Requires: npm install sharp
 * Usage: node scripts/add-watermark.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const UNIT_NUMBER = 2;
const INPUT_FOLDER = `public/images/whiteboards/unit${UNIT_NUMBER}`;
const OUTPUT_FOLDER = `public/images/whiteboards/unit${UNIT_NUMBER}/watermarked`;
const WATERMARK_TEXT = 'AP Dojo';
const WATERMARK_COLOR = '#2563eb'; // Blue color
const WATERMARK_OPACITY = 0.7;

// Watermark configuration
const watermarkConfig = {
  text: WATERMARK_TEXT,
  font: 'Arial',
  fontSize: 48,
  color: WATERMARK_COLOR,
  opacity: WATERMARK_OPACITY,
  position: 'bottom-right', // or 'bottom-left', 'top-right', 'top-left', 'center'
  margin: 20
};

// Function to add watermark to an image
async function addWatermark(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Calculate watermark position
    const { x, y } = calculateWatermarkPosition(
      metadata.width, 
      metadata.height, 
      watermarkConfig.position, 
      watermarkConfig.margin
    );

    // Create watermark SVG
    const watermarkSvg = `
      <svg width="${metadata.width}" height="${metadata.height}">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        <text 
          x="${x}" 
          y="${y}" 
          font-family="${watermarkConfig.font}" 
          font-size="${watermarkConfig.fontSize}" 
          fill="${watermarkConfig.color}" 
          opacity="${watermarkConfig.opacity}"
          filter="url(#shadow)"
          text-anchor="${getTextAnchor(watermarkConfig.position)}"
        >
          ${watermarkConfig.text}
        </text>
      </svg>
    `;

    // Composite the watermark onto the image
    await image
      .composite([{
        input: Buffer.from(watermarkSvg),
        top: 0,
        left: 0
      }])
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log(`✅ Watermarked: ${path.basename(inputPath)}`);
    
  } catch (error) {
    console.error(`❌ Error watermarking ${inputPath}:`, error.message);
  }
}

// Function to calculate watermark position
function calculateWatermarkPosition(width, height, position, margin) {
  const textWidth = watermarkConfig.text.length * watermarkConfig.fontSize * 0.6; // Approximate text width
  const textHeight = watermarkConfig.fontSize;
  
  switch (position) {
    case 'bottom-right':
      return { x: width - margin, y: height - margin };
    case 'bottom-left':
      return { x: margin + textWidth, y: height - margin };
    case 'top-right':
      return { x: width - margin, y: margin + textHeight };
    case 'top-left':
      return { x: margin + textWidth, y: margin + textHeight };
    case 'center':
      return { x: width / 2, y: height / 2 };
    default:
      return { x: width - margin, y: height - margin };
  }
}

// Function to get text anchor for SVG
function getTextAnchor(position) {
  switch (position) {
    case 'bottom-right':
    case 'top-right':
      return 'end';
    case 'bottom-left':
    case 'top-left':
      return 'start';
    case 'center':
      return 'middle';
    default:
      return 'end';
  }
}

// Main function
async function processImages() {
  try {
    // Check if input folder exists
    if (!fs.existsSync(INPUT_FOLDER)) {
      console.log(`❌ Input folder not found: ${INPUT_FOLDER}`);
      console.log(`Please create the folder and add your Unit ${UNIT_NUMBER} images first.`);
      return;
    }

    // Create output folder
    if (!fs.existsSync(OUTPUT_FOLDER)) {
      fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
      console.log(`📁 Created output folder: ${OUTPUT_FOLDER}`);
    }

    // Get all image files
    const files = fs.readdirSync(INPUT_FOLDER)
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    if (files.length === 0) {
      console.log(`❌ No image files found in ${INPUT_FOLDER}`);
      return;
    }

    console.log(`📸 Found ${files.length} images to watermark`);
    console.log(`🎨 Watermark: "${WATERMARK_TEXT}" (${watermarkConfig.position})`);
    console.log(`\n⏳ Processing images...`);

    // Process each image
    for (const file of files) {
      const inputPath = path.join(INPUT_FOLDER, file);
      const outputPath = path.join(OUTPUT_FOLDER, file);
      await addWatermark(inputPath, outputPath);
    }

    console.log(`\n🎉 Finished watermarking ${files.length} images!`);
    console.log(`📁 Watermarked images saved to: ${OUTPUT_FOLDER}`);
    console.log(`\n📋 Next steps:`);
    console.log(`1. Review the watermarked images`);
    console.log(`2. Update your whiteboard data to use the new paths`);
    console.log(`3. Test the images in your application`);

  } catch (error) {
    console.error('Error processing images:', error);
  }
}

// Check if sharp is installed
try {
  require('sharp');
  processImages();
} catch (error) {
  console.log('❌ Sharp library not found. Installing...');
  console.log('Please run: npm install sharp');
  console.log('Then run this script again.');
} 