"use strict";

const ResumeRenderer = require("./ResumeRenderer");

const sanitizeFilename = (value) => {
  const base = (value || "Resume").replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "");
  return base ? `${base}_Resume.pdf` : "Resume.pdf";
};

const buildPrintHtml = (resumeHtml) => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Resume Export</title>
    <style>
      @page { size: A4; margin: 12mm; }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: "Times New Roman", serif; color: #000; background: #fff; }
      .page { width: 210mm; min-height: 297mm; padding: 12mm; margin: 0 auto; background: #fff; }
      .resume { width: 100%; font-size: 12pt; line-height: 1.5; color: #000; }
      .resume-header { border-bottom: 1px solid #000; padding-bottom: 6mm; margin-bottom: 6mm; }
      .resume-name { font-size: 20pt; margin: 0 0 2mm; }
      .resume-contact, .resume-links { font-size: 10pt; margin: 0 0 1mm; }
      .resume-section { margin-top: 6mm; }
      .resume-section h2 { font-size: 10pt; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 3mm; }
      .resume-item { margin-bottom: 4mm; }
      .resume-item h3 { font-size: 11pt; margin: 0 0 1mm; }
      .resume-meta { font-size: 9pt; margin: 0 0 2mm; }
      ul { margin: 2mm 0 0 4mm; padding: 0; }
      li { margin: 0 0 1mm; }
      .resume-tags { font-size: 10pt; }
    </style>
  </head>
  <body>
    <div class="page">
      ${resumeHtml}
    </div>
  </body>
</html>`;
};

class ResumeExportPDF {
  static buildExport({ resume, template = "ats" } = {}) {
    const html = ResumeRenderer.render(resume, { template });
    return {
      html: buildPrintHtml(html),
      filename: sanitizeFilename(resume?.personalInfo?.fullName)
    };
  }
}

module.exports = ResumeExportPDF;
