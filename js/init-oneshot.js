document.addEventListener('DOMContentLoaded', async () => {
  console.log('Initializing oneshot page...');
  let container = document.getElementById('contentContainer');
  if (!container) {
    const mainContent = document.querySelector('.main-content') || document.querySelector('main') || document.body;
    container = document.createElement('div');
    container.id = 'contentContainer';
    container.className = 'content-grid';
    container.style.cssText = `display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; padding: 20px; margin-top: 80px;`;
    mainContent.appendChild(container);
  }
  const urlParams = new URLSearchParams(window.location.search);
  const semester = urlParams.get('semester');
  // NOTE: oneshot.html uses loadFolderLinks() and has its own inline socket — this file
  // only provides fallback loadContent if used standalone.
  if (window.loadContent) await loadContent('oneshot', semester, 'contentContainer');

  // Socket.io real-time update
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
        if (!payload.type || payload.type === 'oneshot') {
          var _p = new URLSearchParams(window.location.search);
          if (window.loadContent) await loadContent('oneshot', _p.get('semester'), 'contentContainer');
        }
      });
    } catch(e) { console.warn('Socket init failed (init-oneshot):', e); }
  }

  // POLLING FALLBACK: 15 sec
  setInterval(async () => {
    if (window.loadContent) {
      var _p = new URLSearchParams(window.location.search);
      await loadContent('oneshot', _p.get('semester'), 'contentContainer');
    }
  }, 15000);
});
