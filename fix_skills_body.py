import re
file = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills\index.html"
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix body
content = re.sub(r'body\s*\{\s*font-family:[^;]*;\s*background:\s*#f5f7fa\s*!important;\s*color:\s*#333\s*!important;', 
                 'body {\n      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;\n      background: var(--bg-body) !important;\n      color: var(--text-main) !important;', 
                 content)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed body in skills/index.html")
