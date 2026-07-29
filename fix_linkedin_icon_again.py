import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\linkedin-checklist.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the previous bad rule
html = html.replace('.fa-linkedin, .fa-linkedin-in { color: #0077b5 !important; -webkit-text-fill-color: #0077b5 !important; }', '.header-bar .fa-linkedin { color: #0077b5 !important; -webkit-text-fill-color: #0077b5 !important; }\n          .hero-icon i { color: white !important; -webkit-text-fill-color: white !important; }')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Fixed linkedin icon in hero")
