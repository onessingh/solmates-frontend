"use strict";

const normalizeWhitespace = (value) => {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim();
};

const toTitleCase = (value) => {
  const cleaned = normalizeWhitespace(value);
  if (!cleaned) return "";
  return cleaned
    .toLowerCase()
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const truncate = (value, max = 140) => {
  if (typeof value !== "string") return "";
  if (value.length <= max) return value;
  return `${value.slice(0, Math.max(0, max - 1)).trim()}…`;
};

const tokenize = (value) => {
  if (typeof value !== "string") return [];
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+.#\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
};

module.exports = {
  normalizeWhitespace,
  toTitleCase,
  truncate,
  tokenize
};
