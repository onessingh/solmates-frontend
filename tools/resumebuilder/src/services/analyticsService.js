"use strict";

const { request } = require("./apiClient");

const logEvent = ({ baseUrl, token, payload }) => {
  return request({
    baseUrl,
    path: "/api/v1/analytics",
    method: "POST",
    token,
    body: payload
  });
};

const listEvents = ({ baseUrl, token, resumeId }) => {
  const query = resumeId ? `?resume_id=${encodeURIComponent(resumeId)}` : "";
  return request({
    baseUrl,
    path: `/api/v1/analytics${query}`,
    method: "GET",
    token
  });
};

const summary = ({ baseUrl, token }) => {
  return request({
    baseUrl,
    path: "/api/v1/analytics/summary",
    method: "GET",
    token
  });
};

module.exports = {
  logEvent,
  listEvents,
  summary
};
