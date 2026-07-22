"use strict";

const createUiStore = (initial = {}) => {
  let state = {
    modalOpen: initial.modalOpen || false,
    jdCollapsed: initial.jdCollapsed || false,
    loading: initial.loading || false,
    error: initial.error || null
  };
  const listeners = new Set();

  const notify = () => {
    listeners.forEach((listener) => listener(getState()));
  };

  const getState = () => ({ ...state });

  const setState = (partial) => {
    state = { ...state, ...partial };
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
  createUiStore
};
