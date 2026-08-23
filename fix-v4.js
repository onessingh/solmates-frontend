const fs = require('fs');
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');

// 1. Resume Builder Form scrolling: remove from form-panel
// Find where I set max-height on form-panel for desktop and change it to none.
css = css.replace(/html\.is-desktop \.form-panel \{[^}]+\}/g, 
  `html.is-desktop .form-panel { max-width: 100% !important; width: 100% !important; margin: 0 !important; max-height: none !important; overflow-y: visible !important; position: static !important; }`);
// Also do it for the @media block just in case
css = css.replace(/\.form-panel \{ max-width: 100% !important; width: 100% !important; margin: 0 !important; max-height: calc\(100vh - 160px\) !important; overflow-y: auto !important; position: sticky !important; top: 60px !important; \}/g,
  `.form-panel { max-width: 100% !important; width: 100% !important; margin: 0 !important; max-height: none !important; overflow-y: visible !important; position: static !important; }`);


// 2. JD Match Full screen:
// JD match might have max-width inside jd-panel or something. Let's make sure everything is 100%
css += `
html.is-desktop .jd-match .jd-panel { max-width: 100% !important; width: 100% !important; }
html.is-desktop .jd-match-body { max-width: 100% !important; width: 100% !important; }
`;

// 3. Templates: 3 columns, internal scroll
// Find where I set grid-template-columns: repeat(5, 1fr) and change to 3.
css = css.replace(/grid-template-columns: repeat\(5, 1fr\)/g, `grid-template-columns: repeat(3, 1fr)`);

// Change the tpl-gallery overflow to auto with a specific max-height so it scrolls inside
css = css.replace(/html\.is-desktop \.tpl-gallery \{ max-height: none !important; overflow-y: visible !important; overflow: visible !important; \}/g, 
  `html.is-desktop .tpl-gallery { max-height: 600px !important; overflow-y: auto !important; overflow-x: hidden !important; }`);

// Also for the @media block fallback
css = css.replace(/\.tpl-gallery \{ max-height: none !important; overflow-y: visible !important; \}/g, 
  `.tpl-gallery { max-height: 600px !important; overflow-y: auto !important; }`);

fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('CSS fixed for v4 rules!');
