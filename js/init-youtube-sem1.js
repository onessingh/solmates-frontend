document.addEventListener('DOMContentLoaded', async () => {
  let container = document.getElementById('videoContainer') || document.getElementById('contentContainer');
  if (!container) {
    const mainContent = document.querySelector('.main-content') || document.querySelector('main') || document.body;
    container = document.createElement('div');
    container.id = 'videoContainer';
    container.className = 'video-grid';
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; padding: 20px; margin-top: 80px;';
    mainContent.appendChild(container);
  }
  if (window.loadYouTubeVideos) await loadYouTubeVideos('1', container.id);

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
      // FIX: YouTube uses SOL API - subscribe to room and listen sol:updated
      _sock.emit('sol:subscribe', { category: 'youtube', semester: '1' });
      _sock.on('reconnect', function() {
        _sock.emit('sol:subscribe', { category: 'youtube', semester: '1' });
      });
      _sock.on('sol:updated', async function(payload) {
        if (payload.category === 'youtube' && String(payload.semester) === '1') {
          var _cid = document.getElementById('videoContainer') ? 'videoContainer' : 'contentContainer';
          if (window.loadYouTubeVideos) await loadYouTubeVideos('1', _cid);
        }
      });
      // Also keep content:updated as legacy fallback
      _sock.on('content:updated', async function(payload) {
        if (payload.type === 'youtube') {
          var _cid = document.getElementById('videoContainer') ? 'videoContainer' : 'contentContainer';
          if (window.loadYouTubeVideos) await loadYouTubeVideos('1', _cid);
        }
      });
    } catch(e) { console.warn('Socket init failed (init-youtube-sem1):', e); }
  }

  // ✅ POLLING FALLBACK: Har 30 sec mein fresh data (WebSocket timeout ke baad bhi kaam kare)
  setInterval(async () => {
    if (window.loadYouTubeVideos) {
      var _cid = document.getElementById('videoContainer') ? 'videoContainer' : 'contentContainer';
      await loadYouTubeVideos('1', _cid);
    }
  }, 15000);
});
