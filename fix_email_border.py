import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\email-generator.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace border: 1px solid with border-bottom: 1px solid
html = html.replace('border: 1px solid var(--border-color); padding-bottom:12px;', 'border-bottom: 1px solid var(--border-color); border-top: none; border-left: none; border-right: none; padding-bottom:12px;')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Fixed template-header border")
