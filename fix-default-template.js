const fs = require('fs');

// 1. Fix script.js initial state
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');
js = js.replace('selectedTemplate: "finance",', 'selectedTemplate: "floralSidebar",');
fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');
console.log('script.js: selectedTemplate changed to floralSidebar');

// 2. Fix index.html - make sure floralSidebar card has active class and others dont
let html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');

// Remove active class from any existing active template card
html = html.replace(/class="template-card active" data-template="/g, 'class="template-card" data-template="');

// Add active class to floralSidebar card
html = html.replace('class="template-card" data-template="floralSidebar"', 'class="template-card active" data-template="floralSidebar"');

fs.writeFileSync('tools/resumebuilder/index.html', html, 'utf8');
console.log('index.html: floralSidebar card set as active');

// Verify
const htmlCheck = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');
const match = htmlCheck.match(/class="template-card active" data-template="(\w+)"/);
console.log('Active template card:', match ? match[1] : 'NONE FOUND');
