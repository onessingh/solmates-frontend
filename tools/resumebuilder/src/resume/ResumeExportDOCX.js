"use strict";

const ResumeRenderer = require("./ResumeRenderer");

const sanitizeFilename = (value) => {
  const base = (value || "Resume").replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "");
  return base ? `${base}_Resume.docx` : "Resume.docx";
};

const buildHtml = (resumeHtml) => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Resume Export</title>
    <style>
      body { font-family: "Times New Roman", serif; color: #000; }
      h1, h2, h3, p, ul, li { margin: 0; padding: 0; }
      .resume { font-size: 12pt; line-height: 1.5; }
      .resume-header { border-bottom: 1px solid #000; padding-bottom: 6mm; margin-bottom: 6mm; }
      .resume-name { font-size: 20pt; margin-bottom: 2mm; }
      .resume-section { margin-top: 6mm; }
      .resume-section h2 { font-size: 10pt; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 3mm; }
      .resume-item { margin-bottom: 4mm; }
      .resume-meta { font-size: 9pt; }
      ul { margin-left: 6mm; }
    </style>
  </head>
  <body>
    ${resumeHtml}
  </body>
</html>`;
};

class ResumeExportDOCX {
  static buildExport({ resume, template = "ats" } = {}) {
    const html = ResumeRenderer.render(resume, { template });
    return {
      html: buildHtml(html),
      filename: sanitizeFilename(resume?.personalInfo?.fullName)
    };
  }
}

module.exports = ResumeExportDOCX;
