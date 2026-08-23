const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

const oldReset = `        setTimeout(() => {
          exportBtn.innerHTML = originalBtnHtml;
          exportBtn.disabled = false;
        }, 1200);`;

const newReset = `        setTimeout(() => {
          if (exportBtnPreview) {
            exportBtnPreview.innerHTML = originalBtnHtmlPreview;
            exportBtnPreview.disabled = false;
          }
          if (exportBtnWizard) {
            exportBtnWizard.innerHTML = originalBtnHtmlWizard;
            exportBtnWizard.disabled = false;
          }
        }, 1200);`;

js = js.replace(oldReset, newReset);

fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');
console.log('Fixed reset block');
