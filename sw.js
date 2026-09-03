/**
 * SOLMATES Service Worker (v483)
 * Handles offline caching. Web Push has been removed as notifications are natively handled by Android App.
 */

const CACHE_NAME = 'solmates-cache-v511';const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/notification.html',
    '/css/styles.css',
    '/js/api-client.js',
    '/js/admin.js',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/apple-touch-icon.png',
    '/favicon.ico',
    '/favicon-32x32.png',
    '/favicon-16x16.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        // Step 1: Delete ALL old caches
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
        })
        // Step 2: Claim all clients immediately
        .then(() => self.clients.claim())
        // Step 3: Force all open windows to reload with fresh HTML from network
        .then(() => self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
        .then(clients => {
            return Promise.all(clients.map(client => {
                // Add cache-buster param so browser fetches fresh from network
                var freshUrl = client.url.split('?')[0] + '?_sw=511';
                return client.navigate(freshUrl);
            }));
        })
    );
});


self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    if (event.request.url.includes('/api/')) return;

    // HTML pages: ALWAYS fetch fresh from network (Network-First)
    // This ensures index.html is never served stale from cache
    if (event.request.destination === 'document' || event.request.url.endsWith('/') || event.request.url.endsWith('/index.html')) {
        event.respondWith(
            fetch(event.request).then(networkResponse => {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
                return networkResponse;
            }).catch(() => caches.match(event.request))
        );
        return;
    }

    // Other assets: cache-first
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) return response;
                return fetch(event.request).then(networkResponse => {
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                        return networkResponse;
                    }
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                    return networkResponse;
                }).catch(() => {
                    return caches.match('/index.html');
                });
            })
    );
});













