/**
 * Login page functionality
 * FIX: Renamed logoutAdmin() to logoutAdminFromModal() to avoid naming conflict
 *      with the canonical logoutAdmin() in auth-guard.js.
 * FIX: Removed calls to solmatesAPI.clearAdminSession() which doesn't exist —
 *      replaced with direct localStorage.removeItem calls.
 * NOTE: Client-side rate limiting here is UX convenience ONLY, not a security control.
 *       Server-side rate limiting enforces the real limit.
 */

let adminLoginAttempts = 0;
let isLoginBlocked = false;

async function checkAdminLoginStatus() {
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');

    if (!adminLoginBtn || !adminLogoutBtn) return;

    const isLoggedIn = solmatesAPI.isAdminLoggedIn();

    if (isLoggedIn) {
        try {
            const verification = await solmatesAPI.verifyAdminToken();
            if (verification.valid) {
                adminLoginBtn.style.display = 'none';
                adminLogoutBtn.style.display = 'flex';
            } else {
                adminLoginBtn.style.display = 'flex';
                adminLogoutBtn.style.display = 'none';
            }
        } catch {
            adminLoginBtn.style.display = 'flex';
            adminLogoutBtn.style.display = 'none';
        }
    } else {
        adminLoginBtn.style.display = 'flex';
        adminLogoutBtn.style.display = 'none';
    }
}

function openAdminModal() {
    const adminModal = document.getElementById('adminModal');
    if (!adminModal) return;
    adminModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (!isLoginBlocked) adminLoginAttempts = 0;
}

function closeAdminModal() {
    const adminModal = document.getElementById('adminModal');
    const loginError = document.getElementById('loginError');
    const loginForm = document.getElementById('adminLoginForm');
    if (!adminModal) return;
    adminModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    if (loginError) loginError.classList.remove('show');
    if (loginForm) loginForm.reset();
}

async function handleAdminLogin(e) {
    e.preventDefault();

    const adminId = document.getElementById('adminId').value;
    const adminPassword = document.getElementById('adminPassword').value;
    const submitButton = e.target.querySelector('button[type="submit"]');
    const loginError = document.getElementById('loginError');

    if (isLoginBlocked) {
        loginError.textContent = 'Too many failed attempts. Please try again later.';
        loginError.classList.add('show');
        return;
    }

    if (!adminId || !adminPassword) {
        loginError.textContent = 'Please enter both Admin ID and password';
        loginError.classList.add('show');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Logging in...';

    try {
        const response = await solmatesAPI.adminLogin(adminId, adminPassword);

        if (response.success) {
            localStorage.setItem('solmates_admin_logged_in', 'true');
            submitButton.textContent = 'Logged in!';
            adminLoginAttempts = 0;
            isLoginBlocked = false;
            // Stay on current page — close modal and update navbar reactively
            closeAdminModal();
            checkAdminLoginStatus(); // Reactive navbar update (Login→Logout)
        }
    } catch (error) {
        adminLoginAttempts++;

        if (adminLoginAttempts >= 5) {
            isLoginBlocked = true;
            setTimeout(function() {
                isLoginBlocked = false;
                adminLoginAttempts = 0;
            }, 5 * 60 * 1000);
            loginError.textContent = 'Too many failed attempts. Please try again in 5 minutes.';
        } else {
            loginError.textContent = error.message || 'Invalid credentials. Please try again.';
        }

        loginError.classList.add('show');
        // Clear password on error for security
        var pwField = document.getElementById('adminPassword');
        if (pwField) pwField.value = '';
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Login';
    }
}

/**
 * FIX: Renamed from logoutAdmin to logoutAdminFromModal to avoid conflict with
 * auth-guard.js canonical logoutAdmin(). This handles the main page modal only.
 */
async function logoutAdminFromModal() {
    if (confirm('Are you sure you want to logout as admin?')) {
        try {
            await solmatesAPI.adminLogout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('solmates_admin_token');
            localStorage.removeItem('solmates_admin_logged_in');
            const adminLoginBtn = document.getElementById('adminLoginBtn');
            const adminLogoutBtn = document.getElementById('adminLogoutBtn');
            if (adminLoginBtn) adminLoginBtn.style.display = 'flex';
            if (adminLogoutBtn) adminLogoutBtn.style.display = 'none';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    checkAdminLoginStatus();

    var loginForm = document.getElementById('adminLoginForm');
    if (loginForm) loginForm.addEventListener('submit', handleAdminLogin);

    var adminModal = document.getElementById('adminModal');
    if (adminModal) {
        adminModal.addEventListener('click', function(e) {
            if (e.target === adminModal) closeAdminModal();
        });
    }

    // Wire logout button on index page to modal-specific function
    var logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logoutAdminFromModal);
});
