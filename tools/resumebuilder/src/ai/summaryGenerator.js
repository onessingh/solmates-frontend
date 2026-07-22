"use strict";

const sanitize = (value) => {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim();
};

const join = (arr) => arr.filter(Boolean).join(", ");

const generateSummary = (profile = {}) => {
  const {
    role = "Professional",
    years = "several",
    industries = [],
    strengths = [],
    impact = "measurable results",
    tools = []
  } = profile;

  const cleanRole = sanitize(role) || "Professional";
  const cleanYears = sanitize(String(years)) || "several";
  const industryLine = industries.length ? ` in ${join(industries)}` : "";
  const strengthsLine = strengths.length ? join(strengths) : "cross-functional collaboration";
  const toolsLine = tools.length ? ` using ${join(tools)}` : "";

  return `${cleanRole} with ${cleanYears}+ years of experience${industryLine}. Proven track record in ${strengthsLine}, delivering ${impact}${toolsLine}.`;
};

module.exports = {
  generateSummary
};
