/**
 * SOLMATES Service Worker (v717)
 * Handles offline caching. HTML pages are network-first, assets are cache-first.
 */

const CACHE_NAME = 'solmates-cache-v717';

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

// ===== PUSH =====
self.addEventListener("push", event => {
    let payload = {};
    try { payload = event.data ? event.data.json() : {}; } catch(e) {}
    
    // Handle both FCM nested structure and flat structure
    const title = (payload.notification && payload.notification.title) ? payload.notification.title : (payload.title || 'SOLMATES');
    const body = (payload.notification && payload.notification.body) ? payload.notification.body : (payload.body || 'New update available!');
    
    // Extract URL from various possible payload formats
    let targetUrl = '/notification';
    if (payload.data && payload.data.url) targetUrl = payload.data.url;
    else if (payload.data && payload.data.link) targetUrl = payload.data.link;
    else if (payload.url) targetUrl = payload.url;
    else if (payload.link) targetUrl = payload.link;
    else if (payload.notification && payload.notification.click_action) targetUrl = payload.notification.click_action;
    
    
    // Smart Routing: Auto-detect the category from the notification title or body
    if (targetUrl === '/notification' || targetUrl === '/') {
        const textToSearch = (title + " " + body).toLowerCase();
        if (textToSearch.includes('pyq') || textToSearch.includes('previous year') || textToSearch.includes('question paper')) {
            targetUrl = '/database/pyqs';
        } else if (textToSearch.includes('one shot') || textToSearch.includes('oneshot')) {
            targetUrl = '/database/oneshot';
        } else if (textToSearch.includes('note')) {
            targetUrl = '/database/notes';
        } else if (textToSearch.includes('live class') || textToSearch.includes('live session')) {
            targetUrl = '/database/classes';
        } else if (textToSearch.includes('recorded')) {
            targetUrl = '/database/view?category=recorded-class';
        } else if (textToSearch.includes('e-book') || textToSearch.includes('ebook') || textToSearch.includes('e book')) {
            targetUrl = '/database/view?category=elearning';
        } else if (textToSearch.includes('youtube') || textToSearch.includes('video')) {
            targetUrl = '/database/youtube-browse';
        }
    }
    
    const options = {
        body: body,
        icon: payload.icon || (payload.notification && payload.notification.icon) || '/android-chrome-192x192.png',
        badge: payload.badge || '/favicon-32x32.png',
        data: { url: targetUrl },
        vibrate: [200, 100, 200],
        requireInteraction: false
    };
    event.waitUntil(self.registration.showNotification(title, options));
});



// ===== NOTIFICATIONCLICK =====
self.addEventListener("notificationclick", event => {
    event.notification.close();
    const targetUrl = (event.notification.data && event.notification.data.url) ? event.notification.data.url : '/notification';
    const fullUrl = new URL(targetUrl, self.location.origin).href;
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            for (const client of windowClients) {
                if (client.url === fullUrl && 'focus' in client) return client.focus();
            }
            if (windowClients.length > 0 && 'navigate' in windowClients[0]) return windowClients[0].focus().then(c => c.navigate(fullUrl));
            if (clients.openWindow) return clients.openWindow(fullUrl);
        })
    );
});

