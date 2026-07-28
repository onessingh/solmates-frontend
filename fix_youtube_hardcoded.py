import os
import re

db_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database"
files_to_fix = ['youtube-browse.html', 'youtube-content.html']

for file in files_to_fix:
    filepath = os.path.join(db_dir, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix hardcoded hero gradient
    content = re.sub(r'background:\s*linear-gradient\(135deg,\s*#f8fafc\s*0%,\s*#ffffff\s*100%\);?', r'background: var(--hero-bg);', content)
    
    # Fix other hardcoded light colors
    content = content.replace('background: #fff8ee;', 'background: var(--bg-card-hover);')
    content = content.replace('background: #eee;', 'background: var(--border-color);')
    content = content.replace('border: 1px solid #ddd;', 'border: 1px solid var(--border-color);')
    content = content.replace("hide.style.color = isHidden ? '#fff' : '#64748b';", "hide.style.color = isHidden ? '#fff' : 'var(--sub)';")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed hardcoded light colors in youtube files")
