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
        if (!data || !data.success || !window.solmatesAPI || !window.solmatesAPI.setCache) return false;
        if (window._sol_bulk_applied_data === data) return true; // Already applied

        // 1. Sync Categories Data
        if (data.categories) {
            for (const [cat, items] of Object.entries(data.categories)) {
                const groups = {}; // key: `sem_folderId`
                items.forEach(item => {
                    const sem = String(item.semester);
                    const fid = item.folderId || 'root';
                    const gkey = `${sem}__${fid}`;
                    if (!groups[gkey]) groups[gkey] = [];
                    groups[gkey].push(item);
                });

                for (const [gkey, bucket] of Object.entries(groups)) {
                    const sepIdx = gkey.indexOf('__');
                    const sem = gkey.substring(0, sepIdx);
                    const fid = gkey.substring(sepIdx + 2);
                    const ckey = `content_${cat}_${sem}_${fid}`;
                    window.solmatesAPI.setCache(ckey, {
                        success: true,
                        data: bucket,
                        _bulk: true
                    });
                }
            }
        }

        // 2. Sync Folders Data
        if (data.folders && Array.isArray(data.folders)) {
            const folderGroups = {}; // category_semester_parentId
            data.folders.forEach(f => {
                const key = `${f.category}_${f.semester}_${f.parentId || 'root'}`;
                if (!folderGroups[key]) folderGroups[key] = [];
                folderGroups[key].push(f);
            });

            for (const [key, fList] of Object.entries(folderGroups)) {
                window.solmatesAPI.setCache(`folders_${key}`, { success: true, data: fList, _bulk: true });
            }
        }

        window._sol_bulk_applied_data = data;
        return true;
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

    // Automatic Purge of Old Cache Snapshots (v852)
    const SNAPSHOT_CACHE_VER = 'v852_auto_update';
    if (localStorage.getItem('_sol_snapshot_ver') !== SNAPSHOT_CACHE_VER) {
        localStorage.removeItem('_sol_all_content_data');
        localStorage.removeItem('_sol_all_content_etag');
        localStorage.removeItem('_sol_last_fetch_timestamp');
        localStorage.removeItem('solcache_live_classes');
        try {
            Object.keys(sessionStorage).forEach(k => {
                if (k.startsWith('solcache_')) sessionStorage.removeItem(k);
            });
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
                                (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:3000/api' : '/api'));

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

})(window);

