import sys

with open('games/firebase-multiplayer.js', 'r', encoding='utf-8') as f:
    fb_js = f.read()

old_close = '''    close() {
        this.open = false;
        if (!this.isHost) {
            db.ref(solmates-rooms//clients/).remove();
        }
        if (this._cleanup) this._cleanup();
        this._handlers.close.forEach(cb => cb());
    }'''

new_close = '''    close() {
        this.open = false;
        if (this._cleanup) this._cleanup();
        this._handlers.close.forEach(cb => cb());
    }'''

fb_js = fb_js.replace(old_close, new_close)

old_check = '''                    const checkTimeout = () => {
                        const now = Date.now() + serverTimeOffset;'''

new_check = '''                    const checkTimeout = () => {
                        if (!conn.open) return;
                        const now = Date.now() + serverTimeOffset;'''

fb_js = fb_js.replace(old_check, new_check)

with open('games/firebase-multiplayer.js', 'w', encoding='utf-8') as f:
    f.write(fb_js)
