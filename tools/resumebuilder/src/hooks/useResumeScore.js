"use strict";

const ResumeScoreEngine = require("../resume/ResumeScoreEngine");

const scoreResume = (resume) => {
  return ResumeScoreEngine.score(resume);
};

module.exports = {
  scoreResume
};
