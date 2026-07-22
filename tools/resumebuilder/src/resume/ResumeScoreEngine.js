"use strict";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const countNonEmpty = (items, fields) => {
  if (!Array.isArray(items)) return 0;
  return items.filter((item) => fields.some((field) => item && item[field])).length;
};

const scoreLength = (text, maxChars, maxScore) => {
  if (!text) return 0;
  const ratio = Math.min(text.length / maxChars, 1);
  return Math.round(ratio * maxScore);
};

class ResumeScoreEngine {
  static score(resume = {}) {
    const personal = resume.personalInfo || {};
    let score = 0;
    const breakdown = {
      contact: 0,
      summary: 0,
      experience: 0,
      education: 0,
      skills: 0,
      certifications: 0,
      languages: 0
    };

    const contactFields = [
      personal.fullName,
      personal.email,
      personal.phone,
      personal.address,
      personal.linkedin,
      personal.portfolio
    ];
    const contactFilled = contactFields.filter(Boolean).length;
    breakdown.contact = clamp(contactFilled * 4, 0, 24);
    score += breakdown.contact;

    breakdown.summary = scoreLength(resume.summary || "", 200, 12);
    score += breakdown.summary;

    const experienceCount = countNonEmpty(resume.experience, ["jobTitle", "company", "description", "bullets"]);
    breakdown.experience = clamp(experienceCount * 8, 0, 24);
    score += breakdown.experience;

    const educationCount = countNonEmpty(resume.education, ["degree", "institution"]);
    breakdown.education = clamp(educationCount * 5, 0, 10);
    score += breakdown.education;

    const skillCount = Array.isArray(resume.skills) ? resume.skills.length : 0;
    breakdown.skills = clamp(skillCount * 2, 0, 10);
    score += breakdown.skills;

    const certCount = Array.isArray(resume.certifications) ? resume.certifications.length : 0;
    breakdown.certifications = clamp(certCount * 2, 0, 8);
    score += breakdown.certifications;

    const langCount = Array.isArray(resume.languages) ? resume.languages.length : 0;
    breakdown.languages = clamp(langCount * 2, 0, 12);
    score += breakdown.languages;

    return {
      score: clamp(score, 0, 100),
      breakdown
    };
  }
}

module.exports = ResumeScoreEngine;
