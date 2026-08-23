(() => {
  "use strict";

  const STORAGE_KEY = "solmates.resume.builder.v2";
  const MAX_SUMMARY_CHARS = 600;
  const JD_MAX_CHARS = 10000;

  const TEMPLATE_CATALOG = [
    { key: "ats", name: "ATS Optimized", category: "Standard", atsSafe: true },
    { key: "software", name: "Software Engineer", category: "Tech", atsSafe: true },
    { key: "marketing", name: "Marketing & Sales", category: "Creative", atsSafe: true },
    { key: "finance", name: "Banking & Finance", category: "Traditional", atsSafe: true },
    { key: "hr", name: "Human Resources", category: "HR", atsSafe: true },
    { key: "executive", name: "Executive Leader", category: "Premium", atsSafe: true },
    { key: "creative", name: "Creative Designer", category: "Visual", atsSafe: false },
    { key: "academic", name: "Academic CV", category: "Education", atsSafe: true },
    { key: "social", name: "Teacher", category: "Professional", atsSafe: true },
    { key: "modernSidebar", name: "Modern Sidebar", category: "Premium", atsSafe: false },
    { key: "jsonmacchiato", name: "JSON Macchiato", category: "Open Source", atsSafe: true },
    { key: "harvard", name: "Harvard Business", category: "Traditional", atsSafe: true },
    { key: "onyx", name: "Reactive Onyx", category: "Modern", atsSafe: true },
    { key: "awesomecv", name: "Awesome CV (LaTeX)", category: "Tech", atsSafe: true },
    { key: "notion", name: "Notion Document", category: "Minimal", atsSafe: true },
    { key: "google", name: "Google Tech", category: "Modern", atsSafe: true },
    { key: "mckinsey", name: "McKinsey Style", category: "Traditional", atsSafe: true },
    { key: "deekay", name: "Reactive Deekay", category: "Creative", atsSafe: true },
    { key: "kakashi", name: "Reactive Kakashi", category: "Tech", atsSafe: true },
    { key: "chiron", name: "Reactive Chiron", category: "Premium", atsSafe: true },
    { key: "jsonflat", name: "JSON Flat", category: "Standard", atsSafe: true },
    { key: "jsonelegant", name: "JSON Elegant", category: "Traditional", atsSafe: true },
    { key: "canvamodern", name: "Canva Modern", category: "Visual", atsSafe: false },
    { key: "zetyclassic", name: "Zety Classic", category: "Standard", atsSafe: true },
    { key: "novoresume", name: "Novoresume Hybrid", category: "Modern", atsSafe: true },
    { key: "legal", name: "Legal Professional", category: "Lawyer", atsSafe: true },
    { key: "doctor", name: "Medical Doctor", category: "Healthcare", atsSafe: true },
    { key: "datascience", name: "Data Scientist", category: "Tech", atsSafe: true },
    { key: "journalist", name: "Journalist / Writer", category: "Media", atsSafe: true },
    { key: "productmanager", name: "Product Manager", category: "Tech", atsSafe: true },
    { key: "ibanker", name: "Investment Banker", category: "Finance", atsSafe: true },
    { key: "researcher", name: "Research Scientist", category: "Academic", atsSafe: true },
    { key: "nurse", name: "Nurse / Healthcare", category: "Healthcare", atsSafe: true },
    { key: "designer", name: "Brand Designer", category: "Creative", atsSafe: false },
    { key: "ca", name: "Chartered Accountant", category: "Finance", atsSafe: true },
    { key: "pin-arch", name: "Aesthetic Arch", category: "Pinterest", atsSafe: false },
    { key: "pin-banner", name: "LinkedIn Style", category: "Pinterest", atsSafe: true },
    { key: "pin-yellow", name: "Bold Yellow", category: "Pinterest", atsSafe: true },
    { key: "pin-pink", name: "Pink Grid", category: "Pinterest", atsSafe: false }
  ];

  const FIELD_SUGGESTIONS = {
    "full-name": "Use the name you want recruiters to call you. Middle names are optional.",
    "headline": "A strong headline summarizes your goal and top skills (e.g., 'Senior Marketing Manager | Digital Strategy & SEO').",
    "email": "Use a professional email address, ideally a combination of your first and last name.",
    "phone": "Include your country code if you are applying internationally.",
    "linkedin": "A customized LinkedIn URL looks much cleaner.",
    "summary": "Keep it to 2-4 lines. Focus on your biggest achievements, years of experience, and your unique value proposition.",
    "jobTitle": "Use standard industry titles so ATS systems can parse it easily.",
    "company": "If it's a lesser-known company, you can add a 3-word description next to it.",
    "bullets": "Start with strong action verbs (Spearheaded, Optimized, Managed). Include numbers and metrics where possible.",
    "description": "Keep standard descriptions brief, and let your bullet points highlight your true achievements.",
    "degree": "Don't abbreviate your degree unless it's very common (like MBA or PhD).",
    "skill-hard": "List your strongest technical or specialized skills first.",
    "tools": "Identify software and tools explicitly required in the target Job Description.",
    "outcome": "Briefly state what the project achieved (e.g., 'Resulted in 20% higher user retention')."
  };

  const STOPWORDS = new Set([
    "a", "an", "the", "and", "or", "but", "if", "then", "else", "when", "while",
    "for", "of", "to", "in", "on", "at", "by", "with", "from", "as", "is", "are",
    "was", "were", "be", "been", "being", "this", "that", "these", "those",
    "it", "its", "their", "our", "your", "you", "we", "they", "he", "she", "them",
    "his", "her", "us", "also", "not", "no", "yes", "will", "can", "may", "must",
    "should", "could", "would", "about", "into", "over", "under", "within",
    "across", "per", "each", "all", "any", "some", "more", "most", "less", "least",
    "such", "including", "include", "includes", "required", "preferred", "plus",
    "role", "responsibilities", "responsibility", "job", "description", "candidate",
    "candidates", "position", "team", "work", "working", "ability", "experience",
    "skills", "skill", "knowledge"
  ]);

  const SPECIAL_TOKENS = new Set([
    "c", "c++", "c#", "go", "r", "sql", "ai", "ml", "ui", "ux", "qa", "pm", "sre",
    "devops", ".net", "node.js", "next.js"
  ]);

  const DEFAULT_SECTION_ORDER = [
    "summary",
    "headline",
    "highlights",
    "coreCompetencies",
    "experience",
    "projects",
    "education",
    "certifications",
    "internships",
    "awards",
    "skills",
    "technicalStack",
    "languages",
    "publications",
    "volunteer",
    "leadership",
    "objective",
    "personalDetails",
    "references"
  ];

  const DEFAULT_SECTION_ENABLED = {
    summary: true,
    headline: true,
    highlights: true,
    coreCompetencies: true,
    experience: true,
    projects: true,
    education: true,
    certifications: true,
    internships: false,
    awards: true,
    skills: true,
    technicalStack: false,
    languages: true,
    publications: false,
    volunteer: false,
    leadership: false,
    objective: false,
    personalDetails: true,
    references: true
  };

  const buildDefaultResume = () => ({
    personalInfo: {
      fullName: "",
      headline: "",
      photoDataUrl: "",
      email: "",
      phone: "",
      location: { city: "", state: "", country: "" },
      linkedin: "",
      portfolio: ""
    },
    summary: "",
    objective: "",
    highlights: [],
    coreCompetencies: [],
    skills: { hard: [], tools: [], domain: [] },
    experience: [],
    education: [],
    certifications: [],
    projects: [],
    internships: [],
    awards: [],
    languages: [],
    publications: [],
    volunteer: [],
    leadership: [],
    technicalStack: { languages: [], frameworks: [], tools: [] },
    personalDetails: { dob: "", gender: "", fatherName: "", maritalStatus: "", hobbies: "" },
    references: []
  });

  const normalizeResume = (resume) => {
    const next = buildDefaultResume();
    const source = resume || {};
    next.personalInfo = {
      ...next.personalInfo,
      ...(source.personalInfo || {}),
      location: {
        ...next.personalInfo.location,
        ...(source.personalInfo?.location || {})
      }
    };
    if (source.personalInfo?.photoDataUrl) {
      next.personalInfo.photoDataUrl = source.personalInfo.photoDataUrl;
    }
    next.summary = source.summary || "";
    next.objective = source.objective || "";
    next.highlights = Array.isArray(source.highlights) ? source.highlights : [];
    next.coreCompetencies = Array.isArray(source.coreCompetencies) ? source.coreCompetencies : [];
    if (Array.isArray(source.skills)) {
      next.skills.hard = source.skills;
    } else {
      next.skills = {
        hard: source.skills?.hard || [],
        tools: source.skills?.tools || [],
        domain: source.skills?.domain || []
      };
    }
    next.experience = Array.isArray(source.experience) ? source.experience : [];
    next.education = Array.isArray(source.education) ? source.education : [];
    next.certifications = Array.isArray(source.certifications) ? source.certifications : [];
    next.projects = Array.isArray(source.projects) ? source.projects : [];
    next.internships = Array.isArray(source.internships) ? source.internships : [];
    next.awards = Array.isArray(source.awards) ? source.awards : [];
    next.languages = Array.isArray(source.languages) ? source.languages : [];
    next.publications = Array.isArray(source.publications) ? source.publications : [];
    next.volunteer = Array.isArray(source.volunteer) ? source.volunteer : [];
    next.leadership = Array.isArray(source.leadership) ? source.leadership : [];
    next.technicalStack = {
      languages: source.technicalStack?.languages || [],
      frameworks: source.technicalStack?.frameworks || [],
      tools: source.technicalStack?.tools || []
    };
    next.personalDetails = {
      dob: source.personalDetails?.dob || "",
      gender: source.personalDetails?.gender || "",
      fatherName: source.personalDetails?.fatherName || "",
      maritalStatus: source.personalDetails?.maritalStatus || "",
      hobbies: source.personalDetails?.hobbies || ""
    };
    next.references = Array.isArray(source.references) ? source.references : [];
    return next;
  };

  const state = {
    resume: buildDefaultResume(),
    selectedTemplate: "finance",
    sectionOrder: [...DEFAULT_SECTION_ORDER],
    sectionEnabled: { ...DEFAULT_SECTION_ENABLED },
    photoCrop: {
      image: null,
      cropperInstance: null
    }
  };

  const dom = {};

  const normalizeText = (value) => {
    if (typeof value !== "string") return "";
    // Replace multiple horizontal spaces with single space, but preserve newlines
    return value.replace(/[ \t]+/g, " ").trim();
  };

  const toTitleCase = (str) => {
    const text = normalizeText(str);
    if (!text) return "";
    return text
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const escapeHtml = (value) => {
    if (value === null || value === undefined) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/\n/g, "<br>");
  };

  // Linkify: converts http/https/www/domain.tld URLs in text into clickable links
  const linkify = (str) => {
    if (!str) return "";
    return str.replace(/(https?:\/\/[^\s<"]+|www\.[^\s<"]+|[a-zA-Z0-9.-]+\.(in|com|org|net|io|dev|co|edu|gov)(?:\/[^\s<"]*)?)/g, (url) => {
      let href = url;
      if (!href.startsWith("http")) href = "https://" + href;
      // strip trailing punctuation
      const trail = href.match(/[.,;:!?)]+$/);
      let suffix = "";
      if (trail) { suffix = trail[0]; href = href.slice(0, -trail[0].length); url = url.slice(0, -trail[0].length); }
      return `<a href="${href}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;">${url}</a>${suffix}`;
    });
  };

  const sanitizeUrl = (value) => {
    const cleaned = normalizeText(value);
    if (!cleaned) return "";
    if (/^https?:\/\//i.test(cleaned)) return cleaned;
    return `https://${cleaned}`;
  };

  const parseSkills = (value) => {
    if (!value) return [];
    return value.split(",")
      .map((skill) => normalizeText(skill))
      .filter(Boolean)
      .filter((skill, index, arr) => arr.findIndex((s) => s.toLowerCase() === skill.toLowerCase()) === index);
  };

  const cloneResume = (resume) => JSON.parse(JSON.stringify(resume || buildDefaultResume()));

  const formatLocation = (location) => {
    if (!location) return "";
    const parts = [location.city, location.state, location.country].filter(Boolean);
    return parts.join(", ");
  };

  const updateProfilePhotoPreview = (dataUrl) => {
    if (!dom.profilePhoto) return;
    const img = dom.profilePhoto.querySelector(".profile-photo-img");
    const initials = dom.profilePhoto.querySelector(".profile-photo-initials");
    if (!dataUrl || !img) {
      dom.profilePhoto.classList.remove("has-image");
      if (img) img.src = "";
      if (initials) initials.textContent = getInitials(state.resume.personalInfo.fullName || "");
      return;
    }
    img.src = dataUrl;
    dom.profilePhoto.classList.add("has-image");
    if (initials) initials.textContent = getInitials(state.resume.personalInfo.fullName || "");
  };

  const getInitials = (name) => {
    const parts = normalizeText(name).split(" ").filter(Boolean);
    if (parts.length === 0) return "JS";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  const updateSummaryHint = (value) => {
    if (!dom.summaryHint) return;
    const length = value.length;
    dom.summaryHint.textContent = `Aim for 2-4 concise lines. ${length}/${MAX_SUMMARY_CHARS} characters.`;
  };

  const createRepeaterItem = (templateId) => {
    const template = document.getElementById(templateId);
    if (!template) return null;
    return template.content.firstElementChild.cloneNode(true);
  };

  const readRepeater = (container, fields, options = {}) => {
    if (!container) return [];
    const items = Array.from(container.querySelectorAll(".repeater-item")).map((item) => {
      const entry = {};
      fields.forEach((field) => {
        const input = item.querySelector(`[data-field="${field}"]`);
        const rawValue = input?.value || "";
        if (options.multilineFields?.includes(field)) {
          entry[field] = splitLines(rawValue);
          return;
        }
        entry[field] = normalizeText(rawValue);
      });
      return entry;
    });
    return items.filter((item) => Object.values(item).some((value) => Array.isArray(value) ? value.length : value));
  };

  const writeRepeater = (container, items, templateId, options = {}) => {
    if (!container) return;
    container.innerHTML = "";
    const safeItems = Array.isArray(items) && items.length ? items : [];
    if (safeItems.length === 0 && options.addEmpty) {
      const emptyNode = createRepeaterItem(templateId);
      if (emptyNode) container.appendChild(emptyNode);
      return;
    }
    safeItems.forEach((item) => {
      const node = createRepeaterItem(templateId);
      if (!node) return;
      Object.entries(item || {}).forEach(([key, value]) => {
        const input = node.querySelector(`[data-field="${key}"]`);
        if (!input) return;
        if (Array.isArray(value)) {
          input.value = value.join("\n");
          return;
        }
        input.value = value || "";
      });
      container.appendChild(node);
    });
  };

  const readFormState = () => {
    const base = cloneResume(state.resume);
    const next = {
      ...base,
      personalInfo: {
        ...base.personalInfo,
        fullName: toTitleCase(dom.fullName?.value || ""),
        headline: toTitleCase(dom.headline?.value || ""),
        photoDataUrl: base.personalInfo.photoDataUrl || "",
        email: normalizeText(dom.email?.value || "").toLowerCase(),
        phone: normalizeText(dom.phone?.value || ""),
        location: {
          city: toTitleCase(dom.city?.value || ""),
          state: toTitleCase(dom.state?.value || ""),
          country: toTitleCase(dom.country?.value || "")
        },
        linkedin: sanitizeUrl(dom.linkedin?.value || ""),
        portfolio: sanitizeUrl(dom.portfolio?.value || "")
      },
      summary: toTitleCase(dom.summary?.value || ""),
      objective: toTitleCase(dom.objectiveInput?.value || ""),
      highlights: readRepeater(dom.highlightsList, ["value"]).map(item => item.value),
      coreCompetencies: readRepeater(dom.coreCompetenciesList, ["value"]).map(item => item.value),
      skills: {
        hard: parseSkills(dom.skillHard?.value || ""),
        tools: parseSkills(dom.skillTools?.value || ""),
        domain: parseSkills(dom.skillDomain?.value || "")
      },
      experience: readRepeater(dom.experienceList, ["jobTitle", "company", "location", "startDate", "endDate", "description", "bullets"], { multilineFields: ["bullets"] }).map(item => ({
        ...item,
        jobTitle: toTitleCase(item.jobTitle),
        company: toTitleCase(item.company),
        location: toTitleCase(item.location)
      })),
      education: readRepeater(dom.educationList, ["degree", "institution", "specialization", "startYear", "endYear", "location", "marks", "description"]).map(item => ({
        ...item,
        degree: toTitleCase(item.degree),
        institution: toTitleCase(item.institution),
        specialization: toTitleCase(item.specialization),
        location: toTitleCase(item.location)
      })),
      certifications: readRepeater(dom.certificationsList, ["name", "authority", "year"]).map(item => ({
        ...item,
        name: toTitleCase(item.name),
        authority: toTitleCase(item.authority)
      })),
      projects: readRepeater(dom.projectsList, ["title", "tools", "description", "outcome"]).map(item => ({
        ...item,
        title: toTitleCase(item.title)
      })),
      languages: readRepeater(dom.languagesList, ["language", "level"]).map(item => ({
        ...item,
        language: toTitleCase(item.language)
      })),
      personalDetails: {
        dob: normalizeText(dom.personalDob?.value || ""),
        gender: toTitleCase(dom.personalGender?.value || ""),
        fatherName: toTitleCase(dom.personalFather?.value || ""),
        maritalStatus: toTitleCase(dom.personalMarital?.value || ""),
        hobbies: normalizeText(dom.personalHobbies?.value || "")
      },
      internships: readRepeater(dom.internshipsList, ["organization", "role", "duration", "learnings"], { multilineFields: ["learnings"] }).map(item => ({
        ...item,
        learnings: Array.isArray(item.learnings) ? item.learnings : (item.learnings || "").split(",").map(s => s.trim()).filter(Boolean)
      })),
      awards: readRepeater(dom.awardsList, ["award"], { multilineFields: ["award"] }).map(item => item.award).flat(),
      publications: readRepeater(dom.publicationsList, ["title", "platform", "year"]),
      volunteer: readRepeater(dom.volunteerList, ["organization", "role", "impact"]),
      leadership: readRepeater(dom.leadershipList, ["organization", "role", "responsibilities"]),
      technicalStack: {
        languages: parseSkills(dom.techStackLanguages?.value || ""),
        frameworks: parseSkills(dom.techStackFrameworks?.value || ""),
        tools: parseSkills(dom.techStackTools?.value || "")
      },
      references: readRepeater(dom.referencesList, ["name", "role", "phone", "email"])
    };
    return next;
  };

  const writeFormState = (resume) => {
    if (dom.fullName) dom.fullName.value = resume.personalInfo.fullName || "";
    if (dom.headline) dom.headline.value = resume.personalInfo.headline || "";
    if (dom.email) dom.email.value = resume.personalInfo.email || "";
    if (dom.phone) dom.phone.value = resume.personalInfo.phone || "";
    if (dom.city) dom.city.value = resume.personalInfo.location?.city || "";
    if (dom.state) dom.state.value = resume.personalInfo.location?.state || "";
    if (dom.country) dom.country.value = resume.personalInfo.location?.country || "";
    if (dom.linkedin) dom.linkedin.value = resume.personalInfo.linkedin || "";
    if (dom.portfolio) dom.portfolio.value = resume.personalInfo.portfolio || "";
    if (dom.summary) dom.summary.value = resume.summary || "";
    if (dom.objectiveInput) dom.objectiveInput.value = resume.objective || "";

    writeRepeater(dom.highlightsList, (resume.highlights || []).map(v => ({ value: v })), "single-line-template");
    writeRepeater(dom.coreCompetenciesList, (resume.coreCompetencies || []).map(v => ({ value: v })), "single-line-template");
    if (dom.skillHard) dom.skillHard.value = (resume.skills?.hard || []).join(", ");
    if (dom.skillTools) dom.skillTools.value = (resume.skills?.tools || []).join(", ");
    if (dom.skillDomain) dom.skillDomain.value = (resume.skills?.domain || []).join(", ");
    writeRepeater(dom.experienceList, resume.experience, "experience-template", { addEmpty: true });
    writeRepeater(dom.educationList, resume.education, "education-template", { addEmpty: true });
    writeRepeater(dom.certificationsList, resume.certifications, "certification-template");
    writeRepeater(dom.projectsList, resume.projects, "project-template");
    writeRepeater(dom.languagesList, resume.languages, "language-template");
    writeRepeater(dom.internshipsList, resume.internships, "internship-template");
    writeRepeater(dom.awardsList, (resume.awards || []).map(a => ({ award: a })), "award-template");
    writeRepeater(dom.publicationsList, resume.publications, "publication-template");
    writeRepeater(dom.volunteerList, resume.volunteer, "volunteer-template");
    writeRepeater(dom.leadershipList, resume.leadership, "leadership-template");
    
    if (dom.techStackLanguages) dom.techStackLanguages.value = (resume.technicalStack?.languages || []).join(", ");
    if (dom.techStackFrameworks) dom.techStackFrameworks.value = (resume.technicalStack?.frameworks || []).join(", ");
    if (dom.techStackTools) dom.techStackTools.value = (resume.technicalStack?.tools || []).join(", ");
    
    if (dom.personalDob) dom.personalDob.value = resume.personalDetails?.dob || "";
    if (dom.personalGender) dom.personalGender.value = resume.personalDetails?.gender || "";
    if (dom.personalFather) dom.personalFather.value = resume.personalDetails?.fatherName || "";
    if (dom.personalMarital) dom.personalMarital.value = resume.personalDetails?.maritalStatus || "";
    if (dom.personalHobbies) dom.personalHobbies.value = resume.personalDetails?.hobbies || "";
    writeRepeater(dom.referencesList, resume.references, "reference-template");

    updateProfilePhotoPreview(resume.personalInfo.photoDataUrl || "");
    updateSummaryHint(resume.summary || "");
  };

  const renderSection = (title, body) => {
    if (!body) return "";
    if (state.selectedTemplate === "social") {
      return `<section class="resume-section">
        <div class="teacher-section-heading"><span>${escapeHtml(title).toUpperCase()}</span></div>
        ${body}
      </section>`;
    }
    return `<section class="resume-section"><h2>${escapeHtml(title)}</h2>${body}</section>`;
  };

  const renderList = (items) => {
    if (!Array.isArray(items) || items.length === 0) return "";
    return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  };

  const renderInlineList = (items) => {
    if (!Array.isArray(items) || items.length === 0) return "";
    return items.map((item) => escapeHtml(item)).join("  \u2022  ");
  };

  const renderSkillGroup = (label, items) => {
    if (!items || items.length === 0) return "";
    return `
      <div class="resume-subsection">
        <h3>${escapeHtml(label)}</h3>
        <p class="resume-tags">${renderInlineList(items)}</p>
      </div>
    `;
  };

  const formatRange = (start, end) => {
    if (!start && !end) return "";
    if (!start && end) return escapeHtml(end);
    if (start && !end) return `${escapeHtml(start)} - Present`;
    return `${escapeHtml(start)} - ${escapeHtml(end)}`;
  };

  const buildSectionDefinitions = () => ([
    {
      key: "headline",
      title: "Resume Headline",
      render: () => ""
    },
    {
      key: "summary",
      title: "Professional Summary",
      render: (resume) => {
        if (!resume.summary) return "";
        
        return renderSection("Professional Summary", `<p>${linkify(escapeHtml(resume.summary))}</p>`);
      }
    },
    {
      key: "objective",
      title: "Career Objective",
      render: (resume) => resume.objective
        ? renderSection("Career Objective", `<p>${linkify(escapeHtml(resume.objective))}</p>`)
        : ""
    },
    {
      key: "highlights",
      title: "Key Highlights",
      render: (resume) => renderSection("Key Highlights", renderList(resume.highlights || []))
    },
    {
      key: "coreCompetencies",
      title: "Core Competencies",
      render: (resume) => renderSection("Core Competencies", renderList(resume.coreCompetencies || []))
    },
    {
      key: "experience",
      title: "Experience", // Changed from "Work Experience" for better default
      render: (resume) => {
        const html = (resume.experience || []).map((item) => {
          const titleLine = [item.jobTitle, item.company].filter(Boolean).join("  \u2022  ");
          const range = formatRange(item.startDate, item.endDate);
          const meta = [range, item.location].filter(Boolean).join("  \u2022  ");
          const bullets = renderList(item.bullets);
          const description = item.description ? `<p>${linkify(escapeHtml(item.description))}</p>` : "";

          

          return `
            <article class="resume-item">
              <div class="resume-item-header">
                <h3>${escapeHtml(titleLine)}</h3>
                ${meta ? `<p class="resume-meta">${escapeHtml(meta)}</p>` : ""}
              </div>
              ${description}
              ${bullets}
            </article>
          `;
        }).join("");
        return renderSection("Work Experience", html);
      }
    },
    {
      key: "projects",
      title: "Projects",
      render: (resume) => {
        const html = (resume.projects || []).map((item) => {
          const meta = item.tools ? `<p class="resume-meta">${escapeHtml(item.tools)}</p>` : "";
          const desc = item.description ? `<p>${linkify(escapeHtml(item.description))}</p>` : "";
          const outcome = item.outcome ? `<p><strong>Outcome:</strong> ${linkify(escapeHtml(item.outcome))}</p>` : "";
          return `
            <article class="resume-item">
              <div class="resume-item-header">
                <h3>${escapeHtml(item.title || "")}</h3>
                ${meta}
              </div>
              ${desc}
              ${outcome}
            </article>
          `;
        }).join("");
        return renderSection("Projects", html);
      }
    },
    {
      key: "education",
      title: "Education",
      render: (resume) => {
        if (state.selectedTemplate === "social") {
          const rows = (resume.education || []).map(item => `
            <tr>
              <td>${escapeHtml(item.degree || "")}</td>
              <td>${escapeHtml(item.institution || "")}</td>
              <td>${escapeHtml(formatRange(item.startYear, item.endYear))}</td>
              <td>${escapeHtml(item.marks || "")}</td>
            </tr>
          `).join("");
          const tableHtml = `
            <table class="resume-education-table">
              <thead>
                <tr>
                  <th>Qualification</th>
                  <th>Institution</th>
                  <th>Year</th>
                  <th>Marks / CGPA</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          `;
          return renderSection("Education", tableHtml);
        }
        const html = (resume.education || []).map((item) => {
          const range = formatRange(item.startYear, item.endYear);
          
          

          const titleLine = [item.degree, item.institution].filter(Boolean).join("  \u2022  ");
          const meta = [range, item.location, item.specialization, item.marks].filter(Boolean).join("  \u2022  ");
          const description = item.description ? `<p>${linkify(escapeHtml(item.description))}</p>` : "";
          return `
            <article class="resume-item">
              <div class="resume-item-header">
                <h3>${escapeHtml(titleLine)}</h3>
                ${meta ? `<p class="resume-meta">${escapeHtml(meta)}</p>` : ""}
              </div>
              ${description}
            </article>
          `;
        }).join("");
        return renderSection("Education", html);
      }
    },
    {
      key: "certifications",
      title: "Certifications",
      render: (resume) => {
        const html = (resume.certifications || []).map((item) => {
          const meta = [item.authority, item.year].filter(Boolean).join("  \u2022  ");
          return `
            <article class="resume-item">
              <h3>${escapeHtml(item.name || "")}</h3>
              ${meta ? `<p class="resume-meta">${escapeHtml(meta)}</p>` : ""}
            </article>
          `;
        }).join("");
        return renderSection("Certifications", html);
      }
    },
    {
      key: "internships",
      title: "Internships / Training",
      render: (resume) => {
        const html = (resume.internships || []).map((item) => {
          const meta = [item.organization, item.role, item.duration].filter(Boolean).join("  \u2022  ");
          const learnings = renderList(item.learnings);
          return `
            <article class="resume-item">
              <h3>${escapeHtml(meta)}</h3>
              ${learnings}
            </article>
          `;
        }).join("");
        return renderSection("Internships / Training", html);
      }
    },
    {
      key: "awards",
      title: "Achievements & Awards",
      render: (resume) => renderSection("Achievements & Awards", renderList(resume.awards || []))
    },
    {
      key: "skills",
      title: "Expertise",
      render: (resume) => {
        if (state.selectedTemplate === "social") {
          const allSkills = [
            ...(resume.skills?.hard || []),
            ...(resume.skills?.tools || []),
            ...(resume.skills?.domain || [])
          ];
          return renderSection("Expertise", renderList(allSkills));
        }
        const hard = renderSkillGroup("Hard Skills", resume.skills?.hard || []);
        const tools = renderSkillGroup("Tools / Technologies", resume.skills?.tools || []);
        const domain = renderSkillGroup("Domain Skills", resume.skills?.domain || []);
        const html = [hard, tools, domain].filter(Boolean).join("");
        return renderSection("Expertise", html);
      }
    },
    {
      key: "technicalStack",
      title: "Technical Stack",
      render: (resume) => {
        const languages = renderSkillGroup("Languages", resume.technicalStack?.languages || []);
        const frameworks = renderSkillGroup("Frameworks", resume.technicalStack?.frameworks || []);
        const tools = renderSkillGroup("Tools", resume.technicalStack?.tools || []);
        const html = [languages, frameworks, tools].filter(Boolean).join("");
        return renderSection("Technical Stack", html);
      }
    },
    {
      key: "languages",
      title: "Languages",
      render: (resume) => {
        const html = (resume.languages || []).map((item) => {
          const meta = [item.language, item.level].filter(Boolean).join("  \u2022  ");
          return `<p class="resume-meta">${escapeHtml(meta)}</p>`;
        }).join("");
        return renderSection("Languages", html);
      }
    },
    {
      key: "publications",
      title: "Publications / Research",
      render: (resume) => {
        const html = (resume.publications || []).map((item) => {
          const meta = [item.platform, item.year].filter(Boolean).join("  \u2022  ");
          return `
            <article class="resume-item">
              <h3>${escapeHtml(item.title || "")}</h3>
              ${meta ? `<p class="resume-meta">${escapeHtml(meta)}</p>` : ""}
            </article>
          `;
        }).join("");
        return renderSection("Publications / Research", html);
      }
    },
    {
      key: "volunteer",
      title: "Volunteer Experience",
      render: (resume) => {
        const html = (resume.volunteer || []).map((item) => {
          const meta = [item.organization, item.role].filter(Boolean).join("  \u2022  ");
          return `
            <article class="resume-item">
              <h3>${escapeHtml(meta)}</h3>
              ${item.impact ? `<p>${escapeHtml(item.impact)}</p>` : ""}
            </article>
          `;
        }).join("");
        return renderSection("Volunteer Experience", html);
      }
    },
    {
      key: "leadership",
      title: "Leadership Experience",
      render: (resume) => {
        const html = (resume.leadership || []).map((item) => {
          const meta = [item.organization, item.role].filter(Boolean).join("  \u2022  ");
          return `
            <article class="resume-item">
              <h3>${escapeHtml(meta)}</h3>
              ${item.responsibilities ? `<p>${escapeHtml(item.responsibilities)}</p>` : ""}
            </article>
          `;
        }).join("");
        return renderSection("Leadership Experience", html);
      }
    },
    {
      key: "personalDetails",
      title: "Personal Details",
      render: (resume) => {
        const details = resume.personalDetails || {};
        if (state.selectedTemplate === "social") {
          const pairs = [
            ["Date of Birth", details.dob],
            ["Gender", details.gender],
            ["Father's Name", details.fatherName],
            ["Marital Status", details.maritalStatus],
            ["Languages Known", details.languages],
            ["Hobbies", details.hobbies]
          ].filter(pair => pair[1]);
          if (!pairs.length) return "";
          const rows = pairs.map(pair => `
            <tr>
              <td class="pd-label">${escapeHtml(pair[0])}</td>
              <td class="pd-sep">:</td>
              <td class="pd-val">${escapeHtml(pair[1])}</td>
            </tr>`).join("");
          return renderSection("Personal Details", `<table class="personal-details-table"><tbody>${rows}</tbody></table>`);
        }
        const lines = [
          details.fatherName ? `Father's Name: ${details.fatherName}` : "",
          details.dob ? `Date of Birth: ${details.dob}` : "",
          details.gender ? `Gender: ${details.gender}` : "",
          details.maritalStatus ? `Marital Status: ${details.maritalStatus}` : "",
          details.hobbies ? `Hobbies: ${details.hobbies}` : ""
        ].filter(Boolean);
        return renderSection("Personal Details", renderList(lines));
      }
    },
    {
      key: "references",
      title: "References",
      render: (resume) => {
        const html = (resume.references || []).map((item) => {
          return `
            <article class="reference-item">
              <h4>${escapeHtml(item.name || "")}</h4>
              <p>${escapeHtml(item.role || "")}</p>
              ${item.phone ? `<p>Phone: ${escapeHtml(item.phone)}</p>` : ""}
              ${item.email ? `<p>Email: ${escapeHtml(item.email)}</p>` : ""}
            </article>
          `;
        }).join("");
        
        
        return renderSection("References", html);
      }
    }
  ]);

  const renderResume = (resume, templateKey) => {
    const personal = resume.personalInfo || {};

    const sectionDefs = buildSectionDefinitions();
    const sectionMap = new Map(sectionDefs.map((item) => [item.key, item]));
    const sectionsHtml = (state.sectionOrder || []).map((key) => {
      if (!state.sectionEnabled[key]) return "";
      const def = sectionMap.get(key);
      if (!def) return "";
      const html = def.render(resume);
      if (!html) return "";
      return html.replace("<section ", `<section data-section="${escapeHtml(key)}" `);
    }).filter(Boolean).join("");

    const showHeadline = state.sectionEnabled.headline !== false;
    const photoHtml = personal.photoDataUrl
      ? `<div class="resume-photo"><img src="${escapeHtml(personal.photoDataUrl)}" alt="Profile photo" /></div>`
      : "";

    // Teacher template: contact on individual lines, label format, headline last
    if (templateKey === "social") {
      const location = formatLocation(personal.location);
      const makeTeacherLink = (url) => {
        if (!url) return "";
        const href = /^https?:\/\//i.test(url) ? url : "https://" + url;
        return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;">${escapeHtml(url)}</a>`;
      };
      const phoneHtml = personal.phone ? `<span style="display:inline-flex;align-items:center;gap:6px;"><i class="fas fa-phone-alt"></i> <a href="tel:${escapeHtml(personal.phone)}" style="color:inherit;text-decoration:none;">${escapeHtml(personal.phone)}</a></span>` : "";
        const emailHtml = personal.email ? `<span style="display:inline-flex;align-items:center;gap:6px;"><i class="fas fa-envelope"></i> <a href="mailto:${escapeHtml(personal.email)}" style="color:inherit;text-decoration:none;">${escapeHtml(personal.email)}</a></span>` : "";
        const line1 = [phoneHtml, emailHtml].filter(Boolean).join(' <span style="margin:0 8px;">&bull;</span> ');

        const locationHtml = location ? `<span style="display:inline-flex;align-items:center;gap:6px;"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(location)}</span>` : "";
        const line2 = [locationHtml].filter(Boolean).join("");

        const linkedinHtml = personal.linkedin ? `<span style="display:inline-flex;align-items:center;gap:6px;"><i class="fab fa-linkedin-in"></i> ${makeTeacherLink(personal.linkedin)}</span>` : "";
        const portfolioHtml = personal.portfolio ? `<span style="display:inline-flex;align-items:center;gap:6px;"><i class="fas fa-globe"></i> ${makeTeacherLink(personal.portfolio)}</span>` : "";
        const line3 = [linkedinHtml, portfolioHtml].filter(Boolean).join(' <span style="margin:0 8px;">&bull;</span> ');

        const contactLines = [
          line1 ? `<p class="resume-contact" style="display:flex;flex-wrap:wrap;align-items:center;margin-bottom:4px;">${line1}</p>` : "",
          line2 ? `<p class="resume-contact" style="display:flex;flex-wrap:wrap;align-items:center;margin-bottom:4px;">${line2}</p>` : "",
          line3 ? `<p class="resume-contact" style="display:flex;flex-wrap:wrap;align-items:center;margin-bottom:4px;">${line3}</p>` : ""
        ].filter(Boolean).join("");
      const headlinePart = personal.headline && showHeadline
        ? `<p class="resume-headline">${escapeHtml(personal.headline)}</p>` : "";
      return `
        <article class="resume template-${escapeHtml(templateKey)}">
          <header class="resume-header">
            <div class="resume-identity">
              <h1 class="resume-name">${escapeHtml(personal.fullName || "")}</h1>
              ${contactLines}
              ${headlinePart}
            </div>
            ${photoHtml}
          </header>
          ${sectionsHtml}
          <div class="resume-footer-lines">
            <hr class="resume-footer-line" />
            <hr class="resume-footer-line" />
          </div>
        </article>
      `.trim();
    }

    // Modern Sidebar Template: Multi-column partitioning
    if (templateKey === "modernSidebar") {
      const sidebarKeys = ["skills", "languages", "certifications", "awards", "personalDetails", "interests"];
      const sidebarHtml = (state.sectionOrder || []).map(key => {
        if (!state.sectionEnabled[key] || !sidebarKeys.includes(key)) return "";
        const def = sectionMap.get(key);
        if (!def) return "";
        const html = def.render(resume);
        if (!html) return "";
        return `<div class="sidebar-section">${html.replace("<section ", "<div ")}</div>`;
      }).filter(Boolean).join("");

      const mainHtml = (state.sectionOrder || []).map(key => {
        if (!state.sectionEnabled[key] || sidebarKeys.includes(key) || key === "headline") return "";
        const def = sectionMap.get(key);
        if (!def) return "";
        const html = def.render(resume);
        if (!html) return "";
        return `<div class="main-section">${html.replace("<section ", "<div ")}</div>`;
      }).filter(Boolean).join("");

      const location = formatLocation(personal.location);

      return `
        <article class="resume modernSidebar">
          <aside class="resume-sidebar">
            <div class="resume-photo-wrap">
              <img src="${personal.photoDataUrl || "/tools/resumebuilder/default-avatar.png"}" alt="Profile" />
            </div>
            
            <div class="sidebar-section" style="margin-bottom:30px;">
                <h3 style="color:#A0AEC0;font-size:0.85rem;text-transform:uppercase;letter-spacing:2px;margin-bottom:15px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:5px;">Contact</h3>
                ${personal.phone ? `<div class="sidebar-item" style="flex-direction:row;align-items:center;gap:10px;margin-bottom:10px;">
                  <i class="fas fa-phone-alt" style="width:16px;text-align:center;color:#A0AEC0;"></i>
                  <span class="sidebar-value" style="font-size:0.85rem;word-break:break-word;"><a href="tel:${escapeHtml(personal.phone)}" style="color:inherit;text-decoration:none;">${escapeHtml(personal.phone)}</a></span>
                </div>` : ""}
                ${personal.email ? `<div class="sidebar-item" style="flex-direction:row;align-items:center;gap:10px;margin-bottom:10px;">
                  <i class="fas fa-envelope" style="width:16px;text-align:center;color:#A0AEC0;"></i>
                  <span class="sidebar-value" style="font-size:0.85rem;word-break:break-all;"><a href="mailto:${escapeHtml(personal.email)}" style="color:inherit;text-decoration:none;">${escapeHtml(personal.email)}</a></span>
                </div>` : ""}
                ${location ? `<div class="sidebar-item" style="flex-direction:row;align-items:center;gap:10px;margin-bottom:10px;">
                  <i class="fas fa-map-marker-alt" style="width:16px;text-align:center;color:#A0AEC0;"></i>
                  <span class="sidebar-value" style="font-size:0.85rem;word-break:break-word;">${escapeHtml(location)}</span>
                </div>` : ""}
                ${personal.linkedin ? `<div class="sidebar-item" style="flex-direction:row;align-items:center;gap:10px;margin-bottom:10px;">
                  <i class="fab fa-linkedin-in" style="width:16px;text-align:center;color:#A0AEC0;"></i>
                  <span class="sidebar-value" style="font-size:0.85rem;word-break:break-all;"><a href="${/^https?:\/\//i.test(personal.linkedin) ? escapeHtml(personal.linkedin) : "https://" + escapeHtml(personal.linkedin)}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;">${escapeHtml(personal.linkedin)}</a></span>
                </div>` : ""}
                ${personal.portfolio ? `<div class="sidebar-item" style="flex-direction:row;align-items:center;gap:10px;margin-bottom:10px;">
                  <i class="fas fa-globe" style="width:16px;text-align:center;color:#A0AEC0;"></i>
                  <span class="sidebar-value" style="font-size:0.85rem;word-break:break-all;"><a href="${/^https?:\/\//i.test(personal.portfolio) ? escapeHtml(personal.portfolio) : "https://" + escapeHtml(personal.portfolio)}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;">${escapeHtml(personal.portfolio)}</a></span>
                </div>` : ""}
              </div>

            <style>
              .resume.modernSidebar .resume-sidebar .resume-item {
                margin-bottom: 20px !important;
                text-align: left !important;
              }
              .resume.modernSidebar .resume-sidebar .resume-item h3 {
                font-size: 0.95rem !important;
                color: #fff !important;
                margin-bottom: 4px !important;
                font-weight: 700 !important;
                text-transform: none !important;
                border: none !important;
              }
              .resume.modernSidebar .resume-sidebar .resume-meta {
                font-size: 0.8rem !important;
                color: #A0AEC0 !important;
                margin-bottom: 10px !important;
              }
              .resume.modernSidebar .resume-sidebar .resume-item p,
              .resume.modernSidebar .resume-sidebar .resume-item li {
                font-size: 0.82rem !important;
                color: #E2E8F0 !important;
                line-height: 1.4 !important;
              }
              .resume.modernSidebar .resume-sidebar .resume-item ul {
                padding-left: 15px !important;
                margin-top: 5px !important;
                margin-bottom: 10px !important;
              }
            </style>
            ${sidebarHtml}
          </aside>

          <main class="resume-main">
            <header class="main-header">
              <h1>${personal.fullName || "Mariana Anderson"}</h1>
              ${personal.headline && showHeadline ? `<p>${personal.headline}</p>` : ""}
            </header>
            
            ${mainHtml}
            <div class="resume-footer-lines resume-footer-lines--main">
              <hr class="resume-footer-line" />
              <hr class="resume-footer-line" />
            </div>
          </main>
        </article>
      `.trim();
    }


    // --- 5 Premium Templates Logic ---
    const makeUrlLink = (url) => {
      if (!url) return "";
      const href = /^https?:\/\//i.test(url) ? url : "https://" + url;
      return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;">${escapeHtml(url)}</a>`;
    };
    const generateSections = (keys) => {
      return (state.sectionOrder || []).map(key => {
        if (!state.sectionEnabled[key] || !keys.includes(key) || key === "headline") return "";
        const def = sectionMap.get(key);
        if (!def) return "";
        const html = def.render(resume);
        return html ? `<div>${html.replace("<section ", "<div ")}</div>` : "";
      }).filter(Boolean).join("");
    };

    // All other templates — Build clickable contact/links with icons
    const makeLink = (url) => {
      if (!url) return "";
      const href = /^https?:\/\//i.test(url) ? url : "https://" + url;
      return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;">${escapeHtml(url)}</a>`;
    };
        const emailLink = personal.email
      ? `<span style="white-space:nowrap;display:inline-flex;align-items:center;gap:6px;"><i class="fas fa-envelope"></i> <a href="mailto:${escapeHtml(personal.email)}" style="color:inherit;text-decoration:none;">${escapeHtml(personal.email)}</a></span>`
      : "";
    const phoneText = personal.phone ? `<span style="white-space:nowrap;display:inline-flex;align-items:center;gap:6px;"><i class="fas fa-phone-alt"></i> <a href="tel:${escapeHtml(personal.phone)}" style="color:inherit;text-decoration:none;">${escapeHtml(personal.phone)}</a></span>` : "";
    const locationText = formatLocation(personal.location) ? `<span style="white-space:nowrap;display:inline-flex;align-items:center;gap:6px;"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(formatLocation(personal.location))}</span>` : "";
    
    const linkedinLink = personal.linkedin ? `<span style="white-space:nowrap;display:inline-flex;align-items:center;gap:6px;"><i class="fab fa-linkedin-in"></i> ${makeLink(personal.linkedin)}</span>` : "";
    const portfolioLink = personal.portfolio ? `<span style="white-space:nowrap;display:inline-flex;align-items:center;gap:6px;"><i class="fas fa-globe"></i> ${makeLink(personal.portfolio)}</span>` : "";
    
    const line1 = [phoneText, emailLink].filter(Boolean).join(' <span style="margin:0 8px;">&bull;</span> ');
    const line2 = [locationText].filter(Boolean).join("");
    const line3 = [linkedinLink, portfolioLink].filter(Boolean).join(' <span style="margin:0 8px;">&bull;</span> ');

    const contactParts = [
      line1 ? `<span style="display:block;margin-bottom:4px;">${line1}</span>` : "",
      line2 ? `<span style="display:block;margin-bottom:4px;">${line2}</span>` : "",
      line3 ? `<span style="display:block;margin-bottom:4px;">${line3}</span>` : ""
    ].filter(Boolean).join("");
    const linksParts = "";

    if (templateKey === "forestSidebar") {
      const sidebarKeys = ["awards","skills","technicalStack","languages","volunteer","personalDetails"];
      const mainKeys = state.sectionOrder.filter(k => !sidebarKeys.includes(k));
      const sidebarSections = generateSections(sidebarKeys);
      const mainSections = generateSections(mainKeys);
      return `
        <article class="resume template-forestSidebar" style="display:block!important;width:800px!important;max-width:800px!important;min-height:1122px!important;margin:0 auto;font-family:'Inter',sans-serif;color:#333;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,0.1);overflow:hidden;">
          <div style="display:flex!important;flex-direction:row!important;width:100%!important;min-height:1122px!important;align-items:stretch!important;">
            <aside class="resume-sidebar" style="width:34%!important;flex-shrink:0!important;background:linear-gradient(180deg,#1b2823,#0d1411);color:#e5e0d8;display:flex!important;flex-direction:column!important;">
              <div style="width:100%;aspect-ratio:1/1;background:#ddd;overflow:hidden;">
                <img src="${personal.photoDataUrl || '/tools/resumebuilder/default-avatar.png'}" alt="Profile" style="width:100%;height:100%;object-fit:cover;display:block;" />
              </div>
              <div style="padding:25px 22px!important;flex:1;">
                <div style="margin-bottom:20px;">
                  <h3 style="color:#fff;border-top:1px solid rgba(255,255,255,0.3);border-bottom:1px solid rgba(255,255,255,0.3);padding:6px 0;font-size:0.85rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Contact</h3>
                  ${personal.phone ? `<p style="font-size:0.8rem;margin-bottom:8px;display:flex;align-items:center;gap:8px;"><i class="fas fa-phone-alt" style="color:#cfa068;width:14px;text-align:center;"></i> <a href="tel:${escapeHtml(personal.phone)}" style="color:#e5e0d8;text-decoration:none;">${escapeHtml(personal.phone)}</a></p>` : ""}
                  ${personal.email ? `<p style="font-size:0.8rem;margin-bottom:8px;display:flex;align-items:center;gap:8px;word-break:break-all;"><i class="fas fa-envelope" style="color:#cfa068;width:14px;text-align:center;"></i> <a href="mailto:${escapeHtml(personal.email)}" style="color:#e5e0d8;text-decoration:none;">${escapeHtml(personal.email)}</a></p>` : ""}
                  ${formatLocation(personal.location) ? `<p style="font-size:0.8rem;margin-bottom:8px;display:flex;align-items:flex-start;gap:8px;"><i class="fas fa-map-marker-alt" style="color:#cfa068;width:14px;text-align:center;margin-top:3px;"></i> <span>${escapeHtml(formatLocation(personal.location))}</span></p>` : ""}
                  ${personal.linkedin ? `<p style="font-size:0.8rem;margin-bottom:8px;display:flex;align-items:center;gap:8px;word-break:break-all;"><i class="fab fa-linkedin-in" style="color:#cfa068;width:14px;text-align:center;"></i> ${makeUrlLink(personal.linkedin)}</p>` : ""}
                  ${personal.portfolio ? `<p style="font-size:0.8rem;margin-bottom:8px;display:flex;align-items:center;gap:8px;word-break:break-all;"><i class="fas fa-globe" style="color:#cfa068;width:14px;text-align:center;"></i> ${makeUrlLink(personal.portfolio)}</p>` : ""}
                </div>
                <style>.template-forestSidebar .resume-sidebar h2,.template-forestSidebar .resume-sidebar h3{color:#fff!important;border-top:1px solid rgba(255,255,255,0.3)!important;border-bottom:1px solid rgba(255,255,255,0.3)!important;font-size:0.85rem!important;text-transform:uppercase!important;letter-spacing:1px!important;padding:6px 0!important;margin-bottom:12px!important;background:none!important;} .template-forestSidebar .resume-sidebar *{color:#e5e0d8!important;} .template-forestSidebar .resume-sidebar h2,.template-forestSidebar .resume-sidebar h3{color:#fff!important;}</style>
                ${sidebarSections}
              </div>
            </aside>
            <main class="resume-main" style="flex:1!important;padding:35px 30px!important;background:#fff;box-sizing:border-box;">
              <header style="margin-bottom:30px;">
                <h1 style="font-size:2.6rem;font-weight:900;color:#111;text-transform:uppercase;line-height:1.1;margin-bottom:8px;word-break:break-word;">${escapeHtml(personal.fullName || "Name")}</h1>
                ${personal.headline && showHeadline ? `<p style="color:#cfa068;font-weight:400;font-size:1.4rem;text-transform:capitalize;">${escapeHtml(personal.headline)}</p>` : ""}
              </header>
              <style>.template-forestSidebar .resume-main .resume-section h2{color:#111!important;border-bottom:2px solid #111!important;text-transform:uppercase!important;font-size:0.9rem!important;letter-spacing:1px!important;padding-bottom:6px!important;margin-bottom:14px!important;background:none!important;} .template-forestSidebar .resume-main .resume-item-header { display:flex; justify-content: space-between; align-items: baseline; } .template-forestSidebar .resume-main .resume-item-title { font-weight: 700; color:#111; } .template-forestSidebar .resume-main .resume-item-date { background: #111; color: #fff; padding: 2px 8px; font-size: 0.75rem; border-radius: 3px; }</style>
              ${mainSections}
            </main>
          </div>
        </article>`.trim();
    }

    if (templateKey === "slateModern") {
      const rightKeys = ["education","skills","technicalStack","certifications","languages"];
      const leftKeys = state.sectionOrder.filter(k => !rightKeys.includes(k));
      return `
        <article class="resume template-slateModern" style="display:block!important;width:800px!important;max-width:800px!important;min-height:1122px!important;margin:0 auto;font-family:'Outfit',sans-serif;background:#2b3036;color:#e0e6ed;box-shadow:0 10px 30px rgba(0,0,0,0.1);overflow:hidden;border-left:15px solid #1abc9c;">
          <header style="padding:40px 40px 20px!important;border-bottom:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;gap:30px;">
            <img src="${personal.photoDataUrl || '/tools/resumebuilder/default-avatar.png'}" alt="Profile" style="width:120px;height:120px;object-fit:cover;border-radius:12px;border:3px solid #1abc9c;" />
            <div>
              <h1 style="font-size:2.8rem;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;">${escapeHtml(personal.fullName || "Name")}</h1>
              ${personal.headline && showHeadline ? `<p style="color:#1abc9c;font-size:1.3rem;font-weight:400;margin-bottom:10px;">${escapeHtml(personal.headline)}</p>` : ""}
              <div style="display:flex;flex-wrap:wrap;gap:10px 20px;font-size:0.85rem;color:#b0bac5;">
                ${personal.phone ? `<span><i class="fas fa-phone-alt" style="color:#1abc9c;width:14px;text-align:center;"></i> <a href="tel:${escapeHtml(personal.phone)}" style="color:#b0bac5;text-decoration:none;">${escapeHtml(personal.phone)}</a></span>` : ""}
                ${personal.email ? `<span><i class="fas fa-envelope" style="color:#1abc9c;width:14px;text-align:center;"></i> <a href="mailto:${escapeHtml(personal.email)}" style="color:#b0bac5;text-decoration:none;">${escapeHtml(personal.email)}</a></span>` : ""}
                ${personal.linkedin ? `<span><i class="fab fa-linkedin-in" style="color:#1abc9c;width:14px;text-align:center;"></i> ${makeUrlLink(personal.linkedin)}</span>` : ""}
                ${formatLocation(personal.location) ? `<span><i class="fas fa-map-marker-alt" style="color:#1abc9c;width:14px;text-align:center;"></i> ${escapeHtml(formatLocation(personal.location))}</span>` : ""}
                ${personal.portfolio ? `<span><i class="fas fa-globe" style="color:#1abc9c;width:14px;text-align:center;"></i> ${makeUrlLink(personal.portfolio)}</span>` : ""}
              </div>
            </div>
          </header>
          <div style="display:flex!important;flex-direction:row!important;width:100%!important;">
            <main style="flex:1!important;padding:30px 40px!important;box-sizing:border-box;">
              <style>.template-slateModern main .resume-section h2{color:#1abc9c!important;border-bottom:1px solid rgba(26,188,156,0.3)!important;text-transform:uppercase!important;font-size:1rem!important;letter-spacing:2px!important;padding-bottom:6px!important;margin-bottom:16px!important;background:none!important;} .template-slateModern main *{color:#e0e6ed;} .template-slateModern main strong, .template-slateModern main .resume-item-title { color: #fff; font-weight:600; } .template-slateModern main .resume-item-date { color: #1abc9c; font-size:0.8rem; }</style>
              ${generateSections(leftKeys)}
            </main>
            <aside style="flex:0 0 32%!important;width:32%!important;background:rgba(0,0,0,0.15);padding:30px 25px!important;box-sizing:border-box;">
              <style>.template-slateModern aside .resume-section h2{color:#1abc9c!important;border-bottom:1px solid rgba(26,188,156,0.3)!important;text-transform:uppercase!important;font-size:0.9rem!important;letter-spacing:2px!important;padding-bottom:6px!important;margin-bottom:16px!important;background:none!important;} .template-slateModern aside *{color:#b0bac5;} .template-slateModern aside strong, .template-slateModern aside .resume-item-title { color: #fff; font-weight:600; }</style>
              ${generateSections(rightKeys)}
            </aside>
          </div>
        </article>`.trim();
    }

    if (templateKey === "emeraldSplit") {
      const rightKeys = ["education","skills","technicalStack","certifications"];
      const leftKeys = state.sectionOrder.filter(k => !rightKeys.includes(k));
      return `
        <article class="resume template-emeraldSplit" style="display:block!important;width:800px!important;max-width:800px!important;min-height:1122px!important;margin:0 auto;font-family:'Inter',sans-serif;color:#333;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,0.1);overflow:hidden;">
          <header style="background:#0f4c3a;padding:45px 50px!important;color:#fff;display:flex;justify-content:space-between;align-items:center;">
            <div style="flex:1;">
              <h1 style="font-size:3.2rem;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;line-height:1;">${escapeHtml(personal.fullName || "Name")}</h1>
              ${personal.headline && showHeadline ? `<p style="color:#81d4a3;font-size:1.3rem;font-weight:400;margin-bottom:20px;text-transform:uppercase;letter-spacing:2px;">${escapeHtml(personal.headline)}</p>` : ""}
              <div style="display:flex;flex-wrap:wrap;gap:8px 15px;font-size:0.85rem;color:#e8f5e9;">
                ${personal.phone ? `<span><i class="fas fa-phone-alt"></i> <a href="tel:${escapeHtml(personal.phone)}" style="color:#e8f5e9;text-decoration:none;">${escapeHtml(personal.phone)}</a></span>` : ""}
                ${personal.email ? `<span><i class="fas fa-envelope"></i> <a href="mailto:${escapeHtml(personal.email)}" style="color:#e8f5e9;text-decoration:none;">${escapeHtml(personal.email)}</a></span>` : ""}
                ${personal.linkedin ? `<span><i class="fab fa-linkedin-in"></i> ${makeUrlLink(personal.linkedin)}</span>` : ""}
                ${formatLocation(personal.location) ? `<span><i class="fas fa-map-marker-alt"></i> ${escapeHtml(formatLocation(personal.location))}</span>` : ""}
                ${personal.portfolio ? `<span><i class="fas fa-globe"></i> ${makeUrlLink(personal.portfolio)}</span>` : ""}
              </div>
            </div>
            <img src="${personal.photoDataUrl || '/tools/resumebuilder/default-avatar.png'}" alt="Profile" style="width:130px;height:130px;object-fit:cover;border-radius:50%;border:4px solid #81d4a3;margin-left:20px;" />
          </header>
          <div style="display:flex!important;flex-direction:row!important;width:100%!important;">
            <main style="flex:1!important;padding:40px 50px!important;box-sizing:border-box;">
              <style>.template-emeraldSplit main .resume-section h2{color:#0f4c3a!important;font-size:1.1rem!important;text-transform:uppercase!important;letter-spacing:1px!important;padding-bottom:5px!important;margin-bottom:18px!important;border-bottom:3px solid #0f4c3a!important;background:none!important;} .template-emeraldSplit main .resume-item-title { font-weight: 700; color:#111; } .template-emeraldSplit main .resume-item-date { color: #0f4c3a; font-weight:600; font-size:0.85rem; }</style>
              ${generateSections(leftKeys)}
            </main>
            <aside style="flex:0 0 35%!important;width:35%!important;background:#f5f9f7;padding:40px 30px!important;box-sizing:border-box;border-left:1px solid #e0e0e0;">
              <style>.template-emeraldSplit aside .resume-section h2{color:#0f4c3a!important;font-size:1rem!important;text-transform:uppercase!important;letter-spacing:1px!important;padding-bottom:5px!important;margin-bottom:18px!important;border-bottom:2px solid #81d4a3!important;background:none!important;} .template-emeraldSplit aside .resume-item-title { font-weight: 700; color:#111; }</style>
              ${generateSections(rightKeys)}
            </aside>
          </div>
        </article>`.trim();
    }

    if (templateKey === "navyOverlap") {
      const rightKeys = ["education","skills","technicalStack","certifications"];
      const leftKeys = state.sectionOrder.filter(k => !rightKeys.includes(k));
      return `
        <article class="resume template-navyOverlap" style="display:block!important;width:800px!important;max-width:800px!important;min-height:1122px!important;margin:0 auto;font-family:'Inter',sans-serif;background:#f4f6f8;box-shadow:0 10px 30px rgba(0,0,0,0.1);padding-top:50px!important;overflow:hidden;">
          <header style="padding:0 50px 90px!important;">
            <h1 style="font-size:3rem;font-weight:800;color:#2a3b4c;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">${escapeHtml(personal.fullName || "Name")}</h1>
            ${personal.headline && showHeadline ? `<p style="color:#555;font-size:1.2rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:15px;">${escapeHtml(personal.headline)}</p>` : ""}
            <div style="display:flex;flex-wrap:wrap;gap:8px 20px;font-size:0.85rem;color:#666;border-top:1px solid #ccc;border-bottom:1px solid #ccc;padding:10px 0;">
              ${personal.phone ? `<span style="display:flex;align-items:center;gap:6px;"><i class="fas fa-phone-alt"></i> <a href="tel:${escapeHtml(personal.phone)}" style="color:#666;text-decoration:none;">${escapeHtml(personal.phone)}</a></span>` : ""}
              ${personal.email ? `<span style="display:flex;align-items:center;gap:6px;"><i class="fas fa-envelope"></i> <a href="mailto:${escapeHtml(personal.email)}" style="color:#666;text-decoration:none;">${escapeHtml(personal.email)}</a></span>` : ""}
              ${personal.linkedin ? `<span style="display:flex;align-items:center;gap:6px;"><i class="fab fa-linkedin-in"></i> ${makeUrlLink(personal.linkedin)}</span>` : ""}
              ${formatLocation(personal.location) ? `<span style="display:flex;align-items:center;gap:6px;"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(formatLocation(personal.location))}</span>` : ""}
              ${personal.portfolio ? `<span style="display:flex;align-items:center;gap:6px;"><i class="fas fa-globe"></i> ${makeUrlLink(personal.portfolio)}</span>` : ""}
            </div>
          </header>
          <div style="display:flex!important;flex-direction:row!important;position:relative;">
            <main style="flex:1!important;padding:30px 50px 40px!important;box-sizing:border-box;">
              <style>.template-navyOverlap main .resume-section h2{color:#2a3b4c!important;border-bottom:2px solid #2a3b4c!important;text-transform:uppercase!important;font-size:0.95rem!important;letter-spacing:1px!important;padding-bottom:6px!important;margin-bottom:18px!important;background:none!important;display:flex;align-items:center;gap:10px;} .template-navyOverlap main .resume-section h2::before { content:'♦'; font-size:1.4rem; }</style>
              ${generateSections(leftKeys)}
            </main>
            <aside style="flex:0 0 35%!important;width:35%!important;background:#2a3b4c;color:#e0e6ed;padding:30px 30px 40px!important;box-sizing:border-box;position:relative;">
              <div style="margin-top: 80px!important;">
                <img src="${personal.photoDataUrl || '/tools/resumebuilder/default-avatar.png'}" alt="Profile" style="width:160px;height:160px;object-fit:cover;border-radius:50%;border:6px solid #f4f6f8;position:absolute;top:-80px;left:50%;transform:translateX(-50%);background:#fff;" />
                <style>.template-navyOverlap aside h2,.template-navyOverlap aside h3{color:#fff!important;border-bottom:1px solid rgba(255,255,255,0.3)!important;border-top:1px solid rgba(255,255,255,0.3)!important;text-transform:uppercase!important;font-size:0.9rem!important;letter-spacing:1px!important;padding:8px 0!important;margin-bottom:18px!important;background:none!important;text-align:center;} .template-navyOverlap aside *{color:#e0e6ed!important;} .template-navyOverlap aside h2,.template-navyOverlap aside h3{color:#fff!important;}</style>
                ${generateSections(rightKeys)}
              </div>
            </aside>
          </div>
        </article>`.trim();
    }

    if (templateKey === "floralSidebar") {
      const sidebarKeys = ["skills","languages","awards","personalDetails","interests"];
      const mainKeys = state.sectionOrder.filter(k => !sidebarKeys.includes(k));
      const sidebarSections = generateSections(sidebarKeys);
      const mainSections = generateSections(mainKeys);
      return `
        <article class="resume template-floralSidebar" style="display:block!important;width:800px!important;max-width:800px!important;min-height:1122px!important;margin:0 auto;font-family:'Georgia',serif;color:#444;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,0.1);overflow:hidden;">
          <div style="display:flex!important;flex-direction:row!important;width:100%!important;min-height:1122px!important;align-items:stretch!important;">
            <aside class="resume-sidebar" style="width:34%!important;flex-shrink:0!important;background:#e8e8e8;padding:45px 30px!important;box-sizing:border-box;text-align:center;">
              <img src="${personal.photoDataUrl || '/tools/resumebuilder/default-avatar.png'}" alt="Profile" style="width:140px;height:140px;object-fit:cover;border-radius:50%;display:block;margin:0 auto 30px;border:5px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,0.1);" />
              <div style="margin-bottom:30px;text-align:left;">
                <h3 style="color:#333;font-size:0.85rem;text-transform:uppercase;letter-spacing:3px;margin-bottom:15px;border-bottom:1px solid #ccc;padding-bottom:5px;text-align:center;">Contact</h3>
                ${formatLocation(personal.location) ? `<p style="font-size:0.8rem;margin-bottom:10px;display:flex;align-items:center;gap:8px;"><i class="fas fa-map-marker-alt" style="color:#777;width:14px;text-align:center;"></i> <span>${escapeHtml(formatLocation(personal.location))}</span></p>` : ""}
                ${personal.phone ? `<p style="font-size:0.8rem;margin-bottom:10px;display:flex;align-items:center;gap:8px;"><i class="fas fa-phone-alt" style="color:#777;width:14px;text-align:center;"></i> <a href="tel:${escapeHtml(personal.phone)}" style="color:#444;text-decoration:none;">${escapeHtml(personal.phone)}</a></p>` : ""}
                ${personal.email ? `<p style="font-size:0.8rem;margin-bottom:10px;display:flex;align-items:center;gap:8px;word-break:break-all;"><i class="fas fa-envelope" style="color:#777;width:14px;text-align:center;"></i> <a href="mailto:${escapeHtml(personal.email)}" style="color:#444;text-decoration:none;">${escapeHtml(personal.email)}</a></p>` : ""}
                ${personal.linkedin ? `<p style="font-size:0.8rem;margin-bottom:10px;display:flex;align-items:center;gap:8px;word-break:break-all;"><i class="fab fa-linkedin-in" style="color:#777;width:14px;text-align:center;"></i> ${makeUrlLink(personal.linkedin)}</p>` : ""}
                ${personal.portfolio ? `<p style="font-size:0.8rem;margin-bottom:10px;display:flex;align-items:center;gap:8px;word-break:break-all;"><i class="fas fa-globe" style="color:#777;width:14px;text-align:center;"></i> ${makeUrlLink(personal.portfolio)}</p>` : ""}
              </div>
              <style>.template-floralSidebar .resume-sidebar h2,.template-floralSidebar .resume-sidebar h3{color:#333!important;font-size:0.85rem!important;text-transform:uppercase!important;letter-spacing:3px!important;padding-bottom:5px!important;margin-bottom:15px!important;border-bottom:1px solid #ccc!important;border-top:none!important;border-left:none!important;border-right:none!important;background:none!important;text-align:center!important;} .template-floralSidebar .resume-sidebar .resume-item { text-align: center; }</style>
              ${sidebarSections}
            </aside>
            <main class="resume-main" style="flex:1!important;padding:55px 45px!important;background:#fff;box-sizing:border-box;">
              <header style="margin-bottom:40px;text-align:center;">
                <h1 style="font-size:2.8rem;font-weight:400;color:#222;text-transform:uppercase;letter-spacing:8px;margin-bottom:15px;line-height:1.2;">${escapeHtml(personal.fullName || "Name").replace(/ /g, '<br>')}</h1>
                ${personal.headline && showHeadline ? `<p style="font-style:italic;color:#666;font-size:1.1rem;letter-spacing:2px;position:relative;display:inline-block;">${escapeHtml(personal.headline)}<span style="position:absolute;top:50%;left:-50px;width:40px;height:1px;background:#ccc;"></span><span style="position:absolute;top:50%;right:-50px;width:40px;height:1px;background:#ccc;"></span></p>` : ""}
              </header>
              <style>.template-floralSidebar .resume-main .resume-section h2{background:#4a3e47!important;color:#fff!important;font-size:0.9rem!important;text-transform:uppercase!important;letter-spacing:5px!important;padding:8px 15px!important;margin-bottom:18px!important;border:none!important;text-align:center;}</style>
              ${mainSections}
            </main>
          </div>
        </article>`.trim();
    }


    return `
      <article class="resume template-${escapeHtml(templateKey)}">
        <header class="resume-header">
          <div class="resume-identity">
            <h1 class="resume-name">${escapeHtml(personal.fullName || "")}</h1>
            ${personal.headline && showHeadline ? `<p class="resume-headline">${escapeHtml(personal.headline)}</p>` : ""}
            ${contactParts ? `<p class="resume-contact">${contactParts}</p>` : ""}
            ${linksParts ? `<p class="resume-links">${linksParts}</p>` : ""}
          </div>
          ${photoHtml}
        </header>
        ${sectionsHtml}
        <div class="resume-footer-lines">
          <hr class="resume-footer-line" />
          <hr class="resume-footer-line" />
        </div>
      </article>
    `.trim();
  };

  const updatePreview = () => {
    if (!dom.preview) return;
    try {
      dom.preview.innerHTML = renderResume(state.resume, state.selectedTemplate);
    } catch (e) {
      dom.preview.innerHTML = `<div style="color:red; padding: 20px;"><h3>Render Error:</h3><pre>${e.stack}</pre></div>`;
      console.error(e);
    }
  };

  const scoreResume = (resume) => {
    const personal = resume.personalInfo || {};
    let score = 0;
    const maxRaw = 100;
    const breakdown = {
      contact: 0,
      summary: 0,
      experience: 0,
      education: 0,
      skills: 0
    };
    const contactFields = [
      personal.fullName,
      personal.email,
      personal.phone,
      personal.location?.city,
      personal.location?.state,
      personal.location?.country,
      personal.linkedin,
      personal.portfolio
    ];
    breakdown.contact = Math.min(contactFields.filter(Boolean).length * 5, 30);
    breakdown.summary = resume.summary ? Math.min(Math.round((resume.summary.length / 200) * 15), 15) : 0;
    breakdown.experience = Math.min((resume.experience || []).length * 10, 30);
    breakdown.education = Math.min((resume.education || []).length * 5, 15);
    const skillCount = [
      ...(resume.skills?.hard || []),
      ...(resume.skills?.tools || []),
      ...(resume.skills?.domain || [])
    ].length;
    breakdown.skills = Math.min(skillCount * 2, 10);
    const rawScore = breakdown.contact + breakdown.summary + breakdown.experience + breakdown.education + breakdown.skills;
    score = Math.min(rawScore, 100);
    return { score, breakdown, rawScore, maxRaw };
  };

  const updateScore = () => {
    if (!dom.scoreValue || !dom.scoreFeedback) return;
    const { score, breakdown } = scoreResume(state.resume);
    dom.scoreValue.textContent = String(score);
    dom.scoreFeedback.textContent = `Contact ${breakdown.contact}/30  \u2022  Summary ${breakdown.summary}/15  \u2022  Experience ${breakdown.experience}/30  \u2022  Education ${breakdown.education}/15  \u2022  Skills ${breakdown.skills}/10`;
  };

  const renderSectionManager = () => {
    if (!dom.sectionManager) return;
    dom.sectionManager.innerHTML = "";
    const definitions = buildSectionDefinitions();
    const labelMap = new Map(definitions.map((item) => [item.key, item.title]));
    state.sectionOrder.forEach((key, index) => {
      const row = document.createElement("div");
      row.className = "section-item";
      row.innerHTML = `
        <label class="section-toggle">
          <input type="checkbox" data-action="toggle-section" data-key="${escapeHtml(key)}" ${state.sectionEnabled[key] ? "checked" : ""} />
          <span>${escapeHtml(labelMap.get(key) || key)}</span>
        </label>
        <div class="section-controls">
          <button class="btn btn-ghost" type="button" data-action="move-up" data-key="${escapeHtml(key)}" ${index === 0 ? "disabled" : ""}>Up</button>
          <button class="btn btn-ghost" type="button" data-action="move-down" data-key="${escapeHtml(key)}" ${index === state.sectionOrder.length - 1 ? "disabled" : ""}>Down</button>
        </div>
      `;
      dom.sectionManager.appendChild(row);
    });
    syncFormVisibility();
  };

  const syncFormVisibility = () => {
    const formSections = document.querySelectorAll("[data-section-form]");
    formSections.forEach((section) => {
      const key = section.dataset.sectionForm;
      if (key === "personalInfo" || key === "personalDetails") {
        section.hidden = false;
        section.style.display = "block";
        return;
      }
      const isEnabled = state.sectionEnabled[key] !== false;
      section.hidden = !isEnabled;
      section.style.display = isEnabled ? "block" : "none";
    });
  };

  const validateResume = (resume) => {
    const errors = [];
    if (!resume.personalInfo.fullName) errors.push("Full Name is missing.");
    if (!resume.personalInfo.email) errors.push("Email Address is missing.");
    if (resume.personalInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resume.personalInfo.email)) {
      errors.push("Email Address is invalid.");
    }
    if (resume.summary && resume.summary.length > MAX_SUMMARY_CHARS) {
      errors.push(`Summary is too long (Max ${MAX_SUMMARY_CHARS} chars).`);
    }
    return errors;
  };

  const showErrorModal = (errors) => {
    if (!dom.errorModal || !dom.errorList) return;
    dom.errorList.innerHTML = errors.map(err => `<li>${escapeHtml(err)}</li>`).join("");
    dom.errorModal.hidden = false;
  };

  const closeErrorModal = () => {
    if (dom.errorModal) dom.errorModal.hidden = true;
  };

  const openTemplateModal = () => {
    if (!dom.templateModal || !dom.modalTemplateGrid) return;
    // Clear and clone original template cards into modal
    dom.modalTemplateGrid.innerHTML = "";
    const originalCards = document.querySelectorAll(".templates .template-card");
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.addEventListener("click", () => {
        const key = clone.dataset.template || "ats";
        state.selectedTemplate = key;
        updatePreview();
        saveState();
        closeTemplateModal();
      });
      dom.modalTemplateGrid.appendChild(clone);
    });
    dom.templateModal.hidden = false;
  };

  const closeTemplateModal = () => {
    if (dom.templateModal) dom.templateModal.hidden = true;
  };

  const handleClearForm = () => {
    if (!confirm("Are you sure you want to clear all data? This cannot be undone.")) return;
    state.resume = buildDefaultResume();
    state.selectedTemplate = "social";
    state.sectionEnabled = {
      personalInfo: true,
      summary: true,
      experience: true,
      education: true,
      skills: true,
      personalDetails: true,
      certifications: false,
      projects: false,
      languages: false
    };
    state.sectionOrder = ["personalInfo", "summary", "experience", "education", "skills", "personalDetails"];
    writeFormState(state.resume);
    updatePreview();
    saveState();
  };

  const handlePrintForm = () => {
    handleExport("print");
  };

  const handleSaveForm = () => {
    saveState();
    alert("Resume data saved to browser local storage.");
  };

  const saveState = () => {
    const payload = {
      resume: state.resume,
      selectedTemplate: state.selectedTemplate,
      sectionOrder: state.sectionOrder,
      sectionEnabled: state.sectionEnabled
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  // exportResume aliases
  const exportResume = () => handleExport();
  const printResume = () => handleExport();

  const loadState = () => {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      // encoding fixed at source
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const normalizeTokens = (text) => {
    return normalizeText(text)
      .toLowerCase()
      .replace(/[\u2019']/g, "")
      .replace(/[^a-z0-9+.#\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const splitLines = (text) => String(text || "").split("\n").map((line) => line.trim()).filter(Boolean);

  const parseBullets = (lines) => {
    return lines
      .map((line) => line.replace(/^[\-*\u2022\d.)]+\s*/, "").trim())
      .filter(Boolean);
  };

  const parseJD = (rawText) => {
    const lines = splitLines(rawText);
    const sections = {
      about: [],
      responsibilities: [],
      requirements: [],
      skills: [],
      benefits: []
    };
    const map = [
      { key: "responsibilities", patterns: [/responsibilities/i, /what you['\u2019]ll do/i, /what you will do/i] },
      { key: "requirements", patterns: [/requirements/i, /qualifications/i, /what we['\u2019]re looking for/i] },
      { key: "skills", patterns: [/skills/i, /technical skills/i, /core skills/i] },
      { key: "benefits", patterns: [/benefits/i, /perks/i, /what we offer/i] },
      { key: "about", patterns: [/about us/i, /company/i, /who we are/i] }
    ];
    let currentKey = "responsibilities";
    lines.forEach((line) => {
      const detected = map.find((entry) => entry.patterns.some((pattern) => pattern.test(line)));
      if (detected) {
        currentKey = detected.key;
        return;
      }
      sections[currentKey].push(line);
    });

    const keywords = (() => {
      const cleaned = normalizeTokens(rawText);
      if (!cleaned) return [];
      const tokens = cleaned.split(" ").filter(Boolean).filter((token) => {
        if (/^\d+$/.test(token)) return false;
        if (token.length < 2 && !SPECIAL_TOKENS.has(token)) return false;
        if (STOPWORDS.has(token)) return false;
        return true;
      });
      const counts = new Map();
      tokens.forEach((token) => counts.set(token, (counts.get(token) || 0) + 1));
      for (let i = 0; i < tokens.length - 1; i += 1) {
        const phrase = `${tokens[i]} ${tokens[i + 1]}`;
        counts.set(phrase, (counts.get(phrase) || 0) + 1);
      }
      return Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 60)
        .map(([term]) => term);
    })();

    return {
      raw: normalizeText(rawText),
      about: parseBullets(sections.about),
      responsibilities: parseBullets(sections.responsibilities),
      requirements: parseBullets(sections.requirements),
      skills: parseBullets(sections.skills),
      benefits: parseBullets(sections.benefits),
      keywords
    };
  };

  const matchKeywords = (resumeText, keywords) => {
    const resumeTokens = new Set(normalizeTokens(resumeText).split(" ").filter(Boolean));
    const uniqueKeywords = Array.from(new Set((keywords || []).map((k) => normalizeTokens(String(k || ""))).filter(Boolean)));
    const matched = [];
    const missing = [];
    uniqueKeywords.forEach((kw) => {
      if (kw.includes(" ")) {
        const found = normalizeTokens(resumeText).includes(kw);
        if (found) matched.push(kw);
        else missing.push(kw);
        return;
      }
      if (resumeTokens.has(kw)) matched.push(kw);
      else missing.push(kw);
    });
    const score = uniqueKeywords.length ? Math.round((matched.length / uniqueKeywords.length) * 100) : 0;
    return { score, matched, missing };
  };

  const extractJdSkills = (parsed) => {
    const raw = [...parsed.skills, ...parsed.requirements].join(" ");
    const tokens = normalizeTokens(raw).split(" ").filter(Boolean).filter((token) => {
      if (STOPWORDS.has(token)) return false;
      if (token.length < 2 && !SPECIAL_TOKENS.has(token)) return false;
      return true;
    });
    return Array.from(new Set(tokens)).slice(0, 40);
  };

  const analyzeJd = (jdText, resume) => {
    const parsed = parseJD(jdText);
    const allSkills = [
      ...(resume.skills?.hard || []),
      ...(resume.skills?.tools || []),
      ...(resume.skills?.domain || [])
    ];
    const resumeText = [
      resume.summary,
      (resume.experience || []).map((item) => [item.jobTitle, item.company, item.description, (item.bullets || []).join(" ")].join(" ")).join(" "),
      (resume.education || []).map((item) => [item.degree, item.institution, item.description].join(" ")).join(" "),
      (resume.projects || []).map((item) => [item.title, item.description, item.tools, item.outcome].join(" ")).join(" "),
      (resume.certifications || []).map((item) => [item.name, item.authority].join(" ")).join(" "),
      allSkills.join(" ")
    ].join(" ");

    const keywordMatch = matchKeywords(resumeText, parsed.keywords);
    const jdSkills = extractJdSkills(parsed);
    const resumeSkills = allSkills.map((skill) => normalizeTokens(skill)).filter(Boolean);
    const missingSkills = jdSkills.filter((skill) => !resumeSkills.includes(skill));
    const matchedSkills = jdSkills.filter((skill) => resumeSkills.includes(skill));
    const skillScore = jdSkills.length ? Math.round((matchedSkills.length / jdSkills.length) * 100) : 0;
    const matchScore = Math.round(skillScore * 0.6 + keywordMatch.score * 0.4);

    const rewriteSuggestions = {
      summary: missingSkills.slice(0, 3).map((skill) => `Add "${skill}" to your summary to strengthen alignment.`),
      experience: keywordMatch.missing.slice(0, 3).map((term) => `Include evidence of "${term}" in your experience bullets.`),
      skills: missingSkills.slice(0, 5).map((skill) => `Add "${skill}" to your skills list.`)
    };

    const heatmapRows = parsed.keywords.slice(0, 8).map((term) => {
      const summaryCount = countOccurrences(resume.summary || "", term);
      const expCount = countOccurrences((resume.experience || []).map((item) => [item.jobTitle, item.company, item.description, (item.bullets || []).join(" ")].join(" ")).join(" "), term);
      const skillCount = countOccurrences(allSkills.join(" "), term);
      const eduCount = countOccurrences((resume.education || []).map((item) => [item.degree, item.institution, item.description].join(" ")).join(" "), term);
      return {
        term,
        summary: buildHeat(summaryCount),
        experience: buildHeat(expCount),
        skills: buildHeat(skillCount),
        education: buildHeat(eduCount)
      };
    });

    const rejectionReasons = [];
    if (!resume.personalInfo.email) rejectionReasons.push("Missing a professional email address.");
    if ((allSkills || []).length === 0) rejectionReasons.push("No skills listed for keyword matching.");
    if (!resume.summary) rejectionReasons.push("Summary is missing; recruiters use it for quick evaluation.");
    if (matchScore < 60) rejectionReasons.push("JD match score is below 60; add more targeted keywords.");
    if ((resume.experience || []).length === 0) rejectionReasons.push("No work experience listed; add at least one role.");

    const templateRecs = recommendTemplates(parsed.keywords);

    return {
      matchScore,
      keywordMatch,
      missingSkills,
      matchedSkills,
      rewriteSuggestions,
      heatmapRows,
      rejectionReasons,
      templateRecs
    };
  };

  const countOccurrences = (text, term) => {
    if (!text || !term) return 0;
    const normalizedText = normalizeTokens(text);
    if (term.includes(" ")) {
      return normalizedText.includes(term) ? normalizedText.split(term).length - 1 : 0;
    }
    const tokens = normalizedText.split(" ").filter(Boolean);
    return tokens.filter((token) => token === term).length;
  };

  const buildHeat = (count) => {
    if (count === 0) return { level: "none", label: "\u2014" };
    if (count === 1) return { level: "low", label: "Low" };
    if (count <= 3) return { level: "medium", label: "Med" };
    return { level: "high", label: "High" };
  };

  const recommendTemplates = (keywords) => {
    const lower = (keywords || []).join(" ");
    const picks = [];
    const pushPick = (key, reason) => {
      const template = TEMPLATE_CATALOG.find((tpl) => tpl.key === key);
      if (template && !picks.find((item) => item.key === key)) {
        picks.push({ ...template, reason });
      }
    };

    if (/design|ux|ui|visual/.test(lower)) {
      pushPick("creative", "Creative roles benefit from expressive layouts.");
      pushPick("modern", "Modern layout balances style with ATS safety.");
    }
    if (/engineer|developer|software|data|cloud|devops|backend|frontend/.test(lower)) {
      pushPick("tech", "Tech Focus highlights skills and tooling.");
      pushPick("ats", "ATS template ensures clean parsing.");
    }
    if (/director|manager|lead|executive|vp|head/.test(lower)) {
      pushPick("executive", "Executive Slate emphasizes leadership impact.");
    }
    if (/research|academic|phd|professor|publication/.test(lower)) {
      pushPick("academic", "Academic CV supports research-heavy content.");
    }

    pushPick("classic", "Classic Pro offers a structured, recruiter-friendly layout.");
    pushPick("minimal", "Minimal Grid keeps focus on content and keywords.");

    return picks.slice(0, 3);
  };

  const setListItems = (container, items, fallback) => {
    if (!container) return;
    container.innerHTML = "";
    const list = (items || []).filter(Boolean);
    if (list.length === 0) {
      const li = document.createElement("li");
      li.textContent = fallback;
      container.appendChild(li);
      return;
    }
    list.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      container.appendChild(li);
    });
  };

  const updateHeatmap = (rows) => {
    if (!dom.jdHeatmapBody) return;
    dom.jdHeatmapBody.innerHTML = "";
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      const tdTerm = document.createElement("td");
      tdTerm.textContent = row.term;
      tr.appendChild(tdTerm);

      ["summary", "experience", "skills", "education"].forEach((key) => {
        const td = document.createElement("td");
        const badge = document.createElement("span");
        badge.className = `jd-heat ${row[key].level}`;
        badge.textContent = row[key].label;
        td.appendChild(badge);
        tr.appendChild(td);
      });

      dom.jdHeatmapBody.appendChild(tr);
    });
  };

  const renderTemplateRecommendations = (list) => {
    if (!dom.jdTemplateList) return;
    dom.jdTemplateList.innerHTML = "";
    if (!list || list.length === 0) {
      const p = document.createElement("p");
      p.className = "jd-empty";
      p.textContent = "No recommendations yet.";
      dom.jdTemplateList.appendChild(p);
      return;
    }
    list.forEach((tpl) => {
      const card = document.createElement("div");
      card.className = "jd-template-card";
      card.innerHTML = `
        <div>
          <strong>${escapeHtml(tpl.name)}</strong>
          <p>${escapeHtml(tpl.reason)}</p>
        </div>
        <button class=\"btn btn-secondary\" type=\"button\" data-template=\"${escapeHtml(tpl.key)}\">Use</button>
      `;
      dom.jdTemplateList.appendChild(card);
    });
  };

  const openCropModal = () => {
    if (!dom.cropModal) return;
    dom.cropModal.hidden = false;
    dom.cropModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeCropModal = () => {
    if (!dom.cropModal) return;
    dom.cropModal.hidden = true;
    dom.cropModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (state.photoCrop.cropperInstance) {
      state.photoCrop.cropperInstance.destroy();
      state.photoCrop.cropperInstance = null;
    }
  };

  const initCropper = (imageSource) => {
    if (!dom.cropperImage) return;
    dom.cropperImage.src = imageSource;
    
    if (state.photoCrop.cropperInstance) {
      state.photoCrop.cropperInstance.destroy();
    }

    state.photoCrop.cropperInstance = new Cropper(dom.cropperImage, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 1,
      responsive: true,
      restore: false,
      guides: true,
      center: true,
      highlight: false,
      cropBoxMovable: true,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: false
    });
  };

  const handleSaveCrop = () => {
    if (!state.photoCrop.cropperInstance) return;
    
    const canvas = state.photoCrop.cropperInstance.getCroppedCanvas({
      width: 400,
      height: 400,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high'
    });

    if (canvas) {
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      state.resume.personalInfo.photoDataUrl = dataUrl;
      updateProfilePhotoPreview(dataUrl);
      updatePreview();
      saveState();
      closeCropModal();
    }
  };

  const loadImageForCrop = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      openCropModal();
      initCropper(String(reader.result || ""));
    };
    reader.readAsDataURL(file);
  };

  const buildAtsPlainText = (resume) => {
    const lines = [];
    const personal = resume.personalInfo || {};
    lines.push(personal.fullName || "");
    if (personal.headline && state.sectionEnabled.headline !== false) lines.push(personal.headline);
    const contact = [
      personal.email,
      personal.phone,
      formatLocation(personal.location),
      personal.linkedin,
      personal.portfolio
    ].filter(Boolean).join(" | ");
    if (contact) lines.push(contact);
    lines.push("");

    const addSection = (title, bodyLines) => {
      if (!bodyLines || bodyLines.length === 0) return;
      lines.push(title.toUpperCase());
      lines.push(...bodyLines);
      lines.push("");
    };

    const sectionBuilders = {
      headline: () => [],
      summary: () => resume.summary ? [resume.summary] : [],
      objective: () => resume.objective ? [resume.objective] : [],
      highlights: () => (resume.highlights || []).map((item) => `- ${item}`),
      coreCompetencies: () => (resume.coreCompetencies || []).map((item) => `- ${item}`),
      experience: () => (resume.experience || []).flatMap((item) => {
        const header = [item.jobTitle, item.company].filter(Boolean).join(" | ");
        const meta = [item.location, formatRange(item.startDate, item.endDate)].filter(Boolean).join(" | ");
        const bullets = (item.bullets || []).map((bullet) => `- ${bullet}`);
        return [header, meta, item.description].filter(Boolean).concat(bullets).concat([""]);
      }),
      projects: () => (resume.projects || []).flatMap((item) => {
        const header = item.title || "";
        const meta = item.tools || "";
        return [header, meta, item.description, item.outcome].filter(Boolean).concat([""]);
      }),
      education: () => (resume.education || []).flatMap((item) => {
        const header = [item.degree, item.institution].filter(Boolean).join(" | ");
        const meta = [item.specialization, item.location, formatRange(item.startYear, item.endYear)].filter(Boolean).join(" | ");
        return [header, meta, item.description].filter(Boolean).concat([""]);
      }),
      certifications: () => (resume.certifications || []).map((item) => [item.name, item.authority, item.year].filter(Boolean).join(" | ")),
      internships: () => (resume.internships || []).flatMap((item) => {
        const header = [item.organization, item.role, item.duration].filter(Boolean).join(" | ");
        const bullets = (item.learnings || []).map((learning) => `- ${learning}`);
        return [header].filter(Boolean).concat(bullets).concat([""]);
      }),
      awards: () => (resume.awards || []).map((item) => `- ${item}`),
      skills: () => {
        const skillLines = [];
        if ((resume.skills?.hard || []).length) skillLines.push(`Hard Skills: ${resume.skills.hard.join(", ")}`);
        if ((resume.skills?.tools || []).length) skillLines.push(`Tools: ${resume.skills.tools.join(", ")}`);
        if ((resume.skills?.domain || []).length) skillLines.push(`Domain: ${resume.skills.domain.join(", ")}`);
        return skillLines;
      },
      technicalStack: () => {
        const stackLines = [];
        if ((resume.technicalStack?.languages || []).length) stackLines.push(`Languages: ${resume.technicalStack.languages.join(", ")}`);
        if ((resume.technicalStack?.frameworks || []).length) stackLines.push(`Frameworks: ${resume.technicalStack.frameworks.join(", ")}`);
        if ((resume.technicalStack?.tools || []).length) stackLines.push(`Tools: ${resume.technicalStack.tools.join(", ")}`);
        return stackLines;
      },
      languages: () => (resume.languages || []).map((item) => [item.language, item.level].filter(Boolean).join(" | ")),
      publications: () => (resume.publications || []).map((item) => [item.title, item.platform, item.year].filter(Boolean).join(" | ")),
      volunteer: () => (resume.volunteer || []).map((item) => [item.organization, item.role, item.impact].filter(Boolean).join(" | ")),
      leadership: () => (resume.leadership || []).map((item) => [item.organization, item.role, item.responsibilities].filter(Boolean).join(" | ")),
      personalDetails: () => {
        const details = resume.personalDetails || {};
        return [
          details.fatherName ? `Father's Name: ${details.fatherName}` : "",
          details.dob ? `Date of Birth: ${details.dob}` : "",
          details.gender ? `Gender: ${details.gender}` : "",
          details.maritalStatus ? `Marital Status: ${details.maritalStatus}` : "",
          details.hobbies ? `Hobbies: ${details.hobbies}` : ""
        ].filter(Boolean);
      }
    };

    state.sectionOrder.forEach((key) => {
      if (!state.sectionEnabled[key]) return;
      const builder = sectionBuilders[key];
      if (!builder) return;
      const content = builder().filter(Boolean);
      addSection(key.replace(/([A-Z])/g, " $1").trim(), content);
    });

    return lines.join("\n").trim();
  };

  const handleJdEvaluate = () => {
    if (!dom.jdInput) return;
    const text = dom.jdInput.value.trim();
    if (!text) {
      if (dom.jdError) dom.jdError.textContent = "Job description is required.";
      return;
    }
    if (text.length > JD_MAX_CHARS) {
      if (dom.jdError) dom.jdError.textContent = "Job description is too long.";
      return;
    }
    if (dom.jdError) dom.jdError.textContent = "";
    return handleJdEvaluateAsync(text);
  };

  const prepareResumeForAi = (resume) => {
    const copy = cloneResume(resume);
    if (copy.personalInfo) copy.personalInfo.photoDataUrl = "";
    return copy;
  };

  const applyJdResults = (result) => {
    if (dom.jdScoreValue) dom.jdScoreValue.textContent = String(result.matchScore);
    if (dom.jdScoreLabel) dom.jdScoreLabel.textContent = result.matchScore >= 75 ? "Strong alignment" : "Needs improvement";
    if (dom.jdScoreFeedback) dom.jdScoreFeedback.textContent = `Matched ${result.matchedSkills.length} of ${result.matchedSkills.length + result.missingSkills.length} key skills.`;

    setListItems(dom.jdMissingList, result.missingSkills, "No missing skills detected.");
    setListItems(dom.jdWeakList, result.keywordMatch.missing.slice(0, 6), "No weak matches detected.");
    setListItems(dom.jdStrongList, result.keywordMatch.matched.slice(0, 6), "Strong matches will appear here.");
    setListItems(dom.jdSuggestionsList, [
      ...result.rewriteSuggestions.summary,
      ...result.rewriteSuggestions.experience,
      ...result.rewriteSuggestions.skills
    ], "No additional suggestions.");

    setListItems(dom.jdRewriteSummary, result.rewriteSuggestions.summary, "Summary already aligns well.");
    setListItems(dom.jdRewriteExperience, result.rewriteSuggestions.experience, "Experience already aligns well.");
    setListItems(dom.jdRewriteSkills, result.rewriteSuggestions.skills, "Skills already align well.");

    updateHeatmap(result.heatmapRows);
    setListItems(dom.jdRejectionList, result.rejectionReasons, "No rejection risks detected.");
    renderTemplateRecommendations(result.templateRecs);
  };

  const fetchAiJdMatch = async (jdText, resume) => {
    // Use current origin for production or localhost:3000 (main backend) for dev
    const apiBase = window.location.origin === "null" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:3000" : window.location.origin;
    const response = await fetch(`${apiBase}/api/v1/jd-match/ai`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jdText, resume })
    });
    if (!response.ok) {
      let message = "AI evaluation failed";
      try {
        const payload = await response.json();
        if (payload?.error) message = payload.error;
        if (payload?.details) message = `${message}: ${payload.details}`;
      } catch {
        const errorText = await response.text();
        if (errorText) message = errorText;
      }
      throw new Error(message);
    }
    return response.json();
  };

  const handleJdEvaluateAsync = async (jdText) => {
    if (dom.jdEvaluateBtn) {
      dom.jdEvaluateBtn.disabled = true;
      dom.jdEvaluateBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Evaluating...';
    }
    const baseResult = analyzeJd(jdText, state.resume);
    try {
      const aiResult = await fetchAiJdMatch(jdText, prepareResumeForAi(state.resume));
      const merged = {
        ...baseResult,
        matchScore: Number.isFinite(aiResult.matchScore) ? aiResult.matchScore : baseResult.matchScore,
        missingSkills: Array.isArray(aiResult.missingSkills) ? aiResult.missingSkills : baseResult.missingSkills,
        matchedSkills: Array.isArray(aiResult.strongMatches) ? aiResult.strongMatches : baseResult.matchedSkills,
        rewriteSuggestions: aiResult.rewriteSuggestions || baseResult.rewriteSuggestions,
        rejectionReasons: Array.isArray(aiResult.rejectionReasons) ? aiResult.rejectionReasons : baseResult.rejectionReasons,
        keywordMatch: {
          ...baseResult.keywordMatch,
          missing: Array.isArray(aiResult.weakMatches) ? aiResult.weakMatches : baseResult.keywordMatch.missing,
          matched: Array.isArray(aiResult.strongMatches) ? aiResult.strongMatches : baseResult.keywordMatch.matched
        }
      };
      applyJdResults(merged);
    } catch (error) {
      applyJdResults(baseResult);
      if (dom.jdError) dom.jdError.textContent = error?.message || "AI unavailable. Showing rule-based evaluation.";
    } finally {
      if (dom.jdEvaluateBtn) {
        dom.jdEvaluateBtn.disabled = false;
        dom.jdEvaluateBtn.innerHTML = 'Evaluate Resume';
      }
    }
  };

  const buildPrintHtml = (resumeHtml) => {
    const atsPlainText = buildAtsPlainText(state.resume);
    const sectionMeta = state.sectionOrder.join(",");
    // Get the exact same CSS file the live preview uses
    const cssLinkEl = document.querySelector('link[href*="style.css"]');
    const cssUrl = cssLinkEl ? cssLinkEl.href : "/tools/resumebuilder/style.css";
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-solmates-section-order" content="${escapeHtml(sectionMeta)}" />
    <title>Resume Export</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" crossorigin="anonymous" />
    <link rel="stylesheet" href="${cssUrl}" />
    <style>
      /* Full-bleed templates (sidebars/splits) get 0 page margin so layout isn't cut */
      ${['modernSidebar','floralSidebar','slateModern','emeraldSplit','navyOverlap','forestSidebar','monochromeSplit','centerArch'].includes(state.selectedTemplate)
        ? '@page { size: A4; margin: 0 !important; }'
        : '@page { size: A4; margin: 15mm !important; }'
      }
      @media screen, print {
        body { margin: 0; padding: 0; box-sizing: border-box; }
        body:not(.template-modernSidebar):not(.template-forestSidebar):not(.template-monochromeSplit):not(.template-navyOverlap):not(.template-floralSidebar):not(.template-centerArch) { background: #fff !important; }
        
        body.template-forestSidebar {
            background: linear-gradient(to right, #1b2823 35%, #fff 35%) !important;
            -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
        }
        body.template-monochromeSplit {
            background: linear-gradient(to right, #000 40%, #e5e5e5 40%) !important;
            -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
        }
        body.template-centerArch {
            background: linear-gradient(to right, #fdfbf9 33%, #f0ebe1 33%, #f0ebe1 67%, #fdfbf9 67%) !important;
            -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
        }
        body.template-navyOverlap {
            background: linear-gradient(to right, #fff 60%, #1a2b49 60%) !important;
            -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
        }
        body.template-floralSidebar {
            background: linear-gradient(to right, #f0f0f0 35%, #fff 35%) !important;
            -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
        }
        
        /* ModernSidebar Background Gradient (Overrides white body) */
        body.template-modernSidebar {
            background: linear-gradient(to right, #2D3748 34%, #fff 34%) !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        
        .site-header, .hero, .jd-match, .builder-layout, .templates,
        .form-panel, .preview-header, .score-card, .field-suggestion-box,
        .modal, .preview-actions, .back-link, .progress-stepper { display: none !important; }
        
        .resume-preview { border: none !important; padding: 0 !important; margin: 0 !important; width: 100% !important; max-width: 100% !important; background: transparent !important; }
        .resume { 
            width: 100% !important; 
            max-width: 100% !important; 
            padding: 0 !important; 
            margin: 0 !important; 
            border: none !important; 
            box-shadow: none !important; 
            background: transparent !important;
        }
        
        /* Bulletproof pagination */
        .resume-section { page-break-inside: auto !important; break-inside: auto !important; margin-bottom: 20px; }
        .resume-header, h2, h3, h4 { 
            page-break-inside: avoid !important; 
            break-inside: avoid !important; 
        }
        .resume-item, p, li { 
            page-break-inside: auto !important; 
            break-inside: auto !important; 
        }
        .resume-meta { break-after: avoid !important; page-break-after: avoid !important; }
        h2, h3 { break-after: avoid !important; page-break-after: avoid !important; }
        
        .ats-plain-text { display: none !important; }
        .resume-footer-lines, .resume-footer-line { display: none !important; }
        
        /* ModernSidebar Float Fix for PDF Engine (Overrides flex which breaks across pages) */
        .resume.modernSidebar {
            display: block !important;
            position: relative !important;
            min-height: auto !important;
        }
        .resume.modernSidebar .resume-sidebar {
            float: left !important;
            width: 34% !important;
            min-height: auto !important;
            background: transparent !important; /* let body gradient show */
        }
        .resume.modernSidebar .resume-main {
            float: right !important;
            width: 66% !important;
            background: transparent !important;
        }
        .resume.modernSidebar::after {
            content: "";
            display: table;
            clear: both;
        }
        
        .template-forestSidebar .resume-sidebar,
        .template-monochromeSplit .resume-sidebar,
        .template-navyOverlap .resume-sidebar,
        .template-floralSidebar .resume-sidebar {
            background: transparent !important;
        }
        .template-monochromeSplit .resume-main,
        .template-navyOverlap .resume-main {
            background: transparent !important;
        }
    
      }
    </style>
  </head>
  <body class="template-${escapeHtml(state.selectedTemplate)}">
    <div class="resume-preview">
      ${resumeHtml}
    </div>
    <pre class="ats-plain-text" aria-hidden="true">${escapeHtml(atsPlainText)}</pre>
  </body>
</html>`;
  };

  // Consolidated export logic
  // Both "Download Resume" and "Print" buttons open the native Print Dialog.
  // Browser: Print Dialog (user can Save as PDF or print).
  // APK: Print Dialog via WebView (supported by most modern WebView wrappers).
  let isExporting = false;
    const handleExport = async () => {
    if (isExporting) return;

    state.resume = readFormState();
    const errors = validateResume(state.resume);
    if (errors.length > 0) {
      showErrorModal(errors);
      return;
    }

    isExporting = true;
    updatePreview();

    const exportBtn = document.querySelector('[data-action="print-form"]');
    const originalBtnHtml = exportBtn.innerHTML;
    exportBtn.disabled = true;

    // -- Animated progress counter (fake but realistic) --
    let progressVal = 0;
    const setProgress = (pct, label) => {
      progressVal = pct;
      exportBtn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Generating PDF... ${pct}%`;
    };
    setProgress(5, 'Preparing...');

    // Animate from 5% to 80% over ~10 seconds while waiting for server
    let animFrame;
    const startProgressAnim = () => {
      const startTime = Date.now();
      const duration = 25000; // 25 seconds for slow perceived generation
      const startPct = 5;
      const endPct = 85;
      const tick = () => {
        const elapsed = Date.now() - startTime;
        const fraction = Math.min(elapsed / duration, 1);
        // Slower ease-out curve (cubic)
        const eased = 1 - Math.pow(1 - fraction, 3);
        const pct = Math.round(startPct + (endPct - startPct) * eased);
        setProgress(pct);
        if (fraction < 1) animFrame = requestAnimationFrame(tick);
      };
      animFrame = requestAnimationFrame(tick);
    };
    startProgressAnim();

    try {
      const filename = 'Resume_' + (state.resume.personalInfo.fullName.replace(/\s+/g, '_') || 'Generated') + '.pdf';

      // Hide empty sections temporarily
      const originalEnabled = { ...state.sectionEnabled };
      ['experience', 'education', 'skills', 'projects', 'certifications', 'languages',
       'volunteer', 'leadership', 'publications', 'references'].forEach(sec => {
          if (!state.resume[sec] || state.resume[sec].length === 0) {
              state.sectionEnabled[sec] = false;
          }
      });
      if (!state.resume.summary) state.sectionEnabled.summary = false;
      if (!state.resume.objective) state.sectionEnabled.objective = false;
      if (!state.resume.highlights || state.resume.highlights.length === 0) state.sectionEnabled.highlights = false;

      const resumeHtml = renderResume(state.resume, state.selectedTemplate, state.sectionOrder);
      const fullHtml = buildPrintHtml(resumeHtml);
      state.sectionEnabled = originalEnabled;

      const apiBase = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
          ? 'http://localhost:3000'
          : 'https://solmates-backend-w27e.onrender.com';

      const response = await fetch(`${apiBase}/api/export-pdf`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html: fullHtml, filename })
      });

      // Cancel progress animation
      if (animFrame) cancelAnimationFrame(animFrame);
      setProgress(90, 'Finalizing...');

      // Validate response is actually a PDF
      if (!response.ok) {
          const errText = await response.text();
          console.error('Server error:', errText);
          throw new Error('Server failed to generate PDF. Please try again.');
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/pdf')) {
          const errText = await response.text();
          console.error('Unexpected response type:', contentType, errText);
          throw new Error('Server returned an invalid file. Please try again.');
      }

      setProgress(95, 'Downloading...');
      const blob = await response.blob();

      if (blob.size < 500) {
          throw new Error('PDF appears to be empty or corrupt. Please try again.');
      }

      setProgress(100, 'Done!');

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
      if (animFrame) cancelAnimationFrame(animFrame);
      console.error('PDF Export Error:', error);
      alert(error.message || 'An error occurred while generating the PDF. Please try again.');
    } finally {
      isExporting = false;
      setTimeout(() => {
        exportBtn.innerHTML = originalBtnHtml;
        exportBtn.disabled = false;
      }, 1200);
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















