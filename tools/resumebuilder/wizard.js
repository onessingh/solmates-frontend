document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initWizard();
    setTimeout(() => {
        initChips();
        initAccordions();
        
    }, 100);
});

function initTabs() {
    const tabs = document.querySelectorAll(".rb-tab");
    const formPanel = document.querySelector(".form-panel");
    const jdMatch = document.getElementById("jd-match");
    const templates = document.getElementById("templates");
    const wizardHeader = document.querySelector(".wizard-header");
    const previewPanel = document.querySelector(".preview-panel");
    
    // Initially hide jd-match and templates if form-panel is shown
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
            if(previewPanel) previewPanel.style.display = (target === "templates") ? "block" : "none";
            
            // Re-trigger showStep logic if switching back to builder
            if(target === "builder" && typeof window.currentWizardStep !== "undefined") {
                // Actually showStep handles the panel-sections inside form-panel, so no need to do anything since form-panel display block restores them
            }
        });
    });
}

const totalSteps = 8;
const stepDefinitions = [
    { title: "Personal Info", sections: ["personalInfo"] },
    { title: "Summary", sections: ["summary", "objective"] },
    { title: "Work Experience", sections: ["experience"] },
    { title: "Education", sections: ["education"] },
    { title: "Skills", sections: ["skills", "technicalStack"] },
    { title: "Additional", sections: ["certifications", "projects", "internships", "awards", "publications", "volunteer", "leadership", "languages", "references", "personalDetails"] },
    { title: "Highlights", sections: ["highlights", "coreCompetencies"] },
    { title: "Finalize", sections: [] } // Step 8 is the section-manager + save action
];

function initWizard() {
    const formPanel = document.querySelector(".form-panel");
    const sections = Array.from(formPanel.querySelectorAll(".panel-section"));
    let currentStep = 1;
    window.currentWizardStep = 1;
    window.currentWizardStep = 1;
    
    const btnNext = document.getElementById("wizard-next");
    const btnPrev = document.getElementById("wizard-prev");
    const btnPrint = document.getElementById("wizard-print");
    if(btnPrint) btnPrint.addEventListener("click", () => { if(window.exportResume) window.exportResume(); });
    const stepText = document.getElementById("wizard-step-text");
    const fill = document.getElementById("wizard-fill");
    
    function showStep(step) {
        window.currentWizardStep = step;
        window.currentWizardStep = step;
        // Hide all initially
        sections.forEach(s => s.style.display = "none");
        
        const def = stepDefinitions[step - 1];
        if (def && def.sections.length > 0) {
            def.sections.forEach(secName => {
                const s = formPanel.querySelector(`[data-section-form="${secName}"]`);
                if (s) s.style.display = "block";
            });
        } else if (step === 8) {
            // Show section manager on last step
            const sm = formPanel.querySelector('[aria-labelledby="section-manager-title"]');
            if (sm) sm.style.display = "block";
        }
        
        // Update header
        stepText.textContent = `Step ${step} of ${totalSteps}: ${def ? def.title : 'Finish'}`;
        const pct = (step / totalSteps) * 100;
        fill.style.width = pct + "%";
        
        btnPrev.style.visibility = step === 1 ? "hidden" : "visible";
        btnPrev.style.display = "block";
        btnNext.textContent = step === totalSteps ? "Finish" : "Next";
        if(btnPrint) btnPrint.style.display = step === totalSteps ? "inline-flex" : "none";
        
        // Scroll to top of builder
        const tabBuilder = document.getElementById("tab-builder");
        if(window.innerWidth < 768) {
            window.scrollTo({ top: tabBuilder.offsetTop - 80, behavior: 'smooth' });
        }
    }
    
    if (btnNext) {
        btnNext.addEventListener("click", () => {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
            } else {
                // Click the actual save button
                const saveBtn = document.querySelector('[data-action="save-form"]');
                if (saveBtn) saveBtn.click();
                alert("Resume finalized and saved!");
            }
        });
    }
    
    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    }
    
    showStep(1);
    setupAutosave();
    
    document.addEventListener("wizardRefresh", () => {
        showStep(window.currentWizardStep);
    });
}

function setupAutosave() {
    const formPanel = document.querySelector(".form-panel");
    const ind = document.getElementById("autosave-indicator");
    if(!ind) return;
    
    let timer;
    formPanel.addEventListener("input", () => {
        ind.textContent = "Saving...";
        ind.style.color = "#888";
        clearTimeout(timer);
        timer = setTimeout(() => {
            ind.textContent = "✔ Saved";
            ind.style.color = "#10b981";
            setTimeout(() => {
                ind.textContent = "";
            }, 2000);
        }, 1000);
    });
}

function initChips() {
    const skillInputs = ["skill-hard", "skill-tools", "skill-domain"];
    skillInputs.forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;
        
        const wrapper = document.createElement("div");
        wrapper.className = "chip-wrapper";
        const chipContainer = document.createElement("div");
        chipContainer.className = "chip-container";
        
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(chipContainer);
        wrapper.appendChild(input);
        
        input.classList.add("chip-input");
        input.placeholder = "Type and press Enter...";
        
        function renderChips() {
            chipContainer.innerHTML = "";
            const val = input.value;
            const items = val.split(",").map(s => s.trim()).filter(Boolean);
            items.forEach((item, idx) => {
                const chip = document.createElement("span");
                chip.className = "chip";
                chip.innerHTML = `${item} <i class="fas fa-times"></i>`;
                chip.querySelector("i").addEventListener("click", () => {
                    items.splice(idx, 1);
                    input.value = items.join(", ") + (items.length ? ", " : "");
                    input.dispatchEvent(new Event("input", { bubbles: true }));
                    renderChips();
                });
                chipContainer.appendChild(chip);
            });
        }
        
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                if (input.value.trim() !== "" && !input.value.trim().endsWith(",")) {
                    input.value += ", ";
                    input.dispatchEvent(new Event("input", { bubbles: true }));
                    renderChips();
                }
            }
        });
        
        input.addEventListener("blur", renderChips);
        renderChips();
    });
}

function initAccordions() {
    const additional = ["certifications", "projects", "internships", "awards", "publications", "volunteer", "leadership", "languages", "references", "personalDetails"];
    additional.forEach(secName => {
        const s = document.querySelector(`[data-section-form="${secName}"]`);
        if (s) {
            s.classList.add("accordion-section");
            const header = s.querySelector(".section-header");
            header.style.cursor = "pointer";
            header.innerHTML += " <i class=\"fas fa-chevron-down accordion-icon\"></i>";
            const contentWrap = document.createElement("div");
            contentWrap.className = "accordion-content";
            
            while(s.childNodes.length > 2) {
                contentWrap.appendChild(s.lastChild);
            }
            s.appendChild(contentWrap);
            
            header.addEventListener("click", () => {
                const isOpen = contentWrap.classList.contains("open");
                document.querySelectorAll(".accordion-content").forEach(c => { c.classList.remove("open"); c.style.display = "none"; });
                document.querySelectorAll(".accordion-icon").forEach(i => i.style.transform = "rotate(0deg)");
                
                if (!isOpen) {
                    contentWrap.style.display = "block"; contentWrap.style.display = "block"; contentWrap.classList.add("open");
                    header.querySelector(".accordion-icon").style.transform = "rotate(180deg)";
                }
            });
        }
    });
}





document.addEventListener("DOMContentLoaded", () => {
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
});


// Hook into Section Manager clicks to re-enforce wizard visibility
document.addEventListener("click", (e) => {
    if(e.target.closest("#section-manager")) {
        // Give script.js a few ms to do its DOM manipulation
        setTimeout(() => {
            if(window.currentWizardStep) {
                // We need a global way to trigger showStep, let's dispatch an event
                document.dispatchEvent(new Event("wizardRefresh"));
            }
        }, 10);
    }
}, true);

