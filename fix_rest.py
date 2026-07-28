import os
import re

# 1. Fix index.html
index_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\index.html"
with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('background: rgba(255, 255, 255, 0.95);', 'background: var(--bg-nav);')
content = content.replace('background: rgba(255, 255, 255, 0.98);', 'background: var(--bg-nav);')
content = content.replace('background: rgba(255, 255, 255, 0.9);', 'background: var(--bg-nav);')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(content)

# 2. Inject dark mode to skills and games
def inject_dark_mode(directory):
    dark_mode_css = '''
    /* Dark Mode Native OS Integration */
    @media (prefers-color-scheme: dark) {
      :root {
        --bg-body: #0f172a;
        --text-main: #f8fafc;
        --text-muted: #94a3b8;
        --text-lighter: #cbd5e1;
        --bg-nav: rgba(15, 23, 42, 0.98);
        --bg-card: #1e293b;
        --bg-card-hover: #334155;
        --border-color: #334155;
        --hero-bg: linear-gradient(to bottom, #0f172a, #1e293b);
        --brand-primary: #f8fafc;
        --brand-accent: #c0962d;
      }
    }
'''
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Check if already injected
                if '@media (prefers-color-scheme: dark)' not in content:
                    content = re.sub(r'(<style[^>]*>)', r'\1' + dark_mode_css, content, count=1)
                
                # Replace #0f172a, #1e293b, #cbd5e1, #94a3b8 if they are hardcoded
                # Actually, no, if it's already there, wait, skills might have hardcoded dark mode colors or light mode colors.
                # Let's see what skills uses.
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

inject_dark_mode(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills")
inject_dark_mode(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games")

print("Fixed index.html and injected to skills and games")
