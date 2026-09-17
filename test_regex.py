import os
import re
base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
index_path = os.path.join(base_dir, 'index.html')
with open(index_path, 'r', encoding='utf-8') as f:
    index_html = f.read()
nav_center_match = re.search(r'<div class="nav-center">.*?</div>', index_html, re.DOTALL)
print(nav_center_match.group(0))
