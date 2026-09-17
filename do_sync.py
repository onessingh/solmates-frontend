import os
import re

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
index_path = os.path.join(base_dir, 'index.html')

with open(index_path, 'r', encoding='utf-8') as f:
    index_html = f.read()

nav_center_match = re.search(r'<div class="nav-center">.*?</div>', index_html, re.DOTALL)
nav_center_html = nav_center_match.group(0)

mobile_nav_match = re.search(r'<div class="mobile-nav-overlay"[^>]*>.*?</div>', index_html, re.DOTALL)
mobile_nav_html = mobile_nav_match.group(0)

updated_count = 0

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html') and file != 'index.html':
            file_path = os.path.join(root, file)
            
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            original_content = content
            
            content = re.sub(r'<div class="nav-center">.*?</div>', nav_center_html, content, flags=re.DOTALL)
            content = re.sub(r'<div class="mobile-nav-overlay"[^>]*>.*?</div>', mobile_nav_html, content, flags=re.DOTALL)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated_count += 1
                print(f"Updated: {file_path}")

print(f"Total updated: {updated_count}")
