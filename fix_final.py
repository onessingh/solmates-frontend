import os
import re

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
index_path = os.path.join(base_dir, 'index.html')

with open(index_path, 'r', encoding='utf-8') as f:
    index_html = f.read()

nav_center_html = re.search(r'<div class="nav-center">.*?</div>', index_html, re.DOTALL).group(0)
mobile_nav_html = re.search(r'<div class="mobile-nav-overlay"[^>]*>.*?</div>', index_html, re.DOTALL).group(0)

target_files = [
    'database/view.html',
    'exam-prep/index.html',
    'exam-prep/overview.html',
    'exam-prep/study-kit.html',
    'exam-prep/subjects.html',
    'games/index.html',
    'platform-guide.html'
]

for rel_path in target_files:
    file_path = os.path.join(base_dir, rel_path.replace('/', os.sep))
    if not os.path.exists(file_path): continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig = content
    
    # Replace nav-center
    old_nav = re.search(r'<div class="nav-center">.*?</div>', content, re.DOTALL)
    if old_nav:
        content = content.replace(old_nav.group(0), nav_center_html)
        
    # Replace mobile-nav
    old_mobile = re.search(r'<div class="mobile-nav-overlay"[^>]*>.*?</div>', content, re.DOTALL)
    if old_mobile:
        content = content.replace(old_mobile.group(0), mobile_nav_html)
        
    if content != orig:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed: {rel_path}")
