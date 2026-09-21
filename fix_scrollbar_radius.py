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

# We need to change overflow-y: auto to overflow: hidden on #queryModal
old_modal = '#queryModal { box-sizing: border-box; background: var(--qbg, rgba(255,255,255,0.98)); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); color: var(--qtxt, #1e293b); border: 1px solid var(--qborder, rgba(0,0,0,0.08)); border-radius: 20px; padding: 0; width: 100%; max-width: 380px; max-height: 85vh; overflow-y: auto; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.2); transform: scale(0.95); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }'
new_modal = '#queryModal { box-sizing: border-box; background: var(--qbg, rgba(255,255,255,0.98)); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); color: var(--qtxt, #1e293b); border: 1px solid var(--qborder, rgba(0,0,0,0.08)); border-radius: 20px; padding: 0; width: 100%; max-width: 380px; max-height: 85vh; overflow: hidden; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.2); transform: scale(0.95); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }'

# Add overflow-y: auto to qFormSection
old_form = '#qFormSection { padding: 24px 22px 30px; }'
new_form = '#qFormSection { padding: 24px 22px 30px; max-height: 85vh; overflow-y: auto; }'

# Update scrollbar pseudo elements to target qFormSection instead of queryModal
old_sb1 = '#queryModal::-webkit-scrollbar { width: 6px; }'
new_sb1 = '#qFormSection::-webkit-scrollbar { width: 6px; }'

old_sb2 = '#queryModal::-webkit-scrollbar-track { background: transparent; margin: 16px 0; }'
new_sb2 = '#qFormSection::-webkit-scrollbar-track { background: transparent; margin: 16px 0; }'

old_sb3 = '#queryModal::-webkit-scrollbar-thumb { background: #64748b; border-radius: 10px; }'
new_sb3 = '#qFormSection::-webkit-scrollbar-thumb { background: #64748b; border-radius: 10px; }'

old_sb4 = '#queryModal::-webkit-scrollbar-thumb:hover { background: #475569; }'
new_sb4 = '#qFormSection::-webkit-scrollbar-thumb:hover { background: #475569; }'

for t in targets:
    path = os.path.join(base, t.replace('/', os.sep))
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        c = f.read()

    c = c.replace(old_modal, new_modal)
    c = c.replace(old_form, new_form)
    c = c.replace(old_sb1, new_sb1)
    c = c.replace(old_sb2, new_sb2)
    c = c.replace(old_sb3, new_sb3)
    c = c.replace(old_sb4, new_sb4)
    
    # Bump to 720
    c = c.replace('?v=719', '?v=720')
    
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
            if '?v=719' in content:
                content = content.replace('?v=719', '?v=720')
                with open(path, 'w', encoding='utf-8', errors='ignore') as f:
                    f.write(content)

# update sw.js
sw_path = os.path.join(base, 'sw.js')
if os.path.exists(sw_path):
    with open(sw_path, 'r', encoding='utf-8') as f:
        sw_content = f.read()
    sw_content = sw_content.replace('solmates-cache-v719', 'solmates-cache-v720')
    sw_content = sw_content.replace('(v719)', '(v720)')
    with open(sw_path, 'w', encoding='utf-8') as f:
        f.write(sw_content)
    print("Bumped sw.js to v720")
