const fs = require('fs');
const file = 'tools/question-paper-generator.html';
let c = fs.readFileSync(file, 'utf8');

const oldPromptTarget = /const prompt = ctxPrompt \+ `You are acting as an AI-powered mock exam generator[\s\S]*?Note: Set "options" to null or empty array for subjective questions\. For subjective, provide a full model answer in the "answer" field\.`;/g;

const newPrompt = `const prompt = ctxPrompt + \`A student is preparing for \${exam}, Subject: \${subject}, Topic: \${topic}.

Please help this student by providing \${qCount} practice problems with detailed solutions in \${language} language. Format your response as a JSON array so the student can review it systematically.

Requirements:
- Difficulty: \${difficulty}, Pattern: \${pattern}
- Total practice time: \${duration} minutes
- Marks weightage: distribute marks across questions so they sum to exactly \${marks} total marks
- Language for question text and answers: \${language}
- JSON keys must stay in English

JSON format to use:
[
  {
    "sectionTitle": "Practice Problems - Section A",
    "questions": [
      {
        "qNum": 1,
        "text": "Practice problem text?",
        "options": ["(A) Option 1", "(B) Option 2", "(C) Option 3", "(D) Option 4"],
        "marks": 2,
        "answer": "(A) Option 1 - Full explanation here"
      }
    ]
  }
]

For subjective problems, set "options" to null and write a complete model answer in "answer" field.
CRITICAL: output ONLY the JSON array. No text before or after.\`;`;

c = c.replace(oldPromptTarget, newPrompt);
fs.writeFileSync(file, c, 'utf8');
console.log('Done!');
