import sys

with open('games/quiz-battle/game.js', 'r', encoding='utf-8') as f:
    game_js = f.read()

# Fix 1: Make hostConn globally accessible
game_js = game_js.replace("const hostConn = peer.connect('SOLMATES-' + hostId);", "const hostConn = peer.connect('SOLMATES-' + hostId);\n        window.currentHostConn = hostConn;")

# Fix 2: Close hostConn on migration
migrate_start = "function migrateHost(hostId) {\n    if (!roomState.backupQuestions) return;\n    const db = firebase.database();"
migrate_replacement = "function migrateHost(hostId) {\n    if (!roomState.backupQuestions) return;\n    if (window.currentHostConn) {\n        window.currentHostConn.close();\n        window.currentHostConn = null;\n    }\n    const db = firebase.database();"
game_js = game_js.replace(migrate_start, migrate_replacement)

# Fix 3: Don't renderLobby if game started
lobby_render = "broadcast({ type: 'LOBBY_UPDATE', players: roomState.players, topic: currentSettings });\n                                renderLobby();"
lobby_replacement = "broadcast({ type: 'LOBBY_UPDATE', players: roomState.players, topic: currentSettings });\n                                if (!roomState.backupQuestions) renderLobby();"
game_js = game_js.replace(lobby_render, lobby_replacement)

with open('games/quiz-battle/game.js', 'w', encoding='utf-8') as f:
    f.write(game_js)

with open('games/firebase-multiplayer.js', 'r', encoding='utf-8') as f:
    fb_js = f.read()

# Fix 4: Firebase multiplayer checkTimeout logic
old_timeout = '''                        } else if (now - disconnectTime > 60000) {
                            if (conn._handlers.host_disconnect && conn._handlers.host_disconnect.length > 0) {
                                conn._handlers.host_disconnect.forEach(cb => cb());
                            }
                            disconnectTimeoutId = setTimeout(checkTimeout, 10000);
                        } else if (now - disconnectTime > 10000) {
                            if (conn._handlers.host_disconnect_early && conn._handlers.host_disconnect_early.length > 0) {
                                conn._handlers.host_disconnect_early.forEach(cb => cb());
                            }
                            disconnectTimeoutId = setTimeout(checkTimeout, 10000);
                        } else {
                            disconnectTimeoutId = setTimeout(checkTimeout, 10000);
                        }'''

new_timeout = '''                        } else if (now - disconnectTime > 10000) {
                            if (conn._handlers.host_disconnect_early && conn._handlers.host_disconnect_early.length > 0) {
                                conn._handlers.host_disconnect_early.forEach(cb => cb());
                            }
                            if (conn._handlers.host_disconnect && conn._handlers.host_disconnect.length > 0) {
                                conn._handlers.host_disconnect.forEach(cb => cb());
                            }
                            disconnectTimeoutId = setTimeout(checkTimeout, 10000);
                        } else if (now - disconnectTime > 5000) {
                            if (conn._handlers.host_disconnect && conn._handlers.host_disconnect.length > 0) {
                                conn._handlers.host_disconnect.forEach(cb => cb());
                            }
                            disconnectTimeoutId = setTimeout(checkTimeout, 5000);
                        } else {
                            disconnectTimeoutId = setTimeout(checkTimeout, 5000);
                        }'''

fb_js = fb_js.replace(old_timeout, new_timeout)

with open('games/firebase-multiplayer.js', 'w', encoding='utf-8') as f:
    f.write(fb_js)
