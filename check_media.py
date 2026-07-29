import os
import re

frontend_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"
count_multiple = 0
for root, dirs, files in os.walk(frontend_dir):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
            except:
                continue
            matches = len(re.findall(r'@media\s*\(\s*prefers-color-scheme:\s*dark\s*\)', content))
            if matches > 1:
                print(f"{path} has {matches} matches")
                count_multiple += 1
print(f"Total files with multiple matches: {count_multiple}")
