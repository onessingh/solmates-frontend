import sys

with open('games/quiz-battle/game.js', 'r', encoding='utf-8') as f:
    game_js = f.read()

old_close = '''                        conn.on('close', () => {
                            const p = roomState.players.find(pl => pl.id === conn.peer);
                            if (p) { p.disconnected = true; showToast(p.name + " disconnected"); }
                            delete guestConns[conn.peer];
                            broadcast({ type: 'LOBBY_UPDATE', players: roomState.players, topic: currentSettings });
                            if (!document.getElementById('screen-lobby').classList.contains('hidden')) renderLobby();
                        });'''

new_close = '''                        conn.on('close', () => {
                            const p = roomState.players.find(pl => pl.id === conn.peer);
                            if (p) { 
                                if (!roomState.backupQuestions) {
                                    roomState.players = roomState.players.filter(pl => pl.id !== conn.peer);
                                } else {
                                    p.disconnected = true; showToast(p.name + " disconnected"); 
                                }
                            }
                            delete guestConns[conn.peer];
                            broadcast({ type: 'LOBBY_UPDATE', players: roomState.players, topic: currentSettings });
                            if (!document.getElementById('screen-lobby').classList.contains('hidden')) renderLobby();
                        });'''

# It appears in 2 places: startServer and migrateHost
game_js = game_js.replace(old_close, new_close)

with open('games/quiz-battle/game.js', 'w', encoding='utf-8') as f:
    f.write(game_js)
