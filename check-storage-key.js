const fs = require('fs');
const js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');
const lines = js.split('\n');
lines.forEach((l, i) => {
    if (l.includes('STORAGE_KEY')) {
        console.log((i+1) + ': ' + l.trim());
    }
});
