import os
import glob

html_files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\*.html")

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # Check folder-content.html
    if '.card.folder i.main-icon { color: var(--brand-accent); }' in content:
        content = content.replace('.card.folder i.main-icon { color: var(--brand-accent); }', '.card.folder i.main-icon { color: #facc15; }')
        modified = True
    if '.card.file i.main-icon { color: #0ea5e9; }' in content:
        content = content.replace('.card.file i.main-icon { color: #0ea5e9; }', '.card.file i.main-icon { color: #3b82f6; }')
        modified = True

    # Check youtube files
    if 'color: #0ea5e9' in content and ('folder' in file or 'youtube' in file):
        # Let's not blindly replace. 
        pass

    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Reverted icon colors in {file}")
