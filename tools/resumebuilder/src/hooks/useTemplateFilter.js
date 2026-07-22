"use strict";

const { templates } = require("../templates/templateList");

const filterTemplates = ({ query = "", atsOnly = false } = {}) => {
  const term = String(query || "").toLowerCase().trim();
  return templates.filter((tpl) => {
    if (atsOnly && !tpl.atsSafe) return false;
    if (!term) return true;
    return (
      tpl.name.toLowerCase().includes(term) ||
      tpl.category.toLowerCase().includes(term) ||
      tpl.description.toLowerCase().includes(term)
    );
  });
};

module.exports = {
  filterTemplates
};
