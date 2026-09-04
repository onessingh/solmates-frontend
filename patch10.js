const fs = require('fs');
const file = 'tools/question-paper-generator.html';
let c = fs.readFileSync(file, 'utf8');

const oldPromptTarget = /const prompt = ctxPrompt \+ `A student is preparing for[\s\S]*?CRITICAL: output ONLY the JSON array\. No text before or after\.`;/g;

const newPrompt = `const prompt = \`[QPG_MODE]
Generate a question paper in \${language} for \${exam}, Subject: \${subject}, Topic: \${topic}.
Total Marks: \${marks}, Duration: \${duration} mins, Questions: \${qCount}, Difficulty: \${difficulty}, Pattern: \${pattern}.
MATH RULE: Sum of all "marks" fields must EXACTLY equal \${marks}.
All question text and answers in \${language}. JSON keys must stay in English.
Output ONLY this JSON:
[{"sectionTitle":"SECTION A","questions":[{"qNum":1,"text":"?","options":["(A)","(B)","(C)","(D)"],"marks":1,"answer":"(A) explanation"}]}]
For subjective: set options to null. Provide full model answer in "answer" field.\`;`;

c = c.replace(oldPromptTarget, newPrompt);
fs.writeFileSync(file, c, 'utf8');
console.log('Done!');
