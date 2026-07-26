import sys

with open('games/firebase-multiplayer.js', 'r', encoding='utf-8') as f:
    fb_js = f.read()

old_timeout = '''                        } else if (now - disconnectTime > 10000) {
                            if (conn._handlers.host_disconnect_early && conn._handlers.host_disconnect_early.length > 0) {
                                conn._handlers.host_disconnect_early.forEach(cb => cb());
                            }
                            if (conn._handlers.host_disconnect && conn._handlers.host_disconnect.length > 0) {
                                conn._handlers.host_disconnect.forEach(cb => cb());
                            }
                            disconnectTimeoutId = setTimeout(checkTimeout, 10000);
                        } else if (now - disconnectTime > 30000) {
                            if (conn._handlers.host_disconnect && conn._handlers.host_disconnect.length > 0) {
                                conn._handlers.host_disconnect.forEach(cb => cb());
                            }
                            disconnectTimeoutId = setTimeout(checkTimeout, 10000);
                        } else {'''

new_timeout = '''                        } else if (now - disconnectTime > 30000) {
                            if (conn._handlers.host_disconnect && conn._handlers.host_disconnect.length > 0) {
                                conn._handlers.host_disconnect.forEach(cb => cb());
                            }
                            if (conn._handlers.host_disconnect_early && conn._handlers.host_disconnect_early.length > 0) {
                                conn._handlers.host_disconnect_early.forEach(cb => cb());
                            }
                            disconnectTimeoutId = setTimeout(checkTimeout, 10000);
                        } else if (now - disconnectTime > 10000) {
                            if (conn._handlers.host_disconnect_early && conn._handlers.host_disconnect_early.length > 0) {
                                conn._handlers.host_disconnect_early.forEach(cb => cb());
                            }
                            disconnectTimeoutId = setTimeout(checkTimeout, 5000);
                        } else {'''

fb_js = fb_js.replace(old_timeout, new_timeout)

with open('games/firebase-multiplayer.js', 'w', encoding='utf-8') as f:
    f.write(fb_js)

with open('games/quiz-battle/game.js', 'r', encoding='utf-8') as f:
    game_js = f.read()

old_resume = '''                    // Resume game
                    setTimeout(() => {
                        if (roomState.currentQ > 0) { roomState.currentQ--; resolveQuestion(); } 
                        else { sendNextQuestion(); }
                    }, 3000);'''

new_resume = '''                    // Resume game
                    setTimeout(() => {
                        sendNextQuestion();
                    }, 3000);'''

game_js = game_js.replace(old_resume, new_resume)

with open('games/quiz-battle/game.js', 'w', encoding='utf-8') as f:
    f.write(game_js)
