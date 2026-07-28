import re
import glob

files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills\*.html")

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Use a transparent blue for selected option which looks perfect in both modes
    content = re.sub(r'(\.option\.selected\s*\{[^}]*background:\s*)var\(--bg-nav\);', 
                     r'\1rgba(0, 113, 227, 0.1);', 
                     content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed selected option background")
