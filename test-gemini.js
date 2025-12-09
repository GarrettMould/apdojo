const { GoogleGenerativeAI } = require("@google/generative-ai");

// PASTE YOUR NEW KEY HERE
const API_KEY = "AIzaSyCnGAdTzEyMTYVdIjpUpvffnjL_N-l5FS0"; 

const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  console.log("--- TESTING CONNECTION ---");
  try {
    // We use the oldest, most standard model to test connection
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Reply with the word: Success");
    const response = await result.response;
    console.log(`✅ VERDICT: ${response.text()}`);
  } catch (e) {
    console.log(`❌ VERDICT: FAILED.`);
    console.log(`ERROR MESSAGE: ${e.message}`);
  }
}

run();