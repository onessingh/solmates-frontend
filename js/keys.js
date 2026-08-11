const fs = require('fs');
const code = fs.readFileSync('exam-data.js', 'utf8');
const regex = /^\s*['"]?([a-zA-Z0-9_-]+)['"]?\s*:\s*\{/gm;
let m;
while ((m = regex.exec(code)) !== null) {
  console.log(m[1]);
}
