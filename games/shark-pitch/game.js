// ===== Shark Pitch — AI-Judged multiplayer game =====
const ROOM_PREFIX = 'SOLMATES-SP-';

let peer = null, hostConn = null, isHost = false, myId = null;
let myName = "Player";
try { myName = localStorage.getItem('solmates_nickname') || "Player"; } catch(e) {}
let pendingRoomCode = null;

let players = []; // [{ id, name, score, correctCounts, disconnected }]
let guestConns = {};

let gameState = {
    topic: 'general', totalRounds: 5, round: 0, timePerRound: 90,
    scores: {}, correctCounts: {}, gameStarted: false, gameOver: false,
    currentChallenge: '', challenges: []
};

let pitches = {}; // { playerId: "pitch text" }
let timerInterval = null;
let myPitchSubmitted = false;

const CHALLENGES = {
    startup: [
        "Pitch a startup idea that solves traffic in major Indian cities. Name it, explain the model, and give one unique differentiator.",
        "You have 60 seconds with a Shark: pitch a D2C brand for rural India farmers. What do you sell, how, and why will it work?",
        "Pitch a SaaS product for small kirana stores to compete with big e-commerce. Include pricing.",
        "Create a startup that uses AI to help Indian college students find internships. How will you monetize?",
        "Pitch a fintech idea for the 500 million unbanked people in India. What is your USP?",
        "Describe a food-tech startup that combats food waste in India. Business model in 3 sentences.",
        "Pitch a health-tech startup for tier 2-3 cities. What problem does it solve and how will you grow?"
    ],
    marketing: [
        "You have a budget of ₹10 lakhs to launch a new energy drink for college students. Describe your marketing strategy.",
        "How would you market a 100% eco-friendly plastic alternative to restaurants across India?",
        "Design a viral social media campaign to launch a new herbal tea brand targeting Gen Z.",
        "A brand wants to reposition from 'old-fashioned' to 'premium'. Create a repositioning strategy.",
        "How would you use influencer marketing to sell a luxury ayurvedic skincare brand?",
        "Create a referral marketing program for an EdTech app. Include mechanics and incentives.",
        "Design an offline marketing campaign for a new gym chain in tier 2 cities."
    ],
    finance: [
        "You have ₹5 lakhs to invest for 5 years. Explain your investment strategy and expected returns.",
        "A startup needs ₹2 crore to scale. Explain which funding route you'd choose: VC, angel, or bank loan — and why.",
        "How would you value a 3-year-old profitable food startup with ₹1 crore revenue?",
        "Explain how you would reduce costs in a company with 30% operating expenses.",
        "A company's stock P/E ratio is 45x vs industry average of 20x. Should you invest? Why?",
        "Describe a hedging strategy for a company that imports raw materials from the US.",
        "How would you restructure debt for a company on the edge of default?"
    ],
    hr: [
        "Your top performer wants a 50% hike but the budget allows only 20%. How do you handle this?",
        "Design a 30-60-90 day onboarding plan for a new sales manager at a startup.",
        "How would you create a company culture that attracts and retains Gen Z employees?",
        "Two senior employees are in constant conflict affecting the team. What's your HR strategy?",
        "Design a performance management system that replaces annual appraisals with continuous feedback.",
        "How would you handle mass layoffs while maintaining employer brand reputation?",
        "Create a diversity and inclusion initiative for a tech company with 90% male employees."
    ],
    general: [
        "You're the CEO. Revenue dropped 30% this quarter. Explain your 90-day turnaround plan.",
        "Should a profitable company enter a new market with high potential but also high risk? Argue your position.",
        "How would you decide between building in-house technology vs buying an off-the-shelf solution?",
        "A competitor just copied your product and is selling at 40% lower price. How do you respond?",
        "Your product has great reviews but poor sales. What's your diagnosis and fix?",
        "Design a CSR initiative that also benefits the company's bottom line.",
        "How would you expand an Indian brand to international markets? Pick one country and explain."
    ]
};

// ---- Toast ----
function showToast(msg) {
    const c = document.getElementById('toast-container');
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; c.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3000);
}

// ---- Screen nav ----
function hideAllScreens() {
    ['screen-welcome','screen-create','screen-join','screen-lobby','screen-pitch','screen-judging','screen-results','screen-leaderboard'].forEach(id => document.getElementById(id).classList.add('hidden'));
}
function uiShowWelcome() { hideAllScreens(); document.getElementById('screen-welcome').classList.remove('hidden'); }
function uiShowCreateRoom() { hideAllScreens(); document.getElementById('screen-create').classList.remove('hidden'); }
function uiShowJoinRoom() { hideAllScreens(); document.getElementById('screen-join').classList.remove('hidden'); }

(function checkUrlInvite() {
    const r = new URLSearchParams(window.location.search).get('room');
    if (r) { pendingRoomCode = r.toUpperCase(); window.addEventListener('DOMContentLoaded', () => document.getElementById('url-join-box').classList.remove('hidden')); }
})();
function joinViaUrl() { if (!pendingRoomCode) return; document.getElementById('room-code-input').value = pendingRoomCode; uiShowJoinRoom(); manualJoinRoom(); }

// ---- Peer setup ----
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

// ---- Create Room ----
async function createRoom() {
    const topic = document.getElementById('select-topic').value;
    const rounds = parseInt(document.getElementById('select-rounds').value, 10);
    const time = parseInt(document.getElementById('select-time').value, 10);

    gameState.topic = topic;
    gameState.totalRounds = rounds;
    gameState.timePerRound = time;
    // Pre-shuffle challenges
    gameState.challenges = [...CHALLENGES[topic]].sort(() => Math.random() - 0.5).slice(0, rounds);

    document.getElementById('btn-create-room').textContent = "Setting up room...";

    initPeer(id => {
        document.getElementById('btn-create-room').textContent = "Generate Room";
        isHost = true;
        players = [{ id: myId, name: myName, score: 0, correctCounts: 0, disconnected: false }];
        gameState.scores[myId] = 0;
        gameState.correctCounts[myId] = 0;

        hideAllScreens(); document.getElementById('screen-lobby').classList.remove('hidden');
        document.getElementById('lobby-topic').textContent = `Shark Pitch · ${topic} · ${rounds} rounds · ${time}s`;
        document.getElementById('invite-link').textContent = window.location.origin + window.location.pathname + '?room=' + id;
        renderLobby();

        peer.on('connection', conn => {
            if (gameState.gameOver) { conn.on('open', () => { conn.send({ type: 'ERROR', msg: 'This game has already ended. Please create a new room.' }); setTimeout(() => conn.close(), 500); }); return; }
            if (players.filter(p => !p.disconnected).length >= 4) {
                conn.on('open', () => { conn.send({ type: 'ERROR', msg: 'Room is full (max 4)' }); setTimeout(() => conn.close(), 500); }); return;
            }
            guestConns[conn.peer] = conn;
            conn.on('data', data => handleHostData(data, conn.peer));
            conn.on('close', () => handleDisconnect(conn.peer));
        });
    }, () => { document.getElementById('btn-create-room').textContent = "Generate Room"; uiShowWelcome(); });
}

function handleDisconnect(peerId) {
    const p = players.find(pl => pl.id === peerId);
    if (p) { p.disconnected = true; showToast(`${p.name} disconnected`); }
    delete guestConns[peerId];
    checkAllSubmitted();
}

function handleHostData(data, fromId) {
    if (data.type === 'PONG') return;
    if (data.type === 'JOIN') {
        players.push({ id: fromId, name: data.name, score: 0, correctCounts: 0, disconnected: false });
        gameState.scores[fromId] = 0;
        gameState.correctCounts[fromId] = 0;
        broadcast({ type: 'LOBBY_UPDATE', players, settings: { topic: gameState.topic, totalRounds: gameState.totalRounds, timePerRound: gameState.timePerRound, challenges: gameState.challenges } });
        renderLobby();
    }
    if (data.type === 'PITCH_SUBMIT') {
        pitches[fromId] = data.pitch;
        updateSubmittedCount();
        checkAllSubmitted();
    }
}

function manualJoinRoom() {
    let raw = document.getElementById('room-code-input').value.trim();
    let code = raw;
    try { if (raw.includes('room=')) code = new URL(raw).searchParams.get('room'); } catch(e) {}
    code = (code || '').toUpperCase().trim();
    if (!code) { showToast("Enter a room code or invite link"); return; }

    document.getElementById('join-status').classList.remove('hidden');
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
    const failTimer = setTimeout(() => showToast("Connection timed out."), 12000);

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
        hostConn.on('error', err => { clearTimeout(failTimer); showToast("Could not connect: " + err.type); });
    });
    peer.on('error', err => { showToast("Error: " + err.type); });
}

function handleGuestData(data) {
    if (data.type === 'PING') return;
    if (data.type === 'ERROR') { showToast(data.msg); uiShowWelcome(); }
    if (data.type === 'LOBBY_UPDATE') {
        players = data.players;
        gameState = { ...gameState, ...data.settings };
        document.getElementById('lobby-topic').textContent = `Shark Pitch · ${data.settings.topic} · ${data.settings.totalRounds} rounds`;
        renderLobby();
    }
    if (data.type === 'START_ROUND') { gameState.round = data.round; startPitchUI(data.challenge, data.round, gameState.totalRounds, gameState.timePerRound); }
    if (data.type === 'SUBMIT_COLLECTED') { document.getElementById('waiting-for-others').querySelector('div').textContent = `${data.count} / ${data.total} submitted`; }
    if (data.type === 'JUDGING') { showJudging(); }
    if (data.type === 'ROUND_RESULTS') { gameState.scores = data.scores; gameState.correctCounts = data.correctCounts; showRoundResults(data.results, data.round, data.totalRounds); }
    if (data.type === 'END_GAME') { showLeaderboard(); }
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

// ---- Game flow ----
function startGame() {
    if (!isHost) return;
    gameState.round = 0;
    gameState.gameStarted = true;
    hostNextRound();
}

function hostNextRound() {
    if (!isHost) return;
    gameState.round++;
    if (gameState.round > gameState.totalRounds) { broadcast({ type: 'END_GAME' }); showLeaderboard(); return; }
    pitches = {};
    myPitchSubmitted = false;
    const challenge = gameState.challenges[gameState.round - 1];
    gameState.currentChallenge = challenge;
    broadcast({ type: 'START_ROUND', challenge, round: gameState.round });
    startPitchUI(challenge, gameState.round, gameState.totalRounds, gameState.timePerRound);
}

function startPitchUI(challenge, round, totalRounds, timeLimit) {
    hideAllScreens(); document.getElementById('screen-pitch').classList.remove('hidden');
    document.getElementById('pitch-round-num').textContent = `Round ${round}/${totalRounds}`;
    document.getElementById('pitch-challenge').textContent = challenge;
    document.getElementById('pitch-input').value = '';
    document.getElementById('pitch-input').disabled = false;
    document.getElementById('btn-submit-pitch').classList.remove('hidden');
    document.getElementById('waiting-for-others').classList.add('hidden');
    myPitchSubmitted = false;

    let timeLeft = timeLimit;
    document.getElementById('pitch-timer').textContent = timeLeft;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('pitch-timer').textContent = timeLeft;
        if (timeLeft <= 0) { clearInterval(timerInterval); autoSubmit(); }
    }, 1000);
}

function autoSubmit() {
    if (!myPitchSubmitted) submitPitch();
}

function submitPitch() {
    if (myPitchSubmitted) return;
    clearInterval(timerInterval);
    myPitchSubmitted = true;
    const pitch = document.getElementById('pitch-input').value.trim() || "(No answer submitted)";
    document.getElementById('pitch-input').disabled = true;
    document.getElementById('btn-submit-pitch').classList.add('hidden');
    document.getElementById('waiting-for-others').classList.remove('hidden');

    if (isHost) {
        pitches[myId] = pitch;
        updateSubmittedCount();
        checkAllSubmitted();
    } else {
        hostConn.send({ type: 'PITCH_SUBMIT', pitch });
    }
}

function updateSubmittedCount() {
    const submitted = Object.keys(pitches).length;
    const total = players.filter(p => !p.disconnected).length;
    const countEl = document.getElementById('submitted-count');
    if (countEl) countEl.textContent = `${submitted} / ${total} submitted`;
    broadcast({ type: 'SUBMIT_COLLECTED', count: submitted, total });
}

function checkAllSubmitted() {
    if (!isHost) return;
    const activePlayers = players.filter(p => !p.disconnected);
    const allIn = activePlayers.every(p => pitches[p.id] !== undefined);
    if (allIn) { clearInterval(timerInterval); judgeWithAI(); }
}

async function judgeWithAI() {
    broadcast({ type: 'JUDGING' });
    showJudging();

    const challenge = gameState.currentChallenge;
    const playerAnswers = players.filter(p => !p.disconnected).map(p => ({ id: p.id, name: p.name, pitch: pitches[p.id] || "(No answer)" }));

    // Build prompt for AI
    const prompt = `You are a Shark Tank judge. The business challenge was: "${challenge}"
    
Here are the answers from ${playerAnswers.length} players:
${playerAnswers.map((p, i) => `Player ${i+1} (${p.name}): "${p.pitch}"`).join('\n\n')}

Score each player's answer out of 100 based on: creativity (25), feasibility (25), business thinking (25), and clarity (25).
Respond in this exact JSON format only, no extra text:
{"scores": [{"name": "PlayerName", "score": 85, "feedback": "One sentence feedback"}]}`;

    let aiScores = null;
    try {
        document.getElementById('judging-progress').textContent = "Calling AI...";
        const BACKEND_URL = (window.aiGameConnector && window.aiGameConnector.backendUrl) || 'https://solmates-backend.onrender.com';
        const res = await fetch(`${BACKEND_URL}/api/ai-tools/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [{ role: 'user', content: prompt }], tool: 'shark-pitch' }),
            signal: AbortSignal.timeout(20000)
        });
        const raw = await res.text();
        // Extract JSON from response
        const jsonMatch = raw.match(/\{[\s\S]*"scores"[\s\S]*\}/);
        if (jsonMatch) aiScores = JSON.parse(jsonMatch[0]);
    } catch(e) {
        console.error("AI Judge failed, using random scores", e);
    }

    // Build results
    const results = playerAnswers.map(p => {
        let aiScore = 50, feedback = "Good effort!";
        if (aiScores && aiScores.scores) {
            const match = aiScores.scores.find(s => s.name === p.name);
            if (match) { aiScore = match.score; feedback = match.feedback; }
        } else {
            // Fallback: score based on answer length and keywords
            const len = (p.pitch || '').length;
            aiScore = Math.min(100, Math.max(20, Math.floor(len / 3 + Math.random() * 20)));
        }
        const points = Math.round(aiScore);
        gameState.scores[p.id] = (gameState.scores[p.id] || 0) + points;
        if (aiScore >= 60) gameState.correctCounts[p.id] = (gameState.correctCounts[p.id] || 0) + 1;
        return { id: p.id, name: p.name, pitch: p.pitch, aiScore, feedback, points };
    });

    broadcast({ type: 'ROUND_RESULTS', results, scores: gameState.scores, correctCounts: gameState.correctCounts, round: gameState.round, totalRounds: gameState.totalRounds });
    showRoundResults(results, gameState.round, gameState.totalRounds);
}

function showJudging() {
    hideAllScreens(); document.getElementById('screen-judging').classList.remove('hidden');
}

function showRoundResults(results, round, totalRounds) {
    if(window.guestWaitTimeout) clearTimeout(window.guestWaitTimeout);
    hideAllScreens(); document.getElementById('screen-results').classList.remove('hidden');
    document.getElementById('result-round-num').textContent = `Round ${round}/${totalRounds}`;

    const sorted = [...results].sort((a,b) => b.aiScore - a.aiScore);
    const list = document.getElementById('results-list');
    list.innerHTML = sorted.map((r, i) => `
        <div class="answer-card ${r.id === myId ? 'border-amber-200 bg-amber-50' : ''}">
            <div class="flex items-start justify-between mb-2">
                <div>
                    <p class="font-bold text-slate-800">#${i+1} ${r.name}${r.id === myId ? ' (You)' : ''}</p>
                    <p class="text-xs text-slate-500 italic mt-1">"${(r.pitch||'').substring(0,120)}${r.pitch?.length > 120 ? '...' : ''}"</p>
                </div>
                <div class="ai-score ml-3 flex-shrink-0">${r.aiScore}</div>
            </div>
            <p class="text-sm text-slate-600 bg-white border border-slate-100 rounded-lg p-2">🤖 ${r.feedback}</p>
            <p class="text-xs text-amber-600 font-semibold mt-1">+${r.points} pts → Total: ${gameState.scores[r.id] || 0} pts</p>
        </div>`).join('');

    if (isHost) {
        document.getElementById('next-round-btn').classList.remove('hidden');
        document.getElementById('waiting-next').classList.add('hidden');
    } else {
        document.getElementById('next-round-btn').classList.add('hidden');
        document.getElementById('waiting-next').classList.remove('hidden');
    }
}

function showLeaderboard() {
    gameState.gameOver = true;
    hideAllScreens(); document.getElementById('screen-leaderboard').classList.remove('hidden');
    const sorted = [...players].sort((a,b) => (gameState.scores[b.id]||0) - (gameState.scores[a.id]||0));
    document.getElementById('leaderboard-list').innerHTML = sorted.map((p, i) => `
        <div class="flex items-center justify-between p-4 rounded-xl border ${i===0 ? 'border-yellow-300 bg-yellow-50' : 'border-slate-200 bg-white'} ${p.disconnected ? 'opacity-50' : ''}">
            <div class="flex items-center gap-3">
                <span class="font-bold text-slate-400">#${i+1}</span>
                <div>
                    <p class="font-semibold text-slate-800">${p.name}${p.id === myId ? ' (You)' : ''}${p.disconnected ? ' 🔌' : ''}</p>
                    <p class="text-xs text-slate-500">🎯 Scored 60+ in ${gameState.correctCounts[p.id]||0} / ${gameState.totalRounds} rounds</p>
                </div>
                ${i===0 ? '<i data-lucide="trophy" class="w-4 h-4 text-yellow-500"></i>' : ''}
            </div>
            <span class="font-bold text-slate-900">${gameState.scores[p.id]||0} pts</span>
        </div>`).join('');
    lucide.createIcons();
}

function safeExit() { try { Object.values(guestConns).forEach(c => c.close()); if (hostConn) hostConn.close(); if (peer) peer.destroy(); } catch(e) {} window.location.href = '/games/'; }
window.addEventListener('beforeunload', e => { if (gameState.gameStarted) { e.preventDefault(); e.returnValue = "Leaving will disconnect you!"; } });

function renderLobby() {
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
