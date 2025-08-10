#!/usr/bin/env node

/**
 * Script to bulk-generate whiteboard entries from a folder of images
 * Usage: node scripts/generate-whiteboards.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const UNIT_NUMBER = 2;
const SUBJECT = 'ap_macroeconomics'; // or 'ap_microeconomics'
const IMAGE_FOLDER = `public/images/whiteboards/unit${UNIT_NUMBER}`;
const OUTPUT_FILE = `src/data/unit${UNIT_NUMBER}Whiteboards.ts`;

// Lesson mapping - customize this based on your curriculum
const LESSON_MAPPING = {
  '2.1': 'Basic Economic Concepts',
  '2.2': 'Economic Indicators',
  '2.3': 'GDP and Growth',
  '2.4': 'Unemployment',
  '2.5': 'Inflation',
  '2.6': 'Business Cycles',
  '2.7': 'Fiscal Policy',
  '2.8': 'Monetary Policy',
  '2.9': 'International Trade',
  '2.10': 'Exchange Rates'
};

// Function to generate a title from filename
function generateTitle(filename) {
  // Remove extension and common prefixes
  let title = filename
    .replace(/\.(jpg|jpeg|png|gif|svg)$/i, '')
    .replace(/^unit2_?/i, '')
    .replace(/^lesson\d+_?/i, '')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ');
  
  // Capitalize first letter of each word
  title = title.replace(/\b\w/g, l => l.toUpperCase());
  
  return title;
}

// Function to determine lesson ID from filename
function determineLessonId(filename) {
  // Look for lesson patterns like "lesson2", "2.1", etc.
  const lessonMatch = filename.match(/(?:lesson)?(\d+(?:\.\d+)?)/i);
  if (lessonMatch) {
    return lessonMatch[1];
  }
  
  // If no lesson pattern, you can customize this logic
  // For now, return a default lesson
  return '2.1';
}

// Main function
function generateWhiteboards() {
  try {
    // Check if image folder exists
    if (!fs.existsSync(IMAGE_FOLDER)) {
      console.log(`Creating folder: ${IMAGE_FOLDER}`);
      fs.mkdirSync(IMAGE_FOLDER, { recursive: true });
      console.log(`Please add your Unit ${UNIT_NUMBER} images to: ${IMAGE_FOLDER}`);
      return;
    }

    // Read all image files
    const files = fs.readdirSync(IMAGE_FOLDER)
      .filter(file => /\.(jpg|jpeg|png|gif|svg)$/i.test(file));

    if (files.length === 0) {
      console.log(`No image files found in ${IMAGE_FOLDER}`);
      console.log(`Please add your Unit ${UNIT_NUMBER} images to this folder.`);
      return;
    }

    console.log(`Found ${files.length} images in ${IMAGE_FOLDER}`);

    // Generate whiteboard entries
    const whiteboards = files.map((file, index) => {
      const lessonId = determineLessonId(file);
      const title = generateTitle(file);
      
      return {
        id: `unit${UNIT_NUMBER}_${index + 1}`,
        subject: SUBJECT,
        unit: UNIT_NUMBER,
        lessonIDs: [lessonId],
        imageUrl: `/images/whiteboards/unit${UNIT_NUMBER}/${file}`,
        title: title
      };
    });

    // Generate the TypeScript file content
    const fileContent = `// Auto-generated Unit ${UNIT_NUMBER} Whiteboards
// Generated on: ${new Date().toISOString()}
// Total images: ${whiteboards.length}

import { WhiteboardImage } from './allContent';

export const unit${UNIT_NUMBER}Whiteboards: WhiteboardImage[] = ${JSON.stringify(whiteboards, null, 2)};

// You can customize lesson IDs and titles manually after generation
// Example of manual customization:
/*
export const unit${UNIT_NUMBER}Whiteboards: WhiteboardImage[] = [
  {
    id: 'unit${UNIT_NUMBER}_1',
    subject: '${SUBJECT}',
    unit: ${UNIT_NUMBER},
    lessonIDs: ['2.1'], // Customize this based on your curriculum
    imageUrl: '/images/whiteboards/unit${UNIT_NUMBER}/your_image.jpg',
    title: 'Custom Title' // Customize this
  },
  // ... more entries
];
*/
`;

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, fileContent);
    
    console.log(`✅ Generated ${whiteboards.length} whiteboard entries`);
    console.log(`📁 Output file: ${OUTPUT_FILE}`);
    console.log(`\n📋 Next steps:`);
    console.log(`1. Review the generated file: ${OUTPUT_FILE}`);
    console.log(`2. Customize lesson IDs to match your curriculum`);
    console.log(`3. Update titles if needed`);
    console.log(`4. Import and use in your components`);
    
    // Show preview
    console.log(`\n📸 Generated entries preview:`);
    whiteboards.forEach((wb, i) => {
      console.log(`${i + 1}. ${wb.title} → Lesson ${wb.lessonIDs[0]}`);
    });

  } catch (error) {
    console.error('Error generating whiteboards:', error);
  }
}

// Run the script
generateWhiteboards(); 