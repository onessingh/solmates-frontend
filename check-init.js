const fs = require('fs');
const js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');
const lines = js.split('\n');
// Show context around init/saved lines
for(let i = 2650; i <= 2680; i++) {
    if(lines[i]) console.log((i+1) + ': ' + lines[i]);
}
