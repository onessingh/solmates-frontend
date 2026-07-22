/**
 * Notes Page Initialization
 * Dynamically loads notes content from backend
 */

document.addEventListener('DOMContentLoaded', async () => {
  let container = document.getElementById('contentContainer');
  if (!container) {
    const mainContent = document.querySelector('.main-content') || document.querySelector('main') || document.body;
    container = document.createElement('div');
    container.id = 'contentContainer';
    container.className = 'content-grid';
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; padding: 20px; margin-top: 80px;';
    mainContent.appendChild(container);
  }

  const urlParams = new URLSearchParams(window.location.search);
  const semester = urlParams.get('semester');

  if (window.loadContent && typeof window.loadContent === 'function') {
    await loadContent('notes', semester, 'contentContainer');
  } else {
    console.error('loadContent not found — make sure content-loader.js is loaded first.');
    container.innerHTML = '<div style="padding:40px;text-align:center;color:#666;">Error: Content loader not available. Please refresh.</div>';
  }

  // FIX: Socket.io real-time update — reconnectionAttempts:Infinity so it never gives up
  if (typeof io !== 'undefined') {
    try {
      var _base = (window.getSocketBaseURL ? window.getSocketBaseURL() : (window.PRODUCTION_API_URL || 'http://localhost:3000/api').replace(/\/api$/, ''));
      var _sock = io(_base, {
        transports: ['polling', 'websocket'],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000
      });
      _sock.on('content:updated', async function(payload) {
        if (payload.type === 'notes') {
          var _p = new URLSearchParams(window.location.search);
          var _sem = _p.get('semester');
          if (window.loadContent) await loadContent('notes', _sem, 'contentContainer');
        }
      });
    } catch(e) { console.warn('Socket init failed (init-notes):', e); }
  }

  // ✅ POLLING FALLBACK: Har 15 sec mein fresh data (reduced from 30s for faster updates)
  setInterval(async () => {
    if (window.loadContent) {
      var _p = new URLSearchParams(window.location.search);
      await loadContent('notes', _p.get('semester'), 'contentContainer');
    }
  }, 15000);
});
