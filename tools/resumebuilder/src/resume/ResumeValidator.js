"use strict";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

const required = (value) => typeof value === "string" ? value.trim().length > 0 : Boolean(value);

const validateEmail = (value) => {
  if (!value) return false;
  return EMAIL_RE.test(value);
};

const validateUrl = (value) => {
  if (!value) return true;
  return URL_RE.test(value);
};

const validateYear = (value) => {
  if (!value) return true;
  const year = Number(value);
  if (!Number.isFinite(year)) return false;
  return year >= 1950 && year <= 2035;
};

const validateDate = (value) => {
  if (!value) return true;
  const normalized = new Date(value);
  return !Number.isNaN(normalized.getTime());
};

class ResumeValidator {
  static validate(resume = {}) {
    const errors = [];
    const warnings = [];

    const personalInfo = resume.personalInfo || {};
    if (!required(personalInfo.fullName)) {
      errors.push({ path: "personalInfo.fullName", message: "Full name is required." });
    }
    if (!validateEmail(personalInfo.email)) {
      errors.push({ path: "personalInfo.email", message: "Valid email is required." });
    }

    if (!validateUrl(personalInfo.linkedin)) {
      errors.push({ path: "personalInfo.linkedin", message: "LinkedIn URL must be valid." });
    }
    if (!validateUrl(personalInfo.portfolio)) {
      errors.push({ path: "personalInfo.portfolio", message: "Portfolio URL must be valid." });
    }

    const summary = resume.summary || "";
    if (summary && summary.length > 300) {
      errors.push({ path: "summary", message: "Summary must be 300 characters or less." });
    }

    (resume.experience || []).forEach((item, index) => {
      if (!required(item.jobTitle)) {
        warnings.push({ path: `experience.${index}.jobTitle`, message: "Job title is recommended." });
      }
      if (!required(item.company)) {
        warnings.push({ path: `experience.${index}.company`, message: "Company name is recommended." });
      }
      if (!validateDate(item.startDate)) {
        errors.push({ path: `experience.${index}.startDate`, message: "Start date must be valid." });
      }
      if (!validateDate(item.endDate)) {
        errors.push({ path: `experience.${index}.endDate`, message: "End date must be valid." });
      }
    });

    (resume.education || []).forEach((item, index) => {
      if (!required(item.degree)) {
        warnings.push({ path: `education.${index}.degree`, message: "Degree is recommended." });
      }
      if (!required(item.institution)) {
        warnings.push({ path: `education.${index}.institution`, message: "Institution is recommended." });
      }
      if (!validateYear(item.startYear)) {
        errors.push({ path: `education.${index}.startYear`, message: "Start year must be valid." });
      }
      if (!validateYear(item.endYear)) {
        errors.push({ path: `education.${index}.endYear`, message: "End year must be valid." });
      }
    });

    (resume.certifications || []).forEach((item, index) => {
      if (!required(item.name)) {
        warnings.push({ path: `certifications.${index}.name`, message: "Certification name is recommended." });
      }
      if (!validateDate(item.issueDate)) {
        errors.push({ path: `certifications.${index}.issueDate`, message: "Issue date must be valid." });
      }
    });

    (resume.languages || []).forEach((item, index) => {
      if (!required(item.language)) {
        warnings.push({ path: `languages.${index}.language`, message: "Language name is recommended." });
      }
    });

    if ((resume.skills || []).length === 0) {
      warnings.push({ path: "skills", message: "Add at least one skill for ATS coverage." });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }
}

module.exports = ResumeValidator;
