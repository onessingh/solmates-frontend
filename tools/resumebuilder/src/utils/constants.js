"use strict";

const MAX_SUMMARY_CHARS = 300;
const MAX_JD_CHARS = 10000;
const MAX_PHOTO_BYTES = 2 * 1024 * 1024;

const TEMPLATE_KEYS = ["ats", "modern", "classic", "minimal", "creative"];

module.exports = {
  MAX_SUMMARY_CHARS,
  MAX_JD_CHARS,
  MAX_PHOTO_BYTES,
  TEMPLATE_KEYS
};
