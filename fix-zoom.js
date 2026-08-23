const fs = require('fs');
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');

// Add zoom to the is-desktop html element
// Find the compact rule block and add zoom
css = css.replace(
    'html.is-desktop {\n    --space-4: 12px !important;\n    --space-5: 16px !important;\n    --space-6: 20px !important;\n    --space-7: 24px !important;\n    font-size: 14px;\n}',
    'html.is-desktop {\n    zoom: 0.73;\n}'
);

fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('Zoom set to 73% for desktop!');
