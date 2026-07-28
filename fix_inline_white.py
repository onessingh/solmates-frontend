import re
import glob

files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills\*.html")

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Also replace anything like: background: white; inside style=""
    content = re.sub(r'style="([^"]*)background:\s*white;([^"]*)"', r'style="\1background: var(--bg-card);\2"', content)
    content = re.sub(r'style="([^"]*)background:\s*#fff;([^"]*)"', r'style="\1background: var(--bg-card);\2"', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Checked inline white backgrounds")
