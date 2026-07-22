"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const { generateSummary } = require("../src/ai/summaryGenerator");
const { generateBullets } = require("../src/ai/bulletGenerator");
const { parseJD } = require("../src/ai/jdParser");
const { matchKeywords } = require("../src/ai/keywordMatcher");
const { analyzeSkillGap } = require("../src/ai/skillGapAnalyzer");
const { analyzeTone } = require("../src/ai/toneAnalyzer");

const ResumeParser = require("../src/resume/ResumeParser");
const ResumeValidator = require("../src/resume/ResumeValidator");
const ResumeScoreEngine = require("../src/resume/ResumeScoreEngine");
const ResumeRenderer = require("../src/resume/ResumeRenderer");

test("summary generator produces deterministic summary", () => {
  const summary = generateSummary({
    role: "Product Designer",
    years: 6,
    industries: ["SaaS"],
    strengths: ["design systems", "research"],
    impact: "measurable outcomes",
    tools: ["Figma"]
  });
  assert.ok(summary.includes("Product Designer"));
  assert.ok(summary.includes("6+ years"));
  assert.ok(summary.includes("SaaS"));
});

test("bullet generator returns requested number of bullets", () => {
  const bullets = generateBullets({ count: 3, role: "Engineer", seed: 1 });
  assert.equal(bullets.length, 3);
  bullets.forEach((bullet) => assert.ok(bullet.includes("Engineer")));
});

test("JD parser extracts sections and keywords", () => {
  const jd = `
Responsibilities
- Build APIs
- Improve reliability
Requirements
- JavaScript
- Node.js
`;
  const parsed = parseJD(jd);
  assert.ok(parsed.responsibilities.length >= 2);
  assert.ok(parsed.requirements.length >= 2);
  assert.ok(parsed.keywords.includes("javascript"));
});

test("keyword matcher scores based on presence", () => {
  const result = matchKeywords({
    resumeText: "Experienced in JavaScript and Node.js",
    jdKeywords: ["javascript", "python"]
  });
  assert.equal(result.score, 50);
  assert.deepEqual(result.matched, ["javascript"]);
  assert.deepEqual(result.missing, ["python"]);
});

test("skill gap analyzer reports missing skills", () => {
  const result = analyzeSkillGap({
    resumeSkills: ["Figma", "Research"],
    jdSkills: ["Figma", "Design Systems"]
  });
  assert.equal(result.score, 50);
  assert.deepEqual(result.missing, ["design systems"]);
});

test("tone analyzer returns top tone", () => {
  const result = analyzeTone("Led a team and delivered results with stakeholders");
  assert.ok(result.topTone);
  assert.ok(result.tokens > 0);
});

test("resume parser normalizes and deduplicates", () => {
  const parsed = ResumeParser.parse({
    personalInfo: {
      fullName: "  Jordan   Rivera ",
      email: " jordan@email.com ",
      phone: " +1 555 123 4567 "
    },
    summary: "  Experienced designer. ",
    skills: ["Figma", "Figma", "  Research "]
  });
  assert.equal(parsed.personalInfo.fullName, "Jordan Rivera");
  assert.equal(parsed.personalInfo.email, "jordan@email.com");
  assert.deepEqual(parsed.skills, ["Figma", "Research"]);
});

test("resume validator enforces required fields", () => {
  const result = ResumeValidator.validate(
    ResumeParser.parse({ personalInfo: { fullName: "Jordan" } })
  );
  assert.equal(result.valid, false);
  assert.ok(result.errors.find((e) => e.path === "personalInfo.email"));
});

test("resume score engine is deterministic", () => {
  const resume = ResumeParser.parse({
    personalInfo: { fullName: "Jordan", email: "jordan@email.com" },
    summary: "Senior designer with 6+ years of experience delivering outcomes.",
    experience: [{ jobTitle: "Designer", company: "Acme" }],
    education: [{ degree: "B.S.", institution: "UW" }],
    skills: ["Figma", "Research", "UX"],
    certifications: [{ name: "UX Cert", issuer: "Google" }],
    languages: [{ language: "English", proficiency: "Native" }]
  });
  const scoreA = ResumeScoreEngine.score(resume).score;
  const scoreB = ResumeScoreEngine.score(resume).score;
  assert.equal(scoreA, scoreB);
  assert.ok(scoreA > 0);
});

test("resume renderer outputs semantic HTML", () => {
  const resume = ResumeParser.parse({
    personalInfo: { fullName: "Jordan Rivera", email: "jordan@email.com" },
    summary: "Product designer focused on outcomes.",
    experience: [{ jobTitle: "Designer", company: "Acme", description: "Led projects." }],
    education: [{ degree: "B.S.", institution: "UW" }],
    skills: ["Figma", "Research"]
  });
  const html = ResumeRenderer.render(resume, { template: "ats" });
  assert.ok(html.includes("Jordan Rivera"));
  assert.ok(html.includes("Summary"));
  assert.ok(html.includes("Experience"));
  assert.ok(html.includes("Education"));
  assert.ok(html.includes("Skills"));
});
