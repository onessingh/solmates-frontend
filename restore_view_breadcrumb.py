import re

file_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\view.html"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the hidden css block we injected before
hidden_css = "\n    .breadcrumb { display: none !important; margin: 0 !important; padding: 0 !important; height: 0 !important; border: none !important; overflow: hidden !important; }\n"
content = content.replace(hidden_css, "")

# Bump cache version
content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=99.0', content)
content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=126.0', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Restored breadcrumbs in view.html")
