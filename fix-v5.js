const fs = require('fs');
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');

css += `
/* Make Preview Panel sticky so it stays visible while scrolling the long form */
html.is-desktop .preview-panel { 
    position: sticky !important; 
    top: 20px !important; 
    max-height: calc(100vh - 40px) !important; 
    overflow-y: auto !important; 
}

/* Ensure JD Match input area spans full width */
html.is-desktop .jd-input-panel {
    max-width: 100% !important;
}
`;

fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('Sticky preview added!');
