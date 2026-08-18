import os
import re

count_html = 0
for root, _, files in os.walk(r'C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'):
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Replace ?v=78.x or ?v=78 with ?v=79
            new_content = re.sub(r'\?v=78(\.\d+)?', '?v=79', content)
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                count_html += 1

print(f'Updated {count_html} HTML files.')

# Update sw.js
sw_path = r'C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\sw.js'
with open(sw_path, 'r', encoding='utf-8') as file:
    content = file.read()
new_content = re.sub(r'solmates-cache-v78(\.\d+)?', 'solmates-cache-v79', content)
if new_content != content:
    with open(sw_path, 'w', encoding='utf-8') as file:
        file.write(new_content)
    print('Updated sw.js')
