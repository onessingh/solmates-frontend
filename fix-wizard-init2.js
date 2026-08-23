const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/wizard.js', 'utf8');

const newInit = `function initializeWizardApp() {
    initTabs();
    initWizard();
    setTimeout(() => {
        initChips();
        initAccordions();
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initializeWizardApp);
} else {
    initializeWizardApp();
}
`;

// Replace the first 9 lines
const lines = js.split('\n');
lines.splice(0, 9, newInit);
js = lines.join('\n');

fs.writeFileSync('tools/resumebuilder/wizard.js', js, 'utf8');
console.log('wizard.js initialization fixed!');
