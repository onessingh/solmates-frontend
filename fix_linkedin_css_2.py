import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\linkedin-checklist.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

custom_css = '''
          .tabs-nav { background: var(--bg-body, #0f172a) !important; }
          .fa-linkedin, .fa-linkedin-in { color: #0077b5 !important; -webkit-text-fill-color: #0077b5 !important; }
'''

if "tabs-nav { background: var(--bg-body" not in html:
    html = html.replace('/* LinkedIn Suite Specific Overrides */', '/* LinkedIn Suite Specific Overrides */\n' + custom_css)
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Injected dark mode CSS fixes for linkedin suite tabs and icon")
else:
    print("CSS already injected")
