// Firebase Multiplayer Engine (Replaces PeerJS)
// This file mocks the exact PeerJS API but routes all traffic through Firebase Realtime Database
// for 100% background resilience on mobile devices.

if (!window.firebase || !window.firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyADjPzCQRGyCrrwzBfsJFw-5PvwXc7ZcCA",
      authDomain: "game-522db.firebaseapp.com",
      databaseURL: "https://game-522db-default-rtdb.firebaseio.com",
      projectId: "game-522db",
      storageBucket: "game-522db.firebasestorage.app",
      messagingSenderId: "1021112556617",
      appId: "1:1021112556617:web:318a4e836cf3a4aeb4f398"
    });
}
const db = firebase.database();
let serverTimeOffset = 0;
db.ref('.info/serverTimeOffset').on('value', snap => {
    serverTimeOffset = snap.val() || 0;
});

class PeerConnection {
    constructor(isHost, roomId, clientId) {
        this.isHost = isHost;
        this.roomId = roomId;
        this.clientId = clientId;
        this.peer = clientId; // To match conn.peer in game logic
        this._handlers = { open: [], data: [], close: [], error: [] };
        this.open = true;
    }
    on(event, cb) { 
        this._handlers[event].push(cb); 
    }
    send(data) {
        if (!this.open) return;
        const payload = JSON.stringify(data);
        if (this.isHost) {
            // Auto-lock room when game starts to prevent late joiners
            if (data && data.type === 'START_GAME') {
                db.ref(`solmates-rooms/${this.roomId}/locked`).set(true);
            }
            db.ref(`solmates-rooms/${this.roomId}/clients/${this.clientId}/inbox`).push(payload);
        } else {
            db.ref(`solmates-rooms/${this.roomId}/clients/${this.clientId}/outbox`).push(payload);
        }
    }
    close() {
        this.open = false;
        if (!this.isHost) {
            db.ref(`solmates-rooms/${this.roomId}/clients/${this.clientId}`).remove();
        }
        this._handlers.close.forEach(cb => cb());
    }
}

// Overwrite the global Peer class
window.Peer = class Peer {
    constructor(id) {
        if (!id) id = 'GUEST-' + Math.random().toString(36).substr(2, 8).toUpperCase();
        this.id = id.replace('SOLMATES-', ''); // Keep it clean in DB
        this.disconnected = false;
        this.destroyed = false;
        this._handlers = { open: [], connection: [], error: [], disconnected: [], close: [] };
        
        setTimeout(() => {
            this._initHost();
        }, 50);
    }
    
    async _initHost() {
        // Mark room as active, DO NOT remove on disconnect so it survives backgrounding
        await db.ref(`solmates-rooms/${this.id}/active`).set(true);
        await db.ref(`solmates-rooms/${this.id}/timestamp`).set(firebase.database.ServerValue.TIMESTAMP);
        
        // Host Presence tracking
        const hostPresenceRef = db.ref(`solmates-rooms/${this.id}/hostDisconnectedAt`);
        hostPresenceRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
        hostPresenceRef.remove(); // Clear on connect/reconnect
        
        this.clientRefs = db.ref(`solmates-rooms/${this.id}/clients`);
        this.clientRefs.on('child_added', snap => {
            const clientId = snap.key;
            const conn = new PeerConnection(true, this.id, clientId);
            
            // Fire 'connection' FIRST so the game can synchronously attach .on('data') handlers
            this._fire('connection', conn);
            
            setTimeout(() => {
                conn._handlers.open.forEach(cb => cb());
                
                // NOW listen to outbox, so if there are queued messages (like JOIN),
                // they are sent to the newly attached handlers.
                const outboxRef = db.ref(`solmates-rooms/${this.id}/clients/${clientId}/outbox`);
                outboxRef.on('child_added', msgSnap => {
                    if (msgSnap.val()) {
                        const data = JSON.parse(msgSnap.val());
                        conn._handlers.data.forEach(cb => cb(data));
                        msgSnap.ref.remove(); // Cleanup
                    }
                });
                
                db.ref(`solmates-rooms/${this.id}/clients/${clientId}`).on('value', valSnap => {
                    if (!valSnap.exists()) {
                        conn._handlers.close.forEach(cb => cb());
                        outboxRef.off();
                    }
                });
            }, 50);
        });
        
        this._fire('open', 'SOLMATES-' + this.id);
    }
    
    connect(hostIdRaw) {
        const hostId = hostIdRaw.replace('SOLMATES-', '');
        
        // Session Recovery: Re-use ID if they refresh the tab
        let clientId = sessionStorage.getItem('solmates_guest_id');
        if (!clientId) {
            clientId = 'GUEST-' + Math.random().toString(36).substr(2, 8).toUpperCase();
            sessionStorage.setItem('solmates_guest_id', clientId);
        }
        
        const conn = new PeerConnection(false, hostId, clientId);
        
        db.ref(`solmates-rooms/${hostId}`).once('value', snap => {
            const roomData = snap.val();
            if (!roomData || !roomData.active || roomData.locked) {
                this._fire('error', { type: 'peer-unavailable' });
                return;
            }
            
            // Check if host has been disconnected for more than 2 minutes (120000ms)
            if (roomData.hostDisconnectedAt) {
                const now = Date.now() + serverTimeOffset;
                if (now - roomData.hostDisconnectedAt > 120000) {
                    // Room is dead, clean it up and reject
                    db.ref(`solmates-rooms/${hostId}`).remove();
                    this._fire('error', { type: 'peer-unavailable' });
                    return;
                }
            }
            
            const myRef = db.ref(`solmates-rooms/${hostId}/clients/${clientId}`);
            myRef.set({ connected: true });
            myRef.onDisconnect().remove(); 
            
            const inboxRef = db.ref(`solmates-rooms/${hostId}/clients/${clientId}/inbox`);
            inboxRef.on('child_added', msgSnap => {
                if (msgSnap.val()) {
                    const data = JSON.parse(msgSnap.val());
                    conn._handlers.data.forEach(cb => cb(data));
                    msgSnap.ref.remove();
                }
            });
            
            // Watch if room gets destroyed
            db.ref(`solmates-rooms/${hostId}/active`).on('value', snap => {
                if (!snap.exists()) {
                    conn._handlers.close.forEach(cb => cb());
                    inboxRef.off();
                }
            });
            
            // Watch if host disconnected and doesn't come back
            let disconnectTimeoutId = null;
            db.ref(`solmates-rooms/${hostId}/hostDisconnectedAt`).on('value', snap => {
                const disconnectTime = snap.val();
                if (disconnectTime) {
                    // [Fix] Removed Game Paused UI overlay as per request
                    let el = document.getElementById('sol-host-reconnect');
                    if (el) el.style.display = 'none';
                    const checkTimeout = () => {
                        const now = Date.now() + serverTimeOffset;
                        if (now - disconnectTime > 120000) {
                            conn._handlers.close.forEach(cb => cb());
                            inboxRef.off();
                            db.ref(`solmates-rooms/${hostId}/hostDisconnectedAt`).off();
                        } else {
                            disconnectTimeoutId = setTimeout(checkTimeout, 10000);
                        }
                    };
                    checkTimeout();
                } else {
                    // Hide paused UI if host reconnects
                    let el = document.getElementById('sol-host-reconnect');
                    if (el) el.style.display = 'none';

                    if (disconnectTimeoutId) {
                        clearTimeout(disconnectTimeoutId);
                        disconnectTimeoutId = null;
                    }
                }
            });
            
            setTimeout(() => {
                conn._handlers.open.forEach(cb => cb());
            }, 50);
        });
        
        return conn;
    }
    
    on(event, cb) {
        if (this._handlers[event]) {
            this._handlers[event].push(cb);
        }
    }
    
    _fire(event, data) {
        if (this._handlers[event]) {
            this._handlers[event].forEach(cb => cb(data));
        }
    }
    
    disconnect() { this.disconnected = true; }
    reconnect() { this.disconnected = false; }
    destroy() { 
        this.destroyed = true;
        db.ref(`solmates-rooms/${this.id}`).remove();
    }
};
