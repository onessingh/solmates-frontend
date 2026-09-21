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

for t in targets:
    path = os.path.join(base, t.replace('/', os.sep))
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        c = f.read()

    if 'placeholder="s.singh@gmail.com"' in c:
        c = c.replace('placeholder="s.singh@gmail.com"', 'placeholder="singh@gmail.com"')
        with open(path, 'w', encoding='utf-8', errors='replace') as f:
            f.write(c)
        print("UPDATED:", t)
