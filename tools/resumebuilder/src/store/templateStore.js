"use strict";

const { templates } = require("../templates/templateList");

const createTemplateStore = () => {
  let state = {
    templates: templates.slice(),
    selected: templates[0]?.key || "ats"
  };
  const listeners = new Set();

  const notify = () => {
    listeners.forEach((listener) => listener(getState()));
  };

  const getState = () => ({ ...state, templates: state.templates.slice() });

  const setSelected = (key) => {
    if (!state.templates.find((tpl) => tpl.key === key)) return;
    state = { ...state, selected: key };
    notify();
  };

  const setTemplates = (list) => {
    if (!Array.isArray(list)) return;
    state = { ...state, templates: list.slice() };
    if (!state.templates.find((tpl) => tpl.key === state.selected)) {
      state.selected = state.templates[0]?.key || "ats";
    }
    notify();
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    getState,
    setSelected,
    setTemplates,
    subscribe
  };
};

module.exports = {
  createTemplateStore
};
