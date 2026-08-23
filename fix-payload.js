const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

const regex = /const payload = \{[\s\S]*?\};\r?\n    localStorage\.setItem\(STORAGE_KEY, JSON\.stringify\(payload\)\);/;
const replacement = `const payload = {
      resume: state.resume,
      selectedTemplate: state.selectedTemplate,
      sectionOrder: state.sectionOrder,
      sectionEnabled: state.sectionEnabled,
      templateVersion: 1
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));`;

js = js.replace(regex, replacement);

fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');
console.log('Fixed payload!');
