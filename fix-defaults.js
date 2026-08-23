const fs = require('fs');

// index.html
let html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');
html = html.replace('<article class="template-card active" data-template="finance">', '<article class="template-card" data-template="finance">');
html = html.replace('<article class="template-card active" data-template="ats">', '<article class="template-card" data-template="ats">');
html = html.replace('<article class="template-card" data-template="floralSidebar">', '<article class="template-card active" data-template="floralSidebar">');
fs.writeFileSync('tools/resumebuilder/index.html', html, 'utf8');

// script.js
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');
js = js.replace('saved.selectedTemplate || "ats"', 'saved.selectedTemplate || "floralSidebar"');

const oldHandleExport = `    const exportBtn = document.querySelector('[data-action="print-form"]');
    const originalBtnHtml = exportBtn.innerHTML;
    exportBtn.disabled = true;

    // -- Animated progress counter (fake but realistic) --
    let progressVal = 0;
    const setProgress = (pct, label) => {
      progressVal = pct;
      exportBtn.innerHTML = \\\`<i class="fas fa-circle-notch fa-spin"></i> Generating PDF... \${pct}%\`;
    };`;

const newHandleExport = `    const exportBtnPreview = document.querySelector('[data-action="print-form"]');
    const exportBtnWizard = document.getElementById('wizard-print');
    
    const originalBtnHtmlPreview = exportBtnPreview ? exportBtnPreview.innerHTML : "";
    const originalBtnHtmlWizard = exportBtnWizard ? exportBtnWizard.innerHTML : "";
    
    if (exportBtnPreview) exportBtnPreview.disabled = true;
    if (exportBtnWizard) exportBtnWizard.disabled = true;

    // -- Animated progress counter (fake but realistic) --
    let progressVal = 0;
    const setProgress = (pct, label) => {
      progressVal = pct;
      const spinner = \\\`<i class="fas fa-circle-notch fa-spin"></i> Generating PDF... \${pct}%\`;
      if (exportBtnPreview) exportBtnPreview.innerHTML = spinner;
      if (exportBtnWizard) exportBtnWizard.innerHTML = spinner;
    };`;
js = js.replace(oldHandleExport.replace(/\\`/g, '`'), newHandleExport.replace(/\\`/g, '`'));

const oldReset = `        setTimeout(() => {
          exportBtn.innerHTML = originalBtnHtml;
          exportBtn.disabled = false;
        }, 500);`;

const newReset = `        setTimeout(() => {
          if (exportBtnPreview) {
            exportBtnPreview.innerHTML = originalBtnHtmlPreview;
            exportBtnPreview.disabled = false;
          }
          if (exportBtnWizard) {
            exportBtnWizard.innerHTML = originalBtnHtmlWizard;
            exportBtnWizard.disabled = false;
          }
        }, 500);`;
js = js.replace(oldReset, newReset);

fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');
console.log('Fixed properly!');
