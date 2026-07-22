"use strict";

const ResumeRenderer = require("./ResumeRenderer");

const stripHtml = (html) => {
  return html
    .replace(/<\/(h1|h2|h3|p|li|section|article|header|ul)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
};

class ResumeExportTXT {
  static buildExport({ resume, template = "ats" } = {}) {
    const html = ResumeRenderer.render(resume, { template });
    return {
      text: stripHtml(html)
    };
  }
}

module.exports = ResumeExportTXT;
