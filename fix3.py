import sys

with open('games/firebase-multiplayer.js', 'r', encoding='utf-8') as f:
    fb_js = f.read()

# Fix 1: Presence tracking
old_presence = '''        // Host Presence tracking
        const hostPresenceRef = db.ref(solmates-rooms//hostDisconnectedAt);
        hostPresenceRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
        hostPresenceRef.remove(); // Clear on connect/reconnect'''

new_presence = '''        // Host Presence tracking
        const hostPresenceRef = db.ref(solmates-rooms//hostDisconnectedAt);
        db.ref('.info/connected').on('value', snap => {
            if (snap.val() === true) {
                hostPresenceRef.remove();
                hostPresenceRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
            }
        });'''
fb_js = fb_js.replace(old_presence, new_presence)

# Fix 2: Timeout for lobby popup from 5000 to 30000
fb_js = fb_js.replace("} else if (now - disconnectTime > 5000) {", "} else if (now - disconnectTime > 30000) {")
fb_js = fb_js.replace("disconnectTimeoutId = setTimeout(checkTimeout, 5000);", "disconnectTimeoutId = setTimeout(checkTimeout, 10000);")

with open('games/firebase-multiplayer.js', 'w', encoding='utf-8') as f:
    f.write(fb_js)

with open('games/quiz-battle/game.js', 'r', encoding='utf-8') as f:
    game_js = f.read()

# Fix 3: Popup UI
old_ui = '''                    el.style.position = 'fixed';
                    el.style.top = '0'; el.style.left = '0'; el.style.width = '100vw'; el.style.height = '100vh';
                    el.style.backgroundColor = 'rgba(0,0,0,0.8)';
                    el.style.color = 'white'; el.style.display = 'flex'; el.style.flexDirection = 'column';
                    el.style.justifyContent = 'center'; el.style.alignItems = 'center'; el.style.zIndex = '9999';
                    el.innerHTML = <h2>Host may be offline</h2><p>Wait for them or leave?</p><div style="margin-top:20px;display:flex;gap:10px;"><button onclick="document.getElementById('sol-host-reconnect').style.display='none'" style="padding:10px 20px;background:#3b82f6;border-radius:5px;font-weight:bold;">Stay</button><button onclick="window.location.href='/'" style="padding:10px 20px;background:#ef4444;border-radius:5px;font-weight:bold;">Leave</button></div>;'''

new_ui = '''                    el.style.position = 'fixed';
                    el.style.top = '20px'; el.style.left = '50%'; el.style.transform = 'translateX(-50%)';
                    el.style.backgroundColor = 'white';
                    el.style.color = 'black'; 
                    el.style.padding = '20px';
                    el.style.borderRadius = '10px';
                    el.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                    el.style.display = 'flex'; el.style.flexDirection = 'column';
                    el.style.alignItems = 'center'; el.style.zIndex = '9999';
                    el.innerHTML = <h3 style="margin:0;font-size:18px;">Host may be offline</h3><p style="margin:10px 0;font-size:14px;color:#666;">Wait for them or leave?</p><div style="margin-top:10px;display:flex;gap:10px;"><button onclick="document.getElementById('sol-host-reconnect').style.display='none'" style="padding:8px 16px;background:#3b82f6;color:white;border-radius:5px;font-weight:bold;">Stay</button><button onclick="window.location.href='/'" style="padding:8px 16px;background:#ef4444;color:white;border-radius:5px;font-weight:bold;">Leave</button></div>;'''

game_js = game_js.replace(old_ui, new_ui)

with open('games/quiz-battle/game.js', 'w', encoding='utf-8') as f:
    f.write(game_js)
