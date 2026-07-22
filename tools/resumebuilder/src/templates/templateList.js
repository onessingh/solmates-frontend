"use strict";

const templates = [
  { key: "ats", name: "ATS Optimized", category: "ATS", atsSafe: true, description: "Single-column, ATS-first layout." },
  { key: "modern", name: "Modern Edge", category: "Modern", atsSafe: true, description: "Clean hierarchy with subtle accents." },
  { key: "classic", name: "Classic Pro", category: "Classic", atsSafe: true, description: "Traditional structure with clear headings." },
  { key: "minimal", name: "Minimal Grid", category: "Minimal", atsSafe: true, description: "Minimal styling with strong readability." },
  { key: "creative", name: "Creative Wave", category: "Creative", atsSafe: false, description: "Bold accents for creative roles." },
  { key: "executive", name: "Executive Slate", category: "Executive", atsSafe: true, description: "Leadership-focused spacing and emphasis." },
  { key: "tech", name: "Tech Focus", category: "Tech", atsSafe: true, description: "Skill-forward layout for technical roles." },
  { key: "academic", name: "Academic CV", category: "Academic", atsSafe: true, description: "Research and publication friendly." },
  { key: "compact", name: "Compact One-Page", category: "Compact", atsSafe: true, description: "Dense layout for single-page resumes." },
  { key: "impact", name: "Impact Metrics", category: "Impact", atsSafe: true, description: "Highlights quantified outcomes." },
  { key: "chronological", name: "Chronological", category: "Chronological", atsSafe: true, description: "Experience-first, timeline aligned." }
];

const getTemplateByKey = (key) => templates.find((tpl) => tpl.key === key);

module.exports = {
  templates,
  getTemplateByKey
};
