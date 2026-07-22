"use strict";

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "if", "then", "else", "when", "while",
  "for", "of", "to", "in", "on", "at", "by", "with", "from", "as", "is", "are",
  "was", "were", "be", "been", "being", "this", "that", "these", "those",
  "it", "its", "their", "our", "your", "you", "we", "they", "he", "she", "them",
  "his", "her", "us", "also", "not", "no", "yes", "will", "can", "may", "must",
  "should", "could", "would", "about", "into", "over", "under", "within",
  "across", "per", "each", "all", "any", "some", "more", "most", "less", "least",
  "such", "including", "include", "includes", "required", "preferred", "plus",
  "role", "responsibilities", "responsibility", "job", "description", "candidate",
  "candidates", "position", "team", "work", "working", "ability", "experience",
  "skills", "skill", "knowledge"
]);

const SPECIAL_TOKENS = new Set([
  "c", "c++", "c#", "go", "r", "sql", "ai", "ml", "ui", "ux", "qa", "pm", "sre",
  "devops", ".net", "node.js", "next.js"
]);

const normalizeText = (text) => {
  if (typeof text !== "string") return "";
  return text.replace(/\r/g, "").replace(/\t/g, " ").trim();
};

const normalizeTokens = (text) => {
  return normalizeText(text)
    .toLowerCase()
    .replace(/[\u2019']/g, "")
    .replace(/[^a-z0-9+.#\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const splitLines = (text) => normalizeText(text).split("\n").map((line) => line.trim()).filter(Boolean);

const sectionMap = [
  { key: "responsibilities", patterns: [/responsibilities/i, /what you['’]ll do/i, /what you will do/i] },
  { key: "requirements", patterns: [/requirements/i, /qualifications/i, /what we['’]re looking for/i] },
  { key: "skills", patterns: [/skills/i, /technical skills/i, /core skills/i] },
  { key: "benefits", patterns: [/benefits/i, /perks/i, /what we offer/i] },
  { key: "about", patterns: [/about us/i, /company/i, /who we are/i] }
];

const detectSection = (line) => {
  const entry = sectionMap.find((item) => item.patterns.some((pattern) => pattern.test(line)));
  return entry ? entry.key : null;
};

const parseBullets = (lines) => {
  return lines
    .map((line) => line.replace(/^[\-*•\d.)]+\s*/, "").trim())
    .filter(Boolean);
};

const extractKeywords = (text) => {
  const cleaned = normalizeTokens(text);
  if (!cleaned) return [];
  const tokens = cleaned.split(" ").filter(Boolean).filter((token) => {
    if (/^\d+$/.test(token)) return false;
    if (token.length < 2 && !SPECIAL_TOKENS.has(token)) return false;
    if (STOPWORDS.has(token)) return false;
    return true;
  });

  const counts = new Map();
  tokens.forEach((token) => {
    counts.set(token, (counts.get(token) || 0) + 1);
  });

  for (let i = 0; i < tokens.length - 1; i += 1) {
    const phrase = `${tokens[i]} ${tokens[i + 1]}`;
    counts.set(phrase, (counts.get(phrase) || 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 60)
    .map(([term]) => term);
};

const parseJD = (rawText) => {
  const lines = splitLines(rawText);
  const sections = {
    about: [],
    responsibilities: [],
    requirements: [],
    skills: [],
    benefits: []
  };

  let currentKey = "responsibilities";
  lines.forEach((line) => {
    const detected = detectSection(line);
    if (detected) {
      currentKey = detected;
      return;
    }
    sections[currentKey].push(line);
  });

  return {
    raw: normalizeText(rawText),
    about: parseBullets(sections.about),
    responsibilities: parseBullets(sections.responsibilities),
    requirements: parseBullets(sections.requirements),
    skills: parseBullets(sections.skills),
    benefits: parseBullets(sections.benefits),
    keywords: extractKeywords(rawText)
  };
};

module.exports = {
  parseJD,
  normalizeTokens
};
