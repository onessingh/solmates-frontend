"use strict";

const { request } = require("./apiClient");

const listTemplates = ({ baseUrl, token }) => {
  return request({
    baseUrl,
    path: "/api/v1/templates",
    method: "GET",
    token
  });
};

module.exports = {
  listTemplates
};
