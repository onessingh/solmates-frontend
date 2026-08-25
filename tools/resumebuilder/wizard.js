function initializeWizardApp() {
    initTabs();
    initWizard();
    initPreviewScaler();
    setTimeout(() => {
        initChips();
        initAccordions();
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initializeWizardApp);
} else {
    initializeWizardApp();
}

function initPreviewScaler() {
    const previewPanel = document.querySelector('.preview-panel');
    const resumePreview = document.getElementById('resume-preview');
    const formPanel = document.querySelector('.form-panel');
    
    const updateLayout = () => {
        // 1. Set form min-height to push nav to bottom
        if (formPanel) {
            let zoom = 1;
            const htmlZoom = window.getComputedStyle(document.documentElement).zoom;
            if (htmlZoom && htmlZoom !== 'normal') zoom = parseFloat(htmlZoom);
            const minH = (window.innerHeight / zoom) - 100;
            formPanel.style.minHeight = Math.max(minH, 400) + 'px';
        }
        
        // 2. Scale preview
        if (previewPanel && resumePreview) {
            const isDesktop = document.documentElement.classList.contains('is-desktop') || window.innerWidth >= 1241;
            if (!isDesktop) {
                resumePreview.style.removeProperty('--preview-scale');
                return;
            }
            const availableWidth = previewPanel.clientWidth;
            if (availableWidth > 0) {
                let scale = availableWidth / 800;
                if (scale > 1) scale = 1;
                resumePreview.style.setProperty('--preview-scale', scale);
            }
        }
    };
    
    updateLayout();
    window.addEventListener('resize', updateLayout);
    
    if (window.ResizeObserver && previewPanel) {
        new ResizeObserver(() => updateLayout()).observe(previewPanel);
    }
}


function initTabs() {
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
            sessionStorage.setItem('activeRbTab', tab.dataset.tab);

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
    const savedTab = sessionStorage.getItem('activeRbTab');
    if (savedTab) {
        const tabToClick = document.querySelector('.rb-tab[data-tab="' + savedTab + '"]');
        if (tabToClick) tabToClick.click();
    }
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
    const btnPrint = document.getElementById("wizard-templates");
    if(btnPrint) btnPrint.addEventListener("click", () => {
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
    });
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
                // alert removed
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
