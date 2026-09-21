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

NEW_SCROLLBAR = '''#queryModal::-webkit-scrollbar { width: 14px; }
#queryModal::-webkit-scrollbar-track { background: transparent; margin: 24px 0; }
#queryModal::-webkit-scrollbar-thumb { background-color: #94a3b8; border-radius: 10px; border: 4px solid transparent; background-clip: padding-box; }
#queryModal::-webkit-scrollbar-thumb:hover { background-color: #64748b; border: 4px solid transparent; background-clip: padding-box; }'''

for t in targets:
    path = os.path.join(base, t.replace('/', os.sep))
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        c = f.read()

    # Regex to replace the 4 lines of scrollbar CSS
    pattern = re.compile(
        r'#queryModal::-webkit-scrollbar \{ width: 6px; \}\s*'
        r'#queryModal::-webkit-scrollbar-track \{ background: transparent; margin: 24px 0; \}\s*'
        r'#queryModal::-webkit-scrollbar-thumb \{ background-color: #64748b; border-radius: 10px; \}\s*'
        r'#queryModal::-webkit-scrollbar-thumb:hover \{ background-color: #475569; \}', 
        re.MULTILINE
    )
    
    if pattern.search(c):
        c = pattern.sub(NEW_SCROLLBAR, c)
        
        # Bump to 722
        c = c.replace('?v=721', '?v=722')
        
        with open(path, 'w', encoding='utf-8', errors='replace') as f:
            f.write(c)
        print("FIXED SCROLLBAR:", t)

# Bump other html files too
for root, dirs, files in os.walk(base):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            if '?v=721' in content:
                content = content.replace('?v=721', '?v=722')
                with open(path, 'w', encoding='utf-8', errors='ignore') as f:
                    f.write(content)

# update sw.js
sw_path = os.path.join(base, 'sw.js')
if os.path.exists(sw_path):
    with open(sw_path, 'r', encoding='utf-8') as f:
        sw_content = f.read()
    sw_content = sw_content.replace('solmates-cache-v721', 'solmates-cache-v722')
    sw_content = sw_content.replace('(v721)', '(v722)')
    with open(sw_path, 'w', encoding='utf-8') as f:
        f.write(sw_content)
    print("Bumped sw.js to v722")
