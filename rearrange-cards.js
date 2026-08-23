const fs = require('fs');
let html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');

const extractCard = (key) => {
  let startStr = `<article class="template-card" data-template="${key}">`;
  let start = html.indexOf(startStr);
  if (start === -1) {
    startStr = `<article class="template-card active" data-template="${key}">`;
    start = html.indexOf(startStr);
    if (start === -1) return null;
  }
  const endStr = '</article>';
  const end = html.indexOf(endStr, start) + endStr.length;
  
  const cardHtml = html.substring(start, end);
  
  // Remove the card from its original location (including trailing spaces/newlines if possible)
  // Let's just remove the exact match
  html = html.replace(cardHtml, '');
  return cardHtml;
}

const execCard = extractCard('executive');
const aweCard = extractCard('awesomecv');
const kakashiCard = extractCard('kakashi');

console.log('Cards extracted:', !!execCard, !!aweCard, !!kakashiCard);

// Now we need to insert them into the target sections.
// We can find the target categories by their headers and then the next `<div class="tpl-grid">`
const insertIntoCategory = (categoryTitle, cards) => {
  const catIndex = html.indexOf(`<h3>${categoryTitle}</h3>`);
  if (catIndex === -1) {
    console.log('Category not found:', categoryTitle);
    return;
  }
  const gridIndex = html.indexOf('<div class="tpl-grid">', catIndex);
  if (gridIndex === -1) return;
  
  const insertionPoint = gridIndex + '<div class="tpl-grid">'.length;
  html = html.substring(0, insertionPoint) + '\n              ' + cards.join('\n              ') + html.substring(insertionPoint);
}

if (execCard) {
  insertIntoCategory('Premium Sidebar Layouts', [execCard]);
}
if (aweCard || kakashiCard) {
  const toInsert = [];
  if (aweCard) toInsert.push(aweCard);
  if (kakashiCard) toInsert.push(kakashiCard);
  insertIntoCategory('Pinterest / Aesthetic', toInsert);
}

// Clean up extra blank lines that might have been left behind
html = html.replace(/\n\s*\n\s*\n/g, '\n\n');

fs.writeFileSync('tools/resumebuilder/index.html', html, 'utf8');
console.log('Moved cards successfully.');
