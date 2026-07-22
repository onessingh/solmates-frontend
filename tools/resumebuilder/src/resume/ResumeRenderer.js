"use strict";

const escapeHtml = (value) => {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const renderList = (items) => {
  if (!Array.isArray(items) || items.length === 0) return "";
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
};

const renderSection = (title, body) => {
  if (!body) return "";
  return `<section class="resume-section"><h2>${escapeHtml(title)}</h2>${body}</section>`;
};

const formatRange = (start, end) => {
  if (!start && !end) return "";
  if (start && end) return `${escapeHtml(start)} - ${escapeHtml(end)}`;
  return escapeHtml(start || end);
};

class ResumeRenderer {
  static render(resume = {}, options = {}) {
    const template = options.template || "ats";
    const personal = resume.personalInfo || {};
    const contactLine = [
      personal.email,
      personal.phone,
      personal.address
    ].filter(Boolean).join(" · ");
    const linksLine = [
      personal.linkedin,
      personal.portfolio
    ].filter(Boolean).join(" · ");

    const summaryHtml = resume.summary
      ? `<p>${escapeHtml(resume.summary)}</p>`
      : "";

    const experienceHtml = (resume.experience || []).map((item) => {
      const titleLine = [item.jobTitle, item.company].filter(Boolean).join(" · ");
      const range = formatRange(item.startDate, item.endDate);
      const meta = [range, item.location].filter(Boolean).join(" · ");
      const bullets = renderList(item.bullets);
      const description = item.description ? `<p>${escapeHtml(item.description)}</p>` : "";
      return `
        <article class="resume-item">
          <header>
            <h3>${escapeHtml(titleLine)}</h3>
            ${meta ? `<p class="resume-meta">${escapeHtml(meta)}</p>` : ""}
          </header>
          ${description}
          ${bullets}
        </article>
      `;
    }).join("");

    const educationHtml = (resume.education || []).map((item) => {
      const titleLine = [item.degree, item.institution].filter(Boolean).join(" · ");
      const range = formatRange(item.startYear, item.endYear);
      const meta = [range, item.location].filter(Boolean).join(" · ");
      const description = item.description ? `<p>${escapeHtml(item.description)}</p>` : "";
      return `
        <article class="resume-item">
          <header>
            <h3>${escapeHtml(titleLine)}</h3>
            ${meta ? `<p class="resume-meta">${escapeHtml(meta)}</p>` : ""}
          </header>
          ${description}
        </article>
      `;
    }).join("");

    const skillsHtml = (resume.skills || []).length
      ? `<p class="resume-tags">${(resume.skills || []).map(escapeHtml).join(" · ")}</p>`
      : "";

    const certificationsHtml = (resume.certifications || []).map((item) => {
      const titleLine = [item.name, item.issuer].filter(Boolean).join(" · ");
      const dateLine = item.issueDate ? escapeHtml(item.issueDate) : "";
      return `
        <article class="resume-item">
          <header>
            <h3>${escapeHtml(titleLine)}</h3>
            ${dateLine ? `<p class="resume-meta">${dateLine}</p>` : ""}
          </header>
        </article>
      `;
    }).join("");

    const languagesHtml = (resume.languages || []).length
      ? `<p>${(resume.languages || []).map((lang) => {
        const label = [lang.language, lang.proficiency].filter(Boolean).join(" (") + (lang.proficiency ? ")" : "");
        return escapeHtml(label);
      }).join(" · ")}</p>`
      : "";

    const sections = [
      renderSection("Summary", summaryHtml),
      renderSection("Experience", experienceHtml),
      renderSection("Education", educationHtml),
      renderSection("Skills", skillsHtml),
      renderSection("Certifications", certificationsHtml),
      renderSection("Languages", languagesHtml)
    ].filter(Boolean).join("");

    return `
      <article class="resume ${escapeHtml(`template-${template}`)}">
        <header class="resume-header">
          <div class="resume-identity">
            <h1 class="resume-name">${escapeHtml(personal.fullName || "")}</h1>
            ${contactLine ? `<p class="resume-contact">${escapeHtml(contactLine)}</p>` : ""}
            ${linksLine ? `<p class="resume-links">${escapeHtml(linksLine)}</p>` : ""}
          </div>
        </header>
        ${sections}
      </article>
    `.trim();
  }
}

module.exports = ResumeRenderer;
