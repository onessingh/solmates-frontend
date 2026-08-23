const fs = require('fs');

// 1. Update script.js
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');
js = js.replace('saved.selectedTemplate || "ats"', 'saved.selectedTemplate || "floralSidebar"');

// Fix handleExport to handle BOTH buttons
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

js = js.replace(oldHandleExport, newHandleExport);

// Now fix the reset part inside handleExport
const oldReset = `        exportBtn.innerHTML = originalBtnHtml;
        exportBtn.disabled = false;
        isExporting = false;`;

const newReset = `        if (exportBtnPreview) {
          exportBtnPreview.innerHTML = originalBtnHtmlPreview;
          exportBtnPreview.disabled = false;
        }
        if (exportBtnWizard) {
          exportBtnWizard.innerHTML = originalBtnHtmlWizard;
          exportBtnWizard.disabled = false;
        }
        isExporting = false;`;

js = js.replace(oldReset, newReset);

fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');
console.log('Fixed script.js defaults and buttons');

// 2. Update index.html
let html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');
html = html.replace('<article class="template-card active" data-template="finance">', '<article class="template-card" data-template="finance">');
html = html.replace('<article class="template-card active" data-template="ats">', '<article class="template-card" data-template="ats">');
html = html.replace('<article class="template-card" data-template="floralSidebar">', '<article class="template-card active" data-template="floralSidebar">');

fs.writeFileSync('tools/resumebuilder/index.html', html, 'utf8');
console.log('Fixed index.html defaults');

