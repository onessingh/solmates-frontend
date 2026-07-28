import os

db_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database"
filepath = os.path.join(db_dir, 'youtube-content.html')
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('border-bottom: 1px solid #f1f5f9;', 'border-bottom: 1px solid var(--border-color);')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
