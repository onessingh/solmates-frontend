import os
import re

games = ['quiz-battle', 'rapid-fire', 'case-study-arena', 'market-mavericks', 'shark-pitch']

for g in games:
    path = f"c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/games/{g}/game.js"
    if not os.path.exists(path):
        continue
        
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove hardcoded "Host disconnected" toasts
    content = re.sub(
        r"if\s*\(\s*typeof showToast === ['\"]function['\"]\s*\)\s*showToast\(['\"]Host disconnected\.\s*Attempting migration\.\.\.['\"]\);\s*",
        "", content
    )
    content = re.sub(
        r"showToast\(['\"]Host left\. Attempting migration\.\.\.['\"]\);\s*",
        "", content
    )

    # 2. Add dynamic disconnect toast at start of migrateHost
    migrate_start_marker = "isMigrating = true;"
    custom_disconnect_toast = '''isMigrating = true;
      let pList = typeof players !== 'undefined' ? players : (typeof roomState !== 'undefined' ? roomState.players : []);
      let hostName = "Host";
      if (pList && pList.length > 0) {
          let oldHost = pList.find(p => p.id === hostId || p.id === hostId + '-LEFT');
          if (oldHost) hostName = oldHost.name;
      }
      if (typeof showToast === 'function') showToast(hostName + " disconnected");
'''
    if "let pList =" not in content:
        content = content.replace(migrate_start_marker, custom_disconnect_toast)

    # 3. Add "X is the new host" in the else block
    # We find the "isMigrating = false;" inside the else block of transaction
    # Since the exact code varies (manualJoinRoomReconnect vs connectToHost), we'll inject right before isMigrating = false;
    
    inject_new_host_toast = '''
                  let newHostName = "Someone";
                  let pList2 = typeof players !== 'undefined' ? players : (typeof roomState !== 'undefined' ? roomState.players : []);
                  let newHostPlayer = pList2.find(p => p.id === snapshot.val());
                  if (newHostPlayer) newHostName = newHostPlayer.name;
                  if (typeof showToast === 'function') showToast(newHostName + " is the new host");
                  
                  isMigrating = false;'''
                  
    content = re.sub(r"\bisMigrating\s*=\s*false;\s*(manualJoinRoomReconnect|connectToHost)\(hostId\);", 
        lambda m: inject_new_host_toast + "\n                  " + m.group(1) + "(hostId);", content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Patched {g}")
