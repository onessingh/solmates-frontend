"use strict";

const ResumeExportPDF = require("../resume/ResumeExportPDF");
const ResumeExportDOCX = require("../resume/ResumeExportDOCX");

const buildPdfExport = ({ resume, template }) => {
  return ResumeExportPDF.buildExport({ resume, template });
};

const buildDocxExport = ({ resume, template }) => {
  return ResumeExportDOCX.buildExport({ resume, template });
};

module.exports = {
  buildPdfExport,
  buildDocxExport
};
