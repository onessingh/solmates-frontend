// ===== Rapid Fire — simultaneous speed-quiz multiplayer logic =====
const ROOM_PREFIX = 'SOLMATES-RF-';
const TIME_LIMIT_MS = 8000;

let peer = null, hostConn = null, isHost = false, myId = null;
let myName = "Player";
try { myName = localStorage.getItem('solmates_nickname') || "Player"; } catch(e) {}
let pendingRoomCode = null;

let players = [];
let guestConns = {};

let gameState = {
    topic: '', pool: [], questions: [], qIndex: -1, qCount: 0,
    scores: {}, correctCounts: {}, currentAnswers: {}, gameStarted: false, gameOver: false
};

let questionStartTime = 0;
let myAnswered = false;
let forceRevealTimer = null;
let tickInterval = null;
let revealTimer = null;

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
        sub = document.getElementById('select-subject').value || "All";
        topic = sub;
    } else {
        const diff = document.getElementById('select-difficulty').value;
        topic = course + " (" + diff + " difficulty)";
        sub = topic; // use topic as subject for AI
    }
    const qCount = parseInt(document.getElementById('select-q-count').value || "10", 10);
    
    let pool = buildQuestionPool(sem, sub);
    if (window.aiGameConnector) {
        try {
            document.getElementById('btn-create-room').textContent = "Generating AI Questions...";
            const aiData = await window.aiGameConnector.getQuestions('rapid-fire', topic, qCount + 5, pool);
            if (aiData && aiData.length > 0) {
                pool = aiData.filter(q => {
                    const qText = q.question || q.q || "";
                    const opts = q.options || [];
                    return qText.trim().length > 5 && opts.length >= 2;
                }).map(q => {
                    let correctIdx = 0;
                    if (typeof q.answer === 'string' && q.options) {
                        correctIdx = q.options.findIndex(opt => opt.trim() === q.answer.trim());
                        if (correctIdx === -1) correctIdx = 0;
                    } else if (typeof q.correctIndex !== 'undefined') {
                        correctIdx = q.correctIndex;
                    }
                    // [Fix] Shuffle options so correct answer is randomized
                    let finalOptions = q.options || [];
                    let finalAnswerIdx = correctIdx;
                    if (finalOptions.length > 0) {
                        let pairs = finalOptions.map((opt, i) => {
                                let cleanOpt = typeof opt === 'string' ? opt.replace(/^([A-Da-d])[).]\s*/, '').trim() : String(opt);
                                return { opt: cleanOpt, isCorrect: i === correctIdx };
                            });
                        // Fisher-Yates shuffle
                        for (let i = pairs.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
                        }
                        finalOptions = pairs.map(p => p.opt);
                        finalAnswerIdx = pairs.findIndex(p => p.isCorrect);
                    }
                    
                    return { q: q.question || q.q, options: finalOptions, a: finalAnswerIdx };
                });
            }
        } catch(e) {}
    }
    document.getElementById('btn-create-room').textContent = "Create Room";
    
    if (pool.length === 0) { showToast("No questions available for that selection"); return; }

    gameState.topic = course === 'MBA' ? `MBA · ${sem} · ${sub} (${qCount} Qs)` : `${topic} (${qCount} Qs)`;
    gameState.pool = pool;
    gameState.qCount = Math.min(qCount, pool.length);

    initPeer(id => {
        isHost = true;
        players = [{ id: myId, name: myName, score: 0, disconnected: false }];
        gameState.scores[myId] = 0;
        gameState.correctCounts[myId] = 0;

        hideAllScreens(); document.getElementById('screen-lobby').classList.remove('hidden');
        document.getElementById('lobby-topic').textContent = gameState.topic;
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
    broadcast({ type: 'LOBBY_UPDATE', players, topic: gameState.topic });
    if (!document.getElementById('screen-lobby').classList.contains('hidden')) renderPlayers();
    checkAllAnswered();
}

function handleHostData(data, fromId) {
    if (data.type === 'PONG') return;
    if (data.type === 'JOIN') {
        players.push({ id: fromId, name: data.name, score: 0, disconnected: false });
        gameState.scores[fromId] = 0;
        gameState.correctCounts[fromId] = 0;
        broadcast({ type: 'LOBBY_UPDATE', players, topic: gameState.topic });
        renderPlayers();
    }
    if (data.type === 'ANSWER') {
        gameState.currentAnswers[fromId] = { idx: data.idx, elapsed: data.elapsed };
        checkAllAnswered();
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
    if (data.type === 'PING') return;
    if (data.type === 'ERROR') { showToast(data.msg); uiShowWelcome(); }
    if (data.type === 'LOBBY_UPDATE') { players = data.players; gameState.topic = data.topic; document.getElementById('lobby-topic').textContent = data.topic; renderPlayers(); }
    if (data.type === 'START_GAME') { gameState.questions = data.questions; gameState.qCount = data.questions.length; gameState.scores = {}; gameState.correctCounts = {}; players.forEach(p => { gameState.scores[p.id] = 0; gameState.correctCounts[p.id] = 0; }); startGameUI(); }
    if (data.type === 'QUESTION') { showQuestion(data.qIndex, data.question); }
    if (data.type === 'REVEAL') { gameState.scores = data.scores; gameState.correctCounts = data.correctCounts; revealAnswers(data.answers, data.correctIdx); }
    if (data.type === 'END_GAME') { showLeaderboard(); }
}

// ---------- Game flow ----------
function startGame() {
    if (!isHost) return;
    const shuffled = [...gameState.pool].sort(() => 0.5 - Math.random()).slice(0, gameState.qCount);
    gameState.questions = shuffled;
    players.forEach(p => { gameState.scores[p.id] = 0; gameState.correctCounts[p.id] = 0; });
    gameState.qIndex = -1;
    gameState.gameStarted = true;
    broadcast({ type: 'START_GAME', questions: shuffled, topic: gameState.topic });
    startGameUI();
    nextQuestion();
}

function startGameUI() { hideAllScreens(); document.getElementById('screen-game').classList.remove('hidden'); }

function nextQuestion() {
    if (!isHost) return;
    gameState.qIndex++;
    if (gameState.qIndex >= gameState.questions.length) {
        broadcast({ type: 'END_GAME' }); showLeaderboard(); return;
    }
    gameState.currentAnswers = {};
    const q = gameState.questions[gameState.qIndex];
    broadcast({ type: 'QUESTION', qIndex: gameState.qIndex, question: q });
    showQuestion(gameState.qIndex, q);

    clearTimeout(forceRevealTimer);
    forceRevealTimer = setTimeout(() => {
        players.filter(p => !p.disconnected).forEach(p => {
            if (!gameState.currentAnswers[p.id]) gameState.currentAnswers[p.id] = { idx: -1, elapsed: TIME_LIMIT_MS };
        });
        checkAllAnswered();
    }, TIME_LIMIT_MS + 300);
}

function checkAllAnswered() {
    if (!isHost) return;
    const activePlayers = players.filter(p => !p.disconnected);
    if (activePlayers.every(p => gameState.currentAnswers[p.id])) {
        clearTimeout(forceRevealTimer);
        const q = gameState.questions[gameState.qIndex];
        // Score calculation
        activePlayers.forEach(p => {
            const ans = gameState.currentAnswers[p.id];
            if (ans.idx === q.a) {
                gameState.scores[p.id] += 100 + Math.round(100 * (1 - ans.elapsed / TIME_LIMIT_MS));
                gameState.correctCounts[p.id]++;
            }
        });
        broadcast({ type: 'REVEAL', answers: gameState.currentAnswers, correctIdx: q.a, scores: gameState.scores, correctCounts: gameState.correctCounts });
        revealAnswers(gameState.currentAnswers, q.a);
    }
}

function updateLiveScoresUI() {
    const container = document.getElementById('live-scores-container');
    if (!container) return;
    container.innerHTML = players.map(p => `
        <div class="px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 ${p.disconnected ? 'opacity-40' : ''}">
            ${p.id === myId ? 'You' : p.name}: <span class="text-sky-600">${gameState.scores[p.id] || 0}</span>
        </div>
    `).join('');
}

function showQuestion(qIndex, q) {
    myAnswered = false;
    document.getElementById('game-q-num').textContent = `Q ${qIndex + 1}/${gameState.questions.length}`;
    document.getElementById('question-text').textContent = q.q;
    updateLiveScoresUI();
    document.getElementById('answer-feedback').classList.add('hidden');

    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn p-4 text-left font-semibold text-lg';
        btn.textContent = `${letters[i]}. ${opt}`;
        btn.onclick = () => selectOption(i);
        grid.appendChild(btn);
    });

    questionStartTime = Date.now();
    const bar = document.getElementById('timer-bar');
    bar.style.transition = 'none'; bar.style.width = '100%';
    requestAnimationFrame(() => {
        bar.style.transition = `width ${TIME_LIMIT_MS}ms linear`;
        bar.style.width = '0%';
    });

    clearInterval(tickInterval);
    tickInterval = setInterval(() => {
        if (Date.now() - questionStartTime >= TIME_LIMIT_MS) {
            clearInterval(tickInterval);
            if (!myAnswered) lockInAnswer(-1);
        }
    }, 100);
}

function selectOption(idx) {
    if (myAnswered) return;
    document.querySelectorAll('#options-grid .option-btn')[idx].classList.add('selected');
    lockInAnswer(idx);
}

function lockInAnswer(idx) {
    if (myAnswered) return;
    myAnswered = true;
    const elapsed = Math.min(Date.now() - questionStartTime, TIME_LIMIT_MS);
    document.getElementById('answer-feedback').classList.remove('hidden');
    document.getElementById('feedback-text').textContent = idx === -1 ? "Time's up!" : "Answer locked — waiting for others...";
    document.querySelectorAll('#options-grid .option-btn').forEach(b => b.disabled = true);

    if (isHost) {
        gameState.currentAnswers[myId] = { idx, elapsed };
        checkAllAnswered();
    } else {
        if (hostConn && hostConn.open) hostConn.send({ type: 'ANSWER', idx, elapsed });
        if(window.guestWaitTimeout) clearTimeout(window.guestWaitTimeout);
        window.guestWaitTimeout = setTimeout(() => { alert("Host disconnected or game got stuck. Leaving the room."); safeExit(); }, 10 * 1000 + 10000);
        
    }
}

function revealAnswers(answers, correctIdx) {
    if(window.guestWaitTimeout) clearTimeout(window.guestWaitTimeout);
    if(window.guestWaitTimeout) clearTimeout(window.guestWaitTimeout);
    clearInterval(tickInterval);
    const buttons = document.querySelectorAll('#options-grid .option-btn');
    buttons.forEach((b, i) => {
        b.disabled = true;
        if (i === correctIdx) b.classList.add('correct');
    });
    const myAns = answers[myId] || { idx: -1, elapsed: TIME_LIMIT_MS };
    if (myAns.idx !== -1 && myAns.idx !== correctIdx) buttons[myAns.idx].classList.add('wrong');

    document.getElementById('answer-feedback').classList.remove('hidden');
    let msg = "Incorrect";
    if (myAns.idx === -1) {
        msg = "You ran out of time";
    } else if (myAns.idx === correctIdx) {
        // Find fastest time
        let fastest = TIME_LIMIT_MS;
        let isFastest = true;
        Object.keys(answers).forEach(pid => {
            const a = answers[pid];
            if (a.idx === correctIdx && a.elapsed < fastest) fastest = a.elapsed;
        });
        isFastest = myAns.elapsed <= fastest;
        const pts = 100 + Math.round(100 * (1 - myAns.elapsed / TIME_LIMIT_MS));
        msg = `Correct! +${pts} pts${isFastest ? " ⚡ Fastest!" : ""}`;
    }
    document.getElementById('feedback-text').textContent = msg;
    updateLiveScoresUI();

    if (isHost) { clearTimeout(revealTimer); revealTimer = setTimeout(nextQuestion, 2500); }
}

function showLeaderboard() {
    gameState.gameOver = true;
    hideAllScreens(); document.getElementById('screen-leaderboard').classList.remove('hidden');
    const totalQ = gameState.questions.length;
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
                        <p class="text-xs text-slate-500 mt-0.5">✅ ${gameState.correctCounts[p.id]||0} / ${totalQ} correct</p>
                    </div>
                    ${i === 0 && !p.disconnected ? '<i data-lucide="trophy" class="w-4 h-4 text-yellow-500"></i>' : ''}
                </div>
                <span class="font-bold text-slate-900 text-lg">${gameState.scores[p.id]||0} pts</span>
            </div>`;
    }).join('');
    lucide.createIcons();
}

function safeExit() { try { Object.values(guestConns).forEach(c => c.close()); if (hostConn) hostConn.close(); if (peer) peer.destroy(); } catch (e) {} window.location.href = '/games/'; }
window.addEventListener('beforeunload', e => { if (gameState.gameStarted) { e.preventDefault(); e.returnValue = "Leaving will end the game!"; } });

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
