import os

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

old_thumb = '#queryModal::-webkit-scrollbar-thumb { background: var(--qborder, #cbd5e1); border-radius: 10px; }'
new_thumb = '#queryModal::-webkit-scrollbar-thumb { background: var(--qsub, #94a3b8); border-radius: 10px; }'

html_count = 0
for t in targets:
    path = os.path.join(base, t.replace('/', os.sep))
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        c = f.read()

    if old_thumb in c:
        c = c.replace(old_thumb, new_thumb)
        
        # also bump cache to 718 for just these files
        c = c.replace('?v=717', '?v=718')
        
        with open(path, 'w', encoding='utf-8', errors='replace') as f:
            f.write(c)
        html_count += 1
        print("FIXED THUMB:", t)

# Bump other html files too to 718
for root, dirs, files in os.walk(base):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            if '?v=717' in content:
                content = content.replace('?v=717', '?v=718')
                with open(path, 'w', encoding='utf-8', errors='ignore') as f:
                    f.write(content)

# update sw.js
sw_path = os.path.join(base, 'sw.js')
if os.path.exists(sw_path):
    with open(sw_path, 'r', encoding='utf-8') as f:
        sw_content = f.read()
    sw_content = sw_content.replace('solmates-cache-v717', 'solmates-cache-v718')
    sw_content = sw_content.replace('(v717)', '(v718)')
    with open(sw_path, 'w', encoding='utf-8') as f:
        f.write(sw_content)
    print("Bumped sw.js to v718")
