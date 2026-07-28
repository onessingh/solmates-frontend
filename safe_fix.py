import os
import re

def safe_replace(filepath, pattern, replacement):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content, count = re.subn(pattern, replacement, content)
    
    if count > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {count} occurrences in {os.path.basename(filepath)}")

# 1. view.html icons
view_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\view.html"
safe_replace(view_path, r'(\.card\.file\s+i\.main-icon\s*\{\s*color:\s*)var\(--brand-primary\);', r'\1#0ea5e9;')

# 2. elearning-subjects.html icons
el_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\elearning-subjects.html"
safe_replace(el_path, r'(\.subject-name\s+i\s*\{\s*[^}]*?color:\s*)var\(--primary\);', r'\1#0ea5e9;')
safe_replace(el_path, r'(\.subject-card\.centered-folder\s+\.subject-name\s+i\s*\{\s*[^}]*?color:\s*)var\(--brand-accent\);', r'\1#0ea5e9;')
safe_replace(el_path, r'(\.subject-card\.centered-folder\s+\.subject-name\s+i\s*\{\s*[^}]*?color:\s*)#facc15;', r'\1#0ea5e9;')

# 3. youtube-content.html breadcrumb and folder background
ytc_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\youtube-content.html"
safe_replace(ytc_path, r'(\.breadcrumb\s*\{[^}]*?background:\s*)rgba\(255,\s*255,\s*255,\s*0\.82\);', r'\1var(--bg-nav);')
safe_replace(ytc_path, r'(\.breadcrumb\s*\{[^}]*?border-bottom:\s*1px\s+solid\s*)rgba\(0,\s*0,\s*0,\s*0\.05\);', r'\1var(--border-color);')
safe_replace(ytc_path, r'(\.folder-card\.centered-folder\s*\{\s*[^}]*?background:\s*)var\(--card\);', r'\1#0f172a;')

# 4. youtube-browse.html breadcrumb (if exists)
ytb_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\youtube-browse.html"
safe_replace(ytb_path, r'(\.breadcrumb\s*\{[^}]*?background:\s*)rgba\(255,\s*255,\s*255,\s*0\.82\);', r'\1var(--bg-nav);')
safe_replace(ytb_path, r'(\.breadcrumb\s*\{[^}]*?border-bottom:\s*1px\s+solid\s*)rgba\(0,\s*0,\s*0,\s*0\.05\);', r'\1var(--border-color);')

# 5. folder-content.html icons (if they are there)
fc_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\folder-content.html"
safe_replace(fc_path, r'(\.card\.file\s+i\.main-icon\s*\{\s*color:\s*)var\(--brand-primary\);', r'\1#0ea5e9;')

