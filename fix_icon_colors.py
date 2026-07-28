import os
import glob

html_files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\*.html")

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # Revert view.html / general card icons
    if '.card.folder i.main-icon { color: var(--brand-accent); }' in content:
        content = content.replace('.card.folder i.main-icon { color: var(--brand-accent); }', '.card.folder i.main-icon { color: #facc15; }')
        modified = True
    if '.card.folder i.main-icon { color: #0ea5e9; }' in content: # In case I made them blue anywhere
        content = content.replace('.card.folder i.main-icon { color: #0ea5e9; }', '.card.folder i.main-icon { color: #facc15; }')
        modified = True
    if '.card.file i.main-icon { color: #0ea5e9; }' in content:
        content = content.replace('.card.file i.main-icon { color: #0ea5e9; }', '.card.file i.main-icon { color: #3b82f6; }')
        modified = True
        
    # Revert elearning-subjects.html (e-books)
    if '.subject-card.centered-folder .subject-name i {\n            font-size: 40px;\n            color: #0ea5e9;' in content:
        content = content.replace('color: #0ea5e9;', 'color: #facc15;')
        modified = True
    if '.subject-name i {\n            font-size: 32px;\n            color: #0ea5e9;' in content:
        content = content.replace('color: #0ea5e9;', 'color: var(--primary);')
        modified = True
        
    # Also fix the inline style causing grey folders in e-books!
    # <i class="fas " style=""></i>
    # We should just remove the style attribute entirely so it inherits the bright yellow from CSS!
    if 'style=""' in content:
        content = content.replace('style=""', '')
        modified = True
        
    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Reverted icon colors in {file}")
