import os
import re

files_to_fix = [
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\view.html",
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\ebooks.html",
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\ai-knowledge-folder.html",
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\recycle-bin.html",
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\index.html"
]

light_root_vars = '''
      --bg-body: #f4f6f8;
      --card-bg: #fff;
      --text-main: #333;
      --text-muted: #666;
      --glass-border: rgba(0,0,0,0.05);'''

for file in files_to_fix:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if --bg-body is already in :root (before any @media)
        # Find the first :root { block
        match = re.search(r':root\s*\{([^\}]*)\}', content)
        if match:
            root_content = match.group(1)
            if '--bg-body' not in root_content:
                # Replace the first :root { block
                new_root = ':root {' + root_content + light_root_vars + '\n    }'
                content = content.replace(match.group(0), new_root, 1)
                
                with open(file, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed {file}")
            else:
                print(f"Already fixed {file}")

