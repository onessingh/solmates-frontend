"use strict";

const { request } = require("./apiClient");

const createResume = ({ baseUrl, token, payload }) => {
  return request({
    baseUrl,
    path: "/api/v1/resumes",
    method: "POST",
    token,
    body: payload
  });
};

const listResumes = ({ baseUrl, token, userId }) => {
  const query = userId ? `?user_id=${encodeURIComponent(userId)}` : "";
  return request({
    baseUrl,
    path: `/api/v1/resumes${query}`,
    method: "GET",
    token
  });
};

const getResume = ({ baseUrl, token, id }) => {
  return request({
    baseUrl,
    path: `/api/v1/resumes/${id}`,
    method: "GET",
    token
  });
};

const updateResume = ({ baseUrl, token, id, payload }) => {
  return request({
    baseUrl,
    path: `/api/v1/resumes/${id}`,
    method: "PUT",
    token,
    body: payload
  });
};

const deleteResume = ({ baseUrl, token, id }) => {
  return request({
    baseUrl,
    path: `/api/v1/resumes/${id}`,
    method: "DELETE",
    token
  });
};

const setResumeActive = ({ baseUrl, token, id, isActive }) => {
  return request({
    baseUrl,
    path: `/api/v1/resumes/${id}/active`,
    method: "PATCH",
    token,
    body: { is_active: Boolean(isActive) }
  });
};

const scoreResume = ({ baseUrl, token, id }) => {
  return request({
    baseUrl,
    path: `/api/v1/resumes/${id}/score`,
    method: "POST",
    token
  });
};

module.exports = {
  createResume,
  listResumes,
  getResume,
  updateResume,
  deleteResume,
  setResumeActive,
  scoreResume
};
