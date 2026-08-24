const fs = require('fs');

let html = fs.readFileSync('exam-prep/study-kit.html', 'utf8');

// 1. Flashcards prompt & rendering
html = html.replace(
  /{ "cards": \[\{ "question": "<generate real question>", "answer": "<generate real answer \(1-3 sentences\)>", "category": "<topic name>" \}\] }/g,
  '{ "cards": [{ "question": "What is the capital of France?", "answer": "Paris.", "category": "Geography" }] }'
);
html = html.replace(/\$\{c\.question\}/g, '${c.question || c.q || "Could not load question"}');
html = html.replace(/\$\{c\.answer\}/g, '${c.answer || c.a || "Could not load answer"}');

// 2. MCQ prompt
html = html.replace(
  /Return JSON: \{ "questions": \[\{ "q": "Write the actual question text here", "options": \["Option 1 Text", "Option 2 Text", "Option 3 Text", "Option 4 Text"\], "correct": 0 \}\] \}/g,
  'Return JSON: { "questions": [{ "q": "Which planet is known as the Red Planet?", "options": ["Earth", "Mars", "Jupiter", "Venus"], "correct": 1 }] }'
);

// 3. Mock Test prompt
html = html.replace(
  /\{ "duration": 30, "questions": \[\{ "q": "<generate actual question>", "options": \["<opt 1>", "<opt 2>", "<opt 3>", "<opt 4>"\], "correct": <integer 0-3> \}\] \}/g,
  '{ "duration": 30, "questions": [{ "q": "Who wrote Hamlet?", "options": ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], "correct": 1 }] }'
);

// 4. Aptitude prompt
html = html.replace(
  /\{ "questions": \[\{ "type": "<e.g., Logical Reasoning>", "q": "<generate actual reasoning question>", "answer": "<explain the logic\/answer>" \}\] \}/g,
  '{ "questions": [{ "type": "Logical Reasoning", "q": "If all roses are flowers and some flowers fade quickly, do all roses fade quickly?", "answer": "No, because the statement says only some flowers fade quickly, not all." }] }'
);

fs.writeFileSync('exam-prep/study-kit.html', html, 'utf8');
console.log('Fixed prompts in study-kit.html');
