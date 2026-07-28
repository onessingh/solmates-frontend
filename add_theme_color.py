import os
import re

frontend_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"

theme_tags = """
  <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff">
  <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f172a">"""

count = 0
for root, dirs, files in os.walk(frontend_dir):
    # skip node_modules if present
    if 'node_modules' in root: continue
    
    for file in files:
        if not file.endswith('.html'): continue
        filepath = os.path.join(root, file)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'name="theme-color"' in content:
            # Maybe it already exists, replace it or skip
            # Let's skip for now unless it's only one tag.
            continue
            
        content = re.sub(r'<head>', f'<head>\n{theme_tags}', content, flags=re.IGNORECASE)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Added theme-color meta tags to {count} HTML files")
