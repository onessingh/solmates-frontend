// State variables
let myName = "";
let peer = null;
let hostConn = null; // If I am a client
let guestConns = {}; // If I am the host
let isHost = false;
let myId = null;
let roomState = {
    players: [],
    questions: [],
    currentQ: 0,
    scores: {},
    correctCounts: {},
    gameOver: false
};
let questionTimer = null;
let timeRemaining = 15;
let answered = false;
let currentSettings = "";

// UI Navigation
function hideAllScreens() {
    document.querySelectorAll('.main-container > div').forEach(el => el.classList.add('hidden'));
}
function uiShowWelcome() { hideAllScreens(); document.getElementById('screen-welcome').classList.remove('hidden'); }
function uiShowCreateRoom() {
    try {
        myName = localStorage.getItem('solmates_nickname');
        if(!myName) {
            myName = prompt("Please enter your nickname:");
            if (!myName) return;
            localStorage.setItem('solmates_nickname', myName);
            document.getElementById('welcome-name').textContent = myName;
            document.getElementById('welcome-avatar').textContent = myName.charAt(0).toUpperCase();
        }
    } catch(e) {
        myName = "Player";
    }
    hideAllScreens();
    document.getElementById('screen-create').classList.remove('hidden');
    populateSemesters();
}
function uiShowJoinRoom() {
    try {
        myName = localStorage.getItem('solmates_nickname');
        if(!myName) {
            myName = prompt("Please enter your nickname:");
            if (!myName) return;
            localStorage.setItem('solmates_nickname', myName);
            document.getElementById('welcome-name').textContent = myName;
            document.getElementById('welcome-avatar').textContent = myName.charAt(0).toUpperCase();
        }
    } catch(e) {
        myName = "Player";
    }
    hideAllScreens();
    document.getElementById('screen-join').classList.remove('hidden');
}

// Form Population
function populateSemesters() {
    const sel = document.getElementById('select-semester');
    sel.innerHTML = '<option value="">Choose Semester...</option>';
    if (QUIZ_DATA.structure["MBA"]) {
        Object.keys(QUIZ_DATA.structure["MBA"]).forEach(s => {
            sel.innerHTML += `<option value="${s}">${s}</option>`;
        });
    }
}
function updateSubjects() {
    const sem = document.getElementById('select-semester').value;
    const subDiv = document.getElementById('subject-container');
    const sel = document.getElementById('select-subject');
    
    if (sem && QUIZ_DATA.structure["MBA"][sem]) {
        subDiv.classList.remove('hidden');
        sel.innerHTML = '<option value="All">All Subjects (Mixed)</option>';
        QUIZ_DATA.structure["MBA"][sem].forEach(sub => {
            let cleanSub = sub.replace(/\[.*?\] /, "");
            sel.innerHTML += `<option value="${cleanSub}">${sub}</option>`;
        });
    } else {
        subDiv.classList.add('hidden');
    }
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

// PeerJS Networking
function initPeer(onOpen) {
    // Generate a clean 6-digit alphanumeric ID for the room
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    peer = new Peer('SOLMATES-' + id, {
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
    peer.on('open', (id) => {
        myId = id;
        onOpen(id);
    });
    peer.on('error', (err) => {
        console.error(err);
        if (err.type === 'peer-unavailable') {
            showToast("Room not found or host disconnected.");
        } else if (err.type === 'network' || err.type === 'disconnected') {
            showToast("Network lost. Auto-reconnecting...");
        } else {
            showToast("Connection error: " + err.type);
        }
    });
}

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
    
    const qCount = parseInt(document.getElementById('select-q-count').value || "10", 10);
    
    currentSettings = course === 'MBA' ? `MBA - ${sem} - ${sub} (${qCount} Qs)` : `${topic} (${qCount} Qs)`;
    roomState.maxQs = qCount;
    
    // 1. Build Static Fallback Pool
    let subjects = (sub === 'All') ? QUIZ_DATA.structure["MBA"][sem] : [sub];
    let fallbackPool = [];
    subjects.forEach(s => { if (QUIZ_DATA.questionBank[s]) fallbackPool = fallbackPool.concat(QUIZ_DATA.questionBank[s]); });
    
    // 2. Try fetching from AI Connector (AI -> Offline -> Static Fallback)
    let finalPool = fallbackPool;
    if (window.aiGameConnector) {
        try {
            document.getElementById('btn-create-room').textContent = "Generating AI Questions...";
            const aiData = await window.aiGameConnector.getQuestions('quiz-battle', topic, qCount + 5, fallbackPool);
            
            // Map AI output to game expected format (q: text, options: [], a: index)
            if (aiData && aiData.length > 0) {
                finalPool = aiData.filter(q => {
                    const qText = q.question || q.q || "";
                    const opts = q.options || [];
                    return qText.trim().length > 5 && opts.length >= 2;
                }).map(q => {
                    // Check if AI gave 'answer' string instead of index
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
        } catch(e) {
            console.error("AI Fallback Error", e);
        }
    }
    document.getElementById('btn-create-room').textContent = "Create Room";

    if (finalPool.length === 0) { alert("No questions available for this selection."); return; }
    
    roomState.pool = finalPool;

    initPeer((id) => {
        isHost = true;
        roomState.players.push({ id: myId, name: myName, score: 0, disconnected: false });
        roomState.correctCounts[myId] = 0;
        
        hideAllScreens();
        document.getElementById('screen-lobby').classList.remove('hidden');
        document.getElementById('lobby-topic').textContent = currentSettings;
        
        const url = new URL(window.location.href);
        url.searchParams.set('room', id);
        document.getElementById('invite-link').textContent = url.toString();
        
        document.getElementById('btn-start-game').classList.remove('hidden');
        renderLobby();
        
        // Listen for incoming connections
        peer.on('connection', (conn) => {
            if(roomState.gameOver) { conn.on('open', () => { conn.send({ type: 'ERROR', msg: 'This game has already ended. Please create a new room.' }); setTimeout(() => conn.close(), 500); }); return; }
            if(roomState.players.length >= 4) {
                conn.on('open', () => { conn.send({ type: 'ERROR', msg: 'Room is full' }); setTimeout(()=>conn.close(), 500); });
                return;
            }
            
            conn.on('data', (data) => {
                if(data.type === 'JOIN') {
                    guestConns[conn.peer] = conn;
                    roomState.players.push({ id: conn.peer, name: data.name, score: 0, disconnected: false });
                    roomState.correctCounts[conn.peer] = 0;
                    broadcast({ type: 'LOBBY_UPDATE', players: roomState.players, topic: currentSettings });
                    renderLobby();
                } else if(data.type === 'ANSWER') {
                    handleGuestAnswer(conn.peer, data.answerIdx, data.timeLeft);
                }
            });
            conn.on('close', () => {
                const p = roomState.players.find(pl => pl.id === conn.peer);
                if (p) { p.disconnected = true; showToast(`${p.name} disconnected`); }
                delete guestConns[conn.peer];
                broadcast({ type: 'LOBBY_UPDATE', players: roomState.players, topic: currentSettings });
                if (!document.getElementById('screen-lobby').classList.contains('hidden')) renderLobby();
            });
        });
    });
}

function joinViaUrl() {
    myName = localStorage.getItem('solmates_nickname');
    if(!myName) {
        myName = prompt("Please enter your nickname:");
        if (!myName) return;
        localStorage.setItem('solmates_nickname', myName);
    }
    const url = new URL(window.location.href);
    const roomId = url.searchParams.get('room');
    if(roomId) connectToHost(roomId);
}

function manualJoinRoom() {
    let input = document.getElementById('room-code-input').value.trim();
    if(!input) return;
    
    // Extract ID if URL pasted
    if(input.includes('?room=')) {
        input = new URL(input).searchParams.get('room');
    } else if(!input.startsWith('SOLMATES-')) {
        input = 'SOLMATES-' + input;
    }
    document.getElementById('join-status').classList.remove('hidden');
    connectToHost(input);
}

function connectToHost(hostId) {
    initPeer((id) => {
        isHost = false;
        hostConn = peer.connect(hostId);
        
        hostConn.on('open', () => {
            hostConn.send({ type: 'JOIN', name: myName });
            hideAllScreens();
            document.getElementById('screen-lobby').classList.remove('hidden');
            document.getElementById('wait-host-msg').classList.remove('hidden');
            document.getElementById('invite-box').classList.add('hidden');
        });
        
        hostConn.on('data', (data) => {
            if(data.type === 'ERROR') {
                alert(data.msg);
                location.reload();
            } else if(data.type === 'LOBBY_UPDATE') {
                roomState.players = data.players;
                document.getElementById('lobby-topic').textContent = data.topic;
                renderLobby();
            } else if(data.type === 'START_GAME') {
                startGameUI();
            } else if(data.type === 'QUESTION') {
                renderQuestion(data.question, data.qNum, data.totalQ);
            } else if(data.type === 'RESULT') {
                roomState.correctCounts = data.correctCounts || {};
                showResult(data.correctIdx, data.scores);
            } else if(data.type === 'GAME_OVER') {
                roomState.correctCounts = data.correctCounts || {};
                showLeaderboard(data.scores);
            }
        });
        
        hostConn.on('close', () => {
            showToast("Host left the room.");
        });
    });
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    if(!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => toast.classList.add('show'));
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function broadcast(data) {
    Object.values(guestConns).forEach(conn => conn.send(data));
}

function renderLobby() {
    document.getElementById('player-count').textContent = roomState.players.length;
    const list = document.getElementById('players-list');
    list.innerHTML = '';
    roomState.players.forEach(p => {
        list.innerHTML += `<div class="bg-white p-3 rounded-lg border border-slate-200 font-bold shadow-sm">${p.name} ${p.id === myId ? '(You)' : ''}</div>`;
    });
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

// Game Logic
function startGame() {
    if(!isHost) return;
    
    // Use the pool that was already built in createRoom()
    const pool = roomState.pool || [];
    if (pool.length === 0) { alert("No questions found. Please create a new room."); return; }
    
    const qCount = roomState.maxQs || 10;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    roomState.questions = shuffled.slice(0, Math.min(qCount, shuffled.length));
    roomState.currentQ = 0;
    
    broadcast({ type: 'START_GAME' });
    startGameUI();
    
    setTimeout(sendNextQuestion, 2000);
}

function startGameUI() {
    hideAllScreens();
    document.getElementById('screen-game').classList.remove('hidden');
    document.getElementById('question-text').textContent = "Get Ready...";
    document.getElementById('options-grid').innerHTML = '';
}

function sendNextQuestion() {
    if(roomState.currentQ >= roomState.questions.length) {
        broadcast({ type: 'GAME_OVER', scores: roomState.scores, correctCounts: roomState.correctCounts });
        showLeaderboard(roomState.scores);
        return;
    }
    
    const q = roomState.questions[roomState.currentQ];
    // Reset host answers tracking
    roomState.currentAnswers = {};
    
    const qData = {
        question: { q: q.q, options: q.options },
        qNum: roomState.currentQ + 1,
        totalQ: roomState.questions.length
    };
    
    broadcast({ type: 'QUESTION', ...qData });
    renderQuestion(qData.question, qData.qNum, qData.totalQ);
    
    // Host internal timer
    let ticks = 15;
    const t = setInterval(() => {
        ticks--;
        if(ticks <= 0) {
            clearInterval(t);
            resolveQuestion();
        } else if(Object.keys(roomState.currentAnswers).length === roomState.players.filter(p => !p.disconnected).length) {
            // Everyone answered
            clearInterval(t);
            setTimeout(resolveQuestion, 1000);
        }
    }, 1000);
}

function renderQuestion(q, qNum, totalQ) {
    answered = false;
    document.getElementById('game-q-num').textContent = `Q ${qNum}/${totalQ}`;
    document.getElementById('question-text').textContent = q.q;
    
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, idx) => {
        grid.innerHTML += `<button id="opt-${idx}" class="option-btn p-4 rounded-xl text-left font-semibold text-lg" onclick="submitAnswer(${idx})">${letters[idx]}. ${opt}</button>`;
    });
    
    document.getElementById('answer-feedback').classList.add('hidden');
    
    // Visual Timer
    timeRemaining = 15;
    document.getElementById('game-timer').textContent = "15s";
    const bar = document.getElementById('timer-bar');
    bar.style.width = '100%';
    
    if(questionTimer) clearInterval(questionTimer);
    questionTimer = setInterval(() => {
        timeRemaining--;
        document.getElementById('game-timer').textContent = timeRemaining + "s";
        bar.style.width = `${(timeRemaining/15)*100}%`;
        if(timeRemaining <= 0) clearInterval(questionTimer);
    }, 1000);
}

function submitAnswer(idx) {
    if(answered) return;
    answered = true;
    clearInterval(questionTimer);
    
    document.getElementById(`opt-${idx}`).classList.add('selected');
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
    
    document.getElementById('answer-feedback').classList.remove('hidden');
    document.getElementById('feedback-text').textContent = "Waiting for others...";
    document.getElementById('feedback-text').className = "text-xl font-bold text-slate-400";
    
    if(isHost) {
        handleGuestAnswer(myId, idx, timeRemaining);
    } else {
        hostConn.send({ type: 'ANSWER', answerIdx: idx, timeLeft: timeRemaining });
        if(window.guestWaitTimeout) clearTimeout(window.guestWaitTimeout);
        window.guestWaitTimeout = setTimeout(() => { alert("Host disconnected or game got stuck. Leaving the room."); safeExit(); }, (timeRemaining + 15) * 1000);
                window.guestWaitTimeout = setTimeout(() => { alert("Host disconnected or game got stuck. Leaving the room."); safeExit(); }, (timeRemaining + 15) * 1000);
    }
}

function handleGuestAnswer(playerId, idx, timeLeft) {
    roomState.currentAnswers[playerId] = { idx, time: timeLeft };
}

function resolveQuestion() {
    const q = roomState.questions[roomState.currentQ];
    const correctIdx = q.a;
    
    // Calculate points
    roomState.players.forEach(p => {
        const ans = roomState.currentAnswers[p.id];
        if(!roomState.scores[p.id]) roomState.scores[p.id] = 0;
        if(!roomState.correctCounts[p.id]) roomState.correctCounts[p.id] = 0;
        
        if(ans && ans.idx === correctIdx) {
            roomState.scores[p.id] += (100 + (ans.time * 10));
            roomState.correctCounts[p.id]++;
        }
    });
    
    const resData = { correctIdx, scores: roomState.scores, correctCounts: roomState.correctCounts };
    broadcast({ type: 'RESULT', ...resData });
    showResult(resData.correctIdx, resData.scores);
    
    roomState.currentQ++;
    setTimeout(sendNextQuestion, 4000);
}

function showResult(correctIdx, scores) {
    if(window.guestWaitTimeout) clearTimeout(window.guestWaitTimeout);
    if(window.guestWaitTimeout) clearTimeout(window.guestWaitTimeout);
    if(questionTimer) clearInterval(questionTimer);
    document.querySelectorAll('.option-btn').forEach((btn, idx) => {
        btn.disabled = true;
        if(idx === correctIdx) {
            btn.classList.add('correct');
        } else if(btn.classList.contains('selected')) {
            btn.classList.add('wrong');
        }
    });
    
    const fb = document.getElementById('answer-feedback');
    const fbt = document.getElementById('feedback-text');
    fb.classList.remove('hidden');
    
    const myScore = scores[myId] || 0;
    
    if(document.getElementById(`opt-${correctIdx}`).classList.contains('selected')) {
        fbt.textContent = `Correct! Total Score: ${myScore}`;
        fbt.className = "text-xl font-bold text-green-400";
    } else {
        fbt.textContent = `Wrong! Total Score: ${myScore}`;
        fbt.className = "text-xl font-bold text-red-400";
    }
}

function showLeaderboard(scores) {
    roomState.gameOver = true;
    hideAllScreens();
    document.getElementById('screen-leaderboard').classList.remove('hidden');
    
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';
    const totalQ = roomState.questions.length;
    
    // Sort players by score; disconnected go to bottom
    const sorted = [...roomState.players].sort((a,b) => {
        if (a.disconnected && !b.disconnected) return 1;
        if (!a.disconnected && b.disconnected) return -1;
        return (scores[b.id]||0) - (scores[a.id]||0);
    });
    
    sorted.forEach((p, idx) => {
        const isMe = p.id === myId;
        const correct = roomState.correctCounts[p.id] || 0;
        const borderCls = idx === 0 ? 'border-yellow-300 bg-yellow-50' : (isMe ? 'border-sky-200 bg-sky-50' : 'border-slate-200 bg-white');
        list.innerHTML += `
            <div class="p-4 rounded-xl border ${borderCls} flex items-center justify-between shadow-sm ${p.disconnected ? 'opacity-50' : ''}">
                <div class="flex items-center gap-3">
                    <span class="font-bold text-slate-400">#${idx+1}</span>
                    <div>
                        <p class="font-bold text-slate-800">${p.name}${isMe ? ' (You)' : ''}${p.disconnected ? ' 🔌' : ''}</p>
                        <p class="text-xs text-slate-500 mt-0.5">✅ ${correct} / ${totalQ} correct</p>
                    </div>
                    ${idx===0 && !p.disconnected ? '<span class="text-yellow-500">🏆</span>' : ''}
                </div>
                <span class="font-bold text-slate-900 text-lg">${scores[p.id] || 0} pts</span>
            </div>
        `;
    });
}

// Prevent accidental reloads destroying the P2P connection
let allowExit = false;
window.addEventListener('beforeunload', (e) => {
    if (!allowExit && ((isHost && roomState.players.length > 0) || (!isHost && hostConn && hostConn.open))) {
        e.preventDefault();
        e.returnValue = "Leaving this page will disconnect you from the game!";
        return e.returnValue;
    }
});

function safeExit() {
    allowExit = true;
    window.location.href = "/games/";
}

// Auto-check URL on load
window.onload = () => {
    const url = new URL(window.location.href);
    if(url.searchParams.get('room')) {
        document.getElementById('url-join-box').classList.remove('hidden');
    }
};
