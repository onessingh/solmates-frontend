const handleExport = async () => {
    if (isExporting) return;
    
    // Prevent empty sections from being exported by filtering them out before rendering
    state.resume = readFormState();
    const errors = validateResume(state.resume);
    if (errors.length > 0) {
      showErrorModal(errors);
      return;
    }

    isExporting = true;
    updatePreview();

    const exportBtn = document.querySelector('[data-action="print-form"]');
    const originalBtnText = exportBtn.innerHTML;
    exportBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Generating PDF...';
    exportBtn.disabled = true;

    try {
      const filename = 'Resume_' + (state.resume.personalInfo.fullName.replace(/\s+/g, '_') || 'Generated') + '.pdf';
      
      // Temporarily remove empty sections from enabled state
      const originalEnabled = { ...state.sectionEnabled };
      const sections = ['experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'volunteer', 'leadership', 'publications', 'references'];
      sections.forEach(sec => {
          if (!state.resume[sec] || state.resume[sec].length === 0) {
              state.sectionEnabled[sec] = false;
          }
      });
      if (!state.resume.summary) state.sectionEnabled.summary = false;
      if (!state.resume.objective) state.sectionEnabled.objective = false;
      if (!state.resume.highlights || state.resume.highlights.length === 0) state.sectionEnabled.highlights = false;

      const resumeHtml = renderResume(state.resume, state.selectedTemplate, state.sectionOrder);
      const fullHtml = buildPrintHtml(resumeHtml);
      
      // Restore enabled state
      state.sectionEnabled = originalEnabled;

      const apiBase = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
          ? 'http://localhost:3000' 
          : 'https://solmates-backend-w27e.onrender.com';

      const response = await fetch(`${apiBase}/api/export-pdf`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html: fullHtml, filename })
      });

      if (!response.ok) {
          throw new Error('Failed to generate PDF on server');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error('PDF Export Error:', error);
      alert('An error occurred while generating the PDF. Please try again.');
    } finally {
      isExporting = false;
      exportBtn.innerHTML = originalBtnText;
      exportBtn.disabled = false;
    }
  };

  const handleExport = async () => {
    if (isExporting) return;
    isExporting = true;

    try {
      state.resume = readFormState();
      const errors = validateResume(state.resume);
      if (errors.length > 0) {
        showErrorModal(errors);
        return;
      }

      updatePreview();

      if (typeof html2pdf === 'undefined') {
        alert('PDF library not loaded. Please refresh and try again.');
        return;
      }

      const filename = 'Resume_' + (state.resume.personalInfo.fullName.replace(/\s+/g, '_') || 'Generated') + '.pdf';

      // Render fresh HTML into an off-screen container at exactly 794px (A4 width at 96dpi).
      // We use renderResume() directly instead of cloning the live DOM element,
      // so mobile viewport size has ZERO effect on the captured content.
      const resumeHtml = renderResume(state.resume, state.selectedTemplate, state.sectionOrder);
      const container = document.createElement('div');
      container.style.cssText = 'position:absolute;left:0;top:0;width:794px;background:#fff;z-index:-100;opacity:0.01;pointer-events:none;overflow:visible;';
      container.innerHTML = resumeHtml;
      document.body.appendChild(container);

      const resumeEl = container.querySelector('.resume') || container;
      // Force exact A4 width, remove all conflicting styles
      resumeEl.style.setProperty('width', '794px', 'important');
      resumeEl.style.setProperty('min-height', 'auto', 'important');
      resumeEl.style.setProperty('height', 'auto', 'important');
      resumeEl.style.setProperty('padding', '0 40px', 'important');
      resumeEl.style.setProperty('margin', '0', 'important');
      resumeEl.style.setProperty('box-shadow', 'none', 'important');
      resumeEl.style.setProperty('border', 'none', 'important');
      resumeEl.style.setProperty('box-sizing', 'border-box', 'important');
      resumeEl.style.setProperty('overflow', 'visible', 'important');
      resumeEl.style.setProperty('transform', 'none', 'important');

      // Wait for Google Fonts to load inside this fresh container
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      await new Promise(r => setTimeout(r, 500));

      const opt = {
        margin: [15, 0],
        filename: filename,
        image: { type: 'jpeg', quality: 1.0 },
        pagebreak: {
          mode: ['css', 'legacy'],
          avoid: ['.resume-section', '.resume-item', '.resume-header', '.keep-together', 'h2', 'h3'],
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          letterRendering: true,
          scrollY: 0,
          scrollX: 0,
          windowWidth: 794, x: 0, y: 0,
          backgroundColor: '#ffffff',
          onclone: function(clonedDoc) {
            // Inside the cloned doc, also ensure no min-height restrictions
            const el = clonedDoc.querySelector('.resume');
            if (el) {
              el.style.setProperty('min-height', 'auto', 'important');
              el.style.setProperty('height', 'auto', 'important');
              el.style.setProperty('overflow', 'visible', 'important');
            }
            // Add page break helpers to all headings and list items
            clonedDoc.querySelectorAll('h2, h3').forEach(h => {
              h.style.setProperty('break-after', 'avoid', 'important');
              h.style.setProperty('page-break-after', 'avoid', 'important');
            });
            clonedDoc.querySelectorAll('.resume-item, li').forEach(el => {
              el.style.setProperty('break-inside', 'avoid', 'important');
              el.style.setProperty('page-break-inside', 'avoid', 'important');
            });
          }
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(resumeEl).save();

    } catch(err) {
      console.error('PDF export failed:', err);
      alert('PDF export failed. Please try again.');
    } finally {
      // Cleanup the off-screen container
      const old = document.querySelector('div[style*="left:-10000px"]');
      if (old) document.body.removeChild(old);
      isExporting = false;
    }
  };


  const cacheDom = () => {
    dom.fullName = document.getElementById("full-name");
    dom.headline = document.getElementById("headline");
    dom.email = document.getElementById("email");
    dom.phone = document.getElementById("phone");
    dom.city = document.getElementById("city");
    dom.state = document.getElementById("state");
    dom.country = document.getElementById("country");
    dom.linkedin = document.getElementById("linkedin");
    dom.portfolio = document.getElementById("portfolio");
    dom.summary = document.getElementById("summary");
    dom.summaryHint = document.getElementById("summary-hint");
    dom.skillHard = document.getElementById("skill-hard");
    dom.skillTools = document.getElementById("skill-tools");
    dom.skillDomain = document.getElementById("skill-domain");
    dom.profilePhoto = document.querySelector(".profile-photo");
    dom.profilePhotoInput = document.getElementById("profile-photo");
    dom.preview = document.querySelector(".resume-preview");
    dom.scoreValue = document.querySelector(".score-value");
    dom.scoreFeedback = document.querySelector(".score-feedback");
    dom.downloadBtn = document.getElementById("download-resume-btn");
    dom.clearBtn = document.querySelector('[data-action="clear-form"]');
    dom.saveBtn = document.querySelector('[data-action="save-form"]');
    dom.printBtn = document.querySelector('[data-action="print-form"]');
    dom.startBuilding = document.getElementById("start-building-btn");
    dom.browseTemplates = document.getElementById("browse-templates-btn");
    dom.experienceList = document.querySelector('[data-repeater="experience"]');
    dom.educationList = document.querySelector('[data-repeater="education"]');
    dom.certificationsList = document.querySelector('[data-repeater="certifications"]');
    dom.projectsList = document.querySelector('[data-repeater="projects"]');
    dom.languagesList = document.querySelector('[data-repeater="languages"]');
    dom.internshipsList = document.querySelector('[data-repeater="internships"]');
    dom.awardsList = document.querySelector('[data-repeater="awards"]');
    dom.publicationsList = document.querySelector('[data-repeater="publications"]');
    dom.volunteerList = document.querySelector('[data-repeater="volunteer"]');
    dom.leadershipList = document.querySelector('[data-repeater="leadership"]');
    dom.highlightsList = document.querySelector('[data-repeater="highlights"]');
    dom.coreCompetenciesList = document.querySelector('[data-repeater="coreCompetencies"]');
    dom.objectiveInput = document.getElementById("objective");
    dom.techStackLanguages = document.getElementById("tech-stack-languages");
    dom.techStackFrameworks = document.getElementById("tech-stack-frameworks");
    dom.techStackTools = document.getElementById("tech-stack-tools");
    dom.sectionManager = document.getElementById("section-manager");
    dom.templateCards = Array.from(document.querySelectorAll(".template-card"));
    dom.startBuilding = document.getElementById("start-building-btn");
    dom.browseTemplates = document.getElementById("browse-templates-btn");
    dom.jdInput = document.getElementById("jd-input");
    dom.jdEvaluateBtn = document.getElementById("jd-evaluate-btn");
    dom.jdError = document.getElementById("jd-error");
    dom.jdScoreValue = document.querySelector(".jd-score-value");
    dom.jdScoreLabel = document.querySelector(".jd-score-label");
    dom.jdScoreFeedback = document.querySelector(".jd-score-feedback");
    dom.jdMissingList = document.getElementById("jd-missing-list");
    dom.jdWeakList = document.getElementById("jd-weak-list");
    dom.jdStrongList = document.getElementById("jd-strong-list");
    dom.jdSuggestionsList = document.getElementById("jd-suggestions-list");
    dom.jdRewriteSummary = document.getElementById("jd-rewrite-summary");
    dom.jdRewriteExperience = document.getElementById("jd-rewrite-experience");
    dom.jdRewriteSkills = document.getElementById("jd-rewrite-skills");
    dom.jdHeatmapBody = document.getElementById("jd-heatmap-body");
    dom.jdRejectionList = document.getElementById("jd-rejection-list");
    dom.jdTemplateList = document.getElementById("jd-template-list");
    dom.jdToggle = document.querySelector(".jd-toggle");
    dom.jdBody = document.getElementById("jd-match-body");
    dom.suggestionTooltip = document.getElementById("field-suggestion-tooltip");
    dom.suggestionText = dom.suggestionTooltip?.querySelector(".suggestion-text");
    
    dom.personalDob = document.getElementById("personal-dob");
    dom.personalGender = document.getElementById("personal-gender");
    dom.personalFather = document.getElementById("personal-father");
    dom.personalMarital = document.getElementById("personal-marital");
    dom.personalHobbies = document.getElementById("personal-hobbies");
    dom.referencesList = document.querySelector('[data-repeater="references"]');
    
    // Crop Modal Elements
    dom.cropModal = document.getElementById("crop-modal");
    dom.cropperImage = document.getElementById("cropper-image");
    dom.saveCropBtn = document.getElementById("save-crop-btn");

    dom.errorModal = document.getElementById("error-modal");
    dom.errorList = document.getElementById("error-list");
    dom.templateModal = document.getElementById("template-modal");
    dom.modalTemplateGrid = document.getElementById("modal-template-grid");
  };

  const bindEvents = () => {
    const handleFormChange = () => {
      state.resume = readFormState();
      updateSummaryHint(state.resume.summary || "");
      updateProfilePhotoPreview(state.resume.personalInfo.photoDataUrl || "");
      updatePreview();
      updateScore();
      saveState();
    };

    document.querySelector(".form-panel")?.addEventListener("input", handleFormChange);
    document.querySelector(".form-panel")?.addEventListener("change", handleFormChange);
    document.querySelector(".form-panel")?.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;
      const action = button.dataset.action;
      if (action === "add-item") {
        const target = button.dataset.target;
        const container = document.querySelector(`[data-repeater="${target}"]`);
        const templateId = container?.dataset.template;
        if (container && templateId) {
          const node = createRepeaterItem(templateId);
          if (node) container.appendChild(node);
        }
        handleFormChange();
      }
      if (action === "remove-item") {
        const item = button.closest(".repeater-item");
        if (item) item.remove();
        handleFormChange();
        if (dom.suggestionTooltip) {
          dom.suggestionTooltip.hidden = true;
          dom.suggestionTooltip.classList.remove("suggestion-visible");
        }
      }
      if (action === "move-item-up") {
        const item = button.closest(".repeater-item");
        const prev = item?.previousElementSibling;
        if (item && prev) {
          item.parentNode.insertBefore(item, prev);
          handleFormChange();
        }
      }
      if (action === "move-item-down") {
        const item = button.closest(".repeater-item");
        const next = item?.nextElementSibling;
        if (item && next) {
          item.parentNode.insertBefore(next, item);
          handleFormChange();
        }
      }
    });

    document.addEventListener("focus", (event) => {
      const input = event.target;
      if (!input || !["INPUT", "TEXTAREA"].includes(input.tagName)) return;
      
      let suggestionKey = input.id;
      if (!suggestionKey || !FIELD_SUGGESTIONS[suggestionKey]) {
        suggestionKey = input.dataset.field;
      }

      const suggestion = FIELD_SUGGESTIONS[suggestionKey];
      const tooltip = document.getElementById("field-suggestion-tooltip");
      const tooltipText = tooltip?.querySelector(".suggestion-text");
      
      if (suggestion && tooltip && tooltipText) {
        tooltipText.textContent = suggestion;
        
        const rect = input.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        tooltip.style.top = `${rect.bottom + scrollTop + 8}px`;
        tooltip.style.left = `${Math.max(16, rect.left)}px`;
        
        tooltip.hidden = false;
        tooltip.style.display = "block";
        requestAnimationFrame(() => {
          tooltip.classList.add("suggestion-visible");
        });
      }
    }, true);

    document.addEventListener("blur", (event) => {
      const input = event.target;
      if (!input || !["INPUT", "TEXTAREA"].includes(input.tagName)) return;
      
      // Auto-capitalize on blur if it's a name or header field
      const field = input.dataset.field || input.id;
      const textFields = ["full-name", "headline", "jobTitle", "company", "degree", "institution", "city", "state", "country", "language", "name", "title", "authority", "specialization", "location"];
      
      if (textFields.includes(field) && input.value) {
        input.value = toTitleCase(input.value);
        handleFormChange();
      }

      const tooltip = document.getElementById("field-suggestion-tooltip");
      if (tooltip) {
        tooltip.classList.remove("suggestion-visible");
        setTimeout(() => {
          if (!tooltip.classList.contains("suggestion-visible")) {
            tooltip.hidden = true;
            tooltip.style.display = "none";
          }
        }, 200);
      }
    }, true);

    if (dom.downloadBtn) dom.downloadBtn.addEventListener("click", () => handleExport());
    if (dom.printBtn) dom.printBtn.addEventListener("click", () => handleExport());

    if (dom.saveBtn) dom.saveBtn.addEventListener("click", () => { saveState(); alert("Resume saved!"); });
    if (dom.clearBtn) dom.clearBtn.addEventListener("click", handleClearForm);

    // Template Selection via Event Delegation
    const templateGrid = document.getElementById("template-grid");
    if (templateGrid) {
      templateGrid.addEventListener("click", (event) => {
        const card = event.target.closest(".template-card");
        if (!card) return;
        
        const key = card.dataset.template || "ats";
        state.selectedTemplate = key;
        
        // Update active class
        document.querySelectorAll(".template-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        
        updatePreview();
        saveState();
      });
    }

    if (dom.startBuilding) {
      dom.startBuilding.addEventListener("click", () => {
        document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" });
      });
    }

    if (dom.browseTemplates) {
      dom.browseTemplates.addEventListener("click", () => {
        document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" });
      });
    }

    if (dom.profilePhotoInput) {
      dom.profilePhotoInput.addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        loadImageForCrop(file);
        dom.profilePhotoInput.value = "";
      });
    }

    if (dom.saveCropBtn) dom.saveCropBtn.addEventListener("click", handleSaveCrop);
    
    document.querySelectorAll('[data-action="close-crop"]').forEach(btn => {
      btn.addEventListener("click", closeCropModal);
    });

    // Preview Actions
    document.querySelectorAll('[data-action="clear-form"]').forEach(btn => {
      btn.addEventListener("click", handleClearForm);
    });
    document.querySelectorAll('[data-action="print-form"]').forEach(btn => {
      btn.addEventListener("click", handlePrintForm);
    });
    document.querySelectorAll('[data-action="save-form"]').forEach(btn => {
      btn.addEventListener("click", handleSaveForm);
    });

    document.querySelectorAll('[data-action="close-error"]').forEach(btn => {
      btn.addEventListener("click", closeErrorModal);
    });

    // Close modals on escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (dom.cropModal && !dom.cropModal.hidden) closeCropModal();
        if (dom.errorModal && !dom.errorModal.hidden) closeErrorModal();
      }
    });


    if (dom.jdEvaluateBtn) dom.jdEvaluateBtn.addEventListener("click", handleJdEvaluate);
    if (dom.jdToggle && dom.jdBody) {
      dom.jdToggle.addEventListener("click", () => {
        const collapsed = dom.jdBody.hidden;
        dom.jdBody.hidden = !collapsed;
        dom.jdToggle.setAttribute("aria-expanded", collapsed ? "true" : "false");
        dom.jdToggle.textContent = collapsed ? "Hide Evaluation" : "Show Evaluation";
      });
    }

    if (dom.jdTemplateList) {
      dom.jdTemplateList.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-template]");
        if (!button) return;
        const template = button.dataset.template;
        if (template) {
          state.selectedTemplate = template;
          updatePreview();
          saveState();
        }
      });
    }

    if (dom.sectionManager) {
      dom.sectionManager.addEventListener("change", (event) => {
        const input = event.target.closest('input[data-action="toggle-section"]');
        if (!input) return;
        const key = input.dataset.key;
        if (!key) return;
        state.sectionEnabled[key] = input.checked;
        syncFormVisibility();
        updatePreview();
        saveState();
      });

      dom.sectionManager.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const key = button.dataset.key;
        if (!key) return;
        const index = state.sectionOrder.indexOf(key);
        if (index < 0) return;
        if (button.dataset.action === "move-up" && index > 0) {
          const updated = [...state.sectionOrder];
          [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
          state.sectionOrder = updated;
        }
        if (button.dataset.action === "move-down" && index < state.sectionOrder.length - 1) {
          const updated = [...state.sectionOrder];
          [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
          state.sectionOrder = updated;
        }
        renderSectionManager();
        updatePreview();
        saveState();
      });
    }
  };

  const init = () => {
    cacheDom();
    const saved = loadState();
    if (saved?.resume) {
      state.resume = normalizeResume(saved.resume);
      state.selectedTemplate = saved.selectedTemplate || "ats";
      state.sectionOrder = Array.isArray(saved.sectionOrder) && saved.sectionOrder.length
        ? saved.sectionOrder.filter((key) => DEFAULT_SECTION_ORDER.includes(key))
        : [...DEFAULT_SECTION_ORDER];
      DEFAULT_SECTION_ORDER.forEach((key) => {
        if (!state.sectionOrder.includes(key)) state.sectionOrder.push(key);
      });
      state.sectionEnabled = { ...DEFAULT_SECTION_ENABLED, ...(saved.sectionEnabled || {}) };
      state.sectionEnabled.personalDetails = true; // Ensure always visible by default
      writeFormState(state.resume);
    } else {
      writeFormState(state.resume);
    }
    updatePreview();
    updateScore();
    updateSummaryHint(state.resume.summary || "");
    renderSectionManager();
    syncFormVisibility();
    bindEvents();
    
    // Final assignments for external access / legacy hooks
    window.exportResume = handleExport;
    window.printResume = handleExport;
  };

  document.addEventListener("DOMContentLoaded", init);
})();















