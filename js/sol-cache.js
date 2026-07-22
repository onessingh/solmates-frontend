/**
 * SOLMATES - Frontend Cache & Prefetcher
 * ──────────────────────────────────────
 * • Speeds up navigation by storing data in memory
 * • Prefetches all semesters in the background after page load
 * • Zero-risk to database (Frontend only)
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
        },

        /**
         * Background Prefetcher
         * Quietly loads other semesters so clicks feel instant
         */
        prefetch: async () => {
            console.log('🚀 SOL Background Prefetcher starting (Bulk Sync)...');

            try {
                // Prioritize global PRODUCTION_API_URL
                const apiBase = window.PRODUCTION_API_URL || 
                                (window.SOL && window.SOL.getApiBase ? window.SOL.getApiBase() : 
                                (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:3000/api' : '/api'));

                // Use the bulk endpoint to get all data in one go
                const startTime = Date.now();
                const res = await fetch(`${apiBase}/sol/all-content`);

                if (res.ok) {
                    const data = await res.json();

                    if (data.success && data.categories && window.solmatesAPI && window.solmatesAPI.setCache) {
                        // 1. Sync Categories Data
                        for (const [cat, items] of Object.entries(data.categories)) {
                            // Group items by semester
                            const semGroups = {};
                            items.forEach(item => {
                                const sem = String(item.semester);
                                if (!semGroups[sem]) semGroups[sem] = [];
                                semGroups[sem].push(item);
                            });

                            // Synchronize with API Client's sessionStorage cache
                            for (const [sem, semItems] of Object.entries(semGroups)) {
                                const ckey = `content_${cat}_${sem}_root`;
                                // Only set if not already present or if we want to refresh
                                window.solmatesAPI.setCache(ckey, {
                                    success: true,
                                    data: semItems,
                                    _bulk: true // Marker for debugging
                                });
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

                        console.log(`✅ SOL Bulk Sync complete in ${Date.now() - startTime}ms. Sessions warmed up!`);
                    }
                }
            } catch (e) {
                console.error('❌ SOL Bulk Sync error:', e.message);
            }
        }
    };

    window.SOL_CACHE = SOL_CACHE;

    // Auto-start prefetch after initial page load settles (5 second delay to avoid rate limits)
    if (document.readyState === 'complete') {
        setTimeout(SOL_CACHE.prefetch, 5000);
    } else {
        window.addEventListener('load', () => setTimeout(SOL_CACHE.prefetch, 5000));
    }

})(window);
