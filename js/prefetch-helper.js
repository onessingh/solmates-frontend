/**
 * Prefetch Helper - DISABLED
 * sol-cache.js handles bulk prefetching via /api/sol/all-content
 * Individual per-category prefetching caused 429 rate limit errors.
 */

window.startGlobalPrefetch = function() {
  // No-op: sol-cache.js handles bulk prefetching silently
  console.log('[Prefetch] ℹ️ Using sol-cache.js bulk prefetch instead.');
};
