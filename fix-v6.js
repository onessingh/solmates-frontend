const fs = require('fs');
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');

css += `
/* JD Match should span both columns in the CSS grid to be full screen width */
html.is-desktop .jd-match {
    grid-column: 1 / -1 !important;
}
`;

fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('JD Match grid column fixed!');
