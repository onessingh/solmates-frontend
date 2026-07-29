import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\linkedin-checklist.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

custom_css = '''
          /* LinkedIn Suite Specific Overrides */
          .category, .tab-btn:not(.active), .header-bar, .banner-preview-wrap { background: var(--bg-card, #1e293b) !important; color: var(--text-main, #f8fafc) !important; border-color: var(--border-color, #334155) !important; }
          .cat-title, .check-title, h2[style*="color: var(--primary)"] { color: var(--text-main, #f8fafc) !important; }
          input::placeholder, textarea::placeholder { color: #94a3b8 !important; opacity: 1 !important; }
'''

if "/* LinkedIn Suite Specific Overrides */" not in html:
    html = html.replace('.option:hover { background: var(--bg-card, #1e293b) !important; }', '.option:hover { background: var(--bg-card, #1e293b) !important; }\n' + custom_css)
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Injected dark mode CSS fixes for linkedin suite")
else:
    print("CSS already injected")
