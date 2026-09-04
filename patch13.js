const fs = require('fs');

const descriptions = {
  'tools/mcq-generator.html': 'Generate AI-powered multiple choice questions (MCQs) instantly on any topic. Perfect for DU SOL MBA students to practice and self-test before exams. Free MCQ generator tool by SOLMATES.',
  'tools/question-paper-generator.html': 'Create AI-generated practice question papers for CBSE, DU SOL, MBA and any exam in seconds. Customize subject, topic, difficulty and language. Free question paper generator by SOLMATES.',
};

for (const [file, desc] of Object.entries(descriptions)) {
  let c = fs.readFileSync(file, 'utf8');
  if (!c.includes('<meta name="description"')) {
    c = c.replace('<head>', `<head>\n  <meta name="description" content="${desc}">`);
    fs.writeFileSync(file, c, 'utf8');
    console.log(`Added to ${file}`);
  } else {
    console.log(`Already exists in ${file}`);
  }
}
