import re
import glob

files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills\*.html")

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update sol-cache.js?v=XX.X to force cache bust
    content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=90.0', content)
    # Update config.js?v=XX.X as well just in case
    content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=117.0', content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Bumped cache versions in all skills HTML files")
