const fs = require('fs');
let html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');
const lines = html.split('\n');
// Remove lines 1057 to 1489 (0-indexed: 1056 to 1488)
const newLines = [...lines.slice(0, 1056), ...lines.slice(1489)];
fs.writeFileSync('tools/resumebuilder/index.html', newLines.join('\n'), 'utf8');
console.log('Done! Lines removed. Total now:', newLines.length);
