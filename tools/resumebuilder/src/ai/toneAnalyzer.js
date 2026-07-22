"use strict";

const toneLexicon = {
  confident: ["led", "delivered", "achieved", "drove", "owned", "optimized"],
  collaborative: ["partnered", "aligned", "collaborated", "coordinated", "mentored"],
  analytical: ["analyzed", "measured", "modeled", "evaluated", "experimented"],
  creative: ["designed", "crafted", "conceptualized", "innovated", "ideated"],
  customer: ["customer", "user", "client", "stakeholder", "feedback"]
};

const normalize = (text) => {
  if (typeof text !== "string") return "";
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
};

const analyzeTone = (text = "") => {
  const tokens = normalize(text).split(" ").filter(Boolean);
  const counts = {};
  Object.keys(toneLexicon).forEach((tone) => {
    counts[tone] = 0;
  });

  tokens.forEach((token) => {
    Object.entries(toneLexicon).forEach(([tone, words]) => {
      if (words.includes(token)) counts[tone] += 1;
    });
  });

  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
  const scores = {};
  Object.keys(counts).forEach((tone) => {
    scores[tone] = total ? Math.round((counts[tone] / total) * 100) : 0;
  });

  const topTone = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "neutral";

  return {
    scores,
    topTone,
    tokens: tokens.length
  };
};

module.exports = {
  analyzeTone
};
