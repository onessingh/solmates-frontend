"use strict";

const debounce = require("../utils/debounce");

const createAutoSave = ({ intervalMs = 15000, onSave } = {}) => {
  if (typeof onSave !== "function") {
    throw new Error("onSave callback is required");
  }
  let timer = null;
  let dirty = false;

  const markDirty = () => {
    dirty = true;
  };

  const flush = () => {
    if (!dirty) return;
    dirty = false;
    onSave();
  };

  const start = () => {
    if (timer) return;
    timer = setInterval(flush, intervalMs);
  };

  const stop = () => {
    if (!timer) return;
    clearInterval(timer);
    timer = null;
  };

  const debouncedMarkDirty = debounce(markDirty, 200);

  return {
    markDirty,
    debouncedMarkDirty,
    flush,
    start,
    stop
  };
};

module.exports = {
  createAutoSave
};
