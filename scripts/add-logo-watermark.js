#!/usr/bin/env node

/**
 * Script to add AP Dojo logo watermarks to whiteboard images
 * Requires: npm install sharp
 * Usage: node scripts/add-logo-watermark.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const UNIT_NUMBER = 2;
const INPUT_FOLDER = `public/images/whiteboards/unit${UNIT_NUMBER}`;
const OUTPUT_FOLDER = `public/images/whiteboards/unit${UNIT_NUMBER}/watermarked`;
const LOGO_PATH = 'public/images/dojoIcon.png'; // Path to your AP Dojo logo
const LOGO_OPACITY = 0.8;
const LOGO_SIZE = 120; // Logo size in pixels
const LOGO_MARGIN = 30;

// Watermark configuration
const watermarkConfig = {
  position: 'bottom-right', // or 'bottom-left', 'top-right', 'top-left', 'center'
  size: LOGO_SIZE,
  opacity: LOGO_OPACITY,
  margin: LOGO_MARGIN
};

// Function to add logo watermark to an image
async function addLogoWatermark(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Check if logo exists
    if (!fs.existsSync(LOGO_PATH)) {
      console.log(`⚠️  Logo not found at: ${LOGO_PATH}`);
      console.log(`Using text watermark instead...`);
      return addTextWatermark(inputPath, outputPath);
    }

    // Calculate logo position
    const { x, y } = calculateLogoPosition(
      metadata.width, 
      metadata.height, 
      watermarkConfig.position, 
      watermarkConfig.margin
    );

    // Resize logo
    const logo = sharp(LOGO_PATH)
      .resize(watermarkConfig.size, watermarkConfig.size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      });

    // Composite the logo onto the image
    await image
      .composite([{
        input: await logo.toBuffer(),
        top: y - watermarkConfig.size, // Adjust for logo height
        left: x
      }])
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log(`✅ Logo watermarked: ${path.basename(inputPath)}`);
    
  } catch (error) {
    console.error(`❌ Error logo watermarking ${inputPath}:`, error.message);
  }
}

// Fallback text watermark function
async function addTextWatermark(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Calculate text position
    const { x, y } = calculateLogoPosition(
      metadata.width, 
      metadata.height, 
      watermarkConfig.position, 
      watermarkConfig.margin
    );

    // Create text watermark SVG
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
          font-family="Arial" 
          font-size="36" 
          fill="#2563eb" 
          opacity="0.8"
          filter="url(#shadow)"
          text-anchor="end"
          font-weight="bold"
        >
          AP Dojo
        </text>
      </svg>
    `;

    // Composite the text watermark onto the image
    await image
      .composite([{
        input: Buffer.from(watermarkSvg),
        top: 0,
        left: 0
      }])
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log(`✅ Text watermarked: ${path.basename(inputPath)}`);
    
  } catch (error) {
    console.error(`❌ Error text watermarking ${inputPath}:`, error.message);
  }
}

// Function to calculate logo position
function calculateLogoPosition(width, height, position, margin) {
  switch (position) {
    case 'bottom-right':
      return { x: width - margin - watermarkConfig.size, y: height - margin };
    case 'bottom-left':
      return { x: margin, y: height - margin };
    case 'top-right':
      return { x: width - margin - watermarkConfig.size, y: margin + watermarkConfig.size };
    case 'top-left':
      return { x: margin, y: margin + watermarkConfig.size };
    case 'center':
      return { x: (width - watermarkConfig.size) / 2, y: (height + watermarkConfig.size) / 2 };
    default:
      return { x: width - margin - watermarkConfig.size, y: height - margin };
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
    console.log(`🎨 Logo watermark: ${watermarkConfig.position} position`);
    console.log(`📏 Logo size: ${watermarkConfig.size}x${watermarkConfig.size}px`);
    console.log(`\n⏳ Processing images...`);

    // Process each image
    for (const file of files) {
      const inputPath = path.join(INPUT_FOLDER, file);
      const outputPath = path.join(OUTPUT_FOLDER, file);
      await addLogoWatermark(inputPath, outputPath);
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