import re
import glob

files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills\*.html")

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix .option border for all variants
    content = re.sub(r'(\.option\s*\{[^}]*border:\s*[^;]+)(?:#ddd|#ccc|#e6e6ea);', 
                     r'\1var(--border-color);', 
                     content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed option borders again")
