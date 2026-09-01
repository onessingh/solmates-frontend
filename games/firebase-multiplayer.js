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

// Lightweight, theme-aware alert modal used for validation messages (e.g. "select a semester")
// that deserve more attention than a toast but don't need the full host-status panel.
window.SolmatesModal = {
    _ensureStyles: function() {
        if (document.getElementById('sol-modal-styles')) return;
        const style = document.createElement('style');
        style.id = 'sol-modal-styles';
        style.textContent = `
            #sol-modal-overlay {
                position: fixed; inset: 0; z-index: 10000;
                background: rgba(15, 23, 42, 0.45); backdrop-filter: blur(2px);
                display: flex; align-items: center; justify-content: center;
                padding: 20px; opacity: 0; transition: opacity .18s ease;
            }
            #sol-modal-overlay.sol-modal-show { opacity: 1; }
            #sol-modal-card {
                background: #ffffff; color: #0f172a;
                border: 1px solid rgba(15, 23, 42, 0.08);
                border-radius: 18px; padding: 24px 26px; max-width: 340px; width: 100%;
                text-align: center; font-family: Inter, sans-serif;
                box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25);
                transform: scale(0.94); transition: transform .18s ease;
            }
            #sol-modal-overlay.sol-modal-show #sol-modal-card { transform: scale(1); }
            html.dark #sol-modal-card {
                background: #1e293b; color: #f1f5f9;
                border: 1px solid rgba(255, 255, 255, 0.08);
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
            }
            #sol-modal-icon { font-size: 30px; margin-bottom: 10px; }
            #sol-modal-title { margin: 0 0 8px; font-size: 17px; font-weight: 700; color: #b45309; }
            html.dark #sol-modal-title { color: #fbbf24; }
            #sol-modal-msg { margin: 0 0 18px; font-size: 13.5px; line-height: 1.5; color: #64748b; }
            html.dark #sol-modal-msg { color: #94a3b8; }
            #sol-modal-ok {
                padding: 10px 28px; border: none; border-radius: 10px; font-weight: 700; font-size: 14px;
                cursor: pointer; background: #3b82f6; color: white; transition: opacity .15s ease;
            }
            #sol-modal-ok:hover { opacity: 0.88; }
            #sol-modal-input {
                width: 100%; box-sizing: border-box; margin: 4px 0 4px; padding: 11px 14px;
                border-radius: 10px; font-size: 14px; font-family: Inter, sans-serif;
                border: 1.5px solid rgba(15, 23, 42, 0.14); background: #f8fafc; color: #0f172a;
                outline: none; transition: border-color .15s ease;
            }
            #sol-modal-input:focus { border-color: #3b82f6; }
            html.dark #sol-modal-input { background: #0f172a; color: #f1f5f9; border-color: rgba(255,255,255,0.14); }
            #sol-modal-error { display: none; color: #dc2626; font-size: 12px; margin: 2px 0 10px; text-align: left; }
            html.dark #sol-modal-error { color: #f87171; }
        `;
        document.head.appendChild(style);
    },
    alert: function(title, message, okText) {
        this._ensureStyles();
        let overlay = document.getElementById('sol-modal-overlay');
        if (overlay) overlay.remove();
        overlay = document.createElement('div');
        overlay.id = 'sol-modal-overlay';
        overlay.innerHTML = `
            <div id="sol-modal-card">
                <div id="sol-modal-icon">&#128203;</div>
                <h3 id="sol-modal-title">${title}</h3>
                <p id="sol-modal-msg">${message}</p>
                <button id="sol-modal-ok">${okText || 'Got it'}</button>
            </div>`;
        document.body.appendChild(overlay);
        const close = () => { overlay.classList.remove('sol-modal-show'); setTimeout(() => overlay.remove(), 180); };
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
        overlay.querySelector('#sol-modal-ok').addEventListener('click', close);
        requestAnimationFrame(() => overlay.classList.add('sol-modal-show'));
    },
    // Reliable, in-page replacement for prompt() — works inside WhatsApp/Instagram in-app
    // browsers and other webviews where window.prompt() is silently disabled. `validate(name)`
    // should return { ok: true, name } or { ok: false, error }. Resolves to the accepted name,
    // or null if the user dismisses the modal without entering one.
    promptName: function(title, message, validate) {
        this._ensureStyles();
        return new Promise((resolve) => {
            let overlay = document.getElementById('sol-modal-overlay');
            if (overlay) overlay.remove();
            overlay = document.createElement('div');
            overlay.id = 'sol-modal-overlay';
            overlay.innerHTML = `
                <div id="sol-modal-card">
                    <div id="sol-modal-icon">&#128075;</div>
                    <h3 id="sol-modal-title" style="color:#0f172a;">${title || "What's your name?"}</h3>
                    <p id="sol-modal-msg">${message || 'Other players will see this nickname.'}</p>
                    <input id="sol-modal-input" type="text" maxlength="20" placeholder="Enter your nickname" autocomplete="off">
                    <p id="sol-modal-error"></p>
                    <button id="sol-modal-ok">Continue</button>
                </div>`;
            document.body.appendChild(overlay);
            const titleEl = overlay.querySelector('#sol-modal-title');
            titleEl.style.color = '';
            const input = overlay.querySelector('#sol-modal-input');
            const errorEl = overlay.querySelector('#sol-modal-error');
            let resolved = false;
            const finish = (val) => { if (resolved) return; resolved = true; close(); resolve(val); };
            const close = () => { overlay.classList.remove('sol-modal-show'); setTimeout(() => overlay.remove(), 180); };
            const submit = () => {
                const val = input.value.trim();
                const result = validate ? validate(val) : (val ? { ok: true, name: val } : { ok: false, error: 'Please enter a name.' });
                if (!result.ok) { errorEl.textContent = result.error || 'Please enter a valid name.'; errorEl.style.display = 'block'; return; }
                finish(result.name);
            };
            overlay.querySelector('#sol-modal-ok').addEventListener('click', submit);
            input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
            overlay.addEventListener('click', (e) => { if (e.target === overlay) finish(null); });
            requestAnimationFrame(() => { overlay.classList.add('sol-modal-show'); input.focus(); });
        });
    }
};

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
            let updates = {};
            if (data && ['START_GAME', 'START_ROUND', 'START_EVENT', 'SYNC_PREPARE', 'QUESTION', 'RESULT', 'REVEAL', 'GAME_OVER', 'END_GAME', 'EVENT_RESULT', 'ROUND_RESULTS', 'ROUND_RESULTS_DATA', 'READ_CASE'].includes(data.type)) {
                updates['solmates-rooms/' + this.roomId + '/locked'] = true;
                
                if (!window._solmatesStateVersionCounter) window._solmatesStateVersionCounter = 0;
                window._solmatesStateVersionCounter++;
                const sv = Date.now() * 1000 + window._solmatesStateVersionCounter;
                
                const gsPayload = { type: data.type, payload: payload, ts: Date.now(), sv: sv };
                console.log('[MP GAMESTATE WRITE] type=', data.type, 'sv=', sv, 'ts=', gsPayload.ts, 'payload=', payload.substring(0, 50));
                updates['solmates-rooms/' + this.roomId + '/gameState'] = gsPayload;
                
                let phase = 'PLAYING';
                if (['START_GAME', 'START_ROUND', 'START_EVENT'].includes(data.type)) phase = 'STARTING';
                if (['RESULT', 'REVEAL', 'EVENT_RESULT', 'ROUND_RESULTS', 'ROUND_RESULTS_DATA'].includes(data.type)) phase = 'RESULT';
                if (['GAME_OVER', 'END_GAME'].includes(data.type)) phase = 'GAME_OVER';
                if (data.type === 'SYNC_PREPARE') phase = 'SYNC_PREPARE';
                
                updates['solmates-rooms/' + this.roomId + '/status'] = { gameStarted: !['GAME_OVER', 'END_GAME'].includes(data.type), phase: phase, ts: Date.now(), sv: sv };
                console.log('[MP STATUS WRITE] gameStarted=', updates['solmates-rooms/' + this.roomId + '/status'].gameStarted, 'phase=', phase, 'sv=', sv);
                
                if (window._solmatesPeer) window._solmatesPeer._lastGameStartPayload = gsPayload;
                
                if (data.type === 'SYNC_PREPARE') {
                    const syncId = Math.random().toString(36).substr(2, 8).toUpperCase();
                    updates['solmates-rooms/' + this.roomId + '/syncPrepare'] = { payload: payload, ts: Date.now(), syncId: syncId };
                }
                if (data.type === 'START_GAME') {
                    updates['solmates-rooms/' + this.roomId + '/syncPrepare'] = null;
                }
            }
            if (data && data.type === 'STATE_SYNC' && data.gameStarted) {
                updates['solmates-rooms/' + this.roomId + '/status'] = { gameStarted: true, phase: 'SYNC', ts: Date.now() };
            }
            
            const inboxKey = db.ref('solmates-rooms/' + this.roomId + '/clients/' + this.clientId + '/inbox').push().key;
            updates['solmates-rooms/' + this.roomId + '/clients/' + this.clientId + '/inbox/' + inboxKey] = payload;
            
            db.ref().update(updates);
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
        let isExplicitHost = false;
        if (!id) {
            let existingId = sessionStorage.getItem('solmates_guest_id');
            id = existingId || ('GUEST-' + Math.random().toString(36).substr(2, 8).toUpperCase());
            sessionStorage.setItem('solmates_guest_id', id);
        } else if (id.startsWith('SOLMATES-')) {
            isExplicitHost = true;
        }
        
        this.id = id.replace('SOLMATES-', '');
        this.disconnected = false; this.destroyed = false;
        this._handlers = { open: [], connection: [], error: [], disconnected: [], close: [] };
        
        this._isHostRole = isExplicitHost; 
        this._hostInitDone = false;
        console.log(isExplicitHost ? '[MP HOST INIT] roomId=' : '[MP GUEST INIT] roomId=', this.id);
        
        if (isExplicitHost) {
            window._solmatesHostId = this.id;
            setTimeout(() => {
                if (!this._hostInitDone) {
                    this._hostInitDone = true;
                    this._initHost();
                }
            }, 50);
        } else {
            setTimeout(() => {
                this._fire('open', this.id);
            }, 50);
        }
    }

    on(event, cb) {
        if (this._handlers[event]) this._handlers[event].push(cb);
        // Role detection: first 'connection' listener = this client is Host.
        // Guest calls peer.connect(hostId) instead — never registers 'connection'.
        
    }

    async _initHost() {
        await db.ref('solmates-rooms/' + this.id + '/active').set(true);
        await db.ref('solmates-rooms/' + this.id + '/timestamp').set(firebase.database.ServerValue.TIMESTAMP);
        const hostPresenceRef = db.ref('solmates-rooms/' + this.id + '/hostDisconnectedAt');
        // Guard against overlapping invocations: page load can cause the underlying socket to
        // reconnect once or twice in quick succession (extensions, DNS/TLS hiccups, dev tools),
        // firing '.info/connected' several times right at startup. Without this guard an older,
        // still-in-flight invocation could race with a newer one and leave a stale
        // hostDisconnectedAt behind even though the host is actually online — which is what made
        // guests briefly see a false "Host reconnecting..." banner right after joining.
        let connGen = 0;
        db.ref('.info/connected').on('value', async snap => {
            const gen = ++connGen;
            if (snap.val() === true) {
                this._fire('network_state', { online: true });
                await hostPresenceRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
                if (gen !== connGen) return; // a newer connection event has already superseded this one
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
                try { console.log('[MP GAMESTATE RECEIVED] type=', JSON.parse(gs.payload).type, 'sv=', gs.sv, 'payload=', gs.payload.substring(0, 50)); } catch(e) {}
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
                console.log('[MP STATUS RECEIVED] status=', st, 'syncStarted=', conn._syncStarted);
                if (!st || !st.gameStarted || conn._syncStarted) { console.log('[MP RECOVERY BLOCKED] reason=', (!st ? 'no status' : (!st.gameStarted ? 'not started' : 'sync already started'))); return; }
                console.log('[MP START RECOVERY] initiating recovery from status...');
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
            let earlyFired = false;
            let disconnectFired = false;
            const evalHostDisconnect = (disconnectTime) => {
                if (!disconnectTime || !conn.open) return;
                const elapsed = Date.now() + serverTimeOffset - disconnectTime;
                
                // Dynamic threshold: 120s for lobby, 15s for game
                let isStarted = false;
                if (typeof gameState !== 'undefined' && gameState) isStarted = gameState.gameStarted;
                else if (typeof roomState !== 'undefined' && roomState) isStarted = roomState.gameStarted;
                else if (window._solmatesGameStarted) isStarted = true;
                else {
                    const screenGame = document.getElementById('screen-game');
                    if (screenGame && !screenGame.classList.contains('hidden')) isStarted = true;
                }
                
                // Dynamic threshold: 120s for lobby (host is often just away sharing the invite
                // link and can take up to ~a minute to come back), 15s for an in-progress game
                // (guests should recover/migrate quickly once gameplay has started).
                const disconnectThreshold = isStarted ? 15000 : 120000;

                if (elapsed > 300000) { conn._handlers.close.forEach(cb => cb()); inboxRef.off(); hostDisconnectedRef.off(); return; }
                if (elapsed > disconnectThreshold) {
                    if (!disconnectFired) {
                        if (conn._handlers.host_disconnect) conn._handlers.host_disconnect.forEach(cb => cb());
                        disconnectFired = true;
                    }
                    disconnectTimers.push(setTimeout(() => evalHostDisconnect(disconnectTime), Math.max(300000 - elapsed, 10000)));
                } else if (elapsed > 12000) {
                    earlyFired = true;
                    const secondsLeft = Math.max(1, Math.ceil((disconnectThreshold - elapsed) / 1000));
                    if (conn._handlers.host_disconnect_early) conn._handlers.host_disconnect_early.forEach(cb => cb(secondsLeft));
                    // Keep ticking the countdown once a second while in this band.
                    disconnectTimers.push(setTimeout(() => evalHostDisconnect(disconnectTime), 1000));
                } else {
                    // Below 12s: don't show anything yet. Most disconnect blips at this point are
                    // just the socket briefly reconnecting during page load/network hiccups, and
                    // self-correct within a couple seconds — no need to alarm the guest for those.
                    disconnectTimers.push(setTimeout(() => evalHostDisconnect(disconnectTime), Math.max(12000 - elapsed, 1000)));
                }
            };
            const hostDisconnectedRef = db.ref('solmates-rooms/' + hostId + '/hostDisconnectedAt');
            hostDisconnectedRef.on('value', snap => {
                const disconnectTime = snap.val();
                if (currentDisconnectTime !== disconnectTime) {
                    earlyFired = false;
                    disconnectFired = false;
                }
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

            // -- GUEST POLLING FALLBACK ------------------------------------------------
            // If Firebase WebSocket silently dies (no visibility change triggered),
            // this polling loop force-fetches authoritative room state every 6 seconds.
            const guestPollInterval = setInterval(() => {
                if (conn._syncStarted && !currentDisconnectTime) return; // stable, no need
                db.goOnline();
                db.ref('solmates-rooms/' + hostId).once('value', freshSnap => {
                    const fresh = freshSnap.val();
                    if (!fresh) return;

                    // Re-evaluate host disconnect state
                    const freshDisconnectTime = fresh.hostDisconnectedAt || null;
                    if (freshDisconnectTime !== currentDisconnectTime) {
                        currentDisconnectTime = freshDisconnectTime;
                        clearDisconnectTimers();
                        if (freshDisconnectTime) { evalHostDisconnect(freshDisconnectTime); }
                        else {
                            let el = document.getElementById('sol-host-reconnect');
                            if (el) el.style.display = 'none';
                            if (conn._handlers.host_reconnect) conn._handlers.host_reconnect.forEach(cb => cb());
                        }
                    }

                    // Recover game state if game started but guest hasn't received it
                    if (fresh.status && fresh.status.gameStarted && !conn._syncStarted) {
                        const gs = fresh.gameState;
                        if (gs && gs.payload) {
                            const newSV = gs.sv || 0; const newTs = gs.ts || 0;
                            if (newSV > 0 ? newSV > lastSeenSV : newTs > lastSeenTs) {
                                lastSeenSV = newSV; lastSeenTs = newTs;
                                try {
                                    const data = JSON.parse(gs.payload);
                                    if (['START_GAME','START_ROUND','START_EVENT','QUESTION','RESULT','REVEAL',
                                         'GAME_OVER','END_GAME','EVENT_RESULT','ROUND_RESULTS',
                                         'ROUND_RESULTS_DATA','READ_CASE'].includes(data.type)) {
                                        conn._syncStarted = true;
                                        conn._emitData(data);
                                    }
                                } catch(e) {}
                            }
                        }
                    }
                });
            }, 6000);
            conn._guestPollInterval = guestPollInterval;

            conn._cleanup = () => {
                inboxRef.off(); gameStateRef.off(); statusRef.off(); syncPrepareRef.off(); hostDisconnectedRef.off();
                db.ref('solmates-rooms/' + hostId + '/active').off();
                document.removeEventListener('visibilitychange', guestVisibilityHandler);
                clearDisconnectTimers(); clearInterval(syncRetryInterval); if (conn._guestPollInterval) clearInterval(conn._guestPollInterval);
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

window.SolmatesAlert = {
    show: function(msg) {
        let el = document.getElementById('sol-alert-popup');
        if (!el) {
            el = document.createElement('div');
            el.id = 'sol-alert-popup';
            el.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);background:white;color:black;padding:24px;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.25);z-index:10000;font-family:Inter,sans-serif;min-width:280px;text-align:center;display:none;flex-direction:column;align-items:center;border:1px solid #e2e8f0;';
            document.body.appendChild(el);
        }
        el.innerHTML = '<div style="margin-bottom:16px;font-size:16px;font-weight:600;color:#1e293b;">' + msg + '</div><button onclick="document.getElementById(\'sol-alert-popup\').style.display=\'none\'" style="background:#3b82f6;color:white;border:none;padding:8px 24px;border-radius:8px;font-weight:600;cursor:pointer;">OK</button>';
        el.style.display = 'flex';
    }
};

window.SolmatesSync = {
    _ensureStyles: function() {
        if (document.getElementById('sol-sync-styles')) return;
        const style = document.createElement('style');
        style.id = 'sol-sync-styles';
        style.textContent = `
            @keyframes sol-spin { 100% { transform: rotate(360deg); } }
            #sol-sync-overlay {
                position: fixed; inset: 0; z-index: 999999;
                background: rgba(248, 250, 252, 0.97);
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                font-family: Inter, sans-serif;
            }
            html.dark #sol-sync-overlay { background: rgba(2, 6, 23, 0.97); }
            #sol-sync-spinner {
                width: 60px; height: 60px; border-radius: 50%;
                border: 5px solid #e2e8f0; border-top-color: #0ea5e9;
                animation: sol-spin 1s linear infinite;
            }
            html.dark #sol-sync-spinner { border-color: #334155; border-top-color: #38bdf8; }
            #sol-sync-title { margin-top: 24px; font-size: 24px; font-weight: 700; color: #0f172a; text-align: center; }
            html.dark #sol-sync-title { color: #f1f5f9; }
            #sol-sync-text { margin-top: 12px; font-size: 16px; color: #64748b; text-align: center; }
            html.dark #sol-sync-text { color: #94a3b8; }
        `;
        document.head.appendChild(style);
    },
    show: function(msg) {
        this._ensureStyles();
        let el = document.getElementById('sol-sync-overlay');
        if (!el) { el = document.createElement('div'); el.id = 'sol-sync-overlay'; document.body.appendChild(el); }
        el.style.display = 'flex';
        el.innerHTML = '<div id="sol-sync-spinner"></div><h2 id="sol-sync-title">Starting Game</h2><p id="sol-sync-text">' + msg + '</p>';
    },
    update: function(msg) { let p = document.getElementById('sol-sync-text'); if (p) p.textContent = msg; },
    hide: function() { let el = document.getElementById('sol-sync-overlay'); if (el) el.style.display = 'none'; }
};

window.SolmatesHostStatus = {
    _ensureStyles: function() {
        if (document.getElementById('sol-host-status-styles')) return;
        const style = document.createElement('style');
        style.id = 'sol-host-status-styles';
        style.textContent = `
            @keyframes sol-pulse { 0%,100% { opacity:1; } 50% { opacity:0.35; } }
            #sol-host-reconnect {
                position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
                z-index: 9999; min-width: 280px; max-width: calc(100vw - 32px);
                padding: 18px 22px; border-radius: 16px; text-align: center;
                font-family: Inter, sans-serif; display: flex; flex-direction: column; align-items: center;
                background: #ffffff; color: #0f172a;
                border: 1px solid rgba(15, 23, 42, 0.08);
                box-shadow: 0 12px 32px rgba(15, 23, 42, 0.16), 0 2px 8px rgba(15, 23, 42, 0.06);
            }
            html.dark #sol-host-reconnect {
                background: #1e293b; color: #f1f5f9;
                border: 1px solid rgba(255, 255, 255, 0.08);
                box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45), 0 2px 8px rgba(0, 0, 0, 0.3);
            }
            #sol-host-reconnect .sol-hs-row { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
            #sol-host-reconnect .sol-hs-dot { width: 10px; height: 10px; border-radius: 50%; background: #f59e0b; animation: sol-pulse 1.2s ease-in-out infinite; flex-shrink: 0; }
            #sol-host-reconnect .sol-hs-title { font-size: 16px; font-weight: 700; color: #b45309; }
            html.dark #sol-host-reconnect .sol-hs-title { color: #fbbf24; }
            #sol-host-reconnect .sol-hs-title.sol-hs-danger { color: #dc2626; }
            html.dark #sol-host-reconnect .sol-hs-title.sol-hs-danger { color: #f87171; }
            #sol-host-reconnect .sol-hs-sub { margin: 0; font-size: 13px; color: #64748b; }
            html.dark #sol-host-reconnect .sol-hs-sub { color: #94a3b8; }
            #sol-host-reconnect .sol-hs-count { font-variant-numeric: tabular-nums; font-weight: 600; color: #334155; }
            html.dark #sol-host-reconnect .sol-hs-count { color: #cbd5e1; }
            #sol-host-reconnect .sol-hs-actions { display: flex; gap: 10px; margin-top: 12px; }
            #sol-host-reconnect .sol-hs-btn { padding: 9px 20px; border: none; border-radius: 9px; font-weight: 700; font-size: 13px; cursor: pointer; transition: opacity .15s ease; }
            #sol-host-reconnect .sol-hs-btn:hover { opacity: 0.88; }
            #sol-host-reconnect .sol-hs-btn-stay { background: #eff6ff; color: #2563eb; }
            html.dark #sol-host-reconnect .sol-hs-btn-stay { background: rgba(59,130,246,0.18); color: #93c5fd; }
            #sol-host-reconnect .sol-hs-btn-leave { background: #fef2f2; color: #dc2626; }
            html.dark #sol-host-reconnect .sol-hs-btn-leave { background: rgba(239,68,68,0.18); color: #fca5a5; }
        `;
        document.head.appendChild(style);
    },
    _getOrCreate: function() {
        this._ensureStyles();
        let el = document.getElementById('sol-host-reconnect');
        if (!el) { el = document.createElement('div'); el.id = 'sol-host-reconnect'; document.body.appendChild(el); }
        return el;
    },
    showReconnecting: function(secondsLeft) {
        const el = this._getOrCreate();
        const countHtml = secondsLeft ? `<span class="sol-hs-count">${secondsLeft}s</span>` : '';
        el.innerHTML = `
            <div class="sol-hs-row">
                <div class="sol-hs-dot"></div>
                <span class="sol-hs-title">Host reconnecting${countHtml ? '&hellip; ' : '...'}${countHtml}</span>
            </div>
            <p class="sol-hs-sub">Connection temporarily lost. Waiting for host to return.</p>`;
        el.style.display = 'flex';
    },
    showOffline: function() {
        const el = this._getOrCreate();
        el.innerHTML = `
            <h3 class="sol-hs-title sol-hs-danger" style="margin:0 0 8px;font-size:17px;">&#128308; Host appears offline</h3>
            <p class="sol-hs-sub" style="margin:0 0 14px;">They've been gone for a while. Wait or leave?</p>
            <div class="sol-hs-actions">
                <button class="sol-hs-btn sol-hs-btn-stay" onclick="document.getElementById('sol-host-reconnect').style.display='none'">Stay</button>
                <button class="sol-hs-btn sol-hs-btn-leave" onclick="window.location.href='/'">Leave</button>
            </div>`;
        el.style.display = 'flex';
    },
    hide: function() { let el = document.getElementById('sol-host-reconnect'); if (el) el.remove(); }
};
