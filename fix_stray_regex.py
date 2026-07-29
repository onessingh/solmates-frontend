import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\index.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'</style>\s*<style>\s*<!-- Font Awesome', r'</style>\n    <!-- Font Awesome', html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Removed stray style tag via regex")
