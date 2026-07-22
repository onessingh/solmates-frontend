"use strict";

const defaultHeaders = {
  "Content-Type": "application/json"
};

const buildUrl = (baseUrl, path) => {
  const trimmedBase = (baseUrl || "").replace(/\/+$/, "");
  const trimmedPath = (path || "").replace(/^\/+/, "");
  return `${trimmedBase}/${trimmedPath}`;
};

const request = async ({ baseUrl, path, method = "GET", token, body, signal } = {}) => {
  const url = buildUrl(baseUrl, path);
  const headers = { ...defaultHeaders };
  if (token) headers.Authorization = `Bearer ${token}`;

  const options = {
    method,
    headers,
    signal
  };
  if (body !== undefined) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error(payload?.error || "Request failed");
    error.status = response.status;
    error.details = payload?.details;
    throw error;
  }

  return payload;
};

module.exports = {
  request
};
