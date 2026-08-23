const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

// Find the line `render: (resume) => {` inside the `key: "education"` block.
// And inject the `if (!resume.education || resume.education.length === 0) return "";` check.

js = js.replace(
  /key:\s*"education",\s*title:\s*"Education",\s*render:\s*\(resume\)\s*=>\s*\{/g,
  'key: "education",\ntitle: "Education",\nrender: (resume) => {\n  if (!resume.education || resume.education.length === 0) return "";'
);

fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');
console.log('Fixed education properly!');
