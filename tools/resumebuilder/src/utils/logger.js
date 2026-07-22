"use strict";

const levels = ["debug", "info", "warn", "error"];

const createLogger = ({ level = "info", sink = console } = {}) => {
  const minIndex = levels.indexOf(level);
  const shouldLog = (lvl) => levels.indexOf(lvl) >= minIndex;
  const format = (lvl, message, meta) => {
    const payload = { level: lvl, message, time: new Date().toISOString() };
    if (meta && typeof meta === "object") payload.meta = meta;
    return payload;
  };

  return {
    debug: (message, meta) => shouldLog("debug") && sink.debug(format("debug", message, meta)),
    info: (message, meta) => shouldLog("info") && sink.info(format("info", message, meta)),
    warn: (message, meta) => shouldLog("warn") && sink.warn(format("warn", message, meta)),
    error: (message, meta) => shouldLog("error") && sink.error(format("error", message, meta))
  };
};

module.exports = {
  createLogger
};
