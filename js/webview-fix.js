/**
 * SOLMATES WebView Download Fix v4 — Median.co Optimised
 *
 * Median.co (formerly GoNative.io) has its own JavaScript bridge for downloads.
 * This file detects Median and uses the correct method for each environment:
 *
 *  Median.co APK  → Convert blob to data URL → median.share.downloadUrl()
 *  Other WebViews → Standard DOM-append approach
 *  Browser        → Standard blob URL approach
 */

(function () {
  'use strict';

  // ✅ [v92.0] SILENT ERROR INTERCEPTOR (Logs only)
  window.onerror = function(msg, url, lineNo) {
    console.error('SOL ERROR: ' + msg + '\nFile: ' + url + '\nLine: ' + lineNo);
    return false;
  };

  /* ─── Environment Detection ─── */

  function isMedianApp() {
    return typeof window.median !== 'undefined' ||
           typeof window.gonative !== 'undefined' ||
           (navigator.userAgent || '').toLowerCase().includes('median') ||
           (navigator.userAgent || '').toLowerCase().includes('gonative');
  }

  function isWebView() {
    const ua = navigator.userAgent || '';
    const isAndroid = /wv/.test(ua) || /Android.*Version\/\d/.test(ua);
    const isIOS = /iPhone|iPad/.test(ua) && !/Safari/.test(ua);
    const isRN = typeof window.ReactNativeWebView !== 'undefined';
    return isMedianApp() || isAndroid || isIOS || isRN;
  }

  /* ─── Blob → Data URL helper ─── */

  function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }

  /* ─── Notification & Toast Helper ─── */
  
  function injectToastStyles() {
    if (document.getElementById('sol-download-styles')) return;
    const style = document.createElement('style');
    style.id = 'sol-download-styles';
    style.textContent = `
      .sol-download-toast {
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px);
        background: rgba(15, 43, 70, 0.9); backdrop-filter: blur(10px);
        color: white; padding: 12px 24px; border-radius: 30px;
        font-family: -apple-system, sans-serif; font-size: 13px; font-weight: 500;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2); z-index: 10000;
        transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        display: flex; align-items: center; gap: 10px; pointer-events: none;
      }
      .sol-download-toast.show { transform: translateX(-50%) translateY(0); }
      .sol-download-toast i { color: #34c759; }
      .sol-download-toast.loading i { color: #0071e3; animation: sol-spin 1s linear infinite; }
      @keyframes sol-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);
  }

  // Permission trigger on first interaction
  ['click', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, function() {
      if (typeof Notification !== 'undefined' && Notification.permission === 'default' && typeof Notification.requestPermission === 'function') {
        Notification.requestPermission().catch(() => {});
      }
    }, { once: true, passive: true });
  });

  function showDownloadStatus(filename, isStarting = true) {
    injectToastStyles();
    const cleanName = filename.length > 25 ? filename.substring(0, 22) + '...' : filename;
    const title = isStarting ? `Downloading ${cleanName}` : `${cleanName} Downloaded`;
    
    // 1. System Tray Notification
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        const notif = new Notification('SOLMATES', { 
            body: title, 
            icon: '/favicon.ico',
            tag: 'sol-download',
            renotify: true,
            silent: !isStarting
        });
        if (!isStarting) setTimeout(() => notif.close(), 5000);
      } catch (e) {}
    }

    // 2. UI Toast (Self-hiding)
    let toast = document.getElementById('sol-download-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'sol-download-toast';
      toast.className = 'sol-download-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = isStarting ? `<i class="fas fa-spinner"></i> Downloading...` : `<i class="fas fa-check"></i> Downloaded`;
    toast.className = `sol-download-toast show ${isStarting ? 'loading' : 'success'}`;
    toast.style.pointerEvents = 'auto'; // Allow click to dismiss
    
    // Manual dismissal on click
    toast.onclick = () => toast.classList.remove('show');

    // Auto-hide UI toast after 3 seconds strictly
    const hideTimeout = isStarting ? 5000 : 2000;
    setTimeout(() => {
      toast.classList.remove('show');
    }, hideTimeout);
  }

  /* ─── Native Push Bridge (v104.5) ─── */
  
  function getMedian() {
    return window.median || window.gonative;
  }

  function syncNativePushTags(semesters) {
    const med = getMedian();
    if (!med || !med.push || typeof med.push.subscribe !== 'function') {
      console.log('[Native Bridge] Push bridge not available.');
      return;
    }

    try {
      // Convert semesters to Median-friendly tags
      const tags = Array.isArray(semesters) ? semesters : [semesters];
      const formattedTags = tags.map(s => `solmates_sem_${s}`);
      
      console.log('[Native Bridge] Syncing tags:', formattedTags);
      med.push.subscribe({ tags: formattedTags });
    } catch (err) {
      console.error('[Native Bridge] Tag sync failed:', err);
    }
  }

  function openNativeSettings() {
    const med = getMedian();
    if (med && med.push && typeof med.push.openSettings === 'function') {
      med.push.openSettings();
    } else {
      // Fallback for non-bridge environments handled in UI
      console.warn('[Native Bridge] openSettings not available.');
    }
  }

  /* ─── Main Download Function ─── */

  async function triggerDownload(blob, filename) {
    try {
      if (!(blob instanceof Blob)) return;

      showDownloadStatus(filename, true);
      
      /* ── 1. Median.co APK Bridge ── */
      if (isMedianApp()) {
        const med = window.median || window.gonative;
        if (med && med.share && typeof med.share.downloadUrl === 'function') {
           const dataUrl = await blobToDataUrl(blob);
           med.share.downloadUrl({ url: dataUrl, filename: filename });
           setTimeout(() => showDownloadStatus(filename, false), 1000);
           return;
        }
      }

      /* ── 2. Standard Browser / WebView ── */
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      
      a.click();
      
      const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
      
      // Separate UI feedback from resource cleanup
      setTimeout(() => showDownloadStatus(filename, false), 1000);

      // Background resource cleanup (Longer for mobile stability)
      setTimeout(() => {
        if (document.body.contains(a)) document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, isMobile ? 120000 : 5000);

    } catch (err) {
      console.error('[WebView Fix] Download failed:', err);
    }
  }

  /* ─── Expose Globally ─── */
  window.triggerDownload = triggerDownload;
  window.isWebView = isWebView;
  window.isMedianApp = isMedianApp;
  window.syncNativePushTags = syncNativePushTags;
  window.openNativeSettings = openNativeSettings;

  /* ─── Seamless In-App Navigation (v113.0) ─── */

  function solOpenLink(url, forceSameWindow = true) {
    if (!url) return;
    
    if (isWebView() && forceSameWindow) {
      // Force same window in WebView to avoid Chrome Custom Tabs top-bar
      window.location.href = url;
    } else {
      window.open(url, '_blank');
    }
  }

  /* ─── Global Auto-Fix Link Hijacker ─── */
  function initLinkHijacker() {
    if (!isWebView()) return;

    document.addEventListener('click', function(e) {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const target = anchor.getAttribute('target');

      // Intercept target="_blank" links to force them into the primary WebView
      if (href && !href.startsWith('javascript:') && !href.startsWith('#') && target === '_blank') {
        e.preventDefault();
        window.location.href = href;
        console.log('[Native Bridge] Intercepted target="_blank" link for seamless navigation:', href);
      }
    }, true);
  }

  /* ─── Expose Globally ─── */
  window.triggerDownload = triggerDownload;
  window.isWebView = isWebView;
  window.isMedianApp = isMedianApp;
  window.syncNativePushTags = syncNativePushTags;
  window.openNativeSettings = openNativeSettings;
  window.solOpenLink = solOpenLink;

  /* ─── Initialize ─── */
  if (isWebView()) {
    initLinkHijacker();
    
    // Legacy Click Fix for Blobs
    const _nativeClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function () {
      const download = this.getAttribute('download');
      const href = this.getAttribute('href') || this.href || '';
      if (download !== null && href.startsWith('blob:')) {
        const filename = download || ('download_' + Date.now());
        const anchor = this;
        fetch(href)
          .then(function (res) { return res.blob(); })
          .then(function (blob) { return triggerDownload(blob, filename); })
          .catch(function () { _nativeClick.call(anchor); });
        return; 
      }
      _nativeClick.call(this);
    };
  }

})();
