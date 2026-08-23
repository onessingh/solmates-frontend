const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/wizard.js', 'utf8');

const target1 = `if(previewPanel) previewPanel.style.display = "none";`;
const repl1 = `const isDesktop = window.innerWidth >= 900 || document.documentElement.classList.contains('is-desktop');
    if(previewPanel) previewPanel.style.display = isDesktop ? "block" : "none";`;
js = js.replace(target1, repl1);

const target2 = `if(previewPanel) previewPanel.style.display = (target === "templates") ? "block" : "none";`;
const repl2 = `if(previewPanel) {
                const isDesktop = window.innerWidth >= 900 || document.documentElement.classList.contains('is-desktop');
                if (isDesktop) {
                    previewPanel.style.display = (target === "builder" || target === "templates") ? "block" : "none";
                } else {
                    previewPanel.style.display = (target === "templates") ? "block" : "none";
                }
            }`;
js = js.replace(target2, repl2);

fs.writeFileSync('tools/resumebuilder/wizard.js', js, 'utf8');
console.log('Fixed properly!');
