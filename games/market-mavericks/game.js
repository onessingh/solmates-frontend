// ===== Market Mavericks — Virtual Trading Game =====
const ROOM_PREFIX = 'SOLMATES-MV-';
const STARTING_CASH = 10000;

let peer = null, hostConn = null, isHost = false, myId = null;
let myName = "Player";
try { myName = localStorage.getItem('solmates_nickname') || "Player"; } catch(e) {}
let pendingRoomCode = null;

let players = [];
let guestConns = {};

let gameState = {
    topic: 'tech', totalEvents: 7, eventIndex: 0,
    events: [], portfolios: {}, trades: {}, correctCounts: {},
    gameStarted: false, gameOver: false, gameOver: false
};
let myTradeSubmitted = false;
let tradeTimer = null;

const MARKET_EVENTS = {
    tech: [
        { headline: "Reliance Jio launches free 5G for all users", detail: "Jio announces unlimited free 5G data for next 6 months — subscriber growth expected.", impact: "positive", change: [+15, +25] },
        { headline: "Major Indian IT firm reports data breach", detail: "Customer data of 50 lakh users compromised, regulatory investigation begins.", impact: "negative", change: [-20, -30] },
        { headline: "Government announces ₹10,000 crore Digital India fund", detail: "New scheme to fund tech startups and infrastructure across tier 2-3 cities.", impact: "positive", change: [+8, +18] },
        { headline: "Infosys misses quarterly earnings expectations", detail: "Revenue growth slows to 2% vs 8% expected; dollar concerns cited.", impact: "negative", change: [-12, -20] },
        { headline: "UPI crosses 10 billion transactions in a single month", detail: "Record-breaking month for digital payments signals massive fintech growth.", impact: "positive", change: [+10, +20] },
        { headline: "SEBI bans 3 major crypto exchanges in India", detail: "Regulatory crackdown on unlicensed virtual asset platforms causes market uncertainty.", impact: "negative", change: [-15, -25] },
        { headline: "Amazon India announces ₹15,000 crore investment plan", detail: "Investment in warehousing, delivery, and cloud services over next 3 years.", impact: "positive", change: [+10, +22] },
        { headline: "India ranks #1 in global startup ecosystem index", detail: "World Bank report highlights India's startup growth, investor confidence surges.", impact: "positive", change: [+12, +20] },
        { headline: "Zomato acquires Blinkit competitor for ₹5,000 crore", detail: "Aggressive expansion in quick commerce raises concerns about profitability.", impact: "neutral", change: [-5, +10] },
        { headline: "Chip shortage hits Indian electronics manufacturers", detail: "Global semiconductor shortage delays production; import costs rise by 30%.", impact: "negative", change: [-8, -18] }
    ],
    fmcg: [
        { headline: "Monsoon forecast: Best rainfall in 20 years predicted", detail: "Strong monsoon boosts agricultural demand; rural consumer spending expected to rise.", impact: "positive", change: [+10, +18] },
        { headline: "GST Council cuts tax on essential goods", detail: "Reduction in GST on household items will boost FMCG consumption.", impact: "positive", change: [+12, +22] },
        { headline: "Nestle India recalls Maggi batch due to quality concerns", detail: "Regulatory action raises food safety fears across FMCG sector.", impact: "negative", change: [-20, -30] },
        { headline: "HUL launches premium organic product line", detail: "New sustainability-focused products target urban premium consumers.", impact: "positive", change: [+8, +15] },
        { headline: "Crude oil prices spike — packaging costs soar", detail: "35% rise in crude oil increases production costs for FMCG companies.", impact: "negative", change: [-10, -18] },
        { headline: "Rural India sees 15% income rise post-harvest", detail: "Record agricultural prices boost rural purchasing power significantly.", impact: "positive", change: [+10, +20] },
        { headline: "Patanjali loses court case over misleading health claims", detail: "Supreme Court orders recall of 10 products; brand reputation impacted.", impact: "negative", change: [-15, -25] }
    ],
    finance: [
        { headline: "RBI cuts repo rate by 50 basis points", detail: "Rate cut signals accommodative monetary policy; banking stocks rally.", impact: "positive", change: [+15, +25] },
        { headline: "SBI reports highest ever quarterly profit", detail: "Net profit of ₹18,000 crore beats estimates; bad loans at decade low.", impact: "positive", change: [+12, +20] },
        { headline: "HDFC Bank faces RBI audit after compliance failures", detail: "Regulator begins inspection; stock falls on governance concerns.", impact: "negative", change: [-15, -25] },
        { headline: "India's GDP growth revised upward to 8.2%", detail: "Strong industrial output and services growth drives GDP revision.", impact: "positive", change: [+10, +18] },
        { headline: "Rupee hits all-time low of 90 vs USD", detail: "Currency weakness raises import costs; RBI intervention expected.", impact: "negative", change: [-12, -22] },
        { headline: "FII inflows hit record ₹50,000 crore in a month", detail: "Foreign institutional investors bullish on Indian growth story.", impact: "positive", change: [+10, +20] },
        { headline: "Yes Bank faces depositor withdrawal panic", detail: "Liquidity concerns spark bank run; emergency RBI meeting called.", impact: "negative", change: [-25, -35] }
    ],
    global: [
        { headline: "US Fed signals end of interest rate hikes", detail: "Dovish pivot boosts global equities; emerging markets rally strongly.", impact: "positive", change: [+12, +22] },
        { headline: "China factory output at 2-year low", detail: "Manufacturing slowdown in China impacts global supply chains.", impact: "negative", change: [-10, -20] },
        { headline: "India signs major free trade deal with EU", detail: "Landmark trade agreement opens European markets for Indian goods.", impact: "positive", change: [+15, +25] },
        { headline: "Oil prices crash to $50/barrel", detail: "Surprise OPEC+ production increase floods market; energy stocks fall.", impact: "negative", change: [-10, -20] },
        { headline: "Buffett's Berkshire buys Indian company stake", detail: "Warren Buffett's investment signals global confidence in Indian market.", impact: "positive", change: [+10, +18] },
        { headline: "Russia-Ukraine conflict escalates; sanctions extended", detail: "New sanctions disrupt commodity markets; wheat and oil prices surge.", impact: "negative", change: [-12, -22] },
        { headline: "WHO declares end of global health emergency", detail: "Post-pandemic economic recovery accelerates; travel and hospitality boom.", impact: "positive", change: [+8, +16] }
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
    ['screen-welcome','screen-create','screen-join','screen-lobby','screen-game','screen-event-result','screen-leaderboard'].forEach(id => document.getElementById(id).classList.add('hidden'));
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
    setInterval(() => { if (isHost) broadcast({ type: 'PING' }); }, 3000); showToast("Error: " + err.type); if (onFail) onFail(); } });
}

function broadcast(data) { Object.values(guestConns).forEach(c => { if (c.open) c.send(data); }); }

// ---- Create Room ----
function createRoom() {
    const topic = document.getElementById('select-topic').value;
    const rounds = parseInt(document.getElementById('select-rounds').value, 10);

    gameState.topic = topic;
    gameState.totalEvents = rounds;
    const eventPool = [...MARKET_EVENTS[topic]].sort(() => Math.random() - 0.5);
    gameState.events = eventPool.slice(0, rounds);

    document.getElementById('btn-create-room').textContent = "Setting up...";

    initPeer(id => {
        document.getElementById('btn-create-room').textContent = "Generate Room";
        isHost = true;
        players = [{ id: myId, name: myName, disconnected: false }];
        gameState.portfolios = { [myId]: STARTING_CASH };
        gameState.correctCounts = { [myId]: 0 };

        hideAllScreens(); document.getElementById('screen-lobby').classList.remove('hidden');
        document.getElementById('lobby-topic').textContent = `Market Mavericks · ${topic} · ${rounds} Events`;
        document.getElementById('invite-link').textContent = window.location.origin + window.location.pathname + '?room=' + id;
        renderLobby();

        peer.on('connection', conn => {
            if (gameState.gameOver) { conn.on('open', () => { conn.send({ type: 'ERROR', msg: 'This game has already ended. Please create a new room.' }); setTimeout(() => conn.close(), 500); }); return; }
            if (players.filter(p => !p.disconnected).length >= 4) {
                conn.on('open', () => { conn.send({ type: 'ERROR', msg: 'Room full (max 4)' }); setTimeout(() => conn.close(), 500); }); return;
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
}

function handleHostData(data, fromId) {
    if (data.type === 'PONG') return;
    if (data.type === 'JOIN') {
        players.push({ id: fromId, name: data.name, disconnected: false });
        gameState.portfolios[fromId] = STARTING_CASH;
        gameState.correctCounts[fromId] = 0;
        broadcast({ type: 'LOBBY_UPDATE', players, settings: { topic: gameState.topic, totalEvents: gameState.totalEvents, events: gameState.events } });
        renderLobby();
    }
    if (data.type === 'TRADE') {
        gameState.trades[fromId] = data.decision;
        broadcastTradeCount();
        checkAllTraded();
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
    const failTimer = setTimeout(() => showToast("Timed out."), 12000);

    peer.on('open', () => {
        peer.on('disconnected', () => { console.log('Peer disconnected, reconnecting...'); peer.reconnect(); });
        setInterval(() => { if (!isHost && hostConn && hostConn.open) hostConn.send({ type: 'PONG' }); }, 3000);
        hostConn = peer.connect(ROOM_PREFIX + code, { reliable: true });
        hostConn.on('open', () => {
            clearTimeout(failTimer); isHost = false; myId = peer.id;
            hostConn.send({ type: 'JOIN', name: myName });
            hideAllScreens(); document.getElementById('screen-lobby').classList.remove('hidden');
            document.getElementById('invite-link').textContent = window.location.origin + window.location.pathname + '?room=' + code;
            document.getElementById('btn-start-game').classList.add('hidden');
            document.getElementById('wait-host-msg').classList.remove('hidden');
        });
        hostConn.on('data', handleGuestData);
        hostConn.on('close', () => { showToast("Host disconnected."); uiShowWelcome(); });
        hostConn.on('error', err => { clearTimeout(failTimer); showToast("Connect failed: " + err.type); });
    });
    peer.on('error', err => { showToast("Error: " + err.type); });
}

function handleGuestData(data) {
    if (data.type === 'PING') return;
    if (data.type === 'ERROR') { showToast(data.msg); uiShowWelcome(); }
    if (data.type === 'LOBBY_UPDATE') {
        players = data.players;
        gameState = { ...gameState, ...data.settings };
        document.getElementById('lobby-topic').textContent = `Market Mavericks · ${data.settings.topic} · ${data.settings.totalEvents} Events`;
        renderLobby();
    }
    if (data.type === 'START_EVENT') { gameState.eventIndex = data.eventIndex; gameState.portfolios = data.portfolios; startEventUI(data.event, data.eventIndex); }
    if (data.type === 'TRADE_COUNT') { const el = document.getElementById('waiting-count'); if (el) el.textContent = `${data.count} / ${data.total} traded`; }
    if (data.type === 'EVENT_RESULT') { gameState.portfolios = data.portfolios; gameState.correctCounts = data.correctCounts; showEventResult(data.event, data.change, data.results, data.eventIndex, data.totalEvents); }
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
    gameState.eventIndex = 0;
    gameState.gameStarted = true;
    players.forEach(p => { gameState.portfolios[p.id] = STARTING_CASH; gameState.correctCounts[p.id] = 0; });
    hostNextEvent();
}

function hostNextEvent() {
    if (!isHost) return;
    if (gameState.eventIndex >= gameState.totalEvents) { broadcast({ type: 'END_GAME' }); showLeaderboard(); return; }
    gameState.trades = {};
    myTradeSubmitted = false;
    const event = gameState.events[gameState.eventIndex];
    broadcast({ type: 'START_EVENT', event, eventIndex: gameState.eventIndex, portfolios: gameState.portfolios });
    startEventUI(event, gameState.eventIndex);
}

function startEventUI(event, idx) {
    hideAllScreens(); document.getElementById('screen-game').classList.remove('hidden');
    document.getElementById('game-event-num').textContent = `Event ${idx + 1}/${gameState.totalEvents}`;
    document.getElementById('event-headline').textContent = event.headline;
    document.getElementById('event-detail').textContent = event.detail;

    const impactEmoji = event.impact === 'positive' ? '📈' : event.impact === 'negative' ? '📉' : '📊';
    document.getElementById('market-indicator').textContent = impactEmoji;
    document.getElementById('impact-text').textContent = event.impact === 'positive' ? 'Bullish Signal' : event.impact === 'negative' ? 'Bearish Signal' : 'Mixed Signal';
    document.getElementById('impact-text').className = `text-sm font-semibold mt-1 ${event.impact === 'positive' ? 'text-green-600' : event.impact === 'negative' ? 'text-red-600' : 'text-slate-500'}`;

    document.getElementById('trade-submitted').classList.add('hidden');
    document.getElementById('waiting-count').textContent = '';
    const btns = document.querySelectorAll('.trade-btn');
    btns.forEach(b => b.disabled = false);

    updatePortfolioBar();

    let timeLeft = 20;
    document.getElementById('timer-display').textContent = timeLeft + 's';
    clearInterval(tradeTimer);
    tradeTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-display').textContent = timeLeft + 's';
        if (timeLeft <= 0) { clearInterval(tradeTimer); if (!myTradeSubmitted) placeTrade('hold'); }
    }, 1000);
}

function updatePortfolioBar() {
    const bar = document.getElementById('portfolio-bar');
    bar.innerHTML = players.map(p => {
        const val = gameState.portfolios[p.id] || STARTING_CASH;
        const change = val - STARTING_CASH;
        const cls = change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-slate-500';
        return `<div class="portfolio-card">
            <p class="text-xs text-slate-500 font-medium truncate">${p.name}${p.id === myId ? ' (You)' : ''}</p>
            <p class="font-bold text-slate-900">₹${val.toLocaleString()}</p>
            <p class="text-xs ${cls} font-semibold">${change >= 0 ? '+' : ''}₹${change.toLocaleString()}</p>
        </div>`;
    }).join('');
}

function placeTrade(decision) {
    if (myTradeSubmitted) return;
    clearInterval(tradeTimer);
    myTradeSubmitted = true;
    document.querySelectorAll('.trade-btn').forEach(b => b.disabled = true);
    document.getElementById('trade-submitted').classList.remove('hidden');

    if (isHost) {
        gameState.trades[myId] = decision;
        broadcastTradeCount();
        checkAllTraded();
    } else {
        hostConn.send({ type: 'TRADE', decision });
        if(window.guestWaitTimeout) clearTimeout(window.guestWaitTimeout);
        window.guestWaitTimeout = setTimeout(() => { alert("Host disconnected or game got stuck. Leaving the room."); safeExit(); }, 10 * 1000 + 10000);
    }
}

function broadcastTradeCount() {
    const count = Object.keys(gameState.trades).length;
    const total = players.filter(p => !p.disconnected).length;
    broadcast({ type: 'TRADE_COUNT', count, total });
}

function checkAllTraded() {
    if (!isHost) return;
    const active = players.filter(p => !p.disconnected);
    if (active.every(p => gameState.trades[p.id] !== undefined)) {
        clearInterval(tradeTimer);
        resolveEvent();
    }
}

function resolveEvent() {
    const event = gameState.events[gameState.eventIndex];
    const [minChange, maxChange] = event.change;
    const actualChange = Math.floor(Math.random() * (maxChange - minChange + 1)) + minChange;

    const results = players.filter(p => !p.disconnected).map(p => {
        const trade = gameState.trades[p.id] || 'hold';
        const portfolio = gameState.portfolios[p.id] || STARTING_CASH;
        let profit = 0;
        // Trading logic: if you invested and market went up, you gain; if market went down, you lose
        if (trade === 'buy') {
            profit = Math.round(portfolio * actualChange / 100);
            if (actualChange > 0) gameState.correctCounts[p.id]++;
        } else if (trade === 'sell') {
            profit = Math.round(portfolio * -actualChange / 100); // inverse
            if (actualChange < 0) gameState.correctCounts[p.id]++;
        }
        // hold = no change
        gameState.portfolios[p.id] = Math.max(0, portfolio + profit);
        return { id: p.id, name: p.name, trade, profit, portfolio: gameState.portfolios[p.id] };
    });

    gameState.eventIndex++;
    broadcast({ type: 'EVENT_RESULT', event, change: actualChange, results, portfolios: gameState.portfolios, correctCounts: gameState.correctCounts, eventIndex: gameState.eventIndex, totalEvents: gameState.totalEvents });
    showEventResult(event, actualChange, results, gameState.eventIndex, gameState.totalEvents);
}

function showEventResult(event, change, results, eventIdx, totalEvents) {
    if(window.guestWaitTimeout) clearTimeout(window.guestWaitTimeout);
    hideAllScreens(); document.getElementById('screen-event-result').classList.remove('hidden');
    document.getElementById('result-title').textContent = event.headline;
    const cls = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
    document.getElementById('result-change').className = `text-center text-3xl font-black mb-4 ${cls}`;
    document.getElementById('result-change').textContent = `${change > 0 ? '+' : ''}${change}% ${change > 0 ? '📈' : change < 0 ? '📉' : '—'}`;

    const sorted = [...results].sort((a,b) => b.portfolio - a.portfolio);
    document.getElementById('result-players').innerHTML = sorted.map((r, i) => {
        const tradeLabel = r.trade === 'buy' ? '📈 Invested' : r.trade === 'sell' ? '📉 Withdrew' : '⏸ Held';
        const profitCls = r.profit > 0 ? 'text-green-600' : r.profit < 0 ? 'text-red-600' : 'text-slate-500';
        return `<div class="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
            <div>
                <p class="font-bold text-slate-800">#${i+1} ${r.name}${r.id === myId ? ' (You)' : ''}</p>
                <p class="text-sm text-slate-500">${tradeLabel} → <span class="${profitCls} font-semibold">${r.profit >= 0 ? '+' : ''}₹${r.profit.toLocaleString()}</span></p>
            </div>
            <p class="font-bold text-slate-900">₹${r.portfolio.toLocaleString()}</p>
        </div>`;
    }).join('');

    if (isHost) {
        document.getElementById('next-event-btn').classList.remove('hidden');
        document.getElementById('waiting-next-event').classList.add('hidden');
    } else {
        document.getElementById('next-event-btn').classList.add('hidden');
        document.getElementById('waiting-next-event').classList.remove('hidden');
    }
}

function showLeaderboard() {
    gameState.gameOver = true;
    hideAllScreens(); document.getElementById('screen-leaderboard').classList.remove('hidden');
    const sorted = [...players].sort((a,b) => (gameState.portfolios[b.id]||0) - (gameState.portfolios[a.id]||0));
    document.getElementById('leaderboard-list').innerHTML = sorted.map((p, i) => {
        const val = gameState.portfolios[p.id] || STARTING_CASH;
        const change = val - STARTING_CASH;
        const cls = change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-slate-500';
        return `<div class="flex items-center justify-between p-4 rounded-xl border ${i===0 ? 'border-yellow-300 bg-yellow-50' : 'border-slate-200 bg-white'} ${p.disconnected ? 'opacity-50' : ''}">
            <div class="flex items-center gap-3">
                <span class="font-bold text-slate-400">#${i+1}</span>
                <div>
                    <p class="font-semibold text-slate-800">${p.name}${p.id === myId ? ' (You)' : ''}${p.disconnected ? ' 🔌' : ''}</p>
                    <p class="text-xs text-slate-500">✅ ${gameState.correctCounts[p.id]||0} / ${gameState.totalEvents} correct calls</p>
                </div>
                ${i===0 ? '<i data-lucide="trophy" class="w-4 h-4 text-yellow-500"></i>' : ''}
            </div>
            <div class="text-right">
                <p class="font-bold text-slate-900">₹${val.toLocaleString()}</p>
                <p class="text-xs ${cls} font-semibold">${change >= 0 ? '+' : ''}₹${change.toLocaleString()}</p>
            </div>
        </div>`;
    }).join('');
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
