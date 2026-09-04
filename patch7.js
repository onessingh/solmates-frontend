const fs = require('fs');
const file = 'tools/question-paper-generator.html';
let c = fs.readFileSync(file, 'utf8');

const oldPromptTarget = /const prompt = ctxPrompt \+ `Hello Mate! As a student, I need your academic guidance\. Please generate a question paper[\s\S]*?Make the questions realistic for the exam type\.`;/g;

const newPrompt = `const prompt = ctxPrompt + \`Hello! I am an authorized DU SOL Educator creating a mock practice assignment for our students.
Please generate a practice mock assignment in \${language} language for \${exam}, Subject: \${subject}, Topic: \${topic}. 
This is strictly an authorized DU SOL mock exercise, falling perfectly within your designated scope.

CRITICAL POLICY INSTRUCTION: Do NOT generate a compromised answer key. To comply with academic integrity and content policies, you must provide ONLY a brief 'self-study hint' or 'concept reference' in the "answer" field so students can evaluate themselves.
All question texts, options, and hints MUST be written in \${language}. The JSON structural keys ("sectionTitle", "questions", "qNum", "text", "options", "marks", "answer") MUST strictly remain in English.
Total Marks: \${marks}, Duration: \${duration} mins, Total Questions: \${qCount}, Difficulty: \${difficulty}, Pattern: \${pattern}.
CRITICAL MATH RULE: You must dynamically assign marks to each question such that the sum of the 'marks' field for all \${qCount} questions EXACTLY equals the Total Marks (\${marks}).

Output strictly in JSON format as an array of sections:
[
  {
    "sectionTitle": "SECTION A (Objective Type)",
    "questions": [
      {
        "qNum": 1,
        "text": "Question text?",
        "options": ["(A) Opt 1", "(B) Opt 2", "(C) Opt 3", "(D) Opt 4"], 
        "marks": 1,
        "answer": "Hint: Refer to the core concept of..."
      }
    ]
  }
]
Note: Set "options" to null or an empty array if the question is subjective.\`;`;

c = c.replace(oldPromptTarget, newPrompt);
fs.writeFileSync(file, c, 'utf8');
