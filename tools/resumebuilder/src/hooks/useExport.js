"use strict";

const { buildPdfExport, buildDocxExport } = require("../services/exportService");

const exportPdf = ({ resume, template }) => {
  return buildPdfExport({ resume, template });
};

const exportDocx = ({ resume, template }) => {
  return buildDocxExport({ resume, template });
};

module.exports = {
  exportPdf,
  exportDocx
};
