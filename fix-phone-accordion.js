const fs = require('fs');

// 1. HTML: revert accordion content back to display:none (phone gets accordion back)
let html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');
html = html.replace(
    'id="template-accordion-content" style="display:block;"',
    'id="template-accordion-content" style="display:none;"'
);
fs.writeFileSync('tools/resumebuilder/index.html', html, 'utf8');
console.log('HTML accordion reverted to none (phone gets accordion back)');

// 2. wizard.js: restore accordion toggle but skip it on desktop
let js = fs.readFileSync('tools/resumebuilder/wizard.js', 'utf8');

// Find the accordion section and replace with desktop-aware version
const oldAccordion = `    const tempHeader = document.getElementById("templates-accordion-header");
    const tempContent = document.getElementById("template-accordion-content");
    // Always keep template gallery open - no accordion toggle needed
    if(tempContent) tempContent.style.display = "block";`;

const newAccordion = `    const tempHeader = document.getElementById("templates-accordion-header");
    const tempContent = document.getElementById("template-accordion-content");
    const isDesktopForAccordion = document.documentElement.classList.contains('is-desktop') || window.screen.width >= 900;
    if(isDesktopForAccordion) {
        // Desktop: always open, no toggle
        if(tempContent) tempContent.style.display = "block";
        if(tempHeader) tempHeader.style.cursor = "default";
    } else {
        // Phone: accordion toggle as before
        if(tempHeader && tempContent) {
            tempHeader.addEventListener("click", () => {
                const isOpen = tempContent.style.display === "block";
                if(isOpen) {
                    tempContent.style.display = "none";
                    const icon = tempHeader.querySelector(".accordion-icon");
                    if(icon) icon.style.transform = "rotate(0deg)";
                } else {
                    tempContent.style.display = "block";
                    const icon = tempHeader.querySelector(".accordion-icon");
                    if(icon) icon.style.transform = "rotate(180deg)";
                }
            });
        }
    }`;

js = js.replace(oldAccordion, newAccordion);
fs.writeFileSync('tools/resumebuilder/wizard.js', js, 'utf8');
console.log('Wizard.js accordion fixed!');
