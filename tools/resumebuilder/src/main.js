"use strict";

const { createResumeStore } = require("./store/resumeStore");
const { createTemplateStore } = require("./store/templateStore");
const { createUserStore } = require("./store/userStore");
const { createUiStore } = require("./store/uiStore");
const ResumeRenderer = require("./resume/ResumeRenderer");
const ResumeParser = require("./resume/ResumeParser");
const ResumeScoreEngine = require("./resume/ResumeScoreEngine");
const ResumeValidator = require("./resume/ResumeValidator");
const { createAutoSave } = require("./hooks/useAutoSave");
const { exportPdf } = require("./hooks/useExport");
const { filterTemplates } = require("./hooks/useTemplateFilter");
const { templates } = require("./templates/templateList");
const { MAX_SUMMARY_CHARS } = require("./utils/constants");

const STORAGE_KEY = "solmates.resume.builder.v2";

const byId = (id) => document.getElementById(id);

const readFormState = () => {
  const skills = (byId("skill-input")?.value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return ResumeParser.parse({
    personalInfo: {
      fullName: byId("full-name")?.value,
      email: byId("email")?.value,
      phone: byId("phone")?.value,
      address: byId("address")?.value,
      linkedin: byId("linkedin")?.value,
      portfolio: byId("portfolio")?.value
    },
    summary: byId("summary")?.value,
    skills
  });
};

const writePreview = (resume, templateKey) => {
  const preview = document.querySelector(".resume-preview");
  if (!preview) return;
  preview.innerHTML = ResumeRenderer.render(resume, { template: templateKey });
};

const updateScore = (resume) => {
  const scoreNode = document.querySelector(".score-value");
  const feedbackNode = document.querySelector(".score-feedback");
  if (!scoreNode || !feedbackNode) return;
  const { score, breakdown } = ResumeScoreEngine.score(resume);
  scoreNode.textContent = String(score);
  feedbackNode.textContent = `Contact ${breakdown.contact}/24 · Summary ${breakdown.summary}/12 · Experience ${breakdown.experience}/24 · Education ${breakdown.education}/10 · Skills ${breakdown.skills}/10`;
};

const updateSummaryCounter = (value) => {
  const hint = byId("summary-hint");
  if (!hint) return;
  const length = value.length;
  hint.textContent = `Aim for 2-4 concise lines. ${length}/${MAX_SUMMARY_CHARS} characters.`;
};

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const saveState = (payload) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    return;
  }
};

const init = () => {
  const resumeStore = createResumeStore({});
  const templateStore = createTemplateStore();
  const userStore = createUserStore();
  const uiStore = createUiStore();

  const cached = loadState();
  if (cached?.resume) resumeStore.setState(cached.resume);
  if (cached?.templateKey) templateStore.setSelected(cached.templateKey);
  if (cached?.user) userStore.setUser(cached.user, cached.token);

  const autosave = createAutoSave({
    intervalMs: 15000,
    onSave: () => {
      const state = resumeStore.getState();
      const templateState = templateStore.getState();
      const userState = userStore.getState();
      saveState({
        resume: state.resume,
        templateKey: templateState.selected,
        user: userState.user,
        token: userState.token
      });
    }
  });

  const handleChange = () => {
    const resume = readFormState();
    const validation = ResumeValidator.validate(resume);
    uiStore.setState({ error: validation.valid ? null : "Fix validation errors before export." });
    resumeStore.setState(resume);
    const templateKey = templateStore.getState().selected;
    writePreview(resume, templateKey);
    updateScore(resume);
    updateSummaryCounter(resume.summary || "");
    autosave.markDirty();
  };

  document.querySelector(".form-panel")?.addEventListener("input", handleChange);
  document.querySelector(".form-panel")?.addEventListener("change", handleChange);
  autosave.start();

  const downloadBtn = document.querySelector(".nav-actions .btn-primary");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const { resume, validation } = resumeStore.getState();
      if (!validation.valid) {
        uiStore.setState({ error: "Please fix validation errors before export." });
        return;
      }
      const templateKey = templateStore.getState().selected;
      const exportData = exportPdf({ resume, template: templateKey });
      const blob = new Blob([exportData.html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = exportData.filename;
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  const filterInput = document.querySelector("[data-template-filter]");
  if (filterInput) {
    filterInput.addEventListener("input", (event) => {
      const results = filterTemplates({ query: event.target.value });
      templateStore.setTemplates(results);
    });
  }

  const templateGrid = document.querySelector(".template-grid");
  if (templateGrid) {
    templateGrid.addEventListener("click", (event) => {
      const card = event.target.closest(".template-card");
      if (!card) return;
      const key = card.dataset.template;
      templateStore.setSelected(key);
      const resume = resumeStore.getState().resume;
      writePreview(resume, key);
    });
  }

  const initial = resumeStore.getState().resume;
  writePreview(initial, templateStore.getState().selected);
  updateScore(initial);
  updateSummaryCounter(initial.summary || "");

  if (templates.length > 0) {
    templateStore.setTemplates(templates);
  }
};

document.addEventListener("DOMContentLoaded", init);
