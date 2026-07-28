import re
import glob

files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills\*.html")

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix body
    content = re.sub(r'body\s*\{\s*font-family:[^;]*;\s*background:\s*(#[a-fA-F0-9]+)\s*(?:!important)?;\s*color:\s*(#[a-fA-F0-9]+)\s*(?:!important)?;', 
                     r'body {\n      font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;\n      background: var(--bg-body) !important;\n      color: var(--text-main) !important;', 
                     content)
    
    content = re.sub(r'body\s*\{\s*font-family:[^;]*;\s*background:\s*(#[a-fA-F0-9]+)\s*;\s*color:\s*(#[a-fA-F0-9]+)\s*;', 
                     r'body {\n      font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;\n      background: var(--bg-body) !important;\n      color: var(--text-main) !important;', 
                     content)

    # Fix .card background if hardcoded to white/light grey
    content = re.sub(r'\.card\s*\{([^}]*)background:\s*#ffffff;', 
                     r'.card {\1background: var(--bg-card);', 
                     content)

    # Fix .container background if hardcoded to white
    content = re.sub(r'\.container\s*\{([^}]*)background:\s*#fff;', 
                     r'.container {\1background: var(--bg-card);', 
                     content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed hardcoded body/card colors in all skill files")
