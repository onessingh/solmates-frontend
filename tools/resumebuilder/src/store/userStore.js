"use strict";

const createUserStore = (initial = {}) => {
  let state = {
    user: initial.user || null,
    token: initial.token || null
  };
  const listeners = new Set();

  const notify = () => {
    listeners.forEach((listener) => listener(getState()));
  };

  const getState = () => ({ ...state });

  const setUser = (user, token) => {
    state = {
      user: user || null,
      token: token || state.token
    };
    notify();
  };

  const clear = () => {
    state = { user: null, token: null };
    notify();
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    getState,
    setUser,
    clear,
    subscribe
  };
};

module.exports = {
  createUserStore
};
