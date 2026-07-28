import re

file_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\elearning-subjects.html"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

hidden_css = "\n    .breadcrumb { display: none !important; margin: 0 !important; padding: 0 !important; height: 0 !important; border: none !important; overflow: hidden !important; }\n"

if "display: none !important; margin: 0 !important" not in content:
    content = content.replace("</style>", hidden_css + "</style>")
    
# Bump cache versions
content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=97.0', content)
content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=124.0', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated elearning-subjects.html")
