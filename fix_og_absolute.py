import os
import re

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
count = 0

for root, dirs, files in os.walk(base_dir):
    if '.git' in root or 'node_modules' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Fix relative og:image to absolute
            new_content = content.replace(
                'og:image" content="/preview.png"',
                'og:image" content="https://solmates.in/preview.png"'
            )
            # Also fix og:url if relative
            new_content = re.sub(
                r'og:url" content="/(.*?)"',
                lambda m: f'og:url" content="https://solmates.in/{m.group(1)}"' if not m.group(1).startswith('http') else m.group(0),
                new_content
            )

            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1

print(f"Fixed absolute og:image/og:url in {count} files.")
