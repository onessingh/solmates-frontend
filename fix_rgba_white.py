import re
import glob

files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills\*.html")

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix rgba(255, 255, 255, 0.95)
    content = content.replace('background: rgba(255, 255, 255, 0.95);', 'background: var(--bg-card);')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed rgba white backgrounds")
