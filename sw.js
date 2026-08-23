/*
 * SOLMATES Service Worker (v115.8 - NUCLEAR REFRESH)
 * Handles background push notifications and offline caching.
 */

self.addEventListener('push', function(event) {
    if (!event.data) return;

    try {
        const data = event.data.json();
        const options = {
            body: data.body || 'New update from SOLMATES!',
            icon: data.icon || '/android-chrome-192x192.png',
            badge: data.badge || '/favicon-32x32.png',
            // v115.8: High-urgency vibration pattern for class reminders
            vibrate: [300, 100, 300, 100, 300, 100, 400],
            // v115.8: Stack by Default, but with renotify buzzer
            tag: 'solmates-alert-' + (data.type || 'msg'),
            renotify: true,
            requireInteraction: true,
            timestamp: Date.now(),
            // v115.8: Priority hint
            priority: 'high', 
            data: {
                url: data.url || '/notification'
            }
        };

        event.waitUntil(
            self.registration.showNotification(data.title || 'SOLMATES Update', options)
        );
    } catch (err) {
        console.error('Push event error:', err);
    }
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const urlToOpen = event.notification.data.url;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if (client.url.includes(urlToOpen) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});

const CACHE_NAME = 'solmates-cache-v229';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/css/global-lockdown.css',
    '/preview.png',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/favicon.ico',
    '/apple-touch-icon.png',
    '/offline.html'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Only cache GET requests and not API calls, and only cache our own origin
    const url = new URL(event.request.url);
    if (event.request.method !== 'GET' || event.request.url.includes('/api/') || url.origin !== self.location.origin) return;
    
    // Use ignoreSearch for root navigations so /?source=pwa matches /
    const matchOptions = { ignoreSearch: url.pathname === '/' };
    
    event.respondWith(
        caches.match(event.request, matchOptions).then((response) => {
            // Cache hit - return response
            if (response) {
                // Fetch in background to update cache (stale-while-revalidate)
                fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse.clone());
                        });
                    }
                }).catch(() => {});
                return response;
            }
            
            // Not in cache - fetch from network
            return fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }
                
                let responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                
                return networkResponse;
            }).catch(() => {
                // Fallback for offline if not cached
                if (event.request.mode === 'navigate' || (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'))) {
                    return caches.match('/offline.html').then(offlineRes => {
                        return offlineRes || new Response(
                            "<html><body style='background:#0f172a;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;text-align:center;'><h2>You are offline</h2><p>Please check your internet connection.</p></body></html>", 
                            { status: 503, headers: { 'Content-Type': 'text/html' } }
                        );
                    });
                }
                return new Response("Offline", { status: 503 });
            });
        })
    );
});

// [Fix] Handle push token expiration / browser key rotation in background
self.addEventListener('pushsubscriptionchange', function(event) {
    event.waitUntil(
        fetch('https://solmates-backend-w27e.onrender.com/api/notifications/unsubscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint: event.oldSubscription ? event.oldSubscription.endpoint : null })
        }).then(() => {
            return self.registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: new Uint8Array(atob('BOviwaoubgZngyc_I9usdbR37cldjChsfiwNR0e0Q9-ouTOSszKa8aeWbO_ezYM2ppwgGsHyxoRBWVRS4g0jmcw'.replace(/-/g, '+').replace(/_/g, '/')).split('').map(c => c.charCodeAt(0)))
            });
        }).then((newSubscription) => {
            return fetch('https://solmates-backend-w27e.onrender.com/api/notifications/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subscription: newSubscription,
                    // semesters omitted so backend preserves existing filter
                    source: 'sw-resync'
                })
            });
        })
    );
});




















































































































