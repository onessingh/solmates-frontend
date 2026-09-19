import os

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
files_to_update = ['index.html', 'platform-guide.html']

for filename in files_to_update:
    path = os.path.join(base_dir, filename)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        content = content.replace('"foundingDate": "2024"', '"foundingDate": "2025"')
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")
