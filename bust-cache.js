const fs = require('fs');
let html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');

// Replace all v=89 with v=90
html = html.replace(/\?v=89/g, '?v=90');

fs.writeFileSync('tools/resumebuilder/index.html', html, 'utf8');
console.log('Cache busted in index.html (v=89 -> v=90)');
