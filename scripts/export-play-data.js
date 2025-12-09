/**
 * Script to export play data from Firebase
 * This extracts drawing data from Firebase and exports it as JSON
 * 
 * Usage: node scripts/export-play-data.js
 * 
 * Make sure to set up Firebase Admin SDK credentials first
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin (you'll need to set up service account)
// For now, this is a template - you'll need to configure it
if (!admin.apps.length) {
  const serviceAccount = require('../path-to-your-service-account-key.json');
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

/**
 * Extract play data from Firebase
 * Currently looks for drawingAnswers in testProgress collection
 * You may need to adjust the collection path based on your structure
 */
async function exportPlayData() {
  try {
    console.log('Starting play data export...');
    
    const plays = [];
    
    // Query the userTestProgress collection
    // Adjust this path based on where your play data is stored
    const testProgressRef = db.collection('userTestProgress');
    const snapshot = await testProgressRef.get();
    
    if (snapshot.empty) {
      console.log('No test progress documents found.');
      return;
    }
    
    console.log(`Found ${snapshot.size} user documents`);
    
    // Iterate through each user's test progress
    for (const userDoc of snapshot.docs) {
      const userId = userDoc.id;
      const testsRef = userDoc.ref.collection('tests');
      const testsSnapshot = await testsRef.get();
      
      for (const testDoc of testsSnapshot.docs) {
        const testData = testDoc.data();
        
        // Check if this test has drawing answers (plays)
        if (testData.progress && testData.progress.drawingAnswers) {
          const drawingAnswers = testData.progress.drawingAnswers;
          
          // Extract each drawing/play
          Object.entries(drawingAnswers).forEach(([questionId, drawingData]) => {
            plays.push({
              userId: userId,
              testId: testDoc.id,
              questionId: questionId,
              drawingData: drawingData, // Base64 image string
              testType: testData.testType,
              createdAt: testData.progress?.startedAt?.toDate()?.toISOString(),
              updatedAt: testData.progress?.lastUpdated?.toDate()?.toISOString(),
            });
          });
        }
      }
    }
    
    console.log(`Found ${plays.length} plays/drawings`);
    
    // Export to JSON file
    const outputPath = path.join(__dirname, '../data/exported-plays.json');
    fs.writeFileSync(outputPath, JSON.stringify(plays, null, 2));
    
    console.log(`✅ Exported ${plays.length} plays to ${outputPath}`);
    
    // Also create a summary
    const summary = {
      totalPlays: plays.length,
      uniqueUsers: new Set(plays.map(p => p.userId)).size,
      testTypes: plays.reduce((acc, p) => {
        acc[p.testType] = (acc[p.testType] || 0) + 1;
        return acc;
      }, {}),
      exportDate: new Date().toISOString()
    };
    
    const summaryPath = path.join(__dirname, '../data/play-export-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    
    console.log(`✅ Summary saved to ${summaryPath}`);
    
  } catch (error) {
    console.error('Error exporting play data:', error);
    process.exit(1);
  }
}

// Run the export
exportPlayData()
  .then(() => {
    console.log('Export complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Export failed:', error);
    process.exit(1);
  });


