/**
 * SOLMATES Uptime Helper (v116.4)
 * Keeps the Render backend awake while the user is active on the site.
 * v116.4: First ping delayed 15s so it doesn't block/compete with page load on mobile.
 */
(function () {
  const BACKEND_URL = window.RENDER_BACKEND_URL || 'https://solmates-backend-w27e.onrender.com';
  const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes
  let pingTimer = null;

  async function wakeUpBackend() {
    try {
      await fetch(`${BACKEND_URL}/api/live`, { mode: 'no-cors', cache: 'no-cache' });
    } catch (e) {
      // Ignore errors, we just want to hit the server
    }
  }

  function startPinging() {
    if (pingTimer) return;
    // [v116.4] First ping delayed 15s after startPinging called
    // This ensures page rendering is fully done before hitting Render backend
    setTimeout(wakeUpBackend, 15000);
    pingTimer = setInterval(wakeUpBackend, PING_INTERVAL);
  }

  function stopPinging() {
    if (pingTimer) {
      clearInterval(pingTimer);
      pingTimer = null;
    }
  }

  // Only ping when the tab is visible to save resources
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      startPinging();
    } else {
      stopPinging();
    }
  });

  // Initial start — only after window fully loaded to avoid competing with page render
  window.addEventListener('load', () => {
    if (document.visibilityState === 'visible') {
      startPinging();
    }
  });
})();
