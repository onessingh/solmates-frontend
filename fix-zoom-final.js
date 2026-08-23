const fs = require('fs');
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');
// Change zoom from 0.63 to 0.53 (10% more out)
css = css.replace('zoom: 0.63;', 'zoom: 0.53;');
fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('Zoom changed to 53%!');
