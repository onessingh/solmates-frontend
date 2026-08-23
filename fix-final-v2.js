const fs = require('fs');

// 1. Restore phone gallery scrolling in HTML
let html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');
html = html.replace(
    '.tpl-gallery { display: flex; flex-direction: column; gap: 32px; padding: 4px 12px 12px 4px;  }',
    '.tpl-gallery { display: flex; flex-direction: column; gap: 32px; padding: 4px 12px 12px 4px; max-height: 520px; overflow-y: auto; }'
);
fs.writeFileSync('tools/resumebuilder/index.html', html, 'utf8');
console.log('Phone gallery scroll restored!');

// 2. Fix zoom from 0.73 to 0.63
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');
css = css.replace('zoom: 0.73;', 'zoom: 0.63;');

// Make sure desktop overrides phone scroll
// Already have: html.is-desktop .tpl-gallery { max-height: 600px !important; overflow-y: auto !important; }
// But we want NO height limit on desktop. Fix this:
css = css.replace(
    'html.is-desktop .tpl-gallery { max-height: 600px !important; overflow-y: auto !important; overflow-x: hidden !important; }',
    'html.is-desktop .tpl-gallery { max-height: none !important; overflow-y: visible !important; overflow-x: visible !important; }'
);
// Fix the media query fallback too
css = css.replace(
    '.tpl-gallery { max-height: 600px !important; overflow-y: auto !important; }',
    '.tpl-gallery { max-height: none !important; overflow-y: visible !important; }'
);

fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('Zoom changed to 63% and desktop gallery has no height limit!');
