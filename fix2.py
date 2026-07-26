import sys

with open('games/quiz-battle/game.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
in_close = False
in_migrate = False

for i, line in enumerate(lines):
    if "hostConn.on('host_disconnect', () => {" in line:
        in_close = True
        new_lines.append("        hostConn.on('host_disconnect_early', () => {\n")
        new_lines.append("            if (roomState.backupQuestions) {\n")
        new_lines.append("                showToast('Host left. Attempting migration...');\n")
        new_lines.append("                migrateHost(hostId);\n")
        new_lines.append("            }\n")
        new_lines.append("        });\n")
        new_lines.append("        hostConn.on('host_disconnect', () => {\n")
        new_lines.append("            if (!roomState.backupQuestions) {\n")
        new_lines.append("                let el = document.getElementById('sol-host-reconnect');\n")
        new_lines.append("                if (!el) {\n")
        new_lines.append("                    el = document.createElement('div');\n")
        new_lines.append("                    el.id = 'sol-host-reconnect';\n")
        new_lines.append("                    el.style.position = 'fixed';\n")
        new_lines.append("                    el.style.top = '0'; el.style.left = '0'; el.style.width = '100vw'; el.style.height = '100vh';\n")
        new_lines.append("                    el.style.backgroundColor = 'rgba(0,0,0,0.8)';\n")
        new_lines.append("                    el.style.color = 'white'; el.style.display = 'flex'; el.style.flexDirection = 'column';\n")
        new_lines.append("                    el.style.justifyContent = 'center'; el.style.alignItems = 'center'; el.style.zIndex = '9999';\n")
        new_lines.append("                    el.innerHTML = <h2>Host may be offline</h2><p>Wait for them or leave?</p><div style=\"margin-top:20px;display:flex;gap:10px;\"><button onclick=\"document.getElementById('sol-host-reconnect').style.display='none'\" style=\"padding:10px 20px;background:#3b82f6;border-radius:5px;font-weight:bold;\">Stay</button><button onclick=\"window.location.href='/'\" style=\"padding:10px 20px;background:#ef4444;border-radius:5px;font-weight:bold;\">Leave</button></div>;\n")
        new_lines.append("                    document.body.appendChild(el);\n")
        new_lines.append("                } else {\n")
        new_lines.append("                    el.style.display = 'flex';\n")
        new_lines.append("                }\n")
        new_lines.append("            }\n")
        new_lines.append("        });\n")
        continue
    
    if in_close:
        if "        hostConn.on('host_reconnect', () => {" in line:
            new_lines.append(line)
            in_close = False
        continue

    if "        if (committed && snapshot.val() === myId) {" in line:
        new_lines.append(line)
        new_lines.append("            isHost = true;\n")
        new_lines.append("            roomState.questions = roomState.backupQuestions;\n")
        new_lines.append("            roomState.currentAnswers = {};\n")
        in_migrate = True
        continue
        
    if in_migrate:
        if "            roomState.questions = roomState.backupQuestions;" in line:
            continue
        if "            isHost = true;" in line:
            in_migrate = False
            continue

    if "} else if(data.type === 'RESULT') {" in line:
        new_lines.append(line)
        new_lines.append("                roomState.correctCounts = data.correctCounts || {};\n")
        new_lines.append("                roomState.scores = data.scores || {};\n")
        new_lines.append("                showResult(data.correctIdx, data.scores);\n")
        in_result = True
        continue
        
    if "roomState.correctCounts = data.correctCounts || {};" in line:
        # Avoid duplicating if we just wrote it
        continue
        
    if "showResult(data.correctIdx, data.scores);" in line:
        continue

    new_lines.append(line)

with open('games/quiz-battle/game.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
