const fs = require('fs');
const html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');

const getMatches = (block) => {
  const matches = [...block.matchAll(/data-template="(.*?)"/g)];
  return matches.map(m => m[1]);
}

const cat3 = html.substring(html.indexOf('<h3>Corporate & Finance</h3>'), html.indexOf('<h3>Premium Sidebar Layouts</h3>'));
const cat4 = html.substring(html.indexOf('<h3>Premium Sidebar Layouts</h3>'), html.indexOf('<h3>Pinterest / Aesthetic</h3>'));
const cat5 = html.substring(html.indexOf('<h3>Pinterest / Aesthetic</h3>'), html.indexOf('<h3>Creative & Bold</h3>'));

console.log('--- Corp & Finance ---');
console.log(getMatches(cat3));
console.log('--- Premium Sidebar ---');
console.log(getMatches(cat4));
console.log('--- Pinterest ---');
console.log(getMatches(cat5));
