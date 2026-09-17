import os
base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
file_path = os.path.join(base_dir, 'games', 'index.html')
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()
print('Has nav-center class:', '<div class=\"nav-center\">' in content)
print('Has Platform Guide:', 'Platform Guide' in content)
