const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

const exportBtnStart = js.indexOf('const exportBtn = document.querySelector(\'[data-action="print-form"]\');');
const exportBtnEnd = js.indexOf('setProgress(5, \'Preparing...\');', exportBtnStart);

if (exportBtnStart !== -1 && exportBtnEnd !== -1) {
  const newLogic = `    const exportBtnPreview = document.querySelector('[data-action="print-form"]');
    const exportBtnWizard = document.getElementById('wizard-print');
    
    const originalBtnHtmlPreview = exportBtnPreview ? exportBtnPreview.innerHTML : "";
    const originalBtnHtmlWizard = exportBtnWizard ? exportBtnWizard.innerHTML : "";
    
    if (exportBtnPreview) exportBtnPreview.disabled = true;
    if (exportBtnWizard) exportBtnWizard.disabled = true;

    // -- Animated progress counter (fake but realistic) --
    let progressVal = 0;
    const setProgress = (pct, label) => {
      progressVal = pct;
      const spinner = \`<i class="fas fa-circle-notch fa-spin"></i> Generating PDF... \${pct}%\`;
      if (exportBtnPreview) exportBtnPreview.innerHTML = spinner;
      if (exportBtnWizard) exportBtnWizard.innerHTML = spinner;
    };
    `;
    
  js = js.substring(0, exportBtnStart) + newLogic + js.substring(exportBtnEnd);
  
  // Now replace the reset part
  const resetStart = js.indexOf('exportBtn.innerHTML = originalBtnHtml;', exportBtnEnd);
  const resetEnd = js.indexOf('isExporting = false;', resetStart) + 'isExporting = false;'.length;
  
  if (resetStart !== -1) {
    const newReset = `if (exportBtnPreview) {
          exportBtnPreview.innerHTML = originalBtnHtmlPreview;
          exportBtnPreview.disabled = false;
        }
        if (exportBtnWizard) {
          exportBtnWizard.innerHTML = originalBtnHtmlWizard;
          exportBtnWizard.disabled = false;
        }
        isExporting = false;`;
    js = js.substring(0, resetStart) + newReset + js.substring(resetEnd);
    
    fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');
    console.log('Successfully replaced export button logic!');
  } else {
    console.log('Failed to find reset logic.');
  }
} else {
  console.log('Failed to find export button logic.');
}

