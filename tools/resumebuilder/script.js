(() => {
  "use strict";

  const STORAGE_KEY = "solmates.resume.builder.v2";
  const MAX_SUMMARY_CHARS = 500;
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
    { key: "modernSidebar", name: "Modern Sidebar", category: "Premium", atsSafe: false }
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
    selectedTemplate: "social",
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
    return items.map((item) => escapeHtml(item)).join(" · ");
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
        // For modernSidebar, the summary is a floating bio without a section header
        if (state.selectedTemplate === "modernSidebar") {
          return `<div class="main-header-summary"><p>${escapeHtml(resume.summary)}</p></div>`;
        }
        return renderSection("Professional Summary", `<p>${escapeHtml(resume.summary)}</p>`);
      }
    },
    {
      key: "objective",
      title: "Career Objective",
      render: (resume) => resume.objective
        ? renderSection("Career Objective", `<p>${escapeHtml(resume.objective)}</p>`)
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
          const titleLine = [item.jobTitle, item.company].filter(Boolean).join(" · ");
          const range = formatRange(item.startDate, item.endDate);
          const meta = [range, item.location].filter(Boolean).join(" · ");
          const bullets = renderList(item.bullets);
          const description = item.description ? `<p>${escapeHtml(item.description)}</p>` : "";

          if (state.selectedTemplate === "modernSidebar") {
            return `
              <article class="experience-item">
                <div class="experience-header">
                  <span class="experience-date">${escapeHtml(range || "")}</span>
                  <h4>${escapeHtml(item.company || "")}</h4>
                </div>
                <h5>${escapeHtml(item.jobTitle || "")}</h5>
                ${description}
                ${bullets}
              </article>
            `;
          }

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
          const desc = item.description ? `<p>${escapeHtml(item.description)}</p>` : "";
          const outcome = item.outcome ? `<p><strong>Outcome:</strong> ${escapeHtml(item.outcome)}</p>` : "";
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
          
          if (state.selectedTemplate === "modernSidebar") {
            return `
              <div class="education-sidebar-item">
                <p class="school-date">${escapeHtml(range || "")}</p>
                <h4>${escapeHtml(item.degree || "")}</h4>
                <p class="school-name">${escapeHtml(item.institution || "")}</p>
              </div>
            `;
          }

          const titleLine = [item.degree, item.institution].filter(Boolean).join(" · ");
          const meta = [range, item.location, item.specialization, item.marks].filter(Boolean).join(" · ");
          const description = item.description ? `<p>${escapeHtml(item.description)}</p>` : "";
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
          const meta = [item.authority, item.year].filter(Boolean).join(" · ");
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
          const meta = [item.organization, item.role, item.duration].filter(Boolean).join(" · ");
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
          const meta = [item.language, item.level].filter(Boolean).join(" · ");
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
          const meta = [item.platform, item.year].filter(Boolean).join(" · ");
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
          const meta = [item.organization, item.role].filter(Boolean).join(" · ");
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
          const meta = [item.organization, item.role].filter(Boolean).join(" · ");
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
        
        if (state.selectedTemplate === "modernSidebar") {
          return renderSection("Reference", `<div class="references-grid">${html}</div>`);
        }
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
      const contactLines = [
        personal.phone ? `<p class="resume-contact">Mobile: ${escapeHtml(personal.phone)}</p>` : "",
        personal.email ? `<p class="resume-contact">Email: ${escapeHtml(personal.email)}</p>` : "",
        location ? `<p class="resume-contact">Address: ${escapeHtml(location)}</p>` : "",
        personal.linkedin ? `<p class="resume-contact">${escapeHtml(personal.linkedin)}</p>` : "",
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
      const sidebarKeys = ["education", "skills", "languages", "certifications"];
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
            
            <div class="sidebar-section">
              <h3>Contact</h3>
              <div class="sidebar-item">
                <span class="sidebar-label">Phone</span>
                <span class="sidebar-value">${personal.phone || "123-456-7890"}</span>
              </div>
              <div class="sidebar-item">
                <span class="sidebar-label">Email</span>
                <span class="sidebar-value">${personal.email || "hello@reallygreatsite.com"}</span>
              </div>
              <div class="sidebar-item">
                <span class="sidebar-label">Address</span>
                <span class="sidebar-value">${location || "123 Anywhere St., Any City"}</span>
              </div>
            </div>

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

    // All other templates
    const contactLine = [
      personal.email,
      personal.phone,
      formatLocation(personal.location)
    ].filter(Boolean).join(" · ");
    const linksLine = [personal.linkedin, personal.portfolio].filter(Boolean).join(" · ");
    return `
      <article class="resume template-${escapeHtml(templateKey)}">
        <header class="resume-header">
          <div class="resume-identity">
            <h1 class="resume-name">${escapeHtml(personal.fullName || "")}</h1>
            ${personal.headline && showHeadline ? `<p class="resume-headline">${escapeHtml(personal.headline)}</p>` : ""}
            ${contactLine ? `<p class="resume-contact">${escapeHtml(contactLine)}</p>` : ""}
            ${linksLine ? `<p class="resume-links">${escapeHtml(linksLine)}</p>` : ""}
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
    dom.preview.innerHTML = renderResume(state.resume, state.selectedTemplate);
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
    dom.scoreFeedback.textContent = `Contact ${breakdown.contact}/30 · Summary ${breakdown.summary}/15 · Experience ${breakdown.experience}/30 · Education ${breakdown.education}/15 · Skills ${breakdown.skills}/10`;
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
      const raw = localStorage.getItem(STORAGE_KEY);
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
      .map((line) => line.replace(/^[\-*•\d.)]+\s*/, "").trim())
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
      { key: "responsibilities", patterns: [/responsibilities/i, /what you['’]ll do/i, /what you will do/i] },
      { key: "requirements", patterns: [/requirements/i, /qualifications/i, /what we['’]re looking for/i] },
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
    if (count === 0) return { level: "none", label: "—" };
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
    <link rel="stylesheet" href="${cssUrl}" />
    <style>
      /* Print window overrides — hide everything except the resume */
      @media screen {
        body { background: #fff !important; margin: 0; padding: 20px; }
        .site-header, .hero, .jd-match, .builder-layout, .templates,
        .form-panel, .preview-header, .score-card, .field-suggestion-box,
        .modal, .preview-actions, .back-link, .progress-stepper { display: none !important; }
        .resume-preview { border: none !important; padding: 0 !important; }
      }
      @page { size: A4; margin: 15mm; }
      .ats-plain-text { display: none !important; }
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
    isExporting = true;
    
    try {
      // Read latest form data
      state.resume = readFormState();
      const errors = validateResume(state.resume);
      if (errors.length > 0) {
        showErrorModal(errors);
        return;
      }

      // Update the live preview with fresh data
      updatePreview();

      const capture = dom.preview;
      if (!capture) {
        console.error("Capture element not found.");
        return;
      }

      // Reset any inline styles before printing
      capture.removeAttribute("style");
      
      // Temporarily remove shadow and margin to prevent html2canvas bounds overflow which causes 2 pages
      const originalShadow = capture.style.boxShadow;
      const originalMargin = capture.style.margin;
      capture.style.boxShadow = 'none';
      capture.style.margin = '0';
      
      // CRITICAL FIX 2: Strictly enforce 296mm height to clip any fractional overflow (like the blue sidebar) that triggers 2 pages
      const originalMaxHeight = capture.style.maxHeight;
      const originalOverflow = capture.style.overflow;
      capture.style.maxHeight = '296mm';
      capture.style.overflow = 'hidden';
      
      // CRITICAL FIX: Scroll to top before capture to prevent blank white space at top of PDF
      const originalScrollY = window.scrollY;
      window.scrollTo(0, 0);

      // Use html2pdf for direct PDF download
      const filename = `Resume_${state.resume.personalInfo.fullName.replace(/\s+/g, '_') || 'Generated'}.pdf`;
      const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
            scale: 4, 
            useCORS: true, 
            letterRendering: true, 
            scrollY: 0 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      // Fallback to window.print if html2pdf is missing
      if (typeof html2pdf !== 'undefined') {
          await html2pdf().set(opt).from(capture).save();
      } else {
          window.print();
      }
      
      // Restore styles
      capture.style.boxShadow = originalShadow;
      capture.style.margin = originalMargin;
      capture.style.maxHeight = originalMaxHeight;
      capture.style.overflow = originalOverflow;
      
      window.scrollTo(0, originalScrollY);
    } finally {
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
