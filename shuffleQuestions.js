const fs = require('fs');

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Read the file
const filePath = './src/data/questionBanks/macro/mcqs/macroSetThree.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Extract the questions array
const questionsMatch = content.match(/questions:\s*\[([\s\S]*?)\]\s*};/);
if (!questionsMatch) {
    console.error('Could not find questions array');
    process.exit(1);
}

// Parse the questions
const questionsString = questionsMatch[1];
const questions = JSON.parse(`[${questionsString}]`);

// Shuffle the questions
const shuffledQuestions = shuffleArray([...questions]);

// Create the new content
const newContent = content.replace(
    /questions:\s*\[([\s\S]*?)\]\s*};/,
    `questions: ${JSON.stringify(shuffledQuestions, null, 2)};`
);

// Write to a new file
fs.writeFileSync(
    './src/data/questionBanks/macro/mcqs/macroSetThreeShuffled.ts',
    newContent
);

console.log('Questions have been shuffled and saved to macroSetThreeShuffled.ts'); 