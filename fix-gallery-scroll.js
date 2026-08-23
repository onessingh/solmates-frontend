const fs = require('fs');
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');

// Remove the desktop override that removes max-height (was making gallery expand fully)
css = css.replace(
    'html.is-desktop .tpl-gallery { max-height: none !important; overflow-y: visible !important; overflow-x: visible !important; }',
    'html.is-desktop .tpl-gallery { max-height: 580px !important; overflow-y: auto !important; overflow-x: hidden !important; }'
);
// Also fix the @media fallback
css = css.replace(
    '.tpl-gallery { max-height: none !important; overflow-y: visible !important; }',
    '.tpl-gallery { max-height: 580px !important; overflow-y: auto !important; }'
);

fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('Gallery scroll restored for desktop!');
