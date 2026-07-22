"use strict";

const verbsMap = {
  improved: ["enhanced", "optimized", "strengthened"],
  managed: ["led", "orchestrated", "directed"],
  built: ["created", "developed", "engineered"],
  designed: ["crafted", "architected", "shaped"],
  collaborated: ["partnered", "aligned", "coordinated"],
  increased: ["boosted", "elevated", "grew"],
  reduced: ["lowered", "minimized", "cut"],
  delivered: ["shipped", "launched", "produced"]
};

const fillerPhrases = [
  "using data-driven insights",
  "through cross-functional collaboration",
  "by streamlining workflows",
  "with a user-first approach",
  "to improve outcomes"
];

const sanitize = (text) => {
  if (typeof text !== "string") return "";
  return text.replace(/\s+/g, " ").trim();
};

const pick = (arr, index) => arr[index % arr.length];

const replaceVerbs = (text, seed) => {
  const words = text.split(" ");
  return words
    .map((word, idx) => {
      const lower = word.toLowerCase();
      const key = Object.keys(verbsMap).find((verb) => lower.startsWith(verb));
      if (!key) return word;
      const replacement = pick(verbsMap[key], seed + idx);
      return word[0] === word[0].toUpperCase()
        ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
        : replacement;
    })
    .join(" ");
};

const appendFiller = (text, seed) => {
  if (text.length > 140) return text;
  return `${text} ${pick(fillerPhrases, seed)}`;
};

const rewriteSentence = ({ text, seed = 0 } = {}) => {
  const clean = sanitize(text);
  if (!clean) return "";
  const replaced = replaceVerbs(clean, seed);
  return appendFiller(replaced, seed);
};

const rewriteBullets = ({ bullets = [], seed = 0 } = {}) => {
  return bullets
    .map((bullet, idx) => rewriteSentence({ text: bullet, seed: seed + idx }))
    .filter(Boolean);
};

module.exports = {
  rewriteSentence,
  rewriteBullets
};
