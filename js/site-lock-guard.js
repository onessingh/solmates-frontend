/**
 * SOLMATES SITE-WIDE SECTION LOCK GUARD v3.0
 * Comprehensive locking system for:
 * 1. SOL Database (/database)
 * 2. Tools (/tools)
 * 3. Skills & Development (/skills)
 * 4. Solmates Arena / Games (/games)
 * 5. Journey (/journey)
 * 6. Platform Guide (/platform-guide)
 * 7. Feedback (/feedback)
 * 8. Privacy & Terms (/privacy-policy)
 */

(function () {
  'use strict';

  // Section Configurations
  const SITE_SECTIONS = [
    { key: 'database',       name: 'SOL Database',        icon: 'fas fa-database',     lockKey: '__SITE_DB_LOCKED__',       path: '/database',       sel: 'a[href="/database"], a[href^="/database/"], a[href^="/database?"]' },
    { key: 'tools',          name: 'Tools',               icon: 'fas fa-tools',        lockKey: '__SITE_TOOLS_LOCKED__',    path: '/tools',          sel: 'a[href="/tools"], a[href^="/tools/"], a[href^="/tools?"]' },
    { key: 'skills',         name: 'Skills & Development',icon: 'fas fa-chart-line',   lockKey: '__SITE_SKILLS_LOCKED__',   path: '/skills',         sel: 'a[href="/skills"], a[href^="/skills/"], a[href^="/skills?"]' },
    { key: 'games',          name: 'Solmates Arena',      icon: 'fas fa-gamepad',      lockKey: '__SITE_GAMES_LOCKED__',    path: '/games',          sel: 'a[href="/games"], a[href^="/games/"], a[href^="/games?"]' },
    { key: 'journey',        name: 'Journey',             icon: 'fas fa-road',         lockKey: '__SITE_JOURNEY_LOCKED__',  path: '/journey',        sel: 'a[href="/journey"], a[href^="/journey/"], a[href^="/journey?"]' },
    { key: 'platform-guide', name: 'Platform Guide',      icon: 'fas fa-book-open',    lockKey: '__SITE_GUIDE_LOCKED__',    path: '/platform-guide', sel: 'a[href="/platform-guide"], a[href^="/platform-guide/"], a[href^="/platform-guide."]' },
    { key: 'feedback',       name: 'Feedback',            icon: 'fas fa-comment-dots', lockKey: '__SITE_FEEDBACK_LOCKED__', path: '/feedback',       sel: 'a[href*="/feedback"]' },
    { key: 'privacy-policy', name: 'Privacy & Terms',     icon: 'fas fa-shield-alt',   lockKey: '__SITE_PRIVACY_LOCKED__',  path: '/privacy-policy', sel: 'a[href*="/privacy-policy"]' }
  ];

  // Helper: Extract clean Admin Token
  function getAdminToken() {
    let t = localStorage.getItem('solmates_admin_token') || localStorage.getItem('adminToken') || '';
    if (t) {
      t = t.trim();
      if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
        t = t.slice(1, -1).trim();
      }
      t = t.replace(/^Bearer\s+/i, '').trim();
    }
    return t || null;
  }

  // Helper: Detect Admin Login
  function isSiteAdmin() {
    try {
      if (window.solmatesAPI && typeof window.solmatesAPI.isAdminLoggedIn === 'function') {
        if (window.solmatesAPI.isAdminLoggedIn()) return true;
      }
      if (localStorage.getItem('solmates_admin_logged_in') === 'true') return true;
      return !!getAdminToken();
    } catch (e) {
      return false;
    }
  }

  // Helper: Match current URL against site sections
  function getCurrentSection() {
    const p = (window.location.pathname || '').toLowerCase();
    // Do not guard homepage
    if (p === '/' || p === '/index.html' || p === '') return null;
    for (let i = 0; i < SITE_SECTIONS.length; i++) {
      const s = SITE_SECTIONS[i];
      if (p === s.path || p.startsWith(s.path + '/') || p.startsWith(s.path + '.') || p.startsWith(s.path + '?')) {
        return s;
      }
    }
    return null;
  }

  // Helper: Get Base API URL
  function getBaseApiUrl() {
    if (window.PRODUCTION_API_URL) return window.PRODUCTION_API_URL;
    if (window.BACKEND_PRIMARY_URL) return window.BACKEND_PRIMARY_URL + '/api';
    return 'https://api.solmates.in/api';
  }

  // STEP 1: ZERO-MILLISECOND EARLY BLOCKER (Runs immediately in <head>)
  (function earlyCheck() {
    try {
      const curSection = getCurrentSection();
      if (!curSection) return;
      if (isSiteAdmin()) return; // Admin bypass

      const cached = JSON.parse(localStorage.getItem('solmates_site_locks') || '{}');
      if (cached[curSection.lockKey]) {
        const style = document.createElement('style');
        style.id = 'siteLockEarlyStyle';
        style.textContent = 'body > *:not(#siteLockOverlay):not(#siteLockEarlyStyle):not(#siteLockBlockerStyle) { display: none !important; }';
        (document.head || document.documentElement).appendChild(style);
      }
    } catch (e) {}
  })();

  // Render Full-Screen Lock Screen for Students inside a locked page
  function renderLockOverlay(section) {
    if (document.getElementById('siteLockOverlay')) return;
    const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('solmates_theme') === 'dark';

    // Hide any other body content cleanly
    let blocker = document.getElementById('siteLockBlockerStyle');
    if (!blocker) {
      blocker = document.createElement('style');
      blocker.id = 'siteLockBlockerStyle';
      blocker.textContent = 'body > *:not(#siteLockOverlay):not(#siteLockEarlyStyle):not(#siteLockBlockerStyle):not(#siteLockAdminBadge) { display: none !important; }';
      (document.head || document.documentElement).appendChild(blocker);
    }

    const overlay = document.createElement('div');
    overlay.id = 'siteLockOverlay';
    overlay.style.cssText = [
      'position: fixed', 'inset: 0', 'z-index: 999999',
      'display: flex', 'align-items: center', 'justify-content: center',
      `background: ${isDark ? 'rgba(15,23,42,0.96)' : 'rgba(248,250,252,0.96)'}`,
      'backdrop-filter: blur(8px)', '-webkit-backdrop-filter: blur(8px)',
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
      'padding: 20px', 'box-sizing: border-box'
    ].join(';');

    overlay.innerHTML = `
      <div style="
        background: ${isDark ? '#1e293b' : '#ffffff'};
        border: 1px solid ${isDark ? '#334155' : '#e2e8f0'};
        border-radius: 20px;
        padding: 44px 28px;
        text-align: center;
        max-width: 400px;
        width: 100%;
        box-shadow: 0 20px 45px ${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'};
      ">
        <div style="
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(15, 23, 42, 0.85); color: #fbbf24;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 18px; font-size: 22px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.2);
        "><i class="fas fa-lock"></i></div>
        <h2 style="
          margin: 0 0 10px; font-size: 1.35rem; font-weight: 800;
          color: ${isDark ? '#f8fafc' : '#0f172a'};
        ">${section.name}</h2>
        <p style="
          margin: 0 0 24px; font-size: 0.92rem; line-height: 1.6;
          color: ${isDark ? '#94a3b8' : '#64748b'};
        ">This section is currently locked for maintenance. It will be available soon!</p>
        <a href="/" style="
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: #4f46e5; color: #ffffff; padding: 11px 28px; border-radius: 50px;
          text-decoration: none; font-weight: 700; font-size: 0.92rem;
          box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35); transition: transform 0.15s;
        ">← Back to Home</a>
      </div>
    `;

    (document.body || document.documentElement).appendChild(overlay);
    if (document.body) document.body.style.overflow = 'hidden';
  }

  // Render Admin Bypass Notification Pill inside a locked page
  function renderAdminBypassBadge(section, folderId) {
    if (document.getElementById('siteLockAdminBadge')) return;
    const badge = document.createElement('div');
    badge.id = 'siteLockAdminBadge';
    badge.style.cssText = [
      'position: fixed', 'top: 60px', 'left: 50%', 'transform: translateX(-50%)',
      'background: #4f46e5', 'color: #ffffff', 'padding: 7px 16px', 'border-radius: 30px',
      'font-size: 12px', 'font-weight: 700', 'z-index: 999999',
      'box-shadow: 0 4px 15px rgba(79, 70, 229, 0.35)', 'display: flex', 'align-items: center', 'gap: 10px',
      'font-family: -apple-system, sans-serif'
    ].join(';');

    badge.innerHTML = `
      <span>🔒 ${section.name} is Locked (Admin Bypass Active)</span>
      <button id="siteLockQuickUnlockBtn" style="
        background: #10b981; color: white; border: none; padding: 4px 12px;
        border-radius: 12px; font-size: 11px; font-weight: 800; cursor: pointer;
      ">Unlock Now</button>
    `;

    (document.body || document.documentElement).appendChild(badge);
    const btn = document.getElementById('siteLockQuickUnlockBtn');
    if (btn) {
      btn.addEventListener('click', async function () {
        btn.disabled = true;
        btn.textContent = 'Unlocking...';
        await toggleSiteLock(section.lockKey, false, folderId);
        badge.remove();
        const earlyStyle = document.getElementById('siteLockEarlyStyle');
        if (earlyStyle) earlyStyle.remove();
        const blocker = document.getElementById('siteLockBlockerStyle');
        if (blocker) blocker.remove();
      });
    }
  }

  // Server API: Fetch lock folders from category 'recorded-class', semester 0
  async function fetchServerLocks() {
    let folders = [];
    try {
      if (window.solmatesAPI && typeof window.solmatesAPI.getSOLFolders === 'function') {
        const res = await window.solmatesAPI.getSOLFolders('recorded-class', 0, null, true, true);
        folders = (res && res.data) ? res.data : (Array.isArray(res) ? res : []);
      } else {
        const apiUrl = getBaseApiUrl();
        const res = await fetch(`${apiUrl}/sol/folders/recorded-class/0?all=true&_t=${Date.now()}`);
        if (res.ok) {
          const json = await res.json();
          folders = (json && json.data) ? json.data : (Array.isArray(json) ? json : []);
        }
      }
    } catch (e) {
      console.warn('[SITE LOCK] Server fetch failed:', e.message);
      return null;
    }
    return folders;
  }

  // Toggle a section lock (Add or Delete folder in recorded-class 0)
  async function toggleSiteLock(lockKey, shouldLock, folderId) {
    const token = getAdminToken();
    const apiUrl = getBaseApiUrl();

    try {
      if (shouldLock) {
        if (window.solmatesAPI && typeof window.solmatesAPI.addSOLFolder === 'function') {
          await window.solmatesAPI.addSOLFolder({ name: lockKey, category: 'recorded-class', semester: 0 });
        } else {
          const res = await fetch(`${apiUrl}/sol/folders`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name: lockKey, category: 'recorded-class', semester: 0 })
          });
          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || `Server returned ${res.status}`);
          }
        }
      } else {
        let targetId = folderId;
        const freshFolders = await fetchServerLocks();
        const found = (freshFolders || []).find(it => (it.name || '').includes(lockKey));
        if (found) {
          targetId = found.id || found._id;
        }

        if (targetId) {
          if (window.solmatesAPI && typeof window.solmatesAPI.deleteSOLFolder === 'function') {
            await window.solmatesAPI.deleteSOLFolder(targetId);
          } else {
            const res = await fetch(`${apiUrl}/sol/folders/${targetId}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) {
              const errData = await res.json().catch(() => ({}));
              throw new Error(errData.message || `Server returned ${res.status}`);
            }
          }
        }
      }

      // Update local storage cache
      const cached = JSON.parse(localStorage.getItem('solmates_site_locks') || '{}');
      cached[lockKey] = shouldLock;
      localStorage.setItem('solmates_site_locks', JSON.stringify(cached));

      if (window.solmatesAPI && typeof window.solmatesAPI._cacheClear === 'function') {
        window.solmatesAPI._cacheClear('');
      }

      // Re-apply UI on current page
      await syncAndApplyLocks();
      return true;
    } catch (err) {
      alert('Error updating lock: ' + err.message);
      return false;
    }
  }

  // Apply visual lock indicators to navbar links and home cards (Database style)
  function applyLocksToDom(locksMap, foldersList) {
    const isAdmin = isSiteAdmin();

    SITE_SECTIONS.forEach(function (sec) {
      const isLocked = !!locksMap[sec.lockKey];
      const folder = (foldersList || []).find(f => (f.name || '').includes(sec.lockKey));
      const folderId = folder ? (folder.id || folder._id) : null;

      // Find all matching links across navbar, mobile menu, and homepage cards
      const elements = document.querySelectorAll(sec.sel);
      elements.forEach(function (el) {
        const isCard = el.classList.contains('main-option-card') || el.classList.contains('category-card');

        if (isLocked) {
          el.classList.add('site-section-locked');
          if (isCard) {
            el.style.position = 'relative';

            // Database style: subtle card opacity
            const title = el.querySelector('h3, h2, .title');
            if (title) title.style.opacity = '0.5';
            const desc = el.querySelector('p, .desc');
            if (desc) desc.style.opacity = '0.5';
            const mainIcon = el.querySelector('.main-icon, i');
            if (mainIcon) mainIcon.style.opacity = '0.5';

            let overlay = el.querySelector('.site-lock-card-overlay');
            if (!overlay) {
              overlay = document.createElement('div');
              overlay.className = 'site-lock-card-overlay';
              // Database style: subtle translucent overlay with centered amber lock on dark round circle
              overlay.style.cssText = [
                'position: absolute', 'inset: 0',
                'background: rgba(255, 255, 255, 0.2)',
                'border-radius: 12px', 'display: flex', 'align-items: center',
                'justify-content: center', 'z-index: 10',
                'pointer-events: none'
              ].join(';');
              overlay.innerHTML = '<i class="fas fa-lock" style="font-size: 14px; color: #fbbf24; background: rgba(15, 23, 42, 0.85); width: 32px; height: 32px; line-height: 32px; text-align: center; border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.15); display: inline-block;"></i>';
              el.appendChild(overlay);
            }
            overlay.style.display = 'flex';
          } else {
            // Navbar or inline link: subtle amber lock icon (matching database style)
            if (!el.querySelector('.nav-lock-badge')) {
              const badge = document.createElement('span');
              badge.className = 'nav-lock-badge';
              badge.style.cssText = 'margin-left: 6px; font-size: 11px; color: #fbbf24; vertical-align: middle;';
              badge.innerHTML = '<i class="fas fa-lock"></i>';
              el.appendChild(badge);
            }
          }
        } else {
          el.classList.remove('site-section-locked');
          const title = el.querySelector('h3, h2, .title');
          if (title) title.style.opacity = '';
          const desc = el.querySelector('p, .desc');
          if (desc) desc.style.opacity = '';
          const mainIcon = el.querySelector('.main-icon, i');
          if (mainIcon) mainIcon.style.opacity = '';

          const overlay = el.querySelector('.site-lock-card-overlay');
          if (overlay) overlay.style.display = 'none';
          const navBadge = el.querySelector('.nav-lock-badge');
          if (navBadge) navBadge.remove();
        }

        // Admin Lock / Unlock Button on Homepage Cards (Exactly like database .sec-lock-btn)
        if (isAdmin && isCard) {
          let btn = el.querySelector('.site-card-lock-btn');
          if (!btn) {
            btn = document.createElement('button');
            btn.className = 'site-card-lock-btn';
            btn.style.cssText = [
              'position: absolute', 'bottom: 10px', 'right: 10px', 'z-index: 22',
              'background: #4f46e5', 'color: white', 'border: none',
              'border-radius: 50%', 'width: 28px', 'height: 28px',
              'cursor: pointer', 'display: flex', 'align-items: center', 'justify-content: center',
              'font-size: 12px', 'box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3)', 'transition: transform 0.15s'
            ].join(';');
            el.appendChild(btn);

            btn.addEventListener('click', async function (e) {
              e.preventDefault();
              e.stopPropagation();
              const key = btn.getAttribute('data-key');
              const isCurLocked = btn.getAttribute('data-locked') === '1';
              const fid = btn.getAttribute('data-fid') || null;

              btn.disabled = true;
              btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
              await toggleSiteLock(key, !isCurLocked, fid);
              btn.disabled = false;
            });
          }

          // Always dynamically update dataset on EVERY render
          btn.setAttribute('data-key', sec.lockKey);
          btn.setAttribute('data-locked', isLocked ? '1' : '0');
          if (folderId) btn.setAttribute('data-fid', folderId);
          else btn.removeAttribute('data-fid');

          btn.innerHTML = isLocked ? '<i class="fas fa-unlock"></i>' : '<i class="fas fa-lock"></i>';
          btn.title = isLocked ? `Unlock ${sec.name}` : `Lock ${sec.name}`;
          btn.style.background = isLocked ? '#10b981' : '#4f46e5';
        }
      });
    });
  }

  // Intercept click on locked links for non-admins
  document.addEventListener('click', function (e) {
    if (isSiteAdmin()) return;
    const lockedLink = e.target.closest('.site-section-locked');
    if (lockedLink) {
      e.preventDefault();
      e.stopPropagation();
      showQuickLockedAlert();
    }
  }, true);

  function showQuickLockedAlert() {
    if (document.getElementById('siteLockModalPopup')) return;
    const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('solmates_theme') === 'dark';
    const modal = document.createElement('div');
    modal.id = 'siteLockModalPopup';
    modal.style.cssText = [
      'position: fixed', 'inset: 0', 'z-index: 999999', 'display: flex',
      'align-items: center', 'justify-content: center',
      'background: rgba(0,0,0,0.5)', 'backdrop-filter: blur(3px)',
      'padding: 20px', 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
    ].join(';');

    modal.innerHTML = `
      <div style="
        background: ${isDark ? '#1e293b' : '#ffffff'};
        border-radius: 20px; padding: 32px 24px; text-align: center;
        max-width: 350px; width: 100%; box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        border: 1px solid ${isDark ? '#334155' : '#e2e8f0'};
      ">
        <div style="
          width: 50px; height: 50px; border-radius: 50%;
          background: rgba(15, 23, 42, 0.85); color: #fbbf24;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px; font-size: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        "><i class="fas fa-lock"></i></div>
        <h3 style="margin: 0 0 8px; font-size: 1.2rem; font-weight: 800; color: ${isDark ? '#f8fafc' : '#0f172a'};">Section Locked</h3>
        <p style="margin: 0 0 20px; font-size: 0.9rem; color: ${isDark ? '#94a3b8' : '#64748b'}; line-height: 1.5;">This section is temporarily locked for maintenance. Content will be available soon!</p>
        <button id="closeSiteLockPopup" style="
          background: #4f46e5; color: white; border: none; padding: 10px 24px;
          border-radius: 30px; font-weight: 700; font-size: 0.9rem; cursor: pointer;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        ">Understood</button>
      </div>
    `;

    document.body.appendChild(modal);
    modal.addEventListener('click', (ev) => { if (ev.target === modal) modal.remove(); });
    document.getElementById('closeSiteLockPopup').addEventListener('click', () => modal.remove());
  }

  // MAIN SYNCHRONIZER: Checks server and applies rules
  async function syncAndApplyLocks() {
    const curSection = getCurrentSection();
    const isAdmin = isSiteAdmin();

    // 1. First, apply from localStorage cached state immediately
    const cached = JSON.parse(localStorage.getItem('solmates_site_locks') || '{}');
    applyLocksToDom(cached, []);

    if (curSection && cached[curSection.lockKey]) {
      if (!isAdmin) {
        renderLockOverlay(curSection);
      }
    }

    // 2. Fetch fresh folders from backend
    const folders = await fetchServerLocks();
    if (!folders) return;

    const freshLocks = {};
    SITE_SECTIONS.forEach(function (s) {
      freshLocks[s.lockKey] = folders.some(f => (f.name || '').includes(s.lockKey));
    });

    localStorage.setItem('solmates_site_locks', JSON.stringify(freshLocks));
    applyLocksToDom(freshLocks, folders);

    // If inside a section page:
    if (curSection) {
      const isLocked = freshLocks[curSection.lockKey];
      const folder = folders.find(f => (f.name || '').includes(curSection.lockKey));
      const folderId = folder ? (folder.id || folder._id) : null;

      if (isLocked) {
        if (!isAdmin) {
          renderLockOverlay(curSection);
        } else {
          renderAdminBypassBadge(curSection, folderId);
        }
      } else {
        // Section is unlocked, remove blocker if present
        const ov = document.getElementById('siteLockOverlay');
        if (ov) ov.remove();
        const earlyStyle = document.getElementById('siteLockEarlyStyle');
        if (earlyStyle) earlyStyle.remove();
        const blocker = document.getElementById('siteLockBlockerStyle');
        if (blocker) blocker.remove();
        if (document.body) document.body.style.overflow = '';
      }
    }

    // 3. If on Homepage and Admin, setup central "Admin Site Locks Manager"
    if (isAdmin) {
      setupAdminSiteLocksManager(freshLocks, folders);
    }
  }

  // Admin Central Site Locks Manager Modal (Available on Home Page / Navbar)
  function setupAdminSiteLocksManager(locksMap, folders) {
    let triggerBtn = document.getElementById('adminSiteLocksBtn');
    if (!triggerBtn) {
      const navRight = document.querySelector('.top-nav .nav-right') || document.querySelector('.top-nav') || document.querySelector('.nav-right');
      triggerBtn = document.createElement('button');
      triggerBtn.id = 'adminSiteLocksBtn';
      triggerBtn.className = 'admin-locks-btn';
      triggerBtn.addEventListener('click', openSiteLocksManagerModal);

      if (navRight) {
        triggerBtn.style.cssText = [
          'background: #4f46e5', 'color: white', 'border: none', 'padding: 6px 14px',
          'border-radius: 20px', 'font-size: 12px', 'font-weight: 700', 'cursor: pointer',
          'display: inline-flex', 'align-items: center', 'gap: 6px', 'margin-right: 10px',
          'box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3)', 'transition: transform 0.2s'
        ].join(';');
        triggerBtn.innerHTML = '<i class="fas fa-lock"></i> Site Locks';
        navRight.insertBefore(triggerBtn, navRight.firstChild);
      } else {
        triggerBtn.style.cssText = [
          'position: fixed', 'bottom: 20px', 'left: 20px', 'z-index: 99998',
          'background: #4f46e5', 'color: white', 'border: none', 'padding: 8px 16px',
          'border-radius: 24px', 'font-size: 12px', 'font-weight: 700', 'cursor: pointer',
          'display: inline-flex', 'align-items: center', 'gap: 6px',
          'box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4)', 'transition: transform 0.2s'
        ].join(';');
        triggerBtn.innerHTML = '<i class="fas fa-lock"></i> Site Locks';
        document.body.appendChild(triggerBtn);
      }
    }

    // Update modal if it is already open
    const modal = document.getElementById('siteLocksManagerModal');
    if (modal && modal.style.display !== 'none') {
      renderSiteLocksModalBody(locksMap, folders);
    }
  }

  function openSiteLocksManagerModal() {
    let modal = document.getElementById('siteLocksManagerModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'siteLocksManagerModal';
      modal.style.cssText = [
        'position: fixed', 'inset: 0', 'z-index: 1000000', 'display: flex',
        'align-items: center', 'justify-content: center',
        'background: rgba(0,0,0,0.6)', 'backdrop-filter: blur(4px)',
        'padding: 15px', 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
      ].join(';');
      document.body.appendChild(modal);
      modal.addEventListener('click', (ev) => { if (ev.target === modal) modal.style.display = 'none'; });
    }

    const cached = JSON.parse(localStorage.getItem('solmates_site_locks') || '{}');
    renderSiteLocksModalBody(cached, []);
    modal.style.display = 'flex';

    // Refresh with fresh server state
    fetchServerLocks().then(folders => {
      if (!folders) return;
      const fresh = {};
      SITE_SECTIONS.forEach(s => {
        fresh[s.lockKey] = folders.some(f => (f.name || '').includes(s.lockKey));
      });
      renderSiteLocksModalBody(fresh, folders);
    });
  }

  function renderSiteLocksModalBody(locksMap, folders) {
    const modal = document.getElementById('siteLocksManagerModal');
    if (!modal) return;
    const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('solmates_theme') === 'dark';

    let listHtml = '';
    SITE_SECTIONS.forEach(function (sec) {
      const isLocked = !!locksMap[sec.lockKey];
      const folder = (folders || []).find(f => (f.name || '').includes(sec.lockKey));
      const folderId = folder ? (folder.id || folder._id) : '';

      listHtml += `
        <div style="
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px; margin-bottom: 8px; border-radius: 12px;
          background: ${isDark ? '#0f172a' : '#f8fafc'};
          border: 1px solid ${isDark ? '#334155' : '#e2e8f0'};
        ">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              width: 36px; height: 36px; border-radius: 10px;
              background: ${isLocked ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)'};
              color: ${isLocked ? '#ef4444' : '#10b981'};
              display: flex; align-items: center; justify-content: center; font-size: 16px;
            "><i class="${sec.icon}"></i></div>
            <div>
              <div style="font-weight: 700; font-size: 14px; color: ${isDark ? '#f8fafc' : '#0f172a'};">${sec.name}</div>
              <div style="font-size: 11px; color: ${isLocked ? '#ef4444' : '#10b981'}; font-weight: 600;">
                ${isLocked ? '🔒 Currently Locked for Students' : '🟢 Publicly Active'}
              </div>
            </div>
          </div>
          <button class="site-toggle-lock-btn" data-key="${sec.lockKey}" data-locked="${isLocked ? '1' : '0'}" data-fid="${folderId}" style="
            background: ${isLocked ? '#10b981' : '#4f46e5'};
            color: white; border: none; padding: 6px 14px; border-radius: 20px;
            font-size: 12px; font-weight: 700; cursor: pointer; transition: transform 0.15s;
          ">
            ${isLocked ? 'Unlock' : 'Lock'}
          </button>
        </div>
      `;
    });

    modal.innerHTML = `
      <div style="
        background: ${isDark ? '#1e293b' : '#ffffff'};
        border-radius: 20px; padding: 24px; max-width: 480px; width: 100%;
        max-height: 85vh; display: flex; flex-direction: column;
        box-shadow: 0 25px 60px rgba(0,0,0,0.3); border: 1px solid ${isDark ? '#334155' : '#e2e8f0'};
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h3 style="margin: 0; font-size: 1.2rem; color: ${isDark ? '#f8fafc' : '#0f172a'}; font-weight: 800;">
              <i class="fas fa-shield-alt" style="color: #4f46e5;"></i> Site Sections Lock Manager
            </h3>
            <p style="margin: 2px 0 0; font-size: 12px; color: ${isDark ? '#94a3b8' : '#64748b'};">
              Lock any page site-wide with 1 click (Admin bypass remains active)
            </p>
          </div>
          <button onclick="document.getElementById('siteLocksManagerModal').style.display='none'" style="
            background: none; border: none; font-size: 20px; cursor: pointer; color: ${isDark ? '#94a3b8' : '#64748b'};
          ">&times;</button>
        </div>

        <div style="overflow-y: auto; flex: 1; padding-right: 4px;">
          ${listHtml}
        </div>

        <div style="margin-top: 16px; text-align: right;">
          <button onclick="document.getElementById('siteLocksManagerModal').style.display='none'" style="
            background: #4f46e5; color: white; border: none; padding: 8px 20px;
            border-radius: 20px; font-weight: 700; font-size: 12px; cursor: pointer;
          ">Done</button>
        </div>
      </div>
    `;

    // Attach click listeners to all toggle buttons inside modal
    modal.querySelectorAll('.site-toggle-lock-btn').forEach(function (btn) {
      btn.addEventListener('click', async function (e) {
        e.preventDefault();
        const key = btn.getAttribute('data-key');
        const isLocked = btn.getAttribute('data-locked') === '1';
        const fid = btn.getAttribute('data-fid') || null;

        btn.disabled = true;
        btn.textContent = isLocked ? 'Unlocking...' : 'Locking...';
        await toggleSiteLock(key, !isLocked, fid);
        btn.disabled = false;
      });
    });
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncAndApplyLocks);
  } else {
    syncAndApplyLocks();
  }

  // Listen for storage events across tabs
  window.addEventListener('storage', function (e) {
    if (e.key === 'solmates_site_locks') {
      try {
        const updated = JSON.parse(e.newValue || '{}');
        applyLocksToDom(updated, []);
      } catch (err) {}
    }
  });

  // Global helper exports
  window.solmatesSiteLocks = {
    sync: syncAndApplyLocks,
    openManager: openSiteLocksManagerModal,
    toggleLock: toggleSiteLock
  };
})();
