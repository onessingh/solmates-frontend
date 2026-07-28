import re
import glob

files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills\*.html")

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix hardcoded text colors
    content = re.sub(r'color:\s*#(?:333|111|000|222|444)\s*;', r'color: var(--text-main);', content)
    content = re.sub(r'color:\s*#(?:555|666|777)\s*;', r'color: var(--text-muted);', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed hardcoded text colors")
