import os
import glob

games_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\*\index.html"
files = glob.glob(games_dir)

cache_meta = '<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">\n    <meta http-equiv="Pragma" content="no-cache">\n    <meta http-equiv="Expires" content="0">'

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<meta http-equiv="Cache-Control"' not in content:
        # Insert after <head>
        content = content.replace('<head>', f'<head>\n    {cache_meta}')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added cache bust to {file}")

