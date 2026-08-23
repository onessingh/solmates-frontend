const fs = require('fs');
const js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');
const html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');

// Show lines with selectedTemplate in state/init
const jsLines = js.split('\n');
jsLines.forEach((l, i) => {
  if (l.includes('selectedTemplate') && (l.includes('finance') || l.includes('floralSidebar') || l.includes('teacher') || l.includes('social'))) {
    console.log('JS ' + (i+1) + ': ' + l.trim());
  }
});

// Find active template card
const activeMatch = html.match(/class="template-card active" data-template="([^"]+)"/);
console.log('Active card in HTML:', activeMatch ? activeMatch[1] : 'NONE');

// Check for teacher in script
const teacherIdx = js.indexOf('"teacher"');
console.log('Teacher template key in script:', teacherIdx !== -1 ? 'FOUND at ' + teacherIdx : 'NOT FOUND');
