const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/wizard.js', 'utf8');

// Replace the entire broken initTabs function
const oldInitTabs = js.substring(
  js.indexOf('function initTabs() {'),
  js.indexOf('const totalSteps = 8;')
);

const newInitTabs = `function initTabs() {
    const tabs = document.querySelectorAll(".rb-tab");
    const formPanel = document.querySelector(".form-panel");
    const jdMatch = document.getElementById("jd-match");
    const templates = document.getElementById("templates");
    const wizardHeader = document.querySelector(".wizard-header");
    const previewPanel = document.querySelector(".preview-panel");

    // Initially hide jd-match and templates, show preview on desktop
    if(jdMatch) jdMatch.style.display = "none";
    if(templates) templates.style.display = "none";
    const isDesktop = document.documentElement.classList.contains('is-desktop') || window.screen.width >= 900;
    if(previewPanel) previewPanel.style.display = isDesktop ? "block" : "none";

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const target = tab.dataset.tab;
            const isDesktop = document.documentElement.classList.contains('is-desktop') || window.screen.width >= 900;

            if(formPanel) formPanel.style.display = (target === "builder") ? "block" : "none";
            if(wizardHeader) wizardHeader.style.display = (target === "builder") ? "flex" : "none";

            if(jdMatch) {
                jdMatch.style.display = (target === "jd") ? "block" : "none";
                if (target === "jd") {
                    // Force full width on desktop - span both grid columns
                    jdMatch.style.width = "100%";
                    jdMatch.style.maxWidth = "100%";
                    jdMatch.style.boxSizing = "border-box";
                    jdMatch.style.gridColumn = "1 / -1";
                }
            }

            if(templates) templates.style.display = (target === "templates") ? "block" : "none";

            if(previewPanel) {
                if (isDesktop) {
                    // Desktop: preview visible on builder + templates, hidden on JD (JD is full width)
                    previewPanel.style.display = (target === "builder" || target === "templates") ? "block" : "none";
                } else {
                    // Mobile: preview only visible on templates tab
                    previewPanel.style.display = (target === "templates") ? "block" : "none";
                }
            }
        });
    });
}

`;

js = js.replace(oldInitTabs, newInitTabs);
fs.writeFileSync('tools/resumebuilder/wizard.js', js, 'utf8');
console.log('initTabs rewritten cleanly!');

// Verify it looks right
const verify = fs.readFileSync('tools/resumebuilder/wizard.js', 'utf8');
const start = verify.indexOf('function initTabs()');
const end = verify.indexOf('const totalSteps = 8;');
console.log('--- initTabs content ---');
console.log(verify.substring(start, end));
console.log('--- end ---');
