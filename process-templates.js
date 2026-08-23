const fs = require('fs');

const html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');

// Find the start and end of template-grid
const startStr = '<div class="template-grid" id="template-grid">';
const startIndex = html.indexOf(startStr);
if (startIndex === -1) {
    console.error('Could not find template-grid start');
    process.exit(1);
}

// Find the end of template-grid.
// Since template-grid contains many <article> tags, we look for the closing </div> that matches it.
// The easiest way is to look for the end of the accordion-content
const endStr = '</div>\n        </div>\n      </section>\n\n      <!-- JD Evaluator -->';
const endIndex = html.indexOf(endStr, startIndex);
if (endIndex === -1) {
    console.error('Could not find template-grid end');
    process.exit(1);
}

const templatesHtml = html.substring(startIndex + startStr.length, endIndex);

// Extract all cards
const cards = [];
const cardRegex = /<article class="template-card" data-template="([^"]+)">[\s\S]*?<\/article>/g;
let match;
while ((match = cardRegex.exec(templatesHtml)) !== null) {
    cards.push({
        id: match[1],
        html: match[0]
    });
}

console.log('Found ' + cards.length + ' template cards');

const categories = [
    { title: "ATS & Minimal", keywords: ["ats", "software", "compact", "awesomecv"] },
    { title: "Classic & Formal", keywords: ["mckinsey", "harvard", "ibanker", "executive", "ca", "zetty"] },
    { title: "Premium Sidebars", keywords: ["modernSidebar", "forestSidebar", "slateModern", "floralSidebar", "monochromeSplit", "emeraldSplit"] },
    { title: "Pinterest Aesthetic", keywords: ["pin-arch", "pin-pink", "pin-dark", "pin-yellow", "pin-banner"] },
    { title: "Developer / JSON", keywords: ["jsonelegant", "jsonmacchiato", "jsonflat", "deekay", "hacker"] },
    { title: "Creative & Overlap", keywords: ["navyOverlap", "centerArch", "chiron", "designer", "marketing"] },
    { title: "Specialized", keywords: ["academic", "researcher", "nurse"] }
];

let remainingCards = [...cards];
const categorizedHtml = [];

for (const cat of categories) {
    let catCards = [];
    cat.keywords.forEach(kw => {
        // find all cards matching kw
        const matched = remainingCards.filter(c => c.id.includes(kw));
        catCards.push(...matched);
        remainingCards = remainingCards.filter(c => !c.id.includes(kw));
    });
    
    if (catCards.length > 0) {
        categorizedHtml.push(
            '<div class="template-category-section" style="margin-bottom: 30px;">' +
            '<h3 style="font-size: 1.1rem; color: var(--color-ink); margin-bottom: 15px; padding-bottom: 8px; border-bottom: 1px solid var(--color-border); font-weight: 700;">' + cat.title + '</h3>' +
            '<div class="template-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;">\n' +
            catCards.map(c => c.html).join('\n') +
            '\n</div></div>'
        );
    }
}

if (remainingCards.length > 0) {
    categorizedHtml.push(
        '<div class="template-category-section" style="margin-bottom: 30px;">' +
        '<h3 style="font-size: 1.1rem; color: var(--color-ink); margin-bottom: 15px; padding-bottom: 8px; border-bottom: 1px solid var(--color-border); font-weight: 700;">More Templates</h3>' +
        '<div class="template-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;">\n' +
        remainingCards.map(c => c.html).join('\n') +
        '\n</div></div>'
    );
}

const newHtml = html.substring(0, startIndex) +
    '<div class="template-category-container" id="template-grid">\n' +
    categorizedHtml.join('\n') +
    '\n' +
    html.substring(endIndex);

fs.writeFileSync('tools/resumebuilder/index.html', newHtml, 'utf8');
console.log('Done!');
