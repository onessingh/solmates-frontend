/*
 * SOLMATES Service Worker (v113.4 - NUCLEAR REFRESH)
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
            // v105.1: High-urgency vibration pattern for class reminders
            vibrate: [300, 100, 300, 100, 300, 100, 400],
            // v83.37: Stack by Default, but with renotify buzzer
            tag: 'solmates-alert-' + (data.type || 'msg'),
            renotify: true,
            requireInteraction: true,
            timestamp: Date.now(),
            // v105.1: Priority hint
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

// Basic lifecycle events
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
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

