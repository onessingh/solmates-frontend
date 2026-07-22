const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'tools', 'index.html');
let content = fs.readFileSync(indexFile, 'utf8');

// Remove ppt-to-pdf
content = content.replace(/\s*\{\s*id:\s*"ppt-to-pdf"[\s\S]*?\},/g, '');

// Remove pdf-to-pdfa
content = content.replace(/\s*\{\s*id:\s*"pdf-to-pdfa"[\s\S]*?\},/g, '');

// Remove repair
content = content.replace(/\s*\{\s*id:\s*"repair"[\s\S]*?\},/g, '');

fs.writeFileSync(indexFile, content, 'utf8');
console.log('Removed mock tools from tools/index.html');
