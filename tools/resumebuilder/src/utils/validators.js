"use strict";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

const isEmail = (value) => isNonEmptyString(value) && EMAIL_RE.test(value.trim());

const isUrl = (value) => {
  if (!value) return true;
  if (typeof value !== "string") return false;
  return URL_RE.test(value.trim());
};

const isYear = (value, { min = 1950, max = 2035 } = {}) => {
  if (value === null || value === undefined || value === "") return true;
  const year = Number(value);
  if (!Number.isFinite(year)) return false;
  return year >= min && year <= max;
};

const isDate = (value) => {
  if (!value) return true;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
};

module.exports = {
  isNonEmptyString,
  isEmail,
  isUrl,
  isYear,
  isDate
};
