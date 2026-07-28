import re
import glob

# Bump cache
files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\*\index.html")
files.append(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\index.html")

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=94.0', content)
    content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=121.0', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Bumped cache.")
