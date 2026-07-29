import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\cover-letter.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

custom_css = '''
          /* Fix outline buttons in dark mode */
          .btn-outline { background: var(--bg-card-hover, #334155) !important; color: var(--text-main, #f8fafc) !important; border-color: var(--border-color, #475569) !important; }
          .btn-outline:hover { background: var(--border-color, #475569) !important; }
'''

if "/* Fix outline buttons in dark mode */" not in html:
    html = html.replace('.option:hover { background: var(--bg-card, #1e293b) !important; }', '.option:hover { background: var(--bg-card, #1e293b) !important; }\n' + custom_css)
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Injected dark mode CSS fixes for outline buttons")
else:
    print("CSS already injected")
