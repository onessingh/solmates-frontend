const fs = require('fs');
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');

css = css.replace(/html\.is-desktop \.builder-columns > \.templates \{\s*grid-column: span 2 !important;\s*width: 100% !important;\s*\}/g, 
`/* Templates takes 1 column, Preview takes 1 column */
html.is-desktop .builder-columns > .templates {
    grid-column: span 1 !important;
}`);

fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('Fixed templates span back to 1 column');
