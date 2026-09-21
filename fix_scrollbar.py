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

old_modal_css = '#queryModal { box-sizing: border-box; background: var(--qbg, rgba(255,255,255,0.98)); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); color: var(--qtxt, #1e293b); border: 1px solid var(--qborder, rgba(0,0,0,0.08)); border-radius: 20px; padding: 24px 22px 30px; width: 100%; max-width: 380px; max-height: 85vh; overflow-y: auto; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.2); transform: scale(0.95); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }'
new_modal_css = '#queryModal { box-sizing: border-box; background: var(--qbg, rgba(255,255,255,0.98)); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); color: var(--qtxt, #1e293b); border: 1px solid var(--qborder, rgba(0,0,0,0.08)); border-radius: 20px; padding: 0; width: 100%; max-width: 380px; max-height: 85vh; overflow-y: auto; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.2); transform: scale(0.95); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n#qFormSection { padding: 24px 22px 30px; }'

for t in targets:
    path = os.path.join(base, t.replace('/', os.sep))
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        c = f.read()

    if old_modal_css in c:
        c = c.replace(old_modal_css, new_modal_css)
        with open(path, 'w', encoding='utf-8', errors='replace') as f:
            f.write(c)
        print("UPDATED:", t)
    else:
        print("NOT FOUND IN:", t)
