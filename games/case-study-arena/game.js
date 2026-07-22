// ===== Case Study Arena — multiplayer logic =====
const ROOM_PREFIX = 'SOLMATES-CS-';
const TIME_LIMIT_MS = 15000;

let peer = null, hostConn = null, isHost = false, myId = null;
let myName = "Player";
try { myName = localStorage.getItem('solmates_nickname') || "Player"; } catch (e) {}
let pendingRoomCode = null;

let players = [];
let guestConns = {};

let gameState = {
    topic: '', caseData: null, qIndex: -1,
    scores: {}, correctCounts: {}, currentAnswers: {},
    gameStarted: false, gameOver: false, readStatus: {}
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
function hideAllScreens() { ['screen-welcome', 'screen-create', 'screen-join', 'screen-lobby', 'screen-case-read', 'screen-game', 'screen-leaderboard'].forEach(id => document.getElementById(id).classList.add('hidden')); }
function uiShowWelcome() { hideAllScreens(); document.getElementById('screen-welcome').classList.remove('hidden'); }
function uiShowCreateRoom() { hideAllScreens(); document.getElementById('screen-create').classList.remove('hidden'); populateSemesters(); }
function uiShowJoinRoom() { hideAllScreens(); document.getElementById('screen-join').classList.remove('hidden'); }

function populateSemesters() {
    const sel = document.getElementById('select-semester');
    sel.innerHTML = '<option value="">Choose Semester...</option>';
    if (typeof QUIZ_DATA !== 'undefined' && QUIZ_DATA.structure["MBA"]) {
        Object.keys(QUIZ_DATA.structure["MBA"]).forEach(s => sel.innerHTML += `<option value="${s}">${s}</option>`);
    }
}

function updateSubjects() {
    const sem = document.getElementById('select-semester').value;
    const subjSel = document.getElementById('select-subject');
    const subjContainer = document.getElementById('subject-container');
    subjSel.innerHTML = '<option value="All">All MBA Subjects (Mixed)</option>';
    if (sem && typeof QUIZ_DATA !== 'undefined' && QUIZ_DATA.structure["MBA"][sem]) {
        QUIZ_DATA.structure["MBA"][sem].forEach(subj => { const opt = document.createElement('option'); opt.value = subj; opt.textContent = subj; subjSel.appendChild(opt); });
        subjContainer.classList.remove('hidden');
    } else { subjContainer.classList.add('hidden'); }
}



(function checkUrlInvite() {
    const room = new URLSearchParams(window.location.search).get('room');
    if (room) { pendingRoomCode = room.toUpperCase(); window.addEventListener('DOMContentLoaded', () => document.getElementById('url-join-box').classList.remove('hidden')); }
})();
function joinViaUrl() { if (!pendingRoomCode) return; document.getElementById('room-code-input').value = pendingRoomCode; uiShowJoinRoom(); manualJoinRoom(); }

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
    const sem = document.getElementById('select-semester').value;
    if(!sem) { showToast("Please select a semester first"); return; }
    const topic = document.getElementById('select-subject').value || "All";
    
    // Pick dummy case as fallback if AI fails
    let caseItem = {
        title: "Default Case Study",
        scenario: "The AI failed to generate a case study. Here is a generic scenario for you to analyze.",
        questions: [{ q: "What is the most important factor?", options: ["Cost", "Quality", "Speed", "Ethics"], a: 3 }]
    };

    if (window.aiGameConnector) {
        try {
            document.getElementById('btn-create-room').textContent = "Generating Case Study...";
            const aiData = await window.aiGameConnector.getQuestions('case-study-arena', topic, 4, []);
            // AI returns an array of questions, sometimes with 'scenario' instead of 'question'
            if (aiData && Array.isArray(aiData) && aiData.length > 0) {
                // If the first item has a 'scenario' or 'description', use it
                const mainScenario = aiData[0].scenario || aiData[0].case_study || aiData[0].caseStudy || aiData[0].description || "Analyze the following business situations and answer the questions carefully.";
                
                caseItem = {
                    title: `${topic.toUpperCase()} - Case Analysis`,
                    scenario: mainScenario,
                    questions: aiData.map(q => {
                                                let correctIdx = 0;
                        if (typeof q.answer === 'string' && q.options) {
                            if (q.answer.length === 1) {
                                correctIdx = q.answer.toUpperCase().charCodeAt(0) - 65;
                            } else {
                                correctIdx = q.options.findIndex(opt => opt.trim() === q.answer.trim());
                            }
                        } else if (typeof q.correctIndex !== 'undefined') {
                            correctIdx = q.correctIndex;
                        }
                        if (correctIdx < 0 || correctIdx > 3) correctIdx = 0;
                        
                        // Clean up options (remove A), B), C), D) prefixes)
                        let cleanOptions = (q.options || ["Option 1", "Option 2", "Option 3", "Option 4"]).map(opt => {
                            return opt.replace(/^[A-D][\)\.]\s*/i, '').trim();
                        });
                        
                        // Pad options if less than 4
                        while(cleanOptions.length < 4) cleanOptions.push("None of the above");
                        cleanOptions = cleanOptions.slice(0, 4);

                        // Shuffle options and track the correct one
                        const correctText = cleanOptions[correctIdx];
                        for (let i = cleanOptions.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [cleanOptions[i], cleanOptions[j]] = [cleanOptions[j], cleanOptions[i]];
                        }
                        
                        // Find the new index of the correct answer
                        correctIdx = cleanOptions.indexOf(correctText);
                        
                        let qText = q.question || q.q || "What is the best approach here?";
                        
                        return { 
                            q: qText, 
                            options: cleanOptions, 
                            a: correctIdx 
                        };
                    })
                };
            } else if (aiData && aiData.title && aiData.scenario && aiData.questions) {
                caseItem = {
                    title: aiData.title,
                    scenario: aiData.scenario,
                    questions: aiData.questions.map(q => {
                        let correctIdx = 0;
                        if (typeof q.answer === 'string' && q.options) {
                            if (q.answer.length === 1) {
                                correctIdx = q.answer.charCodeAt(0) - 65;
                            } else {
                                correctIdx = q.options.findIndex(opt => opt.trim() === q.answer.trim());
                            }
                            if(correctIdx < 0 || correctIdx > 3) correctIdx = 0;
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
                            for (let i = pairs.length - 1; i > 0; i--) {
                                const j = Math.floor(Math.random() * (i + 1));
                                [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
                            }
                            finalOptions = pairs.map(p => p.opt);
                            finalAnswerIdx = pairs.findIndex(p => p.isCorrect);
                        }
                        return { q: q.question || q.q, options: finalOptions, a: finalAnswerIdx };
                    })
                };
            }
        } catch(e) {}
    }

    document.getElementById('btn-create-room').textContent = "Create Room";
    gameState.topic = topic.toUpperCase();
    gameState.caseData = caseItem;

    initPeer(id => {
        isHost = true;
        players = [{ id: myId, name: myName, score: 0, disconnected: false }];
        gameState.scores[myId] = 0;
        gameState.correctCounts[myId] = 0;
        gameState.readStatus[myId] = false;

        hideAllScreens(); document.getElementById('screen-lobby').classList.remove('hidden');
        document.getElementById('lobby-topic').textContent = `${gameState.topic} Case Study`;
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
    
    // Check if we were waiting for them
    checkAllReady();
    checkAllAnswered();
}

function handleHostData(data, fromId) {
    if (data.type === 'PONG') return;
    if (data.type === 'JOIN') {
        players.push({ id: fromId, name: data.name, score: 0, disconnected: false });
        gameState.scores[fromId] = 0;
        gameState.correctCounts[fromId] = 0;
        gameState.readStatus[fromId] = false;
        broadcast({ type: 'LOBBY_UPDATE', players, topic: gameState.topic });
        renderPlayers();
    }
    if (data.type === 'READY') {
        gameState.readStatus[fromId] = true;
        checkAllReady();
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
    if (data.type === 'LOBBY_UPDATE') { players = data.players; gameState.topic = data.topic; document.getElementById('lobby-topic').textContent = `${data.topic} Case Study`; renderPlayers(); }
    if (data.type === 'START_GAME') { gameState.caseData = data.caseData; gameState.scores = {}; gameState.correctCounts = {}; players.forEach(p => { gameState.scores[p.id] = 0; gameState.correctCounts[p.id] = 0; }); startReadPhase(); }
    if (data.type === 'READY_STATUS') { updateReadyStatus(data.readyCount, data.total); }
    if (data.type === 'QUESTION') { showQuestion(data.qIndex, data.question); }
    if (data.type === 'REVEAL') { gameState.scores = data.scores; gameState.correctCounts = data.correctCounts; revealAnswers(data.answers, data.correctIdx); }
    if (data.type === 'END_GAME') { showLeaderboard(); }
}

// ---------- Game flow ----------
function startGame() {
    if (!isHost) return;
    players.forEach(p => { gameState.scores[p.id] = 0; gameState.correctCounts[p.id] = 0; gameState.readStatus[p.id] = false; });
    gameState.qIndex = -1;
    gameState.gameStarted = true;
    broadcast({ type: 'START_GAME', caseData: gameState.caseData });
    startReadPhase();
}

function startReadPhase() {
    hideAllScreens();
    document.getElementById('screen-case-read').classList.remove('hidden');
    document.getElementById('case-title').textContent = gameState.caseData.title;
    document.getElementById('case-scenario').textContent = gameState.caseData.scenario;
    document.getElementById('btn-ready').classList.remove('hidden');
    document.getElementById('ready-status').textContent = "";
}

function markReady() {
    document.getElementById('btn-ready').classList.add('hidden');
    document.getElementById('ready-status').textContent = "Waiting for others to finish reading...";
    if (isHost) {
        gameState.readStatus[myId] = true;
        checkAllReady();
    } else {
        if (hostConn && hostConn.open) hostConn.send({ type: 'READY' });
    }
}

function checkAllReady() {
    if (!isHost) return;
    const active = players.filter(p => !p.disconnected);
    const readyCount = active.filter(p => gameState.readStatus[p.id]).length;
    broadcast({ type: 'READY_STATUS', readyCount, total: active.length });
    updateReadyStatus(readyCount, active.length);
    if (readyCount >= active.length && active.length > 0) {
        setTimeout(nextQuestion, 1000);
    }
}

function updateReadyStatus(readyCount, total) {
    if (document.getElementById('btn-ready').classList.contains('hidden')) {
        document.getElementById('ready-status').textContent = `${readyCount}/${total} players ready...`;
    }
}

function nextQuestion() {
    if (!isHost) return;
    gameState.qIndex++;
    if (gameState.qIndex >= gameState.caseData.questions.length) {
        broadcast({ type: 'END_GAME' }); showLeaderboard(); return;
    }
    gameState.currentAnswers = {};
    const q = gameState.caseData.questions[gameState.qIndex];
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
    const active = players.filter(p => !p.disconnected);
    if (active.every(p => gameState.currentAnswers[p.id])) {
        clearTimeout(forceRevealTimer);
        const q = gameState.caseData.questions[gameState.qIndex];
        
        active.forEach(p => {
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
            ${p.id === myId ? 'You' : p.name}: <span class="text-indigo-600">${gameState.scores[p.id] || 0}</span>
        </div>
    `).join('');
}

function showQuestion(qIndex, q) {
    hideAllScreens(); document.getElementById('screen-game').classList.remove('hidden');
    myAnswered = false;
    document.getElementById('game-q-num').textContent = `Q ${qIndex + 1}/${gameState.caseData.questions.length}`;
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

    if (isHost) { clearTimeout(revealTimer); revealTimer = setTimeout(nextQuestion, 3000); }
}

function showLeaderboard() {
    gameState.gameOver = true;
    hideAllScreens(); document.getElementById('screen-leaderboard').classList.remove('hidden');
    const totalQ = gameState.caseData.questions.length;
    const sorted = [...players].sort((a,b) => {
        if (a.disconnected && !b.disconnected) return 1;
        if (!a.disconnected && b.disconnected) return -1;
        return (gameState.scores[b.id]||0) - (gameState.scores[a.id]||0);
    });
    
    document.getElementById('leaderboard-list').innerHTML = sorted.map((p, i) => {
        const isMe = p.id === myId;
        const borderCls = i === 0 ? 'border-yellow-300 bg-yellow-50' : (isMe ? 'border-indigo-200 bg-indigo-50' : 'border-slate-200 bg-white');
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
