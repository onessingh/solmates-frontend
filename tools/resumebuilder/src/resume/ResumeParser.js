"use strict";

const normalizeText = (value) => {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim();
};

const normalizeEmail = (value) => normalizeText(value).toLowerCase();

const normalizePhone = (value) => normalizeText(value);

const normalizeUrl = (value) => {
  const cleaned = normalizeText(value);
  if (!cleaned) return "";
  if (/^https?:\/\//i.test(cleaned)) return cleaned;
  return `https://${cleaned}`;
};

const normalizeYear = (value) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return normalizeText(String(value));
};

const normalizeDate = (value) => {
  if (!value) return "";
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return normalizeText(String(value));
};

const uniq = (items, normalize = (v) => v) => {
  const seen = new Set();
  const result = [];
  items.forEach((item) => {
    const key = normalize(item);
    if (!key || seen.has(key)) return;
    seen.add(key);
    result.push(item);
  });
  return result;
};

const parseList = (items, mapper) => {
  if (!Array.isArray(items)) return [];
  return items.map(mapper).filter(Boolean);
};

const parseSkills = (skills) => {
  const cleaned = parseList(skills, (skill) => normalizeText(skill));
  return uniq(cleaned, (value) => value.toLowerCase());
};

const parseExperience = (items) => {
  return parseList(items, (item) => {
    const source = item || {};
    const jobTitle = normalizeText(source.jobTitle || source.title);
    const company = normalizeText(source.company);
    const location = normalizeText(source.location);
    const startDate = normalizeDate(source.startDate);
    const endDate = normalizeDate(source.endDate);
    const description = normalizeText(source.description);
    const bullets = parseList(source.bullets, (bullet) => normalizeText(bullet));
    const payload = {
      jobTitle,
      company,
      location,
      startDate,
      endDate,
      description,
      bullets
    };
    const hasContent = jobTitle || company || description || bullets.length > 0;
    return hasContent ? payload : null;
  });
};

const parseEducation = (items) => {
  return parseList(items, (item) => {
    const source = item || {};
    const degree = normalizeText(source.degree);
    const institution = normalizeText(source.institution);
    const location = normalizeText(source.location);
    const startYear = normalizeYear(source.startYear);
    const endYear = normalizeYear(source.endYear);
    const description = normalizeText(source.description);
    const payload = {
      degree,
      institution,
      location,
      startYear,
      endYear,
      description
    };
    const hasContent = degree || institution || description;
    return hasContent ? payload : null;
  });
};

const parseCertifications = (items) => {
  return parseList(items, (item) => {
    const source = item || {};
    const name = normalizeText(source.name);
    const issuer = normalizeText(source.issuer);
    const issueDate = normalizeDate(source.issueDate);
    const payload = { name, issuer, issueDate };
    return name ? payload : null;
  });
};

const parseLanguages = (items) => {
  return parseList(items, (item) => {
    const source = item || {};
    const language = normalizeText(source.language);
    const proficiency = normalizeText(source.proficiency);
    const payload = { language, proficiency };
    return language ? payload : null;
  });
};

class ResumeParser {
  static parse(input = {}) {
    const source = input || {};
    const personalSource = source.personalInfo || {};

    const personalInfo = {
      fullName: normalizeText(personalSource.fullName || source.fullName),
      email: normalizeEmail(personalSource.email || source.email),
      phone: normalizePhone(personalSource.phone || source.phone),
      address: normalizeText(personalSource.address || source.address),
      linkedin: normalizeUrl(personalSource.linkedin || source.linkedin),
      portfolio: normalizeUrl(personalSource.portfolio || source.portfolio),
      photo: normalizeText(personalSource.photo || source.photo)
    };

    return {
      personalInfo,
      summary: normalizeText(source.summary),
      experience: parseExperience(source.experience),
      education: parseEducation(source.education),
      skills: parseSkills(source.skills),
      certifications: parseCertifications(source.certifications),
      languages: parseLanguages(source.languages)
    };
  }
}

module.exports = ResumeParser;
