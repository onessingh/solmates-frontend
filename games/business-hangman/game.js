// ===== Biz Hangman — multiplayer game logic =====
const ROOM_PREFIX = 'SOLMATES-HM-';
const MAX_MISTAKES = 6;
const LIMB_IDS = ['hm-head', 'hm-body', 'hm-arm-l', 'hm-arm-r', 'hm-leg-l', 'hm-leg-r'];

let peer = null, hostConn = null, isHost = false, myId = null;
let myName = "Player";
try { myName = localStorage.getItem('solmates_nickname') || "Player"; } catch(e) {}
let pendingRoomCode = null;

let players = [];
let guestConns = {};

let gameState = {
    category: 'general', pool: [], totalRounds: 5, round: 0,
    words: [], word: '', hint: '', guessed: [], mistakes: 0,
    turnIdx: 0, scores: {}, correctCounts: {}, gameStarted: false, gameOver: false, roundLocked: false
};

// ---------- Toast ----------
function showToast(msg) {
    const c = document.getElementById('toast-container');
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; c.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3000);
}

// ---------- Screen navigation ----------
function hideAllScreens() { ['screen-welcome', 'screen-create', 'screen-join', 'screen-lobby', 'screen-game', 'screen-leaderboard'].forEach(id => document.getElementById(id).classList.add('hidden')); }
function uiShowWelcome() { hideAllScreens(); document.getElementById('screen-welcome').classList.remove('hidden'); }
function uiShowCreateRoom() { hideAllScreens(); document.getElementById('screen-create').classList.remove('hidden'); populateSemesters(); }
function uiShowJoinRoom() { hideAllScreens(); document.getElementById('screen-join').classList.remove('hidden'); }

(function checkUrlInvite() {
    const room = new URLSearchParams(window.location.search).get('room');
    if (room) { pendingRoomCode = room.toUpperCase(); window.addEventListener('DOMContentLoaded', () => document.getElementById('url-join-box').classList.remove('hidden')); }
})();
function joinViaUrl() { if (!pendingRoomCode) return; document.getElementById('room-code-input').value = pendingRoomCode; uiShowJoinRoom(); manualJoinRoom(); }

function populateSemesters() {
    const sel = document.getElementById('select-semester');
    sel.innerHTML = '<option value="">Choose Semester...</option>';
    if (QUIZ_DATA.structure["MBA"]) Object.keys(QUIZ_DATA.structure["MBA"]).forEach(s => sel.innerHTML += `<option value="${s}">${s}</option>`);
}
function updateSubjects() {
    const sem = document.getElementById('select-semester').value;
    const subjSel = document.getElementById('select-subject');
    const subjContainer = document.getElementById('subject-container');
    subjSel.innerHTML = '<option value="All">All Subjects (Mixed)</option>';
    if (sem && QUIZ_DATA.structure["MBA"][sem]) {
        QUIZ_DATA.structure["MBA"][sem].forEach(subj => { const opt = document.createElement('option'); opt.value = subj; opt.textContent = subj; subjSel.appendChild(opt); });
        subjContainer.classList.remove('hidden');
    } else { subjContainer.classList.add('hidden'); }
}

function updateCourseSelection() {
    const course = document.getElementById('select-course').value;
    const semDiv = document.getElementById('semester-container');
    const subjDiv = document.getElementById('subject-container');
    const diffDiv = document.getElementById('difficulty-container');
    if(course === 'MBA') {
        if(semDiv) semDiv.classList.remove('hidden');
        if(document.getElementById('select-semester').value) {
            if(subjDiv) subjDiv.classList.remove('hidden');
        }
        if(diffDiv) diffDiv.classList.add('hidden');
    } else {
        if(semDiv) semDiv.classList.add('hidden');
        if(subjDiv) subjDiv.classList.add('hidden');
        if(diffDiv) diffDiv.classList.remove('hidden');
    }
}

function buildQuestionPool(sem, subject) {
    let subjects = [];
    if (typeof course !== 'undefined' && course !== 'MBA') subjects = [];
    else subjects = (subject === 'All') ? (QUIZ_DATA.structure["MBA"]?.[sem] || []) : [subject];
    let pool = [];
    subjects.forEach(s => { if (QUIZ_DATA.questionBank[s]) pool = pool.concat(QUIZ_DATA.questionBank[s]); });
    return pool;
}

// ---------- Peer setup ----------
function initPeer(onOpen, onFail) {
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    peer = new Peer(ROOM_PREFIX + id, {
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
    let opened = false;
    const failTimer = setTimeout(() => { if (!opened) { showToast("Could not reach server."); if (onFail) onFail(); } }, 12000);
    peer.on('open', pid => { opened = true; clearTimeout(failTimer); myId = pid.replace(ROOM_PREFIX, ''); onOpen(myId); });
    peer.on('error', err => { if (!opened) { clearTimeout(failTimer);
    peer.on('disconnected', () => { console.log('Peer disconnected, reconnecting...'); peer.reconnect(); });
    setInterval(() => { if (isHost) broadcast({ type: 'PING' }); }, 3000); showToast("Connection error: " + err.type); if (onFail) onFail(); } });
}

function broadcast(data) { Object.values(guestConns).forEach(c => { if (c.open) c.send(data); }); }

async function createRoom() {
    const course = document.getElementById('select-course').value;
    let sem = '', sub = 'All', topic = '';
    
    if (course === 'MBA') {
        sem = document.getElementById('select-semester').value;
        if(!sem) { showToast("Please select a semester first"); return; }
        sub = document.getElementById('select-subject') ? (document.getElementById('select-subject').value || "All") : "All";
        topic = sub;
    } else {
        const diff = document.getElementById('select-difficulty').value;
        topic = course + " (" + diff + " difficulty)";
        sub = topic;
    }
    
    const rounds = parseInt(document.getElementById('select-rounds').value, 10);
    
    let pool = buildQuestionPool(sem, sub);
    if (window.aiGameConnector) {
        try {
            document.getElementById('btn-create-room').textContent = "Generating AI Words...";
            const aiData = await window.aiGameConnector.getQuestions('business-hangman', topic, rounds + 3, pool);
            if (aiData && aiData.length > 0) {
                pool = aiData.map(w => ({ word: (w.word || '').toUpperCase(), hint: w.hint || '' })).filter(w => w.word);
            }
        } catch(e) {}
    }
    document.getElementById('btn-create-room').textContent = "Create Room";
    
    if (pool.length === 0) { showToast("No words available for that selection"); return; }
    
    gameState.category = course === 'MBA' ? `MBA · ${sem} · ${sub}` : `${topic}`;
    gameState.pool = pool;
    gameState.totalRounds = Math.min(rounds, pool.length);

    initPeer(id => {
        isHost = true;
        players = [{ id: myId, name: myName, score: 0, disconnected: false }];
        gameState.scores[myId] = 0;
        gameState.correctCounts[myId] = 0;

        hideAllScreens(); document.getElementById('screen-lobby').classList.remove('hidden');
        document.getElementById('lobby-topic').textContent = `${gameState.category} · ${rounds} Rounds`;
        document.getElementById('invite-link').textContent = window.location.origin + window.location.pathname + '?room=' + id;
        renderPlayers();

        peer.on('connection', conn => {
            if (gameState.gameOver) { conn.on('open', () => { conn.send({ type: 'ERROR', msg: 'This game has already ended. Please create a new room.' }); setTimeout(() => conn.close(), 500); }); return; }
            if (players.filter(p => !p.disconnected).length >= 4) { conn.on('open', () => { conn.send({ type: 'ERROR', msg: 'Room full' }); setTimeout(() => conn.close(), 500); }); return; }
            guestConns[conn.peer] = conn;
            conn.on('data', data => handleHostData(data, conn.peer));
            conn.on('close', () => handleDisconnect(conn.peer));
        });
    }, () => uiShowWelcome());
}

function handleDisconnect(peerId) {
    const p = players.find(pl => pl.id === peerId);
    if (p) { p.disconnected = true; showToast(`${p.name} disconnected`); }
    delete guestConns[peerId];
    broadcast({ type: 'LOBBY_UPDATE', players, category: gameState.category, totalRounds: gameState.totalRounds });
    if (!document.getElementById('screen-lobby').classList.contains('hidden')) renderPlayers();
    else if (gameState.gameStarted && isHost && !gameState.roundLocked) {
        // If it was their turn, skip to next
        const active = players.filter(pl => !pl.disconnected);
        if (active.length > 0 && players[gameState.turnIdx]?.id === peerId) {
            nextTurn();
        }
    }
}

function handleHostData(data, fromId) {
    if (data.type === 'PONG') return;
    if (data.type === 'JOIN') {
        players.push({ id: fromId, name: data.name, score: 0, disconnected: false });
        gameState.scores[fromId] = 0;
        gameState.correctCounts[fromId] = 0;
        broadcast({ type: 'LOBBY_UPDATE', players, category: gameState.category, totalRounds: gameState.totalRounds });
        renderPlayers();
    }
    if (data.type === 'GUESS' && !gameState.roundLocked) {
        if (players[gameState.turnIdx]?.id === fromId) {
            processGuess(data.letter);
        }
    }
}

function manualJoinRoom() {
    let raw = document.getElementById('room-code-input').value.trim();
    let code = raw;
    try { if (raw.includes('room=')) code = new URL(raw).searchParams.get('room'); } catch (e) {}
    code = (code || '').toUpperCase().trim();
    if (!code) { showToast("Enter a room code or invite link"); return; }

    const statusEl = document.getElementById('join-status');
    statusEl.classList.remove('hidden'); statusEl.textContent = "Connecting...";

    peer = new Peer(undefined, {
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
    const failTimer = setTimeout(() => { statusEl.textContent = "Could not connect."; showToast("Connection timed out."); }, 12000);

    peer.on('open', () => {
        peer.on('disconnected', () => { console.log('Peer disconnected, reconnecting...'); peer.reconnect(); });
        setInterval(() => { if (!isHost && hostConn && hostConn.open) hostConn.send({ type: 'PONG' }); }, 3000);
        hostConn = peer.connect(ROOM_PREFIX + code, { reliable: true });
        hostConn.on('open', () => {
            clearTimeout(failTimer); isHost = false; myId = peer.id;
            hostConn.send({ type: 'JOIN', name: myName });
            hideAllScreens(); document.getElementById('screen-lobby').classList.remove('hidden');
            document.getElementById('invite-link').textContent = window.location.origin + window.location.pathname + '?room=' + code;
            document.getElementById('lobby-topic').textContent = "Waiting for host...";
            document.getElementById('btn-start-game').classList.add('hidden');
            document.getElementById('wait-host-msg').classList.remove('hidden');
        });
        hostConn.on('data', handleGuestData);
        hostConn.on('close', () => { showToast("Host disconnected."); uiShowWelcome(); });
        hostConn.on('error', err => { clearTimeout(failTimer); statusEl.textContent = "Connection failed."; showToast("Error: " + err.type); });
    });
    peer.on('error', err => { clearTimeout(failTimer); statusEl.textContent = "Connection failed."; showToast("Error: " + err.type); });
}

function copyInviteLink() {
    const linkText = document.getElementById('invite-link').textContent || document.getElementById('invite-link').value || window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(linkText).catch(e => console.log('Clipboard error', e));
    } else {
        const el = document.createElement('textarea');
        el.value = linkText;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
    
    if (typeof showToast === 'function') showToast('Invite link copied!');
    
    if (navigator.share) {
        setTimeout(() => {
            navigator.share({
                title: 'Join my Solmates Game',
                text: 'Play this multiplayer game with me on Solmates!',
                url: linkText
            }).catch(err => console.log('Share cancelled', err));
        }, 500);
    } else if (typeof showToast !== 'function') {
        alert('Invite link copied!');
    }
}

function handleGuestData(data) {
    if(window.guestWaitTimeout) clearTimeout(window.guestWaitTimeout);
    if (data.type === 'PING') return;
    if (data.type === 'ERROR') { showToast(data.msg); uiShowWelcome(); }
    if (data.type === 'LOBBY_UPDATE') { players = data.players; gameState.category = data.category; gameState.totalRounds = data.totalRounds; document.getElementById('lobby-topic').textContent = data.category + " · " + data.totalRounds + " Rounds"; renderPlayers(); }
    if (data.type === 'START_GAME') { startGame(false); }
    if (data.type === 'ROUND_STATE') { gameState = data.state; renderRound(); }
    if (data.type === 'END_GAME') { showLeaderboard(); }
}

// ---------- Game flow ----------
function startGame(isInit = true) {
    if (isHost && isInit) {
        gameState.words = [...gameState.pool].sort(() => 0.5 - Math.random()).slice(0, gameState.totalRounds);
        players.forEach(p => { gameState.scores[p.id] = 0; gameState.correctCounts[p.id] = 0; });
        gameState.round = 0;
        gameState.gameStarted = true;
        broadcast({ type: 'START_GAME' });
        nextRound();
    }
    hideAllScreens();
    document.getElementById('screen-game').classList.remove('hidden');
}

function nextRound() {
    if (!isHost) return;
    if (gameState.round >= gameState.totalRounds) {
        broadcast({ type: 'END_GAME' }); showLeaderboard(); return;
    }
    const w = gameState.words[gameState.round];
    gameState.word = w.word;
    gameState.hint = w.hint;
    gameState.guessed = [];
    gameState.mistakes = 0;
    gameState.roundLocked = false;
    
    // Assign starting turn for the round to active players in a round-robin style
    const active = players.filter(p => !p.disconnected);
    if (active.length === 0) return;
    gameState.turnIdx = players.findIndex(p => p.id === active[gameState.round % active.length].id);
    
    gameState.round++;
    broadcast({ type: 'ROUND_STATE', state: gameState });
    renderRound();
}

function updateLiveScoresUI() {
    const container = document.getElementById('live-scores-container');
    if (!container) return;
    container.innerHTML = players.map(p => {
        const isTurn = players[gameState.turnIdx]?.id === p.id && !gameState.roundLocked;
        return `
        <div class="px-3 py-1.5 rounded-full border ${isTurn ? 'border-sky-400 bg-sky-50 shadow-[0_0_8px_rgba(56,189,248,0.5)]' : 'border-slate-200 bg-white'} text-xs font-bold text-slate-700 ${p.disconnected ? 'opacity-40' : ''}">
            ${p.id === myId ? 'You' : p.name}: <span class="text-sky-600">${gameState.scores[p.id] || 0}</span>
        </div>`;
    }).join('');
}

function renderRound() {
    document.getElementById('game-round-num').textContent = `Round ${gameState.round}/${gameState.totalRounds}`;
    document.getElementById('hint-text').textContent = "💡 " + gameState.hint;
    document.getElementById('mistake-count').textContent = gameState.mistakes;

    updateLiveScoresUI();

    const wordEl = document.getElementById('word-display');
    wordEl.innerHTML = gameState.word.split('').map(ch => {
        if (ch === ' ' || ch === '-') return `<span class="letter-slot" style="border:none; width:auto; padding: 0 4px">${ch}</span>`;
        const revealed = gameState.guessed.includes(ch) || gameState.mistakes >= MAX_MISTAKES || gameState.roundLocked;
        return `<span class="letter-slot">${revealed ? ch : ''}</span>`;
    }).join('');

    LIMB_IDS.forEach((id, i) => { document.getElementById(id).style.display = i < gameState.mistakes ? 'block' : 'none'; });

    const currentTurnPlayer = players[gameState.turnIdx];
    const myTurn = currentTurnPlayer?.id === myId;
    
    document.getElementById('turn-indicator').textContent = gameState.roundLocked
        ? (gameState.mistakes >= MAX_MISTAKES ? `Out of guesses! The word was "${gameState.word}"` : "Word solved!")
        : (myTurn ? "Your turn — pick a letter" : `${currentTurnPlayer?.name || 'Someone'}'s turn...`);

    renderKeyboard(myTurn);
}

function renderKeyboard(myTurn) {
    const kb = document.getElementById('keyboard-grid');
    kb.innerHTML = '';
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
        const used = gameState.guessed.includes(letter);
        const btn = document.createElement('button');
        btn.className = 'key-btn p-2 text-sm';
        btn.textContent = letter;
        btn.disabled = used || !myTurn || gameState.roundLocked;
        if (used) btn.classList.add(gameState.word.includes(letter) ? 'correct' : 'wrong');
        btn.onclick = () => guessLetter(letter);
        kb.appendChild(btn);
    });
}

function guessLetter(letter) {
    if (gameState.roundLocked) return;
    const currentTurnPlayer = players[gameState.turnIdx];
    const myTurn = currentTurnPlayer?.id === myId;
    if (!myTurn || gameState.guessed.includes(letter)) return;
    
    if (isHost) processGuess(letter);
    else if (hostConn && hostConn.open) {
        hostConn.send({ type: 'GUESS', letter });
        if(window.guestWaitTimeout) clearTimeout(window.guestWaitTimeout);
        window.guestWaitTimeout = setTimeout(() => { alert("Host disconnected or game got stuck. Leaving the room."); safeExit(); }, 10 * 1000 + 10000);
    }
}

function nextTurn() {
    let nextIdx = (gameState.turnIdx + 1) % players.length;
    let iterations = 0;
    while (players[nextIdx].disconnected && iterations < players.length) {
        nextIdx = (nextIdx + 1) % players.length;
        iterations++;
    }
    gameState.turnIdx = nextIdx;
}

// HOST-ONLY authoritative logic
function processGuess(letter) {
    
    if (gameState.guessed.includes(letter) || gameState.roundLocked) return;
    gameState.guessed.push(letter);

    const correct = gameState.word.includes(letter);
    if (!correct) {
        gameState.mistakes += 1;
    } else {
        // Option: correct guess grants points
        // gameState.scores[players[gameState.turnIdx].id] += 10;
    }

    const solved = gameState.word.split('').every(ch => ch === ' ' || ch === '-' || gameState.guessed.includes(ch));
    const failed = gameState.mistakes >= MAX_MISTAKES;

    if (solved) {
        const pId = players[gameState.turnIdx].id;
        gameState.scores[pId] = (gameState.scores[pId] || 0) + 100;
        gameState.correctCounts[pId] = (gameState.correctCounts[pId] || 0) + 1;
        gameState.roundLocked = true;
        broadcast({ type: 'ROUND_STATE', state: gameState });
        renderRound();
        showToast(`${players[gameState.turnIdx].name} solved the word!`);
        setTimeout(nextRound, 3000);
        return;
    }
    
    if (failed) {
        gameState.roundLocked = true;
        broadcast({ type: 'ROUND_STATE', state: gameState });
        renderRound();
        showToast(`Out of guesses! The word was "${gameState.word}"`);
        setTimeout(nextRound, 3000);
        return;
    }

    if (!correct) {
        nextTurn();
    }
    
    broadcast({ type: 'ROUND_STATE', state: gameState });
    renderRound();
}

function showLeaderboard() {
    gameState.gameOver = true;
    hideAllScreens();
    document.getElementById('screen-leaderboard').classList.remove('hidden');
    const sorted = [...players].sort((a,b) => {
        if (a.disconnected && !b.disconnected) return 1;
        if (!a.disconnected && b.disconnected) return -1;
        return (gameState.scores[b.id]||0) - (gameState.scores[a.id]||0);
    });
    
    document.getElementById('leaderboard-list').innerHTML = sorted.map((p, i) => {
        const isMe = p.id === myId;
        const borderCls = i === 0 ? 'border-yellow-300 bg-yellow-50' : (isMe ? 'border-sky-200 bg-sky-50' : 'border-slate-200 bg-white');
        return `
            <div class="flex items-center justify-between p-4 rounded-xl border ${borderCls} ${p.disconnected ? 'opacity-50' : ''}">
                <div class="flex items-center gap-3">
                    <span class="font-bold text-slate-400">#${i + 1}</span>
                    <div>
                        <p class="font-semibold text-slate-800">${p.name}${isMe ? ' (You)' : ''}${p.disconnected ? ' 🔌' : ''}</p>
                        <p class="text-xs text-slate-500 mt-0.5">✅ ${gameState.correctCounts[p.id]||0} / ${gameState.totalRounds} solved</p>
                    </div>
                    ${i === 0 && !p.disconnected ? '<i data-lucide="trophy" class="w-4 h-4 text-yellow-500"></i>' : ''}
                </div>
                <span class="font-bold text-slate-900 text-lg">${gameState.scores[p.id]||0} pts</span>
            </div>`;
    }).join('');
    lucide.createIcons();
}

function safeExit() { try { Object.values(guestConns).forEach(c => c.close()); if (hostConn) hostConn.close(); if (peer) peer.destroy(); } catch (e) {} window.location.href = '/games/'; }
window.addEventListener('beforeunload', (e) => { if (gameState.gameStarted) { e.preventDefault(); e.returnValue = "Leaving will end the game!"; } });

function renderPlayers() {
    const list = document.getElementById('players-list');
    if (!list) return;
    const countEl = document.getElementById('player-count');
    if (countEl) countEl.textContent = players.length;
    list.innerHTML = '';
    players.forEach(p => {
        list.innerHTML += `<div class="bg-white p-3 rounded-lg border border-slate-200 font-bold shadow-sm">${p.name} ${p.id === myId ? '(You)' : ''} ${p.disconnected ? '🔌' : ''}</div>`;
    });
    const btn = document.getElementById('btn-start-game');
    if (btn && isHost && players.filter(p => !p.disconnected).length > 0) btn.classList.remove('hidden');
}
