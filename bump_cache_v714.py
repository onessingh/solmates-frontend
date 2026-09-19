import os
import re

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
old_v = '713'
new_v = '714'
today_date = '2026-09-19'

html_count = 0
for root, dirs, files in os.walk(base_dir):
    if '.git' in root or 'node_modules' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = re.sub(rf'\?v={old_v}', f'?v={new_v}', content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                html_count += 1

print(f"Updated cache strings in {html_count} HTML files.")

sw_path = os.path.join(base_dir, 'sw.js')
if os.path.exists(sw_path):
    with open(sw_path, 'r', encoding='utf-8') as f:
        sw_content = f.read()
    sw_content = re.sub(rf'v{old_v}', f'v{new_v}', sw_content)
    with open(sw_path, 'w', encoding='utf-8') as f:
        f.write(sw_content)
    print("Updated sw.js")

sitemap_path = os.path.join(base_dir, 'sitemap.xml')
if os.path.exists(sitemap_path):
    with open(sitemap_path, 'r', encoding='utf-8') as f:
        sitemap_content = f.read()
    sitemap_content = re.sub(r'<lastmod>\d{4}-\d{2}-\d{2}</lastmod>', f'<lastmod>{today_date}</lastmod>', sitemap_content)
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(sitemap_content)
    print("Updated sitemap.xml")

