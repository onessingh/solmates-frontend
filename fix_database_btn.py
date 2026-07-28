import os
import re

directories = [
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database",
]

def fix_database_btn():
    for directory in directories:
        for root, _, files in os.walk(directory):
            for file in files:
                if not file.endswith('.html'): continue
                filepath = os.path.join(root, file)
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace var(--primary) background and var(--bg) color with #0f2b46 and white
                content = re.sub(r'(\.database-btn\s*\{[^}]*?background:\s*)var\(--primary\);', r'\1#0f2b46;', content)
                content = re.sub(r'(\.database-btn\s*\{[^}]*?color:\s*)var\(--bg\);', r'\1white;', content)
                content = re.sub(r'(\.database-btn\s*\{[^}]*?color:\s*)var\(--bg-body\);', r'\1white;', content)
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_database_btn()
print("Fixed database-btn background and text color")
