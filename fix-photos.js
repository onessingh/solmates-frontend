const fs = require('fs');
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');

// Increase template-social
css = css.replace(/width: 110px;\s*height: 130px;/g, 'width: 130px;\n  height: 150px;');

// Increase pin-arch
css = css.replace(/width: 110px; height: 140px;/g, 'width: 130px; height: 160px;');

// Increase pin-banner
css = css.replace(/width: 120px; height: 120px;/g, 'width: 140px; height: 140px;');

// Increase executive
css = css.replace(/width: 120px; height: 120px;/g, 'width: 140px; height: 140px;');

fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('Photos scaled up.');
