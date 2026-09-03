/**
 * SOLMATES Service Worker (v512)
 * HTML always network-first + theme-color #0f172a forcefully injected via setAttribute override.
 */

const CACHE_NAME = 'solmates-cache-v513';

const STATIC_ASSETS = [
    '/notification.html',
    '/js/api-client.js',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/apple-touch-icon.png',
    '/favicon.ico'
];

// This script is injected into EVERY HTML page by the SW.
// It overrides Element.prototype.setAttribute so OLD code can NEVER set theme-color to #ffffff.
const THEME_FIX = '<script>(function(){function f(){var m=document.getElementById("theme-color-meta");if(m&&m.getAttribute("content")!=="#0f172a")m.setAttribute("content","#0f172a");}f();var o=Element.prototype.setAttribute;Element.prototype.setAttribute=function(n,v){if(n==="content"&&this.id==="theme-color-meta")return o.call(this,n,"#0f172a");return o.call(this,n,v);};setInterval(f,300);})()+<'+'/script>';

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
        || url.pathname.endsWith(".html");

    if (isHTML) {
        event.respondWith(
            fetch(event.request, { cache: "reload" })
                .then(res => res.text().then(html => {
                    html = html.replace("<head>", "<head>" + THEME_FIX);
                    return new Response(html, {
                        status: res.status,
                        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }
                    });
                }))
                .catch(() => caches.match("/index.html")
                    .then(cached => cached || new Response("Offline", { status: 503 })))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            return fetch(event.request).then(res => {
                if (!res || res.status !== 200 || res.type !== "basic") return res;
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, res.clone()));
                return res;
            }).catch(() => caches.match("/index.html"));
        })
    );
});

