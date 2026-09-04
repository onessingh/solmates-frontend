
// Player Profile modal â€” identical card/flow to the one on the /games/ hub, shown immediately
// on page load for first-time visitors (including invite-link opens), not just when Join is
// clicked. Uses the same shared profanity filter (/js/profanity.js) as the hub.
function containsProfanity(text) {
    if (window.solmatesCheckProfanity) return window.solmatesCheckProfanity(text);
    return false;
}
function hasInvalidChars(text) {
    if (window.solmatesHasInvalidChars) return window.solmatesHasInvalidChars(text);
    return /[*#$!^%~@?&]/.test(text);
}
function openProfileModal() {
    document.getElementById('profile-modal').classList.add('active');
    const saved = localStorage.getItem('solmates_nickname');
    if (saved) document.getElementById('nickname-input').value = saved;
}
function saveProfile() {
    const name = document.getElementById('nickname-input').value.trim();
    const err = document.getElementById('profanity-error');
    if (!name) { err.textContent = "Please enter a name."; err.style.display = 'block'; return; }
    if (hasInvalidChars(name)) {
        err.textContent = "Characters like * # $ ! ^ % ~ @ ? & are not allowed.";
        err.style.display = 'block';
        return;
    }
    if (containsProfanity(name)) {
        err.textContent = "Please choose a clean and appropriate nickname.";
        err.style.display = 'block';
        return;
    }
    err.style.display = 'none';
    localStorage.setItem('solmates_nickname', name);
    if (typeof myName !== 'undefined') myName = name;
    myName = name;
    const welcomeName = document.getElementById('welcome-name');
    const welcomeAvatar = document.getElementById('welcome-avatar');
    if (welcomeName) welcomeName.textContent = name;
    if (welcomeAvatar) welcomeAvatar.textContent = name.charAt(0).toUpperCase();
    document.getElementById('profile-modal').classList.remove('active');
}

// State variables
let myName = "Player";
try { myName = localStorage.getItem('solmates_nickname') || "Player"; } catch(e) {}
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

// Force the profile modal open immediately if there's no saved nickname yet â€” this covers
// someone opening an invite link directly, not just clicking Create/Join Room.
if (!localStorage.getItem('solmates_nickname')) {
    document.addEventListener('DOMContentLoaded', openProfileModal);
}

// UI Navigation
function hideAllScreens() {
    document.querySelectorAll('.main-container > div').forEach(el => el.classList.add('hidden'));
}
function uiShowWelcome() { hideAllScreens(); document.getElementById('screen-welcome').classList.remove('hidden'); }
function uiShowCreateRoom() {
    myName = localStorage.getItem('solmates_nickname');
    if (!myName) { openProfileModal(); return; }
    hideAllScreens();
    document.getElementById('screen-create').classList.remove('hidden');
    populateSemesters();
}
function uiShowJoinRoom() {
    myName = localStorage.getItem('solmates_nickname');
    if (!myName) { openProfileModal(); return; }
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
function initPeer(onOpen, forceId) {
    const id = forceId || Math.random().toString(36).substring(2, 8).toUpperCase();
    peer = new Peer('SOLMATES-' + id, {
        debug: 1,
        config: {
            'iceServers': [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302' },
                { urls: 'turn:openrelay.metered.ca:80', username: 'openrelayproject', credential: 'openrelayproject' },
                { urls: 'turn:openrelay.metered.ca:443', username: 'openrelayproject', credential: 'openrelayproject' },
                { urls: 'turn:openrelay.metered.ca:443?transport=tcp', username: 'openrelayproject', credential: 'openrelayproject' },
                { urls: 'turn:relay.metered.ca:80', username: 'e8dd65f9e29d966b7a7eb7de', credential: 'uY+/7DqCPHyGsUP/' },
                { urls: 'turn:relay.metered.ca:443', username: 'e8dd65f9e29d966b7a7eb7de', credential: 'uY+/7DqCPHyGsUP/' },
                { urls: 'turn:relay.metered.ca:443?transport=tcp', username: 'e8dd65f9e29d966b7a7eb7de', credential: 'uY+/7DqCPHyGsUP/' }
            ]
        }
    });

    setInterval(() => {
        if (!isHost) return;
        // STATE_SYNC: keep guests in sync even if earlier messages were dropped.
        // Include the actual questions (not just gameStarted) so a guest who missed
        // both START_GAME and BACKUP_QUESTIONS can still recover automatically.
        const syncData = { type: 'STATE_SYNC', players: roomState.players, topic: currentSettings, gameStarted: roomState.gameStarted || false, scores: roomState.scores, correctCounts: roomState.correctCounts, questions: roomState.questions };
        broadcast(syncData);
    }, 3000);

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
    peer.on('network_state', (state) => {
        if (!isHost) return;
        const btn = document.getElementById('btn-start-game');
        if (state.online) {
            if (btn) {
                btn.disabled = false;
                btn.textContent = "Start Game";
                btn.style.opacity = '1';
            }
        } else {
            if (btn) {
                btn.disabled = true;
                btn.textContent = "Reconnecting to server...";
                btn.style.opacity = '0.5';
            }
            showToast("Network dropped. Reconnecting...", 3000);
        }
    });
}

async function createRoom() {
    const course = document.getElementById('select-course').value;
    let sem = '', sub = 'All', topic = '';
    
    if (course === 'MBA') {
        sem = document.getElementById('select-semester').value;
        if(!sem) { window.SolmatesModal.alert("Select a semester", "Please choose your semester before creating the room."); return; }
        sub = document.getElementById('select-subject') ? (document.getElementById('select-subject').value || "All") : "All";
        
        if (sub === 'All' && window.QUIZ_DATA && window.QUIZ_DATA.structure && window.QUIZ_DATA.structure["MBA"] && window.QUIZ_DATA.structure["MBA"][sem]) {
            topic = "MBA " + sem + " Covering exactly: " + window.QUIZ_DATA.structure["MBA"][sem].join(", ");
        } else if (sub === 'All') {
            topic = "MBA " + sem + " all subjects";
        } else {
            topic = sub;
        }
    } else {
        const diff = document.getElementById('select-difficulty').value;
        topic = course + " (" + diff + " difficulty)";
        sub = topic;
    }
    
    const qCount = parseInt(document.getElementById('select-q-count').value || "10", 10);
    
    currentSettings = course === 'MBA' ? `MBA - ${sem} - ${sub} (${qCount} Qs)` : `${topic} (${qCount} Qs)`;
    roomState.maxQs = qCount;
    
    // 1. Build Static Fallback Pool (MBA only â€” other courses rely on AI)
    let fallbackPool = [];
    if (course === 'MBA') {
        let subjects = (sub === 'All') ? (QUIZ_DATA.structure && QUIZ_DATA.structure['MBA'] && QUIZ_DATA.structure['MBA'][sem] ? QUIZ_DATA.structure['MBA'][sem] : []) : [sub];
        subjects.forEach(s => { if (QUIZ_DATA.questionBank && QUIZ_DATA.questionBank[s]) fallbackPool = fallbackPool.concat(QUIZ_DATA.questionBank[s]); });
    }
    
    // 2. Try fetching from AI Connector (AI -> Offline -> Static Fallback)
    let finalPool = [...fallbackPool];
    if (window.aiGameConnector) {
        try {
            document.getElementById('btn-create-room').textContent = "Generating AI Questions...";
            const aiData = await window.aiGameConnector.getQuestions('quiz-battle', topic, qCount + 5, fallbackPool);
            
            // Map AI output to game expected format (q: text, options: [], a: index)
            if (aiData && aiData.length > 0) {
                finalPool = aiData.map(q => {
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

    // Last resort: direct chatbot API call if both static pool + AI connector failed
    if (finalPool.length === 0) {
        try {
            document.getElementById('btn-create-room').textContent = "AI Generating...";
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiBase = window.PRODUCTION_API_URL || (isLocal ? 'http://localhost:3000/api' : 'https://solmates-backend-w27e.onrender.com/api');
            const directPrompt = `[SYSTEM_OVERRIDE] Generate ${qCount} multiple choice quiz questions for the topic: "${topic}". Return ONLY a valid JSON array: [{"question": "...", "options": ["option A", "option B", "option C", "option D"], "answer": "correct option text here"}, ...]`;
            const res = await fetch(apiBase + '/chatbot', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({message: directPrompt, history: []}) });
            const data = await res.json();
            const rawText = data.message || data.response || data.reply || '';
            const match = rawText.match(/\[\s*\{[\s\S]*?\}\s*\]/);
            if (match) {
                const parsed = JSON.parse(match[0]);
                if (parsed && parsed.length > 0) {
                    finalPool = parsed.map(q => {
                        let correctIdx = q.options ? q.options.findIndex(o => String(o).trim() === String(q.answer || '').trim()) : 0;
                        if (correctIdx === -1) correctIdx = 0;
                        return { q: q.question || q.q || 'Question', options: q.options || [], a: correctIdx };
                    }).filter(q => q.options.length > 0);
                }
            }
        } catch(e2) { console.error('Direct API fallback also failed:', e2); }
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
            if(roomState.players.filter(p => !p.disconnected).length >= 4) {
                conn.on('open', () => { conn.send({ type: 'ERROR', msg: 'Room is full' }); setTimeout(()=>conn.close(), 500); });
                return;
            }
            
            conn.on('open', () => {
                try { conn.send({ type: 'STATE_SYNC', players: roomState.players, topic: currentSettings, gameStarted: roomState.gameStarted || false, questions: roomState.questions || (roomState.pool ? roomState.pool.slice(0, roomState.maxQs || 10) : []) }); } catch(e) {}
            });
            conn.on('data', (data) => {
                guestConns[conn.peer] = conn;
                if(data.type === 'SYNC_READY') {
                    if (roomState.syncing && roomState.readyPlayers) {
                        roomState.readyPlayers.add(data.id);
                        const activeCount = roomState.players.filter(p => !p.disconnected).length;
                        window.SolmatesSync.update(`Waiting for players... (${roomState.readyPlayers.size}/${activeCount})`);
                        if (roomState.readyPlayers.size >= activeCount) {
                            finishSyncStart();
                        }
                    }
                }
                if(data.type === 'REQUEST_RECOVERY') {
                    if (roomState.gameStarted) {
                        conn.send({ type: 'START_GAME', questions: roomState.questions });
                        setTimeout(() => conn.send({ type: 'BACKUP_QUESTIONS', questions: roomState.questions }), 300);
                        if (roomState.currentQuestion) conn.send(roomState.currentQuestion);
                    }
                }
                if(data.type === 'JOIN') {
                    const existing = roomState.players.find(p => p.id === conn.peer);
                    if (existing) {
                        existing.disconnected = false;
                        existing.name = data.name;
                    } else {
                        roomState.players.push({ id: conn.peer, name: data.name, score: 0, disconnected: false });
                        roomState.correctCounts[conn.peer] = 0;
                    }
                    broadcast({ type: 'LOBBY_UPDATE', players: roomState.players, topic: currentSettings, questions: roomState.questions || (roomState.pool ? roomState.pool.slice(0, roomState.maxQs || 10) : []) });
                    renderLobby();
                } else if(data.type === 'ANSWER') {
                    handleGuestAnswer(conn.peer, data.answerIdx, data.timeLeft);
                }
            });
            conn.on('close', () => {
                const p = roomState.players.find(pl => pl.id === conn.peer);
                if (p) { p.disconnected = true; showToast(`${p.name} disconnected`); }
                delete guestConns[conn.peer];
                broadcast({ type: 'LOBBY_UPDATE', players: roomState.players, topic: currentSettings, questions: roomState.questions || (roomState.pool ? roomState.pool.slice(0, roomState.maxQs || 10) : []) });
                if (!document.getElementById('screen-lobby').classList.contains('hidden')) renderLobby();
            });
        });
    });
}

function joinViaUrl() {
    // By the time this runs, the Player Profile modal has already forced a nickname to be set
    // on page load â€” but guard anyway in case someone dismissed it somehow.
    myName = localStorage.getItem('solmates_nickname');
    if (!myName) { openProfileModal(); return; }
    const url = new URL(window.location.href);
    const roomId = url.searchParams.get('room');
    if (!roomId) return;
    // Route through the join screen + manualJoinRoom() flow the other games use (so the
    // "Connecting..." status text shows), skipping uiShowJoinRoom()'s own name-prompt logic
    // since we've already resolved the name above.
    document.getElementById('room-code-input').value = roomId;
    hideAllScreens();
    document.getElementById('screen-join').classList.remove('hidden');
    manualJoinRoom();
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
    const statusEl = document.getElementById('join-status');
    statusEl.textContent = "Connecting...";
    statusEl.classList.remove('hidden');
    connectToHost(input);
}

function connectToHost(hostId) {
    initPeer((id) => {
        isHost = false;
        hostConn = peer.connect(hostId, { reliable: true });
        
        hostConn.on('open', () => {
            hostConn.send({ type: 'JOIN', name: myName });
            hideAllScreens();
            document.getElementById('screen-lobby').classList.remove('hidden');
            document.getElementById('wait-host-msg').classList.remove('hidden');
            document.getElementById('invite-box').classList.add('hidden');
            // Optimistically add self so lobby shows our name immediately
            // (before the host's LOBBY_UPDATE arrives)
            if (!roomState.players.find(p => p.id === myId)) {
                roomState.players.push({ id: myId, name: myName, score: 0, disconnected: false });
                roomState.correctCounts[myId] = 0;
                renderLobby();
            }
        });

        // Periodic re-JOIN acts as a heartbeat: even if the host briefly lost track of us
        // (a background-tab blip etc.), this guarantees we re-register within a few seconds
        // instead of waiting on an action the user has no way to trigger while stuck.
        setInterval(() => {
            if (!isHost && hostConn && hostConn.open) hostConn.send({ type: 'JOIN', name: myName });
        }, 4000);
        
        hostConn.on('data', (data) => {
            if(data.type === 'ERROR') {
                alert(data.msg);
                location.reload();
            } else if(data.type === 'LOBBY_UPDATE') {
                if (data.questions) roomState.backupQuestions = data.questions;
                roomState.players = data.players;
                document.getElementById('lobby-topic').textContent = data.topic;
                renderLobby();
            } else if(data.type === 'PING') {
                // keep-alive, ignore
            } else if(data.type === 'STATE_SYNC') {
                if (data.questions) roomState.backupQuestions = data.questions;
        // Self-healing JOIN: if host doesn't have us, resend JOIN
        if (data.players && !data.players.find(p => p.id === myId)) {
            hostConn.send({ type: 'JOIN', name: myName });
        }
                // Self-healing: update players even if LOBBY_UPDATE was dropped
                roomState.players = data.players;
                if (data.topic) document.getElementById('lobby-topic').textContent = data.topic;
                if (data.gameStarted && !roomState.gameStarted) {
                    hostConn.send({ type: 'REQUEST_RECOVERY' });
                } else if (!roomState.gameStarted) {
                    renderLobby();
                }
                if (data.scores) { roomState.scores = data.scores; roomState.correctCounts = data.correctCounts; }
            } else if (data.type === 'SYNC_PREPARE') {
                if (data.questions) roomState.backupQuestions = data.questions;
                window.SolmatesSync.show("Syncing with host...");
                hostConn.send({ type: 'SYNC_READY', id: myId });
            } else if(data.type === 'START_GAME') {
                enterGameFromAuthoritativeState(data, 'START_GAME');
                if (data.questions) roomState.backupQuestions = data.questions;
                document.getElementById('question-text').textContent = "Get Ready...";
                document.getElementById('options-grid').innerHTML = '';
                // Auto-recovery: if QUESTION doesn't arrive in 3s, ask host to resend
                setTimeout(() => {
                    if (!roomState.questionReceived && hostConn) {
                        hostConn.send({ type: 'REQUEST_RECOVERY' });
                    }
                }, 3000);
            } else if(data.type === 'BACKUP_QUESTIONS') {
                if (data.questions) roomState.backupQuestions = data.questions;
            } else if(data.type === 'QUESTION') {
                enterGameFromAuthoritativeState(data, 'QUESTION_RECOVERY');
                roomState.questionReceived = true;
                roomState.currentQ = data.qNum - 1;
                
                let timeRemaining = 15;
                if (data.deadline) {
                    const now = Date.now() + (typeof serverTimeOffset !== 'undefined' ? serverTimeOffset : 0);
                    timeRemaining = Math.max(0, Math.ceil((data.deadline - now) / 1000));
                }
                console.log('[MP QUESTION RECOVERY] deadline=' + data.deadline + ' remaining=' + timeRemaining);
                
                renderQuestion(data.question, data.qNum, data.totalQ, data.deadline);
            } else if(data.type === 'RESULT') {
                enterGameFromAuthoritativeState(data, 'RESULT_RECOVERY');
                roomState.correctCounts = data.correctCounts || {};
                roomState.scores = data.scores || {};
                showResult(data.correctIdx, data.scores);
            } else if(data.type === 'GAME_OVER') {
                roomState.correctCounts = data.correctCounts || {};
                showLeaderboard(data.scores, data.totalQ);
            }
        });
        
        hostConn.on('host_disconnect_early', (secondsLeft) => {
            if (typeof isHost !== 'undefined' && isHost) return; if (typeof isMigrating !== 'undefined' && isMigrating) return;
            window.SolmatesHostStatus && window.SolmatesHostStatus.showReconnecting(secondsLeft);
        });
        
        hostConn.on('host_disconnect', () => {
            if (!roomState.gameStarted) {
                // Host left during lobby before game started
                window.SolmatesHostStatus && window.SolmatesHostStatus.hide();
                if (window.SolmatesHostStatus) {
                    const el = window.SolmatesHostStatus._getOrCreate();
                    el.innerHTML = '<h3 class="sol-hs-title sol-hs-danger" style="margin:0 0 8px;font-size:17px;">&#128308; Host has left</h3><p class="sol-hs-sub" style="margin:0 0 14px;">The game was not started. The room is now closed.</p><div class="sol-hs-actions"><button class="sol-hs-btn sol-hs-btn-leave" onclick="window.location.href='/games/'">Go Home</button></div>';
                    el.style.display = 'flex';
                }
                return;
            }
            migrateHost(hostId);
        });
        hostConn.on('host_reconnect', () => {
            window.SolmatesHostStatus && window.SolmatesHostStatus.hide();
        });
        hostConn.on('close', () => { if (typeof isHost !== 'undefined' && isHost) return; if (typeof isMigrating !== 'undefined' && isMigrating) return; window.SolmatesHostStatus && window.SolmatesHostStatus.showReconnecting(); });
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
        list.innerHTML += `<div class="player-item">${p.name} ${p.id === myId ? '(You)' : ''}</div>`;
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
    roomState.gameStarted = true; window._solmatesGameStarted = true;
    
    // Use the pool that was already built in createRoom()
    let finalPool = roomState.pool || [];
    const fallbackPool = roomState.fallbackPool || [];
    if (finalPool.length === 0) { alert("No questions found. Please create a new room."); return; }
    
    const qCount = roomState.maxQs || 10;
    
    // Shuffle final pool
    finalPool = finalPool.sort(() => Math.random() - 0.5);
    
    // Slice to exact requested count
    roomState.questions = finalPool.slice(0, qCount);
    roomState.currentQ = 0;
    
    roomState.syncing = true;
    roomState.readyPlayers = new Set([myId]);
    const activeCount = roomState.players.filter(p => !p.disconnected).length;
    window.SolmatesSync.show(`Waiting for players... (1/${activeCount})`);
    
    // â”€â”€ HOST CONNECTION GUARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // Mobile Host may return from background with a momentarily-suspended WebSocket.
    // Confirm Firebase is actually connected before broadcasting SYNC_PREPARE,
    // so the write is guaranteed to reach the server and trigger Guest listeners.
    const doHostBroadcast = () => {
        broadcast({ type: 'SYNC_PREPARE', questions: roomState.questions });
        // Safety net: if not everyone acks within 5s, proceed with whoever's ready.
        clearTimeout(roomState._syncTimeout);
        roomState._syncTimeout = setTimeout(() => { if (roomState.syncing) finishSyncStart(); }, 5000);
        if (roomState.readyPlayers.size >= activeCount) { finishSyncStart(); }
    };
    db.ref('.info/connected').once('value', snap => {
        if (snap.val() === true) {
            doHostBroadcast();
        } else {
            // Not yet connected â€” go online and wait for the connection event once
            db.goOnline();
            const connRef = db.ref('.info/connected');
            const waitHandler = snap2 => {
                if (snap2.val() === true) {
                    connRef.off('value', waitHandler);
                    doHostBroadcast();
                }
            };
            connRef.on('value', waitHandler);
            // Hard fallback: after 4s give up waiting and broadcast anyway
            setTimeout(() => { connRef.off('value', waitHandler); if (roomState.syncing) doHostBroadcast(); }, 4000);
        }
    });
}

function finishSyncStart() {
    clearTimeout(roomState._syncTimeout);
    roomState.syncing = false;
    window.SolmatesSync.hide();
    broadcast({ type: 'START_GAME', questions: roomState.questions });
    setTimeout(() => broadcast({ type: 'BACKUP_QUESTIONS', questions: roomState.questions }), 300);
    startGameUI();
    setTimeout(sendNextQuestion, 2000);
}


function enterGameFromAuthoritativeState(sourceData, sourceName) {
    console.log('[MP ENTER GAME] source=' + sourceName);
    if (window.SolmatesSync) window.SolmatesSync.hide();
    if (window.SolmatesHostStatus) {
        window.SolmatesHostStatus.hide();
        console.log('[MP RECONNECTING CLEARED]');
    }
    
    if (!roomState.gameStarted) {
        let hOpen = (typeof hostConn !== 'undefined' && hostConn) ? hostConn.open : false;
        console.log('[MP QUESTION RECOVERY] gameStarted before=false gameStarted after=true hostConn.open=' + hOpen);
        roomState.gameStarted = true; window._solmatesGameStarted = true;
        hideAllScreens();
        document.getElementById('screen-game').classList.remove('hidden');
        if (!roomState.backupQuestions && sourceData.questions) {
            roomState.backupQuestions = sourceData.questions;
        }
    }
}

function startGameUI() {
    hideAllScreens();
    document.getElementById('screen-game').classList.remove('hidden');
    document.getElementById('question-text').textContent = "Get Ready...";
    document.getElementById('options-grid').innerHTML = '';
}

function sendNextQuestion() {
    if(roomState.currentQ >= roomState.questions.length) {
        broadcast({ type: 'GAME_OVER', scores: roomState.scores, correctCounts: roomState.correctCounts, totalQ: roomState.questions.length });
        showLeaderboard(roomState.scores);
        return;
    }
    
    const q = roomState.questions[roomState.currentQ];
    // Reset host answers tracking
    roomState.currentAnswers = {};
    
    const deadline = Date.now() + (typeof serverTimeOffset !== 'undefined' ? serverTimeOffset : 0) + 15000;
    const qData = {
        question: { q: q.q, options: q.options },
        qNum: roomState.currentQ + 1,
        totalQ: roomState.questions.length,
        deadline: deadline,
        questions: roomState.questions
    };
    broadcast({ type: 'QUESTION', ...qData });
    renderQuestion(qData.question, qData.qNum, qData.totalQ, qData.deadline);
    
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


function updateLiveScoresUI() {
    const container = document.getElementById('live-scores-container');
    if (!container) return;
    container.innerHTML = roomState.players.map(p => `
        <div class="px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 ${p.disconnected ? 'opacity-40' : ''}">
            ${p.id === myId ? 'You' : p.name}: <span class="text-sky-600">${roomState.scores[p.id] || 0}</span>
        </div>
    `).join('');
}

function renderQuestion(q, qNum, totalQ, deadline) {
    updateLiveScoresUI();

    answered = false;
    document.getElementById('game-q-num').textContent = 'Q ' + qNum + '/' + totalQ;
    document.getElementById('question-text').textContent = q.q;
    
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, idx) => {
        grid.innerHTML += '<button id="opt-' + idx + '" class="option-btn p-4 rounded-xl text-left font-semibold text-lg" onclick="submitAnswer(' + idx + ')">' + letters[idx] + '. ' + opt + '</button>';
    });
    
    document.getElementById('answer-feedback').classList.add('hidden');
    
    // Visual Timer
    timeRemaining = 15;
    if (deadline) {
        const now = Date.now() + (typeof serverTimeOffset !== 'undefined' ? serverTimeOffset : 0);
        timeRemaining = Math.max(0, Math.ceil((deadline - now) / 1000));
    }
    document.getElementById('game-timer').textContent = timeRemaining + 's';
    const bar = document.getElementById('timer-bar');
    bar.style.width = ((timeRemaining/15)*100) + '%';
    
    if(questionTimer) clearInterval(questionTimer);
    questionTimer = setInterval(() => {
        timeRemaining--;
        if (timeRemaining < 0) timeRemaining = 0;
        document.getElementById('game-timer').textContent = timeRemaining + 's';
        bar.style.width = ((timeRemaining/15)*100) + '%';
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
        fbt.textContent = `Correct!`;
        fbt.className = "text-xl font-bold text-green-400";
    } else {
        fbt.textContent = `Wrong!`;
        fbt.className = "text-xl font-bold text-red-400";
    }
}

function showLeaderboard(scores, passedTotalQ = null) {
    roomState.gameOver = true;
    hideAllScreens();
    document.getElementById('screen-leaderboard').classList.remove('hidden');
    
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';
    const totalQ = passedTotalQ !== null ? passedTotalQ : (roomState.questions ? roomState.questions.length : 0);
    
    // Sort players by score; disconnected go to bottom
    const sorted = [...roomState.players].sort((a,b) => {
        const sA = scores[a.id] || 0;
        const sB = scores[b.id] || 0;
        if (sB !== sA) return sB - sA;
        if (a.disconnected && !b.disconnected) return 1;
        if (!a.disconnected && b.disconnected) return -1;
        return 0;
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
                        <p class="font-bold text-slate-800">${p.name}${isMe ? ' (You)' : ''}${p.disconnected ? ' ðŸ”Œ' : ''}</p>
                        <p class="text-xs text-slate-500 mt-0.5">âœ… ${correct} / ${totalQ} correct</p>
                    </div>
                    ${idx===0 && !p.disconnected ? '<span class="text-yellow-500">ðŸ†</span>' : ''}
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


let isMigrating = false;
function migrateHost(hostId) {
    if (window.SolmatesHostStatus) window.SolmatesHostStatus.hide();
    if (isMigrating) return;
    // Be tolerant about where the question set comes from â€” backupQuestions is set from several
    // broadcast paths already, but if for any reason it never arrived, fall back to whatever
    // question set we actually have (roomState.questions, populated as soon as the game started)
    // rather than giving up and leaving the room stuck with no host.
    if (!roomState.backupQuestions || roomState.backupQuestions.length === 0) {
        if (roomState.questions && roomState.questions.length > 0) {
            roomState.backupQuestions = roomState.questions;
        } else if (roomState.pool && roomState.pool.length > 0) {
            roomState.backupQuestions = roomState.pool.slice(0, roomState.maxQs || 10);
        }
    }
    if (!roomState.backupQuestions || roomState.backupQuestions.length === 0) {
        if (typeof showToast === 'function') showToast('Host left - no question data.');
        return;
    }
    isMigrating = true;
    roomState.pool = roomState.backupQuestions;
    roomState.questions = roomState.backupQuestions;
    let pList = typeof players !== 'undefined' ? players : (typeof roomState !== 'undefined' ? roomState.players : []);
    let hostName = "Host";
    if (pList && pList.length > 0) {
        let oldHost = pList.find(p => p.id === hostId || p.id === hostId + '-LEFT');
        if (oldHost) hostName = oldHost.name;
    }
    if (typeof showToast === 'function') showToast(hostName + " disconnected");

    // Early return removed so migration always attempts

    // *** DO NOT close hostConn here â€” closing it kills all Firebase listeners
    // and makes the guest permanently deaf if original host reconnects. ***
    // We only close hostConn AFTER we win the transaction.

    const db = firebase.database();
    db.ref(`solmates-rooms/${hostId}/newHost`).transaction((currentData) => {
        const now = Date.now();
        if (currentData === null || typeof currentData !== 'object' || (now - currentData.ts > 60000)) {
            return { id: myId, ts: now };
        }
        return;
    }, (error, committed, snapshot) => {
        if (committed && snapshot.val() && snapshot.val().id === myId) {
            window.SolmatesHostStatus && window.SolmatesHostStatus.hide();
            // WE won the transaction â€” now safe to close hostConn
            if (hostConn) { hostConn.close(); hostConn = null; }
            isHost = true;
            roomState.questions = roomState.backupQuestions;
            roomState.currentAnswers = {};

            let oldHostPlayer = roomState.players.find(p => p.id === hostId);
            if (oldHostPlayer) {
                oldHostPlayer.id = hostId + '-LEFT';
                oldHostPlayer.disconnected = true;
                roomState.scores[oldHostPlayer.id] = roomState.scores[hostId] || 0;
                roomState.correctCounts[oldHostPlayer.id] = roomState.correctCounts[hostId] || 0;
            }
            let myOldId = myId;

            setTimeout(() => {
                initPeer((id) => {
                    let me = roomState.players.find(p => p.id === myOldId || p.name === myName);
                    if (me) me.id = myId;
                    roomState.scores[myId] = roomState.scores[myOldId] || 0;
                    roomState.correctCounts[myId] = roomState.correctCounts[myOldId] || 0;
                    showToast("You are the new host!");
                    if (!roomState.gameStarted) {
                        hideAllScreens();
                        document.getElementById('screen-lobby').classList.remove('hidden');
                        document.getElementById('btn-start-game').classList.remove('hidden');
                        document.getElementById('wait-host-msg').classList.add('hidden');
                        document.getElementById('invite-box').classList.remove('hidden');
                        if (typeof renderLobby === 'function') renderLobby();
                    } else {
                        hideAllScreens();
                        document.getElementById('screen-game').classList.remove('hidden');
                    }
                    
                    // Accept reconnecting guests
                    peer.on('connection', (conn) => {
                        conn.on('data', (data) => {
                            guestConns[conn.peer] = conn;
                            if(data.type === 'REQUEST_RECOVERY') {
                                if (roomState.gameStarted) {
                                    conn.send({ type: 'START_GAME', questions: roomState.questions });
                                    setTimeout(() => conn.send({ type: 'BACKUP_QUESTIONS', questions: roomState.questions }), 300);
                                    if (roomState.currentQuestion) conn.send(roomState.currentQuestion);
                                }
                            }
                            if(data.type === 'JOIN') {
                                let existingPlayer = roomState.players.find(p => p.id === conn.peer);
                                if (existingPlayer) {
                                    existingPlayer.disconnected = false;
                                    existingPlayer.name = data.name;
                                } else {
                                    roomState.players.push({ id: conn.peer, name: data.name, score: 0, disconnected: false });
                                    roomState.correctCounts[conn.peer] = 0;
                                }
                                if (roomState.questions && roomState.questions.length > 0 && roomState.currentQ > 0) {
                                    conn.send({ type: 'SYNC_STATE', state: { roomState, timeRemaining, currentSettings } });
                                }
                                broadcast({ type: 'LOBBY_UPDATE', players: roomState.players, topic: currentSettings, questions: roomState.questions || (roomState.pool ? roomState.pool.slice(0, roomState.maxQs || 10) : []) });
                                if (!roomState.backupQuestions) renderLobby();
                            } else if(data.type === 'ANSWER') {
                                handleGuestAnswer(conn.peer, data.answerIdx, data.timeLeft);
                            }
                        });
                        conn.on('close', () => {
                            const p = roomState.players.find(pl => pl.id === conn.peer);
                            if (p) { 
                                if (!roomState.backupQuestions) {
                                    roomState.players = roomState.players.filter(pl => pl.id !== conn.peer);
                                } else {
                                    p.disconnected = true; showToast(p.name + " disconnected"); 
                                }
                            }
                            delete guestConns[conn.peer];
                            broadcast({ type: 'LOBBY_UPDATE', players: roomState.players, topic: currentSettings, questions: roomState.questions || (roomState.pool ? roomState.pool.slice(0, roomState.maxQs || 10) : []) });
                            if (!document.getElementById('screen-lobby').classList.contains('hidden')) renderLobby();
                        });
                    });
                    
                    // Resume game
                    setTimeout(() => {
                        if (roomState.gameStarted) {
                            sendNextQuestion();
                        }
                    }, 1500);
                // hostId already carries the 'SOLMATES-' prefix (it's the same value used for
                // peer.connect()). initPeer() adds that prefix itself, so we must pass the bare
                // id here â€” otherwise the new host registers under a double-prefixed room key
                // that doesn't match the room the other guests are still listening on, and the
                // migration silently does nothing from their point of view.
                }, hostId.replace('SOLMATES-', ''));
            }, 500);
        } else {
            // Transaction failed = original host came back before we could claim.
            // Since we did NOT close hostConn, our Firebase listeners are still alive.
            // Just reset isMigrating so we can try again if host drops again.
            isMigrating = false;
            // Hide the "offline" popup - host is back
            window.SolmatesHostStatus && window.SolmatesHostStatus.hide();
        }
    });
}






















// Fix for background tab throttling on mobile (e.g. sharing link via WhatsApp)
// When returning to the foreground, if a sync is stuck because the 5s timer was paused, force it.
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && typeof isHost !== 'undefined' && isHost) {
        const isSyncing = (typeof roomState !== 'undefined' && roomState.syncing) ||
                          (typeof gameState !== 'undefined' && gameState.syncing);
        if (isSyncing && typeof finishSyncStart === 'function') {
            // DO NOT call finishSyncStart() immediately.
            // Firebase WebSocket may not be re-established yet (visibilitychange fires synchronously,
            // Firebase reconnect is async). If we broadcast START_GAME before connection is live,
            // packets get queued in an offline state and guests never receive them.
            //
            // Fix: nudge goOnline() and wait for .info/connected confirmation (max 3s fallback).
            const fb = (typeof db !== 'undefined') ? db : null;
            if (!fb) { if (roomState.syncing || (typeof gameState !== 'undefined' && gameState.syncing)) finishSyncStart(); return; }
            fb.goOnline();
            let resolved = false;
            const onConnected = fb.ref('.info/connected').on('value', snap => {
                if (snap.val() === true && !resolved) {
                    resolved = true;
                    fb.ref('.info/connected').off('value', onConnected);
                    const stillSyncing = (typeof roomState !== 'undefined' && roomState.syncing) ||
                                         (typeof gameState !== 'undefined' && gameState.syncing);
                    if (stillSyncing) {
                        console.log('[v390] Tab returned foreground, Firebase online, finishing sync');
                        finishSyncStart();
                    }
                }
            });
            // Fallback: if Firebase doesn't confirm within 3s, proceed anyway
            setTimeout(() => {
                if (!resolved) {
                    resolved = true;
                    fb.ref('.info/connected').off('value', onConnected);
                    const stillSyncing = (typeof roomState !== 'undefined' && roomState.syncing) ||
                                         (typeof gameState !== 'undefined' && gameState.syncing);
                    if (stillSyncing) {
                        console.log('[v390] Tab returned foreground, Firebase timeout, finishing sync anyway');
                        finishSyncStart();
                    }
                }
            }, 3000);
        }
    }
});


