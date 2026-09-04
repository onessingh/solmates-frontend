const fs = require('fs');
const file = 'tools/question-paper-generator.html';
let c = fs.readFileSync(file, 'utf8');

const oldPromptTarget = /const prompt = ctxPrompt \+ `Hello! I am an authorized DU SOL Educator[\s\S]*?Note: Set "options" to null or an empty array if the question is subjective\.`;/g;

const newPrompt = `const prompt = ctxPrompt + \`You are acting as an AI-powered mock exam generator. Generate completely ORIGINAL AI-created practice questions (not from any real exam paper) in \${language} for \${exam}, Subject: \${subject}, Topic: \${topic}.

Since these are entirely AI-generated practice questions (not from any real exam), you MUST provide the full correct answer and a brief explanation in the "answer" field for every question. This helps students learn and self-evaluate.

CRITICAL INSTRUCTION: All question texts, options, and answers MUST be written in \${language}. The JSON structural keys ("sectionTitle", "questions", "qNum", "text", "options", "marks", "answer") MUST strictly remain in English. Do not translate the JSON keys.
Total Marks: \${marks}, Duration: \${duration} mins, Total Questions: \${qCount}, Difficulty: \${difficulty}, Pattern: \${pattern}.
CRITICAL MATH RULE: Assign marks per question so the sum of all "marks" fields EXACTLY equals \${marks}.

Output ONLY valid JSON as an array of sections:
[
  {
    "sectionTitle": "SECTION A (Objective Type)",
    "questions": [
      {
        "qNum": 1,
        "text": "Question text?",
        "options": ["(A) Opt 1", "(B) Opt 2", "(C) Opt 3", "(D) Opt 4"],
        "marks": 1,
        "answer": "(A) Opt 1 - Because..."
      }
    ]
  }
]
Note: Set "options" to null or empty array for subjective questions. For subjective, provide a full model answer in the "answer" field.\`;`;

c = c.replace(oldPromptTarget, newPrompt);
fs.writeFileSync(file, c, 'utf8');
console.log('Done!');
