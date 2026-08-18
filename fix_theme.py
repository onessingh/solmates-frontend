import os
import re

count = 0
for root, _, files in os.walk(r'C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'):
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            p1 = re.compile(r'id=\"solmates-dark-style\"\s+media=\"[^\"]*\(prefers-color-scheme:\s*dark\)[^\"]*\"')
            p2 = re.compile(r'id=\"theme-dark-style\"\s+media=\"[^\"]*\(prefers-color-scheme:\s*dark\)[^\"]*\"')

            new_content = p1.sub('id="solmates-dark-style" media="not all"', content)
            new_content = p2.sub('id="theme-dark-style" media="not all"', new_content)

            if new_content != content:
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                count += 1

print(f'Updated {count} HTML files.')
