/**
 * admin-check.js
 * Single source of truth for admin detection on all pages.
 * Uses solmatesAPI.isAdminLoggedIn() (checks actual JWT token in localStorage)
 * NOT the old 'solmates_admin_logged_in' flag which was never properly cleared.
 *
 * Usage: call initAdminCheck(callback) on DOMContentLoaded
 * callback(isAdmin) is called with true/false
 */

function initAdminCheck(onResult) {
  // Use the API client's check - it reads 'solmates_admin_token' (the actual JWT)
  const hasToken = window.solmatesAPI && window.solmatesAPI.isAdminLoggedIn();
  if (onResult) onResult(!!hasToken);
  return !!hasToken;
}

// Also patch the old detectAdminLogin pattern used in pages
// so pages that call detectAdminLogin() get correct result
window._adminCheckResult = null;
window.solmatesAdminActive = function() {
  return !!(window.solmatesAPI && window.solmatesAPI.isAdminLoggedIn());
};
