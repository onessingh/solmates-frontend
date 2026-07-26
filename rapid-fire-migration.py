import sys
import re

with open('games/rapid-fire/game.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Add migrateHost function at the end
migrate_func = '''
function migrateHost(hostId) {
    if (!gameState.questions || gameState.questions.length === 0) return;
    if (hostConn) { hostConn.close(); hostConn = null; }
    
    // We need firebase database reference
    const db = firebase.database();
    db.ref(solmates-rooms//newHost).transaction((currentData) => {
        if (currentData === null) return myId;
        return; // Someone else claimed
    }, (error, committed, snapshot) => {
        if (committed && snapshot.val() === myId) {
            isHost = true;
            
            let oldHostPlayer = players.find(p => p.id === hostId);
            if (oldHostPlayer) {
                oldHostPlayer.id = hostId + '-LEFT';
                gameState.scores[oldHostPlayer.id] = gameState.scores[hostId] || 0;
                gameState.correctCounts[oldHostPlayer.id] = gameState.correctCounts[hostId] || 0;
            }
            let myOldId = myId;
            
            if (peer) peer.destroy();
            
            setTimeout(() => {
                // Re-init peer as host using the same room code
                peer = new Peer(ROOM_PREFIX + hostId, {
                    debug: 1,
                    config: {
                        'iceServers': [
                            { urls: 'stun:stun.l.google.com:19302' },
                            { urls: 'stun:stun1.l.google.com:19302' },
                            { urls: 'stun:stun2.l.google.com:19302' },
                            { urls: 'turn:openrelay.metered.ca:80', username: 'openrelayproject', credential: 'openrelayproject' },
                            { urls: 'turn:openrelay.metered.ca:443', username: 'openrelayproject', credential: 'openrelayproject' },
                            { urls: 'turn:openrelay.metered.ca:443?transport=tcp', username: 'openrelayproject', credential: 'openrelayproject' }
                        ]
                    }
                });
                peer.on('open', (pid) => {
                    myId = pid.replace(ROOM_PREFIX, '');
                    let me = players.find(p => p.id === myOldId);
                    if (me) me.id = myId;
                    gameState.scores[myId] = gameState.scores[myOldId] || 0;
                    gameState.correctCounts[myId] = gameState.correctCounts[myOldId] || 0;
                    
                    hideAllScreens();
                    document.getElementById('screen-game').classList.remove('hidden');
                    if(typeof showToast === 'function') showToast("You are the new host!");
                    
                    peer.on('connection', conn => {
                        guestConns[conn.peer] = conn;
                        conn.on('data', data => handleHostData(data, conn.peer));
                        conn.on('close', () => handleDisconnect(conn.peer));
                    });
                    
                    // Resume game
                    setTimeout(() => {
                        broadcast({ type: 'LOBBY_UPDATE', players, topic: gameState.topic });
                        if (gameState.qIndex >= 0 && gameState.qIndex < gameState.questions.length) {
                            const q = gameState.questions[gameState.qIndex];
                            broadcast({ type: 'QUESTION', qIndex: gameState.qIndex, question: q });
                            showQuestion(gameState.qIndex, q);
                        }
                    }, 500);
                });
            }, 1000);
        } else {
            // Someone else became host, reconnect
            setTimeout(() => {
                manualJoinRoomReconnect(hostId);
            }, 3000);
        }
    });
}

function manualJoinRoomReconnect(code) {
    if (peer) peer.destroy();
    const statusEl = document.getElementById('join-status');
    statusEl.classList.remove('hidden'); statusEl.textContent = "Reconnecting...";

    peer = new Peer(undefined, {
        debug: 1,
        config: {
            'iceServers': [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' }
            ]
        }
    });
    const failTimer = setTimeout(() => { statusEl.textContent = "Could not connect."; }, 12000);
    peer.on('open', () => {
        hostConn = peer.connect(ROOM_PREFIX + code, { reliable: true });
        hostConn.on('open', () => {
            clearTimeout(failTimer); isHost = false; myId = peer.id;
            hostConn.send({ type: 'JOIN', name: myName });
            if(typeof showToast === 'function') showToast("Reconnected!");
        });
        hostConn.on('data', handleGuestData);
        hostConn.on('close', () => { if(typeof showToast === 'function') showToast("Host disconnected. Attempting migration..."); migrateHost(code); });
        hostConn.on('host_disconnect_early', () => { if(typeof showToast === 'function') showToast("Host disconnected. Attempting migration..."); migrateHost(code); });
    });
}
'''
if "function migrateHost" not in js:
    js += "\n" + migrate_func

# 2. Update close handler
js = js.replace("hostConn.on('close', () => { showToast(\"Host disconnected.\"); uiShowWelcome(); });", "hostConn.on('close', () => { if(typeof showToast === 'function') showToast(\"Host disconnected. Attempting migration...\"); migrateHost(code); });\\n        hostConn.on('host_disconnect_early', () => { if(typeof showToast === 'function') showToast(\"Host disconnected. Attempting migration...\"); migrateHost(code); });")

with open('games/rapid-fire/game.js', 'w', encoding='utf-8') as f:
    f.write(js)
