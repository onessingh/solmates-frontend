import sys

with open('games/firebase-multiplayer.js', 'r', encoding='utf-8') as f:
    fb_js = f.read()

old_close = '''    close() {
        this.open = false;
        if (!this.isHost) {
            db.ref(solmates-rooms//clients/).remove();
        }
        this._handlers.close.forEach(cb => cb());
    }'''

new_close = '''    close() {
        this.open = false;
        if (!this.isHost) {
            db.ref(solmates-rooms//clients/).remove();
        }
        if (this._cleanup) this._cleanup();
        this._handlers.close.forEach(cb => cb());
    }'''

fb_js = fb_js.replace(old_close, new_close)

old_timeout = '''            setTimeout(() => {
                conn._handlers.open.forEach(cb => cb());
            }, 50);'''

new_timeout = '''            conn._cleanup = () => {
                inboxRef.off();
                db.ref(solmates-rooms//active).off();
                db.ref(solmates-rooms//hostDisconnectedAt).off();
                if (disconnectTimeoutId) clearTimeout(disconnectTimeoutId);
            };
            setTimeout(() => {
                conn._handlers.open.forEach(cb => cb());
            }, 50);'''

fb_js = fb_js.replace(old_timeout, new_timeout)

with open('games/firebase-multiplayer.js', 'w', encoding='utf-8') as f:
    f.write(fb_js)
