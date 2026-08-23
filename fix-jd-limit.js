const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');
html = html.replace(/maxlength="10000"/g, 'maxlength="5000"');
html = html.replace(/10,000 characters max/g, '5,000 characters max');
fs.writeFileSync('tools/resumebuilder/index.html', html, 'utf8');

// 2. Update script.js
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');
js = js.replace(/const JD_MAX_CHARS = 10000;/g, 'const JD_MAX_CHARS = 5000;');
fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');

console.log('Fixed JD limit to 5000!');
