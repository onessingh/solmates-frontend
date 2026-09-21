import os

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
OLD_V = '716'
NEW_V = '717'

html_count = 0
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            if f'?v={OLD_V}' in content:
                content = content.replace(f'?v={OLD_V}', f'?v={NEW_V}')
                with open(path, 'w', encoding='utf-8', errors='ignore') as f:
                    f.write(content)
                html_count += 1

sw_path = os.path.join(base_dir, 'sw.js')
if os.path.exists(sw_path):
    with open(sw_path, 'r', encoding='utf-8') as f:
        sw_content = f.read()
    sw_content = sw_content.replace(f'solmates-cache-v{OLD_V}', f'solmates-cache-v{NEW_V}')
    sw_content = sw_content.replace(f'(v{OLD_V})', f'(v{NEW_V})')
    with open(sw_path, 'w', encoding='utf-8') as f:
        f.write(sw_content)

print(f"Bumped cache to v{NEW_V} in {html_count} HTML files and sw.js")
