const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/wizard.js', 'utf8');

// Find and replace the entire broken initAccordions function
const startMarker = 'function initAccordions() {';
const endMarker = '// Template gallery accordion';

const start = js.indexOf(startMarker);
const end = js.indexOf(endMarker);

if (start === -1 || end === -1) {
    console.log('Markers not found! start:', start, 'end:', end);
    process.exit(1);
}

const before = js.substring(0, start);
const after = js.substring(end);

const cleanAccordions = `function initAccordions() {
    const additional = ["certifications", "projects", "internships", "awards", "publications", "volunteer", "leadership", "languages", "references", "personalDetails"];
    additional.forEach(secName => {
        const s = document.querySelector('[data-section-form="' + secName + '"]');
        if (s) {
            s.classList.add("accordion-section");
            const header = s.querySelector(".section-header");
            header.style.cursor = "pointer";
            header.innerHTML += ' <i class="fas fa-chevron-down accordion-icon"></i>';
            const contentWrap = document.createElement("div");
            contentWrap.className = "accordion-content";

            while(s.childNodes.length > 2) {
                contentWrap.appendChild(s.lastChild);
            }
            s.appendChild(contentWrap);

            header.addEventListener("click", () => {
                const isOpen = contentWrap.classList.contains("open");
                document.querySelectorAll(".accordion-content").forEach(c => {
                    // Never close template gallery on desktop
                    if (c.id === "template-accordion-content" && (document.documentElement.classList.contains('is-desktop') || window.screen.width >= 900)) return;
                    c.classList.remove("open");
                    c.style.display = "none";
                });
                document.querySelectorAll(".accordion-icon").forEach(i => i.style.transform = "rotate(0deg)");

                if (!isOpen) {
                    contentWrap.style.display = "block";
                    contentWrap.classList.add("open");
                    header.querySelector(".accordion-icon").style.transform = "rotate(180deg)";
                }
            });
        }
    });
}

`;

js = before + cleanAccordions + after;
fs.writeFileSync('tools/resumebuilder/wizard.js', js, 'utf8');
console.log('initAccordions rewritten!');
