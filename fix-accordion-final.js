const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/wizard.js', 'utf8');

// FIX 1: In initAccordions(), line 245 closes ALL .accordion-content including template gallery.
// Add a check to NOT close template-accordion-content on desktop.
js = js.replace(
    `document.querySelectorAll(".accordion-content").forEach(c => { c.classList.remove("open"); c.style.display = "none"; });`,
    `document.querySelectorAll(".accordion-content").forEach(c => {
                    // Never close template gallery accordion on desktop
                    if (c.id === "template-accordion-content" && (document.documentElement.classList.contains('is-desktop') || window.screen.width >= 900)) return;
                    c.classList.remove("open"); c.style.display = "none";
                });`
);

// FIX 2: Replace the DOMContentLoaded block for template accordion (lines 261-276)
// to be desktop-aware: always open on desktop, toggle on phone.
const oldTemplateAccordion = `document.addEventListener("DOMContentLoaded", () => {
    const tempHeader = document.getElementById("templates-accordion-header");
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
    }
});`;

const newTemplateAccordion = `document.addEventListener("DOMContentLoaded", () => {
    const tempHeader = document.getElementById("templates-accordion-header");
    const tempContent = document.getElementById("template-accordion-content");
    const isDesktopDevice = document.documentElement.classList.contains('is-desktop') || window.screen.width >= 900;
    if(tempHeader && tempContent) {
        if (isDesktopDevice) {
            // DESKTOP: always open by default, no toggle
            tempContent.style.display = "block";
            if(tempHeader.querySelector(".accordion-icon")) {
                tempHeader.querySelector(".accordion-icon").style.transform = "rotate(180deg)";
            }
            tempHeader.style.cursor = "default";
            // No click handler added for desktop
        } else {
            // PHONE: accordion toggle as before
            tempHeader.addEventListener("click", () => {
                const isOpen = tempContent.style.display === "block";
                if(isOpen) {
                    tempContent.style.display = "none";
                    if(tempHeader.querySelector(".accordion-icon")) tempHeader.querySelector(".accordion-icon").style.transform = "rotate(0deg)";
                } else {
                    tempContent.style.display = "block";
                    if(tempHeader.querySelector(".accordion-icon")) tempHeader.querySelector(".accordion-icon").style.transform = "rotate(180deg)";
                }
            });
        }
    }
});`;

js = js.replace(oldTemplateAccordion, newTemplateAccordion);

fs.writeFileSync('tools/resumebuilder/wizard.js', js, 'utf8');
console.log('Accordion fix applied!');

// Verify
const result = fs.readFileSync('tools/resumebuilder/wizard.js', 'utf8');
if (result.includes('DESKTOP: always open by default')) {
    console.log('Verified: Desktop accordion fix is in place!');
} else {
    console.log('WARNING: Fix may not have applied!');
}
