"use strict";

const ResumeParser = require("../resume/ResumeParser");
const ResumeValidator = require("../resume/ResumeValidator");
const ResumeScoreEngine = require("../resume/ResumeScoreEngine");

const createResumeStore = (initial = {}) => {
  let state = ResumeParser.parse(initial);
  let lastValidation = ResumeValidator.validate(state);
  let lastScore = ResumeScoreEngine.score(state);
  const listeners = new Set();

  const notify = () => {
    listeners.forEach((listener) => listener(getState()));
  };

  const getState = () => ({
    resume: state,
    validation: lastValidation,
    score: lastScore
  });

  const setState = (next) => {
    state = ResumeParser.parse(next);
    lastValidation = ResumeValidator.validate(state);
    lastScore = ResumeScoreEngine.score(state);
    notify();
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    getState,
    setState,
    subscribe
  };
};

module.exports = {
  createResumeStore
};
