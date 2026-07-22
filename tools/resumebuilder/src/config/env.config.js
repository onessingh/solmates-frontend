"use strict";

const getEnv = (key, fallback = "") => {
  if (typeof process !== "undefined" && process.env && process.env[key] !== undefined) {
    return process.env[key];
  }
  if (typeof window !== "undefined" && window.__ENV__ && window.__ENV__[key] !== undefined) {
    return window.__ENV__[key];
  }
  return fallback;
};

module.exports = {
  apiBaseUrl: getEnv("SOLMATES_API_URL", "http://localhost:4000"),
  appEnv: getEnv("NODE_ENV", "development")
};
