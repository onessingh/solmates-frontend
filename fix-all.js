const fs = require('fs');

// 1. Script.js changes
let script = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');
script = script.replace('alert("Resume data saved to browser local storage.");', 'alert("Resume saved!");');
script = script.replace(/if\s*\(dom\.saveBtn\)\s*dom\.saveBtn\.addEventListener\("click",\s*\(\)\s*=>\s*\{\s*saveState\(\);\s*alert\("Resume saved!"\);\s*\}\);/, '// dom.saveBtn listener removed');
fs.writeFileSync('tools/resumebuilder/script.js', script, 'utf8');

// 2. Wizard.js changes
let wizard = fs.readFileSync('tools/resumebuilder/wizard.js', 'utf8');

// Remove extra alert
wizard = wizard.replace('alert("Resume finalized and saved!");', '// alert removed');

// Modify the Download PDF button logic
wizard = wizard.replace(/const btnPrint = document\.getElementById\("wizard-print"\);/, 'const btnPrint = document.getElementById("wizard-templates");');
wizard = wizard.replace(/if\(btnPrint\)\s*btnPrint\.addEventListener\("click",\s*\(\)\s*=>\s*\{\s*if\(window\.exportResume\)\s*window\.exportResume\(\);\s*\}\);/, `if(btnPrint) btnPrint.addEventListener("click", () => {
        const tabTemplates = document.querySelector('.rb-tab[data-tab="templates"]');
        if(tabTemplates) tabTemplates.click();
        
        // Force open accordion on mobile
        const tempContent = document.getElementById("template-accordion-content");
        const tempHeader = document.getElementById("templates-accordion-header");
        const isDesktop = document.documentElement.classList.contains('is-desktop') || window.screen.width >= 900;
        if(!isDesktop && tempContent) {
            tempContent.style.display = "block";
            const icon = tempHeader.querySelector(".accordion-icon");
            if(icon) icon.style.transform = "rotate(180deg)";
        }
    });`);

// Add Session Storage tab persistence
wizard = wizard.replace(/tab\.classList\.add\("active"\);/, `tab.classList.add("active");\n            sessionStorage.setItem('activeRbTab', tab.dataset.tab);`);
wizard = wizard.replace(/        \}\);\n    \}\);\n\}/, `        });\n    });\n    const savedTab = sessionStorage.getItem('activeRbTab');\n    if (savedTab) {\n        const tabToClick = document.querySelector('.rb-tab[data-tab="' + savedTab + '"]');\n        if (tabToClick) tabToClick.click();\n    }\n}`);

fs.writeFileSync('tools/resumebuilder/wizard.js', wizard, 'utf8');

// 3. Index.html changes
let html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');
html = html.replace(/<button type="button" class="btn btn-secondary" id="wizard-print"[^>]*><i class="fas fa-file-pdf"><\/i> Download PDF<\/button>/, 
    '<button type="button" class="btn btn-secondary" id="wizard-templates" style="display: none;"><i class="fas fa-palette"></i> Choose Template</button>');
fs.writeFileSync('tools/resumebuilder/index.html', html, 'utf8');

console.log('Fixed script, wizard, and html!');
