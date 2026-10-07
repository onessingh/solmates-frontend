/**
 * SOLMATES - Frontend Cache & Prefetcher (v116.7 - ETag & LocalStorage 0-Bandwidth Optimized)
 * ──────────────────────────────────────────────────────────────────────────────────────
 * • Speeds up navigation by storing data in memory and localStorage
 * • Uses HTTP 304 (If-None-Match ETag) to reduce Render backend bandwidth to 0 bytes
 * • Auto-warms session cache instantaneously on page load
 */

(function (window) {
    'use strict';

    /* ========== TOTAL CONSOLE BLACKOUT (v83.7 - Production Only) ========== */
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
    function populateMemoryCache(data) {
        if (!data || !data.success || !window.solmatesAPI || !window.solmatesAPI.setCache) return;

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
                const ckey = `folders_${key}`;
                window.solmatesAPI.setCache(ckey, {
                    success: true,
                    data: fList,
                    _bulk: true
                });
            }
        }
    }

    // Instant Warm Up from LocalStorage on Script Load
    try {
        const localCachedStr = localStorage.getItem('_sol_all_content_data');
        if (localCachedStr) {
            const parsed = JSON.parse(localCachedStr);
            populateMemoryCache(parsed);
        }
    } catch (e) {
        localStorage.removeItem('_sol_all_content_data');
        localStorage.removeItem('_sol_all_content_etag');
    }

    const SOL_CACHE = {
        /**
         * Get data from cache
         */
        get: (type, category, semester) => {
            const key = `${category}_${semester}`;
            return window[CACHE_NAME][type] ? window[CACHE_NAME][type][key] : null;
        },

        /**
         * Set data in cache
         */
        set: (type, category, semester, data) => {
            const key = `${category}_${semester}`;
            if (!window[CACHE_NAME][type]) window[CACHE_NAME][type] = {};
            window[CACHE_NAME][type][key] = data;
        },

        /**
         * Clear cache for a specific category/semester (or all)
         */
        clear: (category, semester) => {
            if (category && semester) {
                const key = `${category}_${semester}`;
                if (window[CACHE_NAME].folders[key]) delete window[CACHE_NAME].folders[key];
                if (window[CACHE_NAME].content[key]) delete window[CACHE_NAME].content[key];
            } else {
                window[CACHE_NAME].folders = {};
                window[CACHE_NAME].content = {};
            }
            localStorage.removeItem('_sol_all_content_data');
            localStorage.removeItem('_sol_all_content_etag');
        },

        /**
         * Background Prefetcher with ETag (HTTP 304) Support
         */
        prefetch: async () => {
            console.log('🚀 SOL Background Prefetcher starting (ETag Enabled)...');

            try {
                const apiBase = window.PRODUCTION_API_URL || 
                                (window.SOL && window.SOL.getApiBase ? window.SOL.getApiBase() : 
                                (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:3000/api' : '/api'));

                const startTime = Date.now();
                const headers = {};
                const cachedEtag = localStorage.getItem('_sol_all_content_etag');
                if (cachedEtag) {
                    headers['If-None-Match'] = cachedEtag;
                }

                const res = await fetch(`${apiBase}/sol/all-content`, { headers });

                if (res.status === 304) {
                    console.log(`✅ SOL Content Not Modified (HTTP 304). 0 Bytes transferred! Cache valid.`);
                    return;
                }

                if (res.ok) {
                    const etag = res.headers.get('ETag');
                    if (etag) localStorage.setItem('_sol_all_content_etag', etag);

                    const data = await res.json();
                    if (data && data.success) {
                        try {
                            localStorage.setItem('_sol_all_content_data', JSON.stringify(data));
                        } catch (e) { /* Storage full fallback */ }

                        populateMemoryCache(data);
                        console.log(`✅ SOL Bulk Sync complete in ${Date.now() - startTime}ms. Data updated.`);
                    }
                }
            } catch (e) {
                console.error('❌ SOL Bulk Sync error:', e.message);
            }
        }
    };

    window.SOL_CACHE = SOL_CACHE;

    // Auto-start prefetch after initial page load settles (3 second delay)
    if (document.readyState === 'complete') {
        setTimeout(SOL_CACHE.prefetch, 3000);
    } else {
        window.addEventListener('load', () => setTimeout(SOL_CACHE.prefetch, 3000));
    }

})(window);
