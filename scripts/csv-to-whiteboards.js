#!/usr/bin/env node

/**
 * Script to convert CSV whiteboard data to TypeScript
 * Usage: node scripts/csv-to-whiteboards.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const UNIT_NUMBER = 2;
const SUBJECT = 'ap_macroeconomics';
const CSV_FILE = `scripts/whiteboard-template.csv`;
const OUTPUT_FILE = `src/data/unit${UNIT_NUMBER}Whiteboards.ts`;

// Function to parse CSV
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const entry = {};
    headers.forEach((header, index) => {
      entry[header.trim()] = values[index] ? values[index].trim() : '';
    });
    return entry;
  });
}

// Function to generate whiteboard entries
function generateWhiteboards(csvData) {
  return csvData.map((row, index) => ({
    id: `unit${UNIT_NUMBER}_${index + 1}`,
    subject: SUBJECT,
    unit: UNIT_NUMBER,
    lessonIDs: [row.lesson_id],
    imageUrl: `/images/whiteboards/unit${UNIT_NUMBER}/${row.filename}`,
    title: row.title,
    description: row.description
  }));
}

// Main function
function convertCSVToWhiteboards() {
  try {
    // Check if CSV file exists
    if (!fs.existsSync(CSV_FILE)) {
      console.log(`❌ CSV file not found: ${CSV_FILE}`);
      console.log(`Please create the CSV file with your whiteboard data first.`);
      return;
    }

    // Read CSV file
    const csvContent = fs.readFileSync(CSV_FILE, 'utf8');
    const csvData = parseCSV(csvContent);
    
    if (csvData.length === 0) {
      console.log('❌ No data found in CSV file');
      return;
    }

    console.log(`📊 Found ${csvData.length} entries in CSV`);

    // Generate whiteboard entries
    const whiteboards = generateWhiteboards(csvData);

    // Generate the TypeScript file content
    const fileContent = `// Auto-generated Unit ${UNIT_NUMBER} Whiteboards from CSV
// Generated on: ${new Date().toISOString()}
// Total images: ${whiteboards.length}

import { WhiteboardImage } from './allContent';

export const unit${UNIT_NUMBER}Whiteboards: WhiteboardImage[] = ${JSON.stringify(whiteboards, null, 2)};

// To use these whiteboards, import them in your components:
// import { unit${UNIT_NUMBER}Whiteboards } from '@/data/unit${UNIT_NUMBER}Whiteboards';
// 
// Then merge with your existing whiteboards:
// const allWhiteboards = [...whiteboardImages, ...unit${UNIT_NUMBER}Whiteboards];
`;

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, fileContent);
    
    console.log(`✅ Generated ${whiteboards.length} whiteboard entries`);
    console.log(`📁 Output file: ${OUTPUT_FILE}`);
    
    // Show preview
    console.log(`\n📸 Generated entries:`);
    whiteboards.forEach((wb, i) => {
      console.log(`${i + 1}. ${wb.title} → Lesson ${wb.lessonIDs[0]}`);
      console.log(`   File: ${wb.imageUrl}`);
      console.log(`   Description: ${wb.description || 'No description'}`);
      console.log('');
    });

    console.log(`\n📋 Next steps:`);
    console.log(`1. Upload your images to: public/images/whiteboards/unit${UNIT_NUMBER}/`);
    console.log(`2. Make sure filenames match the CSV entries`);
    console.log(`3. Import the generated file in your components`);
    console.log(`4. Merge with existing whiteboard data if needed`);

  } catch (error) {
    console.error('Error converting CSV to whiteboards:', error);
  }
}

// Run the script
convertCSVToWhiteboards(); 