const fs = require('fs');
let script = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

script = script.replace(/\\\`/g, '`');

fs.writeFileSync('tools/resumebuilder/script.js', script, 'utf8');
console.log('Fixed syntax errors by unescaping backticks.');
