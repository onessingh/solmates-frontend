import os
import re
base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
index_path = os.path.join(base_dir, 'index.html')
with open(index_path, 'r', encoding='utf-8') as f:
    index_html = f.read()
mobile_nav_match = re.search(r'<div class="mobile-nav-overlay"[^>]*>.*?</div>', index_html, re.DOTALL)
print(mobile_nav_match.group(0))
