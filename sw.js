/**
 * SOLMATES Service Worker (v514)
 * Handles offline caching. HTML pages are network-first, assets are cache-first.
 */

const CACHE_NAME = 'solmates-cache-v542';

const STATIC_ASSETS = [
    '/notification.html',
    '/js/api-client.js',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/apple-touch-icon.png',
    '/favicon.ico'
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;
    if (event.request.url.includes("/api/")) return;

    const url = new URL(event.request.url);
    const isHTML = event.request.destination === "document"
        || url.pathname === "/"
        || url.pathname.endsWith("/index.html")
        || url.pathname.endsWith(".html")
        || url.pathname.endsWith("/");

    if (isHTML) {
        event.respondWith(
            fetch(event.request)
                .then(networkResponse => {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
                    return networkResponse;
                }).catch(() => caches.match(event.request).then(cached => cached || caches.match("/index.html").then(idx => idx || new Response("Offline", { status: 503 }))))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            return fetch(event.request).then(res => {
                if (!res || res.status !== 200 || res.type !== "basic") return res;
                const responseToCache = res.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
                return res;
            }).catch(() => new Response("", { status: 404, statusText: "Not Found" }));
        })
    );
});












