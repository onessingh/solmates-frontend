const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

js = js.replace('state.selectedTemplate = "social";', 'state.selectedTemplate = "floralSidebar";');

fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');
console.log('Fixed handleClearForm default template!');
