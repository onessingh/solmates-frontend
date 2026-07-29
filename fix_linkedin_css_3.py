import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\linkedin-checklist.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

custom_css = '''
          #upload-label { background: var(--bg-card-hover, #334155) !important; border-color: var(--border-color, #475569) !important; }
          #cropper-modal > div { background: var(--bg-card, #1e293b) !important; color: var(--text-main, #f8fafc) !important; }
          #cropper-modal button[onclick="closeCropper()"] { background: var(--bg-card-hover, #334155) !important; color: var(--text-main, #f8fafc) !important; border-color: var(--border-color, #475569) !important; }
'''

if "#upload-label { background:" not in html:
    html = html.replace('/* LinkedIn Suite Specific Overrides */', '/* LinkedIn Suite Specific Overrides */\n' + custom_css)
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Injected dark mode CSS fixes for upload box and cropper modal")
else:
    print("CSS already injected")
