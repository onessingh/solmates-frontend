import re

files = [
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\elearning-subjects.html",
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\folder-content.html"
]

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to find the dark mode block and replace the variables.
    # We can just replace the specific lines.
    content = content.replace('--tab-active-bg: #3b82f6;', '--tab-active-bg: #334155;')
    content = content.replace('--tab-active-shadow: rgba(59, 130, 246, 0.3);', '--tab-active-shadow: rgba(0, 0, 0, 0.4);')
    
    # Let's also check if they are defined differently
    content = re.sub(r'--tab-active-bg:\s*#[a-zA-Z0-9]+;\s*(?=\s*--brand-accent)', '--tab-active-bg: #334155;\n          --tab-active-shadow: rgba(0, 0, 0, 0.4);', content)
    
    # Bump cache
    content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=98.0', content)
    content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=125.0', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated tab colors in dark mode.")
