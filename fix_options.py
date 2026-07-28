import re
import glob

files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills\*.html")

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix #fafafa background
    content = content.replace('background: #fafafa;', 'background: var(--bg-card-hover);')

    # Fix .option border and selected state
    content = re.sub(r'(\.option\s*\{[^}]*border:\s*[^;]+)#e6e6ea;', 
                     r'\1var(--border-color);', 
                     content)
    
    content = re.sub(r'(\.option\.selected\s*\{[^}]*background:\s*)#e8f0fe;', 
                     r'\1var(--bg-nav);', 
                     content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed option borders and backgrounds")
