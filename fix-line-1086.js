const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

js = js.replace('alt="Profile"', 'alt=""');

fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');
console.log('Fixed line 1086 alt tag!');
