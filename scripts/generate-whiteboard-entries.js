/**
 * Helper script to generate whiteboard entries for whiteboards.ts
 * 
 * Usage:
 * 1. List your image filenames in the IMAGES array below
 * 2. Run: node scripts/generate-whiteboard-entries.js
 * 3. Copy the output into src/data/whiteboards.ts
 */

// ============================================
// STEP 1: Add your image filenames here
// ============================================
// Format: Just the filename, e.g., "4.1_Introduction to Imperfectly Competitive Markets.jpg"
// Or the full path: "AP_Micro_Unit_4/4.1_Introduction to Imperfectly Competitive Markets.jpg"

const IMAGES = [
  // Unit 4 - Add your filenames here
  // Example: "AP_Micro_Unit_4/4.1_Introduction to Imperfectly Competitive Markets.jpg",
  // Example: "AP_Micro_Unit_4/4.2_Monopoly.jpg",
  
  // Unit 5 - Add your filenames here
  // Example: "AP_Micro_Unit_5/5.1_Introduction to Factor Markets.jpg",
  
  // Unit 6 - Add your filenames here
  // Example: "AP_Micro_Unit_6/6.1_Socially Efficient and Inefficient Market Outcomes.jpg",
];

// ============================================
// STEP 2: Configure unit number
// ============================================
const UNIT_NUMBER = 4; // Change to 4, 5, or 6

// ============================================
// Script Logic (no need to modify)
// ============================================

const BASE_URL = "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com";

function extractLessonId(filename) {
  // Extract lesson ID from filename (e.g., "4.1" from "4.1_Topic Name.jpg")
  const match = filename.match(/(\d+\.\d+)/);
  return match ? match[1] : null;
}

function extractTopic(filename) {
  // Extract topic name from filename
  // Remove folder path, lesson ID, and extension
  let topic = filename
    .replace(/^AP_Micro_Unit_\d+\//, '') // Remove folder prefix
    .replace(/^\d+\.\d+_/, '') // Remove lesson ID prefix
    .replace(/\.(jpg|jpeg|png)$/i, ''); // Remove extension
  
  return topic || "Untitled";
}

function generateEntry(filename, unitNumber) {
  const lessonID = extractLessonId(filename);
  const topic = extractTopic(filename);
  
  // Clean filename for URL (ensure it has folder prefix)
  let urlPath = filename;
  if (!urlPath.startsWith(`AP_Micro_Unit_${unitNumber}/`)) {
    urlPath = `AP_Micro_Unit_${unitNumber}/${filename.replace(/^AP_Micro_Unit_\d+\//, '')}`;
  }
  
  const url = `${BASE_URL}/${urlPath}`;
  
  return {
    lessonID: lessonID || "X.Y",
    unit: unitNumber,
    topic: topic,
    url: url
  };
}

function formatAsTypeScript(entries, unitNumber) {
  const arrayName = `apMicroUnit${unitNumber}Whiteboards`;
  
  let output = `export const ${arrayName}: Whiteboard[] = [\n`;
  
  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    output += `  { lessonID: "${entry.lessonID}", unit: ${entry.unit}, topic: "${entry.topic}", url: "${entry.url}" }${isLast ? '' : ','}\n`;
  });
  
  output += `];`;
  
  return output;
}

// Main execution
if (IMAGES.length === 0) {
  console.log("⚠️  No images found! Please add your image filenames to the IMAGES array.");
  console.log("\nExample:");
  console.log('  const IMAGES = [');
  console.log('    "AP_Micro_Unit_4/4.1_Introduction to Imperfectly Competitive Markets.jpg",');
  console.log('    "AP_Micro_Unit_4/4.2_Monopoly.jpg",');
  console.log('  ];');
  process.exit(1);
}

console.log(`\n📝 Generating entries for Unit ${UNIT_NUMBER}...\n`);

const entries = IMAGES.map(filename => generateEntry(filename, UNIT_NUMBER));

// Group by lesson ID for better organization
const grouped = entries.reduce((acc, entry) => {
  if (!acc[entry.lessonID]) {
    acc[entry.lessonID] = [];
  }
  acc[entry.lessonID].push(entry);
  return acc;
}, {});

// Sort by lesson ID
const sortedEntries = Object.keys(grouped)
  .sort()
  .flatMap(lessonID => grouped[lessonID]);

console.log("✅ Generated entries:\n");
console.log(formatAsTypeScript(sortedEntries, UNIT_NUMBER));

console.log("\n\n📋 Summary:");
console.log(`   Total entries: ${sortedEntries.length}`);
console.log(`   Lessons covered: ${Object.keys(grouped).join(', ')}`);

console.log("\n\n📝 Next steps:");
console.log("   1. Copy the output above");
console.log(`   2. Paste it into src/data/whiteboards.ts`);
console.log(`   3. Replace the existing apMicroUnit${UNIT_NUMBER}Whiteboards array`);
console.log("   4. Save and test!");

