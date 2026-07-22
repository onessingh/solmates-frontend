"use strict";

const { request } = require("./apiClient");

const register = ({ baseUrl, payload }) => {
  return request({
    baseUrl,
    path: "/api/v1/auth/register",
    method: "POST",
    body: payload
  });
};

const login = ({ baseUrl, payload }) => {
  return request({
    baseUrl,
    path: "/api/v1/auth/login",
    method: "POST",
    body: payload
  });
};

const getProfile = ({ baseUrl, token }) => {
  return request({
    baseUrl,
    path: "/api/v1/auth/me",
    method: "GET",
    token
  });
};

const updateProfile = ({ baseUrl, token, payload }) => {
  return request({
    baseUrl,
    path: "/api/v1/auth/me",
    method: "PUT",
    token,
    body: payload
  });
};

const logout = ({ baseUrl, token }) => {
  return request({
    baseUrl,
    path: "/api/v1/auth/logout",
    method: "POST",
    token
  });
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  logout
};
