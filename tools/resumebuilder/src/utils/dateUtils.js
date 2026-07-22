"use strict";

const toIsoDate = (value) => {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const formatMonthYear = (value) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

const formatYearRange = (start, end) => {
  if (!start && !end) return "";
  if (start && end) return `${start} - ${end}`;
  return start || end;
};

module.exports = {
  toIsoDate,
  formatMonthYear,
  formatYearRange
};
