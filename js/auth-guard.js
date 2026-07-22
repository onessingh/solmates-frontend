/**
 * Centralized Authentication Guard
 * FIX: Removed duplicate logoutAdmin() — was also defined in login.js causing
 * silent override depending on script load order. login.js now uses logoutAdminFromModal().
 */

/**
 * Require admin authentication.
 * Redirects to home if not authenticated or token explicitly invalid.
 * Network errors do NOT kick out admin (backend may be temporarily down).
 */
async function requireAdminAuth() {
    if (!window.solmatesAPI || !window.solmatesAPI.isAdminLoggedIn()) {
        alert('Please login as admin to access this page');
        window.location.href = '/';
        return false;
    }

    try {
        const verification = await window.solmatesAPI.verifyAdminToken();

        if (!verification.valid) {
            // Server explicitly said token is invalid — clear and redirect
            localStorage.removeItem('solmates_admin_token');
            localStorage.removeItem('solmates_admin_logged_in');
            window.location.href = '/';
            return false;
        }

        // Token valid (or networkError flag — backend temporarily down)
        return true;

    } catch (error) {
        // Network error — don't kick out admin, log warning only
        console.warn('Backend unreachable during auth check - proceeding with cached token');
        return true;
    }
}

/**
 * Check admin status (non-blocking, no redirect)
 * @returns {Promise<boolean>}
 */
async function checkAdminStatus() {
    if (!window.solmatesAPI || !window.solmatesAPI.isAdminLoggedIn()) {
        return false;
    }

    try {
        const verification = await window.solmatesAPI.verifyAdminToken();
        return verification.valid || verification.networkError === true;
    } catch {
        return true; // Network error — assume still logged in
    }
}

/**
 * Canonical logoutAdmin for protected admin pages.
 * NOTE: login.js (main page) defines logoutAdminFromModal() for the modal context.
 */
async function logoutAdmin() {
    if (confirm('Are you sure you want to logout?')) {
        try {
            await window.solmatesAPI.adminLogout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('solmates_admin_token');
            localStorage.removeItem('solmates_admin_logged_in');
            // Stay on current page, refresh to update UI
            window.location.reload();
        }
    }
}
