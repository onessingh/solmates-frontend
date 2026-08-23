const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/wizard.js', 'utf8');

const regex = /document\.addEventListener\("DOMContentLoaded", \(\) => \{\n    initTabs\(\);\n    initWizard\(\);\n    setTimeout\(\(\) => \{\n        initChips\(\);\n        initAccordions\(\);\n        \n    \}, 100\);\n\}\);/;

const replacement = `function initializeWizardApp() {
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
}`;

js = js.replace(regex, replacement);

fs.writeFileSync('tools/resumebuilder/wizard.js', js, 'utf8');
console.log('Fixed wizard.js initialization logic!');
