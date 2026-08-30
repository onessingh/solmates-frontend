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
        this._handlers = { open: [], data: [], close: [], error: [], host_disconnect: [], host_reconnect: [], host_disconnect_early: [] };
        this.open = true;
    }
    on(event, cb) { 
        this._handlers[event].push(cb); 
    }
    send(data) {
        if (!this.open) return;
        const payload = JSON.stringify(data);
        if (this.isHost) {
            if (data) {
                // Write START events directly to gameState node (fast single-node write)
                if (data.type === 'START_GAME' || data.type === 'START_ROUND' || data.type === 'START_EVENT') {
                    db.ref(`solmates-rooms/${this.roomId}/locked`).set(true);
                    const gsPayload = { type: data.type, payload: payload, ts: Date.now() };
                    db.ref(`solmates-rooms/${this.roomId}/gameState`).set(gsPayload);
                    db.ref(`solmates-rooms/${this.roomId}/status`).set({ gameStarted: true, ts: Date.now() });
                    // Store on the room's Peer instance for reconnection-retry
                    if (window._solmatesPeer) window._solmatesPeer._lastGameStartPayload = gsPayload;
                }
                // Write gameStarted status on every STATE_SYNC (bypasses slow inbox)
                if (data.type === 'STATE_SYNC' && data.gameStarted) {
                    db.ref(`solmates-rooms/${this.roomId}/status`).set({ gameStarted: true, ts: Date.now() });
                }
            }
            // Also send via inbox as primary channel
            db.ref(`solmates-rooms/${this.roomId}/clients/${this.clientId}/inbox`).push(payload);
        } else {
            db.ref(`solmates-rooms/${this.roomId}/clients/${this.clientId}/outbox`).push(payload);
        }
    }
    close() {
        if (this._closed) return;
        this._closed = true;
        this.open = false;
        if (this._cleanup) this._cleanup();
        if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
        this._handlers.close.forEach(cb => cb());
    }
}

// Overwrite the global Peer class
window.Peer = class Peer {
    constructor(id) {
        window._solmatesPeer = this;
        if (!id) {
            // Check session storage first
            let existingId = sessionStorage.getItem('solmates_guest_id');
            if (existingId) {
                id = existingId;
            } else {
                id = 'GUEST-' + Math.random().toString(36).substr(2, 8).toUpperCase();
                sessionStorage.setItem('solmates_guest_id', id);
            }
        }
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
        
        // Host Presence tracking + Reconnection-triggered GameState re-write
        const hostPresenceRef = db.ref(`solmates-rooms/${this.id}/hostDisconnectedAt`);
        db.ref('.info/connected').on('value', snap => {
            if (snap.val() === true) {
                hostPresenceRef.remove();
                hostPresenceRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
                
                // On reconnect: if game already started, re-write gameState & status
                // so guests who missed the START packet get it immediately
                if (this._lastGameStartPayload) {
                    db.ref(`solmates-rooms/${this.id}/gameState`).set({
                        type: this._lastGameStartPayload.type,
                        payload: this._lastGameStartPayload.payload,
                        ts: Date.now()
                    });
                    db.ref(`solmates-rooms/${this.id}/status`).set({ gameStarted: true, ts: Date.now() });
                }
            }
        });
        
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
                
                const clientRef = db.ref(`solmates-rooms/${this.id}/clients/${clientId}`);
                clientRef.on('value', valSnap => {
                    const val = valSnap.val();
                    if (!val) {
                        // Node fully gone (explicit removal) -> close right away.
                        // Keep the outbox listener alive regardless - if this guest ever
                        // writes again (e.g. their periodic heartbeat/JOIN resend), the game
                        // code's own JOIN handling will revive them, so we never permanently
                        // deafen ourselves to a client that might come back.
                        if (conn._graceTimer) { clearTimeout(conn._graceTimer); conn._graceTimer = null; }
                        conn._handlers.close.forEach(cb => cb());
                        return;
                    }
                    if (val.connected === false) {
                        // Guest went offline (tab backgrounded, brief network drop, etc).
                        // Give them a grace period to come back before treating them as gone,
                        // same pattern already used for host-disconnect below.
                        if (!conn._graceTimer) {
                            conn._graceTimer = setTimeout(() => {
                                clientRef.child('connected').once('value', s => {
                                    if (s.val() === false) {
                                        conn._handlers.close.forEach(cb => cb());
                                    }
                                    conn._graceTimer = null;
                                });
                            }, 15000);
                        }
                    } else if (conn._graceTimer) {
                        // Guest reconnected in time - cancel the pending close
                        clearTimeout(conn._graceTimer);
                        conn._graceTimer = null;
                    }
                });
            }, 50);
        });
        
        const prefix = this.id.startsWith('GUEST-') ? '' : 'SOLMATES-';
        this._fire('open', prefix + this.id);
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
            const isReconnect = roomData && roomData.clients && roomData.clients[clientId];
            if (!roomData || !roomData.active || (roomData.locked && !isReconnect)) {
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
            myRef.update({ connected: true, disconnectedAt: null });
            // Don't delete the node on disconnect - just flag it. A tab going to the
            // background for a few seconds (e.g. switching apps to share the invite link)
            // used to permanently drop the guest from the room. Now the host waits out a
            // grace period (see clientRef listener above) before treating them as gone.
            myRef.onDisconnect().update({ connected: false, disconnectedAt: firebase.database.ServerValue.TIMESTAMP });

            // Self-heal: whenever THIS device's own connection to Firebase comes back
            // (tab foregrounded again, network restored), proactively re-mark ourselves
            // as connected instead of waiting for the host to notice.
            db.ref('.info/connected').on('value', connSnap => {
                if (connSnap.val() === true) {
                    myRef.update({ connected: true, disconnectedAt: null });
                    myRef.onDisconnect().update({ connected: false, disconnectedAt: firebase.database.ServerValue.TIMESTAMP });
                }
            });
            
            const inboxRef = db.ref(`solmates-rooms/${hostId}/clients/${clientId}/inbox`);
            inboxRef.on('child_added', msgSnap => {
                if (msgSnap.val()) {
                    const data = JSON.parse(msgSnap.val());
                    conn._handlers.data.forEach(cb => cb(data));
                    msgSnap.ref.remove();
                }
            });
            
            // *** FALLBACK 1: Watch gameState node directly (written on START) ***
            let lastSeenGameStateTs = 0;
            const gameStateRef = db.ref(`solmates-rooms/${hostId}/gameState`);
            gameStateRef.on('value', gsSnap => {
                const gs = gsSnap.val();
                if (!gs || !gs.payload || !gs.ts) return;
                if (gs.ts <= lastSeenGameStateTs) return; // Already processed
                lastSeenGameStateTs = gs.ts;
                try {
                    const data = JSON.parse(gs.payload);
                    if (data.type === 'START_GAME' || data.type === 'START_ROUND' || data.type === 'START_EVENT') {
                        conn._handlers.data.forEach(cb => cb(data));
                    }
                } catch(e) {}
            });
            
            // *** FALLBACK 2: Watch the status node (written every STATE_SYNC when gameStarted) ***
            // This fires every 3 seconds from the host heartbeat, extremely reliable.
            const statusRef = db.ref(`solmates-rooms/${hostId}/status`);
            statusRef.on('value', stSnap => {
                const st = stSnap.val();
                if (!st || !st.gameStarted) return;
                // Read the gameState node directly and process it (bypass inbox entirely)
                db.ref(`solmates-rooms/${hostId}/gameState`).once('value', gsSnap2 => {
                    const gs2 = gsSnap2.val();
                    if (!gs2 || !gs2.payload) return;
                    if (gs2.ts <= lastSeenGameStateTs) return; // Already processed via fallback 1
                    lastSeenGameStateTs = gs2.ts;
                    try {
                        const data = JSON.parse(gs2.payload);
                        if (data.type === 'START_GAME' || data.type === 'START_ROUND' || data.type === 'START_EVENT') {
                            conn._handlers.data.forEach(cb => cb(data));
                        }
                    } catch(e) {}
                });
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
                        if (!conn.open) return;
                        const now = Date.now() + serverTimeOffset;
                        if (now - disconnectTime > 300000) {
                            conn._handlers.close.forEach(cb => cb());
                            inboxRef.off();
                            db.ref(`solmates-rooms/${hostId}/hostDisconnectedAt`).off();
                        } else if (now - disconnectTime > 28000) {
                            if (conn._handlers.host_disconnect && conn._handlers.host_disconnect.length > 0) {
                                conn._handlers.host_disconnect.forEach(cb => cb());
                            }
                            if (conn._handlers.host_disconnect_early && conn._handlers.host_disconnect_early.length > 0) {
                                conn._handlers.host_disconnect_early.forEach(cb => cb());
                            }
                            disconnectTimeoutId = setTimeout(checkTimeout, 2000);
                        } else if (now - disconnectTime > 10000) {
                            if (conn._handlers.host_disconnect_early && conn._handlers.host_disconnect_early.length > 0) {
                                conn._handlers.host_disconnect_early.forEach(cb => cb());
                            }
                            disconnectTimeoutId = setTimeout(checkTimeout, 2000);
                        } else {
                            disconnectTimeoutId = setTimeout(checkTimeout, 2000);
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
            
            conn._cleanup = () => {
                inboxRef.off();
                gameStateRef.off();
                statusRef.off();
                db.ref(`solmates-rooms/${hostId}/active`).off();
                db.ref(`solmates-rooms/${hostId}/hostDisconnectedAt`).off();
                if (disconnectTimeoutId) clearTimeout(disconnectTimeoutId);
            };
            
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











