import os
import re

db_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database"

for root, dirs, files in os.walk(db_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            matches = re.findall(r'--[a-zA-Z0-9_-]+:\s*#[a-zA-Z0-9]{3,6};', content)
            if matches:
                print(f"--- {file} ---")
                print(", ".join(set(matches)))
