import os
import re

db_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database"
files_to_fix = ['youtube-browse.html', 'youtube-content.html']

for file in files_to_fix:
    filepath = os.path.join(db_dir, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix buttons using var(--primary) background and white text
    content = re.sub(r'(background:\s*var\(--primary\);[^}]*color:\s*)white;', r'\1var(--bg);', content)

    # Any other hardcoded white texts on buttons?
    content = re.sub(r'(\.database-btn\s*\{[^}]*color:\s*)white;', r'\1var(--bg);', content)
    content = re.sub(r'(\.btn[^}]*color:\s*)white;', r'\1var(--bg);', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed button text colors in youtube files")
