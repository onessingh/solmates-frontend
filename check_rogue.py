import os
import re

frontend_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"

count = 0
for root, dirs, files in os.walk(frontend_dir):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    html = f.read()
            except:
                continue
            
            # Find everything between <style> and <style id="solmates-dark-style"
            match = re.search(r'var\(--text-main,\s*#f8fafc\)\s*!important', html)
            if match:
                # Check if it's inside solmates-dark-style
                idx = match.start()
                dark_style_idx = html.find('id="solmates-dark-style"')
                if dark_style_idx == -1 or idx < dark_style_idx:
                    count += 1
print(f"Files with rogue dark overrides in base style: {count}")
