const fs = require('fs');
const html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('id="tab-builder"') || l.includes('id="jd-match"') || l.includes('id="templates"') || l.includes('preview-panel') || l.includes('builder-layout') || l.includes('builder-columns')) {
    console.log((i+1) + ': ' + l.trim());
  }
});
