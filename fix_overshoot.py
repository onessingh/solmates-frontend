import os

db_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database"

for root, dirs, files in os.walk(db_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Fix the regex overshoot
            content = content.replace('--border-color: var(--text-main);', '--border-color: #334155;')

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Fixed border-color overshoot")
