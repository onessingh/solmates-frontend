import sys

with open('games/firebase-multiplayer.js', 'r', encoding='utf-8') as f:
    fb_js = f.read()

old_fire = "this._fire('open', 'SOLMATES-' + this.id);"
new_fire = "const prefix = this.id.startsWith('GUEST-') ? '' : 'SOLMATES-';\\n        this._fire('open', prefix + this.id);"

fb_js = fb_js.replace(old_fire, new_fire)

with open('games/firebase-multiplayer.js', 'w', encoding='utf-8') as f:
    f.write(fb_js)

with open('games/quiz-battle/game.js', 'r', encoding='utf-8') as f:
    game_js = f.read()

old_sort = '''    const sorted = [...roomState.players].sort((a,b) => {
        return (scores[b.id]||0) - (scores[a.id]||0);
    });'''

new_sort = '''    const sorted = [...roomState.players].sort((a,b) => {
        const sA = scores[a.id] || 0;
        const sB = scores[b.id] || 0;
        if (sB !== sA) return sB - sA;
        if (a.disconnected && !b.disconnected) return 1;
        if (!a.disconnected && b.disconnected) return -1;
        return 0;
    });'''

game_js = game_js.replace(old_sort, new_sort)

with open('games/quiz-battle/game.js', 'w', encoding='utf-8') as f:
    f.write(game_js)
