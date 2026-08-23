const fs = require('fs');
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');

// The block under "AESTHETIC ARCH" contains those !important sizes
css = css.replace(/width: 120px !important;/g, 'width: 140px !important;');
css = css.replace(/height: 120px !important;/g, 'height: 140px !important;');

fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('Fixed important size overrides');
