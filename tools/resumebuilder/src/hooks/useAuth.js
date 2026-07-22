"use strict";

const authService = require("../services/authService");

const register = ({ baseUrl, payload }) => authService.register({ baseUrl, payload });
const login = ({ baseUrl, payload }) => authService.login({ baseUrl, payload });
const getProfile = ({ baseUrl, token }) => authService.getProfile({ baseUrl, token });
const updateProfile = ({ baseUrl, token, payload }) => authService.updateProfile({ baseUrl, token, payload });
const logout = ({ baseUrl, token }) => authService.logout({ baseUrl, token });

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  logout
};
