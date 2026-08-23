const fs = require('fs');

// 1. Fix accordion - change to display:block in HTML
let html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');
html = html.replace(
    'id="template-accordion-content" style="display:none;"',
    'id="template-accordion-content" style="display:block;"'
);
fs.writeFileSync('tools/resumebuilder/index.html', html, 'utf8');
console.log('Accordion fixed in HTML');

// 2. Fix wizard.js - add inline style to JD match for full width, and fix accordion
let js = fs.readFileSync('tools/resumebuilder/wizard.js', 'utf8');

// In the tab click handler, add inline width to jd match
const old = `            if(formPanel) formPanel.style.display = (target === "builder") ? "block" : "none";
            if(wizardHeader) wizardHeader.style.display = (target === "builder") ? "flex" : "none";
            if(jdMatch) jdMatch.style.display = (target === "jd") ? "block" : "none";`;

const newJs = `            if(formPanel) formPanel.style.display = (target === "builder") ? "block" : "none";
            if(wizardHeader) wizardHeader.style.display = (target === "builder") ? "flex" : "none";
            if(jdMatch) {
                jdMatch.style.display = (target === "jd") ? "block" : "none";
                if (target === "jd") {
                    // Force full width for JD Match on desktop
                    jdMatch.style.width = "100%";
                    jdMatch.style.maxWidth = "100%";
                    jdMatch.style.boxSizing = "border-box";
                    jdMatch.style.gridColumn = "1 / -1";
                }
            }`;

js = js.replace(old, newJs);

// Also disable accordion click handler
const oldAccordion = `    const tempHeader = document.getElementById("templates-accordion-header");
    const tempContent = document.getElementById("template-accordion-content");
    if(tempHeader && tempContent) {
        tempHeader.addEventListener("click", () => {
            const isOpen = tempContent.style.display === "block";
            if(isOpen) {
                tempContent.style.display = "none";
                tempHeader.querySelector(".accordion-icon").style.transform = "rotate(0deg)";
            } else {
                tempContent.style.display = "block";
                tempHeader.querySelector(".accordion-icon").style.transform = "rotate(180deg)";
            }
        });
    }`;

const newAccordion = `    const tempHeader = document.getElementById("templates-accordion-header");
    const tempContent = document.getElementById("template-accordion-content");
    // Always keep template gallery open - no accordion toggle needed
    if(tempContent) tempContent.style.display = "block";`;

js = js.replace(oldAccordion, newAccordion);

fs.writeFileSync('tools/resumebuilder/wizard.js', js, 'utf8');
console.log('Wizard.js fixed!');
