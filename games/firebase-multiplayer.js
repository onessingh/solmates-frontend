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

// GLOBAL RECONNECT NUDGES:
// When the tab returns from background or the device regains internet,
// tell Firebase SDK to (re)establish its connection immediately.
// This prevents false "offline" caused by mobile browser timer throttling.
if (!window._solmatesGlobalListenersAdded) {
    window._solmatesGlobalListenersAdded = true;
    
    const forceReconnect = () => {
        // Forcefully kill any zombie WebSocket and reconnect
        db.goOffline();
        db.goOnline();
        
        // If we are the host, forcefully clear the disconnect flag
        // The SDK might not trigger .info/connected if it was in a zombie state
        if (window._solmatesHostId) {
            const hostPresenceRef = db.ref(`solmates-rooms/${window._solmatesHostId}/hostDisconnectedAt`);
            hostPresenceRef.remove();
            hostPresenceRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
        }
    };

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') forceReconnect();
    });
    window.addEventListener('online', forceReconnect);
}


class PeerConnection {
    constructor(isHost, roomId, clientId) {
        this.isHost = isHost;
        this.roomId = roomId;
        this.clientId = clientId;
        this.peer = clientId; // To match conn.peer in game logic
        this._handlers = { open: [], data: [], close: [], error: [], host_disconnect: [], host_reconnect: [], host_disconnect_early: [] };
        this._dataQueue = [];
        this.open = true;
    }
    on(event, cb) { 
        this._handlers[event].push(cb); 
        // Flush queue if data listener is added
        if (event === 'data' && this._dataQueue.length > 0) {
            this._dataQueue.forEach(d => cb(d));
            this._dataQueue = [];
        }
    }
    _emitData(data) {
        this.open = true;
        this.disconnected = false;
        
        if (this._handlers.data.length === 0) {
            this._dataQueue.push(data);
        } else {
            this._handlers.data.forEach(cb => cb(data));
        }
    }
    send(data) {
        if (!this.open) return;
        const payload = JSON.stringify(data);
        if (this.isHost) {
            if (data) {
                // Write START events directly to gameState node (fast single-node write)
                if (data.type === 'START_GAME' || data.type === 'START_ROUND' || data.type === 'START_EVENT' || data.type === 'SYNC_PREPARE') {
                    db.ref(`solmates-rooms/${this.roomId}/locked`).set(true);
                    const gsPayload = { type: data.type, payload: payload, ts: Date.now() };
                    db.ref(`solmates-rooms/${this.roomId}/gameState`).set(gsPayload);
                    db.ref(`solmates-rooms/${this.roomId}/status`).set({ gameStarted: true, ts: Date.now() });
                    // Store on the room's Peer instance for reconnection-retry
                    if (window._solmatesPeer) window._solmatesPeer._lastGameStartPayload = gsPayload;
                    
                    // For SYNC_PREPARE: also write a dedicated syncPrepare node
                    // Guests poll this every 2s and keep retrying SYNC_READY until game starts
                    if (data.type === 'SYNC_PREPARE') {
                        db.ref(`solmates-rooms/${this.roomId}/syncPrepare`).set({ payload: payload, ts: Date.now() });
                    }
                    // Clear syncPrepare when actual START_GAME is sent (stops guest retry loops)
                    if (data.type === 'START_GAME') {
                        db.ref(`solmates-rooms/${this.roomId}/syncPrepare`).remove();
                    }
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
        if (id && id.startsWith('SOLMATES-')) { window._solmatesHostId = this.id; }
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
                this._fire('network_state', { online: true });
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
            } else {
                this._fire('network_state', { online: false });
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
                        conn._emitData(data);
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
                    if (data.type === 'START_GAME') conn._syncStarted = true;
                    conn._emitData(data);
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
                    if (data.type === 'START_GAME' || data.type === 'START_ROUND' || data.type === 'START_EVENT' || data.type === 'SYNC_PREPARE') {
                        if (data.type === 'START_GAME') conn._syncStarted = true;
                        conn._emitData(data);
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
                        if (data.type === 'START_GAME' || data.type === 'START_ROUND' || data.type === 'START_EVENT' || data.type === 'SYNC_PREPARE') {
                            conn._emitData(data);
                        }
                    } catch(e) {}
                });
            });
            

            // *** FALLBACK 3: Watch dedicated syncPrepare node ***
            // This is the most reliable delivery - it's a persistent node, not a queue message.
            // Guest watches it and keeps re-sending SYNC_READY every 2s until game truly starts.
            let syncPrepareHandled = false;
            const syncPrepareRef = db.ref(`solmates-rooms/${hostId}/syncPrepare`);
            syncPrepareRef.on('value', spSnap => {
                const sp = spSnap.val();
                if (!sp || !sp.payload || syncPrepareHandled) return;
                try {
                    const data = JSON.parse(sp.payload);
                    if (data.type === 'SYNC_PREPARE') {
                        conn._emitData(data);
                    }
                } catch(e) {}
            });
            
            // Retry SYNC_READY every 2s in case our outgoing message to host was lost
            const syncRetryInterval = setInterval(() => {
                // If game has started, stop retrying
                if (conn._syncStarted) { clearInterval(syncRetryInterval); syncPrepareHandled = true; return; }
                // If syncPrepare node exists and we haven't gotten START_GAME yet, resend SYNC_READY
                syncPrepareRef.once('value', spSnap => {
                    const sp = spSnap.val();
                    if (sp && sp.payload && !conn._syncStarted) {
                        try {
                            const data = JSON.parse(sp.payload);
                            if (data.type === 'SYNC_PREPARE') {
                                // Re-deliver locally (idempotent since game checks gameStarted flag)
                                conn._emitData(data);
                            }
                        } catch(e) {}
                    }
                });
            }, 2000);
            
            conn._syncRetryInterval = syncRetryInterval;

            // The 'active' node watcher used to be here, but it prematurely killed 
            // the connection on brief host drops. We now rely exclusively on the 
            // hostDisconnectedAt grace period logic below.
            
            // Watch if host disconnected and doesn't come back.
            //
            // KEY FIX: We NO LONGER use a recursive setTimeout polling loop as the primary
            // source of truth for offline detection.
            //
            // OLD (broken) flow:
            //   hostDisconnectedAt set → checkTimeout() → setTimeout(checkTimeout, 2000) → ...
            //   ↳ Background tab: timer paused → stale elapsed time → false "Host offline"
            //
            // NEW (correct) flow:
            //   hostDisconnectedAt set → evalHostDisconnect(serverTimestamp) → ONE scheduled check
            //   ↳ Tab returns to foreground → visibilitychange → Firebase re-read → recalculate
            //
            let disconnectTimers = [];
            const clearDisconnectTimers = () => {
                disconnectTimers.forEach(t => clearTimeout(t));
                disconnectTimers = [];
            };
            let currentDisconnectTime = null;

            const evalHostDisconnect = (disconnectTime) => {
                if (!disconnectTime || !conn.open) return;
                // Use serverTimeOffset so our clock matches Firebase server clock
                const now = Date.now() + serverTimeOffset;
                const elapsed = now - disconnectTime;

                if (elapsed > 300000) {
                    // >5 min: genuinely abandoned room
                    conn._handlers.close.forEach(cb => cb());
                    inboxRef.off();
                    hostDisconnectedRef.off();
                    return;
                }
                if (elapsed > 28000) {
                    // >28s: Firebase has confirmed the host has been offline for a substantial
                    // time — safe to trigger migration/offline UI
                    if (conn._handlers.host_disconnect) conn._handlers.host_disconnect.forEach(cb => cb());
                    if (conn._handlers.host_disconnect_early) conn._handlers.host_disconnect_early.forEach(cb => cb());
                    // Schedule ONE check at the 5-minute deadline, not a tight 2s polling loop
                    const nextCheck = Math.max(300000 - elapsed, 10000);
                    disconnectTimers.push(setTimeout(() => evalHostDisconnect(disconnectTime), nextCheck));
                } else if (elapsed > 10000) {
                    // >10s: early warning — still within normal reconnect window
                    if (conn._handlers.host_disconnect_early) conn._handlers.host_disconnect_early.forEach(cb => cb());
                    // Schedule ONE check at the 28s threshold
                    const nextCheck = Math.max(28000 - elapsed, 2000);
                    disconnectTimers.push(setTimeout(() => evalHostDisconnect(disconnectTime), nextCheck));
                } else {
                    // <10s: normal transient drop — schedule check at 10s threshold
                    const nextCheck = Math.max(10000 - elapsed, 1000);
                    disconnectTimers.push(setTimeout(() => evalHostDisconnect(disconnectTime), nextCheck));
                }
            };

            const hostDisconnectedRef = db.ref(`solmates-rooms/${hostId}/hostDisconnectedAt`);
            hostDisconnectedRef.on('value', snap => {
                const disconnectTime = snap.val();
                currentDisconnectTime = disconnectTime;
                clearDisconnectTimers();
                if (disconnectTime) {
                    // Firebase server confirmed host dropped — evaluate elapsed time
                    evalHostDisconnect(disconnectTime);
                } else {
                    // hostDisconnectedAt was cleared → host reconnected
                    let el = document.getElementById('sol-host-reconnect');
                    if (el) el.style.display = 'none';
                    if (conn._handlers.host_reconnect) conn._handlers.host_reconnect.forEach(cb => cb());
                }
            });

            // FOREGROUND RECOVERY:
            // When the tab returns from background (e.g. after sharing via WhatsApp), any local
            // setTimeout timers may have been paused or throttled by the mobile browser.
            // Instead of trusting those timers, we re-read hostDisconnectedAt directly from Firebase
            // to get the true current server state and recalculate elapsed time accurately.
            const guestVisibilityHandler = () => {
                if (document.visibilityState !== 'visible') return;
                // Nudge Firebase SDK to (re)connect immediately
                db.goOnline();
                if (!conn.open) return;
                hostDisconnectedRef.once('value', freshSnap => {
                    const freshTime = freshSnap.val();
                    if (freshTime !== currentDisconnectTime || (freshTime && conn.open)) {
                        // State changed while backgrounded, or timers may have drifted — recalculate
                        currentDisconnectTime = freshTime;
                        clearDisconnectTimers();
                        if (freshTime) {
                            evalHostDisconnect(freshTime);
                        } else {
                            // Host came back while we were in background — clear any error UI
                            let el = document.getElementById('sol-host-reconnect');
                            if (el) el.style.display = 'none';
                        }
                    }
                });
            };
            document.addEventListener('visibilitychange', guestVisibilityHandler);

            conn._cleanup = () => {
                inboxRef.off();
                gameStateRef.off();
                statusRef.off();
                hostDisconnectedRef.off();
                db.ref(`solmates-rooms/${hostId}/active`).off();
                document.removeEventListener('visibilitychange', guestVisibilityHandler);
                clearDisconnectTimers();
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

window.SolmatesSync = {
    show: function(msg) {
        let reconnectEl = document.getElementById('sol-host-reconnect');
        if (reconnectEl) reconnectEl.style.display = 'none';
        
        let el = document.getElementById('sol-sync-overlay');
        if (!el) {
            el = document.createElement('div');
            el.id = 'sol-sync-overlay';
            el.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(255,255,255,0.95);z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Inter,sans-serif;';
            document.body.appendChild(el);
        }
        el.style.display = 'flex';
        el.innerHTML = `
            <div style="width:60px;height:60px;border:5px solid #e2e8f0;border-top-color:#0ea5e9;border-radius:50%;animation:sol-spin 1s linear infinite;"></div>
            <h2 style="margin-top:24px;font-size:24px;font-weight:700;color:#0f172a;text-align:center;">Starting Game</h2>
            <p id="sol-sync-text" style="margin-top:12px;font-size:16px;color:#64748b;text-align:center;">${msg}</p>
            <style>@keyframes sol-spin { 100% { transform: rotate(360deg); } }</style>
        `;
    },
    update: function(msg) {
        let p = document.getElementById('sol-sync-text');
        if (p) p.textContent = msg;
    },
    hide: function() {
        let el = document.getElementById('sol-sync-overlay');
        if (el) el.style.display = 'none';
    }
};

// Shared host connection status UI — used by all 5 games.
// Two-stage: first "Reconnecting..." (orange, 10s), then "Host offline" (red, 28s).
// Both stages are ONLY shown when Firebase server timestamp confirms the disconnect duration.
// JS timers are NOT used as the primary authority — see firebase-multiplayer.js evalHostDisconnect.
window.SolmatesHostStatus = {
    _getOrCreate: function() {
        let el = document.getElementById('sol-host-reconnect');
        if (!el) {
            el = document.createElement('div');
            el.id = 'sol-host-reconnect';
            el.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:white;color:black;padding:16px 24px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.18);display:flex;flex-direction:column;align-items:center;z-index:9999;font-family:Inter,sans-serif;min-width:260px;text-align:center;';
            document.body.appendChild(el);
        }
        return el;
    },
    // Stage 1: shown at host_disconnect_early (~10s after Firebase confirms disconnect)
    showReconnecting: function() {
        const el = this._getOrCreate();
        el.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                <div style="width:10px;height:10px;background:#f59e0b;border-radius:50%;animation:sol-pulse 1.2s ease-in-out infinite;"></div>
                <span style="font-size:16px;font-weight:700;color:#92400e;">Host reconnecting...</span>
            </div>
            <p style="margin:0;font-size:13px;color:#78716c;">Connection temporarily lost. Waiting for host to return.</p>
            <style>@keyframes sol-pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }</style>
        `;
        el.style.display = 'flex';
    },
    // Stage 2: shown at host_disconnect (~28s after Firebase confirms disconnect)
    showOffline: function() {
        const el = this._getOrCreate();
        el.innerHTML = `
            <h3 style="margin:0 0 8px;font-size:17px;color:#dc2626;">🔴 Host appears offline</h3>
            <p style="margin:0 0 14px;font-size:13px;color:#6b7280;">They've been gone for a while. Wait or leave?</p>
            <div style="display:flex;gap:10px;">
                <button onclick="document.getElementById('sol-host-reconnect').style.display='none'" style="padding:8px 18px;background:#3b82f6;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">Stay</button>
                <button onclick="window.location.href='/'" style="padding:8px 18px;background:#ef4444;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">Leave</button>
            </div>
        `;
        el.style.display = 'flex';
    },
    // Called when host reconnects (hostDisconnectedAt cleared in Firebase)
    hide: function() {
        let el = document.getElementById('sol-host-reconnect');
        if (el) el.style.display = 'none';
    }
};













