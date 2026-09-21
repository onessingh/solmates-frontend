import os
import re

base = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
targets = [
    'notification.html',
    'database/pdf-viewer.html',
    'database/video-viewer.html',
    'database/index.html',
    'database/healthcare.html',
    'database/classes/index.html',
    'database/elearning-subjects.html',
    'database/youtube-browse.html',
    'database/youtube-content.html',
    'database/folder-content.html',
    'database/view.html'
]

NEW_STYLE = '''<style>
#queryFloatBtn { position: fixed; bottom: 75px; right: 16px; z-index: 9999; background: linear-gradient(135deg, #0f2b46, #1a4a75); color: #fff; border: none; border-radius: 50px; padding: 10px 18px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 15px rgba(15,43,70,0.4); display: flex; align-items: center; gap: 6px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
#queryFloatBtn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 8px 25px rgba(15,43,70,0.5); }
#queryModalOverlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); z-index: 10000; align-items: center; justify-content: center; padding: 15px; }
#queryModalOverlay.open { display: flex; animation: qFadeIn 0.3s ease; }
@keyframes qFadeIn { from { opacity: 0; } to { opacity: 1; } }
#queryModal { box-sizing: border-box; background: var(--qbg, rgba(255,255,255,0.98)); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); color: var(--qtxt, #1e293b); border: 1px solid var(--qborder, rgba(0,0,0,0.08)); border-radius: 20px; padding: 24px 22px 30px; width: 100%; max-width: 380px; max-height: 85vh; overflow-y: auto; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.2); transform: scale(0.95); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
#queryModalOverlay.open #queryModal { transform: scale(1); }
#queryModal::-webkit-scrollbar { width: 6px; }
#queryModal::-webkit-scrollbar-track { background: transparent; margin: 24px 0; }
#queryModal::-webkit-scrollbar-thumb { background-color: #64748b; border-radius: 10px; }
#queryModal::-webkit-scrollbar-thumb:hover { background-color: #475569; }
#qHeader { text-align: center; margin-bottom: 20px; }
#queryModal h2 { color: var(--qhead, #0f2b46); font-size: 20px; font-weight: 700; margin: 0 0 4px 0; letter-spacing: -0.5px; }
#queryModal p.qsub { color: var(--qsub, #64748b); font-size: 13px; margin: 0; font-weight: 500; }
.qfield { margin-bottom: 15px; text-align: left; }
.qfield label { display: block; font-size: 13px; font-weight: 600; color: var(--qlabel, #334155); margin-bottom: 6px; margin-left: 4px; }
.qfield input, .qfield select, .qfield textarea { box-sizing: border-box; width: 100%; padding: 12px 14px; border: 1.5px solid var(--qborder, #e2e8f0); border-radius: 12px; font-size: 14px; color: var(--qtxt, #0f172a); background: var(--qinput, #f8fafc); outline: none; transition: all 0.2s ease; font-family: inherit; }
.qfield input:focus, .qfield select:focus, .qfield textarea:focus { border-color: var(--qfocus, #3b82f6); background: var(--qinput-focus, #ffffff); box-shadow: 0 0 0 3px var(--qring, rgba(59, 130, 246, 0.15)); }
.qfield textarea { resize: vertical; min-height: 85px; line-height: 1.5; }
.qchar { font-size: 11px; color: var(--qsub, #94a3b8); text-align: right; margin-top: 4px; margin-right: 4px; font-weight: 500; }
#qSubmitBtn { width: 100%; padding: 14px; background: linear-gradient(135deg, var(--qbtn1, #0f2b46), var(--qbtn2, #1a4a75)); color: #ffffff; border: none; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 10px; margin-bottom: 20px; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(15,43,70,0.2); display: flex; justify-content: center; align-items: center; gap: 8px; }
#qSubmitBtn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(15,43,70,0.3); }
#qSubmitBtn:active { transform: translateY(0); }
#qSubmitBtn:disabled { background: var(--qborder, #cbd5e1); color: var(--qsub, #94a3b8); cursor: not-allowed; box-shadow: none; transform: none; }
#qCloseBtn { position: absolute; top: 16px; right: 16px; background: var(--qinput, #f1f5f9); border: none; width: 32px; height: 32px; border-radius: 50%; font-size: 14px; color: var(--qsub, #64748b); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; z-index: 10; }
#qCloseBtn:hover { background: var(--qborder, #e2e8f0); color: var(--qtxt, #0f172a); }
#qSuccessMsg { display: none; text-align: center; padding: 30px 10px 40px; }
#qSuccessMsg .qcheck { font-size: 54px; margin-bottom: 10px; animation: qPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
@keyframes qPop { 0% { transform: scale(0); } 100% { transform: scale(1); } }
#qSuccessMsg h3 { color: var(--qhead, #0f2b46); margin: 0 0 8px; font-size: 22px; font-weight: 700; }
#qSuccessMsg p { color: var(--qsub, #64748b); font-size: 14px; margin: 0; line-height: 1.5; }
.qopt { color: var(--qsub, #94a3b8); font-size: 11px; font-weight: 500; }
html[data-solmates-theme=dark] #queryModal, body.dark-mode #queryModal { --qbg: rgba(15,23,42,0.95); --qtxt: #f8fafc; --qhead: #f8fafc; --qsub: #94a3b8; --qlabel: #e2e8f0; --qborder: rgba(255,255,255,0.1); --qinput: rgba(0,0,0,0.2); --qinput-focus: rgba(0,0,0,0.4); --qfocus: #3b82f6; --qring: rgba(59,130,246,0.25); --qbtn1: #3b82f6; --qbtn2: #2563eb; }
</style>'''

for t in targets:
    path = os.path.join(base, t.replace('/', os.sep))
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        c = f.read()

    # Replace everything between <!-- ===== ASK QUERY WIDGET ===== -->\n<style> and </style>
    pattern = re.compile(r'<!-- ===== ASK QUERY WIDGET ===== -->\s*<style>.*?</style>', re.DOTALL)
    
    if pattern.search(c):
        c = pattern.sub(f'<!-- ===== ASK QUERY WIDGET ===== -->\n{NEW_STYLE}', c)
        
        # Bump to 721
        c = c.replace('?v=720', '?v=721')
        
        with open(path, 'w', encoding='utf-8', errors='replace') as f:
            f.write(c)
        print("FIXED:", t)

# Bump other html files too
for root, dirs, files in os.walk(base):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            if '?v=720' in content:
                content = content.replace('?v=720', '?v=721')
                with open(path, 'w', encoding='utf-8', errors='ignore') as f:
                    f.write(content)

# update sw.js
sw_path = os.path.join(base, 'sw.js')
if os.path.exists(sw_path):
    with open(sw_path, 'r', encoding='utf-8') as f:
        sw_content = f.read()
    sw_content = sw_content.replace('solmates-cache-v720', 'solmates-cache-v721')
    sw_content = sw_content.replace('(v720)', '(v721)')
    with open(sw_path, 'w', encoding='utf-8') as f:
        f.write(sw_content)
    print("Bumped sw.js to v721")
