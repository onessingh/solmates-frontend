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
      const lastPing = localStorage.getItem('solmates_uptime_ping_time');
      if (lastPing && (Date.now() - parseInt(lastPing, 10)) < 15 * 60 * 1000) {
        return; // Skip ping if sent within last 15 minutes across any tab
      }
      await fetch(`${BACKEND_URL}/api/live`, { mode: 'no-cors', cache: 'no-cache' });
      localStorage.setItem('solmates_uptime_ping_time', String(Date.now()));
    } catch (e) {
      // Ignore errors, we just want to hit the server
    }
  }

  function startPinging() {
    if (pingTimer) return;
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


// --- HEALTHCARE DYNAMIC THEME INJECTOR ---
(function() {
  function injectHealthcareTheme() {
    const isHealthcare = window.location.href.includes('/healthcare') || 
                         window.location.search.includes('category=hc-');
    if (isHealthcare) {
      if (!document.getElementById('hc-theme-css')) {
        const link = document.createElement('link');
        link.id = 'hc-theme-css';
        link.rel = 'stylesheet';
        link.href = '/css/healthcare-theme.css?v=1';
        document.head.appendChild(link);
      }
    }
  }
  
  if (document.head) injectHealthcareTheme();
  else document.addEventListener('DOMContentLoaded', injectHealthcareTheme);
})();

