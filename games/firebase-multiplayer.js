// Firebase Multiplayer Engine (Replaces PeerJS)
// v390: goOffline removed, role detection fixed, stateVersion added, syncId added

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
db.ref('.info/serverTimeOffset').on('value', snap => { serverTimeOffset = snap.val() || 0; });

// GLOBAL RECONNECT: Only goOnline() - never goOffline() here.
// goOffline() triggers server-side onDisconnect() = false "host offline" events on guests.
if (!window._solmatesGlobalListenersAdded) {
    window._solmatesGlobalListenersAdded = true;
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') db.goOnline();
    });
    window.addEventListener('online', () => db.goOnline());
}

class PeerConnection {
    constructor(isHost, roomId, clientId) {
        this.isHost = isHost; this.roomId = roomId; this.clientId = clientId;
        this.peer = clientId;
        this._handlers = { open: [], data: [], close: [], error: [], host_disconnect: [], host_reconnect: [], host_disconnect_early: [] };
        this._dataQueue = []; this.open = true;
    }
    on(event, cb) {
        if (!this._handlers[event]) this._handlers[event] = [];
        this._handlers[event].push(cb);
        if (event === 'data' && this._dataQueue.length > 0) { this._dataQueue.forEach(d => cb(d)); this._dataQueue = []; }
    }
    _emitData(data) {
        this.open = true; this.disconnected = false;
        if (this._handlers.data.length === 0) { this._dataQueue.push(data); }
        else { this._handlers.data.forEach(cb => cb(data)); }
    }
    send(data) {
        if (!this.open) return;
        const payload = JSON.stringify(data);
        if (this.isHost) {
            if (data && ['START_GAME', 'START_ROUND', 'START_EVENT', 'SYNC_PREPARE', 'QUESTION', 'RESULT', 'REVEAL', 'GAME_OVER', 'END_GAME', 'EVENT_RESULT', 'ROUND_RESULTS', 'ROUND_RESULTS_DATA', 'READ_CASE'].includes(data.type)) {
                db.ref('solmates-rooms/' + this.roomId + '/locked').set(true);
                window._solmatesStateVersion = (window._solmatesStateVersion || 0) + 1;
                const sv = window._solmatesStateVersion;
                const gsPayload = { type: data.type, payload: payload, ts: Date.now(), sv: sv };
                db.ref('solmates-rooms/' + this.roomId + '/gameState').set(gsPayload);
                db.ref('solmates-rooms/' + this.roomId + '/status').set({ gameStarted: true, ts: Date.now(), sv: sv });
                if (window._solmatesPeer) window._solmatesPeer._lastGameStartPayload = gsPayload;
                if (data.type === 'SYNC_PREPARE') {
                    const syncId = Math.random().toString(36).substr(2, 8).toUpperCase();
                    db.ref('solmates-rooms/' + this.roomId + '/syncPrepare').set({ payload: payload, ts: Date.now(), syncId: syncId });
                }
                if (data.type === 'START_GAME') {
                    db.ref('solmates-rooms/' + this.roomId + '/syncPrepare').remove();
                }
            }
            if (data && data.type === 'STATE_SYNC' && data.gameStarted) {
                db.ref('solmates-rooms/' + this.roomId + '/status').set({ gameStarted: true, ts: Date.now() });
            }
            db.ref('solmates-rooms/' + this.roomId + '/clients/' + this.clientId + '/inbox').push(payload);
        } else {
            db.ref('solmates-rooms/' + this.roomId + '/clients/' + this.clientId + '/outbox').push(payload);
        }
    }
    close() {
        if (this._closed) return; this._closed = true; this.open = false;
        if (this._cleanup) this._cleanup();
        if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
        if (this._syncRetryInterval) clearInterval(this._syncRetryInterval);
        this._handlers.close.forEach(cb => cb());
    }
}

window.Peer = class Peer {
    constructor(id) {
        window._solmatesPeer = this;
        if (!id) {
            let existingId = sessionStorage.getItem('solmates_guest_id');
            id = existingId || ('GUEST-' + Math.random().toString(36).substr(2, 8).toUpperCase());
            sessionStorage.setItem('solmates_guest_id', id);
        }
        this.id = id.replace('SOLMATES-', '');
        this.disconnected = false; this.destroyed = false;
        this._handlers = { open: [], connection: [], error: [], disconnected: [], close: [] };
        this._isHostRole = false; this._hostInitDone = false;
        // _initHost() NOT called here. Triggered by on('connection') = host role detection.
    }

    on(event, cb) {
        if (this._handlers[event]) this._handlers[event].push(cb);
        // Role detection: first 'connection' listener = this client is Host.
        // Guest calls peer.connect(hostId) instead — never registers 'connection'.
        if (event === 'connection' && !this._hostInitDone) {
            this._hostInitDone = true; this._isHostRole = true;
            window._solmatesHostId = this.id; // Only set for actual host
            setTimeout(() => this._initHost(), 50);
        }
    }

    async _initHost() {
        await db.ref('solmates-rooms/' + this.id + '/active').set(true);
        await db.ref('solmates-rooms/' + this.id + '/timestamp').set(firebase.database.ServerValue.TIMESTAMP);
        const hostPresenceRef = db.ref('solmates-rooms/' + this.id + '/hostDisconnectedAt');
        db.ref('.info/connected').on('value', async snap => {
            if (snap.val() === true) {
                this._fire('network_state', { online: true });
                await hostPresenceRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
                await hostPresenceRef.remove();
                if (this._lastGameStartPayload) {
                    db.ref('solmates-rooms/' + this.id + '/gameState').set({ ...this._lastGameStartPayload, ts: Date.now() });
                    db.ref('solmates-rooms/' + this.id + '/status').set({ gameStarted: true, ts: Date.now() });
                }
            } else {
                this._fire('network_state', { online: false });
            }
        });
        this.clientRefs = db.ref('solmates-rooms/' + this.id + '/clients');
        this.clientRefs.on('child_added', snap => {
            const clientId = snap.key;
            const conn = new PeerConnection(true, this.id, clientId);
            this._fire('connection', conn);
            setTimeout(() => {
                conn._handlers.open.forEach(cb => cb());
                const outboxRef = db.ref('solmates-rooms/' + this.id + '/clients/' + clientId + '/outbox');
                outboxRef.on('child_added', msgSnap => {
                    if (msgSnap.val()) { const data = JSON.parse(msgSnap.val()); conn._emitData(data); msgSnap.ref.remove(); }
                });
                const clientRef = db.ref('solmates-rooms/' + this.id + '/clients/' + clientId);
                clientRef.on('value', valSnap => {
                    const val = valSnap.val();
                    if (!val) { if (conn._graceTimer) { clearTimeout(conn._graceTimer); conn._graceTimer = null; } conn._handlers.close.forEach(cb => cb()); return; }
                    if (val.connected === false) {
                        if (!conn._graceTimer) {
                            conn._graceTimer = setTimeout(() => {
                                clientRef.child('connected').once('value', s => {
                                    if (s.val() === false) conn._handlers.close.forEach(cb => cb());
                                    conn._graceTimer = null;
                                });
                            }, 15000);
                        }
                    } else if (conn._graceTimer) { clearTimeout(conn._graceTimer); conn._graceTimer = null; }
                });
            }, 50);
        });
        const prefix = this.id.startsWith('GUEST-') ? '' : 'SOLMATES-';
        this._fire('open', prefix + this.id);
    }

    connect(hostIdRaw) {
        const hostId = hostIdRaw.replace('SOLMATES-', '');
        let clientId = sessionStorage.getItem('solmates_guest_id');
        if (!clientId) { clientId = 'GUEST-' + Math.random().toString(36).substr(2, 8).toUpperCase(); sessionStorage.setItem('solmates_guest_id', clientId); }
        const conn = new PeerConnection(false, hostId, clientId);

        db.ref('solmates-rooms/' + hostId).once('value', snap => {
            const roomData = snap.val();
            const isReconnect = roomData && roomData.clients && roomData.clients[clientId];
            if (!roomData || !roomData.active || (roomData.locked && !isReconnect)) { this._fire('error', { type: 'peer-unavailable' }); return; }
            if (roomData.hostDisconnectedAt) {
                const now = Date.now() + serverTimeOffset;
                if (now - roomData.hostDisconnectedAt > 120000) { db.ref('solmates-rooms/' + hostId).remove(); this._fire('error', { type: 'peer-unavailable' }); return; }
            }

            const myRef = db.ref('solmates-rooms/' + hostId + '/clients/' + clientId);
            myRef.update({ connected: true, disconnectedAt: null });
            myRef.onDisconnect().update({ connected: false, disconnectedAt: firebase.database.ServerValue.TIMESTAMP });
            db.ref('.info/connected').on('value', connSnap => {
                if (connSnap.val() === true) { myRef.update({ connected: true, disconnectedAt: null }); myRef.onDisconnect().update({ connected: false, disconnectedAt: firebase.database.ServerValue.TIMESTAMP }); }
            });

            const inboxRef = db.ref('solmates-rooms/' + hostId + '/clients/' + clientId + '/inbox');
            inboxRef.on('child_added', msgSnap => {
                if (msgSnap.val()) { const data = JSON.parse(msgSnap.val()); if (data.type === 'START_GAME') conn._syncStarted = true; conn._emitData(data); msgSnap.ref.remove(); }
            });

            let lastSeenSV = 0; let lastSeenTs = 0;
            const gameStateRef = db.ref('solmates-rooms/' + hostId + '/gameState');
            gameStateRef.on('value', gsSnap => {
                const gs = gsSnap.val();
                if (!gs || !gs.payload) return;
                const newSV = gs.sv || 0; const newTs = gs.ts || 0;
                if (newSV > 0 && newSV <= lastSeenSV) return;
                if (newSV === 0 && newTs <= lastSeenTs) return;
                lastSeenSV = newSV; lastSeenTs = newTs;
                try {
                    const data = JSON.parse(gs.payload);
                    if (['START_GAME', 'START_ROUND', 'START_EVENT', 'SYNC_PREPARE', 'QUESTION', 'RESULT', 'REVEAL', 'GAME_OVER', 'END_GAME', 'EVENT_RESULT', 'ROUND_RESULTS', 'ROUND_RESULTS_DATA', 'READ_CASE'].includes(data.type)) {
                        if (data.type === 'START_GAME') conn._syncStarted = true;
                        conn._emitData(data);
                    }
                } catch(e) {}
            });

            const statusRef = db.ref('solmates-rooms/' + hostId + '/status');
            statusRef.on('value', stSnap => {
                const st = stSnap.val();
                if (!st || !st.gameStarted || conn._syncStarted) return;
                db.ref('solmates-rooms/' + hostId + '/gameState').once('value', gsSnap2 => {
                    const gs2 = gsSnap2.val();
                    if (!gs2 || !gs2.payload) return;
                    const newSV = gs2.sv || 0; const newTs = gs2.ts || 0;
                    if (newSV > 0 && newSV <= lastSeenSV) return;
                    if (newSV === 0 && newTs <= lastSeenTs) return;
                    lastSeenSV = newSV; lastSeenTs = newTs;
                    try {
                        const data = JSON.parse(gs2.payload);
                        if (['START_GAME', 'START_ROUND', 'START_EVENT', 'QUESTION', 'RESULT', 'REVEAL', 'GAME_OVER', 'END_GAME', 'EVENT_RESULT', 'ROUND_RESULTS', 'ROUND_RESULTS_DATA', 'READ_CASE'].includes(data.type)) {
                            conn._syncStarted = true; conn._emitData(data);
                        }
                    } catch(e) {}
                });
            });

            let lastProcessedSyncId = null; let syncPrepareHandled = false;
            const syncPrepareRef = db.ref('solmates-rooms/' + hostId + '/syncPrepare');
            syncPrepareRef.on('value', spSnap => {
                const sp = spSnap.val();
                if (!sp || !sp.payload || syncPrepareHandled) return;
                if (sp.syncId && sp.syncId === lastProcessedSyncId) return;
                try {
                    const data = JSON.parse(sp.payload);
                    if (data.type === 'SYNC_PREPARE') { lastProcessedSyncId = sp.syncId || null; conn._emitData(data); }
                } catch(e) {}
            });
            const syncRetryInterval = setInterval(() => {
                if (conn._syncStarted) { clearInterval(syncRetryInterval); syncPrepareHandled = true; return; }
                syncPrepareRef.once('value', spSnap => {
                    const sp = spSnap.val();
                    if (!sp || !sp.payload || conn._syncStarted) return;
                    if (sp.syncId && sp.syncId === lastProcessedSyncId) return;
                    try {
                        const data = JSON.parse(sp.payload);
                        if (data.type === 'SYNC_PREPARE') { lastProcessedSyncId = sp.syncId || null; conn._emitData(data); }
                    } catch(e) {}
                });
            }, 2000);
            conn._syncRetryInterval = syncRetryInterval;

            let disconnectTimers = [];
            const clearDisconnectTimers = () => { disconnectTimers.forEach(t => clearTimeout(t)); disconnectTimers = []; };
            let currentDisconnectTime = null;
            const evalHostDisconnect = (disconnectTime) => {
                if (!disconnectTime || !conn.open) return;
                const elapsed = Date.now() + serverTimeOffset - disconnectTime;
                if (elapsed > 300000) { conn._handlers.close.forEach(cb => cb()); inboxRef.off(); hostDisconnectedRef.off(); return; }
                if (elapsed > 28000) {
                    if (conn._handlers.host_disconnect) conn._handlers.host_disconnect.forEach(cb => cb());
                    if (conn._handlers.host_disconnect_early) conn._handlers.host_disconnect_early.forEach(cb => cb());
                    disconnectTimers.push(setTimeout(() => evalHostDisconnect(disconnectTime), Math.max(300000 - elapsed, 10000)));
                } else if (elapsed > 10000) {
                    if (conn._handlers.host_disconnect_early) conn._handlers.host_disconnect_early.forEach(cb => cb());
                    disconnectTimers.push(setTimeout(() => evalHostDisconnect(disconnectTime), Math.max(28000 - elapsed, 2000)));
                } else {
                    disconnectTimers.push(setTimeout(() => evalHostDisconnect(disconnectTime), Math.max(10000 - elapsed, 1000)));
                }
            };
            const hostDisconnectedRef = db.ref('solmates-rooms/' + hostId + '/hostDisconnectedAt');
            hostDisconnectedRef.on('value', snap => {
                const disconnectTime = snap.val();
                currentDisconnectTime = disconnectTime;
                clearDisconnectTimers();
                if (disconnectTime) { evalHostDisconnect(disconnectTime); }
                else {
                    let el = document.getElementById('sol-host-reconnect');
                    if (el) el.style.display = 'none';
                    if (conn._handlers.host_reconnect) conn._handlers.host_reconnect.forEach(cb => cb());
                }
            });

            const guestVisibilityHandler = () => {
                if (document.visibilityState !== 'visible') return;
                db.goOnline();
                if (!conn.open) return;
                db.ref('solmates-rooms/' + hostId).once('value', freshSnap => {
                    const fresh = freshSnap.val();
                    if (!fresh) return;
                    const freshDisconnectTime = fresh.hostDisconnectedAt || null;
                    if (freshDisconnectTime !== currentDisconnectTime) {
                        currentDisconnectTime = freshDisconnectTime;
                        clearDisconnectTimers();
                        if (freshDisconnectTime) { evalHostDisconnect(freshDisconnectTime); }
                        else { let el = document.getElementById('sol-host-reconnect'); if (el) el.style.display = 'none'; }
                    }
                    if (fresh.status && fresh.status.gameStarted && !conn._syncStarted) {
                        const gs = fresh.gameState;
                        if (gs && gs.payload) {
                            const newSV = gs.sv || 0; const newTs = gs.ts || 0;
                            if (newSV > 0 ? newSV > lastSeenSV : newTs > lastSeenTs) {
                                lastSeenSV = newSV; lastSeenTs = newTs;
                                try {
                                    const data = JSON.parse(gs.payload);
                                    if (data.type === 'START_GAME') { conn._syncStarted = true; conn._emitData(data); }
                                } catch(e) {}
                            }
                        }
                    }
                });
            };
            document.addEventListener('visibilitychange', guestVisibilityHandler);

            conn._cleanup = () => {
                inboxRef.off(); gameStateRef.off(); statusRef.off(); syncPrepareRef.off(); hostDisconnectedRef.off();
                db.ref('solmates-rooms/' + hostId + '/active').off();
                document.removeEventListener('visibilitychange', guestVisibilityHandler);
                clearDisconnectTimers(); clearInterval(syncRetryInterval);
            };
            setTimeout(() => { conn._handlers.open.forEach(cb => cb()); }, 50);
        });
        return conn;
    }

    _fire(event, data) { if (this._handlers[event]) this._handlers[event].forEach(cb => cb(data)); }
    disconnect() { this.disconnected = true; }
    reconnect() { this.disconnected = false; db.goOnline(); }
    destroy() { this.destroyed = true; db.ref('solmates-rooms/' + this.id).remove(); }
};

window.SolmatesSync = {
    show: function(msg) {
        let el = document.getElementById('sol-sync-overlay');
        if (!el) { el = document.createElement('div'); el.id = 'sol-sync-overlay'; el.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(255,255,255,0.95);z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Inter,sans-serif;'; document.body.appendChild(el); }
        el.style.display = 'flex';
        el.innerHTML = '<div style="width:60px;height:60px;border:5px solid #e2e8f0;border-top-color:#0ea5e9;border-radius:50%;animation:sol-spin 1s linear infinite;"></div><h2 style="margin-top:24px;font-size:24px;font-weight:700;color:#0f172a;text-align:center;">Starting Game</h2><p id="sol-sync-text" style="margin-top:12px;font-size:16px;color:#64748b;text-align:center;">' + msg + '</p><style>@keyframes sol-spin { 100% { transform: rotate(360deg); } }</style>';
    },
    update: function(msg) { let p = document.getElementById('sol-sync-text'); if (p) p.textContent = msg; },
    hide: function() { let el = document.getElementById('sol-sync-overlay'); if (el) el.style.display = 'none'; }
};

window.SolmatesHostStatus = {
    _getOrCreate: function() {
        let el = document.getElementById('sol-host-reconnect');
        if (!el) { el = document.createElement('div'); el.id = 'sol-host-reconnect'; el.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:white;color:black;padding:16px 24px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.18);display:flex;flex-direction:column;align-items:center;z-index:9999;font-family:Inter,sans-serif;min-width:260px;text-align:center;'; document.body.appendChild(el); }
        return el;
    },
    showReconnecting: function() {
        const el = this._getOrCreate();
        el.innerHTML = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;"><div style="width:10px;height:10px;background:#f59e0b;border-radius:50%;animation:sol-pulse 1.2s ease-in-out infinite;"></div><span style="font-size:16px;font-weight:700;color:#92400e;">Host reconnecting...</span></div><p style="margin:0;font-size:13px;color:#78716c;">Connection temporarily lost. Waiting for host to return.</p><style>@keyframes sol-pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }</style>';
        el.style.display = 'flex';
    },
    showOffline: function() {
        const el = this._getOrCreate();
        el.innerHTML = '<h3 style="margin:0 0 8px;font-size:17px;color:#dc2626;">&#128308; Host appears offline</h3><p style="margin:0 0 14px;font-size:13px;color:#6b7280;">They\'ve been gone for a while. Wait or leave?</p><div style="display:flex;gap:10px;"><button onclick="document.getElementById(\'sol-host-reconnect\').style.display=\'none\'" style="padding:8px 18px;background:#3b82f6;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">Stay</button><button onclick="window.location.href=\'/\'" style="padding:8px 18px;background:#ef4444;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">Leave</button></div>';
        el.style.display = 'flex';
    },
    hide: function() { let el = document.getElementById('sol-host-reconnect'); if (el) el.style.display = 'none'; }
};
