import os
import re

db_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database"

for root, dirs, files in os.walk(db_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Undo the mistake for #0f2b46
            content = content.replace('background: #0f2b46; color: var(--bg-body);', 'background: #0f2b46; color: white;')

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Fixed #0f2b46 buttons")
