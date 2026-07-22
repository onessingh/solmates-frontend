"use strict";

const routes = require("./config/routes.config");

const matchRoute = (path) => {
  const clean = path.replace(/#.*$/, "").replace(/\?.*$/, "");
  const key = Object.keys(routes).find((routeKey) => routes[routeKey] === clean);
  return key || "notFound";
};

module.exports = {
  matchRoute
};
