import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\salary-calculator.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Add margin to toggle-label globally
html = html.replace('.toggle-label { font-weight: 600;', '.toggle-label { padding-right: 15px; font-weight: 600;')

# Inject Dark Mode fixes
custom_css = '''
          /* Salary Calculator specific overrides */
          input::placeholder { color: #94a3b8 !important; opacity: 1 !important; }
          .b-title { color: var(--text-muted, #94a3b8) !important; }
          .b-value { color: var(--text-main, #f8fafc) !important; }
          th, td, tr.row-net, h3[style*="color: var(--primary)"] { color: var(--text-main, #f8fafc) !important; }
'''

if "/* Salary Calculator specific overrides */" not in html:
    html = html.replace('.option:hover { background: var(--bg-card, #1e293b) !important; }', '.option:hover { background: var(--bg-card, #1e293b) !important; }\n' + custom_css)
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Injected dark mode CSS fixes for salary calculator")
else:
    print("CSS already injected")
