/**
 * SOLMATES - Frontend Cache & Prefetcher (v843 - Static Local Snapshot & Zero Network Mode)
 * ──────────────────────────────────────────────────────────────────────────────────────────
 * • Stores full database snapshot in localStorage
 * • Serves 100% of user pageviews & navigation directly from local snapshot (0ms latency, 0 Backend Requests)
 * • Only performs backend fetch if snapshot is missing or older than 24 hours (or if forced by Admin)
 */

(function (window) {
    'use strict';

    /* ========== TOTAL CONSOLE BLACKOUT (v843 - Production Only) ========== */
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && localStorage.getItem('solmates_debug') !== 'true') {
      const dummy = () => {};
      console.log = dummy;
      console.debug = dummy;
      console.info = dummy;
      console.warn = dummy;
      console.error = dummy;
    }

    const CACHE_NAME = '_solDataCache';
    window[CACHE_NAME] = {
        folders: {},     // { category_semester: data }
        content: {}      // { category_semester: data }
    };

    /**
     * Helper to populate API client's cache from bulk payload
     */
    function _applyBulkToAPIClient(data) {
        // v856: Disabled bulk snapshot poisoning so API client always fetches fresh live database content
        return false;
    }

    function populateMemoryCache(data) {
        if (!data || !data.success) return;
        window._sol_bulk_cache_snapshot = data;
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => _applyBulkToAPIClient(data), { timeout: 1000 });
        } else {
            setTimeout(() => _applyBulkToAPIClient(data), 100);
        }
    }

    // Automatic Purge of Old Cache Snapshots (v867)
    const SNAPSHOT_CACHE_VER = 'v922_fresh_sync';
    if (localStorage.getItem('_sol_snapshot_ver') !== SNAPSHOT_CACHE_VER) {
        try {
            Object.keys(localStorage).forEach(k => {
                if (k.startsWith('cached_notices_') || k.startsWith('solcache_') || k.startsWith('_sol_') || k === 'solmates_mba_locks_cache') {
                    localStorage.removeItem(k);
                }
            });
            Object.keys(sessionStorage).forEach(k => {
                if (k.startsWith('solcache_') || k.startsWith('cached_notices_')) {
                    sessionStorage.removeItem(k);
                }
            });
            if ('caches' in window) {
                caches.keys().then(keys => {
                    keys.forEach(k => {
                        if (k !== 'solmates-cache-v867') caches.delete(k);
                    });
                }).catch(() => {});
            }
        } catch(e) {}
        localStorage.setItem('_sol_snapshot_ver', SNAPSHOT_CACHE_VER);
    }

    // Auto Service Worker Revalidator & Instant Cache Update for all devices
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(reg => {
                reg.update();
            });
        }).catch(() => {});
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                refreshing = true;
                window.location.reload();
            }
        });
    }

    // Instant Warm Up from LocalStorage (Async / Non-blocking)
    function warmUpFromStorage() {
        try {
            if (window._sol_bulk_cache_snapshot) return;
            const localCachedStr = localStorage.getItem('_sol_all_content_data');
            if (localCachedStr) {
                const parsed = JSON.parse(localCachedStr);
                populateMemoryCache(parsed);
            }
        } catch (e) {
            localStorage.removeItem('_sol_all_content_data');
            localStorage.removeItem('_sol_all_content_etag');
            localStorage.removeItem('_sol_last_fetch_timestamp');
        }
    }

    if ('requestIdleCallback' in window) {
        requestIdleCallback(warmUpFromStorage, { timeout: 500 });
    } else {
        setTimeout(warmUpFromStorage, 0);
    }

    const SOL_CACHE = {
        applySnapshot: () => {
            if (window._sol_bulk_cache_snapshot) {
                _applyBulkToAPIClient(window._sol_bulk_cache_snapshot);
            }
        },

        get: (type, category, semester) => {
            const key = `${category}_${semester}`;
            return window[CACHE_NAME][type] ? window[CACHE_NAME][type][key] : null;
        },

        set: (type, category, semester, data) => {
            const key = `${category}_${semester}`;
            if (!window[CACHE_NAME][type]) window[CACHE_NAME][type] = {};
            window[CACHE_NAME][type][key] = data;
        },

        clear: (category, semester) => {
            if (category && semester) {
                const key = `${category}_${semester}`;
                if (window[CACHE_NAME].folders[key]) delete window[CACHE_NAME].folders[key];
                if (window[CACHE_NAME].content[key]) delete window[CACHE_NAME].content[key];
            } else {
                window[CACHE_NAME].folders = {};
                window[CACHE_NAME].content = {};
            }
            window._sol_bulk_cache_snapshot = null;
            window._sol_bulk_applied_data = null;
            localStorage.removeItem('_sol_all_content_data');
            localStorage.removeItem('_sol_all_content_etag');
            localStorage.removeItem('_sol_last_fetch_timestamp');
            localStorage.removeItem('solcache_live_classes');
            for (let i = 0; i <= 4; i++) {
                localStorage.removeItem(`cached_notices_sem${i}`);
                localStorage.removeItem(`cached_notices_sem${i}_time`);
            }
            try {
                Object.keys(sessionStorage).forEach(k => {
                    if (k.startsWith('solcache_')) sessionStorage.removeItem(k);
                });
            } catch(e) {}
        },

        prefetch: async (force = false) => {
            const now = Date.now();
            const lastFetch = localStorage.getItem('_sol_last_fetch_timestamp');
            const localData = localStorage.getItem('_sol_all_content_data');
            const cachedEtag = localStorage.getItem('_sol_all_content_etag');

            // Warm up memory cache from local snapshot if not already loaded into memory
            if (!window._sol_bulk_cache_snapshot && localData) {
                try {
                    const parsed = JSON.parse(localData);
                    populateMemoryCache(parsed);
                } catch (e) {}
            }

            // ⏱️ 5-SECOND TTL SHIELD: Skip network revalidation if fetched within last 5 seconds unless forced
            if (!force && lastFetch && (now - parseInt(lastFetch, 10)) < 5 * 1000) {
                console.log(`⚡ [SNAPSHOT] Content served from local snapshot (${Math.round((now - parseInt(lastFetch, 10))/1000)}s ago < 5s TTL). Skipping network revalidation.`);
                return;
            }

            console.log('🚀 [SNAPSHOT] Checking database snapshot ETag with backend...');

            try {
                const apiBase = window.PRODUCTION_API_URL || 
                                (window.SOL && window.SOL.getApiBase ? window.SOL.getApiBase() : 
                                (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:3000/api' : 'https://api.solmates.in/api'));

                const startTime = Date.now();
                const headers = {};
                if (cachedEtag && !force) {
                    headers['If-None-Match'] = cachedEtag;
                }

                const res = await fetch(`${apiBase}/sol/all-content`, { headers });

                if (res.status === 304) {
                    localStorage.setItem('_sol_last_fetch_timestamp', String(now));
                    console.log(`✅ [SNAPSHOT] Content Not Modified (HTTP 304). 0 Bytes transferred!`);
                    return;
                }

                if (res.ok) {
                    const etag = res.headers.get('ETag');
                    if (etag) localStorage.setItem('_sol_all_content_etag', etag);
                    localStorage.setItem('_sol_last_fetch_timestamp', String(now));

                    const data = await res.json();
                    if (data && data.success) {
                        try {
                            localStorage.setItem('_sol_all_content_data', JSON.stringify(data));
                        } catch (e) { /* Storage full fallback */ }

                        populateMemoryCache(data);
                        window.dispatchEvent(new CustomEvent('sol:content-updated', { detail: data }));
                        console.log(`✅ [SNAPSHOT] Database updated! Downloaded fresh snapshot in ${Date.now() - startTime}ms.`);
                    }
                }
            } catch (e) {
                console.error('❌ [SNAPSHOT] Sync error:', e.message);
            }
        }
    };

    window.SOL_CACHE = SOL_CACHE;

    window.addEventListener('sol:cache_invalidated', (e) => {
        const ver = (e && e.detail && e.detail.version) ? e.detail.version : Date.now();
        window._SOL_CONTENT_VERSION = ver;
        try { localStorage.setItem('_sol_content_version', String(ver)); } catch(_) {}
        if (window.SOL_CACHE) window.SOL_CACHE.clear();
    });

    window.addEventListener('content:updated', (e) => {
        const ver = Date.now();
        window._SOL_CONTENT_VERSION = ver;
        try { localStorage.setItem('_sol_content_version', String(ver)); } catch(_) {}
        if (window.SOL_CACHE) window.SOL_CACHE.clear();
    });

    // Cross-tab admin mutation listener (debounced)
    let _storageMutationTimer = null;
    window.addEventListener('storage', (e) => {
        if (e.key === '_sol_admin_mutation') {
            if (_storageMutationTimer) clearTimeout(_storageMutationTimer);
            _storageMutationTimer = setTimeout(() => {
                if (window.SOL_CACHE) {
                    SOL_CACHE.clear();
                    SOL_CACHE.prefetch(true);
                }
            }, 500);
        }
    });

    // Retry applying snapshot when solmatesAPI loads asynchronously
    const checkApiReadyTimer = setInterval(() => {
        if (window.solmatesAPI && window._sol_bulk_cache_snapshot) {
            if (_applyBulkToAPIClient(window._sol_bulk_cache_snapshot)) {
                clearInterval(checkApiReadyTimer);
            }
        }
    }, 100);
    setTimeout(() => clearInterval(checkApiReadyTimer), 5000);

    // Auto-start prefetch in background idle time after DOM render
    function triggerInitialPrefetch() {
        let isReload = false;
        try {
            const navEntries = performance.getEntriesByType('navigation');
            if (navEntries && navEntries.length > 0) {
                isReload = (navEntries[0].type === 'reload');
            }
        } catch(e){}
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => SOL_CACHE.prefetch(isReload), { timeout: 1500 });
        } else {
            setTimeout(() => SOL_CACHE.prefetch(isReload), 300);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', triggerInitialPrefetch);
    } else {
        triggerInitialPrefetch();
    }


/* ========== SOLMATES UNIVERSAL AD LIFECYCLE ========== */
(function() {
    function initSolAdBanner() {
        const banners = document.querySelectorAll('.sol-ad-banner');
        if (!banners.length) return;

        banners.forEach(banner => {
            const ins = banner.querySelector('ins.adsbygoogle');
            if (!ins) return;

            if (!ins.getAttribute('data-adsbygoogle-status') && !ins.__adPushed) {
                const nextScript = ins.nextElementSibling;
                const hasInlineScript = nextScript && nextScript.tagName === 'SCRIPT' && nextScript.textContent.includes('adsbygoogle');
                if (!hasInlineScript) {
                    ins.__adPushed = true;
                    try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                    } catch(e) {}
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSolAdBanner);
    } else {
        initSolAdBanner();
    }

    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            initSolAdBanner();
        }
    });
})();

})(window);
