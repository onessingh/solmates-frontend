const fs = require('fs');

let html = fs.readFileSync('tools/flashcards.html', 'utf8');

html = html.replace(
  /\{\s*"front":\s*"<generate actual question or topic>",\s*"back":\s*"<generate actual answer or explanation>"\s*\}/g,
  '{ "front": "What is the capital of France?", "back": "Paris" }'
);

fs.writeFileSync('tools/flashcards.html', html, 'utf8');
console.log('Fixed prompt in tools/flashcards.html');
