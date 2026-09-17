import os
import re

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
file_path = os.path.join(base_dir, 'games', 'index.html')
index_path = os.path.join(base_dir, 'index.html')

with open(index_path, 'r', encoding='utf-8') as f:
    index_html = f.read()

nav_center_match = re.search(r'<div class="nav-center">.*?</div>', index_html, re.DOTALL)
nav_center_html = nav_center_match.group(0)

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

original_content = content
content = re.sub(r'<div class="nav-center">.*?</div>', nav_center_html, content, flags=re.DOTALL)

if content != original_content:
    print("Nav center updated in games/index.html")
else:
    print("Nav center NOT updated in games/index.html")
