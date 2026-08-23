const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/wizard.js', 'utf8');

// Remove the orphaned code at the end (lines 260-268)
js = js.replace(
`        // Give script.js a few ms to do its DOM manipulation
        setTimeout(() => {
            if(window.currentWizardStep) {
                // We need a global way to trigger showStep, let's dispatch an event
                document.dispatchEvent(new Event("wizardRefresh"));
            }
        }, 10);
    }
}, true);`,
``
);

// Append proper code at the end
js = js.trimEnd() + `

// Template gallery accordion - desktop open by default, phone toggles
document.addEventListener("DOMContentLoaded", () => {
    const tempHeader = document.getElementById("templates-accordion-header");
    const tempContent = document.getElementById("template-accordion-content");
    if(tempHeader && tempContent) {
        const isDesktopDevice = document.documentElement.classList.contains('is-desktop') || window.screen.width >= 900;
        if (isDesktopDevice) {
            // DESKTOP: always open, no click toggle
            tempContent.style.display = "block";
            tempHeader.style.cursor = "default";
            const icon = tempHeader.querySelector(".accordion-icon");
            if(icon) icon.style.transform = "rotate(180deg)";
        } else {
            // PHONE: accordion toggle
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
    }
});

// Hook into Section Manager clicks to re-enforce wizard visibility
document.addEventListener("click", (e) => {
    if(e.target.closest("#section-manager")) {
        setTimeout(() => {
            if(window.currentWizardStep) {
                document.dispatchEvent(new Event("wizardRefresh"));
            }
        }, 10);
    }
}, true);
`;

fs.writeFileSync('tools/resumebuilder/wizard.js', js, 'utf8');
console.log('wizard.js fixed!');
console.log('Last 30 lines:');
const lines = js.split('\n');
lines.slice(-30).forEach((l, i) => console.log((lines.length - 30 + i + 1) + ': ' + l));
