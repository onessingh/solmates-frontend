/**
 * SOLMATES Service Worker (v917 - Instant Notification Sync & Zero Stale HTML)
 * Handles offline static caching & lets browser HTTP ETags handle API revalidation.
 */

const CACHE_NAME = 'solmates-cache-v917';

const STATIC_ASSETS = [
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/apple-touch-icon.png',
    '/favicon.ico'
];

self.addEventListener("install", event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("message", event => {
    if (event.data && (event.data.action === "skipWaiting" || event.data.type === "SKIP_WAITING")) {
        self.skipWaiting();
    }
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);

    // Bypass API calls — let browser HTTP ETag & Cloudflare handle 304 / 200 validation natively
    if (url.pathname.includes("/api/")) return;

    // Bypass ads.txt and robots.txt – always direct network fetch for web crawlers & ad verification bots
    if (url.pathname === "/ads.txt" || url.pathname.endsWith("/ads.txt") || url.pathname === "/robots.txt") return;

    const isHTML = event.request.destination === "document"
        || event.request.mode === "navigate"
        || url.pathname === "/"
        || url.pathname === "/notification"
        || url.pathname.endsWith("/notification")
        || !url.pathname.includes(".")
        || url.pathname.endsWith("/index.html")
        || url.pathname.endsWith(".html")
        || url.pathname.endsWith("/");

    if (isHTML) {
        event.respondWith(
            fetch(event.request, { cache: 'no-cache' })
                .then(networkResponse => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
                    }
                    return networkResponse;
                }).catch(() => caches.match(event.request).then(cached => cached || caches.match("/index.html").then(idx => idx || new Response("Offline", { status: 503 }))))
        );
        return;
    }

    // Critical JS & Logic Files: Network-First (always fresh, fallback to cache if offline)
    if (url.pathname.includes('/js/') || url.pathname.endsWith('.js')) {
        event.respondWith(
            fetch(event.request, { cache: 'no-cache' })
                .then(res => {
                    if (res && res.status === 200) {
                        const responseToCache = res.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
                    }
                    return res;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // Stale-While-Revalidate for CSS, fonts, images: instant load + background update
    event.respondWith(
        caches.match(event.request).then(cached => {
            const fetchPromise = fetch(event.request).then(res => {
                if (res && res.status === 200 && res.type === "basic") {
                    const responseToCache = res.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
                }
                return res;
            }).catch(() => null);

            return cached || fetchPromise || new Response("", { status: 404, statusText: "Not Found" });
        })
    );
});

// ===== PUSH NOTIFICATIONS =====
self.addEventListener("push", event => {
    let payload = {};
    try { payload = event.data ? event.data.json() : {}; } catch(e) {}
    
    const title = (payload.notification && payload.notification.title) ? payload.notification.title : (payload.title || 'SOLMATES');
    const body = (payload.notification && payload.notification.body) ? payload.notification.body : (payload.body || 'New update available!');
    
    let targetUrl = '/notification';
    if (payload.data && payload.data.url) targetUrl = payload.data.url;
    else if (payload.data && payload.data.link) targetUrl = payload.data.link;
    else if (payload.url) targetUrl = payload.url;
    else if (payload.link) targetUrl = payload.link;
    else if (payload.notification && payload.notification.click_action) targetUrl = payload.notification.click_action;
    
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
        tag: title, // Deduplicate identical notifications on device
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
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async windowClients => {
            // 1. If an exact matching window is already open, focus it
            for (const client of windowClients) {
                if (client.url === fullUrl && 'focus' in client) {
                    return client.focus();
                }
            }
            // 2. If any client window is open, navigate it to target URL and focus
            if (windowClients.length > 0) {
                const client = windowClients[0];
                try {
                    if ('navigate' in client) {
                        const navigated = await client.navigate(fullUrl);
                        if (navigated && 'focus' in navigated) return navigated.focus();
                    }
                    if ('focus' in client) return client.focus();
                } catch (e) {
                    // Fallback to openWindow if navigate failed
                }
            }
            // 3. Fallback: Open new window
            if (clients.openWindow) {
                return clients.openWindow(fullUrl);
            }
        })
    );
});

