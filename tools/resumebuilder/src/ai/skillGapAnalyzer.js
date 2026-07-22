"use strict";

const normalize = (text) => {
  if (typeof text !== "string") return "";
  return text.toLowerCase().replace(/[^a-z0-9+.#\s-]/g, " ").replace(/\s+/g, " ").trim();
};

const analyzeSkillGap = ({ resumeSkills = [], jdSkills = [] } = {}) => {
  const resumeSet = new Set(resumeSkills.map((skill) => normalize(skill)).filter(Boolean));
  const jdSet = new Set(jdSkills.map((skill) => normalize(skill)).filter(Boolean));

  const missing = Array.from(jdSet).filter((skill) => !resumeSet.has(skill));
  const matched = Array.from(jdSet).filter((skill) => resumeSet.has(skill));

  const score = jdSet.size ? Math.round((matched.length / jdSet.size) * 100) : 0;

  return {
    score,
    matched,
    missing
  };
};

module.exports = {
  analyzeSkillGap
};
