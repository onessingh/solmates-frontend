const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/wizard.js', 'utf8');

const oldTabs = `    // Initially hide jd-match and templates if form-panel is shown
    if(jdMatch) jdMatch.style.display = "none";
    if(templates) templates.style.display = "none";
    if(previewPanel) previewPanel.style.display = "none";
    
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            const target = tab.dataset.tab;
            
            if(formPanel) formPanel.style.display = (target === "builder") ? "block" : "none";
            if(wizardHeader) wizardHeader.style.display = (target === "builder") ? "flex" : "none";
            if(jdMatch) jdMatch.style.display = (target === "jd") ? "block" : "none";
            if(templates) templates.style.display = (target === "templates") ? "block" : "none";
            if(previewPanel) previewPanel.style.display = (target === "templates") ? "block" : "none";`;

const newTabs = `    // Initially hide jd-match and templates if form-panel is shown
    if(jdMatch) jdMatch.style.display = "none";
    if(templates) templates.style.display = "none";
    
    // On desktop, show preview on both Builder and Templates. On mobile, maybe it was hidden to save space.
    const isDesktop = window.innerWidth >= 900 || document.documentElement.classList.contains('is-desktop');
    if(previewPanel) previewPanel.style.display = isDesktop ? "block" : "none";
    
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            const target = tab.dataset.tab;
            
            if(formPanel) formPanel.style.display = (target === "builder") ? "block" : "none";
            if(wizardHeader) wizardHeader.style.display = (target === "builder") ? "flex" : "none";
            if(jdMatch) jdMatch.style.display = (target === "jd") ? "block" : "none";
            if(templates) templates.style.display = (target === "templates") ? "block" : "none";
            
            if(previewPanel) {
                const isDesktop = window.innerWidth >= 900 || document.documentElement.classList.contains('is-desktop');
                if (isDesktop) {
                    previewPanel.style.display = (target === "builder" || target === "templates") ? "block" : "none";
                } else {
                    previewPanel.style.display = (target === "templates") ? "block" : "none";
                }
            }`;

js = js.replace(oldTabs, newTabs);
fs.writeFileSync('tools/resumebuilder/wizard.js', js, 'utf8');
console.log('Wizard JS fixed!');
