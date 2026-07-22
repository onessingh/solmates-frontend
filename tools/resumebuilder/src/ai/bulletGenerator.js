"use strict";

const impactVerbs = [
  "Accelerated",
  "Achieved",
  "Built",
  "Created",
  "Delivered",
  "Designed",
  "Drove",
  "Enhanced",
  "Expanded",
  "Improved",
  "Increased",
  "Launched",
  "Led",
  "Optimized",
  "Reduced",
  "Streamlined"
];

const metrics = [
  "10%",
  "15%",
  "20%",
  "25%",
  "30%",
  "2x",
  "3x"
];

const sanitize = (value) => {
  if (typeof value !== "string") return "";
  return value.replace(/[\n\r]+/g, " ").replace(/\s+/g, " ").trim();
};

const pick = (arr, index) => arr[index % arr.length];

const generateBullet = (options = {}) => {
  const {
    role = "Professional",
    impact = "results",
    scope = "cross-functional initiatives",
    metricIndex = 0,
    verbIndex = 0
  } = options;

  const verb = pick(impactVerbs, verbIndex);
  const metric = pick(metrics, metricIndex);
  const cleanRole = sanitize(role) || "Professional";
  const cleanImpact = sanitize(impact) || "results";
  const cleanScope = sanitize(scope) || "cross-functional initiatives";

  return `${verb} ${cleanScope} as a ${cleanRole}, delivering ${metric} ${cleanImpact}.`;
};

const generateBullets = (options = {}) => {
  const {
    count = 3,
    role,
    impacts = ["growth", "efficiency", "customer satisfaction"],
    scopes = ["product workflows", "team operations", "user experience"],
    seed = 0
  } = options;

  const safeCount = Math.max(1, Math.min(count, 6));
  const bullets = [];

  for (let i = 0; i < safeCount; i += 1) {
    bullets.push(
      generateBullet({
        role,
        impact: impacts[i % impacts.length],
        scope: scopes[i % scopes.length],
        metricIndex: seed + i,
        verbIndex: seed + i
      })
    );
  }

  return bullets;
};

module.exports = {
  generateBullet,
  generateBullets
};
