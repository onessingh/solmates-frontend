"use strict";

const normalize = (text) => {
  if (typeof text !== "string") return "";
  return text
    .toLowerCase()
    .replace(/[\u2019']/g, "")
    .replace(/[^a-z0-9+.#\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const tokenize = (text) => {
  const cleaned = normalize(text);
  if (!cleaned) return [];
  return cleaned.split(" ").filter(Boolean);
};

const buildSet = (text) => new Set(tokenize(text));

const normalizeKeyword = (keyword) => normalize(keyword);

const scoreMatches = (resumeText, keywords) => {
  const resumeTokens = buildSet(resumeText);
  const uniqueKeywords = Array.from(
    new Set((keywords || []).map((k) => normalizeKeyword(String(k || ""))).filter(Boolean))
  );

  const matched = [];
  const missing = [];

  uniqueKeywords.forEach((kw) => {
    if (kw.includes(" ")) {
      const found = normalize(resumeText).includes(kw);
      if (found) matched.push(kw);
      else missing.push(kw);
      return;
    }
    if (resumeTokens.has(kw)) matched.push(kw);
    else missing.push(kw);
  });

  const score = uniqueKeywords.length
    ? Math.round((matched.length / uniqueKeywords.length) * 100)
    : 0;

  return {
    score,
    matched,
    missing
  };
};

const matchKeywords = ({ resumeText = "", jdKeywords = [] } = {}) => {
  return scoreMatches(resumeText, Array.isArray(jdKeywords) ? jdKeywords : []);
};

module.exports = {
  matchKeywords,
  normalize,
  tokenize
};
