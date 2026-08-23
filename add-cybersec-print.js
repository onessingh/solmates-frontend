const fs = require('fs');
let script = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

const printStyles = `
          body.template-cybersec {
              background: #0d1117 !important;
              -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
          }
          body.template-pin-dark {
`;
script = script.replace('body.template-pin-dark {', printStyles);
fs.writeFileSync('tools/resumebuilder/script.js', script, 'utf8');
console.log('Added cybersec print styles.');
