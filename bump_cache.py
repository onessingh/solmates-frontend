import os
import re
from datetime import datetime

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
old_v = '711'
new_v = '712'
today = datetime.now().strftime('%Y-%m-%d')

# 1. Update sw.js
sw_path = os.path.join(base_dir, 'sw.js')
with open(sw_path, 'r', encoding='utf-8') as f:
    sw_content = f.read()
sw_content = sw_content.replace(f'v{old_v}', f'v{new_v}')
with open(sw_path, 'w', encoding='utf-8') as f:
    f.write(sw_content)
print("Updated sw.js")

# 2. Update HTML files
updated_html_count = 0
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            orig_content = content
            # Replace '?v=711' -> '?v=712'
            content = content.replace(f'?v={old_v}', f'?v={new_v}')
            # Replace 'v711' -> 'v712' (just in case they have /js/app.js?v=711 etc)
            
            if content != orig_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated_html_count += 1
                
print(f"Updated {updated_html_count} HTML files to v{new_v}")

# 3. Update sitemap.xml
sitemap_path = os.path.join(base_dir, 'sitemap.xml')
if os.path.exists(sitemap_path):
    with open(sitemap_path, 'r', encoding='utf-8') as f:
        sitemap_content = f.read()
    
    # Replace all <lastmod> dates with today
    sitemap_content = re.sub(r'<lastmod>.*?</lastmod>', f'<lastmod>{today}</lastmod>', sitemap_content)
    
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(sitemap_content)
    print(f"Updated sitemap.xml with <lastmod>{today}</lastmod>")
else:
    print("sitemap.xml not found!")

