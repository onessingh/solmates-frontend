import sys
import re

with open('games/business-hangman/game.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Add migrateHost function at the end
migrate_func = '''
function migrateHost(hostId) {
    if (!gameState.pool || gameState.pool.length === 0) return;
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
                        broadcast({ type: 'LOBBY_UPDATE', players, category: gameState.category, totalRounds: gameState.totalRounds });
                        if (gameState.gameStarted && !gameState.gameOver) {
                            broadcast({ 
                                type: 'SYNC_STATE', 
                                round: gameState.round, word: gameState.word, hint: gameState.hint,
                                guessed: gameState.guessed, mistakes: gameState.mistakes,
                                turnIdx: gameState.turnIdx, scores: gameState.scores 
                            });
                            syncUIState();
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

function syncUIState() {
    document.getElementById('game-round-num').textContent = Round /;
    document.getElementById('game-hint').textContent = gameState.hint;
    
    // Draw word
    const container = document.getElementById('word-container');
    container.innerHTML = '';
    for (let c of gameState.word) {
        const box = document.createElement('div');
        box.className = 'letter-box';
        if (c === ' ') box.style.border = 'none';
        else if (gameState.guessed.includes(c)) box.textContent = c;
        container.appendChild(box);
    }
    
    // Draw keyboard
    const kb = document.getElementById('keyboard');
    kb.innerHTML = '';
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(l => {
        const btn = document.createElement('button');
        btn.className = 'key-btn';
        btn.textContent = l;
        if (gameState.guessed.includes(l)) {
            btn.disabled = true;
            if (gameState.word.includes(l)) btn.classList.add('correct');
            else btn.classList.add('wrong');
        } else {
            btn.onclick = () => { if(players[gameState.turnIdx]?.id === myId) { processGuess(l); } else { hostConn.send({type:'GUESS', letter:l}); } };
        }
        kb.appendChild(btn);
    });
    
    // Draw hangman
    LIMB_IDS.forEach((id, i) => {
        document.getElementById(id).style.opacity = i < gameState.mistakes ? '1' : '0';
    });
    
    updateTurnUI();
}
'''
if "function migrateHost" not in js:
    js += "\n" + migrate_func

# 2. Update handleGuestData to parse SYNC_STATE and handle pool backup if START_GAME
handle_guest = '''
    if (data.type === 'START_GAME') {
        gameState.pool = data.pool; // backup pool for host migration
'''
if "gameState.pool = data.pool;" not in js:
    js = js.replace("if (data.type === 'START_GAME') {", handle_guest)

sync_state = '''
    if (data.type === 'SYNC_STATE') {
        gameState.round = data.round; gameState.word = data.word; gameState.hint = data.hint;
        gameState.guessed = data.guessed; gameState.mistakes = data.mistakes;
        gameState.turnIdx = data.turnIdx; gameState.scores = data.scores;
        syncUIState();
    }
'''
if "data.type === 'SYNC_STATE'" not in js:
    js = js.replace("if (data.type === 'END_GAME') {", sync_state + "    if (data.type === 'END_GAME') {")

# 3. Update close handler
js = js.replace("hostConn.on('close', () => { showToast(\"Host disconnected.\"); uiShowWelcome(); });", "hostConn.on('close', () => { if(typeof showToast === 'function') showToast(\"Host disconnected. Attempting migration...\"); migrateHost(code); });\\n        hostConn.on('host_disconnect_early', () => { if(typeof showToast === 'function') showToast(\"Host disconnected. Attempting migration...\"); migrateHost(code); });")

# 4. START_GAME needs to broadcast pool
js = js.replace("broadcast({ type: 'START_GAME', totalRounds: gameState.totalRounds, category: gameState.category });", "broadcast({ type: 'START_GAME', pool: gameState.pool, totalRounds: gameState.totalRounds, category: gameState.category });")

with open('games/business-hangman/game.js', 'w', encoding='utf-8') as f:
    f.write(js)
